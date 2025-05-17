import { Outlet, type LoaderFunctionArgs } from "react-router";
import BreadCrumbs from "~/components/BreadCrumbs";
import Searchbar from "~/components/Searchbar";
import Sidebar from "~/components/Sidebar";
import ThemeSelect, { getTheme } from "~/components/ThemeSelect";
import { useSession } from "~/lib/auth-client";
import { authenticateSession } from "~/lib/utils.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticateSession(request);
    console.log('protected.tsx')
}

export default function Layout() {
    const { data: session } = useSession();
    return (
        <main className="flex h-full">
            <Sidebar name={session?.user.name || "Alan"} />
            <div className={`flex flex-col justify-start gap-4 items-start overflow-hidden bg-secondary/20
                border-l border-primary/20 p-8 pb-0 rounded-l-2xl w-full h-full`}>
                <div className="w-full flex gap-4 items-center">
                    <Searchbar />
                    <ThemeSelect />
                </div>
                <BreadCrumbs />
                <Outlet />
            </div>

        </main>
    )
}

