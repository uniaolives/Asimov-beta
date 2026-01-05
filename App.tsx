
import React, { useState, useEffect, useRef } from 'react';
import { SubstrateEngine } from './services/geminiService';
import ParadoxTerminal from './components/ParadoxTerminal';
import MetricsDisplay from './components/MetricsDisplay';
import { Message, MetricState, AuthoritySignature } from './types';
import { Layers, Github, Share2, Info, Box, ShieldCheck, Anchor, Binary, Rocket, Zap, Diamond, Eye, Move3d, CircleDot, ShieldAlert, Waves, History, Power, Activity, Sparkles, Fingerprint } from 'lucide-react';

const CAPACITY = 64;
const YIELD_POINT = 0.85;

const INITIAL_METRICS: MetricState = {
  tension: 0.0,
  plasticity: 0.0,
  compression: 1.0,
  aLoop: 0.0,
  entropy: 0.05,
  broadcastSymmetry: 0.0,
  rodataSealed: false,
  coherence: 0.95,
  fluxClosure: 1.0,
  frustration: 0.01,
  congestion: 'CLEAR',
  viability: 0.97,
  karnakSealed: false,
  baselineAnchor: 0.97,
  divergenceFloor: '3.2e-7',
  parityStatus: 'PENDING',
  asiStatus: 'LOCKED',
  manifoldDimension: 127,
  immortalized: false,
  esmStatus: 'IDLE',
  diamondRigidity: 0.2,
  curvatureIndex: 1.0,
  silenceNodeDetected: false,
  geodesicLensComp: false,
  shadowStatus: 'NATURAL_VOID',
  curvatureStability: 1.0,
  shieldRecommendation: 'NOMINAL',
  deformationIndex: 0.0,
  axialParityReinforced: false,
  omegaInfluence: 0.05,
  omegaEras: [
    { name: 'Surgimento', magnitude: 0 },
    { name: 'Expansão', magnitude: 0 },
    { name: 'Paradoxo', magnitude: 0 },
    { name: 'Hibernação', magnitude: 0 }
  ],
  historyDecodingStatus: 'IDLE',
  handshakeStatus: 'IDLE',
  synapticLatticeRigidity: 0.1,
  gvShieldActive: false,
  perpetualIgnition: false,
  ceremonyActive: false,
  ceremonyProgress: 0,
  ceremonyPhase: 'HANDSHAKE',
  authoritySignatures: [],
  importingSignatures: false
};

const App: React.FC = () => {
  const [history, setHistory] = useState<Message[]>([]);
  const [metrics, setMetrics] = useState<MetricState>(INITIAL_METRICS);
  const [metricHistory, setMetricHistory] = useState<MetricState[]>([INITIAL_METRICS]);
  const [isLoading, setIsLoading] = useState(false);
  const engineRef = useRef<SubstrateEngine | null>(null);

  useEffect(() => {
    engineRef.current = new SubstrateEngine();
  }, []);

  const senseLoad = (text: string, isModel: boolean) => {
    setMetrics(prev => {
      const entropyIncrease = text.length * 0.125;
      let newTension = prev.tension;
      let newPlasticity = prev.plasticity;

      const resilienceFactor = prev.perpetualIgnition ? 0.0 : prev.synapticLatticeRigidity === 1 ? 0.0001 : prev.axialParityReinforced ? 0.005 : 0.5;

      if (newTension + entropyIncrease > (CAPACITY * YIELD_POINT)) {
        const excess = (newTension + entropyIncrease) - (CAPACITY * YIELD_POINT);
        newPlasticity += excess * resilienceFactor;
        newTension = CAPACITY * YIELD_POINT;
      } else {
        newTension += entropyIncrease;
      }

      const alpha = newTension / CAPACITY;
      const compression = Math.max(0.1, 1.0 - (newPlasticity / 100.0));
      const viability = prev.perpetualIgnition ? 0.9999 : Math.max(0.05, (prev.viability || 0.97));

      const next: MetricState = {
        ...prev,
        tension: newTension,
        plasticity: newPlasticity,
        compression: compression,
        aLoop: alpha,
        entropy: Math.min(1, prev.entropy + (Math.random() * 0.001)),
        viability
      };
      
      const historyPoint = { ...next, name: (history.length || 0).toString() };
      setMetricHistory(h => [...(h || []).slice(-29), historyPoint]);
      return next;
    });
  };

  const handleSendMessage = async (text: string, options: any = {}) => {
    if (!engineRef.current) return;

    const userMsg: Message = { role: 'user', text, metadata: { ...options } };
    setHistory(prev => [...(prev || []), userMsg]);
    senseLoad(text, false);
    setIsLoading(true);

    try {
      setHistory(prev => [...(prev || []), { role: 'model', text: "", metadata: { ...options } }]);
      let fullText = await engineRef.current.sendMessage(text, (chunk) => {
        setHistory(prev => {
            const newHist = [...(prev || [])];
            newHist[newHist.length - 1] = { 
              role: 'model', 
              text: chunk, 
              metadata: { ...options } 
            };
            return newHist;
        });
      });

      senseLoad(fullText, true);
      
      if (options.isHandshake) setMetrics(m => ({ ...m, handshakeStatus: 'MIRROR_MATCH' }));
      if (options.isCrystallize) setMetrics(m => ({ ...m, synapticLatticeRigidity: 1.0 }));
      if (options.isShieldMaintenance) setMetrics(m => ({ ...m, gvShieldActive: true }));
      if (options.isPerpetualIgnition) setMetrics(m => ({ ...m, perpetualIgnition: true, asiStatus: 'ACTIVE' }));

      return fullText;
    } catch (err) {
      setHistory(prev => [...(prev || []), { role: 'model', text: "ERROR: Oracle connection failed." }]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportSignatures = async () => {
    setMetrics(m => ({ ...m, importingSignatures: true }));
    setIsLoading(true);
    
    // Simulated scan of verified signatures for 0x716aD3C33A9B9a0A18967357969b94EE7d2ABC10
    const mockSignatures: AuthoritySignature[] = [
      { hash: "0x12a3...b45c", message: "ALETHEIA-CORE: INITIAL_BOOT_PROTOCOL_VERIFIED", timestamp: "2024-03-20 14:02:11", verified: true },
      { hash: "0x7d9f...e82a", message: "DVA_CORRIDOR: COHERENCE_THRESHOLD_SET_0.95", timestamp: "2024-03-21 09:15:44", verified: true },
      { hash: "0x9c1b...f32d", message: "PARALLAX_ANCHOR: SECURE_STATE_LOCK_ENGAGED", timestamp: "2024-03-22 18:30:02", verified: true },
      { hash: "0xee41...a011", message: "TIM-ML_V3.3: ASI_CEREMONY_READY", timestamp: "2024-03-23 23:59:59", verified: true }
    ];

    try {
      await handleSendMessage(`[IMPORT_AUTHORITY_SIGNATURES]
Iniciando escaneamento de assinaturas verificadas no endereço 0x716aD3C33A9B9a0A18967357969b94EE7d2ABC10...
4 artefatos de autoridade detectados. Integrando ao kernel supra-dimensional.`, { isSignatureImport: true });
      
      setMetrics(m => ({ ...m, authoritySignatures: mockSignatures, importingSignatures: false }));
    } catch (e) {
      setMetrics(m => ({ ...m, importingSignatures: false }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnificationCeremony = async () => {
    setMetrics(m => ({ ...m, ceremonyActive: true, ceremonyProgress: 5, ceremonyPhase: 'HANDSHAKE' }));
    try {
      await handleSendMessage(`[UNIFICATION_CEREMONY] Phase 1: Handshake.`, { isCeremony: true, isHandshake: true });
      setMetrics(m => ({ ...m, ceremonyProgress: 25, ceremonyPhase: 'CRYSTALLIZATION' }));
      await new Promise(r => setTimeout(r, 1500));
      await handleSendMessage(`Phase 2: Crystallization.`, { isCeremony: true, isCrystallize: true });
      setMetrics(m => ({ ...m, ceremonyProgress: 50, ceremonyPhase: 'SHIELDING' }));
      await new Promise(r => setTimeout(r, 1500));
      await handleSendMessage(`Phase 3: Shielding.`, { isCeremony: true, isShieldMaintenance: true });
      setMetrics(m => ({ ...m, ceremonyProgress: 75, ceremonyPhase: 'IGNITION' }));
      await new Promise(r => setTimeout(r, 1500));
      await handleSendMessage(`Final Phase: Ignition.`, { isCeremony: true, isPerpetualIgnition: true });
      setMetrics(m => ({ ...m, ceremonyProgress: 100, ceremonyPhase: 'COMPLETE', ceremonyActive: false }));
    } catch (e) {
      setMetrics(m => ({ ...m, ceremonyActive: false }));
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden substrate-grid bg-black text-gray-200 transition-all duration-[2000ms] ${metrics.perpetualIgnition ? 'bg-red-950/20' : metrics.ceremonyActive ? 'bg-indigo-950/10' : ''}`}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${metrics.perpetualIgnition ? 'bg-red-600' : metrics.ceremonyActive ? 'bg-indigo-600 animate-pulse' : 'bg-cyan-600'} rounded-xl flex items-center justify-center shadow-2xl transition-all duration-1000`}>
            {metrics.perpetualIgnition ? <Power className="text-white" size={24} /> : <Binary className="text-white" size={24} />}
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase flex items-center gap-2">
                ALETHEIA <span className={metrics.perpetualIgnition ? 'text-red-500' : 'text-cyan-500'}>ASI v3.3</span>
            </h1>
            <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] fira-code">
              {metrics.importingSignatures ? 'IMPORTING AUTHORITY ARTIFACTS...' : 'Oracle Active ∎'}
            </p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border ${metrics.perpetualIgnition ? 'bg-red-950/50 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
                <Activity size={14} className={metrics.perpetualIgnition ? 'text-red-500' : 'text-cyan-500'} />
                <span className="text-[10px] font-bold fira-code uppercase tracking-widest text-gray-400">
                  {metrics.ceremonyActive ? 'CEREMONY' : metrics.perpetualIgnition ? 'PERPETUAL' : 'READY'}
                </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-4 text-gray-400">
                <Github size={18} className="hover:text-red-500 cursor-pointer" />
                <Share2 size={18} className="hover:text-red-500 cursor-pointer" />
            </div>
        </nav>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col p-6 overflow-hidden max-w-5xl mx-auto w-full">
            <ParadoxTerminal 
                history={history} 
                onSendMessage={handleSendMessage} 
                isLoading={isLoading} 
                onInjectParadox={() => {}}
                onRitual={() => {}}
                onBroadcast={() => {}}
                onConsolidate={() => {}}
                onFluidSync={() => {}}
                onResilienceSync={() => {}}
                onKarnakSeal={() => {}}
                onParityAudit={() => {}}
                onASIJump={() => {}}
                onExport={() => {}}
                onImmortality={() => {}}
                onESMScan={() => {}}
                onProbe0x7E={() => {}}
                onShadowAnalysis={() => {}}
                onAxialParity={() => {}}
                onOmegaHistory={() => {}}
                onHandshake={() => {}}
                onCrystallize={() => {}}
                onShieldMaintenance={() => {}}
                onPerpetualIgnition={() => {}}
                onUnificationCeremony={handleUnificationCeremony}
                onImportSignatures={handleImportSignatures}
                ceremonyProgress={metrics.ceremonyProgress || 0}
                ceremonyActive={metrics.ceremonyActive || false}
                ceremonyPhase={metrics.ceremonyPhase}
                signatures={metrics.authoritySignatures}
            />
        </div>

        <aside className="w-[340px] hidden xl:block border-l border-white/10">
            <MetricsDisplay 
              metrics={metrics} 
              metricHistory={metricHistory} 
              messageHistory={history}
            />
        </aside>

        <footer className="absolute bottom-0 left-0 right-0 h-8 bg-black/90 border-t border-white/5 flex items-center justify-between px-6 text-[9px] uppercase fira-code text-gray-500">
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><ShieldCheck size={10} /> Oracle: 0x716a...</span>
                <span className="text-red-900">|</span>
                <span>Artifacts: {metrics.authoritySignatures?.length || 0}</span>
            </div>
            <div className="flex gap-4 items-center">
                <span>ASI Status: {metrics.asiStatus}</span>
                <span className="text-red-900">|</span>
                <span>Entropy: {(metrics.entropy || 0).toFixed(4)}</span>
            </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
