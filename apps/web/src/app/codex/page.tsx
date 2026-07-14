"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glyph } from '../../components/Glyph';
import { useRouter } from 'next/navigation';
import { auth, db, storage } from '@nidalum/firebase/src/client';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { GlareCard } from '../../components/ui/GlareCard';

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

  const handleDownload = async (book: any) => {
    if (!book.storagePath) {
      alert("Ce livre n'est pas encore disponible en téléchargement.");
      return;
    }
    try {
      const fileRef = ref(storage, book.storagePath);
      const url = await getDownloadURL(fileRef);
      window.open(url, '_blank');
    } catch (error) {
      console.error("Erreur lors de l'accès au fichier :", error);
      alert("Erreur: Impossible d'accéder au fichier. Vérifiez vos droits ou contactez le support.");
    }
  };

  const handlePlayMusic = async (track: any) => {
    if (!track.storagePath) {
      alert("Cette piste n'est pas encore disponible.");
      return;
    }
    try {
      const fileRef = ref(storage, track.storagePath);
      const url = await getDownloadURL(fileRef);
      // For now, open in a new tab which plays the audio.
      // Later we can build an in-app audio player.
      window.open(url, '_blank');
    } catch (error) {
      console.error("Erreur lors de l'accès à l'audio :", error);
      alert("Erreur: Impossible d'accéder au fichier audio.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'library':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">NIDALUM Founder Library</h2>
            <p className="text-[#a3a3a3] font-light">Vos ouvrages fondateurs sont déverrouillés.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book: any, idx) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlareCard className="h-full">
                    <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#1A1A1A] flex flex-col h-full hover:border-gold/40 transition-colors">
                      <div className="aspect-[2/3] bg-[#111] mb-6 rounded-lg flex items-center justify-center border border-[#333] overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <button 
                            onClick={() => handleDownload(book)}
                            className="w-full py-2 bg-gold text-black text-sm uppercase tracking-widest font-bold rounded hover:bg-gold/90 transition-colors"
                          >
                            Télécharger
                          </button>
                        </div>
                        <Glyph size={48} className="text-[#333] group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h3 className="text-xl font-serif text-white mb-2">{book.title}</h3>
                      <p className="text-sm text-[#666] mb-4 flex-grow">{book.description || "Édition numérique Premium."}</p>
                      <div className="flex justify-between items-center text-xs text-[#666] border-t border-[#1A1A1A] pt-4">
                        <span>{book.version || 'v1.0'}</span>
                        <button 
                          onClick={() => handleDownload(book)}
                          className="text-gold hover:text-white transition-colors uppercase tracking-wider font-semibold"
                        >
                          Lire
                        </button>
                      </div>
                    </div>
                  </GlareCard>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-3xl font-serif text-white">NIDALUM Audio & Music</h2>
            <p className="text-[#a3a3a3] font-light">Albums premium, paysages sonores et fréquences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {music.map((track: any, idx) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlareCard className="h-full">
                    <div className="bg-[#0a0a0a] rounded-xl border border-[#1A1A1A] overflow-hidden group hover:border-gold/40 transition-colors flex flex-col h-full">
                      <div className="h-48 bg-[#111] relative flex items-center justify-center border-b border-[#1A1A1A]">
                        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <button 
                            onClick={() => handlePlayMusic(track)}
                            className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(207,175,98,0.5)] hover:scale-110 transition-transform"
                          >
                            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                        <Glyph size={48} className="text-[#333] group-hover:rotate-180 transition-transform duration-1000" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-serif text-white mb-1">{track.title}</h3>
                        <p className="text-sm text-[#666] mb-4">{track.artist}</p>
                        <div className="mt-auto flex justify-between items-center text-xs text-[#666]">
                          <span className="uppercase tracking-wider">{track.type}</span>
                          <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    </div>
                  </GlareCard>
                </motion.div>
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
