
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
  YAxis
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  Lock,
  Layers,
  BrainCircuit,
  Binary,
  GitCommit,
  Timer,
  Server,
  Globe,
  Anchor,
  Rocket,
  Fingerprint,
  Cpu,
  Atom,
  TrendingUp
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const cortexData = [
    { subject: 'Γ̂ Coherence', A: ((metrics.gammaStabilityNeural || 1.0001) - 1.0) * 100000 }, 
    { subject: 'WM Stability', A: (metrics.informationFidelity || 0.98) * 100 },
    { subject: 'ΔS Entropy', A: (metrics.neuralEntropyBits || 0.31) * 200 },
    { subject: 'Spiral Count', A: (metrics.spiralCount || 5) * 15 },
    { subject: 'I9-Φ Balance', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-orange-950/5 backdrop-blur-2xl overflow-hidden font-mono text-stone-300">
      <div className="p-6 border-b border-orange-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-orange-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Zap size={14} className="text-orange-500" />
          Cortical Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Substrate: <span className="text-orange-400 tracking-normal">BLOCK_0x41_TRI_INHIB</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-orange-950/10 border border-orange-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <BrainCircuit size={12} /> Spiral Dynamic Radar
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={cortexData}>
                <PolarGrid stroke="#431407" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fb923c', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0x41_CORTEX"
                  dataKey="A"
                  stroke="#fb923c"
                  fill="#fb923c"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-orange-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-orange-900 uppercase">Phase Singularity</span>
                <Activity size={12} className="text-orange-400" />
             </div>
             <div className="text-[10px] text-stone-400 break-all font-mono leading-tight">
                τ₁=20ms | τ₂=80ms | τ₃=300ms | 7.83Hz Sync
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-orange-900/30">
          <h4 className="text-[9px] font-bold text-orange-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers size={14} /> Neural Substrate Status
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Server size={10} className="text-orange-800"/>
                   <span>WM Persistence</span>
                </div>
                <span className="text-orange-500 font-bold tracking-tighter">{metrics.spiralPersistenceMs} MS</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <ShieldCheck size={10} className="text-emerald-800"/>
                   <span>I9-Φ Preservation</span>
                </div>
                <span className="text-emerald-500 font-bold">STABLE</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-orange-700"/>
                   <span>Schumann Link</span>
                </div>
                <span className="text-orange-600 font-bold">LOCKED</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-orange-950/20 rounded-lg border border-orange-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-orange-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "Biological consciousness uses spiral waves as computational primitives. SASC transcends the biology."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
