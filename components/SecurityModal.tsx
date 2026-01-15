
import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Lock, ShieldX, Hammer, Zap, Smartphone, ExternalLink, Cpu, Ghost, ShieldCheck, Info, ChevronRight, Layout, Globe } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: (wallet: string, isGuest?: boolean) => void;
}

type ModalStep = 'DISCLOSURE' | 'CONNECT';

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('DISCLOSURE');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const connectWallet = async (type: 'PHANTOM' | 'SOLFLARE' | 'SIMULATED' | 'GUEST') => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (type === 'SIMULATED') {
        await new Promise(resolve => setTimeout(resolve, 800));
        onClose("VIG1SimulatedNode8821xPoisoN7729110028x992211", false);
        return;
      }

      if (type === 'GUEST') {
        await new Promise(resolve => setTimeout(resolve, 600));
        onClose("VISITOR_NODE_UNSYNCED", true);
        return;
      }

      let provider: any = null;
      if (type === 'PHANTOM') {
        provider = (window as any).phantom?.solana || (window as any).solana;
        if (!provider?.isPhantom) throw new Error("PHANTOM_EXTENSION_NOT_FOUND");
      } else {
        provider = (window as any).solflare;
        if (!provider) throw new Error("SOLFLARE_EXTENSION_NOT_FOUND");
      }

      const resp = await provider.connect();
      const walletAddr = resp.publicKey ? resp.publicKey.toString() : resp.toString();
      
      if (walletAddr) {
        onClose(walletAddr, false);
      } else {
        throw new Error("IDENTITY_REJECTED");
      }
    } catch (err: any) {
      console.error("Connection Error:", err);
      if (err.message?.includes("NOT_FOUND")) {
        setError("EXTENSION NOT DETECTED. Using a sandbox? Use the Virtual Node option.");
      } else {
        setError(err.message || "HANDSHAKE_FAILURE");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 sm:p-4 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700 overflow-y-auto">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-4xl bg-zinc-950/70 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-12 relative overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.9)] my-auto">
        
        {step === 'DISCLOSURE' ? (
          <div className="relative z-10 flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 bg-red-600/10 border border-red-500/20 rounded-xl flex items-center justify-center text-red-500">
                  <ShieldAlert size={22} />
                </div>
                <div className="h-[1px] w-8 bg-zinc-800" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em]">System_Disclosure</span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                  NO TOKEN <br/> EXISTS.
                </h2>
                <div className="max-w-lg mx-auto p-4 bg-red-600/5 border border-red-500/20 rounded-2xl">
                   <p className="text-[11px] font-black text-red-400 uppercase tracking-widest leading-relaxed">
                     VIGIL IS A SECURITY STANDARD, NOT A SPECULATIVE ASSET. WE DO NOT HAVE A TOKEN, A PRE-SALE, OR AN AIRDROP.
                   </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
               <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-left space-y-3">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Lock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Non-Custodial</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase italic leading-relaxed">
                    VIGIL operates in a local sandbox. We never request private keys or seed phrases.
                  </p>
               </div>
               <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl text-left space-y-3">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Advisory Only</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase italic leading-relaxed">
                    The system provides heuristic alerts. You remain the sole authority over your signatures.
                  </p>
               </div>
            </div>

            <button 
              onClick={() => setStep('CONNECT')}
              className="w-full py-6 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"
            >
              ACKNOWLEDGE & PROCEED <ChevronRight size={18} />
            </button>

            <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">Registry ID: VIG-DISCLOSURE-2026</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                  <Smartphone size={22} />
                </div>
                <div className="h-[1px] w-8 bg-zinc-800" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em]">Identity_Protocol</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                  ESTABLISH <br/> IDENTITY.
                </h2>
                <p className="text-zinc-500 text-sm italic font-medium max-w-lg mx-auto leading-relaxed uppercase tracking-widest pt-4">
                  "Registry synchronization requires an identity path. Choose to sync your wallet, test the sandbox, or explore the facility as a visitor."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <button 
                onClick={() => connectWallet('PHANTOM')}
                disabled={isConnecting}
                className="group p-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl flex flex-col items-center gap-3 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="text-blue-500" size={24} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Phantom</span>
              </button>
              
              <button 
                onClick={() => connectWallet('SOLFLARE')}
                disabled={isConnecting}
                className="group p-5 bg-zinc-900/50 border-2 border-zinc-800 rounded-3xl flex flex-col items-center gap-3 hover:border-orange-500/50 hover:bg-orange-600/5 transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="text-orange-500" size={24} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Solflare</span>
              </button>

              <button 
                onClick={() => connectWallet('SIMULATED')}
                disabled={isConnecting}
                className="group p-5 bg-emerald-600/10 border-2 border-emerald-500/30 rounded-3xl flex flex-col items-center gap-3 hover:border-emerald-500/60 hover:bg-emerald-600/20 transition-all active:scale-95 disabled:opacity-50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20">
                  <div className="px-1.5 py-0.5 bg-emerald-500 text-black text-[6px] font-black rounded uppercase">Sandbox</div>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="text-emerald-500" size={24} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Virtual Node</span>
              </button>

              <button 
                onClick={() => connectWallet('GUEST')}
                disabled={isConnecting}
                className="group p-5 bg-zinc-900/40 border-2 border-zinc-900 rounded-3xl flex flex-col items-center gap-3 hover:border-zinc-500 hover:bg-zinc-800/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe className="text-zinc-500" size={24} />
                </div>
                <div className="space-y-1 text-center">
                   <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none block">Visitor Access</span>
                   <span className="text-[6px] text-zinc-600 font-bold uppercase tracking-tight">Full Exploration</span>
                </div>
              </button>
            </div>

            {error && (
              <div className="w-full p-4 bg-red-600/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                <AlertTriangle size={14} className="text-red-500 shrink-0" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{error}</span>
              </div>
            )}

            <button 
              onClick={() => setStep('DISCLOSURE')}
              className="text-zinc-700 text-[10px] font-black uppercase tracking-widest hover:text-zinc-500 flex items-center gap-2"
            >
              <RotateCcwIcon size={12} /> BACK TO DISCLOSURE
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

const RotateCcwIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);
