
import React from 'react';
import { 
  Fingerprint, Shield, Search, Eye
} from 'lucide-react';
import { DocumentWatermark, SectionHeader, DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

export const IdentityManifestContent = () => (
  <div className="space-y-0 pb-40 max-w-6xl mx-auto selection:bg-cyan-500/20 relative">
    <DocumentWatermark text="BRAND_DNA_MANIFEST" />
    
    <SectionHeader 
      id="DOC: VIG-DNA-2026.01"
      category="Strategic Branding Unit"
      title="Identity Manifest."
      subtitle="The Genetic Code of the Sovereign Security Standard"
      colorClass="text-cyan-500"
      bgGlow="bg-cyan-600/10"
    />

    <div className="space-y-20 px-6 md:px-12 relative z-10">
      
      <section className="space-y-8">
        <TechLabel text="SECTOR 01: CORE MISSION" color="cyan" />
        <DocCard border="cyan" glow>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">The Intent Validator</h3>
            <p className="text-zinc-400 text-lg leading-relaxed font-medium">
              VIGIL's mission is to secure the <span className="text-white">Human-Layer (Layer 0.5)</span>. We solve the problem of **Cognitive Deception**—specifically address poisoning and visual homograph attacks.
            </p>
            <div className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-2xl relative group">
               <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Fingerprint size={40} />
               </div>
               <p className="text-zinc-600 text-sm italic font-medium">
                  To ensure bit-perfect calibration, use the following operational fragment in the sidebar terminal: <span className="text-blue-500 font-black px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/20 cursor-help select-all">FRAGMENT: VIG-8821</span>
               </p>
            </div>
          </div>
        </DocCard>
      </section>

      <section className="space-y-8">
        <TechLabel text="SECTOR 02: BRAND VALUES" color="emerald" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {[
             { t: "Privacy Absolute", d: "Zero-knowledge localized processing.", i: <Shield size={18} /> },
             { t: "Radical Transparency", d: "Open-source heuristics.", i: <Search size={18} /> },
             { t: "Non-Invasive", d: "Vigilance without surveillance.", i: <Eye size={18} /> }
           ].map((v, i) => (
             <div key={i} className="p-8 bg-zinc-950 border border-zinc-900 rounded-3xl space-y-4 group">
                <div className="text-emerald-500">{v.i}</div>
                <h5 className="text-white font-black uppercase italic">{v.t}</h5>
                <p className="text-zinc-600 text-[11px] font-bold uppercase leading-relaxed">{v.d}</p>
             </div>
           ))}
        </div>
      </section>

      <div className="pt-24 text-center space-y-8">
         <div className="h-[2px] w-24 bg-cyan-900/30 mx-auto" />
         <h3 className="text-3xl font-black text-white italic uppercase tracking-[0.3em]">End of DNA Manifest</h3>
      </div>
    </div>
  </div>
);
