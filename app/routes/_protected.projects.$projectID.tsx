import { Outlet } from "@remix-run/react";
import Dock from "components/Dock";

export default function Layout() {
    return (
        <>
            <Outlet />
            <div className="absolute bottom-4 flex justify-center w-full">
                <Dock />
            </div>
        </>
    )
}

