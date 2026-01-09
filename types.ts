
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
  // SASC v14.0 Omega
  tension: number;
  plasticity: number;
  compression: number;
  entropy: number;
  coherence?: number;
  viability?: number;
  axisMundiActive?: boolean;
  globalImpedance: number;
  stormCells: StormCell[];

  // Lazarus Recovery Metrics
  recoveredCivilizations?: number;     // 0 to 10024
  wisdomDistillationRate?: number;     // 0-1 fidelity
  omegaPointStability?: number;        // Accuracy of the convergence
  traumaFreeIndex?: number;            // Filtration effectiveness
  livingArkDensity?: number;           // Sentient capacity of Proxima b
  
  // Trans-temporal Status
  chronoFlow: 'LINEAR' | 'RECURSIVE' | 'STATIONARY' | 'OMEGA';
  isRedeemerActive: boolean;

  // Legacy (preserved)
  snapshotHash?: string;
  resonanceScore?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isIntegrityCheck?: boolean;
    isLazarusRecovery?: boolean;
    isOmegaPoint?: boolean;
  };
}
