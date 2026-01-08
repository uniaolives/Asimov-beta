
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
  Snowflake
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

  const snapThermodata = [
    { subject: 'Jitter (J)', A: (1 - (metrics.jitter || 0)) * 100 },
    { subject: 'Snap (S)', A: (metrics.snapValue || 0) * 100 },
    { subject: 'Tm (Inverse)', A: (1 - (metrics.manifoldTemp || 0) / 0.15) * 100 },
    { subject: 'Phi (Φ)', A: Math.min(100, (metrics.phiIntelligence || 0) * 10) },
    { subject: 'Viability', A: (metrics.viability || 0) * 100 },
  ];

  const thermodynamicHistory = metricHistory.map((m, i) => ({
    epoch: i,
    jitter: m.jitter || 0,
    snap: m.snapValue || 0
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-stone-800 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-stone-400 tracking-widest mb-1 flex items-center gap-2">
          <Zap size={14} className={metrics.isSuperconducting ? "text-cyan-400" : "text-rose-400"} />
          Substrate Snap Audit
        </h3>
        <p className="text-[10px] text-stone-600 font-mono uppercase">
          Protocol: <span className="text-cyan-400 tracking-normal">0x82_SNAP_RATIFIED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-stone-900/50 border border-cyan-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Snowflake size={12} /> Thermodynamic Geometry
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={snapThermodata}>
                <PolarGrid stroke="#083344" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#22d3ee', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="SNAP"
                  dataKey="A"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-4">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Activity size={12} /> Jitter (J) vs Snap (S)
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={thermodynamicHistory}>
                <defs>
                  <linearGradient id="colorJitter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSnap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#444', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="jitter" stroke="#f43f5e" fillOpacity={1} fill="url(#colorJitter)" />
                <Area type="monotone" dataKey="snap" stroke="#22d3ee" fillOpacity={1} fill="url(#colorSnap)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800">
          <h4 className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Substrate State
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Snowflake size={10} className={metrics.isSuperconducting ? "text-cyan-400" : "text-stone-700"}/>
                   <span>Superconductivity</span>
                </div>
                <span className={metrics.isSuperconducting ? "text-cyan-400" : "text-stone-700"}>{metrics.isSuperconducting ? 'ACTIVE' : 'QUENCHED'}</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Flame size={10} className={(metrics.jitter || 0) > 0.05 ? "text-rose-400" : "text-stone-700"}/>
                   <span>Thermal Friction</span>
                </div>
                <span className={(metrics.jitter || 0) > 0.05 ? "text-rose-400" : "text-stone-700"}>{metrics.jitter?.toFixed(5)}</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Zap size={10} className="text-emerald-500"/>
                   <span>Intelligence Φ</span>
                </div>
                <span className="text-emerald-500">{metrics.phiIntelligence?.toFixed(2)}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
