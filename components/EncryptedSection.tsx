
import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface EncryptedSectionProps {
  children: React.FC | React.ReactNode;
  isLocked: boolean;
  level: number;
  label: string;
  id?: string;
  icon?: React.ReactNode;
  colorClass?: string;
  description?: string;
}

export const EncryptedSection: React.FC<EncryptedSectionProps> = ({ 
  children, 
  isLocked, 
  level, 
  label, 
  id,
  icon,
  colorClass = "text-blue-500",
  description
}) => {
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);

  useEffect(() => {
    if (!isLocked && !hasTriggeredReveal) {
      setHasTriggeredReveal(true);
      setIsAnimationActive(true);
      const timer = setTimeout(() => setIsAnimationActive(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isLocked, hasTriggeredReveal]);

  return (
    <div 
      id={id} 
      className={`relative transition-all duration-1000 ${
        isLocked 
          ? 'h-auto overflow-hidden my-6 md:my-10 py-6 flex items-center justify-center' 
          : 'min-h-fit my-0'
      }`}
      style={{ overflow: isLocked ? 'hidden' : 'visible' }}
    >
      {isLocked ? (
        <div className="relative w-full h-full group px-6 flex items-center justify-center">
          {/* Blurred background preview - restricted to background layer */}
          <div className="absolute inset-0 filter blur-3xl grayscale opacity-10 pointer-events-none select-none overflow-hidden">
            {typeof children === 'function' ? React.createElement(children as React.FC) : children}
          </div>

          {/* THE DEFINITIVE CARD FRAME */}
          <div className={`max-w-xl w-full bg-[#070707]/95 backdrop-blur-3xl border-2 border-zinc-700 rounded-[32px] md:rounded-[48px] p-10 md:p-16 text-center space-y-8 md:space-y-12 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden group-hover:border-zinc-500 transition-all duration-700 z-40`}>
             
             {/* Technical Trace Pattern */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:30px_30px] bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)]" />
             
             {/* TOP EDGE HIGHLIGHT (Ensures visibility) */}
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-40" />
             
             {/* BOTTOM EDGE HIGHLIGHT (Ensures closure) */}
             <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

             <div className="flex flex-col items-center gap-6 md:gap-12 relative z-10">
                <div className="relative">
                  <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[1.75rem] md:rounded-[2.5rem] bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center ${colorClass} shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-1000`}>
                    {icon ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 40 }) : <Lock size={32} />}
                  </div>
                  <div className={`absolute -top-3 -right-3 w-10 h-10 bg-black border border-zinc-700 rounded-full flex items-center justify-center text-red-500 shadow-2xl z-20`}>
                    <Lock size={16} />
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                   <div className="flex flex-col items-center gap-2">
                     <span className={`text-[10px] md:text-[13px] font-black uppercase tracking-[0.7em] ${colorClass}`}>{label}</span>
                     <div className={`h-[1px] w-10 ${colorClass.replace('text-', 'bg-')} opacity-30`} />
                   </div>
                   <h3 className="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Encrypted <br/> Segment.</h3>
                   {description && (
                     <p className="text-zinc-500 text-xs md:text-lg font-bold uppercase tracking-widest leading-relaxed max-w-sm mx-auto italic border-t border-zinc-900 pt-8 mt-8">
                      {description}
                     </p>
                   )}
                </div>

                <div className="pt-8 space-y-4 border-t border-white/5 w-full">
                  <p className="text-zinc-700 text-[9px] md:text-[12px] font-black uppercase tracking-[0.5em] leading-relaxed">
                    NEURAL LINK DISCONNECTED. <br/> 
                    <span className="text-zinc-800">COMPLETE PREVIOUS SILO TO PROCEED.</span>
                  </p>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div 
          className={`relative ${isAnimationActive ? 'animate-shatter' : ''}`}
          style={{ overflow: 'visible' }}
        >
          {typeof children === 'function' ? React.createElement(children as React.FC) : children}
        </div>
      )}
    </div>
  );
};
