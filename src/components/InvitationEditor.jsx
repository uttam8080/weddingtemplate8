import React, { useState } from "react";
import { Save, Eye, Wand2, Plus, Trash2, ArrowLeft } from "lucide-react";
import { CardPreview } from "./CardPreview";
import { AiAssistantModal } from "./AiAssistantModal";

const ALL_MOTIFS = [
  "Mandala",
  "Lotus",
  "Peacock Feather",
  "Elephants",
  "Palace Arches",
  "Temple Bells",
  "Kalash",
  "Diya",
  "Rangoli",
  "Marigold Flowers",
  "Banana Leaves",
  "Gold Frames",
];

const COLOR_PALETTES = [
  { name: "Ocean Royal & Sky Blue", primary: "#0D47A1", accent: "#2196F3", bg: "#E3F2FD", text: "#0D47A1" },
  { name: "Royal Blue & Pastel Sky", primary: "#1565C0", accent: "#90CAF9", bg: "#E3F2FD", text: "#0D47A1" },
  { name: "Emerald & Temple Gold", primary: "#006A4E", accent: "#D4AF37", bg: "#FAF3E0", text: "#4A2C2A" },
  { name: "Peacock Blue & Saffron", primary: "#0047AB", accent: "#FF9933", bg: "#E3F2FD", text: "#0D47A1" },
  { name: "Royal Maroon & Gold", primary: "#800020", accent: "#D4AF37", bg: "#FFF8E7", text: "#4A2C2A" },
];

export const InvitationEditor = ({
  initialCard,
  onSaveCard,
  onPreviewCard,
  onBackToHome,
}) => {
  const [card, setCard] = useState({ ...initialCard });
  const [activeTab, setActiveTab] = useState("details");
  const [showAiModal, setShowAiModal] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  const updateField = (field, value) => {
    setCard((prev) => ({ ...prev, [field]: value, updatedAt: new Date().toISOString() }));
  };

  const toggleMotif = (motif) => {
    const current = card.motifs || [];
    if (current.includes(motif)) {
      updateField("motifs", current.filter((m) => m !== motif));
    } else {
      updateField("motifs", [...current, motif]);
    }
  };

  const addTimelineItem = () => {
    const newItem = {
      id: "t-" + Date.now(),
      title: "New Function",
      date: card.eventDate || "2027-11-28",
      time: "06:00 PM",
      venue: card.venueName || "Main Hall",
    };
    updateField("timeline", [...(card.timeline || []), newItem]);
  };

  const deleteTimelineItem = (id) => {
    updateField("timeline", (card.timeline || []).filter((item) => item.id !== id));
  };

  const updateTimelineItem = (id, field, value) => {
    updateField(
      "timeline",
      (card.timeline || []).map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    onSaveCard(card);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 2500);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2196F3]/30 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-full bg-[#0D47A1] text-[#90CAF9] hover:bg-[#1565C0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
              Royal Invitation Studio
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAiModal(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#0D47A1] to-[#1565C0] text-[#90CAF9] text-xs font-bold flex items-center gap-1.5 shadow-lg hover:opacity-90"
          >
            <Wand2 className="w-4 h-4 text-[#90CAF9]" />
            AI Wordsmith
          </button>

          <button
            onClick={() => onPreviewCard(card)}
            className="px-4 py-2 rounded-full bg-[#2196F3] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#1565C0] transition-colors"
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-full bg-[#0D47A1] text-[#90CAF9] text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-[#1565C0] hover:text-white border border-[#2196F3]"
          >
            <Save className="w-4 h-4" />
            {savedSuccessMsg ? "Saved Successfully!" : "Save Card"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#90CAF9] p-6 shadow-xl space-y-6">
          
          <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#2196F3]/30 text-xs font-bold">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === "details" ? "bg-[#0D47A1] text-[#90CAF9]" : "text-[#0D47A1] hover:bg-[#E3F2FD]"
              }`}
            >
              1. Event Details
            </button>
            <button
              onClick={() => setActiveTab("wording")}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === "wording" ? "bg-[#0D47A1] text-[#90CAF9]" : "text-[#0D47A1] hover:bg-[#E3F2FD]"
              }`}
            >
              2. Wording &amp; Quotes
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === "style" ? "bg-[#0D47A1] text-[#90CAF9]" : "text-[#0D47A1] hover:bg-[#E3F2FD]"
              }`}
            >
              3. Style &amp; Motifs
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === "timeline" ? "bg-[#0D47A1] text-[#90CAF9]" : "text-[#0D47A1] hover:bg-[#E3F2FD]"
              }`}
            >
              4. Functions Schedule
            </button>
            <button
              onClick={() => setActiveTab("interactive")}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors ${
                activeTab === "interactive" ? "bg-[#0D47A1] text-[#90CAF9]" : "text-[#0D47A1] hover:bg-[#E3F2FD]"
              }`}
            >
              5. Music &amp; RSVP
            </button>
          </div>

          {activeTab === "details" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Card / Event Title</label>
                <input
                  type="text"
                  value={card.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Groom / Main Host Name</label>
                  <input
                    type="text"
                    value={card.groomName || ""}
                    onChange={(e) => updateField("groomName", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white font-semibold text-[#0D47A1]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Bride / Celebrant Name</label>
                  <input
                    type="text"
                    value={card.brideName || ""}
                    onChange={(e) => updateField("brideName", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white font-semibold text-[#0D47A1]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Hosted By (Parents / Family)</label>
                <input
                  type="text"
                  value={card.hosts || ""}
                  onChange={(e) => updateField("hosts", e.target.value)}
                  placeholder="e.g. Mrs. Sunita & Mr. Rajesh Sharma"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Event Date</label>
                  <input
                    type="date"
                    value={card.eventDate || ""}
                    onChange={(e) => updateField("eventDate", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Auspicious Time</label>
                  <input
                    type="text"
                    value={card.eventTime || ""}
                    onChange={(e) => updateField("eventTime", e.target.value)}
                    placeholder="e.g. 06:30 PM Onwards"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block font-bold mb-1">Sacred Venue Name</label>
                  <input
                    type="text"
                    value={card.venueName || ""}
                    onChange={(e) => updateField("venueName", e.target.value)}
                    placeholder="e.g. City Palace Courtyard"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Venue Address</label>
                  <input
                    type="text"
                    value={card.venueAddress || ""}
                    onChange={(e) => updateField("venueAddress", e.target.value)}
                    placeholder="e.g. Old City, Udaipur, Rajasthan"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Google Maps URL</label>
                  <input
                    type="url"
                    value={card.googleMapsUrl || ""}
                    onChange={(e) => updateField("googleMapsUrl", e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "wording" && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center bg-[#0D47A1]/10 p-3 rounded-xl border border-[#2196F3]/40">
                <div>
                  <p className="font-bold text-[#0D47A1]">Need Royal Inspiration?</p>
                  <p className="text-[11px] text-[#0D47A1]/70">Let AI write romantic quotes and traditional shlokas.</p>
                </div>
                <button
                  onClick={() => setShowAiModal(true)}
                  className="px-3 py-1.5 rounded-full bg-[#0D47A1] text-[#90CAF9] font-bold text-[11px] flex items-center gap-1 shadow-md"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  Generate AI Text
                </button>
              </div>

              <div>
                <label className="block font-bold mb-1">Poetic Heading / Blessing</label>
                <input
                  type="text"
                  value={card.poeticHeading || ""}
                  onChange={(e) => updateField("poeticHeading", e.target.value)}
                  placeholder="e.g. || Shree Ganeshay Namah ||"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Wedding Quote / Poetry</label>
                <input
                  type="text"
                  value={card.weddingQuote || ""}
                  onChange={(e) => updateField("weddingQuote", e.target.value)}
                  placeholder="Two souls with but a single thought..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white italic"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Invitation Message Body</label>
                <textarea
                  rows={4}
                  value={card.invitationBody || ""}
                  onChange={(e) => updateField("invitationBody", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === "style" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-2">Royal Color Palettes</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PALETTES.map((pal) => (
                    <button
                      key={pal.name}
                      type="button"
                      onClick={() => {
                        updateField("primaryColor", pal.primary);
                        updateField("accentColor", pal.accent);
                        updateField("backgroundColor", pal.bg);
                        updateField("textColor", pal.text);
                      }}
                      className="p-2 rounded-xl border border-[#90CAF9] bg-white text-left hover:scale-105 transition-transform shadow-sm"
                    >
                      <div className="flex gap-1 h-3 rounded-md overflow-hidden mb-1">
                        <span className="flex-1" style={{ backgroundColor: pal.primary }} />
                        <span className="flex-1" style={{ backgroundColor: pal.accent }} />
                        <span className="flex-1" style={{ backgroundColor: pal.bg }} />
                      </div>
                      <p className="text-[10px] font-bold text-[#0D47A1] truncate">{pal.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">Select Decorative Motifs</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_MOTIFS.map((motif) => {
                    const isSelected = (card.motifs || []).includes(motif);
                    return (
                      <button
                        key={motif}
                        type="button"
                        onClick={() => toggleMotif(motif)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
                          isSelected
                            ? "bg-[#0D47A1] text-white border-[#0D47A1] shadow-md"
                            : "bg-white text-[#0D47A1] border-[#90CAF9]"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {motif}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Heading Font Style</label>
                  <select
                    value={card.fontFamily || "cinzel"}
                    onChange={(e) => updateField("fontFamily", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white font-bold"
                  >
                    <option value="cinzel">Cinzel (Royal Palace)</option>
                    <option value="cormorant">Cormorant Garamond (Classic)</option>
                    <option value="playfair">Playfair Display (Luxury)</option>
                    <option value="vibes">Great Vibes (Calligraphy)</option>
                    <option value="rozha">Rozha One (Bold Indian)</option>
                    <option value="kalam">Kalam (Handwritten)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Border Style</label>
                  <select
                    value={card.borderStyle || "gold-frame"}
                    onChange={(e) => updateField("borderStyle", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white font-bold"
                  >
                    <option value="gold-frame">Gold Frame Corners</option>
                    <option value="royal-arch">Royal Palace Arch</option>
                    <option value="floral-mandala">Floral Mandala Frame</option>
                    <option value="classic-double">Classic Double Border</option>
                  </select>
                </div>
              </div>

            </div>
          )}

          {activeTab === "timeline" && (
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center">
                <label className="font-bold">Multi-day Function Timeline</label>
                <button
                  type="button"
                  onClick={addTimelineItem}
                  className="px-3 py-1 rounded-full bg-[#0D47A1] text-[#90CAF9] font-bold text-[11px] flex items-center gap-1 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Function
                </button>
              </div>

              <div className="space-y-3">
                {(card.timeline || []).map((item) => (
                  <div key={item.id} className="bg-white p-3.5 rounded-xl border border-[#90CAF9] space-y-2 relative shadow-sm">
                    <button
                      type="button"
                      onClick={() => deleteTimelineItem(item.id)}
                      className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-2 pr-6">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateTimelineItem(item.id, "title", e.target.value)}
                        placeholder="Function Title (e.g. Sangeet)"
                        className="px-2.5 py-1.5 rounded-lg border border-[#90CAF9] font-bold text-xs"
                      />
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateTimelineItem(item.id, "time", e.target.value)}
                        placeholder="Time (e.g. 07:00 PM)"
                        className="px-2.5 py-1.5 rounded-lg border border-[#90CAF9] text-xs"
                      />
                    </div>

                    <input
                      type="text"
                      value={item.venue}
                      onChange={(e) => updateTimelineItem(item.id, "venue", e.target.value)}
                      placeholder="Venue location"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#90CAF9] text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "interactive" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Background Music Track</label>
                <select
                  value={card.backgroundMusic || "Shehnai Royal Symphony"}
                  onChange={(e) => updateField("backgroundMusic", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white font-bold"
                >
                  <option value="Shehnai Royal Symphony">Shehnai Royal Symphony</option>
                  <option value="Sitar & Tabla Harmony">Sitar &amp; Tabla Harmony</option>
                  <option value="Divine Temple Flute">Divine Temple Flute</option>
                  <option value="Aarti Temple Bells">Aarti Temple Bells</option>
                  <option value="Punjabi Dhol Beats">Punjabi Dhol Beats</option>
                  <option value="South Indian Nadaswaram">South Indian Nadaswaram</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#90CAF9]">
                <div>
                  <p className="font-bold">Enable Music Autoplay</p>
                  <p className="text-[11px] text-[#0D47A1]/70">Plays authentic soothing instruments upon recipient card opening.</p>
                </div>
                <input
                  type="checkbox"
                  checked={!!card.musicEnabled}
                  onChange={(e) => updateField("musicEnabled", e.target.checked)}
                  className="w-5 h-5 accent-[#0D47A1]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#90CAF9]">
                <div>
                  <p className="font-bold">Enable Guest RSVP Form</p>
                  <p className="text-[11px] text-[#0D47A1]/70">Collect headcount, food preference &amp; blessings.</p>
                </div>
                <input
                  type="checkbox"
                  checked={!!card.enableRsvp}
                  onChange={(e) => updateField("enableRsvp", e.target.checked)}
                  className="w-5 h-5 accent-[#0D47A1]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#90CAF9]">
                <div>
                  <p className="font-bold">Enable Digital Shagun UPI QR</p>
                  <p className="text-[11px] text-[#0D47A1]/70">Allow guests to send monetary blessings via GPay/PhonePe.</p>
                </div>
                <input
                  type="checkbox"
                  checked={!!card.enableGiftRegistry}
                  onChange={(e) => updateField("enableGiftRegistry", e.target.checked)}
                  className="w-5 h-5 accent-[#0D47A1]"
                />
              </div>

              {card.enableGiftRegistry && (
                <div>
                  <label className="block font-bold mb-1">Your UPI ID for Shagun</label>
                  <input
                    type="text"
                    value={card.upiId || ""}
                    onChange={(e) => updateField("upiId", e.target.value)}
                    placeholder="e.g. name@upi or 9876543210@paytm"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white font-mono"
                  />
                </div>
              )}

            </div>
          )}

        </div>

        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="flex items-center justify-between px-2 text-xs font-bold text-[#0D47A1]">
            <span>Real-Time Canvas Surface</span>
            <span className="text-[10px] text-[#90CAF9] bg-[#0D47A1] px-2 py-0.5 rounded-full">
              Live Rendering
            </span>
          </div>

          <div className="max-w-md mx-auto transform scale-95 origin-top">
            <CardPreview card={card} isInteractive={false} />
          </div>
        </div>

      </div>

      <AiAssistantModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        groomName={card.groomName}
        brideName={card.brideName}
        eventType={card.category}
        onApplyWording={({ poeticHeading, invitationBody, weddingQuote }) => {
          if (poeticHeading) updateField("poeticHeading", poeticHeading);
          if (invitationBody) updateField("invitationBody", invitationBody);
          if (weddingQuote) updateField("weddingQuote", weddingQuote);
        }}
      />

    </div>
  );
};
