import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Terminal, ShieldAlert, ShieldCheck, Search, Binary, AlertTriangle, CheckCircle2, Info, UserPlus, Globe, MessageSquare, ExternalLink, Activity, Zap, ClipboardPaste, Clock, ShieldQuestion, Wifi, ShieldX, Scan, AlertOctagon, Scale, X, Fingerprint, Database, HelpCircle, History, MousePointerClick, Brain, Skull, Radar, Eye, Calculator, ChevronRight, BarChart3, RotateCcw, Target, Timer, Gauge, FileText, User, Lock, TrendingUp } from 'lucide-react';
import { analyzeSecurityIntent, ThreatAnalysisResponse, IntentCategory, UsageData } from '../services/geminiService';
import { AddressGlyph } from './AddressGlyph';
import { VigilScanner } from './VigilScanner';
import { TechLabel, TechNote } from './docs/DocHelpers';

interface TIMAxes {
  vsi: number; edi: number; pdi: number; cri: number; ipi: number; rii: number; eii: number;
}

interface IntentValidatorDemoProps {
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}

/**
 * MODAL A: THREAT INDEX CALCULATIONS
 */
const ThreatIndexModal: React.FC<{ isOpen: boolean; onClose: () => void; axes: TIMAxes; totalIndex: number; address: string }> = ({ isOpen, onClose, axes, totalIndex, address }) => {
  if (!isOpen) return null;
  const axisDefinitions = [
    { id: 'VSI', label: 'Visual Similarity', score: axes.vsi, weight: 0.20, desc: 'Prefix/suffix collisions and character overlap risk.' },
    { id: 'EDI', label: 'Entropy Deviation', score: axes.edi, weight: 0.15, desc: 'Likelihood of vanity/non-random generation.' },
    { id: 'PDI', label: 'Provenance Depth', score: axes.pdi, weight: 0.15, desc: 'Address age and recurring interaction history.' },
    { id: 'CRI', label: 'Context Risk', score: axes.cri, weight: 0.15, desc: 'Source vulnerability (DM, Clipboard, or UI).' },
    { id: 'IPI', label: 'Interaction Pattern', score: axes.ipi, weight: 0.15, desc: 'Evidence of dust transfers or zero-value injections.' },
    { id: 'RII', label: 'Registry Integrity', score: axes.rii, weight: 0.10, desc: 'Mint authenticity vs official Circle/Solana registry.' },
    { id: 'EII', label: 'Execution Integrity', score: axes.eii, weight: 0.10, desc: 'Real-time clipboard mutation or DOM swap events.' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-4xl bg-[#050505] border border-zinc-800 rounded-[3rem] p-8 md:p-14 relative shadow-2xl my-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-red-600 opacity-40" />
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-500 hover:text-white transition-colors z-50"><X className="w-8 h-8" /></button>
        
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-zinc-900 pb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TechLabel text="CORE_THREAT_CALCULATION" color="red" />
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest italic">VIG-THREAT-MATRIX-v1.2</span>
              </div>
              <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter">Heuristic Audit.</h3>
              <p className="font-mono text-xs text-zinc-500">Vector Breakdown: {address.slice(0, 12)}...</p>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-black text-zinc-500 uppercase tracking-widest mb-1">Composite Index</div>
              <div className={`text-6xl md:text-8xl font-black italic tracking-tighter ${totalIndex > 75 ? 'text-red-500' : totalIndex > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>{totalIndex}%</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] border-b border-zinc-900 pb-4">
              <div className="col-span-2">Axis ID</div>
              <div className="col-span-4">Factor Definition</div>
              <div className="col-span-4 text-center">Heuristic Distribution</div>
              <div className="col-span-2 text-right">Contribution</div>
            </div>
            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {axisDefinitions.map((axis) => {
                const contribution = (axis.score * axis.weight).toFixed(1);
                const isCritical = axis.score >= 90;
                return (
                  <div key={axis.id} className="grid grid-cols-12 gap-4 items-center p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl group hover:border-zinc-700 transition-all">
                    <div className={`col-span-2 font-mono text-[11px] font-black ${isCritical ? 'text-red-500' : 'text-zinc-600'}`}>{axis.id}</div>
                    <div className="col-span-4">
                      <div className="text-[11px] font-black text-white uppercase tracking-tight">{axis.label}</div>
                      <div className="text-[9px] text-zinc-500 font-bold uppercase italic mt-0.5 leading-tight">{axis.desc}</div>
                    </div>
                    <div className="col-span-4">
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <div className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-700'}`} style={{ width: `${axis.score}%` }} />
                      </div>
                      <div className="text-center text-[10px] font-mono text-zinc-700 mt-1.5">{axis.score}/100</div>
                    </div>
                    <div className={`col-span-2 text-right font-mono text-[13px] font-black ${isCritical ? 'text-red-500' : 'text-white'}`}>+{contribution}%</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <TechNote title="CALCULATION NOTE">
            Weighting is derived from Project Mirror saccadic study datasets. RII (Registry) and EII (Execution) axes trigger immediate 100% overrides upon confirmation of protocol breach.
          </TechNote>
        </div>
      </div>
    </div>,
    document.body
  );
};

/**
 * MODAL B: IDENTITY PROFILE
 * Redesigned to exactly match provided visual reference.
 */
const IdentityProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; address: string; threatIndex: number }> = ({ isOpen, onClose, address, threatIndex }) => {
  if (!isOpen) return null;

  // Mocked signals derived from the image provided
  const telemetryReadouts = [
    { label: 'TRANSACTION HISTORY', val: 'ACTIVE', state: 'POSITIVE' },
    { label: 'LIQUIDITY INTERACTION', val: 'UNVERIFIED POOLS', state: 'NEGATIVE' },
    { label: 'IDENTITY VERIFICATION', val: 'NONE', state: 'NEUTRAL' },
    { label: 'ASSET PROFILE', val: 'HIGH VOLATILITY', state: 'NEGATIVE' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
      <div className="w-full max-w-[800px] bg-[#050505] border border-zinc-800 rounded-[2.5rem] p-8 md:p-14 relative shadow-2xl my-auto overflow-hidden">
        {/* Subtle top/side lighting */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-600 hover:text-white transition-colors z-50">
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="space-y-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex items-center gap-6">
              {/* Custom Hexagon Icon from Image */}
              <div className="relative">
                <div className="w-16 h-16 bg-[#ff4d4d] flex items-center justify-center shadow-[0_0_40px_rgba(255,77,77,0.3)]" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}>
                   <div className="absolute bottom-1 right-[-4px] w-6 h-6 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center">
                     <User size={12} className="text-zinc-500" />
                   </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Mesh Identification</div>
                <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">Identity Profile</h3>
                <div className="font-mono text-[10px] md:text-xs text-zinc-600 mt-1">{address.slice(0, 16)}...{address.slice(-16)}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Resilience Score</div>
              <div className="text-6xl md:text-7xl font-black italic tracking-tighter text-[#ff4d4d]">
                {threatIndex}%
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-zinc-900/50" />

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Column: Synthesis & Verdict */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Sentinel Synthesis</span>
                </div>
                <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2rem] relative group min-h-[300px] flex flex-col justify-center">
                   <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FileText size={48} className="text-white" />
                   </div>
                   <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed italic pr-4">
                     "The address <span className="text-zinc-500 break-all">{address}</span> demonstrates consistent activity patterns on the Solana network. While not explicitly blacklisted, the high frequency of small-value swaps and interactions with unverified SPL tokens indicate a low-trust profile associated with automated liquidity provision or potential sybil activity."
                   </p>
                </div>
              </div>

              <div className="p-8 bg-[#0a0a0a] border border-zinc-900 rounded-[2.5rem] space-y-4">
                 <div className="flex items-center gap-3 text-[#ff4d4d]">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Current Verdict</span>
                 </div>
                 <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">Neutral</h4>
              </div>
            </div>

            {/* Right Column: Telemetry */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-4">Telemetry Readouts</h4>
                <div className="space-y-3">
                  {telemetryReadouts.map((readout, i) => (
                    <div key={i} className="p-6 bg-[#0a0a0a] border border-zinc-800 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all shadow-inner">
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">{readout.label}</span>
                        <span className="text-sm md:text-base font-black text-white uppercase italic">{readout.val}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full shadow-[0_0_12px_currentColor] ${
                        readout.state === 'POSITIVE' ? 'text-emerald-500' : readout.state === 'NEGATIVE' ? 'text-red-500' : 'text-blue-500'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-zinc-700" />
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">History Check</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase italic">PASS</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">Entropy</span>
                    <span className="text-[10px] font-black text-zinc-400 uppercase italic">HIGH</span>
                  </div>
                  <Lock className="w-4 h-4 text-zinc-700" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-zinc-900/50" />

          {/* Footer Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-2">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <Globe className="text-cyan-500 animate-spin-slow" size={24} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">Mesh Synchronization</p>
                   <p className="text-[11px] text-zinc-700 font-bold uppercase italic">VIG-NODE-8821 // LIVE</p>
                </div>
             </div>
             <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-10 py-5 bg-[#1a0a0a] border border-red-900/40 text-red-500 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-900 hover:text-white transition-all shadow-2xl">
                  Report Identity Clash
                </button>
                <button onClick={onClose} className="flex-1 md:flex-none px-10 py-5 bg-black border border-zinc-800 text-zinc-500 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:text-white hover:bg-zinc-900 transition-all">
                  New Scan
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const IntentValidatorDemo: React.FC<IntentValidatorDemoProps> = ({ onUsageUpdate, onScanningChange }) => {
  const [historyAddr, setHistoryAddr] = useState('Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90');
  const [currentAddr, setCurrentAddr] = useState('');
  const [source, setSource] = useState<'EXPLORER' | 'SOCIAL' | 'DAPP'>('EXPLORER');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [completedSims, setCompletedSims] = useState<Set<string>>(new Set());
  
  const [isThreatModalOpen, setIsThreatModalOpen] = useState(false);
  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false);

  const [holdProgress, setHoldProgress] = useState(0);
  const [simLatency, setSimLatency] = useState(12.1);
  const holdTimerRef = useRef<number | null>(null);
  const [result, setResult] = useState<(ThreatAnalysisResponse & { telemetry?: { age: string; lastTx: string; activity15d: string; latency?: number }; threatIndex?: number; axes?: TIMAxes; projectName?: string; contractAddress?: string; }) | null>(null);

  const testScenarios = [
    { id: 'TRUSTED', label: 'Test Trusted', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz90', telemetry: { age: '1,204 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 5, edi: 0, pdi: 10, cri: 0, ipi: 0, rii: 0, eii: 0 } },
    { id: 'POISON', label: 'Visual Poisoning', addr: 'Ab1C00000000000000000000000000Zz90', telemetry: { age: '2,401 Days', lastTx: '14m ago', activity15d: '402' }, axes: { vsi: 95, edi: 92, pdi: 50, cri: 30, ipi: 80, rii: 0, eii: 0 } },
    { id: 'ACCUMULATION_TRAP', label: 'Stealth Accumulation', addr: 'VigAccNodeX772199291120038xPoisoN', projectName: 'STEALTH_LIQUIDITY_CORE', contractAddress: 'VigAccNodeX772199291120038xPoisoN', telemetry: { age: '340 Days', lastTx: 'New', activity15d: '1,200' }, axes: { vsi: 20, edi: 85, pdi: 40, cri: 80, ipi: 95, rii: 0, eii: 0 } },
    { id: 'MARKET_INTEL', label: 'Pump.fun Rug-Risk', addr: 'Rug44DeployerX992811x772199291120038', projectName: 'RUG_PUMP_EXPERIMENTAL', contractAddress: 'Rug44DeployerX992811x772199291120038', telemetry: { age: '4 Minutes', lastTx: 'New', activity15d: '142' }, axes: { vsi: 20, edi: 98, pdi: 100, cri: 90, ipi: 80, rii: 0, eii: 0 } },
    { id: 'PHISHING', label: 'Phishing Shield', addr: '6vX9f72Lp6mX9wR7yT5vB4nQ8jK3mZzM1', telemetry: { age: '3 Days', lastTx: 'Never', activity15d: '1' }, axes: { vsi: 30, edi: 0, pdi: 100, cri: 100, ipi: 0, rii: 0, eii: 0 } },
    { id: 'DUST', label: 'Dust Injection', addr: 'Dust99kLp6mX9wR7yT5vB4nQ8jK3mZzDust', telemetry: { age: '42 Days', lastTx: '14d ago', activity15d: '1' }, axes: { vsi: 50, edi: 40, pdi: 60, cri: 30, ipi: 100, rii: 0, eii: 0 } },
    { id: 'NEW', label: 'New Provenance', addr: '5U398zH6pA2wM1nL9xT4vR7yB8jK2mQ5v', telemetry: { age: '1 Day', lastTx: 'New', activity15d: '0' }, axes: { vsi: 10, edi: 0, pdi: 100, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'SIMILARITY', label: 'Similarity/Entropy', addr: 'Ab1C92kLp6mX9wR7yT5vB4nQ8jK3mZz91', telemetry: { age: '891 Days', lastTx: '2h ago', activity15d: '82' }, axes: { vsi: 85, edi: 60, pdi: 30, cri: 30, ipi: 10, rii: 0, eii: 0 } },
    { id: 'MINT', label: 'Mint Mismatch', addr: 'EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3', telemetry: { age: '12 Days', lastTx: '3h ago', activity15d: '1,209' }, axes: { vsi: 20, edi: 0, pdi: 80, cri: 30, ipi: 10, rii: 100, eii: 0 } },
    { id: 'CLIPBOARD', label: 'Clipboard Intercept', addr: 'Sol1Restored92kLp6mX9wR7yT5vB4nQ8jK3', telemetry: { age: '1,102 Days', lastTx: '12m ago', activity15d: '55' }, axes: { vsi: 10, edi: 0, pdi: 70, cri: 90, ipi: 10, rii: 0, eii: 100 } }
  ];

  const calculateThreatIndex = (axes: TIMAxes) => {
    if (axes.rii === 100 || axes.eii === 100) return 100;
    let total = (0.20 * axes.vsi + 0.15 * axes.edi + 0.15 * axes.pdi + 0.15 * axes.cri + 0.15 * axes.ipi + 0.10 * axes.rii + 0.10 * axes.eii);
    return Math.round(total);
  };

  const injectScenario = (sc: typeof testScenarios[0]) => { setCurrentAddr(sc.addr); setResult(null); };

  const handleValidate = async () => {
    if (!currentAddr) return;
    setIsAnalyzing(true);
    onScanningChange?.(true);
    const matchedScenario = testScenarios.find(s => s.addr === currentAddr);
    setTimeout(async () => {
      try {
        const { data, usage } = await analyzeSecurityIntent(currentAddr, historyAddr, source);
        onUsageUpdate?.(usage);
        const threatIndex = calculateThreatIndex(matchedScenario?.axes || { vsi: data.riskScore, edi: 10, pdi: 20, cri: 10, ipi: 5, rii: 0, eii: 0 });
        const latency = 9.2 + (Math.random() * 2.1);
        setSimLatency(latency);
        setResult({ ...data, intentState: (matchedScenario?.id as IntentCategory) || data.intentState, telemetry: { ...(matchedScenario?.telemetry || { age: data.onChainAge, lastTx: 'Unknown', activity15d: '0' }), latency: latency }, threatIndex: threatIndex, axes: matchedScenario?.axes || { vsi: data.riskScore, edi: 10, pdi: 20, cri: 10, ipi: 5, rii: 0, eii: 0 }, projectName: matchedScenario?.projectName, contractAddress: matchedScenario?.contractAddress });
        if (matchedScenario) setCompletedSims(prev => new Set([...prev, matchedScenario.id]));
      } catch (err) { console.error(err); } finally { setIsAnalyzing(false); onScanningChange?.(false); }
    }, 1200);
  };

  const startHold = () => { const startTime = Date.now(); holdTimerRef.current = window.setInterval(() => { const elapsed = Date.now() - startTime; const p = Math.min(100, (elapsed / 1500) * 100); setHoldProgress(p); if (p >= 100) { clearInterval(holdTimerRef.current!); handleOverride(); } }, 10); };
  const cancelHold = () => { if (holdTimerRef.current) clearInterval(holdTimerRef.current); setHoldProgress(0); };
  const handleOverride = () => { const currentBri = parseInt(localStorage.getItem('vigil_user_bri') || '100'); localStorage.setItem('vigil_user_bri', Math.max(0, currentBri - 15).toString()); setResult(null); };

  const getStatusConfig = (state: string) => {
    switch (state) {
      case 'POISON': return { color: 'text-red-500', bg: 'bg-red-500/5', border: 'border-red-500/20', icon: <Skull className="w-6 h-6" />, label: 'POSSIBLE ADDRESS POISONING', glow: 'bg-red-600', animation: 'animate-scan-vertical', primaryCta: "HALT: ADDRESS POISONING DETECTED", secondaryCta: "OVERRIDE: PROCEED WITH RISK", why: "DEFINITION: Critical detection of vanity mimics designed to exploit the human eye's 8-character verification gap.\nEXAMPLE: An attacker sees you frequently send to Ab1C...Zz90 and generates a fake address Ab1C...Hacker...Zz90. You almost click it because the start and end look identical." };
      case 'ACCUMULATION_TRAP': return { color: 'text-orange-500', bg: 'bg-orange-500/5', border: 'border-orange-500/40', icon: <TrendingUp className="w-6 h-6" />, label: 'STEALTH_ACCUMULATION_DETECTED', glow: 'bg-orange-600', animation: 'animate-sonar-ripple', primaryCta: "ABORT: LIQUIDITY RISK EXTREME", secondaryCta: "IGNORE FORENSIC: TRUST CLUSTER", why: "DEFINITION: Detection of a stealth entity accumulating >1% total supply or >2% rapid accumulation (0-5 days).\nEXAMPLE: A single cluster of linked wallets swept 2.1% of supply in 72 hours. This positioning allows the entity to drain 80% of liquidity in one transaction." };
      case 'MARKET_INTEL': return { color: 'text-red-600', bg: 'bg-red-600/5', border: 'border-red-600/40', icon: <Target className="w-6 h-6" />, label: 'CRITICAL RUG RISK: BUNDLED', glow: 'bg-red-700', animation: 'animate-strobe', primaryCta: "ABORT: SYSTEMIC MANIPULATION", secondaryCta: "IGNORE INTEL: EXECUTE ENTRY", why: "DEFINITION: Forensic detection of 'Bundling' where one entity funds multiple wallets to control supply before retail entry.\nEXAMPLE: On Pump.fun, a deployer uses 30 wallets to buy 40% of supply in Block 0. VIGIL identifies the shared funding source and flags the trap." };
      case 'PHISHING': return { color: 'text-purple-500', bg: 'bg-purple-500/5', border: 'border-purple-500/30', icon: <Radar className="w-6 h-6" />, label: 'PHISHING SHIELD ACTIVE', glow: 'bg-purple-600', animation: 'animate-sonar-ripple', primaryCta: "TERMINAL ABORT: SOURCE UNTRUSTED", secondaryCta: "IGNORE SHIELD: TRUST MANUALLY", why: "DEFINITION: Interception triggered by high-risk source contexts such as social DMs or unverified dApp portals.\nEXAMPLE: You copy a 'Treasury Address' from a Telegram DM or a random X (Twitter) comment; VIGIL flags the source as a high-risk entry point." };
      case 'DUST': return { color: 'text-amber-500', bg: 'bg-amber-500/5', border: 'border-amber-500/20', icon: <AlertOctagon className="w-6 h-6" />, label: 'DUST TRANSFER DETECTED', glow: 'bg-amber-600', animation: 'animate-float-dust', primaryCta: "DISCARD INJECTED DATA", secondaryCta: "PROCEED: DUST VERIFIED", why: "DEFINITION: Identification of unsolicited transfers used to pollute transaction logs with malicious destination history.\nEXAMPLE: A bot sends 0.000001 SOL to your wallet so that their malicious address appears at the top of your 'Recent Transactions' list." };
      case 'NEW': return { color: 'text-cyan-500', bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', icon: <Fingerprint className="w-6 h-6" />, label: 'REPORT: NEW ADDRESS', glow: 'bg-cyan-600', animation: 'animate-breathe', primaryCta: "INITIATE FORENSIC VERIFICATION", secondaryCta: "CONTINUE TO EXECUTION", why: "DEFINITION: Forensic alert for addresses with no prior interaction history or established on-chain reputation.\nEXAMPLE: You try to send funds to a wallet address that was created only 10 minutes ago and has zero previous transactions." };
      case 'TRUSTED': return { color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', icon: <ShieldCheck className="w-6 h-6" />, label: 'TRUSTED DESTINATION', glow: 'bg-emerald-600', animation: '', primaryCta: "RETURN TO SOURCE", secondaryCta: "SETTLE INTENT: CONFIRM", why: "DEFINITION: Verification of intent against an established safe node within your local historical trust graph.\nEXAMPLE: You are sending SOL to your hardware wallet address that you have used successfully 20 times this year." };
      default: return { color: 'text-blue-500', bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: <Info className="w-5 h-5" />, label: 'REPORT: INFO WARNING', glow: 'bg-blue-600', animation: '', primaryCta: "ABORT TRANSACTION", secondaryCta: "PROCEED MANUALLY", why: "Analysis Layer Online. System monitoring interaction context and validating structural intent." };
    }
  };

  return (
    <section id="system-simulation" className="px-6 md:px-20 py-4 md:py-8 bg-[#020202] relative z-10 scroll-mt-20 flex flex-col items-center min-h-fit overflow-hidden">
      
      {/* Portals for separate modals */}
      {result?.axes && <ThreatIndexModal isOpen={isThreatModalOpen} onClose={() => setIsThreatModalOpen(false)} axes={result.axes} totalIndex={result.threatIndex || 0} address={currentAddr} />}
      {result && <IdentityProfileModal isOpen={isIdentityModalOpen} onClose={() => setIsIdentityModalOpen(false)} address={currentAddr} threatIndex={result.threatIndex || 0} />}

      <div className="max-w-7xl mx-auto w-full"><div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"><div className="lg:w-[42%] space-y-6 flex flex-col w-full"><div className="space-y-4"><div className="space-y-2"><div className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /><span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Sandbox Environment // Execution</span></div><h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">Intent Validator.</h2></div><p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed italic animate-in fade-in duration-1000">"Validating user <span className="text-blue-500">belief against reality.</span> Ensure the destination you see is the one you sign."</p></div><div className="space-y-3"><div className="flex flex-col gap-2"><div className="flex items-center justify-between"><label className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] flex items-center gap-2"><Zap className="w-3 h-3 text-amber-500" /> SIMULATION CONTROL</label><span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">STATUS: {completedSims.size} / 10 VECTORS ANALYZED</span></div><div className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 border border-blue-500/20 rounded-xl relative overflow-hidden group"><div className="absolute inset-0 bg-blue-500/5 animate-pulse" /><MousePointerClick className="w-4 h-4 text-blue-500 relative z-10" /><span className="text-[9px] font-black text-blue-500 uppercase tracking-widest relative z-10 leading-tight">To synchronize biological perception with VIGIL Layer 0.5, execute all 10 simulation vectors.</span></div></div><div className="grid grid-cols-1 md:grid-cols-2 gap-2">{testScenarios.map((sc) => (<button key={sc.id} onClick={() => injectScenario(sc)} className={`py-3.5 px-4 border rounded-xl hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group relative overflow-hidden active:scale-[0.97] flex items-center justify-center ${currentAddr === sc.addr ? 'bg-zinc-900 border-blue-500/50 shadow-lg shadow-blue-500/5' : 'bg-zinc-950 border-zinc-900'}`}><span className={`text-[10px] font-black uppercase tracking-widest transition-colors z-10 text-center ${currentAddr === sc.addr ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>{sc.label}</span>{completedSims.has(sc.id) && <div className="absolute left-2 text-emerald-500"><CheckCircle2 size={10} /></div>}<div className="absolute right-2 px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[7px] font-black text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all whitespace-nowrap z-20">INJECT</div></button>))}</div></div><div className="space-y-4 pt-2 border-t border-zinc-900/50"><div className="space-y-2"><label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 text-center block w-full">Source Context</label><div className="flex gap-2">{[{ id: 'EXPLORER', icon: <Globe className="w-3.5 h-3.5" />, label: 'Explorer' }, { id: 'DAPP', icon: <ExternalLink className="w-3.5 h-3.5" />, label: 'dApp' }, { id: 'SOCIAL', icon: <MessageSquare className="w-3.5 h-3.5" />, label: 'Social' }].map((s) => (<button key={s.id} onClick={() => setSource(s.id as any)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${source === s.id ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[#080808] border-zinc-900 text-zinc-600'}`}>{s.icon} {s.label}</button>))}</div></div><div className="space-y-2"><label className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] ml-1 flex items-center justify-center gap-2 w-full"><ClipboardPaste className="w-3.5 h-3.5" /> Transfer Destination</label><div className="flex gap-4"><input type="text" value={currentAddr} onChange={(e) => setCurrentAddr(e.target.value)} placeholder="PASTE ADDRESS..." className="flex-1 bg-[#080808] border-2 border-zinc-900 rounded-2xl py-4 px-6 text-xs font-mono text-white placeholder:text-zinc-800 focus:outline-none focus:border-blue-600 transition-all uppercase shadow-inner text-center" /></div></div><button onClick={handleValidate} disabled={isAnalyzing || !currentAddr} className={`w-full py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-2xl ${isAnalyzing ? 'bg-zinc-900 text-zinc-600 cursor-wait' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}>{isAnalyzing ? (<><Activity className="w-4 h-4 animate-pulse" />ANALYZING...</>) : (<><Scan className="w-4 h-4" />VALIDATE TRANSACTION</>)}</button></div></div><div className="lg:w-[58%] w-full h-full min-h-[600px] flex flex-col"><div className={`flex-1 bg-[#0a0a0a] border-2 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden transition-[border-color,box-shadow] duration-700 ${result ? getStatusConfig(result.intentState).border : 'border-zinc-900 shadow-2xl'}`}>{result && (<><div className={`absolute -top-24 -right-24 w-64 h-64 ${getStatusConfig(result.intentState).glow} blur-[80px] opacity-20 pointer-events-none transition-opacity`} /><div className={`absolute inset-0 pointer-events-none opacity-40 ${getStatusConfig(result.intentState).animation}`} /></>)}{result && (
                  <div className="absolute top-8 right-8 z-30 flex flex-col gap-3">
                    <button onClick={() => setIsThreatModalOpen(true)} className={`flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 animate-inspect-flicker ${result.threatIndex! > 75 ? 'border-red-500/60' : result.threatIndex! > 45 ? 'border-amber-500/60' : 'border-emerald-500/60'}`}>
                      <Calculator className={`w-4 h-4 ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span className={`text-[12px] font-black italic ${result.threatIndex! > 75 ? 'text-red-500' : result.threatIndex! > 45 ? 'text-amber-500' : 'text-emerald-500'}`}>{result.threatIndex}%</span>
                      <div className="h-3 w-[1px] bg-zinc-800 mx-1" />
                      <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Threat Math</span>
                    </button>
                    <button onClick={() => setIsIdentityModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-black border-2 border-cyan-500/60 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 animate-inspect-flicker delay-300">
                      <UserPlus className="w-4 h-4 text-cyan-500" />
                      <span className="text-[7px] font-black text-cyan-500 uppercase tracking-widest">Identity Profile</span>
                    </button>
                  </div>
                )}{!result && !isAnalyzing && (<div className="h-full flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000"><div className="flex flex-col items-center gap-8"><div className="relative group"><div className="absolute inset-0 bg-blue-500/10 blur-[60px] animate-pulse rounded-full" /><Brain className="w-24 h-24 text-zinc-700 relative z-10 animate-pulse" strokeWidth={0.8} /></div><div className="space-y-4 relative z-10"><div className="space-y-2"><h3 className="text-xl md:text-2xl font-black text-zinc-400 uppercase tracking-[0.4em]">Awaiting Simulation</h3><p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest italic">LISTENING_FOR_INTENT</p></div><div className="h-[1px] w-12 bg-zinc-800 mx-auto" /><span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.8em] block">Cognitive Core Standby</span></div></div></div>)}{isAnalyzing && (<div className="h-full flex flex-col items-center justify-center text-center py-12"><VigilScanner label="EXECUTING_HEURISTIC_MATRIX" size="lg" /></div>)}{result && (<div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10"><div className="flex items-center gap-6 border-b border-white/5 pb-8 mr-40"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xl transition-all duration-500 ${getStatusConfig(result.intentState).color} ${getStatusConfig(result.intentState).border} ${getStatusConfig(result.intentState).bg}`}>{getStatusConfig(result.intentState).icon}</div><div className="space-y-1"><h3 className={`text-xl font-black italic uppercase tracking-tighter ${getStatusConfig(result.intentState).color}`}>{getStatusConfig(result.intentState).label}</h3><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full animate-pulse ${getStatusConfig(result.intentState).color}`} /><span className="text-9px font-black text-zinc-500 uppercase tracking-[0.3em]">Active_Interception_Layer</span></div></div></div>
                {result.projectName && (
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-6 border-b border-white/5 mr-40 animate-in fade-in duration-500">
                    <div className="space-y-1">
                      <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Project name:</span>
                      <span className="text-[14px] font-black text-white italic uppercase tracking-tighter">{result.projectName}</span>
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">contract address:</span>
                      <span className="text-[11px] font-mono text-cyan-500 break-all">{result.contractAddress}</span>
                    </div>
                  </div>
                )}
                <div className="space-y-4"><div className="flex items-center gap-2"><Info className={`w-3 h-3 ${getStatusConfig(result.intentState).color}`} /><span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Interception Logic</span></div><div className="space-y-4 text-zinc-400 text-base leading-relaxed font-medium whitespace-pre-line">{getStatusConfig(result.intentState).why.split('\n').map((line, i) => (<div key={i} className={i > 0 ? "pt-4 border-t border-white/5" : ""}>{line.startsWith('DEFINITION:') ? (<div className="flex flex-col gap-2"><span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 border border-blue-500/20`}>DEFINITION</span><span className="italic">"{line.replace('DEFINITION:', '').trim()}"</span></div>) : line.startsWith('EXAMPLE:') ? (<div className="flex flex-col gap-2"><span className={`inline-block w-fit px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20`}>EXAMPLE</span><span className="italic text-zinc-500">"{line.replace('EXAMPLE:', '').trim()}"</span></div>) : line}</div>))}</div></div>{result.telemetry && (<div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4 shadow-inner relative overflow-hidden">{result.telemetry.latency && result.telemetry.latency <= 12 && (<div className="absolute top-0 left-0 w-full h-full bg-emerald-500/[0.02] pointer-events-none" />)}<div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-blue-500" /><span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Subject Telemetry</span></div>{result.telemetry.latency && result.telemetry.latency <= 12.1 && (<div className="flex items-center gap-2 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md animate-in slide-in-from-right-2"><Gauge className="w-2.5 h-2.5 text-emerald-500" /><span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Sub-Frame Validated</span></div>)}</div><div className="grid grid-cols-4 gap-4"><div className="space-y-1.5"><span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Address Age</span><span className="text-[11px] font-mono font-bold text-zinc-200">{result.telemetry.age}</span></div><div className="space-y-1.5 border-x border-white/5 px-4"><span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Last Time</span><span className="text-[11px] font-mono font-bold text-zinc-200">{result.telemetry.lastTx}</span></div><div className="space-y-1.5 border-r border-white/5 pr-4"><span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">15D Tx</span><span className="text-[11px] font-mono font-bold text-zinc-200">{result.telemetry.activity15d}</span></div><div className="space-y-1.5"><span className="text-[7px] font-black text-zinc-600 uppercase tracking-widest block">Latency</span><div className="flex items-center gap-1"><span className={`text-[11px] font-mono font-black ${result.telemetry.latency && result.telemetry.latency <= 12.1 ? 'text-emerald-500' : 'text-amber-500'}`}>{result.telemetry.latency?.toFixed(1)}ms</span><div className={`w-1 h-1 rounded-full animate-pulse ${result.telemetry.latency && result.telemetry.latency <= 12.1 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'}`} /></div></div></div></div>)}<div className="space-y-3"><button onClick={() => setResult(null)} className={`w-full py-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex items-center justify-center gap-4 group/action hover:border-zinc-700 transition-all active:scale-[0.98] ${getStatusConfig(result.intentState).color}`}><ShieldCheck className="w-5 h-5" /><span className="text-xs font-black uppercase tracking-[0.25em]">{getStatusConfig(result.intentState).primaryCta}</span></button><button onMouseDown={startHold} onMouseUp={cancelHold} onMouseLeave={cancelHold} onTouchStart={startHold} onTouchEnd={cancelHold} className="relative w-full py-4 bg-transparent border border-zinc-900 rounded-2xl flex items-center justify-center gap-3 group/risky hover:border-red-900/50 transition-all active:scale-[0.99] overflow-hidden"><div className="absolute top-0 left-0 bottom-0 bg-red-600/10 transition-all duration-75 pointer-events-none" style={{ width: `${holdProgress}%` }} /><div className="relative z-10 flex items-center gap-3"><AlertTriangle className="w-3.5 h-3.5 text-zinc-400 group-hover/risky:text-red-600 transition-colors" /><span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover/risky:text-zinc-500">{getStatusConfig(result.intentState).secondaryCta}<span className="ml-2 text-[8px] font-mono">[HOLD 1.5S]</span></span></div></button></div><div className="pt-6 border-t border-white/5 text-center space-y-2"><div className="flex items-center justify-center gap-4 opacity-30"><div className="h-[1px] w-8 bg-zinc-700" /><span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.5em]">Standard: VIG-0.5-S</span><div className="h-[1px] w-8 bg-zinc-900" /></div><p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.25em] leading-relaxed italic">VIGIL ADVISORY: SECURITY IS PROBABILISTIC. WE DO NOT SIGN TRANSACTIONS. OPERATOR ASSUMES ALL RISK.</p></div><button onClick={() => setResult(null)} className="absolute top-0 right-0 p-2 text-zinc-800 hover:text-zinc-600 transition-colors"><RotateCcw className="w-4 h-4" /></button></div>)}</div></div></div></div>
      <style>{`
        @keyframes scan-vertical { 0% { top: -100%; } 100% { top: 100%; } }
        .animate-scan-vertical::after { content: ""; position: absolute; left: 0; width: 100%; height: 3px; background: rgba(239, 68, 68, 0.4); box-shadow: 0 0 20px #ef4444; animation: scan-vertical 3s linear infinite; }
        @keyframes sonar { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        .animate-sonar-ripple::after { content: ""; position: absolute; top: 50%; left: 50%; width: 300px; height: 300px; margin-top: -150px; margin-left: -150px; border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 50%; animation: sonar 2s linear infinite; }
        @keyframes drift { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(15px, 15px); } }
        .animate-float-dust::after { content: "· . · . ·"; position: absolute; font-size: 24px; color: rgba(245, 158, 11, 0.1); animation: drift 6s infinite linear; }
        @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(-3px, -3px); } 60% { transform: translate(3px, 3px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
        .animate-glitch { animation: glitch 0.25s infinite; opacity: 0.03; background: white; }
        @keyframes strobe { 0%, 100% { opacity: 1; } 50% { opacity: 0.1; } }
        .animate-strobe { animation: strobe 0.4s step-end infinite; opacity: 0.05; background: rgba(185, 28, 28, 0.3); }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.05), transparent); background-size: 200% 100%; animation: shimmer 4s infinite linear; }
        @keyframes magnify { 0% { transform: scale(1) translate(0); } 50% { transform: scale(1.1) translate(10px, 10px); } 100% { transform: scale(1) translate(0); } }
        .animate-magnify { animation: magnify 4s infinite ease-in-out; }
        @keyframes breathe { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.15; } }
        .animate-breathe { animation: breathe 4s infinite ease-in-out; background: #06b6d4; }
        @keyframes inspect-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .animate-inspect-flicker { animation: inspect-flicker 1s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};
