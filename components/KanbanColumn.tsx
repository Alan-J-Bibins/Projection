import { Task } from "@prisma/client";
import { Plus } from "lucide-react";
import KanbanBox from "./KanbanBox";
import { Form } from "@remix-run/react";

export default function KanbanColumn({
    name,
    tasks,
    columnId,
    projectId
}: {
    name: string,
    tasks: Task[],
    columnId: string
    projectId: string,
}) {
    // TODO: Render the Tasks here, configure adding new tasks, and setup deleting columns
    return (
        <div className="group flex flex-col justify-between items-center gap-4 h-full group">
            <div className="flex flex-col justify-center items-center w-full bg-secondary/40 rounded-2xl">
                {name}
            </div>
            <Form
                method="post"
                action={`/projects/${projectId}/board`}
                className="hidden group-hover:block w-full bg-secondary/20 p-4 rounded-2xl border border-secondary/40 transition-all
                hover:border-accent hover:text-accent motion-preset-slide-down-md"
            >
                <button className="flex justify-center items-center h-full w-full">
                    <Plus size={24} />
                </button>
            </Form>
            <div className="flex flex-col justify-start items-center w-full h-full gap-4">
                {tasks.map((task, index) => {
                    return (
                        <KanbanBox
                            key={index}
                            task_name={task.name}
                            task_description={task.columnId}
                            tags={["hell"]}
                            date={task.columnId}
                            logo={'/'}
                        />
                    );

                })}
            </div>
        </div>
    )
}

