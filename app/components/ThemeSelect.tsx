import { useState } from "react";
import { LuPalette } from "react-icons/lu"

export function themeSet(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}

export function getTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme;
}

export default function ThemeSelect() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const themes = ['light', 'dark', 'catppuccin', 'tokyonight']
    return (
        <div className="relative">
            <button
                className="relative size-8 rounded-full bg-secondary/20 text-accent flex items-center justify-center transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <LuPalette size={24} />
            </button>
            {isOpen && (
                <div className="absolute  top-full right-1/2 motion-preset-slide-down motion-duration-150
                    bg-primary/20 flex gap-4 z-20">
                    {themes.map((theme) => {
                        return (
                            <button
                                key={theme}
                                onClick={() => {
                                    themeSet(theme);
                                    setIsOpen(false);
                                }}
                                className=""
                            >
                                {theme}
                            </button>
                        );
                    })}
                </div>
            )}

        </div>
    )
}


// </button>
// {themes.map((theme) => {
//     return (
//         <button
//             key={theme}
//             onClick={() => themeSet(theme)}
//             className="p-4 bg-primary/20 hover:bg-secondary/20"
//         >
//             {theme}
//         </button>
