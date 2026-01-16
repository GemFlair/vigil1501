
import React, { useState } from 'react';
import { 
  Activity, Radar, Globe, Zap, 
  TrendingUp, BarChart3, Search, 
  Target, Info, ChevronRight, 
  Layers, Terminal, MousePointer2,
  List, Shield,
  // Added missing Fingerprint icon import
  Fingerprint
} from 'lucide-react';
import { SolscanMirror } from './SolscanMirror';
import { TechLabel } from './docs/DocHelpers';

export const TraderAssistantSim: React.FC = () => {
  return (
    <section id="trader-assistant" className="px-6 md:px-20 py-24 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 flex flex-col items-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-7xl w-full space-y-20 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <TechLabel text="Path 04 // Trader Assistant" color="cyan" />
              <div className="h-[1px] w-12 bg-zinc-900" />
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Alpha <br/> Forensics.
            </h2>
          </div>
          <div className="lg:col-span-5 pb-4">
            <p className="text-zinc-500 text-xl font-medium leading-relaxed italic border-l-4 border-cyan-900/30 pl-8">
              "Transitioning from **Defensive Security** to **Strategic Advantage.** Intercepting token metrics before capital entry."
            </p>
          </div>
        </div>

        {/* SIMULATION TERMINAL */}
        <div className="space-y-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 animate-pulse">
                    <Radar size={20} />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Discovery Simulation</h4>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">VIGIL_ALPHA_SHIELD: ONLINE</p>
                 </div>
              </div>
              
              <div className="flex items-center gap-6 p-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <Info size={14} className="text-zinc-500" />
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest max-w-[300px]">
                       INTERACTIVE: Click the <span className="text-cyan-500">Radar Icon</span> on any row below to simulate the Alpha HUD forensics.
                    </p>
                 </div>
              </div>
           </div>

           <div className="h-[700px] w-full rounded-[3.5rem] border-2 border-zinc-900 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] bg-black">
              <SolscanMirror onCopy={() => {}} activeType="MARKET_INTEL" />
           </div>
        </div>

        {/* BOTTOM METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { 
               t: 'Supply Concentration', 
               d: 'VIGIL calculates individual dominance across 10%, 20%, and 50% tiers to identify whale risk.',
               i: <Layers className="text-cyan-500" />
             },
             { 
               t: 'Cluster Recognition', 
               d: 'Identifying wallets funded by the same deployer source to detect bot-bundled launches.',
               i: <Target className="text-blue-500" />
             },
             { 
               t: 'Dev DNA Signature', 
               d: 'Synthesis of developer reputation based on historical launch performance and intent.',
               i: <Fingerprint className="text-purple-500" />
             }
           ].map((card, i) => (
             <div key={i} className="p-10 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-cyan-500/30 transition-all group">
                <div className="w-14 h-14 bg-black border border-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                   {card.i}
                </div>
                <div className="space-y-2">
                   <h5 className="text-xl font-black text-white italic uppercase tracking-tight">{card.t}</h5>
                   <p className="text-zinc-600 text-sm leading-relaxed font-medium italic">{card.d}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
