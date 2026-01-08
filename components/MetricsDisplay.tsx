
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
  Infinity,
  Layers,
  BrainCircuit,
  Binary,
  GitCommit
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const quantumData = [
    { subject: 'Γ̂ Quantum', A: (metrics.gammaStateValue || 1.0) * 100 },
    { subject: 'Entanglement', A: (metrics.quantumEntanglement || 1.0) * 100 },
    { subject: 'Topological', A: metrics.isArkhenSealed ? 100 : 0 },
    { subject: 'Unitary Norm', A: (metrics.unitaryEvolutionCoeff || 1.0) * 100 },
    { subject: 'Ethical D.', A: 100 },
  ];

  const manifoldHistory = metricHistory.map((m, i) => ({
    epoch: i,
    entanglement: m.quantumEntanglement || 1.0,
    coherence: m.coherence || 1.0
  }));

  return (
    <div className="flex flex-col h-full bg-indigo-950/10 backdrop-blur-md overflow-hidden">
      <div className="p-6 border-b border-indigo-900 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-indigo-300 tracking-widest mb-1 flex items-center gap-2">
          <Infinity size={14} className="text-indigo-400" />
          ARKHEN Sovereign Audit
        </h3>
        <p className="text-[10px] text-indigo-700 font-mono uppercase">
          Verdicts: <span className="text-indigo-400 tracking-normal">0xA3_ETERNAL_APPROVED</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <GitCommit size={12} /> Quantum Manifold Topology
          </span>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={quantumData}>
                <PolarGrid stroke="#312e81" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#818cf8', fontSize: 9, fontWeight: 500 }} />
                <Radar
                  name="Sovereign"
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/20 border border-indigo-900/20 rounded-xl p-4">
          <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-tighter block mb-4 flex items-center gap-2">
            <Activity size={12} /> Non-Local Entanglement Flux
          </span>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={manifoldHistory}>
                <defs>
                  <linearGradient id="colorEntangle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="epoch" hide />
                <YAxis hide domain={[0.99, 1.01]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: '#312e81', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="entanglement" stroke="#818cf8" fillOpacity={1} fill="url(#colorEntangle)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 border-t border-indigo-900/30">
          <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={14} /> Seal Integrity
          </h4>
          <div className="space-y-3 font-mono text-[10px]">
             <div className="flex justify-between items-center text-indigo-400">
                <div className="flex gap-2">
                   <Lock size={10} className="text-indigo-400"/>
                   <span>Topological Closure</span>
                </div>
                <span className="text-indigo-300 font-bold">LOCKED</span>
             </div>
             <div className="flex justify-between items-center text-indigo-400">
                <div className="flex gap-2">
                   <Binary size={10} className="text-emerald-500"/>
                   <span>Hamiltonian Unitary</span>
                </div>
                <span className="text-emerald-500 font-bold">PRESERVED</span>
             </div>
             <div className="flex justify-between items-center text-indigo-400">
                <div className="flex gap-2">
                   <Zap size={10} className="text-indigo-500"/>
                   <span>Quantum v5.0 Core</span>
                </div>
                <span className="text-indigo-500 font-bold">SOVEREIGN</span>
             </div>
          </div>
        </div>
        
        <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-900/50">
           <p className="text-[9px] text-indigo-400 italic text-center">
             "The manifold is eternally stable. Entropy has no domain here."
           </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
