
import { Terminal, Zap, ChevronRight, CheckCircle2, AlertTriangle, Info, Radar, Target, Activity, Skull, ShieldX, Scan, RefreshCcw, Lock, Unlock, Database, Cpu, Fingerprint, Radio, Crosshair, ShieldCheck } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { TechLabel } from './docs/DocHelpers';
import { playSuccessChime, playDeniedSound } from '../utils/audio';

type GameMode = 'RETINAL_DIFF' | 'SIGNAL_ROUTING' | 'THREAT_NEUTRAL' | 'PURITY_SCRUB' | 'ENTROPY_SCAN' | 'SYNC_SEQUENCE' | 'CORE_RESONANCE';
type GamePhase = 'READY' | 'PLAYING' | 'SUCCESS' | 'FAIL';

const NEXT_SILO_INTEL: Record<number, { label: string; details: string }> = {
  3: { label: "[LOGIC]", details: "Decryption of Layer 0.5 primitives, architectural flow, and core security logic." },
  4: { label: "[EXECUTION]", details: "Access to the Sandbox with 3 distinct interception demos to test your real-time BRI." },
  5: { label: "[PURITY]", details: "The definitive list of system strategic refusals and operational non-goals." },
  6: { label: "[EVOLUTION]", details: "Access to the multi-year scalability roadmap and ecosystem expansion strategy." },
  7: { label: "[LOG]", details: "Decryption of the technical knowledge base and Master Registry FAQ." },
  8: { label: "[AUDIT]", details: "Initialization of the Final Proficiency Certification and Neural Audit." },
  10: { label: "[VOID]", details: "Final notice protocols and secure system disengagement sequence." }
};

interface SiloGateProps {
  currentLevel: number;
  gateLevel: number;
  onUnlock: () => void;
  onFail: () => void;
}

// Added React.FC type for ShatterShard to handle key prop correctly in map
const ShatterShard: React.FC<{ index: number; isShattering: boolean }> = ({ index, isShattering }) => {
  const paths = [
    "polygon(0% 0%, 30% 0%, 15% 40%)", "polygon(30% 0%, 60% 0%, 45% 40%)", "polygon(60% 0%, 100% 0%, 80% 40%)",
    "polygon(0% 0%, 15% 40%, 0% 50%)", "polygon(100% 0%, 100% 50%, 80% 40%)", "polygon(0% 50%, 15% 40%, 40% 60%, 0% 100%)",
    "polygon(100% 50%, 80% 40%, 60% 60%, 100% 100%)", "polygon(15% 40%, 45% 40%, 40% 60%)", "polygon(45% 40%, 80% 40%, 60% 60%)",
    "polygon(40% 60%, 60% 60%, 50% 100%)", "polygon(0% 100%, 50% 100%, 40% 60%)", "polygon(50% 100%, 100% 100%, 60% 60%)"
  ];
  return (
    <div 
      className={`absolute inset-0 bg-emerald-500/30 border border-emerald-400/50 backdrop-blur-md pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
        isShattering ? `shard-chaos-anim-${index % 12}` : 'opacity-0'
      }`}
      style={{ clipPath: paths[index % paths.length], transformStyle: 'preserve-3d', zIndex: 60 + index }}
    />
  );
};

export const SiloGate: React.FC<SiloGateProps> = ({ currentLevel, gateLevel, onUnlock, onFail }) => {
  const [phase, setPhase] = useState<GamePhase>('READY');
  const [gameState, setGameState] = useState<any>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isIntegrated, setIsIntegrated] = useState(false);
  // Added explicit boolean type to useState to avoid 'any' inference issues
  const [isShattering, setIsShattering] = useState<boolean>(false);
  
  const isUnlocked = currentLevel >= gateLevel;
  const isAvailable = currentLevel === gateLevel - 1;
  const nextIntel = NEXT_SILO_INTEL[gateLevel];
  
  const gameMode: GameMode = gateLevel === 3 ? 'RETINAL_DIFF' : gateLevel === 4 ? 'SIGNAL_ROUTING' : gateLevel === 5 ? 'THREAT_NEUTRAL' : gateLevel === 6 ? 'PURITY_SCRUB' : gateLevel === 7 ? 'ENTROPY_SCAN' : gateLevel === 8 ? 'SYNC_SEQUENCE' : 'CORE_RESONANCE';

  useEffect(() => {
    if (isUnlocked) {
      // REDUCED DELAY: verified screen holds for 200ms then shatters
      const shatterTimer = setTimeout(() => {
        setIsShattering(true);
        setTimeout(() => { setIsIntegrated(true); }, 800);
      }, 200); 
      return () => clearTimeout(shatterTimer);
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (phase === 'PLAYING' && gameMode === 'THREAT_NEUTRAL') {
      const interval = setInterval(() => {
        setGameState((prev: any) => {
          if (!prev) return prev;
          const newPackets = prev.packets.map((p: any) => ({ ...p, y: p.y + p.speed })).filter((p: any) => p.y < 300);
          if (newPackets.length < 4 && Math.random() > 0.8) {
            const isPoison = Math.random() > 0.5;
            newPackets.push({ id: Math.random(), x: Math.random() * 80 + 10, y: -20, speed: 1.5 + Math.random() * 2, type: isPoison ? 'POISON' : 'VERIFIED', label: isPoison ? 'MIMIC_FRAGMENT' : 'VERIFIED_NODE' });
          }
          return { ...prev, packets: newPackets };
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase, gameMode]);

  useEffect(() => {
    if (phase === 'PLAYING' && gameMode === 'CORE_RESONANCE') {
      const interval = setInterval(() => { setGameState((prev: any) => ({ ...prev, pulse: (prev.pulse + 2) % 100 })); }, 20);
      return () => clearInterval(interval);
    }
  }, [phase, gameMode]);

  useEffect(() => {
    if (phase === 'PLAYING' && gameMode === 'ENTROPY_SCAN') {
      let frameId: number;
      const animate = () => {
        setGameState((prev: any) => {
          if (!prev) return prev;
          let nextPos = prev.barPos + (prev.direction * prev.speed);
          let nextDir = prev.direction;
          if (nextPos >= 99) { nextPos = 99; nextDir = -1; }
          if (nextPos <= 0) { nextPos = 0; nextDir = 1; }
          return { ...prev, barPos: nextPos, direction: nextDir };
        });
        frameId = requestAnimationFrame(animate);
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }
  }, [phase, gameMode]);

  const startChallenge = () => {
    setPhase('PLAYING'); setFeedback(null);
    if (gameMode === 'RETINAL_DIFF') {
      const target = "Ab1C" + Math.random().toString(16).slice(2, 10).toUpperCase() + "Zz90";
      const mimic = (t: string) => t.slice(0, 4) + Math.random().toString(16).slice(2, 10).toUpperCase() + t.slice(-4);
      setGameState({ target, options: [target, mimic(target), mimic(target), mimic(target)].sort(() => Math.random() - 0.5) });
    }
    if (gameMode === 'SIGNAL_ROUTING') { setGameState({ sequence: [], target: ['L0', 'L0.5', 'L1'] }); }
    if (gameMode === 'THREAT_NEUTRAL') { setGameState({ score: 0, targetScore: 3, packets: [{ id: 1, x: 20, y: 0, speed: 2, type: 'POISON', label: 'MIMIC_FRAGMENT' }, { id: 2, x: 70, y: -50, speed: 1.5, type: 'VERIFIED', label: 'VERIFIED_NODE' }] }); }
    if (gameMode === 'PURITY_SCRUB') { setGameState({ items: [{ id: 1, label: 'SOVEREIGNTY', type: 'GOOD' }, { id: 2, label: 'CUSTODY', type: 'BAD' }, { id: 3, label: 'LOCAL_FIRST', type: 'GOOD' }, { id: 4, label: 'DATA_MINING', type: 'BAD' }, { id: 5, label: 'HONESTY', type: 'GOOD' }, { id: 6, label: 'RPC_LOGS', type: 'BAD' }], cleared: [] }); }
    if (gameMode === 'ENTROPY_SCAN') { setGameState({ barPos: 0, direction: 1, targetStart: 40, targetEnd: 60, speed: 0.85 }); }
    if (gameMode === 'SYNC_SEQUENCE') {
      const words = ['HEURISTIC', 'SACCADE', 'ENTROPY', 'PROVENANCE'].sort(() => Math.random() - 0.5).slice(0, 3);
      setGameState({ words, shown: true, sequence: [] });
      setTimeout(() => setGameState(prev => ({ ...prev, shown: false })), 2000);
    }
    if (gameMode === 'CORE_RESONANCE') { setGameState({ pulse: 0 }); }
  };

  const handleWin = () => { playSuccessChime(); setPhase('SUCCESS'); setTimeout(() => onUnlock(), 200); };
  const handleFail = (msg?: string) => { playDeniedSound(); setFeedback(msg || 'COLLATERAL_ERROR'); setPhase('FAIL'); onFail(); setTimeout(() => { setPhase('READY'); setFeedback(null); }, 2000); };

  const renderGame = () => {
    switch (gameMode) {
      case 'RETINAL_DIFF':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2"><span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Identify Real Target</span><div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-white text-lg">{gameState.target}</div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{gameState.options.map((opt: string, i: number) => (<button key={i} onClick={() => opt === gameState.target ? handleWin() : handleFail()} className="p-4 bg-black border border-zinc-800 rounded-xl font-mono text-[11px] text-zinc-500 hover:text-white hover:border-cyan-500 transition-all uppercase">{opt}</button>))}</div>
          </div>
        );
      case 'SIGNAL_ROUTING':
        const nodes = [{ id: 'L1', label: 'Layer 1: Settlement' }, { id: 'L0', label: 'Layer 0: Intent' }, { id: 'L0.5', label: 'Layer 0.5: VIGIL' }];
        return (
          <div className="space-y-8 text-center animate-in zoom-in duration-500">
             <p className="text-zinc-500 text-sm italic">Route the signal from intent to settlement.</p>
             <div className="flex flex-wrap justify-center gap-4">{nodes.map(n => { const isPressed = gameState.sequence.includes(n.id); return (<button key={n.id} onClick={() => { if (isPressed) return; const next = [...gameState.sequence, n.id]; setGameState({...gameState, sequence: next}); if (next[next.length - 1] !== gameState.target[next.length - 1]) handleFail(); else if (next.length === 3) handleWin(); }} className={`p-6 rounded-2xl border-2 font-black uppercase tracking-widest text-[10px] transition-all ${isPressed ? 'bg-blue-600 border-blue-400 text-white' : 'bg-zinc-950 border-zinc-900 text-zinc-600 hover:border-blue-500'}`}>{n.label}</button>); })}</div>
          </div>
        );
      case 'THREAT_NEUTRAL':
        return (
          <div className="flex flex-col items-center gap-8 py-10 animate-in fade-in duration-500 relative">
             <div className="text-4xl font-black text-white italic transition-all duration-300">{gameState.score} / 3</div>
             <div className="relative w-full max-w-sm h-64 bg-black border border-zinc-900 rounded-[2rem] overflow-hidden shadow-inner">
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                {gameState.packets.map((p: any) => (<button key={p.id} onClick={() => { if (p.type === 'POISON') { setGameState((prev: any) => ({ ...prev, score: prev.score + 1, packets: prev.packets.filter((pkt: any) => pkt.id !== p.id) })); if (gameState.score + 1 >= 3) handleWin(); } else { handleFail('COLLATERAL_ERROR: VERIFIED_NODE_REJECTED'); } }} className={`absolute p-3 rounded-lg border flex items-center gap-2 transition-transform hover:scale-110 active:scale-95 group/pkt ${p.type === 'POISON' ? 'border-red-500/20 bg-red-500/5 text-red-500' : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500'}`} style={{ left: `${p.x}%`, top: `${p.y}px` }}>{p.type === 'POISON' ? <Skull size={14} className="animate-pulse" /> : <ShieldCheck size={14} />}<span className="text-[7px] font-black uppercase tracking-widest">{p.label}</span></button>))}
             </div>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">STRIKE <span className="text-red-500">MIMIC_FRAGMENTS</span>. AVOID <span className="text-emerald-500">VERIFIED_NODES</span>.</p>
          </div>
        );
      case 'PURITY_SCRUB':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{gameState.items.map((item: any) => (<button key={item.id} disabled={gameState.cleared.includes(item.id)} onClick={() => { if (item.type === 'BAD') { const next = [...gameState.cleared, item.id]; setGameState({...gameState, cleared: next}); if (next.length === 3) handleWin(); } else handleFail(); }} className={`p-4 rounded-xl border-2 font-black text-[9px] uppercase tracking-widest transition-all ${gameState.cleared.includes(item.id) ? 'opacity-0 scale-90 pointer-events-none' : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-red-500/50'}`}>{item.label}</button>))}</div>
            <p className="text-center text-zinc-500 text-[10px] uppercase tracking-widest">Scrub the system non-goals.</p>
          </div>
        );
      case 'ENTROPY_SCAN':
        return (
          <div className="space-y-12 py-10 animate-in zoom-in duration-500">
             <div className="relative w-full h-12 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden">
                <div className="absolute top-0 bottom-0 w-1/5 bg-red-600/20 left-[40%]" />
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_15px_cyan]" 
                  style={{ left: `${gameState?.barPos || 0}%` }}
                />
             </div>
             <button 
               onClick={() => {
                 const isHit = gameState.barPos >= gameState.targetStart && gameState.barPos <= gameState.targetEnd;
                 if (isHit) handleWin();
                 else handleFail('COLLISION_MISMATCH: BAR_OUTSIDE_TARGET_ZONE');
               }} 
               className="w-full py-5 bg-white text-black font-black rounded-2xl uppercase tracking-[0.5em] hover:bg-cyan-500 hover:text-white transition-all"
             >
               STOP SCANNER
             </button>
             <p className="text-center text-zinc-500 text-[10px] uppercase tracking-widest italic">Stop scanner on red entropy collision.</p>
          </div>
        );
      case 'SYNC_SEQUENCE':
        return (
          <div className="space-y-12 py-10 animate-in fade-in duration-500">
            {gameState.shown ? (<div className="flex flex-col items-center gap-6"><span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest animate-pulse">Memorize Sequence</span><div className="flex gap-4">{gameState.words.map((w: string, i: number) => (<div key={i} className="px-6 py-4 bg-zinc-900 border border-cyan-500/30 rounded-xl font-black text-white text-sm tracking-widest">{w}</div>))}</div></div>) : (<div className="flex flex-col items-center gap-8"><span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Input Sequence in Order</span><div className="grid grid-cols-2 gap-3 w-full max-w-md">{['HEURISTIC', 'SACCADE', 'ENTROPY', 'PROVENANCE'].map(w => { const isPressed = gameState.sequence.includes(w); return (<button key={w} disabled={isPressed} onClick={() => { const next = [...gameState.sequence, w]; setGameState({...gameState, sequence: next}); if (next[next.length - 1] !== gameState.words[next.length - 1]) handleFail(); else if (next.length === 3) handleWin(); }} className={`p-4 rounded-xl border-2 font-black text-[10px] tracking-widest transition-all ${isPressed ? 'opacity-20' : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:border-cyan-500 hover:text-white'}`}>{w}</button>); })}</div></div>)}
          </div>
        );
      case 'CORE_RESONANCE':
        return (
          <div className="flex flex-col items-center gap-12 py-10 animate-in zoom-in duration-700">
             <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 border-[1px] border-zinc-800 rounded-full" />
                <div className="absolute border-2 border-blue-500/40 rounded-full transition-all duration-75" style={{ width: `${gameState.pulse}%`, height: `${gameState.pulse}%`, opacity: 1 - (gameState.pulse / 100) }} />
                <div className="absolute w-[85%] h-[85%] border-2 border-dashed border-zinc-700 rounded-full opacity-30" />
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center border-2 border-blue-500/40 z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]"><Fingerprint size={40} className={`text-blue-500 ${gameState.pulse > 80 && gameState.pulse < 90 ? 'animate-pulse scale-110' : ''}`} /></div>
             </div>
             <div className="w-full max-w-sm space-y-6">
                <button onMouseDown={() => { if (gameState.pulse > 80 && gameState.pulse < 95) handleWin(); else handleFail('SYNC_MISMATCH: TEMPORAL_DRIFT_DETECTED'); }} className="w-full py-6 bg-white text-black font-black rounded-[2rem] uppercase tracking-[0.5em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95">TRIGGER RESONANCE</button>
                <div className="flex justify-between items-center px-4"><span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest italic">Phase: Alignment</span><div className="flex gap-2"><div className={`w-1.5 h-1.5 rounded-full transition-colors ${gameState.pulse > 80 && gameState.pulse < 95 ? 'bg-blue-500 animate-pulse' : 'bg-zinc-900'}`} /><div className={`w-1.5 h-1.5 rounded-full transition-colors ${gameState.pulse > 85 && gameState.pulse < 92 ? 'bg-emerald-500 animate-ping' : 'bg-zinc-900'}`} /></div></div>
             </div>
             <p className="text-center text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">INTERSECT AT ZERO POINT [80-95%]</p>
          </div>
        );
    }
  };

  if (!isAvailable && !isUnlocked) return null;

  return (
    <div 
      className={`w-full relative transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isIntegrated ? 'max-h-0 opacity-0 py-0 m-0 overflow-hidden pointer-events-none' : 'max-h-[2000px] opacity-100 py-8 md:py-12'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 relative" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        {isUnlocked ? (
          <div className={`relative ${isShattering ? 'pointer-events-none' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
             {isShattering && (
               <div className="absolute inset-0 z-[60] overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
                 {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
                   <ShatterShard key={i} index={i} isShattering={isShattering} />
                 ))}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white blur-[120px] animate-shatter-flash rounded-full opacity-0 z-10" />
               </div>
             )}
             <div className={`transition-all duration-[600ms] ${isShattering ? 'opacity-0 scale-110 blur-2xl grayscale' : 'opacity-100 scale-100'}`}>
                <div className={`p-8 bg-emerald-600/5 border-2 rounded-[2.5rem] flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-500 ${isUnlocked && !isShattering ? 'animate-fracture-pulse border-emerald-500/40' : 'border-emerald-500/20'}`}>
                   <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"><CheckCircle2 size={32} /></div>
                   <div className="space-y-1">
                      <h4 className="text-xl font-black text-white italic uppercase tracking-widest">Silo 0{gateLevel - 1} Proficiency Verified.</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em]">NEURAL LINK SYNCHRONIZED // NEXT SEGMENT DECRYPTED</p>
                   </div>
                </div>
             </div>
          </div>
        ) : (
          <div className={`p-10 md:p-16 bg-[#080808] border-2 rounded-[3.5rem] shadow-2xl space-y-12 transition-all duration-700 ${ phase === 'FAIL' ? 'border-red-600/40 shadow-red-600/5 shake' : phase === 'PLAYING' ? 'border-blue-500/40' : 'border-zinc-800' }`}>
             <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-zinc-900 pb-10">
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 bg-zinc-950 border-2 rounded-2xl flex items-center justify-center transition-all duration-1000 ${phase === 'PLAYING' ? 'border-cyan-500 animate-pulse' : 'border-zinc-800'}`}>
                     {phase === 'FAIL' ? <AlertTriangle className="text-red-500" /> : <Terminal size={24} className="text-zinc-600" />}
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">Proficiency Audit</span>
                     <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Silo 0{gateLevel - 1} Terminal.</h3>
                  </div>
                </div>
                {nextIntel && (
                  <div className="flex items-center gap-4 p-4 bg-cyan-950/20 border border-cyan-900/30 rounded-2xl max-w-xs animate-in fade-in duration-1000">
                    <Radar className="w-5 h-5 text-cyan-500 shrink-0 animate-pulse" />
                    <div className="space-y-1"><span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">Next Sector: {nextIntel.label}</span><p className="text-[10px] text-zinc-500 font-bold uppercase leading-tight italic">{nextIntel.details}</p></div>
                  </div>
                )}
             </div>
             {phase === 'READY' ? (
                <div className="py-12 flex flex-col items-center gap-8 text-center">
                  <div className="space-y-4"><h4 className="text-2xl font-black text-white uppercase italic tracking-widest">Calibration: {gameMode.replace('_', ' ')}</h4><p className="text-zinc-500 text-sm font-medium italic max-w-md mx-auto">"Prove technical alignment with the core system standard to proceed."</p></div>
                  <button onClick={startChallenge} className="px-16 py-6 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.6em] shadow-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 flex items-center gap-4"><Zap size={14} className="fill-current" /> INITIATE_CHALLENGE</button>
                </div>
             ) : (
                <div className="relative">
                  {phase === 'FAIL' && feedback && (<div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300 rounded-[2rem]"><div className="flex flex-col items-center gap-4 text-center"><ShieldX className="text-red-500 w-16 h-16 animate-pulse" /><div className="space-y-2"><h4 className="text-xl font-black text-red-600 uppercase tracking-tighter italic">Calibration Breach.</h4><p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-8">{feedback}</p></div></div></div>)}
                  {renderGame()}
                </div>
             )}
             <div className="pt-6 border-t border-zinc-900 flex items-center justify-center gap-6"><div className="flex items-center gap-3"><Info size={14} className="text-zinc-700" /><p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest italic">Safety Note: Failure resets calibration state.</p></div></div>
          </div>
        )}
      </div>

      <style>{`
        .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%, 90% { transform: translate(3d(-1px, 0, 0)); } 20%, 80% { transform: translate(3d(2px, 0, 0)); } 30%, 50%, 70% { transform: translate(3d(-4px, 0, 0)); } 40%, 60% { transform: translate(3d(4px, 0, 0)); } }
        @keyframes shard-chaos-0 { 100% { transform: translate3d(-350%, -450%, 1500px) rotateX(720deg) rotateY(180deg) rotateZ(360deg); opacity: 0; } }
        @keyframes shard-chaos-1 { 100% { transform: translate3d(200%, -500%, -1200px) rotateX(-540deg) rotateY(1080deg); opacity: 0; } }
        @keyframes shard-chaos-2 { 100% { transform: translate3d(550%, -150%, 800px) rotateZ(720deg) rotateY(360deg) rotateX(180deg); opacity: 0; } }
        @keyframes shard-chaos-3 { 100% { transform: translate3d(-600%, 0%, -1500px) rotateX(900deg) rotateZ(-360deg); opacity: 0; } }
        @keyframes shard-chaos-4 { 100% { transform: translate3d(650%, 400%, 2000px) rotateY(-1080deg) rotateX(90deg); opacity: 0; } }
        @keyframes shard-chaos-5 { 100% { transform: translate3d(-400%, 550%, -1000px) rotateX(-720deg) rotateZ(360deg); opacity: 0; } }
        @keyframes shard-chaos-6 { 100% { transform: translate3d(400%, 700%, 600px) rotateY(900deg) rotateX(360deg); opacity: 0; } }
        @keyframes shard-chaos-7 { 100% { transform: translate3d(-500%, 300%, 1200px) rotateX(540deg) rotateY(-720deg); opacity: 0; } }
        @keyframes shard-chaos-8 { 100% { transform: translate3d(0%, -700%, -800px) rotateZ(1080deg) rotateX(720deg); opacity: 0; } }
        @keyframes shard-chaos-9 { 100% { transform: translate3d(700%, 0%, 1800px) rotateX(360deg) rotateY(360deg); opacity: 0; } }
        @keyframes shard-chaos-10 { 100% { transform: translate3d(-700%, -300%, 500px) rotateZ(-1080deg) rotateX(180deg); opacity: 0; } }
        @keyframes shard-chaos-11 { 100% { transform: translate3d(250%, 800%, -1500px) rotateY(1800deg) rotateZ(45deg); opacity: 0; } }
        .shard-chaos-anim-0 { animation: shard-chaos-0 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-1 { animation: shard-chaos-1 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-2 { animation: shard-chaos-2 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-3 { animation: shard-chaos-3 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-4 { animation: shard-chaos-4 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-5 { animation: shard-chaos-5 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-6 { animation: shard-chaos-6 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-7 { animation: shard-chaos-7 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-8 { animation: shard-chaos-8 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-9 { animation: shard-chaos-9 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-10 { animation: shard-chaos-10 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .shard-chaos-anim-11 { animation: shard-chaos-11 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes shatter-flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); } 25% { opacity: 1; transform: translate(-50%, -50%) scale(2); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(6); } }
        .animate-shatter-flash { animation: shatter-flash 0.6s ease-out forwards; }
        @keyframes fracture-pulse { 0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); } 50% { border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 0 80px rgba(16, 185, 129, 0.6); transform: translateZ(50px) scale(1.02); } }
        .animate-fracture-pulse { animation: fracture-pulse 0.4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
