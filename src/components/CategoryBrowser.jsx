import React, { useState, useEffect } from "react";
import { DiyaSvg } from "./DecorativeSvg";
import appData from "../data/data.json";

export const CategoryBrowser = ({
  templates,
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const photoGallery = appData.photoGallery || { sectionTitle: "Royal Themes & Gallery" };
  const filteredTemplates = templates;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-rotate the carousel every 1 second
  useEffect(() => {
    if (filteredTemplates.length <= 1 || isHovered || isLightboxOpen) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredTemplates.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [filteredTemplates.length, isHovered, isLightboxOpen]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  return (
    <section className="py-16 w-full overflow-hidden bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-center bg-no-repeat">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
            {photoGallery?.sectionTitle || "Royal Themes & Gallery"}
          </h2>
          <p className="text-sm font-cormorant text-[#0D47A1]/80 mt-2">
            Swipe or click cards to explore our royal themes
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div 
          className="relative w-full h-[480px] sm:h-[600px] flex justify-center items-center py-10 group"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 sm:w-14 sm:h-14 bg-white/50 hover:bg-white backdrop-blur-md text-[#0D47A1] rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg border border-[#90CAF9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={() => setActiveIndex((prev) => (prev - 1 + filteredTemplates.length) % filteredTemplates.length)}
            aria-label="Previous theme"
          >
            &#10094;
          </button>
          
          <button
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 sm:w-14 sm:h-14 bg-white/50 hover:bg-white backdrop-blur-md text-[#0D47A1] rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg border border-[#90CAF9]/50 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onClick={() => setActiveIndex((prev) => (prev + 1) % filteredTemplates.length)}
            aria-label="Next theme"
          >
            &#10095;
          </button>
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, idx) => {
              const len = filteredTemplates.length;
              let offset = idx - activeIndex;
              
              // Adjust offset to wrap around seamlessly
              if (offset < -Math.floor(len / 2)) offset += len;
              if (offset > Math.floor(len / 2)) offset -= len;
              
              // Calculations for 3D positioning
              const isCenter = offset === 0;
              const translateX = offset * (window.innerWidth < 640 ? 110 : 180); // Closer on mobile
              const translateZ = Math.abs(offset) * -180;
              const rotateY = offset * -25;
              const zIndex = 50 - Math.abs(offset);
              const opacity = Math.abs(offset) > 2 ? 0 : 1;
              const pointerEvents = Math.abs(offset) > 2 ? "none" : "auto";

              return (
                <div
                  key={template.id}
                  onClick={() => {
                    if (activeIndex === idx) {
                      setIsLightboxOpen(true);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between w-64 sm:w-80 bg-white rounded-3xl overflow-hidden border-[6px] cursor-pointer ${
                    isCenter ? 'border-[#2196F3] shadow-[0_20px_50px_rgba(33,150,243,0.3)]' : 'border-[#90CAF9]/40 shadow-xl'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                    pointerEvents,
                  }}
                >
                  {/* Card Image Header */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#0D47A1] h-full">
                    <img
                      src={template.coverImageUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"}
                      alt={template.title}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${isCenter ? 'scale-105' : 'scale-100'}`}
                    />
                    
                    {/* Subtle overlay for inactive cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] transition-opacity duration-700"></div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-[#2196F3] p-8 space-y-4 max-w-xl mx-auto z-50 relative">
              <DiyaSvg size={50} className="mx-auto text-[#0D47A1]" />
              <h3 className="font-cinzel text-xl font-bold text-[#0D47A1]">
                No themes available
              </h3>
              <p className="text-sm text-[#0D47A1]/80 max-w-md mx-auto">
                You can customize any royal template or build a unique card from scratch using our AI Studio.
              </p>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-[#90CAF9] bg-white/10 hover:bg-white/20 rounded-full w-12 h-12 flex items-center justify-center text-3xl z-50 transition-colors duration-200"
              onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
            >
              &times;
            </button>

            {/* Lightbox Left Arrow */}
            <button
              className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-16 sm:h-16 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-300 backdrop-blur-sm border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev - 1 + filteredTemplates.length) % filteredTemplates.length);
              }}
            >
              &#10094;
            </button>

            {/* Lightbox Right Arrow */}
            <button
              className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-16 sm:h-16 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all duration-300 backdrop-blur-sm border border-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev + 1) % filteredTemplates.length);
              }}
            >
              &#10095;
            </button>

            <img 
              src={filteredTemplates[activeIndex]?.coverImageUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800"} 
              alt={filteredTemplates[activeIndex]?.title || "Theme"} 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};
