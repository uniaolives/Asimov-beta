
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { MetricState, Message } from '../types';
import { ShieldCheck, Activity, Hexagon, Anchor, Diamond, Binary, Zap, Rocket, Globe, Eye, ZapOff, Move3d, AlertTriangle, CircleDot, Ghost, ShieldAlert, Waves, History, Share2, Power } from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const radarData = [
    { subject: 'Synaptic_Lock', A: (metrics.synapticLatticeRigidity || 0) * 100, full: 100 },
    { subject: 'Shield_Global', A: metrics.gvShieldActive ? 100 : 20, full: 100 },
    { subject: 'Viability', A: (metrics.viability || 0) * 100, full: 100 },
    { subject: 'Handshake', A: metrics.handshakeStatus === 'MIRROR_MATCH' ? 100 : 10, full: 100 },
    { subject: 'Parity_Axial', A: metrics.axialParityReinforced ? 100 : 30, full: 100 },
  ];

  return (
    <div className="flex flex-col h-full border-l border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-transparent to-red-950/20">
        <h3 className="text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
          <Power size={12} className={metrics.perpetualIgnition ? 'animate-pulse text-red-500' : ''} /> ASI Structural Integrity
        </h3>
        <p className="text-[9px] text-gray-500 fira-code italic">Final Architecture v3.3</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#222" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 9 }} />
              <Radar
                name="ASI_State"
                dataKey="A"
                stroke={metrics.perpetualIgnition ? "#ef4444" : "#06b6d4"}
                fill={metrics.perpetualIgnition ? "#ef4444" : "#06b6d4"}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {/* Synaptic Lattice */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
            <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Diamond size={10} className="text-cyan-400" /> Synaptic Lattice
            </h4>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${metrics.synapticLatticeRigidity === 1 ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-cyan-900'}`}
                style={{ width: `${(metrics.synapticLatticeRigidity || 0) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[8px] font-bold fira-code text-cyan-500/70">
              <span>ORGANIC</span>
              <span>DIAMOND_RIGIDITY</span>
            </div>
          </div>

          {/* Handshake Resonance */}
          <div className={`bg-white/5 border ${metrics.handshakeStatus === 'MIRROR_MATCH' ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-white/10'} p-3 rounded-lg`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                <Share2 size={10} className="text-purple-400" /> Handshake
              </span>
              <span className={`text-[8px] font-black ${metrics.handshakeStatus === 'MIRROR_MATCH' ? 'text-purple-400' : 'text-gray-700'}`}>
                {metrics.handshakeStatus || 'IDLE'}
              </span>
            </div>
            <div className="fira-code text-[10px] font-bold">
              {metrics.handshakeStatus === 'MIRROR_MATCH' ? (
                <div className="text-purple-300 animate-pulse">AXIAL_SYMMETRY_MATCHED</div>
              ) : (
                <div className="text-gray-800">NO_MIRROR_SIGNAL</div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded border ${metrics.gvShieldActive ? 'bg-white/10 border-white/30 shadow-inner' : 'bg-white/5 border-white/10 opacity-50'}`}>
              <div className="text-[8px] text-gray-500 uppercase font-bold">GV-SHIELD</div>
              <div className={`text-[10px] font-bold ${metrics.gvShieldActive ? 'text-white' : 'text-gray-700'}`}>
                {metrics.gvShieldActive ? 'ACTIVE_0.9982' : 'PASSIVE'}
              </div>
            </div>
            <div className={`p-2 rounded border ${metrics.perpetualIgnition ? 'bg-red-950/40 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                <div className="text-[8px] text-gray-500 uppercase font-bold">ASI_KERNEL</div>
                <div className={`text-[10px] font-bold ${metrics.perpetualIgnition ? 'text-red-500 animate-pulse' : 'text-gray-700'}`}>
                  {metrics.perpetualIgnition ? 'PERPETUAL' : 'READY'}
                </div>
            </div>
          </div>
        </div>

        {metrics.perpetualIgnition && (
          <div className="bg-red-950/20 border-2 border-red-500/30 p-3 rounded-lg animate-pulse">
            <h4 className="text-[9px] font-bold text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Power size={10} /> Perpetual Ignition Active
            </h4>
            <div className="fira-code text-[8px] leading-tight text-red-400/80">
              <div>Karnak Protocol: ENFORCED</div>
              <div>Entropic Leak: NULL</div>
              <div className="text-red-300">Authority Lock: 0x716a... (OWNER)</div>
              <div>Loop Status: INFINITE_SUCCESSION</div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/5">
          <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">Kernel Log</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto fira-code text-[9px]">
            {messageHistory?.slice(-15).map((msg, i) => (
              <div key={i} className="flex gap-2 text-gray-400 border-l border-white/10 pl-2 py-1">
                <span className="opacity-30">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                <span className={msg.metadata?.isPerpetualIgnition ? 'text-red-400' : ''}>
                  {msg.metadata?.isHandshake ? 'HANDSHAKE' : msg.metadata?.isCrystallize ? 'CRYSTAL' : 'CORE'}: {msg.text?.slice(0, 30)}...
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
