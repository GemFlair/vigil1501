
import React, { useState, useEffect } from 'react';
import { 
  Fingerprint, Search, Binary, Target, ShieldX, 
  Activity, Database, Brain, Globe, LogOut, Lock
} from 'lucide-react';

const SILO_DATA = [
  { id: 1, icon: <Fingerprint />, label: 'IDENTITY', target: 'silo-1' },
  { id: 2, icon: <Search />, label: 'INTEL', target: 'silo-2' },
  { id: 3, icon: <Binary />, label: 'LOGIC', target: 'silo-3' },
  { id: 4, icon: <Target />, label: 'EXECUTION', target: 'silo-4' },
  { id: 5, icon: <ShieldX />, label: 'PURITY', target: 'silo-5' },
  { id: 6, icon: <Activity />, label: 'EVOLUTION', target: 'silo-6' },
  { id: 7, icon: <Database />, label: 'LOG', target: 'silo-7' },
  { id: 8, icon: <Brain />, label: 'AUDIT', target: 'silo-8' },
  { id: 9, icon: <Globe />, label: 'MESH', target: 'silo-9' },
  { id: 10, icon: <LogOut />, label: 'VOID', target: 'silo-10' },
];

interface FacilityArchitectureProps {
  scrollToSection: (id: string) => void;
  unlockLevel: number;
  isAdmin?: boolean;
}

export const FacilityArchitecture: React.FC<FacilityArchitectureProps> = ({ scrollToSection, unlockLevel, isAdmin = false }) => {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [isFullyLit, setIsFullyLit] = useState(false);
  const [glitchId, setGlitchId] = useState<number | null>(null);

  useEffect(() => {
    // Sequential ignition: 0.2s intervals
    const timers = SILO_DATA.map((_, i) => {
      return setTimeout(() => {
        setActiveIndices(prev => new Set([...prev, i]));
        if (i === SILO_DATA.length - 1) {
          setTimeout(() => setIsFullyLit(true), 500);
        }
      }, i * 200 + 500);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSiloClick = (silo: typeof SILO_DATA[0]) => {
    const isLocked = !isAdmin && silo.id > unlockLevel;
    
    if (isLocked) {
      setGlitchId(silo.id);
      setTimeout(() => setGlitchId(null), 600);
      return;
    }

    scrollToSection(silo.target);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-[#080808] border border-zinc-800 rounded-[2rem] p-6 md:p-10 overflow-hidden group shadow-2xl flex flex-col">
      {/* Integrated Header Row */}
      <div className="flex justify-between items-center mb-6 md:mb-8 relative z-30 px-2">
         <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-cyan-500 rounded-full" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Facility Topology</span>
         </div>
         
         <div className={`
           flex items-center gap-2 px-2 py-0.5 md:px-3 md:py-1.5 bg-black border border-zinc-800 rounded-md transition-opacity duration-1000
           ${isFullyLit ? 'opacity-100 animate-pulse' : 'opacity-0'}
         `}>
           <div className="w-1 h-1 rounded-full bg-emerald-500" />
           <span className="text-[6px] md:text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
             [REGISTRY_v1.0.1_STABLE]
           </span>
         </div>
      </div>

      {/* Mathematical Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-drift" />
      
      {/* Container for Silos */}
      <div className="relative h-full w-full grid grid-cols-5 grid-rows-2 gap-x-2 md:gap-x-6 gap-y-8 md:gap-y-12 z-10">
        {SILO_DATA.map((silo, i) => {
          const isActive = activeIndices.has(i);
          const isLocked = !isAdmin && silo.id > unlockLevel;
          const isGlitching = glitchId === silo.id;

          return (
            <div 
              key={silo.id} 
              className={`flex flex-col items-center gap-3 md:gap-4 group/silo transition-all duration-300 ${isLocked ? 'cursor-crosshair' : 'cursor-pointer hover:scale-[1.02]'}`}
              onClick={() => handleSiloClick(silo)}
            >
              {/* The Pod Box */}
              <div 
                className={`
                  relative w-full aspect-[1.4/1] flex items-center justify-center border transition-all duration-500 rounded-xl md:rounded-2xl
                  ${isGlitching ? 'border-red-500 bg-red-500/10 shadow-[0_0_20px_#ef4444] animate-silo-glitch' : 
                    isActive 
                    ? 'border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover/silo:border-cyan-400 group-hover/silo:bg-cyan-500/10 group-hover/silo:shadow-[0_0_50px_rgba(34,211,238,0.2)]' 
                    : 'border-zinc-800/40 bg-black/40'}
                  ${isLocked && !isGlitching ? 'opacity-40' : 'opacity-100'}
                `}
              >
                {/* Lock Overlay on Hover if locked */}
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/silo:opacity-100 transition-opacity bg-black/60 rounded-xl md:rounded-2xl z-20">
                     <Lock size={12} className="text-red-500" />
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  transition-all duration-700 transform shrink-0
                  ${isGlitching ? 'text-red-500' : isActive ? 'scale-110 opacity-100 text-cyan-400' : 'scale-75 opacity-0 text-zinc-800'}
                `}>
                  {React.cloneElement(silo.icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, { 
                    size: typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 22,
                    strokeWidth: 1.5
                  })}
                </div>

                {/* Status Dot */}
                <div className={`
                  absolute top-2 right-2 md:top-3 md:right-3 w-1 h-1 rounded-full
                  ${isGlitching ? 'bg-red-500' : isActive ? 'bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]' : 'bg-zinc-900'}
                `} />
              </div>

              {/* The Label */}
              <span className={`
                text-[5.5px] md:text-[8px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-700 text-center leading-none whitespace-nowrap
                ${isGlitching ? 'text-red-500' : isActive ? 'text-zinc-200 group-hover/silo:text-white' : 'text-zinc-900'}
              `}>
                {isLocked && !isGlitching ? 'ENCRYPTED' : silo.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Forensic Scanning Line */}
      {isFullyLit && (
        <div className="absolute inset-y-0 w-[2px] bg-cyan-400 shadow-[0_0_25px_#22d3ee] z-20 animate-scan-sweep pointer-events-none" />
      )}

      <style>{`
        @keyframes silo-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 2px); }
          80% { transform: translate(1px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-silo-glitch {
          animation: silo-glitch 0.15s infinite;
        }
        @keyframes scan-sweep {
          0% { left: -5%; }
          100% { left: 105%; }
        }
        .animate-scan-sweep {
          animation: scan-sweep 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};
