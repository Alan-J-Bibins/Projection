import { Form } from '@remix-run/react';
import Button from 'components/Button';
export const loader = () => {
    return null;
};

export default function LoginButton({ text }: { text?: string }) {
    return (
        <Form action="/auth/google" method="post">
            <Button type="submit">{text ?? 'Login with Google'}</Button>
        </Form>
    );
}
