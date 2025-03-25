import { Form } from "@remix-run/react";
export const loader = () => {
    return null;
};

export default function LoginButton() {
    return (
        <Form action="/auth/google" method="post">
            <button type="submit">Login with Google</button>
        </Form>
    );
}

