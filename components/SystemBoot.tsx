
import React, { useState, useEffect, useRef } from 'react';
import { Activity, Scan, ShieldAlert, ShieldCheck, Terminal, Info, Zap, ChevronRight, BarChart3, HeartPulse } from 'lucide-react';

interface SystemBootProps {
  onComplete: (score: number) => void;
  skipGame?: boolean;
}

type BootPhase = 'COLD_START' | 'BRI_BRIEFING' | 'CALIBRATE' | 'VERDICT' | 'INTEGRITY_SCAN' | 'IDENTITY_MANIFEST' | 'EXIT';

const GAME_WINDOW = 5.0;
const READ_WINDOW = 0; 
const TOTAL_CALIBRATE_TIME = GAME_WINDOW + READ_WINDOW;

const SCAN_LOG_STEPS = [
  "BOOT_SEQUENCE_INITIATED",
  "SYNCING_SENTINEL_NODES",
  "CALIBRATING_SACCADIC_MESH",
  "CORE_SYNC_SUCCESSFUL",
  "VIGIL_WORDMARK_DECRYPTION",
  "ENCRYPTED_HANDSHAKE_ESTABLISHED"
];

export const SystemBoot: React.FC<SystemBootProps> = ({ onComplete, skipGame = false }) => {
  const [phase, setPhase] = useState<BootPhase>('COLD_START');
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [timer, setTimer] = useState(TOTAL_CALIBRATE_TIME);
  const [verdict, setVerdict] = useState<'SUCCESS' | 'FAILURE' | null>(null);
  
  const [grid, setGrid] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(-1);

  const [integrityPercent, setIntegrityPercent] = useState(47);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [telemetryStream, setTelemetryStream] = useState<string[]>([]);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const humNodeRef = useRef<OscillatorNode | null>(null);
  
  const coldStartText = "IDENTITY_VULNERABILITY_DETECTED.\nINITIALIZING_SOVEREIGN_SCAN...";

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playTick = (freq = 1800) => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  };

  const playSuccessChime = () => {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      [440, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (i * 0.1));
        gain.gain.setValueAtTime(0.08, now + (i * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.1) + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + (i * 0.1));
        osc.stop(now + (i * 0.1) + 0.5);
      });
    } catch (e) {}
  };

  const playDeniedSound = () => {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      [0, 0.12].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now + delay);
        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.08);
      });
    } catch (e) {}
  };

  const startHum = () => {
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      humNodeRef.current = osc;
    } catch (e) {}
  };

  const stopHum = () => {
    if (humNodeRef.current) {
      try {
        humNodeRef.current.stop();
        humNodeRef.current = null;
      } catch (e) {}
    }
  };

  const generateMatrix = () => {
    const chars = "0123456789ABCDEF";
    const generateHex = (len: number) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const base = `0x${generateHex(6)}`;
    const anomalyIdx = Math.floor(Math.random() * 9);
    
    const newGrid = Array(9).fill(base).map((val, idx) => {
      if (idx === anomalyIdx) {
        const pos = Math.floor(Math.random() * 6) + 2; 
        let newChar = chars[Math.floor(Math.random() * chars.length)];
        while (newChar === val[pos]) {
          newChar = chars[Math.floor(Math.random() * chars.length)];
        }
        return val.substring(0, pos) + newChar + val.substring(pos + 1);
      }
      return val;
    });

    setGrid(newGrid);
    setCorrectIndex(anomalyIdx);
  };

  useEffect(() => {
    generateMatrix();
    return () => {
      stopHum();
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (phase === 'COLD_START') {
      if (typewriterIndex < coldStartText.length) {
        const t = setTimeout(() => {
          setTypewriterText(coldStartText.slice(0, typewriterIndex + 1));
          setTypewriterIndex(prev => prev + 1);
          playTick(1200);
        }, 50);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          if (skipGame) {
             setVerdict('SUCCESS');
             setPhase('INTEGRITY_SCAN');
          } else {
             setPhase('BRI_BRIEFING');
             startHum();
             playSuccessChime();
          }
        }, 1200);
        return () => clearTimeout(t);
      }
    }
  }, [phase, typewriterIndex, skipGame]);

  useEffect(() => {
    if (phase === 'CALIBRATE' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(t => Math.max(0, t - 0.01));
      }, 10);
      return () => clearInterval(interval);
    } else if (phase === 'CALIBRATE' && timer === 0) {
      handleSelection(-1); 
    }
  }, [phase, timer]);

  useEffect(() => {
    if (phase === 'INTEGRITY_SCAN') {
      const start = Date.now();
      const duration = 3000;
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const progress = Math.min(100, 47 + (53 * (elapsed / duration)));
        setIntegrityPercent(Math.floor(progress));
        
        const generateHex = () => "0x" + Math.random().toString(16).slice(2, 10).toUpperCase();
        setTelemetryStream(prev => [generateHex() + " :: OK", ...prev].slice(0, 8));

        const logIdx = Math.floor((elapsed / duration) * SCAN_LOG_STEPS.length);
        setActiveLogs(SCAN_LOG_STEPS.slice(0, Math.min(logIdx + 1, SCAN_LOG_STEPS.length)));

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('IDENTITY_MANIFEST'), 1000);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'IDENTITY_MANIFEST') {
      const timer = setTimeout(() => {
        setPhase('EXIT');
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (phase === 'EXIT') {
      const timer = setTimeout(() => {
        onComplete(verdict === 'SUCCESS' ? 100 : 80);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, verdict, onComplete]);

  const handleSelection = (idx: number) => {
    if (phase !== 'CALIBRATE' || timer > GAME_WINDOW) return;
    
    const isSuccess = idx === correctIndex;
    setVerdict(isSuccess ? 'SUCCESS' : 'FAILURE');
    setPhase('VERDICT');
    
    if (isSuccess) {
      playSuccessChime();
    } else {
      playDeniedSound();
    }
    
    setTimeout(() => {
      setPhase('INTEGRITY_SCAN');
    }, 2000);
  };

  return (
    <div className={`fixed inset-0 z-[1000] bg-[#020202] flex flex-col transition-all duration-1000 ${phase === 'EXIT' ? 'opacity-0 scale-110 blur-3xl' : 'opacity-100'}`}>
      {phase === 'CALIBRATE' && (
        <div className="absolute inset-x-0 h-[1px] bg-cyan-400/40 blur-[2px] z-50 pointer-events-none" 
             style={{ animation: 'scan-vertical 3s linear infinite' }} />
      )}
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 w-full overflow-hidden">
        <div className="max-w-6xl w-full flex flex-col items-center justify-center h-full">
          
          {phase === 'COLD_START' && (
            <div className="space-y-8 animate-in fade-in duration-1000 flex flex-col items-center text-center">
              <Terminal className="w-10 h-10 md:w-16 md:h-16 text-red-500 animate-pulse" />
              <p className="text-white font-mono text-base md:text-5xl leading-relaxed tracking-wider min-h-[3em] whitespace-pre-line uppercase font-black px-10 md:px-4">
                {typewriterText}
                <span className="inline-block w-2 h-5 md:w-2.5 md:h-10 bg-red-500 ml-2 md:ml-3 animate-pulse align-middle" />
              </p>
            </div>
          )}

          {phase === 'BRI_BRIEFING' && (
            <div className="space-y-4 md:space-y-10 animate-in slide-in-from-bottom-8 duration-1000 text-left max-w-5xl flex flex-col items-center w-full px-2 overflow-y-auto no-scrollbar">
              <div className="space-y-3 md:space-y-4 border-b border-zinc-900 pb-4 md:pb-8 w-full px-2">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 md:w-8 md:h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight">BRI Briefing.</h3>
                </div>
                <p className="text-zinc-300 text-[10px] md:text-3xl leading-relaxed font-medium italic border-l-2 md:border-l-4 border-blue-600/40 pl-5 md:pl-10">
                  The <span className="text-white font-black">Biological Resilience Index (BRI)</span> is a persistent measure of your cognitive intercept accuracy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-6 w-full">
                {[
                  { 
                    icon: <ShieldAlert size={12} className="text-red-500" />, 
                    title: "System Stakes", 
                    content: <div className="space-y-2 text-[9px] md:text-[14px] font-bold text-zinc-400 uppercase tracking-tight">
                                <p className="flex justify-between items-center bg-black/40 p-2 md:p-3 rounded-lg">Success: <span className="text-emerald-500">100% BRI</span></p>
                                <p className="flex justify-between items-center bg-black/40 p-2 md:p-3 rounded-lg">Failure: <span className="text-red-500">80% BRI</span></p>
                             </div>
                  },
                  { 
                    icon: <Activity size={12} className="text-blue-500" />, 
                    title: "Objective", 
                    content: <p className="text-[9px] md:text-[13px] text-zinc-500 leading-relaxed italic uppercase font-bold px-1">
                               On the next screen, identify the <span className="text-white font-black">SINGLE MUTATED CHARACTER</span> within 5.0 seconds.
                             </p>
                  },
                  { 
                    icon: <BarChart3 size={12} className="text-emerald-500" />, 
                    title: "XP Mapping", 
                    content: <p className="text-[9px] md:text-[13px] text-zinc-500 leading-relaxed italic uppercase font-bold px-1">
                               Final BRI is calculated in <span className="text-white font-black">Silo 09-10</span>. Scoring aggregates all future activities.
                             </p>
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 md:p-8 bg-zinc-950 border border-zinc-900 rounded-[1.25rem] md:rounded-[2rem] space-y-2 md:space-y-6 shadow-2xl">
                    <h4 className="text-[9px] md:text-[14px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                      {item.icon} {item.title}
                    </h4>
                    {item.content}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setPhase('CALIBRATE')}
                className="w-full py-4 md:py-8 bg-white text-black text-[11px] md:text-[16px] font-black uppercase tracking-[0.4em] rounded-none hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 md:gap-6 group mt-2 mb-4"
              >
                INITIATE CALIBRATION <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}

          {phase === 'CALIBRATE' && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-16 animate-in zoom-in duration-700 max-h-screen py-24 md:py-32">
              <div className="space-y-4 md:space-y-6 w-full flex flex-col items-center shrink-0">
                <div className="flex flex-col items-center gap-2 md:gap-4">
                   <span className="px-3 py-1 md:px-4 md:py-1.5 bg-red-600/10 border border-red-500/20 rounded-md text-[8px] md:text-[12px] font-black text-red-500 uppercase tracking-[0.6em] animate-pulse">BIOMETRIC_CHALLENGE</span>
                   <h3 className="text-xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight text-center">IDENTIFY MUTATION.</h3>
                </div>
                
                <div className={`text-4xl md:text-9xl font-mono font-black tabular-nums transition-colors duration-500 ${timer < 1.5 ? 'text-red-500' : 'text-white'}`}>
                  {timer.toFixed(2)}s
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-8 p-6 md:p-14 bg-zinc-950/50 border border-zinc-900 rounded-[2rem] md:rounded-[4rem] relative shadow-[0_50px_120px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-500 max-w-3xl w-full mx-auto flex-1 max-h-[45vh] md:max-h-none">
                {grid.map((char, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSelection(i)}
                    className="py-3 md:py-8 px-2 md:px-10 bg-black border border-zinc-800 rounded-xl md:rounded-[2rem] font-mono text-[10px] sm:text-xs md:text-2xl text-zinc-500 hover:text-white hover:border-blue-500 transition-all active:scale-95 group relative overflow-hidden flex items-center justify-center h-fit my-auto"
                  >
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {char}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'VERDICT' && (
            <div className="space-y-8 animate-in zoom-in duration-700 flex flex-col items-center text-center py-6 md:py-10">
              {verdict === 'SUCCESS' ? (
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-20 h-20 md:w-40 md:h-40 bg-emerald-500/10 border-4 border-emerald-500/40 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(16,185,129,0.3)]">
                    <ShieldCheck size={40} className="md:w-16 md:h-16 text-emerald-500" />
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-2xl md:text-6xl font-black text-emerald-500 italic uppercase tracking-tighter leading-none">CALIBRATION SUCCESSFUL.</h3>
                    <p className="text-zinc-400 text-[9px] md:text-lg font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">NEURAL_PARITY_ESTABLISHED (100% BRI)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-20 h-20 md:w-40 md:h-40 bg-red-600/10 border-4 border-red-600/40 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(239,68,68,0.3)]">
                    <ShieldAlert size={40} className="md:w-16 md:h-16 text-red-500" />
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-2xl md:text-6xl font-black text-red-500 italic uppercase tracking-tighter leading-tight">COGNITIVE BYPASS DETECTED.</h3>
                    <p className="text-zinc-400 text-[9px] md:text-lg font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">RESILIENCE_REDUCED_TO_80% (Recruit Status)</p>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-zinc-950/50 border border-zinc-900 rounded-xl animate-pulse max-w-lg mx-auto w-[85%]">
                 <p className="text-[9px] md:text-[12px] font-mono text-zinc-600 uppercase tracking-widest leading-relaxed italic font-bold">
                    Synchronizing biological parameters...
                 </p>
              </div>
            </div>
          )}

          {phase === 'INTEGRITY_SCAN' && (
            <div className="w-full h-full flex flex-col p-4 md:p-12 relative animate-in fade-in duration-1000">
               <div className="absolute top-12 left-12 space-y-4 hidden md:block">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">Registry Init Log</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[9px] text-zinc-600 uppercase">
                     {activeLogs.map((log, i) => (
                       <div key={i} className="animate-in slide-in-from-left-2 duration-300">
                         <span className="text-zinc-800 mr-2">>></span> {log}
                       </div>
                     ))}
                  </div>
               </div>

               <div className="absolute top-1/2 -translate-y-1/2 right-12 space-y-4 hidden md:block">
                  <div className="flex items-center justify-end gap-3">
                     <div className="text-right">
                        <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Resilience Threshold</div>
                        <div className="text-xl font-black text-emerald-500 italic uppercase">Optimal_Sync</div>
                     </div>
                     <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/30 rounded-xl flex items-center justify-center">
                        <HeartPulse className="text-emerald-500 animate-pulse" size={24} />
                     </div>
                  </div>
                  <div className="w-32 h-8 bg-zinc-950/50 border border-zinc-900 rounded-lg overflow-hidden relative">
                    <svg viewBox="0 0 100 30" className="w-full h-full">
                       <path 
                        d="M0 15 L20 15 L25 5 L35 25 L40 15 L60 15 L65 5 L75 25 L80 15 L100 15" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="1.5" 
                        className="animate-heartbeat"
                       />
                    </svg>
                  </div>
               </div>

               <div className="absolute bottom-12 right-12 text-right space-y-3 hidden md:block">
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Kernel Telemetry Stream</span>
                  <div className="space-y-1 font-mono text-[8px] text-zinc-800 uppercase">
                     {telemetryStream.map((t, i) => <div key={i}>{t}</div>)}
                  </div>
               </div>

               <div className="flex-1 flex flex-col items-center justify-center gap-12">
                  <div className="relative">
                     <div className="absolute -top-12 -left-12 w-16 h-16 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-3xl" />
                     <div className="absolute -top-12 -right-12 w-16 h-16 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-3xl" />
                     <div className="absolute -bottom-12 -left-12 w-16 h-16 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-3xl" />
                     <div className="absolute -bottom-12 -right-12 w-16 h-16 border-b-2 border-r-2 border-cyan-500/40 rounded-br-3xl" />
                     
                     <div className="relative group">
                        <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] animate-pulse rounded-full" />
                        <svg viewBox="0 0 400 400" className="w-64 h-64 md:w-80 md:h-80 relative z-10 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                          <defs>
                            <linearGradient id="bootLogoFill" x1="0" y1="364" x2="0" y2="106" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#22d3ee" />
                              <stop offset={`${integrityPercent}%`} stopColor="#22d3ee" />
                              <stop offset={`${integrityPercent}%`} stopColor="transparent" />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M50 200 H120 L180 350 L240 120 V350 H350" 
                            fill="none" 
                            stroke="#22d3ee" 
                            strokeWidth="28" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="opacity-10"
                          />
                          <path 
                            d="M50 200 H120 L180 350 L240 120 V350 H350" 
                            fill="none" 
                            stroke="url(#bootLogoFill)" 
                            strokeWidth="28" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="transition-all duration-300"
                          />
                        </svg>
                     </div>
                  </div>

                  <div className="space-y-6 text-center">
                     <div className="space-y-1">
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.6em]">Sys_Integrity_Index</div>
                        <div className="text-6xl md:text-8xl font-black text-cyan-500 italic tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                           {integrityPercent}%
                        </div>
                     </div>
                     <div className="px-10 py-3 bg-black border border-zinc-900 rounded-full inline-block shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                        <span className="text-[10px] font-mono text-zinc-200 font-bold uppercase tracking-[0.4em] relative z-10">
                           {integrityPercent < 100 ? 'Mapping_Human_Protocol' : 'Node_Identity_Stable'}
                        </span>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-12 left-12 md:hidden">
                  <span className="text-[8px] font-mono text-zinc-700">KERNEL_SYNC_ACTIVE</span>
               </div>
            </div>
          )}

          {phase === 'IDENTITY_MANIFEST' && (
            <div className="flex flex-col items-center justify-center text-center w-full py-12 md:py-20 h-full animate-in zoom-in duration-1000">
              <div className="animate-manifest-reveal w-full px-4">
                <h2 className="text-[6rem] md:text-[16rem] font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-[0_0_120px_rgba(255,255,255,0.25)]">
                  VIGIL
                </h2>
                <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                   <div className="h-[1px] w-24 bg-white" />
                   <span className="text-[12px] font-black uppercase tracking-[1em]">Established</span>
                   <div className="h-[1px] w-24 bg-white" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className={`p-4 md:p-8 w-full flex flex-col items-center gap-3 md:gap-4 shrink-0 ${(phase === 'IDENTITY_MANIFEST' || phase === 'CALIBRATE' || phase === 'INTEGRITY_SCAN') ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-500 absolute bottom-0 left-0 right-0`}>
        <div className="flex items-center justify-center gap-4 md:gap-6 text-[9px] md:text-[13px] font-black text-zinc-800 uppercase tracking-widest md:tracking-[0.5em]">
          <Activity size={12} className={verdict === 'FAILURE' ? 'text-red-500' : 'text-emerald-500'} /> 
          {phase === 'VERDICT' ? 'VERDICT_RENDERED' : 'KERNEL_STABLE_v1.0.0_DEFINITIVE'}
        </div>
        <div className="px-4 py-1 md:px-5 md:py-1.5 bg-zinc-950 border border-zinc-900 rounded-full shadow-inner">
          <span className="text-[7px] md:text-[10px] font-black text-zinc-700 uppercase tracking-widest">Protocol Reference: VIG-INT-01-S</span>
        </div>
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-20vh); }
          100% { transform: translateY(120vh); }
        }
        @keyframes manifest-reveal {
          0% { transform: scale(0.9); opacity: 0; filter: blur(20px); letter-spacing: 0em; }
          100% { transform: scale(1); opacity: 1; filter: blur(0); letter-spacing: -0.05em; }
        }
        .animate-manifest-reveal {
          animation: manifest-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-heartbeat {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: heartbeat 2s linear infinite;
        }
        @keyframes heartbeat {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        @keyframes shatter-flash { 
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.1); } 
          25% { opacity: 1; transform: translate(-50%, -50%) scale(2); } 
          100% { opacity: 0; transform: translate(-50%, -50%) scale(6); } 
        }
        .animate-shatter-flash { animation: shatter-flash 0.8s ease-out forwards; }
        @keyframes fracture-pulse { 
          0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 30px rgba(16, 185, 129, 0.2); } 
          50% { border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 0 80px rgba(16, 185, 129, 0.6); transform: translateZ(50px) scale(1.02); } 
        }
        .animate-fracture-pulse { animation: fracture-pulse 0.4s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
