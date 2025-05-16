import { signIn, signOut, useSession } from "~/lib/auth-client"

export default function Page() {
    const { data: session } = useSession();
    return (
        <div>
            <button
                onClick={() => {
                    signIn.social({
                        provider: "google",
                        callbackURL: "/projects",
                        errorCallbackURL: "/",
                    })
                }}
                className="p-4 bg-primary/20 hover:bg-secondary/20">
                Sign in with Google
            </button>
            {session && (
                <button
                    onClick={() => {
                        signOut()
                    }}
                    className="p-4 bg-primary/20 hover:bg-secondary/20">
                    Sign Out
                </button>
            )}
        </div>
    )
}

