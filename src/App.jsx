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
  const portfolio = usePortfolio();
  const setMarketPrices = portfolio?.setMarketPrices;

  console.log('Dashboard Rendering', { loading, error, hasPortfolio: !!portfolio });

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchTopCryptos(12);
        setCryptos(data);
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

    // Poll for price updates every 30 seconds
    const interval = setInterval(async () => {
      try {
        const data = await fetchTopCryptos(12);
        setCryptos(data);
        
        const prices = {};
        data.forEach(crypto => {
          prices[crypto.id] = crypto.current_price;
        });
        setMarketPrices(prices);
        setError(null);
      } catch (error) {
        console.error('Error updating prices:', error);
        // Don't set error state for background updates to avoid disrupting UX
      }
    }, 30000);

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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gradient mb-2">CryptoTycoon</h1>
          <p className="text-white/60 text-lg">Professional Trading Simulator</p>
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
