
import React, { useState, useRef, useEffect } from 'react';
import { 
  Share2, Zap, Shield, Download, Terminal as TerminalIcon, 
  Bookmark, Fingerprint, ShieldAlert, ShieldCheck, Type, 
  Settings2, Info, Globe, Cpu, Radio, Layout, EyeOff, 
  Lock, Activity, Target, Layers, Play, Video, X, 
  Timer, Film, CheckCircle2, Loader2, RotateCcw, Box,
  Glasses, Waves, Flame, Move, Gauge, Activity as ActivityIcon,
  Ruler, Eye, Skull, AlertCircle
} from 'lucide-react';
// Added missing import for TechLabel
import { TechLabel } from './docs/DocHelpers';

type LayoutType = 'COMPARISON' | 'MANIFESTO' | 'ARCHITECTURE' | 'BENCHMARK' | 'RETINAL_AUTOPSY';
type EngineType = 'BRUTALIST' | 'ISOMETRIC' | 'REFRACTIVE' | 'MESH';

interface Preset {
  id: string;
  label: string;
  layout: LayoutType;
  title: string;
  sub: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  summary: string;
  statusCode: string;
  accent: 'RED' | 'BLUE' | 'EMERALD' | 'CYAN';
}

const PRESETS: Preset[] = [
  {
    id: 'CATANA_FORENSIC',
    label: 'TWEET 15: CATANA CASE STUDY',
    layout: 'RETINAL_AUTOPSY',
    title: 'THE MATURITY \n TRAP.',
    sub: 'CONCENTRATION_FORENSIC // X-VG-15',
    leftLabel: 'PERCEPTION',
    leftValue: '1yr Maturity',
    rightLabel: 'REALITY',
    rightValue: 'Systemic Trap',
    summary: "The $CATANA incident proves age is not security. One entity bought at 500k and dumped at 20M after a year. Biological eyes saw 'Maturity'; VIGIL sees 'Concentration Risk'. We map the dominant entity before you follow the chart.",
    statusCode: 'LIQUIDITY_EXTORTION_RISK',
    accent: 'RED'
  },
  {
    id: 'RETINAL_AUTOPSY',
    label: 'TWEET 14: RETINAL AUTOPSY',
    layout: 'RETINAL_AUTOPSY',
    title: 'THE RETINA IS A \n HALLUCINATION.',
    sub: 'SACCADIC EXPLOIT // X-VG-14',
    leftLabel: 'PERCEPTION',
    leftValue: 'Edge Verification',
    rightLabel: 'REALITY',
    rightValue: 'Intent Mismatch',
    summary: 'In the 12ms it takes to "verify" an address, your brain only captures the edges. The adversary owns the 36-character gap in the middle. Your eyes are a hallucination engine; VIGIL is the validator.',
    statusCode: 'INTENT_MISMATCH_DETECTED',
    accent: 'RED'
  },
  {
    id: 'SOL_15B_SURGE',
    label: 'MILESTONE: $15B STABLE SURGE',
    layout: 'BENCHMARK',
    title: 'SCALING THE \n SHIELD.',
    sub: 'LIQUIDITY THRESHOLD // $15B CAP',
    leftLabel: 'MARKET_VELOCITY',
    leftValue: 'Parabolic',
    rightLabel: 'VIGIL_PROTECTION',
    rightValue: 'Sub-Frame',
    summary: 'As Solana stablecoin liquidity reaches a $15B all-time high, the attack surface for human-layer deception expands. High-velocity environments drive users toward cognitive shortcuts (the 8-character blind spot). VIGIL intercepts this risk in 12ms.',
    statusCode: 'LIQUIDITY_SECURED',
    accent: 'CYAN'
  },
  {
    id: 'X_VG_12_BENCHMARK',
    label: 'TWEET 12: X-VG-12 BENCHMARK',
    layout: 'BENCHMARK',
    title: 'THE RETINAL \n SHIELD.',
    sub: 'SPEED_VERIFICATION // X-VG-12',
    leftLabel: 'SCREEN_REFRESH',
    leftValue: '16.6ms (60Hz)',
    rightLabel: 'VIGIL_AUTOPSY',
    rightValue: '12.0ms',
    summary: 'Saccadic Interception Confirmed. Hardware Refresh Cycle Alignment: COMPLETED. VIGIL renders a security verdict in 12ms, while a 60Hz display requires 16.6ms for a single frame update. Delta: -4.6ms (System Advantage).',
    statusCode: 'LATENCY_STABLE',
    accent: 'CYAN'
  },
  {
    id: 'BLIND_SPOT',
    label: 'TWEET 03: BLIND SPOT',
    layout: 'COMPARISON',
    title: 'THE 8-CHAR \n BLIND SPOT.',
    sub: 'COGNITIVE TRUNCATION RISK // X-VG-03',
    leftLabel: 'USER_SCAN',
    leftValue: 'Edge Verification',
    rightLabel: 'ADVERSARY_MIMIC',
    rightValue: 'Entropy Collision',
    summary: 'Most users only check the first and last four characters of an address. Scammers use this "blind spot" to create fake addresses that look identical to your friends. VIGIL watches the middle characters so you don’t have to.',
    statusCode: 'RISK_DETECTED',
    accent: 'RED'
  },
  {
    id: 'ENTROPY_COLLISION',
    label: 'ENTROPY COLLISION',
    layout: 'ARCHITECTURE',
    title: 'TRAPPING THE \n TRICK.',
    sub: 'VANITY CLUSTER SIGNATURE // X-VG-07',
    leftLabel: 'STATIC_EDGES',
    leftValue: 'Familiar Mask',
    rightLabel: 'FORCED_ENTROPY',
    rightValue: 'Poison Node',
    summary: 'Hackers use powerful computers to generate addresses that mimic your history. VIGIL uses math to find these computer-generated patterns instantly, flagging them as fake before you can click send.',
    statusCode: 'HEURISTIC_PARITY_CHECK',
    accent: 'BLUE'
  }
];

const BrandBlock = ({ color = 'white' }: { color?: string }) => (
  <div className="flex flex-col items-center gap-4 bg-[#050505] p-10 rounded-[2.5rem] border-2 border-zinc-800 shadow-[0_40px_80px_rgba(0,0,0,1)] relative group-hover:border-zinc-700 transition-all duration-500">
    <div className="w-24 h-24 bg-white flex items-center justify-center rounded-lg shadow-2xl">
      <div className="w-12 h-12 bg-black rotate-45" />
    </div>
    <span className={`italic font-black text-5xl tracking-tighter text-${color} uppercase`}>VIGIL</span>
  </div>
);

const LatencyDiagram: React.FC<{ accentColor: string }> = ({ accentColor }) => (
  <div className="w-full py-8 px-10 bg-black/40 border border-zinc-900 rounded-[3rem] relative overflow-hidden group">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
    
    <div className="relative z-10 space-y-10">
      <div className="flex justify-between items-center px-2">
         {[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20].map((ms, i) => (
           <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-[1px] ${i % 2 === 0 ? 'h-3 bg-zinc-400' : 'h-1.5 bg-zinc-600'}`} />
              <span className="text-[10px] font-mono text-zinc-400 font-bold">{ms}ms</span>
           </div>
         ))}
      </div>

      <div className="relative h-20 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-inner">
        <div className="absolute top-0 bottom-0 left-0 bg-zinc-900/50 border-r border-zinc-700" style={{ width: '83%' }}>
          <div className="absolute top-3 right-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest italic px-2">
            [BIOLOGICAL_LIMIT // 60Hz_REFRESH]
          </div>
        </div>

        <div className="absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-out border-r-2" style={{ width: '60%', borderColor: accentColor, boxShadow: `0 0 40px ${accentColor}44` }}>
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl z-20">
            <Zap size={20} className="text-black fill-current" />
          </div>
          <div className="absolute bottom-4 right-6 text-[10px] font-black uppercase tracking-widest italic px-2" style={{ color: accentColor }}>
            [VIGIL_INTERCEPTION_POINT]
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 opacity-20" style={{ background: `linear-gradient(90deg, transparent, ${accentColor})` }} />
        </div>

        <div className="absolute top-0 bottom-0 left-[60%] w-[23%] bg-emerald-500/5 flex items-center justify-center border-l border-dashed border-zinc-800">
           <span className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest animate-pulse">ADVERSARY_VOID: 4.6ms</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-zinc-700" />
             <span className="text-[12px] font-black text-zinc-500 uppercase tracking-widest">Biological Processing</span>
          </div>
          <p className="text-4xl font-black text-white italic tracking-tighter">16.6ms</p>
          <p className="text-[10px] text-zinc-700 font-bold uppercase leading-none">60Hz Threshold</p>
        </div>
        <div className="space-y-3 text-right">
          <div className="flex items-center gap-3 justify-end">
             <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: accentColor }}>Vigil Interception</span>
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
          </div>
          <p className="text-5xl font-black italic tracking-tighter" style={{ color: accentColor }}>12.0ms</p>
          <p className="text-[10px] font-bold uppercase leading-none" style={{ color: `${accentColor}88` }}>SUB-FRAME_VALIDATED</p>
        </div>
      </div>
    </div>

    <div className="absolute bottom-4 right-10 flex items-center gap-4 opacity-30">
       <Ruler size={12} className="text-zinc-500" />
       <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.5em]">SYSTEM_VERSION: X-VG-12-FINAL</span>
    </div>
  </div>
);

interface TacticalContainerProps {
  children: React.ReactNode;
  className?: string;
  defaultHeight?: number;
}

const TacticalContainer: React.FC<TacticalContainerProps> = ({ children, className = "", defaultHeight }) => {
  const [height, setHeight] = useState(defaultHeight || 0);
  const [isResizing, setIsResizing] = useState(false);
  const startYRef = useRef(0);
  const startHRef = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startYRef.current = e.clientY;
    startHRef.current = height || 0;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(100, startHRef.current + deltaY);
      setHeight(newHeight);
    };
    const onMouseUp = () => setIsResizing(false);
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing]);

  return (
    <div 
      className={`relative group/tactical transition-all duration-300 ${className} ${isResizing ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''}`}
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      <div className="h-full w-full overflow-hidden">
        {children}
      </div>
      
      <div 
        onMouseDown={onMouseDown}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-4 cursor-ns-resize flex flex-col items-center justify-center gap-0.5 opacity-0 group-hover/tactical:opacity-100 transition-opacity z-[100]"
      >
        <div className="w-8 h-[1px] bg-zinc-700" />
        <div className="w-8 h-[1px] bg-zinc-900" />
      </div>
    </div>
  );
};

export const SocialIntelligenceLab: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<EngineType>('BRUTALIST');
  const [activeLayout, setActiveLayout] = useState<LayoutType>(PRESETS[0].layout);
  const [title, setTitle] = useState(PRESETS[0].title);
  const [sub, setSub] = useState(PRESETS[0].sub);
  const [leftLabel, setLeftLabel] = useState(PRESETS[0].leftLabel);
  const [leftValue, setLeftValue] = useState(PRESETS[0].leftValue);
  const [rightLabel, setRightLabel] = useState(PRESETS[0].rightLabel);
  const [rightValue, setRightValue] = useState(PRESETS[0].rightValue);
  const [summary, setSummary] = useState(PRESETS[0].summary);
  const [statusCode, setStatusCode] = useState(PRESETS[0].statusCode);
  const [accentColor, setAccentColor] = useState(PRESETS[0].accent);
  const [isExporting, setIsExporting] = useState(false);
  const [isMotionFocus, setIsMotionFocus] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(1);
  const [analogJitter, setAnalogJitter] = useState(false);
  
  const captureRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!captureRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 300));
    try {
      // @ts-ignore
      const canvas = await window.html2canvas(captureRef.current, {
        backgroundColor: '#050505',
        scale: 3, 
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const link = document.createElement('a');
      link.download = `VIGIL_TACTICAL_REPORT_${activeEngine}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Export failure:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const applyPreset = (p: Preset) => {
    setActiveLayout(p.layout);
    setTitle(p.title);
    setSub(p.sub);
    setLeftLabel(p.leftLabel);
    setLeftValue(p.leftValue);
    setRightLabel(p.rightLabel);
    setRightValue(p.rightValue);
    setSummary(p.summary);
    setStatusCode(p.statusCode);
    setAccentColor(p.accent);
  };

  const getAccentHex = () => {
    switch (accentColor) {
      case 'RED': return '#ef4444';
      case 'EMERALD': return '#10b981';
      case 'CYAN': return '#06b6d4';
      default: return '#3b82f6';
    }
  };

  const renderLayoutContent = () => {
    switch (activeLayout) {
      case 'RETINAL_AUTOPSY':
        return (
          <div className="relative z-10 flex flex-col h-full animate-in fade-in duration-1000">
             <div className="flex justify-between items-start mb-8 shrink-0">
                <div className="space-y-4">
                   <div className="px-6 py-2 bg-red-600/10 border border-red-500/30 rounded-lg inline-block">
                      <span className="text-[14px] font-black text-red-500 uppercase tracking-widest">{sub}</span>
                   </div>
                   <h2 className="text-[7.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] whitespace-pre-line">
                      {title}
                   </h2>
                </div>
                <div className="scale-[0.8] origin-top-right">
                   <BrandBlock color="white" />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-12 flex-1 items-stretch min-h-0">
                {/* PERCEPTION SIDE */}
                <div className="relative flex flex-col bg-zinc-950 border border-zinc-900 rounded-[3.5rem] overflow-hidden group/side">
                   <div className="p-8 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                            <Eye size={16} />
                         </div>
                         <span className="text-[16px] font-black text-zinc-400 uppercase tracking-[0.4em]">{leftLabel}</span>
                      </div>
                      <TechLabel text="BIOLOGICAL_INPUT" color="zinc" />
                   </div>
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10">
                      <div className="space-y-6 w-full">
                         <div className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{leftLabel === 'SACCADIC_SKIP' || leftValue === '1yr Maturity' ? 'Cognitive Shortcut Observed' : 'Cognitive Capture Active'}</div>
                         <div className="p-10 bg-black border border-zinc-900 rounded-[2.5rem] font-mono text-3xl tracking-tighter flex items-center justify-center gap-2">
                            {leftValue === 'Moonshot Hype' ? (
                                <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">MOONSHOT_HALLUCINATION</span>
                            ) : leftValue === '1yr Maturity' ? (
                                <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">MATURE_SAFE_SIGNAL</span>
                            ) : (
                                <>
                                    <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">Ab1C</span>
                                    <span className="text-zinc-900 blur-md opacity-20 px-4">92kLp6mX9wR7yT5vB4nQ8jK3</span>
                                    <span className="text-emerald-500 font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">Zz90</span>
                                </>
                            )}
                         </div>
                         <p className="text-4xl text-zinc-600 font-black uppercase italic px-6 leading-[1.1]">
                            {leftValue === 'Moonshot Hype' ? '"Retina fixed on candle velocity. Scrutiny threshold: bypassed."' : leftValue === '1yr Maturity' ? '"The brain assumes safety based on provenance, skipping structural verification."' : '"The eye prioritized edge anchors, assuming historical parity."'}
                         </p>
                      </div>
                   </div>
                </div>

                {/* REALITY SIDE */}
                <div className="relative flex flex-col bg-zinc-950 border border-red-900/40 rounded-[3.5rem] overflow-hidden group/side">
                   <div className="p-8 border-b border-red-900/20 flex items-center justify-between bg-red-900/5">
                      <div className="flex items-center gap-4">
                         <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500">
                            <Skull size={16} />
                         </div>
                         <span className="text-[16px] font-black text-red-500 uppercase tracking-[0.4em]">{rightLabel}</span>
                      </div>
                      <TechLabel text="FORENSIC_TRUTH" color="red" />
                   </div>
                   <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10">
                      <div className="space-y-6 w-full">
                         <div className="text-[10px] font-black text-red-700 uppercase tracking-widest animate-pulse">
                            {rightValue === 'Bundled Supply' || rightValue === 'Systemic Trap' ? 'Supply Manipulation Analysis' : 'Poison Mimic Identified'}
                         </div>
                         <div className="p-10 bg-black border border-red-900/30 rounded-[2.5rem] font-mono text-3xl tracking-tighter flex items-center justify-center gap-2 animate-haptic-shake">
                            {rightValue === 'Bundled Supply' ? (
                                <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)]">92% CLUSTERED BUNDLE</span>
                            ) : rightValue === 'Systemic Trap' ? (
                                <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)]">SINGLE ENTITY EXIT</span>
                            ) : (
                                <>
                                    <span className="text-zinc-500">Ab1C</span>
                                    <span className="text-red-500 font-black shadow-[0_0_30px_rgba(239,68,68,0.5)] bg-red-500/5 px-4 rounded-lg">000000X99120817</span>
                                    <span className="text-zinc-500">Zz90</span>
                                </>
                            )}
                         </div>
                         <p className="text-4xl text-red-400 font-black uppercase italic px-6 leading-[1.1]">
                            {rightValue === 'Bundled Supply' ? '"Mother-Wallet identified. Multi-threaded funding loop neutralised."' : rightValue === 'Systemic Trap' ? '"Insider holding exceeds liquidity floor. Age is a mask for manipulation."' : '"Cryptography is correct. Intent is mismatched."'}
                         </p>
                      </div>
                   </div>
                   
                   {/* INTENT MISMATCH STAMP */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] z-30 pointer-events-none opacity-0 group-hover/side:opacity-100 transition-opacity duration-500">
                      <div className="px-12 py-8 border-[8px] border-red-600 text-red-600 rounded-[2rem] font-black text-6xl uppercase tracking-tighter shadow-[0_0_80px_rgba(239,68,68,0.4)] bg-black/60 backdrop-blur-md">
                         [!] {rightValue === 'Bundled Supply' || rightValue === 'Systemic Trap' ? 'CONCENTRATION_TRAP' : 'INTENT_MISMATCH'}
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-zinc-900 flex justify-between items-end shrink-0">
                <div className="flex-1 max-w-4xl">
                   <p className="text-4xl text-zinc-500 font-medium italic leading-relaxed">
                      "{summary}"
                   </p>
                </div>
                <div className="text-right ml-12">
                   <div className="text-[11px] font-black text-zinc-700 uppercase tracking-[0.6em] mb-1">VIG_FORENSIC_UNIT</div>
                   <div className="text-2xl font-black text-red-600 uppercase italic tracking-widest">{statusCode}</div>
                </div>
             </div>
          </div>
        );
      case 'BENCHMARK':
        return (
          <div className="relative z-10 flex flex-col h-full justify-center space-y-10 animate-in fade-in duration-1000">
             <div className="absolute top-0 right-0 scale-[0.75] origin-top-right">
                <BrandBlock color="white" />
             </div>

             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                      <ActivityIcon size={16} style={{ color: getAccentHex() }} />
                   </div>
                   <span className="text-[14px] font-black text-zinc-500 uppercase tracking-[0.6em]">{sub}</span>
                </div>
                <h2 className="text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.9] whitespace-pre-line drop-shadow-2xl">
                   {title}
                </h2>
             </div>

             <div className="w-full">
                <LatencyDiagram accentColor={getAccentHex()} />
             </div>

             <div className="grid grid-cols-12 gap-12 items-end">
                <div className="col-span-8">
                   <p className="text-xl text-zinc-400 font-medium italic leading-relaxed border-l-4 pl-8" style={{ borderColor: getAccentHex() }}>
                      "{summary}"
                   </p>
                </div>
                <div className="col-span-4 text-right">
                   <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-1">EXECUTION_VERDICT</div>
                   <div className="text-xl font-black uppercase italic tracking-widest" style={{ color: getAccentHex() }}>{statusCode}</div>
                </div>
             </div>
          </div>
        );
      case 'MANIFESTO':
        return (
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center space-y-12 animate-in fade-in duration-700">
             <div className="space-y-4">
                <div className="flex items-center justify-center gap-6">
                   <div className="h-[1px] w-16 bg-zinc-800" />
                   <span className="text-[16px] font-black text-zinc-500 uppercase tracking-[1em]">{sub}</span>
                   <div className="h-[1px] w-16 bg-zinc-800" />
                </div>
                <h2 className="text-[8.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line drop-shadow-2xl">
                   {title}
                </h2>
             </div>
             
             <TacticalContainer className="max-w-4xl w-full p-12 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] relative overflow-hidden group" defaultHeight={280}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                <p className="text-4xl text-zinc-300 font-medium italic leading-snug">
                   "{summary}"
                </p>
             </TacticalContainer>

             <div className="pt-8 flex items-center gap-10">
                <div className="flex items-center gap-4">
                   <Lock className="w-8 h-8 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                   <span className="text-[14px] font-black text-zinc-600 uppercase tracking-[0.4em]">{statusCode}</span>
                </div>
             </div>
          </div>
        );
      case 'COMPARISON':
        return (
          <div className="relative z-10 flex flex-col h-full animate-in slide-in-from-left-4 duration-700">
             <div className="space-y-4 mb-16">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded bg-red-600 flex items-center justify-center text-black">
                      <Radio size={28} />
                   </div>
                   <span className="text-[16px] font-black text-zinc-500 uppercase tracking-[0.8em]">{sub}</span>
                </div>
                <h2 className="text-[7rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] whitespace-pre-line">
                   {title}
                </h2>
             </div>

             <div className="grid grid-cols-2 gap-16 flex-1">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="h-0.5 flex-1 bg-zinc-900" />
                      <span className="text-[14px] font-black text-zinc-600 uppercase tracking-[0.4em]">{leftLabel}</span>
                   </div>
                   <div className="p-12 bg-[#0a0a0a] border border-zinc-800 rounded-[3rem] shadow-inner relative group">
                      <p className="text-4xl font-black text-zinc-500 uppercase italic leading-none">{leftValue}</p>
                      <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-20 transition-opacity">
                         <EyeOff size={40} />
                      </div>
                   </div>
                </div>
                
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <span className="text-[14px] font-black text-zinc-500 uppercase tracking-[0.4em]" style={{ color: getAccentHex() }}>{rightLabel}</span>
                      <div className="h-0.5 flex-1 bg-zinc-900" />
                   </div>
                   <div className="p-12 bg-[#0a0a0a] rounded-[3rem] shadow-2xl relative border-2" style={{ borderColor: `${getAccentHex()}44` }}>
                      <p className="text-4xl font-black italic leading-none" style={{ color: getAccentHex() }}>{rightValue}</p>
                      <div className="absolute top-4 right-6 opacity-10 animate-pulse">
                         <Zap size={40} fill={getAccentHex()} color={getAccentHex()} />
                      </div>
                   </div>
                </div>
             </div>

             <TacticalContainer className="pt-12 border-t border-zinc-900 flex items-end justify-between w-full" defaultHeight={160}>
                <div className="flex items-start gap-10 max-w-4xl">
                   <Fingerprint className="w-16 h-16 text-zinc-800" strokeWidth={0.5} />
                   <p className="text-[20px] text-zinc-500 font-bold tracking-tight leading-relaxed max-w-3xl italic">
                      {summary}
                   </p>
                </div>
                <div className="text-right shrink-0">
                   <div className="text-[11px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-1">VIG_INTEL_SYSTEM</div>
                   <div className="text-[14px] font-black uppercase italic tracking-widest" style={{ color: getAccentHex() }}>{statusCode}</div>
                </div>
             </TacticalContainer>
          </div>
        );
      case 'ARCHITECTURE':
        return (
          <div className="relative z-10 flex flex-col h-full animate-in zoom-in duration-1000">
             <div className="flex justify-between items-start mb-20">
                <div className="space-y-4">
                   <div className="px-6 py-2 bg-zinc-950 border border-zinc-800 rounded-lg inline-block">
                      <span className="text-[14px] font-black text-zinc-500 uppercase tracking-widest">{sub}</span>
                   </div>
                   <h2 className="text-[8rem] font-black text-white italic uppercase tracking-tighter leading-[0.75] whitespace-pre-line">
                      {title}
                   </h2>
                </div>
             </div>

             <div className="grid grid-cols-12 gap-12 items-center flex-1">
                <TacticalContainer className="col-span-8 p-12 bg-white/[0.02] border border-white/10 rounded-[4rem] backdrop-blur-3xl space-y-10" defaultHeight={400}>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                         <Cpu className="w-8 h-8 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
                      </div>
                      <div className="space-y-1">
                         <div className="text-[14px] font-black text-cyan-500 uppercase tracking-[0.3em]">Module Specifications</div>
                         <div className="text-3xl font-black text-white italic">{statusCode}</div>
                      </div>
                   </div>
                   <p className="text-3xl text-zinc-400 font-medium italic leading-relaxed">
                      {summary}
                   </p>
                </TacticalContainer>
                
                <div className="col-span-4 space-y-4">
                   {[
                      { l: leftLabel, v: leftValue, i: <Layers size={24} /> },
                      { l: rightLabel, v: rightValue, i: <Radio size={24} /> },
                      { l: 'VERDICT_STATE', v: 'ISOLATED', i: <ShieldCheck size={24} /> }
                   ].map((pod, i) => (
                     <div key={i} className="p-8 bg-black/40 border border-zinc-900 rounded-2xl space-y-2 flex flex-col items-center text-center group hover:border-zinc-700 transition-all">
                        <div className="text-zinc-600 mb-2 group-hover:text-cyan-500 transition-colors">{pod.i}</div>
                        <div className="text-[12px] font-black text-zinc-700 uppercase tracking-widest">{pod.l}</div>
                        <div className="text-2xl font-bold text-zinc-300 uppercase">{pod.v}</div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-12 pt-12 border-t border-zinc-900 flex justify-between items-end">
                <div className="text-[14px] font-black text-zinc-800 uppercase tracking-[1em]">VIGIL_LAYER_BLUEPRINT</div>
                <div className="flex items-center gap-4 text-[14px] font-black text-zinc-700 uppercase tracking-widest">
                   <Activity size={18} className="text-emerald-500" /> SYSTEM_PARITY_VERIFIED
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`space-y-16 max-w-[1500px] mx-auto selection:bg-red-500/20 px-6 transition-all duration-700 ${isMotionFocus ? 'bg-black pt-10' : ''}`}
    >
      
      {!isMotionFocus && (
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-zinc-900 pb-12 animate-in fade-in duration-700">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-zinc-900" />
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em]">Visual Intelligence Unit // Asset Forge</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
              Comms <br/> Terminal.
            </h2>
            <p className="text-zinc-500 text-lg font-medium italic max-w-xl">
              "Construct evidence-based infographics for your narrative. Visual integrity is the ultimate validator."
            </p>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${isMotionFocus ? 'xl:grid-cols-1' : 'xl:grid-cols-12'} gap-12 items-start`}>
        
        {/* EDITOR SIDEBAR */}
        {!isMotionFocus && (
          <div className="xl:col-span-4 space-y-8 h-full animate-in slide-in-from-left-4 duration-700">
             <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] space-y-10 shadow-2xl">
                
                {/* FORGE ENGINE SELECTOR */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Cpu className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Infographic Engine</span>
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'BRUTALIST', icon: <TerminalIcon size={12} />, label: 'Brutalist' },
                        { id: 'ISOMETRIC', icon: <Box size={12} />, label: 'Isometric' },
                        { id: 'REFRACTIVE', icon: <Glasses size={12} />, label: 'Refractive' },
                        { id: 'MESH', icon: <Waves size={12} />, label: 'Neural Mesh' }
                      ].map((eng) => (
                        <button 
                          key={eng.id}
                          onClick={() => setActiveEngine(eng.id as EngineType)}
                          className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all flex items-center justify-between ${activeEngine === eng.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'}`}
                        >
                          {eng.icon} {eng.label}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <Bookmark className="w-3.5 h-3.5 text-zinc-600" />
                      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Narrative Presets</span>
                   </div>
                   <div className="grid grid-cols-1 gap-2">
                      {PRESETS.map((p) => (
                        <button 
                          key={p.id}
                          onClick={() => applyPreset(p)}
                          className={`p-4 text-left rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex justify-between items-center ${
                            title === p.title ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-black border-zinc-900 text-zinc-600 hover:border-zinc-700'
                          }`}
                        >
                          {p.label}
                          {title === p.title && <Zap size={12} className="fill-current" />}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Settings2 className="w-4 h-4 text-zinc-600" />
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Canvas Variables</span>
                      </div>
                      <div className="p-1 bg-black border border-zinc-900 rounded-lg flex gap-1">
                         {(['RED', 'BLUE', 'EMERALD', 'CYAN'] as const).map(c => (
                           <button 
                              key={c}
                              onClick={() => setAccentColor(c)}
                              className={`w-4 h-4 rounded-full transition-all ${
                                accentColor === c ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                              } ${
                                c === 'RED' ? 'bg-red-500' : c === 'BLUE' ? 'bg-blue-500' : c === 'EMERALD' ? 'bg-emerald-500' : c === 'CYAN' ? 'bg-cyan-500' : ''
                              }`}
                           />
                         ))}
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Layout</label>
                         <div className="grid grid-cols-2 gap-2">
                            {(['COMPARISON', 'MANIFESTO', 'ARCHITECTURE', 'BENCHMARK', 'RETINAL_AUTOPSY'] as LayoutType[]).map(l => (
                              <button 
                                key={l}
                                onClick={() => setActiveLayout(l)}
                                className={`py-2 px-1 rounded-lg border text-[8px] font-black uppercase tracking-all ${activeLayout === l ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-black border-zinc-900 text-zinc-600'}`}
                              >
                                {l.replace('_', ' ')}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="space-y-1.5">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Post Title</label>
                         <textarea value={title} onChange={(e) => setTitle(e.target.value.toUpperCase())} className="w-full h-20 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-zinc-300 focus:border-red-600 outline-none resize-none uppercase" />
                      </div>

                      <div className="space-y-1.5 pt-2">
                         <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Plain English Summary</label>
                         <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full h-32 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[10px] font-mono text-zinc-300 focus:border-blue-600 outline-none resize-none italic" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <button 
                     onClick={handleExport}
                     disabled={isExporting}
                     className="w-full py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                   >
                     {isExporting ? <Activity className="w-5 h-5 animate-spin" /> : <><Download className="w-5 h-5" /> EXPORT TECHNICAL_REPORT</>}
                   </button>
                   
                   <button 
                     onClick={() => setIsMotionFocus(true)}
                     className="w-full py-4 bg-zinc-950 border border-zinc-900 text-zinc-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:bg-zinc-900 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                   >
                     <Video className="w-4 h-4" /> MOTION CAPTURE MODE
                   </button>

                   <p className="text-center text-[9px] font-black text-zinc-700 uppercase tracking-widest flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" /> PNG: 1200x675 // WEBM: Master Loop
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* CANVAS PREVIEW AREA */}
        <div className={`${isMotionFocus ? 'col-span-full' : 'xl:col-span-8'} flex flex-col items-center animate-in fade-in zoom-in duration-700 relative`}>
           
           <div className={`relative group w-full flex justify-center border-2 ${isMotionFocus ? 'border-red-900/40' : 'border-zinc-900'} rounded-[3.5rem] bg-black p-4 md:p-12 overflow-hidden shadow-inner min-h-[500px]`}>
              <div 
                ref={captureRef}
                className={`bg-[#050505] rounded-[3.5rem] border border-zinc-900 relative overflow-hidden flex flex-col p-12 justify-center shadow-[0_40px_150px_rgba(0,0,0,1)] shrink-0 
                  ${analogJitter ? 'animate-analog-jitter' : ''}
                `}
                style={{ 
                  width: '1200px', 
                  height: '675px', 
                  transform: 'scale(var(--canvas-scale))', 
                  transformOrigin: 'center',
                  perspective: '1500px'
                }}
              >
                 <style>{`
                   :root { --canvas-scale: 0.65; --motion-vel: ${4 / motionIntensity}s; }
                   @media (max-width: 1500px) { --canvas-scale: 0.55; }
                   @media (max-width: 1350px) { --canvas-scale: 0.45; }
                   @media (max-width: 1024px) { --canvas-scale: 0.4; }
                   @media (max-width: 768px) { --canvas-scale: 0.28; }
                   @media (max-width: 500px) { --canvas-scale: 0.22; }
                   
                   @keyframes scan-line {
                     0% { transform: translateY(-100%); }
                     100% { transform: translateY(1500%); }
                   }
                   .animate-scan-line { animation: scan-line var(--motion-vel) linear infinite; }
                   .engine-isometric { transform: rotateX(25deg) rotateY(-25deg) rotateZ(5deg); }
                   .engine-mesh { background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px; }
                 `}</style>

                 <div className={`absolute inset-0 opacity-[0.05] pointer-events-none bg-[size:50px_50px] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]`} />
                 
                 {/* INTENSIFIED AMBIENT GLOW */}
                 <div 
                   className="absolute -top-[150px] -right-[150px] w-[600px] h-[600px] blur-[160px] opacity-40 pointer-events-none transition-colors duration-1000 animate-pulse"
                   style={{ backgroundColor: getAccentHex() }}
                 />
                 <div 
                   className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] blur-[140px] opacity-20 pointer-events-none transition-colors duration-1000"
                   style={{ backgroundColor: getAccentHex() }}
                 />

                 <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-10 shadow-[0_0_25px_white] pointer-events-none animate-scan-line" />

                 <div className={`h-full w-full relative z-10 transition-all duration-1000 
                   ${activeEngine === 'ISOMETRIC' ? 'engine-isometric' : ''}
                   ${activeEngine === 'MESH' ? 'engine-mesh' : ''}
                 `}>
                    {renderLayoutContent()}
                 </div>

                 <div className="absolute bottom-16 right-20 flex items-center gap-10 opacity-30 pointer-events-none">
                    <div className="text-right">
                       <div className="text-[11px] font-black uppercase tracking-widest text-zinc-400">SYS_REF</div>
                       <div className="text-[9px] font-mono text-zinc-500">X-VG-12-COMMS-2026</div>
                    </div>
                    <div className="h-8 w-[1px] bg-zinc-800" />
                    <div className="text-right">
                       <div className="text-[11px] font-black uppercase tracking-widest text-zinc-400">ENCRYPTION</div>
                       <div className="text-[9px] font-mono text-zinc-500">AES-256-L0.5</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
