import React from 'react';
/* Added ShieldCheck and History as HistoryIcon to lucide-react imports */
import { X, Zap, Target, Activity, ShieldAlert, ChevronRight, Brain, Terminal, Layers, Scan, Globe, Info, Lock, Unlock, Eye, BarChart3, Database, ShieldX, LogOut, Fingerprint, Search, Binary, Sparkles, BookOpen, Dna, Layout, Radio, Server, Shield, Smartphone, ShieldCheck, History as HistoryIcon } from 'lucide-react';
/* Added TechLabel import from DocHelpers to resolve missing name error */
import { TechLabel } from './docs/DocHelpers';

interface MissionBriefingProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MissionBriefing: React.FC<MissionBriefingProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const silos = [
    { 
      id: '01', 
      title: 'IDENTITY', 
      icon: <Dna />, 
      color: 'text-zinc-300', 
      border: 'border-zinc-500/30', 
      bg: 'bg-zinc-500/5', 
      desc: 'Project DNA initialization. This is the Genetic Audit of the VIGIL system. It performs a forensic mapping of the Lineage of Intent, tracing funding sources back to the genesis SOL node. Operators must calibrate their specific Saccadic Signature—mapping how they verify data across the entropy field—to establish a Biological Anchor for the entire facility. Without synchronization, neural parity is impossible.' 
    },
    { 
      id: '02', 
      title: 'INTEL', 
      icon: <Search />, 
      color: 'text-blue-500', 
      border: 'border-blue-500/30', 
      bg: 'bg-blue-500/5', 
      desc: 'Deep-layer threat vector analysis. Exposure of the 8-character blind spot where 94% of users fail to verify middle-entropy data. Identification of the technical gaps exploited by automated vanity clusters during high-velocity participation. This silo defines the tactical boundary where human vision fails and the adversary takes control. We map the landscape of deception.' 
    },
    { 
      id: '03', 
      title: 'LOGIC', 
      icon: <Binary />, 
      color: 'text-cyan-500', 
      border: 'border-cyan-500/30', 
      bg: 'bg-cyan-500/5', 
      desc: 'Heuristic operational flows and protocol specs. Introduction to Layer 0.5 primitives: local-first interception that operates between user perception and cryptographic execution. Verification of the mathematical bridge required for terminal safety. Logic governs the filter; without it, the eye is merely a passive observer in a hostile DOM. Every character is a decision node.' 
    },
    { 
      id: '04', 
      title: 'EXECUTION', 
      icon: <Target />, 
      color: 'text-orange-500', 
      border: 'border-orange-500/30', 
      bg: 'bg-orange-500/5', 
      desc: 'Interception sandbox featuring live tactical simulations. Authorized operators test their Biological Resilience Index (BRI) against real-world poison mimics, vanity collisions, and DOM address swaps. Proving neural parity is the prerequisite for deeper facility access. Execution is where theory meets the reality of sub-12ms interception. You must prove you can see the trap before it snaps.' 
    },
    { 
      id: '05', 
      title: 'PURITY', 
      icon: <ShieldX />, 
      color: 'text-red-500', 
      border: 'border-red-500/30', 
      bg: 'bg-red-500/5', 
      desc: 'Registry of strategic refusals. A definitive manifest of system boundaries and operational non-goals. VIGIL rejects the standard model of data mining and centralization to maintain the purity of the sovereign security standard. We are defined by what we refuse to be, ensuring absolute privacy as a primary security feature. Honesty is our only consensus mechanism.' 
    },
    { 
      id: '06', 
      title: 'EVOLUTION', 
      icon: <Activity />, 
      color: 'text-blue-400', 
      border: 'border-blue-400/30', 
      bg: 'bg-blue-400/5', 
      desc: 'Ecosystem scalability roadmap. Technical expansion into multi-chain security standards and the deployment of mobile input layers. Mapping the maturation of the human-layer defense matrix across the decentralized landscape. Evolution ensures that as protocols harden, the human perimeter scales to match the complexity of digital assets. We are building for the terminal state.' 
    },
    { 
      id: '07', 
      title: 'LOG', 
      icon: <Database />, 
      color: 'text-zinc-400', 
      border: 'border-zinc-500/30', 
      bg: 'bg-zinc-500/5', 
      desc: 'The Technical Knowledge Base. Master Registry FAQ, internal briefings, and historical intercept archives. This silo serves as the foundational data source for technical inquiries and system protocol research. Every intercept is logged locally, contributing to the operator\'s personal heuristic ledger for future reference. Knowledge is the precursor to vigilance.' 
    },
    { 
      id: '08', 
      title: 'AUDIT', 
      icon: <BarChart3 />, 
      color: 'text-purple-500', 
      border: 'border-purple-500/30', 
      bg: 'bg-purple-500/5', 
      desc: 'Final Proficiency Certification. Initialization of the terminal Neural Link calibration. Operators must demonstrate 99%+ accuracy across all 10 forensic vectors to achieve the rank of Sentinel. The audit is a zero-latency stress test of your biological filter against computationally generated adversarial mimics. Parity is not requested; it is verified.' 
    },
    { 
      id: '09', 
      title: 'MESH', 
      icon: <Globe />, 
      color: 'text-emerald-500', 
      border: 'border-emerald-500/30', 
      bg: 'bg-emerald-500/5', 
      desc: 'Sentinel AI Intelligence Terminal. Conversational access to the system kernel for real-time technical assistance. Operators query the mesh to synthesize collective intelligence and identify emerging adversarial clusters. The Mesh is the nervous system of the facility, pooling anonymized threat signals into a global shield. Intelligence is our shared infrastructure.' 
    },
    { 
      id: '10', 
      title: 'VOID', 
      icon: <LogOut />, 
      color: 'text-white', 
      border: 'border-white/30', 
      bg: 'bg-white/5', 
      desc: 'Final notice protocols. The secure facility disengagement sequence and terminal acknowledgement of probabilistic risk. Once the link terminates, vigilance remains the only permanent shield. The Void represents the boundary between the facility and the wild, where the operator must apply calibrated vision independently. Leave the facility, but stay vigilant.' 
    },
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-[50px]" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl bg-[#050505] border border-zinc-800 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_0_120px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in duration-700">
        
        {/* Top Scan Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-500/40 shadow-[0_0_15px_#3b82f6] animate-[scan-down_4s_linear_infinite]" />

        {/* Header */}
        <div className="h-20 border-b border-zinc-900 flex items-center px-8 md:px-12 shrink-0 bg-zinc-950/20">
          <div className="flex-1 flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter leading-none">Operational Manual</h3>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block">System_Briefing_v1.1.0_STABLE</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10 px-10">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Neural Link: SYNCED</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Mesh Relay: ACTIVE</span>
             </div>
          </div>

          <button onClick={onClose} className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16 space-y-20">
          
          {/* START HERE - FACILITY GUIDE */}
          <div className="space-y-10 animate-in slide-in-from-top-4 duration-1000">
            <div className="flex items-center gap-4">
              <Sparkles className="text-blue-500 w-6 h-6 animate-pulse" />
              <h4 className="text-[12px] font-black text-blue-500 uppercase tracking-[0.5em]">Start Here: Facility Guide</h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-12 space-y-8">
                <div className="p-10 md:p-14 bg-white/[0.03] border border-zinc-800 rounded-[3rem] space-y-10 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
                    <BookOpen size={160} />
                  </div>

                  <div className="space-y-6 max-w-4xl">
                    <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tight">Welcome to the VIGIL Registry.</h3>
                    <p className="text-zinc-300 text-lg md:text-2xl leading-relaxed font-medium italic">
                      We didn't build a normal website because Web3 isn't a normal environment. It’s a battleground for your assets. This <span className="text-white">Facility</span> (this website) is designed to train your eyes to see what 94% of participants skip.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                    {[
                      { 
                        title: "1. Complete the Audits", 
                        text: "The site is divided into 10 'Silos.' You must pass the quick visual test at the end of each section to unlock the next one. This process is cumulative.",
                        icon: <Target className="text-orange-500" /> 
                      },
                      { 
                        title: "2. Watch your BRI", 
                        text: "Your 'Biological Resilience Index' tracks your accuracy. Think of it as your security reputation score within the Sentinel mesh.",
                        icon: <Activity className="text-emerald-500" /> 
                      },
                      { 
                        title: "3. Project DNA", 
                        text: "Access your local Genetic Audit in Silo 01 to synchronize your neural link and provenance trackers. This establishes your biological anchor.",
                        icon: <Dna className="text-blue-500" /> 
                      }
                    ].map((step, i) => (
                      <div key={i} className="p-8 bg-zinc-950/50 border border-zinc-900 rounded-3xl space-y-4 hover:bg-zinc-950/50 transition-colors group/step">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/step:border-zinc-700 transition-colors shadow-inner">
                          {React.cloneElement(step.icon as React.ReactElement<{ size?: number }>, { size: 22 })}
                        </div>
                        <h5 className="text-[14px] font-black text-white uppercase tracking-widest">{step.title}</h5>
                        <p className="text-[11px] text-zinc-500 font-bold uppercase leading-relaxed italic">{step.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <Info size={16} className="text-zinc-600" />
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                        To clarify: The terms <span className="text-zinc-300">"Facility"</span> and <span className="text-zinc-300">"Registry"</span> are designated identifiers for this workspace.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest">READ_READY_STABLE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 0: System Nomenclature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 border-t border-zinc-900/50">
            <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-5 w-1.5 bg-blue-500 rounded-full" />
                <h4 className="text-[12px] font-black text-white uppercase tracking-[0.5em]">Sector 00: System Nomenclature</h4>
              </div>
              <div className="p-10 bg-blue-600/5 border-l-4 border-blue-600 rounded-r-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                  <Globe size={120} />
                </div>
                <p className="text-zinc-200 text-xl md:text-2xl font-medium leading-relaxed italic relative z-10">
                  "To clarify for all incoming Sentinels: The term <span className="text-white">Facility</span> refers to this operational environment. In our public broadcasts, this workspace is designated as the <span className="text-blue-400">VIGIL Registry</span>."
                </p>
                <div className="flex items-start gap-6 p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 relative z-10">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Info size={20} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-zinc-400 text-[14px] font-bold leading-relaxed uppercase tracking-tight">
                       This environment is the centralized source of truth for the <span className="text-blue-400">Layer 0.5</span> standard.
                    </p>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Auth_Ref: 0x8821_Sovereign</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex items-center justify-center">
               <div className="w-full aspect-square bg-zinc-900/40 border border-zinc-800 rounded-[3rem] flex flex-col items-center justify-center gap-6 text-zinc-600 group relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
                  <Terminal size={64} className="opacity-30 group-hover:scale-110 transition-transform duration-700" />
                  <span className="text-[10px] font-black uppercase tracking-[0.6em]">Hub_Audit</span>
               </div>
            </div>
          </div>

          {/* Section 4: Facility Silo Manifest */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-5 w-1.5 bg-zinc-500 rounded-full" />
              <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Sector 04: Facility Silo Manifest</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {silos.map((silo, i) => (
                <div key={i} className={`p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] group transition-all flex items-start gap-6 hover:bg-zinc-900/40 hover:border-zinc-700 ${silo.border.replace('30', '15')}`}>
                  <div className={`w-14 h-14 rounded-2xl bg-zinc-900 border ${silo.border} flex items-center justify-center ${silo.color} transition-all duration-700 group-hover:scale-110 shadow-xl shrink-0`}>
                    {React.cloneElement(silo.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <span className={`text-[11px] font-black uppercase tracking-widest ${silo.color}`}>Silo {silo.id}</span>
                       <div className="h-px flex-1 bg-zinc-900" />
                       <h5 className="text-[15px] font-black text-white italic uppercase tracking-widest leading-none">{silo.title}</h5>
                    </div>
                    <p className="text-[12px] text-zinc-500 font-bold uppercase tracking-tight italic leading-relaxed">
                      {silo.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LORE EXTENSION: PROJECT DNA */}
          <div className="p-12 md:p-16 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-[4rem] space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <Dna size={200} />
             </div>
             <div className="space-y-6 relative z-10">
                <TechLabel text="LORE_EXT: PROJECT_DNA" color="cyan" />
                <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Genetic Integrity Audit.</h3>
                <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed italic max-w-4xl">
                  "VIGIL verifies the <span className="text-white">Lineage of Intent.</span> We do not just analyze contract bytes; we perform an autopsy of the participants' genetic history within the network. Project DNA is the biological anchor of the 0.5 Layer."
                </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {[
                  { l: "Provenance", d: "Source tracing to genesis SOL nodes.", i: <HistoryIcon /> },
                  { l: "Biometrics", d: "User saccade pattern matching.", i: <Fingerprint /> },
                  { l: "Signatures", d: "Canonical un-spoofable anchors.", i: <ShieldCheck /> },
                  { l: "Handshake", d: "Zero-latency mesh synchronization.", i: <Zap /> }
                ].map((p, i) => (
                  <div key={i} className="p-6 bg-black border border-zinc-900 rounded-3xl space-y-3">
                     <div className="text-blue-500">
                        {p.l === 'Signatures' ? <ShieldCheck size={18} /> : React.cloneElement(p.i as React.ReactElement, { size: 18 })}
                     </div>
                     <h6 className="text-[11px] font-black text-white uppercase tracking-widest">{p.l}</h6>
                     <p className="text-[9px] text-zinc-600 font-bold uppercase italic">{p.d}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-20 border-t border-zinc-900 bg-zinc-950/40 flex items-center justify-center shrink-0 px-12">
           <div className="flex items-center gap-10 opacity-50">
              <div className="flex items-center gap-3">
                 <Zap size={14} className="text-blue-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Sovereign Standard</span>
              </div>
              <div className="h-6 w-px bg-zinc-800" />
              <div className="flex items-center gap-3">
                 <Activity size={14} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Mesh Link Stable</span>
              </div>
              <div className="h-6 w-px bg-zinc-800 hidden md:block" />
              <div className="hidden md:flex items-center gap-3">
                 <Lock size={14} className="text-zinc-600" />
                 <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">AES-256 Enabled</span>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-down {
          0% { top: -10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
