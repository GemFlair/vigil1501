
import React, { useState, useEffect, useRef } from 'react';
import { Skull, RefreshCcw, Zap, HeartPulse, FlaskConical, ShieldCheck, ShieldX, Fingerprint, ChevronRight, Target, Activity, Scan, Binary, AlertCircle, Eye, Gauge, AlertTriangle, Terminal } from 'lucide-react';
import { generateCognitiveAutopsy, CognitiveAutopsyResponse } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';
import { playSuccessChime, playDeniedSound } from '../utils/audio';

const CHALLENGE_DURATION = 5.0;

const generatePoisonMimic = (real: string): string => {
  const prefix = real.slice(0, 4);
  const suffix = real.slice(-4);
  const charset = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let middle = "";
  for (let i = 0; i < real.length - 8; i++) {
    if (Math.random() > 0.65) {
      middle += real[i + 4];
    } else {
      middle += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return prefix + middle + suffix;
};

export const AdversarialMimicryLab: React.FC<{ onGameComplete?: () => void }> = ({ onGameComplete }) => {
  const [realAddress, setRealAddress] = useState('Vig1L1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1iG1i');
  const [gameState, setGameState] = useState<'IDLE' | 'PREPARING' | 'CHALLENGE' | 'AUTOPSY'>('IDLE');
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(CHALLENGE_DURATION);
  const [selected, setSelected] = useState<string | null>(null);
  const [autopsy, setAutopsy] = useState<CognitiveAutopsyResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streak, setStreak] = useState(0);

  const timerRef = useRef<number | null>(null);

  const initiateAttack = () => {
    setGameState('PREPARING');
    setTimeout(() => {
      const mimics = [
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress),
        generatePoisonMimic(realAddress)
      ];
      const all = [...mimics, realAddress].sort(() => Math.random() - 0.5);
      setOptions(all);
      setGameState('CHALLENGE');
      setTimeLeft(CHALLENGE_DURATION);
      startTimer();
    }, 2000);
  };

  const startTimer = () => {
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
      setTimeLeft(remaining);
      if (remaining === 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        handleSelection(null); 
      }
    }, 10);
  };

  const handleSelection = async (addr: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelected(addr);
    setGameState('AUTOPSY');
    setIsAnalyzing(true);

    if (addr === realAddress) {
      playSuccessChime();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 3 && onGameComplete) {
        onGameComplete();
      }
    } else {
      playDeniedSound();
      setStreak(0);
    }

    try {
      const report = await generateCognitiveAutopsy(realAddress, addr || options[0]);
      setAutopsy(report);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setGameState('IDLE');
    setOptions([]);
    setAutopsy(null);
    setSelected(null);
    setTimeLeft(CHALLENGE_DURATION);
  };

  const renderCollisionAddress = (addr: string, target: string) => {
    return (
      <div className="font-mono text-[9px] md:text-sm break-all leading-tight">
        {addr.split('').map((char, i) => {
          const isCollision = char === target[i];
          return (
            <span key={i} className={isCollision ? 'text-red-500 font-black' : 'text-white'}>{char}</span>
          );
        })}
      </div>
    );
  };

  return (
    <section id="mimicry-lab" className="px-6 md:px-20 py-12 bg-[#020202] relative z-10 overflow-hidden border-t border-zinc-900/50 flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <FlaskConical className="w-4 h-4 text-red-600 animate-pulse" />
                <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.6em]">Mimicry Lab // Assessment</span>
             </div>
             <h2 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Trial by Fire.</h2>
             <p className="text-zinc-500 text-sm md:text-lg italic font-medium leading-relaxed">
               "Identify 3 poison mimics in a row to prove neural parity and unlock Level 4: Execution."
             </p>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] flex items-center justify-between">
             <div className="space-y-1">
                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Calibration Streak</span>
                <div className="flex gap-2">
                   {[1, 2, 3].map(i => (
                     <div key={i} className={`w-3 h-3 rounded-full border-2 ${streak >= i ? 'bg-emerald-500 border-emerald-400' : 'bg-black border-zinc-800'}`} />
                   ))}
                </div>
             </div>
             <span className="text-[14px] font-black text-white italic">{streak}/3</span>
          </div>

          {gameState === 'IDLE' && (
            <div className="space-y-6 animate-in fade-in duration-700">
               <input 
                type="text" 
                value={realAddress}
                onChange={(e) => setRealAddress(e.target.value)}
                placeholder="TARGET_ADDRESS..."
                className="w-full bg-black border-2 border-zinc-900 rounded-xl py-4 px-6 text-xs font-mono text-white focus:border-red-600 outline-none uppercase"
              />
              <button 
                onClick={initiateAttack}
                className="w-full py-5 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-xl hover:bg-red-500 transition-all active:scale-95"
              >
                INITIATE COGNITIVE TRIAL
              </button>
            </div>
          )}

          {gameState === 'AUTOPSY' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500 space-y-6">
              <div className={`p-6 border-2 rounded-2xl ${selected === realAddress ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                 <h4 className="text-white font-black uppercase text-sm mb-4">Diagnostic Result</h4>
                 {isAnalyzing ? <VigilScanner label="GENERATING_AUTOPSY" size="sm" /> : <p className="text-zinc-400 text-xs italic">"{autopsy?.autopsy}"</p>}
              </div>
              <button onClick={reset} className="w-full py-4 border border-zinc-800 text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em] rounded-xl hover:text-white hover:bg-zinc-900 transition-all">RETRY TRIAL</button>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
           <div className={`relative h-[500px] bg-[#050505] border-2 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${gameState === 'CHALLENGE' ? 'border-red-600' : 'border-zinc-900 shadow-2xl'}`}>
             {gameState === 'IDLE' && <div className="text-center opacity-40"><Fingerprint size={80} className="text-zinc-700 mx-auto mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">Awaiting Identity</p></div>}
             {gameState === 'PREPARING' && <VigilScanner label="FORGING_ADVERSARIAL_MIMICS" size="lg" status="critical" />}
             {gameState === 'CHALLENGE' && (
               <div className="w-full h-full p-8 flex flex-col items-center gap-8">
                  <div className="text-center">
                     <div className="text-4xl font-black italic text-white mb-2">{timeLeft.toFixed(2)}s</div>
                     <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Select Authenticated Target</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                     {options.map((opt, i) => (
                       <button key={i} onClick={() => handleSelection(opt)} className="p-5 bg-black border border-zinc-900 rounded-2xl hover:border-red-600 transition-all group active:scale-95">
                          <div className="font-mono text-[10px] text-zinc-600 group-hover:text-zinc-200 truncate">{opt}</div>
                       </button>
                     ))}
                  </div>
               </div>
             )}
             {gameState === 'AUTOPSY' && (
                <div className="text-center p-12 space-y-8 animate-in fade-in duration-500">
                   <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto ${selected === realAddress ? 'border-emerald-500 text-emerald-500' : 'border-red-500 text-red-500'}`}>
                      {selected === realAddress ? <ShieldCheck size={40}/> : <ShieldX size={40}/>}
                   </div>
                   <div className="space-y-4">
                      <div className="p-4 bg-black border border-zinc-900 rounded-xl">
                        <span className="text-[7px] text-zinc-600 font-black uppercase mb-1 block">Reference</span>
                        <div className="font-mono text-[10px] text-zinc-400 break-all">{realAddress}</div>
                      </div>
                      <div className="p-4 bg-black border border-zinc-900 rounded-xl">
                        <span className="text-[7px] text-zinc-600 font-black uppercase mb-1 block">Selection</span>
                        {renderCollisionAddress(selected || options[0], realAddress)}
                      </div>
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>
    </section>
  );
};
