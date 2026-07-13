"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import { track } from '@nidalum/analytics';
import Head from 'next/head';

export default function AboutPage() {
  useEffect(() => {
    track('PAGE_VIEW', { page: '/about' });
  }, []);

  const sections = [
    {
      title: "Le monde actuel",
      content: "Nous vivons à l'ère de l'hyper-connexion. Chaque seconde, des millions de signaux, de notifications et de contenus sont générés pour capter l'œil humain. La technologie, initialement conçue pour nous libérer du temps, est devenue un moteur d'ingénierie comportementale dont le seul but est de s'approprier notre bande passante mentale. Le monde n'a jamais été aussi rapide, et pourtant, l'esprit humain n'a jamais été aussi dispersé."
    },
    {
      title: "Le problème",
      content: "L'attention est devenue la dernière devise. Les grandes corporations technologiques ont optimisé leurs plateformes pour créer des boucles de dopamine, récompensant la réaction immédiate au détriment de la réflexion profonde. Le problème n'est plus l'accès à l'information, mais l'incapacité de la traiter sans être interrompu. Nous avons perdu le droit au silence. Nous avons perdu l'ancrage."
    },
    {
      title: "La rupture",
      content: "La véritable rébellion du 21ème siècle ne se fera pas par le bruit, mais par le silence. Face à cette surcharge cognitive, une rupture devenait vitale. Il fallait cesser de chercher l'outil miracle qui permettrait de \"faire plus\", pour construire la forteresse qui permettrait de \"faire mieux\". Il fallait inverser la machine : utiliser l'ingénierie comportementale non pas pour disperser l'esprit, mais pour le concentrer de manière absolue."
    },
    {
      title: "La naissance de NIDALUM",
      content: "C'est de ce constat brutal qu'est né NIDALUM. Conçu non pas comme une entreprise d'édition ou de technologie, mais comme une nouvelle civilisation mentale. NIDALUM a été fondé sur une prémisse stricte : pour reprendre le contrôle, il faut un esthétisme intransigeant, une discipline rationnelle, et des outils asymétriques. Le Grand Codex, les Fréquences Sonores et l'Oracle sont nés pour agir comme un \"bouton on/off\" pour le cerveau humain."
    },
    {
      title: "La mission",
      content: "Notre mission est de fournir à une élite mentale les outils nécessaires pour imposer l'ordre au chaos. Nous construisons des Artefacts – physiques et numériques – qui agissent comme des ancrages pavloviens. Le but de NIDALUM est d'enseigner la souveraineté : protéger son attention avec la même agressivité qu'on protégerait son intégrité physique."
    },
    {
      title: "La vision à 20 ans",
      content: "Dans 20 ans, NIDALUM ne sera pas simplement une méthode, mais l'infrastructure de la concentration mondiale. Nous visons à devenir le système d'exploitation par défaut de ceux qui exigent la grandeur. Des bibliothèques physiques NIDALUM, des académies de concentration pure, et une génération de Gardiens qui auront appris que la plus grande de toutes les richesses est un esprit totalement sous contrôle."
    }
  ];

  return (
    <main className="bg-[#050505] min-h-screen text-white flex flex-col selection:bg-gold selection:text-black">
      <Head>
        <title>À propos | NIDALUM</title>
        <meta name="description" content="Pourquoi NIDALUM existe." />
      </Head>

      <div className="flex-grow max-w-4xl mx-auto px-6 py-32 md:py-48 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-24"
        >
          <h1 className="font-serif text-4xl md:text-6xl mb-6">À propos.</h1>
          <div className="h-[1px] w-24 bg-gold opacity-50"></div>
        </motion.div>

        <div className="space-y-24">
          {sections.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-8 md:gap-16"
            >
              <div className="md:w-1/3">
                <h2 className="font-serif italic text-2xl text-gold">{section.title}</h2>
              </div>
              <div className="md:w-2/3">
                <p className="text-[#a3a3a3] font-light text-lg md:text-xl leading-relaxed">
                  {section.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
