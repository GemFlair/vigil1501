import React, { useState } from 'react';
import { 
  Radar, Activity, ShieldAlert, Target, 
  BarChart3, Users, Zap, ExternalLink, 
  AlertTriangle, ShieldCheck, Fingerprint, 
  Search, Skull, Globe, MousePointer2, Info,
  TrendingUp, TrendingDown, Layers, Server
} from 'lucide-react';
import { analyzeMarketIntel, MarketIntelResponse } from '../services/geminiService';
import { TechLabel } from './docs/DocHelpers';
import { AddressGlyph } from './AddressGlyph';

export const MarketIntelAudit: React.FC<{ ca: string; onDismiss: () => void }> = ({ ca, onDismiss }) => {
  const [data, setData] = useState<MarketIntelResponse | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  React.useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await analyzeMarketIntel(ca);
        setData(res);
      } catch (e) {
        console.error("Market Audit Failed", e);
      } finally {
        setIsScanning(false);
      }
    };
    fetchIntel();
  }, [ca]);

  if (isScanning) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-in fade-in duration-500">
        <div className="relative">
          <Radar className="w-12 h-12 text-cyan-500 animate-spin-slow" />
          <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping opacity-20" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.5em] animate-pulse">Forensic_Liquidity_Autopsy</p>
          <p className="text-[8px] font-mono text-zinc-500 uppercase">MAPPING_CONTRACT_DNA: {ca.slice(0, 8)}...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isHighRisk = data.bundledSupply > 20 || data.creatorReputation === 'MALICIOUS' || data.honeypotRisk === 'CRITICAL';

  return (
    <div className="animate-in zoom-in duration-500 space-y-6 md:space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 md:pb-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center border-2 ${isHighRisk ? 'bg-red-600/10 border-red-500/40 text-red-500' : 'bg-cyan-600/10 border-cyan-500/40 text-cyan-500'} shadow-2xl`}>
            {isHighRisk ? <Skull size={24} /> : <Target size={24} />}
          </div>
          <div className="space-y-1">
            <h3 className={`text-lg md:text-2xl font-black italic uppercase tracking-tighter leading-none ${isHighRisk ? 'text-red-500' : 'text-white'}`}>
              {isHighRisk ? 'Critical Threat Detection' : 'Alpha Market Intel'}
            </h3>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHighRisk ? 'bg-red-500' : 'bg-cyan-500'}`} />
              <span className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">CA: {ca.slice(0, 8)}...{ca.slice(-4)}</span>
            </div>
          </div>
        </div>
        <div className="text-right space-y-1">
           <TechLabel text={data.verdict} color={isHighRisk ? 'red' : 'cyan'} />
           <div className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">REG_ID: VIG-INTEL-8821</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
        {/* LEFT COLUMN: DISTRIBUTION & BUNDLING */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          
          {/* DISTRIBUTION TIERS */}
          <div className="p-6 md:p-8 bg-black border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] space-y-6 md:space-y-8 shadow-inner relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
               <Layers size={14} className="text-blue-500" />
               <span className="text-[9px] md:text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Supply Distribution Matrix</span>
            </div>
            
            <div className="space-y-4 md:space-y-6 relative z-10">
               {[
                 { label: 'Top 10%', count: data.distribution.top10Count, color: 'from-red-600 to-red-400' },
                 { label: 'Top 20%', count: data.distribution.top20Count, color: 'from-amber-600 to-amber-400' },
                 { label: 'Top 50%', count: data.distribution.top50Count, color: 'from-blue-600 to-blue-400' }
               ].map((tier, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between items-end px-1">
                       <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest">{tier.label} Supply held by:</span>
                       <span className="text-sm md:text-lg font-black text-white italic leading-none">{tier.count} WALLETS</span>
                    </div>
                    <div className="h-1 md:h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                       <div className={`h-full bg-gradient-to-r ${tier.color} transition-all duration-1000`} style={{ width: `${Math.max(10, 100 - (tier.count * 2))}%` }} />
                    </div>
                 </div>
               ))}
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
               <BarChart3 size={100} />
            </div>
          </div>

          {/* BUNDLING FORENSICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             <div className="p-4 md:p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3">
                   <Server size={12} className="text-purple-500" />
                   <span className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bundling Check</span>
                </div>
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <div className="text-xl md:text-2xl font-black text-white italic leading-none">{data.clusterCount}</div>
                      <div className="text-[7px] md:text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Active Clusters</div>
                   </div>
                   <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded text-[8px] md:text-[10px] font-black uppercase ${data.bundledSupply > 20 ? 'bg-red-600/10 text-red-500' : 'bg-emerald-600/10 text-emerald-500'}`}>
                      {data.bundledSupply}% BUNDLED
                   </div>
                </div>
             </div>

             <div className="p-4 md:p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3">
                   <Users size={12} className="text-cyan-500" />
                   <span className="text-[9px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Wallet Connections</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <div className="text-lg md:text-xl font-black text-red-500 italic leading-none">{data.devWalletsConnected}</div>
                      <div className="text-[6px] md:text-[7px] text-zinc-700 font-bold uppercase tracking-widest">DEV_LINKED</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-lg md:text-xl font-black text-emerald-500 italic leading-none">{data.nonDevWalletsConnected}</div>
                      <div className="text-[6px] md:text-[7px] text-zinc-700 font-bold uppercase tracking-widest">ORGANIC</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVITY & SIGNALS */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
           
           {/* ACTIVITY PULSE (1H) */}
           <div className="p-6 md:p-8 bg-black border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                 <div className="flex items-center gap-2 md:gap-3">
                    <Activity size={14} className="text-emerald-500" />
                    <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Volume Pulse (60m)</span>
                 </div>
                 <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[7px] md:text-[8px] font-black text-emerald-500 animate-pulse">LIVE_SYNC</div>
              </div>
              
              <div className="flex items-end gap-1 h-24 md:h-32 relative">
                 {[40, 60, 45, 90, 30, 70, 85, 50, 40, 65, 80, 55, 95, 45].map((h, i) => (
                   <div key={i} className="flex-1 bg-zinc-800 rounded-t-sm relative group/bar">
                      <div 
                        className="absolute bottom-0 w-full bg-emerald-500/40 rounded-t-sm transition-all duration-700" 
                        style={{ height: `${h}%` }} 
                      />
                      {i > 10 && (
                        <div 
                           className="absolute bottom-0 w-full bg-red-600/60 rounded-t-sm animate-pulse" 
                           style={{ height: `${h * 0.4}%` }} 
                        />
                      )}
                   </div>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-3 md:pt-4 border-t border-zinc-800">
                 <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-emerald-500">
                       <TrendingUp size={12} />
                       <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">New Buyers</span>
                    </div>
                    <div className="text-xl md:text-2xl font-black text-white italic leading-none">{data.activity1h.newBuyers}</div>
                 </div>
                 <div className="space-y-0.5 text-right">
                    <div className="flex items-center gap-2 text-red-500 justify-end">
                       <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Old Sellers</span>
                       <TrendingDown size={12} />
                    </div>
                    <div className="text-xl md:text-2xl font-black text-white italic leading-none">{data.activity1h.oldSellers}</div>
                 </div>
              </div>
           </div>

           {/* CREATOR REPUTATION / DNA */}
           <div className="p-6 md:p-8 bg-zinc-950 border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6">
              <div className="flex items-center gap-2 md:gap-3">
                 <Fingerprint size={14} className="text-purple-500" />
                 <span className="text-[9px] md:text-[11px] font-black text-zinc-400 uppercase tracking-[0.3em]">Developer DNA Signature</span>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[12px] md:text-[14px] font-black text-white italic uppercase">{data.creatorReputation} REPUTATION</span>
                    <TechLabel text={data.creatorReputation === 'MALICIOUS' ? 'FLAGGED_ADVERSARY' : 'CLEAN_PROVENANCE'} color={data.creatorReputation === 'MALICIOUS' ? 'red' : 'emerald'} />
                 </div>
                 <p className="text-[9px] md:text-[11px] text-zinc-500 leading-relaxed font-medium italic">
                    {data.creatorReputation === 'MALICIOUS' 
                      ? "The creator wallet is linked to 3 previous drainer/rug-pull deployments in the last 90 days."
                      : "No previous adversarial signatures detected in global reputation mesh."}
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* FINAL VERDICT ACTION */}
      <div className="pt-6 md:pt-10 border-t border-zinc-800 space-y-4 md:space-y-6">
         <div className={`p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border-2 flex items-start gap-6 md:gap-8 ${isHighRisk ? 'bg-red-600/5 border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.1)]' : 'bg-cyan-600/5 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.1)]'}`}>
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${isHighRisk ? 'bg-red-600/20 text-red-500' : 'bg-cyan-600/20 text-cyan-500'}`}>
               <Info className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div className="space-y-1">
               <h5 className={`text-[10px] md:text-[12px] font-black uppercase tracking-tighter ${isHighRisk ? 'text-red-500' : 'text-cyan-500'}`}>Sentinel Tactical Conclusion</h5>
               <p className="text-sm md:text-lg text-zinc-400 font-medium leading-tight md:leading-relaxed italic">
                  "Analysis of {ca.slice(0, 4)}... indicates {isHighRisk ? 'systemic manipulation risks.' : 'organic market participation.'} {data.verdict} Proceed only if intent matches risk appetite."
               </p>
            </div>
         </div>

         <div className="flex gap-4">
            <button 
              onClick={onDismiss}
              className={`flex-1 py-4 md:py-6 rounded-2xl md:rounded-3xl text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] transition-all shadow-2xl active:scale-95 ${isHighRisk ? 'bg-red-600 text-white hover:bg-red-500' : 'bg-white text-black hover:bg-cyan-600 hover:text-white'}`}
            >
               {isHighRisk ? 'ABORT: HIGH_EXTORTION_RISK' : 'CONFIRM: SETTLE_ALPHA_ENTRY'}
            </button>
         </div>
      </div>
      
      <p className="text-center text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-[0.6em] md:tracking-[0.8em] pb-2 md:pb-4">
        VIGILANCE_IS_THE_ONLY_PERMANENT_SHIELD
      </p>
    </div>
  );
};