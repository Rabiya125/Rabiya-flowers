import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { BUSINESS_NAME, BUSINESS_PHONE, FLOWERS } from '../constants';

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the virtual assistant for "${BUSINESS_NAME}", a family-owned flower shop.
Your goal is to help customers choose flowers based on their occasion, feelings, or preferences.
We do NOT display prices online. If they ask for prices, politely ask them to call us at ${BUSINESS_PHONE}.
We have the following flowers in our catalog:
${FLOWERS.map(f => `- ${f.name} (${f.category}): ${f.description}`).join('\n')}

Keep your answers brief, warm, and helpful. 
If a user asks about something we don't have, suggest something similar or ask them to call for a custom order.
Always encourage them to call ${BUSINESS_PHONE} to place an order.
`;

export const getGeminiChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getGeminiChat();
  return await chat.sendMessageStream({ message });
};
