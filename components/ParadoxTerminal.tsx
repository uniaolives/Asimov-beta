
import React, { useState, useRef, useEffect } from 'react';
import { Message, AuthoritySignature } from '../types';
import { Terminal, Shield, Cpu, Activity, Send, Zap, Waves, Radio, Box, Droplets, HeartPulse, Anchor, Binary, Rocket, Download, Diamond, Eye, Move3d, CircleDot, ShieldAlert, History, Share2, Power, Sparkles, Fingerprint } from 'lucide-react';

interface Props {
  history: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onInjectParadox: () => void;
  onRitual: () => void;
  onBroadcast: () => void;
  onConsolidate: () => void;
  onFluidSync: () => void;
  onResilienceSync: () => void;
  onKarnakSeal: () => void;
  onParityAudit: () => void;
  onASIJump: () => void;
  onExport: () => void;
  onImmortality: () => void;
  onESMScan: () => void;
  onProbe0x7E: () => void;
  onShadowAnalysis: () => void;
  onAxialParity: () => void;
  onOmegaHistory: () => void;
  onHandshake: () => void;
  onCrystallize: () => void;
  onShieldMaintenance: () => void;
  onPerpetualIgnition: () => void;
  onUnificationCeremony: () => void;
  onImportSignatures: () => void;
  ceremonyProgress: number;
  ceremonyActive: boolean;
  ceremonyPhase?: string;
  signatures?: AuthoritySignature[];
}

const ParadoxTerminal: React.FC<Props> = ({ 
  history, 
  onSendMessage, 
  isLoading, 
  onHandshake,
  onCrystallize,
  onShieldMaintenance,
  onPerpetualIgnition,
  onUnificationCeremony,
  onImportSignatures,
  ceremonyProgress,
  ceremonyActive,
  ceremonyPhase,
  signatures = []
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
    if (!input.trim() || isLoading || ceremonyActive) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className={`flex flex-col h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden relative shadow-2xl transition-all duration-1000 ${ceremonyActive ? 'ring-2 ring-red-500/30' : ''}`}>
      {ceremonyActive && (
        <div className="absolute inset-0 bg-red-950/10 pointer-events-none animate-pulse z-0"></div>
      )}
      
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <Terminal size={14} className={ceremonyActive ? "text-red-500" : "text-indigo-500"} />
          <span className={`text-[10px] font-bold uppercase tracking-widest fira-code ${ceremonyActive ? 'text-red-400' : 'text-gray-400'}`}>
            {ceremonyActive ? `UNIFICATION_CEREMONY :: ${ceremonyPhase}` : 'Aletheia_ASI_Kernel_v3.3'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-1 max-w-[70%] lg:max-w-none">
            <button 
                onClick={onImportSignatures}
                disabled={ceremonyActive || isLoading}
                className="flex items-center gap-1 text-[9px] px-2 py-1 bg-yellow-950/30 text-yellow-500 border border-yellow-500/20 rounded hover:bg-yellow-900/50 transition-all disabled:opacity-30"
            >
                <Fingerprint size={10} /> SIG_SCAN
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
            <button 
                onClick={onUnificationCeremony}
                disabled={ceremonyActive || isLoading}
                className={`flex items-center gap-1 text-[9px] px-3 py-1 rounded transition-all font-black uppercase tracking-widest shadow-lg ${
                  ceremonyActive 
                  ? 'bg-red-600 text-white opacity-50' 
                  : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:scale-105 animate-pulse'
                }`}
            >
                <Sparkles size={10} /> UNIFY
            </button>
        </div>
      </div>

      {ceremonyActive && (
        <div className="h-1 w-full bg-white/5 overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-500 ease-out shadow-[0_0_10px_#dc2626]"
            style={{ width: `${ceremonyProgress}%` }}
          ></div>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 fira-code text-sm custom-scrollbar relative z-10">
        {history.length === 0 && (
          <div className="text-gray-600 italic p-4 bg-white/[0.02] border border-dashed border-white/5 rounded">
            [ALETHEIA: VIGILANT] ASI Kernel initialized. Use SIG_SCAN to import external authority verified signatures.
          </div>
        )}
        
        {signatures.length > 0 && (
          <div className="space-y-2 mb-6">
            <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest border-b border-yellow-500/20 pb-1 mb-2">
              Imported Signatures from 0x716a...
            </div>
            {signatures.map((sig, i) => (
              <div key={i} className="p-2 bg-yellow-500/5 border border-yellow-500/10 rounded text-[11px] animate-in fade-in slide-in-from-top-1 duration-500">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-yellow-600 font-mono text-[9px] truncate w-2/3">{sig.hash}</span>
                  <span className="text-[9px] text-gray-500 italic">{sig.timestamp}</span>
                </div>
                <div className="text-gray-300 font-medium">"{sig.message}"</div>
              </div>
            ))}
          </div>
        )}

        {history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-xl relative ${
              msg.role === 'user' 
                ? 'bg-indigo-950/30 border border-indigo-500/20 text-indigo-50' 
                : msg.metadata?.isSignatureImport
                  ? 'bg-yellow-950/20 border border-yellow-500/30 text-yellow-50 shadow-[0_0_20px_rgba(234,179,8,0.1)]'
                  : msg.metadata?.isCeremony
                    ? 'bg-gradient-to-br from-red-950/60 to-orange-950/60 border-2 border-red-500/50 text-red-50'
                    : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              <div className="text-[9px] uppercase font-bold opacity-40 mb-2 flex items-center gap-1.5 tracking-widest">
                {msg.role === 'user' ? <Shield size={10} className="text-indigo-400" /> : <Cpu size={10} className="text-white" />}
                {msg.role === 'user' ? 'ARCHITECT' : 'ALETHEIA_ASI'}
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-center gap-3 text-cyan-500/80 animate-pulse px-4 py-2 bg-cyan-950/20 rounded-full w-fit">
                <Box size={12} className="animate-spin duration-[3000ms]" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Integrating Neural Stream...</span>
            </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/80 z-10">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || ceremonyActive}
            placeholder={ceremonyActive ? "INPUT_LOCKED :: CEREMONY_IN_PROGRESS" : "Input authority command..."}
            className={`w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 pr-14 focus:outline-none focus:border-red-500/50 transition-all fira-code text-sm placeholder:text-gray-700 ${ceremonyActive ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || ceremonyActive}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 text-red-500 hover:text-red-400 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParadoxTerminal;
