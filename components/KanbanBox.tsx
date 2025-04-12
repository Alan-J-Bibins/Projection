import { useSortable } from "@dnd-kit/sortable";
import { Task } from "@prisma/client";
import { CalendarDays, CircleCheckBig } from "lucide-react";
import { CSS } from '@dnd-kit/utilities'
import { Form } from "@remix-run/react";

export default function KanbanBox({
    task,
    assigneePic,
    tags,
    date,
    onTaskDelete,
}: {
    task: Task
    assigneePic: string,
    tags: string[],
    onTaskDelete: (e: React.FormEvent<HTMLFormElement>) => void,
    date: string,
}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'TASK',
            fromColumnId: task.columnId,
            task,
            position: task.position,
        },
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
            {...attributes}
            {...listeners}
            className="w-full"
        >
            <div
                className="w-full flex flex-col p-4 border border-primary/20 rounded-2xl transition-all h-full
                bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-md 
                hover:bg-primary/10 hover:shadow-xl hover:border-b-accent hover:shadow-accent/25">
                <div className="flex w-full items-start justify-between ">
                    <h3 className="font-bold">{task.name}</h3>
                    <img src={assigneePic} alt="logo" className="w-6 h-6 rounded-full" />
                </div>
                {task.desc && (
                    <p className="text-sm ">{task.desc}</p>
                )}
                <div className="flex w-full justify-between items-center ">
                    <Form onSubmit={onTaskDelete}>
                        <button className="px-2 py-1 rounded-full hover:bg-secondary/40 hidden">
                            <CircleCheckBig size={20} />
                        </button>
                    </Form>
                    <div className="flex flex-wrap gap-2 ">
                        {tags && tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-secondary text-sm px-2 py-px rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="text-primary flex items-center gap-1"><CalendarDays size={20} />{date}</div>
                </div>
            </div>
        </div>
    );
}
