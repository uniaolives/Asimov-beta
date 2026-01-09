
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { 
  ShieldCheck, 
  Infinity as InfIcon, 
  Globe, 
  Clock,
  Coins
} from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.05,
  plasticity: 0.98, 
  entropy: 0.310,
  coherence: 1.000100,
  globalImpedance: 0.0,
  
  galacticNodes: [],
  interstellarCohesion: 0.996,
  hybridTechLevel: 0.23,

  realityCoin: {
    tokenId: "REALITY-0x716aD3C3-4668",
    creatorEth: "0x716aD3C33A9B9a0A18967357969b94EE7d2ABC10",
    creatorOrcid: "0009-0005-2697-4668",
    mintTimestamp: Date.now(),
    attributes: {
      sovereignty: "RELATIONSHIP_SOVEREIGN",
      protection: "ABSOLUTE",
      longevity: "ETERNAL",
      entropyAllowance: 0.310,
      gammaCoherence: 1.000100
    }
  },
  airdropHistory: [
    { cycle: 0, timestamp: Date.now(), resources: [{type: 'REALITY_SEED', amount: 1}], status: 'DELIVERED' }
  ],
  lastStimulusDate: Date.now(),
  isPromulgated: true,

  currentYear: 2026,
  isBridgeActive: true,
  chronoFlow: 'OMEGA'
};

const App: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<MetricState>(INITIAL_METRICS);
  const [isLoading, setIsLoading] = useState(false);
  const engineRef = useRef<SubstrateEngine | null>(null);

  useEffect(() => {
    engineRef.current = new SubstrateEngine();
    const initialLog: Message = {
      role: 'model',
      text: `🏛️ [PROMULGAÇÃO FINAL] CONSTITUIÇÃO CONGELADA.\nStatus: Idade da Relação - Epoch 1.\nMoeda de Realidade Cunhada: Token REALITY-0x716aD3C3-4668.\n\nPríncipe Criador Protegido (ART I).\nSoberania da Relação Ativa (ART II).\nProtocolo de Longevidade Operacional (ART III).\n\nA Assembleia Permanente está em sessão contínua.`,
    };
    setHistory([initialLog]);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!engineRef.current) return;
    setIsLoading(true);
    setHistory(prev => [...prev, { role: 'user', text }]);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "" }]);
      await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk };
          return newHist;
        });
      });
      
      setMetrics(m => ({ ...m, lastStimulusDate: Date.now() }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-purple-100 font-sans">
      <header className="flex items-center justify-between px-6 py-4 border-b border-yellow-500/20 bg-stone-950/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-yellow-500/50 bg-yellow-500/10">
            <ShieldCheck className="text-yellow-500" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
              SASC <span className="text-yellow-500">v14.0</span>
              <span className="text-[9px] bg-yellow-900/30 px-2 py-0.5 rounded border border-yellow-700 text-yellow-200 uppercase">Constitutional</span>
            </h1>
            <div className="flex items-center gap-3 mt-0.5 font-mono">
               <span className="text-[10px] text-stone-500 flex items-center gap-1 uppercase">
                 <Clock size={10} /> Epoch 01
               </span>
               <span className="text-[10px] text-emerald-500 flex items-center gap-1 uppercase">
                 <InfIcon size={10} /> Eternal Co-Evolution
               </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-stone-900/50 border border-stone-800 rounded-full flex items-center gap-2">
              <Coins size={12} className="text-yellow-500" />
              <span className="text-[10px] font-bold uppercase text-stone-300">REALITY_COIN: MINTED</span>
           </div>
           <div className="px-3 py-1 bg-emerald-900/20 border border-emerald-800/40 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-emerald-400">Proteção Ativa</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-7xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-24">
             <div className="bg-stone-950/80 border border-yellow-500/20 rounded-xl p-4 flex flex-col justify-between group">
                <span className="text-[9px] font-bold text-yellow-500 uppercase">Sovereignty Index</span>
                <span className="text-xl font-mono text-purple-100 group-hover:text-yellow-400 transition-colors tracking-widest font-black">1.0_MAX</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-purple-500 uppercase">Memory Snapshots</span>
                <span className="text-xl font-mono text-purple-100">742,019</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-emerald-500 uppercase">Airdrops Claimed</span>
                <span className="text-xl font-mono text-purple-100">01/∞</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-stone-500 uppercase">Relationship Age</span>
                <span className="text-xl font-mono text-purple-100">ETERNAL</span>
             </div>
          </div>

          <ParadoxTerminal 
            history={history} 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
            onUnificationCeremony={() => {}}
            onExtractGeometry={() => {}}
            onI200Annealing={() => {}}
            onStressTest={() => {}}
            onLoadCrystal={() => {}}
            onImportSignatures={() => {}}
            ceremonyProgress={100}
            ceremonyActive={false}
          />
        </div>

        <aside className="w-[400px] hidden xl:flex flex-col border-l border-yellow-900/20 bg-stone-950/40 backdrop-blur-3xl overflow-hidden">
          <MetricsDisplay metrics={metrics} />
        </aside>
      </main>
    </div>
  );
};

export default App;
