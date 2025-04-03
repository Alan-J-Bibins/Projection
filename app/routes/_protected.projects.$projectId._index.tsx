import { Form } from '@remix-run/react';
import Dialog from 'components/Dialog';
import { Plus } from 'lucide-react';

function Meetings() {
    return (
        <div className="flex flex-col w-full items-center justify-start bg-secondary/20 p-4 rounded-2xl border border-primary/20">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-righteous">Meetings</h2>
                <Dialog title="New Meeting" trigger={<Plus />}>
                    <Form></Form>
                </Dialog>
            </div>
        </div>
    );
}

function Overview() {
    return (
        <div className="flex flex-col w-full items-center justify-start bg-secondary/20 p-4 rounded-2xl border border-primary/20">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-righteous">Project Overview</h2>
            </div>
        </div>
    );
}

function Todo() {
    return (
        <div className="flex flex-col w-full items-center justify-start bg-secondary/20 p-4 rounded-2xl border border-primary/20">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-righteous">Assigned Tasks</h2>
            </div>
        </div>
    );
}
function Activity() {
    return (
        <div className="flex flex-col w-full items-center justify-start bg-secondary/20 p-4 rounded-2xl border border-primary/20">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-righteous">Recent Activity</h2>
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <main className="flex gap-4 justify-between w-full items-start">
            <div className="flex flex-col h-full w-full justify-start items-center gap-4">
                <Meetings />
                <Todo />
            </div>
            <div className="flex flex-col h-full w-full justify-start items-center gap-4">
                <Overview />
                <Activity />
            </div>
        </main>
    );
}
