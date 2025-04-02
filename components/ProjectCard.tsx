import { Link } from '@remix-run/react';
import { ChevronRight } from 'lucide-react';

export default function ProjectCard({
    to,
    id,
    label,
}: {
    to: string;
    id: string;
    label: string;
}) {
    return (
        <Link
            to={to}
            className="w-full p-4 flex items-center justify-between group transition-all
            border border-primary/20 rounded-2xl bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-none active:translate-y-1
            hover:shadow-accent/25 hover:shadow-lg hover:border-b-accent hover:border-x-secondary/20 hover:text-accent hover:-translate-y-1 hover:bg-primary/10
            "
        >
            <h4> {label} </h4>
            <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
            />
        </Link>
    );
}

export function ProjectCardLoading() {
    return (
        <div
            className="w-full p-4 flex items-center justify-between group transition-all gap-20
            border border-primary/20 rounded-2xl bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-none active:translate-y-1
            hover:shadow-accent/25 hover:shadow-lg hover:border-b-accent hover:border-x-secondary/20 hover:text-accent hover:-translate-y-1 hover:bg-primary/10
            "
        >
            <div className="w-full h-3 rounded-full bg-secondary animate-pulse" />
            <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
            />
        </div>
    );
}
