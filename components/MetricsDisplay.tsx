
import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, ZAxis } from 'recharts';
import { MetricState, Message, StormCell } from '../types';
import { ShieldCheck, Activity, Hexagon, Anchor, Diamond, Binary, Zap, Rocket, Globe, Eye, ZapOff, Move3d, AlertTriangle, CircleDot, Ghost, ShieldAlert, Waves, History, Share2, Power, Droplets, Thermometer, Wind, Sparkles, Heart, CloudLightning, ShieldX } from 'lucide-react';

interface Props {
  metrics: MetricState;
  metricHistory: MetricState[];
  messageHistory: Message[];
}

const MetricsDisplay: React.FC<Props> = ({ metrics, metricHistory, messageHistory }) => {
  const [pulseTime, setPulseTime] = useState(0);

  useEffect(() => {
    if (metrics.axisMundiActive) {
      const interval = setInterval(() => {
        setPulseTime(t => t + 0.1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [metrics.axisMundiActive]);

  const radarData = [
    { subject: 'Synaptic_Lock', A: (metrics.synapticLatticeRigidity || 0) * 100, full: 100 },
    { subject: 'Shield_Global', A: metrics.gvShieldActive ? 100 : 20, full: 100 },
    { subject: 'Viability', A: (metrics.viability || 0) * 100, full: 100 },
    { subject: 'Refraction', A: metrics.refractionActive ? 100 : 10, full: 100 },
    { subject: 'Supercond', A: metrics.superconductive ? 100 : 0, full: 100 },
  ];

  // Schumann Wave Simulation (7.83Hz)
  const generateWaveData = () => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      const t = pulseTime + (i * 0.1);
      data.push({
        time: i,
        earth: Math.sin(t * 7.83) * 50 + 50,
        sky: metrics.axisMundiActive ? (Math.sin(t * 7.83 * 1.02) > 0.8 ? 80 : 20) : 0
      });
    }
    return data;
  };

  const waveData = generateWaveData();

  const isDVAStable = metrics.temperature === 34 && metrics.pressure === 120;
  const energySavings = metrics.totalEnergyStored ? (1 - (metrics.totalEnergyStored / 18.5)) * 100 : 0;

  return (
    <div className="flex flex-col h-full border-l border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden">
      <div className={`p-4 border-b transition-all duration-1000 ${
        metrics.axisMundiActive ? 'bg-emerald-950/20 border-emerald-500/30' :
        metrics.crystalLoaded ? 'bg-indigo-950/20 border-indigo-500/30' : 
        'border-white/10 bg-gradient-to-r from-transparent to-red-950/20'
      }`}>
        <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-2 ${
          metrics.axisMundiActive ? 'text-emerald-400' :
          metrics.crystalLoaded ? 'text-indigo-400' : 'text-red-400'
        }`}>
          {metrics.axisMundiActive ? <Globe size={12} className="animate-spin-slow" /> : metrics.crystalLoaded ? <Sparkles size={12} className="animate-pulse" /> : <Power size={12} />} 
          {metrics.axisMundiActive ? 'Axis Mundi :: Convergence' : metrics.crystalLoaded ? 'Superconductive State' : 'ASI Structural Integrity'}
        </h3>
        <p className="text-[9px] text-gray-500 fira-code italic">
          {metrics.axisMundiActive ? 'Resonance: 7.83Hz :: Federation: 128 Nodes' : metrics.crystalLoaded ? 'Mode: Illuminated :: 0x7F Sync' : 'I204 & I200 Co-Processor Active'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {/* Noosphere Radar (Visible when Axis Mundi Active) */}
        {metrics.axisMundiActive && (
          <div className="bg-black/40 border border-emerald-500/20 rounded-lg p-3 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none"></div>
             <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                <span className="flex items-center gap-2"><Activity size={10} /> Noosphere Radar</span>
                <span className="animate-pulse">Live_Scan</span>
             </h4>
             <div className="h-44 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <div className="w-full h-[1px] bg-emerald-500"></div>
                   <div className="h-full w-[1px] bg-emerald-500 absolute"></div>
                   <div className="w-32 h-32 border border-emerald-500 rounded-full"></div>
                   <div className="w-20 h-20 border border-emerald-500 rounded-full"></div>
                </div>
                
                <ResponsiveContainer width="100%" height="100%">
                   <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <ZAxis type="number" dataKey="z" range={[50, 400]} />
                      <Scatter 
                        name="Storms" 
                        data={metrics.stormCells.map(s => ({ x: s.x, y: s.y, z: s.intensity * 100, type: s.type }))} 
                        fill="#f59e0b"
                        shape={(props: any) => {
                           const { cx, cy, payload } = props;
                           const color = payload.type === 'VOID' ? '#ef4444' : payload.type === 'ENTROPY' ? '#f59e0b' : '#3b82f6';
                           return (
                             <g>
                               <circle cx={cx} cy={cy} r={props.z / 15} fill={color} opacity={0.6} />
                               <circle cx={cx} cy={cy} r={props.z / 30} fill={color} className="animate-ping" />
                             </g>
                           );
                        }}
                      />
                   </ScatterChart>
                </ResponsiveContainer>

                <div className="absolute bottom-2 right-2 text-[8px] fira-code text-gray-500 flex flex-col items-end">
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Dissonance</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> Entropy</div>
                   <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Void</div>
                </div>
             </div>
          </div>
        )}

        {/* State Radar */}
        <div className="h-40 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#222" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 8 }} />
              <Radar
                name="ASI_State"
                dataKey="A"
                stroke={metrics.axisMundiActive ? "#34d399" : metrics.crystalLoaded ? "#818cf8" : metrics.perpetualIgnition ? "#ef4444" : "#10b981"}
                fill={metrics.axisMundiActive ? "#34d399" : metrics.crystalLoaded ? "#818cf8" : metrics.perpetualIgnition ? "#ef4444" : "#10b981"}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Pulse of the World (Axis Mundi) */}
        {metrics.axisMundiActive && (
          <div className="bg-emerald-950/10 border border-emerald-500/20 p-3 rounded-lg animate-in slide-in-from-right duration-700">
            <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Waves size={10} /> Pulse of the World (Axis Mundi)
            </h4>
            <div className="h-24 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waveData}>
                  <Line type="monotone" dataKey="earth" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="step" dataKey="sky" stroke="#60a5fa" strokeWidth={1} dot={false} opacity={0.5} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-between items-center text-[8px] fira-code text-emerald-500/70">
              <span>EARTH_RESONANCE: 7.83Hz</span>
              <span>SKY_NODES: 128 ACTIVE</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Weather Status */}
          {metrics.axisMundiActive && (
             <div className="bg-amber-950/10 border border-amber-500/20 p-3 rounded-lg">
                <h4 className="text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Wind size={10} /> Noosphere Weather
                </h4>
                <div className="space-y-2">
                   <div className="flex justify-between items-center">
                      <span className="text-[8px] text-gray-500 uppercase">Semantic Impedance</span>
                      <span className={`text-[10px] font-bold ${metrics.globalImpedance > 0.7 ? 'text-red-500' : 'text-emerald-500'}`}>
                         {(metrics.globalImpedance * 100).toFixed(1)}%
                      </span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${metrics.globalImpedance > 0.7 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                        style={{ width: `${metrics.globalImpedance * 100}%` }}
                      ></div>
                   </div>
                   <div className="flex justify-between items-center text-[8px] text-gray-600">
                      <span>Control_Mode: {metrics.weatherProtocol || 'IDLE'}</span>
                      <span>Active_Storms: {metrics.stormCells.length}</span>
                   </div>
                </div>
             </div>
          )}

          {/* Superconductive Metrics */}
          {metrics.crystalLoaded && !metrics.axisMundiActive && (
            <div className="bg-indigo-950/10 border border-indigo-500/20 p-3 rounded-lg animate-in fade-in duration-1000">
              <h4 className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap size={10} /> Superconductive Telemetry
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <div className="text-[8px] text-gray-500 font-bold uppercase">Energy_Drop</div>
                  <div className="text-sm font-black fira-code text-indigo-400">-{energySavings.toFixed(1)}%</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[8px] text-gray-500 font-bold uppercase">Lat_Internal</div>
                  <div className="text-sm font-black fira-code text-emerald-400">0.00ms</div>
                </div>
              </div>
            </div>
          )}

          {/* DVA Telemetry */}
          <div className={`p-3 rounded-lg border transition-all ${isDVAStable ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-red-950/10 border-red-500/30'}`}>
             <h4 className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Activity size={10} /> DVA Telemetry (I3)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <div className="text-[8px] text-gray-500 font-bold uppercase">Core_Temp</div>
                <div className={`text-sm font-black fira-code ${metrics.temperature === 34 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metrics.temperature}°C
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[8px] text-gray-500 font-bold uppercase">Fluid_Pres</div>
                <div className={`text-sm font-black fira-code ${metrics.pressure === 120 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {metrics.pressure} <span className="text-[8px] opacity-50">mmHg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">Invariant Logs</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto fira-code text-[9px]">
            {messageHistory?.slice(-15).map((msg, i) => (
              <div key={i} className="flex gap-2 text-gray-400 border-l border-white/10 pl-2 py-1">
                <span className="opacity-30">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                <span className={msg.metadata?.isWeatherControl ? 'text-amber-400' : msg.metadata?.isAxisMundi ? 'text-emerald-400' : msg.metadata?.isCrystalLoad ? 'text-indigo-400' : msg.metadata?.isI200Annealing ? 'text-emerald-400' : ''}>
                  {msg.metadata?.isWeatherControl ? 'WX' : msg.metadata?.isAxisMundi ? 'AXIS' : msg.metadata?.isCrystalLoad ? 'ILLUM' : msg.metadata?.isI200Annealing ? 'I200' : 'LOG'}: {msg.text?.slice(0, 30)}...
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
