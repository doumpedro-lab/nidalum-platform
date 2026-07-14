"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function MerciContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [guardianId, setGuardianId] = useState<string>('Founder #008');

  // In a real app, we would fetch the session details to get the real Guardian ID
  // For now, since they just paid, we simulate a premium welcome message.

  return (
    <div className="max-w-xl text-center space-y-12">
      <h1 className="text-5xl font-serif text-white italic drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">Bienvenue.</h1>
      
      <div className="flex flex-col items-center gap-4">
        <span className="font-mono text-[#a3a3a3] text-sm uppercase tracking-[0.3em]">Guardian ID</span>
        <span className="font-mono text-gold text-xl uppercase tracking-[0.2em] px-6 py-2 border border-gold/30">{guardianId}</span>
      </div>

      <p className="font-light text-xl text-white/80 leading-relaxed">
        Votre bibliothèque est prête.
      </p>

      <div className="pt-12">
        <a href="/codex" className="text-gold font-mono uppercase tracking-[0.3em] text-sm pb-1 border-b border-gold/30 hover:border-gold transition-all duration-300">
          [ Entrer ]
        </a>
      </div>
    </div>
  );
}

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-8 selection:bg-gold selection:text-black">
      <Suspense fallback={<div className="text-gold font-mono">Chargement...</div>}>
        <MerciContent />
      </Suspense>
    </main>
  );
}
