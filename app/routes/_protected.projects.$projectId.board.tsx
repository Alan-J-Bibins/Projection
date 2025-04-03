import { Column, PrismaClient, Task } from '@prisma/client';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import KanbanColumn from 'components/KanbanColumn';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getUser } from '~/utils/actions';

export type KanbanBoard = {
    columns: (Column & { tasks: Task[] })[];
}

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
                        tasks: true,
                    },
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
                            { name: 'In Progress' },
                            { name: 'Done' },
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
            const queryResponse = await prisma.column.create({
                data: {
                    name: columnName,
                    board: { connect: { projectId: projectId } },
                },
                include: {
                    tasks: true
                }
            })
            console.log(queryResponse);
            break;
        }
        case 'delete': {
            const columnName = formData.get('columnName');
            console.log(`Delete ${columnName}`);
            break;
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
            console.log("CHEEse", assignedMemberPic);
            const taskDesc = String(formData.get('taskDesc'));
            const columnId = String(formData.get('columnId'));
            console.log(`Add ${taskName}`);
            const queryResponse = await prisma.task.create({
                data: {
                    name: taskName,
                    desc: taskDesc,
                    columnId: columnId,
                    assignedMemberId: assignedMemberId,
                    assignedMemberPic: assignedMemberPic
                }
            });
            console.log("Task Created", queryResponse);
            break;
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
    const [kanban, setKanban] = useState<KanbanBoard>(board);
    console.log("DNDBOARD", kanban);
    return (
        <div className="h-[90%] flex flex-col gap-4 ">
            <div className='flex items-start justify-start gap-4 w-full h-full'>
                <div className='w-full overflow-x-auto h-full scrollbar-thin scrollbar-thumb-background'>
                    <div
                        className={`flex gap-4 h-full pb-4`}
                    >
                        {kanban.columns.map((column, index) => {
                            return <KanbanColumn
                                column={column}
                                key={index}
                                tasks={board.columns[index].tasks}
                            />;
                        })}
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
