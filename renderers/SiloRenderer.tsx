import React from 'react';
import { Hero } from '../Hero';
import { About } from '../About';
import { Problem } from '../Problem';
import { ThreatResearch } from '../ThreatResearch';
import { ScamStats } from '../ScamStats';
import { SiloGate } from '../SiloGate';
import { HowItWorks } from '../HowItWorks';
import { Features } from '../Features';
import { SafetyVideo } from '../SafetyVideo';
import { HubHeader } from '../HubHeader';
import { PathBriefing } from '../PathBriefing';
import { IntentValidatorDemo } from '../IntentValidatorDemo';
import { AdversarialMimicryLab } from '../AdversarialMimicryLab';
import { IntelligenceForge } from '../IntelligenceForge';
import { ContextualReputationSearch } from '../ContextualReputationSearch';
import { SentinelControlDeck } from '../SentinelControlDeck';
import { NeuralFirewall } from '../NeuralFirewall';
import { NeuralAttentionalAudit } from '../NeuralAttentionalAudit';
import { EntropyCollider } from '../EntropyCollider';
import { FieldUnitHub } from '../FieldUnitHub';
import { DefinitiveNonGoals } from '../DefinitiveNonGoals';
import { Roadmap } from '../Roadmap';
import { FAQ } from '../FAQ';
import { NeuralProficiencyAudit } from '../NeuralProficiencyAudit';
import { MeshQueryTerminal } from '../MeshQueryTerminal';
import { VideoProductionStudio } from '../VideoProductionStudio';
import { ChronicleNarrativeLibrary } from '../ChronicleNarrativeLibrary';
import { FlagshipHeaderArchitect } from '../FlagshipHeaderArchitect';
import { SocialIntelligenceLab } from '../SocialIntelligenceLab';
import { CommunityChallenge } from '../CommunityChallenge';
import { NarrativeGlitchForge } from '../NarrativeGlitchForge';
import { ShieldCheck } from 'lucide-react';
import { RegistryDoc } from '../OperationalRegistry';
import { UsageData } from '../../services/geminiService';

interface SiloRendererProps {
  level: number;
  unlockLevel: number;
  isAdmin: boolean;
  isPowerSave: boolean;
  hasAcknowledged: boolean;
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
}

export const SiloRenderer: React.FC<SiloRendererProps> = ({
  level, unlockLevel, isAdmin, isPowerSave, hasAcknowledged, onboardingCompleted,
  showTutorial, wallet, isGuest, setActiveDoc, scrollToSection, incrementUnlockLevel,
  handleScoring, setIsTopologyOpen, setIsBriefingOpen, setIsIdentitySelectionOpen,
  setLastUsage, setIsAiScanning
}) => {
  switch (level) {
    case 1:
      return (
        <div className="animate-in fade-in zoom-in duration-500">
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
            isTacticalMode={true}
            onConnectWallet={() => setIsIdentitySelectionOpen(true)}
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
