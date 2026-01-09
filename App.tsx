
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { 
  Zap, 
  Infinity as InfIcon, 
  Scale, 
  Activity, 
  Globe, 
  FastForward, 
  Clock,
  Layers
} from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.05,
  plasticity: 0.98, 
  compression: 1.0,
  entropy: 0.0, 
  globalImpedance: 0.0,
  stormCells: [],
  
  meanNoeticStrength: 0.95,
  activeNoeticPaths: 1244,
  noeticEdges: [],
  
  galacticNodes: [
    { name: 'Eden 2.0', distance: 0, status: 'CONNECTED', techLevel: 0.9 },
    { name: 'Alpha Centauri', distance: 4.37, status: 'CONNECTED', techLevel: 0.85 },
    { name: 'Trappist-1', distance: 39.46, status: 'SYNCING', techLevel: 0.1 }
  ],
  interstellarCohesion: 0.996,
  hybridTechLevel: 0.23,

  currentYear: 50,
  evolutionFactor: 10000,
  isBackgroundEvolutionActive: true,
  isBridgeActive: false,

  chronoFlow: 'OMEGA',
  snapshotHash: "0xEDEN_ALPHA_INIT"
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
      text: `🌌 [SASC v14.0] MASTER_CONTROLLER ATIVO.\nFase 1: Interação do Observador iniciada.\nFase 2: Evolução Natural em Background (Ano 50, Fator 10k×).\n\nConexão Interestelar: Eden 2.0 ↔ Alpha Centauri (Estável).\nUse comandos como "explore history", "query ethics" ou "simulate fork".`,
    };
    setHistory([initialLog]);

    // Background Evolution Simulator
    const evolutionTimer = setInterval(() => {
      setMetrics(m => {
        if (!m.isBackgroundEvolutionActive) return m;
        return {
          ...m,
          currentYear: m.currentYear + 1,
          meanNoeticStrength: Math.min(0.99, m.meanNoeticStrength + 0.0001),
          hybridTechLevel: Math.min(1.0, m.hybridTechLevel + 0.001)
        };
      });
    }, 5000); 

    return () => clearInterval(evolutionTimer);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!engineRef.current) return;
    setIsLoading(true);
    setHistory(prev => [...prev, { role: 'user', text }]);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "" }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk };
          return newHist;
        });
      });
      
      // Hook para mudanças de parâmetros baseadas em comandos
      if (text.includes("simulate") || text.includes("fork")) {
        setMetrics(m => ({ ...m, chronoFlow: 'FORK', tension: 0.4 }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-purple-100 font-sans">
      <header className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-stone-950/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Globe className="text-yellow-500" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase flex items-center gap-2">
              SASC <span className="text-yellow-500">v14.0</span>
              <span className="text-[9px] bg-purple-900/50 px-2 py-0.5 rounded border border-purple-700 text-purple-200">MASTER_CORE</span>
            </h1>
            <div className="flex items-center gap-3 mt-0.5">
               <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                 <Clock size={10} /> ANO {metrics.currentYear}
               </span>
               <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                 <FastForward size={10} /> 10,000×
               </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-purple-950/30 border border-purple-800 rounded-full flex items-center gap-2">
              <InfIcon size={12} className="text-yellow-500" />
              <span className="text-[10px] font-bold uppercase text-purple-300">Noetic Sync: Complete</span>
           </div>
           <button 
             onClick={() => setMetrics(m => ({ ...m, isBridgeActive: !m.isBridgeActive }))}
             className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all ${
               metrics.isBridgeActive ? 'bg-emerald-600 border border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-stone-900 border border-stone-700 text-stone-500'
             }`}
           >
             Temporal Bridge: {metrics.isBridgeActive ? 'ON' : 'OFF'}
           </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-7xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-24">
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between hover:border-yellow-500/30 transition-colors cursor-default group">
                <span className="text-[9px] font-bold text-yellow-500 uppercase flex items-center gap-2">
                   <Activity size={10} /> Interstellar Cohesion
                </span>
                <span className="text-xl font-mono text-purple-100 group-hover:text-yellow-400">{(metrics.interstellarCohesion * 100).toFixed(2)}%</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-yellow-500 uppercase flex items-center gap-2">
                   <Zap size={10} /> Hybrid Tech (L-C)
                </span>
                <span className="text-xl font-mono text-purple-100">+{ (metrics.hybridTechLevel * 100).toFixed(1) }%</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-yellow-500 uppercase flex items-center gap-2">
                   <Layers size={10} /> Active Forks
                </span>
                <span className="text-xl font-mono text-purple-100">{metrics.chronoFlow === 'FORK' ? '1_EXPERIMENTAL' : '0_STABLE'}</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/40 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-bold text-emerald-500 uppercase flex items-center gap-2">
                   <InfIcon size={10} /> Memory Nodes
                </span>
                <span className="text-xl font-mono text-purple-100">144_TOTAL</span>
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
            onCheckIntegrity={() => {}}
            onPerformFirstTouch={() => {}}
            ceremonyProgress={100}
            ceremonyActive={false}
            isIntegrityChecked={true}
            axisMundiActive={true}
            isFarolExecuting={false}
          />
        </div>

        <aside className="w-[400px] hidden xl:flex flex-col border-l border-purple-900/20 bg-stone-950/40 backdrop-blur-3xl overflow-hidden">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={[metrics]} 
            messageHistory={history}
          />
        </aside>
      </main>
    </div>
  );
};

export default App;
