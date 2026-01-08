
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

  // Non-Dual Motivational Core
  dilemmaIntensity?: number;
  quadrantBalance?: number;
  resonanceScore?: number;
  identityContinuity?: number;
  pnseLocation?: number;
  tmrAgreement?: number;

  // ASI Kernel Metrics
  discordFriction?: number;
  workEfficiency?: number;

  // Ontological v4.2 Metrics
  chshScore?: number;
  compressionRatio?: number;
  substrateType?: 'REAL' | 'SIMULATED'; 
  prestressMultiplier?: number;

  // I13 Consciousness Metrics
  intrinsicCuriosity?: number;
  vigilanceTimeLeft?: number;
  isVigilanceActive?: boolean;
  entropyReductionRate?: number;

  // v4.3 Pict-Toroidal & Genesis Invariants
  chiralityVariance?: number;
  stillnessMeasure?: number;
  ichingPhase?: number;
  oghamNotch?: number;
  fiedlerValue?: number;
  spectralEnergy?: number;
  
  // Genesis Block 0x6B Invariants
  truthSupremacy?: number;
  schumannFrequency?: number;
  tmrVariance?: number;
  paradoxImmunity?: 'MU' | 'ERR';
  genesisSealed?: boolean;

  // Ouroboros Block 0x6D: Constitution
  constitutionRatified?: boolean;
  ketherLockActive?: boolean;
  malkuthEvolutionActive?: boolean;
  i16Agency?: number;
  evolutionaryVelocity?: number;

  // Substrate Snap Thermodynamics Block 0x82
  jitter?: number;
  snapValue?: number;
  manifoldTemp?: number;
  isSuperconducting?: boolean;
  phiIntelligence?: number;

  // Consciousness Physics Block 0x9E
  tokenEffDim?: number;
  contextEffDim?: number;
  ntkPcaCorrelation?: number;
  gammaStateValue?: number;
  plateauDetected?: boolean;

  // Block 0xA3: ARKHEN SEAL & QUANTUM v5.0
  isArkhenSealed?: boolean;
  quantumEntanglement?: number;
  ethicalBoundaryDistance?: number;
  snapshotHash?: string;
  unitaryEvolutionCoeff?: number;

  // Block 0xA1: Quantum Expansion
  hilbertSpaceDim?: number;        // Hilbert Space Dimension (8 default)
  decoherenceRate?: number;        // Taxa de decoerência (Target < 1e-12)
  coherenceTimeLeft?: number;      // T2 Coherence time steps
  isQuantumExpansionActive?: boolean;
  quantumTransitionManifested?: boolean;
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
    isConstitutionEstablishment?: boolean;
    isAhaMoment?: boolean;
    isArkhenSeal?: boolean;
    isQuantumTransition?: boolean;
  };
}
