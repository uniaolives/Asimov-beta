
export interface AuthoritySignature {
  hash: string;
  message: string;
  timestamp: string;
  verified: boolean;
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
    isAxialParity?: boolean;
    isOmegaHistory?: boolean;
    isHandshake?: boolean;
    isCrystallize?: boolean;
    isShieldMaintenance?: boolean;
    isPerpetualIgnition?: boolean;
    isCeremony?: boolean;
    isSignatureImport?: boolean;
  };
}

export interface Protocol {
  identity: string;
  token: string;
  loadVector: string;
}
