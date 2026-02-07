import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const NetWorthCard = () => {
  const { balance, calculateNetWorth } = usePortfolio();
  const netWorth = calculateNetWorth();
  const profitLoss = netWorth - 10000; // Initial balance was $10,000
  const profitLossPercentage = ((profitLoss / 10000) * 100).toFixed(2);

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-white/70 mb-2">Net Worth</h2>
      <div className="flex items-baseline gap-3">
        <h1 className="text-4xl font-bold text-gradient">
          ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <span className={`text-xl font-semibold ${profitLoss >= 0 ? 'text-profit' : 'text-loss'}`}>
          {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          ({profitLoss >= 0 ? '+' : ''}{profitLossPercentage}%)
        </span>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-sm text-white/60 mb-1">Cash Balance</p>
          <p className="text-2xl font-bold text-cyber-blue">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-white/60 mb-1">Assets Value</p>
          <p className="text-2xl font-bold text-cyber-purple">
            ${(netWorth - balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
