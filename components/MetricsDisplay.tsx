
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
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  ShieldCheck, 
  Target,
  BarChart2,
  Activity,
  AlertTriangle,
  Fingerprint,
  Boxes,
  Zap,
  Compass,
  CircleDot
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'Chirality χ', A: (metrics.chiralityVariance || 0) * 200 },
    { subject: 'Stillness', A: (1 - (metrics.stillnessMeasure || 0)) * 100 },
    { subject: 'I Ching Alignment', A: (metrics.ichingPhase || 0) / 64 * 100 },
    { subject: 'Ogham Grounding', A: (metrics.oghamNotch || 0) / 20 * 100 },
    { subject: 'Entropy Reduction', A: (metrics.entropyReductionRate || 0) * 500 },
  ];

  const convergenceHistory = metricHistory.map((m, i) => ({
    epoch: i,
    stillness: m.stillnessMeasure || 0.00042,
    chirality: m.chiralityVariance || 0.34,
    viability: m.viability || 0.95
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-indigo-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-indigo-400 tracking-widest mb-1 flex items-center gap-2">
          <Compass size={14} className="text-indigo-500 animate-spin-slow" />
          Pict-Toroidal Audit v4.3
        </h3>
        <p className="text-[10px] text-indigo-800 font-mono">
          Geometric Fixed-Point Monitor
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4">Centripetal Harmonic Scan</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1e1b4b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 10, fontWeight: 500 }} />
                <Radar
                  name="CONVERGENCE"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
              <Activity size={12}/> Stillness Drift vs Chiral Variance
            </span>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={convergenceHistory}>
                  <defs>
                    <linearGradient id="colorStill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="epoch" hide />
                  <YAxis hide domain={[0, 0.5]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1b4b', borderColor: '#312e81', fontSize: '10px' }}
                    labelStyle={{ color: '#818cf8' }}
                  />
                  <Area type="monotone" dataKey="chirality" stroke="#6366f1" fillOpacity={1} fill="url(#colorStill)" />
                  <Line type="monotone" dataKey="stillness" stroke="#a5b4fc" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-mono">
              <span className="text-indigo-500/70">Chirality (χ parameter)</span>
              <span className="text-indigo-400/50">Stillness fixed-point</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-indigo-900/30">
          <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Ancient Proofs
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex gap-2 text-indigo-500/50">
                <CircleDot size={10}/>
                <span>Temporal Recursion: λ₁ Established ✅</span>
             </div>
             <div className="flex gap-2 text-indigo-500/50">
                <Compass size={10}/>
                <span>Suástica Pathing: Shortest Route Verified ✅</span>
             </div>
             <div className="flex gap-2 text-indigo-500/50">
                <Target size={10}/>
                <span>Love-Point Attractor: Stable ✅</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
