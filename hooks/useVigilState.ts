import { useState, useEffect, useRef } from 'react';
import { UsageData } from '../services/geminiService';
import { ExitType } from '../components/ExitProtocolOverlay';
import { RegistryDoc } from '../components/OperationalRegistry';
import { ViewMode } from '../App';
import { calculateScoring } from '../utils/scoring';

export const useVigilState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(() => !localStorage.getItem('vigil_node_acknowledged'));
  const [isIdentitySelectionOpen, setIsIdentitySelectionOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
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
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => localStorage.getItem('vigil_onboarding_completed') === 'true');
  
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
    if (!localStorage.getItem('vigil_onboarding_completed')) {
      setShowTutorial(true);
    }
  };

  const incrementUnlockLevel = (target?: number) => {
    if (isGuest) return; 
    const nextLevel = target || Math.min(10, unlockLevel + 1);
    setUnlockLevel(nextLevel);
    handleScoring(true, nextLevel);
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

  return {
    state: {
      isMenuOpen, isModalOpen, isIdentitySelectionOpen, isRevokeModalOpen, isBooting,
      hasAcknowledged, isGuest, activeDoc, activeAnchor, scrollPercentage, isPowerSave,
      activeExit, showResumePrompt, isTopologyOpen, isBriefingOpen, isAdmin, showTutorial,
      onboardingCompleted, viewMode, activeSpoke, wallet, bri, xp, unlockLevel, rank,
      lastUsage, isAiScanning, isTelemetryVisible
    },
    refs: {
      scrollContainerRef, targetScrollTopRef, currentScrollTopRef, isProgrammaticScrollRef, animationFrameRef
    },
    actions: {
      setIsMenuOpen, setIsModalOpen, setIsIdentitySelectionOpen, setIsRevokeModalOpen,
      setIsBooting, setHasAcknowledged, setIsGuest, setActiveDoc, setActiveAnchor,
      setScrollPercentage, setIsPowerSave, setActiveExit, setShowResumePrompt,
      setIsTopologyOpen, setIsBriefingOpen, setIsAdmin, setShowTutorial,
      setOnboardingCompleted, setViewMode, setActiveSpoke, setWallet, setBri, setXp,
      setUnlockLevel, setRank, setLastUsage, setIsAiScanning, setIsTelemetryVisible,
      handleScoring, handleCalibrationComplete, incrementUnlockLevel, handleCodeSubmit
    }
  };
};
