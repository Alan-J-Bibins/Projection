import { LucideIcon } from "./LucideIcon";

export default function ProjectCard({ projectName, projectDesc }: { projectName: string, projectDesc: string }) {
    return (
        <div
            className="w-full p-4 flex items-center justify-between group transition-all
            border border-primary/20 rounded-2xl bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-none active:translate-y-1
            hover:shadow-accent/25 hover:shadow-lg hover:border-b-accent hover:border-x-secondary/20 hover:text-accent hover:-translate-y-1 hover:bg-primary/10
            "
        >
            <h4>{projectName}</h4>
            <LucideIcon name="LuChevronRight"/>
        </div>
    )
}

