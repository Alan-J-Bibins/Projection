export default function Input({ type, name, placeholder, required = false }: { type?: string, name?: string, placeholder?: string, required?: boolean }) {
    return (
        <input type={type}
            name={name}
            placeholder={placeholder}
            className="form-field"
            required={required}
        />
    )
}

