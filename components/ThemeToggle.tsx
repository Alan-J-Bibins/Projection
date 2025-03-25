"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(true);
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
        console.log('hello there', darkMode);
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
            className="relative w-10 h-6 rounded-full flex items-center justify-center 
            text-background bg-secondary"
        >
            <div className="p-0.5 bg-primary rounded-full flex justify-center items-center
                -translate-x-2 dark:translate-x-2 transition-all duration-150 ease-out"
            >
                <Sun size={20} className={`${darkMode ? 'hidden' : ''}`} />
                <Moon size={20} className={`${darkMode ? '' : 'hidden '}`} />
            </div>
        </button>
    );
}
