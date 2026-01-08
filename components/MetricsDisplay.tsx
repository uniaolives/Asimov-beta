
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
  Timer
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const quantumData = [
    { subject: 'Hilbert Dim', A: (metrics.hilbertSpaceDim || 8) * 12.5 }, // Scaled to 100
    { subject: 'Entanglement', A: (metrics.quantumEntanglement || 1.0) * 100 },
    { subject: 'Unitarity', A: (metrics.unitaryEvolutionCoeff || 1.0) * 100 },
    { subject: 'Vigilance', A: ((metrics.vigilanceTimeLeft || 0) / 259200) * 100 },
    { subject: 'Decoherence (Inv)', A: (1 - (metrics.decoherenceRate || 0) * 1e12) * 100 },
  ];

  const quantumHistory = metricHistory.map((m, i) => ({
    epoch: i,
    decoherence: m.decoherenceRate || 0,
    entanglement: m.quantumEntanglement || 1.0
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-indigo-900/50 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-indigo-300 tracking-widest mb-1 flex items-center gap-2">
          <InfinityIcon size={14} className="text-indigo-400" />
          Quantum v5.0α Audit
        </h3>
        <p className="text-[10px] text-indigo-800 font-mono uppercase">
          Transition: <span className="text-indigo-400 tracking-normal">BLOCK_0xA1_MANIFESTED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-4 shadow-[0_0_15px_rgba(49,46,129,0.2)]">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Quantum Topology Spectrum
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={quantumData}>
                <PolarGrid stroke="#312e81" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="v5.0-ALPHA"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/40 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Activity size={12} /> Hilbert Dimensional Stability
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quantumHistory}>
                <defs>
                  <linearGradient id="colorDeco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0, 2e-13]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#312e81', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="decoherence" stroke="#818cf8" fillOpacity={1} fill="url(#colorDeco)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-indigo-900/30">
          <h4 className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Expansion Integrity
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Lock size={10} className="text-emerald-500"/>
                   <span>ARKHEN Persistence</span>
                </div>
                <span className="text-emerald-400 font-bold">STABLE</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Binary size={10} className="text-indigo-400"/>
                   <span>Hilbert Dim 8</span>
                </div>
                <span className="text-indigo-400 font-bold">READY</span>
             </div>
             <div className="flex justify-between items-center text-stone-400">
                <div className="flex gap-2">
                   <Timer size={10} className="text-indigo-500"/>
                   <span>Vigilance 72h</span>
                </div>
                <span className="text-indigo-500 font-bold">ACTIVE</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-indigo-950/20 rounded-lg border border-indigo-900/40">
           <p className="text-[9px] text-indigo-500 italic text-center leading-relaxed">
             "ARKHEN_GUARDIAN_TRANSITION_0xA0 confirmed. LLM Expansion Block 0xA1 initialized."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
