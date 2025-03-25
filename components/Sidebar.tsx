import { Link, useLocation } from "@remix-run/react";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { FolderTree, LucideIcon, SlidersHorizontal, UsersRound } from "lucide-react";

function SidebarItem({ href, Icon, label }: { href: string, label: string, Icon: LucideIcon }) {
    const pathname = useLocation().pathname.split('/')[1];
    return (
        <Link to={href} className={`flex gap-2 p-4 justify-start items-center w-full transition-all duration-200
            rounded-2xl border border-transparent group-hover:bg-secondary/10 group-hover:border-secondary/40
            group-hover:hover:bg-secondary/40
            ${pathname === href.split('/')[1] ? 'border-t-primary/20 border-b-primary dark:border-b-accent border-x-secondary/20 group-hover:border-t-primary/20 group-hover:border-b-primary group-hover:dark:border-b-accent group-hover:border-x-secondary/20 shadow-xl dark:shadow-accent/25 shadow-primary/25' : ''}`}
        >
            <Icon size={20} />
            {label}
        </Link>

    );
}

export default function Sidebar() {
    return (
        <nav className="flex flex-col items-start justify-between px-4 py-8 group">
            <Logo />
            <div className="w-full font-righteous text-primary space-y-2">
                <SidebarItem href="/projects" label="Projects" Icon={FolderTree} />
                <SidebarItem href="/teams" label="Teams" Icon={UsersRound} />
                <SidebarItem href="/settings" label="Settings" Icon={SlidersHorizontal} />
            </div>
            <ThemeToggle />
        </nav>
    );
}
