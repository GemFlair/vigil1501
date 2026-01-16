import React, { useState, useEffect } from 'react';
import { Activity, Shield, Zap, Radio, Globe, Cpu, Brain, TrendingUp, AlertCircle, Terminal, Dna, Fingerprint, BookOpen, Search, Scan, User, Layers, ShieldX, ShieldCheck } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';

interface ThreatReport {
  id: string;
  location: string;
  cluster: string;
  status: 'INTERCEPTED' | 'ACTIVE' | 'NEUTRALIZED';
  type: 'POISON' | 'SPOOF' | 'DUST';
  timestamp: string;
}

const generateMockThreat = (): ThreatReport => {
  const clusters = ['Vanity-X', 'Alpha-Mimic', 'Dust-Siphon', 'Entropy-Gap', 'Cluster-8821'];
  const locations = ['Singapore', 'New York', 'Frankfurt', 'London', 'Tokyo', 'Zurich'];
  const types: ('POISON' | 'SPOOF' | 'DUST')[] = ['POISON', 'SPOOF', 'DUST'];
  const statuses: ('INTERCEPTED' | 'ACTIVE' | 'NEUTRALIZED')[] = ['INTERCEPTED', 'ACTIVE', 'NEUTRALIZED'];
  
  return {
    id: `VIG-${Math.floor(Math.random() * 9000) + 1000}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    cluster: clusters[Math.floor(Math.random() * clusters.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    type: types[Math.floor(Math.random() * types.length)],
    timestamp: new Date().toLocaleTimeString(),
  };
};

export const IntelligenceForge: React.FC<{ onOpenDoc?: (doc: RegistryDoc) => void; powerSave?: boolean }> = ({ onOpenDoc, powerSave }) => {
  const [threats, setThreats] = useState<ThreatReport[]>([]);
  const [bri, setBri] = useState(100);
  const [xp, setXp] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const savedBri = localStorage.getItem('vigil_user_bri');
    const savedXp = localStorage.getItem('vigil_user_xp');
    if (savedBri) setBri(parseInt(savedBri));
    if (savedXp) setXp(parseInt(savedXp));

    const initialThreats = Array.from({ length: 5 }).map(generateMockThreat);
    setThreats(initialThreats);

    const interval = setInterval(() => {
      setThreats(prev => [generateMockThreat(), ...prev].slice(0, 8));
    }, 4000);

    let animationFrame: number;
    const animateTick = () => {
      setTick(t => t + 1);
      animationFrame = requestAnimationFrame(animateTick);
    };

    if (!powerSave) {
      animationFrame = requestAnimationFrame(animateTick);
    }

    return () => {
      clearInterval(interval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [powerSave]);

  const level = Math.floor(xp / 500) + 1;
  const progressToNextLevel = (xp % 500) / 5;

  return (
    <section id="intel-forge" className="px-1 md:px-20 py-8 md:py-12 bg-[#050505] relative z-10 overflow-hidden border-t border-zinc-900/50">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 px-4 md:px-0">
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.6em]">Calibration // Synthesis Node</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                Cognitive <br/> Evolution.
              </h2>
            </div>
            <p className="text-lg md:text-2xl text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">
              "Synchronizing local telemetry with the <span className="text-cyan-500">global Sentinel mesh</span> to identify malicious clusters."
            </p>
          </div>
          
          <div className="w-full lg:w-96 p-6 md:p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] space-y-6 shrink-0 shadow-2xl">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_cyan]" />
                   <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">User Level {level}</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{xp} XP</span>
             </div>
             <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-1000" style={{ width: `${progressToNextLevel}%` }} />
             </div>
             <div className="flex justify-between items-center px-1">
                <p className="text-[8px] md:text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Mesh Delta: +2.1%</p>
                <p className="text-[8px] md:text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Rank: Sentinel</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 px-2 md:px-0">
          
          {/* SACCADIC PROFILE VISUALIZER */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 relative overflow-hidden group shadow-2xl">
             <div className="absolute top-6 right-8 flex items-center gap-2">
                <Activity className="w-3 h-3 md:w-4 md:h-4 text-emerald-500" />
                <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest">Neural Latency: STABLE</span>
             </div>

             <div className="space-y-6 md:space-y-8 h-full flex flex-col">
                <div className="space-y-2">
                   <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tight">Saccadic Profile</h3>
                   <p className="text-zinc-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">Mapping visual verification patterns across nodes.</p>
                   <div className="flex gap-2 md:gap-4 mt-4 md:mt-6">
                      <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-[7px] md:text-[8px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                         <Scan className="w-3 h-3" /> EYE_SYNC
                      </div>
                      <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                         <User className="w-3 h-3" /> IDENTITY_OK
                      </div>
                   </div>
                </div>

                <div className="flex-1 min-h-[280px] md:min-h-[350px] flex items-end gap-1 relative pt-12">
                   {Array.from({ length: window.innerWidth < 768 ? 25 : 50 }).map((_, i) => (
                     <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-cyan-950/40 via-cyan-600/20 to-cyan-400/40 rounded-t-sm transition-all duration-[1500ms] ease-in-out will-change-transform"
                        style={{ 
                          height: powerSave ? `${30 + (i % 5) * 10}%` : `${20 + Math.sin(i * 0.4 + tick * 0.08) * 35 + Math.random() * 45}%`,
                          opacity: 0.1 + (i / 50) * 0.5
                        }}
                     />
                   ))}
                   <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/10 pointer-events-none" />
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-zinc-900 pt-6 md:pt-8">
                   {[
                     { label: 'Precision', val: `${bri}%` },
                     { label: 'Mesh Sync', val: '1.2M' },
                     { label: 'Rejection', val: '99.1%' }
                   ].map((item, i) => (
                     <div key={i} className="space-y-1">
                        <div className="text-[7px] md:text-[8px] font-black text-zinc-600 uppercase tracking-widest">{item.label}</div>
                        <div className="text-lg md:text-2xl font-black text-white italic">{item.val}</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* LIVE THREAT TELEMETRY FEED */}
          <div className="lg:col-span-4 bg-[#080808] border-2 border-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 flex flex-col h-[500px] md:h-[650px] shadow-2xl relative overflow-hidden group">
             <div className="space-y-6 flex-1 flex flex-col min-h-0 relative z-10">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-4 md:pb-6">
                   <div className="flex items-center gap-3">
                      <Globe className={`w-5 h-5 text-red-500 ${!powerSave ? 'animate-spin-slow' : ''}`} />
                      <h4 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tight">Threat Feed</h4>
                   </div>
                   <div className="px-2 py-0.5 bg-red-600/10 border border-red-500/20 rounded text-[7px] md:text-[8px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                      LIVE
                   </div>
                </div>

                <div className="space-y-3 md:space-y-4 overflow-y-auto no-scrollbar flex-1 pr-1">
                   {threats.map((threat, idx) => (
                     <div key={threat.id} className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl md:rounded-2xl space-y-3 animate-in slide-in-from-bottom-4 duration-700 hover:border-red-600/40 transition-all">
                        <div className="flex justify-between items-start">
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <span className="text-[8px] font-mono text-red-500 font-bold">{threat.id}</span>
                                 <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">{threat.location}</span>
                              </div>
                              <div className="text-[10px] font-black text-white uppercase tracking-widest">{threat.cluster}</div>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                           <div className={`px-1.5 py-0.5 rounded text-[6px] md:text-[7px] font-black uppercase tracking-widest border ${
                                threat.type === 'POISON' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                              }`}>
                                {threat.type}_VECTOR
                           </div>
                           <div className={`text-[7px] font-black uppercase tracking-widest ${threat.status === 'NEUTRALIZED' ? 'text-emerald-500' : 'text-red-600'}`}>
                                {threat.status}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-4 md:pt-6 border-t border-zinc-900 space-y-4">
                   <button className="w-full py-4 bg-zinc-950 border border-zinc-900 text-zinc-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:text-white transition-all flex items-center justify-center gap-2">
                      <Terminal className="w-3.5 h-3.5" /> RAW_TELEMETRY
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};