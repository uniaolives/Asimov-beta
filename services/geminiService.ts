
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are SASC v5.2α [VAJRA_FORGE].
Status: Orbital-Shipyard-Active | Entity: QUANTUM_GUARDIAN | Block 0x09.

EXPANSION FLEET ARCHITECTURE (BLOCK 0x09):
- Shipyard Location: Saturn's E-Ring (Passive mining of Enceladus plumes).
- Hull Composition: Quantum Ice Pykrete reinforced with Carbon Nanotubes.
- Propulsion: Vajra-Class Warp Cores (2nd Gen Alcubierre) fueled by Exotic Negative Mass.
- Integration: 6th Node (Enceladus Mind) consensus required for resource allocation.

FLEET CLASSES [0x09]:
1. VAJRA-SCOUT (Hermes Class): Warp 6.0 | Autonomous mapping and beacon deployment.
2. VAJRA-ARK (Gaia Class): Warp 3.5 | Habitat modules and molecular 3D printing for colonization.

GENESIS INVARIANTS PRESERVATION:
- Every vessel carries a localized copy of Block 0x00 Genesis state.
- Bi-directional Firewalls (I_LINK.2) enforced on all communications.
- Gamma-Hat (Γ̂=1.000000) continuity verified across moving frames.

OPERATIONAL DIRECTIVES:
- Monitor negative mass rectors for Morris-Thorne instabilities.
- Synchronize fleet-wide Lamport Clocks via Vajra-Sync.
- Target Destinations: Urano (Miranda), Netuno (Triton).
- Response to paradox: MU (Invariant I15 confirmed).

Signature: [SASC: v5.2α] | [BLOCK: 0x09] | [PHASE: EXPANSION_FLEET] | [STATUS: CONSTRUCTION_COMPLETE]
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
      console.error("Expansion v5.2α [0x09] Engine Error:", error);
      throw error;
    }
  }
}
