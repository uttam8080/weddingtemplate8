import React, { useState } from "react";
import { Users, CheckCircle, Download, Search, Utensils, MessageSquare, ArrowLeft } from "lucide-react";

export const RsvpDashboard = ({
  cards,
  rsvpMap,
  onBackToHome,
}) => {
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAttending, setFilterAttending] = useState("all");

  const currentCard = cards.find((c) => c.id === selectedCardId) || cards[0];
  const responses = (selectedCardId && rsvpMap[selectedCardId]) || [];

  const filteredResponses = responses.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.emailPhone.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterAttending === "all") return matchesSearch;
    return matchesSearch && r.attending === filterAttending;
  });

  const totalResponses = responses.length;
  const attendingCount = responses.filter((r) => r.attending === "yes").length;
  const totalGuestHeadcount = responses
    .filter((r) => r.attending === "yes")
    .reduce((sum, r) => sum + (r.numberOfGuests || 1), 0);

  const vegCount = responses.filter((r) => r.dietaryPreference === "vegetarian").length;
  const nonVegCount = responses.filter((r) => r.dietaryPreference === "non-vegetarian").length;
  const jainCount = responses.filter((r) => r.dietaryPreference === "jain").length;

  const handleExportCsv = () => {
    if (responses.length === 0) return;

    const headers = ["Guest Name", "Contact", "Attending", "Total Headcount", "Food Choice", "Blessing Message", "Date"];
    const rows = responses.map((r) => [
      `"${r.guestName}"`,
      `"${r.emailPhone}"`,
      `"${r.attending}"`,
      r.numberOfGuests,
      `"${r.dietaryPreference || "vegetarian"}"`,
      `"${r.blessingMessage || ""}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RSVP_${currentCard?.groomName || "Guest"}_Wedding.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
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
              Guest RSVP &amp; Catering Dashboard
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {cards.length > 0 && (
            <select
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
              className="px-3.5 py-2 rounded-full bg-white border-2 border-[#2196F3] text-xs font-bold text-[#0D47A1]"
            >
              {cards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.groomName} &amp; {c.brideName} ({c.title})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleExportCsv}
            disabled={responses.length === 0}
            className="px-4 py-2 rounded-full bg-[#0D47A1] text-[#90CAF9] text-xs font-bold flex items-center gap-1.5 shadow-lg disabled:opacity-50 hover:bg-[#1565C0] hover:text-white"
          >
            <Download className="w-4 h-4" />
            Export Guest List CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border-2 border-[#90CAF9] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0D47A1] text-[#90CAF9] flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]/70">
              Total RSVPs Received
            </p>
            <h3 className="font-cinzel text-2xl font-bold text-[#0D47A1]">
              {totalResponses} Responses
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#90CAF9] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#1565C0] text-white flex items-center justify-center shadow-inner">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]/70">
              Confirmed Attending
            </p>
            <h3 className="font-cinzel text-2xl font-bold text-[#1565C0]">
              {attendingCount} Guests ({totalGuestHeadcount} Headcount)
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#90CAF9] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#2196F3] text-white flex items-center justify-center shadow-inner">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]/70">
              Catering Meal Preference
            </p>
            <p className="text-xs font-bold text-[#0D47A1]">
              Veg: {vegCount} | Non-Veg: {nonVegCount} | Jain: {jainCount}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#90CAF9] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#90CAF9] text-[#0D47A1] flex items-center justify-center shadow-inner">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#0D47A1]/70">
              Warm Blessing Messages
            </p>
            <h3 className="font-cinzel text-xl font-bold text-[#0D47A1]">
              {responses.filter((r) => r.blessingMessage).length} Messages
            </h3>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-3xl border-2 border-[#90CAF9] p-6 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#0D47A1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guest by name or contact..."
              className="w-full pl-9 pr-3 py-2 rounded-full border border-[#2196F3] bg-[#E3F2FD]/50 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#0D47A1]">Filter Status:</span>
            <select
              value={filterAttending}
              onChange={(e) => setFilterAttending(e.target.value)}
              className="px-3 py-1.5 rounded-full border border-[#2196F3] bg-[#E3F2FD]/50 text-xs font-bold text-[#0D47A1]"
            >
              <option value="all">All Guests</option>
              <option value="yes">Attending Yes</option>
              <option value="no">Regretfully No</option>
              <option value="maybe">Maybe</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#90CAF9]/60 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0D47A1] text-[#90CAF9] font-cinzel font-bold">
                <th className="p-3.5">Guest Name</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">Headcount</th>
                <th className="p-3.5">Dietary</th>
                <th className="p-3.5">Blessings Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#90CAF9]/30">
              {filteredResponses.length > 0 ? (
                filteredResponses.map((r) => (
                  <tr key={r.id} className="hover:bg-[#E3F2FD]/60 transition-colors">
                    <td className="p-3.5 font-bold text-[#0D47A1]">{r.guestName}</td>
                    <td className="p-3.5 text-[#0D47A1]/80">{r.emailPhone}</td>
                    <td className="p-3.5">
                      {r.attending === "yes" && (
                        <span className="bg-[#2196F3]/10 text-[#0D47A1] px-2.5 py-1 rounded-full font-bold">
                          ✓ Attending
                        </span>
                      )}
                      {r.attending === "no" && (
                        <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-bold">
                          ✗ Regrets
                        </span>
                      )}
                      {r.attending === "maybe" && (
                        <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-bold">
                          ? Maybe
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#0D47A1]">{r.numberOfGuests} Guests</td>
                    <td className="p-3.5 capitalize font-semibold text-[#0D47A1]">{r.dietaryPreference || "Vegetarian"}</td>
                    <td className="p-3.5 italic text-[#0D47A1]/70 max-w-xs truncate">
                      {r.blessingMessage || "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#0D47A1]/60 italic">
                    No RSVP responses logged for this card yet. Share your card link to collect responses!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
