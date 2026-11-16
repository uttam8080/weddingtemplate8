import { GoogleGenAI } from "@google/genai";

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

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const url = req.url || "";

  if (url.includes("/health")) {
    return res.status(200).json({ status: "ok", service: "ShaadiVows API" });
  }

  if (url.includes("/generate-wording")) {
    try {
      const { eventType, hosts, brideName, groomName, tone, language, theme, extraPrompt } = req.body || {};
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
      return res.status(200).json(JSON.parse(text));
    } catch (error: any) {
      console.error("Error in AI wording generator:", error);
      return res.status(200).json({
        fallback: {
          heading: "|| Shree Ganeshay Namah ||",
          primaryText: "Together with their families, Rohan & Ananya request the pleasure of your company as they celebrate their union in eternal love and sacred tradition.",
          poeticQuote: "Two soulmates, two hearts, bound by ancient vows and eternal starlight.",
          rsvpCallout: "Your presence and blessings will double our joy."
        }
      });
    }
  }

  if (url.includes("/suggest-theme")) {
    try {
      const { eventType, location, vibe } = req.body || {};
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

      return res.status(200).json(JSON.parse(response.text || "{}"));
    } catch (error: any) {
      console.error("Error in AI theme generator:", error);
      return res.status(500).json({
        error: error.message || "Failed to generate theme suggestion"
      });
    }
  }

  return res.status(404).json({ error: "Endpoint not found" });
}
