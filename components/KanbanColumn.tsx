import { Column, Task } from "@prisma/client";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import KanbanBox from "./KanbanBox";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import Dialog from "./Dialog";
import Input from "./Input";
import Button from "./Button";
import { loader } from "~/routes/_protected.projects.$projectId.board";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'

export default function KanbanColumn({
    tasks,
    column,
    onAddTask,
    onDeleteColumn,
}: {
    tasks: Task[],
    column: Column,
    onAddTask: (e: React.FormEvent<HTMLFormElement>) => void,
    onDeleteColumn: (e: React.FormEvent<HTMLFormElement>) => void,
}) {
    // TODO: Render the Tasks here, configure adding new tasks, and setup deleting columns
    const navigation = useNavigation();
    const { projectId, projectMembers } = useLoaderData<typeof loader>();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: column.id,
        data: { type: "COLUMN", accepts: ["TASK"], column }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-background min-w-64 w-full border border-accent rounded-2xl opacity-60">
            </div>
        );
    }

    return (
        <div
            style={style}
            ref={setNodeRef}
            className="w-full"
        >
            <div
                className="group grid grid-cols-1 grid-rows-[auto_1fr] justify-between items-start gap-4 h-full group w-full min-w-64">
                <div
                    className="flex justify-between items-center w-full bg-secondary/40 rounded-full p-2 transition-opacity">
                    <p className="px-2"> {column.name} <span className="text-accent">{tasks.length}</span></p>
                    <div className="flex gap-2 items-center">
                        <Form
                            method="delete"
                            onSubmit={onDeleteColumn}
                            action={`/projects/${projectId}/board`}
                            className="transition-colors p-1 items-center justify-center hidden motion-preset-slide-left-md
                            group-hover:flex hover:bg-secondary/30 hover:text-accent rounded-full">
                            <button type="submit">
                                <Trash2 size={20} />
                            </button>
                            <input name='intent' value='columnDelete' className="hidden" />
                            <input name='columnId' value={column.id} className="hidden" />
                        </Form>
                        <div
                            {...attributes}
                            {...listeners}
                            className="transition-colors flex p-1 items-center justify-center group-hover:bg-primary/20 rounded-full">
                            <GripVertical size={20} />
                        </div>
                        <Dialog
                            title={`Add Task to ${column.name}`}
                            trigger={
                                <div className="bg-primary/20 rounded-full p-px border border-transparent transition-colors
                                    hover:bg-primary/40 hover:text-accent hover:border-accent">
                                    <Plus size={24} />
                                </div>
                            }
                        >
                            <Form
                                method="post"
                                action={`/projects/${projectId}/board`}
                                className="flex flex-col w-full items-center gap-4 mt-2"
                                onSubmit={onAddTask}
                            >
                                <Input
                                    type="text"
                                    name="taskName"
                                    placeholder="Enter Task Name"
                                    required={true}
                                    autoComplete="off"
                                />
                                <Input
                                    type="text"
                                    name="taskDesc"
                                    placeholder="Enter Task Description"
                                    required={false}
                                />
                                <div className="flex items-center justify-start w-full gap-4">
                                    <p className="">Assignee: </p>
                                    <select name="assignedMemberId" className="w-full rounded-full p-2 bg-secondary/40">
                                        {projectMembers.map((member) => {
                                            return (
                                                <option key={member.id} value={member.id}>
                                                    {member.user.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <input type="text" name="columnId" value={column.id} className="hidden" />
                                <div className="flex w-full justify-between items-center">
                                    <div />
                                    <Button
                                        type="submit"
                                        name="intent"
                                        value="taskCreate"
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
                <div className="flex flex-col w-full h-full gap-4 overflow-y-auto py-2 scrollbar-hide">
                    <SortableContext strategy={verticalListSortingStrategy} items={tasks.map(t => t.id)}>
                        {tasks
                            .sort((a, b) => (b.position ?? 0) - (a.position ?? 0))
                            .map((task, index) => {
                                return (
                                    <KanbanBox
                                        key={index}
                                        task={task}
                                        tags={["hell"]}
                                        date={`${task.createdAt.getDate()}/${task.createdAt.getMonth()}/${task.createdAt.getFullYear()}`}
                                        assigneePic={task.assignedMemberPic || ''}
                                    />
                                );

                            })}
                    </SortableContext>
                </div>
            </div>
        </div>
    )
}

