import { Column, Task } from "@prisma/client";
import { Plus } from "lucide-react";
import KanbanBox from "./KanbanBox";
import { Form, useNavigation } from "@remix-run/react";
import Dialog from "./Dialog";
import Input from "./Input";
import Button from "./Button";

export default function KanbanColumn({
    tasks,
    column,
    projectId
}: {
    tasks: Task[],
    column: Column,
    projectId: string,
}) {
    // TODO: Render the Tasks here, configure adding new tasks, and setup deleting columns
    const navigation = useNavigation();
    return (
        <div className="group grid grid-cols-1 grid-rows-[auto_1fr] justify-between items-start gap-4 h-full group transition-all w-full min-w-52">
            <div className="flex justify-between items-center w-full bg-secondary/40 rounded-full p-2">
                <p className="px-2"> {column.name} </p>
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
                    >
                        <Input
                            type="text"
                            name="taskName"
                            placeholder="Enter Task Name"
                            required={true}
                        />
                        <Input
                            type="text"
                            name="taskDesc"
                            placeholder="Enter Task Description"
                            required={false}
                        />
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
            <div className="flex flex-col justify-start items-center w-full h-full gap-4 overflow-y-auto py-2 scrollbar-hide">
                {tasks.map((task, index) => {
                    return (
                        <KanbanBox
                            key={index}
                            task_name={task.name}
                            task_description={task.desc || ''}
                            tags={["hell"]}
                            date={`${task.createdAt.getDate()}/${task.createdAt.getMonth()}/${task.createdAt.getFullYear()}`}
                            logo={'/'}
                        />
                    );

                })}
            </div>
        </div>
    )
}

