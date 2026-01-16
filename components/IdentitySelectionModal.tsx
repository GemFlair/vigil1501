import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ChevronRight, Smartphone, Zap, ShieldAlert, Loader2, Cpu, Wifi, Fingerprint, ShieldCheck, ChevronLeft } from 'lucide-react';

interface IdentitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: string) => void;
}

export const IdentitySelectionModal: React.FC<IdentitySelectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [view, setView] = useState<'LIST' | 'INFO'>('LIST');
  const [detected, setDetected] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });
  const [isLinking, setIsLinking] = useState<string | null>(null);
  const [linkingStatus, setLinkingStatus] = useState<string>('NEGOTIATING_ENCRYPTION_KEYS');

  // Reset internal states when the modal visibility changes
  useEffect(() => {
    if (!isOpen) {
      setIsLinking(null);
      setView('LIST');
      setLinkingStatus('INITIALIZING_HANDSHAKE');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const check = () => {
        const isPhantom = !!((window as any).phantom?.solana || (window as any).solana?.isPhantom);
        const isSolflare = !!((window as any).solflare);
        setDetected({ phantom: isPhantom, solflare: isSolflare });
      };
      check();
      const t = setInterval(check, 1000);
      return () => clearInterval(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = async (type: 'PHANTOM' | 'SOLFLARE') => {
    const isDetected = type === 'PHANTOM' ? detected.phantom : detected.solflare;
    if (!isDetected) {
      const url = type === 'PHANTOM' ? 'https://phantom.app/' : 'https://solflare.com/';
      window.open(url, '_blank');
      return;
    }

    setIsLinking(type);
    setLinkingStatus('INITIALIZING_HANDSHAKE');
    
    try {
      const provider = type === 'PHANTOM' 
        ? (window as any).phantom?.solana || (window as any).solana 
        : (window as any).solflare;
      
      const resp = await provider.connect();
      const addr = resp?.publicKey?.toString() || provider.publicKey?.toString();
      
      if (addr) {
        // Enforce Identity Signature
        setLinkingStatus('AWAITING_IDENTITY_SIGNATURE');
        const message = new TextEncoder().encode(`VIGIL_IDENTITY_SYNC: ${Date.now()}`);
        
        try {
          await provider.signMessage(message, "utf8");
          setLinkingStatus('IDENTITY_VALIDATED_OK');
          // High-fidelity final sync simulation
          await new Promise(r => setTimeout(r, 800));
          onConnect(addr);
        } catch (signErr) {
          console.error("Signature rejected:", signErr);
          setIsLinking(null);
        }
      }
    } catch (e) {
      console.error("Link rejected:", e);
      setIsLinking(null);
    }
  };

  const noWallets = !detected.phantom && !detected.solflare;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-[420px] bg-[#050505] border border-zinc-800 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-gradient-to-b from-white/[0.02] to-transparent">
          <button 
            onClick={() => setView(view === 'LIST' ? 'INFO' : 'LIST')}
            className="text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            {view === 'LIST' ? <HelpCircle size={18} strokeWidth={1.5} /> : <ChevronLeft size={18} strokeWidth={1.5} />}
          </button>
          <div className="flex flex-col items-center">
             <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">
               {view === 'LIST' ? 'Identity Protocol' : 'VIGIL_KNOWLEDGE_BASE'}
             </span>
             <h3 className="text-sm font-black text-white tracking-[0.2em] uppercase italic">
               {view === 'LIST' ? 'Identity_Link_Portal' : 'SOVEREIGN_INTEL_ACCESS'}
             </h3>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="p-4 min-h-[360px] flex flex-col">
          {isLinking ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-300">
               <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-blue-600/5 border border-blue-500/20 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                  <div className="absolute -inset-4 border-2 border-blue-500/10 rounded-full animate-ping" />
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] animate-pulse">{linkingStatus}</span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Handshake: {isLinking}</p>
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                  </div>
               </div>
            </div>
          ) : view === 'INFO' ? (
            <div className="flex-1 space-y-6 p-4 animate-in slide-in-from-left-4 duration-500">
               {/* SECTION 1: IDENT_HANDSHAKE */}
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-blue-500">
                        <Fingerprint size={16} />
                     </div>
                     <h4 className="text-[10px] font-black text-white uppercase tracking-widest">[IDENT_HANDSHAKE]</h4>
                  </div>
                  <div className="pl-11">
                     <p className="text-[11px] font-bold text-white mb-1 uppercase italic tracking-tight">What is an Identity Link?</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed font-medium uppercase">It establishes a secure bridge between your visual intent and the cryptographic signature. VIGIL monitors this pipeline to ensure the address you see is the one you sign.</p>
                  </div>
               </div>

               {/* SECTION 2: LOCAL_SANDBOX */}
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-500">
                        <ShieldCheck size={16} />
                     </div>
                     <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">[LOCAL_SANDBOX]</h4>
                  </div>
                  <div className="pl-11">
                     <p className="text-[11px] font-bold text-white mb-1 uppercase italic tracking-tight">Is my data monitored?</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed font-medium uppercase">No. VIGIL utilizes local-only heuristics. Your interaction history remains isolated within your browser's IndexedDB. We have zero visibility into your private keys or session tokens.</p>
                  </div>
               </div>

               {/* SECTION 3: RETINAL_THRESHOLD */}
               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-500">
                        <Zap size={16} />
                     </div>
                     <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">[RETINAL_THRESHOLD]</h4>
                  </div>
                  <div className="pl-11">
                     <p className="text-[11px] font-bold text-white mb-1 uppercase italic tracking-tight">Why establish a link?</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed font-medium uppercase">To neutralize the 8-character blind spot. Adversaries exploit visual shortcuts; Establishing a link enables the Retinal Shield to flag similarity collisions in real-time.</p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-2 p-2 animate-in fade-in duration-500">
              {/* PHANTOM ROW */}
              <button 
                onClick={() => handleConnect('PHANTOM')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center transition-all group-hover:border-[#ab9ff2]/40">
                     <Smartphone className="text-[#ab9ff2]" size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-zinc-200 tracking-widest uppercase italic">Phantom</span>
                    <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter mt-0.5">NODE_PROVIDER_01</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {detected.phantom ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-md">
                       <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[8px] font-mono font-black text-emerald-500 uppercase tracking-widest">INSTALLED</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[8px] font-black text-zinc-600 uppercase tracking-widest">ABSENT</span>
                  )}
                  <ChevronRight size={14} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>

              {/* SOLFLARE ROW */}
              <button 
                onClick={() => handleConnect('SOLFLARE')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center transition-all group-hover:border-orange-500/40">
                     <Zap className="text-orange-500" size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-zinc-200 tracking-widest uppercase italic">Solflare</span>
                    <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter mt-0.5">NODE_PROVIDER_02</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {detected.solflare ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-md">
                       <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[8px] font-mono font-black text-emerald-500 uppercase tracking-widest">INSTALLED</span>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-[8px] font-black text-zinc-600 uppercase tracking-widest">ABSENT</span>
                  )}
                  <ChevronRight size={14} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                </div>
              </button>

              {/* NO WALLETS FALLBACK */}
              {noWallets && (
                <div className="p-10 text-center space-y-4 animate-in fade-in duration-700 bg-red-600/5 border border-red-500/10 rounded-[2rem] mt-4">
                   <div className="w-12 h-12 bg-zinc-900 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                      <ShieldAlert className="text-red-500" size={20} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Link Failure</h4>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase italic leading-relaxed px-4">No compatible identity providers detected on this host.</p>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER - PROTOCOL METADATA */}
        <div className="p-8 border-t border-zinc-900 flex flex-col items-center gap-6 shrink-0">
           <div className="flex items-center gap-3 opacity-40">
              <div className="flex items-center gap-2">
                 <Wifi size={10} className="text-zinc-600" />
                 <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Sovereign Relay</span>
              </div>
              <div className="w-[1px] h-3 bg-zinc-800" />
              <div className="flex items-center gap-2">
                 <Cpu size={10} className="text-zinc-600" />
                 <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Local Heuristics</span>
              </div>
           </div>
           
           <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-zinc-800 rounded-xl">
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest px-3 py-1">Protocol Standard</span>
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-lg">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                 <span className="text-zinc-400 font-mono text-[9px] font-bold">VIG-INT-01-S</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};