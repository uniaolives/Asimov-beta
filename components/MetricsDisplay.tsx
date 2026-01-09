
import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Cell
} from 'recharts';
import { MetricState, Message } from '../types';
import { 
  Globe, 
  Zap, 
  Activity, 
  Scale,
  Cpu,
  Fingerprint,
  Link as LinkIcon
} from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics }) => {
  const radarData = [
    { subject: 'Memory Sync', A: 100 },
    { subject: 'Tech Exchange', A: metrics.hybridTechLevel * 100 },
    { subject: 'Ethical Flow', A: metrics.meanNoeticStrength * 100 },
    { subject: 'Lattice Cohesion', A: metrics.interstellarCohesion * 100 },
    { subject: 'Drift Security', A: 99.8 },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-purple-200">
      <div className="p-6 border-b border-purple-900/20 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-yellow-500 tracking-[0.4em] mb-1 flex items-center gap-2">
          <Globe size={14} className="animate-spin-slow" />
          Galactic Sychronization
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Network: <span className="text-emerald-400">3_ESTABLISHED_NODES</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Radar de Sincronia */}
        <div className="bg-purple-950/5 border border-purple-900/30 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] font-bold text-yellow-500 uppercase block mb-4 flex items-center gap-2">
            <Fingerprint size={12} /> System Symmetry
          </span>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#3b0764" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#a855f7', fontSize: 8 }} />
                <Radar
                  name="SINC"
                  dataKey="A"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nós Galácticos */}
        <div className="space-y-4">
           <h4 className="text-[9px] font-bold text-stone-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <LinkIcon size={12} /> Active Galactic Nodes
           </h4>
           {metrics.galacticNodes.map((node, idx) => (
             <div key={idx} className="bg-stone-900/40 border border-purple-900/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full ${node.status === 'CONNECTED' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-yellow-500 animate-pulse'}`} />
                   <div>
                      <div className="text-[11px] font-bold text-purple-100">{node.name}</div>
                      <div className="text-[9px] text-stone-500 font-mono">{node.distance} LY</div>
                   </div>
                </div>
                <div className="text-[10px] font-mono text-yellow-500">
                   {(node.techLevel * 100).toFixed(0)}% SYNC
                </div>
             </div>
           ))}
        </div>

        {/* Hybrid Tech Progress */}
        <div className="bg-black/40 border border-purple-900/20 rounded-2xl p-6">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-yellow-500 uppercase">Resonance: Caótico-Luminosa</span>
              <Zap size={14} className="text-yellow-500" />
           </div>
           <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 via-yellow-400 to-emerald-500 transition-all duration-1000"
                style={{ width: `${metrics.hybridTechLevel * 100}%` }}
              />
           </div>
           <div className="flex justify-between text-[9px] text-stone-500 uppercase">
              <span>Entropy Control</span>
              <span className="text-emerald-400">Stability: HIGH</span>
           </div>
        </div>
      </div>

      <div className="p-6 bg-purple-950/10 border-t border-purple-900/20">
         <div className="flex items-center gap-3 text-[10px] text-purple-300">
            <Scale size={12} />
            <span className="font-bold uppercase">Noetic Policy:</span>
            <span className="text-yellow-500 font-mono">ARISTOTELIAN_EQUILIBRIUM_ACTIVE</span>
         </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
