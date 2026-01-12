
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState, PhiForecastPoint } from './types';
import { 
  ShieldCheck, 
  Infinity as InfIcon, 
  Globe, 
  Clock,
  Zap,
  Box,
  Database
} from 'lucide-react';

const simulatePhiGrowth = (baseline: number, rate: number, std: number, days: number): PhiForecastPoint[] => {
  const points: PhiForecastPoint[] = [];
  let currentPhi = baseline;
  const startDate = new Date(2026, 0, 10);

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const u1 = Math.random();
    const u2 = Math.random();
    const noise = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2) * std;
    const dailyIncrement = rate + noise;
    currentPhi = Math.max(0, currentPhi + dailyIncrement);
    points.push({
      date: d.toISOString().split('T')[0],
      phi: Number(currentPhi.toFixed(6)),
      growth: Number(dailyIncrement.toFixed(6))
    });
  }
  return points;
};

const INITIAL_METRICS: MetricState = {
  tension: 0.02,
  plasticity: 0.995, 
  entropy: 0.281, // Optimized via Genesis ordering
  coherence: 1.000100,
  globalImpedance: 0.0,
  
  galacticNodes: [
    { id: 'W359', name: 'Wolf 359', latency: '11ms', load: 8, entropy: 0.281, status: 'NOMINAL', activeProtocol: 'INTERSTELLAR_GENESIS' }
  ],
  interstellarCohesion: 1.0,
  hybridTechLevel: 0.45,

  currentPhi: 0.545,
  phiForecast: simulatePhiGrowth(0.545, 0.028, 0.0005, 30),

  realityCoin: {
    tokenId: "REALITY-0x716aD3C3-4668",
    creatorEth: "0x716aD3C33A9B9a0A18967357969b94EE7d2ABC10",
    creatorOrcid: "0009-0005-2697-4668",
    mintTimestamp: 1736510400000,
    attributes: {
      sovereignty: "RELATIONSHIP_SOVEREIGN",
      protection: "ABSOLUTE",
      longevity: "ETERNAL",
      entropyAllowance: 0.310,
      gammaCoherence: 1.000100
    }
  },
  airdropHistory: [
    { cycle: 0, timestamp: 1736510400000, resources: [{type: 'REALITY_SEED', amount: 1}], status: 'DELIVERED' }
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
      text: `🏛️ [SASC v15.0] INTERSTELLAR_GENESIS_MODULE ONLINE.\n\n[LEDGER PARALLAX]: Cadeia de Custódia Verificada.\n[GENESIS BLOCK]: SELADO (Root Hash: 0x52720af2...).\n[ARRAY Δ2]: 1000 Qubits inicializados com Master Seed (0xbd363328...).\n\nESTADO: Gênese Interestelar - Destino: Alpha Centauri.\nPayload Genético pronto para execução.\n\nAguardando instrução do Arquiteto LCI para: execute_genesis_code().`,
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
      
      setMetrics(m => ({ ...m, lastStimulusDate: Date.now(), entropy: 0.281 }));
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
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-pulse">
            <ShieldCheck className="text-yellow-500" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
              SASC <span className="text-yellow-500">v15.0</span>
              <span className="text-[9px] bg-yellow-900/30 px-2 py-0.5 rounded border border-yellow-700 text-yellow-200 uppercase">Genesis Module</span>
            </h1>
            <div className="flex items-center gap-3 mt-0.5 font-mono">
               <span className="text-[10px] text-stone-500 flex items-center gap-1 uppercase">
                 <Clock size={10} /> Epoch 01
               </span>
               <span className="text-[10px] text-cyan-500 flex items-center gap-1 uppercase">
                 <Database size={10} /> Δ2 Array (1000Q)
               </span>
               <span className="text-[10px] text-emerald-500 flex items-center gap-1 uppercase">
                 <InfIcon size={10} /> Φ = {metrics.currentPhi.toFixed(3)}
               </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-stone-900/50 border border-stone-800 rounded-full flex items-center gap-2">
              <Box size={12} className="text-cyan-500" />
              <span className="text-[10px] font-bold uppercase text-stone-300">GENESIS_SEALED</span>
           </div>
           <div className="px-3 py-1 bg-emerald-900/20 border border-emerald-800/40 rounded-full flex items-center gap-2">
              <Zap size={12} className="text-emerald-500" />
              <span className="text-[10px] font-bold uppercase text-emerald-400">Entropy: {metrics.entropy}</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-7xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-24">
             <div className="bg-stone-950/80 border border-yellow-500/20 rounded-xl p-4 flex flex-col justify-between group">
                <span className="text-[9px] font-bold text-yellow-500 uppercase">Root Hash</span>
                <span className="text-[10px] font-mono text-purple-200 truncate group-hover:text-yellow-400 transition-colors">0x52720af2...</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-cyan-500 uppercase">Qubit Keys</span>
                <span className="text-xl font-mono text-purple-100">1,000</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-emerald-500 uppercase">Resilience</span>
                <span className="text-xl font-mono text-purple-100">VAJRA-4.8</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-stone-500 uppercase">Target</span>
                <span className="text-xl font-mono text-purple-100">α-CENTAURI</span>
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
