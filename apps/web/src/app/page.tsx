"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles';
import { Spotlight } from '@/components/ui/spotlight';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import Footer from '../components/Footer';
import { Glyph } from '../components/Glyph';

const TiltImage = ({ src, alt, className, sizes = "100vw", children }: { src: string, alt: string, className: string, sizes?: string, children?: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className={`relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-nidalum-gold/20 bg-nidalum-black/80 backdrop-blur-md flex items-center justify-center ${className}`}
    >
      {children}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`
        }}
      />
    </motion.div>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch('/api/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: null })
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No URL returned", data);
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setIsCheckingOut(false);
    }
  };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="bg-[#050505] min-h-screen text-white font-primary overflow-x-hidden selection:bg-gold selection:text-black">
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#1A1A1A] z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <Glyph size={24} className="text-white group-hover:text-gold transition-colors duration-500" />
            <span className="font-serif font-bold tracking-[0.25em] text-[#F5F5F5] uppercase z-10">NIDALUM</span>
          </div>

          <nav aria-label="Menu principal" className="hidden md:flex items-center gap-10 text-xs font-mono tracking-widest uppercase">
            <a href="/#codex" className="text-[#a3a3a3] opacity-55 hover:opacity-100 hover:text-white border-b border-transparent hover:border-gold pb-1 transition-all duration-300">Library</a>
            <span className="text-[#a3a3a3] opacity-55 cursor-not-allowed border-b border-transparent pb-1">Manifesto</span>
          </nav>

          <div className="hidden md:block">
            <button onClick={handleCheckout} disabled={isCheckingOut} aria-label="Accès fondateur" className="text-[10px] font-mono tracking-[0.2em] uppercase border border-[#333333] px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300">
              {isCheckingOut ? "Connexion..." : "Founder Library"}
            </button>
          </div>
        </div>
      </header>

      {/* PORTE 00 — SILENCE (HERO) */}
      <section className="relative min-h-[100vh] flex flex-col justify-start items-center text-center px-4 pt-32 pb-32 overflow-hidden">
        
        {/* Aceternity Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Backgrounds (Spline + Aceternity Sparkles) */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto opacity-70 mix-blend-screen">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
        
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.5}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505] pointer-events-none z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 w-full max-w-5xl pointer-events-none relative mt-16"
        >
          <h1 className="text-5xl md:text-[90px] lg:text-[110px] font-serif leading-[1.05] tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#888888]">
            REPRENEZ LE CONTRÔLE.
          </h1>
          
          <div className="flex justify-center items-center pointer-events-auto mt-8">
            <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-500 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              Entrer dans l'Écosystème
            </button>
          </div>
        </motion.div>
      </section>

      {/* Product Block moved to section below */}

      {/* PORTE 01 — LE PACK COMPLET */}
      <section id="offer" className="py-24 md:py-40 px-6 bg-[#0a0a0a] relative z-20 border-t border-[#111111]">
        
        {/* NIDALUM ÉCOSYSTÈME FLOATING CARD */}
        <div className="flex justify-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-[90%] md:w-[40%] max-w-sm z-20 pointer-events-auto"
          >
            <TiltImage src="" alt="EBOOK NIDALUM" sizes="(max-width: 768px) 90vw, 40vw" className="w-full aspect-[3/4] group cursor-pointer hover:shadow-[0_20px_80px_rgba(255,248,231,0.15)] transition-shadow duration-500 border border-nidalum-gold/20 bg-[#050505]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 pointer-events-none">
                <h2 className="text-nidalum-gold font-serif text-3xl md:text-5xl uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-100 group-hover:scale-105 transition-transform duration-500">NIDALUM</h2>
                <div className="h-[1px] w-16 bg-nidalum-gold opacity-60 my-6"></div>
                <p className="text-white font-mono text-xs md:text-sm tracking-[0.4em] uppercase opacity-90">ÉCOSYSTÈME</p>
              </div>
            </TiltImage>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold font-mono text-xs tracking-widest uppercase">L'Offre Intégrale</span>
            </div>
            <h2 className="text-3xl md:text-[48px] font-serif text-white mb-8 leading-tight">La Founder Library contient cinq ouvrages fondateurs.</h2>
            <p className="text-[18px] text-[#a3a3a3] font-light leading-relaxed mb-12">
              Le silence absolu face au bruit du monde moderne. Une bibliothèque secrète, conçue pour vous couper de la distraction et vous ancrer dans l'action profonde.
            </p>
            
            <div className="bg-[#050505] border border-[#1A1A1A] p-8 mb-10">
              <h3 className="text-gold font-mono text-xs tracking-widest uppercase mb-6">Ce que vous recevez :</h3>
              <ul className="space-y-2 mb-8 font-mono text-sm text-[#888888]">
                <li className="flex items-center justify-between border-b border-[#1A1A1A] pb-3">
                  <span className="flex items-center gap-3"><Glyph size={12} className="text-nidalum-gold"/> Plateforme Web App (Founder Library)</span>
                </li>
                <li className="flex flex-col border-b border-[#1A1A1A] pb-3 mt-3">
                  <span className="flex items-center gap-3"><Glyph size={12} className="text-nidalum-gold"/> Le Grand Codex (Lecture Web, PDF HD, EPUB)</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mt-3">
                  <span className="flex items-center gap-3"><Glyph size={12} className="text-nidalum-gold"/> Fréquences Musicales Neuro-Acoustiques</span>
                </li>
                <li className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mt-3">
                  <span className="flex items-center gap-3"><Glyph size={12} className="text-nidalum-gold"/> Protocoles & Outils Stratégiques</span>
                </li>
                <li className="flex items-center justify-between mt-3">
                  <span className="flex items-center gap-3"><Glyph size={12} className="text-nidalum-gold"/> Accès à vie & Mises à jour incluses</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center border border-gold/20 p-6 bg-gold/5">
                <span className="text-white font-serif text-3xl mb-1">99 €</span>
                <span className="text-[#a3a3a3] font-mono text-xs tracking-widest uppercase line-through mb-4">Valeur totale : 145 €</span>
                
                <button 
                  onClick={handleCheckout} 
                  disabled={isCheckingOut}
                  className="w-full bg-gold text-[#050505] font-bold py-5 px-8 uppercase tracking-widest text-sm transition-all duration-300 hover:brightness-110 disabled:opacity-50"
                >
                  {isCheckingOut ? "Ouverture..." : "Access the Founder Library"}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-2">
                <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Created in Germany</div>
                <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Independent publisher</div>
                <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Digital Edition</div>
                <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Secure by Stripe
                </div>
              </div>
            </div>
            
          </div>
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="" alt="Le Sceau Nidalum" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[3/4]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 pointer-events-none">
                  <div className="w-24 h-24 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                    <Glyph size={32} className="text-gold opacity-80" />
                  </div>
                  <p className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase opacity-60">Pack Fondateur</p>
                </div>
             </TiltImage>
          </div>
        </div>
      </section>

      {/* PORTE 03 — LE CHECKOUT RAPIDE (FOOTER) */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center bg-[#050505] p-8 md:p-16 border border-[#1A1A1A] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"></div>
          
          <Glyph size={24} className="mx-auto mb-8 text-gold" />
          
          <h2 className="text-2xl md:text-[40px] font-serif text-white mb-2 relative z-10">Founder Library.</h2>
          <p className="text-[#666] font-mono text-sm tracking-widest uppercase mb-8 relative z-10">
            <span className="line-through mr-3">Valeur : 145 €</span>
            <span className="text-gold">Aujourd'hui : 99 €</span>
          </p>

          <p className="text-[#a3a3a3] mb-12 leading-relaxed text-[16px] font-light relative z-10">
            Paiement unique. Accès immédiat au téléchargement des 5 Livres Fondateurs (PDF/EPUB) et à la liseuse Web. <br/>
            <span className="text-gold italic mt-2 inline-block">Lifetime updates included.</span>
          </p>
          
          <button 
            onClick={handleCheckout} 
            disabled={isCheckingOut}
            className="w-full bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-widest text-sm transition-all duration-300 hover:brightness-110 disabled:opacity-50"
          >
            {isCheckingOut ? "Redirection vers Stripe..." : "Access the Founder Library"}
          </button>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-8 pt-6 border-t border-[#1A1A1A]">
            <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Created in Germany</div>
            <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Independent publisher</div>
            <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase">Digital Edition</div>
            <div className="text-[#666] font-mono text-[9px] tracking-widest uppercase flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Secure by Stripe
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
