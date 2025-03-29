export default function Button({ type = "button", children }: { type?: 'button' | 'submit' | 'reset', children: React.ReactNode }) {
    return (
        <button
            type={type}
            className="py-2 px-4 text-primary bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/20 shadow-lg shadow-secondary/25
            hover:border-primary hover:shadow-xl hover:shadow-primary/25 transition-all"
        >
            {children}
        </button>
    );
}
