"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glyph } from '../../components/Glyph';

type Tab = 'library' | 'reader' | 'downloads' | 'soundscapes' | 'updates';

export default function CodexDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('library');

  const tabs = [
    { id: 'library', label: 'Library', desc: 'Les cinq ouvrages' },
    { id: 'reader', label: 'Reader', desc: 'Lecture immersive' },
    { id: 'downloads', label: 'Downloads', desc: 'Fichiers PDF & EPUB' },
    { id: 'soundscapes', label: 'Soundscapes', desc: 'Fréquences sonores' },
    { id: 'updates', label: 'Updates', desc: 'Nouvelles éditions' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">NIDALUM Founder Library</h2>
            <p className="text-[#a3a3a3] font-light">Vos 5 ouvrages fondateurs sont déverrouillés.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border border-[#1A1A1A] bg-[#0a0a0a] p-6 hover:border-gold/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                    <Glyph size={16} className="text-gold" />
                  </div>
                  <h3 className="text-white font-serif text-xl mb-2">Livre N°{i}</h3>
                  <p className="text-[#666] text-sm font-mono uppercase tracking-widest">Disponible</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reader':
        return (
          <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-[50vh] text-center border border-[#1A1A1A] bg-[#050505]">
            <Glyph size={32} className="text-gold mb-6 opacity-50" />
            <h2 className="text-2xl font-serif text-white">Mode Lecture Immersive</h2>
            <p className="text-[#a3a3a3] font-light max-w-md mx-auto">
              Le lecteur Web nidalum se charge. Préparez-vous à entrer dans le silence absolu.
            </p>
            <button className="px-8 py-3 border border-gold text-gold uppercase tracking-[0.2em] text-xs hover:bg-gold hover:text-black transition-all">
              Ouvrir le Grimoire
            </button>
          </div>
        );
      case 'downloads':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">Téléchargements</h2>
            <p className="text-[#a3a3a3] font-light">Récupérez les éditions numériques premium pour vos propres appareils.</p>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#1A1A1A] bg-[#0a0a0a] p-6">
                  <div>
                    <h3 className="text-white font-serif text-lg">Livre N°{i} - Édition Intégrale</h3>
                    <p className="text-[#666] text-xs font-mono mt-1">Version 1.0.0</p>
                  </div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <button className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">PDF HD</button>
                    <button className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">EPUB</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'soundscapes':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">Les Fréquences</h2>
            <p className="text-[#a3a3a3] font-light">Des paysages sonores isochrones conçus pour l'hyper-concentration.</p>
            <div className="border border-[#1A1A1A] p-12 text-center bg-[#050505]">
               <p className="text-[#666] font-mono uppercase tracking-[0.2em] text-sm">Synchronisation en cours...</p>
               <p className="text-[#444] text-xs mt-2">Les artistes finalisent le mixage. Disponible prochainement pour les Fondateurs.</p>
            </div>
          </div>
        );
      case 'updates':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">Mises à jour</h2>
            <p className="text-[#a3a3a3] font-light">Le journal des modifications et les nouvelles éditions.</p>
            <div className="border-l border-gold/30 pl-6 space-y-8">
              <div className="relative">
                <div className="absolute -left-[29px] top-1 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]"></div>
                <h3 className="text-white font-mono text-sm tracking-widest uppercase">Version 1.0.0</h3>
                <p className="text-[#a3a3a3] font-light mt-2">Lancement de la NIDALUM Founder Library.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-gold selection:text-black flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-80 border-r border-[#1A1A1A] bg-[#0a0a0a] flex flex-col min-h-screen">
        <div className="p-8 border-b border-[#1A1A1A] flex items-center gap-4">
          <Glyph size={24} className="text-gold" />
          <span className="font-serif font-bold tracking-[0.25em] text-[#F5F5F5] uppercase">NIDALUM</span>
        </div>
        
        <div className="p-8">
          <p className="text-[#666] font-mono text-xs tracking-[0.2em] uppercase mb-6">Founder Dashboard</p>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'border-gold bg-gold/5 text-white' 
                    : 'border-transparent text-[#a3a3a3] hover:text-white hover:bg-[#111]'
                }`}
              >
                <span className="block font-serif text-lg">{tab.label}</span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-[#666] mt-1">{tab.desc}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-[#1A1A1A]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#a3a3a3] text-xs uppercase tracking-widest">Founder #008</span>
            <a href="/" className="text-gold font-mono text-[10px] uppercase hover:underline">Déconnexion</a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-8 md:p-16 overflow-y-auto relative">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </main>
  );
}
