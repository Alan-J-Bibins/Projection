import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import Button from 'components/Button';
import { getUser } from '~/utils/actions';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    return { user };
};

export default function Layout() {
    const { user } = useLoaderData<typeof loader>();
    return (
        <main className="h-full">
            <h3 className="text-xl">Username: {user.name}</h3>
            <p>Email: {user.email}</p>
            <Form action="/logout" method="post">
                <Button type="submit">Logout</Button>
            </Form>
        </main>
    );
}
