import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Binary, Target, ShieldX, Activity, Database, BarChart3, Globe, Trophy, Info, Zap, Radio, Smartphone, Monitor, Brain, Cpu, Layers, Sparkles, ShieldAlert, ShieldCheck, ZapOff, Clock, ArrowRight, ArrowDownRight, Compass } from 'lucide-react';
import { Header } from './components/Header';
import { SecurityAnnouncementBar } from './components/SecurityAnnouncementBar';
import { SecurityModal } from './components/SecurityModal';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { ScamStats } from './components/ScamStats';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { OperationalRegistry, RegistryDoc } from './components/OperationalRegistry';
import { ThreatResearch } from './components/ThreatResearch';
import { IntentValidatorDemo } from './components/IntentValidatorDemo';
import { AdversarialMimicryLab } from './components/AdversarialMimicryLab';
import { IntelligenceForge } from './components/IntelligenceForge';
import { ContextualReputationSearch } from './components/ContextualReputationSearch';
import { PathBriefing } from './components/PathBriefing';
import { SystemBoot } from './components/SystemBoot';
import { ExitProtocolOverlay, ExitType } from './components/ExitProtocolOverlay';
import { HubHeader } from './components/HubHeader';
import { SecurityZoneBackground } from './components/SecurityZoneBackground';
import { TelemetryDisplay } from './components/TelemetryDisplay';
import { ScrollProgress } from './components/ScrollProgress';
import { UsageData } from './services/geminiService';
import { SafetyVideo } from './components/SafetyVideo';
import { LATEST_INTERCEPT } from './registry/broadcast';
import { EncryptedSection } from './components/EncryptedSection';
import { FinalNotice } from './components/FinalNotice';
import { DefinitiveNonGoals } from './components/DefinitiveNonGoals';
import { MeshQueryTerminal } from './components/MeshQueryTerminal';
import { NeuralProficiencyAudit } from './components/NeuralProficiencyAudit';
import { FieldUnitHub } from './components/FieldUnitHub';
import { SiloGate } from './components/SiloGate';
import { SessionResumeOverlay } from './components/SessionResumeOverlay';
import { SiloTopology } from './components/SiloTopology';
import { MissionBriefing } from './components/MissionBriefing';
import { VideoProductionStudio } from './components/VideoProductionStudio';
import { ChronicleNarrativeLibrary } from './components/ChronicleNarrativeLibrary';
import { SocialIntelligenceLab } from './components/SocialIntelligenceLab';
import { FlagshipHeaderArchitect } from './components/FlagshipHeaderArchitect';
import { NarrativeGlitchForge } from './components/NarrativeGlitchForge';
import { CommunityChallenge } from './components/CommunityChallenge';
import { calculateScoring } from './utils/scoring';
import { Leaderboard } from './components/Leaderboard';
import { NeuralFirewall } from './components/NeuralFirewall';
import { NeuralAttentionalAudit } from './components/NeuralAttentionalAudit';
import { SentinelControlDeck } from './components/SentinelControlDeck';
import { EntropyCollider } from './components/EntropyCollider';
import { TechLabel } from './components/docs/DocHelpers';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(() => !localStorage.getItem('vigil_node_acknowledged'));
  const [isBooting, setIsBooting] = useState(false);
  const [hasAcknowledged, setHasAcknowledged] = useState(() => !!localStorage.getItem('vigil_node_acknowledged'));
  const [isGuest, setIsGuest] = useState(() => localStorage.getItem('vigil_user_is_guest') === 'true');
  const [activeDoc, setActiveDoc] = useState<RegistryDoc>(null);
  const [activeAnchor, setActiveAnchor] = useState<string>('silo-1');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isPowerSave, setIsPowerSave] = useState(() => localStorage.getItem('vigil_user_pwr_save') === 'true');
  const [activeExit, setActiveExit] = useState<ExitType>(null);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('vigil_master_auth') === 'true');
  
  const [wallet, setWallet] = useState(() => localStorage.getItem('vigil_user_wallet') || '');
  const [bri, setBri] = useState(() => Number(localStorage.getItem('vigil_node_bri')) || 0);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('vigil_user_xp')) || 0);
  
  const [unlockLevel, setUnlockLevel] = useState(() => Number(localStorage.getItem('vigil_node_level')) || 1);
  const [rank, setRank] = useState(() => localStorage.getItem('vigil_node_rank') || 'RECRUIT');

  const [lastUsage, setLastUsage] = useState<UsageData | null>(null);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [isTelemetryVisible, setIsTelemetryVisible] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const targetScrollTopRef = useRef<number>(0);
  const currentScrollTopRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);
  
  const hasTriggeredPromptRef = useRef<boolean>(false);
  const initialLevelOnMount = useRef<number>(Number(localStorage.getItem('vigil_node_level')) || 1);

  useEffect(() => {
    if (hasAcknowledged) {
      localStorage.setItem('vigil_node_acknowledged', 'true');
      localStorage.setItem('vigil_node_bri', bri.toString());
      localStorage.setItem('vigil_node_level', unlockLevel.toString());
      localStorage.setItem('vigil_node_rank', rank);
      localStorage.setItem('vigil_user_wallet', wallet);
      localStorage.setItem('vigil_user_xp', xp.toString());
      localStorage.setItem('vigil_user_is_guest', isGuest.toString());
    }
  }, [bri, unlockLevel, rank, hasAcknowledged, wallet, xp, isGuest]);

  useEffect(() => {
    if (isAiScanning) {
      setIsTelemetryVisible(true);
    } else if (lastUsage) {
      const timer = setTimeout(() => {
        setIsTelemetryVisible(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isAiScanning, lastUsage]);

  useEffect(() => {
    if (hasAcknowledged && initialLevelOnMount.current > 1 && !hasTriggeredPromptRef.current) {
      const timer = setTimeout(() => {
        setShowResumePrompt(true);
        hasTriggeredPromptRef.current = true;
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [hasAcknowledged]);

  useEffect(() => {
    if (!hasAcknowledged) return;

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isProgrammaticScrollRef.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveAnchor(entry.target.id);
        }
      });
    }, options);

    const targetIds = [
      'silo-1', 'about-us', 'the-threat', 'ecosystem-impact',
      'flow', 'features', 'deep-dive', 
      'calibration-journey', 'hub-execution', 'intent-validator-demo', 'mimicry-lab-demo', 
      'hub-synthesis', 'intel-forge-demo', 'reputation-search', 'sentinel-deck-demo', 
      'hub-biological', 'neural-firewall-demo', 'neural-audit-demo',
      'hub-apex', 'entropy-collider-demo', 'field-unit-demo',
      'non-goals', 'roadmap', 'faq',
      'neural-audit', 'silo-9', 'prod-studio', 'chronicle-repo', 
      'brand-arch', 'comms-terminal', 'active-challenge', 'daily-distraction',
      'silo-10', 'leaderboard'
    ];

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasAcknowledged, unlockLevel, isAdmin]);

  useEffect(() => {
    const smoothScrollLoop = () => {
      if (!scrollContainerRef.current) return;
      const diff = targetScrollTopRef.current - currentScrollTopRef.current;
      
      if (Math.abs(diff) < 1) {
        currentScrollTopRef.current = targetScrollTopRef.current;
        isProgrammaticScrollRef.current = false;
      } else {
        currentScrollTopRef.current += diff * 0.12; 
      }
      
      scrollContainerRef.current.scrollTop = currentScrollTopRef.current;
      animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    };
    animationFrameRef.current = requestAnimationFrame(smoothScrollLoop);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (!isProgrammaticScrollRef.current) {
        currentScrollTopRef.current = scrollTop;
        targetScrollTopRef.current = scrollTop;
      }
      const totalScrollable = scrollHeight - clientHeight;
      const percentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      setScrollPercentage(percentage);
    }
  };

  const scrollToPercentage = (percent: number) => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const absoluteTarget = container.scrollTop + (rect.top - containerRect.top);
      
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = absoluteTarget - 20;
      setActiveAnchor(id);
      setIsMenuOpen(false);
    }
  };

  const handleScoring = (isSuccess: boolean, level: number) => {
    if (isGuest) return; 

    const { briDelta, xpGained } = calculateScoring(isSuccess, level);
    
    setBri(prev => {
      const next = Math.max(0, prev + briDelta);
      if (next >= 90) setRank('SENTINEL');
      else if (next >= 60) setRank('GUARDIAN');
      else setRank('RECRUIT');
      return next;
    });

    setXp(prev => prev + xpGained);
  };

  const handleCalibrationComplete = (points: number) => {
    setIsBooting(false);
    setHasAcknowledged(true);
    if (isGuest) {
      setUnlockLevel(10);
      setRank('VISITOR');
    } else {
      handleScoring(points > 0, 1);
    }
  };

  const ambientStatus = `STATUS: [LOCAL_NODE_OPERATIONAL] // v 0.0.0.1 // BRI: ${bri}% // RANK: ${rank}${isAdmin ? ' // MASTER_AUTH: OK' : ''}`;

  const incrementUnlockLevel = (target?: number) => {
    if (isGuest) return; 
    const nextLevel = target || Math.min(10, unlockLevel + 1);
    setUnlockLevel(nextLevel);
    handleScoring(true, nextLevel);
    
    setTimeout(() => {
      scrollToSection(`silo-${nextLevel}`);
    }, 1000);
  };

  const handleCodeSubmit = (code: string) => {
    if (code === 'VIG-8821') { incrementUnlockLevel(2); return true; }
    if (code === 'VIG-3305') { incrementUnlockLevel(3); return true; }
    if (code === 'VIG-4991') { incrementUnlockLevel(4); return true; }
    if (code === 'VIG-5220') { incrementUnlockLevel(5); return true; }
    if (code === 'VIG-6101') { incrementUnlockLevel(6); return true; }
    if (code === 'VIG-7742') { incrementUnlockLevel(7); return true; }
    if (code === 'VIG-8008') { incrementUnlockLevel(8); return true; }
    
    if (code === 'VG-YASHMAL-6202') {
      setIsAdmin(true);
      localStorage.setItem('vigil_master_auth', 'true');
      return true;
    }
    return false;
  };

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${isPowerSave ? 'pwr-save' : ''}`}>
      
      <SecurityZoneBackground activeAnchor={activeAnchor} powerSave={isPowerSave} />
      <SecurityAnnouncementBar onNeutralize={() => handleScoring(true, unlockLevel)} />
      
      <SecurityModal isOpen={isModalOpen} onClose={(walletAddr, isGuestUser) => {
        setWallet(walletAddr);
        setIsGuest(!!isGuestUser);
        setIsModalOpen(false);
        setIsBooting(true);
      }} />

      {isBooting && (
        <SystemBoot onComplete={handleCalibrationComplete} skipGame={isGuest} />
      )}

      {showResumePrompt && (
        <SessionResumeOverlay 
          level={unlockLevel} 
          onJump={() => {
            setShowResumePrompt(false);
            scrollToSection(`silo-${unlockLevel}`);
          }} 
          onStay={() => {
            setShowResumePrompt(false);
            scrollToSection('silo-1');
          }} 
        />
      )}

      <SiloTopology isOpen={isTopologyOpen} onClose={() => setIsTopologyOpen(false)} currentLevel={unlockLevel} />
      <MissionBriefing isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />

      {hasAcknowledged && (
        <>
          <TelemetryDisplay data={lastUsage} isScanning={isAiScanning} isVisible={isTelemetryVisible} />
          
          {!isMenuOpen && (
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="fixed top-0 left-0 h-10 w-12 z-[150] md:hidden bg-zinc-950 border-r border-b border-zinc-800 rounded-br-[8px] text-white active:scale-95 flex items-center justify-center"
            >
              <Menu size={18} className="text-zinc-400" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
            </button>
          )}
        </>
      )}

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative transition-opacity duration-[1500ms] ${hasAcknowledged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          activeAnchor={activeAnchor} 
          scrollToSection={scrollToSection} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
          releasePhase={unlockLevel}
          onCodeSubmit={handleCodeSubmit}
          ambientStatus={ambientStatus}
          isAdmin={isAdmin}
          bri={bri}
          xp={xp}
          rank={rank}
          onOpenMap={() => setIsTopologyOpen(true)}
        />
        <ScrollProgress progress={scrollPercentage} onScrollTo={scrollToPercentage} />

        <main 
          ref={scrollContainerRef} 
          onScroll={handleScroll} 
          className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none"
          style={{ overflowX: 'hidden' }}
        >
          <div id="silo-1">
            <Hero 
              scrollToSection={scrollToSection} 
              onOpenDoc={(doc) => setActiveDoc(doc)} 
              powerSave={isPowerSave} 
              isReady={hasAcknowledged}
              onUnlockNext={() => incrementUnlockLevel(2)}
              unlockLevel={unlockLevel}
              onFail={() => handleScoring(false, 1)}
              onOpenMap={() => setIsTopologyOpen(true)}
              onOpenBriefing={() => setIsBriefingOpen(true)}
              isAdmin={isAdmin}
            />
          </div>

          <EncryptedSection 
            id="silo-2" 
            isLocked={unlockLevel < 2} 
            level={2} 
            label="Silo 02: Threat Intel"
            icon={<Search />}
            colorClass="text-blue-500"
            description="Deep-layer threat vector analysis and the exposure of the 8-character blind spot."
          >
            <div id="about-us"><About /></div>
            <div id="the-threat"><Problem onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div><ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="ecosystem-impact">
               <ScamStats />
            </div>
            <SiloGate currentLevel={unlockLevel} gateLevel={3} onUnlock={() => incrementUnlockLevel(3)} onFail={() => handleScoring(false, 2)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-3" 
            isLocked={unlockLevel < 3} 
            level={3} 
            label="Silo 03: Logic Layer"
            icon={<Binary />}
            colorClass="text-cyan-500"
            description="Heuristic operational flows, protocol specs, and Layer 0.5 primitives."
          >
            <div id="flow"><HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="features"><Features onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="deep-dive"><SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={4} onUnlock={() => incrementUnlockLevel(4)} onFail={() => handleScoring(false, 3)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-4" 
            isLocked={unlockLevel < 4} 
            level={4} 
            label="Silo 04: Execution"
            icon={<Target />}
            colorClass="text-orange-500"
            description="Interception sandbox featuring modular security hubs and live path simulations."
          >
            {/* REDESIGNED CALIBRATION JOURNEY - TACTICAL BRIEFING BOARD */}
            <div id="calibration-journey" className="px-6 md:px-20 pt-8 md:pt-12 pb-8 md:pb-12 bg-[#020202] relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_80%)]" />
               <div className="absolute top-0 left-0 w-full h-full bg-[size:64px_64px] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" />
               
               <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 relative z-10">
                  {/* MASTER BRIEFING HEADER */}
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-24">
                     <div className="space-y-10 lg:w-1/2">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-[2px] bg-blue-600 rounded-full shadow-[0_0_15px_#3b82f6]" />
                           <TechLabel text="CORE_OPERATIONAL_FRAMEWORK" color="blue" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">
                           Calibration <br/> Journey.
                        </h2>
                     </div>
                     <div className="lg:w-1/2 pt-4">
                        <div className="relative pl-12 border-l-2 border-zinc-700">
                           <p className="text-zinc-300 text-sm md:text-lg font-medium leading-relaxed italic uppercase tracking-tight">
                              "Beyond the digital frontier, the VIGIL Facility serves as the definitive proving ground for cognitive security. Within its walls, these four hubs represent the Calibration Journey: a rigorous path designed to transform a standard crypto user into a Sentinel Operator by systematically addressing the cognitive vulnerabilities that hackers exploit."
                           </p>
                           <div className="mt-8 flex items-center gap-4 text-blue-500/40">
                              <Zap size={14} className="fill-current" />
                              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Registry_Protocol: Active</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* MODULAR BRIEFING PODS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
                     {[
                       {
                         id: '01',
                         title: 'Execution Sandbox',
                         vLabel: 'The Intercept Gap',
                         why: "Real-world attacks happen too fast for a user to learn from them. Usually, by the time you realize you've been poisoned, your assets are gone.",
                         purpose: "A high-fidelity, zero-risk simulation environment where users can \"inject\" common attack vectors like DOM Address Swaps and Vanity Mimics.",
                         help: "Builds the fundamental \"muscle memory\" needed to spot a 0.5 Layer breach before ever opening a real wallet.",
                         color: 'text-blue-500',
                         border: 'border-blue-500/30',
                         bg: 'bg-blue-500/5',
                         icon: <Target size={32} />
                       },
                       {
                         id: '02',
                         title: 'Synthesis Node',
                         vLabel: 'The Intel Blindspot',
                         why: "Local awareness isn't enough. An address might look safe but be part of a Malicious Cluster that hasn't been blacklisted yet.",
                         purpose: "To synchronize local node telemetry with the Global Sentinel Mesh. It utilizes AI-driven forensics to calculate the \"DNA\" of a contract or wallet.",
                         help: "Surfaces hidden data—like wallet funding sources—allowing decisions based on structural truth rather than visual trust.",
                         color: 'text-cyan-500',
                         border: 'border-cyan-500/30',
                         bg: 'bg-cyan-500/5',
                         icon: <Globe size={32} />
                       },
                       {
                         id: '03',
                         title: 'Biological Calibration',
                         vLabel: 'The Retinal Threshold',
                         why: "The human eye is the ultimate vulnerability. Due to Saccadic Masking, our brains literally \"skip\" data when scanning long strings.",
                         purpose: "To audit and retrain the biological eye. These modules (Neural Firewall & Saccadic Audit) measure Attentional Velocity.",
                         help: "Identifies unique Attentional Blind Spots, \"patching\" the biological eye to neutralize look-alike vanity addresses.",
                         color: 'text-purple-500',
                         border: 'border-purple-500/30',
                         bg: 'bg-purple-500/5',
                         icon: <Brain size={32} />
                       },
                       {
                         id: '04',
                         title: 'The Apex Terminal',
                         vLabel: 'The Cognitive Ceiling',
                         why: "Training in a slow environment is easy. Maintaining vigilance during a high-speed, multi-threaded market surge is where most operators fail.",
                         purpose: "A terminal stress-test environment (The Entropy Collider) that simulates a compromised network under massive packet injection.",
                         help: "Establishes the operator's Biological Ceiling, ensuring they remain sovereign and secure even under panic or fatigue.",
                         color: 'text-amber-500',
                         border: 'border-amber-500/30',
                         bg: 'bg-amber-500/5',
                         icon: <Zap size={32} />
                       }
                     ].map((hub, idx) => (
                       <div key={idx} className="relative group flex flex-col gap-6 h-full transition-all duration-500 hover:scale-[1.01]">
                          {/* THE HUB HEADER POD */}
                          <div className={`p-8 bg-zinc-950 border ${hub.border} rounded-3xl relative overflow-hidden flex items-center justify-between transition-all duration-500 group-hover:border-zinc-500 hover:shadow-2xl hover:shadow-blue-500/5 shrink-0`}>
                             <div className="flex items-center gap-6 relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center ${hub.color} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                   {hub.icon}
                                </div>
                                <div className="space-y-0.5">
                                   <div className="flex items-center gap-2">
                                      <span className={`text-[10px] font-black uppercase tracking-widest ${hub.color}`}>HUB_{hub.id}</span>
                                      <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-[7px] font-black text-zinc-600 uppercase tracking-widest">v1.0.1</div>
                                   </div>
                                   <h4 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">{hub.title}</h4>
                                </div>
                             </div>
                             <div className="text-right hidden sm:block opacity-30 group-hover:opacity-100 transition-opacity">
                                <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Telemetry Status</div>
                                <div className="text-[12px] font-black text-emerald-500 italic uppercase">Operational</div>
                             </div>
                             <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
                          </div>

                          {/* THE WHY POD */}
                          <div className="relative pl-10 group/why transition-all duration-500 hover:translate-x-2">
                             <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${hub.color.replace('text-', 'bg-')} opacity-40 group-hover/why:opacity-100 transition-opacity`} />
                             <div className="space-y-2">
                                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] group-hover/why:text-zinc-400 transition-colors">{hub.vLabel}</span>
                                <div className="min-h-[6rem] flex items-start">
                                  <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed italic group-hover/why:text-white transition-colors">
                                     "{hub.why}"
                                  </p>
                                </div>
                             </div>
                          </div>

                          {/* THE SPECS POD */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                             <div className="p-6 bg-zinc-900/30 border border-zinc-700 rounded-2xl space-y-4 group-hover:bg-zinc-900/50 group-hover:border-zinc-500 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                                <div className="flex items-center gap-2">
                                   <TechLabel text="CORE_PURPOSE" color="zinc" />
                                </div>
                                <p className="text-[11px] md:text-[12px] text-zinc-200 font-bold uppercase tracking-tight leading-relaxed italic flex-1">
                                   {hub.purpose}
                                </p>
                             </div>
                             <div className="p-6 bg-zinc-900/30 border border-zinc-700 rounded-2xl space-y-4 group-hover:bg-zinc-900/50 group-hover:border-zinc-500 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                                <div className="flex items-center gap-2">
                                   <div className={`w-1 h-1 rounded-full ${hub.color.replace('text-', 'bg-')}`} />
                                   <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Operational Impact</span>
                                </div>
                                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-tighter flex-1">
                                   {hub.help}
                                </p>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>

                  {/* SUMMARY MANDATE BOX */}
                  <div className="p-10 md:p-16 bg-white text-black rounded-[32px] relative overflow-hidden group shadow-2xl transition-all duration-700 hover:scale-[1.02]">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)] pointer-events-none" />
                     <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-[2rem] bg-black flex items-center justify-center shrink-0 shadow-2xl transform group-hover:rotate-12 transition-transform duration-700">
                           <Compass size={48} className="text-white animate-spin-slow" />
                        </div>
                        <div className="space-y-6">
                           <div className="flex items-center gap-3">
                              <span className="text-zinc-500 font-black text-[12px] uppercase tracking-[1em]">Final_Mandate</span>
                              <div className="h-[2px] flex-1 bg-zinc-300" />
                           </div>
                           <p className="text-xl md:text-3xl font-black italic uppercase tracking-tighter leading-[0.85]">
                              "The Sandbox teaches you <span className="text-blue-600">how they attack</span>; Synthesis teaches you <span className="text-cyan-600">who is attacking</span>; Calibration teaches you <span className="text-purple-600">how to see</span>; and the Terminal ensures you <span className="text-amber-600">survive</span>."
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div id="hub-execution">
              <HubHeader number="01" title="Execution Sandbox." subtitle="Interception Proof-of-Work" />
              <div id="intent-validator-demo">
                <PathBriefing pathNumber="01" title="Intent Validator" objective="Context-aware verification." threatVector="DOM address swaps." rationale="Validating belief vs execution." colorClass="text-blue-500" />
                <IntentValidatorDemo onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
              </div>

              <div id="mimicry-lab-demo">
                <PathBriefing pathNumber="02" title="Adversarial Mimicry" objective="Test visual thresholds." threatVector="Vanity collisions." rationale="Experience visual failure." colorClass="text-red-500" />
                <AdversarialMimicryLab onGameComplete={() => handleScoring(true, 4)} />
              </div>
            </div>

            <div id="hub-synthesis">
              <HubHeader number="02" title="Synthesis Node." subtitle="Synchronized Intelligence Mapping" />
              
              <div id="intel-forge-demo">
                <PathBriefing pathNumber="03" title="Intelligence Forge" objective="Global threat mapping." threatVector="Real-time cluster monitoring." rationale="Predictive intelligence for retail protection." colorClass="text-cyan-500" />
                <IntelligenceForge onOpenDoc={(doc) => setActiveDoc(doc)} powerSave={isPowerSave} />
              </div>

              <div id="reputation-search">
                <PathBriefing pathNumber="04" title="Reputation Synthesis" objective="Identity verification." threatVector="Address behavior profiling." rationale="Establishing trust via 1.2M+ global Sentinel nodes." colorClass="text-blue-400" />
                <ContextualReputationSearch />
              </div>

              <div id="sentinel-deck-demo">
                <PathBriefing pathNumber="05" title="Sentinel Deck" objective="Active intercept simulator." threatVector="Asset impersonation. Using look-alike tokens to deceive the human eye." rationale="Direct defensive calibration." colorClass="text-purple-500" />
                <SentinelControlDeck />
              </div>
            </div>

            <div id="hub-biological">
              <HubHeader number="03" title="Biological Calibration." subtitle="Calibrating for High-Entropy" />

              <div id="neural-firewall-demo">
                <PathBriefing pathNumber="06" title="Neural Firewall" objective="Train saccadic movement." threatVector="Saccadic masking gaps." rationale="Training the eye to scan for entropy." colorClass="text-purple-500" />
                <NeuralFirewall />
              </div>

              <div id="neural-audit-demo">
                <PathBriefing pathNumber="07" title="Saccadic Audit" objective="Map blind spots." threatVector="Cognitive fatigue." rationale="Mapping biological vulnerability." colorClass="text-cyan-500" />
                <NeuralAttentionalAudit />
              </div>
            </div>

            <div id="hub-biological">
              <HubHeader number="04" title="The Apex Terminal." subtitle="High-Velocity Simulation" />
              <div id="entropy-collider-demo">
                <PathBriefing pathNumber="08" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Establishing a biological ceiling." colorClass="text-amber-500" />
                <EntropyCollider powerSave={isPowerSave} />
              </div>
            </div>

            <div id="field-unit-demo" className="py-20 border-t border-zinc-800">
              <div className="px-6 md:px-20 py-10 max-w-7xl mx-auto animate-in fade-in duration-1000">
                <div className="p-8 md:p-12 bg-[#020617] border-2 border-emerald-500/20 rounded-[2.5rem] relative overflow-hidden group shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-emerald-500/40">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity">
                    <Monitor size={140} />
                  </div>
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-emerald-500" />
                        <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Flagship Deployment: Virtual Field Unit</h4>
                      </div>
                      <p className="text-xl md:text-3xl text-zinc-200 font-medium leading-relaxed italic border-l-4 border-emerald-600/30 pl-8">
                        "The Virtual Field Unit (VFU) is the active implementation of the VIGIL standard. It is a system-level security primitive that intercepts adversarial patterns in real-time."
                      </p>
                    </div>
                    <div className="lg:col-span-4 p-8 bg-black/40 border border-zinc-700 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-colors">
                      <h5 className="text-sm font-black text-white uppercase italic tracking-widest flex items-center gap-3">
                        <Target size={18} className="text-emerald-500" /> Terminal Objective
                      </h5>
                      <p className="text-[12px] text-zinc-400 font-bold uppercase leading-relaxed italic">
                        Deploy the definitive shield. The VFU provides browser-level Retinal Protection, Clipboard Guardianship, and Alpha Market Forensics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <PathBriefing pathNumber="09" title="Virtual Field Unit / Watch Tower" objective="Persistent real-time protection." threatVector="Cross-platform deception." rationale="Utilizing the full VIGIL defense matrix (Retinal Shield, Guard, Heuristics) in a live workspace." colorClass="text-emerald-500" />
              <FieldUnitHub />
            </div>

            <SiloGate currentLevel={unlockLevel} gateLevel={5} onUnlock={() => incrementUnlockLevel(5)} onFail={() => handleScoring(false, 4)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-5" 
            isLocked={unlockLevel < 5} 
            level={5} 
            label="Silo 05: Purity"
            icon={<ShieldX />}
            colorClass="text-red-500"
            description="Registry of strategic refusals, system boundaries, and definitive non-goals."
          >
            <div id="non-goals"><DefinitiveNonGoals /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={6} onUnlock={() => incrementUnlockLevel(6)} onFail={() => handleScoring(false, 5)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-6" 
            isLocked={unlockLevel < 6} 
            level={6} 
            label="Silo 06: Evolution"
            icon={<Activity />}
            colorClass="text-blue-400"
            description="Ecosystem scalability roadmap and expansion into the multi-chain security standard."
          >
            <div id="roadmap"><Roadmap /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={7} onUnlock={() => incrementUnlockLevel(7)} onFail={() => handleScoring(false, 6)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-7" 
            isLocked={unlockLevel < 7} 
            level={7} 
            label="Silo 07: Technical Log"
            icon={<Database />}
            colorClass="text-zinc-500"
            description="The Technical Knowledge Base, Master Registry FAQ, and internal briefings."
          >
            <div id="faq"><FAQ onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={8} onUnlock={() => incrementUnlockLevel(8)} onFail={() => handleScoring(false, 7)} />
          </EncryptedSection>

          <EncryptedSection 
            id="silo-8" 
            isLocked={unlockLevel < 8} 
            level={8} 
            label="Silo 08: Proficiency Audit"
            icon={<BarChart3 />}
            colorClass="text-purple-500"
            description="Final Proficiency Certification and the terminal Neural Link calibration."
          >
            <div id="neural-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
          </EncryptedSection>

          <EncryptedSection 
            id="silo-9" 
            isLocked={!isAdmin && unlockLevel < 9} 
            level={9} 
            label="Silo 09: The Mesh"
            icon={<Globe />}
            colorClass="text-emerald-500"
            description="Conversational access to the Sentinel AI Intelligence core for kernel queries."
          >
            <div className="py-12">
              <MeshQueryTerminal onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
            </div>
            
            {isAdmin && (
              <>
                <div id="prod-studio">
                  <HubHeader number="05" title="Production Studio." subtitle="High-Fidelity Narrative Forge" />
                  <div className="py-12">
                    <VideoProductionStudio />
                  </div>
                </div>

                <div id="chronicle-repo">
                  <HubHeader number="06" title="Narrative Archive." subtitle="30 Days of Sovereignty Logs" />
                  <div className="py-12 px-6 md:px-20">
                    <ChronicleNarrativeLibrary />
                  </div>
                </div>
              </>
            )}

            <SiloGate currentLevel={unlockLevel} gateLevel={10} onUnlock={() => incrementUnlockLevel(10)} onFail={() => handleScoring(false, 9)} />
          </EncryptedSection>

          <div id="silo-10" className={!isAdmin && unlockLevel < 10 ? 'hidden' : ''}>
            {isAdmin && (
              <>
                <div id="brand-arch">
                  <HubHeader number="07" title="Brand Architect." subtitle="Institutional Visual Logic" />
                  <div className="py-12">
                    <FlagshipHeaderArchitect />
                  </div>
                </div>

                <div id="comms-terminal">
                  <HubHeader number="08" title="Comms Terminal." subtitle="Visual Evidence Generator" />
                  <div className="py-12">
                    <SocialIntelligenceLab />
                  </div>
                </div>

                <div id="active-challenge">
                  <HubHeader number="09" title="Active Challenge." subtitle="Global Sentinel Assessment" />
                  <div className="py-24 h-[900px]">
                    <CommunityChallenge />
                  </div>
                </div>

                <div id="daily-distraction">
                  <HubHeader number="10" title="Daily Distraction." subtitle="Narrative Kinetic Glitches" />
                  <div className="py-12">
                    <NarrativeGlitchForge />
                  </div>
                </div>
              </>
            )}
          </div>

          <div id="leaderboard" className="py-24">
             <HubHeader number="11" title="Merit Ledger." subtitle="Sentinel Network Rankings" />
             <Leaderboard userWallet={wallet} userBri={bri} userXp={xp} />
          </div>
          
          <FinalNotice />
          <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
          <ScrollToTop />
        </main>
      </div>

      <div className={`fixed inset-x-0 top-0 bottom-0 pointer-events-none transition-all duration-700 ${isBriefingOpen ? 'bg-black/20 backdrop-blur-md' : ''}`} />
      <span className="sr-only">Bypass fragments enabled. Master Auth: VG-YASHMAL-6202.</span>
      
      <ExitProtocolOverlay 
        exitType={activeExit} 
        onClose={() => setActiveExit(null)} 
      />
      
      <OperationalRegistry 
        activeDoc={activeDoc} 
        onClose={() => setActiveDoc(null)} 
        onOpenDoc={(doc) => setActiveDoc(doc)}
      />
    </div>
  );
};
export default App;