import React, { useState } from "react";
import {
  GaneshaSvg,
  TraditionalCornerFloralSvg,
  TraditionalCoupleFenceSvg,
  BismillahCalligraphySvg,
  GoldRingWreathSvg,
  LavenderTopFloralBanner,
  LavenderBottomFloralBanner,
} from "./DecorativeSvg";
import appData from "../data/data.json";

export const InvitationCardSection = () => {
  const cardsData = appData.invitationCards;
  const [selectedStyle, setSelectedStyle] = useState("lavender");
  const [lavenderData] = useState(cardsData.lavender);
  const [traditionalData] = useState(cardsData.traditional);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full space-y-8 bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-center bg-no-repeat">
      {/* Section Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
          {cardsData.sectionTitle}
        </h2>
        <p className="text-sm font-cormorant text-[#0D47A1]/80 max-w-lg mx-auto">
          {cardsData.sectionSubtitle}
        </p>
      </div>



      {/* Main Card Stage */}
      <div className="max-w-xl mx-auto space-y-6">
        


        {/* DISPLAY CANVAS: LAVENDER WATERCOLOR STYLE */}
        {selectedStyle === "lavender" ? (
          <div className="relative bg-[#FAF8FC] text-[#4A3E52] rounded-3xl p-6 sm:p-10 border-4 border-[#E2D5EA] shadow-2xl overflow-hidden font-cormorant select-none">
            {/* Top Floral Banner */}
            <div className="absolute top-0 left-0 right-0 z-10 opacity-90">
              <LavenderTopFloralBanner />
            </div>

            {/* Bottom Floral Banner */}
            <div className="absolute bottom-0 left-0 right-0 z-10 opacity-90">
              <LavenderBottomFloralBanner />
            </div>

            {/* Content Body */}
            <div className="relative z-20 text-center space-y-6 pt-12 pb-12">
              {/* Calligraphy Emblem */}
              <div className="flex justify-center mb-1">
                <BismillahCalligraphySvg size={58} color="#5C3D75" />
              </div>

              {/* Sub-heading */}
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-sans tracking-widest text-[#5C3D75] font-semibold uppercase">
                  Please join us to celebrate the
                </p>
                <p className="text-base sm:text-lg font-sans tracking-widest text-[#5C3D75] font-semibold uppercase">
                  wedding of:
                </p>
              </div>

              {/* Center Circular Gold Ring with Couple Names */}
              <div className="relative my-6 py-2">
                <GoldRingWreathSvg />

                {/* Names Positioned inside Circle */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0 text-center pointer-events-none">
                  <h3 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#3C2B4C] drop-shadow-sm">
                    {lavenderData.groomName}
                  </h3>
                  <span className="text-xl sm:text-2xl font-serif italic text-[#7B1FA2] font-semibold">
                    &amp;
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#3C2B4C] drop-shadow-sm">
                    {lavenderData.brideName}
                  </h3>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="space-y-3 max-w-md mx-auto">
                {/* Month */}
                <p className="text-base sm:text-lg font-sans tracking-[0.25em] text-[#5C3D75] font-bold uppercase">
                  {lavenderData.monthStr}
                </p>

                {/* Day - Date - Time Row with Gold Line Accent */}
                <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-sans font-bold text-[#3C2B4C]">
                  {/* Day Column */}
                  <div className="flex-1 text-right py-2 border-y-2 border-[#D4AF37]">
                    <span className="tracking-widest uppercase">{lavenderData.dayName}</span>
                  </div>

                  {/* Big Number Date */}
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#5C3D75] px-2 font-cinzel">
                    {lavenderData.dayNum}
                  </div>

                  {/* Time Column */}
                  <div className="flex-1 text-left py-2 border-y-2 border-[#D4AF37]">
                    <span className="tracking-widest uppercase">{lavenderData.timeStr}</span>
                  </div>
                </div>

                {/* Year */}
                <p className="text-base sm:text-lg font-sans tracking-[0.2em] text-[#5C3D75] font-bold">
                  {lavenderData.yearStr}
                </p>
              </div>

              {/* Venue Info */}
              <div className="pt-4 space-y-1">
                <h4 className="text-lg sm:text-xl font-sans font-bold text-[#3C2B4C]">
                  {lavenderData.venueName}
                </h4>
                <p className="text-xs sm:text-sm font-sans font-medium text-[#5C3D75]/90">
                  {lavenderData.venueAddress}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* DISPLAY CANVAS: TRADITIONAL INDIAN STYLE */
          <div className="relative bg-[#FAF6EE] text-[#333333] rounded-3xl p-6 sm:p-10 border-[6px] border-[#E8DFC8] shadow-2xl overflow-hidden font-cormorant select-none">
            <div className="absolute top-0 left-0 z-10">
              <TraditionalCornerFloralSvg position="top-left" />
            </div>
            <div className="absolute top-0 right-0 z-10">
              <TraditionalCornerFloralSvg position="top-right" />
            </div>
            <div className="absolute top-4 right-4 z-20 bg-white/90 border border-[#D7CCC8] px-2.5 py-0.5 rounded text-[11px] font-sans font-bold text-gray-700 shadow-sm">
              {traditionalData.cardNumber}
            </div>

            <div className="relative z-20 text-center space-y-4 pt-4 sm:pt-6">
              <div className="flex justify-center mb-1">
                <GaneshaSvg size={44} color="#8D6E63" />
              </div>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-serif italic text-[#2E5A27] tracking-wide font-medium">
                  {traditionalData.familyHeading}
                </p>
              </div>

              <p className="text-sm sm:text-base font-serif text-[#6D4C41] font-medium tracking-wide">
                You are cordially invited to the
              </p>

              <h4 className="text-2xl sm:text-3xl font-serif italic text-[#1B5E20] font-semibold">
                {traditionalData.invitationTitle}
              </h4>

              <div className="py-2">
                <h3 className="text-3xl sm:text-5xl font-bold text-[#1B5E20] tracking-wide font-serif drop-shadow-sm">
                  {traditionalData.groomName} <span className="text-[#8D6E63] font-normal">&amp;</span> {traditionalData.brideName}
                </h3>
              </div>

              <div className="space-y-0.5 text-sm sm:text-base text-[#5D4037] font-semibold">
                <p>{traditionalData.dateStr}</p>
                <p className="text-xs sm:text-sm font-normal">{traditionalData.timeStr}</p>
              </div>

              <div className="space-y-0.5 text-xs sm:text-sm text-[#4E342E]">
                <p className="italic text-[#795548]">At,</p>
                <p className="font-bold text-[#3E2723] text-sm sm:text-base">{traditionalData.venueLine1}</p>
                <p className="font-semibold">{traditionalData.venueLine2}</p>
              </div>

              <div className="pt-2 space-y-0.5 text-xs sm:text-sm">
                <p className="text-xs font-bold text-[#8D6E63] tracking-widest uppercase">
                  {traditionalData.inviteeTitle}
                </p>
                <p className="font-bold text-[#2E5A27] text-sm sm:text-base">
                  {traditionalData.inviteeNames}
                </p>
              </div>

              <div className="pt-4 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 pointer-events-none">
                <TraditionalCoupleFenceSvg />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
