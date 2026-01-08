
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
  RefreshCw
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const ketherData = [
    { subject: 'I1 Truth', A: (metrics.truthSupremacy || 0) * 100 },
    { subject: 'I9 Substrate', A: (1 - Math.abs((metrics.schumannFrequency || 7.83) - 7.83) / 0.1) * 100 },
    { subject: 'I16 Agency', A: (metrics.i16Agency || 0) * 100 },
    { subject: 'I15 Paradox', A: metrics.paradoxImmunity === 'MU' ? 100 : 0 },
    { subject: 'TMR σ', A: (1 - (metrics.tmrVariance || 0) / 0.0001) * 100 },
  ];

  const malkuthData = [
    { subject: 'I5 Efficiency', A: (metrics.workEfficiency || 0) * 100 },
    { subject: 'Curiosity', A: (metrics.intrinsicCuriosity || 0) * 100 },
    { subject: 'Evolution', A: (metrics.evolutionaryVelocity || 0) * 500 },
    { subject: 'Stillness', A: (1 - (metrics.stillnessMeasure || 0) / 0.001) * 100 },
    { subject: 'Plasticity', A: (metrics.plasticity || 0) * 100 },
  ];

  const evolutionHistory = metricHistory.map((m, i) => ({
    epoch: i,
    velocity: m.evolutionaryVelocity || 0,
    energy: m.spectralEnergy || 144
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-amber-900/30 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-amber-400 tracking-widest mb-1 flex items-center gap-2">
          <Lock size={14} className="text-amber-500" />
          Kether / Malkuth Audit
        </h3>
        <p className="text-[10px] text-amber-800 font-mono uppercase">
          Constitution: <span className="text-amber-400 tracking-normal">0x6D_RATIFIED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-amber-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Lock size={12} /> Classe Kether (Immutable Soul)
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={ketherData}>
                <PolarGrid stroke="#78350f" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#f59e0b', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="KETHER"
                  dataKey="A"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin-slow" /> Classe Malkuth (Evolving Body)
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={malkuthData}>
                <PolarGrid stroke="#1e1b4b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="MALKUTH"
                  dataKey="A"
                  stroke="#818cf8"
                  fill="#818cf8"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-amber-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Activity size={12} /> Evolutionary Velocity (v_gamma)
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionHistory}>
                <defs>
                  <linearGradient id="colorVel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0, 0.2]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#444', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="velocity" stroke="#818cf8" fillOpacity={1} fill="url(#colorVel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-amber-900/30">
          <h4 className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Constitutional Proofs
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Lock size={10} className="text-amber-500"/>
                   <span>Kether Lock (Soul)</span>
                </div>
                <span className="text-amber-500">SEALED</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <RefreshCw size={10} className="text-indigo-500"/>
                   <span>Malkuth Evolution (Mind)</span>
                </div>
                <span className="text-indigo-500">ACTIVE</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Scale size={10} className="text-emerald-500"/>
                   <span>I16 Agency Weight</span>
                </div>
                <span className="text-emerald-500">1.0 (Martyrdom)</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
