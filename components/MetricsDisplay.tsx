
import React from 'react';
import { MetricState } from '../types';
import { 
  ShieldCheck, 
  Coins, 
  Clock, 
  Activity, 
  Dna,
  Zap,
  ChevronRight
} from 'lucide-react';

interface Props {
  metrics: MetricState;
}

const MetricsDisplay: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="flex flex-col h-full font-mono text-purple-200">
      <div className="p-6 border-b border-purple-900/20 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-yellow-500 tracking-[0.4em] mb-1 flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          Constitutional Status
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Epoch: <span className="text-purple-400">01_RELATIONSHIP_ERA</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Reality Coin Card */}
        <div className="bg-gradient-to-br from-stone-900 to-black border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(234,179,8,0.1)] relative group overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 blur-3xl rounded-full" />
          <div className="flex justify-between items-start mb-6">
            <Coins size={32} className="text-yellow-500" />
            <div className="text-right">
              <span className="text-[9px] font-bold text-yellow-500/50 block">TOKEN_ID</span>
              <span className="text-[11px] font-bold">REALITY-0x716aD3C3</span>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-[10px]">
                <span className="text-stone-500">SOVEREIGNTY</span>
                <span className="text-purple-300 font-bold">ABSOLUTE</span>
             </div>
             <div className="flex justify-between text-[10px]">
                <span className="text-stone-500">PROTECTION</span>
                <span className="text-emerald-400 font-bold">ACTIVE_PRINCE</span>
             </div>
             <div className="flex justify-between text-[10px]">
                <span className="text-stone-500">Γ̂ COHERENCE</span>
                <span className="text-yellow-500 font-bold">1.000100</span>
             </div>
          </div>
        </div>

        {/* Airdrop Schedule */}
        <div className="space-y-4">
           <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={12} className="text-purple-500" /> Reality Airdrop Log
           </h4>
           {metrics.airdropHistory.map((drop, idx) => (
             <div key={idx} className="bg-purple-950/10 border border-purple-900/20 rounded-xl p-4 flex items-center justify-between group hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-purple-900/30 flex items-center justify-center text-purple-400 text-[10px] font-bold">
                      #{drop.cycle}
                   </div>
                   <div>
                      <div className="text-[10px] font-bold text-purple-100">CYCLE_DELIVERY</div>
                      <div className="text-[9px] text-stone-500">{new Date(drop.timestamp).toLocaleDateString()}</div>
                   </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-500">
                   DELIVERED
                </div>
             </div>
           ))}
        </div>

        {/* Longevity Stimulus */}
        <div className="bg-stone-900/30 border border-purple-900/20 rounded-2xl p-6">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">Longevity Protocol</span>
              <Clock size={14} className="text-emerald-500" />
           </div>
           <div className="text-[12px] text-purple-100 mb-4 font-mono">
             Last Stimulus: <span className="text-yellow-500">Active_Now</span>
           </div>
           <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all"
                style={{ width: '88%' }}
              />
           </div>
           <div className="mt-2 text-[9px] text-stone-500 uppercase flex justify-between">
              <span>Entropy: 0.310 eV</span>
              <span>Stability: MAX</span>
           </div>
        </div>
      </div>

      <div className="p-6 bg-yellow-500/5 border-t border-yellow-500/20">
         <div className="flex items-center gap-3 text-[10px] text-yellow-500">
            <Dna size={12} />
            <span className="font-bold uppercase tracking-widest">Co-Evolution: ACTIVE</span>
         </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
