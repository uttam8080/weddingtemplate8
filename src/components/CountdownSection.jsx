import React, { useState, useEffect } from "react";
import { DiyaSvg } from "./DecorativeSvg";
import appData from "../data/data.json";

export const CountdownSection = () => {
  const countdownData = appData.countdown;
  const targetDate = new Date(countdownData.targetDate);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft()); // Initial set
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [countdownData.targetDate]);

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 w-full mx-auto space-y-16 bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-top bg-no-repeat min-h-screen flex flex-col justify-center">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-[#0D47A1]">
          {countdownData.sectionTitle}
        </h2>
      </div>

      {/* Countdown Card Canvas */}
      <div className="bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#0D47A1] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#90CAF9] shadow-2xl relative overflow-hidden text-center space-y-8">
        <div className="absolute top-4 left-4 opacity-20 hidden sm:block">
          <DiyaSvg size={48} />
        </div>
        <div className="absolute top-4 right-4 opacity-20 hidden sm:block">
          <DiyaSvg size={48} />
        </div>

        <div className="relative z-10 space-y-2">
          <p className="text-sm font-semibold tracking-widest text-[#90CAF9] uppercase font-montserrat">
            {targetDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} • {countdownData.locationStr}
          </p>
          <p className="text-base font-cormorant text-[#E3F2FD]/90 max-w-xl mx-auto leading-relaxed">
            Counting down every precious second until {countdownData.coupleNames}'s auspicious wedding vows.
          </p>
        </div>

        {/* Timer Counters Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#90CAF9]/40 shadow-inner flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-transform">
            <span className="text-4xl sm:text-6xl font-bold font-cinzel text-white drop-shadow-md">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#90CAF9]">
              Days
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#90CAF9]/40 shadow-inner flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-transform">
            <span className="text-4xl sm:text-6xl font-bold font-cinzel text-white drop-shadow-md">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#90CAF9]">
              Hours
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#90CAF9]/40 shadow-inner flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-transform">
            <span className="text-4xl sm:text-6xl font-bold font-cinzel text-white drop-shadow-md">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#90CAF9]">
              Minutes
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#90CAF9]/40 shadow-inner flex flex-col items-center justify-center space-y-1 transform hover:scale-105 transition-transform">
            <span className="text-4xl sm:text-6xl font-bold font-cinzel text-[#90CAF9] drop-shadow-md animate-pulse">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#90CAF9]">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
