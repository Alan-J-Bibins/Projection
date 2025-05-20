import type { ComponentPropsWithoutRef } from "react";

export default function Button({
    variant = "primary",
    onClick,
    children,
    type = "button",
    ...props
}:
    ComponentPropsWithoutRef<"button"> &
    { variant?: "primary" | "secondary" }
) {
    const primary = `bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/20 shadow-lg shadow-secondary/25 text-primary/80 
    not-disabled:hover:border-primary not-disabled:hover:text-primary not-disabled:hover:shadow-xl not-disabled:hover:shadow-primary/25 transition-all`;
    const secondary = `bg-accent/10 rounded-2xl border border-accent/20 text-accent/60 shadow-lg shadow-accent/10
    not-disabled:hover:border-accent not-disabled:hover:text-accent transition-all`;
    return (
        <button
            {...props}
            onClick={onClick}
            type={type}
            className={`flex justify-center items-center gap-2 py-2 px-4 ${variant === "primary" ? primary : secondary}
            disabled:opacity-50 disabled:cursor-not-allowed
            `}
        >
            {children}
        </button>
    )
}

