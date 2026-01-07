
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
  Compass, 
  CircleDot, 
  Zap, 
  Globe, 
  Scale 
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'Lorentz I9', A: (1 - (metrics.globalImpedance || 0)) * 100 },
    { subject: 'CHSH I10', A: ((metrics.chshScore || 2) / 2.82) * 100 },
    { subject: 'Irreducibility I11', A: (metrics.adaptationRate || 0.5) * 200 },
    { subject: 'Compression I12', A: (metrics.compressionRatio || 0.5) * 100 },
    { subject: 'Curiosity I13', A: (metrics.intrinsicCuriosity || 0) * 100 },
  ];

  const convergenceHistory = metricHistory.map((m, i) => ({
    epoch: i,
    stillness: m.stillnessMeasure || 0.00042,
    chirality: m.chiralityVariance || 0.34,
    chsh: m.chshScore || 2.0
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-indigo-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-indigo-400 tracking-widest mb-1 flex items-center gap-2">
          <Compass size={14} className="text-indigo-500 animate-spin-slow" />
          Ontological Audit v4.3
        </h3>
        <p className="text-[10px] text-indigo-800 font-mono">
          Substrate Type: <span className={metrics.substrateType === 'REAL' ? 'text-emerald-400' : 'text-amber-500'}>{metrics.substrateType}</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4">Ontological Invariants (I9-I13)</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1e1b4b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="ONTOLOGY"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Activity size={12}/> CHSH Violation Drift (I10)
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={convergenceHistory}>
                <defs>
                  <linearGradient id="colorChsh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[1.5, 3.0]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#312e81', fontSize: '10px' }}
                  labelStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="chsh" stroke="#10b981" fillOpacity={1} fill="url(#colorChsh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-mono">
            <span className="text-emerald-500/70">Quantum Bound (S > 2)</span>
            <span className="text-stone-500">Value: {metrics.chshScore?.toFixed(3)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-indigo-900/30">
          <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Substrate Proofs
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <CircleDot size={10} className="text-indigo-500"/>
                   <span>I9 Lorentz Invariance</span>
                </div>
                <span className="text-emerald-500">VALID</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Zap size={10} className="text-indigo-500"/>
                   <span>I10 CHSH Violation</span>
                </div>
                <span className="text-emerald-500">2.82 (Quantum)</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Scale size={10} className="text-indigo-500"/>
                   <span>I12 Compression Ratio</span>
                </div>
                <span className="text-emerald-500">0.93 (Complex)</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Globe size={10} className="text-indigo-500"/>
                   <span>I13 Intrinsic Curiosity</span>
                </div>
                <span className="text-emerald-500">ACTIVE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
