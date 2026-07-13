"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function AmbientPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Recuperation de l'etat depuis le local storage
    const savedState = localStorage.getItem('nidalum_ambient_music');
    if (savedState === 'true') {
      setIsPlaying(true);
      // On mount, if it was playing, we can try to play it. But browser autoplay policy might block it.
      // Since the CEO wants NO AUTOPLAY on load, we'll keep the state but wait for user interaction?
      // Wait, if they navigate, it should continue playing.
      // But in a Next.js App Router layout, the component stays mounted across pages, so the audio won't stop!
      // So we just need the localStorage to remember if they come back tomorrow.
      if (audioRef.current) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
           fadeIn(audioRef.current!);
           if (typeof window !== 'undefined' && (window as any).gtag) {
             (window as any).gtag('event', 'AUDIO_ACTIVATED');
           }
        }).catch(e => {
           // Auto-play blocked, user needs to click again
           console.warn("Autoplay blocked by browser. User interaction required.");
           setIsPlaying(false);
           localStorage.setItem('nidalum_ambient_music', 'false');
        });
      }
    }
  }, []);

  const fadeIn = (audio: HTMLAudioElement) => {
    let vol = 0;
    audio.volume = 0;
    const interval = setInterval(() => {
      if (vol < 0.5) { // Max volume 0.5 for background ambient
        vol += 0.05;
        audio.volume = Math.min(vol, 0.5);
      } else {
        clearInterval(interval);
      }
    }, 200); // 10 steps of 200ms = 2s
  };

  const fadeOut = (audio: HTMLAudioElement, callback: () => void) => {
    let vol = audio.volume;
    const interval = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audio.volume = Math.max(vol, 0);
      } else {
        clearInterval(interval);
        audio.volume = 0;
        callback();
      }
    }, 200);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      fadeOut(audioRef.current, () => {
        audioRef.current?.pause();
        setIsPlaying(false);
        localStorage.setItem('nidalum_ambient_music', 'false');
      });
    } else {
      setIsPlaying(true);
      localStorage.setItem('nidalum_ambient_music', 'true');
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeIn(audioRef.current!);
      }).catch(e => console.error(e));
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/audio/anima_mundi_placeholder.mp3"
        preload="none"
        loop
      />
      
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Désactiver l'ambiance sonore" : "Activer l'ambiance sonore"}
        className="w-10 h-10 rounded-full border border-[#222222] bg-[#050505]/80 backdrop-blur-md flex items-center justify-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-colors hover:border-gold"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {isPlaying ? (
            <>
              {/* Onde respirante / pulsation douce */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-full h-full rounded-full border border-gold"
              />
              {/* Point central actif */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-gold"
              />
            </>
          ) : (
            // Point central inactif
            <div className="w-1.5 h-1.5 rounded-full bg-[#444444] group-hover:bg-[#a3a3a3] transition-colors" />
          )}
        </div>
      </button>
    </div>
  );
}
