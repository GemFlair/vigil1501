import React, { useEffect, useState, useRef } from 'react';
import { X, Terminal } from 'lucide-react';

import { PrivacyContent } from './docs/PrivacyContent';
import { DisclaimerContent } from './docs/DisclaimerContent';
import { TechnicalSpecContent } from './docs/TechnicalSpecContent';
import { TermsContent } from './docs/TermsContent';
import { PricingContent } from './docs/PricingContent';
import { WhitepaperContent } from './docs/WhitepaperContent';
import { TechnicalDocumentationContent } from './docs/TechnicalDocumentationContent';
import { ThreatModelContent } from './docs/ThreatModelContent';
import { ResearchBriefingContent } from './docs/ResearchBriefingContent';
import { CodeRegistryContent } from './docs/CodeRegistryContent';
import { IdentityManifestContent } from './docs/IdentityManifestContent';
import { HowToUseContent } from './docs/HowToUseContent';
import { VigilScanner } from './VigilScanner';
import { UsageData } from '../services/geminiService';

export type RegistryDoc = 'how_to_use' | 'privacy' | 'terms' | 'docs' | 'audit' | 'disclaimer' | 'pricing' | 'research_01' | 'technical_spec' | 'technical_doc' | 'press_kit' | 'whitepaper' | 'threat_model' | 'challenge' | 'comms_terminal' | 'social_forge' | 'prd_10_a' | 'master_broadcast' | 'chronicle_library' | 'identity_manifest' | 'mesh_intel' | 'narrative_forge' | 'header_architect' | null;

interface DocContentProps {
  type: RegistryDoc;
  onOpenDoc: (doc: RegistryDoc) => void;
}

const DocContent = ({ type, onOpenDoc }: DocContentProps) => {
  switch (type) {
    case 'identity_manifest': return <IdentityManifestContent />;
    case 'whitepaper': return <WhitepaperContent />;
    case 'disclaimer': return <DisclaimerContent />;
    case 'terms': return <TermsContent />;
    case 'privacy': return <PrivacyContent />;
    case 'pricing': return <PricingContent />;
    case 'technical_spec': return <TechnicalSpecContent />;
    case 'technical_doc': return <TechnicalDocumentationContent />;
    case 'threat_model': return <ThreatModelContent />;
    case 'research_01': return <ResearchBriefingContent />;
    case 'how_to_use': return <HowToUseContent />;
    case 'prd_10_a': return <CodeRegistryContent />;
    default: return (
      <div className="flex flex-col items-center justify-center py-32">
        <VigilScanner label="PROVISIONING_REGISTRY_SEGMENT" size="lg" />
      </div>
    );
  }
};

export const OperationalRegistry: React.FC<OperationalRegistryProps> = ({ 
  activeDoc, onClose, onOpenDoc 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDoc) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
  }, [activeDoc]);

  if (!activeDoc && !isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[1000] flex items-center justify-center px-2 md:px-20 py-4 md:py-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-3xl" onClick={onClose} />
      <div ref={containerRef} className={`relative w-full max-w-[1400px] h-full bg-[#050505] border border-zinc-900/50 rounded-[24px] md:rounded-[32px] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 flex flex-col ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-20 scale-95'}`}>
        <div className="h-16 md:h-20 border-b border-zinc-900/50 px-6 md:px-14 flex items-center justify-between glass z-[1001] shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-[4px] flex items-center justify-center shadow-lg"><div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rotate-45" /></div>
              <span className="text-base md:text-lg font-black tracking-tighter uppercase italic text-white">Vigil</span>
            </div>
            <div className="h-6 w-[1px] bg-zinc-900 shrink-0" />
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-zinc-500 uppercase tracking-widest whitespace-nowrap overflow-hidden">
              <Terminal className="w-3 md:w-3.5 h-3 md:h-3.5" /> 
              <span>Registry</span>
              <span className="text-zinc-800">/</span> 
              <span className={`italic uppercase truncate text-blue-500`}>
                {activeDoc?.replace('_', ' ')}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 md:w-10 md:h-10 rounded-[8px] md:rounded-[12px] bg-zinc-950/50 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all"><X className="w-4 md:w-5 h-4 md:h-5" /></button>
        </div>
        <div className={`flex-1 overflow-y-auto custom-scrollbar pt-8 md:pt-24 px-2 md:px-20 relative z-10 no-scrollbar`}>
           <DocContent 
            type={activeDoc} 
            onOpenDoc={onOpenDoc}
           />
        </div>
        <div className="h-8 md:h-10 border-t border-zinc-900/50 px-6 md:px-14 flex items-center justify-between bg-black/50 z-[1001] shrink-0">
           <div className="flex items-center gap-2 md:gap-4 text-[7px] md:text-[8px] font-black text-zinc-700 uppercase tracking-widest italic">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500 animate-pulse" /> Silo 10 Operational
           </div>
           <div className="text-[7px] md:text-[8px] font-black text-zinc-800 uppercase tracking-widest italic">VIG-Registry-10</div>
        </div>
      </div>
    </div>
  );
};

interface OperationalRegistryProps {
  activeDoc: RegistryDoc;
  onClose: () => void;
  onOpenDoc: (doc: RegistryDoc) => void;
  isUnlocked?: boolean;
  onUsageUpdate?: (usage: UsageData) => void;
  onScanningChange?: (isScanning: boolean) => void;
}