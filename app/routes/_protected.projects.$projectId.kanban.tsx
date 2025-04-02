import { PrismaClient } from '@prisma/client';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import Button from 'components/Button';
import Dialog from 'components/Dialog';
import Input from 'components/Input';
import KanbanBox from 'components/KanbanBox';
import { getUser } from '~/utils/actions';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const projectId = params.projectId || '';
    const { user } = await getUser(request);
    const prisma = new PrismaClient();

    try {
        // First try to find existing board
        let board = await prisma.board.findUnique({
            where: { projectId: projectId },
            include: {
                Column: {
                    include: {
                        Task: true,
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
                    Column: {
                        create: [
                            { name: 'To Do' },
                            { name: 'In Progress' },
                            { name: 'Done' },
                        ],
                    },
                },
                include: {
                    Column: {
                        include: {
                            Task: true,
                        },
                    },
                },
            });
            console.log('Created Board', board);
        }
        return { user, projectId, board };
    } catch (error) {
        console.log('Error in Kanban Page', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
export default function Kanban() {
    const { projectId, board } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    console.log('ZeBoard', board);
    return (
        <div className="space-y-4">
            <div className="w-full flex items-center justify-between">
                <div />
                <Dialog
                    title="New Column"
                    trigger={<Button>New Column</Button>}
                >
                    <Form
                        method="post"
                        action={`/projects/${projectId}/kanban`}
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
                                classNameAppend="disabled:opacity-55 disabled:border-accent disabled:shadow-none disabled:text-accent disabled:cursor-not-allowed"
                                disabled={
                                    navigation.state === 'submitting' ||
                                    navigation.state === 'loading'
                                }
                            >
                                {navigation.state === 'submitting' ||
                                navigation.state === 'loading'
                                    ? 'Submitting...'
                                    : 'Submit'}
                            </Button>
                        </div>
                    </Form>
                </Dialog>
            </div>
            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${board?.Column.length}, minmax(0, 1fr))`,
                }}
            >
                {board?.Column.map((column, index) => {
                    return <p key={index}>{column.name}</p>;
                })}
            </div>
        </div>
    );
}
