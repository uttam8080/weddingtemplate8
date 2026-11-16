import React from "react";
import { Sparkles, Heart, Mail, Phone, Instagram, MapPin } from "lucide-react";
import appData from "../data/data.json";

export const Footer = () => {
  const { brand, footer, scratchToReveal } = appData;

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1e45] to-[#05112c] text-[#E3F2FD] border-t-4 border-[#D4AF37] rounded-t-[40px] md:rounded-t-[60px] pt-10 pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Decorative Mandala/Floral Background Watermark */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] max-w-[800px] text-[#D4AF37]" fill="currentColor">
          <path d="M50 0 C60 30, 80 40, 100 50 C80 60, 60 70, 50 100 C40 70, 20 60, 0 50 C20 40, 40 30, 50 0 Z" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center">
        
        {/* The Couple's Signature Monogram */}
        <div className="flex flex-col items-center mb-6">
          <Sparkles className="w-5 h-5 text-[#D4AF37] mb-2 animate-pulse" />
          <h2 className="font-vibes text-4xl sm:text-5xl text-[#D4AF37] mb-1 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] text-center">
            {scratchToReveal.groomName.split(' ')[0]} &amp; {scratchToReveal.brideName.split(' ')[0]}
          </h2>
          <p className="font-cinzel text-sm sm:text-base text-[#90CAF9] tracking-[0.3em] uppercase">
            Forever &amp; Always
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-4 w-full max-w-[200px]">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="w-full max-w-3xl mx-auto mb-10 mt-4 text-center space-y-4">
          <h4 className="font-cinzel text-xl sm:text-2xl text-[#D4AF37] font-bold tracking-widest uppercase">
            With Heartfelt Gratitude
          </h4>
          <p className="font-cormorant text-lg sm:text-xl text-[#E3F2FD]/90 leading-relaxed max-w-2xl mx-auto italic">
            Thank you for being an essential part of our journey. Your love, presence, and blessings on our special day mean the world to us as we begin this beautiful new chapter together.
          </p>
        </div>

        {/* Footer Bottom */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-4 border-t border-[#D4AF37]/20">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#0a1e45]" />
            </div>
            <span className="font-cinzel text-base font-bold text-[#D4AF37]">
              {brand.name}
            </span>
          </div>
          
          <p className="font-cormorant text-xs text-[#90CAF9] text-center">
            Crafted by <a href="https://tekkzy.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white transition-colors underline decoration-[#D4AF37]/50 underline-offset-2 font-bold font-sans tracking-wide">Tekkzy</a>
          </p>
        </div>

      </div>
    </footer>
  );
};
