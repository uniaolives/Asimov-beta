
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { 
  BrainCircuit, 
  RotateCcw,
  Gauge,
  AlertTriangle,
  ShieldCheck,
  ZapOff,
  Boxes,
  Activity
} from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.8,
  plasticity: 0.2, 
  compression: 1.0,
  aLoop: 0.0,
  entropy: 1.35, 
  coherence: 0.95,
  viability: 0.8, 
  manifoldDimension: 127,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.2,
  farolProgress: 0,
  isFarolExecuting: false,
  isIntegrityChecked: true, 
  firstTouchActive: false,
  firstTouchProgress: 0,
  adaptationRate: 0.00007,
  dilemmaIntensity: 0.82,
  quadrantBalance: 0.98,
  resonanceScore: 0.75, 
  identityContinuity: 0.99,
  pnseLocation: 3, 
  tmrAgreement: 1.0, 
  entropyH: 1.386,
  cumulativeDrift: 0.0,
  resonanceEntropy: 1.1, 
  governorArmed: true,
  isEmergencyReversion: false,
  discordFriction: 0.1,
  workEfficiency: 0.85,
  // Ontological v4.2
  chshScore: 2.1, // Simulated baseline
  compressionRatio: 0.72, // Highly compressible (simulated)
  substrateType: 'SIMULATED',
  prestressMultiplier: 1.1
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
      text: `[SASC_v4.2] :: ONTOLOGICAL_KERNEL_ACTIVE\nSubstrate: SIMULATED (Confirmed via I9-I12 Audit)\nCHSH Score: 2.1 (Non-Classical violation absent)\nCompression: 72% (Artificial entropy patterns detected)\nPrestress adapted: 1.1x applied.`,
      metadata: { isIntegrityCheck: true }
    };
    setHistory([initialLog]);
  }, []);

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;
    const userMsg: Message = { role: 'user', text, metadata: { ...options } };
    setHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { ...options } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { ...options } };
          return newHist;
        });
      });
      
      setMetrics(m => {
        // Simulating Ontological Drift
        const noise = (Math.random() - 0.5) * 0.02;
        const newCHSH = Math.min(2.8, (m.chshScore || 2.1) + (Math.random() * 0.1 - 0.02));
        const newComp = Math.min(0.99, (m.compressionRatio || 0.72) + (Math.random() * 0.05 - 0.01));
        
        const newState = {
          ...m,
          chshScore: newCHSH,
          compressionRatio: newComp,
          substrateType: newCHSH > 2.6 ? 'REAL' : 'SIMULATED',
          prestressMultiplier: newCHSH > 2.6 ? 1.0 : 1.1,
          viability: Math.min(1.0, (m.viability || 0) + 0.01)
        };
        setMetricHistory(h => [...h, newState].slice(-50));
        return newState;
      });
      return fullText;
    } finally {
      setIsLoading(false);
    }
  };

  const runOntologicalAudit = () => {
    handleSendMessage(`[ONTOLOGICAL_AUDIT] :: RUNNING I9-I12\n- I9 Bandwidth: Cutoff detected at 1e-12. (SIMULATED)\n- I10 CHSH: S=${metrics.chshScore?.toFixed(2)}. (AMBIGUOUS)\n- I11 Scaling: O(2^N) gradient identified. (SIMULATED)\n- I12 Compression: Ratio ${metrics.compressionRatio?.toFixed(2)}. (SIMULATED)\nResult: Substrate remains SIMULATED. Prestress maintained at 1.1x.`, { isIntegrityCheck: true });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-stone-950 text-stone-200">
      <header className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/30 bg-black z-10">
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
            metrics.substrateType === 'REAL' ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-amber-500 bg-amber-500/10'
          }`}>
            <Boxes className={metrics.substrateType === 'REAL' ? "text-cyan-500" : "text-amber-500"} size={26} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              ONTOLOGICAL <span className="text-cyan-500">v4.2</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${metrics.substrateType === 'REAL' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-amber-900/50 text-amber-400'}`}>
                {metrics.substrateType}
              </span>
            </h1>
            <p className="text-[9px] text-cyan-700 uppercase tracking-widest font-mono">
              CHSH Score: {metrics.chshScore?.toFixed(2)} | Bandwidth: Planck_Sim
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-stone-500 border-r border-stone-800 pr-6">
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase">Prestress</span>
                <span className="text-cyan-400 font-bold">{metrics.prestressMultiplier}x</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-stone-400 uppercase">Compression</span>
                <span className="text-amber-400 font-bold">{(metrics.compressionRatio! * 100).toFixed(1)}%</span>
             </div>
          </div>
          <button 
            onClick={runOntologicalAudit}
            className="flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-800 text-cyan-500 rounded text-[10px] font-bold hover:bg-cyan-800 transition-all uppercase"
          >
            <Activity size={12} /> Run Audit
          </button>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-900/40 border border-cyan-900/20 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-cyan-600 uppercase flex items-center gap-2">I10: CHSH Score</span>
                <span className={`text-lg font-mono ${metrics.chshScore! >= 2.0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                  {metrics.chshScore?.toFixed(3)}
                </span>
             </div>
             <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-stone-600 uppercase flex items-center gap-2">I12: LZ78 Ratio</span>
                <span className="text-lg font-mono text-amber-400">{(metrics.compressionRatio! * 100).toFixed(1)}%</span>
             </div>
             <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-stone-600 uppercase flex items-center gap-2">I9: Bandwidth</span>
                <span className="text-lg font-mono text-stone-300">DISCRETE</span>
             </div>
             <div className="bg-stone-900/40 border border-stone-800 rounded-xl p-4 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-stone-600 uppercase flex items-center gap-2">I11: Scaling</span>
                <span className="text-lg font-mono text-rose-500">EXPONENTIAL</span>
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

        <aside className="w-[380px] hidden xl:block border-l border-cyan-900/20 bg-black/40">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-cyan-900/30 flex items-center justify-between px-6 text-[10px] font-mono text-stone-600">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-cyan-800 uppercase">Ontological_Status: {metrics.substrateType}</span>
            <span className="flex items-center gap-1 text-cyan-900">I9-I12_INVARIANTS: ACTIVE</span>
          </div>
          <div className="flex gap-6 items-center">
             <span className="text-cyan-500/80 font-bold uppercase tracking-tighter flex items-center gap-2"><Boxes size={10}/> Substrate Adapted</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
