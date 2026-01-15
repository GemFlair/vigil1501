import React from 'react';
/* Added missing icons Fingerprint, Search, and Binary to lucide-react imports */
import { X, Zap, Target, Activity, ShieldAlert, ChevronRight, Brain, Terminal, Layers, Scan, Globe, Info, Lock, Unlock, Eye, BarChart3, Database, ShieldX, LogOut, Fingerprint, Search, Binary, Sparkles, BookOpen } from 'lucide-react';

interface MissionBriefingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const silos = [
    { id: '01', title: 'IDENTITY', icon: <Fingerprint />, color: 'text-zinc-300', border: 'border-zinc-500/30', bg: 'bg-zinc-500/5', desc: 'Neural link calibration, intent origination, and initial biological audit.' },
    { id: '02', title: 'INTEL', icon: <Search />, color: 'text-blue-500', border: 'border-blue-500/30', bg: 'bg-blue-500/5', desc: 'Deep-layer threat vector analysis and the exposure of the 8-character blind spot.' },
    { id: '03', title: 'LOGIC', icon: <Binary />, color: 'text-cyan-500', border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', desc: 'Heuristic operational flows, protocol specs, and Layer 0.5 primitives.' },
    { id: '04', title: 'EXECUTION', icon: <Target />, color: 'text-orange-500', border: 'border-orange-500/30', bg: 'bg-orange-500/5', desc: 'Interception sandbox featuring live demos of the Intent Validator and Mimicry Lab.' },
    { id: '05', title: 'PURITY', icon: <ShieldX />, color: 'text-red-500', border: 'border-red-500/30', bg: 'bg-red-500/5', desc: 'Registry of strategic refusals, system boundaries, and definitive non-goals.' },
    { id: '06', title: 'EVOLUTION', icon: <Activity />, color: 'text-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/5', desc: 'Ecosystem scalability roadmap and expansion into the multi-chain security standard.' },
    { id: '07', title: 'LOG', icon: <Database />, color: 'text-zinc-400', border: 'border-zinc-500/30', bg: 'bg-zinc-500/5', desc: 'The Technical Knowledge Base, Master Registry FAQ, and internal briefings.' },
    { id: '08', title: 'AUDIT', icon: <BarChart3 />, color: 'text-purple-500', border: 'border-purple-500/30', bg: 'bg-purple-500/5', desc: 'Final Proficiency Certification and the terminal Neural Link calibration.' },
    { id: '09', title: 'MESH', icon: <Globe />, color: 'text-emerald-500', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', desc: 'Conversational access to the Sentinel AI Intelligence core for kernel queries.' },
    { id: '10', title: 'VOID', icon: <LogOut />, color: 'text-white', border: 'border-white/30', bg: 'bg-white/5', desc: 'Final notice protocols and the secure facility disengagement sequence.' },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-[50px]" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-[#050505] border border-zinc-800 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-700">
        
        {/* Top Scan Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/40 shadow-[0_0_15px_#3b82f6] animate-[scan-down_4s_linear_infinite]" />

        {/* Header */}
        <div className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 md:px-12 shrink-0 bg-zinc-950/20">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter leading-none">Operational Manual</h3>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block">System_Briefing_v1.0.1_STABLE</span>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-16">
          
          {/* NEW SECTION: START HERE - FACILITY GUIDE */}
          <div className="space-y-8 animate-in slide-in-from-top-4 duration-1000">
            <div className="flex items-center gap-3">
              <Sparkles className="text-blue-500 w-5 h-5 animate-pulse" />
              <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Start Here: Facility Guide</h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-12 space-y-6">
                <div className="p-8 bg-white/[0.03] border border-zinc-800 rounded-[2rem] space-y-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                    <BookOpen size={120} />
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <h3 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tight">Welcome to the VIGIL Registry.</h3>
                    <p className="text-zinc-300 text-base md:text-xl leading-relaxed font-medium italic">
                      We didn't build a normal website because Web3 isn't a normal environment. It’s a battleground for your assets. This <span className="text-white">Facility</span> (this website) is designed to train your eyes to see what most people skip.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {[
                      { 
                        title: "1. Complete the Audits", 
                        text: "The site is divided into 10 'Silos.' You must pass the quick visual test at the end of each section to unlock the next one.",
                        icon: <Target className="text-orange-500" /> 
                      },
                      { 
                        title: "2. Watch your BRI", 
                        text: "Your 'Biological Resilience Index' tracks your accuracy. Think of it as your security reputation score.",
                        icon: <Activity className="text-emerald-500" /> 
                      },
                      { 
                        title: "3. Explore the Registry", 
                        text: "Once you have unlocked sections, use the sidebar to find deep-dive documents like Whitepapers and Spec sheets.",
                        icon: <Database className="text-blue-500" /> 
                      }
                    ].map((step, i) => (
                      <div key={i} className="p-6 bg-zinc-950/50 border border-zinc-900 rounded-2xl space-y-3 hover:bg-zinc-900/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                          {React.cloneElement(step.icon as React.ReactElement, { size: 18 })}
                        </div>
                        <h5 className="text-[12px] font-black text-white uppercase tracking-widest">{step.title}</h5>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase leading-relaxed italic">{step.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Info size={14} className="text-zinc-500" />
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                        To clarify: The terms <span className="text-zinc-300">"Facility"</span> and <span className="text-zinc-300">"Registry"</span> both refer to this website.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest">READ_READY_v1.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 0: System Nomenclature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16 border-t border-zinc-900/50">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-blue-500 rounded-full" />
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Sector 00: System Nomenclature</h4>
              </div>
              <div className="p-8 bg-blue-600/5 border-l-4 border-blue-600 rounded-r-3xl space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <Globe size={80} />
                </div>
                <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
                  "To clarify for all incoming Sentinels: The term <span className="text-white">Facility</span> refers to this operational environment (this website)."
                </p>
                <div className="flex items-start gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 relative z-10">
                  <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-zinc-400 text-[12px] font-bold leading-relaxed uppercase tracking-tight">
                    In our public Twitter telemetry and technical broadcasts, this workspace is designated as the <span className="text-blue-400">VIGIL Registry</span>. It is the centralized source of truth for the Layer 0.5 standard.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center">
               <div className="w-full h-40 bg-zinc-900/40 border border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-zinc-600">
                  <Terminal size={48} className="opacity-30" />
                  <span className="text-[9px] font-black uppercase tracking-[0.5em]">Central_Hub_Audit</span>
               </div>
            </div>
          </div>

          {/* Section 1: The Core Philosophy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-red-600 rounded-full" />
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Sector 01: Active Vigilance</h4>
              </div>
              <div className="p-8 bg-zinc-900/30 border-l-4 border-red-600 rounded-r-3xl space-y-4 shadow-xl">
                <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed italic">
                  "Most security tools are passive; VIGIL is active. We don't just protect you: we train you to become a <span className="text-white">Sentinel Operator.</span>"
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed uppercase tracking-tight font-bold">
                  The facility is divided into Silos. You must prove technical alignment and Retinal Parity to unlock advanced tools.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center">
               <div className="w-full h-40 bg-red-600/5 border border-red-600/20 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-red-500">
                  <ShieldAlert size={48} className="animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.5em]">Risk_Calibration_Matrix</span>
               </div>
            </div>
          </div>

          {/* Section 2: Progression Mechanics */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-1 bg-blue-500 rounded-full" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Sector 02: Progression Logic</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-zinc-900/30 border-b-4 border-blue-500 rounded-t-3xl space-y-4 hover:bg-zinc-900/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Scan size={18} className="text-blue-500" />
                  <h5 className="text-sm font-black text-white uppercase italic">Neural Link Audits</h5>
                </div>
                <p className="text-zinc-400 text-[13px] leading-relaxed italic">
                  At the conclusion of each Silo, you will encounter a Proficiency Audit. These are visual challenges designed to measure your Saccadic Focus. Success decrypts the next sector.
                </p>
              </div>
              <div className="p-8 bg-zinc-900/30 border-t-4 border-blue-500 rounded-b-3xl space-y-4 hover:bg-zinc-900/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <Layers size={18} className="text-blue-500" />
                  <h5 className="text-sm font-black text-white uppercase italic">Registry Fragments</h5>
                </div>
                <p className="text-zinc-400 text-[13px] leading-relaxed italic">
                  Advanced encryption keys are hidden within the Technical Registries. Read the whitepaper and terms to discover unique fragments required for top-tier access.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Facility Silo Manifest */}
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <div className="h-4 w-1 bg-zinc-500 rounded-full" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Sector 04: Facility Silo Manifest</h4>
            </div>
            <p className="text-zinc-400 text-sm italic font-medium max-w-2xl px-2">
              Explore the functional architecture of the Registry Facility. Each Silo represents a distinct phase of intelligence and operational calibration.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {silos.map((silo, i) => (
                <div key={i} className={`p-6 bg-zinc-950 border border-zinc-900 rounded-3xl group transition-all flex items-start gap-5 hover:bg-zinc-900/40 ${silo.border.replace('30', '15')}`}>
                  <div className={`w-10 h-10 rounded-xl bg-zinc-900 border ${silo.border} flex items-center justify-center ${silo.color} transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                    {React.cloneElement(silo.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${silo.color}`}>Silo {silo.id}</span>
                       <h5 className="text-[13px] font-black text-white italic uppercase tracking-widest">{silo.title}</h5>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-tight italic leading-relaxed">
                      {silo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-16 border-t border-zinc-900 bg-zinc-950/40 flex items-center justify-center shrink-0">
           <div className="flex items-center gap-6 opacity-40">
              <div className="flex items-center gap-2">
                 <Zap size={12} className="text-blue-500" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Sovereign Standard</span>
              </div>
              <div className="flex items-center gap-2">
                 <Activity size={12} className="text-emerald-500" />
                 <span className="text-[8px] font-black text-white uppercase tracking-widest">Mesh Link Stable</span>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-down {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};