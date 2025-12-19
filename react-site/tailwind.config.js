/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-display)', 'sans-serif'],
                main: ['var(--font-main)', 'sans-serif'],
            },
            colors: {
                background: "var(--bg-primary)",
                foreground: "var(--text-primary)",
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
