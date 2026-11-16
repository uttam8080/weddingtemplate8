import React, { useState } from "react";
import { Clock, MapPin, Shirt } from "lucide-react";
import { DiyaSvg } from "./DecorativeSvg";
import appData from "../data/data.json";

export const WeddingEvents = () => {
  const events = appData.weddingEvents;
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 w-full space-y-8 sm:space-y-12 bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cinzel text-[#0D47A1] mb-4 sm:mb-6">
          Wedding Events
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-[2px] w-8 sm:w-12 bg-[#2196F3]"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rotate-45 bg-[#D4AF37]"></div>
          <div className="h-[2px] w-8 sm:w-12 bg-[#2196F3]"></div>
        </div>
      </div>

      {/* Accordion Container (Vertical on Mobile, Horizontal on Desktop) */}
      <div 
        className="flex flex-col md:flex-row h-[750px] md:h-[600px] gap-2 w-full max-w-7xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
        onMouseLeave={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768) setActiveId(null); }}
      >
        {events.map((evt) => {
          const isActive = activeId === evt.id;
          const isNoneActive = activeId === null;
          
          return (
            <div
              key={evt.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isActive ? 'flex-[6] md:flex-[5]' : isNoneActive ? 'flex-1' : 'flex-[1] md:flex-[0.5]'} 
                ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}
                border border-white/10
              `}
              onMouseEnter={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768) setActiveId(evt.id); }}
              onClick={() => setActiveId(isActive ? null : evt.id)}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={evt.imageUrl} 
                  alt={evt.title} 
                  className="w-full h-full object-cover transition-transform duration-[2000ms]" 
                  style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                  referrerPolicy="no-referrer"
                />
                {/* Gradient overlay for readability */}
                <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/50 to-transparent' : 'bg-black/40'}`}></div>
              </div>

              {/* Collapsed State (Title Strip) - Horizontal text on mobile, Vertical on Desktop */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-opacity duration-500 delay-100 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <h3 className="text-white font-cinzel font-bold text-2xl tracking-widest text-center md:-rotate-90 md:whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {evt.title}
                </h3>
              </div>

              {/* Expanded State (Full Details) */}
              <div className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-10 transition-opacity duration-700 ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-5 sm:p-8 transform transition-all duration-700 translate-y-0 overflow-y-auto overflow-x-hidden no-scrollbar">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div>
                      <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md mb-3 inline-block tracking-widest uppercase">
                        {evt.date}
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white drop-shadow-lg mb-2 leading-tight">
                        {evt.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-montserrat text-[#90CAF9] uppercase tracking-widest font-semibold drop-shadow">
                        {evt.subtitle}
                      </p>
                    </div>
                    <div className="hidden sm:block opacity-80">
                      <DiyaSvg size={48} />
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 mt-2 sm:mt-0">
                    <div className="flex items-center gap-3 text-sm sm:text-base font-semibold text-white drop-shadow">
                      <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span className="truncate">{evt.time}</span>
                    </div>

                    <div className="flex items-start gap-3 text-sm sm:text-base text-gray-100 drop-shadow">
                      <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-white">{evt.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm sm:text-base text-gray-100 bg-white/10 p-3.5 rounded-xl border border-white/20 shadow-inner w-full sm:w-fit">
                      <Shirt className="w-5 h-5 text-[#D4AF37] shrink-0" />
                      <span className="truncate"><strong className="font-semibold text-white">Code:</strong> {evt.dressCode}</span>
                    </div>

                    <div className="hidden sm:block h-[1px] w-24 bg-[#D4AF37] my-4"></div>

                    <p className="text-xs sm:text-base text-gray-200 font-cormorant leading-snug sm:leading-relaxed italic max-w-xl line-clamp-3 sm:line-clamp-none mt-2 sm:mt-0">
                      "{evt.description}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
