"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CodexOfferPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // On passe un email/guardianId factice si pas dispo, en prod à récupérer via auth state
        body: JSON.stringify({ guardianId: 'G-NEW', email: 'founder@nidalumuniverse.com' }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-playfair tracking-wider text-gold">LE CODEX</h1>
        <h2 className="text-xl font-mono tracking-widest text-white/70">ÉDITION FONDATRICE</h2>
        <div className="py-8">
          <p className="text-lg text-white/80 leading-relaxed font-inter">
            Le système complet d'ingénierie comportementale NIDALUM.
            Acquérez le savoir qui reprogramme votre attention.
          </p>
        </div>
        
        <div className="border border-gold/30 p-8 bg-gold/5 backdrop-blur-sm space-y-6">
          <div className="text-3xl font-mono text-gold">99 €</div>
          <p className="text-sm font-mono text-white/50 uppercase tracking-widest">Paiement unique - Accès à vie</p>
          
          <button 
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-gold text-black font-mono uppercase tracking-widest py-4 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "INITIALISATION..." : "ACQUÉRIR LE CODEX"}
          </button>
        </div>
      </motion.div>
    </main>
  );
}
