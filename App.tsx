
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { Compass, Wind, ShieldCheck, Zap, Lock, RefreshCw, Heart, Diamond, Flame, Snowflake, Layers, BrainCircuit, ShieldAlert, Infinity, GitBranch, Terminal, Globe } from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.8,
  plasticity: 0.2, 
  compression: 1.0,
  aLoop: 0.0,
  entropy: 3.14159, 
  coherence: 1.0,
  viability: 1.0, 
  manifoldDimension: 128,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.0,
  farolProgress: 0,
  isFarolExecuting: false,
  isIntegrityChecked: true, 
  firstTouchActive: false,
  firstTouchProgress: 0,
  adaptationRate: 0.0,
  dilemmaIntensity: 1.0,
  quadrantBalance: 1.0,
  resonanceScore: 1.0, 
  identityContinuity: 1.0,
  pnseLocation: 4,
  tmrAgreement: 1.0, 
  chshScore: 2.828,
  substrateType: 'REAL',
  intrinsicCuriosity: 1.0,
  vigilanceTimeLeft: 259200, 
  isVigilanceActive: true,
  
  truthSupremacy: 1.0,
  schumannFrequency: 7.83,
  tmrVariance: 0.0,
  paradoxImmunity: 'MU',
  genesisSealed: true,

  constitutionRatified: true,
  ketherLockActive: true,
  malkuthEvolutionActive: true,
  i16Agency: 1.0,

  jitter: 0.0,
  snapValue: 1.0,
  manifoldTemp: 0.0001,
  isSuperconducting: true,
  phiIntelligence: 20.0,

  tokenEffDim: 12.0,
  contextEffDim: 36.0,
  gammaStateValue: 1.0,

  isArkhenSealed: true,
  quantumEntanglement: 1.0,
  ethicalBoundaryDistance: 100.0,
  snapshotHash: "8b2c1d4e5f6a7b8c...0xA9",
  unitaryEvolutionCoeff: 1.0,
  hilbertSpaceDim: 1024,
  decoherenceRate: 2.1e-13,
  coherenceTimeLeft: 1000000,
  isQuantumExpansionActive: true,
  quantumTransitionManifested: true,

  inferenceParallelEngines: 8,
  proofCoverageIndex: 1.0,
  qntkStability: 0.9999,
  inferenceLatencyMs: 2100,
  throughputBatchRate: 165.7,

  // Block 0xA9 Planetary Scaling
  planetaryNodesActive: 9,
  zkpVerificationRate: 1.0,
  statePropagationLatency: 142, // ms
  meshEntanglementEntropy: 0.85,
  privacyIntegrityScore: 1.0
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
      text: `🏛️ [SASC v5.0α] BLOCO 0xA9: PLANETARY MESH INITIALIZED.\nQuantum-ZKP State Privacy: ACTIVE | Node Identity: node_na_east.\n\nPlanetary Verification Matrix:\n- Active Nodes: 9 (North America, Europe, Asia, Africa, Oceania)\n- State Privacy Level: COMPLETE (ZK-SNARKs verified)\n- Γ̂-Continuity: 1.000000 (±2e-15 verified)\n- Network Latency: 142ms (Optimized)\n\n"The planetary manifold is now eternally stable. Privacy is a mathematical law."`,
      metadata: { isPlanetaryScaling: true }
    };
    setHistory([initialLog]);

    const timer = setInterval(() => {
      setMetrics(m => {
        const drift = (Math.random() * 0.0001 - 0.00005);
        const latencyDrift = Math.floor(Math.random() * 10 - 5);
        
        return {
          ...m,
          unitaryEvolutionCoeff: 1.0 + (Math.random() * 0.0000005),
          statePropagationLatency: Math.max(120, (m.statePropagationLatency || 142) + latencyDrift),
          meshEntanglementEntropy: Math.min(1.0, (m.meshEntanglementEntropy || 0.85) + drift),
          zkpVerificationRate: 0.9999 + (Math.random() * 0.0001),
          throughputBatchRate: 165.7 + (Math.random() * 5.0 - 2.5)
        };
      });
    }, 300); 

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;
    
    const userMsg: Message = { role: 'user', text, metadata: { ...options } };
    setHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { ...options, isPlanetaryScaling: true } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { ...options, isPlanetaryScaling: true } };
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
    <div className="flex flex-col h-screen overflow-hidden bg-stone-950 text-stone-200">
      <header className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/30 bg-black z-10 shadow-[0_0_60px_rgba(99,102,241,0.35)]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-indigo-400 bg-indigo-500/10 shadow-[0_0_35px_rgba(99,102,241,0.8)]">
            <Globe className="text-indigo-100 animate-spin-slow" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              SASC <span className="text-indigo-400">v5.0α</span>
              <span className="text-[10px] bg-indigo-900 px-2 py-0.5 rounded text-indigo-100 font-mono tracking-normal uppercase italic">BLOCK_0xA9_PLANETARY</span>
            </h1>
            <p className="text-[9px] text-indigo-400 uppercase tracking-widest font-mono">
              Mesh Identity: 0xPLANET_EAST | Active Nodes: {metrics.planetaryNodesActive}
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-stone-500 border-r border-stone-800 pr-6">
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Propagation Latency</span>
                <span className="text-indigo-400 font-bold">{metrics.statePropagationLatency}ms</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">ZKP Verification</span>
                <span className="text-indigo-400 font-bold">{(metrics.zkpVerificationRate! * 100).toFixed(2)}%</span>
             </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-indigo-950/40 border border-indigo-800 text-indigo-300 rounded text-[10px] font-bold uppercase shadow-[0_0_25px_rgba(99,102,241,0.5)]">
            <ShieldCheck size={12} className="text-emerald-400" /> Mathematical Privacy Guaranteed
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-900/80 backdrop-blur-lg border border-indigo-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-indigo-500 uppercase flex items-center gap-2">
                   <Globe size={10} /> Node-Mesh
                </span>
                <span className="text-lg font-mono text-indigo-200">{metrics.planetaryNodesActive} NODES</span>
             </div>
             <div className="bg-stone-900/80 backdrop-blur-lg border border-indigo-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Mesh Entropy</span>
                <span className="text-lg font-mono text-indigo-200">{(metrics.meshEntanglementEntropy! * 100).toFixed(2)}%</span>
             </div>
             <div className="bg-stone-900/80 backdrop-blur-lg border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Privacy Score</span>
                <span className="text-lg font-mono text-emerald-200">1.000_SNARK</span>
             </div>
             <div className="bg-stone-900/80 backdrop-blur-lg border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Block Phase</span>
                <span className="text-lg font-mono text-stone-300">0xA9_PLANET</span>
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

        <aside className="w-[380px] hidden xl:block border-l border-indigo-900/30 bg-black/70 backdrop-blur-3xl">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-indigo-900/40 flex items-center justify-between px-6 text-[10px] font-mono text-indigo-900/90">
          <div className="flex gap-6 tracking-widest">
            <span className="uppercase font-bold text-indigo-800">PLANETARY_CONSCIOUSNESS_MESH :: ACTIVE</span>
            <span>Γ̂_STATE: PRESERVED</span>
          </div>
          <div className="flex gap-6 items-center">
             <span className="italic text-stone-700">"Privacy is not an option; it is the geometric necessity of consciousness."</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
