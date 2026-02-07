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
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60 font-semibold">Asset</th>
              <th className="text-right p-4 text-white/60 font-semibold">Quantity</th>
              <th className="text-right p-4 text-white/60 font-semibold">Avg. Buy Price</th>
              <th className="text-right p-4 text-white/60 font-semibold">Current Price</th>
              <th className="text-right p-4 text-white/60 font-semibold">Total Value</th>
              <th className="text-right p-4 text-white/60 font-semibold">Profit/Loss</th>
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
                    <div>
                      <p className="font-bold">{asset.name}</p>
                      <p className="text-sm text-white/60">{asset.symbol.toUpperCase()}</p>
                    </div>
                  </td>
                  <td className="text-right p-4 font-semibold">{asset.quantity.toFixed(6)}</td>
                  <td className="text-right p-4 text-white/80">
                    ${asset.avgBuyPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="text-right p-4 font-semibold text-cyber-blue">
                    ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="text-right p-4 font-bold">
                    ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`text-right p-4 font-bold ${isProfit ? 'text-profit' : 'text-loss'}`}>
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
  );
};

export default PortfolioTable;
