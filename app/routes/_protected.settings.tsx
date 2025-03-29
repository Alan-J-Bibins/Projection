import { LoaderFunctionArgs } from "@remix-run/node";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    return { user };
};

export default function Page() {
    return <div>Settings Page</div>;
}
