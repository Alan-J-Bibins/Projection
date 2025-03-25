import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/"
    });
    return { user };
};

export default function Page() {
    return <div>Teams Page</div>;
}
