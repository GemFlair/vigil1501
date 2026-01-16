import React, { useState, useEffect } from 'react';
import { Activity, Shield, Target, Radio, Globe, ChevronLeft, Map, X, ChevronDown, User, Zap } from 'lucide-react';

interface TacticalHUDProps {
  bri: number;
  xp: number;
  rank: string;
  level: number;
  onOpenMap: () => void;
}

export const TacticalHUD: React.FC<TacticalHUDProps> = ({ bri, xp, rank, level, onOpenMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getTheme = () => {
    if (bri < 50) return { accent: 'text-red-500', bg: 'bg-red-600/10', border: 'border-red-500/40', panelBg: 'bg-red-950/60', indicator: 'bg-red-500', radial: 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_70%)]' };
    if (bri < 90) return { accent: 'text-blue-500', bg: 'bg-blue-600/10', border: 'border-blue-500/40', panelBg: 'bg-blue-950/60', indicator: 'bg-blue-500', radial: 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]' };
    return { accent: 'text-emerald-500', bg: 'bg-emerald-600/10', border: 'border-emerald-500/40', panelBg: 'bg-emerald-950/60', indicator: 'bg-emerald-500', radial: 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]' };
  };

  const theme = getTheme();

  return (
    <div className="relative w-full" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full group flex items-center justify-between px-4 py-4 backdrop-blur-2xl border rounded-xl transition-all duration-500 active:scale-95 overflow-hidden ${theme.bg} ${theme.border} ${isOpen ? 'ring-2 ring-white/10' : ''}`}>
        <div className={`absolute inset-0 pointer-events-none opacity-50 ${theme.radial}`} />
        <div className="flex items-center gap-2 relative z-10 min-w-0 flex-1">
           <Radio size={12} className={`${theme.accent} animate-pulse shrink-0`} />
           <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors truncate ${theme.accent}`}>BRI_XP_DASH</span>
        </div>
        <div className="flex items-center justify-center shrink-0 relative z-10 ml-2">
          <div className={`text-[12px] font-black italic tracking-tighter font-mono ${theme.accent}`}>({bri}%)</div>
        </div>
      </button>

      <div className={`absolute top-0 left-0 bg-black/95 backdrop-blur-3xl border shadow-[0_30px_100px_rgba(0,0,0,1)] rounded-[2.5rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top-left z-[500] ${theme.panelBg} border-white/10 ${isOpen ? 'w-80 opacity-100 scale-100 pointer-events-auto' : 'w-0 opacity-0 scale-90 pointer-events-none overflow-hidden'}`}>
        <div className={`absolute inset-0 pointer-events-none opacity-40 ${theme.radial}`} />
        <div className="p-8 space-y-8 relative z-10">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${theme.bg} border-white/10`}><Radio size={18} className={`${theme.accent} animate-pulse`} /></div>
                <div className="space-y-0.5">
                   <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Sentinel_HUD</span>
                   <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Merit_Reputation_Core</span>
                </div>
             </div>
             <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-full text-zinc-600 hover:text-white transition-all"><X size={16} /></button>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <div className="flex items-center gap-2"><Activity size={10} className="text-zinc-600" /><span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Resilience (BRI)</span></div>
                 <div className={`text-[14px] font-black text-white italic`}>{bri}%</div>
              </div>
              <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                 <div className={`h-full transition-all duration-1000 ${theme.indicator} shadow-[0_0_15px_currentColor]`} style={{ width: `${bri}%` }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <div className="flex items-center gap-2"><Shield size={10} className="text-blue-500" /><span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Merit (XP)</span></div>
                 <div className="text-[14px] font-black text-blue-500 italic">{xp.toLocaleString()}</div>
              </div>
              <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                 <div className={`h-full transition-all duration-1000 bg-blue-600 shadow-[0_0_15px_#3b82f6]`} style={{ width: `${Math.min(100, (xp % 1000) / 10)}%` }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/60 rounded-2xl border border-white/5 shadow-inner">
               <div className="text-[7px] font-black text-zinc-700 uppercase mb-2">Operator Rank</div>
               <div className={`text-[11px] font-black ${theme.accent} italic truncate`}>{rank}</div>
            </div>
            <div className="p-4 bg-black/60 rounded-2xl border border-white/5 shadow-inner">
               <div className="text-[7px] font-black text-zinc-700 uppercase mb-2">Decryption State</div>
               <div className={`text-[11px] font-black text-white italic`}>LVL 0{level}</div>
            </div>
          </div>

          <button onClick={() => { onOpenMap(); setIsOpen(false); }} className={`w-full py-3.5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 hover:bg-white/10 ${theme.accent}`}>
            <Map size={12} /> OPEN SYSTEM TOPOLOGY
          </button>
        </div>
      </div>
    </div>
  );
};
