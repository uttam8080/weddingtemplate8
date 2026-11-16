import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const AudioPlayer = ({ track, autoPlay = false, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isRunningRef = useRef(false);
  const intervalRef = useRef(null);

  const stopMusic = () => {
    isRunningRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const startMusic = () => {
    stopMusic();
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      isRunningRef.current = true;
      setIsPlaying(true);

      const createDrone = (freq) => {
        if (!ctx || !isRunningRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 4.6);
      };

      const playMelodyNote = (freq, duration, type = "triangle") => {
        if (!ctx || !isRunningRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, ctx.currentTime + duration * 0.5);
        osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration + 0.1);
      };

      const playBell = (freq) => {
        if (!ctx || !isRunningRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3.1);
      };

      const ragaNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

      let noteIdx = 0;
      const playRiff = () => {
        if (!isRunningRef.current || !ctx) return;
        
        createDrone(130.81);
        createDrone(196.00);

        if (track && (track.includes("Temple") || track.includes("Aarti"))) {
          playBell(880);
          setTimeout(() => playBell(1320), 1200);
          playMelodyNote(ragaNotes[noteIdx % ragaNotes.length], 2.0, "sine");
        } else if (track && (track.includes("Shehnai") || track.includes("Nadaswaram"))) {
          playMelodyNote(ragaNotes[noteIdx % ragaNotes.length], 1.2, "sawtooth");
          setTimeout(() => {
            playMelodyNote(ragaNotes[(noteIdx + 2) % ragaNotes.length], 1.5, "sawtooth");
          }, 600);
        } else if (track && track.includes("Dhol")) {
          playMelodyNote(110, 0.4, "square");
          setTimeout(() => playMelodyNote(ragaNotes[noteIdx % 4], 0.8, "triangle"), 300);
        } else {
          playMelodyNote(ragaNotes[noteIdx % ragaNotes.length], 1.8, "sine");
        }

        noteIdx++;
      };

      playRiff();
      intervalRef.current = window.setInterval(playRiff, 2400);

    } catch (e) {
      console.warn("Audio Context init error:", e);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      startMusic();
    }
    return () => {
      stopMusic();
    };
  }, [track]);

  const toggleAudio = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={toggleAudio}
        type="button"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shadow-md ${
          isPlaying
            ? "bg-[#D4AF37] text-[#800020] animate-pulse-gold font-bold"
            : "bg-[#800020] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#a00028]"
        }`}
        title="Toggle Background Music"
      >
        {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
        <span className="truncate max-w-[140px]">{track}</span>
        {isPlaying ? (
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-3 bg-[#800020] animate-pulse"></span>
            <span className="w-0.5 h-2 bg-[#800020] animate-pulse delay-75"></span>
            <span className="w-0.5 h-3 bg-[#800020] animate-pulse delay-150"></span>
          </span>
        ) : null}
      </button>
    </div>
  );
};
