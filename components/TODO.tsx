import { Task } from "@prisma/client";
import { CalendarDays } from "lucide-react";

export default function Todo({
    task,
    tags,
    date,
}: {
    task: Task
    tags: string[];
    date: string;
}) {
    return (
        <div className="w-full flex flex-col items-start justify-start p-4 border border-primary/20 rounded-2xl transition-all
            bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-md 
            hover:bg-primary/10 hover:-translate-y-1 hover:shadow-xl hover:border-b-accent hover:shadow-accent/25">
            <div className="flex w-full items-start justify-between ">
                <h3 className="font-bold">{task.name}</h3>
                <div className="text-primary flex items-center gap-1"><CalendarDays size={16} />{date}</div>
            </div>
            <div className="flex w-full justify-between items-center ">
                <div className="flex flex-wrap gap-2 ">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-secondary text-sm px-2 py-px rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
