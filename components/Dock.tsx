import { useNavigate } from "@remix-run/react";
import { BotMessageSquare, ChartBarBig, LayoutDashboard, LucideIcon, SquareDashedBottomCode, SquareDashedKanban } from "lucide-react";

export default function Dock() {
    return (
        <div className="w-fit flex justify-center items-center gap-4">
            <DockItem Icon={LayoutDashboard} to='' />
            <DockItem Icon={SquareDashedKanban} to='/kanban' />
            <DockItem Icon={ChartBarBig} to='/timeline' />
            <DockItem Icon={BotMessageSquare} to='/chat' />
            <DockItem Icon={SquareDashedBottomCode} to='/code' />
        </div>
    )
}

function DockItem({ Icon, to }: { Icon: LucideIcon, to: string }) {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => { navigate(`.${to}`) }}
            className="p-4"
        >
            <Icon size={24} />
        </button>
    );
}
