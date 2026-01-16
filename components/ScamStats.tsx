import React from 'react';
import { BarChart3, Users, TrendingUp, ShieldX, ExternalLink, AlertTriangle } from 'lucide-react';

interface StickyCardProps {
  icon: React.ReactNode;
  label: string;
  scopeLabel?: string;
  title: string;
  description: string;
  source: string;
  stat: string;
  statLabel: string;
  colorClass: string;
  borderClass?: string;
  index: number;
}

const StickyCard: React.FC<StickyCardProps> = ({ 
  icon, label, scopeLabel, title, description, source, stat, statLabel, colorClass, borderClass, index 
}) => {
  const activeBorderColor = borderClass || colorClass;
  const borderColor = activeBorderColor.replace('text-', 'border-');

  // Staggered offsets for persistent stacking - Reduced for tighter flow
  const mobileTop = 60 + (index * 16);
  const desktopTop = 100 + (index * 48);

  return (
    <div 
      className={`sticky w-full mb-4 md:mb-16 last:mb-0 sticky-container-${index}`} 
      style={{ 
        top: `var(--stack-top)`,
        zIndex: 50 + index,
        '--stack-top': `${mobileTop}px`
      } as React.CSSProperties}
    >
      <style>{`
        @media (min-width: 768px) {
          .sticky-container-${index} { --stack-top: ${desktopTop}px; }
        }
      `}</style>
      
      <div className={`bg-[#0c0c0c] border ${borderColor}/30 border-t-[4px] ${borderColor} rounded-[20px] md:rounded-[32px] p-5 md:p-12 lg:pl-14 lg:pr-28 shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] group overflow-hidden relative transition-all duration-500 mx-1 md:mx-0`}>
        <div className={`absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 opacity-5 blur-[60px] md:blur-[120px] rounded-full transition-opacity group-hover:opacity-10 ${activeBorderColor.replace('text-', 'bg-')}`} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-center">
          <div className="lg:col-span-5 xl:col-span-6 space-y-4 md:space-y-10 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-5">
              <div className={`p-2 md:p-3 rounded-[8px] bg-zinc-950 border border-zinc-700 ${colorClass}`}>
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, { size: 16 }) : icon}
              </div>
              <div className={`px-3 md:px-5 py-1 md:py-2 rounded-full bg-opacity-10 border border-opacity-40 text-[8px] md:text-[11px] font-black tracking-widest uppercase ${activeBorderColor.replace('text-', 'bg-')} ${activeBorderColor.replace('text-', 'border-')} ${activeBorderColor}`}>
                {label}
              </div>
              {scopeLabel && (
                <div className="px-3 md:px-5 py-1 md:py-2 rounded-full bg-zinc-900 border border-zinc-700 text-[8px] md:text-[11px] font-black tracking-widest uppercase text-zinc-500">
                  {scopeLabel}
                </div>
              )}
            </div>
            <div className="space-y-2 md:space-y-6">
              <h3 className="text-xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] italic uppercase">
                {title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-xl lg:text-2xl leading-relaxed font-medium max-w-3xl italic">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[8px] md:text-[12px] font-black text-zinc-600 uppercase tracking-widest pt-4 md:pt-10 border-t border-zinc-800">
              <ExternalLink size={12} className="opacity-50" />
              {source}
            </div>
          </div>
          <div className="lg:col-span-7 xl:col-span-6 text-center lg:text-right flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 md:pt-12 lg:pt-0 lg:pl-12 min-w-0">
            <div className={`text-4xl md:text-7xl lg:text-[4.8rem] xl:text-[5.2rem] font-black tracking-tighter italic leading-none mb-2 md:mb-5 ${colorClass} drop-shadow-2xl whitespace-nowrap`}>
              {stat}
            </div>
            <div className="text-[9px] md:text-[14px] font-black text-zinc-500 uppercase tracking-[0.3em] whitespace-nowrap">
              {statLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ScamStats: React.FC = () => {
  const cards = [
    { icon: <BarChart3 />, label: "GLOBAL IMPACT", scopeLabel: "UI ATTACKS", title: "Billions Lost to Mimicry", description: "Address poisoning evolved into a multi-billion dollar illicit industry. Total global losses exceeded $3.85B by 31st Dec 2025.", source: "SLOWMIST: GLOBAL CRYPTO CRIME 2025", stat: "$3.85B", statLabel: "TOTAL LOSSES (2025)", colorClass: "text-red-500", borderClass: "text-red-500" },
    { icon: <Users />, label: "COGNITIVE GAP", title: "The 8-Char Blind Spot", description: "Security audits show that 94% of users only verify the first four and last four characters of an address.", source: "SLOWMIST: UX SECURITY BENCHMARK 2025", stat: "94%", statLabel: "VERIFICATION GAP", colorClass: "text-blue-500" },
    { icon: <TrendingUp />, label: "SOLANA ACTIVITY", title: "Automated Deception", description: "In 2025, bots generate over 20,000 malicious 'zero-value' transfers per hour to 'poison' history logs.", source: "SLOWMIST: CHAIN HEURISTICS ANALYSIS", stat: "528k+", statLabel: "DAILY ATTACKS", colorClass: "text-orange-500" },
    { icon: <ShieldX />, label: "RECORD LOSS", title: "The $71M 'Poison' Record", description: "In 2024, a high-value wallet lost 1,155 WBTC using a vanity address that matched the victim's destination edges.", source: "ON-CHAIN FORENSICS: WHALE EXPLOIT ANALYSIS", stat: "$71M+", statLabel: "SINGLE LOSS EVENT", colorClass: "text-red-500" },
    { icon: <AlertTriangle />, label: "LATEST INCIDENT", title: "$50M USDT Poisoning", description: "In Dec 2025, a trader lost $50M USDT by selecting a poisoned look-alike address from transaction history.", source: "ON-CHAIN FORENSICS: USDT EXPLOIT (DEC 2025)", stat: "$50M", statLabel: "SINGLE LOSS (DEC 2025)", colorClass: "text-rose-600" }
  ];

  return (
    <section className="px-1 md:px-20 pt-16 pb-24 relative z-10 bg-[#020202] overflow-visible">
      <div className="max-w-7xl mx-auto overflow-visible relative">
        <div className="text-center space-y-4 md:space-y-8 max-w-4xl mx-auto mb-12 md:mb-32 px-4">
          <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.6em] block">The Cost of Silence</span>
          <h2 className="text-3xl md:text-7xl font-black text-white tracking-tighter italic leading-[0.8] uppercase">Address <br/> Poisoning.</h2>
          <p className="text-zinc-500 text-sm md:text-2xl font-medium mt-6 md:mt-12 max-w-2xl mx-auto italic">
            Real-world data through 2025 reveals the devastating scale of human-layer attacks.
          </p>
        </div>
        <div className="relative space-y-0 overflow-visible min-h-[160vh] md:min-h-[200vh]">
          {cards.map((card, idx) => (
            <StickyCard key={idx} index={idx} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};