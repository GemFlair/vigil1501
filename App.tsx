import React, { useEffect } from 'react';
import { Menu, Wifi, Wallet, List, LayoutGrid, LogOut } from 'lucide-react';
import { Header } from './components/Header';
import { SecurityAnnouncementBar } from './components/SecurityAnnouncementBar';
import { SecurityModal } from './components/SecurityModal';
import { IdentitySelectionModal } from './components/IdentitySelectionModal';
import { RevokeSessionModal } from './components/RevokeSessionModal';
import { OperationalRegistry } from './components/OperationalRegistry';
import { SystemBoot } from './components/SystemBoot';
import { ExitProtocolOverlay } from './components/ExitProtocolOverlay';
import { SecurityZoneBackground } from './components/SecurityZoneBackground';
import { TelemetryDisplay } from './components/TelemetryDisplay';
import { ScrollProgress } from './components/ScrollProgress';
import { SessionResumeOverlay } from './components/SessionResumeOverlay';
import { SiloTopology } from './components/SiloTopology';
import { MissionBriefing } from './components/MissionBriefing';
import { OnboardingTutorial } from './components/OnboardingTutorial';
import { ScrollToTop } from './components/ScrollToTop';
import { useVigilState } from './hooks/useVigilState';
import { SiloRenderer } from './components/renderers/SiloRenderer';
import { NarrativeInterface } from './components/layout/NarrativeInterface';
import { TacticalInterface } from './components/layout/TacticalInterface';

export type ViewMode = 'NARRATIVE' | 'TACTICAL';

const App: React.FC = () => {
  const { state, actions, refs } = useVigilState();

  const scrollToSection = (id: string) => {
    if (state.viewMode === 'TACTICAL') {
      const siloId = id.startsWith('silo-') ? parseInt(id.replace('silo-', '')) : null;
      if (siloId) actions.setActiveSpoke(siloId);
      actions.setIsMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element && refs.scrollContainerRef.current) {
      const container = refs.scrollContainerRef.current;
      const rect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const absoluteTarget = container.scrollTop + (rect.top - containerRect.top);
      
      refs.isProgrammaticScrollRef.current = true;
      refs.targetScrollTopRef.current = absoluteTarget - 20;
      actions.setActiveAnchor(id);
      actions.setIsMenuOpen(false);
    }
  };

  const scrollToPercentage = (percent: number) => {
    if (refs.scrollContainerRef.current && state.viewMode === 'NARRATIVE') {
      const { scrollHeight, clientHeight } = refs.scrollContainerRef.current;
      refs.isProgrammaticScrollRef.current = true;
      refs.targetScrollTopRef.current = (percent / 100) * (scrollHeight - clientHeight);
    }
  };

  const handleScroll = () => {
    if (refs.scrollContainerRef.current && state.viewMode === 'NARRATIVE') {
      const { scrollTop, scrollHeight, clientHeight } = refs.scrollContainerRef.current;
      if (!refs.isProgrammaticScrollRef.current) {
        refs.currentScrollTopRef.current = scrollTop;
        refs.targetScrollTopRef.current = scrollTop;
      }
      const totalScrollable = scrollHeight - clientHeight;
      const percentage = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;
      actions.setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    if (state.showTutorial) {
      actions.setViewMode('NARRATIVE');
      if (refs.scrollContainerRef.current) {
        refs.scrollContainerRef.current.scrollTop = 0;
        refs.currentScrollTopRef.current = 0;
        refs.targetScrollTopRef.current = 0;
      }
    }
  }, [state.showTutorial]);

  const ambientStatus = `STATUS: [LOCAL_NODE_OPERATIONAL] // v 0.0.0.1 // BRI: ${state.bri}% // RANK: ${state.rank}${state.isAdmin ? ' // MASTER_AUTH: OK' : ''}`;
  const isRealWallet = !!state.wallet && !state.isGuest && !state.wallet.includes("SIM_NODE") && !state.wallet.includes("VISITOR_NODE");

  return (
    <div className={`h-screen w-screen bg-[#020202] text-[#fafafa] selection:bg-blue-600/40 selection:text-white font-sans flex flex-col pt-10 overflow-hidden ${state.isPowerSave ? 'pwr-save' : ''}`}>
      
      {state.viewMode === 'TACTICAL' && <div className="crt-overlay" />}
      <SecurityZoneBackground activeAnchor={state.activeAnchor} powerSave={state.isPowerSave} />
      <SecurityAnnouncementBar onNeutralize={() => actions.handleScoring(true, state.unlockLevel)} />
      
      <SecurityModal isOpen={state.isModalOpen} onClose={(walletAddr, isGuestUser) => {
        actions.setWallet(walletAddr);
        actions.setIsGuest(!!isGuestUser);
        actions.setIsModalOpen(false);
        actions.setIsBooting(true);
      }} />

      <IdentitySelectionModal 
        isOpen={state.isIdentitySelectionOpen} 
        onClose={() => actions.setIsIdentitySelectionOpen(false)}
        onConnect={(walletAddr) => {
          actions.setWallet(walletAddr);
          actions.setIsGuest(false);
          actions.setIsIdentitySelectionOpen(false);
        }}
      />

      <RevokeSessionModal
        isOpen={state.isRevokeModalOpen}
        onClose={() => actions.setIsRevokeModalOpen(false)}
        onConfirm={() => {
          actions.setWallet('');
          actions.setIsGuest(false);
          localStorage.removeItem('vigil_user_wallet');
          localStorage.removeItem('vigil_user_is_guest');
          actions.setIsRevokeModalOpen(false);
        }}
      />

      {state.isBooting && (
        <SystemBoot onComplete={actions.handleCalibrationComplete} skipGame={state.isGuest} isGuest={state.isGuest} />
      )}

      {state.showResumePrompt && (
        <SessionResumeOverlay 
          level={state.unlockLevel} 
          onJump={() => {
            actions.setShowResumePrompt(false);
            scrollToSection(`silo-${state.unlockLevel}`);
          }} 
          onStay={() => {
            actions.setShowResumePrompt(false);
            scrollToSection('silo-1');
          }} 
        />
      )}

      {state.showTutorial && (
        <OnboardingTutorial onComplete={() => {
          actions.setShowTutorial(false);
          actions.setOnboardingCompleted(true);
          localStorage.setItem('vigil_onboarding_completed', 'true');
        }} />
      )}

      <SiloTopology isOpen={state.isTopologyOpen} onClose={() => actions.setIsTopologyOpen(false)} currentLevel={state.unlockLevel} />
      <MissionBriefing isOpen={state.isBriefingOpen} onClose={() => actions.setIsBriefingOpen(false)} />

      {state.hasAcknowledged && (
        <>
          <TelemetryDisplay data={state.lastUsage} isScanning={state.isAiScanning} isVisible={state.isTelemetryVisible} />
          
          <div className="fixed top-12 right-12 z-[150] hidden md:flex items-center gap-6 animate-in fade-in duration-1000">
             <div className="flex items-center gap-1 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
               <button 
                onClick={() => { actions.setViewMode('NARRATIVE'); actions.setActiveSpoke(null); }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${state.viewMode === 'NARRATIVE' ? 'bg-white text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <List size={10} /> Narrative
               </button>
               <button 
                onClick={() => actions.setViewMode('TACTICAL')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${state.viewMode === 'TACTICAL' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 <LayoutGrid size={10} /> Tactical
               </button>
             </div>
             <div className="h-10 w-[1px] bg-zinc-800" />
             <div className="flex flex-col items-end group/id">
                <div className="flex items-center gap-2 relative">
                   <button 
                     onClick={state.wallet ? () => actions.setIsRevokeModalOpen(true) : () => actions.setIsIdentitySelectionOpen(true)}
                     className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 group ${isRealWallet ? 'bg-zinc-950 border border-zinc-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                   >
                     {state.wallet && state.wallet !== "VISITOR_NODE_UNSYNCED" ? (
                       <>
                         <div className={`w-1.5 h-1.5 rounded-full ${isRealWallet ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-blue-400'}`} />
                         <span className="font-mono">{state.wallet.slice(0, 4)}...{state.wallet.slice(-4)}</span>
                         <div className="w-[1px] h-3 bg-zinc-800 mx-1 group-hover:bg-zinc-600 transition-colors" />
                         <LogOut size={10} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
                       </>
                     ) : (
                       <><Wallet size={12} className="group-hover:scale-110 transition-transform" /> CONNECT_IDENTITY</>
                     )}
                   </button>
                   {isRealWallet && (
                     <div className="absolute top-full mt-2 right-0 opacity-0 group-hover/id:opacity-100 transition-opacity pointer-events-none z-[200]">
                       <div className="bg-[#0a0a0a] border border-zinc-800 p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,1)] flex flex-col gap-2 min-w-[320px]">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                             <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Full_Identity_Node</span>
                             <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                          </div>
                          <p className="font-mono text-[10px] text-zinc-300 break-all leading-relaxed select-all">{state.wallet}</p>
                       </div>
                     </div>
                   )}
                </div>
                {state.wallet && <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-1 mr-1">{isRealWallet ? 'SECURE_NODE_SYNCED' : 'VISITOR_UNSYNCED'}</span>}
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

          {!state.isMenuOpen && (
            <button 
              onClick={() => actions.setIsMenuOpen(true)}
              className="fixed top-0 left-0 h-10 w-12 z-[150] md:hidden bg-zinc-950 border-r border-b border-zinc-800 rounded-br-[8px] text-white active:scale-95 flex items-center justify-center"
            >
              <Menu size={18} className="text-zinc-400" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black animate-pulse" />
            </button>
          )}
        </>
      )}

      <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative transition-opacity duration-[1500ms] ${state.hasAcknowledged ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Header 
          activeAnchor={state.viewMode === 'TACTICAL' ? (state.activeSpoke ? `silo-${state.activeSpoke}` : 'hub') : state.activeAnchor} 
          scrollToSection={scrollToSection} 
          isMenuOpen={state.isMenuOpen} 
          setIsMenuOpen={actions.setIsMenuOpen} 
          releasePhase={state.unlockLevel}
          onCodeSubmit={actions.handleCodeSubmit}
          ambientStatus={ambientStatus}
          isAdmin={state.isAdmin}
          bri={state.bri}
          xp={state.xp}
          rank={state.rank}
          onOpenMap={() => actions.setIsTopologyOpen(true)}
          onOpenDoc={(doc) => actions.setActiveDoc(doc)}
          viewMode={state.viewMode}
          setViewMode={actions.setViewMode}
          wallet={state.wallet}
          isGuest={state.isGuest}
          onConnectWallet={() => actions.setIsIdentitySelectionOpen(true)}
          onDisconnectWallet={() => actions.setIsRevokeModalOpen(true)}
        />
        
        {state.viewMode === 'NARRATIVE' && (
          <ScrollProgress progress={state.scrollPercentage} onScrollTo={scrollToPercentage} />
        )}

        {state.viewMode === 'NARRATIVE' ? (
          <NarrativeInterface 
            scrollContainerRef={refs.scrollContainerRef}
            handleScroll={handleScroll}
            hasAcknowledged={state.hasAcknowledged}
            unlockLevel={state.unlockLevel}
            isAdmin={state.isAdmin}
            isPowerSave={state.isPowerSave}
            onboardingCompleted={state.onboardingCompleted}
            showTutorial={state.showTutorial}
            wallet={state.wallet}
            isGuest={state.isGuest}
            setActiveDoc={actions.setActiveDoc}
            scrollToSection={scrollToSection}
            incrementUnlockLevel={actions.incrementUnlockLevel}
            handleScoring={actions.handleScoring}
            setIsTopologyOpen={actions.setIsTopologyOpen}
            setIsBriefingOpen={actions.setIsBriefingOpen}
            setIsIdentitySelectionOpen={actions.setIsIdentitySelectionOpen}
            setLastUsage={actions.setLastUsage}
            setIsAiScanning={actions.setIsAiScanning}
            setActiveAnchor={actions.setActiveAnchor}
            isProgrammaticScrollRef={refs.isProgrammaticScrollRef}
            targetScrollTopRef={refs.targetScrollTopRef}
            currentScrollTopRef={refs.currentScrollTopRef}
            animationFrameRef={refs.animationFrameRef}
          />
        ) : (
          <TacticalInterface 
            activeSpoke={state.activeSpoke}
            setActiveSpoke={actions.setActiveSpoke}
            unlockLevel={state.unlockLevel}
            isAdmin={state.isAdmin}
            bri={state.bri}
            xp={state.xp}
            setActiveDoc={actions.setActiveDoc}
            renderSiloContent={(level) => (
              <SiloRenderer 
                level={level}
                unlockLevel={state.unlockLevel}
                isAdmin={state.isAdmin}
                isPowerSave={state.isPowerSave}
                hasAcknowledged={state.hasAcknowledged}
                onboardingCompleted={state.onboardingCompleted}
                showTutorial={state.showTutorial}
                wallet={state.wallet}
                isGuest={state.isGuest}
                setActiveDoc={actions.setActiveDoc}
                scrollToSection={scrollToSection}
                incrementUnlockLevel={actions.incrementUnlockLevel}
                handleScoring={actions.handleScoring}
                setIsTopologyOpen={actions.setIsTopologyOpen}
                setIsBriefingOpen={actions.setIsBriefingOpen}
                setIsIdentitySelectionOpen={actions.setIsIdentitySelectionOpen}
                setLastUsage={actions.setLastUsage}
                setIsAiScanning={actions.setIsAiScanning}
              />
            )}
          />
        )}
        <ScrollToTop />
      </div>

      <div className={`fixed inset-x-0 top-0 bottom-0 pointer-events-none transition-all duration-700 ${state.isBriefingOpen ? 'bg-black/20 backdrop-blur-md' : ''}`} />
      <div id="tour-root" className="fixed inset-0 pointer-events-none z-[9999]" />
      <ExitProtocolOverlay exitType={state.activeExit} onClose={() => actions.setActiveExit(null)} />
      <OperationalRegistry 
        activeDoc={state.activeDoc} 
        onClose={() => actions.setActiveDoc(null)} 
        onOpenDoc={(doc) => actions.setActiveDoc(doc)}
        userWallet={state.wallet}
        userBri={state.bri}
        userXp={state.xp}
      />
    </div>
  );
};

export default App;
