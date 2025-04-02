import { Form } from '@remix-run/react';
import Button from 'components/Button';
export const loader = () => {
    return null;
};

export default function LoginButton() {
    return (
        <Form action="/auth/google" method="post">
            <Button type="submit">Login with Google</Button>
        </Form>
    );
}
