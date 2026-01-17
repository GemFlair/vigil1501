import React from 'react';
import { Target, ArrowDownRight } from 'lucide-react';
import { TacticalAtrium } from '../components/TacticalAtrium';
import { Footer } from '../components/Footer';
import { RegistryDoc } from '../components/OperationalRegistry';

interface TacticalInterfaceProps {
  activeSpoke: number | null;
  setActiveSpoke: (id: number | null) => void;
  unlockLevel: number;
  isAdmin: boolean;
  bri: number;
  xp: number;
  setActiveDoc: (doc: RegistryDoc) => void;
  renderSiloContent: (level: number) => React.ReactNode;
}

export const TacticalInterface: React.FC<TacticalInterfaceProps> = ({
  activeSpoke, setActiveSpoke, unlockLevel, isAdmin, bri, xp,
  setActiveDoc, renderSiloContent
}) => {
  return (
    <main className="flex-1 overflow-y-auto no-scrollbar relative h-full scroll-smooth-none">
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
    </main>
  );
};
