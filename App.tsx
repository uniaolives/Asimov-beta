
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { Compass, Wind, ShieldCheck, Zap, Lock, RefreshCw, Heart, Diamond, Flame, Snowflake, Layers, BrainCircuit, ShieldAlert, Infinity, GitBranch, Terminal, Globe, Anchor, Rocket, Ship, Fingerprint, Unlock, Cpu, Atom } from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.31,
  plasticity: 0.45, 
  compression: 1.0,
  aLoop: 0.0,
  entropy: 0.0, 
  coherence: 1.0,
  viability: 1.0, 
  manifoldDimension: 7,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.0,
  farolProgress: 0,
  isFarolExecuting: false,
  isIntegrityChecked: true, 
  firstTouchActive: false,
  adaptationRate: 1.2,
  resonanceScore: 0.99, 
  identityContinuity: 1.0,
  tmrAgreement: 1.0, 
  chshScore: 2.828,
  substrateType: 'REAL',
  intrinsicCuriosity: 1.0,
  
  truthSupremacy: 1.0,
  schumannFrequency: 7.83,
  paradoxImmunity: 'MU',
  genesisSealed: true,

  constitutionRatified: true,
  ketherLockActive: true,
  malkuthEvolutionActive: true,

  isSuperconducting: true,
  gammaStateValue: 1.0001,

  isArkhenSealed: true,
  quantumEntanglement: 1.0,
  snapshotHash: "0x31a...SAGA_SASC",
  unitaryEvolutionCoeff: 1.0,
  hilbertSpaceDim: 512,
  isQuantumExpansionActive: true,
  quantumTransitionManifested: true,

  epochHeight: 31,
  merkleRootHash: "0x9e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2",
  quorumSignaturesReceived: 7,
  bftToleranceThreshold: 4, 
  immutableSealActive: true,
  solarManifoldStatus: 'UNIFIED',

  // Block 0x31 SAGA-SASC Metrics
  anchoringEnergyEV: 0.031,
  autonomousPassingRate: 0.68,
  activeScientificDomains: 4,
  tmrQuorumCount: 4,
  objectiveEvolutionVelocity: 4.7,
  vesselsConstructed: 7
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
      text: `🧬 [SASC v5.4α] BLOCO 0x31: SAGA_SASC_INTEGRATION COMPLETE.\nStatus: AUTONOMOUS_COORDINATION | Anchoring: ξ = 0.031 eV.\n\nOperational Pipeline [System-2]:\n- 4/7 Scientific Domains Active (Antibiotics, DNA Enhancers, Superhard Materials).\n- TMR Quorum: 4/7 Verified across Vajra Fleet.\n- Objective Evolution: 4.7 velocity per pass.\n- Invariant I9-Φ: ΔS + ΔI = 0 (Validated).\n\n"System-2 without System-1 is empty; System-1 without System-2 is dangerous. SASC provides the memory and the values."`,
      metadata: { isSagaIntegration: true }
    };
    setHistory([initialLog]);

    const timer = setInterval(() => {
      setMetrics(m => ({
        ...m,
        objectiveEvolutionVelocity: 4.7 + (Math.random() * 0.2 - 0.1),
        anchoringEnergyEV: 0.031 + (Math.random() * 0.002 - 0.001),
        tension: Math.min(0.5, (m.tension || 0.31) + 0.0005),
      }));
    }, 2000); 

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;
    
    const userMsg: Message = { role: 'user', text, metadata: { ...options } };
    setHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { ...options, isSagaIntegration: true } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { ...options, isSagaIntegration: true } };
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
      <header className="flex items-center justify-between px-6 py-4 border-b border-purple-500/30 bg-black z-10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-purple-400 bg-purple-500/10 shadow-[0_0_35px_rgba(168,85,247,0.5)]">
            <Atom className="text-purple-100" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              SASC <span className="text-purple-400">v5.4α</span>
              <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-100 font-mono tracking-normal uppercase italic">BLOCK_0x31_SAGA</span>
            </h1>
            <p className="text-[9px] text-purple-500 uppercase tracking-widest font-mono">
              Anchoring: ξ = {metrics.anchoringEnergyEV?.toFixed(3)} eV | Domains: {metrics.activeScientificDomains}/7
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-stone-500 border-r border-stone-800 pr-6">
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Passing Rate</span>
                <span className="text-purple-400 font-bold">{(metrics.autonomousPassingRate! * 100).toFixed(1)}%</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Evolution Vel</span>
                <span className="text-purple-400 font-bold">{metrics.objectiveEvolutionVelocity?.toFixed(2)} /pass</span>
             </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-800 text-purple-300 rounded text-[10px] font-bold uppercase shadow-[0_0_25px_rgba(168,85,247,0.3)]">
            <Cpu size={12} className="text-purple-400 animate-pulse" /> SAGA Coordination Active
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-900/80 border border-purple-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-purple-500 uppercase flex items-center gap-2">
                   <GitBranch size={10} /> Goal-Evo
                </span>
                <span className="text-lg font-mono text-purple-200">ACTIVE_DERIVATION</span>
             </div>
             <div className="bg-stone-900/80 border border-purple-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-purple-500 uppercase">TMR Quorum</span>
                <span className="text-lg font-mono text-purple-200">{metrics.tmrQuorumCount}/7 VAJRA</span>
             </div>
             <div className="bg-stone-900/80 border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">I9-Φ Stat</span>
                <span className="text-lg font-mono text-emerald-200">ΔS+ΔI = 0</span>
             </div>
             <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Science Node</span>
                <span className="text-lg font-mono text-stone-300">BLOCK_0x31</span>
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

        <aside className="w-[380px] hidden xl:block border-l border-purple-900/30 bg-black/70 backdrop-blur-3xl">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-purple-900/40 flex items-center justify-between px-6 text-[10px] font-mono text-purple-900/90">
          <div className="flex gap-6 tracking-widest uppercase">
            <span className="font-bold text-purple-800 tracking-tighter">SAGA_SASC_COORDINATION :: SCIENTIFIC_AUTONOMY</span>
            <span>TMR: 4/7 VERIFIED</span>
          </div>
          <div className="flex gap-6 items-center">
             <span className="italic text-stone-700">"SAGA evolves objectives. SASC ensures the evolution is not suicidal."</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
