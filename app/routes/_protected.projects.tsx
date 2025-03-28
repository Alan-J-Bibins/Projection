import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import KanbanBox from "components/KanbanBox"
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
        <KanbanBox  task_name="task name" task_description= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si." logo= "" tags={["hello", "byebye", "category 1", "2", "VERY LONG CATEGORY NAME"]} date = "9/11/2001" />
            <p>Welcome {user.name}</p>
            <Form action="/logout" method="post">
                <button type="submit">
                    Logout
                </button>
            </Form>
        </div>
    );
}
