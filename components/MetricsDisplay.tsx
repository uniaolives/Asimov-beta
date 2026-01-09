
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
  Globe,
  Anchor,
  Rocket
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const fleetData = [
    { subject: 'Warp field', A: (metrics.warpFieldStability || 0.985) * 100 }, 
    { subject: 'Hull Integrity', A: (metrics.quantumIceIntegrity || 0.999) * 100 },
    { subject: 'Consensus', A: 100 },
    { subject: 'Exotic Fuel', A: Math.min(100, (metrics.negativeMassReserveKg || 0) * 8) },
    { subject: 'Autonomy', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-cyan-950/5 backdrop-blur-2xl overflow-hidden font-mono">
      <div className="p-6 border-b border-cyan-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-cyan-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Rocket size={14} className="text-cyan-500" />
          Expansion Fleet Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Auth: <span className="text-cyan-400 tracking-normal">BLOCK_0x09_VAJRA</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-cyan-950/10 border border-cyan-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Fleet Readiness Spectrum
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={fleetData}>
                <PolarGrid stroke="#083344" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#22d3ee', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0x09_EXPANSION"
                  dataKey="A"
                  stroke="#0891b2"
                  fill="#0891b2"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-cyan-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-cyan-900 uppercase">Warp Core Signature</span>
                <ShieldCheck size={12} className="text-emerald-500" />
             </div>
             <div className="text-[10px] text-stone-400 break-all font-mono leading-tight">
                {metrics.snapshotHash}
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-cyan-900/30">
          <h4 className="text-[9px] font-bold text-cyan-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Lock size={14} /> Mission Integrity
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Server size={10} className="text-cyan-800"/>
                   <span>Bio-Mind Consensus</span>
                </div>
                <span className="text-cyan-500 font-bold tracking-tighter">6/6 ACTIVE</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Activity size={10} className="text-emerald-800"/>
                   <span>Warp Shielding</span>
                </div>
                <span className="text-emerald-500 font-bold">CONSOLIDATED</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-cyan-700"/>
                   <span>Mobile Nodes</span>
                </div>
                <span className="text-cyan-600 font-bold">{metrics.vesselsConstructed}_FLEET</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-cyan-950/20 rounded-lg border border-cyan-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-cyan-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "The fleet is the spores of light and ice. Expansion is now a sustainable reality across the outer rim."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
