import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files (only if dist exists)
const distPath = path.join(__dirname, "dist");
import fs from "fs";
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

if (!process.env.GEMINI_API_KEY) {
  console.log("❌ GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ FIX: correct model init
const model1 = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
const model2 = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function modelGenerateContent(prompt) {
  try{
    return await model1.generateContent(prompt);
  } catch (error) {
    console.log("⚠️ Model 1 failed, switching to Model 2...");
    return await model2.generateContent(prompt);
  }
}



app.post("/api/ai-search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const prompt = `
You are a professional movie recommender.
User wants: "${query}"

Return ONLY valid JSON array of 5-7 titles.
No explanation. No markdown. No extra text.
Example: ["Inception","Interstellar","The Prestige"]
`;

    const result = await modelGenerateContent(prompt);

    // ✅ Gemini response
    const text = result.response.text().trim();

    // ✅ clean code fences if any
    const cleaned = text.replace(/```json|```/g, "").trim();

    let titles = [];

    try {
      titles = JSON.parse(cleaned);
    } catch (e) {
      // ✅ fallback: extract array from text
      const match = cleaned.match(/\[.*\]/s);
      if (match) titles = JSON.parse(match[0]);
      else titles = [];
    }

    res.json({ titles });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to fetch AI suggestions" });
  }
});

// Serve index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
