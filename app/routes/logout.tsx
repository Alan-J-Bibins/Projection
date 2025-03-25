import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    return authenticator.logout(request, {
        redirectTo: "/"
    });
};

