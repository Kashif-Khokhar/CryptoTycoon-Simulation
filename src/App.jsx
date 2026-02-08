import React, { useEffect, useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { fetchTopCryptos } from './services/api';
import NetWorthCard from './components/NetWorthCard';
import MarketCard from './components/MarketCard';
import PortfolioTable from './components/PortfolioTable';
import PriceChart from './components/PriceChart';

const Dashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const portfolio = usePortfolio();
  const setMarketPrices = portfolio?.setMarketPrices;

  console.log('Dashboard Rendering', { loading, error, hasPortfolio: !!portfolio, isDemoMode });

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchTopCryptos(12);
        setCryptos(data);
        setIsDemoMode(data[0]?.isMock || false);
        setSelectedCrypto(data[0]); // Default to Bitcoin
        
        // Update market prices in context
        const prices = {};
        data.forEach(crypto => {
          prices[crypto.id] = crypto.current_price;
        });
        setMarketPrices(prices);
        setError(null);
      } catch (err) {
        console.error('Error loading cryptos:', err);
        setError(`Failed to load cryptocurrency data: ${err.message || 'Unknown error'}. Please check your internet connection or try again later.`);
      } finally {
        setLoading(false);
      }
    };

    loadCryptos();

    // Poll for price updates every 60 seconds (reduced frequency to avoid rate limits)
    const interval = setInterval(async () => {
      try {
        const data = await fetchTopCryptos(12);
        setCryptos(data);
        setIsDemoMode(data[0]?.isMock || false);
        
        const prices = {};
        data.forEach(crypto => {
          prices[crypto.id] = crypto.current_price;
        });
        setMarketPrices(prices);
      } catch (error) {
        console.error('Error updating prices:', error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [setMarketPrices]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyber-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gradient font-bold">Loading CryptoTycoon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
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
    );
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-cyber-darker">
      {/* Background Decor - Neutral Slate Glow */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-800/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-900/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-bold text-gradient mb-2">CryptoTycoon</h1>
            <p className="text-white/60 text-lg">Professional Trading Simulator</p>
          </div>
          {isDemoMode && (
            <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-amber-500 font-semibold text-sm">Demo Mode (API Rate Limited)</span>
            </div>
          )}
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

          {/* Price Chart */}
          <div className="lg:col-span-1">
            {selectedCrypto && (
              <PriceChart 
                coinId={selectedCrypto.id} 
                coinName={selectedCrypto.name}
              />
            )}
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
