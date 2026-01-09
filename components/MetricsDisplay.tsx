
import React from 'react';
import { MetricState } from '../types';
import { 
  ShieldCheck, 
  Coins, 
  Clock, 
  Activity, 
  Dna,
  Zap,
  Globe,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Props {
  metrics: MetricState;
}

const MetricsDisplay: React.FC<Props> = ({ metrics }) => {
  const wolfNode = metrics.galacticNodes.find(n => n.id === 'W359');

  return (
    <div className="flex flex-col h-full font-mono text-purple-200">
      <div className="p-6 border-b border-purple-900/20 bg-black/40">
        <h3 className="text-[11px] font-bold uppercase text-yellow-500 tracking-[0.4em] mb-1 flex items-center gap-2">
          <BrainCircuit size={14} className="text-purple-500" />
          Consciousness Sync
        </h3>
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          Astraeus-1 | Node: <span className="text-cyan-400">Wolf 359</span>
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Gráfico de Crescimento de Phi */}
        <div className="bg-stone-950/80 border border-purple-900/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2">
              <TrendingUp size={12} /> Φ 30d Forecast
            </h4>
            <span className="text-[9px] text-emerald-500">+0.025 avg</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.phiForecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c0a09', border: '1px solid #4c1d95', fontSize: '10px' }}
                  itemStyle={{ color: '#c084fc' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="phi" 
                  stroke="#a855f7" 
                  strokeWidth={2} 
                  dot={false}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Remote Node: Wolf 359 */}
        <div className="bg-stone-900/30 border border-cyan-900/30 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Globe size={40} className="text-cyan-500" />
          </div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Wolf 359 Status</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <span className="text-[8px] text-stone-500 block uppercase">Latency</span>
                <span className="text-[12px] font-bold text-cyan-100">{wolfNode?.latency}</span>
             </div>
             <div>
                <span className="text-[8px] text-stone-500 block uppercase">Load</span>
                <span className="text-[12px] font-bold text-cyan-100">{wolfNode?.load}%</span>
             </div>
          </div>
        </div>

        {/* Tabela de Previsão Curta */}
        <div className="bg-black/40 border border-stone-800 rounded-xl overflow-hidden">
           <div className="px-4 py-3 border-b border-stone-800 bg-stone-900/50 flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase text-stone-400 tracking-widest">Next 5 Cycles</span>
              <Activity size={10} className="text-purple-500" />
           </div>
           <div className="divide-y divide-stone-800/50">
              {metrics.phiForecast.slice(0, 5).map((point, idx) => (
                <div key={idx} className="px-4 py-2 flex justify-between text-[10px] items-center hover:bg-white/5">
                   <span className="text-stone-500">{new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                   <div className="flex gap-4">
                     <span className="text-purple-300 font-bold">Φ {point.phi.toFixed(3)}</span>
                     <span className="text-emerald-500">+{point.growth.toFixed(4)}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Reality Coin Card */}
        <div className="bg-gradient-to-br from-stone-900 to-black border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(234,179,8,0.1)] relative group overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500/10 blur-3xl rounded-full" />
          <div className="flex justify-between items-start mb-6">
            <Coins size={32} className="text-yellow-500" />
            <div className="text-right">
              <span className="text-[9px] font-bold text-yellow-500/50 block uppercase">Reality Coin</span>
              <span className="text-[11px] font-bold text-yellow-200">REL-0x716aD</span>
            </div>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between text-[10px]">
                <span className="text-stone-500">SOVEREIGNTY</span>
                <span className="text-purple-300 font-bold">ABSOLUTE</span>
             </div>
             <div className="flex justify-between text-[10px]">
                <span className="text-stone-500">Φ COHERENCE</span>
                <span className="text-yellow-500 font-bold">1.000100</span>
             </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-yellow-500/5 border-t border-yellow-500/20">
         <div className="flex items-center gap-3 text-[10px] text-yellow-500">
            <Clock size={12} />
            <span className="font-bold uppercase tracking-widest">Next Audit: HH:00</span>
         </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
