import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, AlertOctagon, Activity, Layers, 
  Shield, Scan, Terminal as TerminalIcon, Target, Fingerprint, 
  Globe, Search, Layout, Filter, Cpu, Brain, Eye, 
  ShieldCheck, HelpCircle, Trophy, Video, History, Edit3, 
  MessageSquare, Flame, X, Lock, ChevronRight, Trash2, RefreshCw, Zap, Monitor, Compass, List, LayoutGrid, Wallet
} from 'lucide-react';
import { TacticalHUD } from './TacticalHUD';
import { RegistryDoc } from './OperationalRegistry';
import { ViewMode } from '../App';

interface NavItem {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  level?: number;
  type: 'item' | 'header' | 'subitem' | 'subsubitem';
  adminOnly?: boolean;
}

interface HeaderProps {
  activeAnchor: string;
  scrollToSection: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  releasePhase: number;
  onCodeSubmit: (code: string) => boolean;
  ambientStatus: string;
  isAdmin?: boolean;
  bri: number;
  xp: number;
  rank: string;
  onOpenMap: () => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  wallet?: string;
  isGuest?: boolean;
  onConnectWallet?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeAnchor, scrollToSection, isMenuOpen, setIsMenuOpen, releasePhase, onCodeSubmit, ambientStatus, isAdmin = false, bri, xp, rank, onOpenMap, onOpenDoc, viewMode, setViewMode, wallet, isGuest = false, onConnectWallet
}) => {
  const [code, setCode] = useState('');
  const [codeStatus, setCodeStatus] = useState<'IDLE' | 'ERROR' | 'SUCCESS'>('IDLE');
  const [purgeHold, setPurgeHold] = useState(0);
  const purgeTimerRef = useRef<number | null>(null);
  const scrollableNavRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { id: 'silo-1', label: 'Control Surface', icon: <LayoutDashboard size={14} />, level: 1, type: 'item' },
    
    { type: 'header', label: 'Phase: Intelligence', level: 1 },
    { id: 'about-us', label: 'Layer Origins', icon: <Users size={14} />, level: 2, type: 'item' },
    { id: 'the-threat', label: 'The Vulnerability', icon: <AlertOctagon size={14} />, level: 2, type: 'item' },
    { id: 'ecosystem-impact', label: 'Ecosystem Impact', icon: <Activity size={14} />, level: 2, type: 'item' },
    
    { type: 'header', label: 'Phase: Logic', level: 2 },
    { id: 'flow', label: 'System Logic', icon: <Layers size={14} />, level: 3, type: 'item' },
    { id: 'features', label: 'Core Features', icon: <Shield size={14} />, level: 3, type: 'item' },
    { id: 'deep-dive', label: 'Operational Flow', icon: <Scan size={14} />, level: 3, type: 'item' },
    
    { type: 'header', label: 'Phase: Calibration', level: 3 },
    { id: 'calibration-journey', label: 'Calibration Journey', icon: <Compass size={14} />, level: 4, type: 'item' },
    
    { id: 'hub-execution', label: 'Hub 01: Sandbox', icon: <TerminalIcon size={12} />, level: 4, type: 'subitem' },
    { id: 'intent-validator-demo', label: 'P1: Intent Validator', icon: <Target size={10} />, level: 4, type: 'subsubitem' },
    { id: 'mimicry-lab-demo', label: 'P2: Mimicry Lab', icon: <Fingerprint size={10} />, level: 4, type: 'subsubitem' },
    
    { id: 'hub-synthesis', label: 'Hub 02: Synthesis', icon: <Globe size={12} />, level: 4, type: 'subitem' },
    { id: 'intel-forge-demo', label: 'P3: Intelligence Forge', icon: <Cpu size={10} />, level: 4, type: 'subsubitem' },
    { id: 'reputation-search', label: 'P4: Reputation Search', icon: <Search size={10} />, level: 4, type: 'subsubitem' },
    { id: 'sentinel-deck-demo', label: 'P5: Sentinel Deck', icon: <Layout size={10} />, level: 4, type: 'subsubitem' },
    
    { id: 'hub-biological', label: 'Hub 03: Biological', icon: <Brain size={12} />, level: 4, type: 'subitem' },
    { id: 'neural-firewall-demo', label: 'P6: Saccadic Trainer', icon: <Activity size={10} />, level: 4, type: 'subsubitem' },
    { id: 'neural-audit-demo', label: 'P7: Saccadic Audit', icon: <Eye size={10} />, level: 4, type: 'subsubitem' },

    { id: 'hub-apex', label: 'Hub 04: Apex', icon: <Zap size={12} className="text-amber-500" />, level: 4, type: 'subitem' },
    { id: 'entropy-collider-demo', label: 'P8: Entropy Collider', icon: <Activity size={10} className="text-amber-500" />, level: 4, type: 'subsubitem' },
    
    { id: 'field-unit-demo', label: 'Final Deployment', icon: <Monitor size={14} className="text-emerald-500" />, level: 4, type: 'item' },
    { id: 'field-unit-demo', label: 'P9: Watch Tower (VFU)', icon: <Scan size={12} className="text-emerald-500" />, level: 4, type: 'subitem' },

    { type: 'header', label: 'Phase: Synthesis', level: 4 },
    { id: 'non-goals', label: 'System Purity', icon: <ShieldCheck size={14} />, level: 5, type: 'item' },
    { id: 'roadmap', label: 'Ecosystem Expansion', icon: <Globe size={14} />, level: 6, type: 'item' },
    { id: 'faq', label: 'Technical Inquiries', icon: <HelpCircle size={14} />, level: 7, type: 'item' },
    { id: 'final-proficiency-audit', label: 'Final Proficiency', icon: <Activity size={14} />, level: 8, type: 'item' },
    { id: 'silo-9', label: 'Sentinel Mesh', icon: <Globe size={14} />, level: 9, type: 'item' },
    { id: 'leaderboard', label: 'Merit Ledger', icon: <Trophy size={14} className="text-amber-500" />, level: 1, type: 'item' },

    { type: 'header', label: 'Phase: Community', level: 9, adminOnly: true },
    { id: 'prod-studio', label: 'Production Studio', icon: <Video size={14} />, level: 9, type: 'item', adminOnly: true },
    { id: 'chronicle-repo', label: 'Chronicle Repository', icon: <History size={14} />, level: 9, type: 'item', adminOnly: true },
    { id: 'brand-arch', label: 'Brand Architect', icon: <Edit3 size={14} />, level: 10, type: 'item', adminOnly: true },
    { id: 'comms-terminal', label: 'Comms Terminal', icon: <MessageSquare size={14} />, level: 10, type: 'item', adminOnly: true },
    { id: 'active-challenge', label: 'Active Challenge', icon: <Trophy size={14} className="text-emerald-500" />, level: 10, type: 'item', adminOnly: true },
    { id: 'daily-distraction', label: 'Daily Distraction', icon: <Flame size={14} />, level: 10, type: 'item', adminOnly: true },
  ];

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onCodeSubmit) return;
    if (code.toUpperCase() === 'PURGE') { handleNuclearPurge(); return; }
    const success = onCodeSubmit(code);
    if (success) { setCodeStatus('SUCCESS'); setCode(''); setTimeout(() => setCodeStatus('IDLE'), 2000); }
    else { setCodeStatus('ERROR'); setTimeout(() => setCodeStatus('IDLE'), 2000); }
  };

  const startPurgeHold = () => {
    const startTime = Date.now();
    const duration = 1500;
    purgeTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setPurgeHold(progress);
      if (progress >= 100) { if (purgeTimerRef.current) clearInterval(purgeTimerRef.current); handleNuclearPurge(); }
    }, 10);
  };

  const cancelPurgeHold = () => { if (purgeTimerRef.current) clearInterval(purgeTimerRef.current); setPurgeHold(0); };
  const handleNuclearPurge = () => { localStorage.clear(); window.location.reload(); };

  useEffect(() => {
    if (!activeAnchor || !scrollableNavRef.current || viewMode === 'TACTICAL') return;
    const container = scrollableNavRef.current;
    const activeElement = container.querySelector(`button[data-active="true"]`) as HTMLElement;
    if (activeElement) {
      const containerHeight = container.clientHeight;
      const elementOffsetTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const scrollTarget = elementOffsetTop + (elementHeight / 2) - (containerHeight / 2);
      container.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  }, [activeAnchor, viewMode]);

  // Use identical isRealWallet check as App.tsx
  const isRealWallet = !!wallet && !isGuest && !wallet.includes("SIM_NODE") && !wallet.includes("VISITOR_NODE");

  return (
    <aside id="tour-sidebar-nav" className={`fixed inset-x-0 bottom-0 top-10 z-[100] bg-[#050505] md:relative md:top-0 md:h-full w-full md:w-72 border-r border-zinc-800 transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="flex flex-col h-full">
        <div className="p-6 shrink-0 relative z-[101] bg-[#050505] pb-0 overflow-visible">
          <div className="flex flex-col gap-3 overflow-visible">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => { scrollToSection('silo-1'); setIsMenuOpen(false); }}>
                <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm shadow-xl">
                  <div className="w-3 h-3 bg-black rotate-45" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic text-white leading-none">Vigil</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="md:hidden text-zinc-400 p-2"><X className="w-6 h-6" /></button>
            </div>

            {/* Mobile-Only Identity Button in Sidebar - Synchronized with Desktop HUD */}
            <div className="md:hidden flex flex-col items-center">
              <button 
                onClick={() => { onConnectWallet?.(); setIsMenuOpen(false); }}
                className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl active:scale-95 mb-1 group transition-all ${isRealWallet ? 'bg-zinc-900 border border-zinc-800 text-white' : 'bg-blue-600 text-white'}`}
              >
                {wallet && wallet !== "VISITOR_NODE_UNSYNCED" ? (
                  <>
                    <div className={`w-1.5 h-1.5 rounded-full ${isRealWallet ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-blue-400'}`} />
                    <span className="font-mono">{wallet.slice(0, 4)}...{wallet.slice(-4)}</span>
                  </>
                ) : (
                  <>
                    <Wallet size={14} className="group-hover:scale-110 transition-transform" /> 
                    CONNECT_IDENTITY
                  </>
                )}
              </button>
              {wallet && (
                <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">
                  {isRealWallet ? 'SECURE_NODE_SYNCED' : 'VISITOR_UNSYNCED'}
                </span>
              )}
            </div>
            
            <div id="tour-bri-dash" className="mt-1 relative">
              <TacticalHUD bri={bri} xp={xp} rank={rank} level={releasePhase} onOpenMap={onOpenMap} />
            </div>

            {/* Interface Parity Toggle */}
            <div id="tour-view-mode" className="mt-4 p-1 bg-[#0a0a0a] border border-zinc-800 rounded-xl flex items-center gap-1 shadow-inner relative group/toggle">
               <button 
                 onClick={() => { setViewMode('NARRATIVE'); setIsMenuOpen(false); }}
                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'NARRATIVE' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
               >
                 <List size={10} /> Narrative
               </button>
               <button 
                 onClick={() => { setViewMode('TACTICAL'); setIsMenuOpen(false); }}
                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'TACTICAL' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-zinc-600 hover:text-zinc-400'}`}
               >
                 <LayoutGrid size={10} /> Tactical
               </button>
               {/* Hover tooltip for parity standard */}
               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-950 border border-zinc-800 rounded text-[7px] font-black text-zinc-600 uppercase tracking-widest opacity-0 group-hover/toggle:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[200]">
                  INTERFACE_PARITY: v1.1.0
               </div>
            </div>
          </div>
        </div>

        <div ref={scrollableNavRef} className="flex-1 min-0 relative overflow-y-auto custom-scrollbar px-6 pt-1 pb-4">
          <nav className="space-y-1 pb-10">
            {navItems.map((item, idx) => {
              if (item.adminOnly && !isAdmin) return null;
              if (item.type === 'header') return (<div key={idx} className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.5em] mt-6 mb-3 px-4">{item.label}</div>);
              const isLocked = !isAdmin && (item.level || 1) > releasePhase;
              const isActive = activeAnchor === item.id;
              const isSubItem = item.type === 'item';
              const isSubSubItem = item.type === 'subsubitem';
              
              return (
                <button 
                  key={item.id || idx} 
                  data-active={isActive} 
                  disabled={isLocked} 
                  onClick={() => {
                    if (item.id === 'leaderboard') {
                      onOpenDoc('leaderboard');
                      setIsMenuOpen(false);
                    } else {
                      scrollToSection(item.id || '');
                      setIsMenuOpen(false); // AUTO-CLOSE SIDEBAR ON MOBILE NAVIGATION
                    }
                  }} 
                  className={`w-full text-left px-4 py-3 rounded-2xl transition-all duration-500 flex items-center group relative border 
                    ${isActive ? 'bg-[#0a0a0a] border-zinc-700 scale-[1.02]' : isLocked ? 'opacity-40 cursor-not-allowed border-transparent' : 'text-zinc-500 border-transparent hover:text-zinc-200 hover:bg-zinc-950/40'} 
                    ${isSubItem && item.type !== 'item' ? 'ml-4 py-2.5' : ''} 
                    ${item.type === 'subsubitem' ? 'ml-8 py-1.5' : ''}
                  `}>
                  <div className={`rounded-xl border flex items-center justify-center mr-4 shrink-0 
                    ${isActive ? 'text-blue-500 bg-blue-500/10 border-blue-500/30' : 'text-zinc-700 border-zinc-800'}
                    ${item.type === 'subsubitem' ? 'w-5 h-5 mr-3' : 'w-7 h-7'}
                  `}>
                    {isLocked ? <Lock size={item.type === 'subsubitem' ? 8 : 10} /> : item.icon}
                  </div>
                  <span className={`font-black tracking-[0.2em] uppercase transition-all 
                    ${isActive ? 'text-white' : ''} 
                    ${item.type === 'subsubitem' ? 'text-[8px]' : item.type === 'subitem' ? 'text-[9px]' : 'text-[11px]'}
                  `}>
                    {isLocked ? 'ENCRYPTED' : item.label}
                  </span>
                  {isActive && item.id === 'active-challenge' && (<div className="absolute inset-0 bg-emerald-500/5 rounded-2xl animate-pulse -z-10" />)}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6 border-t border-zinc-800 shrink-0 space-y-4 bg-[#050505] z-30 shadow-2xl">
          <div className="space-y-2">
            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Fragment Decryption</label>
            <form id="tour-fragment-input" onSubmit={handleSubmitCode} className="relative group">
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="ENTER_KEY..." className={`w-full bg-black border-2 rounded-xl py-3 px-10 text-[10px] font-mono transition-all uppercase outline-none ${codeStatus === 'ERROR' ? 'border-red-600 text-red-500' : codeStatus === 'SUCCESS' ? 'border-emerald-600 text-emerald-500' : 'border-zinc-700 text-zinc-300 focus:border-blue-600 placeholder:text-zinc-600'}`} />
              <TerminalIcon size={12} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${codeStatus === 'ERROR' ? 'text-red-500' : codeStatus === 'SUCCESS' ? 'text-emerald-500' : 'text-zinc-600'}`} />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:text-white transition-colors"><ChevronRight size={14} /></button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button id="tour-hold-purge" onMouseDown={startPurgeHold} onMouseUp={cancelPurgeHold} onMouseLeave={cancelPurgeHold} onTouchStart={startPurgeHold} onTouchEnd={cancelPurgeHold} className="relative py-3 px-4 rounded-xl border border-red-900/40 bg-red-900/5 text-red-600 text-[8px] font-black uppercase tracking-widest hover:bg-red-900/20 hover:text-red-400 transition-all flex items-center justify-center gap-2 shadow-inner overflow-hidden group/purge">
              <div className="absolute top-0 left-0 bottom-0 bg-red-600/20 transition-all duration-75 pointer-events-none" style={{ width: `${purgeHold}%` }} />
              <Trash2 size={10} className="relative z-10" /> 
              <span className="relative z-10">{purgeHold > 0 ? `RESETTING ${Math.round(purgeHold)}%` : 'HOLD PURGE'}</span>
            </button>
            <button className="py-3 px-4 rounded-xl border border-zinc-700 bg-[#080808] text-zinc-600 text-[8px] font-black uppercase tracking-widest italic hover:text-blue-500 transition-all flex items-center justify-center gap-2"><RefreshCw size={10} /> v0.0.0.1</button>
          </div>
        </div>
      </div>
    </aside>
  );
};