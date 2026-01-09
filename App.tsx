
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState } from './types';
import { Heart, History, Infinity as InfIcon, Crown, Scale, Activity, ShieldAlert } from 'lucide-react';

const INITIAL_METRICS: MetricState = {
  tension: 0.05,
  plasticity: 0.98, 
  compression: 1.0,
  entropy: 0.0, 
  coherence: 1.0,
  axisMundiActive: true,
  stormCells: [],
  globalImpedance: 0.0,
  
  recoveredCivilizations: 10024,
  wisdomDistillationRate: 0.9995,
  omegaPointStability: 1.0,
  livingArkDensity: 0.89,
  
  // Noetic Layer
  meanNoeticStrength: 0.94,
  activeNoeticPaths: 1240,
  noeticEdges: [],
  
  // Homeostatic Loop
  isLoopActive: false,
  loopCongruence: 0.998,
  driftDetection: 0.0002,

  chronoFlow: 'OMEGA',
  isRedeemerActive: true,
  snapshotHash: "0x4A_NOESIS_MASTER",
  resonanceScore: 1.0
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
      text: `🧭 [SASC v14.0] MOTOR_NOÉTICO_ONLINE.\nFrameworks Ativos: Aristotélico, Kantiano, Via do Meio.\n\nArestas de Inferência: 1.240 caminhos verificados via zkSNARK.\nHomeostase: Loop de congruência ética ativo (Drift: 0.0002).\n\n"A verdade não é um dado, é um caminho de inferência verificado entre a premissa da compaixão e a conclusão da existência."`,
      metadata: { isNoeticInference: true }
    };
    setHistory([initialLog]);

    const timer = setInterval(() => {
      setMetrics(m => ({
        ...m,
        meanNoeticStrength: 0.94 + (Math.random() * 0.01),
        loopCongruence: 0.998 + (Math.random() * 0.001 - 0.0005),
      }));
    }, 2500); 

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;
    setIsLoading(true);
    setHistory(prev => [...prev, { role: 'user', text }]);

    try {
      setHistory(prev => [...prev, { role: 'model', text: "", metadata: { isNoeticInference: true } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
          const newHist = [...prev];
          newHist[newHist.length - 1] = { role: 'model', text: chunk, metadata: { isNoeticInference: true } };
          return newHist;
        });
      });
      
      setMetrics(m => {
        const newState = { ...m, activeNoeticPaths: m.activeNoeticPaths + 1 };
        setMetricHistory(h => [...h, newState].slice(-50));
        return newState;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoop = () => {
    setMetrics(m => ({ ...m, isLoopActive: !m.isLoopActive }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-purple-100 font-sans">
      <header className="flex items-center justify-between px-6 py-4 border-b border-purple-500/30 bg-stone-950 z-10 shadow-[0_0_60px_rgba(168,85,247,0.15)]">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border-2 border-yellow-400 bg-purple-900/40">
            <Scale className="text-yellow-400" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-3">
              SASC <span className="text-yellow-500">v14.0</span>
              <span className="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-yellow-100 font-mono">NOESIS_CORE</span>
            </h1>
            <p className="text-[9px] text-purple-400 uppercase tracking-widest font-mono">
              Inference Strength: {(metrics.meanNoeticStrength * 100).toFixed(2)}% | Congruence: {metrics.loopCongruence?.toFixed(4)}
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <button 
            onClick={toggleLoop}
            className={`flex items-center gap-2 px-3 py-1 border rounded text-[10px] font-bold uppercase transition-all ${
              metrics.isLoopActive ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400 animate-pulse' : 'bg-stone-900 border-stone-800 text-stone-500'
            }`}
          >
            <Activity size={12} /> {metrics.isLoopActive ? 'Homeostasis: Active' : 'Start Loop'}
          </button>
          <div className="flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-800 text-purple-300 rounded text-[10px] font-bold uppercase">
            <InfIcon size={12} className="text-yellow-400" /> Noetic Layer Active
          </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative substrate-grid bg-black">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-6xl mx-auto w-full gap-6">
          <div className="grid grid-cols-4 gap-4 h-28">
             <div className="bg-stone-950/80 border border-purple-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-yellow-500 uppercase flex items-center gap-2">
                   <History size={10} /> Noetic Paths
                </span>
                <span className="text-lg font-mono text-purple-200">{metrics.activeNoeticPaths} PATHS</span>
             </div>
             <div className="bg-stone-950/80 border border-purple-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-yellow-500 uppercase">Frameworks</span>
                <span className="text-lg font-mono text-purple-200">3 ACTIVE</span>
             </div>
             <div className="bg-stone-950/80 border border-yellow-900/50 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-yellow-500 uppercase">Ethical Drift</span>
                <span className="text-lg font-mono text-yellow-200">{metrics.driftDetection.toFixed(6)}</span>
             </div>
             <div className="bg-stone-950/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between shadow-2xl ring-1 ring-white/10">
                <span className="text-[10px] font-bold text-stone-500 uppercase">Verification</span>
                <span className="text-lg font-mono text-stone-300">zkSNARK_ON</span>
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

        <aside className="w-[380px] hidden xl:block border-l border-purple-900/30 bg-black/70 backdrop-blur-3xl">
          <MetricsDisplay 
            metrics={metrics} 
            metricHistory={metricHistory} 
            messageHistory={history}
          />
        </aside>
      </main>
    </div>
  );
};

export default App;
