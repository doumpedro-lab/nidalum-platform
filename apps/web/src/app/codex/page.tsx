"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glyph } from '../../components/Glyph';
import { useRouter } from 'next/navigation';
import { auth, db } from '@nidalum/firebase/src/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

type Tab = 'library' | 'reader' | 'music' | 'downloads' | 'soundscapes' | 'updates' | 'licenses' | 'profile' | 'settings';

export default function CodexDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('library');
  const [user, setUser] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [music, setMusic] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            setUser({ guardianId: 'Inconnu', founderNumber: '?' });
          }

          // Fetch dynamic catalog
          const libSnapshot = await getDocs(collection(db, 'library'));
          const fetchedBooks = libSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setBooks(fetchedBooks.sort((a, b) => a.title.localeCompare(b.title)));

          const musicSnapshot = await getDocs(collection(db, 'music'));
          const fetchedMusic = musicSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          setMusic(fetchedMusic);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const tabs = [
    { id: 'library', label: 'Library', desc: 'Les cinq ouvrages', show: user?.entitlements?.library?.active },
    { id: 'reader', label: 'Reader', desc: 'Lecture immersive', show: user?.entitlements?.reader?.active },
    { id: 'music', label: 'Music', desc: 'Albums et Fréquences', show: user?.entitlements?.music?.active },
    { id: 'downloads', label: 'Downloads', desc: 'Fichiers Premium', show: user?.entitlements?.downloads?.active },
    { id: 'soundscapes', label: 'Soundscapes', desc: 'Paysages isochrones', show: user?.entitlements?.soundscapes?.active },
    { id: 'updates', label: 'Updates', desc: 'Nouvelles éditions', show: user?.entitlements?.updates?.active },
    { id: 'licenses', label: 'Licenses', desc: 'Vos droits', show: true },
    { id: 'profile', label: 'Profile', desc: 'Paramètres du compte', show: true },
    { id: 'settings', label: 'Settings', desc: 'Préférences', show: true },
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut(auth);
    router.push('/');
  };

  const handleDownload = async (assetId: string) => {
    // In Sprint 4.2, this will call /api/download?assetId=...
    alert(`Le téléchargement sécurisé pour ${assetId} sera implémenté via API Download (Signed URLs).`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">NIDALUM Founder Library</h2>
            <p className="text-[#a3a3a3] font-light">Vos ouvrages fondateurs sont déverrouillés.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div key={book.id} className="border border-[#1A1A1A] bg-[#0a0a0a] p-6 hover:border-gold/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                    <Glyph size={16} className="text-gold" />
                  </div>
                  <h3 className="text-white font-serif text-lg mb-2 leading-snug">{book.title}</h3>
                  <p className="text-[#666] text-sm font-mono uppercase tracking-widest mt-4">Disponible (v{book.version})</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">NIDALUM Audio & Music</h2>
            <p className="text-[#a3a3a3] font-light">Albums premium, paysages sonores et fréquences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {music.map((track) => (
                <div key={track.id} className="flex items-center gap-6 border border-[#1A1A1A] bg-[#0a0a0a] p-6">
                  <div className="w-16 h-16 bg-[#111] flex items-center justify-center rounded">
                    <Glyph size={24} className="text-[#333]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-serif text-xl">{track.title}</h3>
                    <p className="text-[#666] text-xs font-mono uppercase mt-1">{track.artist} - {track.type}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">▶ Play</button>
                    <button onClick={() => handleDownload(track.id)} className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">⬇ FLAC</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'downloads':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">Téléchargements</h2>
            <p className="text-[#a3a3a3] font-light">Récupérez les éditions numériques premium pour vos propres appareils.</p>
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#1A1A1A] bg-[#0a0a0a] p-6">
                  <div>
                    <h3 className="text-white font-serif text-lg">{book.title.replace(/^[IVX]+\.\s/, '')}</h3>
                    <p className="text-[#666] text-xs font-mono mt-1">Version {book.version}</p>
                  </div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <button onClick={() => handleDownload(`${book.id}_PDF`)} className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">PDF HD</button>
                    <button onClick={() => handleDownload(`${book.id}_EPUB`)} className="text-xs font-mono uppercase tracking-widest text-[#a3a3a3] hover:text-white border-b border-[#333] hover:border-white pb-1 transition-all">EPUB</button>
                  </div>
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
            <p className="text-[#a3a3a3] font-light max-w-md mx-auto">Le lecteur Web nidalum se charge. Préparez-vous à entrer dans le silence absolu.</p>
          </div>
        );
      case 'soundscapes':
      case 'updates':
      case 'licenses':
      case 'profile':
      case 'settings':
        return (
          <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-[50vh] text-center border border-[#1A1A1A] bg-[#050505]">
            <Glyph size={32} className="text-gold mb-6 opacity-50" />
            <h2 className="text-2xl font-serif text-white capitalize">{activeTab}</h2>
            <p className="text-[#a3a3a3] font-light max-w-md mx-auto">Accès autorisé. Contenu en cours de synchronisation globale...</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Glyph size={40} className="text-gold animate-pulse" /></div>;
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-gold selection:text-black flex flex-col md:flex-row">
      <aside className="w-full md:w-80 border-r border-[#1A1A1A] bg-[#0a0a0a] flex flex-col min-h-screen">
        <div className="p-8 border-b border-[#1A1A1A] flex items-center gap-4">
          <Glyph size={24} className="text-gold" />
          <span className="font-serif font-bold tracking-[0.25em] text-[#F5F5F5] uppercase">NIDALUM</span>
        </div>
        
        <div className="p-8">
          <p className="text-[#666] font-mono text-xs tracking-[0.2em] uppercase mb-4">Founder Dashboard</p>
          
          <div className="mb-8 p-4 border border-[#1A1A1A] bg-[#050505] space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#a3a3a3]">Status</span>
              <span className="text-gold">Founder #{String(user?.founderNumber || '000').padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#a3a3a3]">Member since</span>
              <span className="text-white">{user?.createdAt ? new Date(user.createdAt.seconds * 1000).getFullYear() : '2026'}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#a3a3a3]">Library unlocked</span>
              <span className="text-white">{books.length} items</span>
            </div>
            <div className="w-full h-1 bg-[#1A1A1A] mt-2">
              <div className="h-full bg-gold w-full"></div>
            </div>
          </div>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              if (tab.show === false) return null;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`w-full text-left px-4 py-3 border-l-2 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'border-gold bg-gold/5 text-white' 
                      : 'border-transparent text-[#a3a3a3] hover:text-white hover:bg-[#111]'
                  }`}
                >
                  <span className="block font-serif text-lg">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-[#1A1A1A]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[#a3a3a3] text-xs uppercase tracking-widest">{user?.guardianId || 'GUEST'}</span>
            <button onClick={handleLogout} className="text-gold font-mono text-[10px] uppercase hover:underline">Déconnexion</button>
          </div>
        </div>
      </aside>

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
