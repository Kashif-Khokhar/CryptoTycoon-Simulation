import React from 'react';

const Background = () => {
  // Fresh, high-contrast crypto-themed asset
  const bgImageUrl = "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2070"; 

  return (
    <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
      {/* Primary Financial Visualization Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ 
          backgroundImage: `url(${bgImageUrl})`,
          filter: 'contrast(1.1) brightness(0.6) sepia(0.5) hue-rotate(100deg) saturate(1.2)' 
        }}
      ></div>
      
      {/* Brand Identity Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/20 via-transparent to-cyber-amber/20 opacity-60"></div>
      
      {/* Readability Scrim */}
      <div className="absolute inset-0 bg-[#020617]/40"></div>

      {/* Retro Scanline Pattern */}
      <div className="absolute inset-0 scanlines opacity-10"></div>
      
      {/* Vignette Layer */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
    </div>
  );
};

export default Background;
