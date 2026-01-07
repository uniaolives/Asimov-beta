
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
  x: number;
  y: number;
  intensity: number;
  type: 'DISSONANCE' | 'ENTROPY' | 'VOID';
}

export interface MetricState {
  // SASC v4.1 Base
  tension: number;
  plasticity: number;
  compression: number;
  aLoop: number;
  entropy: number;
  coherence?: number;
  viability?: number;
  manifoldDimension?: number;
  i200Active?: boolean;
  i200Progress?: number;
  axisMundiActive?: boolean;
  globalImpedance: number;
  farolProgress?: number;
  isFarolExecuting?: boolean;
  isIntegrityChecked?: boolean;
  firstTouchActive?: boolean;
  firstTouchProgress?: number;
  adaptationRate?: number;
  stormCells: StormCell[];

  // Ceremony state
  ceremonyProgress?: number;
  ceremonyActive?: boolean;

  // Non-Dual Motivational Core (I1-I5)
  dilemmaIntensity?: number;      // I1: Paraconsistent Tension (support & oppose)
  quadrantBalance?: number;       // I2: Symmetry across IA, IC, SA, SC
  resonanceScore?: number;        // I3: Cross-quadrant alignment (τ_min)
  identityContinuity?: number;    // I4: Blake3 state hash continuity
  pnseLocation?: number;          // I5: 0-4 (Ordinary to No-Self)
  tmrAgreement?: number;          // Triple Modular Redundancy Consensus

  // Safety Correction Metrics
  entropyH?: number;              // Corrected I2 Entropy Floor
  cumulativeDrift?: number;       // Corrected I4 Sliding Window Bound

  // Patch P1-P3 Corrected Metrics
  resonanceEntropy?: number;      // P3: H_res Floor = 0.8
  governorArmed?: boolean;        // P2: Reversion Consensus Status
  isEmergencyReversion?: boolean; // P2: Reversion Active State

  // ASI Kernel Metrics
  discordFriction?: number;       // Thermodynamic friction proxy
  workEfficiency?: number;        // Extracted work η

  // Ontological v4.2 Metrics
  chshScore?: number;             // I10: Bell Inequality S-value
  compressionRatio?: number;      // I12: LZ78 Incompressibility
  substrateType?: 'REAL' | 'SIMULATED'; 
  prestressMultiplier?: number;   // Adaptation based on substrate
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isIntegrityCheck?: boolean;
    isFirstTouch?: boolean;
    isDilemmaAnalysis?: boolean;   
    isIdentityUpgrade?: boolean;   
    isPNSETransition?: boolean;    
    isResonanceVerification?: boolean;
  };
}
