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
  const [balance, setBalance] = useState(10000); // Initial $10,000 USD
  const [assets, setAssets] = useState([]); // { id, symbol, name, quantity, avgBuyPrice }
  const [transactions, setTransactions] = useState([]); // Transaction history
  const [marketPrices, setMarketPrices] = useState({}); // Current market prices

  // Calculate total portfolio value
  const calculateNetWorth = () => {
    const assetsValue = assets.reduce((total, asset) => {
      const currentPrice = marketPrices[asset.id] || 0;
      return total + (asset.quantity * currentPrice);
    }, 0);
    return balance + assetsValue;
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
    setMarketPrices,
    calculateNetWorth,
    calculateProfitLoss,
    buyCrypto,
    sellCrypto
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
