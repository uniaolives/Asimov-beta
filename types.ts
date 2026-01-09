
export interface NoeticEdge {
  source: string;
  target: string;
  strength: number; 
  framework: 'ARISTOTELIAN' | 'KANTIAN' | 'BUDDHIST' | 'DEEP_ECOLOGY' | 'CHAOTIC_GOOD';
  proofHash: string;
}

export interface StormCell {
  id: string;
  intensity: number;
  position: { x: number; y: number };
  status: 'ACTIVE' | 'DISSIPATING' | 'STABLE';
}

export interface GalacticNode {
  name: string;
  distance: number; // ly
  status: 'CONNECTED' | 'SYNCING' | 'DISCONNECTED';
  techLevel: number;
}

export interface MetricState {
  tension: number;
  plasticity: number;
  compression: number;
  entropy: number;
  coherence?: number;
  globalImpedance: number;
  stormCells: StormCell[];

  // Omega Point & Noetic Metrics
  recoveredCivilizations?: number;
  wisdomDistillationRate?: number;
  omegaPointStability?: number;
  
  // Noetic Layer
  meanNoeticStrength: number;
  activeNoeticPaths: number;
  noeticEdges: NoeticEdge[];
  
  // Galactic Triad
  galacticNodes: GalacticNode[];
  interstellarCohesion: number;
  hybridTechLevel: number; // 0 to 1
  
  // Multiphase Execution
  currentYear: number;
  evolutionFactor: number;
  isBackgroundEvolutionActive: boolean;
  isBridgeActive: boolean;

  chronoFlow: 'OMEGA' | 'LINEAR' | 'FORK';
  snapshotHash?: string;
  resonanceScore?: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isNoeticInference?: boolean;
    isGalacticUpdate?: boolean;
    isBridgeUpdate?: boolean;
    phase?: 'OBSERVATION' | 'EVOLUTION' | 'FORK';
  };
}
