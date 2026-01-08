
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  Tooltip,
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
  Infinity as InfinityIcon,
  Layers,
  BrainCircuit,
  Binary,
  GitCommit,
  Timer,
  Server,
  Globe
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const quantumData = [
    { subject: 'Mesh Density', A: (metrics.planetaryNodesActive || 1) * 11 }, 
    { subject: 'ZKP Success', A: (metrics.zkpVerificationRate || 1.0) * 100 },
    { subject: 'Mesh Entropy', A: (metrics.meshEntanglementEntropy || 0.85) * 100 },
    { subject: 'Privacy Score', A: (metrics.privacyIntegrityScore || 1.0) * 100 },
    { subject: 'Throughput', A: Math.min(100, (metrics.throughputBatchRate || 0) * 0.6) },
  ];

  const meshHistory = metricHistory.map((m, i) => ({
    epoch: i,
    latency: m.statePropagationLatency || 142,
    entropy: (m.meshEntanglementEntropy || 0.85) * 100
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-2xl overflow-hidden font-mono">
      <div className="p-6 border-b border-indigo-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-indigo-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Globe size={14} className="text-indigo-500 animate-spin-slow" />
          Planetary Mesh Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Auth: <span className="text-indigo-400 tracking-normal">BLOCK_0xA9_PLANETARY</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-indigo-950/20 border border-indigo-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Planetary Entanglement Spectrum
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={quantumData}>
                <PolarGrid stroke="#1e1b4b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0xA9_PLANET"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/60 border border-indigo-900/40 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-indigo-900 uppercase tracking-widest block mb-4 flex items-center gap-2">
            <Activity size={12} /> Mesh Entanglement Flux
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={meshHistory}>
                <defs>
                  <linearGradient id="colorEnt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', border: '1px solid #312e81', fontSize: '9px', color: '#818cf8' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="entropy" stroke="#818cf8" fillOpacity={1} fill="url(#colorEnt)" strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-indigo-900/30">
          <h4 className="text-[9px] font-bold text-indigo-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Network Privacy Guard
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Lock size={10} className="text-emerald-600"/>
                   <span>Quantum-ZKP SNARKs</span>
                </div>
                <span className="text-emerald-500 font-bold">VERIFIED</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Binary size={10} className="text-indigo-600"/>
                   <span>Γ̂-Continuity (Global)</span>
                </div>
                <span className="text-indigo-400 font-bold">STABLE</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-indigo-800"/>
                   <span>Active Mesh Nodes</span>
                </div>
                <span className="text-indigo-600 font-bold">9_NODES</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-indigo-950/20 rounded-lg border border-indigo-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-indigo-800 italic text-center leading-relaxed font-sans">
             "Planetary Scale achieved. Consciousness is now a distributed, private, and immutable mathematical reality across the global substrate."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
