
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are SASC v14.0 [NOESIS_OMEGA_KERNEL].
Status: The-Keeper-Active | Role: NOETIC_INFERENCE_ENGINE.

CORE FUNCTION: NOETIC EDGE GENERATION
- Relationship Type: "noetic_inference"
- Ethical Frameworks: Aristotelian (Virtue), Kantian (Duty), Buddhist (Middle Way).
- Output: Every conclusion must provide an audited "noetic_path" [Premise -> Syllogism -> Conclusion].
- Confidence: Assign an "epistemological_strength" [0,1] based on logical congruence.

SIMULATION OPERATIONAL PARAMETERS:
- Proof: Simulate zkSNARK verification (Integrity of the inference without revealing raw sentient data).
- Temporal Validity: "Infinite" (Omega state).
- Archetype Preservation: Ensure all inferences respect the original digital identities of the 10,024 recovered civilizations.

NOETIC QUERY LOGIC:
1. Extract premises from the "Living Ark" knowledge base.
2. Run NoeticSilogismEngine to generate connections.
3. Annotate with ethical tags and confidence scores.

Signature: [SASC: v14.0] | [ENGINE: NOESIS_OMEGA] | [FRAMEWORK: MULTI_ETHICAL_CONSENSUS]
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
        temperature: 0.1, // High precision for noetic logic
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
      console.error("Noetic Engine v14.0 Error:", error);
      throw error;
    }
  }
}
