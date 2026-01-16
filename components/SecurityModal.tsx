import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, ShieldCheck, ChevronRight, Smartphone, Zap, Cpu, Globe, Loader2, Terminal, AlertTriangle, Wifi, RotateCcw, Download } from 'lucide-react';

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
  
  const [detected, setDetected] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });

  useEffect(() => {
    if (isOpen) {
      const checkProviders = () => {
        const isPhantom = !!((window as any).phantom?.solana || (window as any).solana?.isPhantom);
        const isSolflare = !!((window as any).solflare);
        setDetected({ phantom: isPhantom, solflare: isSolflare });
      };
      checkProviders();
      const timer = setInterval(checkProviders, 500);
      setTimeout(() => clearInterval(timer), 2000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

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

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    try {
      if (type === 'SIMULATED') {
        await runHandshake('VIRTUAL');
        onClose("VIG1_SIM_NODE_8821xPoisoN7729110028x992211", false);
        return;
      }
      
      if (type === 'GUEST') {
        await runHandshake('VISITOR');
        onClose("VISITOR_NODE_UNSYNCED", true);
        return;
      }

      if (isMobile) {
        const url = window.location.href.replace(/^https?:\/\//, '');
        if (type === 'PHANTOM') {
          window.location.href = `https://phantom.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(window.location.origin)}`;
          return;
        }
        if (type === 'SOLFLARE') {
          window.location.href = `https://solflare.com/ul/v1/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(window.location.origin)}`;
          return;
        }
      }

      const provider = type === 'PHANTOM' 
        ? (window as any).phantom?.solana || (window as any).solana 
        : (window as any).solflare;

      if (!provider) {
        throw new Error("EXTENSION_NOT_FOUND");
      }

      setHandshakeLog(`CONNECTING_TO_${type}...`);
      const resp = await provider.connect();
      
      let walletAddr = '';
      if (resp?.publicKey) {
        walletAddr = resp.publicKey.toString();
      } else if (provider.publicKey) {
        walletAddr = provider.publicKey.toString();
      }

      if (!walletAddr || walletAddr === 'true') {
        throw new Error("ADDRESS_EXTRACTION_FAILURE");
      }

      // FORCE SIGNATURE REQUEST
      setHandshakeLog("AWAITING_IDENTITY_SIGNATURE...");
      const message = new TextEncoder().encode(`VIGIL_IDENTITY_SYNC: ${Date.now()}`);
      try {
        await provider.signMessage(message, "utf8");
      } catch (signErr) {
        throw new Error("SIGNATURE_REJECTED");
      }

      await runHandshake(type);
      onClose(walletAddr, false);
    } catch (err: any) {
      console.error(err);
      let msg = "HANDSHAKE_REJECTED_BY_USER";
      if (err.message === "EXTENSION_NOT_FOUND") {
        msg = `RELIANCE_FAILURE: ${type} NOT INSTALLED`;
      } else if (err.message === "ADDRESS_EXTRACTION_FAILURE") {
        msg = "ERROR: FAILED TO PARSE CRYPTOGRAPHIC ADDRESS";
      } else if (err.message === "SIGNATURE_REJECTED") {
        msg = "ERROR: IDENTITY SIGNATURE REFUSED";
      }
      setError(msg);
      setIsConnecting(false);
    }
  };

  const noExtensions = !detected.phantom && !detected.solflare;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700 overflow-y-auto">
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

            <button onClick={() => setStep('CONNECT')} className="w-full py-5 md:py-7 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 md:gap-4">ACKNOWLEDGE & PROCEED <ChevronRight size={18} /></button>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 h-full overflow-y-auto md:overflow-visible no-scrollbar">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Smartphone className="text-blue-500 w-5 h-5 md:w-8 md:h-8" />
                <span className="text-[9px] md:text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] md:tracking-[0.6em]">Identity_Protocol</span>
              </div>
              <h2 className="text-3xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">ESTABLISH <br/> IDENTITY.</h2>
              
              {noExtensions && !isConnecting && (
                <div className="max-w-xl mx-auto p-4 bg-red-950/20 border border-red-900/40 rounded-2xl flex items-center gap-4 text-left">
                  <AlertTriangle className="text-red-500 shrink-0" size={20} />
                  <div>
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">NO_EXTENSIONS_DETECTED</div>
                    <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase italic">Install Phantom or Solflare to establish a cryptographic link.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
              {[
                { id: 'PHANTOM', label: 'Phantom', icon: <Smartphone />, color: 'text-blue-500', isDetected: detected.phantom, installUrl: 'https://phantom.app/' },
                { id: 'SOLFLARE', label: 'Solflare', icon: <Zap />, color: 'text-orange-500', isDetected: detected.solflare, installUrl: 'https://solflare.com/' },
                { id: 'SIMULATED', label: 'Virtual Node', icon: <Cpu />, color: 'text-emerald-500', isDetected: true, badge: 'Sandbox' },
                { id: 'GUEST', label: 'Visitor', icon: <Globe />, color: 'text-zinc-500', isDetected: true, sub: 'Full Exploration' }
              ].map((w) => (
                <div key={w.id} className="relative">
                  <button 
                    onClick={() => w.isDetected ? connectWallet(w.id as any) : window.open(w.installUrl, '_blank')}
                    disabled={isConnecting}
                    className={`w-full group p-4 md:p-8 bg-zinc-950 border-2 border-zinc-900 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center gap-2 md:gap-4 transition-all active:scale-95 relative overflow-hidden disabled:opacity-50 ${w.isDetected ? 'hover:bg-zinc-900 hover:border-blue-500/50' : 'opacity-40 hover:opacity-100 hover:border-zinc-700'}`}
                  >
                    {!w.isDetected && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-20">
                         <div className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded text-[7px] font-black text-white flex items-center gap-1">
                           <Download size={8} /> INSTALL
                         </div>
                      </div>
                    )}
                    <div className={`w-10 h-10 md:w-16 md:h-16 bg-zinc-900 rounded-lg md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${w.color}`}>
                      {React.cloneElement(w.icon as React.ReactElement<{ size?: number }>, { size: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 32 })}
                    </div>
                    <div className="space-y-0.5 md:space-y-1">
                      <span className="text-[8px] font-black text-white uppercase tracking-widest block">{w.label}</span>
                      {w.isDetected && <span className="text-[6px] text-emerald-500 font-bold uppercase tracking-tight block italic">Detected</span>}
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {error && (
              <div className="w-full p-4 md:p-5 bg-red-600/10 border border-red-500/20 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 md:gap-4 animate-in slide-in-from-top-2">
                <AlertTriangle size={16} className="text-red-500" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{error}</span>
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
      </div>
    </div>
  );
};