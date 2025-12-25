/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#1313ec',
                'secondary': '#7c3aed',
                'background-dark': '#0B0B15',
                'card-dark': '#13132B',
                'text-grey': '#94A3B8',
            },
            fontFamily: {
                'display': ['Inter', 'sans-serif'],
                'sans': ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #1313ec 0deg, #7c3aed 180deg, #1313ec 360deg)',
            },
        },
    },
    plugins: [],
};
