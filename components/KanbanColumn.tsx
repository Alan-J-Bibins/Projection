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
        <div className="group grid grid-cols-1 grid-rows-[auto_1fr] justify-between items-start gap-4 h-full group transition-all">
            <div className="flex flex-col justify-center items-center w-full bg-secondary/40 rounded-2xl">
                {column.name}
            </div>
            <Dialog
                triggerClassName="w-full"
                title={`Add Task to ${column.name}`}
                trigger={
                    <div className="hidden group-hover:block w-full bg-secondary/20 p-4 rounded-2xl border border-secondary/40 transition-all
                    hover:border-accent hover:text-accent motion-preset-slide-down-md"
                    >
                        <button className="flex justify-center items-center h-full w-full">
                            <Plus size={24} />
                        </button>
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
                    <input type="text" name="columnId" value={column.id} className="hidden"/>
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
            <div className="flex flex-col justify-start items-center w-full h-full gap-4">
                {tasks.map((task, index) => {
                    return (
                        <KanbanBox
                            key={index}
                            task_name={task.name}
                            task_description={task.columnId} //temporary
                            tags={["hell"]}
                            date={task.createdAt.toISOString()}
                            logo={'/'}
                        />
                    );

                })}
            </div>
        </div>
    )
}

