"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { track } from '@nidalum/analytics';
import Head from 'next/head';

const DAILY_SANCTUARY_DATA = [
  { day: 0, frequency: "Lumina Noctis", quote: "Le silence est le seul véritable luxe de notre époque.", mission: "Purger votre espace de travail." },
  { day: 1, frequency: "Anima Mundi", quote: "Dans un monde qui hurle en permanence, le silence est devenu le luxe ultime. Chaque notification est une tentative d'effraction dans votre forteresse mentale.", mission: "Aujourd'hui, comptez le nombre de fois où vous déverrouillez votre téléphone sans raison précise." },
  { day: 2, frequency: "Aeterna", quote: "La vélocité n'est rien sans la direction.", mission: "Éliminer une friction cognitive." },
  { day: 3, frequency: "Novus Ordo", quote: "Votre volonté est une ressource épuisable. L'environnement ne l'est pas.", mission: "Isoler une zone de flow." },
  { day: 4, frequency: "Sol Invictus", quote: "Bâtissez des fondations silencieuses dans un monde qui hurle.", mission: "Documenter un processus clé." },
  { day: 5, frequency: "Astrum", quote: "Ce que vous ignorez est aussi important que ce que vous regardez.", mission: "Se déconnecter pendant 4 heures." },
  { day: 6, frequency: "Vesper", quote: "L'art de l'essentiel est l'art de l'élimination.", mission: "Planifier la fréquence de demain." },
];

export default function FoundersPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState(DAILY_SANCTUARY_DATA[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // On utilise le jour de la semaine local (0 = Dimanche, 1 = Lundi, etc.)
    const dayOfWeek = new Date().getDay();
    setData(DAILY_SANCTUARY_DATA[dayOfWeek]);

    track('FOUNDER_PAGE_VIEW', { id: params.id });
  }, [params.id]);

  if (!mounted) return null;

  return (
    <main className="bg-[#050505] min-h-screen text-white flex flex-col items-center justify-center selection:bg-gold selection:text-black relative overflow-hidden">
      <Head>
        <title>Sanctuaire | NIDALUM</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Lueur d'ambiance */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-2xl w-full px-6 text-center z-10 flex flex-col items-center"
      >
        <span className="text-[#a3a3a3] font-mono text-xs uppercase tracking-[0.3em] mb-4">Guardian ID</span>
        <h1 className="font-mono text-4xl md:text-5xl text-gold mb-16 tracking-widest drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          {params.id || 'G-XXXXX'}
        </h1>
        
        <div className="w-full text-left space-y-10 border-l border-[#222222] pl-8 relative">
          <div className="absolute left-[-1px] top-0 w-[1px] h-32 bg-gradient-to-b from-gold to-transparent"></div>

          <div>
            <h3 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">Today's Mission</h3>
            <p className="text-white font-light text-xl tracking-wide">{data.mission}</p>
          </div>

          <div>
            <h3 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">Today's Frequency</h3>
            <p className="text-[#a3a3a3] font-serif italic text-2xl">{data.frequency}</p>
          </div>

          <div>
            <h3 className="text-[10px] text-[#666666] font-mono uppercase tracking-widest mb-2">Today's Reflection</h3>
            <p className="text-[#a3a3a3] font-light text-lg">"{data.quote}"</p>
          </div>
        </div>

        <motion.button 
          whileHover={{ y: -2 }}
          onClick={() => track('MISSION_CONTINUE_CLICK', { id: params.id })}
          className="mt-24 border border-[#333333] hover:border-gold hover:text-gold text-[#a3a3a3] uppercase font-mono tracking-widest text-xs px-12 py-4 transition-all duration-300"
        >
          Continue
        </motion.button>
      </motion.div>
    </main>
  );
}
