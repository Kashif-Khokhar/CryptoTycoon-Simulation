import React, { useEffect, useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { fetchTopCryptos } from './services/api';
import { priceStreamService } from './services/PriceStreamService';
import NetWorthCard from './components/NetWorthCard';
import MarketCard from './components/MarketCard';
import PortfolioTable from './components/PortfolioTable';
import PriceChart from './components/PriceChart';
import Leaderboard from './components/Leaderboard';
import Background from './components/Background';

const Dashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const { 
    setMarketPrices, 
    currency, setCurrency, 
    theme, setTheme 
  } = usePortfolio();

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchTopCryptos(12);
        setCryptos(data);
        setIsDemoMode(data[0]?.isMock || false);
        setSelectedCrypto(data[0]);

        const prices = {};
        data.forEach(crypto => {
          prices[crypto.id] = crypto.current_price;
        });
        setMarketPrices(prices);
        
        // Initialize WebSocket stream if not in demo mode
        if (!data[0]?.isMock) {
          priceStreamService.init(data);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading cryptos:', err);
        setError(`Failed to load data. Please check your connection.`);
      } finally {
        setLoading(false);
      }
    };

    loadCryptos();

    // Subscribe to live WebSocket updates
    const unsubscribe = priceStreamService.subscribe((update) => {
      setCryptos(prev => prev.map(c => 
        c.id === update.id 
          ? { ...c, current_price: update.price, price_change_percentage_24h: update.change }
          : c
      ));
      
      if (setMarketPrices) {
        setMarketPrices(prev => ({
          ...prev,
          [update.id]: update.price
        }));
      }
    });

    return () => {
      unsubscribe();
      priceStreamService.close();
    };
  }, [setMarketPrices]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-cyber-darker">
        <Background />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyber-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gradient font-bold">Loading CryptoTycoon...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-cyber-darker p-6">
        <Background />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="glass-card p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4 text-gradient">Connection Error</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-success px-6 py-3"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-cyber-darker text-white'}`}>
      <Background />
      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-2">CryptoTycoon</h1>
            <p className={`${theme === 'light' ? 'text-slate-500' : 'text-white/60'} text-base md:text-lg`}>Professional Trading Simulator</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Selector */}
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className={`border rounded-lg px-3 py-1.5 text-sm font-semibold outline-none transition-all ${
                theme === 'light' 
                  ? 'bg-white border-slate-200 text-slate-900' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="BTC">BTC (₿)</option>
            </select>

            {/* Theme Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg glass-card hover:bg-white/10 text-xl"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isDemoMode && (
              <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-amber-500 font-semibold text-xs md:text-sm">Demo Mode (API Rate Limited)</span>
              </div>
            )}
          </div>
        </header>

        {/* Net Worth Card */}
        <div className="mb-8">
          <NetWorthCard />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Market Overview */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Live Market</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cryptos.map(crypto => (
                <div key={crypto.id} onClick={() => setSelectedCrypto(crypto)}>
                  <MarketCard crypto={crypto} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {selectedCrypto && (
              <PriceChart 
                coinId={selectedCrypto.id} 
                coinName={selectedCrypto.name}
              />
            )}
            <Leaderboard />
          </div>
        </div>

        {/* Portfolio Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
          <PortfolioTable />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <PortfolioProvider>
      <Dashboard />
    </PortfolioProvider>
  );
};

export default App;
