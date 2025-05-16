export function themeSet(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
}

export default function ThemeToggle() {
    const themes = ['light', 'dark', 'catppuccin', 'tokyonight']
    return (
        <>
            {themes.map((theme) => {
                return (
                    <button
                        key={theme}
                        onClick={() => themeSet(theme)}
                        className="p-4 bg-primary/20 hover:bg-secondary/20"
                    >{theme}</button>
                )
            })}
        </>
    )
}
