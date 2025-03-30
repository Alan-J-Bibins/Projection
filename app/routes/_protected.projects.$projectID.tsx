import { Outlet } from "@remix-run/react";
import Dock from "components/Dock";

export default function Layout() {
    return (
        <>
            <Outlet />
            <Dock />
        </>
    )
}

