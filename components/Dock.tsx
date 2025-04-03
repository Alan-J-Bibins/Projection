import { useLocation, useNavigate } from '@remix-run/react';
import {
    ChartBarBig,
    LayoutDashboard,
    LucideIcon,
    Settings2,
    SquareDashedBottomCode,
    SquareDashedKanban,
} from 'lucide-react';

export default function Dock() {
    return (
        <div
            className="w-fit flex justify-center items-center gap-4 bg-secondary/40 py-2 px-4 rounded-2xl overflow-hidden motion-blur-in-md motion-preset-slide-up-md
            border border-primary/20 hover:border-primary transition-colors shadow-lg hover:shadow-primary/25"
        >
            <DockItem Icon={LayoutDashboard} to="" />
            <DockItem Icon={SquareDashedKanban} to="board" />
            <DockItem Icon={ChartBarBig} to="timeline" />
            <DockItem Icon={SquareDashedBottomCode} to="code" />
            <DockItem Icon={Settings2} to="settings" />
        </div>
    );
}

function DockItem({ Icon, to }: { Icon: LucideIcon; to: string }) {
    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    const pathnameArr = pathname.concat('/').split('/');
    return (
        <button
            onClick={() => {
                navigate(`./${to}`);
            }}
            className={`p-2 flex items-center justify-center shadow-xl bg-gradient-to-t from-primary/40 to-secondary/40
            border border-x-secondary border-t-primary/20 border-b-primary/40 rounded-2xl transition-all
            hover:bg-primary/20
            ${pathnameArr[3] === to ? 'text-accent border-t-accent/45 border-r-accent/25 border-l-primary/20 border-b-secondary shadow-accent/25' : 'text-primary shadow-black/25'}
        `}
        >
            <Icon size={24} />
        </button>
    );
}
