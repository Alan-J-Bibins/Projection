import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import LoginButton from './login';
import { authenticator } from '~/services/auth.server';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: "/projects",
    });
    return { user };
};

export default function Index() {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <p className='font-righteous text-9xl text-accent motion-preset-focus-md motion-duration-150 motion-delay-1000'>Projection</p>
            <LoginButton />
        </div>
    );
}
