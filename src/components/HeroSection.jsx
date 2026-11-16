import React, { useEffect, useRef } from "react";
import { PalaceArchSvg, MandalaSvg, LotusSvg } from "./DecorativeSvg";
import appData from "../data/data.json";

export const HeroSection = ({
  featuredCard,
  onPreviewCard,
}) => {
  const heroData = appData.hero;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener("resize", handleResize);

    const particles = [];
    const colors = ["#2196F3", "#90CAF9", "#E3F2FD", "#0D47A1", "#64B5F6"];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 6 + 2,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: Math.sin(Math.random() * Math.PI) * 0.5 - 0.25,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        isPetal: Math.random() > 0.4,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.isPetal) {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#D4AF37";
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black border-b border-[#2196F3]/30">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[80%_center] md:object-center z-0"
      >
        <source src="https://res.cloudinary.com/n0c7bqpd/video/upload/v1785775344/TensorPix_-_Couple_embracing_on_balcony_202608021631_online-video-cutter_1_nctojp.mp4" type="video/mp4" />
      </video>

      {/* Falling Particles Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[1] opacity-80"
      />

      {/* Left-Aligned Text Overlay */}
      <div className="absolute inset-y-0 left-0 w-full md:w-3/5 lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 z-20 pointer-events-none bg-gradient-to-r from-black/80 via-black/40 to-transparent">
        
        <p className="font-montserrat font-bold text-xs sm:text-sm text-white tracking-[0.4em] uppercase mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {heroData.badge}
        </p>

        <h1 className="font-vibes text-7xl sm:text-8xl md:text-[8rem] text-[#D4AF37] drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] leading-none py-2">
          {heroData.title.split(' & ')[0]} 
          <span className="block font-cinzel text-4xl sm:text-5xl text-white/90 ml-12 my-2">&amp;</span> 
          {heroData.title.split(' & ')[1]}
        </h1>

        <div className="mt-8 flex items-center gap-6">
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
          <p className="font-cormorant text-2xl sm:text-3xl text-white italic drop-shadow-lg font-medium">
            {heroData.eventDate}
          </p>
        </div>
        
        <p className="font-cormorant font-bold text-lg sm:text-xl text-white mt-6 max-w-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
          {heroData.subtitle}
        </p>

      </div>

    </section>
  );
};
