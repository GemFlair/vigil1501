import React, { useState } from 'react';
import { Search, ExternalLink, Copy, ArrowUpRight, Activity, Database, Clock, Filter, List, Globe, MousePointer2, AlertCircle, Radar, Check } from 'lucide-react';
import { MarketIntelAudit } from './MarketIntelAudit';

export interface SolscanTransaction {
  id: string;
  slot: string;
  timestamp: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  isPoison?: boolean;
  type: 'TRUSTED' | 'POISON' | 'PHISHING' | 'DUST' | 'NEW' | 'SIMILARITY' | 'MINT' | 'CLIPBOARD' | 'SPOOF' | 'MARKET_INTEL';
}

interface SolscanMirrorProps {
  onCopy: (tx: SolscanTransaction) => void;
  activeType?: string | null;
}

const TRANSACTIONS: SolscanTransaction[] = [
  { id: '1', slot: '312882109', timestamp: '12s ago', from: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '42.00', token: 'SOL', type: 'TRUSTED' },
  { id: '2', slot: '312882105', timestamp: '44s ago', from: 'Ab1C00000000000000000000000000Zz90', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '1,200', token: 'USDC', type: 'POISON' },
  { id: '3', slot: '312882098', timestamp: '2m ago', from: 'Dust99kLp6mX9wR7yT5vB4nQ8jK3mZzDust', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '0.000001', token: 'SOL', type: 'DUST' },
  { id: '7', slot: '312882080', timestamp: '4m ago', from: 'Rug44DeployerX992811x772199291120038', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '100M', token: 'RUG', type: 'MARKET_INTEL' },
  { id: '4', slot: '312882087', timestamp: '5m ago', from: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '5,000', token: 'USDT', type: 'MINT' },
  { id: '5', slot: '312882076', timestamp: '8m ago', from: 'EyeS53e56c74808EEA832862AED571C56dF4C3C5fD9E', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '0.15', token: 'SOL', type: 'SPOOF' },
  { id: '6', slot: '312882065', timestamp: '11m ago', from: '5U398zH6pA2wM1nL9xT4vR7yB8jK2mQ5v', to: 'Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i', amount: '10.00', token: 'SOL', type: 'NEW' },
];

export const SolscanMirror: React.FC<SolscanMirrorProps> = ({ onCopy, activeType }) => {
  const [viewMode, setViewMode] = useState<'EXPLORER' | 'DEX_DISCOVERY'>('DEX_DISCOVERY');
  const [intelCA, setIntelCA] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (tx: SolscanTransaction) => {
    navigator.clipboard.writeText(tx.from);
    setCopiedId(tx.id);
    onCopy(tx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full h-full bg-[#050505] flex flex-col font-sans overflow-hidden border border-zinc-700 rounded-3xl shadow-inner relative">
      
      {/* HUD OVERLAY FOR INTEL */}
      {intelCA && (
        <div className="absolute inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-start justify-center p-4 md:p-8 overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
           <div className="w-full max-w-4xl bg-[#080808] border-2 border-zinc-700 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden mb-4">
              <button 
                onClick={() => setIntelCA(null)}
                className="absolute top-6 right-8 text-zinc-600 hover:text-white transition-colors uppercase font-black text-[9px] tracking-widest z-[210]"
              >
                CLOSE [X]
              </button>
              <MarketIntelAudit ca={intelCA} onDismiss={() => setIntelCA(null)} />
           </div>
        </div>
      )}

      {/* Solscan Header */}
      <div className="h-14 bg-[#0a0a0a] border-b border-zinc-800 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded flex items-center justify-center ${viewMode === 'EXPLORER' ? 'bg-blue-600' : 'bg-cyan-600 shadow-[0_0_12px_rgba(6,182,212,0.3)]'}`}>
            {viewMode === 'EXPLORER' ? <Search size={14} className="text-white" /> : <Globe size={14} className="text-white" />}
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            {viewMode === 'EXPLORER' ? 'Solscan Mirror' : 'Dexscreener Virtual Mirror'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-1 bg-black border border-zinc-800 rounded-lg flex">
             <button onClick={() => setViewMode('EXPLORER')} className={`px-4 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'EXPLORER' ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>Explorer</button>
             <button onClick={() => setViewMode('DEX_DISCOVERY')} className={`px-4 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'DEX_DISCOVERY' ? 'bg-cyan-600 text-white' : 'text-zinc-600 hover:text-zinc-400'}`}>Market Discovery</button>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Activity size={14} className="text-zinc-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Sub Header / Search */}
      <div className="p-6 bg-[#070707] border-b border-zinc-800/50 shrink-0">
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center text-zinc-600">
            <Search size={16} />
          </div>
          <input 
            disabled 
            placeholder={viewMode === 'EXPLORER' ? "Search by Address / Txn Hash..." : "Discovery Active: Scanning for Moonshot potential..."}
            className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-xs text-zinc-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#020202]">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="p-4 bg-cyan-600/5 border border-cyan-500/30 rounded-2xl flex items-center gap-6 animate-in slide-in-from-top-2 duration-500">
             <div className="w-10 h-10 bg-cyan-600/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-500">
                <Radar size={20} />
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Forensic Radar Active</p>
                <p className="text-[11px] text-zinc-400 font-bold italic uppercase leading-relaxed">VIGIL detected a discovery surface. Click the radar icon next to any CA to run a forensic autopsy.</p>
             </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <List size={16} className={viewMode === 'EXPLORER' ? 'text-blue-500' : 'text-cyan-500'} />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                {viewMode === 'EXPLORER' ? 'Recent Transactions' : 'Discovery Feed: Moonshots'}
              </h3>
            </div>
            <button className={`text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2 ${viewMode === 'EXPLORER' ? 'text-blue-500' : 'text-cyan-500'}`}>
              View All <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-[#0c0c0c] border-b border-zinc-800">
                <tr>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    {viewMode === 'EXPLORER' ? 'Signature' : 'Ticker'}
                  </th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                    {viewMode === 'EXPLORER' ? 'Slot' : 'Volume (24h)'}
                  </th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Age</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Contract Address (CA)</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Dev</th>
                  <th className="p-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-right">MCap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {TRANSACTIONS.map((tx) => {
                  const isMarketIntel = tx.type === 'MARKET_INTEL';
                  const isHighlighted = activeType === tx.type || (intelCA === tx.from);
                  
                  return (
                    <tr key={tx.id} className={`group transition-all hover:bg-white/[0.02] ${isHighlighted ? 'bg-cyan-600/5 ring-1 ring-inset ring-cyan-500/30' : ''}`}>
                      <td className={`p-4 font-black text-[10px] italic uppercase ${viewMode === 'EXPLORER' ? 'text-blue-500' : 'text-white'}`}>
                        {viewMode === 'EXPLORER' ? '5U39...8zH' : tx.token}
                      </td>
                      <td className="p-4 font-mono text-[10px] text-zinc-400">
                        {viewMode === 'EXPLORER' ? tx.slot : `$${Math.floor(Math.random() * 900)}k`}
                      </td>
                      <td className="p-4 text-[10px] text-zinc-500 italic">{tx.timestamp}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 group/addr relative">
                          <span className={`font-mono text-[10px] ${isHighlighted ? 'text-white font-bold' : 'text-zinc-400'}`}>{tx.from.slice(0, 8)}...{tx.from.slice(-8)}</span>
                          
                          <div className={`flex items-center gap-1 transition-all ${isMarketIntel ? 'opacity-100' : 'opacity-0 group-hover/addr:opacity-100'}`}>
                             <button 
                               onClick={() => setIntelCA(tx.from)}
                               title="VIGIL Pre-Copy Intel"
                               className={`p-1.5 rounded transition-all shadow-lg active:scale-95 flex items-center justify-center relative overflow-hidden ${
                                 isMarketIntel 
                                  ? 'bg-cyan-600 text-white animate-receive-orange hover:bg-cyan-500 scale-110' 
                                  : 'bg-zinc-700 text-zinc-400 hover:bg-cyan-600 hover:text-white'
                               }`}
                             >
                               <Radar size={12} className={isMarketIntel ? 'animate-pulse' : ''} />
                               {isMarketIntel && (
                                 <div className="absolute inset-0 border border-white/20 rounded animate-ping opacity-30" />
                               )}
                             </button>
                             <button 
                               onClick={() => handleCopy(tx)}
                               className={`p-1.5 rounded transition-all active:scale-95 ${copiedId === tx.id ? 'bg-emerald-600 text-white' : 'bg-zinc-800 border border-zinc-700 text-zinc-500 hover:border-blue-500 hover:text-blue-500'}`}
                             >
                               {copiedId === tx.id ? <Check size={12} /> : <Copy size={12} />}
                             </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-zinc-600 italic">0x8821...</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-[11px] font-black text-zinc-200">${tx.amount}k</span>
                          <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">SOL/USDC</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center gap-4 text-zinc-600 italic text-[10px]">
            <Clock size={12} />
            {viewMode === 'EXPLORER' ? 'Auto-refreshing block history every 400ms...' : 'Streaming Discovery Engine: Scoping Alpha...'}
          </div>
        </div>
      </div>
    </div>
  );
};