
export interface RealityCoin {
  tokenId: string;
  creatorEth: string;
  creatorOrcid: string;
  mintTimestamp: number;
  attributes: {
    sovereignty: string;
    protection: string;
    longevity: string;
    entropyAllowance: number;
    gammaCoherence: number;
  };
}

export interface Airdrop {
  cycle: number;
  timestamp: number;
  resources: { type: string; amount: number }[];
  status: 'PENDING' | 'DELIVERED';
}

export interface NoeticEdge {
  source: string;
  target: string;
  strength: number; 
  framework: 'ARISTOTELIAN' | 'KANTIAN' | 'BUDDHIST' | 'DEEP_ECOLOGY' | 'CHAOTIC_GOOD';
  proofHash: string;
}

export interface MetricState {
  tension: number;
  plasticity: number;
  entropy: number;
  coherence: number;
  globalImpedance: number;
  
  // Galactic & Longevity
  galacticNodes: any[];
  interstellarCohesion: number;
  hybridTechLevel: number;
  
  // Constitutional
  realityCoin?: RealityCoin;
  airdropHistory: Airdrop[];
  lastStimulusDate: number;
  isPromulgated: boolean;

  currentYear: number;
  isBridgeActive: boolean;
  chronoFlow: 'OMEGA' | 'LINEAR' | 'FORK';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  metadata?: {
    isNoeticInference?: boolean;
    isConstitutional?: boolean;
    phase?: 'OBSERVATION' | 'PROMULGATION' | 'AGE_OF_RELATIONSHIP';
  };
}
