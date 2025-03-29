import { Link, useLocation } from "@remix-run/react";
import { ThemeToggle } from "./ThemeToggle";
import { FolderTree, LucideIcon, SlidersHorizontal, UsersRound } from "lucide-react";
import { useState } from "react";

function SidebarItem({ href, Icon, label, isExpanded }: { href: string, label: string, Icon: LucideIcon, isExpanded: boolean }) {
    const pathname = useLocation().pathname.split('/')[1];
    return (
        <Link to={href} className={`grid gap-2 p-4 justify-items-start items-center content-center transition-all duration-200
        rounded-2xl border border-transparent group-hover:bg-secondary/10 group-hover:border-secondary/40
        group-hover:hover:bg-secondary/40
        ${isExpanded ? 'grid-cols-[auto_1fr] w-32' : 'grid-cols-1 w-14'}
        ${pathname === href.split('/')[1]
                ? 'border-t-primary/20 border-b-primary dark:border-b-accent border-x-secondary/20 group-hover:border-t-primary/20 group-hover:border-b-primary group-hover:dark:border-b-accent group-hover:border-x-secondary/20 shadow-xl dark:shadow-accent/25 shadow-primary/25'
                : ''}`}
        >
            <Icon size={20} className="justify-self-start mx-px" />
            <p
                className={`${isExpanded
                    ? 'motion-opacity-in-0 -motion-translate-x-in-50 motion-duration-150'
                    : 'motion-translate-x-out-100 motion-duration-200 hidden'}`}
                style={{ lineHeight: 0 }}
            >
                {label}
            </p>
        </Link>

    );
}

function DesktopSidebar({ name }: { name: string }) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <nav
            className="h-full flex flex-col items-start justify-between px-4 py-8 group"
            onMouseOver={() => setIsExpanded(true)}
            onMouseOut={() => setIsExpanded(false)}
        >
            <div className="w-full font-righteous text-primary space-y-2">
                <SidebarItem href="/projects" label="Projects" Icon={FolderTree} isExpanded={isExpanded} />
                <SidebarItem href="/teams" label="Teams" Icon={UsersRound} isExpanded={isExpanded} />
                <SidebarItem href="/settings" label="Settings" Icon={SlidersHorizontal} isExpanded={isExpanded} />
            </div>
            <Link to={'/profile'} className={`grid gap-2 p-4 justify-items-start items-center content-center transition-all duration-200
            ${isExpanded ? 'grid-cols-[auto_1fr] w-32' : 'grid-cols-1 w-14'}`}
            >
                <div className="p-4 bg-white rounded-full" />
                <p
                    className={`truncate w-14 ${isExpanded
                        ? 'motion-opacity-in-0 -motion-translate-x-in-50 motion-duration-150'
                        : 'motion-translate-x-out-100 motion-duration-200 hidden'}`}
                >
                    {name.split(' ')[0]}
                </p>
            </Link>
        </nav>
    );
}

function MobileSidebar() {
    return (
        <nav
            className="h-full flex flex-col items-start justify-between px-4 py-8 group"
        >
            <div className="w-full font-righteous text-primary space-y-2">
                <SidebarItem href="/projects" label="Projects" Icon={FolderTree} isExpanded={false} />
                <SidebarItem href="/teams" label="Teams" Icon={UsersRound} isExpanded={false} />
                <SidebarItem href="/settings" label="Settings" Icon={SlidersHorizontal} isExpanded={false} />
            </div>
            <ThemeToggle />
        </nav>
    );
}

export default function Sidebar({ name }: { name: string }) {
    return (
        <>
            <div className="hidden md:block">
                <DesktopSidebar name={name} />
            </div>
            <div className="block md:hidden">
                <MobileSidebar />
            </div>
        </>
    );

}
