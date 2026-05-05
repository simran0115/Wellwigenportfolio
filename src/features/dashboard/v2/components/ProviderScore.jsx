import React from 'react';
import { Award, Zap, Target, TrendingUp } from 'lucide-react';

const ProviderScore = ({ score, insight }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Efficiency Index</h3>
        <div className="px-2 py-1 bg-teal-500/10 rounded-md">
          <TrendingUp size={12} className="text-teal-600" />
        </div>
      </div>
      
      <div className="relative w-52 h-52 flex items-center justify-center mb-8">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-slate-50"
          />
          <circle
            cx="104"
            cy="104"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="text-teal-500 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-900 tracking-tighter">{score}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Percentile</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target size={32} />
          </div>
          <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight leading-relaxed">
            {insight || "Operating at peak efficiency. You are in the top 5% of network providers."}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rank</p>
            <p className="text-xs font-black text-slate-900 tracking-tight">#42 / 1.2k</p>
          </div>
          <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stability</p>
            <p className="text-xs font-black text-emerald-600 tracking-tight uppercase">High</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderScore;
