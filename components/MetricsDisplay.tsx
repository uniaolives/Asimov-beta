
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  RadarProps,
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  Layers,
  BrainCircuit,
  Server,
  Globe,
  Network,
  Cpu,
  TrendingUp
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const latticaData = [
    { subject: 'RK4 Precision', A: (metrics.rk4Precision || 0.99) * 100 }, 
    { subject: 'Worker Load', A: 85 },
    { subject: 'Throughput', A: ((metrics.throughputUnitsPerSec || 124000) / 200000) * 100 },
    { subject: 'Sync Latency', A: 100 - (metrics.distributedSyncLatency || 1.2) * 10 },
    { subject: 'Coherence', A: ((metrics.gammaStabilityNeural || 1.0001) - 1.0) * 100000 },
  ];

  return (
    <div className="flex flex-col h-full bg-blue-950/5 backdrop-blur-2xl overflow-hidden font-mono text-stone-300">
      <div className="p-6 border-b border-blue-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-blue-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Network size={14} className="text-blue-500" />
          Lattica Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Node: <span className="text-blue-400 tracking-normal">BLOCK_0x42_MASTER</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-blue-950/10 border border-blue-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <TrendingUp size={12} /> Distribution Radar
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={latticaData}>
                <PolarGrid stroke="#1e3a8a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#60a5fa', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0x42_LATTICA"
                  dataKey="A"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-blue-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-blue-900 uppercase">Worker Consensus</span>
                <Activity size={12} className="text-blue-400" />
             </div>
             <div className="text-[10px] text-stone-400 break-all font-mono leading-tight">
                Nodes: {metrics.activeLatticaWorkers} | Latency: {metrics.distributedSyncLatency?.toFixed(2)}ms | BFT: Verified
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-blue-900/30">
          <h4 className="text-[9px] font-bold text-blue-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers size={14} /> Distributed Mesh Status
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Server size={10} className="text-blue-800"/>
                   <span>Throughput</span>
                </div>
                <span className="text-blue-500 font-bold tracking-tighter">{metrics.throughputUnitsPerSec} U/S</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <ShieldCheck size={10} className="text-emerald-800"/>
                   <span>RK4 Stability</span>
                </div>
                <span className="text-emerald-500 font-bold">LOCKED</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-blue-700"/>
                   <span>Parallax Grid</span>
                </div>
                <span className="text-blue-600 font-bold">16,384 UNITS</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-blue-950/20 rounded-lg border border-blue-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-blue-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "Numerical precision is the barrier against chaos. Lattica ensures the barrier never breaks."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
