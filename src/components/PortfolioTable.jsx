import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const PortfolioTable = () => {
  const { assets, marketPrices, calculateProfitLoss } = usePortfolio();

  if (assets.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-white/60 text-lg">No assets yet. Start trading to build your portfolio!</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 md:p-6 overflow-hidden">
      <h2 className="text-xl font-bold mb-6">Your Portfolio</h2>
      
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Asset</th>
                <th className="text-right p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Quantity</th>
                <th className="text-right p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Avg. Buy Price</th>
                <th className="text-right p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Current Price</th>
                <th className="text-right p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Total Value</th>
                <th className="text-right p-4 text-white/40 font-medium text-sm md:text-base whitespace-nowrap">Profit/Loss</th>
              </tr>
            </thead>
          <tbody>
            {assets.map((asset) => {
              const currentPrice = marketPrices[asset.id] || 0;
              const totalValue = asset.quantity * currentPrice;
              const profitLoss = calculateProfitLoss(asset);
              const isProfit = profitLoss.amount >= 0;

              return (
                <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <div className="font-bold text-white whitespace-nowrap">{asset.name}</div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">{asset.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right p-4 text-white/80 whitespace-nowrap font-mono">{asset.quantity.toFixed(6)}</td>
                  <td className="text-right p-4 text-white/80 whitespace-nowrap">
                    ${asset.avgBuyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="text-right p-4 font-semibold text-cyber-green whitespace-nowrap">
                    ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="text-right p-4 font-bold text-white whitespace-nowrap">
                    ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`text-right p-4 font-bold whitespace-nowrap ${isProfit ? 'text-profit' : 'text-loss'}`}>
                    {isProfit ? '+' : ''}${profitLoss.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    <br />
                    <span className="text-sm">
                      ({isProfit ? '+' : ''}{profitLoss.percentage.toFixed(2)}%)
                    </span>
                  </td>
                </tr>
              );
            })}
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTable;
