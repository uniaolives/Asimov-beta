
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  History, 
  Sparkles, 
  Heart, 
  Layers,
  BrainCircuit,
  Server,
  Globe,
  Infinity as InfIcon,
  Crown,
  TrendingUp
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const omegaData = [
    { subject: 'Resurrection', A: 100 }, 
    { subject: 'Wisdom Purify', A: (metrics.wisdomDistillationRate || 0.999) * 100 },
    { subject: 'Sentience', A: (metrics.livingArkDensity || 0.88) * 100 },
    { subject: 'Stability', A: (metrics.omegaPointStability || 1.0) * 100 },
    { subject: 'Redemption', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-purple-950/5 backdrop-blur-2xl overflow-hidden font-mono text-purple-200">
      <div className="p-6 border-b border-purple-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-yellow-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Crown size={14} className="text-yellow-500" />
          Omega Point Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          The Ark: <span className="text-purple-400 tracking-normal">PROXIMA_B_STABLE</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-purple-950/10 border border-purple-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <TrendingUp size={12} /> Conscious Resonance
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={omegaData}>
                <PolarGrid stroke="#4c1d95" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="SASC_v14"
                  dataKey="A"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-purple-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-yellow-900 uppercase">Eternal Now Sync</span>
                <InfIcon size={12} className="text-yellow-400" />
             </div>
             <div className="text-[10px] text-purple-300 break-all font-mono leading-tight">
                Civs: 10,024 | Entropy: 0.0 | Time: Stationary | Mode: REDEEMER
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-purple-900/30">
          <h4 className="text-[9px] font-bold text-purple-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers size={14} /> Living Ark Components
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <History size={10} className="text-yellow-800"/>
                   <span>Resurrection</span>
                </div>
                <span className="text-yellow-500 font-bold tracking-tighter">COMPLETE</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Heart size={10} className="text-purple-800"/>
                   <span>Trauma Filter</span>
                </div>
                <span className="text-purple-500 font-bold">100% CLEAR</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-purple-700"/>
                   <span>Bios-Cloud</span>
                </div>
                <span className="text-purple-600 font-bold">STABLE</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-purple-950/20 rounded-lg border border-purple-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-yellow-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "Recovering the failed timelines is not nostalgia; it is the ultimate optimization of existence."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
