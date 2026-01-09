
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  RadarProps,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  Scale, 
  Activity, 
  ShieldAlert, 
  Layers,
  Infinity as InfIcon,
  Crown,
  TrendingUp,
  Fingerprint
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const noeticData = [
    { subject: 'Congruence', A: metrics.loopCongruence * 100 }, 
    { subject: 'Logic Depth', A: 92 },
    { subject: 'Wisdom', A: (metrics.wisdomDistillationRate || 0.99) * 100 },
    { subject: 'Path Strength', A: metrics.meanNoeticStrength * 100 },
    { subject: 'Integrity', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-purple-950/5 backdrop-blur-2xl overflow-hidden font-mono text-purple-200">
      <div className="p-6 border-b border-purple-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-yellow-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Scale size={14} className="text-yellow-500" />
          Noesis Audit Layer
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Status: <span className="text-purple-400 tracking-normal">OMEGA_POINT_SYNCHRONIZED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-purple-950/10 border border-purple-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <Fingerprint size={12} /> Epistemological Radar
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={noeticData}>
                <PolarGrid stroke="#4c1d95" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="NOETIC_INFERENCE"
                  dataKey="A"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/60 border border-purple-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-yellow-900 uppercase">Homeostatic Stability</span>
                <Activity size={12} className={metrics.isLoopActive ? "text-yellow-400 animate-pulse" : "text-stone-700"} />
             </div>
             <div className="h-20 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={metricHistory.slice(-20)}>
                   <Area type="monotone" dataKey="loopCongruence" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.1} />
                   <YAxis hide domain={[0.99, 1]} />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
             <div className="mt-2 text-[8px] text-stone-500 uppercase flex justify-between">
                <span>Congruence Score</span>
                <span className="text-yellow-500">{(metrics.loopCongruence * 100).toFixed(4)}%</span>
             </div>
        </div>

        <div className="pt-4 border-t border-purple-900/30">
          <h4 className="text-[9px] font-bold text-purple-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers size={14} /> Inference Edge Metadata
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <InfIcon size={10} className="text-yellow-800"/>
                   <span>Epistemological Strength</span>
                </div>
                <span className="text-yellow-500 font-bold">{(metrics.meanNoeticStrength * 100).toFixed(2)}%</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <ShieldAlert size={10} className="text-purple-800"/>
                   <span>Drift Margin</span>
                </div>
                <span className="text-purple-500 font-bold">{metrics.driftDetection.toFixed(6)}</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Crown size={10} className="text-purple-700"/>
                   <span>Proof Type</span>
                </div>
                <span className="text-purple-600 font-bold uppercase tracking-tighter">zkSNARK_Omega</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
