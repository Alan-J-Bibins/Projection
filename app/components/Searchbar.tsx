import { Form } from 'react-router';
import { LucideIcon } from './LucideIcon';

export default function Searchbar() {
    return (
        <Form
            className="group w-full p-2 rounded-2xl flex justify-between items-center gap-2
            bg-transparent border border-primary/40 transition-colors focus-within:border-primary"
        >
            <input
                type="text"
                className="w-full bg-transparent focus:outline-none placeholder:text-primary/40 focus:placeholder:text-primary"
                placeholder="Search for people, projects or tasks"
            />
            <LucideIcon name='LuSend' fontSize={20} className="text-primary/40 group-focus-within:text-primary" />
        </Form>
    );
}

