import React, { useState, useEffect, useRef } from 'react';
import { 
  XCircle, Ghost, EyeOff, ZapOff, Database, 
  Trash2, ShieldX, Terminal, Activity, 
  Lock, Radio, Cpu, RefreshCcw, CheckCircle2,
  AlertTriangle, Crosshair, Flame, Clock, 
  Target, Zap, Microscope, Construction, Info
} from 'lucide-react';
import { TechLabel, TechNote } from './docs/DocHelpers';

interface DiscardItem {
  id: string;
  label: string;
  description: string;
  category: string;
}

const PROMPT_PREFIX = '>>';

const BLOAT_ITEMS: DiscardItem[] = [
  { id: 'VAPORWARE', label: 'Narrative Vaporware', description: 'Talking for months before a single primitive is shipped.', category: 'EXECUTION_FAIL' },
  { id: 'FALSE_SAFE', label: '100% Safety Claims', description: 'Dishonest marketing claiming to stop every scam in existence.', category: 'DECEPTION' },
  { id: 'TELEMETRY', label: 'Cloud-Side Telemetry', description: 'Server-side logging of your clicks, navigation, and timing.', category: 'DATA_MINING' },
  { id: 'SHORT_TERM', label: 'Short-Term Pump Cycle', description: 'Building for the current hype cycle rather than multi-year utility.', category: 'INSTABILITY' },
  { id: 'MIDDLEMAN', label: 'RPC Interception', description: 'Acting as a middleman between your wallet and the blockchain.', category: 'CENTRALIZATION' },
  { id: 'CUSTODY', label: 'Escrow / Custody', description: 'Touching or holding private keys under the guise of safety.', category: 'RISK' }
];

export const DefinitiveNonGoals: React.FC = () => {
  const [discarded, setDiscarded] = useState<Set<string>>(new Set());
  const [simState, setSimState] = useState<'IDLE' | 'ACTIVE' | 'CALIBRATED'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const handleDiscard = (id: string) => {
    if (discarded.has(id)) return;
    const item = BLOAT_ITEMS.find(i => i.id === id);
    addLog(`NEUTRALIZING: ${item?.label}... [DELETED]`);
    
    const next = new Set(discarded);
    next.add(id);
    setDiscarded(next);

    if (next.size === BLOAT_ITEMS.length) {
      setTimeout(() => {
        setSimState('CALIBRATED');
        addLog("SYSTEM_PURITY_VERIFIED: 100%");
      }, 800);
    }
  };

  const resetSim = () => {
    setDiscarded(new Set());
    setSimState('IDLE');
    setLogs([]);
  };

  return (
    <section id="non-goals" className="px-1 md:px-20 py-12 md:py-24 bg-[#020202] relative overflow-hidden">
      {/* Background Redaction Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,white_21px,white_22px)]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24 relative z-10 px-2 md:px-0">
        
        {/* HEADER: WHAT WE ARE NOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="lg:col-span-7 space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <TechLabel text="STRATEGIC REFUSALS" color="red" />
              <div className="h-[1px] w-8 md:w-12 bg-zinc-900" />
            </div>
            <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              DEFINITIVE <br/> NON-GOALS.
            </h2>
          </div>
          <div className="lg:col-span-5 pb-2 md:pb-4">
            <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed italic border-l-4 border-red-950 pl-6 md:pl-8">
              "We are defined by what we refuse to be. VIGIL is a <span className="text-white">permanent security primitive,</span> built on honesty."
            </p>
          </div>
        </div>

        {/* CORE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { t: "No Short-Term Horizon", d: "VIGIL is architecting a multi-year standard for human-layer security. We build for the terminal state.", i: <Clock className="text-red-500" />, tag: "PERSISTENCE" },
            { t: "No False Guarantees", d: "Any system claiming 100% safety is a risk. VIGIL is a probabilistic filter. We respect final authority.", i: <ShieldX className="text-red-500" />, tag: "ENGINEERING" },
            { t: "No Narrative-First", d: "We do not talk first and deliver later. If it is in the UI, it is already in the registry.", i: <Construction className="text-red-500" />, tag: "PRIMITIVE" },
            { t: "No Behavioral Monitoring", d: "We do not store or mirror your activity. We reject the standard model of harvesting user context.", i: <EyeOff className="text-red-500" />, tag: "SOVEREIGNTY" },
            { t: "No Middleman Interference", d: "VIGIL sits in the DOM, not the RPC. We do not act as a gateway for your execution.", i: <ZapOff className="text-red-500" />, tag: "NON_CUSTODIAL" },
            { t: "No Mercenary Inducement", d: "XP is a measure of forensic reputation, not an invitation to financial speculation.", i: <Target className="text-red-500" />, tag: "MERIT_LEDGER" }
          ].map((card, i) => (
            <div key={i} className="p-6 md:p-8 bg-[#080808] border border-zinc-900 rounded-[1.5rem] md:rounded-[2rem] space-y-4 md:space-y-6 group hover:border-red-900/50 transition-all duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:rotate-12 transition-transform">
                  {card.i}
               </div>
               <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                     {React.cloneElement(card.i as React.ReactElement<{ size?: number }>, { size: 18 })}
                  </div>
                  <span className="text-[7px] md:text-[8px] font-black text-red-900 uppercase tracking-widest border border-red-900/20 px-2 py-0.5 rounded">{card.tag}</span>
               </div>
               <div className="space-y-2 md:space-y-3">
                  <h4 className="text-[13px] md:text-[14px] font-black text-white uppercase tracking-widest leading-none italic">{card.t}</h4>
                  <p className="text-[10px] md:text-[11px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed italic">{card.d}</p>
               </div>
            </div>
          ))}
        </div>

        {/* SIMULATION: THE DISCARD PHASE */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-blue-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.5em]">Interactive Calibration</span>
            <h3 className="text-2xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">The Discard Phase.</h3>
          </div>

          <div className="px-2 md:px-20 py-4 md:py-10 max-w-7xl mx-auto animate-in fade-in duration-1000">
            <div className="p-6 md:p-12 bg-[#0a0a0a] border border-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Trash2 size={120} />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                    <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">System Definition: Purity Protocol</h4>
                  </div>
                  <p className="text-lg md:text-3xl text-zinc-300 font-medium leading-relaxed italic border-l-4 border-red-600/30 pl-6 md:pl-8">
                    "Simulates the process of system purification by physically neutralizing non-essential features."
                  </p>
                </div>
                <div className="lg:col-span-4 p-6 md:p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4">
                  <h5 className="text-[12px] md:text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                    <Microscope size={16} className="text-red-500" /> Objective
                  </h5>
                  <p className="text-[10px] md:text-[12px] text-zinc-500 font-bold uppercase leading-relaxed italic">
                    Identify and delete the "bloat" items in the grid. Calibrates your understanding of system purity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-[1px] bg-gradient-to-br from-zinc-800 via-zinc-900 to-transparent rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden transition-all duration-700 ${simState === 'CALIBRATED' ? 'from-emerald-600/40 shadow-emerald-500/10' : ''}`}>
            <div className="bg-[#050505] rounded-[1.95rem] md:rounded-[3.45rem] p-6 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:30px_30px] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch min-h-[400px] md:min-h-[500px]">
                
                {/* LEFT: TERMINAL */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="p-6 md:p-8 bg-black border border-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] flex-1 flex flex-col justify-between shadow-inner">
                    <div className="space-y-6">
                       <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                          <div className="flex items-center gap-3">
                             <Terminal className="text-zinc-600" size={12} />
                             <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Purity_Log</span>
                          </div>
                          <div className={`w-2 h-2 rounded-full animate-pulse ${simState === 'CALIBRATED' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                       </div>
                       
                       <div className="space-y-2 font-mono text-[9px] text-zinc-600 h-32 md:h-40 overflow-hidden">
                          {logs.map((log, i) => (
                            <div key={i} className="animate-in slide-in-from-left-2 duration-300">
                               <span className="text-zinc-800">>></span> {log}
                            </div>
                          ))}
                          {logs.length === 0 && <p className="animate-pulse">Awaiting sequence...</p>}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-900 space-y-4">
                       <div className="flex justify-between items-center px-1">
                          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Progress</span>
                          <span className="text-[10px] font-black text-white italic">{Math.round((discarded.size / BLOAT_ITEMS.length) * 100)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                          <div className={`h-full transition-all duration-700 ${simState === 'CALIBRATED' ? 'bg-emerald-500' : 'bg-red-600'}`} style={{ width: `${(discarded.size / BLOAT_ITEMS.length) * 100}%` }} />
                       </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: INTERACTIVE ZONE */}
                <div className="lg:col-span-8 relative">
                   {simState === 'CALIBRATED' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-1000">
                        <div className="relative">
                           <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] md:rounded-[3rem] border-2 border-emerald-500/40 flex items-center justify-center bg-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.1)]">
                              <CheckCircle2 size={48} className="text-emerald-500" strokeWidth={1} />
                           </div>
                        </div>
                        <div className="space-y-3 px-4">
                           <h4 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter">System Purified.</h4>
                           <p className="text-zinc-500 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-sm mx-auto">
                              "Falsehoods neutralized. You are now aligned with the <span className="text-emerald-500">True VIGIL Standard.</span>"
                           </p>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 animate-in fade-in duration-700">
                        {BLOAT_ITEMS.map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => handleDiscard(item.id)}
                            className={`p-5 md:p-6 text-left rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 group relative overflow-hidden flex flex-col justify-between ${discarded.has(item.id) ? 'bg-black border-red-900/10 grayscale opacity-10 scale-95 pointer-events-none' : 'bg-zinc-900/20 border-zinc-800 hover:border-red-600/40 hover:bg-red-600/[0.02]'}`}
                          >
                             <div className="space-y-3 relative z-10">
                                <div className="flex items-center justify-between">
                                   <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[6px] md:text-[7px] font-black text-zinc-500 uppercase tracking-widest">{item.category}</div>
                                   <div className={`p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-red-600/40 transition-colors ${discarded.has(item.id) ? '' : 'group-hover:text-red-600'}`}>
                                      <Trash2 size={10} />
                                   </div>
                                </div>
                                <div className="space-y-1">
                                   <h5 className="text-[12px] md:text-[14px] font-black text-white uppercase tracking-tight italic leading-tight">{item.label}</h5>
                                   <p className="text-[9px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-tight">
                                      {item.description}
                                   </p>
                                </div>
                             </div>
                             <div className="pt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Flame size={10} className="text-red-600" />
                                <span className="text-[7px] font-black text-red-600 uppercase tracking-widest">NEUTRALIZE</span>
                             </div>
                          </button>
                        ))}
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};