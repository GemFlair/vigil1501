import React from 'react';
import { 
  Fingerprint, Shield, Search, Eye, Dna, Database, Zap, Activity, Scan, ShieldCheck, BrainCircuit, Microscope, Target, History, Lock
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const IdentityManifestContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-cyan-500/20 relative">
    <DocumentWatermark text="PROJECT_DNA_MANIFEST" />
    
    <SectionHeader 
      id="DOC: VIG-DNA-2026.01"
      category="Strategic Intelligence Unit"
      title="Project DNA."
      subtitle="The Genetic Audit of Sovereign Provenance"
      colorClass="text-cyan-500"
      bgGlow="bg-cyan-600/10"
    />

    <div className="space-y-20 px-6 md:px-12 relative z-10">
      
      <section className="space-y-8">
        <TechLabel text="SECTOR 01: THE GENETIC STANDARD" color="cyan" />
        <DocCard border="cyan" glow>
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-4xl font-black text-white italic uppercase tracking-tight">Lineage of Intent.</h3>
              <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-medium italic border-l-4 border-cyan-500/40 pl-8">
                "Project DNA is the internal VIGIL protocol for mapping the <span className="text-white">biological and cryptographic origin</span> of an interaction. It reflects the truth hidden beneath the interface layer through a forensic audit of participant lineage."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-black border border-zinc-900 rounded-[2.5rem] space-y-6 group hover:border-cyan-500/30 transition-all shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shadow-inner">
                     <Dna size={28} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-white text-xl font-black uppercase italic tracking-widest">Provenential Lineage</h4>
                    <p className="text-zinc-500 text-[12px] font-bold uppercase leading-relaxed italic">
                      DNA reflects the 'Mother Wallet'—the original funding source of any new contract or entity. If the DNA matches a known cluster of drainers or adversarial Genesis Nodes, the link is biologically flagged.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                     <History size={14} className="text-zinc-700" />
                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">SOURCE_AUTOPSY_ACTIVE</span>
                  </div>
               </div>
               <div className="p-8 bg-black border border-zinc-900 rounded-[2.5rem] space-y-6 group hover:border-blue-500/30 transition-all shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500 shadow-inner">
                     <Fingerprint size={28} />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-white text-xl font-black uppercase italic tracking-widest">Operator Fingerprint</h4>
                    <p className="text-zinc-500 text-[12px] font-bold uppercase leading-relaxed italic">
                      DNA reflects your unique 'Saccadic Signature'—the specific patterns of how your eyes verify 44-character entropy. This ensures your 'Neural Link' is calibrated to your specific biological thresholds.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-900">
                     <Activity size={14} className="text-zinc-700" />
                     <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">BIOMETRIC_SYNC_OK</span>
                  </div>
               </div>
            </div>
          </div>
        </DocCard>
      </section>

      <section className="space-y-12">
        <div className="flex items-center gap-4">
           <TechLabel text="SECTOR 02: THE THREE PILLARS" color="emerald" />
           <div className="h-px flex-1 bg-zinc-900" />
        </div>
        <div className="space-y-6">
           {[
             { 
               id: "01", 
               t: "Operator DNA", 
               d: "The user's persistent record of neural calibration. It reflects your specific biological verification pattern and saccadic precision across all tactical silos.",
               i: <BrainCircuit size={28} className="text-emerald-500" />,
               tag: "BIOMETRIC_RECORD"
             },
             { 
               id: "02", 
               t: "Contract DNA", 
               d: "The structural lineage of a token or address. It traces funding loops back to the Mother Wallet to identify pre-positioned exits and bundled launches.",
               i: <Database size={28} className="text-blue-500" />,
               tag: "CRYPTO_LINEAGE"
             },
             { 
               id: "03", 
               t: "Sovereign Marks", 
               d: "The canonical visual anchors of the VIGIL system. These are 'un-spoofable' DNA anchors used by the Retinal Shield to establish trust in hostile UIs.",
               i: <ShieldCheck size={28} className="text-cyan-500" />,
               tag: "VISUAL_ANCHOR"
             }
           ].map((pill, i) => (
             <ClauseFrame key={i} id={`DNA-P${pill.id}`}>
                <div className="flex flex-col md:flex-row items-start gap-10">
                   <div className="w-16 h-16 bg-zinc-950 border border-zinc-900 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-2xl">
                      {pill.i}
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">{pill.t}</h4>
                        <div className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[7px] font-black text-zinc-600 uppercase tracking-widest">{pill.tag}</div>
                      </div>
                      <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed italic max-w-2xl">"{pill.d}"</p>
                   </div>
                </div>
             </ClauseFrame>
           ))}
        </div>
      </section>

      <DocCard border="zinc">
         <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2rem] relative group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
            <div className="absolute top-2 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
               <Scan size={64} className="text-blue-500" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <Microscope size={16} className="text-blue-500" />
                <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Audit_Fragment_Request</span>
              </div>
              <p className="text-zinc-400 text-sm md:text-base font-medium uppercase tracking-tight leading-relaxed">
                 Project DNA is currently in Phase: [GENESIS]. <br/>
                 Sovereign Operators can initiate a secondary audit using the fragment: <span className="text-blue-500 font-bold px-3 py-1 bg-blue-500/10 rounded-lg cursor-help border border-blue-500/20 ml-2 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all">FRAGMENT: VIG-8821</span>
              </p>
            </div>
         </div>
      </DocCard>

      <div className="pt-24 text-center space-y-10">
         <div className="h-[2px] w-32 bg-cyan-900/30 mx-auto" />
         <div className="space-y-4">
           <h3 className="text-4xl font-black text-white italic uppercase tracking-[0.4em]">Genetic Integrity Stable.</h3>
           <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em] italic">REGISTRY REF: VIG-DNA-FINAL-2026 // END_OF_MANIFEST</p>
         </div>
         <div className="flex justify-center gap-6 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
         </div>
      </div>
    </div>
  </div>
);
