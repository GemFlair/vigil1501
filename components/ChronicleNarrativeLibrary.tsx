
import React from 'react';
import { Target, History } from 'lucide-react';
import { TechLabel } from './docs/DocHelpers';

export interface TacticalGif {
  id: string;
  theme: string;
  script: string;
  visualPrompt: string;
  metadata: {
    type: string;
    loop: string;
  };
}

export interface ChronicleVideo {
  day: number;
  era: string;
  theme: string;
  script: string;
  visualPrompt: string;
  metadata: {
    location: string;
    riskFactor: string;
    outcome: string;
  };
}

export const GIF_VAULT: TacticalGif[] = [
  {
    id: 'GIF_FACILITY',
    theme: 'THE REGISTRY FACILITY (10 SILOS)',
    script: 'The facility is not a website. It is an engineered environment of 10 distinct silos, each designed to calibrate the human eye for the Layer 0.5 standard.',
    visualPrompt: "High-fidelity 3D technical animation (Blender/Cycles style). Background: Absolute charcoal #050505. A 2x5 grid of 10 wireframe rectangular boxes (Silos) starts empty. One by one, in a fast sequence (0.2s intervals), each box ignites with a violent cyan pulse, revealing a sharp white tactical icon (Fingerprint, Radar, Brain, Shield, Target). Once all 10 silos are fully lit and glowing with VIGIL cyan, a horizontal 1px cyan laser scan-line sweeps perfectly from top to bottom across the whole grid. In the bottom right corner, a tiny monospace tag [REGISTRY_v1.0.1_STABLE] pulses once. Sharp 1px line weights. Zero motion blur. 16:9 Aspect ratio.",
    metadata: { type: "3D System Blueprint", loop: "Sequential Ignition" }
  },
  {
    id: 'GIF_00',
    theme: 'RETINAL_AUTOPSY (MIMIC_INTERCEPT)',
    script: 'Don\'t block the address; block the pattern. Blacklists require a victim to exist. VIGIL identifies the structural intent of the mimic before the first signature is even generated.',
    visualPrompt: "Professional 3D Technical Render (Blender Cycles). Background: Absolute Void #050505. Camera: 80mm Macro lens, shallow depth of field, slight isometric tilt. Two floating data rails. TOP: 'LEGACY_REACTIVE'. Address '0x53e56c74808EEA832862AED571C56dF4C3C5fD9E' in etched white 'JetBrains Mono'. A red volumetric laser sheet scans it. Text displays 'DATABASE_QUERY: NO_MATCH'. 1 second later, the rail shatters into red glowing shards with a 'LOSS_DETECTED' HUD flicker. BOTTOM: 'VIGIL_PROACTIVE'. Identical address '0x53e56c74808EEA832862AED571C56dF4C3C5fD9E' appears. A cyan 1px laser sweep happens at 60fps. HUD displays 'HEURISTIC_COLLISION_88%'. A heavy black frosted-glass bar slams onto the middle 24 characters, redacting them. The transaction path is physically severed. Lighting: Global illumination from scanners only. No logos. Sharp 1px line weights. 16:9 Aspect.",
    metadata: { type: "3D Tactical GIF", loop: "A/B Comparison" }
  },
  {
    id: 'GIF_01',
    theme: 'The Illusion of Clarity',
    script: 'Tactical Loop 01: The Substitution. Watch the center entropy. A violent digital glitch swaps the middle characters while the anchors remain frozen.',
    visualPrompt: "Cinematic 3D Macro View. Background: Pure Hex #050505. A Solana address floats in space. The first 10 and last 10 characters are frozen in glowing cyan. Every 1.5 seconds, the middle characters violently rotate like a combination lock, turning hazard-red. Ray-traced lighting from the characters themselves. Negative prompt: logos, icons, 2d, soft gradients.",
    metadata: { type: "Tactical GIF", loop: "Seamless" }
  },
  {
    id: 'GIF_02',
    theme: 'The Saccadic Skip',
    script: 'Tactical Loop 02: Eye-tracking reticle snaps to edges. The middle segment dissolves into red noise, symbolizing cognitive data loss.',
    visualPrompt: "Engineering Blueprint Style 3D. Background: #000000. A 1px cyan circular reticle rapidly snaps between the prefix '0xa831' and suffix 'CCcb' of a floating address. The middle text block is a hollow redacted rectangle filled with 3D red digital noise particles. No motion blur. No logos.",
    metadata: { type: "Tactical GIF", loop: "Snap Loop" }
  }
];

export const CHRONICLES: ChronicleVideo[] = [
  {
    day: 1,
    era: "2026 // THE AWAKENING",
    theme: "The Illusion of Clarity",
    script: "Log 01. The first step of the attack is psychological. You verify the edges—the first 4, the last 4. [GLITCH] But in the center, a substitution occurs. While your retina holds the blue anchors, the middle is swapped for poison. Fifty million dollars just changed hands. Watch the gap. STATUS: [POISON_SUBSTITUTION_DETECTED]",
    visualPrompt: "3D Macro Technical Render. Address '0x53e56c74808EEA832862AED571C56dF4C3C5fD9E'. Prefix and Suffix are locked in steady blue light. The middle 24 characters are flickering red 3D voxels. No logos. Absolute Zinc background.",
    metadata: { location: "The Retinal Layer", riskFactor: "Cognitive Truncation", outcome: "Intent Intercepted" }
  },
  {
    day: 30,
    era: "2026 // THE FINAL PERIMETER",
    theme: "Birth of Layer 0.5",
    script: "Log 30. December. Fifty million dollars lost to a simple poison attack. Cryptography didn't fail. The human did. That was the day I stopped being a victim and became the architect. Welcome to VIGIL. The bridge is now secure.",
    visualPrompt: "Sovereign 3D Material Study. Background: #050505. A single large white 'V' made of heavy glass floats in a dark void. Cyan light refracts through the edges. Monospace text: 'LAYER 0.5 ESTABLISHED'. Absolute stillness. Heavy 35mm grain. No logos.",
    metadata: { location: "The Bridge", riskFactor: "Neutralized", outcome: "Permanent Shield" }
  }
];

export const ChronicleNarrativeLibrary: React.FC = () => {
  return (
    <div className="space-y-12 pb-32">
      <div className="flex items-center gap-4 border-b border-zinc-900 pb-8">
        <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
           <History className="w-6 h-6 text-blue-500" />
        </div>
        <div>
           <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Chronicle Repository.</h3>
           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">30 Days of Sovereignty // Act I: Genesis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHRONICLES.map((v) => (
          <div key={v.day} className="p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-blue-500/30 transition-all group">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="text-blue-500 font-black text-[10px] uppercase tracking-widest italic">Day {v.day < 10 ? `0${v.day}` : v.day}</div>
                   <h4 className="text-xl font-black text-white uppercase italic">{v.theme}</h4>
                </div>
                <TechLabel text={v.era} color="blue" />
             </div>
             
             <div className="p-6 bg-black border border-zinc-900 rounded-2xl">
                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed uppercase tracking-tight">
                  <span className="text-blue-600 mr-2">[TTS_SCRIPT]:</span>
                  "{v.script}"
                </p>
             </div>

             <div className="space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                   <Target size={12} /> Visual Directive (Veo 3.1)
                </div>
                <p className="text-[10px] text-zinc-500 italic leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-900">
                   {v.visualPrompt}
                </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
