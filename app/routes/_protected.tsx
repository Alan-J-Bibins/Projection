import type { LoaderFunctionArgs } from "react-router";
import { authenticateSession } from "~/lib/utils.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticateSession(request);
    console.log('protected.tsx')
}
