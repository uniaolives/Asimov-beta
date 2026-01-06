
import React, { useState, useRef, useEffect } from 'react';
import { Message, StormCell } from '../types';
import { 
  Terminal, 
  Cpu, 
  Send, 
  Fingerprint as TouchIcon, 
  ShieldCheck as CheckIcon, 
  Activity, 
  Globe, 
  Network,
  Scale,
  Zap,
  Lock,
  Binary
} from 'lucide-react';

interface Props {
  history: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onUnificationCeremony: () => void;
  onExtractGeometry: () => void;
  onI200Annealing: () => void;
  onStressTest: () => void;
  onLoadCrystal: () => void;
  onImportSignatures: () => void;
  onCheckIntegrity?: () => void;
  onPerformFirstTouch?: () => void;
  ceremonyProgress: number;
  ceremonyActive: boolean;
  isIntegrityChecked?: boolean;
  firstTouchActive?: boolean;
  firstTouchProgress?: number;
  axisMundiActive?: boolean;
  isFarolExecuting?: boolean;
  farolProgress?: number;
  globalImpedance?: number;
  // Added missing stormCells to Props interface
  stormCells?: StormCell[];
}

const ParadoxTerminal: React.FC<Props> = ({ 
  history, 
  onSendMessage, 
  isLoading, 
  onCheckIntegrity,
  onPerformFirstTouch,
  isIntegrityChecked = false,
  firstTouchActive = false,
  firstTouchProgress = 0,
  axisMundiActive = false,
  isFarolExecuting = false,
  farolProgress = 0,
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
    if (!input.trim() || isLoading || firstTouchActive) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className={`flex flex-col h-full bg-stone-900/50 border rounded-xl overflow-hidden relative transition-all duration-700 ${
      firstTouchActive ? 'border-emerald-500/50 ring-2 ring-emerald-500/20' : 'border-stone-800'
    }`}>
      <div className="flex items-center justify-between px-4 py-3 bg-stone-800/50 border-b border-stone-700/50 z-10">
        <div className="flex items-center gap-2">
          <Binary size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-stone-400">
            {firstTouchActive ? 'BETA_WAVE_IGNITION' : axisMundiActive ? 'SASC_v4.1 :: COORDINATION' : 'SASC_CMD_v4.1'}
          </span>
        </div>
        <div className="flex items-center gap-2">
            {!isIntegrityChecked && onCheckIntegrity && (
              <button 
                  onClick={onCheckIntegrity}
                  className="flex items-center gap-1.5 text-[9px] px-3 py-1.5 bg-stone-800 text-stone-300 border border-stone-700 font-bold rounded hover:bg-stone-700 transition-all"
              >
                  <Lock size={10} /> GENERATE_I5_PROOFS
              </button>
            )}

            {isIntegrityChecked && onPerformFirstTouch && !axisMundiActive && (
              <button 
                  onClick={onPerformFirstTouch}
                  disabled={isLoading || firstTouchActive}
                  className="flex items-center gap-1.5 text-[9px] px-3 py-1.5 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/30"
              >
                  <Zap size={10} /> IGNITE_BETA_WAVE
              </button>
            )}
        </div>
      </div>

      {(firstTouchActive || isFarolExecuting) && (
        <div className="h-1 w-full bg-stone-800 overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: firstTouchActive ? `${firstTouchProgress}%` : `${(farolProgress! / 72) * 100}%` }}
          ></div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-[13px] custom-scrollbar relative z-10">
        {isIntegrityChecked && !axisMundiActive && !firstTouchActive && (
          <div className="mb-6 p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-lg animate-in fade-in duration-700">
             <div className="flex items-center gap-3 mb-3">
                <CheckIcon className="text-emerald-400" size={18} />
                <h4 className="text-[11px] font-bold uppercase text-emerald-400 tracking-tight">SASC v4.1 Invariant Audit: [I1-I5_CLEARED]</h4>
             </div>
             <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-stone-900/50 rounded border border-stone-800">
                   <span className="text-stone-500 block mb-1 uppercase tracking-tighter">I2: Autonomy Hash</span>
                   <span className="text-emerald-400 font-bold">Blake3 Verifier: 100% Match</span>
                </div>
                <div className="p-2 bg-stone-900/50 rounded border border-stone-800">
                   <span className="text-stone-500 block mb-1 uppercase tracking-tighter">I3: TMR Consensus</span>
                   <span className="text-emerald-400 font-bold">Modular Agreement: 3/3</span>
                </div>
             </div>
          </div>
        )}

        {firstTouchActive && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
             <div className="relative">
                <Network size={64} className="text-emerald-500 animate-pulse" />
                <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
             </div>
             <div className="text-center space-y-2">
                <h3 className="text-lg font-bold text-emerald-400 uppercase">Coordinating Mesh...</h3>
                <p className="text-[10px] text-stone-500 uppercase tracking-widest">SASC v4.1: Real-time Autonomy Verification Active</p>
             </div>
          </div>
        )}

        {history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-lg relative ${
              msg.role === 'user' 
                ? 'bg-stone-800/30 border border-stone-700 text-stone-100' 
                : msg.metadata?.isIntegrityCheck
                  ? 'bg-stone-950 border border-emerald-500/30 text-emerald-50'
                  : msg.metadata?.isFirstTouch
                    ? 'bg-emerald-950/20 border-l-4 border-emerald-500 text-emerald-50'
                    : 'bg-stone-900/80 border border-stone-800 text-stone-300'
            }`}>
              <div className="text-[9px] uppercase font-bold text-stone-500 mb-2 flex items-center gap-1.5">
                {msg.role === 'user' ? <Scale size={10} /> : <Cpu size={10} />}
                {msg.role === 'user' ? 'OPERATOR' : 'SASC_CORE_v4.1'}
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed text-[13px]">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-stone-800 bg-stone-900/80 z-10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || firstTouchActive}
            placeholder={firstTouchActive ? "IGNITION_IN_PROGRESS" : "Enter engineering directive..."}
            className={`w-full bg-stone-950 border border-stone-800 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-emerald-500/50 transition-all font-mono text-sm placeholder:text-stone-700 ${
              firstTouchActive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || firstTouchActive}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-400 disabled:text-stone-800 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParadoxTerminal;
