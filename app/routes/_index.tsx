import { Link } from "react-router";
import ThemeSelect from "~/components/ThemeSelect";
import { useSession } from "~/lib/auth-client";

export default function Page() {
    const { data: session } = useSession();
    return (
        <div className="flex flex-col items-center justify-between h-screen">
            <div className="w-full flex justify-between">
                <div />
                <ThemeSelect />
            </div>
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-Righteous text-9xl text-accent transition-colors">Projection</h1>
                {session ? (
                    <Link to={'/projects'} className="p-4 bg-primary/20 hover:bg-secondary/20 transition-colors">Go to Projects</Link>
                ) : (
                    <Link to={'/login'} className="p-4 bg-primary/20 hover:bg-secondary/20 transition-colors">Login</Link>
                )}
            </div>
            <div />
        </div>
    )
}

