import { Form } from "@remix-run/react";

export default function Searchbar() {
    return (
        <Form className="w-full">
            <input 
                type="text"
                className="w-full p-2 rounded-2xl bg-transparent border border-primary/40 transition-colors
                focus:border-primary focus:outline-none placeholder:text-primary/40 focus:placeholder:text-primary"
                placeholder="Search for people, projects or tasks"
            />
        </Form>
    )
}

