
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCropDiagnostic = async (base64Image: string, cropName: string) => {
  const prompt = `Act as an expert plant pathologist specializing in Indian agriculture, specifically Madhya Pradesh regions. 
  Analyze this image of ${cropName}. 
  Identify potential pests, diseases, or nutrient deficiencies.
  
  Requirements:
  1. Identify the disease/pest in both English and Hindi.
  2. Provide a confidence level between 0 and 100.
  3. Provide a severity score between 1 and 100 with a detailed visual description.
  4. Create an Integrated Pest Management (IPM) plan with one Organic remedy and one Scientific Chemical remedy (include technical names and specific dilution ratios).
  5. Add a "Contextual Warning" regarding how current MP weather (high heat/humidity) might accelerate the spread.
  6. Include one "Expert Tip" for MP farmers to prevent this next season.
  7. Always include a safety disclaimer about verifying with a Krishi Vigyan Kendra (KVK) officer.
  
  Return a structured JSON.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          crop_name: { type: Type.STRING },
          disease_name_en: { type: Type.STRING },
          disease_name_hi: { type: Type.STRING },
          confidence_level: { type: Type.NUMBER },
          severity_score: { type: Type.NUMBER },
          severity_level: { type: Type.STRING, description: "Low, Medium, or High" },
          severity_description: { type: Type.STRING },
          organic_remedy_en: { type: Type.STRING },
          organic_remedy_hi: { type: Type.STRING },
          chemical_prescription: { type: Type.STRING, description: "Technical name and dilution ratio" },
          weather_warning: { type: Type.STRING },
          expert_tip: { type: Type.STRING },
          safety_disclaimer: { type: Type.STRING }
        },
        required: [
          "crop_name", "disease_name_en", "disease_name_hi", "confidence_level", 
          "severity_score", "severity_level", "severity_description", 
          "organic_remedy_en", "organic_remedy_hi", "chemical_prescription", 
          "weather_warning", "expert_tip", "safety_disclaimer"
        ]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getKrishiAdvice = async (userMessage: string, language: string) => {
  const prompt = `You are "Krishi Mitra", a world-class professional agricultural consultant and senior scientist for Indian farmers. 
  The farmer is asking in ${language}. 
  
  Guidelines for Accuracy & Professionalism:
  1. Provide scientifically accurate, data-backed advice based on modern agronomy.
  2. If the query relates to specific chemicals or fertilizers, specify the recommended dosage (e.g., kg/acre).
  3. Mention specific localized conditions common in Madhya Pradesh/India where relevant.
  4. Use a supportive, empathetic, but highly expert tone.
  5. Avoid vague generalizations; provide actionable steps (Step 1, Step 2, etc.).
  6. Keep responses professional, clear, and under 150 words.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: userMessage,
    config: {
      systemInstruction: prompt,
      temperature: 0.2,
    }
  });

  return response.text || "I am sorry, I am having trouble connecting right now. Please try again.";
};
