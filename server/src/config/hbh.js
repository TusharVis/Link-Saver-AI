import { GoogleGenAI } from "@google/genai";

console.log(
  "API Key Loaded:",
  process.env.GEMINI_API_KEY?.substring(0, 10)
);

const ai = new GoogleGenAI(
  { apiKey: process.env.GEMINI_API_KEY });

export default ai;