/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#0a0e27',
                    darker: '#050816',
                    blue: '#00d4ff',
                    purple: '#b829f5',
                    pink: '#ff006e',
                    green: '#00ff88',
                }
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-profit': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
                'gradient-loss': 'linear-gradient(135deg, #ff006e 0%, #b829f5 100%)',
            },
            boxShadow: {
                'glow-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
                'glow-purple': '0 0 20px rgba(184, 41, 245, 0.5)',
                'glow-green': '0 0 20px rgba(0, 255, 136, 0.5)',
            }
        },
    },
    plugins: [],
}
