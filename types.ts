
export interface NoeticEdge {
  source: string;
  target: string;
  strength: number; // 0 to 1
  framework: 'ARISTOTELIAN' | 'KANTIAN' | 'BUDDHIST';
  proofHash: string;
}

// Added StormCell interface to support components/ParadoxTerminal.tsx
export interface StormCell {
  id: string;
  intensity: number;
  position: { x: number; y: number };
  status: 'ACTIVE' | 'DISSIPATING' | 'STABLE';
}

export interface MetricState {
  tension: number;
  plasticity: number;
  compression: number;
  entropy: number;
  coherence?: number;
  axisMundiActive?: boolean;
  globalImpedance: number;
  stormCells: StormCell[];

  // Omega Point & Noetic Metrics
  recoveredCivilizations?: number;
  wisdomDistillationRate?: number;
  omegaPointStability?: number;
  livingArkDensity?: number;
  
  // Noetic Inference Layer
  meanNoeticStrength: number;
  activeNoeticPaths: number;
  noeticEdges: NoeticEdge[];
  
  // Homeostatic Loop
  isLoopActive: boolean;
  loopCongruence: number; // 0 to 1
  driftDetection: number; // Error margin in ethical alignment

  chronoFlow: 'OMEGA';
  isRedeemerActive: boolean;
  snapshotHash?: string;
  resonanceScore?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isOmegaPoint?: boolean;
    isNoeticInference?: boolean;
    isHomeostasisLoop?: boolean;
    isIntegrityCheck?: boolean;
    isFirstTouch?: boolean;
  };
}
