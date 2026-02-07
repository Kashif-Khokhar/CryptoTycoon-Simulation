# 🚀 CryptoTycoon - Professional Trading Simulator

A professional-grade cryptocurrency trading simulator built with React and Vite. This "FinTech Lite" application demonstrates advanced frontend development skills including real-time data streaming, complex state management, and interactive data visualization.

![CryptoTycoon](https://img.shields.io/badge/React-18.2-blue) ![Vite](https://img.shields.io/badge/Vite-5.0-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## ✨ Features

### 🔴 Live Market Engine
- Real-time cryptocurrency prices from CoinGecko API
- Auto-refresh every 30 seconds
- Top 12 cryptocurrencies by market cap
- 24-hour price change indicators

### 💼 Portfolio Management
- Start with $10,000 virtual USD
- Buy and sell cryptocurrencies
- Automatic average buy price calculation
- Real-time profit/loss tracking
- Complete transaction history

### 📊 Analytical Dashboard
- **Net Worth Tracking**: Total portfolio value with P&L
- **Asset Breakdown**: Cash vs invested capital
- **Portfolio Table**: Detailed holdings with performance metrics
- **Interactive Charts**: Multiple timeframes (1D, 7D, 30D, 90D)

### 🎨 Premium UI/UX
- Cyberpunk-themed glassmorphism design
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Interactive trading modals
- Real-time visual feedback

### 🛡️ Reliability & Stability
- **Global Error Boundary**: Catch and display rendering crashes gracefully
- **API Resilience**: Defensive handling for CoinGecko rate limits and connection failures
- **Robust State Initialization**: Prevents white screen issues during initial data fetch
- **Clear Error Messaging**: Detailed connection error UI with built-in retry mechanisms

## 🛠️ Tech Stack

- **Frontend**: React 18.2 + Vite 5.4
- **State Management**: Context API
- **Styling**: Tailwind CSS 3.4 (Custom Cyberpunk Theme)
- **Charts**: Chart.js 4.4 + react-chartjs-2
- **API**: CoinGecko REST API
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

1. **View Live Market**: Browse top cryptocurrencies with real-time prices
2. **Trade**: Click any crypto card to open the trading modal
3. **Buy**: Enter amount and confirm purchase
4. **Sell**: Switch to sell mode and liquidate holdings
5. **Track Performance**: Monitor your net worth and profit/loss in real-time
6. **Analyze**: View price charts with multiple timeframes

## 📁 Project Structure

```
CryptoTycoon-Simulation/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx      # Global crash protection
│   │   ├── NetWorthCard.jsx      # Portfolio dashboard
│   │   ├── MarketCard.jsx         # Crypto market cards
│   │   ├── PortfolioTable.jsx     # Holdings table
│   │   └── PriceChart.jsx         # Price visualization
│   ├── context/
│   │   └── PortfolioContext.jsx   # Global state
│   ├── services/
│   │   └── api.js                 # API integration
│   ├── App.jsx                    # Main dashboard layout
│   ├── main.jsx                   # Application entry
│   └── index.css                  # Global styles & Tailwind
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 Key Features Explained

### Transaction Logic

**Buy**: 
- Validates sufficient balance
- Calculates weighted average buy price for multiple purchases
- Updates portfolio automatically

**Sell**:
- Validates sufficient holdings
- Calculates profit/loss based on average buy price
- Removes asset when fully liquidated

### State Management

Uses React Context API to manage:
- User balance
- Asset holdings
- Transaction history
- Market prices
- Derived calculations (net worth, P&L)

### API Integration & Error Handling

- Fetches top cryptocurrencies on load and polls every 30s
- Retrieves historical data for charts
- **New**: Advanced error handling with custom `ErrorBoundary` component
- **New**: Graceful degradation when API rate limits are hit

## 🎨 Design System

### Color Palette
- **Background**: Deep space dark (#050816)
- **Primary**: Cyber blue (#00d4ff)
- **Secondary**: Neon purple (#b829f5)
- **Profit**: Electric green (#00ff88)
- **Loss**: Hot pink (#ff006e)

### Components
- Glassmorphism cards with backdrop blur
- Gradient buttons with hover effects
- Animated loading states
- Responsive grid layouts

## 📈 Performance

- Optimized re-renders with React hooks
- Memoized expensive calculations
- Efficient polling mechanism
- Lazy loading for chart data
- Defensive prop-drilling prevention via Context API

## 🔮 Future Enhancements

- [ ] WebSocket for real-time prices
- [ ] LocalStorage persistence
- [ ] Advanced charts (candlesticks, volume)
- [ ] Portfolio analytics (Sharpe ratio, volatility)
- [ ] Leaderboard system
- [ ] Multi-currency support
- [ ] Dark/light theme toggle

## 📝 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Developer

**Kashif Khokhar**

This project demonstrates proficiency in:
- Modern React development
- Asynchronous data handling
- Complex state management
- API integration
- Data visualization
- Responsive UI/UX design

---

**Note**: This is a simulation using virtual currency. No real cryptocurrency transactions occur.