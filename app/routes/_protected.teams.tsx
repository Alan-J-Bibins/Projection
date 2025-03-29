import { LoaderFunctionArgs } from "@remix-run/node";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    console.log(user);
    return { user };
};

export default function Page() {
    return <div>Teams Page</div>;
}
