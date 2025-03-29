import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import BreadCrumbs from "components/BreadCrumbs";
import Searchbar from "components/Searchbar";
import Sidebar from "components/Sidebar";
import { ThemeToggle } from "components/ThemeToggle";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    return { user };
};

export default function Layout() {
    const { user } = useLoaderData<typeof loader>();
    const name = user.name;
    return (
        <main className="flex h-full">
            <Sidebar name={name} />
            <div className="space-y-2 bg-gradient-to-r from-secondary/20 to-secondary/35 border-l border-primary/20 p-8 rounded-l-2xl w-full h-full">
                <div className="w-full flex gap-4 items-center">
                    <Searchbar />
                    <ThemeToggle />
                </div>
                <BreadCrumbs />
                <Outlet />
            </div>
        </main>
    );
}
