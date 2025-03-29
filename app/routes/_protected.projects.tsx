import { LoaderFunctionArgs } from "@remix-run/node";
import Button from "components/Button";
import { Folders, PackagePlus } from "lucide-react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/"
    });
    return { user };
};


export default function Page() {
    return (
        <main className="flex flex-col justify-start items-center gap-8">
            <section className="w-full flex flex-col items-center space-y-8">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-4xl font-righteous">My Projects</h1>
                    <Button>
                        <div className="flex justify-center items-center gap-1">
                            <PackagePlus size={20} />
                            New Project
                        </div>
                    </Button>
                </div>
                <Folders size={24} className="size-32 text-secondary"/>
                <span className="text-secondary">Oops! Looks like you haven&apos;t made any projects</span>
            </section>
            <section className="w-full flex flex-col items-center space-y-8">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-4xl font-righteous">Joined Projects</h1>
                </div>
                <Folders size={24} className="size-32 text-secondary"/>
                <span className="text-secondary">Oops! Looks like you haven&apos;t made any projects</span>
            </section>
        </main>
    );
}
