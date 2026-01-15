
import React from 'react';
import { Map, X, Activity, Target, Shield, Zap, Lock, Unlock, Brain } from 'lucide-react';

interface SiloTopologyProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
}

const SILOS = [
  { id: 1, label: 'IDENTITY', desc: 'Neural Link Calibration & Intent Origination.', color: 'text-white' },
  { id: 2, label: 'INTEL', desc: 'Threat Vector Analysis & The 8-Char Blind Spot.', color: 'text-blue-500' },
  { id: 3, label: 'LOGIC', desc: 'Heuristic Operational Flow & Layer 0.5 Primitives.', color: 'text-cyan-500' },
  { id: 4, label: 'EXECUTION', desc: 'Interception Sandbox & Intent Validator Demos.', color: 'text-orange-500' },
  { id: 5, label: 'PURITY', desc: 'Strategic Refusals & Definitive Non-Goals.', color: 'text-red-500' },
  { id: 6, label: 'EVOLUTION', desc: 'Scalability Roadmap & Ecosystem Expansion.', color: 'text-blue-400' },
  { id: 7, label: 'LOG', desc: 'Technical Knowledge Base & Master Registry FAQ.', color: 'text-zinc-500' },
  { id: 8, label: 'AUDIT', desc: 'Final Proficiency Certification & Neural Audit.', color: 'text-purple-500' },
  { id: 9, label: 'MESH', desc: 'Sentinel AI Intelligence & Mesh Terminal.', color: 'text-cyan-400' },
  { id: 10, label: 'VOID', desc: 'Final Notice & Secure Disengagement.', color: 'text-white' },
];

export const SiloTopology: React.FC<SiloTopologyProps> = ({ isOpen, onClose, currentLevel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-[#050505] border border-zinc-800 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh]">
        <div className="h-20 border-b border-zinc-900 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
            <Map className="text-blue-500" size={20} />
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">System Topology Map</h3>
          </div>
          <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors"><X size={24}/></button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12">
          {/* Audit Mechanic Briefing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-3">
                <Target className="text-orange-500" size={18} />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Audit Progression</h4>
              </div>
              <p className="text-zinc-500 text-sm italic font-medium leading-relaxed">
                Progression through the sectors is gated by <span className="text-white">Proficiency Audits</span> located at the conclusion of each Silo. Neural link data is only decrypted once the operator proves cognitive parity with the VIGIL standard.
              </p>
            </div>
            <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-3">
                <Activity className="text-emerald-500" size={18} />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">BRI Calibration</h4>
              </div>
              <p className="text-zinc-500 text-sm italic font-medium leading-relaxed">
                The Biological Resilience Index (BRI) tracks your real-time accuracy. <span className="text-emerald-500">Correct Audit Outputs (+BRI)</span> strengthen the shield, while <span className="text-red-500">Subconscious Bypasses (-BRI)</span> degrade the perimeter.
              </p>
            </div>
          </div>

          {/* Silo Breakdown Grid */}
          <div className="space-y-6">
            <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] pl-2 border-b border-zinc-900 pb-4">
              Mission Sector Manifest
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SILOS.map((silo) => {
                const isUnlocked = currentLevel >= silo.id;
                return (
                  <div key={silo.id} className={`p-6 rounded-2xl border transition-all duration-500 flex items-start gap-6 group ${isUnlocked ? 'bg-zinc-900/20 border-zinc-800' : 'bg-black border-zinc-900/50 opacity-40'}`}>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${isUnlocked ? 'bg-zinc-950 border-zinc-800 ' + silo.color : 'bg-black border-zinc-900 text-zinc-800'}`}>
                      {isUnlocked ? (silo.id === 8 ? <Brain size={20}/> : <Unlock size={18}/>) : <Lock size={18}/>}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isUnlocked ? silo.color : 'text-zinc-800'}`}>Silo 0{silo.id}</span>
                        {isUnlocked && <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
                      </div>
                      <h4 className={`text-lg font-black italic uppercase tracking-tight ${isUnlocked ? 'text-white' : 'text-zinc-800'}`}>{silo.label}</h4>
                      <p className="text-[11px] text-zinc-500 font-bold leading-relaxed uppercase italic">
                        {isUnlocked ? silo.desc : 'ENCRYPTED_DATA_LOG'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-12 bg-zinc-950 border-t border-zinc-900 flex items-center justify-center px-10 gap-8 opacity-40">
           <div className="flex items-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
             <Zap size={10} /> SYS_SYNC: OK
           </div>
           <div className="flex items-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
             <Shield size={10} /> LAYER: 0.5
           </div>
        </div>
      </div>
    </div>
  );
};
