import { Outlet } from "@remix-run/react";
import Sidebar from "components/Sidebar";

export default function Layout() {
    return (
        <main className="flex gap-4 h-full">
            <Sidebar />
            <div className="bg-gradient-to-r from-secondary/20 to-secondary/35 border-l border-primary/20 p-8 rounded-l-2xl w-full h-full">
                <Outlet />
            </div>
        </main>
    );
}
