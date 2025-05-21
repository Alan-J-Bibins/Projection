import { redirect } from "react-router";
import { auth } from "./auth.server";

export async function authenticateSession(request: Request) {
    const session = await auth.api.getSession(request);
    if (!session) {
        throw redirect('/');
    }
    return { session }
}

export async function getUser(request: Request) {
    const session = await auth.api.getSession(request);
    const user = session?.user;
    if (!user) throw new Response('Unauthorized', { status: 401 })
    return user;
}
