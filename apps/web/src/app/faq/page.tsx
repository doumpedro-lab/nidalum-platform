"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Footer from '../../components/Footer';
import { Glyph } from '../../components/Glyph';
import { track } from '@nidalum/analytics';

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le Grand Codex ?",
    answer: "Le Grand Codex est un système d'ingénierie comportementale, composé de 52 Séquences. Chaque séquence est un outil asymétrique conçu pour briser un blocage mental spécifique et forcer l'exécution."
  },
  {
    question: "Quelle est la différence entre NIDALUM et une application classique ?",
    answer: "NIDALUM commence dans le monde physique avec un objet lourd. Il n'est pas conçu pour retenir votre attention, mais pour vous la rendre. Les applications vous gardent ; NIDALUM vous libère."
  },
  {
    question: "Comment fonctionne une Fréquence Sonore ?",
    answer: "Les paysages sonores NIDALUM sont composés sur des tempos spécifiques et dépourvus d'éléments distractifs. Ils agissent comme un signal neurologique pavlovien : le cerveau associe ce son à l'état de concentration pure."
  },
  {
    question: "L'accès Fondateur est-il payant ?",
    answer: "L'accès Fondateur (Waitlist) est gratuit. Cependant, l'Édition Fondatrice du Codex sera strictement limitée à 100 exemplaires physiques lors de sa première impression."
  }
];

export default function FAQPage() {
  useEffect(() => {
    track('FAQ_OPEN');
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white flex flex-col selection:bg-gold selection:text-black">
      <Head>
        <title>FAQ | NIDALUM</title>
        <meta name="description" content="Questions fréquentes sur l'écosystème NIDALUM." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-32">
        <div className="flex items-center gap-4 mb-16 opacity-50">
           <Glyph size={16} className="text-gold" />
           <span className="font-mono text-xs uppercase tracking-[0.3em]">Archive I — FAQ</span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-[64px] mb-24">La clarté précède l'action.</h1>

        <div className="space-y-16">
          {FAQ_ITEMS.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border-t border-[#111111] pt-8"
            >
              <h3 className="font-serif text-[22px] md:text-2xl mb-6 text-white">{item.question}</h3>
              <p className="font-light text-[#a3a3a3] text-[18px] leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
