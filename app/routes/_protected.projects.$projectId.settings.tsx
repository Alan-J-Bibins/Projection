import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import Button from 'components/Button';
import { getUser } from '~/utils/actions';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    const projectId = params.projectId;
    console.log('User in Settings', user);
    return { user, projectId };
};

export default function Page() {
    const { user, projectId } = useLoaderData<typeof loader>();
    return (
        <div>
            <Form method="delete" action={`/projects/${projectId}`}>
                <input
                    defaultValue={user.id}
                    name="userId"
                    className="hidden"
                />
                <Button type="submit" variant="critical">
                    Delete Project
                </Button>
            </Form>
        </div>
    );
}
