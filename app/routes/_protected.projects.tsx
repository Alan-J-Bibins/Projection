import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/"
    });
    return { user };
};


export default function Page() {
    const { user } = useLoaderData<typeof loader>();

    return (
        <div>
            Projects Page
            <p>Welcome {user.name}</p>
            <Form action="/logout" method="post">
                <button type="submit">
                    Logout
                </button>
            </Form>
        </div>
    );
}
