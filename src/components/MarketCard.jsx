import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const MarketCard = ({ crypto }) => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('buy');
  const { buyCrypto, sellCrypto, balance, assets } = usePortfolio();

  const priceChange = crypto.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const handleTransaction = () => {
    try {
      const qty = parseFloat(amount);
      if (isNaN(qty) || qty <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      if (transactionType === 'buy') {
        buyCrypto(crypto, qty);
        alert(`Successfully bought ${qty} ${crypto.symbol.toUpperCase()}`);
      } else {
        sellCrypto(crypto, qty);
        alert(`Successfully sold ${qty} ${crypto.symbol.toUpperCase()}`);
      }
      
      setAmount('');
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const ownedAsset = assets.find(a => a.id === crypto.id);
  const maxSellAmount = ownedAsset ? ownedAsset.quantity : 0;
  const maxBuyAmount = balance / crypto.current_price;

  return (
    <>
      <div className="glass-card-hover p-5 cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-lg">{crypto.name}</h3>
              <p className="text-sm text-white/60">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className={`text-sm font-semibold ${isPositive ? 'text-profit' : 'text-loss'}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </p>
          </div>
        </div>
        
        {ownedAsset && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-sm text-white/60">You own: <span className="text-cyber-blue font-semibold">{ownedAsset.quantity.toFixed(6)} {crypto.symbol.toUpperCase()}</span></p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="glass-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-6">
              <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold">{crypto.name}</h2>
                <p className="text-white/60">${crypto.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  transactionType === 'buy' ? 'btn-success' : 'glass-card'
                }`}
                onClick={() => setTransactionType('buy')}
              >
                Buy
              </button>
              <button
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  transactionType === 'sell' ? 'btn-danger' : 'glass-card'
                }`}
                onClick={() => setTransactionType('sell')}
              >
                Sell
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/60 mb-2">Amount ({crypto.symbol.toUpperCase()})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.000001"
                className="w-full px-4 py-3 rounded-lg glass-card text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyber-blue"
              />
              <p className="text-sm text-white/60 mt-2">
                Max: {transactionType === 'buy' ? maxBuyAmount.toFixed(6) : maxSellAmount.toFixed(6)} {crypto.symbol.toUpperCase()}
              </p>
            </div>

            <div className="mb-6 glass-card p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-white/60">Total Cost:</span>
                <span className="font-bold text-lg">
                  ${(parseFloat(amount || 0) * crypto.current_price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Available Balance:</span>
                <span className="font-semibold text-cyber-blue">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleTransaction}
                className={`flex-1 ${transactionType === 'buy' ? 'btn-success' : 'btn-danger'}`}
              >
                Confirm {transactionType === 'buy' ? 'Buy' : 'Sell'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 glass-card py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketCard;
