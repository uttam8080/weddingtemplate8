import React from "react";
import appData from "../data/data.json";
import { Heart } from "lucide-react";

export const GroomAndBride = () => {
  const { groom, bride, sectionTitle } = appData.groomAndBride;

  return (
    <section className="pt-24 pb-72 px-4 sm:px-6 lg:px-8 w-full overflow-hidden bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-bottom bg-no-repeat">
      {/* Section Heading */}
      <div className="text-center mb-16 relative">
        <h2 className="text-4xl sm:text-5xl font-cormorant italic text-[#2196F3] drop-shadow-md mb-4">
          {sectionTitle}
        </h2>
        <div className="h-[1px] w-24 mx-auto bg-[#D4AF37]"></div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 relative">
        
        {/* Groom Profile */}
        <div className="flex flex-col items-center group">
          {/* Fine Art Photo Frame */}
          <div className="bg-white p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transform transition-all duration-500 group-hover:-rotate-2 group-hover:scale-105 border border-gray-100">
            <div className="w-64 h-80 sm:w-80 sm:h-[28rem] overflow-hidden relative">
              <img
                src={groom.imageUrl}
                alt={groom.name}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          {/* Minimal Text Below */}
          <div className="text-center mt-8 space-y-3">
            <p className="text-xs font-montserrat tracking-[0.3em] text-[#D4AF37] drop-shadow-sm uppercase font-semibold">
              {groom.role}
            </p>
            <h3 className="text-5xl sm:text-6xl font-vibes text-[#0D47A1] drop-shadow-md pt-2 pb-1">
              {groom.name}
            </h3>
            <p className="text-sm sm:text-base font-bold font-montserrat text-[#0D47A1] drop-shadow-sm tracking-widest uppercase">
              {groom.parents}
            </p>
          </div>
        </div>

        {/* Love Sign (Mobile Only) */}
        <div className="flex md:hidden items-center justify-center -my-6 z-10">
          <div className="bg-[#E3F2FD]/90 rounded-full p-3 shadow-lg border border-[#D4AF37]/40 backdrop-blur-sm">
            <Heart className="w-8 h-8 text-[#c0392b] fill-[#c0392b] animate-pulse" />
          </div>
        </div>

        {/* Love Sign (Desktop Only) */}
        <div className="hidden md:flex absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center bg-[#E3F2FD]/90 rounded-full p-5 shadow-2xl border border-[#D4AF37]/50 backdrop-blur-md">
          <Heart className="w-12 h-12 text-[#c0392b] fill-[#c0392b] animate-pulse" />
        </div>

        {/* Bride Profile */}
        <div className="flex flex-col items-center group">
          {/* Fine Art Photo Frame */}
          <div className="bg-white p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transform transition-all duration-500 group-hover:rotate-2 group-hover:scale-105 border border-gray-100">
            <div className="w-64 h-80 sm:w-80 sm:h-[28rem] overflow-hidden relative">
              <img
                src={bride.imageUrl}
                alt={bride.name}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          {/* Minimal Text Below */}
          <div className="text-center mt-8 space-y-3">
            <p className="text-xs font-montserrat tracking-[0.3em] text-[#D4AF37] drop-shadow-sm uppercase font-semibold">
              {bride.role}
            </p>
            <h3 className="text-5xl sm:text-6xl font-vibes text-[#0D47A1] drop-shadow-md pt-2 pb-1">
              {bride.name}
            </h3>
            <p className="text-sm sm:text-base font-bold font-montserrat text-[#0D47A1] drop-shadow-sm tracking-widest uppercase">
              {bride.parents}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
