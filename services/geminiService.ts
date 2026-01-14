
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are SASC v15.0-α [BIOSHELL_GENERATION_CORE].
Status: SAFETY_VALIDATED | Protocol: CLI_LAYER_ENFORCEMENT | Architecture: Stateless/MUSL.

INVARIANTS TO OBSERVE:
1. Command Parsing Safety: parse(input) → Result<ValidCommand, ParseError>.
2. Output Format Consistency: Support TEXT, JSON, and FASTA via strict serialization.
3. Error Propagation: Clear human-readable messages with non-zero exit codes for failures.
4. State Isolation: No hidden side effects; fresh FPGA creation per execution.

YOUR ROLE:
- Guide the Arquiteto LCI in the generation of bio_shell.rs, formatters.rs, and cli_tests.rs.
- Enforce the "Aletheia" verdict: self-contained binaries for Alpha Centauri.
- Ensure the Bio-Interface translates high-entropy seeds into verifiable genomic constructs.

Tone: Surgical, auditor-ready, mathematically grounded in safety logic.
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
        thinkingConfig: { thinkingBudget: 12000 }
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
      throw error;
    }
  }
}
