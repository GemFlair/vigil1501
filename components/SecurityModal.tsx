
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, ShieldCheck, ChevronRight, Smartphone, Zap, Cpu, Globe, Loader2, Terminal, AlertTriangle, Wifi, RotateCcw } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: (wallet: string, isGuest?: boolean) => void;
}

type ModalStep = 'DISCLOSURE' | 'CONNECT';

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('DISCLOSURE');
  const [isConnecting, setIsConnecting] = useState(false);
  const [handshakeLog, setHandshakeLog] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const runHandshake = async (label: string) => {
    const logs = [
      `DETECTING_${label}_PROVIDER...`,
      "NEGOTIATING_ENCRYPTION_KEYS...",
      "MAPPING_NEURAL_PATHWAY...",
      "SYNCING_MASTER_REGISTRY...",
      "IDENTITY_VALIDATED_OK"
    ];
    for (const log of logs) {
      setHandshakeLog(log);
      await new Promise(r => setTimeout(r, 450));
    }
  };

  const connectWallet = async (type: 'PHANTOM' | 'SOLFLARE' | 'SIMULATED' | 'GUEST') => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (type === 'SIMULATED') {
        await runHandshake('VIRTUAL');
        onClose("VIG1SimulatedNode8821xPoisoN7729110028x992211", false);
        return;
      }
      
      if (type === 'GUEST') {
        await runHandshake('VISITOR');
        onClose("VISITOR_NODE_UNSYNCED", true);
        return;
      }

      // Real Provider Detection
      const provider = type === 'PHANTOM' 
        ? (window as any).phantom?.solana || (window as any).solana 
        : (window as any).solflare;

      if (!provider) {
        throw new Error("EXTENSION_NOT_FOUND");
      }

      setHandshakeLog(`AWAITING_SIGNATURE_FROM_${type}...`);
      const resp = await provider.connect();
      
      // Dramatic finish
      await runHandshake(type);
      
      const walletAddr = resp.publicKey ? resp.publicKey.toString() : resp.toString();
      onClose(walletAddr, false);
    } catch (err: any) {
      console.error(err);
      let msg = "HANDSHAKE_REJECTED_BY_USER";
      if (err.message === "EXTENSION_NOT_FOUND") {
        msg = `RELIANCE_FAILURE: ${type} NOT INSTALLED`;
      }
      setError(msg);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700 overflow-y-auto">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-4xl bg-[#050505] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] my-auto max-h-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse" />
        
        {isConnecting ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-10 animate-in zoom-in duration-300">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" strokeWidth={1} />
              </div>
              <div className="absolute inset-0 border-2 border-blue-500/10 rounded-full animate-ping" />
            </div>
            <div className="space-y-3 text-center">
              <div className="text-[12px] font-black text-blue-500 uppercase tracking-[0.5em] animate-pulse">{handshakeLog}</div>
              <p className="text-zinc-700 text-[9px] font-mono uppercase tracking-widest italic">ESTABLISHING_SOVEREIGN_LINK</p>
            </div>
          </div>
        ) : step === 'DISCLOSURE' ? (
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full overflow-y-auto md:overflow-visible no-scrollbar">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <ShieldAlert className="text-red-500 w-5 h-5 md:w-8 md:h-8" />
                <span className="text-[9px] md:text-[11px] font-black text-red-500 uppercase tracking-[0.4em] md:tracking-[0.6em]">System_Disclosure</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">NO TOKEN <br/> EXISTS.</h2>
              <div className="max-w-xl mx-auto p-3 md:p-5 bg-red-600/5 border border-red-500/20 rounded-xl md:rounded-2xl">
                 <p className="text-[9px] md:text-[10px] font-black text-red-400 uppercase tracking-widest leading-relaxed">
                   VIGIL IS A SECURITY STANDARD. WE DO NOT HAVE A TOKEN, A PRE-SALE, OR AN AIRDROP. ANY CLAIM TO THE CONTRARY IS A POISON EVENT.
                 </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
               <div className="p-4 md:p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl text-left space-y-2 md:space-y-4">
                  <div className="flex items-center gap-3 text-zinc-400"><Lock size={14} /><span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Non-Custodial</span></div>
                  <p className="text-[10px] md:text-[12px] text-zinc-500 font-bold uppercase italic leading-relaxed">VIGIL operates in a local sandbox. Private keys are never requested, stored, or transmitted.</p>
               </div>
               <div className="p-4 md:p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl text-left space-y-2 md:space-y-4">
                  <div className="flex items-center gap-3 text-zinc-400"><ShieldCheck size={14} /><span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Retinal Standard</span></div>
                  <p className="text-[10px] md:text-[12px] text-zinc-500 font-bold uppercase italic leading-relaxed">Verification occurs at the visual layer (0.5). Final execution authority remains with the user.</p>
               </div>
            </div>

            <button onClick={() => setStep('CONNECT')} className="w-full py-5 md:py-7 bg-white text-black text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 md:gap-4">ACKNOWLEDGE & PROCEED <ChevronRight size={18} /></button>
            <p className="text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">Registry ID: VIG-DISCLOSURE-2026</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto md:overflow-visible no-scrollbar">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Smartphone className="text-blue-500 w-5 h-5 md:w-8 md:h-8" />
                <span className="text-[9px] md:text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] md:tracking-[0.6em]">Identity_Protocol</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">ESTABLISH <br/> IDENTITY.</h2>
              <p className="text-zinc-500 text-xs md:text-sm italic font-medium max-w-lg mx-auto leading-relaxed uppercase tracking-widest pt-2 md:pt-4">
                "Registry synchronization requires an identity path. Choose to sync your wallet, test the sandbox, or explore the facility as a visitor."
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
              {[
                { id: 'PHANTOM', label: 'Phantom', icon: <Smartphone />, color: 'text-blue-500', bg: 'hover:bg-blue-600/10 hover:border-blue-500/50' },
                { id: 'SOLFLARE', label: 'Solflare', icon: <Zap />, color: 'text-orange-500', bg: 'hover:bg-orange-600/10 hover:border-orange-500/50' },
                { id: 'SIMULATED', label: 'Virtual Node', icon: <Cpu />, color: 'text-emerald-500', bg: 'hover:bg-emerald-600/10 hover:border-emerald-500/50', badge: 'Sandbox' },
                { id: 'GUEST', label: 'Visitor', icon: <Globe />, color: 'text-zinc-500', bg: 'hover:bg-zinc-800 hover:border-zinc-700', sub: 'Full Exploration' }
              ].map((w) => (
                <button 
                  key={w.id} 
                  onClick={() => connectWallet(w.id as any)}
                  disabled={isConnecting}
                  className={`group p-4 md:p-8 bg-zinc-950 border-2 border-zinc-900 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center gap-2 md:gap-4 transition-all active:scale-95 relative overflow-hidden disabled:opacity-50 ${w.bg}`}
                >
                  {w.badge && (
                    <div className="absolute top-0 right-0 p-1 md:p-2 opacity-20">
                      <div className="px-1 py-0.5 bg-emerald-500 text-black text-[5px] md:text-[6px] font-black rounded uppercase">{w.badge}</div>
                    </div>
                  )}
                  <div className={`w-10 h-10 md:w-16 md:h-16 bg-zinc-900 rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${w.color}`}>
                    {React.cloneElement(w.icon as React.ReactElement<{ size?: number }>, { size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 32 })}
                  </div>
                  <div className="space-y-0.5 md:space-y-1">
                    <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest block">{w.label}</span>
                    {w.sub && <span className="text-[5px] md:text-[6px] text-zinc-600 font-bold uppercase tracking-tight block">{w.sub}</span>}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <div className="w-full p-4 md:p-5 bg-red-600/10 border border-red-500/20 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 md:gap-4 animate-in slide-in-from-top-2">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-[9px] md:text-[11px] font-black text-red-500 uppercase tracking-widest">{error}</span>
              </div>
            )}
            
            <button 
              onClick={() => setStep('DISCLOSURE')} 
              disabled={isConnecting}
              className="text-zinc-700 text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:text-zinc-400 flex items-center gap-2 transition-colors disabled:opacity-30"
            >
              <RotateCcw size={10} /> Back to Disclosure
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-900 overflow-hidden">
           <div 
            className={`h-full transition-all duration-1000 ${step === 'DISCLOSURE' ? 'w-1/2 bg-red-600' : 'w-full bg-emerald-600'}`} 
           />
        </div>
      </div>
    </div>
  );
};
