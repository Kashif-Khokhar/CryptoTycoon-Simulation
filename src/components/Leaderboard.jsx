import React from 'react';

const Leaderboard = () => {
  const topTraders = [
    { rank: 1, name: 'CryptoWhale', profit: '$1.2M', winRate: '78%' },
    { rank: 2, name: 'MoonShot', profit: '$840K', winRate: '64%' },
    { rank: 3, name: 'Satoshi_Fan', profit: '$560K', winRate: '61%' },
    { rank: 4, name: 'DiamondHands', profit: '$420K', winRate: '59%' },
    { rank: 5, name: 'You (Trader)', profit: '$0', winRate: '0%' },
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="text-2xl">🏆</span> Global Leaderboard
      </h2>
      <div className="space-y-4">
        {topTraders.map((trader) => (
          <div 
            key={trader.rank}
            className={`flex items-center justify-between p-3 rounded-xl transition-all ${
              trader.name.includes('You') 
                ? 'bg-cyber-green/20 border border-cyber-green/30' 
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                trader.rank === 1 ? 'bg-amber-500 text-black' :
                trader.rank === 2 ? 'bg-slate-300 text-black' :
                trader.rank === 3 ? 'bg-amber-700 text-white' : 'bg-white/10'
              }`}>
                {trader.rank}
              </span>
              <div>
                <div className="font-semibold text-sm">{trader.name}</div>
                <div className="text-xs text-white/40">WR: {trader.winRate}</div>
              </div>
            </div>
            <div className={`font-bold ${trader.rank === 5 ? 'text-white/40' : 'text-cyber-green'}`}>
              {trader.profit}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 text-sm font-semibold glass-card hover:bg-white/10 transition-all">
        View Full Rankings
      </button>
    </div>
  );
};

export default Leaderboard;
