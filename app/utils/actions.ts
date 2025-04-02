import { authenticator } from '~/services/auth.server';

export async function getUser(request: Request) {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: '/',
    });
    if (!user) {
        throw new Response('Unauthorized', { status: 401 });
    }
    return { user };
}
