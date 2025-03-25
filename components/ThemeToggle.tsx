import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        const isDarkMode = theme === 'dark' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (darkMode) {
                localStorage.setItem('theme', 'dark')
                document.documentElement.classList.add('dark')
            } else {
                localStorage.setItem('theme', 'light')
                document.documentElement.classList.remove('dark')
            }
        }
    }, [darkMode, mounted]);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative rounded-2xl flex items-center justify-center motion-preset-focus-md
            text-primary overflow-hidden border border-primary/60 group
            hover:shadow-lg hover:shadow-primary/25 hover:border-primary transition-all
            "
        >
            <div className="relative p-5 flex justify-center items-center bg-gradient-to-t from-primary/40 to-secondary/40 rounded-2xl
                    transition-all duration-150 ease-out">
                <Sun size={24} className={`absolute  ${darkMode ? 'motion-rotate-out-90 motion-opacity-out-0' : 'motion-rotate-in-90 motion-preset-focus-md'}`} />
                <Moon size={24} className={`absolute ${darkMode ? 'motion-preset-focus-md -motion-rotate-in-90' : '-motion-rotate-out-90 motion-opacity-out-0'}`} />
            </div>
        </button>
    );
}
