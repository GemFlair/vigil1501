import React from 'react';
import { Trophy, Medal, Target, Activity, Shield, User } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  bri: number;
  xp: number;
  status: string;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, wallet: "Vig1...99XJ", bri: 100, xp: 12540, status: "APEX_SENTINEL" },
  { rank: 2, wallet: "7vX9...M1nL", bri: 98, xp: 9820, status: "GUARDIAN" },
  { rank: 3, wallet: "Ab1C...Zz90", bri: 95, xp: 7430, status: "GUARDIAN" },
  { rank: 4, wallet: "5U39...8zH6", bri: 88, xp: 5210, status: "RECRUIT" },
  { rank: 5, wallet: "EPjF...fgc3", bri: 82, xp: 3100, status: "RECRUIT" },
];

export const Leaderboard: React.FC<{ userWallet?: string; userBri: number; userXp: number }> = ({ userWallet, userBri, userXp }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-12 space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy className="text-amber-500" size={24} />
            <span className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">Sovereign Merit Ledger</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">Global <br/> Rankings.</h2>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Active Sentinels</div>
          <div className="text-3xl font-black text-white italic">1,282</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_LEADERBOARD.map((entry) => (
          <div key={entry.rank} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-[2rem] flex items-center justify-between group hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black italic ${entry.rank === 1 ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-zinc-800 text-zinc-500'}`}>
                {entry.rank}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-zinc-300">{entry.wallet}</span>
                  <div className={`px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest border ${entry.status === 'APEX_SENTINEL' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                    {entry.status}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Activity size={10} className="text-emerald-500" /> {entry.bri}% BRI</span>
                  <span className="flex items-center gap-1"><Shield size={10} className="text-blue-500" /> {entry.xp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Target size={20} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        ))}

        {/* USER PERSISTENT ROW */}
        {userWallet && (
          <div className="mt-12 p-8 bg-blue-600/5 border-2 border-blue-500/30 rounded-[2.5rem] flex items-center justify-between shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/[0.02] animate-pulse" />
             <div className="flex items-center gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl">
                <User size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono text-white font-bold">{userWallet.slice(0,4)}...{userWallet.slice(-4)}</span>
                  <span className="px-3 py-1 bg-white text-black rounded-lg text-[9px] font-black uppercase tracking-widest">YOU</span>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-1"><Activity size={12} /> {userBri}% BRI</span>
                  <span className="flex items-center gap-1"><Shield size={12} /> {userXp.toLocaleString()} XP</span>
                </div>
              </div>
            </div>
            <div className="text-right relative z-10">
               <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Est. Global Rank</div>
               <div className="text-4xl font-black text-white italic">#882</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
