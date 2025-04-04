import { Column, PrismaClient, Task } from '@prisma/client';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useNavigation, useSubmit } from '@remix-run/react';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import KanbanColumn from 'components/KanbanColumn';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getUser } from '~/utils/actions';
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import Page from './_protected.projects.$projectId._index';
import KanbanBox from 'components/KanbanBox';

export type KanbanBoard = {
    columns: (Column & { tasks: Task[] })[];
}

type TaskDragData = {
    type: "TASK";
    task: Task;
    fromColumnId: string;
};

type ColumnDragData = {
    type: "COLUMN";
    column: Column;
};

type DragData = TaskDragData | ColumnDragData;

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const projectId = params.projectId || '';
    const { user } = await getUser(request);
    const prisma = new PrismaClient();


    try {
        // First try to find existing board
        let board = await prisma.board.findUnique({
            where: { projectId: projectId },
            include: {
                columns: {
                    include: {
                        tasks: {
                            orderBy: { position: 'asc' }
                        },
                    },
                    orderBy: { position: 'asc' }
                },
            },
        });

        // If board doesn't exist, create it
        if (!board) {
            console.log('Creating the board:');
            board = await prisma.board.create({
                data: {
                    name: 'Board',
                    projectId: projectId,
                    columns: {
                        create: [
                            { name: 'To Do', position: 0 },
                            { name: 'In Progress', position: 1 },
                            { name: 'Done', position: 2 },
                        ],
                    },
                },
                include: {
                    columns: {
                        include: {
                            tasks: true,
                        },
                    },
                },
            });
            console.log('Created Board', board);
        }

        const projectMembers = await prisma.projectMember.findMany({
            where: {
                projectId: projectId,
            },
            include: {
                user: true
            }
        })
        console.log("Project's Members", projectMembers)
        return { user, projectId, board, projectMembers };
    } catch (error) {
        console.log('Error in Kanban Page', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const projectId = params.projectId;
    const formData = await request.formData();
    const intent = formData.get('intent');
    console.log("Intent", intent);
    const prisma = new PrismaClient;
    switch (intent) {
        case 'columnCreate': {
            const columnName = String(formData.get('columnName'));
            console.log(`Add ${columnName}`);
            const boardId = await prisma.board.findUnique({
                where: { projectId: projectId },
                select: { id: true }
            }).then(result => result?.id);

            const queryResponse = await prisma.column.create({
                data: {
                    name: columnName,
                    board: { connect: { projectId: projectId } },
                    position: await prisma.column.count({ where: { boardId: boardId } })
                },
                include: {
                    tasks: true
                }
            })
            console.log(queryResponse);
            break;
        }
        case 'reorderColumns': {
            try {
                if (intent === 'reorderColumns') {
                    const columns = JSON.parse(String(formData.get('columns'))) as Array<{
                        id: string;
                        position: number;
                    }>;

                    await prisma.$transaction(
                        columns.map(col =>
                            prisma.column.update({
                                where: { id: col.id },
                                data: { position: col.position }
                            })
                        )
                    );

                    return { success: true };
                }
                // ... other actions
            } finally {
                await prisma.$disconnect();
            }
            break;
        }
        case 'columnDelete': {
            const columnId = String(formData.get('columnId'));
            try {
                // 1. Delete the column
                await prisma.column.delete({ where: { id: columnId } });

                // 2. Get remaining columns
                const remainingColumns = await prisma.column.findMany({
                    where: { board: { projectId } },
                    orderBy: { position: 'asc' }
                });

                // 3. Reassign sequential positions
                await prisma.$transaction(
                    remainingColumns.map((col, index) =>
                        prisma.column.update({
                            where: { id: col.id },
                            data: { position: index }
                        })
                    )
                );

                return { success: true };
            } finally {
                await prisma.$disconnect();
            }
        }
        case 'taskCreate': {
            const taskName = String(formData.get('taskName'));
            const assignedMemberId = String(formData.get('assignedMemberId'));
            const assignedMemberPic = await prisma.projectMember.findUnique({
                where: { id: assignedMemberId },
                select: {
                    user: {
                        select: {
                            pic: true
                        }
                    }
                }
            }).then(result => result?.user.pic)
            const taskDesc = String(formData.get('taskDesc'));
            const columnId = String(formData.get('columnId'));
            console.log(`Add ${taskName}`);
            const queryResponse = await prisma.task.create({
                data: {
                    name: taskName,
                    desc: taskDesc,
                    columnId: columnId,
                    assignedMemberId: assignedMemberId,
                    assignedMemberPic: assignedMemberPic,
                    position: await prisma.task.count({ where: { columnId: columnId } })
                }
            });
            console.log("Task Created", queryResponse);
            break;
        }
        case 'moveTask': {
            const taskId = String(formData.get('taskId'));
            const newColumnId = String(formData.get('newColumnId'));
            const newPosition = Number(formData.get('newPosition'));

            await prisma.$transaction([
                // Update task's column and position
                prisma.task.update({
                    where: { id: taskId },
                    data: {
                        columnId: newColumnId,
                        position: newPosition
                    }
                }),
                // Reorder other tasks in the new column
                ...(await prisma.task.findMany({
                    where: {
                        columnId: newColumnId,
                        id: { not: taskId }
                    },
                    orderBy: { position: 'asc' }
                })).map((task, index) =>
                    prisma.task.update({
                        where: { id: task.id },
                        data: {
                            position: index >= newPosition ? index + 1 : index
                        }
                    })
                )
            ]);

            return { success: true };
        }
        default: {
            break;
        }
    }

    return { ok: false };
}

export default function Kanban() {
    const { projectId, board } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    console.log('ZeBoard', board);
    const [boardState, setBoardState] = useState<KanbanBoard>(board);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    console.log("DNDBOARD", boardState);
    const submit = useSubmit();

    function handleAddColumn(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        const columnName = String(formData.get('columnName'));
        console.log("ADDing column to state");

        setBoardState(prev => (
            {
                columns: [...prev.columns, {
                    id: `temp-${Date.now()}`,
                    name: columnName,
                    position: prev.columns.length,
                    tasks: [],
                    boardId: board.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }]
            }
        ))
    }

    function handleDeleteColumn(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        const columnId = String(formData.get('columnId'));
        setBoardState(prev => {
            const remainingColumns = prev.columns.filter(col => col.id !== columnId);

            const updatedColumns = remainingColumns.map((col, index) => ({
                ...col,
                position: index
            }));

            return { columns: updatedColumns };
        });
    }

    function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(e.currentTarget);
        const columnId = String(formData.get('columnId'));
        const taskName = String(formData.get('taskName'));
        const taskDesc = String(formData.get('taskDesc'));
        const assignedMemberId = String(formData.get('assignedMemberId'));

        setBoardState(prev => ({
            columns: prev.columns.map(col => col.id === columnId ? {
                ...col,
                tasks: [
                    ...col.tasks,
                    {
                        id: `temp-${Date.now()}`,
                        name: taskName,
                        desc: taskDesc,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        columnId: columnId,
                        position: col.tasks.length,
                        assignedMemberId: assignedMemberId,
                        assignedMemberPic: null,
                    }
                ]
            } : col)
        }
        ))
    }

    function handleMoveTask(
        state: KanbanBoard,
        taskId: string,
        newColumnId: string,
        newPosition: number
    ): KanbanBoard {
        const sourceCol = state.columns.find(col => col.tasks.some(t => t.id === taskId));
        const task = sourceCol?.tasks.find(t => t.id === taskId);

        // Remove from source
        const newSourceTasks = sourceCol?.tasks
            .filter(t => t.id !== taskId)
            .map((t, i) => ({ ...t, position: i })); // Recalculate positions

        // Add to target
        const targetCol = state.columns.find(col => col.id === newColumnId)!;
        const newTargetTasks = [
            ...targetCol.tasks.slice(0, newPosition),
            { ...task, columnId: newColumnId, position: newPosition },
            ...targetCol.tasks.slice(newPosition),
        ].map((t, i) => ({ ...t, position: i })); // Recalculate all positions

        return {
            columns: state.columns.map(col => {
                if (col.id === sourceCol?.id) return { ...col, tasks: newSourceTasks };
                if (col.id === targetCol?.id) return { ...col, tasks: newTargetTasks };
                return col;
            })
        };
    }

    function handleDragStart(event: DragStartEvent) {
        const activeData = event.active.data.current as DragData | undefined;
        if (!activeData) return;

        if (activeData.type === "COLUMN") {
            setActiveColumn(activeData.column);
        } else if (activeData.type === "TASK") {
            setActiveTask(activeData.task);
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeData = active.data.current as DragData;
        const overData = over.data.current as DragData;

        if (activeData.type !== 'TASK') return;

        // Get the task ID
        const taskId = active.id.toString();

        // Find source and target columns
        const sourceColumn = boardState.columns.find(col =>
            col.tasks.some(t => t.id === taskId)
        );
        if (!sourceColumn) return;

        // Determine target column
        let targetColumnId: string;
        let newPosition: number;

        if (overData?.type === 'COLUMN') {
            // Dropping on a column
            targetColumnId = over.id.toString();
            newPosition = 0; // Add to top of new column
        } else if (overData?.type === 'TASK') {
            // Dropping on a task
            targetColumnId = boardState.columns.find(col =>
                col.tasks.some(t => t.id === over.id)
            )?.id;
            const overTask = boardState.columns
                .flatMap(col => col.tasks)
                .find(t => t.id === over.id);

            if (!targetColumnId || !overTask) return;

            newPosition = overTask.position;
        } else {
            return;
        }

        // If same column and same position, no change needed
        if (sourceColumn.id === targetColumnId) return;

        setBoardState(prev => {
            // Remove from source column
            const newSourceTasks = sourceColumn.tasks
                .filter(t => t.id !== taskId)
                .map((t, i) => ({ ...t, position: i }));

            // Add to target column
            const targetColumn = prev.columns.find(col => col.id === targetColumnId);
            if (!targetColumn) return prev;

            const newTargetTasks = [
                ...targetColumn.tasks.slice(0, newPosition),
                { ...sourceColumn.tasks.find(t => t.id === taskId), columnId: targetColumnId, position: newPosition },
                ...targetColumn.tasks.slice(newPosition),
            ].map((t, i) => ({ ...t, position: i }));

            return {
                columns: prev.columns.map(col => {
                    if (col.id === sourceColumn.id) return { ...col, tasks: newSourceTasks };
                    if (col.id === targetColumnId) return { ...col, tasks: newTargetTasks };
                    return col;
                })
            };
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeData = active.data.current as DragData;
        if (activeData.type !== 'TASK') return;

        const overData = over.data.current as DragData;
        const taskId = active.id.toString();

        // Find current column and position
        const currentColumn = boardState.columns.find(col =>
            col.tasks.some(t => t.id === taskId)
        );
        if (!currentColumn) return;

        // Determine new column and position
        let newColumnId: string;
        let newPosition: number;

        if (overData?.type === 'COLUMN') {
            newColumnId = over.id.toString();
            newPosition = 0;
        } else if (overData?.type === 'TASK') {
            newColumnId = boardState.columns.find(col =>
                col.tasks.some(t => t.id === over.id)
            )?.id;
            const overTask = boardState.columns
                .flatMap(col => col.tasks)
                .find(t => t.id === over.id);

            if (!newColumnId || !overTask) return;

            newPosition = overTask.position;
        } else {
            return;
        }

        // Submit the change to the server
        submit(
            {
                intent: 'moveTask',
                taskId,
                newColumnId,
                newPosition: newPosition.toString()
            },
            { method: 'POST', action: `/projects/${projectId}/board`, navigate: false }
        );
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )

    return (
        <div className="h-[90%] flex flex-col gap-4 ">
            <div className='flex items-start justify-start gap-4 w-full h-full'>
                <div className='w-full overflow-x-auto h-full scrollbar-thin scrollbar-thumb-background'>
                    <div
                        className={`flex gap-4 h-full pb-4`}
                    >
                        <DndContext
                            sensors={sensors}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                        >
                            <SortableContext items={boardState.columns.map(c => c.id)}>
                                {boardState.columns.map((column, index) => {
                                    return <KanbanColumn
                                        column={column}
                                        key={index}
                                        tasks={boardState.columns[index].tasks}
                                        onAddTask={handleAddTask}
                                        onDeleteColumn={handleDeleteColumn}
                                    />;
                                })}
                            </SortableContext>
                            <DragOverlay>
                                {activeColumn && (
                                    <KanbanColumn
                                        column={activeColumn}
                                        tasks={boardState.columns.find(c => c.id === activeColumn.id)?.tasks}
                                        onAddTask={handleAddTask}
                                    />
                                )}
                                {activeTask && (
                                    <KanbanBox
                                        task={activeTask}
                                        assigneePic=''
                                        tags={[]}
                                        date={`${activeTask.createdAt.getDate()}/${activeTask.createdAt.getMonth()}/${activeTask.createdAt.getFullYear()}`}
                                    />
                                )}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>
                <Dialog
                    title="New Column"
                    trigger={<Button variant='critical' classNameAppend='sticky right-0'> <Plus /> </Button>}
                >
                    <Form
                        method="post"
                        action={`/projects/${projectId}/board`}
                        className="flex flex-col w-full items-center gap-4 mt-2"
                        onSubmit={handleAddColumn}
                    >
                        <div className="w-full space-y-2 h-full group">
                            <Input
                                type="text"
                                name="columnName"
                                placeholder="Enter Column Name"
                                required={true}
                            />
                        </div>
                        <div className="flex w-full justify-between items-center">
                            <div />
                            <Button
                                type="submit"
                                name='intent'
                                value='columnCreate'
                                classNameAppend="disabled:opacity-55 disabled:border-accent disabled:shadow-none disabled:text-accent disabled:cursor-not-allowed"
                                disabled={
                                    navigation.state === 'submitting' ||
                                    navigation.state === 'loading'
                                }
                            >
                                {navigation.state === 'submitting' ||
                                    navigation.state === 'loading'
                                    ? 'Adding...'
                                    : 'Add'}
                            </Button>
                        </div>
                    </Form>
                </Dialog>
            </div>
        </div>
    );
}
