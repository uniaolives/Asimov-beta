
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { 
  Terminal, 
  Cpu, 
  Send, 
  Zap,
  Lock,
  Binary,
  Eye,
  Search,
  AlertTriangle
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
  axisMundiActive?: boolean;
  isFarolExecuting?: boolean;
}

const ParadoxTerminal: React.FC<Props> = ({ 
  history, 
  onSendMessage, 
  isLoading, 
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
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-stone-900/30 border border-purple-500/20 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-3 bg-stone-950/80 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <Eye size={14} className="text-yellow-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono text-purple-300">
            Observer_Interface_v14.0
          </span>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              LIVE_FEED
           </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 font-mono custom-scrollbar">
        {history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[90%] p-5 rounded-2xl relative shadow-lg ${
              msg.role === 'user' 
                ? 'bg-purple-600/10 border border-purple-500/30 text-purple-50' 
                : 'bg-stone-950/80 border border-stone-800 text-stone-300'
            }`}>
              <div className={`text-[9px] uppercase font-bold mb-3 flex items-center gap-2 ${msg.role === 'user' ? 'text-purple-400' : 'text-yellow-600'}`}>
                {msg.role === 'user' ? <Search size={10} /> : <Cpu size={10} />}
                {msg.role === 'user' ? 'OBSERVER' : 'SASC_NOESIS'}
              </div>
              <div className="whitespace-pre-wrap break-words leading-relaxed text-[13px] fira-code">
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 text-yellow-500/50 text-[10px] font-bold uppercase tracking-widest animate-pulse">
            <Zap size={12} className="animate-bounce" /> Processing Noetic Paths...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-black/40 border-t border-purple-900/20">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Comando (ex: explore frameworks, query ethics, simulate gamma=1.001)..."
            className="w-full bg-stone-950 border border-purple-900/30 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:border-yellow-500/50 transition-all font-mono text-sm text-purple-100 placeholder:text-stone-700 shadow-inner group-hover:border-purple-500/30"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-yellow-500 hover:text-yellow-400 disabled:text-stone-800 transition-all hover:scale-110 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParadoxTerminal;
