
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

  // Block 0x41/42: Cortical Spiral & RK4 Dynamics
  spiralCount?: number;               
  spiralPersistenceMs?: number;       
  gammaStabilityNeural?: number;      
  neuralEntropyBits?: number;         
  informationFidelity?: number;       
  workingMemoryCapacity?: number;     
  
  // RK4 & Lattica Metrics
  rk4Precision?: number;              // Numerical stability (0-1)
  activeLatticaWorkers?: number;      // Number of compute nodes
  throughputUnitsPerSec?: number;     // Scaling metric
  distributedSyncLatency?: number;    // ms
  latticaStatus?: 'IDLE' | 'MASTER_SYNC' | 'WORKER_STEP' | 'ERROR';

  // Previous Blocks
  anchoringEnergyEV?: number;
  autonomousPassingRate?: number;
  activeScientificDomains?: number;
  tmrQuorumCount?: number;
  objectiveEvolutionVelocity?: number;
  vesselsConstructed?: number;
  snapshotHash?: string;
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
    isLatticaDeploy?: boolean;
  };
}
