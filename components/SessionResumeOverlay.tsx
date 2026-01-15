
import React from 'react';
import { Target, Radio, Terminal, Activity } from 'lucide-react';

interface SessionResumeOverlayProps {
  level: number;
  onJump: () => void;
  onStay: () => void;
}

export const SessionResumeOverlay: React.FC<SessionResumeOverlayProps> = ({ level, onJump, onStay }) => {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-transparent backdrop-blur-[6px] animate-in fade-in duration-700">
      {/* High-fidelity prompt container */}
      <div className="w-full max-w-sm bg-[#050505]/95 border-2 border-cyan-500/40 rounded-[2.5rem] p-8 shadow-[0_0_120px_rgba(0,0,0,1)] relative overflow-hidden group">
        
        {/* Oscilloscope Pulse Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-resume-pulse" />
        
        <div className="space-y-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500">
              <Radio className="animate-pulse" size={24} />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Restore_Point</span>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Silo_0{level} Detected.</h3>
            </div>
          </div>

          <p className="text-zinc-400 text-xs font-medium leading-relaxed italic uppercase border-l-2 border-cyan-900/50 pl-4">
            "A previous decryption state exists in the local registry. Select entry vector."
          </p>

          <div className="space-y-3">
            <button 
              onClick={onJump}
              className="w-full py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group/btn active:scale-95"
            >
              <Target size={14} className="group-hover/btn:scale-110 transition-transform" /> RE-ESTABLISH LINK
            </button>
            <button 
              onClick={onStay}
              className="w-full py-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Terminal size={12} /> TOP-LEVEL ENTRY
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-3 opacity-20">
             <Activity size={10} className="text-zinc-500" />
             <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.3em]">Persistent Link v0.5.2</span>
          </div>
        </div>

        {/* Retractive Corner Decal */}
        <div className="absolute bottom-[-15px] right-[-15px] w-24 h-24 border-r-2 border-b-2 border-cyan-500/10 rounded-br-[2.5rem] pointer-events-none" />
      </div>

      <style>{`
        @keyframes resume-pulse {
          0%, 100% { opacity: 0.3; transform: scaleX(0.9); }
          50% { opacity: 1; transform: scaleX(1); }
        }
        .animate-resume-pulse {
          animation: resume-pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
