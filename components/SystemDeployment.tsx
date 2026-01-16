import React from 'react';
import { Chrome, ArrowRight, ShieldAlert } from 'lucide-react';
import { RegistryDoc } from './OperationalRegistry';
import { TechLabel } from './docs/DocHelpers';

interface SystemDeploymentProps {
  onOpenDoc: (doc: RegistryDoc) => void;
}

export const SystemDeployment: React.FC<SystemDeploymentProps> = ({ onOpenDoc }) => {
  return (
    <section id="system-deployment" className="px-4 md:px-10 py-12 bg-[#020202] relative overflow-hidden border-t border-zinc-900/50">
      {/* Background Ambience - Dual Vector Atmospheric Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Top Glow - Balancing Light */}
        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.25),transparent_75%)] opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-emerald-500/10 blur-xl" />

        {/* Bottom Glow - Primary Intensity */}
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.45),transparent_70%)] opacity-100" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[3px] bg-emerald-500/30 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Tactical Frame - Balanced Containment */}
        <div className="relative p-[1px] bg-gradient-to-b from-zinc-800/40 via-zinc-800/10 to-emerald-500/40 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
          <div className="bg-[#050505]/90 backdrop-blur-3xl rounded-[1.95rem] md:rounded-[2.95rem] px-6 py-10 md:py-14 flex flex-col items-center text-center">
            
            {/* Top Label */}
            <div className="flex items-center gap-6 mb-6">
              <div className="h-[1px] w-8 md:w-12 bg-emerald-900/50" />
              <span className="text-emerald-500 font-black text-[9px] uppercase tracking-[0.5em] italic">
                System Deployment
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-emerald-900/50" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-[4.5rem] font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
              READY TO SECURE <br /> THE HUMAN LAYER?
            </h2>

            {/* Description */}
            <p className="text-zinc-400 text-sm md:text-xl font-medium leading-relaxed italic max-w-xl mb-10">
              VIGIL adds an awareness layer that surfaces intent mismatches <span className="text-white font-bold">before irreversible execution.</span>
            </p>

            {/* Action Row */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mb-10">
              <button className="w-full md:w-auto px-10 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-3 group">
                <Chrome className="w-4 h-4" />
                INSTALL VIGIL EXTENSION
              </button>
              
              <button 
                onClick={() => onOpenDoc('threat_model')}
                className="w-full md:w-auto px-10 py-5 bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:text-white hover:border-zinc-600 transition-all flex items-center justify-center gap-3 group active:scale-95"
              >
                AUDIT THREAT MODEL
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Sub-Action Info */}
            <div className="text-[7px] md:text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10">
              RUNS LOCALLY · NO WALLET ACCESS · NO PRIVATE KEYS
            </div>

            {/* Tactical Quote */}
            <div className="relative mb-12">
              <p className="text-zinc-500 text-[10px] md:text-sm font-black italic uppercase tracking-[0.4em] leading-tight max-w-lg mx-auto">
                "STOP PATCHING PROTOCOLS. SECURE THE HUMAN LAYER."
              </p>
            </div>

            {/* Footer Constraint */}
            <div className="pt-8 border-t border-zinc-900/50 w-full relative">
               <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-emerald-500/40 rounded-br-xl pointer-events-none" />
               <p className="text-[7px] md:text-[9px] font-black text-zinc-700 uppercase tracking-[0.5em] italic">
                 VIGIL DOES NOT EXECUTE, MODIFY, DELAY, OR SIGN TRANSACTIONS.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};