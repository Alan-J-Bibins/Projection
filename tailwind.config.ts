import type { Config } from 'tailwindcss';

export default {
    content: [
        './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}',
        './components/**/*',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                    'Noto Color Emoji',
                ],
                outfit: ['"Outfit"', 'sans-serif'],
                righteous: ['"Righteous"', 'sans-serif'],
            },
            colors: {
                text: 'rgb(var(--text))',
                background: 'rgb(var(--background))',
                primary: 'rgb(var(--primary))',
                secondary: 'rgb(var(--secondary))',
                accent: 'rgb(var(--accent))',
            },
            backgroundImage: {
                'active-gradient':
                    'linear-gradient(225deg, var(--Accent, #F66C6A) 0%, var(--Secondary, #3C4C72) 50%, var(--Secondary, #3C4C72) 75%, var(--Primary, #86A7F6) 100%);',
            },
        },
    },
    plugins: [
        require('tailwindcss-motion'),
        require('tailwind-scrollbar-hide'),
    ],
    darkMode: ['class'],
} satisfies Config;
