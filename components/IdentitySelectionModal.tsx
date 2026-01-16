import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ChevronRight, Smartphone, Zap, ShieldAlert, Download, Loader2 } from 'lucide-react';

interface IdentitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: string) => void;
}

export const IdentitySelectionModal: React.FC<IdentitySelectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [detected, setDetected] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });
  const [isLinking, setIsLinking] = useState<string | null>(null);

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
    try {
      const provider = type === 'PHANTOM' 
        ? (window as any).phantom?.solana || (window as any).solana 
        : (window as any).solflare;
      
      const resp = await provider.connect();
      const addr = resp?.publicKey?.toString() || provider.publicKey?.toString();
      
      if (addr) {
        // High-fidelity handshake simulation
        await new Promise(r => setTimeout(r, 1200));
        onConnect(addr);
      }
    } catch (e) {
      console.error("Link rejected:", e);
    } finally {
      setIsLinking(null);
    }
  };

  const noWallets = !detected.phantom && !detected.solflare;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-[420px] bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between p-8 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
          <button className="text-zinc-500 hover:text-white transition-colors">
            <HelpCircle size={20} strokeWidth={1.5} />
          </button>
          <h3 className="text-lg font-bold text-white tracking-tight">Connect Wallet</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* WALLET LIST */}
        <div className="p-4 space-y-1">
          {isLinking ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
               <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                  </div>
                  <div className="absolute inset-0 border-2 border-blue-500/10 rounded-full animate-ping" />
               </div>
               <div className="space-y-1">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Establishing Link</span>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase italic">AWAITING_REPLY_FROM_{isLinking}</p>
               </div>
            </div>
          ) : (
            <>
              {/* PHANTOM ROW */}
              <button 
                onClick={() => handleConnect('PHANTOM')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl hover:bg-white/[0.03] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#ab9ff2]/10 rounded-xl flex items-center justify-center border border-[#ab9ff2]/20 group-hover:scale-110 transition-transform">
                     <Smartphone className="text-[#ab9ff2]" size={20} />
                  </div>
                  <span className="text-base font-bold text-zinc-200 tracking-tight">Phantom</span>
                </div>
                <div className="flex items-center gap-3">
                  {detected.phantom ? (
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[8px] font-black text-emerald-500 uppercase tracking-widest">Installed</span>
                  ) : (
                    <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-[8px] font-black text-zinc-500 uppercase tracking-widest">Not Found</span>
                  )}
                  <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                </div>
              </button>

              {/* SOLFLARE ROW */}
              <button 
                onClick={() => handleConnect('SOLFLARE')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl hover:bg-white/[0.03] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                     <Zap className="text-orange-500" size={20} />
                  </div>
                  <span className="text-base font-bold text-zinc-200 tracking-tight">Solflare</span>
                </div>
                <div className="flex items-center gap-3">
                  {detected.solflare ? (
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[8px] font-black text-emerald-500 uppercase tracking-widest">Installed</span>
                  ) : (
                    <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-md text-[8px] font-black text-zinc-500 uppercase tracking-widest">Not Found</span>
                  )}
                  <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                </div>
              </button>

              {/* NO WALLETS FALLBACK */}
              {noWallets && (
                <div className="p-8 text-center space-y-4 animate-in fade-in duration-700">
                   <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto">
                      <ShieldAlert className="text-red-500" size={20} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest">No Wallet Found</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase italic leading-relaxed">Install a Solana extension to establish an identity link.</p>
                   </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-8 border-t border-white/5 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-[10px] font-bold text-zinc-500 px-3 py-1">UX by</span>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg">
                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                 <span className="text-zinc-300 font-mono text-[10px]">/ / reown</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};