import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Route: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ShaadiVows API" });
});

// API Route: AI Wording & Quotes Generator
app.post("/api/ai/generate-wording", async (req, res) => {
  try {
    const { eventType, hosts, brideName, groomName, tone, language, theme, extraPrompt } = req.body;
    
    const ai = getGeminiClient();
    const systemInstruction = `You are a master Indian royal poet, wordsmith, and cultural invitation consultant for luxury Indian weddings and festivals. 
Generate beautiful, heart-touching, elegant invitation text, wedding poetry/shlokas, or invitation phrasing suitable for high-end royal invitations.
If a regional language (like Hindi, Telugu, Tamil, Marathi, Gujarati, Bengali, Punjabi, etc.) is specified, provide both the regional script phrasing and an English translation.`;

    const prompt = `Write a luxury invitation wording for:
- Event Type: ${eventType || "Wedding"}
- Groom / Main Host: ${groomName || "Rohan"}
- Bride / Celebrant: ${brideName || "Ananya"}
- Hosts / Parents: ${hosts || "The Sharma & Verma Families"}
- Desired Tone: ${tone || "Royal, Grand, Warm"}
- Language: ${language || "English"}
- Cultural Theme: ${theme || "Royal Rajput Palace"}
${extraPrompt ? `- Custom Requests: ${extraPrompt}` : ""}

Return a JSON object with:
1. "heading": A short grand title or Sanskrit/Cultural blessing (e.g., "|| Shree Ganeshay Namah ||" or "A Journey of Eternal Love")
2. "primaryText": Main invitation message (2-3 paragraphs, captivating & emotional)
3. "poeticQuote": A 2-line poetic rhyming couplet, Sanskrit shloka translation, or romantic quote
4. "rsvpCallout": Warm closing note for guests
5. "regionalScriptText": (Optional) The text translated into ${language} script if non-English.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Error in AI wording generator:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate invitation wording",
      fallback: {
        heading: "|| Shree Ganeshay Namah ||",
        primaryText: "Together with their families, Rohan & Ananya request the pleasure of your company as they celebrate their union in eternal love and sacred tradition.",
        poeticQuote: "Two soulmates, two hearts, bound by ancient vows and eternal starlight.",
        rsvpCallout: "Your presence and blessings will double our joy."
      }
    });
  }
});

// API Route: AI Theme & Color Generator
app.post("/api/ai/suggest-theme", async (req, res) => {
  try {
    const { eventType, location, vibe } = req.body;
    const ai = getGeminiClient();

    const prompt = `Suggest a complete design aesthetic for an Indian invitation:
Event: ${eventType}, Location: ${location}, Desired Vibe: ${vibe}

Return JSON with:
1. "themeName": Royal evocative title
2. "primaryColor": Hex color code
3. "accentColor": Hex gold or contrasting color code
4. "backgroundColor": Hex light or dark luxury color code
5. "suggestedMotifs": Array of 3 key Indian motifs (e.g. "Lotus", "Mandala", "Peacock Feather")
6. "fontPairing": Heading font and body font recommendation
7. "musicRecommendation": E.g., "Royal Shehnai & Sitar Ensemble"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error in AI theme generator:", error);
    res.status(500).json({
      error: error.message || "Failed to generate theme suggestion"
    });
  }
});

async function startServer() {
  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
