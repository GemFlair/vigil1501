
import React, { useState } from 'react';
import { AlertTriangle, Radio, Zap } from 'lucide-react';
import { LATEST_INTERCEPT } from '../registry/broadcast';

interface SecurityAnnouncementBarProps {
  onNeutralize?: () => void;
}

export const SecurityAnnouncementBar: React.FC<SecurityAnnouncementBarProps> = ({ onNeutralize }) => {
  const handleNeutralize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNeutralize) onNeutralize();
    
    const ripple = document.createElement('div');
    ripple.className = 'fixed top-0 left-0 w-full h-10 bg-emerald-500/20 z-[121] pointer-events-none animate-ping';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const tickerItems = Array(4).fill(LATEST_INTERCEPT);

  return (
    <div className="fixed top-0 left-0 right-0 h-10 z-[120] bg-red-600/10 backdrop-blur-md border-b border-red-500/20 flex items-center overflow-hidden group">
      <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
        {tickerItems.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">[ALERT] {item.id}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <p className="text-[9px] font-bold text-white uppercase tracking-[0.1em]">{item.tagline}</p>
              <button 
                onClick={handleNeutralize}
                className="px-3 py-1 bg-red-600 text-white rounded text-[8px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-90 flex items-center gap-2 shadow-lg"
              >
                <Zap size={10} className="fill-current" /> NEUTRALIZE
              </button>
            </div>
            <div className="flex items-center gap-3">
               <AlertTriangle className="w-3 h-3 text-red-500" />
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">THREAT_IDENTIFIED</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
};
