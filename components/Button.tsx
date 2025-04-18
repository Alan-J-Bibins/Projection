export default function Button({
    type = 'button',
    children,
    disabled = false,
    variant = 'primary',
    className,
    classNameAppend,
    value,
    name
}: {
    classNameAppend?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'critical';
    value?: string
    name?: string
}) {
    if (variant === 'primary') {
        return (
            <button
                disabled={disabled}
                type={type}
                name={name}
                value={value}
                className={!className ? `${classNameAppend} py-2 px-4 text-primary bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/20 shadow-lg shadow-secondary/25
                hover:border-primary hover:shadow-xl hover:shadow-primary/25 transition-all` : `${className}`}
            >
                {children}
            </button>
        );
    } else if (variant === 'critical') {
        return (
            <button
                type={type}
                name={name}
                value={value}
                className={`${classNameAppend} py-2 px-4 text-accent bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl border border-accent/20 shadow-md shadow-accent/25
                hover:border-accent hover:shadow-xl hover:shadow-accent/25 transition-all`}
            >
                {children}
            </button>
        );
    }
}
