import { LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    return { user };
};

export default function Layout() {
    return (
        <main className="h-full">
            <Form action="/logout" method="post">
                <button type="submit">Logout</button>
            </Form>

        </main>
    );
}
