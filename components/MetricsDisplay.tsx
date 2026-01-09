
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
  Anchor
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const genesisData = [
    { subject: 'Consistency', A: (metrics.tmrAgreement || 1.0) * 100 }, 
    { subject: 'Quorum', A: (metrics.quorumSignaturesReceived || 0) * 20 },
    { subject: 'Immutability', A: 100 },
    { subject: 'Consensus', A: (metrics.resonanceScore || 1.0) * 100 },
    { subject: 'Topology', A: 100 },
  ];

  return (
    <div className="flex flex-col h-full bg-amber-950/5 backdrop-blur-2xl overflow-hidden font-mono">
      <div className="p-6 border-b border-amber-900/50 bg-black/60">
        <h3 className="text-[11px] font-bold uppercase text-amber-400 tracking-[0.3em] mb-1 flex items-center gap-2">
          <Anchor size={14} className="text-amber-500" />
          Primordial Audit
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Auth: <span className="text-amber-400 tracking-normal">BLOCK_0x00_GÊNSE</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-amber-950/10 border border-amber-900/50 rounded-xl p-4 shadow-2xl ring-1 ring-white/10">
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em] block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Genesis Invariant Distribution
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={genesisData}>
                <PolarGrid stroke="#451a03" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fbbf24', fontSize: 8, fontWeight: 700 }} />
                <Radar
                  name="0x00_GENESIS"
                  dataKey="A"
                  stroke="#d97706"
                  fill="#d97706"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
           <div className="bg-black/60 border border-amber-900/40 rounded-xl p-4 shadow-xl">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-amber-900 uppercase">Merkle Root Integrity</span>
                <ShieldCheck size={12} className="text-emerald-500" />
             </div>
             <div className="text-[10px] text-stone-400 break-all font-mono leading-tight">
                {metrics.merkleRootHash}
             </div>
           </div>
        </div>

        <div className="pt-4 border-t border-amber-900/30">
          <h4 className="text-[9px] font-bold text-amber-950 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Lock size={14} /> Ledger Foundations
          </h4>
          <div className="space-y-3 text-[10px]">
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Server size={10} className="text-amber-800"/>
                   <span>BFT Consensus</span>
                </div>
                <span className="text-amber-500 font-bold tracking-tighter">4/5 QUORUM</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Activity size={10} className="text-emerald-800"/>
                   <span>State Finality</span>
                </div>
                <span className="text-emerald-500 font-bold">ABSOLUTE</span>
             </div>
             <div className="flex justify-between items-center text-stone-500">
                <div className="flex gap-2 items-center">
                   <Globe size={10} className="text-amber-700"/>
                   <span>Celestial Nodes</span>
                </div>
                <span className="text-amber-600 font-bold">5_ACTIVE</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-amber-950/20 rounded-lg border border-amber-900/40 ring-1 ring-white/5">
           <p className="text-[8px] text-amber-800 italic text-center leading-relaxed font-sans uppercase font-bold tracking-tight">
             "Epoch Zero is sealed. The foundation of the solar consciousness substrate is immutable and eternally causally consistent."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
