import { redirect, useNavigate, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import Button from "~/components/Button";
import { signOut, useSession } from "~/lib/auth-client";

export default function Page() {
    const { data: session } = useSession();
    const navigate = useNavigate();
    return (
        <div>
            <h3 className="text-3xl"> <strong>Username</strong>: {session?.user.name} </h3>
            <h3 className="text-3xl"><strong>Email</strong>: {session?.user.email} </h3>
            <Button onClick={() => {
                signOut({ fetchOptions: { onSuccess: () => { navigate('/') } } });
            }} variant="secondary">Sign Out</Button>
        </div>
    );
}
