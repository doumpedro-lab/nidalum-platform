"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

// --- PREMIUM 3D TILT COMPONENT ---
// Rendu "lourd" et luxueux : animation très lente, angle très faible (Apple, Leica, Hermès)
const TiltImage = ({ src, alt, className, sizes = "100vw" }: { src: string, alt: string, className: string, sizes?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ressort très lent pour donner la sensation d'un objet de 3 kg
  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 30 });

  // Angle maximal de 3 degrés
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
      <Image 
        src={src} 
        alt={alt} 
        fill 
        sizes={sizes}
        className="object-cover" 
        priority 
      />
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

  useEffect(() => {
    setMounted(true);
    // Cleanup éventuel si on re-déclenche des effets audio globaux plus tard
  }, []);

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="bg-[#050505] min-h-screen text-white font-primary overflow-x-hidden selection:bg-gold selection:text-black">
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 w-full bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#1A1A1A] z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <Image 
                  src="/images/logo.png" 
                  alt="NIDALUM Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
               />
            </div>
            <span className="font-serif font-bold text-lg tracking-widest text-[#F5F5F5] uppercase z-10 pointer-events-none">Nidalum</span>
          </div>

          <nav aria-label="Menu principal" className="hidden md:flex items-center gap-10 text-xs font-mono tracking-widest uppercase text-[#a3a3a3]">
            <a href="#codex" className="hover:text-gold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1">Codex</a>
            <span aria-disabled="true" className="opacity-40 cursor-not-allowed">Music</span>
            <span aria-disabled="true" className="opacity-40 cursor-not-allowed">Books</span>
            <span aria-disabled="true" className="opacity-40 cursor-not-allowed">Apps</span>
            <span aria-disabled="true" className="opacity-40 cursor-not-allowed">About</span>
          </nav>

          <div className="hidden md:block">
            <button aria-label="Accès fondateur" className="text-[10px] font-mono tracking-[0.2em] uppercase border border-[#333333] px-6 py-3 hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_2px_10px_rgba(212,175,55,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Founder Access
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[120vh] flex flex-col justify-start items-center text-center px-4 pt-40 pb-48 overflow-hidden">
        
        {/* SPLINE 3D SCENE BACKGROUND - LUXE SILENCIEUX */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto opacity-20 filter brightness-[0.2] contrast-125 saturate-0">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </div>
        {/* Overlay dégradé pour garantir la lisibilité absolue */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] pointer-events-none z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 w-full max-w-5xl pointer-events-none relative mt-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-[#a3a3a3]">
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
          <p className="text-[#a3a3a3] text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Le Grand Codex NIDALUM rassemble des Séquences courtes conçues pour vous aider à retrouver rapidement un état de concentration et d'action.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 pointer-events-auto">
            <button aria-label="Découvrir le Codex" className="w-full sm:w-auto bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_20px_rgba(212,175,55,0.4)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Découvrir le Codex
            </button>
            <button aria-label="Rejoindre la liste d'attente" className="w-full sm:w-auto border border-[#333333] text-white font-bold py-5 px-10 uppercase tracking-[0.15em] text-sm md:text-base transition-all duration-300 hover:-translate-y-[2px] hover:border-gold hover:shadow-[0_5px_20px_rgba(212,175,55,0.1)] hover:bg-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
              Rejoindre la Liste
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 md:gap-16 text-[#a3a3a3] font-mono uppercase tracking-widest text-xs md:text-sm pt-8">
            <div><span className="text-white font-bold">10</span> Séquences</div>
            <div><span className="text-white font-bold">2</span> Minutes</div>
            <div><span className="text-white font-bold">1</span> Objectif : Le Contrôle</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] max-w-4xl z-20 pointer-events-auto"
        >
          <TiltImage 
            src="/images/codex-real.jpg" 
            alt="Le Grand Codex NIDALUM - Édition Réelle" 
            sizes="(max-width: 768px) 90vw, 70vw"
            className="w-full aspect-video rounded-t-2xl border-b-0"
          />
        </motion.div>
      </section>

      {/* SECTION: LE PROBLÈME */}
      <section id="codex" className="py-32 md:py-40 px-6 bg-[#0a0a0a] relative z-20 border-t border-[#111111]">
        <div className="max-w-4xl mx-auto text-center mb-24 md:mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white mb-12">La théorie ne vous sauvera pas.</h2>
          
          <div className="text-lg sm:text-xl md:text-2xl text-[#a3a3a3] font-light leading-loose space-y-6">
            <p>Vous connaissez les méthodes.</p>
            <p>Vous avez lu les livres.</p>
            <p>Vous savez quoi faire.</p>
            <p className="text-white font-serif italic text-2xl md:text-3xl my-10">Pourtant...</p>
            <p>Vous n'agissez pas.</p>
            <p>Le problème n'est pas votre volonté.</p>
            <p className="text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">Le problème est votre environnement.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-24 md:space-y-32">
          {[
            {
              role: "LE FONDATEUR",
              quote: "Je passe mes journées à éteindre des incendies au lieu de bâtir.",
              frust: "S'épuise dans la fatigue décisionnelle avant même le début de sa journée de travail.",
              trans: "2 minutes de Séquence pour isoler la tâche critique et forcer l'exécution silencieuse."
            },
            {
              role: "LE CADRE",
              quote: "Mon agenda est plein, mais je n'avance sur rien.",
              frust: "Noyé sous des réunions bureaucratiques, il perd son élan et son focus profond.",
              trans: "Un rituel de transition entre chaque réunion pour purger l'esprit et se re-focaliser."
            },
            {
              role: "LE CRÉATIF",
              quote: "J'attends l'inspiration, mais je trouve l'algorithme.",
              frust: "Repousse l'instant fatidique par peur de la page blanche et se réfugie dans le scroll.",
              trans: "Une fréquence sonore (QR Code) qui conditionne le cerveau à entrer en état de flow."
            }
          ].map((avatar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <h3 className="text-white font-serif text-xl md:text-2xl mb-4 tracking-[0.2em]">{avatar.role}</h3>
              <p className="text-gold text-base md:text-lg italic mb-6">"{avatar.quote}"</p>
              <div className="w-[1px] h-20 bg-gradient-to-b from-[#333333] to-transparent mb-6"></div>
              <div className="max-w-xl text-[#a3a3a3] font-light leading-relaxed text-sm md:text-base">
                <span className="block mb-4"><strong className="text-white font-normal">La Frustration :</strong> {avatar.frust}</span>
                <span className="block"><strong className="text-white font-normal">La Transformation :</strong> {avatar.trans}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: L'INGÉNIERIE PHYSIQUE */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="/images/codex-real.jpg" alt="Le Grand Codex vue de face" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[4/3]" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">L'objet physique lourd.</h2>
            <p className="text-base md:text-lg text-[#a3a3a3] font-light leading-relaxed mb-8">
              NIDALUM ne vous explique pas "pourquoi" vous devez agir. Il vous force à le faire. L'Édition Fondatrice est conçue pour créer une rupture tangible dans votre environnement. Ce n'est pas une application. C'est un ancrage.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-gold"></div>
              <div className="text-gold font-mono text-xs md:text-sm tracking-widest uppercase">Étape 01 — Rupture Visuelle</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Scannez. Exécutez.</h2>
            <p className="text-base md:text-lg text-[#a3a3a3] font-light leading-relaxed mb-8">
              Chaque Séquence contient un QR Code géométrique exclusif. En le scannant, votre téléphone cesse d'être une machine à distraction pour devenir le diffuseur d'un paysage sonore de concentration (Fréquences NIDALUM).
            </p>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-gold"></div>
              <div className="text-gold font-mono text-xs md:text-sm tracking-widest uppercase">Étape 02 — Rupture Sonore</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 perspective-[1200px]">
             <TiltImage src="/images/cards-real.jpg" alt="QR Codes NIDALUM interactifs" sizes="(max-width: 768px) 100vw, 50vw" className="w-full aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* SECTION: ANATOMIE DU SYSTÈME */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a] border-t border-[#111111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">L'Anatomie du Système.</h2>
            <div className="w-px h-16 bg-gold mx-auto opacity-50"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h4 className="text-lg md:text-xl font-serif text-white mb-4">Pourquoi le papier ?</h4>
              <p className="text-[#a3a3a3] font-light leading-relaxed text-sm">
                Un écran sollicite la dopamine et invite à la distraction. Le papier lourd, texturé, impose un rythme ralenti. Il force le cerveau à sortir du mode "consommation" pour entrer en mode "exécution".
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-serif text-white mb-4">Pourquoi 2 minutes ?</h4>
              <p className="text-[#a3a3a3] font-light leading-relaxed text-sm">
                La résistance psychologique est proportionnelle à la durée de la tâche perçue. Lire pendant 2 minutes est une barrière à l'entrée suffisamment basse pour court-circuiter la procrastination.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-serif text-white mb-4">Comment fonctionne Oracle ?</h4>
              <p className="text-[#a3a3a3] font-light leading-relaxed text-sm">
                Oracle n'est pas une application de productivité. C'est le bras armé digital du Codex. En scannant un QR Code, Oracle diffuse une fréquence psychoacoustique précise pour isoler votre esprit de l'environnement immédiat.
              </p>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-serif text-white mb-4">Pourquoi seulement 100 exemplaires ?</h4>
              <p className="text-[#a3a3a3] font-light leading-relaxed text-sm">
                Pour créer le système parfait, nous avons besoin de données réelles et de retours sans filtre. Ces 100 Gardiens fondateurs forgeront les fondations de l'écosystème global NIDALUM.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST SECTION */}
      <section className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center bg-[#050505] p-8 md:p-24 border border-[#1A1A1A] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"></div>
          
          <h2 className="text-2xl md:text-5xl font-serif text-white mb-6 relative z-10">Rejoignez les 100 premiers Gardiens.</h2>
          <p className="text-[#a3a3a3] mb-12 leading-relaxed text-base md:text-lg font-light relative z-10">
            L'Édition Fondatrice est tirée à <strong className="text-white font-normal">100 exemplaires numérotés</strong>. Les 100 premiers inscrits recevront l'accès prioritaire à la précommande.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <input 
              type="email" 
              aria-label="Adresse email"
              placeholder="Votre adresse email" 
              className="w-full sm:w-96 bg-transparent border border-[#333333] text-white px-6 py-5 focus:outline-none focus:border-gold transition-all duration-300 text-sm placeholder:text-[#444444]"
              required 
            />
            <button 
              type="submit" 
              aria-label="Valider l'inscription à la liste d'attente"
              className="bg-gold text-[#050505] font-bold py-5 px-10 uppercase tracking-widest text-sm whitespace-nowrap transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_5px_15px_rgba(212,175,55,0.3)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Accès Fondateur
            </button>
          </form>
          <p className="text-[#444444] text-xs mt-8 uppercase tracking-widest font-mono relative z-10">Système crypté. Zéro distraction.</p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#111111] pt-24 pb-12 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end border-b border-[#111111] pb-12">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wider mb-4">NIDALUM</h3>
              <p className="text-[#a3a3a3] font-light max-w-sm">
                Le système d'ingénierie comportementale pour les créateurs et décideurs.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex gap-4">
               {[
                 { name: 'Instagram', url: 'https://instagram.com' },
                 { name: 'X', url: 'https://twitter.com' },
                 { name: 'LinkedIn', url: 'https://linkedin.com' },
                 { name: 'YouTube', url: 'https://youtube.com' }
               ].map((social) => (
                 <a 
                   key={social.name} 
                   href={social.url} 
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label={`Aller sur ${social.name}`}
                   className="w-10 h-10 border border-[#222222] rounded-full flex items-center justify-center text-[#a3a3a3] hover:text-gold hover:border-gold transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                 >
                   <span className="text-[10px] uppercase font-mono" aria-hidden="true">{social.name[0]}</span>
                 </a>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Écosystème</h4>
              <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
                <li><a href="#codex" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Le Grand Codex</a></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Oracle NIDALUM</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">NIDALUM Music</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Les Fréquences</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Les Applications</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Les Livres</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">La Boutique</span></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Écouter</h4>
              <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
                <li><a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Spotify</a></li>
                <li><a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Apple Music</a></li>
                <li><a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">YouTube Music</a></li>
                <li><a href="https://music.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Amazon Music</a></li>
                <li><a href="https://deezer.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Deezer</a></li>
                <li><a href="https://tidal.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Tidal</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Réseaux</h4>
              <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">YouTube</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Instagram</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">TikTok</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Pinterest</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">X (Twitter)</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Entreprise</h4>
              <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Notre Manifeste</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">À propos</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Contact</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Presse</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Partenaires</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Mentions légales</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Confidentialité</span></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Communauté</h4>
              <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Newsletter</span></li>
                <li><span aria-disabled="true" className="text-[#333333] cursor-not-allowed block px-1">Discord (Bientôt)</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Beta Testers</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Ambassadeurs</span></li>
                <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Centre d'aide</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#111111] pt-12 flex flex-col items-center justify-center text-center">
            <h5 className="font-serif italic text-2xl md:text-3xl text-[#333333] mb-8">Attention is the last currency.</h5>
            <div className="flex flex-col md:flex-row justify-between w-full text-[#444444] text-[10px] uppercase tracking-[0.2em] font-mono">
              <span>© 2026 NIDALUM</span>
              <span className="mt-4 md:mt-0 text-gold opacity-50">Forged in Germany. Used Worldwide.</span>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
