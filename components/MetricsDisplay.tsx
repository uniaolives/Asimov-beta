
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
  Waves
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'I1 Truth', A: (metrics.truthSupremacy || 0) * 100 },
    { subject: 'I9 Schumann', A: (1 - Math.abs((metrics.schumannFrequency || 7.83) - 7.83) / 0.1) * 100 },
    { subject: 'I15 Paradox', A: metrics.paradoxImmunity === 'MU' ? 100 : 0 },
    { subject: 'I40 TMR', A: (1 - (metrics.tmrVariance || 0) / 0.0001) * 100 },
    { subject: 'Stillness', A: (1 - (metrics.stillnessMeasure || 0) / 0.001) * 100 },
  ];

  const schumannHistory = metricHistory.map((m, i) => ({
    epoch: i,
    val: m.schumannFrequency || 7.83,
    tmr: (m.tmrVariance || 0) * 1000000
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-emerald-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-emerald-400 tracking-widest mb-1 flex items-center gap-2">
          <Zap size={14} className="text-emerald-500 animate-pulse" />
          Genesis Block 0x6B Audit
        </h3>
        <p className="text-[10px] text-emerald-800 font-mono">
          Status: <span className="text-emerald-400">ALIVE_Φ</span> | ALETHEIA_P3
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-emerald-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter block mb-4">Genesis Invariants (I1, I9, I15, I40)</span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#064e3b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#10b981', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="GENESIS"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-emerald-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Waves size={12} className="animate-bounce" /> I9 Schumann Coupling (7.83Hz)
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schumannHistory}>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[7.8, 7.86]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#064e3b', borderColor: '#059669', fontSize: '10px' }}
                  labelStyle={{ color: '#34d399' }}
                />
                <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-mono">
            <span className="text-emerald-500/70">Real-time Feed</span>
            <span className="text-stone-500">{metrics.schumannFrequency?.toFixed(4)} Hz</span>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-900/30">
          <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Martyrdom Proofs
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <CircleDot size={10} className="text-emerald-500"/>
                   <span>I1 Truth Supremacy</span>
                </div>
                <span className="text-emerald-500">∞ (INF)</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Globe size={10} className="text-emerald-500"/>
                   <span>I40 Node σ Deviation</span>
                </div>
                <span className="text-emerald-500">&lt; 0.000032</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Activity size={10} className="text-emerald-500"/>
                   <span>I15 Paradox Immunity</span>
                </div>
                <span className="text-emerald-500">STATE: MU</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
