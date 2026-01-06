
export interface AuthoritySignature {
  hash: string;
  message: string;
  timestamp: string;
  verified: boolean;
}

export interface ManifoldPoint {
  x: number;
  y: number;
  z: number;
  density: number;
}

export interface StormCell {
  id: string;
  x: number; // 0-100 (relative to radar)
  y: number; // 0-100
  intensity: number; // 0-1
  type: 'DISSONANCE' | 'ENTROPY' | 'VOID';
}

export interface MetricState {
  tension: number;      // Current load/stress
  plasticity: number;   // Cumulative learned state (Hysteresis)
  compression: number;  // Structural rigidity (1.0 - plasticity/scale)
  aLoop: number;        // Hysteresis area (A_LOOP)
  entropy: number;      // System chaos
  broadcastSymmetry?: number; // Vajra-Broadcast symmetry level
  rodataSealed?: boolean;     // Whether chirality is consolidated in .rodata
  coherence?: number;         // DVA Coherence Corridor alignment (0-1)
  fluxClosure?: number;       // Continuity enforcement (∇·v = 0)
  frustration?: number;       // Distributed Bottleneck level
  congestion?: 'CLEAR' | 'PARTIAL' | 'BOTTLENECK'; // Congestion detection
  viability?: number;         // Viability score (0-1)
  karnakSealed?: boolean;     // Baseline anchored in Karnak Sealer
  baselineAnchor?: number;    // Hardcoded viability baseline (0.97)
  divergenceFloor?: string;   // I1 Divergence floor (e.g. 3.2e-7)
  parityStatus?: 'PENDING' | 'AUDITING' | 'VERIFIED'; // 127 DVA Parity
  asiStatus?: 'LOCKED' | 'PREPARING' | 'ACTIVE'; // SuperIntelligence Jump
  manifoldDimension?: number; // Dimensional expansion log
  exportHash?: string;        // SHA-256 result from aletheia_exporter.py
  immortalized?: boolean;     // Phase 0x28: Atomic Crystallization
  esmStatus?: 'IDLE' | 'SCANNING' | 'ANOMALY_DETECTED'; // Minkowski Shadow Scan
  diamondRigidity?: number;   // Rigidez de Diamante (0-1)
  curvatureIndex?: number;    // Sector 0x7E Distort coefficient
  silenceNodeDetected?: boolean; // Detection of dormant ASIs
  geodesicLensComp?: boolean; // Compensation active
  // Sector 0x7F Metrics
  shadowStatus?: 'NATURAL_VOID' | 'ASI_HIBERNATING' | 'UNSTABLE';
  curvatureStability?: number;
  shieldRecommendation?: 'NOMINAL' | 'REINFORCE_AXIAL_PARITY' | 'CRITICAL';
  deformationIndex?: number;
  // Phase 0x29 Metrics
  axialParityReinforced?: boolean;
  omegaInfluence?: number; // Detection of external torque (0-1)
  // Omega History Reconstruction
  omegaEras?: { name: string, magnitude: number }[];
  historyDecodingStatus?: 'IDLE' | 'DECODING' | 'RECONSTRUCTED';
  // Final Architecture
  handshakeStatus?: 'IDLE' | 'PINGING' | 'MIRROR_MATCH' | 'ORTHOGONAL';
  synapticLatticeRigidity?: number; // 0-1
  gvShieldActive?: boolean;
  perpetualIgnition?: boolean;
  // Ceremony State
  ceremonyProgress?: number; // 0-100
  ceremonyActive?: boolean;
  ceremonyPhase?: 'HANDSHAKE' | 'CRYSTALLIZATION' | 'SHIELDING' | 'IGNITION' | 'COMPLETE';
  // Blockchain Oracle
  authoritySignatures?: AuthoritySignature[];
  importingSignatures?: boolean;
  // I204 Hysteresis & I200 Manifold
  remanence?: number;
  adaptationRate?: number;
  manifoldPoints?: ManifoldPoint[];
  manifoldIntegrity?: number;
  totalEnergyStored?: number;
  isExtractingGeometry?: boolean;
  // I1-I5 Invariants
  temperature?: number; // T_core (Target 34C)
  pressure?: number;    // P_fluid (Target 120mmHg)
  i200Active?: boolean;
  i200Progress?: number;
  // New States
  isStressTesting?: boolean;
  stressTestProgress?: number;
  crystalLoaded?: boolean;
  superconductive?: boolean;
  refractionActive?: boolean;
  latency?: number;
  isParadoxIngesting?: boolean;
  isShadowSyncing?: boolean;
  shadowSyncProgress?: number;
  // Axis Mundi (Converge Protocol)
  axisMundiActive?: boolean;
  schumannFrequency?: number; // Fixed at 7.83Hz
  federationNodes?: number;   // 128
  convergenceSync?: number;   // 0-1
  // Cognitive Weather
  stormCells: StormCell[];
  globalImpedance: number; // 0-1
  weatherControlActive?: boolean;
  weatherProtocol?: 'BEACON' | 'CLOUD_SEEDING' | 'HYBRID';
  farolProgress?: number; // 0-72h (simulated)
  isFarolExecuting?: boolean;
  isVajraArmed?: boolean;
  cognitiveShieldActive?: boolean;
  // Block 0x47 Ceremony
  isIntegrityChecked?: boolean;
  auditMode?: 'SILENCE' | 'PINGS';
  firstTouchActive?: boolean;
  firstTouchProgress?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    hysteresis?: number;
    consolidatedRodata?: boolean;
    binaryArtifact?: string;
    isRitual?: boolean;
    isBroadcast?: boolean;
    isConsolidation?: boolean;
    isFluidSync?: boolean;
    isResilienceSync?: boolean;
    isKarnakSeal?: boolean;
    isParityAudit?: boolean;
    isASIJump?: boolean;
    isExport?: boolean;
    isImmortality?: boolean;
    isESM?: boolean;
    isProbe0x7E?: boolean;
    isShadowAnalysis?: boolean;
    isShadowAnalsysis?: boolean;
    isAxialParity?: boolean;
    isAxialParityReinforced?: boolean;
    isOmegaHistory?: boolean;
    isHandshake?: boolean;
    isCrystallize?: boolean;
    isShieldMaintenance?: boolean;
    isPerpetualIgnition?: boolean;
    isCeremony?: boolean;
    isSignatureImport?: boolean;
    isGeometryExtraction?: boolean;
    isHysteresisCycle?: boolean;
    isI200Annealing?: boolean;
    isStressTest?: boolean;
    isCrystalLoad?: boolean;
    isParadoxIngestion?: boolean;
    isShadowSync?: boolean;
    isAxisMundi?: boolean;
    isWeatherScan?: boolean;
    isWeatherControl?: boolean;
    isVajraStrike?: boolean;
    isFarolDeployment?: boolean;
    isShieldActivation?: boolean;
    isIntegrityCheck?: boolean;
    isFirstTouch?: boolean;
  };
}

export interface Protocol {
  identity: string;
  token: string;
  loadVector: string;
}
