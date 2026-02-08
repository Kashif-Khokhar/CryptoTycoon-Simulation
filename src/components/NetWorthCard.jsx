import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const NetWorthCard = () => {
  const { balance, assets, calculateNetWorth, calculateProfitLoss, calculatePortfolioMetrics, currency } = usePortfolio();
  const netWorth = calculateNetWorth();
  const { volatility, sharpeRatio } = calculatePortfolioMetrics();

  const getCurrencySymbol = () => {
    if (currency === 'EUR') return '€';
    if (currency === 'BTC') return '₿';
    return '$';
  };

  const totalProfitLossValue = assets.reduce((total, asset) => {
    return total + calculateProfitLoss(asset).amount;
  }, 0);

  const profitPercentage = ((netWorth - 10000) / 10000) * 100;

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-white/40 font-medium mb-1 uppercase tracking-wider text-sm">Total Net Worth</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            {getCurrencySymbol()}{netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-lg ${totalProfitLossValue >= 0 ? 'bg-cyber-green/20 text-cyber-green' : 'bg-red-500/20 text-red-500'}`}>
            <span className="text-2xl">{totalProfitLossValue >= 0 ? '▲' : '▼'}</span>
            {getCurrencySymbol()}{Math.abs(totalProfitLossValue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="ml-1 text-sm opacity-80">({profitPercentage.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
          <p className="text-white/40 text-xs font-bold uppercase mb-2">Available Balance</p>
          <p className="text-2xl font-black text-white">{getCurrencySymbol()}{balance.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
          <p className="text-white/40 text-xs font-bold uppercase mb-2">Active Assets</p>
          <p className="text-2xl font-black text-cyber-green">{assets.length}</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
          <p className="text-white/40 text-xs font-bold uppercase mb-2">Volatility (24h)</p>
          <p className="text-2xl font-black text-amber-500">{volatility}%</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
          <p className="text-white/40 text-xs font-bold uppercase mb-2">Sharpe Ratio</p>
          <p className="text-2xl font-black text-cyber-blue">{sharpeRatio}</p>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
