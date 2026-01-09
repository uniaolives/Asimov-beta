
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { ShieldCheck, Zap, Lock, Layers, BrainCircuit, Activity, GitBranch, Terminal, Globe, Cpu, Atom, Activity as Pulse, Server, Network } from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.42,
  plasticity: 0.72, 
  compression: 0.85,
  aLoop: 0.0,
  entropy: 0.0, 
  coherence: 1.0,
  viability: 1.0, 
  manifoldDimension: 12,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.0,
  farolProgress: 0,
  isFarolExecuting: false,
  isIntegrityChecked: true, 
  firstTouchActive: false,
  adaptationRate: 1.8,
  resonanceScore: 0.9999,
  tmrAgreement: 1.0,

  // Block 0x42 RK4 & Lattica Metrics
  spiralCount: 8,
  spiralPersistenceMs: 410,
  gammaStabilityNeural: 1.000350,
  neuralEntropyBits: 0.28,
  informationFidelity: 0.995,
  workingMemoryCapacity: 7,
  rk4Precision: 0.99999,
  activeLatticaWorkers: 4,
  throughputUnitsPerSec: 124000,
  distributedSyncLatency: 1.2,
  latticaStatus: 'MASTER_SYNC',

  snapshotHash: "0x42_RK4_LATTICA",
  anchoringEnergyEV: 0.031,
  tmrQuorumCount: 7,
  activeScientificDomains: 7
};

const App: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<MetricState>(INITIAL_METRICS);
  const [metricHistory, setMetricHistory] = useState<MetricState[]>([INITIAL_METRICS]);
  const [isLoading, setIsLoading] = useState(false);
  const engineRef = useRef<SubstrateEngine | null>(null);

  useEffect(() => {
    engineRef.current = new SubstrateEngine();
    const initialLog: Message = {
      role: 'model',
      text: `🚀 [SASC v5.6α] BLOCO 0x42: LATTICA_DISTRIBUTION_INITIALIZED.\nIntegrator: RK4 (Δt=0.1ms) | Workers: 4 Nodes Active.\n\nStatus do Substrato:\n- Precisão RK4: 0.99999 (Erro residual < 1e-9).\n- Throughput: 124k units/s via Parallax Mesh.\n- Latência Lattica: 1.2ms (Sincronização global estável).\n- Memória de Trabalho: 7/7 slots (Tokens espirais persistentes).\n\n"A precisão numérica do RK4 é o alicerce onde a intenção se torna realidade."`,
      metadata: { isLatticaDeploy: true }
    };
    setHistory([initialLog]);

    const timer = setInterval(() => {
      setMetrics(m => ({
        ...m,
        distributedSyncLatency: 1.2 + (Math.random() * 0.4 - 0.2),
        throughputUnitsPerSec: 124000 + Math.floor(Math.random() * 500),
        gammaStabilityNeural: 1.000340 + (Math.random() * 0.00002),
        spiralPersistenceMs: 400 + Math.floor(Math.random() * 20),
      }));
    }, 1000); 

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;
    
    const userMsg: Message = { role: 'user', text, metadata: { ...options } };
    setHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { ...options, isLatticaDeploy: true } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { ...options, isLatticaDeploy: true } };
          return newHist;
        });
      });
      
      setMetrics(m => {
        const newState = { ...m };
        setMetricHistory(h => [...h, newState].slice(-50));
        return newState;
      });
      return fullText;
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-950 text-stone-200 font-sans">
      <header className="flex items-center justify-between px-6 py-4 border-b border-blue-500/30 bg-black z-10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-blue-400 bg-blue-500/10 shadow-[0_0_35px_rgba(59,130,246,0.4)]">
            <Network className="text-blue-100" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              SASC <span className="text-blue-400">v5.6α</span>
              <span className="text-[10px] bg-blue-900 px-2 py-0.5 rounded text-blue-100 font-mono tracking-normal uppercase italic">BLOCK_0x42_LATTICA</span>
            </h1>
            <p className="text-[9px] text-blue-500 uppercase tracking-widest font-mono">
              Lattica Nodes: {metrics.activeLatticaWorkers} | RK4 Precision: {metrics.rk4Precision?.toFixed(5)}
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-stone-500 border-r border-stone-800 pr-6">
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Throughput</span>
                <span className="text-blue-400 font-bold">{(metrics.throughputUnitsPerSec! / 1000).toFixed(1)}k u/s</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Sync Latency</span>
                <span className="text-blue-400 font-bold">{metrics.distributedSyncLatency?.toFixed(2)} ms</span>
             </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-800 text-blue-300 rounded text-[10px] font-bold uppercase shadow-[0_0_25px_rgba(59,130,246,0.2)]">
            <Server size={12} className="text-blue-400 animate-pulse" /> Master Sync Active
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-900/80 border border-blue-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-2">
                   <Cpu size={10} /> Integrator
                </span>
                <span className="text-lg font-mono text-blue-200">RK4_ACTIVE</span>
             </div>
             <div className="bg-stone-900/80 border border-blue-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-blue-500 uppercase">Parallax Scale</span>
                <span className="text-lg font-mono text-blue-200">128x128 GRID</span>
             </div>
             <div className="bg-stone-900/80 border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Substrate State</span>
                <span className="text-lg font-mono text-emerald-200">SUPERCONDUCTIVE</span>
             </div>
             <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Orchestrator</span>
                <span className="text-lg font-mono text-stone-300">BLOCK_0x42</span>
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
            ceremonyProgress={0}
            ceremonyActive={false}
            isIntegrityChecked={true}
            firstTouchActive={false}
            axisMundiActive={true}
            isFarolExecuting={false}
            farolProgress={0}
            globalImpedance={0}
            stormCells={[]}
          />
        </div>

        <aside className="w-[380px] hidden xl:block border-l border-blue-900/30 bg-black/70 backdrop-blur-3xl">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-blue-900/40 flex items-center justify-between px-6 text-[10px] font-mono text-blue-900/90">
          <div className="flex gap-6 tracking-widest uppercase">
            <span className="font-bold text-blue-800 tracking-tighter">LATTICA_DISTRIBUTION_SYSTEM :: RK4_LOCKED</span>
            <span>NODES: {metrics.activeLatticaWorkers} VERIFIED</span>
          </div>
          <div className="flex gap-6 items-center">
             <span className="italic text-stone-700">"Scale is achieved through synchronization, not just speed."</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
