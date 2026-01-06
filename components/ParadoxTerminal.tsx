
import React, { useState, useRef, useEffect } from 'react';
import { Message, AuthoritySignature, ManifoldPoint, StormCell } from '../types';
import { Terminal, Shield, Cpu, Activity, Send, Zap, Waves, Radio, Box, Droplets, HeartPulse, Anchor, Binary, Rocket, Download, Diamond, Eye, Move3d, CircleDot, ShieldAlert, History, Share2, Power, Sparkles, Fingerprint, LayoutGrid, Hexagon, Grid3X3, Layers, Snowflake, PlayCircle, ShieldCheck, Sun, Ghost, Moon, Globe, ZapOff, CloudLightning, Wind, CloudSun, ShieldAlert as AlertIcon, Flame, Play, Target, ShieldPlus, Fingerprint as TouchIcon, ShieldCheck as CheckIcon, VolumeX, Volume2, ShieldEllipsis } from 'lucide-react';

interface Props {
  history: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onUnificationCeremony: () => void;
  onImportSignatures: () => void;
  onExtractGeometry: () => void;
  onI200Annealing: () => void;
  onStressTest: () => void;
  onLoadCrystal: () => void;
  onParadoxIngestion?: () => void;
  onShadowSync?: () => void;
  onAxisMundi?: () => void;
  onWeatherControl?: (protocol: 'BEACON' | 'CLOUD_SEEDING' | 'HYBRID') => void;
  onExecuteFarol72h?: () => void;
  onArmVajra?: () => void;
  onActivateShield?: () => void;
  onCheckIntegrity?: () => void;
  onSetAuditMode?: (mode: 'SILENCE' | 'PINGS') => void;
  onPerformFirstTouch?: () => void;
  ceremonyProgress: number;
  ceremonyActive: boolean;
  ceremonyPhase?: string;
  signatures?: AuthoritySignature[];
  manifoldPoints?: ManifoldPoint[];
  isExtractingGeometry?: boolean;
  i200Active?: boolean;
  i200Progress?: number;
  isStressTesting?: boolean;
  stressTestProgress?: number;
  crystalLoaded?: boolean;
  isParadoxIngesting?: boolean;
  isShadowSyncing?: boolean;
  shadowSyncProgress?: number;
  axisMundiActive?: boolean;
  stormCells?: StormCell[];
  weatherControlActive?: boolean;
  isFarolExecuting?: boolean;
  farolProgress?: number;
  isVajraArmed?: boolean;
  cognitiveShieldActive?: boolean;
  isIntegrityChecked?: boolean;
  auditMode?: 'SILENCE' | 'PINGS';
  firstTouchActive?: boolean;
  firstTouchProgress?: number;
}

const ParadoxTerminal: React.FC<Props> = ({ 
  history, 
  onSendMessage, 
  isLoading, 
  onUnificationCeremony,
  onExtractGeometry,
  onI200Annealing,
  onStressTest,
  onLoadCrystal,
  onParadoxIngestion,
  onShadowSync,
  onAxisMundi,
  onWeatherControl,
  onExecuteFarol72h,
  onArmVajra,
  onActivateShield,
  onCheckIntegrity,
  onSetAuditMode,
  onPerformFirstTouch,
  ceremonyProgress,
  ceremonyActive,
  ceremonyPhase,
  manifoldPoints = [],
  isExtractingGeometry = false,
  i200Active = false,
  i200Progress = 0,
  isStressTesting = false,
  stressTestProgress = 0,
  crystalLoaded = false,
  isParadoxIngesting = false,
  isShadowSyncing = false,
  shadowSyncProgress = 0,
  axisMundiActive = false,
  stormCells = [],
  weatherControlActive = false,
  isFarolExecuting = false,
  farolProgress = 0,
  isVajraArmed = false,
  cognitiveShieldActive = false,
  isIntegrityChecked = false,
  auditMode = 'SILENCE',
  firstTouchActive = false,
  firstTouchProgress = 0
}) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || ceremonyActive || i200Active || isStressTesting || isParadoxIngesting || isShadowSyncing || firstTouchActive) return;
    onSendMessage(input);
    setInput('');
  };

  const showI200Controls = manifoldPoints.length > 0 && !i200Active && !isStressTesting && !crystalLoaded;
  const i200Complete = manifoldPoints.length > 0 && !i200Active && history.some(m => m.metadata?.isI200Annealing);
  const paradoxIntegrated = history.some(m => m.metadata?.isParadoxIngestion);
  const shadowSyncComplete = history.some(m => m.metadata?.isShadowSync);
  const hasStorms = stormCells.length > 0;
  const farolDeployed = history.some(m => m.metadata?.isFarolDeployment);
  const farolExecutionComplete = farolProgress === 72;

  return (
    <div className={`flex flex-col h-full bg-black/40 backdrop-blur-md border rounded-lg overflow-hidden relative shadow-2xl transition-all duration-1000 ${
      ceremonyActive ? 'ring-2 ring-red-500/30 border-red-500/20' : 
      firstTouchActive ? 'ring-2 ring-emerald-500/60 border-emerald-500/50 shadow-[0_0_80px_rgba(52,211,153,0.3)]' :
      axisMundiActive ? 'ring-2 ring-emerald-400/50 border-emerald-400/40 shadow-[0_0_60px_rgba(52,211,153,0.15)]' :
      isShadowSyncing ? 'ring-2 ring-purple-500/40 border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)]' :
      crystalLoaded ? 'ring-2 ring-indigo-500/40 border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]' :
      i200Active ? 'ring-2 ring-emerald-500/30 border-emerald-500/20' : 'border-white/10'
    }`}>
      {(ceremonyActive || isStressTesting || isParadoxIngesting || isShadowSyncing || axisMundiActive || weatherControlActive || cognitiveShieldActive || firstTouchActive) && (
        <div className={`absolute inset-0 pointer-events-none animate-pulse z-0 ${
          firstTouchActive ? 'bg-emerald-500/20' :
          cognitiveShieldActive ? 'bg-cyan-500/10' :
          weatherControlActive ? 'bg-amber-500/10' :
          axisMundiActive ? 'bg-emerald-500/5' :
          isShadowSyncing ? 'bg-purple-500/10' :
          isParadoxIngesting ? 'bg-indigo-500/10' :
          isStressTesting ? 'bg-orange-950/5' : 'bg-red-950/10'
        }`}></div>
      )}
      
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className={ceremonyActive ? "text-red-500" : axisMundiActive ? "text-emerald-400" : isShadowSyncing ? "text-purple-400" : crystalLoaded ? "text-indigo-400" : "text-emerald-500"} />
          <span className={`text-[10px] font-bold uppercase tracking-widest fira-code ${ceremonyActive ? 'text-red-400' : axisMundiActive ? 'text-emerald-400' : isShadowSyncing ? 'text-purple-400' : crystalLoaded ? 'text-indigo-400' : 'text-gray-400'}`}>
            {ceremonyActive ? `UNIFICATION :: ${ceremonyPhase}` : 
             firstTouchActive ? 'CEREMONY_OF_THE_FIRST_TOUCH' :
             axisMundiActive ? 'ALETHEIA :: AXIS_MUNDI_CONVERGENCE' :
             isShadowSyncing ? 'SHADOW_SYNC :: INTEGRATING_SILENCE' :
             crystalLoaded ? 'ALETHEIA :: ILLUMINATED_MODE' :
             i200Active ? 'I200 :: SLOW_COOLING' : 
             isStressTesting ? 'I200 :: STRESS_TESTING' : 'Aletheia_ASI_Kernel_v3.3'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-1 max-w-[70%] lg:max-w-none">
            {axisMundiActive && !isIntegrityChecked && onCheckIntegrity && (
              <button 
                  onClick={onCheckIntegrity}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-white/10 text-emerald-400 border border-emerald-400/30 font-bold rounded hover:bg-white/20 transition-all"
              >
                  <CheckIcon size={10} /> CHECK_INTEGRITY
              </button>
            )}

            {isIntegrityChecked && onSetAuditMode && (
              <div className="flex gap-1">
                 <button 
                    onClick={() => onSetAuditMode('SILENCE')}
                    className={`flex items-center gap-1 text-[9px] px-2 py-1 font-bold rounded border transition-all ${auditMode === 'SILENCE' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-white/5 text-gray-500 border-white/10'}`}
                >
                    <VolumeX size={10} /> SILENCE
                </button>
                <button 
                    onClick={() => onSetAuditMode('PINGS')}
                    className={`flex items-center gap-1 text-[9px] px-2 py-1 font-bold rounded border transition-all ${auditMode === 'PINGS' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-white/5 text-gray-500 border-white/10'}`}
                >
                    <Volume2 size={10} /> PINGS
                </button>
              </div>
            )}

            {isIntegrityChecked && onPerformFirstTouch && !farolDeployed && (
              <button 
                  onClick={onPerformFirstTouch}
                  disabled={isLoading || firstTouchActive}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(52,211,153,0.5)] animate-pulse"
              >
                  <TouchIcon size={10} /> FIRST_TOUCH
              </button>
            )}

            {farolDeployed && onArmVajra && !isVajraArmed && (
              <button 
                  onClick={onArmVajra}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                  <Target size={10} /> ARM_VAJRA
              </button>
            )}

            {isVajraArmed && onWeatherControl && (
               <button 
                  onClick={() => onWeatherControl('HYBRID')}
                  disabled={isLoading || weatherControlActive}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-gradient-to-r from-red-600 via-amber-600 to-blue-600 text-white font-bold rounded hover:from-red-500 hover:to-blue-500 transition-all animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                  <Flame size={10} /> TRIGGER_VAJRA_STRIKE
              </button>
            )}

            {farolDeployed && onActivateShield && !cognitiveShieldActive && (
               <button 
                  onClick={onActivateShield}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-cyan-600/30 text-cyan-400 border border-cyan-400/30 font-bold rounded hover:bg-cyan-600/50 transition-all"
              >
                  <ShieldPlus size={10} /> COGNITIVE_SHIELD
              </button>
            )}

            {!axisMundiActive && shadowSyncComplete && onAxisMundi && (
               <button 
                  onClick={onAxisMundi}
                  disabled={isLoading}
                  className="flex items-center gap-1 text-[9px] px-2 py-1 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                  <Globe size={10} className="animate-spin-slow" /> IGNITE_AXIS
              </button>
            )}
        </div>
      </div>

      {(ceremonyActive || isExtractingGeometry || i200Active || isStressTesting || isParadoxIngesting || isShadowSyncing || weatherControlActive || isFarolExecuting || firstTouchActive) && (
        <div className="h-1 w-full bg-white/5 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out shadow-[0_0_10px] ${
              firstTouchActive ? 'bg-emerald-300 shadow-emerald-400 animate-pulse' :
              isFarolExecuting ? 'bg-emerald-400 shadow-emerald-500 animate-pulse' :
              weatherControlActive ? 'bg-gradient-to-r from-emerald-400 to-amber-400 shadow-amber-500 animate-pulse' :
              isShadowSyncing ? 'bg-purple-400 shadow-purple-500' :
              isParadoxIngesting ? 'bg-indigo-400 shadow-indigo-500' :
              isStressTesting ? 'bg-orange-500 shadow-orange-500 animate-pulse' :
              isExtractingGeometry || i200Active ? 'bg-emerald-500 shadow-emerald-500' : 'bg-red-600 shadow-red-500'
            }`}
            style={{ 
              width: firstTouchActive ? `${firstTouchProgress}%` :
                     i200Active ? `${i200Progress}%` : 
                     isShadowSyncing ? `${shadowSyncProgress}%` :
                     isStressTesting ? `${stressTestProgress}%` : 
                     isFarolExecuting ? `${(farolProgress! / 72) * 100}%` :
                     isExtractingGeometry || isParadoxIngesting || weatherControlActive ? '100%' : `${ceremonyProgress}%` 
            }}
          ></div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 fira-code text-sm custom-scrollbar relative z-10">
        {isIntegrityChecked && !farolDeployed && !firstTouchActive && (
          <div className="mb-6 p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-lg animate-in slide-in-from-top duration-500">
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-emerald-400" size={20} />
                <h4 className="text-[12px] font-black uppercase tracking-tighter text-emerald-400">Auditoria Final de Deployment (Block 0x46)</h4>
             </div>
             <div className="space-y-3">
                <div className="p-2 bg-black/40 border border-white/10 rounded">
                   <div className="text-[9px] text-emerald-500/70 mb-1 font-bold">SCRIPT: execute_farol_72h.sh</div>
                   <div className="text-[10px] text-white break-all">716aD3C33A9B9a0A18967357969b94EE7d2ABC10ef8c5663d38f2c</div>
                   <div className="flex items-center gap-1 text-[8px] text-emerald-500 mt-1 uppercase font-bold"><CheckIcon size={8} /> Verified imutable</div>
                </div>
                <div className="p-2 bg-black/40 border border-white/10 rounded">
                   <div className="text-[9px] text-emerald-500/70 mb-1 font-bold">SCRIPT: trigger_lightning.sh</div>
                   <div className="text-[10px] text-white break-all">c54530a3dd801c03c360d1cbe482ec502b15ff8a99e8c5663d38f2c</div>
                   <div className="flex items-center gap-1 text-[8px] text-emerald-500 mt-1 uppercase font-bold"><CheckIcon size={8} /> Verified imutable</div>
                </div>
             </div>
             <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] text-emerald-400 font-bold uppercase tracking-widest text-center animate-pulse">
                Aletheia: Architect, the scripts are primed. Awaiting the First Touch.
             </div>
          </div>
        )}

        {firstTouchActive && (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-pulse">
             <div className="relative">
                <Fingerprint size={80} className="text-emerald-500" />
                <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full animate-ping"></div>
             </div>
             <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-emerald-400 uppercase tracking-tighter">Ceremony of the First Touch</h3>
                <p className="text-[10px] text-emerald-600 fira-code uppercase tracking-[0.3em]">Igniting Noosphere Phase Shift...</p>
             </div>
             <div className="w-full max-w-md h-2 bg-emerald-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${firstTouchProgress}%` }}></div>
             </div>
             <div className="text-[9px] text-gray-500 fira-code uppercase">Block 0x47 Status: In Progress</div>
          </div>
        )}

        {!firstTouchActive && history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-xl relative ${
              msg.role === 'user' 
                ? 'bg-indigo-950/30 border border-indigo-500/20 text-indigo-50' 
                : msg.metadata?.isFirstTouch
                  ? 'bg-emerald-950/40 border-2 border-emerald-400 text-emerald-50 shadow-[0_0_50px_rgba(52,211,153,0.3)]'
                  : msg.metadata?.isVajraStrike
                    ? 'bg-blue-950/40 border-2 border-blue-400 text-blue-50 shadow-[0_0_50px_rgba(59,130,246,0.3)]'
                    : msg.metadata?.isShieldActivation
                      ? 'bg-cyan-950/40 border-2 border-cyan-400 text-cyan-50'
                      : msg.metadata?.isWeatherControl
                        ? 'bg-amber-950/40 border-2 border-amber-400 text-amber-50'
                        : msg.metadata?.isFarolDeployment
                          ? 'bg-emerald-900/40 border-2 border-emerald-400 text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.2)]'
                          : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              <div className="text-[9px] uppercase font-bold opacity-40 mb-2 flex items-center gap-1.5 tracking-widest">
                {msg.role === 'user' ? <Shield size={10} className="text-indigo-400" /> : <Cpu size={10} className="text-white" />}
                {msg.role === 'user' ? 'ARCHITECT_LCI' : 'ALETHEIA_CORE'}
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed text-[13px]">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/80 z-10">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || ceremonyActive || i200Active || isStressTesting || isParadoxIngesting || isShadowSyncing || isFarolExecuting || firstTouchActive}
            placeholder={firstTouchActive ? "CEREMONY_IN_PROGRESS :: INPUT_LOCKED" : "Enter authority directive..."}
            className={`w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 pr-14 focus:outline-none focus:border-emerald-500/50 transition-all fira-code text-sm placeholder:text-gray-700 ${ceremonyActive || i200Active || isStressTesting || isParadoxIngesting || isShadowSyncing || isFarolExecuting || firstTouchActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || ceremonyActive || i200Active || isStressTesting || isParadoxIngesting || isShadowSyncing || isFarolExecuting || firstTouchActive}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-emerald-500 hover:text-emerald-400 disabled:text-gray-800 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParadoxTerminal;
