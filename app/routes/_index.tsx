import type { MetaFunction } from '@remix-run/node';
import { ThemeToggle } from 'components/ThemeToggle';

export const meta: MetaFunction = () => {
    return [
        { title: 'New Remix App' },
        { name: 'description', content: 'Welcome to Remix!' },
    ];
};

export default function Index() {
    return (
        <div className="flex h-screen items-center justify-center">
            <ThemeToggle />
            <p className='font-righteous text-9xl text-accent'>Projection</p>
        </div>
    );
}
