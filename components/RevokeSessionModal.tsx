
import React from 'react';
import { X, LogOut, ShieldAlert, Terminal, Activity, RotateCcw } from 'lucide-react';

interface RevokeSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RevokeSessionModal: React.FC<RevokeSessionModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#050505] border-2 border-red-900/30 rounded-[2.5rem] p-10 space-y-8 shadow-[0_0_100px_rgba(239,68,68,0.1)] overflow-hidden">
        {/* Top Red Glow */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600 opacity-40 shadow-[0_0_15px_#ef4444]" />
        
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-red-600/10 border-2 border-red-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <span className="text-red-500 font-black text-[9px] font-mono uppercase tracking-[0.4em] animate-pulse">
                [REVOKE_IDENTITY_SESSION]
              </span>
            </div>
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">TERMINATE LINK.</h3>
          </div>
        </div>

        <div className="bg-black/60 border border-zinc-900 rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-900">
            <Terminal size={12} className="text-red-500" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Protocol Audit</span>
          </div>
          
          <div className="space-y-4 font-mono text-[11px] text-zinc-400 font-bold uppercase leading-relaxed tracking-tight">
            <p className="flex gap-3">
              <span className="text-red-600">>></span>
              <span>Purging local session tokens from browser cache.</span>
            </p>
            <p className="flex gap-3">
              <span className="text-red-600">>></span>
              <span className="text-zinc-200 italic">Sentinel Registry progress (XP/BRI) will be maintained in host storage.</span>
            </p>
            <p className="flex gap-3">
              <span className="text-red-600">>></span>
              <span>Severing active cryptographic handshake.</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-5 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-red-500 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 group"
          >
            <LogOut size={14} className="group-hover:translate-x-1 transition-transform" /> TERMINATE_SESSION
          </button>
          <button 
            onClick={onClose}
            className="w-full py-4 bg-zinc-950 border border-zinc-900 rounded-2xl text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <RotateCcw size={12} /> ABORT_DISCONNECT
          </button>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 opacity-20 border-t border-zinc-900">
          <div className="flex items-center gap-2">
            <Activity size={10} className="text-zinc-700" />
            <span className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">Silo 01 Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
