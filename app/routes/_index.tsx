import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import LoginButton from './login';

export const meta: MetaFunction = () => {
    return [
        { title: 'Projection' },
        { name: 'description', content: 'Welcome to Projection!' },
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
