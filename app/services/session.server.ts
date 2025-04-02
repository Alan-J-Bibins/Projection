import { createCookieSessionStorage } from '@remix-run/node';
import { User } from './auth.server';

export const sessionStorage = createCookieSessionStorage<{ user: User }>({
    cookie: {
        name: '_session',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === 'production',
    },
});
