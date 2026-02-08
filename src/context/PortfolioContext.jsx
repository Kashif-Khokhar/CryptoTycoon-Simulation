import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  // Load initial state from local storage or use defaults
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('crypto_sim_balance');
    return saved !== null ? parseFloat(saved) : 10000;
  });
  
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('crypto_sim_assets');
    return saved !== null ? JSON.parse(saved) : [];
  });
  
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('crypto_sim_transactions');
    return saved !== null ? JSON.parse(saved) : [];
  });
  
  const [marketPrices, setMarketPrices] = useState({});
  const [currency, setCurrency] = useState(() => localStorage.getItem('crypto_sim_currency') || 'USD');
  const [theme, setTheme] = useState(() => localStorage.getItem('crypto_sim_theme') || 'dark');

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('crypto_sim_balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('crypto_sim_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('crypto_sim_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('crypto_sim_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('crypto_sim_theme', theme);
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Calculate total portfolio value
  const calculateNetWorth = () => {
    const assetsValue = assets.reduce((total, asset) => {
      const currentPrice = marketPrices[asset.id] || 0;
      return total + (asset.quantity * currentPrice);
    }, 0);
    return balance + assetsValue;
  };

  // Calculate Advanced Analytics
  const calculatePortfolioMetrics = () => {
    const netWorth = calculateNetWorth();
    const totalInvested = assets.reduce((sum, a) => sum + (a.quantity * a.avgBuyPrice), 0);
    const totalProfit = netWorth - (totalInvested + balance);
    
    // Simple Volatility calculation (Standard deviation of daily returns would be better, 
    // but for this MVP we'll use a simplified weighted asset volatility score)
    const volatility = assets.reduce((v, a) => {
      const weight = (a.quantity * (marketPrices[a.id] || 0)) / netWorth;
      // Mock volatility for assets (BTC 2%, SOL 5%, etc.)
      const assetVol = a.symbol === 'btc' ? 0.02 : a.symbol === 'eth' ? 0.04 : 0.06;
      return v + (weight * assetVol);
    }, 0) * 100;

    const sharpeRatio = volatility > 0 ? (totalProfit / totalInvested) / (volatility / 100) : 0;

    return {
      volatility: volatility.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      totalProfit: totalProfit.toFixed(2)
    };
  };

  // Calculate profit/loss for an asset
  const calculateProfitLoss = (asset) => {
    const currentPrice = marketPrices[asset.id] || 0;
    const currentValue = asset.quantity * currentPrice;
    const investedValue = asset.quantity * asset.avgBuyPrice;
    return {
      amount: currentValue - investedValue,
      percentage: ((currentValue - investedValue) / investedValue) * 100
    };
  };

  // Buy cryptocurrency
  const buyCrypto = (crypto, amount) => {
    const { id, symbol, name, current_price } = crypto;
    const cost = amount * current_price;

    if (cost > balance) {
      throw new Error('Insufficient balance');
    }

    // Update balance
    setBalance(prev => prev - cost);

    // Update assets
    setAssets(prev => {
      const existingAsset = prev.find(a => a.id === id);
      
      if (existingAsset) {
        // Update existing asset with new average buy price
        const totalQuantity = existingAsset.quantity + amount;
        const totalCost = (existingAsset.quantity * existingAsset.avgBuyPrice) + cost;
        const newAvgPrice = totalCost / totalQuantity;
        
        return prev.map(a => 
          a.id === id 
            ? { ...a, quantity: totalQuantity, avgBuyPrice: newAvgPrice }
            : a
        );
      } else {
        // Add new asset
        return [...prev, {
          id,
          symbol,
          name,
          quantity: amount,
          avgBuyPrice: current_price
        }];
      }
    });

    // Record transaction
    setTransactions(prev => [{
      id: Date.now(),
      type: 'buy',
      symbol,
      name,
      quantity: amount,
      price: current_price,
      total: cost,
      timestamp: new Date().toISOString()
    }, ...prev]);
  };

  // Sell cryptocurrency
  const sellCrypto = (crypto, amount) => {
    const { id, symbol, name, current_price } = crypto;
    const asset = assets.find(a => a.id === id);

    if (!asset || asset.quantity < amount) {
      throw new Error('Insufficient asset quantity');
    }

    const revenue = amount * current_price;

    // Update balance
    setBalance(prev => prev + revenue);

    // Update assets
    setAssets(prev => {
      const updatedAssets = prev.map(a => {
        if (a.id === id) {
          const newQuantity = a.quantity - amount;
          return newQuantity > 0 
            ? { ...a, quantity: newQuantity }
            : null;
        }
        return a;
      }).filter(Boolean);
      
      return updatedAssets;
    });

    // Record transaction
    const profitLoss = revenue - (amount * asset.avgBuyPrice);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'sell',
      symbol,
      name,
      quantity: amount,
      price: current_price,
      total: revenue,
      profitLoss,
      timestamp: new Date().toISOString()
    }, ...prev]);
  };

  const value = {
    balance,
    assets,
    transactions,
    marketPrices,
    currency,
    theme,
    setCurrency,
    setTheme,
    setMarketPrices,
    calculateNetWorth,
    calculateProfitLoss,
    calculatePortfolioMetrics,
    buyCrypto,
    sellCrypto
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
