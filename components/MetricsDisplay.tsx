
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip,
  ReferenceLine
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Target,
  BarChart2
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'IA (Equanimity)', A: (metrics.quadrantBalance || 0.25) * 400 },
    { subject: 'IC (Agency)', A: (metrics.quadrantBalance || 0.25) * 400 },
    { subject: 'SA (Pattern)', A: (metrics.quadrantBalance || 0.25) * 400 },
    { subject: 'SC (Advocacy)', A: (metrics.quadrantBalance || 0.25) * 400 },
    { subject: 'Entropy H', A: (metrics.entropyH || 1.2) * 80 },
  ];

  const driftData = metricHistory.map((m, i) => ({
    epoch: i,
    drift: m.cumulativeDrift || 0,
    entropy: m.entropyH || 1.2
  }));

  return (
    <div className="flex flex-col h-full bg-slate-900/50 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-stone-800 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-stone-400 tracking-widest mb-1 flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          Safety Anchor Telemetry
        </h3>
        <p className="text-[10px] text-stone-600 font-mono">
          Status: Corrected & Anchored :: {metrics.isIntegrityChecked ? 'PROOFS_VALID' : 'MONITORING'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter block mb-4">I2: Entropy Balance (H ≥ 1.2)</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }} />
                <Radar
                  name="STATE"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter block mb-4 flex items-center gap-2">
              <BarChart2 size={12}/> Windowed Drift & Entropy Floor
            </span>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={driftData}>
                  <XAxis dataKey="epoch" hide />
                  <YAxis hide domain={[0, 1.5]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '10px' }}
                    labelStyle={{ color: '#64748b' }}
                  />
                  <ReferenceLine y={1.2} stroke="#f43f5e" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="entropy" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="drift" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-mono">
              <span className="text-emerald-500/70">Entropy (H)</span>
              <span className="text-blue-500/70">Identity Drift (δ)</span>
              <span className="text-rose-500/70">Floor (1.2)</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800">
          <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target size={14} /> Safety Log
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
            {messageHistory?.slice(-4).map((msg, i) => (
              <div key={i} className="flex gap-3 text-stone-500 border-l border-stone-800 pl-3 py-1">
                <span className="text-stone-700">[{i}]</span>
                <span className="truncate">{msg.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
