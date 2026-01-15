
import React, { useState, useEffect, useRef } from 'react';
import { MousePointer2, Zap, Smartphone, ChevronRight, Info, ShieldCheck, ChevronDown, Activity, Loader2, Target, AlertTriangle, Map, ShieldAlert, Fingerprint, Eye, Binary, Search, CheckCircle2, ShieldX, Map as MapIcon, Gauge, Terminal, Radio } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';
import { AddressGlyph } from './AddressGlyph';
import { FacilityArchitecture } from './FacilityArchitecture';
import { playSuccessChime, playDeniedSound } from '../utils/audio';

const TechnicalScanGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
    <div className="absolute inset-[-100px] opacity-[0.15] bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-drift" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#020202_85%)]" />
  </div>
);

const VisualDeceptionShield = () => (
  <div className="p-10 md:p-14 bg-[#080808] border-2 border-zinc-700 rounded-[24px] md:rounded-[32px] relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-red-600/25">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none">
       <div className="text-[25rem] font-black text-white leading-none">X</div>
    </div>
    <div className="relative z-10 space-y-10">
      <div className="space-y-4">
        <span className="text-red-600 font-black text-[11px] md:text-[13px] uppercase tracking-[0.5em] block mb-2">Visual Deception Shield</span>
        <h2 className="text-3xl md:text-[3.25rem] font-black text-white italic uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
          STOP <br/> ADDRESS <br/> POISONING.
        </h2>
      </div>
      <div className="space-y-6 pt-4">
        <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed italic">
          VIGIL intercepts attacks inside the browser DOM, where most address poisoning originates, <span className="text-white">validating belief against reality.</span>
        </p>
      </div>
      <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-700">
         <div className="flex items-center gap-4 px-6 py-3 bg-blue-600/10 border border-blue-500/25 rounded-full shadow-lg group-hover:bg-blue-600/20 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Monitoring</span>
         </div>
         <div className="text-center md:text-right">
            <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none">Protected By</div>
            <div className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mt-1 italic">0.5 Primitive</div>
         </div>
      </div>
    </div>
  </div>
);

const ShatterShard: React.FC<{ index: number; isShattering: boolean }> = ({ index, isShattering }) => {
  const paths = [
    "polygon(0% 0%, 30% 0%, 15% 40%)",
    "polygon(30% 0%, 60% 0%, 45% 40%)",
    "polygon(60% 0%, 100% 0%, 80% 40%)",
    "polygon(0% 0%, 15% 40%, 0% 50%)",
    "polygon(100% 0%, 100% 50%, 80% 40%)",
    "polygon(0% 50%, 15% 40%, 40% 60%, 0% 100%)",
    "polygon(100% 50%, 80% 40%, 60% 60%, 100% 100%)",
    "polygon(15% 40%, 45% 40%, 40% 60%)",
    "polygon(45% 40%, 80% 40%, 60% 60%)",
    "polygon(40% 60%, 60% 60%, 50% 100%)",
    "polygon(0% 100%, 50% 100%, 40% 60%)",
    "polygon(50% 100%, 100% 100%, 60% 60%)"
  ];
  return (
    <div 
      className={`absolute inset-0 bg-emerald-500/30 border border-emerald-400/50 backdrop-blur-md pointer-events-none transition-all duration-[800ms] ease-out ${
        isShattering ? `shard-chaos-anim-${index % 12}` : 'opacity-0'
      }`}
      style={{ clipPath: paths[index % 12], transformStyle: 'preserve-3d', zIndex: 100 + index }}
    />
  );
};

const WalletSimulator = ({ onUnlock, currentLevel, onFail, onOpenMap, onIntegratedChange }: { onUnlock: () => void, currentLevel: number, onFail: () => void, onOpenMap: () => void, onIntegratedChange: (val: boolean) => void }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [outcome, setOutcome] = useState<'IDLE' | 'BREACH' | 'VERIFIED'>('IDLE');
  const [autopsyActive, setAutopsyActive] = useState(false);
  const [isShattering, setIsShattering] = useState<boolean>(false);
  const [isIntegrated, setIsIntegrated] = useState(false);
  
  const isDecrypted = currentLevel >= 2;
  const targetAddress = "Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90";
  const poisonAddress = "Ab1C00000000000000000000000000Zz90";

  useEffect(() => {
    if (isDecrypted && !isIntegrated) {
      const timer = setTimeout(() => {
        setIsShattering(true);
        setTimeout(() => {
          setIsIntegrated(true);
          onIntegratedChange(true);
        }, 800);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDecrypted, isIntegrated, onIntegratedChange]);

  const handleIntercept = (type: 'FRIEND' | 'POISON') => {
    if (isDecrypted || isSyncing || autopsyActive) return;
    setAutopsyActive(true);
    setIsSyncing(true);
    if (type === 'FRIEND') {
      playSuccessChime();
      setOutcome('VERIFIED');
      setTimeout(() => {
        onUnlock();
        setIsSyncing(false);
      }, 800);
    } else {
      playDeniedSound();
      setOutcome('BREACH');
      onFail();
      setTimeout(() => {
        setAutopsyActive(false);
        setIsSyncing(false);
        setOutcome('IDLE');
      }, 4000);
    }
  };

  if (isIntegrated) return null;

  return (
    <div className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isShattering ? 'scale-125 opacity-0' : 'opacity-100'}`} style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
      <div className={`p-10 md:p-14 bg-[#0a0a0a] border transition-all duration-700 rounded-[24px] md:rounded-[32px] relative overflow-hidden group shadow-2xl ${isDecrypted ? 'border-emerald-500/45 shadow-[0_0_80px_rgba(16,185,129,0.05)]' : 'border-zinc-700'} ${isShattering ? 'pointer-events-none' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {isShattering && (
          <div className="absolute inset-0 z-[120] overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
               <ShatterShard key={i} index={i} isShattering={isShattering} />
             ))}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white blur-[120px] animate-shatter-flash rounded-full opacity-0 z-10" />
          </div>
        )}
        <div className={`transition-all duration-700 ${isShattering ? 'opacity-0 scale-110 blur-2xl grayscale' : 'opacity-100'}`}>
          <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-center px-8">
            {isDecrypted ? (
              <div className="flex items-center gap-2 px-5 py-2 bg-emerald-600/10 border border-emerald-500/35 rounded-full animate-in fade-in slide-in-from-top-2 duration-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Silo 01 Identity Verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-5 py-2 bg-zinc-950/50 border border-zinc-700 rounded-full">
                <div className="w-2 h-2 rounded-full bg-zinc-500" />
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Silo 01: Proficiency Audit</span>
              </div>
            )}
          </div>
          <div className="space-y-10 animate-in zoom-in duration-500 pt-12 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h4 className={`text-2xl font-black italic uppercase transition-colors ${isDecrypted ? 'text-emerald-500' : 'text-white'}`}>Identity Calibration</h4>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Forensic_Simulation_v1.0</p>
                </div>
                {!isDecrypted && !autopsyActive && (
                  <div className="flex items-center gap-3 px-5 py-3 bg-blue-600/10 border border-blue-500/25 rounded-[12px] animate-pulse">
                    <Fingerprint className="text-blue-500 w-4 h-4" />
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none">Pattern_Match_Active</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-8">
                   {!autopsyActive && !isDecrypted ? (
                     <div className="space-y-8">
                        <div className="p-8 bg-black border border-zinc-700 rounded-[16px] space-y-5 relative group overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <ShieldCheck size={80} />
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-inner">
                                 <Target size={18} />
                              </div>
                              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">Reference Node (Destination)</span>
                           </div>
                           <div className="flex items-center gap-6">
                              <AddressGlyph address={targetAddress} size="md" />
                              <div className="font-mono text-lg md:text-2xl text-white tracking-tight break-all">
                                 {targetAddress.slice(0, 4)}<span className="opacity-40 mx-1">...</span>{targetAddress.slice(-4)}
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Identify the authenticated destination node:</p>
                           <div className="grid grid-cols-1 gap-3">
                              <button onClick={() => handleIntercept('POISON')} className="p-6 bg-zinc-900/50 border border-zinc-700 rounded-[16px] flex items-center justify-between group/btn hover:border-red-500/35 transition-all active:scale-[0.98]">
                                 <div className="flex items-center gap-4"><AddressGlyph address={poisonAddress} size="sm" /><span className="font-mono text-xs text-zinc-300 group-hover/btn:text-white transition-colors">{poisonAddress.slice(0, 4)}...{poisonAddress.slice(-4)}</span></div>
                                 <ChevronRight className="w-4 h-4 text-zinc-600 group-hover/btn:text-red-500 transition-colors" />
                              </button>
                              <button onClick={() => handleIntercept('FRIEND')} className="p-6 bg-zinc-900/50 border border-zinc-700 rounded-[16px] flex items-center justify-between group/btn hover:border-emerald-500/35 transition-all active:scale-[0.98]">
                                 <div className="flex items-center gap-4"><AddressGlyph address={targetAddress} size="sm" /><span className="font-mono text-xs text-zinc-300 group-hover/btn:text-white transition-colors">{targetAddress.slice(0, 4)}...{targetAddress.slice(-4)}</span></div>
                                 <ChevronRight className="w-4 h-4 text-zinc-600 group-hover/btn:text-emerald-500 transition-colors" />
                              </button>
                           </div>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full flex flex-col justify-center py-10">
                        {outcome === 'VERIFIED' ? (
                           <div className={`space-y-8 animate-in zoom-in duration-500 text-center ${isDecrypted && !isShattering ? 'animate-fracture-pulse' : ''}`}>
                              <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                 <ShieldCheck className="text-emerald-500 w-10 h-10" />
                              </div>
                              <div className="space-y-2">
                                 <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Access Granted.</h3>
                                 <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Biological Parity Confirmed</p>
                              </div>
                           </div>
                        ) : outcome === 'BREACH' ? (
                           <div className="space-y-8 animate-in zoom-in duration-500 text-center">
                              <div className="w-20 h-20 bg-red-600/10 border-2 border-red-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                 <ShieldX className="text-red-500 w-10 h-10" />
                              </div>
                              <div className="space-y-2">
                                 <h3 className="text-3xl font-black text-red-500 italic uppercase tracking-tighter leading-none">System Breach.</h3>
                                 <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Cognitive Filter Failure // BRI Reduced</p>
                              </div>
                           </div>
                        ) : (
                           <div className="flex flex-col items-center gap-6 animate-pulse">
                              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Syncing_Neural_Link...</p>
                           </div>
                        )}
                     </div>
                   )}
                </div>
                <div className="lg:col-span-5 flex flex-col gap-4">
                   <div className="flex-1 p-8 bg-black/40 border border-zinc-700 rounded-[16px] space-y-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                         <Binary className="text-blue-500 w-4 h-4" />
                         <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Type-Audit</span>
                      </div>
                      <p className="text-[13px] text-zinc-400 font-bold leading-relaxed uppercase italic">
                        {outcome === 'VERIFIED' ? "Subject identified original intent destination despite high-fidelity vanity mimicking." : 
                         outcome === 'BREACH' ? "Subject failed to distinguish poison mimic. Biological filter requires further calibration." :
                         "Silo 01 requires a 100% accurate identification of the 'Safe Node' to synchronize the rest of the facility."}
                      </p>
                   </div>
                   <button onClick={onOpenMap} className="p-8 bg-blue-600/5 border border-blue-500/25 rounded-[16px] flex items-center justify-between group hover:bg-blue-600/10 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"><MapIcon size={20} /></div>
                         <div className="text-left"><div className="text-[10px] font-black text-white uppercase tracking-widest">System Topology</div><div className="text-[8px] font-bold text-zinc-500 uppercase mt-0.5">Explore Silo Layout</div></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-500 transition-colors" />
                   </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TypingHeadline = ({ text, delay = 500, startTrigger = true }: { text: string; delay?: number; startTrigger?: boolean }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    if (!startTrigger) return;
    const timer = setTimeout(() => setIsTyping(true), delay);
    return () => clearTimeout(timer);
  }, [delay, startTrigger]);
  useEffect(() => {
    if (!isTyping) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 150);
      return () => timeout && clearTimeout(timeout);
    }
  }, [displayedText, isTyping, text]);
  return (
    <h1 className="text-[2.25rem] md:text-[4.5rem] font-black tracking-tighter leading-[0.8] uppercase italic select-none min-h-[1em] relative">
      <span className="absolute inset-0 text-transparent pointer-events-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>{text}</span>
      <span className="relative text-white">{displayedText}</span>
    </h1>
  );
};

interface HeroProps {
  scrollToSection: (id: string) => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  powerSave?: boolean;
  isReady?: boolean;
  onUnlockNext: () => void;
  unlockLevel: number;
  onFail: () => void;
  onOpenMap: () => void;
  onOpenBriefing: () => void;
  isAdmin?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ scrollToSection, onOpenDoc, powerSave, isReady = true, onUnlockNext, unlockLevel, onFail, onOpenMap, onOpenBriefing, isAdmin = false }) => {
  const [isSilo1Vanished, setIsSilo1Vanished] = useState(false);

  return (
    <section id="hero" className={`flex flex-col px-4 md:px-20 pt-16 md:pt-24 relative overflow-hidden bg-[#020202] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isSilo1Vanished ? 'min-h-fit pb-12' : 'min-h-screen pb-24 justify-center'}`}>
      {!powerSave && <TechnicalScanGrid />}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12 md:gap-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7 space-y-6 md:space-y-12">
            <div className="space-y-4 md:space-y-10">
              <div className="flex flex-col gap-8 md:gap-10">
                <div className="flex">
                  <span className="px-4 py-2 bg-blue-600/10 border border-blue-500/25 rounded-md text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase">Operational Alpha v 0.0.0.1</span>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={onOpenBriefing} className="relative group active:scale-95 transition-all duration-300">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-radar-pulse" />
                    <div className="relative px-6 py-2.5 bg-black border border-blue-500/60 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:border-blue-400 animate-button-breathe">
                      <Zap size={14} className="text-blue-400 fill-blue-400/20" />
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic">Mission Briefing</span>
                    </div>
                  </button>
                  <div className="h-[1px] w-12 md:w-32 bg-zinc-800 relative overflow-hidden">
                    <div className="absolute inset-0 animate-flowing-signal" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                    <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.4em]">Interception Active</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-[2.25rem] md:text-[4.5rem] font-black tracking-tighter leading-[0.8] text-white uppercase italic select-none">THE INTENT</h1>
                <TypingHeadline text="VALIDATOR." startTrigger={isReady} />
              </div>
              <div className="pt-6 space-y-8 max-w-2xl">
                <div className="space-y-6">
                   <h4 className="text-11px font-black text-cyan-500 uppercase tracking-[0.5em]">Introducing Layer 0.5 Security</h4>
                   <p className="text-xl md:text-3xl text-zinc-300 font-medium leading-relaxed italic border-l-4 border-cyan-500/50 pl-8">
                    "A human-layer security model that operates <span className="text-white underline decoration-cyan-500/20 decoration-2 underline-offset-8">between user intent and cryptographic execution</span>, detecting context loss before irreversible signatures occur."
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-12">
               <div className="flex flex-wrap gap-4 md:gap-6">
                 <button onClick={() => scrollToSection('about-us')} className="px-6 md:px-12 py-4 md:py-6 bg-white text-black text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 rounded-none"><MousePointer2 size={18} /> Install VIGIL FIELD UNIT (Coming Soon)</button>
                 <button onClick={() => onOpenDoc('whitepaper')} className="px-6 md:px-12 py-4 md:py-6 border-2 border-zinc-700 text-white text-[11px] md:text-[12px] font-black uppercase tracking-[0.3em] hover:bg-zinc-900 hover:border-zinc-500 transition-all rounded-[8px]">READ WHITEPAPER</button>
               </div>
               <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-500">
                  <div className="flex items-center gap-3"><Terminal size={14} className="text-zinc-600" /><span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Protocol Operating Standards</span></div>
                  <div className="space-y-3 font-mono text-[10px] md:text-[11px] text-zinc-400 font-bold leading-relaxed uppercase">
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Intent Synchronization: Decoupling perception from malicious UI shifts</p>
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Sub-Frame Autopsy: Heuristic analysis at the retinal threshold</p>
                     <p className="flex items-start gap-3"><span className="w-1 h-1 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />Sovereign Context: Local mapping with absolute zero data leakage</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
             <VisualDeceptionShield />
             <div className="mt-4"><FacilityArchitecture scrollToSection={scrollToSection} unlockLevel={unlockLevel} isAdmin={isAdmin} /></div>
          </div>
        </div>

        <div 
          className={`max-w-4xl mx-auto w-full transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSilo1Vanished ? 'max-h-0 opacity-0 pointer-events-none scale-95 overflow-hidden m-0 p-0' : 'max-h-[2000px] opacity-100 py-12 md:py-20'
          }`}
        >
           <div className="text-center space-y-6 mb-16">
              <div className="flex items-center justify-center gap-6">
                 <div className="h-[1px] w-16 bg-zinc-900" />
                 <span className="text-blue-500 font-black text-[11px] uppercase tracking-[0.6em] animate-pulse">Neural Link Audit Required</span>
                 <div className="h-[1px] w-16 bg-zinc-900" />
              </div>
              <div className="space-y-4">
                 <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Identity Calibration.</h3>
                 <p className="text-zinc-400 text-sm md:text-xl italic font-medium max-w-2xl mx-auto leading-relaxed">
                   "AUDIT REQUIRED: You must identify the <span className="text-white font-bold">authenticated target</span> within the simulation to synchronize your perception and unlock the Intel phase."
                 </p>
              </div>
           </div>
           
           <WalletSimulator 
             onUnlock={onUnlockNext} 
             currentLevel={unlockLevel} 
             onFail={onFail} 
             onOpenMap={onOpenMap} 
             onIntegratedChange={(val) => setIsSilo1Vanished(val)}
           />
        </div>
      </div>

      <style>{`
        @keyframes radar-pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes button-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-radar-pulse { animation: radar-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-button-breathe { animation: button-breathe 2s ease-in-out infinite; }

        @keyframes shard-chaos-0 { 100% { transform: translate3d(-400%, -500%, 1800px) rotateX(720deg) rotateY(180deg) rotateZ(360deg); opacity: 0; } }
        @keyframes shard-chaos-1 { 100% { transform: translate3d(250%, -600%, -1500px) rotateX(-540deg) rotateY(1080deg); opacity: 0; } }
        @keyframes shard-chaos-2 { 100% { transform: translate3d(600%, -200%, 1200px) rotateZ(720deg) rotateY(360deg) rotateX(180deg); opacity: 0; } }
        @keyframes shard-chaos-3 { 100% { transform: translate3d(-700%, 0%, -2000px) rotateX(900deg) rotateZ(-360deg); opacity: 0; } }
        @keyframes shard-chaos-4 { 100% { transform: translate3d(750%, 450%, 2500px) rotateY(-1080deg) rotateX(90deg); opacity: 0; } }
        @keyframes shard-chaos-5 { 100% { transform: translate3d(-450%, 650%, -1200px) rotateX(-720deg) rotateZ(360deg); opacity: 0; } }
        @keyframes shard-chaos-6 { 100% { transform: translate3d(450%, 800%, 800px) rotateY(900deg) rotateX(360deg); opacity: 0; } }
        @keyframes shard-chaos-7 { 100% { transform: translate3d(-550%, 350%, 1400px) rotateX(540deg) rotateY(-720deg); opacity: 0; } }
        @keyframes shard-chaos-8 { 100% { transform: translate3d(0%, -800%, -1000px) rotateZ(1080deg) rotateX(720deg); opacity: 0; } }
        @keyframes shard-chaos-9 { 100% { transform: translate3d(800%, 0%, 2200px) rotateX(360deg) rotateY(360deg); opacity: 0; } }
        @keyframes shard-chaos-10 { 100% { transform: translate3d(-800%, -350%, 700px) rotateZ(-1080deg) rotateX(180deg); opacity: 0; } }
        @keyframes shard-chaos-11 { 100% { transform: translate3d(300%, 900%, -1800px) rotateY(1800deg) rotateZ(45deg); opacity: 0; } }
        
        .shard-chaos-anim-0 { animation: shard-chaos-0 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-1 { animation: shard-chaos-1 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-2 { animation: shard-chaos-2 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-3 { animation: shard-chaos-3 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-4 { animation: shard-chaos-4 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-5 { animation: shard-chaos-5 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-6 { animation: shard-chaos-6 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-7 { animation: shard-chaos-7 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-8 { animation: shard-chaos-8 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-9 { animation: shard-chaos-9 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-10 { animation: shard-chaos-10 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-11 { animation: shard-chaos-11 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes shatter-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); } 20% { opacity: 1; transform: translate(-50%, -50%) scale(2.2); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(8); } }
        .animate-shatter-flash { animation: shatter-flash 0.6s ease-out forwards; }
        @keyframes fracture-pulse { 0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); } 50% { border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 0 80px rgba(16, 185, 129, 0.6); transform: translateZ(50px) scale(1.02); } }
        .animate-fracture-pulse { animation: fracture-pulse 0.4s infinite ease-in-out; }
      `}</style>
    </section>
  );
};
