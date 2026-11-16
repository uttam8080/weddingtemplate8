import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Clock, Heart, Gift } from "lucide-react";
import QRCode from "qrcode";
import { GoldFrameCorner, MandalaSvg, LotusSvg, DiyaSvg } from "./DecorativeSvg";

export const CardPreview = ({
  card,
  className = "",
  isInteractive = true,
  onRsvpClick,
  onShagunClick,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (card.enableGiftRegistry && card.upiId) {
      const upiUrl = `upi://pay?pa=${encodeURIComponent(card.upiId)}&pn=${encodeURIComponent((card.groomName || "") + " " + (card.brideName || ""))}&cu=INR`;
      QRCode.toDataURL(upiUrl, { width: 120, margin: 1, color: { dark: "#0D47A1", light: "#E3F2FD" } })
        .then((url) => setQrCodeDataUrl(url))
        .catch(() => {});
    }
  }, [card.upiId, card.enableGiftRegistry, card.groomName, card.brideName]);

  useEffect(() => {
    if (!card.enableCountdown || !card.eventDate) return;

    const calculateTimeLeft = () => {
      const eventTimeMs = new Date(card.eventDate).getTime();
      const nowMs = new Date().getTime();
      const diff = eventTimeMs - nowMs;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [card.eventDate, card.enableCountdown]);

  const getFontClass = () => {
    switch (card.fontFamily) {
      case "cinzel":
        return "font-cinzel";
      case "cormorant":
        return "font-cormorant";
      case "playfair":
        return "font-playfair";
      case "vibes":
        return "font-vibes";
      case "noto":
        return "font-noto";
      case "kalam":
        return "font-kalam";
      case "rozha":
        return "font-rozha";
      default:
        return "font-playfair";
    }
  };

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-300 border-4 border-[#90CAF9] ${className}`}
      style={{
        backgroundColor: card.backgroundColor || "#E3F2FD",
        color: card.textColor || "#0D47A1",
      }}
    >
      {card.bgPattern === "mandala-watermark" && (
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
          <MandalaSvg size={600} color={card.accentColor || "#2196F3"} />
        </div>
      )}

      {card.borderStyle === "gold-frame" && (
        <>
          <div className="absolute top-2 left-2 z-10">
            <GoldFrameCorner position="top-left" color={card.accentColor || "#2196F3"} />
          </div>
          <div className="absolute top-2 right-2 z-10">
            <GoldFrameCorner position="top-right" color={card.accentColor || "#2196F3"} />
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <GoldFrameCorner position="bottom-left" color={card.accentColor || "#2196F3"} />
          </div>
          <div className="absolute bottom-2 right-2 z-10">
            <GoldFrameCorner position="bottom-right" color={card.accentColor || "#2196F3"} />
          </div>
        </>
      )}

      <div className="relative z-20 space-y-8 text-center max-w-2xl mx-auto py-4">
        
        <div className="space-y-3">
          <div className="flex justify-center items-center gap-3">
            <DiyaSvg size={36} color={card.accentColor || "#2196F3"} />
            <LotusSvg size={42} color={card.accentColor || "#2196F3"} />
            <DiyaSvg size={36} color={card.accentColor || "#2196F3"} />
          </div>

          {card.poeticHeading && (
            <p className="font-cinzel text-base sm:text-lg font-bold tracking-widest text-[#0D47A1] uppercase">
              {card.poeticHeading}
            </p>
          )}
        </div>

        {card.hosts && (
          <p className="font-cormorant text-sm sm:text-base italic opacity-90">
            {card.hosts} cordially invite you to celebrate the joyous occasion of
          </p>
        )}

        <div className="space-y-2 py-2">
          <h1 className={`${getFontClass()} text-4xl sm:text-6xl font-bold tracking-wide`}
            style={{ color: card.primaryColor || "#0D47A1" }}
          >
            {card.groomName}
          </h1>

          <div className="flex items-center justify-center gap-4 my-2">
            <span className="h-[1px] w-12 bg-[#2196F3]" />
            <span className="font-vibes text-3xl sm:text-4xl text-[#2196F3]">weds</span>
            <span className="h-[1px] w-12 bg-[#2196F3]" />
          </div>

          <h1 className={`${getFontClass()} text-4xl sm:text-6xl font-bold tracking-wide`}
            style={{ color: card.primaryColor || "#0D47A1" }}
          >
            {card.brideName}
          </h1>
        </div>

        {card.weddingQuote && (
          <div className="bg-[#0D47A1]/5 p-4 rounded-2xl border border-[#2196F3]/30 italic font-cormorant text-sm sm:text-base max-w-md mx-auto">
            "{card.weddingQuote}"
          </div>
        )}

        <p className="font-cormorant text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          {card.invitationBody}
        </p>

        <div className="bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-[#0D47A1] text-white rounded-2xl p-6 shadow-xl border-2 border-[#90CAF9] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#90CAF9]/30">
            
            <div className="flex flex-col items-center justify-center p-2">
              <Calendar className="w-6 h-6 text-[#90CAF9] mb-1" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#90CAF9]">
                Event Date
              </span>
              <span className="font-cinzel text-lg font-bold">
                {card.eventDate}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-3 sm:pt-0">
              <Clock className="w-6 h-6 text-[#90CAF9] mb-1" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#90CAF9]">
                Auspicious Time
              </span>
              <span className="font-cinzel text-base font-bold">
                {card.eventTime}
              </span>
            </div>

          </div>

          <div className="pt-3 border-t border-[#90CAF9]/30 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#90CAF9] font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Sacred Venue</span>
            </div>
            <p className="font-cinzel text-base font-bold text-white">
              {card.venueName}
            </p>
            <p className="text-xs text-white/80">
              {card.venueAddress}
            </p>

            {card.googleMapsUrl && (
              <a
                href={card.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-4 py-1.5 rounded-full bg-[#2196F3] text-white text-xs font-bold shadow-md hover:bg-[#1976D2] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Open Google Maps Navigation
              </a>
            )}
          </div>
        </div>

        {card.timeline && card.timeline.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[#2196F3]/40">
            <h3 className="font-cinzel text-lg font-bold text-[#0D47A1] uppercase tracking-wider">
              || Event Function Timeline ||
            </h3>

            <div className="space-y-3">
              {card.timeline.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 p-3.5 rounded-xl border border-[#2196F3]/40 text-left flex justify-between items-center shadow-sm"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#0D47A1]">{item.title}</h4>
                    <p className="text-xs text-[#0D47A1]/80">{item.venue}</p>
                    {item.description && (
                      <p className="text-[11px] text-[#0D47A1]/60 italic mt-0.5">{item.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="bg-[#0D47A1] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.time}
                    </span>
                    <p className="text-[10px] text-[#0D47A1]/70 mt-1 font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {card.enableCountdown && (
          <div className="bg-[#0D47A1] text-[#E3F2FD] rounded-2xl p-4 border border-[#90CAF9] shadow-lg text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest font-montserrat text-[#90CAF9]">
              Countdown to Celebration
            </p>
            <div className="flex justify-center items-center gap-4 text-center">
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold">{timeLeft.days}</span>
                <p className="text-[10px] uppercase">Days</p>
              </div>
              <span>:</span>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold">{timeLeft.hours}</span>
                <p className="text-[10px] uppercase">Hours</p>
              </div>
              <span>:</span>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold">{timeLeft.minutes}</span>
                <p className="text-[10px] uppercase">Mins</p>
              </div>
              <span>:</span>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold">{timeLeft.seconds}</span>
                <p className="text-[10px] uppercase">Secs</p>
              </div>
            </div>
          </div>
        )}

        {isInteractive && (
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {card.enableRsvp && onRsvpClick && (
              <button
                onClick={onRsvpClick}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D47A1] text-white font-bold text-sm shadow-xl hover:bg-[#1565C0] transition-colors border border-[#2196F3]"
              >
                <Heart className="w-4 h-4 fill-current" />
                Submit RSVP Response
              </button>
            )}

            {card.enableGiftRegistry && qrCodeDataUrl && (
              <button
                onClick={onShagunClick}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2196F3] text-white font-bold text-sm shadow-xl hover:bg-[#1976D2] transition-colors"
              >
                <Gift className="w-4 h-4" />
                Digital Shagun Blessing QR
              </button>
            )}
          </div>
        )}

        <div className="pt-6 border-t border-[#2196F3]/30 text-xs italic text-[#0D47A1]/70">
          "With warm regards &amp; blessings from the entire family"
        </div>

      </div>
    </div>
  );
};
