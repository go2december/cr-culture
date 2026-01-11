import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors - สีม่วงเชียงราย
                primary: {
                    DEFAULT: '#6b21a8',
                    light: '#9333ea',
                    dark: '#581c87',
                },
                // Secondary Colors - สีทองเมทัลลิก
                secondary: {
                    DEFAULT: '#ca8a04',
                    light: '#facc15',
                    dark: '#a16207',
                },
                // Accent - สีเขียวล้านนา
                accent: '#16a34a',
                // Base colors
                'base-100': '#faf8f5',
                'base-200': '#f5f2ed',
                'base-300': '#e8e4dc',
                'base-content': '#2d2a35',
            },
            fontFamily: {
                sans: ['Noto Sans Thai', 'Sarabun', 'system-ui', 'sans-serif'],
                display: ['Prompt', 'Noto Sans Thai', 'sans-serif'],
            },
            borderRadius: {
                lanna: '0.75rem',
                card: '1rem',
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                lanna: {
                    'primary': '#6b21a8',
                    'primary-content': '#ffffff',
                    'secondary': '#ca8a04',
                    'secondary-content': '#1a1a1a',
                    'accent': '#16a34a',
                    'accent-content': '#ffffff',
                    'neutral': '#2d2a35',
                    'neutral-content': '#faf8f5',
                    'base-100': '#faf8f5',
                    'base-200': '#f5f2ed',
                    'base-300': '#e8e4dc',
                    'base-content': '#2d2a35',
                    'info': '#0ea5e9',
                    'success': '#22c55e',
                    'warning': '#eab308',
                    'error': '#ef4444',
                    '--rounded-box': '1rem',
                    '--rounded-btn': '0.5rem',
                    '--rounded-badge': '1.9rem',
                    '--animation-btn': '0.25s',
                    '--animation-input': '0.2s',
                    '--btn-focus-scale': '0.95',
                    '--border-btn': '1px',
                    '--tab-border': '1px',
                    '--tab-radius': '0.5rem',
                },
            },
        ],
        base: true,
        styled: true,
        utils: true,
        prefix: '',
        logs: true,
        themeRoot: ':root',
    },
}

export default config
