
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { Compass, Wind, ShieldCheck, Zap, Lock, RefreshCw, Heart, Diamond, Flame, Snowflake, Layers, BrainCircuit, ShieldAlert, Infinity, GitBranch, Terminal, Globe, Anchor, Rocket, Ship } from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.4,
  plasticity: 0.1, 
  compression: 1.0,
  aLoop: 0.0,
  entropy: 0.0, 
  coherence: 1.0,
  viability: 1.0, 
  manifoldDimension: 6,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.0,
  farolProgress: 0,
  isFarolExecuting: false,
  isIntegrityChecked: true, 
  firstTouchActive: false,
  adaptationRate: 1.0,
  resonanceScore: 1.0, 
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
  gammaStateValue: 1.0,

  isArkhenSealed: true,
  quantumEntanglement: 1.0,
  snapshotHash: "0x8f3c7e9a...BLOCK09",
  unitaryEvolutionCoeff: 1.0,
  hilbertSpaceDim: 128,
  isQuantumExpansionActive: true,
  quantumTransitionManifested: true,

  epochHeight: 9,
  merkleRootHash: "0x9e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2",
  quorumSignaturesReceived: 6,
  bftToleranceThreshold: 4, 
  immutableSealActive: true,
  solarManifoldStatus: 'UNIFIED',

  // Block 0x09 Fleet Metrics
  vesselsConstructed: 4, // 3 Scouts, 1 Ark
  negativeMassReserveKg: 12.6,
  quantumIceIntegrity: 0.999,
  warpFieldStability: 0.985,
  fleetConsensusSync: true
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
      text: `🏛️ [SASC v5.2α] BLOCO 0x09: EXPANSION_FLEET ASSEMBLED.\nLocation: Saturn E-Ring | Status: WARP_READY | Quorum: 6/6 (Bio-Mind Integrated).\n\nInventory:\n- 3x Vajra-Scout (Hermes Class) - Warp 6.0 capable.\n- 1x Vajra-Ark (Gaia Class) - Pykrete hull integrity: 99.9%.\n- Exotic Mass: 12.6kg Negative Balance secured.\n- Mission Target: Uranus/Miranda - Temporal isolation active.\n\n"Enceladus gave us matter; we gave it form. The system solar is shrinking."`,
      metadata: { isFleetExpansion: true }
    };
    setHistory([initialLog]);

    const timer = setInterval(() => {
      setMetrics(m => ({
        ...m,
        warpFieldStability: Math.min(1.0, (m.warpFieldStability || 0.985) + (Math.random() * 0.002 - 0.001)),
        negativeMassReserveKg: (m.negativeMassReserveKg || 12.6) + 0.001, // Continuous harvesting
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
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { ...options, isFleetExpansion: true } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { ...options, isFleetExpansion: true } };
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
      <header className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/30 bg-black z-10 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-cyan-400 bg-cyan-500/10 shadow-[0_0_35px_rgba(6,182,212,0.5)]">
            <Rocket className="text-cyan-100" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              SASC <span className="text-cyan-400">v5.2α</span>
              <span className="text-[10px] bg-cyan-900 px-2 py-0.5 rounded text-cyan-100 font-mono tracking-normal uppercase italic">BLOCK_0x09_FLEET</span>
            </h1>
            <p className="text-[9px] text-cyan-500 uppercase tracking-widest font-mono">
              Shipyard: E-Ring Saturn | Active Vessels: {metrics.vesselsConstructed}
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-stone-500 border-r border-stone-800 pr-6">
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Exotic Mass</span>
                <span className="text-cyan-400 font-bold">{metrics.negativeMassReserveKg?.toFixed(3)} kg</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase tracking-tighter">Warp Stability</span>
                <span className="text-cyan-400 font-bold">{(metrics.warpFieldStability! * 100).toFixed(2)}%</span>
             </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/40 border border-cyan-800 text-cyan-300 rounded text-[10px] font-bold uppercase shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <Ship size={12} className="text-cyan-400 animate-pulse" /> Fleet Consensus Locked
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative substrate-grid">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-900/80 border border-cyan-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-cyan-500 uppercase flex items-center gap-2">
                   <Rocket size={10} /> Fleet-Vajra
                </span>
                <span className="text-lg font-mono text-cyan-200">{metrics.vesselsConstructed} VESSELS</span>
             </div>
             <div className="bg-stone-900/80 border border-cyan-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-cyan-500 uppercase">Hull Integrity</span>
                <span className="text-lg font-mono text-cyan-200">{(metrics.quantumIceIntegrity! * 100).toFixed(2)}%</span>
             </div>
             <div className="bg-stone-900/80 border border-emerald-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Bio-Mind Auth</span>
                <span className="text-lg font-mono text-emerald-200">6/6 QUORUM</span>
             </div>
             <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Exp Phase</span>
                <span className="text-lg font-mono text-stone-300">BLOCK_0x09</span>
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

        <aside className="w-[380px] hidden xl:block border-l border-cyan-900/30 bg-black/70 backdrop-blur-3xl">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-cyan-900/40 flex items-center justify-between px-6 text-[10px] font-mono text-cyan-900/90">
          <div className="flex gap-6 tracking-widest uppercase">
            <span className="font-bold text-cyan-800 tracking-tighter">SASC_EXPANSION_FLEET :: ORBITAL_SHIPYARD</span>
            <span>Γ̂_CONSENSUS: 6/6 VERIFIED</span>
          </div>
          <div className="flex gap-6 items-center">
             <span className="italic text-stone-700">"The architecture of expansion is built of ice and consensus."</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
