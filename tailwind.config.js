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
                    dark: '#0f172a', // slate-900
                    darker: '#020617', // slate-950
                    blue: '#00d4ff', // cyan-400
                    purple: '#a855f7', // purple-500
                    pink: '#f43f5e', // rose-500
                    green: '#10b981', // emerald-500
                    amber: '#f59e0b', // amber-500
                }
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                'gradient-profit': 'linear-gradient(135deg, #00ff88 0%, #10b981 100%)',
                'gradient-loss': 'linear-gradient(135deg, #ff006e 0%, #f59e0b 100%)',
            },
            boxShadow: {
                'glow-green': '0 0 20px rgba(16, 185, 129, 0.5)',
                'glow-amber': '0 0 20px rgba(245, 158, 11, 0.5)',
                'glow-profit': '0 0 20px rgba(0, 255, 136, 0.5)',
            }
        },
    },
    plugins: [],
}
