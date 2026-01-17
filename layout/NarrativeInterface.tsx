import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { EncryptedSection } from '../components/EncryptedSection';
import { Search, Binary, Target, ShieldX, Activity, Database, BarChart3, Globe } from 'lucide-react';
import { About } from '../components/About';
import { Problem } from '../components/Problem';
import { ThreatResearch } from '../components/ThreatResearch';
import { ScamStats } from '../components/ScamStats';
import { SiloGate } from '../components/SiloGate';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { SafetyVideo } from '../components/SafetyVideo';
import { HubHeader } from '../components/HubHeader';
import { PathBriefing } from '../components/PathBriefing';
import { IntentValidatorDemo } from '../components/IntentValidatorDemo';
import { AdversarialMimicryLab } from '../components/AdversarialMimicryLab';
import { IntelligenceForge } from '../components/IntelligenceForge';
import { ContextualReputationSearch } from '../components/ContextualReputationSearch';
import { SentinelControlDeck } from '../components/SentinelControlDeck';
import { NeuralFirewall } from '../components/NeuralFirewall';
import { NeuralAttentionalAudit } from '../components/NeuralAttentionalAudit';
import { EntropyCollider } from '../components/EntropyCollider';
import { FieldUnitHub } from '../components/FieldUnitHub';
import { DefinitiveNonGoals } from '../components/DefinitiveNonGoals';
import { Roadmap } from '../components/Roadmap';
import { FAQ } from '../components/FAQ';
import { NeuralProficiencyAudit } from '../components/NeuralProficiencyAudit';
import { MeshQueryTerminal } from '../components/MeshQueryTerminal';
import { VideoProductionStudio } from '../components/VideoProductionStudio';
import { ChronicleNarrativeLibrary } from '../components/ChronicleNarrativeLibrary';
import { FlagshipHeaderArchitect } from '../components/FlagshipHeaderArchitect';
import { SocialIntelligenceLab } from '../components/SocialIntelligenceLab';
import { CommunityChallenge } from '../components/CommunityChallenge';
import { NarrativeGlitchForge } from '../components/NarrativeGlitchForge';
import { FinalNotice } from '../components/FinalNotice';
import { Footer } from '../components/Footer';
import { RegistryDoc } from '../components/OperationalRegistry';
import { UsageData } from '../../services/geminiService';

interface NarrativeInterfaceProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  handleScroll: () => void;
  hasAcknowledged: boolean;
  unlockLevel: number;
  isAdmin: boolean;
  isPowerSave: boolean;
  onboardingCompleted: boolean;
  showTutorial: boolean;
  wallet: string;
  isGuest: boolean;
  setActiveDoc: (doc: RegistryDoc) => void;
  scrollToSection: (id: string) => void;
  incrementUnlockLevel: (target?: number) => void;
  handleScoring: (isSuccess: boolean, level: number) => void;
  setIsTopologyOpen: (open: boolean) => void;
  setIsBriefingOpen: (open: boolean) => void;
  setIsIdentitySelectionOpen: (open: boolean) => void;
  setLastUsage: (usage: UsageData) => void;
  setIsAiScanning: (scanning: boolean) => void;
  setActiveAnchor: (anchor: string) => void;
  isProgrammaticScrollRef: React.MutableRefObject<boolean>;
  targetScrollTopRef: React.MutableRefObject<number>;
  currentScrollTopRef: React.MutableRefObject<number>;
  animationFrameRef: React.MutableRefObject<number | null>;
}

export const NarrativeInterface: React.FC<NarrativeInterfaceProps> = ({
  scrollContainerRef, handleScroll, hasAcknowledged, unlockLevel, isAdmin,
  isPowerSave, onboardingCompleted, showTutorial, wallet, isGuest,
  setActiveDoc, scrollToSection, incrementUnlockLevel, handleScoring,
  setIsTopologyOpen, setIsBriefingOpen, setIsIdentitySelectionOpen,
  setLastUsage, setIsAiScanning, setActiveAnchor, isProgrammaticScrollRef,
  targetScrollTopRef, currentScrollTopRef, animationFrameRef
}) => {

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
        if (entry.isIntersecting && entry.target.id) setActiveAnchor(entry.target.id);
      });
    }, options);

    const targetIds = [
      'silo-1', 'about-us', 'the-threat', 'ecosystem-impact', 'flow', 'features', 'deep-dive', 
      'calibration-journey', 'hub-execution', 'intent-validator-demo', 'mimicry-lab-demo', 
      'hub-synthesis', 'intel-forge-demo', 'reputation-search', 'sentinel-deck-demo', 
      'hub-biological', 'neural-firewall-demo', 'neural-audit-demo', 'hub-apex', 
      'entropy-collider-demo', 'field-unit-demo', 'non-goals', 'roadmap', 'faq',
      'final-proficiency-audit', 'silo-9', 'prod-studio', 'chronicle-repo', 
      'brand-architect', 'comms-terminal', 'active-challenge', 'daily-distraction', 'silo-10'
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

  return (
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
          isReady={hasAcknowledged && (onboardingCompleted || !showTutorial)}
          onUnlockNext={() => incrementUnlockLevel(2)}
          unlockLevel={unlockLevel}
          onFail={() => handleScoring(false, 1)}
          onOpenMap={() => setIsTopologyOpen(true)}
          onOpenBriefing={() => setIsBriefingOpen(true)}
          isAdmin={isAdmin}
          onConnectWallet={() => setIsIdentitySelectionOpen(true)}
          wallet={wallet}
          isGuest={isGuest}
        />
      </div>

      <EncryptedSection id="silo-2" isLocked={unlockLevel < 2} level={2} label="Silo 02: Threat Intel" icon={<Search />} colorClass="text-blue-500" description="Deep-layer threat vector analysis and the exposure of the 8-character blind spot.">
        <div id="about-us"><About /></div>
        <div id="the-threat"><Problem onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
        <div><ThreatResearch onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
        <div id="ecosystem-impact"><ScamStats /></div>
        <SiloGate currentLevel={unlockLevel} gateLevel={3} onUnlock={() => incrementUnlockLevel(3)} onFail={() => handleScoring(false, 2)} />
      </EncryptedSection>

      <div id="silo-3">
        <EncryptedSection isLocked={unlockLevel < 3} level={3} label="Silo 03: Logic Layer" icon={<Binary />} colorClass="text-cyan-500" description="Heuristic operational flows, protocol specs, and Layer 0.5 primitives.">
          <div id="flow"><HowItWorks onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
          <div id="features"><Features onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
          <div id="deep-dive"><SafetyVideo onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
          <SiloGate currentLevel={unlockLevel} gateLevel={4} onUnlock={() => incrementUnlockLevel(4)} onFail={() => handleScoring(false, 3)} />
        </EncryptedSection>
      </div>

      <div id="silo-4">
        <EncryptedSection isLocked={unlockLevel < 4} level={4} label="Silo 04: Execution" icon={<Target />} colorClass="text-orange-500" description="Interception sandbox featuring modular security hubs and live path simulations.">
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
        <EncryptedSection isLocked={unlockLevel < 5} level={5} label="Silo 05: Purity" icon={<ShieldX />} colorClass="text-red-500" description="Registry of strategic refusals, system boundaries, and definitive non-goals.">
          <div id="non-goals"><DefinitiveNonGoals /></div>
          <SiloGate currentLevel={unlockLevel} gateLevel={6} onUnlock={() => incrementUnlockLevel(6)} onFail={() => handleScoring(false, 5)} />
        </EncryptedSection>
      </div>

      <div id="silo-6">
        <EncryptedSection isLocked={unlockLevel < 6} level={6} label="Silo 06: Evolution" icon={<Activity />} colorClass="text-blue-400" description="Ecosystem scalability roadmap and expansion into the multi-chain security standard.">
          <div id="roadmap"><Roadmap /></div>
          <SiloGate currentLevel={unlockLevel} gateLevel={7} onUnlock={() => incrementUnlockLevel(7)} onFail={() => handleScoring(false, 6)} />
        </EncryptedSection>
      </div>

      <div id="silo-7">
        <EncryptedSection isLocked={unlockLevel < 7} level={7} label="Silo 07: Technical Log" icon={<Database />} colorClass="text-zinc-500" description="The Technical Knowledge Base, Master Registry FAQ, and internal briefings.">
          <div id="faq"><FAQ onOpenDoc={(doc) => setActiveDoc(doc)} /></div>
          <SiloGate currentLevel={unlockLevel} gateLevel={8} onUnlock={() => incrementUnlockLevel(8)} onFail={() => handleScoring(false, 7)} />
        </EncryptedSection>
      </div>

      <div id="silo-8">
        <EncryptedSection isLocked={unlockLevel < 8} level={8} label="Silo 08: Proficiency Audit" icon={<BarChart3 />} colorClass="text-purple-500" description="Final Proficiency Certification and the terminal Neural Link calibration.">
          <div id="final-proficiency-audit"><NeuralProficiencyAudit onCompleteExit={() => incrementUnlockLevel(9)} /></div>
        </EncryptedSection>
      </div>

      <div id="silo-9">
        <EncryptedSection isLocked={!isAdmin && unlockLevel < 9} level={9} label="Silo 09: The Mesh" icon={<Globe />} colorClass="text-emerald-500" description="Conversational access to the Sentinel AI Intelligence core for kernel queries.">
          <div className="py-12"><MeshQueryTerminal onUsageUpdate={(usage) => setLastUsage(usage)} onScanningChange={(scanning) => setIsAiScanning(scanning)} /></div>
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
        </EncryptedSection>
      </div>

      <div id="silo-10" className={!isAdmin && unlockLevel < 10 ? 'hidden' : ''}>
        {isAdmin && (
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
        )}
      </div>
      <FinalNotice />
      <Footer onOpenDoc={(doc) => setActiveDoc(doc)} />
    </main>
  );
};
