import type { ComponentPropsWithoutRef } from "react";

export default function Input({
    type,
    name,
    ...props
}: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            {...props}
            type={type}
            name={name}
            className="form-input"
            onKeyDown={(e) => {
                if (e.key === 'Space') return;
            }}
        />
    );
}

