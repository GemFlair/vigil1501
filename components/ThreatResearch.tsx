
import React, { useState, useEffect, useRef } from 'react';
import { Book, ShieldX, Zap, Info, ArrowRight, Binary, AlertCircle, XCircle, ChevronRight, Activity, Crosshair, BarChart3, Database, ShieldCheck, Clock, Triangle, Share2, Target, Eye, Fingerprint } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

const IntelFolder = ({ 
  title, 
  items, 
  description, 
  icon, 
  theme, 
  metadata,
  isWide = false
}: { 
  title: string, 
  items?: string[], 
  description?: string, 
  icon: React.ReactNode, 
  theme: 'red' | 'blue' | 'orange',
  metadata: { label: string, value: string },
  isWide?: boolean
}) => {
  const themeStyles = {
    red: {
      border: 'border-red-900/45 group-hover:border-red-500/65',
      glow: 'bg-red-500/5',
      accent: 'text-red-500',
      dot: 'bg-red-500',
      label: 'bg-red-500/10 text-red-500 border-red-500/20'
    },
    blue: {
      border: 'border-blue-900/45 group-hover:border-blue-500/65',
      glow: 'bg-blue-500/5',
      accent: 'text-blue-500',
      dot: 'bg-blue-500',
      label: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    },
    orange: {
      border: 'border-orange-900/45 group-hover:border-orange-500/65',
      glow: 'bg-orange-500/5',
      accent: 'text-orange-500',
      dot: 'bg-orange-500',
      label: 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    }
  }[theme];

  return (
    <div className={`relative group ${isWide ? 'col-span-full' : 'col-span-1'} opacity-100 translate-y-0`}>
      <div className={`absolute -inset-x-4 -inset-y-4 ${themeStyles.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className={`relative h-full glass bg-zinc-950/40 border ${themeStyles.border} rounded-[16px] p-6 md:p-8 flex flex-col gap-6 overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-full group-hover:animate-scanner-pass pointer-events-none" />
        <div className="absolute top-4 right-6 flex items-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <span className="text-[7px] font-mono font-bold uppercase tracking-widest text-zinc-500">{metadata.label}</span>
          <span className={`text-[7px] font-mono font-bold uppercase tracking-widest ${themeStyles.accent}`}>{metadata.value}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-[12px] bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${themeStyles.accent}`}>
            {icon}
          </div>
          <h4 className={`text-xs md:text-sm font-black uppercase tracking-[0.3em] italic ${themeStyles.accent}`}>
            {title}
          </h4>
        </div>
        {description ? (
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-medium italic">
            "{description}"
          </p>
        ) : (
          <ul className="space-y-4 flex-1">
            {items?.map((item, i) => (
              <li key={i} className="flex items-center gap-3 group/item">
                <div className={`w-1.5 h-1.5 rounded-full ${themeStyles.dot} shadow-[0_0_8px_rgba(var(--${theme}-rgb),0.5)]`} />
                <span className="text-[11px] md:text-[13px] font-black text-zinc-400 uppercase tracking-tight group-hover/item:text-white transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
           <div className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest ${themeStyles.label}`}>
             Verified_Intel
           </div>
           <div className="w-8 h-8 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
             <div className={`w-full h-full border-r-[1px] border-b-[1px] rounded-br-[8px] ${themeStyles.accent.replace('text-', 'border-')}`} />
           </div>
        </div>
      </div>
    </div>
  );
};

const IntentIntegrityDiagram = () => (
  <div className="w-full py-10 px-6 bg-[#050505] rounded-[16px] border border-zinc-800 relative overflow-hidden group">
    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-center">
      <div className="space-y-8 text-center">
        <div className="inline-block px-5 py-2 bg-blue-500/10 border border-blue-500/35 rounded-[8px] text-[11px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">
          01. Intent Origination
        </div>
        <div className="py-12 px-8 bg-zinc-900/30 border border-zinc-800 rounded-[12px] space-y-4">
          <h4 className="text-white font-black uppercase italic tracking-tighter text-base">Human Intent</h4>
          <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">"Trusted Destination"</p>
          <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
          <p className="text-[11px] text-zinc-400 font-medium">User selects address based on visual context.</p>
        </div>
      </div>
      <div className="space-y-8 text-center relative">
        <div className="hidden md:block absolute -left-14 top-1/2 -translate-y-1/2 z-0">
           <ArrowRight className="w-10 h-10 text-zinc-800/50" />
        </div>
        <div className="inline-block px-6 py-2 bg-red-500/25 border border-red-500/45 rounded-[8px] text-[11px] font-black text-red-500 uppercase tracking-[0.3em] mb-2 animate-pulse">
          02. Context Loss (The Gap)
        </div>
        <div className="py-16 px-10 bg-red-600/10 border-2 border-red-500/45 rounded-[12px] space-y-6 shadow-[0_0_60px_rgba(239,68,68,0.15)] relative z-10">
          <h4 className="text-red-500 font-black uppercase italic tracking-tighter text-lg">Cognitive Compression</h4>
          <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">Address → Visual Fingerprint</p>
          <div className="space-y-2">
             <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full w-3/4 bg-red-600 shadow-[0_0_15px_#ef4444]" />
             </div>
             <p className="text-[9px] text-zinc-300 font-black tracking-widest">CRITICAL LOSS OF GRANULARITY</p>
          </div>
        </div>
        <div className="hidden md:block absolute -right-14 top-1/2 -translate-y-1/2 z-0">
           <ArrowRight className="w-10 h-10 text-zinc-800/50" />
        </div>
      </div>
      <div className="space-y-8 text-center">
        <div className="inline-block px-5 py-2 bg-zinc-800/65 border border-zinc-700/65 rounded-[8px] text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-2">
          03. Execution Settlement
        </div>
        <div className="py-12 px-8 bg-zinc-950/80 border border-zinc-800 rounded-[12px] space-y-4 opacity-50">
          <h4 className="text-zinc-300 font-black uppercase italic tracking-tighter text-base">Signature</h4>
          <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">"Malicious Payload"</p>
          <div className="h-[1px] w-12 bg-zinc-800 mx-auto" />
          <p className="text-[11px] text-zinc-600 font-bold uppercase tracking-tighter">Irreversible Finality</p>
        </div>
      </div>
    </div>
    <div className="mt-16 pt-10 border-t border-zinc-800 flex justify-center">
      <p className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.5em] italic text-center">
        The cognitive gap: where cryptography is correct, but intent is wrong.
      </p>
    </div>
  </div>
);

export const ThreatResearch: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void }> = ({ onOpenDoc }) => {
  const researchCards = [
    { icon: <Binary className="w-5 h-5" />, title: "Attack Surface", color: "blue", desc: "Browser DOM and Copy-Paste workflows: inside the 0.5 interception layer." },
    { icon: <Activity className="w-5 h-5" />, title: "Impact Analysis", color: "red", desc: "Prevents irreversible asset loss by identifying context loss before wallet invocation." },
    { icon: <Crosshair className="w-5 h-5" />, title: "Conclusion", color: "emerald", desc: "Prevention must occur at intent formation. Defenses after Layer 1 activation are insufficient." },
    { icon: <Clock className="w-5 h-5" />, title: "Temporal Mapping", color: "amber", desc: "Correlates transaction arrival times with history to identify automated poisoning campaigns." },
    { icon: <Info className="w-5 h-5" strokeWidth={2.5} />, title: "Trust Assumptions", color: "blue", desc: "Evaluates visual shortcuts and prefix/suffix matching patterns.", isSpecial: true },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Heuristic Entropy", color: "cyan", desc: "Detects non-random prefix/suffix collisions generated by vanity clusters." },
    { icon: <Database className="w-5 h-5" />, title: "Risk Thresholds", color: "orange", desc: "Escalates warnings based on destination age and historical frequency." },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Integrity Logic", color: "emerald", desc: "Verifies user intent against destination metadata from DOM context." }
  ];

  return (
    <section id="research-intro" className="px-6 md:px-20 py-8 bg-[#020202] relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-8 max-w-2xl flex flex-col items-center lg:items-start">
            <div className={`flex items-center gap-5 justify-center lg:justify-start opacity-100 translate-y-0`}>
              <button 
                onClick={() => onOpenDoc?.('research_01')}
                className="group px-4 py-1.5 bg-blue-600/10 border border-blue-500/35 rounded-[4px] text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mono hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20_rgba(59,130,246,0.3)]"
              >
                VG-RP-25-01
              </button>
              <div className="h-[1px] w-16 bg-zinc-800" />
              <span className="text-[11px] text-zinc-400 font-black uppercase tracking-[0.5em]">Official Research Briefing</span>
            </div>
            
            <h2 className={`text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8] text-center lg:text-left w-full opacity-100 translate-y-0`}>
              Threat Model: <br/>
              Layer 0.5 Security.
            </h2>
            
            <div className={`py-10 px-8 bg-cyan-600/5 border border-cyan-500/45 rounded-[24px] md:rounded-[32px] space-y-6 shadow-2xl relative group overflow-hidden w-full opacity-100 translate-y-0 scale-100 blur-0 mt-8`}>
               <div className={`absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-500/55 opacity-100 translate-x-0 translate-y-0`} />
               <div className={`absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-cyan-500/55 opacity-100 translate-x-0 translate-y-0`} />
               <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] text-center lg:text-left relative z-10">Canonical Definition</h4>
               <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic text-center lg:text-left relative z-10">
                 "VIGILANCE AT THE RETINAL PERIMETER. A local-first interception model that restores human awareness where dApp interfaces fail, creating an immutable bridge of intent in a hostile ecosystem."
               </p>
               <div className="pt-2 flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <button 
                    onClick={() => onOpenDoc?.('research_01')}
                    className="w-full md:w-auto px-6 py-3 bg-cyan-500/10 border border-cyan-500/45 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all rounded-[12px] flex items-center justify-center gap-3 group/btn"
                  >
                    Read Full Research Briefing
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <div className="hidden md:block h-[1px] flex-1 bg-zinc-800" />
                  <span className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.4em]">Protocol Standard VG-0.5-S</span>
               </div>
               <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-full pointer-events-none`} />
            </div>
          </div>
          <div className={`lg:min-w-[400px] space-y-8 pb-8 border-l-0 lg:border-l-2 border-zinc-800 pl-0 lg:pl-10 flex flex-col items-center lg:items-start opacity-100 translate-y-0`}>
            <h4 className="inline-block px-5 py-2 bg-white rounded-[8px] text-lg md:text-sm font-black text-black uppercase tracking-[0.3em] mb-2 shadow-xl whitespace-nowrap">
              • Clarifying Scope •
            </h4>
            <div className="space-y-4 text-[11px] font-bold text-zinc-100 uppercase tracking-[0.2em] leading-relaxed italic">
              <p className="flex items-start gap-3"><span className="text-blue-500">•</span> Independent of L0/L1/L2 protocol architectures.</p>
              <p className="flex items-start gap-3"><span className="text-red-500">•</span> Non-participant in consensus, execution, settlement, or scaling.</p>
              <p className="flex items-start gap-3"><span className="text-emerald-500">•</span> Operates as a human-intent observation primitive.</p>
              <p className="flex items-start gap-3"><span className="text-cyan-500">•</span> Validates state prior to cryptographic commitment.</p>
            </div>
          </div>
        </div>
        <div className="space-y-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
              <IntelFolder theme="red" title="Assets at Risk" icon={<AlertCircle className="w-5 h-5" />} items={["User-held digital assets", "Transaction intent integrity", "Trust in wallet interfaces", "Historical context"]} metadata={{ label: 'THREAT_LEVEL', value: 'HIGH' }} />
              <IntelFolder theme="blue" title="Attack Preconditions" icon={<Zap className="w-5 h-5" />} items={["Historical transaction state visibility", "Wallet UI reliance on address truncation", "Zero-value transfer propagation"]} metadata={{ label: 'SYSTEM_STATE', value: 'VULNERABLE' }} />
              <div className="hidden lg:flex col-span-full items-center justify-center -my-6 relative z-20">
                 <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/20 to-orange-500/20" />
              </div>
              <IntelFolder theme="orange" title="Adversary Capabilities" icon={<Target className="w-5 h-5" />} description="Attackers utilize high-performance vanity clusters to replicate historical destinations, injecting deceptive context into your recent transaction stream." metadata={{ label: 'VECTOR_ID', value: '0x8821_POISON' }} isWide />
           </div>
           <div className={`opacity-100 translate-y-0`}>
              <IntentIntegrityDiagram />
           </div>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-0 opacity-100 translate-y-0`}>
          {researchCards.map((card, i) => (
            <div key={i} className="p-10 bg-[#080808] border border-zinc-800 rounded-[16px] space-y-5 transition-all duration-500 group shadow-lg relative overflow-hidden hover:border-zinc-600 hover:-translate-y-1">
              <div className={`flex items-center gap-3 text-zinc-600 transition-colors ${ card.color === 'blue' ? 'group-hover:text-blue-500' : card.color === 'red' ? 'group-hover:text-red-500' : card.color === 'cyan' ? 'group-hover:text-cyan-500' : card.color === 'amber' ? 'group-hover:text-amber-500' : card.color === 'orange' ? 'group-hover:text-orange-500' : 'group-hover:text-emerald-500' }`}>
                {card.icon}
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] italic">{card.title}</h4>
              </div>
              {card.isSpecial && (
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <Info className="w-20 h-20 text-blue-500" />
                </div>
              )}
              {card.title === 'Trust Assumptions' ? (
                <div className="space-y-6 relative z-10">
                  {[ { label: "History Integrity", val: "History can be poisoned" }, { label: "Visual Sufficiency", val: "Suffix matching is insufficient" }, { label: "Execution = Intent", val: "Wallet UI != User Intent" } ].map((item, j) => (
                    <div key={j} className="space-y-1">
                      <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <ChevronRight className="w-2 h-2 text-zinc-800" /> {item.label}
                      </div>
                      <div className="text-[11px] font-black text-red-500 uppercase tracking-tight italic">{item.val}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">
                  {card.desc}
                </p>
              )}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:animate-[shine_1.5s_ease-in-out]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
