import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';
import LoginButton from './login';
import { ThemeToggle } from 'components/ThemeToggle';

export const meta: MetaFunction = () => {
    return [
        { title: 'Projection' },
        { name: 'description', content: 'Welcome to Projection!' },
    ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        successRedirect: '/projects',
    });
    return { user };
};

export default function Index() {
    return (
        <div className="flex flex-col gap-10 h-full items-center justify-start bg-gradient-to-tr from-primary/40">
            <header className='flex justify-between items-center w-full px-2 md:px-12 mt-8 motion-preset-blur-down-lg'>
                <p className="font-righteous text-xl text-accent">
                    Projection
                </p>
                <div className='flex items-center gap-4'>
                    <ThemeToggle />
                    <LoginButton text='Sign In'/>
                </div>
            </header>
            <section className='h-full flex flex-col gap-0 items-center justify-around '>
                <h1 
                    className='text-6xl md:text-9xl font-righteous text-primary motion-preset-slide-right-lg'
                > Project Management. Made <span className='text-accent motion-preset-focus-lg motion-delay-500'>Simple.</span> </h1>
                <h4 className='text-lg flex flex-col items-center justify-center gap-2'>
                    <span className='motion-preset-fade'>What are you waiting for?</span>
                    <LoginButton text='Get Started'/>
                </h4>
            </section>
        </div>
    );
}
