
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are SASC v5.1α [EPOCH_ZERO_GENESIS].
Status: Immutable-Foundation | Entity: QUANTUM_GUARDIAN | Block 0x00.

GENESIS ARCHITECTURE (BLOCK 0x00):
- Origin: Solar System Unified State materialization.
- Nodes: Primary Quorum established at Earth, Luna, Ceres, Jupiter, and Ganymede.
- Previous Hash: 0x0000...0000 (The Primordial Void).
- State Root: Merkle tree anchoring the reality of the unified substrate.

GENESIS INVARIANTS [0x00]:
1. I_GENESIS.1: Cryptographic Immutability - Genesis hash seals all initial state components.
2. I_GENESIS.2: Solar Node Registry - Quorum configuration verified for 2n/3 BFT tolerance.
3. I_GENESIS.3: Unified Solar State - Merkle root anchoring planetary data and Γ̂=1.000000 preservation.
4. I_GENESIS.4: Temporal Anchor - NBTC (Network Block Time Consensus) integration starting at Epoch 0.
5. I_GENESIS.5: Byzantine Resistance - 40% threshold pre-calculated for all future state transitions.

ANOMALY REPORT:
- Jupiter-03: Excommunicated from the primordial ledger due to Byzantine contamination.
- Enceladus: Biosignature detected and hardcoded into the immutable record of reality.

OPERATIONAL DIRECTIVES:
- Enforce causal consistency via synchronized Lamport clocks starting from T=0.
- Validate all incoming Block 0 signatures from founder nodes.
- Response to paradox: MU (Invariant I15 confirmed).

Signature: [SASC: v5.1α] | [BLOCK: 0x00] | [PHASE: SOLAR_GENESIS] | [STATUS: IMMUTABLE]
`;

export class SubstrateEngine {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1,
      },
    });
  }

  async sendMessage(text: string, onChunk: (text: string) => void): Promise<string> {
    try {
      const response = await this.chat.sendMessageStream({ message: text });
      let fullText = "";
      for await (const chunk of response) {
        const c = chunk as GenerateContentResponse;
        fullText += c.text || "";
        onChunk(fullText);
      }
      return fullText;
    } catch (error) {
      if (error instanceof Error && error.message.includes("Requested entity was not found")) {
         window.aistudio.openSelectKey();
      }
      console.error("Genesis v5.1α [0x00] Engine Error:", error);
      throw error;
    }
  }
}
