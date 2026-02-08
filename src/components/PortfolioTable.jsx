import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const PortfolioTable = () => {
  const { assets, marketPrices, calculateProfitLoss, currency } = usePortfolio();

  const getCurrencySymbol = () => {
    if (currency === 'EUR') return '€';
    if (currency === 'BTC') return '₿';
    return '$';
  };

  if (assets.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="text-5xl mb-4 opacity-20">📥</div>
        <p className="text-white/40 font-semibold italic">Your portfolio is empty. Start trading to see your assets here!</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white/40 uppercase tracking-widest">Asset</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-white/40 uppercase tracking-widest">Holdings</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-white/40 uppercase tracking-widest">Avg. Price</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-white/40 uppercase tracking-widest">Current Price</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-white/40 uppercase tracking-widest text-cyber-green">Total Value</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-white/40 uppercase tracking-widest">Profit/Loss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.map((asset) => {
              const currentPrice = marketPrices[asset.id] || asset.avgBuyPrice;
              const { amount, percentage } = calculateProfitLoss(asset);
              const totalValue = asset.quantity * currentPrice;

              return (
                <tr key={asset.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-green to-cyber-amber flex items-center justify-center font-bold text-xs">
                        {asset.symbol.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{asset.name}</div>
                        <div className="text-xs text-white/40 uppercase">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-bold text-white">{asset.quantity.toLocaleString(undefined, { maximumFractionDigits: 6 })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-white/60 font-mono">{getCurrencySymbol()}{asset.avgBuyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm text-white font-mono">{getCurrencySymbol()}{currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-bold text-cyber-green">
                    <div className="text-sm font-mono">{getCurrencySymbol()}{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`text-sm font-bold flex flex-col items-end ${amount >= 0 ? 'text-cyber-green' : 'text-red-500'}`}>
                      <span>{amount >= 0 ? '+' : ''}{getCurrencySymbol()}{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="text-xs opacity-60">({amount >= 0 ? '+' : ''}{percentage.toFixed(2)}%)</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioTable;
