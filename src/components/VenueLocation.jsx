import React, { useState } from "react";
import { MapPin, Navigation, Phone, Copy, Check, Car, Plane, Building2, ExternalLink } from "lucide-react";
import appData from "../data/data.json";

export const VenueLocation = () => {
  const venueData = appData.venueLocation;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueData.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full space-y-10 bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-center bg-no-repeat">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
          {venueData.sectionTitle}
        </h2>
      </div>

      {/* Venue Content Grid */}
      <div className="bg-white rounded-3xl border-2 border-[#90CAF9] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
        {/* Map Column */}
        <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[350px] relative bg-[#E3F2FD]">
          <iframe
            title={`Map for ${venueData.venueName}`}
            src={venueData.mapEmbedIframeUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white text-[#0D47A1]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-cinzel text-[#0D47A1]">
              {venueData.venueName}
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 bg-[#E3F2FD]/60 p-4 rounded-2xl border border-[#2196F3]/30">
              <MapPin className="w-5 h-5 text-[#2196F3] shrink-0 mt-0.5" />
              <div className="space-y-1 flex-1">
                <p className="text-xs font-semibold text-[#0D47A1]">Full Address</p>
                <p className="text-xs text-[#0D47A1]/80 leading-relaxed">
                  {venueData.address}
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#2196F3] hover:underline pt-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Travel & Accessibility Info */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3">
                <Plane className="w-4 h-4 text-[#2196F3] shrink-0" />
                <span className="text-[#0D47A1]/90">{venueData.airport}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-[#2196F3] shrink-0" />
                <span className="text-[#0D47A1]/90">{venueData.railway}</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 text-[#2196F3] shrink-0" />
                <span className="text-[#0D47A1]/90">{venueData.parking}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#90CAF9]/40 flex flex-col sm:flex-row gap-3">
            <a
              href={venueData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-[#0D47A1] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#1565C0] transition-colors shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
