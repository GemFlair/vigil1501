import React, { useState, useEffect } from 'react';
import { ShieldAlert, Lock, ShieldCheck, ChevronRight, Smartphone, Zap, Cpu, Globe, Loader2, Terminal, AlertTriangle, Wifi, RotateCcw, Download, X, Info } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: (wallet: string, isGuest?: boolean) => void;
}

type ModalStep = 'DISCLOSURE' | 'CONNECT';

const BRAND_ASSETS = {
  PHANTOM: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjU5Nl8xMzg1NzIpIj4KPHJlY3QgeT0iMC4wMDEwMDcwOCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iMTIwMCIgZmlsbD0iI0FCOUZGMiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUyMi4yMTggNzY0LjgxNUM0NzUuMTAxIDgzNy4wMTMgMzk2LjE0NyA5MjguMzggMjkxLjA4OSA5MjguMzhDMjQxLjQyNSA5MjguMzggMTkzLjY3MSA5MDcuOTM0IDE5My42NzEgODE5LjEyNEMxOTMuNjcxIDU5Mi45NDQgNTAyLjQ3OSAyNDIuODE0IDc4OS4wMDMgMjQyLjgxNEM5NTIuMDAzIDI0Mi44MTQgMTAxNi45NSAzNTUuOTA0IDEwMTYuOTUgNDg0LjMyN0MxMDE2Ljk1IDY0OS4xNyA5MDkuOTc5IDgzNy42NTIgODAzLjY0NyA4MzcuNjUyQzc2OS45MDEgODM3LjY1MiA3NTMuMzQ2IDgxOS4xMjQgNzUzLjM0NiA3ODkuNzMzQzc1My4zNDYgNzgyLjA2NiA3NTQuNjIgNzczLjc2IDc1Ny4xNjcgNzY0LjgxNUM3MjAuODc0IDgyNi43OTEgNjUwLjgzNSA4ODQuMjk0IDU4NS4yNTMgODg0LjI5NEM1MzcuNDk5IDg4NC4yOTQgNTEzLjMwNCA4NTQuMjY0IDUxMy4zMDQgODEyLjA5NUM1MTMuMzA0IDc5Ni43NjEgNTE2LjQ4NyA3ODAuNzg4IDUyMi4yMTggNzY0LjgxNVpNNzY5LjAzNSA0NzkuODY5Qzc2OS4wMzUgNTE3LjI5MSA3NDYuOTU2IDUzNi4wMDIgNzIyLjI1OCA1MzYuMDAyQzY5Ny4xODUgNTM2LjAwMiA2NzUuNDgxIDUxNy4yOTEgNjc1LjQ4MSA0NzkuODY5QzY3NS40ODEgNDQyLjQ0OCA2OTcuMTg1IDQyMy43MzcgNzIyLjI1OCA0MjMuNzM3Qzc0Ni45NTYgNDIzLjczNyA3NjkuMDM1IDQ0Mi40NDggNzY5LjAzNSA0NzkuODY5Wk05MDkuMzY3IDQ3OS44N0M5MDkuMzY3IDUxNy4yOTEgODg3LjI4OCA1MzYuMDAyIDg2Mi41OSA1MzYuMDAyQzgzNy41MTcgNTM2LjAwMiA4MTUuODEzIDUxNy4yOTEgODE1LjgxMyA0NzkuODdDODE1LjgxMyA0NDIuNDQ4IDgzNy41MTcgNDIzLjczNyA4NjIuNTkgNDIzLjczN0M4ODcuMjg4IDQyMy43MzcgOTA5LjM2NyA0NDIuNDQ4IDkwOS4zNjcgNDc5LjgxWiIgZmlsbD0iI0ZGRkRGOCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzI1OTZfMTM4NTcyIj4KPHJlY3QgeT0iMC4wMDEwMDcwOCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iMTIwMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
  SOLFLARE: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI5MCIgdmlld0JveD0iMCAwIDI5MCAyOTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDZfMjk5KSI+CjxwYXRoIGQ9Ik02My4yOTUxIDFIMjI2LjcwNUMyNjEuMTEgMSAyODkgMjguODkwNSAyODkgNjMuMjk1MVYyMjYuNzA1QzI4OSAyNjEuMTEgMjYxLjExIDI4OSAyMjYuNzA1IDI4OUg2My4yOTUxQzI4Ljg5MDUgMjg5IDEgMjYxLjExIDEgMjI2LjcwNVY2My4yOTUxQzEgMjguODkwNSAyOC44OTA1IDEgNjMuMjk1MSAxWiIgZmlsbD0iI0ZGRUY0NiIgc3Ryb2tlPSIjRUVEQTBGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0MC41NDggMTUzLjIzMUwxNTQuODMyIDEzOS40MzJMMTgxLjQ2MiAxNDguMTQ3QzE5OC44OTMgMTUzLjk1OCAyMDcuNjA5IDE2NC42MSAyMDcuNjA5IDE3OS42MkMyMDcuNjA5IDE5MC45OTkgMjAzLjI1MSAxOTguNTA0IDE5NC41MzYgMjA4LjE4OEwxOTEuODczIDIxMS4wOTNMMTkyLjg0MSAyMDQuMzE0QzE5Ni43MTQgMTc5LjYyIDE4OS40NTIgMTY4Ljk2OCAxNjUuNDg0IDE2MS4yMkwxNDAuNTQ4IDE1My4yMzFaTTEwNC43MTcgNjguNzM5TDE3Ny4zNDcgOTIuOTQ4OEwxNjEuNjEgMTA3Ljk1OUwxMjMuODQzIDk1LjM2OThDMTEwLjc3IDkxLjAxMiAxMDYuNDEyIDgzLjk5MTEgMTA0LjcxNyA2OS4yMjMyVjY4LjczOVpNMTAwLjM1OSAxOTEuNzI1TDExNi44MjIgMTc1Ljk4OEwxNDcuODExIDE4Ni4xNTdDMTY0LjAzMSAxOTEuNDgzIDE2OS41OTkgMTk4LjUwNCAxNjcuOTA1IDIxNi4xNzdMMTAwLjM1OSAxOTEuNzI1Wk03OS41MzkgMTIxLjUxNkM3OS41MzkgMTE2LjkxNyA4MS45NTk5IDExMi41NTkgODYuMDc1NiAxMDguOTI3QzkwLjQzMzQgMTE1LjIyMiA5Ny45Mzg0IDEyMC43OSAxMDkuODAxIDEyNC42NjRMMTM1LjQ2NCAxMzMuMTM3TDEyMS4xOCAxNDYuOTM3TDk2LjAwMTYgMTM4LjcwNUM4NC4zODA5IDEzNC44MzIgNzkuNTM5IDEyOS4wMjEgNzkuNTM5IDEyMS41MTZaTTE1NS41NTggMjQ4LjYxOEMyMDguODE5IDIxMy4yNzIgMjM3LjM4NyAxODkuMzA0IDIzNy4zODcgMTU5Ljc2OEMyMzcuMzg3IDE0MC4xNTggMjI1Ljc2NiAxMjkuMjYzIDIwMC4xMDQgMTIwLjc5TDE4MC43MzYgMTE0LjI1M0wyMzMuNzU2IDYzLjQxMjhMMjIzLjEwMyA1Mi4wMzQyTDIwNy4zNjcgNjUuODMzN0wxMzMuMDQzIDQxLjM4MThDMTEwLjA0MyA0OC44ODY5IDgwLjk5MTYgNzAuOTE3OCA4MC45OTE2IDkyLjk0ODdDODAuOTkxNiA5NS4zNjk3IDgxLjIzMzcgOTcuNzkwNyA4MS45NiAxMDAuNDU0QzYyLjgzNDIgMTExLjM0OCA1NS4wODcxIDEyMS41MTYgNTUuMDg3MSAxMzQuMTA1QzU1LjA4NzEgMTQ1Ljk2OCA2MS4zODE2IDE1Ny44MzEgODEuNDc1OCAxNjQuMzY4TDk3LjQ1NDIgMTY5LjY5NEw0Mi4yNTU5IDIyMi43MTNMNTIuOTA4MiAyMzQuMDkyTDcwLjA5NzIgMjE4LjM1NkwxNTUuNTU4IDI0OC42MThaIiBmaWxsPSIjMDIwNTBBIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTQ2XzI5OSI+CjxyZWN0IHdpZHRoPSIyOTAiIGhlaWdodD0iMjkwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
};

const PhantomIcon = ({ size = 32 }: { size?: number }) => (
  <img 
    src={BRAND_ASSETS.PHANTOM} 
    style={{ width: size, height: size, objectFit: 'contain', borderRadius: '22.5%' }} 
    alt="Phantom" 
  />
);

const SolflareIcon = ({ size = 32 }: { size?: number }) => (
  <img 
    src={BRAND_ASSETS.SOLFLARE} 
    style={{ width: size, height: size, objectFit: 'contain' }} 
    alt="Solflare" 
  />
);

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
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/98 backdrop-blur-3xl animate-in fade-in duration-700">
      {/* Dual Vector Atmospheric Lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Terminal Frame - Adjusted for height fit */}
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col">
        {/* Animated Scan Line Overlay */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse" />
        
        {/* Holographic Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)]" />

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 relative">
          {isConnecting ? (
            <div className="h-full min-h-[350px] flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-300">
              <div className="relative">
                 <div className="w-20 h-20 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                 </div>
                 <div className="absolute inset-0 border-2 border-blue-500/10 rounded-full animate-ping" />
              </div>
              <div className="text-center space-y-2">
                 <div className="text-[12px] font-black text-blue-500 uppercase tracking-[0.4em] animate-pulse">{handshakeLog}</div>
                 <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest italic">Est. Latency: 22ms // Protocol Sync Active</p>
              </div>
            </div>
          ) : step === 'DISCLOSURE' ? (
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 bg-red-600/10 border border-red-500/30 rounded-xl flex items-center justify-center shadow-2xl">
                    <ShieldAlert className="text-red-500 w-5 h-5" />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-black text-red-500 uppercase tracking-[0.5em]">System_Disclosure_v1.0</span>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.85] drop-shadow-2xl">NO TOKEN <br/> EXISTS.</h2>
                  <div className="h-1 w-16 bg-red-600 rounded-full mx-auto" />
                </div>

                <div className="max-w-xl mx-auto space-y-4">
                   <p className="text-zinc-400 text-sm md:text-xl font-medium leading-relaxed italic">
                      "VIGIL is a structural security standard. We do not have a token, a pre-sale, or an airdrop."
                   </p>
                   <div className="p-3 md:p-4 bg-red-600/5 border border-red-500/20 rounded-xl">
                      <p className="text-[8px] md:text-[10px] font-black text-red-400 uppercase tracking-widest leading-relaxed">
                         ANY CLAIM TO THE CONTRARY IS A POISON EVENT. BY PROCEEDING, YOU ACKNOWLEDGE THE FACILITY'S OPERATIONAL TERMS.
                      </p>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
                 <div className="p-4 md:p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl text-left space-y-2 relative group hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Lock size={14} />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Non-Custodial Sandbox</span>
                    </div>
                    <p className="text-zinc-500 text-[10px] md:text-xs italic font-medium leading-relaxed">
                      VIGIL operates locally. Private keys are never requested, stored, or transmitted. Verification occurs at Layer 0.5.
                    </p>
                 </div>
                 <div className="p-4 md:p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl text-left space-y-2 relative group hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <ShieldCheck size={14} />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Retinal Standards</span>
                    </div>
                    <p className="text-zinc-500 text-[10px] md:text-xs italic font-medium leading-relaxed">
                      The system identifies intent mismatches inside the browser DOM. Final execution authority remains with the user.
                    </p>
                 </div>
              </div>

              <button 
                onClick={() => setStep('CONNECT')} 
                className="px-10 py-4 md:px-14 md:py-5 bg-white text-black text-[11px] md:text-[12px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 flex items-center gap-4 group"
              >
                 ACKNOWLEDGE & PROCEED 
                 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-xl">
                    <Smartphone className="text-blue-500 w-5 h-5" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.6em]">Identity_Protocol_Handshake</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">ESTABLISH <br/> IDENTITY.</h2>
                <p className="text-zinc-500 text-xs md:text-sm font-medium italic max-w-md mx-auto">
                   "Neural synchronization requires a cryptographic anchor. Select your identity vector to initialize the facility."
                </p>

                {noExtensions && !isConnecting && (
                  <div className="max-w-md mx-auto p-3 md:p-4 bg-red-950/20 border border-red-900/40 rounded-2xl flex items-center gap-4 text-left animate-in slide-in-from-top-4">
                    <AlertTriangle className="text-red-500 shrink-0" size={16} />
                    <div className="space-y-1">
                      <div className="text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-widest">NO_EXTENSIONS_DETECTED</div>
                      <p className="text-[8px] md:text-[9px] text-zinc-500 font-bold leading-relaxed uppercase italic">Install Phantom or Solflare to establish a secure cryptographic link.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl px-2 md:px-0">
                {[
                  { 
                    id: 'PHANTOM', 
                    label: 'Phantom', 
                    icon: <PhantomIcon size={24} />, 
                    detected: detected.phantom, 
                    color: 'hover:border-[#AB9FF2]/40', 
                    theme: '#AB9FF2',
                    installUrl: 'https://phantom.app/'
                  },
                  { 
                    id: 'SOLFLARE', 
                    label: 'Solflare', 
                    icon: <SolflareIcon size={24} />, 
                    detected: detected.solflare, 
                    color: 'hover:border-[#FFEF46]/40', 
                    theme: '#FFEF46',
                    installUrl: 'https://solflare.com/'
                  },
                  { id: 'SIMULATED', label: 'Virtual Node', icon: <Cpu className="text-emerald-500" size={24} />, detected: true, color: 'hover:border-emerald-500/40', theme: '#10b981' },
                  { id: 'GUEST', label: 'Visitor', icon: <Globe className="text-zinc-500" size={24} />, detected: true, color: 'hover:border-zinc-500/40', theme: '#71717a' }
                ].map((w) => (
                  <button 
                    key={w.id}
                    onClick={() => w.detected ? connectWallet(w.id as any) : window.open(w.installUrl, '_blank')}
                    disabled={isConnecting}
                    className={`group flex flex-col items-center justify-center p-4 md:p-6 bg-[#0a0a0a] border-2 border-zinc-900 rounded-[2rem] transition-all active:scale-[0.98] space-y-2 md:space-y-4 relative overflow-hidden ${w.color} hover:bg-[#0d0d0d] disabled:opacity-50`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--glow),transparent_70%)] opacity-0 group-hover:opacity-10 transition-opacity" style={{ '--glow': w.theme } as any} />
                    
                    {!w.detected && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <div className="bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-lg text-[6px] font-black text-white flex items-center gap-1.5 shadow-2xl">
                           <Download size={6} /> INSTALL
                        </div>
                      </div>
                    )}

                    <div className="w-10 h-10 md:w-14 md:h-14 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:border-white/10 transition-all shadow-inner overflow-hidden relative z-10">
                      {w.icon}
                    </div>
                    
                    <div className="text-center space-y-0.5 relative z-10">
                      <span className="text-[10px] md:text-[12px] font-black text-white tracking-widest uppercase italic block">{w.label}</span>
                      {w.detected ? (
                        <div className="flex items-center justify-center gap-1 text-emerald-500">
                           <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                           <span className="text-[6px] font-black uppercase tracking-widest">READY</span>
                        </div>
                      ) : (
                        <span className="text-[6px] font-black text-zinc-700 uppercase tracking-widest">RELIANCE</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="p-3 md:p-4 bg-red-600/10 border border-red-500/30 rounded-xl flex items-center justify-center gap-3 animate-in slide-in-from-top-4">
                   <AlertTriangle className="text-red-500 w-4 h-4" />
                   <span className="text-red-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">{error}</span>
                </div>
              )}
              
              <div className="flex flex-col items-center gap-4">
                 <button 
                   onClick={() => setStep('DISCLOSURE')} 
                   disabled={isConnecting}
                   className="text-zinc-700 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] hover:text-white flex items-center gap-2 transition-colors active:scale-95 disabled:opacity-30"
                 >
                   <RotateCcw size={12} /> Back to System Disclosure
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Static Bottom Bar */}
        <div className="p-4 md:p-6 border-t border-zinc-900 flex flex-col items-center gap-2 shrink-0 bg-[#050505] z-30">
           <div className="flex items-center gap-2 opacity-20 hover:opacity-50 transition-opacity cursor-help">
              <Info size={10} className="text-zinc-500" />
              <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Protocol Standard: VIG-DIS-01-S</span>
           </div>
           <div className="flex items-center gap-3 opacity-10">
              <div className="h-[1px] w-8 bg-white" />
              <span className="text-[7px] font-black uppercase tracking-[0.5em]">Restricted Area</span>
              <div className="h-[1px] w-8 bg-white" />
           </div>
        </div>
      </div>
    </div>
  );
};
