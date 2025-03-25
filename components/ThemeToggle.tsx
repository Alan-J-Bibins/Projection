import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export function ThemeToggle() {
    const [cookies, setCookie] = useCookies(['theme']);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return cookies.theme === 'dark'
        }
        return false;
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, [darkMode]);

    useEffect(() => {
        if (mounted) {
            const newTheme = darkMode ? 'dark' : 'light';
            setCookie('theme', newTheme, {
                path: '/',
                maxAge: 365 * 24 * 60 * 60
            })
        }
    }, [darkMode, mounted, setCookie]);

    if (!mounted) {
        return null;
    }

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-fit h-fit flex items-center justify-center motion-preset-focus-md p-5 rounded-2xl
            bg-gradient-to-t from-primary/40 to-secondary/40 text-primary overflow-hidden border border-primary/60
            hover:shadow-lg hover:shadow-primary/25 hover:border-primary transition-all duration-150 ease-out
            "
        >
            <Sun size={24} className={`absolute  ${darkMode ? 'motion-rotate-out-90 motion-opacity-out-0 motion-translate-y-out-100' : 'motion-rotate-in-90 motion-preset-focus-md -motion-translate-y-in-100'}`} />
            <Moon size={24} className={`absolute ${darkMode ? 'motion-preset-focus-md -motion-rotate-in-90 -motion-translate-y-in-100' : '-motion-rotate-out-90 motion-opacity-out-0 motion-translate-y-out-100'}`} />
        </button>
    );
}
