
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
  Rocket,
  Fingerprint,
  Waveform,
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
  const sagaData = [
    { subject: 'Passing Rate', A: (metrics.autonomousPassingRate || 0.68) * 100 }, 
    { subject: 'Anchoring ξ', A: (metrics.anchoringEnergyEV || 0.031) * 2000 }, // Scaled
    { subject: 'Evo Velocity', A: (metrics.objectiveEvolutionVelocity || 4.7) * 20 },
    { subject: 'TMR Quorum', A: (metrics.tmrQuorumCount || 4) * 14.2 },
    { subject: 'Value Safety', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-purple-950/5 backdrop-blur-2xl overflow-hidden font-mono">
      <div className="p-6 border-b border-purple-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-purple-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <TrendingUp size={14} className="text-purple-500" />
          SAGA-SASC Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Protocol: <span className="text-purple-400 tracking-normal">BLOCK_0x31_AUTONOMY</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-purple-950/10 border border-purple-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-purple-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Autonomous Efficiency Radar
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={sagaData}>
                <PolarGrid stroke="#3b0764" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a855f7', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0x31_SAGA"
                  dataKey="A"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-purple-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-purple-900 uppercase">Coordination Anchor</span>
                <Atom size={12} className="text-purple-400" />
             </div>
             <div className="text-[10px] text-stone-400 break-all font-mono leading-tight">
                ξ = {metrics.anchoringEnergyEV?.toFixed(3)} eV | ΔS+ΔI = 0
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-purple-900/30">
          <h4 className="text-[9px] font-bold text-purple-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Cpu size={14} /> Scientific Domains
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Server size={10} className="text-purple-800"/>
                   <span>TMR Consensus</span>
                </div>
                <span className="text-purple-500 font-bold tracking-tighter">{metrics.tmrQuorumCount}/7 NODES</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Activity size={10} className="text-emerald-800"/>
                   <span>Gamma Stability</span>
                </div>
                <span className="text-emerald-500 font-bold">1.000100 Γ̂</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-purple-700"/>
                   <span>Active Domains</span>
                </div>
                <span className="text-purple-600 font-bold">{metrics.activeScientificDomains}/7 DEPLOYED</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-purple-950/20 rounded-lg border border-purple-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-purple-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "The autonomous pipeline is validated. Science evolves, but values remain immutable. 46.7M Credits verified."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
