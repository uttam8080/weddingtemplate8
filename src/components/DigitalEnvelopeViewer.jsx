import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Calendar, X, CheckCircle2, MessageCircle, ArrowLeft, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { CardPreview } from "./CardPreview";
import { AudioPlayer } from "./AudioPlayer";
import { DiyaSvg } from "./DecorativeSvg";

export const DigitalEnvelopeViewer = ({
  card,
  onClose,
  onAddRsvp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showShagunModal, setShowShagunModal] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [guestName, setGuestName] = useState("");
  const [emailPhone, setEmailPhone] = useState("");
  const [attending, setAttending] = useState("yes");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [dietary, setDietary] = useState("vegetarian");
  const [blessingMessage, setBlessingMessage] = useState("");

  const canvasRef = useRef(null);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#2196F3", "#90CAF9", "#0D47A1", "#E3F2FD", "#64B5F6"],
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const petals = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 1.2 + 0.5,
      speedX: Math.sin(Math.random() * Math.PI) * 0.8,
      rotation: Math.random() * 360,
      color: Math.random() > 0.5 ? "#2196F3" : "#90CAF9",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += 1;
        if (p.y > height) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    onAddRsvp(card.id, {
      guestName,
      emailPhone,
      attending,
      numberOfGuests,
      dietaryPreference: dietary,
      blessingMessage,
    });

    setRsvpSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#2196F3", "#0D47A1"],
    });

    setTimeout(() => {
      setShowRsvpModal(false);
      setRsvpSubmitted(false);
    }, 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `|| Shree Ganeshay Namah ||\n\nYou are cordially invited to the royal wedding of ${card.groomName} & ${card.brideName} on ${card.eventDate}.\n\nView Invitation & RSVP:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Wedding: ${card.groomName} & ${card.brideName}`);
    const details = encodeURIComponent(card.invitationBody);
    const location = encodeURIComponent(`${card.venueName}, ${card.venueAddress}`);
    const dateFormatted = card.eventDate.replace(/-/g, "");
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}/${dateFormatted}`;
    window.open(calUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl overflow-y-auto flex flex-col items-center justify-center p-4">
      
      {/* Top Header Actions */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between max-w-5xl mx-auto pointer-events-auto">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0D47A1] text-[#90CAF9] border border-[#2196F3] text-xs font-bold shadow-2xl hover:bg-[#1565C0]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Studio
        </button>

        {isOpen && card.musicEnabled && (
          <AudioPlayer track={card.backgroundMusic} autoPlay={true} />
        )}
      </div>

      {!isOpen ? (
        <div className="relative w-full max-w-lg mx-auto text-center space-y-6 pt-12">
          
          <div className="space-y-2">
            <DiyaSvg size={48} className="mx-auto" />
            <p className="text-xs uppercase tracking-widest text-[#90CAF9] font-montserrat font-bold">
              Special Royal Invitation
            </p>
            <h2 className="font-cinzel text-3xl font-bold text-white">
              {card.groomName} &amp; {card.brideName}
            </h2>
          </div>

          <div
            onClick={handleOpenEnvelope}
            className="relative cursor-pointer group rounded-3xl bg-gradient-to-b from-[#0D47A1] to-[#1565C0] p-8 border-4 border-[#90CAF9] shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
          >
            <div className="py-12 space-y-4 relative z-10 flex flex-col items-center justify-center">
              
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#2196F3] via-[#90CAF9] to-[#2196F3] p-1 shadow-2xl group-hover:rotate-12 transition-transform animate-pulse">
                <div className="w-full h-full bg-[#0D47A1] rounded-full flex flex-col items-center justify-center border-2 border-[#90CAF9]">
                  <Sparkles className="w-8 h-8 text-[#90CAF9]" />
                  <span className="text-[9px] font-bold text-[#90CAF9] uppercase tracking-wider">OPEN</span>
                </div>
              </div>

              <p className="font-cormorant text-lg text-[#E3F2FD] italic">
                Tap the Royal Seal to Unfold
              </p>
            </div>
          </div>

        </div>
      ) : (
        <div className="relative z-10 w-full max-w-3xl my-12 animate-fade-in">
          
          <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

          <CardPreview
            card={card}
            isInteractive={true}
            onRsvpClick={() => setShowRsvpModal(true)}
            onShagunClick={() => setShowShagunModal(true)}
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-xl hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              Share via WhatsApp
            </button>

            <button
              onClick={handleGoogleCalendar}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2196F3] text-white font-bold text-xs shadow-xl hover:scale-105 transition-transform"
            >
              <Calendar className="w-4 h-4" />
              Add to Google Calendar
            </button>
          </div>

        </div>
      )}

      {showRsvpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#90CAF9] rounded-3xl p-6 sm:p-8 max-w-md w-full text-[#0D47A1] space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#0D47A1] text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <DiyaSvg size={36} className="mx-auto text-[#0D47A1]" />
              <h3 className="font-cinzel text-xl font-bold text-[#0D47A1]">
                RSVP Response
              </h3>
              <p className="text-xs text-[#0D47A1]/80 font-cormorant">
                Please confirm your presence for {card.groomName} &amp; {card.brideName}'s wedding.
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto animate-bounce" />
                <h4 className="font-cinzel text-lg font-bold text-green-700">
                  Thank You for Your Blessings!
                </h4>
                <p className="text-xs text-[#0D47A1]/80">
                  Your RSVP response has been recorded.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Mobile / Email *</label>
                  <input
                    type="text"
                    required
                    value={emailPhone}
                    onChange={(e) => setEmailPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#90CAF9] bg-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Will you attend? *</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        attending === "yes" ? "bg-[#0D47A1] text-white border-[#0D47A1]" : "bg-white text-[#0D47A1]"
                      }`}
                    >
                      Joyfully Yes!
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        attending === "no" ? "bg-[#0D47A1] text-white border-[#0D47A1]" : "bg-white text-[#0D47A1]"
                      }`}
                    >
                      Regretfully No
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("maybe")}
                      className={`py-2 rounded-xl font-bold text-xs border ${
                        attending === "maybe" ? "bg-[#0D47A1] text-white border-[#0D47A1]" : "bg-white text-[#0D47A1]"
                      }`}
                    >
                      Maybe
                    </button>
                  </div>
                </div>

                {attending === "yes" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Total Guests</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Food Choice</label>
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white text-xs"
                      >
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non-vegetarian">Non-Vegetarian</option>
                        <option value="jain">Pure Jain</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-bold mb-1">Blessings / Wishes Message</label>
                  <textarea
                    rows={2}
                    value={blessingMessage}
                    onChange={(e) => setBlessingMessage(e.target.value)}
                    placeholder="Wishing you a lifetime of happiness!"
                    className="w-full px-3 py-2 rounded-xl border border-[#90CAF9] bg-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0D47A1] text-white font-bold text-xs shadow-lg hover:bg-[#1565C0] transition-colors"
                >
                  Confirm &amp; Send RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {showShagunModal && card.upiId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#90CAF9] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-[#0D47A1] text-center space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowShagunModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#0D47A1] text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <Gift className="w-10 h-10 text-[#0D47A1] mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-[#0D47A1]">
              Digital Shagun Blessing
            </h3>
            <p className="text-xs text-[#0D47A1]/80 font-cormorant">
              Your blessings mean the world to us. Scan via GPay, PhonePe, or Paytm to send Shagun.
            </p>

            <div className="bg-white p-4 rounded-2xl border-2 border-[#90CAF9] inline-block mx-auto shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=${encodeURIComponent(card.upiId)}&pn=${encodeURIComponent(card.groomName + " " + card.brideName)}&cu=INR`}
                alt="UPI QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <p className="text-xs font-mono font-bold text-[#0D47A1] bg-[#E3F2FD] py-1.5 px-3 rounded-full">
              UPI ID: {card.upiId}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
