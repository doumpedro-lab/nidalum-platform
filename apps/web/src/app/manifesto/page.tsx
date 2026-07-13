"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import { track } from '@nidalum/analytics';
import Head from 'next/head';

export default function ManifestoPage() {
  useEffect(() => {
    track('PAGE_VIEW', { page: '/manifesto' });
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen text-white flex flex-col selection:bg-gold selection:text-black">
      <Head>
        <title>Manifeste | NIDALUM</title>
        <meta name="description" content="L'attention est la dernière devise. Protégez-la." />
      </Head>

      <div className="flex-grow max-w-4xl mx-auto w-full px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold mx-auto mb-16 opacity-50"></div>
          
          <h1 className="font-serif italic text-3xl md:text-5xl text-white mb-16 text-center leading-relaxed">
            Le Manifeste NIDALUM
          </h1>

          <div className="space-y-16 font-light text-lg md:text-xl text-[#a3a3a3] tracking-wide">
            
            <section className="space-y-4">
              <h2 className="text-gold font-mono uppercase tracking-widest text-sm">I. Pourquoi NIDALUM existe-t-il ?</h2>
              <p>
                Le monde est devenu bruyant. L'attention humaine est aujourd'hui la ressource la plus convoitée, minée et pillée par des algorithmes dont l'unique objectif est la distraction perpétuelle.
              </p>
              <p>
                L'humanité est dispersée, épuisée par une surcharge d'informations sans substance. NIDALUM existe pour offrir une alternative radicale : un système d'exploitation pour une élite mentale silencieuse. Nous fournissons la structure, l'esthétique et l'ancrage qui manquent dans le monde moderne. NIDALUM n'est pas une méthode de développement personnel ; c'est une ingénierie comportementale conçue pour imposer l'ordre au chaos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-gold font-mono uppercase tracking-widest text-sm">II. Contre quoi NIDALUM se bat-il ?</h2>
              <p>
                Nous nous battons contre la dispersion, l'addiction numérique et l'ingénierie de l'attention qui maintiennent les esprits dans un état de réaction permanente. 
              </p>
              <p>
                Nous rejetons la culture de l'immédiateté, la médiocrité du bruit ambiant, et les promesses surnaturelles ou magiques. NIDALUM est l'ennemi de la superficialité. Nous refusons de céder le contrôle de nos facultés cognitives à des systèmes conçus pour nous affaiblir.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-gold font-mono uppercase tracking-widest text-sm">III. Que défend NIDALUM ?</h2>
              <p>
                Nous défendons la souveraineté froide et absolue de l'esprit. Nous prônons l'ancrage par le silence, le retour au corps par le souffle, et la concentration pure.
              </p>
              <p>
                Nous défendons le pragmatisme : chaque bénéfice s'appuie sur la neurologie et la répétition disciplinée. Enfin, nous défendons un esthétisme intransigeant. Le beau n'est pas un luxe, c'est une nécessité psychologique qui induit le respect, abaisse le rythme cardiaque et crée l'espace nécessaire à l'émerveillement intellectuel.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-gold font-mono uppercase tracking-widest text-sm">IV. Pourquoi rejoindre NIDALUM aujourd'hui ?</h2>
              <p>
                Parce que l'effondrement de l'attention n'est plus une théorie, c'est une réalité quotidienne. Rejoindre NIDALUM aujourd'hui, c'est refuser d'être une simple donnée statistique dans l'économie de la distraction.
              </p>
              <p>
                C'est faire le choix de devenir l'Architecte de sa propre vie. L'accès Fondateur n'est pas une simple inscription ; c'est le franchissement de la Première Porte vers la reprise de contrôle. C'est l'engagement de faire partie des Gardiens, ceux qui préservent leur silence intérieur pour accomplir ce qui compte réellement.
              </p>
            </section>

            <div className="text-center pt-16">
              <p className="font-serif italic text-2xl text-gold">
                Éteignez le bruit.<br />
                Allumez l'esprit.
              </p>
            </div>

          </div>

          <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#333333] mx-auto mt-24"></div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
