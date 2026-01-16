import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Binary, Target, ShieldX, Activity, Database, BarChart3, Globe, Trophy, Info, Zap, Radio, Smartphone, Monitor, Brain, Cpu, Layers, Sparkles, ShieldAlert, ShieldCheck, ZapOff, Clock, ArrowRight, ArrowDownRight, Compass, Wifi, LayoutGrid, List, Wallet, ChevronRight } from 'lucide-react';
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
import { NeuralFirewall } from './components/NeuralFirewall';
import { NeuralAttentionalAudit } from './components/NeuralAttentionalAudit';
import { SentinelControlDeck } from './components/SentinelControlDeck';
import { EntropyCollider } from './components/EntropyCollider';
import { TacticalAtrium } from './components/TacticalAtrium';
import { OnboardingTutorial } from './components/OnboardingTutorial';

export type ViewMode = 'NARRATIVE' | 'TACTICAL';

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
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Interface Parity States
  const [viewMode, setViewMode] = useState<ViewMode>(() => 
    (localStorage.getItem('vigil_view_mode') as ViewMode) || 'NARRATIVE'
  );
  const [activeSpoke, setActiveSpoke] = useState<number | null>(null);
  
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
    localStorage.setItem('vigil_view_mode', viewMode);
  }, [viewMode]);

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
    if (!hasAcknowledged || viewMode === 'TACTICAL') return;

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
      'final-proficiency-audit', 'silo-9', 'prod-studio', 'chronicle-repo', 
      'brand-arch', 'comms-terminal', 'active-challenge', 'daily-distraction',
      'silo-10'
    ];

    targetIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasAcknowledged, unlockLevel, isAdmin, viewMode]);

  useEffect(() => {
    const smoothScrollLoop = () => {
      if (!scrollContainerRef.current || viewMode === 'TACTICAL') return;
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
  }, [viewMode]);

  const handleScroll = () => {
    if (scrollContainerRef.current && viewMode === 'NARRATIVE') {
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
    if (scrollContainerRef.current && viewMode === 'NARRATIVE') {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      isProgrammaticScrollRef.current = true;
      targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const scrollToSection = (id: string) => {
    if (viewMode === 'TACTICAL') {
      const siloId = id.startsWith('silo-') ? parseInt(id.replace('silo-', '')) : null;
      if (siloId) {
        setActiveSpoke(siloId);
      }
      setIsMenuOpen(false);
      return;
    }

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
    
    // Trigger Onboarding Tutorial if first time
    if (!localStorage.getItem('vigil_onboarding_completed')) {
      setShowTutorial(true);
    }
  };

  const ambientStatus = `STATUS: [LOCAL_NODE_OPERATIONAL] // v 0.0.0.1 // BRI: ${bri}% // RANK: ${rank}${isAdmin ? ' // MASTER_AUTH: OK' : ''}`;

  const incrementUnlockLevel = (target?: number) => {
    if (isGuest) return; 
    const nextLevel = target || Math.min(10, unlockLevel + 1);
    setUnlockLevel(nextLevel);
    handleScoring(true, nextLevel);
    
    if (viewMode === 'NARRATIVE') {
      setTimeout(() => {
        scrollToSection(`silo-${nextLevel}`);
      }, 1000);
    }
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

  // Content renderers for Tactical Spokes
  const renderSiloContent = (level: number) => {
    switch (level) {
      case 1:
        return (
          <div className="animate-in fade-in zoom-in duration-500">
            <Hero 
              scrollToSection={scrollToSection} 
              onOpenDoc={(doc) => setActiveDoc(doc)} 
              powerSave={isPowerSave} 
              isReady={hasAcknowledged && !showTutorial}
              onUnlockNext={() => incrementUnlockLevel(2)}
              unlockLevel={unlockLevel}
              onFail={() => handleScoring(false, 1)}
              onOpenMap={() => setIsTopologyOpen(true)}
              onOpenBriefing={() => setIsBriefingOpen(true)}
              isAdmin={isAdmin}
              isTacticalMode={true}
              onConnectWallet={() => setIsModalOpen(true)}
              wallet={wallet}
              isGuest={isGuest}
            />
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="about-us"><About /></div>
            <div id="the-threat"><Problem onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div><ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="ecosystem-impact"><ScamStats /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={3} onUnlock={() => incrementUnlockLevel(3)} onFail={() => handleScoring(false, 2)} />
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="flow"><HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="features"><Features onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <div id="deep-dive"><SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={4} onUnlock={() => incrementUnlockLevel(4)} onFail={() => handleScoring(false, 3)} />
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
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
            <div id="hub-apex">
              <HubHeader number="04" title="The Apex Terminal." subtitle="High-Velocity Simulation" />
              <div id="entropy-collider-demo">
                <PathBriefing pathNumber="08" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Establishing a biological ceiling." colorClass="text-amber-500" />
                <EntropyCollider powerSave={isPowerSave} />
              </div>
            </div>
            <div id="field-unit-demo" className="py-20 border-t border-zinc-800">
              <PathBriefing pathNumber="09" title="Virtual Field Unit / Watch Tower" objective="Persistent real-time protection." threatVector="Cross-platform deception." rationale="Utilizing the full VIGIL defense matrix (Retinal Shield, Guard, Heuristics) in a live workspace." colorClass="text-emerald-500" />
              <FieldUnitHub />
            </div>
            <SiloGate currentLevel={unlockLevel} gateLevel={5} onUnlock={() => incrementUnlockLevel(5)} onFail={() => handleScoring(false, 4)} />
          </div>
        );
      case 5:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="non-goals"><DefinitiveNonGoals /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={6} onUnlock={() => incrementUnlockLevel(6)} onFail={() => handleScoring(false, 5)} />
          </div>
        );
      case 6:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="roadmap"><Roadmap /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={7} onUnlock={() => incrementUnlockLevel(7)} onFail={() => handleScoring(false, 6)} />
          </div>
        );
      case 7:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="faq"><FAQ onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
            <SiloGate currentLevel={unlockLevel} gateLevel={8} onUnlock={() => incrementUnlockLevel(8)} onFail={() => handleScoring(false, 7)} />
          </div>
        );
      case 8:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div id="final-proficiency-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
          </div>
        );
      case 9:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="py-12">
              <MeshQueryTerminal onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} />
            </div>
            {isAdmin && (
              <>
                <div id="prod-studio">
                  <HubHeader number="05" title="Production Studio." subtitle="High-Fidelity Narrative Forge" />
                  <div className="py-12"><VideoProductionStudio /></div>
                </div>
                <div id="chronicle-repo">
                  <HubHeader number="06" title="Narrative Archive." subtitle="30 Days of Sovereignty Logs" />
                  <div className="py-12 px-6 md:px-20"><ChronicleNarrativeLibrary /></div>
                </div>
              </>
            )}
            <SiloGate currentLevel={unlockLevel} gateLevel={10} onUnlock={() => incrementUnlockLevel(10)} onFail={() => handleScoring(false, 9)} />
          </div>
        );
      case 10:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {isAdmin ? (
              <>
                <div id="brand-arch">
                  <HubHeader number="07" title="Brand Architect." subtitle="Institutional Visual Logic" />
                  <div className="py-12"><FlagshipHeaderArchitect /></div>
                </div>
                <div id="comms-terminal">
                  <HubHeader number="08" title="Comms Terminal." subtitle="Visual Evidence Generator" />
                  <div className="py-12"><SocialIntelligenceLab /></div>
                </div>
                <div id="active-challenge">
                  <HubHeader number="09" title="Active Challenge." subtitle="Global Sentinel Assessment" />
                  <div className="py-24"><CommunityChallenge /></div>
                </div>
                <div id="daily-distraction">
                  <HubHeader number="10" title="Daily Distraction." subtitle="Narrative Kinetic Glitches" />
                  <div className="py-12"><NarrativeGlitchForge /></div>
                </div>
              </>
            ) : (
              <div className="h-[60vh] flex items-center justify-center text-center p-12">
                <div className="space-y-6">
                  <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto" />
                  <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Perimeter Secure.</h3>
                  <p className="text-zinc-500 max-w-md mx-auto">"Operator has reached terminal proficiency. Final disengage sequence active."</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const isRealWallet = wallet && !isGuest && !wallet.includes("VISITOR_NODE");

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${isPowerSave ? 'pwr-save' : ''}`}>
      
      {viewMode === 'TACTICAL' && <div className="crt-overlay" />}
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

      {showTutorial && (
        <OnboardingTutorial onComplete={() => {
          setShowTutorial(false);
          localStorage.setItem('vigil_onboarding_completed', 'true');
        }} />
      )}

      <SiloTopology isOpen={isTopologyOpen} onClose={() => setIsTopologyOpen(false)} currentLevel={unlockLevel} />
      <MissionBriefing isOpen={isBriefingOpen} onClose={() => setIsBriefingOpen(false)} />

      {hasAcknowledged && (
        <>
          <TelemetryDisplay data={lastUsage} isScanning={isAiScanning} isVisible={isTelemetryVisible} />
          
          <div className="fixed top-12 right-12 z-[150] hidden md:flex items-center gap-6 animate-in fade-in duration-1000">
             {/* View Mode Toggle */}
             <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
               <button 
                onClick={() => { setViewMode('NARRATIVE'); setActiveSpoke(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'NARRATIVE' ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <List size={10} /> Narrative
               </button>
               <button 
                onClick={() => setViewMode('TACTICAL')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${viewMode === 'TACTICAL' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <LayoutGrid size={10} /> Tactical
               </button>
             </div>

             <div className="h-10 w-[1px] bg-zinc-800" />

             <div className="flex flex-col items-end">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 group ${isRealWallet ? 'bg-zinc-950 border border-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                >
                  {wallet ? (
                    <>
                      <div className={`w-1.5 h-1.5 rounded-full ${isRealWallet ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-blue-400'}`} />
                      <span className="font-mono">{wallet.slice(0, 4)}...{wallet.slice(-4)}</span>
                    </>
                  ) : (
                    <>
                      <Wallet size={12} className="group-hover:scale-110 transition-transform" /> 
                      CONNECT_IDENTITY
                    </>
                  )}
                </button>
                {wallet && (
                  <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-1 mr-1">
                    {isRealWallet ? 'SECURE_NODE_SYNCED' : 'VISITOR_UNSYNCED'}
                  </span>
                )}
             </div>
             <div className="h-10 w-[1px] bg-zinc-800" />
             <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                <Wifi size={14} className="text-blue-500" />
                <div className="space-y-0.5">
                   <div className="text-[7px] font-black text-zinc-600 uppercase tracking-widest">Relay</div>
                   <div className="text-[9px] font-black text-white uppercase italic">STABLE</div>
                </div>
             </div>
          </div>

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
          activeAnchor={viewMode === 'TACTICAL' ? (activeSpoke ? `silo-${activeSpoke}` : 'hub') : activeAnchor} 
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
          onOpenDoc={(doc) => setActiveDoc(doc)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          wallet={wallet}
          isGuest={isGuest}
          onConnectWallet={() => setIsModalOpen(true)}
        />
        
        {viewMode === 'NARRATIVE' && (
          <ScrollProgress progress={scrollPercentage} onScrollTo={scrollToPercentage} />
        )}

        <main 
          ref={scrollContainerRef} 
          onScroll={handleScroll} 
          className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none"
          style={{ overflowX: 'hidden' }}
        >
          {viewMode === 'NARRATIVE' ? (
            <>
              <div id="silo-1">
                <Hero 
                  scrollToSection={scrollToSection} 
                  onOpenDoc={(doc) => setActiveDoc(doc)} 
                  powerSave={isPowerSave} 
                  isReady={hasAcknowledged && !showTutorial}
                  onUnlockNext={() => incrementUnlockLevel(2)}
                  unlockLevel={unlockLevel}
                  onFail={() => handleScoring(false, 1)}
                  onOpenMap={() => setIsTopologyOpen(true)}
                  onOpenBriefing={() => setIsBriefingOpen(true)}
                  isAdmin={isAdmin}
                  onConnectWallet={() => setIsModalOpen(true)}
                  wallet={wallet}
                  isGuest={isGuest}
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

              <div id="silo-3">
                <EncryptedSection 
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
              </div>

              <div id="silo-4">
                <EncryptedSection 
                  isLocked={unlockLevel < 4} 
                  level={4} 
                  label="Silo 04: Execution"
                  icon={<Target />}
                  colorClass="text-orange-500"
                  description="Interception sandbox featuring modular security hubs and live path simulations."
                >
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

                  <div id="hub-apex">
                    <HubHeader number="04" title="The Apex Terminal." subtitle="High-Velocity Simulation" />
                    <div id="entropy-collider-demo">
                      <PathBriefing pathNumber="08" title="Entropy Collider" objective="Stress-test environment." threatVector="Massive scale poisoning." rationale="Establishing a biological ceiling." colorClass="text-amber-500" />
                      <EntropyCollider powerSave={isPowerSave} />
                    </div>
                  </div>

                  <div id="field-unit-demo" className="py-20 border-t border-zinc-800">
                    <PathBriefing pathNumber="09" title="Virtual Field Unit / Watch Tower" objective="Persistent real-time protection." threatVector="Cross-platform deception." rationale="Utilizing the full VIGIL defense matrix (Retinal Shield, Guard, Heuristics) in a live workspace." colorClass="text-emerald-500" />
                    <FieldUnitHub />
                  </div>

                  <SiloGate currentLevel={unlockLevel} gateLevel={5} onUnlock={() => incrementUnlockLevel(5)} onFail={() => handleScoring(false, 4)} />
                </EncryptedSection>
              </div>

              <div id="silo-5">
                <EncryptedSection 
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
              </div>

              <div id="silo-6">
                <EncryptedSection 
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
              </div>

              <div id="silo-7">
                <EncryptedSection 
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
              </div>

              <div id="silo-8">
                <EncryptedSection 
                  isLocked={unlockLevel < 8} 
                  level={8} 
                  label="Silo 08: Proficiency Audit"
                  icon={<BarChart3 />}
                  colorClass="text-purple-500"
                  description="Final Proficiency Certification and the terminal Neural Link calibration."
                >
                  <div id="final-proficiency-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
                </EncryptedSection>
              </div>

              <div id="silo-9">
                <EncryptedSection 
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
              </div>

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
                      <div className="py-24">
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

              <FinalNotice />
              <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
            </>
          ) : (
            /* TACTICAL HUB VIEW - Optimized Mobile Spacing */
            <div className="w-full flex flex-col p-1 md:p-12 animate-in fade-in zoom-in duration-700">
               {activeSpoke ? (
                 <div className="flex-1 flex flex-col h-full animate-in slide-in-from-right duration-500">
                    <div className="shrink-0 flex items-center justify-between py-4 px-4 md:py-6 md:px-10 bg-zinc-950 border-b border-zinc-800 rounded-t-[1.5rem] md:rounded-t-[2.5rem] relative group">
                       <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-blue-500/50 transition-all">
                             <Target className="text-blue-500 animate-pulse" size={20} />
                          </div>
                          <div className="space-y-0.5">
                             <div className="text-[8px] md:text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Sector</div>
                             <h4 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter">Silo 0{activeSpoke}</h4>
                          </div>
                       </div>
                       <button 
                         onClick={() => setActiveSpoke(null)}
                         className="px-4 py-3 md:px-8 md:py-4 bg-white text-black rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center gap-2 md:gap-3 active:scale-95 group"
                       >
                          <ArrowDownRight className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-180 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform" /> 
                          <span className="hidden sm:inline">RETURN_TO_ATRIUM</span>
                          <span className="sm:hidden">EXIT</span>
                       </button>
                       <div className="absolute bottom-0 left-0 h-[1px] bg-blue-500/40 w-full" />
                    </div>
                    
                    <div className="p-2 md:p-10 bg-zinc-950/20 border-x border-b border-zinc-800 shadow-2xl space-y-12 md:space-y-24">
                       {/* Fixed 'level' not found by using 'activeSpoke' */}
                       {renderSiloContent(activeSpoke)}
                    </div>
                    
                    <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
                 </div>
               ) : (
                 <div className="space-y-12 md:space-y-24">
                   <TacticalAtrium 
                     currentLevel={unlockLevel} 
                     isAdmin={isAdmin} 
                     bri={bri} 
                     xp={xp} 
                     onSelectSilo={(id) => setActiveSpoke(id)} 
                   />
                   <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
                 </div>
               )}
            </div>
          )}
          <ScrollToTop />
        </main>
      </div>

      <div className={`fixed inset-x-0 top-0 bottom-0 pointer-events-none transition-all duration-700 ${isBriefingOpen ? 'bg-black/20 backdrop-blur-md' : ''}`} />
      
      <div id="tour-root" className="fixed inset-0 pointer-events-none z-[9999]" />

      <ExitProtocolOverlay 
        exitType={activeExit} 
        onClose={() => setActiveExit(null)} 
      />
      
      <OperationalRegistry 
        activeDoc={activeDoc} 
        onClose={() => setActiveDoc(null)} 
        onOpenDoc={(doc) => setActiveDoc(doc)}
        userWallet={wallet}
        userBri={bri}
        userXp={xp}
      />
    </div>
  );
};

export default App;