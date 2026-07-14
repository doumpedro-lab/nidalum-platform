"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Glyph } from '../../components/Glyph';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@nidalum/firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is returning from a magic link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let savedEmail = window.localStorage.getItem('emailForSignIn');
      
      if (!savedEmail) {
        savedEmail = window.prompt('Veuillez confirmer votre email pour des raisons de sécurité.');
      }
      
      if (savedEmail) {
        setLoading(true);
        signInWithEmailLink(auth, savedEmail, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn');
            router.push('/codex');
          })
          .catch((err) => {
            console.error(err);
            setError("Le lien de connexion a expiré ou est invalide.");
            setLoading(false);
          });
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const actionCodeSettings = {
      url: `${window.location.origin}/login`,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage("Un lien d'accès vous a été envoyé par email.");
    } catch (err: any) {
      console.error(err);
      setError("Erreur lors de l'envoi du lien. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center selection:bg-gold selection:text-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-[#1A1A1A] p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-70"></div>
        
        <div className="flex flex-col items-center mb-10 text-center">
          <Glyph size={32} className="text-gold mb-6" />
          <h1 className="font-serif text-2xl tracking-[0.2em] uppercase">NIDALUM</h1>
          <p className="text-[#666] font-mono text-xs tracking-widest mt-2 uppercase">Connexion Privée</p>
        </div>

        {message ? (
           <div className="text-center p-6 border border-gold/30 bg-gold/5">
             <p className="text-gold font-mono text-sm">{message}</p>
             <p className="text-[#a3a3a3] text-xs mt-4">Vous pouvez fermer cet onglet.</p>
           </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <p className="text-[#a3a3a3] text-sm text-center mb-6 font-light">
              Saisissez l'adresse email utilisée lors de votre commande pour recevoir un lien d'accès instantané.
            </p>
            <div>
              <label className="block text-[#a3a3a3] font-mono text-xs uppercase tracking-widest mb-2">Email Founder</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-[#1A1A1A] px-4 py-4 text-white focus:outline-none focus:border-gold/50 transition-colors font-mono text-sm text-center tracking-wider"
                placeholder="Entrez votre email"
                required
              />
            </div>

            {error && <p className="text-red-500 font-mono text-xs text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gold text-[#050505] font-bold py-4 px-8 uppercase tracking-widest text-sm transition-all duration-300 hover:brightness-110 disabled:opacity-50 mt-4"
            >
              {loading ? 'Traitement...' : 'Recevoir mon lien'}
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}
