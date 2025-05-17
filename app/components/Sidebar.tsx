import { Link, useLocation } from 'react-router';
import ThemeSelect from './ThemeSelect';
import {
    LuFolderTree,
    LuSlidersHorizontal,
    LuUsersRound,
} from 'react-icons/lu';
import { type IconType } from 'react-icons'
import { useState } from 'react';

function SidebarItem({
    href,
    Icon,
    label,
    isExpanded,
}: {
    href: string;
    label: string;
    Icon: IconType;
    isExpanded: boolean;
}) {
    const pathname = useLocation().pathname.split('/')[1];
    return (
        <Link
            to={href}
            className={`grid gap-2 p-4 justify-items-start items-center content-center transition-all duration-200
        rounded-2xl border border-transparent group-hover:bg-secondary/10 group-hover:border-secondary/40
        group-hover:hover:bg-secondary/40
        ${isExpanded ? 'grid-cols-[auto_1fr] w-32' : 'grid-cols-1 w-14'}
        ${pathname === href.split('/')[1]
                    ? 'border-t-primary/20 border-b-primary dark:border-b-accent border-x-secondary/20 group-hover:border-t-primary/20 group-hover:border-b-primary group-hover:dark:border-b-accent group-hover:border-x-secondary/20 shadow-xl dark:shadow-accent/25 shadow-primary/25'
                    : ''
                }`}
        >
            <Icon size={20} className="justify-self-start mx-px" />
            <p
                className={`${isExpanded
                    ? 'motion-opacity-in-0 -motion-translate-x-in-50 motion-duration-150'
                    : 'motion-translate-x-out-100 motion-duration-200 hidden'
                    }`}
                style={{ lineHeight: 0 }}
            >
                {label}
            </p>
        </Link>
    );
}

function DesktopSidebar({ name, pic }: { name: string; pic?: string }) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <nav
            className="h-full flex flex-col items-start justify-between px-4 py-8 group"
            onMouseOver={() => setIsExpanded(true)}
            onMouseOut={() => setIsExpanded(false)}
        >
            <div className="w-full font-righteous text-primary space-y-2">
                <SidebarItem
                    href="/projects"
                    label="Projects"
                    Icon={LuFolderTree}
                    isExpanded={isExpanded}
                />
                <SidebarItem
                    href="/teams"
                    label="Teams"
                    Icon={LuUsersRound}
                    isExpanded={isExpanded}
                />
                <SidebarItem
                    href="/settings"
                    label="Settings"
                    Icon={LuSlidersHorizontal}
                    isExpanded={isExpanded}
                />
            </div>
            <Link
                to={'/profile'}
                className={`grid gap-2 p-4 justify-items-start items-center content-center transition-all duration-200
            ${isExpanded ? 'grid-cols-[auto_1fr] w-32' : 'grid-cols-1 w-14'}`}
            >
                {pic ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                            src={pic}
                            alt="pfp"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="p-4 rounded-full bg-secondary dark:bg-text" />
                )}
                <p
                    className={`truncate w-14 ${isExpanded
                        ? 'motion-opacity-in-0 -motion-translate-x-in-50 motion-duration-150'
                        : 'motion-translate-x-out-100 motion-duration-200 hidden'
                        }`}
                >
                    {name.split(' ')[0]}
                </p>
            </Link>
        </nav>
    );
}

function MobileSidebar() {
    return (
        <nav className="h-full flex flex-col items-start justify-between px-4 py-8 group">
            <div className="w-full font-righteous text-primary space-y-2">
                <SidebarItem
                    href="/projects"
                    label="Projects"
                    Icon={LuFolderTree}
                    isExpanded={false}
                />
                <SidebarItem
                    href="/teams"
                    label="Teams"
                    Icon={LuUsersRound}
                    isExpanded={false}
                />
                <SidebarItem
                    href="/settings"
                    label="Settings"
                    Icon={LuSlidersHorizontal}
                    isExpanded={false}
                />
            </div>
            <ThemeSelect />
        </nav>
    );
}

export default function Sidebar({ name, pic }: { name: string; pic?: string }) {
    return (
        <>
            <div className="hidden md:block">
                <DesktopSidebar name={name} pic={pic} />
            </div>
            <div className="block md:hidden">
                <MobileSidebar />
            </div>
        </>
    );
}

