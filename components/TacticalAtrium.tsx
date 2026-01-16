
import React, { useState, useEffect, useRef } from 'react';
import { 
  Fingerprint, Search, Binary, Target, ShieldX, 
  Activity, Database, Brain, Globe, LogOut, 
  Lock, Zap, Radio, Cpu, Shield, ArrowRight, User,
  Wifi, Server, Radar, Eye, Settings2, BarChart3
} from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

const SILOS = [
  { id: 1, label: 'IDENTITY', icon: <Fingerprint />, desc: 'Neural Link Calibration & Intent Origination.', color: 'blue', tag: 'CORE_SYNC' },
  { id: 2, label: 'INTEL', icon: <Search />, desc: 'Threat Vector Analysis & The 8-Char Blind Spot.', color: 'blue', tag: 'THREAT_MAP' },
  { id: 3, label: 'LOGIC', icon: <Binary />, desc: 'Heuristic Operational Flow & Layer 0.5 Primitives.', color: 'cyan', tag: 'L0.5_LOGIC' },
  { id: 4, label: 'EXECUTION', icon: <Target />, desc: 'Interception Sandbox & Intent Validator Demos.', color: 'orange', tag: 'SANDBOX' },
  { id: 5, label: 'PURITY', icon: <ShieldX />, desc: 'Strategic Refusals & Definitive Non-Goals.', color: 'red', tag: 'RESTRICTIONS' },
  { id: 6, label: 'EVOLUTION', icon: <Activity />, desc: 'Scalability Roadmap & Ecosystem Expansion.', color: 'blue', tag: 'ROADMAP' },
  { id: 7, label: 'LOG', icon: <Database />, desc: 'Technical Knowledge Base & Master Registry FAQ.', color: 'zinc', tag: 'TECHNICAL_REF' },
  { id: 8, label: 'AUDIT', icon: <Brain />, desc: 'Final Proficiency Certification & Neural Audit.', color: 'purple', tag: 'CERTIFICATION' },
  { id: 9, label: 'MESH', icon: <Globe />, desc: 'Sentinel AI Intelligence & Mesh Terminal.', color: 'emerald', tag: 'KERNEL_QUERY' },
  { id: 10, label: 'VOID', icon: <LogOut />, desc: 'Final Notice & Secure Disengagement.', color: 'zinc', tag: 'DISENGAGE' },
];

interface TacticalAtriumProps {
  currentLevel: number;
  isAdmin: boolean;
  bri: number;
  xp: number;
  onSelectSilo: (id: number) => void;
}

const TelemetryStream = ({ side }: { side: 'left' | 'right' }) => (
  <div className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-4' : 'right-4'} w-12 hidden 2xl:flex flex-col items-center overflow-hidden opacity-10 pointer-events-none`}>
    <div className="animate-micro-telemetry flex flex-col gap-4 font-mono text-[8px] text-zinc-400">
      {Array(100).fill(0).map((_, i) => (
        <div key={i} className="uppercase whitespace-nowrap">
          {Math.random().toString(16).slice(2, 10)}::{Math.random().toString(16).slice(2, 8)}
        </div>
      ))}
    </div>
  </div>
);

export const TacticalAtrium: React.FC<TacticalAtriumProps> = ({ currentLevel, isAdmin, bri, xp, onSelectSilo }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full flex flex-col space-y-6 md:space-y-10 animate-in fade-in duration-1000 relative select-none"
    >
      {/* RADIANT AMBIENT ENGINE */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[3rem]">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] animate-grid-drift" />
         
         {/* Focal Mouse Projector */}
         <div 
           className="absolute inset-0 transition-opacity duration-1000 blur-[120px]" 
           style={{ 
             background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.15), transparent 40%)` 
           }} 
         />
         <TelemetryStream side="left" />
         <TelemetryStream side="right" />
      </div>

      {/* TOP COMMAND HUD - GLASS EDITIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 shrink-0 relative z-10">
         <div className="p-4 md:p-6 glass-morphism rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between group transition-all shadow-2xl relative overflow-hidden hover:border-emerald-500/40">
            <div className="flex items-center justify-between">
               <span className="text-[7px] md:text-[9px] font-black text-zinc-500 uppercase tracking-widest">Resilience (BRI)</span>
               <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${bri > 80 ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]' : 'bg-red-500'}`} />
            </div>
            <div className="flex items-end justify-between mt-2 md:mt-4">
               <div className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">{bri}%</div>
               <div className="hidden sm:block">
                 <TechLabel text="OPTIMAL" color="emerald" />
               </div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
         </div>

         <div className="p-4 md:p-6 glass-morphism rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col justify-between group transition-all shadow-2xl relative overflow-hidden hover:border-blue-500/40">
            <div className="flex items-center justify-between">
               <span className="text-[7px] md:text-[9px] font-black text-zinc-500 uppercase tracking-widest">Sovereign XP</span>
               <Shield size={10} className="text-blue-500" />
            </div>
            <div className="flex items-end justify-between mt-2 md:mt-4">
               <div className="text-2xl md:text-4xl font-black text-blue-500 italic tracking-tighter">{xp.toLocaleString()}</div>
               <span className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase">/ 10k</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_60%)] pointer-events-none" />
         </div>

         <div className="col-span-2 p-4 md:p-6 glass-morphism rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-between shadow-2xl relative overflow-hidden group hover:border-cyan-500/40">
            <div className="flex-1 space-y-3 md:space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-zinc-950/50 border border-zinc-800 flex items-center justify-center shadow-inner">
                     <Globe className="text-cyan-500 animate-spin-slow" size={14} />
                  </div>
                  <div className="space-y-0.5">
                     <span className="text-[7px] md:text-[9px] font-black text-zinc-500 uppercase tracking-widest">Mesh Network State</span>
                     <div className="text-sm md:text-xl font-black text-white italic uppercase tracking-tight">1.2M Authorized Nodes</div>
                  </div>
               </div>
               <div className="flex gap-1.5 md:gap-2">
                  {Array(10).fill(0).map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i < 7 ? 'bg-emerald-500/40' : 'bg-zinc-800/50'} animate-pulse`} style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
               </div>
            </div>
            <div className="text-right pl-4 md:pl-8 border-l border-zinc-900/50 ml-4 md:ml-8">
               <div className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase mb-0.5 md:mb-1">Global Health</div>
               <div className="text-lg md:text-2xl font-black text-emerald-500 italic">99.8%</div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.05),transparent_60%)] pointer-events-none" />
         </div>
      </div>

      {/* TACTICAL GRID HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900/50 pb-6 gap-4 relative z-10">
         <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
               <Settings2 size={16} className="text-zinc-600" />
               <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-widest leading-none">Command Interface</h3>
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-zinc-800" />
            <div className="flex items-center gap-3 px-3 py-1 glass-morphism rounded-lg">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_12px_#3b82f6]" />
               <span className="text-[8px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Topology_v1.3</span>
            </div>
         </div>
         <div className="flex items-center gap-6 text-[8px] md:text-[10px] font-black text-zinc-700 uppercase tracking-widest justify-center">
            <span className="flex items-center gap-2"><Wifi size={12} className="text-emerald-500/50" /> SECURE_LINK</span>
            <span className="flex items-center gap-2"><Server size={12} className="text-blue-500/50" /> LOCAL_KERNEL</span>
         </div>
      </div>

      {/* THE SILO MATRIX - ADVANCED GLASS EDITION */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 relative z-10 pb-12">
         {SILOS.map((silo, idx) => {
            const isUnlocked = isAdmin || currentLevel >= silo.id;
            const accentHex = silo.color === 'blue' ? '#3b82f6' : 
                             silo.color === 'cyan' ? '#06b6d4' :
                             silo.color === 'orange' ? '#f59e0b' :
                             silo.color === 'red' ? '#ef4444' :
                             silo.color === 'emerald' ? '#10b981' :
                             silo.color === 'purple' ? '#a855f7' : '#71717a';

            return (
              <button 
                key={silo.id}
                onClick={() => isUnlocked && onSelectSilo(silo.id)}
                className={`group relative p-4 md:p-8 rounded-[1.5rem] md:rounded-[3rem] border transition-all duration-700 h-[220px] md:h-[340px] flex flex-col justify-between overflow-hidden shadow-2xl refractive-edge
                  ${isUnlocked 
                    ? 'glass-morphism border-white/5 active:scale-[0.97] hover:border-white/20' 
                    : 'bg-black/80 border-zinc-900/50 opacity-40 cursor-not-allowed grayscale blur-[0.5px]'}
                  animate-in fade-in slide-in-from-bottom-12
                `}
                style={{ 
                   animationDelay: `${idx * 100}ms`,
                   '--accent-low': `${accentHex}15`,
                   '--accent-mid': `${accentHex}33`
                } as any}
              >
                 {/* Localized Back Glow */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-low),transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                 
                 {/* Refraction Mouse Flash */}
                 <div 
                   className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                   style={{ 
                     background: `radial-gradient(circle at center, ${accentHex}, transparent 60%)` 
                   }} 
                 />

                 {/* Top Meta */}
                 <div className="space-y-3 md:space-y-6 relative z-10 text-left">
                    <div className="flex justify-between items-start">
                       <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-[1.2rem] bg-zinc-950/80 border-2 transition-all duration-700 flex items-center justify-center relative ambient-glow-pod
                          ${isUnlocked ? 'border-zinc-800 group-hover:border-[var(--accent)] group-hover:scale-110' : 'border-zinc-900 text-zinc-900'}
                       `} style={{ '--accent': accentHex, '--glow-color': `${accentHex}44` } as any}>
                          {isUnlocked ? (
                            <div className="transition-all duration-700 group-hover:rotate-[15deg]" style={{ color: accentHex }}>
                              {React.cloneElement(silo.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, { 
                                size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 28, 
                                strokeWidth: 1.5 
                              })}
                            </div>
                          ) : <Lock size={18} />}
                          
                          {isUnlocked && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border border-black md:border-2 bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                          )}
                       </div>
                       <div className="text-right">
                          <div className={`text-[6px] md:text-[10px] font-black uppercase tracking-widest ${isUnlocked ? 'text-zinc-600 group-hover:text-white transition-colors' : 'text-zinc-900'}`}>{isUnlocked ? `SILO 0${silo.id}` : 'ENCRYPTED'}</div>
                          {isUnlocked && <div className="text-[5px] md:text-[7px] font-mono text-zinc-700 mt-1 uppercase">{silo.tag}</div>}
                       </div>
                    </div>
                    
                    <div className="space-y-1.5 md:space-y-3">
                       <h4 className={`text-base md:text-2xl font-black italic uppercase tracking-tighter transition-all duration-700 ${isUnlocked ? 'text-white group-hover:translate-x-1' : 'text-zinc-900'}`}>{silo.label}</h4>
                       <div className={`h-[1px] md:h-[1.5px] w-6 md:w-8 bg-zinc-800 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`} style={{ backgroundColor: isUnlocked ? `${accentHex}66` : '#1a1a1a' }} />
                       <p className="text-[8px] md:text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-tight md:leading-relaxed italic pr-2 group-hover:text-zinc-200 transition-colors line-clamp-3">
                         {isUnlocked ? silo.desc : 'ACCESS_RESTRICTED'}
                       </p>
                    </div>
                 </div>

                 {/* Bottom Action Area */}
                 <div className="relative z-10 flex items-center justify-between pt-3 md:pt-6 border-t border-zinc-900/50">
                    <div className="flex gap-1">
                       <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${isUnlocked ? 'bg-zinc-800 group-hover:bg-[var(--accent)]' : 'bg-zinc-950'}`} style={{ '--accent': accentHex } as any} />
                       <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${isUnlocked ? 'bg-zinc-800 group-hover:bg-[var(--accent)] transition-all delay-75' : 'bg-zinc-950'}`} style={{ '--accent': accentHex } as any} />
                    </div>
                    {isUnlocked && (
                       <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-[6px] md:text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">ACCESS</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-zinc-800 group-hover:text-white transition-all group-hover:translate-x-1" />
                       </div>
                    )}
                 </div>
              </button>
            );
         })}
      </div>

      {/* INTEGRATED TERMINAL FOOTER - GLASS EDITION */}
      <div className="pt-6 md:pt-10 border-t border-zinc-900/50 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative z-10 pb-8">
         <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8">
            <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 glass-morphism rounded-xl md:rounded-2xl group transition-all hover:border-white/20 shadow-xl">
               <div className="p-1.5 md:p-2 rounded-lg bg-zinc-950/50 border border-zinc-800">
                  <Cpu size={12} className="text-zinc-600 group-hover:text-blue-500 transition-colors" />
               </div>
               <div className="space-y-0.5">
                  <span className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest">Core</span>
                  <div className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">TACTICAL_v1.5</div>
               </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 glass-morphism rounded-xl md:rounded-2xl group transition-all hover:border-emerald-500/20 shadow-xl">
               <div className="p-1.5 md:p-2 rounded-lg bg-zinc-950/50 border border-zinc-800">
                  <Zap size={12} className="text-amber-500 animate-pulse" />
               </div>
               <div className={`space-y-0.5 ${bri > 80 ? 'text-emerald-500' : 'text-red-500'}`}>
                  <span className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest">Stability</span>
                  <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">ESTABLISHED</div>
               </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 glass-morphism rounded-xl md:rounded-2xl group transition-all hover:border-blue-500/20 shadow-xl">
               <div className="p-1.5 md:p-2 rounded-lg bg-zinc-950/50 border border-zinc-800">
                  <BarChart3 size={12} className="text-blue-500" />
               </div>
               <div className="space-y-0.5">
                  <span className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest">Memory</span>
                  <div className="text-[8px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">94MB / LOCAL</div>
               </div>
            </div>
         </div>
         
         <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-[7px] md:text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] md:tracking-[0.6em] mb-1">VIGILANCE_IS_THE_ONLY_PERMANENT_SHIELD</p>
            <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 glass-morphism rounded-full">
               <span className="text-[6px] md:text-[7px] font-mono text-zinc-500 uppercase">SYS_TIME: {new Date().toLocaleTimeString()}</span>
               <div className="w-1 h-1 rounded-full bg-blue-500/40 animate-pulse" />
               <span className="text-[6px] md:text-[7px] font-mono text-zinc-500 uppercase">LOC: {Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1] || 'STATION'}</span>
            </div>
         </div>
      </div>
    </div>
  );
};
