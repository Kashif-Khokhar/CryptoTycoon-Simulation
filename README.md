# 🚀 CryptoTycoon - Professional Trading Simulator

A professional-grade cryptocurrency trading simulator built with React and Vite. This "FinTech Lite" application demonstrates advanced frontend development skills including real-time data streaming via WebSockets, complex state management, and professional financial data visualization.

![CryptoTycoon](https://img.shields.io/badge/React-18.2-blue) ![WebSockets-Binance-orange) ![lightweight--charts-v5--green)

## ✨ Core Features

### 🔴 Real-Time Market Engine
- **Live Data Streams**: Powered by Binance WebSockets for sub-second price updates.
- **High Fidelity**: Sub-second price movements and 24-hour change percentages.
- **Global Coverage**: Real-time tracking for the top 12 cryptocurrencies by market cap.

### 💼 Portfolio Management & Persistence
- **LocalStorage Sync**: Your balance, assets, and transactions are automatically saved across sessions.
- **Advanced Analytics**: Real-time calculation of **Volatility** and **Sharpe Ratio** for your portfolio.
- **Smart Trading**: Automatic average buy price calculation and instantaneous P&L tracking.
- **Full History**: Categorized transaction logs with detailed buy/sell metrics.

### 📊 Professional Analytics Dashboard
- **Advanced Charting**: Integrated **TradingView Lightweight Charts v5** for professional-grade visualization.
- **Interactive Views**: Toggle between high-performance Candlestick, Area, and Line charts.
- **Volume Tracking**: Integrated volume histograms for trend analysis.
- **Multi-Timeframe**: Analyze market history across 1D, 7D, 30D, and 90D intervals.

### 🎨 Premium UI/UX & Customization
- **Modern Aesthetic**: Emerald Green and Amber financial theme with glassmorphism effects.
- **Theme Toggling**: Seamless switching between dedicated Dark and Light modes.
- **Multi-Currency**: Global support for USD ($), EUR (€), and BTC (₿).
- **Responsive Mastery**: Fully optimized for mobile, tablet, and desktop viewing.
- **Leaderboard**: Compete with a simulated global community of professional traders.

## 🛠️ Tech Stack

- **Frontend**: React 18.2 + Vite 5.4
- **State Management**: React Context API
- **Styling**: Tailwind CSS 3.4 (Custom Financial Theme)
- **Charts**: TradingView Lightweight Charts v5
- **Data Streams**: Binance WebSocket API
- **Persistence**: LocalStorage API
- **API**: CoinGecko REST API (for historical data)
- **HTTP Client**: Axios 1.6

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Kashif-Khokhar/CryptoTycoon-Simulation.git

# Navigate to project directory
cd CryptoTycoon-Simulation

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

## 🚀 Usage

1. **Market Watch**: Observe live price action driven by Binance's real-time engine.
2. **Chart Analysis**: Toggle chart types and timeframes to find market patterns.
3. **Trade Execution**: Click any asset to open the responsive trade modal.
4. **Portfolio Tracking**: Monitor your net worth, volatility, and historical performance from the main dashboard.
5. **Customization**: Switch currencies or toggle themes via the executive header controls.

## 📁 Project Structure

```
CryptoTycoon-Simulation/
├── src/
│   ├── components/
│   │   ├── Background.jsx         # Professional financial backdrop
│   │   ├── Leaderboard.jsx        # Simulated global rankings
│   │   ├── NetWorthCard.jsx       # Advanced portfolio analytics
│   │   ├── MarketCard.jsx         # Real-time asset cards
│   │   ├── PortfolioTable.jsx     # Responsive holdings grid
│   │   └── PriceChart.jsx         # Lightweight-charts v5 implementation
│   ├── context/
│   │   └── PortfolioContext.jsx   # Global state & LocalStorage sync
│   ├── services/
│   │   ├── api.js                 # REST API integration
│   │   └── PriceStreamService.js  # WebSocket management
│   ├── App.jsx                    # Executive dashboard layout
│   └── index.css                  # Global styles & Theme overrides
├── tailwind.config.js
└── package.json
```

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Developer

**Kashif Khokhar**

This project demonstrates proficiency in:
- **Real-time Financial Systems** (WebSockets)
- **Professional Data Visualization** (Lightweight Charts)
- **Complex State Management** (Context + Persistence)
- **Full-Spectrum UI/UX** (Responsive Design + Theme Engines)

---

**Disclaimer**: This is a simulator using virtual currency. No real cryptocurrency transactions or financial risks are involved.