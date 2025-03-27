import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Searchbar from "components/Searchbar";
import Sidebar from "components/Sidebar";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/"
    });
    return { user };
};

export default function Layout() {
    const { user } = useLoaderData<typeof loader>();
    const name = user.name;
    return (
        <main className="flex gap-4 h-full">
            <Sidebar name={name}/>
            <div className="space-y-2 bg-gradient-to-r from-secondary/20 to-secondary/35 border-l border-primary/20 p-8 rounded-l-2xl w-full h-full">
                <Searchbar />
                <Outlet />
            </div>
        </main>
    );
}
