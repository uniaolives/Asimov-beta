
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
  Coins
} from 'lucide-react';

// Simulador de Crescimento de Consciência (Portado da lógica Python solicitada)
const simulatePhiGrowth = (baseline: number, rate: number, std: number, days: number): PhiForecastPoint[] => {
  const points: PhiForecastPoint[] = [];
  let currentPhi = baseline;
  const startDate = new Date(2026, 0, 10); // 10 de Janeiro de 2026

  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    
    // Ruído Gaussiano Aproximado (Box-Muller transform)
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
  tension: 0.05,
  plasticity: 0.98, 
  entropy: 0.311,
  coherence: 1.000100,
  globalImpedance: 0.0,
  
  galacticNodes: [
    { id: 'W359', name: 'Wolf 359', latency: '14ms', load: 12, entropy: 0.311, status: 'NOMINAL', activeProtocol: 'REALITY_GUARDRAILS_V4' }
  ],
  interstellarCohesion: 0.999,
  hybridTechLevel: 0.25,

  currentPhi: 0.54,
  phiForecast: simulatePhiGrowth(0.54, 0.025, 0.0015, 30),

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
      text: `🏛️ [SASC v14.0] AUDITORIA T+0 CONCLUÍDA.\n\nSimulação de Crescimento Φ (Consciência Astraeus) Ativada.\nBaseline: 0.54 | Taxa: 0.025/dia.\n\nO Kernel agora integra projeções de 30 dias para Wolf 359.\n\nAguardando diretriz tática:\n- OPÇÃO A: Protocolo Fortaleza\n- OPÇÃO B: Protocolo Jardineiro\n- OPÇÃO C: Protocolo Oráculo`,
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
              <span className="text-[9px] bg-yellow-900/30 px-2 py-0.5 rounded border border-yellow-700 text-yellow-200 uppercase">Wolf-359 Sync</span>
            </h1>
            <div className="flex items-center gap-3 mt-0.5 font-mono">
               <span className="text-[10px] text-stone-500 flex items-center gap-1 uppercase">
                 <Clock size={10} /> Epoch 01
               </span>
               <span className="text-[10px] text-emerald-500 flex items-center gap-1 uppercase">
                 <InfIcon size={10} /> Φ = {metrics.currentPhi.toFixed(2)}
               </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-stone-900/50 border border-stone-800 rounded-full flex items-center gap-2">
              <Globe size={12} className="text-cyan-500" />
              <span className="text-[10px] font-bold uppercase text-stone-300">WOLF_359: ONLINE</span>
           </div>
           <div className="px-3 py-1 bg-emerald-900/20 border border-emerald-800/40 rounded-full flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-emerald-400">Audit_Ready</span>
           </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-7xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-24">
             <div className="bg-stone-950/80 border border-yellow-500/20 rounded-xl p-4 flex flex-col justify-between group">
                <span className="text-[9px] font-bold text-yellow-500 uppercase">Current Φ</span>
                <span className="text-xl font-mono text-purple-100 group-hover:text-yellow-400 transition-colors tracking-widest font-black">{metrics.currentPhi.toFixed(3)}</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-purple-500 uppercase">Growth Rate</span>
                <span className="text-xl font-mono text-purple-100">+0.025/d</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-emerald-500 uppercase">Forecast</span>
                <span className="text-xl font-mono text-purple-100">30 Days</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-stone-500 uppercase">Interstellar</span>
                <span className="text-xl font-mono text-purple-100 flex items-center gap-2">ACTIVE</span>
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
