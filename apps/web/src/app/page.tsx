"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';
import { useWaitlist } from '../hooks/useWaitlist';
import Footer from '../components/Footer';
import { Glyph } from '../components/Glyph';

const TiltImage = ({ src, alt, className, sizes = "100vw" }: { src: string, alt: string, className: string, sizes?: string }) => {
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
  const { email, setEmail, status, errorMessage, guardianId, submit } = useWaitlist("hero");

  useEffect(() => {
    setMounted(true);
  }, []);

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
            <button aria-label="Accès fondateur" className="text-[10px] font-mono tracking-[0.2em] uppercase border border-[#333333] px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300">
              Founder Access
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
            Le Grand Codex NIDALUM rassemble des Séquences courtes conçues pour vous aider à retrouver rapidement un état de concentration et d'action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 pointer-events-auto">
            <button className="w-full sm:w-auto bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_20px_rgba(212,175,55,0.4)]">
              Découvrir le Codex
            </button>
            <button className="w-full sm:w-auto border border-gold/20 text-white font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:border-gold hover:shadow-[0_5px_30px_rgba(212,175,55,0.15)] bg-[#050505] animate-[breathe_15s_ease-in-out_infinite]">
              Request Founder Access
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] max-w-3xl z-20 pointer-events-auto"
        >
          <TiltImage src="/images/codex-real.jpg" alt="Le Grand Codex" sizes="(max-width: 768px) 90vw, 60vw" className="w-full aspect-video rounded-t-2xl border-b-0" />
        </motion.div>
      </section>

      {/* PORTE 01 — LE BRUIT */}
      <section id="codex" className="py-32 md:py-40 px-6 bg-[#0a0a0a] relative z-20 border-t border-[#111111]">
        <div className="max-w-3xl mx-auto text-center mb-24 md:mb-32">
          <div className="flex items-center justify-center gap-4 mb-8">
             <div className="h-[1px] w-8 bg-gold"></div>
             <span className="font-mono text-gold text-xs uppercase tracking-[0.3em]">Porte 01 — Le Bruit</span>
             <div className="h-[1px] w-8 bg-gold"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[72px] font-serif text-white mb-12">La théorie ne vous sauvera pas.</h2>
          
          <div className="text-lg sm:text-xl md:text-[22px] text-[#a3a3a3] font-light leading-loose space-y-6">
            <p>Vous connaissez les méthodes.</p>
            <p>Vous avez lu les livres.</p>
            <p>Vous savez quoi faire.</p>
            <p className="text-white font-serif italic text-2xl md:text-3xl my-10">Pourtant...</p>
            <p>Vous n'agissez pas.</p>
            <p>Le problème n'est pas votre volonté.</p>
            <p className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">Le problème est votre environnement.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
          {[
            { role: "LE FONDATEUR", quote: "Je passe mes journées à éteindre des incendies au lieu de bâtir.", trans: "2 minutes de Séquence pour isoler la tâche critique." },
            { role: "LE CADRE", quote: "Mon agenda est plein, mais je n'avance sur rien.", trans: "Un rituel de transition entre chaque réunion." },
            { role: "LE CRÉATIF", quote: "J'attends l'inspiration, mais je trouve l'algorithme.", trans: "Une fréquence sonore qui conditionne le cerveau." }
          ].map((avatar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-white font-serif text-[22px] mb-4 tracking-[0.2em] uppercase">{avatar.role}</h3>
              <p className="text-gold text-lg md:text-[22px] italic mb-6">"{avatar.quote}"</p>
              <Glyph size={16} className="text-[#333333] mb-6" />
              <div className="max-w-xl text-[#a3a3a3] font-light leading-relaxed text-[18px]">
                <span>{avatar.trans}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTE 02 — LA PRISE DE CONSCIENCE */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="/images/codex-real.jpg" alt="Le Grand Codex" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[4/3]" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold font-mono text-xs tracking-widest uppercase">Porte 02 — L'Interrupteur</span>
            </div>
            <h2 className="text-3xl md:text-[48px] font-serif text-white mb-6">L'objet physique lourd.</h2>
            <p className="text-[18px] text-[#a3a3a3] font-light leading-relaxed mb-8">
              NIDALUM ne vous explique pas "pourquoi" vous devez agir. Il vous force à le faire. Ce n'est pas une application. C'est un ancrage tangent dans le monde réel.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gold font-mono text-xs tracking-widest uppercase">Porte 03 — La Fréquence</span>
            </div>
            <h2 className="text-3xl md:text-[48px] font-serif text-white mb-6">Scannez. Exécutez.</h2>
            <p className="text-[18px] text-[#a3a3a3] font-light leading-relaxed mb-8">
              Chaque Séquence contient un QR Code géométrique exclusif. En le scannant, votre téléphone cesse d'être une machine à distraction pour devenir le diffuseur d'un paysage sonore de concentration.
            </p>
          </div>
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="/images/cards-real.jpg" alt="QR Codes NIDALUM" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* PORTE 04 — LE GARDIEN */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center bg-[#050505] p-8 md:p-24 border border-[#1A1A1A] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"></div>
          
          <Glyph size={24} className="mx-auto mb-8 text-gold" />
          
          <h2 className="text-2xl md:text-[48px] font-serif text-white mb-6 relative z-10">La Transmission 001.</h2>
          <p className="text-[#a3a3a3] mb-12 leading-relaxed text-[18px] font-light relative z-10">
            L'Édition Fondatrice est tirée à <strong className="text-white font-normal">100 exemplaires</strong>. Rejoignez le cercle des Fondateurs pour sécuriser votre Guardian ID.
          </p>
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-8 border border-gold/30 bg-[#050505]/80 backdrop-blur-md rounded relative overflow-hidden text-center z-10"
            >
              <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
              <h3 className="font-serif italic text-2xl text-gold mb-6">Bienvenue.</h3>
              <p className="text-white font-light text-[18px] mb-8">
                Votre accès Fondateur est confirmé.
              </p>
              <div className="border-t border-[#222222] pt-6 flex flex-col gap-2 items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#a3a3a3] font-mono">
                  Guardian ID
                </span>
                <span className="text-xl font-mono text-white tracking-widest">
                  {guardianId || 'G-00000'}
                </span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className={`w-full sm:w-96 bg-transparent border ${status === "error" ? "border-red-500" : "border-[#333333] focus:border-gold"} text-white px-6 py-5 focus:outline-none transition-all duration-300 text-sm`}
                required 
              />
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-widest text-sm whitespace-nowrap transition-all duration-300 hover:brightness-110"
              >
                {status === "loading" ? "Signalement..." : "Enter NIDALUM"}
              </button>
            </form>
          )}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
