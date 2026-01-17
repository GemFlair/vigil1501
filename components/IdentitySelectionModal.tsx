import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ChevronRight, Smartphone, Zap, ShieldAlert, Loader2, Cpu, Wifi, Fingerprint, ShieldCheck, ChevronLeft } from 'lucide-react';

interface IdentitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: string) => void;
}

const BRAND_ASSETS = {
  PHANTOM: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjU5Nl8xMzg1NzIpIj4KPHJlY3QgeT0iMC4wMDEwMDcwOCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iMTIwMCIgZmlsbD0iI0FCOUZGMiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyMi4yMTggNzY0LjgxNUM0NzUuMTAxIDgzNy4wMTMgMzk2LjE0NyA5MjguMzggMjkxLjA4OSA5MjguMzhDMjQxLjQyNSA5MjguMzggMTkzLjY3MSA5MDcuOTM0IDE5My42NzEgODE5LjEyNEMxOTMuNjcxIDU5Mi45NDQgNTAyLjQ3OSAyNDIuODE0IDc4OS4wMDMgMjQyLjgxNEM5NTIuMDAzIDI0Mi44MTQgMTAxNi45NSAzNTUuOTA0IDEwMTYuOTUgNDg0LjMyN0MxMDE2Ljk1IDY0OS4xNyA5MDkuOTc5IDgzNy42NTIgODAzLjY0NyA4MzcuNjUyQzc2OS45MDEgODM3LjY1MiA3NTMuMzQ2IDgxOS4xMjQgNzUzLjM0NiA3ODkuNzMzQzc1My4zNDYgNzgyLjA2NiA3NTQuNjIgNzczLjc2IDc1Ny4xNjcgNzY0LjgxNUM3MjAuODc0IDgyNi43OTEgNjUwLjgzNSA4ODQuMjk0IDU4NS4yNTMgODg0LjI5NEM1MzcuNDk5IDg4NC4yOTQgNTEzLjMwNCA4NTQuMjY0IDUxMy4zMDQgODEyLjA5NUM1MTMuMzA0IDc5Ni43NjEgNTE2LjQ4NyA3ODAuNzg4IDUyMi4yMTggNzY0LjgxNVpNNzY5LjAzNSA0NzkuODY5Qzc2OS4wMzUgNTE3LjI5MSA3NDYuOTU2IDUzNi4wMDIgNzIyLjI1OCA1MzYuMDAyQzY5Ny4xODUgNTM2LjAwMiA2NzUuNDgxIDUxNy4yOTEgNjc1LjQ4MSA0NzkuODY5QzY3NS40ODEgNDQyLjQ0OCA2OTcuMTg1IDQyMy43MzcgNzIyLjI1OCA0MjMuNzM3Qzc0Ni45NTYgNDIzLjczNyA3NjkuMDM1IDQ0Mi40NDggNzY5LjAzNSA0NzkuODY5Wk05MDkuMzY3IDQ3OS44N0M5MDkuMzY3IDUxNy4yOTEgODg3LjI4OCA1MzYuMDAyIDg2Mi41OSA1MzYuMDAyQzgzNy41MTcgNTM2LjAwMiA4MTUuODEzIDUxNy4yOTEgODE1LjgxMyA0NzkuODdDODE1LjgxMyA0NDIuNDQ4IDgzNy41MTcgNDIzLjczNyA4NjIuNTkgNDIzLjczN0M4ODcuMjg4IDQyMy43MzcgOTA5LjM2NyA0NDIuNDQ4IDkwOS4zNjcgNDc5LjgxWiIgZmlsbD0iI0ZGRkRGOCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzI1OTZfMTM4NTcyIj4KPHJlY3QgeT0iMC4wMDEwMDcwOCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iMTIwMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
  SOLFLARE: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI5MCIgdmlld0JveD0iMCAwIDI5MCAyOTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDZfMjk5KSI+CjxwYXRoIGQ9Ik02My4yOTUxIDFIMjI2LjcwNUMyNjEuMTEgMSAyODkgMjguODkwNSAyODkgNjMuMjk1MVYyMjYuNzA1QzI4OSAyNjEuMTEgMjYxLjExIDI4OSAyMjYuNzA1IDI4OUg2My4yOTUxQzI4Ljg5MDUgMjg5IDEgMjYxLjExIDEgMjI2LjcwNVY2My4yOTUxQzEgMjguODkwNSAyOC44OTA1IDEgNjMuMjk1MSAxWiIgZmlsbD0iI0ZGRUY0NiIgc3Ryb2tlPSIjRUVEQTBGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0MC41NDggMTUzLjIzMUwxNTQuODMyIDEzOS40MzJMMTgxLjQ2MiAxNDguMTQ3QzE5OC44OTMgMTUzLjk1OCAyMDcuNjA5IDE2NC42MSAyMDcuNjA5IDE3OS42MkMyMDcuNjA5IDE5MC45OTkgMjAzLjI1MSAxOTguNTA0IDE5NC41MzYgMjA4LjE4OEwxOTEuODczIDIxMS4wOTNMMTkyLjg0MSAyMDQuMzE0QzE5Ni43MTQgMTc5LjYyIDE4OS40NTIgMTY4Ljk2OCAxNjUuNDg0IDE2MS4yMkwxNDAuNTQ4IDE1My4yMzFaTTEwNC43MTcgNjguNzM5TDE3Ny4zNDcgOTIuOTQ4OEwxNjEuNjEgMTA3Ljk1OUwxMjMuODQzIDk1LjM2OThDMTEwLjc3IDkxLjAxMiAxMDYuNDEyIDgzLjk5MTEgMTA0LjcxNyA2OS4yMjMyVjY4LjczOVpNMTAwLjM1OSAxOTEuNzI1TDExNi44MjIgMTc1Ljk4OEwxNDcuODExIDE4Ni4xNTdDMTY0LjAzMSAxOTEuNDgzIDE2OS41OTkgMTk4LjUwNCAxNjcuOTA1IDIxNi4xNzdMMTAwLjM1OSAxOTEuNzI1Wk03OS41MzkgMTIxLjUxNkM3OS41MzkgMTE2LjkxNyA4MS45NTk5IDExMi41NTkgODYuMDc1NiAxMDguOTI3QzkwLjQzMzQgMTE1LjIyMiA5Ny45Mzg0IDEyMC43OSAxMDkuODAxIDEyNC42NjRMMTM1LjQ2NCAxMzMuMTM3TDEyMS4xOCAxNDYuOTM3TDk2LjAwMTYgMTM4LjcwNUM4NC4zODA5IDEzNC44MzIgNzkuNTM5IDEyOS4wMjEgNzkuNTM5IDEyMS41MTZaTTE1NS41NTggMjQ4LjYxOEMyMDguODE5IDIxMy4yNzIgMjM3LjM4NyAxODkuMzA0IDIzNy4zODcgMTU5Ljc2OEMyMzcuMzg3IDE0MC4xNTggMjI1Ljc2NiAxMjkuMjYzIDIwMC4xMDQgMTIwLjc5TDE4MC43MzYgMTE0LjI1M0wyMzMuNzU2IDYzLjQxMjhMMjIzLjEwMyA1Mi4wMzQyTDIwNy4zNjcgNjUuODMzN0wxMzMuMDQzIDQxLjM4MThDMTEwLjA0MyA0OC44ODY5IDgwLjk5MTYgNzAuOTE3OCA4MC45OTE2IDkyLjk0ODdDODAuOTkxNiA5NS4zNjk3IDgxLjIzMzcgOTcuNzkwNyA4MS45NiAxMDAuNDU0QzYyLjgzNDIgMTExLjM0OCA1NS4wODcxIDEyMS41MTYgNTUuMDg3MSAxMzQuMTA1QzU1LjA4NzEgMTQ1Ljk2OCA2MS4zODE2IDE1Ny44MzEgODEuNDc1OCAxNjQuMzY4TDk3LjQ1NDIgMTY5LjY5NEw0Mi4yNTU5IDIyMi43MTNMNTIuOTA4MiAyMzQuMDkyTDcwLjA5NzIgMjE4LjM1NkwxNTUuNTU4IDI0OC42MThaIiBmaWxsPSIjMDIwNTBBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTQ2XzI5OSI+CjxyZWN0IHdpZHRoPSIyOTAiIGhlaWdodD0iMjkwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
};

const PhantomIcon = () => (
  <img 
    src={BRAND_ASSETS.PHANTOM} 
    className="w-7 h-7" 
    alt="Phantom Logo" 
    style={{ objectFit: 'contain', borderRadius: '22.5%' }}
  />
);

const SolflareIcon = () => (
  <img 
    src={BRAND_ASSETS.SOLFLARE} 
    className="w-7 h-7" 
    alt="Solflare Logo" 
    style={{ objectFit: 'contain' }}
  />
);

export const IdentitySelectionModal: React.FC<IdentitySelectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [view, setView] = useState<'LIST' | 'INFO'>('LIST');
  const [detected, setDetected] = useState<{ phantom: boolean; solflare: boolean }>({
    phantom: false,
    solflare: false
  });
  const [isLinking, setIsLinking] = useState<string | null>(null);
  const [linkingStatus, setLinkingStatus] = useState<string>('NEGOTIATING_ENCRYPTION_KEYS');

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
        setLinkingStatus('AWAITING_IDENTITY_SIGNATURE');
        const message = new TextEncoder().encode(`VIGIL_IDENTITY_SYNC: ${Date.now()}`);
        
        try {
          await provider.signMessage(message, "utf8");
          setLinkingStatus('IDENTITY_VALIDATED_OK');
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
        
        <div className="flex items-center justify-between p-8 border-b border-zinc-900 bg-gradient-to-b from-white/[0.02] to-transparent">
          <button 
            onClick={() => setView(view === 'LIST' ? 'INFO' : 'LIST')}
            className={`transition-colors ${view === 'LIST' ? 'text-blue-500 animate-pulse-subtle' : 'text-zinc-600 hover:text-zinc-300'}`}
          >
            {view === 'LIST' ? <HelpCircle size={18} strokeWidth={1.5} /> : <ChevronLeft size={18} strokeWidth={1.5} />}
          </button>
          <div className="flex flex-col items-center text-center">
             <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">
               {view === 'LIST' ? 'Identity Protocol' : 'VIGIL_KNOWLEDGE_BASE'}
             </span>
             <h3 className="text-sm font-black text-white tracking-[0.2em] uppercase italic leading-none">
               {view === 'LIST' ? 'Identity_Link_Portal' : 'SOVEREIGN_INTEL_ACCESS'}
             </h3>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

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

               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-amber-500">
                        <Zap size={16} />
                     </div>
                     <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">[RETINAL_THRESHOLD]</h4>
                  </div>
                  <div className="pl-11">
                     <p className="text-[11px] font-bold text-white mb-1 uppercase italic tracking-tight">Why establish a link?</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed font-medium uppercase">Establishing the link initializes your BRI (Biological Resilience Index). High-fidelity calibration is the prerequisite for sovereign authority.</p>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-cyan-500">
                        <Cpu size={16} />
                     </div>
                     <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">[NEURAL_PARITY]</h4>
                  </div>
                  <div className="pl-11">
                     <p className="text-[11px] font-bold text-white mb-1 uppercase italic tracking-tight">Technical Alignment</p>
                     <p className="text-[10px] text-zinc-500 leading-relaxed font-medium uppercase">Logical synchronization ensures that the verdict you see in simulation matches the Field Unit's enforcement standard bit-for-bit.</p>
                  </div>
               </div>
            </div>
          ) : (
            <div className="space-y-2 p-2 animate-in fade-in duration-500">
              <button 
                onClick={() => handleConnect('PHANTOM')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-900 hover:border-[#AB9FF2]/40 hover:bg-[#AB9FF2]/5 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center transition-all group-hover:border-[#AB9FF2]/40 shadow-[0_0_15px_rgba(171,159,242,0.1)] group-hover:shadow-[0_0_20px_rgba(171,159,242,0.25)] overflow-hidden">
                     <PhantomIcon />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-zinc-200 tracking-widest uppercase italic group-hover:text-white">Phantom</span>
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

              <button 
                onClick={() => handleConnect('SOLFLARE')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl bg-zinc-950/50 border border-zinc-900 hover:border-[#FFEF46]/40 hover:bg-[#FFEF46]/5 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center transition-all group-hover:border-[#FFEF46]/40 shadow-[0_0_15px_rgba(255,239,70,0.1)] group-hover:shadow-[0_0_20px_rgba(255,239,70,0.25)] overflow-hidden">
                     <SolflareIcon />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-black text-zinc-200 tracking-widest uppercase italic group-hover:text-white">Solflare</span>
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
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest px-3 py-1">Protocol Standard</span>
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-lg">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                 <span className="text-zinc-400 font-mono text-[8px] font-bold">VIG-INT-01-S</span>
              </div>
           </div>
           <p className="text-[7.5px] font-black text-zinc-800 uppercase tracking-[0.25em] text-center italic">
             VIGILANCE IS THE ONLY PERMANENT SHIELD.
           </p>
        </div>
      </div>
    </div>
  );
};
