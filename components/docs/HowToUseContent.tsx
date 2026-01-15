
import React, { useState } from 'react';
import { 
  BookOpen, ChevronRight, Smartphone, ShieldCheck, 
  Search, Info, Zap, Globe, Cpu, Radio, Target, 
  Layers, Lock, Activity, Radar, Fingerprint, 
  ShieldAlert, Scan, Binary, MousePointer2, ExternalLink, 
  Skull, Terminal, Eye, Filter, Code2, Database, Layout, 
  ArrowRight, ShieldX, Server, Microscope, CheckCircle2,
  FileCode, ClipboardPaste, Gauge, BarChart3, History as HistoryIcon,
  Copy, ZapOff, Calculator, FileWarning, MicroscopeIcon,
  Crosshair, BrainCircuit
} from 'lucide-react';
import { DocCard, TechLabel, TechNote, ClauseFrame } from './DocHelpers';

const UI_SNAPSHOTS = {
  // DEXSCREENER SIDEBAR RECREATION
  DEXSCREENER: () => (
    <div className="w-full max-w-[340px] bg-[#0c0c0c] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-sans animate-in fade-in duration-700">
       <div className="p-4 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Dexscreener / Token_Intel</span>
          </div>
          <span className="text-[8px] font-mono text-zinc-700 uppercase">VIGIL_ACTIVE</span>
       </div>
       <div className="p-5 space-y-6">
          <div className="space-y-2">
             <div className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Address (CA)</div>
             <div className="flex items-center justify-between p-3 bg-black border border-zinc-900 rounded-xl group/item">
                <span className="text-[11px] font-mono text-zinc-400">Ab1C...Zz90</span>
                <div className="flex gap-2">
                   <div className="p-1.5 bg-cyan-600 text-white rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-bounce cursor-pointer">
                      <Radar size={11} />
                   </div>
                   <div className="p-1.5 bg-zinc-800 text-zinc-500 rounded">
                      <Copy size={11} />
                   </div>
                </div>
             </div>
             <p className="text-[7px] text-cyan-500 font-black uppercase tracking-[0.2em] pl-1">VIGIL: INTERCEPTION_LAYER_READY</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <div className="text-[7px] text-zinc-600 font-black uppercase">Liquidity</div>
                <div className="text-sm font-black text-white italic">$2.4M</div>
             </div>
             <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                <div className="text-[7px] text-zinc-600 font-black uppercase">Pair Depth</div>
                <div className="text-sm font-black text-white italic">High</div>
             </div>
          </div>
       </div>
    </div>
  ),

  // SOLSCAN MIRROR RECREATION
  SOLSCAN: () => (
    <div className="w-full max-w-[420px] bg-[#050505] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl font-mono text-[9px] animate-in slide-in-from-right-4 duration-1000">
       <div className="p-4 bg-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center"><Search size={10} className="text-white" /></div>
             <span className="text-zinc-400 font-black uppercase tracking-widest">Solscan Registry Mirror</span>
          </div>
          <div className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded text-[7px] font-black uppercase">0.5_FILTER: ON</div>
       </div>
       <div className="divide-y divide-zinc-900/50">
          <div className="p-4 flex items-center justify-between bg-red-950/10 grayscale opacity-40 blur-[0.5px]">
             <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-zinc-700"><Activity size={12}/></div>
                <div className="space-y-0.5">
                   <span className="text-zinc-600 block">••••••••••••••••••••••••••••</span>
                   <span className="text-[7px] text-red-900 font-black">REDACTED BY SHIELD</span>
                </div>
             </div>
             <span className="text-red-500 font-black text-[7px] uppercase tracking-widest">[!] POISON_MIMIC</span>
          </div>
          <div className="p-4 flex items-center justify-between bg-emerald-500/5">
             <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500"><ShieldCheck size={14}/></div>
                <div className="space-y-0.5">
                   <span className="text-zinc-300 font-bold">Vig1L...G1i</span>
                   <span className="text-[7px] text-emerald-900 font-black uppercase">TRUSTED_HISTORICAL_NODE</span>
                </div>
             </div>
             <span className="text-emerald-500 font-black text-[7px] uppercase tracking-widest">VERIFIED</span>
          </div>
       </div>
    </div>
  ),

  // INTENT VALIDATOR HUD RECREATION
  HUD_POPUP: () => (
    <div className="w-full max-w-[300px] bg-[#0a0a0a] border-2 border-red-500/30 rounded-[2.5rem] p-6 space-y-5 shadow-2xl relative overflow-hidden animate-in zoom-in duration-500">
       <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600 shadow-[0_0_15px_#ef4444] animate-[scan-vertical_2s_linear_infinite]" />
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
             <Skull size={24} />
          </div>
          <div className="space-y-0.5">
             <h4 className="text-sm font-black text-red-500 uppercase italic">Threat Blocked</h4>
             <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">VANITY_COLLISION_V3</p>
          </div>
       </div>
       <div className="p-4 bg-black border border-zinc-900 rounded-2xl space-y-2">
          <div className="text-[7px] text-zinc-700 font-black uppercase">Mimic Detected</div>
          <p className="font-mono text-[9px] text-red-500 break-all leading-tight">Ab1C<span className="opacity-20">0000000X99120817</span>Zz90</p>
       </div>
       <button className="w-full py-3 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">NEUTRALIZE POISON</button>
    </div>
  ),

  // FIELD HUB SILO
  FIELDHUB: () => (
    <div className="w-full max-w-[320px] bg-zinc-950 border border-zinc-900 rounded-[2rem] p-6 space-y-6 shadow-2xl">
       <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">SOURCE_SILO_v1.0</span>
          <Terminal size={12} className="text-blue-500" />
       </div>
       <div className="space-y-2">
          {['validator.js', 'threat_matrix.js', 'retinal_shield.js'].map((f, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-black border border-zinc-900 rounded-xl">
               <div className="flex items-center gap-3">
                  <Code2 size={12} className="text-zinc-700" />
                  <span className="text-[9px] text-zinc-500 font-mono">{f}</span>
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
            </div>
          ))}
       </div>
       <div className="pt-4 border-t border-zinc-900 flex justify-between items-center opacity-40">
          <span className="text-[7px] font-black text-zinc-700 uppercase">Integrity Status</span>
          <span className="text-[7px] font-black text-emerald-500 uppercase">SYNCED</span>
       </div>
    </div>
  )
};

const CodeBlock = ({ code, label, status = "LOCKED" }: { code: string; label: string; status?: string }) => (
  <div className="space-y-2 group">
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
        <Code2 size={10} className="text-blue-500" /> {label}
      </div>
      <span className="text-[7px] font-mono text-zinc-800">{status}</span>
    </div>
    <div className="p-6 bg-black border border-zinc-900 rounded-2xl font-mono text-[11px] text-blue-400/90 leading-relaxed overflow-x-auto no-scrollbar shadow-inner relative">
       <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-20 transition-opacity">
          <Terminal size={40} />
       </div>
       {code}
    </div>
  </div>
);

export const HowToUseContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: '0. Manual Index', icon: <Globe size={14} /> },
    { id: 'protocol-a', label: '1. Analysis Phase', icon: <BrainCircuit size={14} /> },
    { id: 'scavenger', label: '2. Retinal Shield', icon: <Scan size={14} /> },
    { id: 'helius', label: '3. RPC Telemetry', icon: <Server size={14} /> },
    { id: 'vectors', label: '4. Security Vectors', icon: <Radar size={14} /> },
    { id: 'forensics', label: '5. Alpha Forensics', icon: <BarChart3 size={14} /> },
    { id: 'ops', label: '6. Field Unit Hub', icon: <Layout size={14} /> },
    { id: 'mobile', label: '7. Mobile Layer', icon: <Smartphone size={14} /> }
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`htu-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-full animate-in fade-in duration-700 overflow-hidden bg-[#020202]">
      
      {/* GITBOOK SIDEBAR */}
      <aside className="w-80 border-r border-zinc-900 bg-zinc-950/20 hidden lg:flex flex-col shrink-0">
        <div className="p-10 border-b border-zinc-900">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg"><div className="w-4 h-4 bg-white rotate-45" /></div>
              <div className="flex flex-col">
                 <span className="text-[12px] font-black text-white uppercase tracking-[0.2em]">Operational Manual</span>
                 <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-1">Ref: VIG-MAN-CORE</span>
              </div>
           </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-6 space-y-1 custom-scrollbar">
           <div className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-6 pl-4 flex items-center gap-2">
              <MicroscopeIcon size={12} /> System_Modules
           </div>
           {sections.map(s => (
             <button 
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`w-full text-left px-6 py-4 rounded-2xl transition-all flex items-center gap-4 group ${activeSection === s.id ? 'bg-blue-600/10 border border-blue-500/20 text-white shadow-xl shadow-blue-500/5' : 'text-zinc-600 hover:text-zinc-300'}`}
             >
                {React.cloneElement(s.icon as React.ReactElement<{ className?: string }>, { className: activeSection === s.id ? 'text-blue-500 scale-110' : 'text-zinc-800 group-hover:text-zinc-500' })}
                <span className="text-[11px] font-black uppercase tracking-widest">{s.label}</span>
             </button>
           ))}
        </nav>
        <div className="p-8 border-t border-zinc-900 bg-black/40">
           <TechLabel text="CORE_VER: v0.0.5.8" color="blue" />
        </div>
      </aside>

      {/* DOCUMENTATION FEED */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-20 space-y-48">
        
        {/* SECTION 0: OVERVIEW */}
        <section id="htu-intro" className="scroll-mt-32 space-y-16">
          <header className="space-y-6">
             <TechLabel text="SYSTEM_ABSTRACT" color="blue" />
             <h2 className="text-5xl md:text-9xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">The <br/>Standard.</h2>
             <p className="text-zinc-500 text-2xl font-medium leading-relaxed italic max-w-3xl border-l-4 border-blue-900/30 pl-10">
               "VIGIL intercepts the cognitive gap between what you see and what you sign. This manual serves as the technical briefing for authorized operators."
             </p>
          </header>

          <DocCard border="blue" glow>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                   <h3 className="text-3xl font-black text-white italic uppercase tracking-tight">System Identity: 0.5 Layer</h3>
                   <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                      Most Web3 losses happen before the wallet is ever invoked. VIGIL creates a persistent interception surface inside your browser to validate intent at the source.
                   </p>
                   <div className="space-y-4">
                      {[
                        { t: 'Sub-12ms Execution', d: 'DOM traversal optimized for high-speed scrolling.' },
                        { t: 'Zero-Storage Privacy', d: 'Your trust graph never leaves local IndexedDB.' },
                        { t: 'Neural Parity', d: 'Logic matches our server-side simulations 1:1.' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-zinc-950 rounded-2xl border border-zinc-900">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_#3b82f6]" />
                           <div className="space-y-1">
                              <span className="text-[11px] font-black text-white uppercase tracking-widest">{item.t}</span>
                              <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tight">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                   <UI_SNAPSHOTS.HUD_POPUP />
                   <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Snapshot: Interception HUD</p>
                </div>
             </div>
          </DocCard>
        </section>

        {/* SECTION 1: PHASE 1 — ANALYSIS ONLY */}
        <section id="htu-protocol-a" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="PHASE 1: ANALYSIS" color="red" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Analysis <br/> Protocol.</h2>
          </header>

          <DocCard border="red">
             <div className="space-y-10">
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-white italic uppercase">The "Analysis Only" Safeguard</h4>
                   <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                      VIGIL enforces a strict "Analysis Only" phase for all unverified payloads. This phase is triggered by specific terminal commands and ensures that zero code is executed before human sign-off.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="p-8 bg-black border-2 border-red-500/20 rounded-3xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={64} /></div>
                         <h5 className="text-red-500 font-black text-[11px] uppercase tracking-[0.5em] mb-6">Triggers & Traces</h5>
                         <ul className="space-y-4 text-zinc-400 text-sm font-medium italic">
                            <li>• "Analyze only" / "Suggest only"</li>
                            <li>• "Review only" / "Audit primitive"</li>
                            <li>• Automated Saccade Depth scan</li>
                         </ul>
                      </div>
                      
                      <TechNote title="STRICT EXECUTION RULES">
                        - TEXT ONLY (zero code, zero JSX/TS/CSS injections during analysis). <br/>
                        - Bullet points only for maximum readability. <br/>
                        - No assumptions or speculative implementation details.
                      </TechNote>
                   </div>

                   <div className="space-y-6">
                      <h5 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Phase 1 Flowchart</h5>
                      {[
                        "1. Identify files to be audited.",
                        "2. List exact sections and components.",
                        "3. Disclose intended deltas in text.",
                        "4. Wait for explicit operator approval."
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-600">{i+1}</div>
                           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{step}</span>
                        </div>
                      ))}
                      <div className="pt-8 p-6 bg-red-600/5 border border-red-500/20 rounded-2xl">
                         <p className="text-[9px] font-black text-red-500 uppercase tracking-widest leading-relaxed">
                            PURPOSE: VIGIL isolates the analysis to prevent "Verdict Divergence" between simulations and field units. No approval = No action.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </DocCard>
        </section>

        {/* SECTION 2: THE SCAVENGER */}
        <section id="htu-scavenger" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_B: INTERCEPTION" color="cyan" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Retinal Shield.</h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             <div className="lg:col-span-7 space-y-10">
                <p className="text-zinc-400 text-xl font-medium leading-relaxed italic">
                   "The Retinal Shield does not wait for a click. It scans the Document Object Model (DOM) to identify Solana addresses the moment they are rendered on your screen."
                </p>
                <DocCard border="zinc">
                   <h4 className="text-lg font-black text-white uppercase italic mb-6 flex items-center gap-3">
                      <Scan className="text-cyan-500" /> DOM Scavenging
                   </h4>
                   <p className="text-zinc-500 text-base leading-relaxed font-medium mb-10">
                      Using a high-performance <b>MutationObserver</b>, VIGIL watches for new text nodes. Any string matching the Solana Base58 format is captured and sent to the Intelligence Core for immediate heuristic verdict.
                   </p>
                   <CodeBlock 
                     label="retinalShield.js // Kernel Scavenger" 
                     code={`// THE SCAVENGER CORE PRIMITIVE\nconst regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;\nconst observer = new MutationObserver((mutations) => {\n  for (const m of mutations) {\n    m.addedNodes.forEach(node => {\n      if (node.nodeType === 3) scan(node);\n    });\n  }\n});`} 
                   />
                </DocCard>
             </div>

             <div className="lg:col-span-5 flex flex-col gap-10">
                <div className="text-center space-y-4">
                   <UI_SNAPSHOTS.DEXSCREENER />
                   <p className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Snapshot: Dexscreener Sidebar</p>
                </div>
                <TechNote title="SELECTIVE INJECTION">
                   VIGIL wraps detected addresses in a <code>&lt;vigil-shield&gt;</code> ShadowDOM element. This prevents the website's own CSS from hiding the security warning or altering its visual integrity.
                </TechNote>
             </div>
          </div>
        </section>

        {/* SECTION 3: RPC TELEMETRY */}
        <section id="htu-helius" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_C: RPC_DATA" color="emerald" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">On-Chain <br/> Telemetry.</h2>
          </header>

          <DocCard border="emerald" glow>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-10">
                   <div className="space-y-4">
                      <h4 className="text-2xl font-black text-white italic uppercase">The Helius Integration</h4>
                      <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                         Visual similarity is only half the truth. VIGIL utilizes the **Helius RPC Network** to verify the genetic metadata of an address. Is it a target-mimic wallet or a million-transaction token contract?
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-black border border-zinc-900 rounded-3xl space-y-4 group hover:border-emerald-500/30 transition-all">
                         <div className="flex items-center gap-3">
                            <Database size={18} className="text-emerald-500" />
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">getAccountInfo</span>
                         </div>
                         <p className="text-[11px] text-zinc-500 font-bold leading-relaxed italic uppercase">
                           Determines account "Ownership". If owned by the System Program, it is classified as a Wallet (High Poison Risk).
                         </p>
                      </div>
                      <div className="p-6 bg-black border border-zinc-900 rounded-3xl space-y-4 group hover:border-blue-500/30 transition-all">
                         <div className="flex items-center gap-3">
                            <Zap size={18} className="text-blue-500" />
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">getAsset</span>
                         </div>
                         <p className="text-[11px] text-zinc-500 font-bold leading-relaxed italic uppercase">
                           Fetches Mint Metadata for Contracts (CAs). Verifies ticker and mint authority against the VIGIL Canonical Registry.
                         </p>
                      </div>
                   </div>

                   <CodeBlock 
                     label="serviceWorker.js // RPC Proxy" 
                     code={`// SECURE TELEMETRY FETCH\nasync function fetchMetadata(addr) {\n  const res = await fetch(HELIUS_URL, {\n    method: 'POST',\n    body: JSON.stringify({ method: "getAccountInfo", params: [addr] })\n  });\n  const { result } = await res.json();\n  return result.owner === 'Tokenkeg...'; // Verify CA type\n}`} 
                   />
                </div>
                
                <div className="lg:col-span-4 space-y-8">
                   <div className="p-10 bg-emerald-600/5 border border-emerald-500/20 rounded-[2.5rem] flex flex-col items-center text-center space-y-8 shadow-2xl">
                      <div className="relative">
                         <Globe className="text-emerald-500 animate-spin-slow" size={64} />
                         <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping" />
                      </div>
                      <div className="space-y-2">
                         <h5 className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Global Parity</h5>
                         <p className="text-[11px] text-zinc-600 font-bold italic leading-relaxed uppercase">
                            The RPC layer ensures that every Sentinel node sees the same definitive ledger state regardless of browser context.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </DocCard>
        </section>

        {/* SECTION 4: THE VECTORS */}
        <section id="htu-vectors" className="scroll-mt-32 space-y-16">
          <header className="space-y-4 text-center max-w-3xl mx-auto">
             <TechLabel text="MODULE_D: HEURISTICS" color="red" />
             <h2 className="text-4xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none">The 9 <br/> Vectors.</h2>
             <p className="text-zinc-600 text-base font-bold uppercase tracking-[0.4em] mt-10 italic">Core Detection Logic & Heuristic Metrics</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { t: 'Levenshtein Match', d: 'Detects character mimics sharing >85% visual similarity with your history.', i: <Filter className="text-red-500" />, code: "getSimilarity(a, b) > 85" },
               { t: 'Zero-Value Dust', d: 'Identifies unsolicited small transfers used to inject malicious history entries.', i: <ZapOff size={18} className="text-amber-500" />, code: "amount === 0 && sender !== user" },
               { t: 'First-Time Node', d: 'Flags addresses with <24h on-chain provenance and zero prior interactions.', i: <Fingerprint className="text-cyan-500" />, code: "firstTxTime < 86400" },
               { t: 'Unicode Mimicry', d: 'Detects look-alike homographs using non-latin character collisions.', i: <Eye className="text-purple-500" />, code: "/[^\x00-\x7F]/g.test(addr)" },
               { t: 'Mint Integrity', d: 'Verifies the contract logic and authority of assets vs official mints.', i: <Binary className="text-red-600" />, code: "mintAddr !== canonicalUSDC" },
               { t: 'Clipboard Guard', d: 'Monitors copy/paste gaps for silent background script mutations.', i: <ClipboardPaste size={18} className="text-emerald-500" />, code: "onPasteVal !== onCopyVal" },
               { t: 'Context Phishing', d: 'Weights risk based on source domain trust levels (Social vs Registry).', i: <Globe size={18} className="text-blue-500" />, code: "sourceRisk = domainWeights[url]" },
               { t: 'Entropy Failure', d: 'Mathematical analysis of non-random vanity strings (brute-forced clusters).', i: <Calculator size={18} className="text-zinc-500" />, code: "calculateEntropy(addr) < 3.8" },
               { t: 'History Recency', d: 'Detection of "Temporal Poisoning" where attackers wait weeks to trigger error.', i: <HistoryIcon className="text-emerald-400" />, code: "txLag > 14_DAYS" }
             ].map((v, i) => (
               <div key={i} className="p-10 bg-zinc-950/40 border border-zinc-900 rounded-[2.5rem] space-y-6 hover:border-zinc-700 transition-all group relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-[#050505] border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg relative z-10">
                     {v.i}
                  </div>
                  <div className="space-y-2 relative z-10">
                     <h4 className="text-[16px] font-black text-white italic uppercase tracking-tight">{v.t}</h4>
                     <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">{v.d}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-900/50 mt-4 relative z-10">
                     <span className="text-[9px] font-mono text-zinc-700">Heuristic: {v.code}</span>
                  </div>
               </div>
             ))}
          </div>

          <div className="text-center pt-16 space-y-8">
             <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-24 bg-zinc-900" />
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">Snapshot: Solscan Mirror Filter</span>
                <div className="h-[1px] w-24 bg-zinc-900" />
             </div>
             <UI_SNAPSHOTS.SOLSCAN />
             <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">REDACTION PROTOCOL: PREVENTING COGNITIVE BYPASS</p>
          </div>
        </section>

        {/* SECTION 5: ALPHA HUD */}
        <section id="htu-forensics" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_E: TRADER_ALPHA" color="cyan" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Alpha <br/> HUD.</h2>
          </header>

          <DocCard border="cyan">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-12">
                   <div className="space-y-4">
                      <p className="text-zinc-400 text-2xl font-medium leading-relaxed italic">
                         On discovery platforms like **Dexscreener**, VIGIL transforms into a market weapon. It performs "Forensic Autopsies" of tokens before you click the chart.
                      </p>
                   </div>
                   <div className="space-y-4">
                      {[
                        { t: 'Bundling Detection', d: 'Maps supply clusters funded by the same deployer node.' },
                        { t: 'Volume Pulse', d: 'Identifies inorganic wash-trading vs retail participation.' },
                        { t: 'Dev DNA History', d: 'Fetches global reputation for the contract creator.' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 bg-zinc-950 border border-zinc-900 rounded-3xl group hover:border-cyan-500/30 transition-all shadow-xl">
                           <CheckCircle2 size={24} className="text-cyan-500" />
                           <div className="space-y-1">
                              <span className="text-[13px] font-black text-white uppercase tracking-widest">{item.t}</span>
                              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight italic">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="lg:col-span-5 flex flex-col items-center gap-8">
                   <UI_SNAPSHOTS.DEXSCREENER />
                   <div className="p-6 bg-black border border-zinc-900 rounded-3xl font-mono text-[10px] text-cyan-500/60 leading-relaxed shadow-inner">
                     {`// ALPHA_HUD PRIMITIVE\nif (window.location.host === 'dexscreener.com') {\n  injectRadarIcon(pairAddress);\n  onRadarClick => fetchMarketIntel(pairAddress);\n}`}
                   </div>
                </div>
             </div>
          </DocCard>
        </section>

        {/* SECTION 6: FIELD UNIT HUB */}
        <section id="htu-ops" className="scroll-mt-32 space-y-16">
          <header className="space-y-4">
             <TechLabel text="MODULE_F: OPERATIONS" color="zinc" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Field <br/> Unit.</h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             <div className="lg:col-span-5 flex justify-center">
                <UI_SNAPSHOTS.FIELDHUB />
             </div>
             <div className="lg:col-span-7 space-y-10">
                <div className="space-y-4">
                   <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">Source Verification</h4>
                   <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                      Transparency is the ultimate validator. The **Field Unit Hub** on the VIGIL website allows you to audit the exact logic running in your extension.
                   </p>
                </div>
                <ul className="space-y-4">
                   <li className="flex gap-4">
                      <Code2 className="text-blue-500" size={24} />
                      <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                         <b>Source Silo:</b> Inspect the ES6 source code of every security module. Verify the math yourself.
                      </p>
                   </li>
                   <li className="flex gap-4">
                      <Zap className="text-emerald-500" size={24} />
                      <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                         <b>Bit-Perfect Parity:</b> Simulation logic matches field execution bit-for-bit to ensure safety outcomes.
                      </p>
                   </li>
                </ul>
             </div>
          </div>
        </section>

        {/* SECTION 7: MOBILE LAYER */}
        <section id="htu-mobile" className="scroll-mt-32 space-y-16 pb-48">
          <header className="space-y-4">
             <TechLabel text="MODULE_G: MOBILE_LAYER" color="emerald" />
             <h2 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">Secure <br/> Keyboard.</h2>
          </header>

          <DocCard border="emerald">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7 space-y-10">
                   <p className="text-zinc-400 text-2xl font-medium leading-relaxed italic border-l-4 border-emerald-600/30 pl-10">
                      "Mobile wallets have zero DOM context. VIGIL Mobile secures the System Input Layer—the keyboard and clipboard themselves."
                   </p>
                   <div className="space-y-6">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-4">
                         <Fingerprint className="text-emerald-500" /> Biometric Validation
                      </h4>
                      <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                         By installing the VIGIL Custom Keyboard, every pasted address is validated <b>within the keyboard process</b>. High-risk matches trigger mandatory FaceID/TouchID locks before the address can be submitted to any mobile app.
                      </p>
                   </div>
                </div>
                <div className="lg:col-span-5 flex flex-col items-center">
                   <div className="w-56 h-[440px] bg-zinc-950 border-[6px] border-zinc-900 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center justify-center gap-6">
                      <div className="absolute top-4 w-16 h-1.5 bg-zinc-900 rounded-full" />
                      <Lock size={48} className="text-red-600 animate-pulse" />
                      <div className="text-center space-y-2 px-6">
                         <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">Keyboard Locked</div>
                         <p className="text-[8px] text-zinc-600 font-bold uppercase italic">Mimic Identified. Biometric auth required to override.</p>
                      </div>
                      <div className="absolute bottom-6 w-full px-6">
                         <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[70%]" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </DocCard>
        </section>

        <footer className="pt-48 border-t border-zinc-900 text-center space-y-12 pb-60">
           <div className="h-[2px] w-48 bg-zinc-900 mx-auto" />
           <div className="space-y-6">
              <h3 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-[0.2em]">Manual Concluded.</h3>
              <p className="text-zinc-700 text-[12px] font-black uppercase tracking-[0.8em] italic leading-relaxed">
                 VIGIL SECURITY STANDARD // REGISTRY_REF: VIG-MAN-CORE-FINAL
              </p>
           </div>
           <div className="flex justify-center gap-20 opacity-20 hover:opacity-100 transition-opacity duration-1000">
              <ShieldCheck size={32} className="text-blue-500" />
              <Activity size={32} className="text-emerald-500" />
              <Radio size={32} className="text-cyan-500" />
           </div>
        </footer>

      </main>
      
      <style>{`
        @keyframes scan-vertical {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
