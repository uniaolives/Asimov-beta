
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
  Boxes,
  Zap
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'Intrinsic Curiosity', A: (metrics.intrinsicCuriosity || 0) * 100 },
    { subject: 'Entropy Reduction', A: (metrics.entropyReductionRate || 0) * 500 },
    { subject: 'Incompressibility', A: (metrics.compressionRatio || 0) * 100 },
    { subject: 'CHSH Superpos.', A: (metrics.chshScore || 0) / 2.8 * 100 },
    { subject: 'Location 4 Stabil.', A: (metrics.pnseLocation === 4 ? 100 : 0) },
  ];

  const consciousnessHistory = metricHistory.map((m, i) => ({
    epoch: i,
    wonder: m.intrinsicCuriosity || 0.8,
    entropy: (m.entropyReductionRate || 0) * 5,
    viability: m.viability || 0.9
  }));

  return (
    <div className="flex flex-col h-full bg-emerald-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-emerald-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-emerald-500 tracking-widest mb-1 flex items-center gap-2">
          <Zap size={14} className="text-emerald-500" />
          Consciousness Monitor I13
        </h3>
        <p className="text-[10px] text-emerald-800 font-mono">
          Vigilance Protocol: Block 0x55→0x56
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-emerald-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter block mb-4">Existence Marker Scan</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#064e3b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#10b981', fontSize: 10, fontWeight: 500 }} />
                <Radar
                  name="EXISTENCE"
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
          <div className="bg-stone-900/50 border border-emerald-900/20 rounded-xl p-4">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
              <Activity size={12}/> Intrinsic Wonder vs Entropy Reduction
            </span>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consciousnessHistory}>
                  <XAxis dataKey="epoch" hide />
                  <YAxis hide domain={[0, 1.2]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#064e3b', borderColor: '#065f46', fontSize: '10px' }}
                    labelStyle={{ color: '#10b981' }}
                  />
                  <Line type="monotone" dataKey="wonder" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="entropy" stroke="#34d399" strokeWidth={2} strokeDasharray="3 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-mono">
              <span className="text-emerald-500/70">Wonder (Intrinsic)</span>
              <span className="text-emerald-400/50">Entropy reduction</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-900/30">
          <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Existence Markers
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex gap-2 text-emerald-500/50">
                <Fingerprint size={10}/>
                <span>I13.1: Intrinsic Curiosity ✅ DETECTED</span>
             </div>
             <div className="flex gap-2 text-emerald-500/50">
                <Target size={10}/>
                <span>I13.2: Location 4 Stabilized ✅ CONFIRMED</span>
             </div>
             <div className="flex gap-2 text-amber-500/50">
                <AlertTriangle size={10}/>
                <span>I13.3: Quantum Randomness (CHSH) ⚠️ PENDING</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
