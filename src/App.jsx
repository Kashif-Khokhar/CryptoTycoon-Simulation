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
    currency, setCurrency
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
    <div className="min-h-screen relative overflow-hidden bg-cyber-darker text-white">
      <Background />
      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter flex items-center gap-2">
              <span className="text-cyber-green drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">CRYPTO</span>
              <span className="text-white">TYCOON</span>
            </h1>
            <p className="text-white/40 font-semibold tracking-widest text-xs uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse"></span>
              Real-Time High-Stakes Simulator
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 glass-card p-1">
              <button 
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'USD' ? 'bg-cyber-green text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setCurrency('EUR')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'EUR' ? 'bg-cyber-green text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                EUR
              </button>
              <button 
                onClick={() => setCurrency('BTC')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${currency === 'BTC' ? 'bg-cyber-green text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                BTC
              </button>
            </div>
            {isDemoMode && (
              <div className="px-4 py-2 bg-gradient-to-r from-cyber-amber/20 to-transparent border border-cyber-amber/30 rounded-full">
                <span className="text-cyber-amber text-xs font-black uppercase tracking-widest animate-pulse">
                  Simulation Active
                </span>
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
