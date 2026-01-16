import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, ShieldCheck, ChevronRight, Smartphone, Zap, Cpu, Globe, Loader2, Terminal, AlertTriangle, Wifi, RotateCcw, Download, X, Info } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: (wallet: string, isGuest?: boolean) => void;
}

type ModalStep = 'DISCLOSURE' | 'CONNECT';

// Branded Assets - Full Resolution
const BRAND_ASSETS = {
  PHANTOM: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATdSURBVHgB5Zs9b9tGGMefI6UATdxWNhqkUJqUreshGiIFiJd0iDwkU4ZmqIFu1UfoJwj8CfoRmK7x4A6d0iHykC41kKiDOwQGmBg26rhwFdttgVjk5f6kT6EEvdyRlERTP4C2xCPF+/N57uHDe2E0hFX7qErkVRixMieyOHEL+8V3iyaIqIdDQT0cUa8mI77Oyawv12aeDzqP9SsIhPIH4mOVzhBCkOMRrSzXPnrYp7yTNZsXXDqyxV37hs4wQthDk9wf7tdmm13737Nm/2+5dPIErksZANY2Kb90v/aBE9oXcGrZZ1kRKwlEuzekpQ1Z4LKjH7MmFkDTCZm2/O5b+JF9+L34YFOmYUvf1j6s+xYWfx5Q5vGfOMTW7ONKi7xnNBWwJaNFbpWmBq9iMMZu05SAbNHgnAo0JXBGVg5hm1H6OD8T1OrkLTZOScC4EEwp4OKnjIqfGVSYM+jCzHuxEghuHhDtbru0s83pv+PoN4Ct2ofJ3D5NCnOMPv/SIOsrg/Ln9HzsxaZLm3+4vvV1GbuFYc3S9Zz/PyoLJZMuXzWo/rilbW2DxgTc9OYtk27fzccSG/696t2c8A6t08YjeOGaQXfu5YT7mpQkEL14S89JR+rSskJJWLQfReHaFy8x2t9Tc+2RWRhBCS43SrGSUlndbiOxsDVv0M2vxxcPcXPRllWiduIWLXXNsYoFEFuYVfOkRGsGsdiisNlw/Q3tvnTd6Ahwg8okSFr299yh10nMwnHE7v/FfUEAz9XGhttOJweVhVF9PCUiOI5YsL/ndXxHW/z3eHhZmO50tB+xBRevGLHEgl7WOXe6T1WIKrEEozKVxfjJhDVvdoguXmVtoZfFDQ2LRkTG1o1qihkraOE5m4QFIPbOvTw5Wx7l8+S/UITLcJ1eZWFUXyQiC4YbJ+lufgTu0zQGlUma/3ikQiSXVqnAuOkVyHoRSTBcLE2g/aq2YW3BSBuTjpxxeb2n/k6sLThtrgxebg3PsCRagtNoXbgysjFVtASn0bov/lSLzhJlwcUrLJXW3dkemeCxdX8pg2RkZJ146CVMExAq36J0UFIR9Ciky53RRRsFJcHnL1Asmgd6bjfMTWHZqKMPihaO7s6o2K5GYIGYQYFI9n5ERUmJbme3BGLheqrR3dkKxOy+8nr+1vrjk1higVJSHGUMB90wv9WDoZA3B0LA/OB7C7EbTwMx6GPeeNqiTy4F5/z92qOdVzyRUURFwXoXwvHrwrKy7eLxUSrznoEPx242PJFAdFoO52BLGiXBuHB5kZSARWHZcKCCh/z6S8sfhSjMBfsw/In+KmRKSY3/qqDs0rDAwrXBqSWOgbV6CZBtcNJgBoDDFCakNX4PxmO7XyAgztni/mC1ThI/CTArT+tNPtwhDpKcjjAuclBNmlMO40w5mCSckSPiPn9JUwLn/A0edM9pShDejLmWxtQI5uTV/eizah8+oTM21V8XrJFYrn38xWm+x1Yo8wQafcGYRyxM/TNlFKx/kIs+2hm9SW5NLo3JEtCExR7ye1sw1gS45C1lSTS0QFN4ZUvHO9t3tVknT94NcehPdMZBE4UWaOra3xusg8C0+UmvQNOGUV2kVCuIS72Lh/DIPq4wcquYSC4SyoLIVqzgRGbRBGkvxWMMLz+OqFcDOUU/oZJ37XIP40XQwg0AAAAASUVORK5CYII=",
  SOLFLARE: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI5MCIgdmlld0JveD0iMCAwIDI5MCAyOTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDZfMjk5KSI+CjxwYXRoIGQ9Ik02My4yOTUxIDFIMjI2LjcwNUMyNjEuMTEgMSAyODkgMjguODkwNSAyODkgNjMuMjk1MVYyMjYuNzA1QzI4OSAyNjEuMTEgMjYxLjExIDI4OSAyMjYuNzA1IDI4OUg2My4yOTUxQzI4Ljg5MDUgMjg5IDEgMjYxLjExIDEgMjI2LjcwNVY2My4yOTUxQzEgMjguODkwNSAyOC44OTA1IDEgNjMuMjk1MSAxWiIgZmlsbD0iI0ZGRUY0NiIgc3Ryb2tlPSIjRUVEQTBGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0MC41NDggMTUzLjIzMUwxNTQuODMyIDEzOS40MzJMMTgxLjQ2MiAxNDguMTQ3QzE5OC44OTMgMTUzLjk1OCAyMDcuNjA5IDE2NC42MSAyMDcuNjA5IDE3OS42MkMyMDcuNjA5IDE5MC45OTkgMjAzLjI1MSAxOTguNTA0IDE5NC41MzYgMjA4LjE4OEwxOTEuODczIDIxMS4wOTNMMTkyLjg0MSAyMDQuMzE0QzE5Ni43MTQgMTc5LjYyIDE4OS40NTIgMTY4Ljk2OCAxNjUuNDg0IDE2MS4yMkwxNDAuNTQ4IDE1My4yMzFaTTEwNC43MTcgNjguNzM5TDE3Ny4zNDcgOTIuOTQ4OEwxNjEuNjEgMTA3Ljk1OUwxMjMuODQzIDk1LjM2OThDMTEwLjc3IDkxLjAxMiAxMDYuNDEyIDgzLjk5MTEgMTA0LjcxNyA2OS4yMjMyVjY4LjczOVpNMTAwLjM1OSAxOTEuNzI1TDExNi44MjIgMTc1Ljk4OEwxNDcuODExIDE4Ni4xNTdDMTY0LjAzMSAxOTEuNDgzIDE2OS41OTkgMTk4LjUwNCAxNjcuOTA1IDIxNi4xNzdMMTAwLjM1OSAxOTEuNzI1Wk03OS41MzkgMTIxLjUxNkM3OS41MzkgMTE2LjkxNyA4MS45NTk5IDExMi41NTkgODYuMDc1NiAxMDguOTI3QzkwLjQzMzQgMTE1LjIyMiA5Ny45Mzg0IDEyMC43OSAxMDkuODAxIDEyNC42NjRMMTM1LjQ2NCAxMzMuMTM3TDEyMS4xOCAxNDYuOTM3TDk2LjAwMTYgMTM4LjcwNUM4NC4zODA5IDEzNC44MzIgNzkuNTM5IDEyOS4wMjEgNzkuNTM5IDEyMS41MTZaTTE1NS41NTggMjQ4LjYxOEMyMDguODE5IDIxMy4yNzIgMjM3LjM4NyAxODkuMzA0IDIzNy4zODcgMTU5Ljc2OEMyMzcuMzg3IDE0MC4xNTggMjI1Ljc2NiAxMjkuMjYzIDIwMC4xMDQgMTIwLjc5TDE4MC43MzYgMTE0LjI1M0wyMzMuNzU2IDYzLjQxMjhMMjIzLjEwMyA1Mi4wMzQyTDIwNy4zNjcgNjUuODMzN0wxMzMuMDQzIDQxLjM4MThDMTEwLjA0MyA0OC44ODY5IDgwLjk5MTYgNzAuOTE3OCA4MC45OTE2IDkyLjk0ODdDODAuOTkxNiA5NS4zNjk3IDgxLjIzMzcgOTcuNzkwNyA4MS45NiAxMDAuNDU0QzYyLjgzNDIgMTExLjM0OCA1NS4wODcxIDEyMS41MTYgNTUuMDg3MSAxMzQuMTA1QzU1LjA4NzEgMTQ1Ljk2OCA2MS4zODE2IDE1Ny44MzEgODEuNDc1OCAxNjQuMzY4TDk3LjQ1NDIgMTY5LjY5NEw0Mi4yNTU5IDIyMi43MTNMNTIuOTA4MiAyMzQuMDkyTDcwLjA5NzIgMjE4LjM1NkwxNTUuNTU4IDI0OC42MThaIiBmaWxsPSIjMDIwNTBBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTQ2XzI5OSI+CjxyZWN0IHdpZHRoPSIyOTAiIGhlaWdodD0iMjkwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
};

const PhantomIcon = ({ size = 32 }: { size?: number }) => (
  <img src={BRAND_ASSETS.PHANTOM} style={{ width: size, height: size, objectFit: 'contain' }} alt="Phantom" />
);

const SolflareIcon = ({ size = 32 }: { size?: number }) => (
  <img src={BRAND_ASSETS.SOLFLARE} style={{ width: size, height: size, objectFit: 'contain' }} alt="Solflare" />
);

// Shatter Effect Component for High-Fidelity Transition
const ShatterShard: React.FC<{ index: number; isShattering: boolean }> = ({ index, isShattering }) => {
  const paths = [
    "polygon(0% 0%, 30% 0%, 15% 40%)", "polygon(30% 0%, 60% 0%, 45% 40%)", "polygon(60% 0%, 100% 0%, 80% 40%)",
    "polygon(0% 0%, 15% 40%, 0% 50%)", "polygon(100% 0%, 100% 50%, 80% 40%)", "polygon(0% 50%, 15% 40%, 40% 60%, 0% 100%)",
    "polygon(100% 50%, 80% 40%, 60% 60%, 100% 100%)", "polygon(15% 40%, 45% 40%, 40% 60%)", "polygon(45% 40%, 80% 40%, 60% 60%)",
    "polygon(40% 60%, 60% 60%, 50% 100%)", "polygon(0% 100%, 50% 100%, 40% 60%)", "polygon(50% 100%, 100% 100%, 60% 60%)"
  ];
  return (
    <div 
      className={`absolute inset-0 bg-blue-500/20 border border-blue-400/40 backdrop-blur-md pointer-events-none transition-all duration-[800ms] ease-out ${isShattering ? `shard-anim-${index % 12}` : 'opacity-0'}`}
      style={{ clipPath: paths[index % paths.length], transformStyle: 'preserve-3d', zIndex: 100 + index }}
    />
  );
};

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('DISCLOSURE');
  const [isConnecting, setIsConnecting] = useState(false);
  const [handshakeLog, setHandshakeLog] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isShattering, setIsShattering] = useState(false);
  
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
      const timer = setInterval(checkProviders, 1000);
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
        window.open(type === 'PHANTOM' ? 'https://phantom.app/' : 'https://solflare.com/', '_blank');
        setIsConnecting(false);
        return;
      }

      setHandshakeLog(`CONNECTING_TO_${type}...`);
      const resp = await provider.connect();
      
      let walletAddr = resp?.publicKey?.toString() || provider.publicKey?.toString();
      if (!walletAddr || walletAddr === 'true') throw new Error("ADDRESS_EXTRACTION_FAILURE");

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
      if (err.message === "EXTENSION_NOT_FOUND") msg = `RELIANCE_FAILURE: ${type} NOT INSTALLED`;
      else if (err.message === "ADDRESS_EXTRACTION_FAILURE") msg = "ERROR: FAILED TO PARSE CRYPTOGRAPHIC ADDRESS";
      else if (err.message === "SIGNATURE_REJECTED") msg = "ERROR: IDENTITY SIGNATURE REFUSED";
      setError(msg);
      setIsConnecting(false);
    }
  };

  const noExtensions = !detected.phantom && !detected.solflare;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 sm:p-4 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-red-600/10 blur-[60px] sm:blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-600/5 blur-[60px] sm:blur-[120px] pointer-events-none rounded-full" />

      {/* Main Container - Controlled Height */}
      <div className="w-full max-w-5xl max-h-[92dvh] bg-[#050505] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col">
        
        {/* Animated HUD Elements */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse z-50" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)]" />

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          <div className="p-6 sm:p-12 md:p-16 lg:p-20 flex-1 flex flex-col items-center justify-center min-h-fit">
            
            {isConnecting ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-20 space-y-12 animate-in zoom-in duration-300">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 animate-spin" />
                  </div>
                  <div className="absolute inset-0 border-2 border-blue-500/10 rounded-full animate-ping" />
                </div>
                <div className="text-center space-y-4">
                  <div className="text-xs sm:text-[14px] font-black text-blue-500 uppercase tracking-[0.4em] sm:tracking-[0.5em] animate-pulse">{handshakeLog}</div>
                  <p className="text-[8px] sm:text-[9px] font-mono text-zinc-600 uppercase tracking-widest italic">Est. Latency: 22ms // Protocol Sync Active</p>
                </div>
              </div>
            ) : step === 'DISCLOSURE' ? (
              <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-4 w-full">
                <div className="space-y-6 sm:space-y-10 w-full">
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 h-16 bg-red-600/10 border border-red-500/30 rounded-2xl flex items-center justify-center shadow-2xl">
                      <ShieldAlert className="text-red-500 w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-black text-red-500 uppercase tracking-[0.4em] sm:tracking-[0.6em]">System_Disclosure_v1.0</span>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-4">
                    <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">NO TOKEN <br/> EXISTS.</h2>
                    <div className="h-1 w-20 sm:w-24 bg-red-600 rounded-full mx-auto" />
                  </div>

                  <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
                    <p className="text-zinc-400 text-sm sm:text-lg md:text-2xl font-medium leading-relaxed italic">
                      "VIGIL is a structural security standard. We do not have a token, a pre-sale, or an airdrop."
                    </p>
                    <div className="p-4 sm:p-6 bg-red-600/5 border border-red-500/20 rounded-2xl">
                      <p className="text-[8px] sm:text-[10px] md:text-[11px] font-black text-red-400 uppercase tracking-widest leading-relaxed">
                         ANY CLAIM TO THE CONTRARY IS A POISON EVENT. BY PROCEEDING, YOU ACKNOWLEDGE THE OPERATIONAL TERMS.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full max-w-3xl">
                   <div className="p-4 sm:p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl text-left space-y-3 relative group hover:border-zinc-700 transition-all">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Lock size={14} />
                        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">Non-Custodial Sandbox</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] sm:text-xs italic font-medium leading-relaxed">VIGIL operates locally. Private keys are never requested, stored, or transmitted. Execution authority remains with the user.</p>
                   </div>
                   <div className="p-4 sm:p-8 bg-zinc-900/30 border border-zinc-800 rounded-2xl md:rounded-3xl text-left space-y-3 relative group hover:border-zinc-700 transition-all">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-widest">Retinal Standards</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] sm:text-xs italic font-medium leading-relaxed">Identifying intent mismatches inside the browser DOM at Layer 0.5. Validation occurs before the first signature.</p>
                   </div>
                </div>

                <button 
                  onClick={() => setStep('CONNECT')} 
                  className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-7 bg-white text-black text-[12px] sm:text-[13px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 sm:gap-6 group"
                >
                   ACKNOWLEDGE & PROCEED 
                   <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-16 animate-in fade-in slide-in-from-right-4 w-full">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col items-center gap-2 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-xl">
                      <Smartphone className="text-blue-500 w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[9px] sm:text-[11px] font-black text-blue-500 uppercase tracking-[0.6em]">Identity_Protocol_Handshake</span>
                  </div>
                  <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">ESTABLISH <br/> IDENTITY.</h2>
                  
                  {noExtensions && !isConnecting && (
                    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-red-950/20 border border-red-900/40 rounded-3xl flex items-center gap-4 sm:gap-6 text-left">
                      <AlertTriangle className="text-red-500 shrink-0" size={24} />
                      <div className="space-y-1">
                        <div className="text-[9px] sm:text-[11px] font-black text-red-500 uppercase tracking-widest leading-none">NO_EXTENSIONS_DETECTED</div>
                        <p className="text-[8px] sm:text-[10px] text-zinc-500 font-bold leading-tight uppercase italic">Install Phantom or Solflare to establish a secure cryptographic link.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
                  {[
                    { id: 'PHANTOM', label: 'Phantom', icon: <PhantomIcon size={32} />, detected: detected.phantom, color: 'hover:border-[#AB9FF2]/40', theme: '#AB9FF2', installUrl: 'https://phantom.app/' },
                    { id: 'SOLFLARE', label: 'Solflare', icon: <SolflareIcon size={32} />, detected: detected.solflare, color: 'hover:border-[#FFEF46]/40', theme: '#FFEF46', installUrl: 'https://solflare.com/' },
                    { id: 'SIMULATED', label: 'Virtual Node', icon: <Cpu className="text-emerald-500" size={32} />, detected: true, color: 'hover:border-emerald-500/40', theme: '#10b981' },
                    { id: 'GUEST', label: 'Visitor', icon: <Globe className="text-zinc-500" size={32} />, detected: true, color: 'hover:border-zinc-500/40', theme: '#71717a' }
                  ].map((w) => (
                    <button 
                      key={w.id}
                      onClick={() => w.detected ? connectWallet(w.id as any) : window.open(w.installUrl, '_blank')}
                      disabled={isConnecting}
                      className={`group flex flex-col items-center justify-center p-5 sm:p-10 md:p-12 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2.5rem] sm:rounded-[3.5rem] transition-all active:scale-[0.98] space-y-4 sm:space-y-8 relative overflow-hidden ${w.color} hover:bg-[#0d0d0d] disabled:opacity-50`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow),transparent_70%)] opacity-0 group-hover:opacity-10 transition-opacity" style={{ '--glow': w.theme } as any} />
                      {!w.detected && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-20">
                          <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-[7px] font-black text-white flex items-center gap-1 shadow-2xl">
                             <Download size={8} /> INSTALL
                          </div>
                        </div>
                      )}
                      <div className="w-14 h-14 sm:w-24 sm:h-24 bg-zinc-950 border border-zinc-900 rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 group-hover:border-white/10 transition-all shadow-inner overflow-hidden relative z-10">
                        {w.icon}
                      </div>
                      <div className="text-center space-y-1 relative z-10">
                        <span className="text-[12px] sm:text-base font-black text-white tracking-widest uppercase italic block">{w.label}</span>
                        {w.detected ? (
                          <div className="flex items-center justify-center gap-1.5 text-emerald-500">
                             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest">READY</span>
                          </div>
                        ) : (
                          <span className="text-[7px] sm:text-[8px] font-black text-zinc-700 uppercase tracking-widest">INSTALL_RELIANCE</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="p-4 sm:p-6 bg-red-600/10 border border-red-500/30 rounded-3xl flex items-center justify-center gap-4 animate-in slide-in-from-top-4">
                     <AlertTriangle className="text-red-500 w-5 h-5" />
                     <span className="text-red-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] leading-tight">{error}</span>
                  </div>
                )}
                
                <button 
                   onClick={() => setStep('DISCLOSURE')} 
                   disabled={isConnecting}
                   className="text-zinc-700 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] hover:text-white flex items-center gap-2 sm:gap-3 transition-colors active:scale-95 disabled:opacity-30"
                 >
                   <RotateCcw size={14} /> Back to System Disclosure
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Static Footer Bar - Compact */}
        <div className="p-5 sm:p-8 border-t border-zinc-900 flex flex-col items-center gap-2 sm:gap-3 shrink-0 bg-[#050505] z-30">
           <div className="flex items-center gap-3 opacity-20 hover:opacity-50 transition-opacity cursor-help">
              <Info size={12} className="text-zinc-500" />
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Protocol Standard: VIG-DIS-01-S</span>
           </div>
           <div className="flex items-center gap-3 opacity-10">
              <div className="h-[1px] w-8 sm:w-12 bg-white" />
              <span className="text-[7px] font-black uppercase tracking-[0.8em] sm:tracking-[1em]">Restricted Access Area</span>
              <div className="h-[1px] w-8 sm:w-12 bg-white" />
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan-down { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes shard-0 { 100% { transform: translate3d(-350%, -450%, 1500px) rotateX(720deg) rotateY(180deg) rotateZ(360deg); opacity: 0; } }
        .shard-anim-0 { animation: shard-0 0.8s forwards; }
      `}</style>
    </div>
  );
};
