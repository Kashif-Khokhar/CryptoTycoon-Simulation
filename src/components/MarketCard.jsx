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
      <div className="glass-card-hover p-4 md:p-5 flex flex-col justify-between h-full cursor-pointer group" onClick={() => setShowModal(true)}>
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="flex items-center gap-3">
          <img src={crypto.image} alt={crypto.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full" />
          <div>
            <h3 className="font-bold text-white text-base md:text-lg group-hover:text-cyber-green transition-colors leading-tight">{crypto.name}</h3>
            <span className="text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-wider">{crypto.symbol}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base md:text-lg font-bold text-white">${crypto.current_price.toLocaleString()}</div>
          <div className={`text-xs md:text-sm font-semibold flex items-center justify-end gap-1 ${isPositive ? 'text-cyber-green' : 'text-cyber-pink'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>
        
        {ownedAsset && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-sm text-white/60">You own: <span className="text-cyber-green font-semibold">{ownedAsset.quantity.toFixed(6)} {crypto.symbol.toUpperCase()}</span></p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="glass-card p-6 md:p-8 w-full max-w-md relative animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              ✕
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-gradient">Trade {crypto.name}</h2>

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
                className="w-full px-4 py-3 rounded-lg glass-card text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-cyber-green"
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
                <span className="font-semibold text-cyber-green">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
