import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useNavigation,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import './tailwind.css';
import { CookiesProvider } from 'react-cookie';
import { useEffect } from 'react';
import Loader from 'components/Loader';

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Righteous&display=swap',
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                const theme = document.cookie.includes('theme=dark') ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })()
            `
                    }}
                />
            </head>
            <body className='bg-background text-text font-outfit transition-colors duration-150 antialiased'>
                <CookiesProvider>
                    <main className='h-screen min-h-screen'>
                        {children}
                    </main>
                </CookiesProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    const navigation = useNavigation();
    useEffect(() => {
        const theme = document.cookie.includes('theme=dark') ? 'dark' : 'light';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    })
    return (
        <>
            {navigation.state === 'loading' && (<Loader />)}
            <Outlet />
        </>
    );

}
