"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        console.log('theme = ', theme);
        const isDarkMode = theme === 'dark' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDarkMode);
        console.log(isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        console.log('hello there');
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
            className="w-6"
        >
            <Sun size={20} className={`${darkMode ? 'hidden' : 'block'}`}/>
            <Moon size={20} className={`${darkMode ? 'block' : 'hidden'}`}/>
        </button>
    );
}
