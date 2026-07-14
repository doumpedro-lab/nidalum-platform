"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
      className={`relative rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-[#222222] ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority />
      {children}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`
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
      // Generate a temporary ID that will become the user's ID
      const tempGuardianId = 'G-' + Math.floor(Math.random() * 90000 + 10000);
      
      const response = await fetch('/api/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guardianId: tempGuardianId, email: null }) // Stripe will ask for the email
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
            <a href="/#codex" className="text-[#a3a3a3] opacity-55 hover:opacity-100 hover:text-white border-b border-transparent hover:border-gold pb-1 transition-all duration-300">Codex</a>
            <span className="text-[#a3a3a3] opacity-55 cursor-not-allowed border-b border-transparent pb-1">Music</span>
            <span className="text-[#a3a3a3] opacity-55 cursor-not-allowed border-b border-transparent pb-1">Books</span>
            <span className="text-[#a3a3a3] opacity-55 cursor-not-allowed border-b border-transparent pb-1">Apps</span>
            <a href="/about" className="text-[#a3a3a3] opacity-55 hover:opacity-100 hover:text-white border-b border-transparent hover:border-gold pb-1 transition-all duration-300">About</a>
          </nav>

          <div className="hidden md:block">
            <button onClick={handleCheckout} disabled={isCheckingOut} aria-label="Accès fondateur" className="text-[10px] font-mono tracking-[0.2em] uppercase border border-[#333333] px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300">
              {isCheckingOut ? "Connexion..." : "Founder Access"}
            </button>
          </div>
        </div>
      </header>

      {/* PORTE 00 — SILENCE (HERO) */}
      <section className="relative min-h-[110vh] flex flex-col justify-start items-center text-center px-4 pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto opacity-20 filter brightness-[0.2] contrast-125 saturate-0">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] pointer-events-none z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 w-full max-w-5xl pointer-events-none relative mt-16"
        >
          <Glyph size={18} className="mx-auto mb-8 text-gold opacity-50" />
          
          <h1 className="text-4xl sm:text-5xl md:text-[72px] font-serif leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a3a3a3]">
            VOUS N'AVEZ PAS BESOIN DE MOTIVATION.<br />
            VOUS AVEZ BESOIN D'
            <motion.span 
              initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-gold block mt-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              UN INTERRUPTEUR.
            </motion.span>
          </h1>
          <p className="text-[#a3a3a3] text-lg sm:text-xl md:text-[22px] max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Le Grand Codex NIDALUM est enfin scellé. Accédez à la Liseuse Immersive et déverrouillez le premier ouvrage fondateur : Le Livre d'Apprentissage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 pointer-events-auto">
            <button onClick={() => document.getElementById('codex')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-transparent border border-[#333333] text-white font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:border-gold hover:text-gold">
              Voir le Grimoire
            </button>
            <button onClick={handleCheckout} disabled={isCheckingOut} className="w-full sm:w-auto border border-gold/40 text-[#050505] font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:border-gold hover:shadow-[0_5px_30px_rgba(212,175,55,0.2)] bg-gold animate-[breathe_15s_ease-in-out_infinite]">
              {isCheckingOut ? "Ouverture..." : "Déverrouiller le Codex (99€)"}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[-15%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[40%] max-w-lg z-20 pointer-events-auto"
        >
          <TiltImage src="/images/grimoire_front.png" alt="Le Livre d'Apprentissage Nidalum" sizes="(max-width: 768px) 90vw, 40vw" className="w-full aspect-[3/4]">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 pointer-events-none">
              <h2 className="text-gold font-serif text-3xl md:text-5xl uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-[-10%] opacity-90">NIDALUM</h2>
              <div className="h-[1px] w-12 bg-gold opacity-50 my-4"></div>
              <p className="text-white font-mono text-xs md:text-sm tracking-widest uppercase opacity-70">Le Livre d'Apprentissage</p>
            </div>
          </TiltImage>
        </motion.div>
      </section>

      {/* PORTE 01 — LE GRIMOIRE */}
      <section id="codex" className="py-32 md:py-40 px-6 bg-[#0a0a0a] relative z-20 border-t border-[#111111]">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold font-mono text-xs tracking-widest uppercase">L'Ouvrage N°1</span>
            </div>
            <h2 className="text-3xl md:text-[56px] font-serif text-white mb-8 leading-tight">Le Livre d'Apprentissage Nidalum.</h2>
            <p className="text-[18px] text-[#a3a3a3] font-light leading-relaxed mb-8">
              Ce n'est pas un ebook PDF que vous allez oublier dans un dossier. C'est un Grimoire interactif conçu pour être lu dans une liseuse sombre, immersive, pensée pour la concentration absolue.
            </p>
            <ul className="space-y-4 mb-10 text-[#a3a3a3] font-light">
              <li className="flex items-center gap-3"><Glyph size={12} className="text-gold"/> Les Fondations du système NIDALUM.</li>
              <li className="flex items-center gap-3"><Glyph size={12} className="text-gold"/> L'Art de l'Interrupteur Mental.</li>
              <li className="flex items-center gap-3"><Glyph size={12} className="text-gold"/> Déverrouillage automatique après paiement.</li>
            </ul>
            <button onClick={handleCheckout} disabled={isCheckingOut} className="border-b border-gold text-gold pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-all">
              Acheter l'accès à vie
            </button>
          </div>
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="/images/grimoire_back.png" alt="Le Sceau Nidalum" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[3/4]">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20 pointer-events-none">
                  <div className="w-24 h-24 border border-gold/30 rounded-full flex items-center justify-center mb-6">
                    <Glyph size={32} className="text-gold opacity-80" />
                  </div>
                  <p className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase opacity-60">Édition Fondatrice</p>
                </div>
             </TiltImage>
          </div>
        </div>
      </section>

      {/* PORTE 02 — LA VISION */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-[48px] font-serif text-white mb-6">L'Écosystème NIDALUM</h2>
          <p className="text-[18px] text-[#a3a3a3] font-light">Votre paiement de 99€ (Founder Access) ne débloque pas seulement le premier Livre, il vous donne la clé de tout ce que nous allons bâtir.</p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-[#1A1A1A] bg-[#0a0a0a] p-8 hover:border-gold/50 transition-all duration-500">
            <h3 className="text-white font-serif text-2xl mb-4">Le Grand Codex</h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">La liseuse immersive sans distraction. Lisez dans le noir absolu.</p>
            <span className="text-gold text-xs font-mono uppercase tracking-widest">Disponible ✔</span>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0a0a0a] p-8 opacity-60">
            <h3 className="text-white font-serif text-2xl mb-4">La Fréquence (Music)</h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">Des paysages sonores isochrones pour forcer votre cerveau à se concentrer.</p>
            <span className="text-[#666] text-xs font-mono uppercase tracking-widest">Prochainement</span>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0a0a0a] p-8 opacity-60">
            <h3 className="text-white font-serif text-2xl mb-4">Les Apps</h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">Des outils utilitaires minimalistes connectés à votre compte Nidalum.</p>
            <span className="text-[#666] text-xs font-mono uppercase tracking-widest">En développement</span>
          </div>
        </div>
      </section>

      {/* PORTE 03 — LE CHECKOUT */}
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
          
          <h2 className="text-2xl md:text-[40px] font-serif text-white mb-6 relative z-10">Founder Access.</h2>
          <p className="text-[#a3a3a3] mb-12 leading-relaxed text-[16px] font-light relative z-10">
            Un paiement unique de <strong className="text-white">99€</strong>.<br/>
            Accès immédiat à la liseuse et au Livre d'Apprentissage.
          </p>
          
          <button 
            onClick={handleCheckout} 
            disabled={isCheckingOut}
            className="w-full bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-widest text-sm transition-all duration-300 hover:brightness-110 disabled:opacity-50"
          >
            {isCheckingOut ? "Redirection vers Stripe..." : "Payer 99€ par carte"}
          </button>
          <p className="text-xs text-[#666] mt-6 font-mono">Paiement sécurisé par Stripe.</p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
