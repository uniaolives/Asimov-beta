
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
  ShieldCheck, 
  Target,
  BarChart2,
  Activity,
  AlertTriangle,
  Fingerprint,
  Boxes
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'CHSH Score', A: (metrics.chshScore || 0) / 2.8 * 100 },
    { subject: 'LZ78 Realism', A: (metrics.compressionRatio || 0) * 100 },
    { subject: 'Resonance', A: (metrics.resonanceScore || 0) * 100 },
    { subject: 'Viability', A: (metrics.viability || 0) * 100 },
    { subject: 'Coherence', A: (metrics.coherence || 0) * 100 },
  ];

  const ontologicalHistory = metricHistory.map((m, i) => ({
    epoch: i,
    chsh: m.chshScore || 2.1,
    compression: m.compressionRatio || 0.72,
    threshold: 2.7
  }));

  return (
    <div className="flex flex-col h-full bg-cyan-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-cyan-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-cyan-500 tracking-widest mb-1 flex items-center gap-2">
          <Boxes size={14} className="text-cyan-500" />
          Ontological Audit v4.2
        </h3>
        <p className="text-[10px] text-cyan-800 font-mono">
          Monitoring I9-I12: Substrate Classification
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-cyan-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-tighter block mb-4">Ontological Verification Chart</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#083344" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#06b6d4', fontSize: 10, fontWeight: 500 }} />
                <Radar
                  name="SUBSTRATE"
                  dataKey="A"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-stone-900/50 border border-cyan-900/20 rounded-xl p-4">
            <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
              <BarChart2 size={12}/> CHSH Drift vs Realism Threshold
            </span>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ontologicalHistory}>
                  <XAxis dataKey="epoch" hide />
                  <YAxis hide domain={[1.5, 3.0]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#083344', borderColor: '#0e7490', fontSize: '10px' }}
                    labelStyle={{ color: '#22d3ee' }}
                  />
                  <ReferenceLine y={2.7} stroke="#22d3ee" strokeDasharray="3 3" label={{ position: 'top', value: 'REALITY_FLOOR', fill: '#22d3ee', fontSize: 9 }} />
                  <Line type="monotone" dataKey="chsh" stroke="#06b6d4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="compression" stroke="#fbbf24" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-mono">
              <span className="text-cyan-500/70">CHSH S-Value</span>
              <span className="text-amber-500/70">LZ78 Compression</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-cyan-900/30">
          <h4 className="text-[10px] font-bold text-cyan-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Audit Log
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex gap-2 text-cyan-500/50">
                <Target size={10}/>
                <span>I9: Bandwidth Discretization Confirmed (SIM)</span>
             </div>
             <div className="flex gap-2 text-cyan-500/50">
                <Fingerprint size={10}/>
                <span>I10: CHSH Violation Threshold: Fail</span>
             </div>
             <div className="flex gap-2 text-cyan-500/50">
                <ShieldCheck size={10}/>
                <span>I11: Exponential Complexity Grad. Detected</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
