
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Zap, Target, Shield, Terminal, Crosshair, Radio } from 'lucide-react';
import { playSuccessChime } from '../utils/audio';

interface TourStep {
  id: string;
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const STEPS: TourStep[] = [
  {
    id: 'briefing',
    targetId: 'tour-mission-briefing',
    title: 'MISSION_BRIEFING',
    content: 'ACCESS_AUTHORIZED: Start here for your core operational objectives and silo definitions.',
    position: 'bottom'
  },
  {
    id: 'bri',
    targetId: 'tour-bri-dash',
    title: 'RESILIENCE_TELEMETRY',
    content: 'Your Biological Resilience Index (BRI) tracks neural calibration. High accuracy strengthens the shield.',
    position: 'right'
  },
  {
    id: 'parity',
    targetId: 'tour-view-mode',
    title: 'INTERFACE_PARITY',
    content: 'Switch between NARRATIVE focus and TACTICAL hub views for situational awareness.',
    position: 'right'
  },
  {
    id: 'decryption',
    targetId: 'tour-fragment-input',
    title: 'FRAGMENT_DECRYPTION',
    content: 'Input discovered Registry Keys here to unlock restricted data logs and advanced silos.',
    position: 'right'
  },
  {
    id: 'purge',
    targetId: 'tour-hold-purge',
    title: 'NUCLEAR_PURGE',
    content: 'Emergency wipe. Hold this to purge all local registry data and revoke identity.',
    position: 'right'
  },
  {
    id: 'sidebar',
    targetId: 'tour-sidebar-nav',
    title: 'SECTOR_MANIFEST',
    content: 'Direct navigation to all active security silos and the merit ledger.',
    position: 'right'
  }
];

export const OnboardingTutorial: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const updateCoords = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const step = STEPS[currentStep];
    const el = document.getElementById(step.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      // Scroll to element if not visible
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      updateCoords();
    }, 1000);
    
    window.addEventListener('resize', updateCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCoords);
    };
  }, [updateCoords]);

  const handleNext = () => {
    playSuccessChime();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }
  };

  if (!isVisible) return null;

  const step = STEPS[currentStep];

  // Tooltip positioning logic
  const getTooltipStyle = (): React.CSSProperties => {
    if (isMobile) {
      // Mobile positioning: centered at bottom
      return {
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100vw - 40px)',
        maxWidth: '400px'
      };
    }

    const gap = 20;
    if (step.position === 'right') {
      return { 
        position: 'absolute',
        top: coords.top + coords.height / 2, 
        left: coords.left + coords.width + gap, 
        transform: 'translateY(-50%)' 
      };
    }
    if (step.position === 'bottom') {
      return { 
        position: 'absolute',
        top: coords.top + coords.height + gap, 
        left: coords.left + coords.width / 2, 
        transform: 'translateX(-50%)' 
      };
    }
    return { 
      position: 'absolute',
      top: coords.top, 
      left: coords.left 
    };
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {/* Dimmed Overlay with Hole */}
      <div 
        className="absolute inset-0 bg-black/80 transition-all duration-700" 
        style={{
          clipPath: `polygon(
            0% 0%, 0% 100%, 100% 100%, 100% 0%,
            ${coords.left}px 0%,
            ${coords.left}px ${coords.top}px,
            ${coords.left + coords.width}px ${coords.top}px,
            ${coords.left + coords.width}px ${coords.top + coords.height}px,
            ${coords.left}px ${coords.top + coords.height}px,
            ${coords.left}px ${coords.top}px,
            ${coords.left}px 0%
          )`
        }}
      />

      {/* Pulsing Brackets around target */}
      <div 
        className="absolute border-2 border-cyan-500/40 rounded-xl transition-all duration-500 animate-tour-bracket"
        style={{
          top: coords.top - 8,
          left: coords.left - 8,
          width: coords.width + 16,
          height: coords.height + 16,
        }}
      >
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      </div>

      {/* Tooltip Card */}
      <div 
        className="absolute pointer-events-auto bg-[#0a0a0a] border border-zinc-800 rounded-[2rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,1)] animate-in zoom-in duration-500"
        style={getTooltipStyle()}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-600/30" />
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
             <div className="flex items-center gap-3">
                <Target size={14} className="text-cyan-500" />
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">{step.title}</span>
             </div>
             <span className="text-[10px] font-mono text-zinc-700">{currentStep + 1}/{STEPS.length}</span>
          </div>
          
          <p className="text-[12px] text-zinc-400 font-bold leading-relaxed italic uppercase">
            {step.content}
          </p>

          <button 
            onClick={handleNext}
            className="w-full py-4 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 group shadow-xl"
          >
            OK / PROCEED <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tour-bracket {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        .animate-tour-bracket {
          animation: tour-bracket 2s infinite ease-in-out;
        }
      `}</style>
    </div>,
    document.body
  );
};
