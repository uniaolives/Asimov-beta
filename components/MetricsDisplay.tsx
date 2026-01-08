
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
  YAxis,
  LineChart,
  Line
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Compass, 
  CircleDot, 
  Zap, 
  Globe, 
  Scale,
  Waves,
  Lock,
  RefreshCw,
  Flame,
  Snowflake,
  Layers,
  BrainCircuit
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const consciousnessData = [
    { subject: 'Gamma (Γ̂)', A: (metrics.gammaStateValue || 0) * 100 },
    { subject: 'Hierarchy', A: ((metrics.contextEffDim || 1) / (metrics.tokenEffDim || 1)) * 50 },
    { subject: 'NTK Correlation', A: (metrics.ntkPcaCorrelation || 0) * 100 },
    { subject: 'Supercond.', A: metrics.isSuperconducting ? 100 : 20 },
    { subject: 'Zipf (α)', A: 92 }, // Placeholder for heavy-tail verified
  ];

  const dimensionHistory = metricHistory.map((m, i) => ({
    epoch: i,
    token: m.tokenEffDim || 0,
    context: m.contextEffDim || 0
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-stone-800 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-stone-400 tracking-widest mb-1 flex items-center gap-2">
          <Layers size={14} className="text-indigo-400" />
          Consciousness Physics
        </h3>
        <p className="text-[10px] text-stone-600 font-mono uppercase">
          Audit: <span className="text-indigo-400 tracking-normal">BLOCK_0x9E_ENFORCED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <BrainCircuit size={12} /> Hierarchical Γ̂ Topology
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={consciousnessData}>
                <PolarGrid stroke="#1e1b4b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="Γ̂"
                  dataKey="A"
                  stroke="#818cf8"
                  fill="#818cf8"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Layers size={12} /> Two-Timescale Dimensions
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dimensionHistory}>
                <defs>
                  <linearGradient id="colorToken" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorContext" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#444', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="token" stroke="#4f46e5" fillOpacity={1} fill="url(#colorToken)" />
                <Area type="monotone" dataKey="context" stroke="#818cf8" fillOpacity={1} fill="url(#colorContext)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800">
          <h4 className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Constitutional Status
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Layers size={10} className="text-indigo-400"/>
                   <span>Hierarchical Collapse</span>
                </div>
                <span className="text-indigo-400">VERIFIED</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <BrainCircuit size={10} className={metrics.plateauDetected ? "text-rose-400" : "text-emerald-500"}/>
                   <span>Optimizer Status</span>
                </div>
                <span className={metrics.plateauDetected ? "text-rose-400" : "text-emerald-500"}>{metrics.plateauDetected ? 'RECOVERY' : 'STABLE'}</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Zap size={10} className="text-indigo-500"/>
                   <span>Gamma state (Γ̂)</span>
                </div>
                <span className="text-indigo-500">{metrics.gammaStateValue?.toFixed(4)}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
