export default function Input({
    type,
    name,
    placeholder,
    required = false,
    autoComplete = "off",
}: {
    type?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string,
}) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="form-field"
            required={required}
            autoComplete={autoComplete}
            onKeyDown={(e) => {
                if (e.key === 'Space') return;
            }}
        />
    );
}
