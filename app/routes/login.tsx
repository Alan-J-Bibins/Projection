import { signIn } from "~/lib/auth-client"

export default function Page() {
    return (
        <div>
            <button
                onClick={() => {
                    signIn.social({
                        provider: "google",
                        callbackURL: "/profile",
                        errorCallbackURL: "/",
                    })
                }}
                className="p-4 bg-primary/20 hover:bg-secondary/20">
                Sign in with Google
            </button>
        </div>
    )
}

