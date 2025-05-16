import { redirect } from "react-router";
import { auth } from "./auth.server";

export async function authenticateSession(request: Request) {
    const session = await auth.api.getSession(request);
    console.log(session);
    if (!session) {
        throw redirect('/');
    }
    return { session }
}

