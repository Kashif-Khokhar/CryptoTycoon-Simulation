# 🚀 CryptoTycoon - Professional Trading Simulator

A professional-grade cryptocurrency trading simulator built with React and Vite. This "FinTech Lite" application demonstrates advanced frontend development skills including real-time data streaming via WebSockets, complex state management, and professional financial data visualization.

![CryptoTycoon](https://img.shields.io/badge/React-18.2-blue) ![WebSockets-Binance-orange](https://img.shields.io/badge/WebSockets-Binance-orange) ![lightweight-charts-v5](https://img.shields.io/badge/lightweight--charts-v5-green)

## ✨ Core Features

### 🔴 Real-Time Market Engine
- **Binance WebSocket Integration**: Sub-second price updates for a truly professional feel.
- **Global Coverage**: Real-time tracking for the top 12 cryptocurrencies by market cap.
- **High Performance**: Optimized for fast data transformation and rendering.

### 💼 Portfolio Management & Persistence
- **State-of-the-art Persistence**: Automatic LocalStorage sync for balance, assets, and history.
- **Advanced Metrics**: Real-time calculation of **Volatility** and **Sharpe Ratio**.
- **Average Buy Price**: Intelligent tracking of costs across multiple trades.

### 📊 Professional Analytics Dashboard
- **TradingView Integration**: Powered by **Lightweight Charts v5** for premium financial visualization.
- **Interactive Controls**: Seamless switching between Candlestick, Area, and Volume views.
- **Atmospheric Aesthetic**: High-fidelity **Cyberpunk Dark Mode** with glassmorphism and neon accents.

## 🛠️ Tech Stack

- **Frontend**: React 18.2 + Vite 5.4
- **State Management**: React Context API
- **Styling**: Tailwind CSS 3.4 (Cyberpunk Financial Theme)
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

1.  **Market Watch**: Observe live price action driven by Binance's real-time engine.
2.  **Chart Analysis**: Toggle chart types and timeframes to find market patterns.
3.  **Trade Execution**: Click any asset to open the responsive trade modal.
4.  **Portfolio Tracking**: Monitor your net worth, volatility, and historical performance from the main dashboard.
5.  **Customization**: Switch currencies or toggle themes via the executive header controls.

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