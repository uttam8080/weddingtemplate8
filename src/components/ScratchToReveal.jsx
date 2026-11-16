import React, { useRef, useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

const coinCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23D4AF37" stroke="%23AA771C" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><text x="12" y="15" font-size="8" font-family="Arial" font-weight="bold" text-anchor="middle" fill="%23AA771C">₹</text></svg>') 20 20, auto`;

const ScratchHeart = ({ hiddenText, label }) => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  const drawGlowingHeart = (ctx, width, height) => {
    // Canvas is transparent so ONLY the heart scales/animates, leaving the black box still.
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const size = Math.min(width, height) * 0.35;
    
    // Ambient Pink Glow behind the heart
    const gradient = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size * 2);
    gradient.addColorStop(0, "rgba(255, 0, 255, 0.6)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.beginPath();
    const topY = cy - size * 0.2;
    ctx.moveTo(cx, topY);
    ctx.bezierCurveTo(cx, cy - size * 0.9, cx - size * 1.2, cy - size * 0.9, cx - size * 1.2, topY);
    ctx.bezierCurveTo(cx - size * 1.2, cy + size * 0.4, cx, cy + size * 0.9, cx, cy + size * 1.1);
    ctx.bezierCurveTo(cx, cy + size * 0.9, cx + size * 1.2, cy + size * 0.4, cx + size * 1.2, topY);
    ctx.bezierCurveTo(cx + size * 1.2, cy - size * 0.9, cx, cy - size * 0.9, cx, topY);

    // Opaque Fill completely hides the text underneath
    ctx.fillStyle = "#ff00a0";
    ctx.fill();

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff00ff";
    ctx.strokeStyle = "#ff66ff";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.shadowBlur = 5;
    ctx.shadowColor = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.shadowBlur = 5;
    ctx.shadowColor = "#000000";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px Cinzel, serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH", cx, cy - 5);
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    drawGlowingHeart(ctx, canvas.width, canvas.height);
    setIsRevealed(false);
  };

  useEffect(() => {
    initCanvas();
    const t = setTimeout(initCanvas, 100);
    return () => clearTimeout(t);
  }, []);

  const scratchAt = (clientX, clientY, brushRadius = 30) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    checkScratchPercentage(canvas, ctx);
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };
  const handleMouseMove = (e) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };
  const handleMouseUp = () => setIsScratching(false);
  const handleTouchStart = (e) => {
    setIsScratching(true);
    if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY, 30);
  };
  const handleTouchMove = (e) => {
    if (!isScratching) return;
    if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY, 30);
    if (e.cancelable) e.preventDefault();
  };

  const checkScratchPercentage = (canvas, ctx) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;

    if (percentage > 40) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setIsRevealed(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <style>{`
        @keyframes neon-beat {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.4)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 25px rgba(255, 0, 255, 0.8)); }
        }
        .animate-neon-beat {
          animation: neon-beat 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* Replaced black background with an elegant Royal Blue gradient */}
      <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(13,71,161,0.3)] border-2 border-[#D4AF37]/50 bg-gradient-to-br from-[#0D47A1] to-[#082a5e]">
        
        {/* Hidden Content Box (Revealed when scratched) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0D47A1] to-[#082a5e]">
          <h3 className="text-4xl sm:text-5xl font-cinzel font-bold text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {hiddenText}
          </h3>
        </div>

        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: coinCursor }}
          className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-700 animate-neon-beat ${
            isRevealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        />
      </div>
      
      <div className={`mt-5 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <p className="font-cinzel text-xl sm:text-2xl text-[#0D47A1] font-extrabold tracking-[0.2em] uppercase drop-shadow-sm">
          {label}
        </p>
      </div>
    </div>
  );
};

export const ScratchToReveal = () => {
  return (
    <section className="pt-16 pb-36 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center bg-[url('/src/assets/mobile.png')] md:bg-[url('/src/assets/desktopview.png')] bg-cover bg-center bg-no-repeat">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold font-cinzel text-[#0D47A1]">
          Save The Date
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[2px] w-12 bg-[#2196F3]"></div>
          <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          <div className="h-[2px] w-12 bg-[#2196F3]"></div>
        </div>
        <p className="mt-8 font-cormorant text-xl text-gray-600 italic max-w-2xl mx-auto">
          Scratch to reveal the date.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 w-full max-w-4xl">
        <ScratchHeart hiddenText="25" label="Date" />
        <ScratchHeart hiddenText="OCT" label="Month" />
        <ScratchHeart hiddenText="2027" label="Year" />
      </div>

    </section>
  );
};


