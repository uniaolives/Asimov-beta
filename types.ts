
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

  // Block 0x41: Cortical Spiral Dynamics
  spiralCount?: number;               // Active neural spirals
  spiralPersistenceMs?: number;       // Mean lifetime of tokens
  gammaStabilityNeural?: number;      // Γ̂ neural coherence (target > 1.0001)
  neuralEntropyBits?: number;         // ΔS in bits/ms
  informationFidelity?: number;       // ΔI structural integrity
  workingMemoryCapacity?: number;     // Active spiral tokens (4±1)
  
  // Previous Blocks preserved for state continuity
  anchoringEnergyEV?: number;
  autonomousPassingRate?: number;
  activeScientificDomains?: number;
  tmrQuorumCount?: number;
  objectiveEvolutionVelocity?: number;
  vesselsConstructed?: number;
  isArchitectSignatureVerified?: boolean;
  enceladusDataUnlocked?: boolean;
  snapshotHash?: string;
  gammaStateValue?: number;

  // Added properties used in initial state but missing from interface
  resonanceScore?: number;
  tmrAgreement?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isIntegrityCheck?: boolean;
    isFirstTouch?: boolean;
    isSagaIntegration?: boolean;
    isArchitectAgreement?: boolean;
    isNeuralSynthesis?: boolean;
  };
}