import React, { useState } from "react";
import { Sparkles, Wand2, X, RefreshCw, Check, Languages } from "lucide-react";
import { DiyaSvg } from "./DecorativeSvg";

export const AiAssistantModal = ({
  isOpen,
  onClose,
  onApplyWording,
  groomName,
  brideName,
  eventType,
}) => {
  const [tone, setTone] = useState("Royal & Poetic");
  const [language, setLanguage] = useState("English");
  const [extraInstructions, setExtraInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-wording", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType,
          groomName,
          brideName,
          tone,
          language,
          extraPrompt: extraInstructions,
        }),
      });

      const data = await res.json();
      if (data.fallback) {
        setGeneratedResult(data.fallback);
      } else {
        setGeneratedResult(data);
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      setGeneratedResult({
        heading: "|| Shree Ganeshay Namah ||",
        primaryText: `Together with their families, ${groomName || "Groom"} & ${brideName || "Bride"} cordially invite you to celebrate their sacred union with love and blessings.`,
        poeticQuote: "Two soulmates, two hearts, bound by ancient vows and eternal starlight.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!generatedResult) return;
    onApplyWording({
      poeticHeading: generatedResult.heading || "|| Shree Ganeshay Namah ||",
      invitationBody: generatedResult.primaryText || "",
      weddingQuote: generatedResult.poeticQuote || "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border-4 border-[#90CAF9] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-[#0D47A1] space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-[#0D47A1] text-[#90CAF9] hover:bg-[#1565C0] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#0D47A1] text-[#90CAF9] flex items-center justify-center mx-auto border-2 border-[#2196F3] shadow-lg">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="font-cinzel text-2xl font-bold text-[#0D47A1]">
            AI Royal Wordsmith
          </h3>
          <p className="text-xs text-[#0D47A1]/80 font-cormorant max-w-xs mx-auto">
            Generate exquisite wedding poetry, formal phrasing, and regional script greetings powered by Gemini AI.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Desired Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#2196F3] bg-[#E3F2FD]/40 text-[#0D47A1] font-semibold"
              >
                <option value="Royal & Poetic">Royal &amp; Poetic</option>
                <option value="Sanskrit Traditional & Sacred">Sanskrit Sacred Shloka</option>
                <option value="Modern Luxury & Sleek">Modern Luxury</option>
                <option value="Emotional & Heartfelt">Emotional &amp; Heartfelt</option>
                <option value="Festive & Joyful">Festive &amp; Joyful</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-[#0D47A1]" />
                Language Script
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#2196F3] bg-[#E3F2FD]/40 font-bold text-[#0D47A1]"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
                <option value="Marathi">Marathi (मराठी)</option>
                <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Kannada">Kannada (கன்னட)</option>
                <option value="Malayalam">Malayalam (മലയാളം)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Custom Notes / Family Details</label>
            <input
              type="text"
              value={extraInstructions}
              onChange={(e) => setExtraInstructions(e.target.value)}
              placeholder="e.g. Include grandfather's blessings, mention Lake Pichola..."
              className="w-full px-3.5 py-2 rounded-xl border border-[#2196F3] bg-[#E3F2FD]/40 text-[#0D47A1]"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-[#0D47A1] text-[#90CAF9] font-bold text-xs shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#90CAF9]" />
                <span>Crafting Royal Poetry...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-[#90CAF9]" />
                <span>Generate Royal Invitation Text</span>
              </>
            )}
          </button>
        </div>

        {generatedResult && (
          <div className="bg-[#E3F2FD]/60 p-4 rounded-2xl border-2 border-[#2196F3] space-y-3 shadow-inner">
            <div className="flex justify-between items-center border-b border-[#2196F3]/30 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1] font-montserrat">
                AI Royal Result Preview
              </span>
              <DiyaSvg size={24} />
            </div>

            {generatedResult.heading && (
              <p className="font-cinzel text-sm font-bold text-[#0D47A1] text-center">
                {generatedResult.heading}
              </p>
            )}

            {generatedResult.poeticQuote && (
              <p className="font-cormorant text-xs italic text-center text-[#0D47A1] bg-white p-2 rounded-lg border border-[#2196F3]/30">
                "{generatedResult.poeticQuote}"
              </p>
            )}

            {generatedResult.primaryText && (
              <p className="font-cormorant text-xs leading-relaxed text-[#0D47A1]">
                {generatedResult.primaryText}
              </p>
            )}

            {generatedResult.regionalScriptText && (
              <div className="bg-[#0D47A1]/10 p-2.5 rounded-xl border border-[#2196F3]/40 text-xs font-serif text-[#0D47A1]">
                <p className="font-bold text-[10px] uppercase mb-1">Regional Script ({language}):</p>
                <p>{generatedResult.regionalScriptText}</p>
              </div>
            )}

            <button
              onClick={handleApply}
              className="w-full py-2.5 rounded-full bg-[#0D47A1] text-[#90CAF9] font-bold text-xs shadow-md hover:bg-[#1565C0] hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Apply to My Card
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
