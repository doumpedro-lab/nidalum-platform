"use client";

import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
  AnimatePresence,
  easeInOut,
} from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Footer from '../../components/Footer';
import { Glyph } from '../../components/Glyph';
import { SparklesCore } from '@/components/ui/sparkles';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

/* ══════════════════════════════════════════════════════════
   DATA — CATALOGUE RÉEL NIDALUM
══════════════════════════════════════════════════════════ */

// ── MUSIQUE : 99% NIDALUM · quelques collaborations identifiées ──
// Artistes présents : Sara Koré, Ramses Nidal, Kimta, VAMIRO, DJ Vidamo
const MUSIC_TRACKS = [
  // NIDALUM solo — titres emblématiques (sur 220 total)
  { title: 'Anima Mundi', artist: 'NIDALUM', tag: '432Hz · Cérémonie d\'ouverture', featured: true },
  { title: 'ORAA SOUMA RA', artist: 'NIDALUM', tag: 'Epic Ritual · 528Hz', featured: true },
  { title: 'ORAA VAYEN (Universal Heartbeat)', artist: 'NIDALUM', tag: 'Fréquence Universelle · Binaural' },
  { title: 'Anima Koru (Nidalum Anthem)', artist: 'NIDALUM', tag: 'Hymne officiel · 432Hz' },
  { title: 'AURORA PRIMORDIALIS', artist: 'NIDALUM', tag: 'Aurore Primordiale · Theta' },
  { title: 'ORAA NIDAL SÛMAË (The Luminous Breath)', artist: 'NIDALUM', tag: 'Méditation · Alpha' },
  { title: 'LUMINA CORPUS', artist: 'NIDALUM', tag: 'Deep Focus · 40Hz Gamma' },
  { title: 'SILENCE D\'OR', artist: 'NIDALUM', tag: 'Méditation · 432Hz' },
  { title: 'Souma-Ra – Tears of the Eternal Forest', artist: 'NIDALUM', tag: 'Ambient · 528Hz' },
  { title: 'COSMOS-GENESIS', artist: 'NIDALUM', tag: 'Cosmic Journey · Binaural' },
  { title: 'L\'HORIZON DES ÉVÉNEMENTS', artist: 'NIDALUM', tag: 'Epic · Freq. Delta' },
  { title: 'ORAA TORA VAY (The Water Defends)', artist: 'NIDALUM', tag: 'Ritual War · 432Hz' },
  { title: 'RA\'ORAA KÔRABA VAY', artist: 'NIDALUM', tag: 'Ancestral Chant · Tribal' },
  { title: 'ANCIENT ECHOES OF NIDALUM', artist: 'NIDALUM', tag: 'Heritage · 528Hz' },
  { title: 'Oraa Solara – The Call of One Earth', artist: 'NIDALUM', tag: 'Unity Freq. · Global' },
  { title: 'ASHALIM NIDAL SHA', artist: 'NIDALUM', tag: 'Héroïque · Épique' },
  { title: 'SOUMA-RA · NA-KHÉLA (The Universal Breath)', artist: 'NIDALUM', tag: 'Cérémonie · Binaural' },
  { title: 'Noctua Anima (Trance of the Night Owl)', artist: 'NIDALUM', tag: 'Trance · Nuit' },
  { title: 'TRANSCENDENTIAE', artist: 'NIDALUM', tag: 'Transcendance · Gamma' },
  { title: 'QUANTUM DANCE', artist: 'NIDALUM', tag: 'Dance Ritual · Energy' },
  // ── Collaborations ──
  { title: 'Kaelis V\'thora', artist: 'NIDALUM × VAMIRO', tag: 'Dark Ritual · Collaboration', collab: true },
  { title: 'Kaelis V\'ahri', artist: 'NIDALUM × VAMIRO', tag: 'Dark Ambient · Freq. Alpha', collab: true },
  { title: 'RAMSES · NIDAL · ZALIMA · TENDA', artist: 'Ramses Nidal × NIDALUM', tag: 'Épique · Saga', collab: true },
  { title: 'Sarakunw Bèɛ', artist: 'Sara Koré × NIDALUM', tag: 'Voix Sacrée · Ancestral', collab: true },
];

// ── ARTISTES DE L'UNIVERS ──
const ARTISTS = [
  { name: 'NIDALUM', role: 'Compositeur principal · 99% du catalogue', img: '/images/artists/ramsesnidal.png', main: true },
  { name: 'VAMIRO', role: 'Dark Ritual · Collaboration', img: '/images/artists/vamiro.jpg' },
  { name: 'Sara Koré', role: 'Voix & Chant Sacré', img: '/images/artists/sarakore.jpg' },
  { name: 'Ramses Nidal', role: 'Compositeur · Saga', img: '/images/artists/ramsesnidal.png' },
  { name: 'DJ Vidamo', role: 'Afro-Electronic · Remix', img: '/images/artists/djvidamo.png' },
  { name: 'KIMTA', role: 'Tribal Fusion · Collaboration', img: '/images/artists/kimta.png' },
];

// Les 5 livres de la Founder Library (vendus en bundle)
const FOUNDER_BOOKS = [
  {
    id: 'grand-livre',
    cover: '/images/covers/grand-livre-mysteres-caches.png',
    fallback: '/images/le_grand_livre.png',
    title: 'Le Grand Livre des Mystères Cachés de l\'Humanité',
    shortTitle: 'Mystères Cachés',
    tag: 'ESSAI — TOME I',
    price: 29,
    pages: '340 pages',
    preview: [
      'Avant d\'ouvrir ce livre, abandonne une certitude : la matière n\'est pas silencieuse.',
      'Depuis des millénaires, l\'humanité croit que l\'univers est composé de matière, d\'énergie et de vide.',
      'Les anciens Nidalis savaient qu\'il existait un quatrième principe. Ils l\'appelaient le Souffle.',
      '— Fin de l\'extrait gratuit —',
    ],
    formats: ['PDF HD'],
    color: '#C9A84C',
  },
  {
    id: 'mysteres-interdits',
    cover: '/images/covers/grand-livre-mysteres-interdits.png',
    fallback: '/images/52_histoires.png',
    title: 'Le Grand Livre des Mystères Interdits de l\'Humanité',
    shortTitle: 'Mystères Interdits',
    tag: 'ESSAI — TOME II',
    price: 29,
    pages: '310 pages',
    preview: [
      'Les pyramides de Gizeh ne peuvent pas avoir été construites par des esclaves.',
      'Les calculs le prouvent : 2,5 millions de blocs. Un bloc toutes les 2 minutes pendant 20 ans.',
      'Göbekli Tepe a 12 000 ans. Cela précède l\'agriculture de 6 000 ans.',
      '— Fin de l\'extrait gratuit —',
    ],
    formats: ['PDF HD'],
    color: '#8B7355',
  },
  {
    id: '52-histoires',
    cover: '/images/covers/cover-52h.png',
    fallback: '/images/52_histoires.png',
    title: '52 Histoires qui Réveillent le Créateur Intérieur',
    shortTitle: '52 Histoires',
    tag: 'ANTHOLOGIE',
    price: 29,
    pages: '280 pages',
    preview: [
      'Histoire 01 — Le Forgeron de Souma-Ra.',
      'Il y avait dans la cité cachée un homme qui fabriquait des clés. Non pas des clés de métal — des clés de conscience.',
      'Chaque matin, avant l\'aube, il se posait la même question : "Quelle porte vais-je ouvrir aujourd\'hui ?"',
      '— Fin de l\'extrait gratuit —',
    ],
    formats: ['PDF HD'],
    color: '#744F3A',
  },
  {
    id: 'mantras-sagesse',
    cover: '/images/covers/mantras1.png',
    fallback: '/images/grimoire_back.png',
    title: 'Mantras de Sagesse — Voyage Initiatique',
    shortTitle: 'Mantras de Sagesse',
    tag: 'INITIATION',
    price: 29,
    pages: '160 pages',
    preview: [
      'Mantra I — La Vibration Première.',
      '"Je suis la fréquence qui précède le bruit."',
      '"Mon attention est ma richesse. Ma présence est ma puissance."',
      '— Fin de l\'extrait gratuit —',
    ],
    formats: ['PDF HD', 'EPUB'],
    color: '#6B4C7A',
  },
  {
    id: 'mantras-sagesse-t3',
    cover: '/images/covers/mantras2.png',
    fallback: '/images/grimoire_front.png',
    title: 'Mantras de Sagesse — Tome 3',
    shortTitle: 'Mantras Tome 3',
    tag: 'INITIATION',
    price: 29,
    pages: '150 pages',
    preview: [
      'La suite du voyage initiatique.',
      '— Fin de l\'extrait gratuit —',
    ],
    formats: ['PDF HD', 'EPUB'],
    color: '#4A5568',
  },
];

// Les 6 tomes du roman (vendus séparément)
const NOVEL_TOMES = [
  { id: 't1', cover: '/images/covers/tome1.png', title: 'Le Premier Souffle', num: 'Tome 1', price: 9.99, pages: '420p', epub: true },
  { id: 't2', cover: '/images/covers/ashalim_tome2.jpg', title: 'La Cité des Oubliés', num: 'Ashalim Tome 2', price: 19.99, pages: 'PDF HD', epub: false },
  { id: 't3', cover: '/images/covers/tome3.png', title: 'La Cité Cachée', num: 'Tome 3', price: 9.99, pages: '510p', epub: true },
  { id: 't4', cover: '/images/covers/tome4.png', title: 'Les Veilleurs', num: 'Tome 4', price: 9.99, pages: '530p', epub: true },
  { id: 't5', cover: '/images/covers/tome5.png', title: 'Le Dernier Oracle', num: 'Tome 5', price: 9.99, pages: '495p', epub: true },
  { id: 't6', cover: '/images/covers/tome6.png', title: 'Les Origines du Premier Monde', num: 'Tome 6', price: 9.99, pages: '560p', epub: true },
];

/* ══════════════════════════════════════════════════════════
   COMPOSANT : BOOK 3D TILT
══════════════════════════════════════════════════════════ */
function Book3D({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 26, damping: 16 });
  const my = useSpring(y, { stiffness: 26, damping: 16 });
  const rotX = useTransform(my, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotY = useTransform(mx, [-0.5, 0.5], ['-12deg', '12deg']);
  const glX = useTransform(mx, [-0.5, 0.5], ['0%', '100%']);
  const glY = useTransform(my, [-0.5, 0.5], ['0%', '100%']);
  const shX = useTransform(mx, [-0.5, 0.5], ['-40px', '40px']);
  const shY = useTransform(my, [-0.5, 0.5], ['-20px', '40px']);

  return (
    <motion.div ref={ref}
      onMouseMove={e => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 1600 }}
      className={`relative select-none cursor-pointer ${className}`}>
      <motion.div style={{ x: shX, y: shY }} className="absolute inset-0 -z-10 rounded-xl bg-black/80 blur-[60px] scale-[0.85]" />
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-[#FFF8E7]/12 via-transparent to-[#FFF8E7]/4 pointer-events-none z-30" />
      <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#FFF8E7]/10 bg-[#0a0a0a]">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 768px) 90vw, 45vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
          style={{ background: `radial-gradient(ellipse 50% 50% at ${glX} ${glY}, rgba(255,248,231,0.2) 0%, transparent 65%)` }} />
      </div>
      <div className="absolute right-0 top-2 bottom-2 w-5 rounded-r-md"
        style={{ transform: 'translateX(4px) translateZ(-14px)', background: 'linear-gradient(to right, #1a1410, #090704)' }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANT : PREVIEW CARD (Extrait verrouillé)
══════════════════════════════════════════════════════════ */
function PreviewCard({ book, onBuy, isFounder }: {
  book: typeof FOUNDER_BOOKS[0];
  onBuy: (bookId: string, bundle: boolean) => void;
  isFounder: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border border-[#1A1A1A] bg-[#0a0a0a] hover:border-[#FFF8E7]/12 transition-colors duration-500 group">

      <div className="grid md:grid-cols-[200px_1fr] gap-0">
        {/* Couverture */}
        <div className="relative h-48 md:h-auto overflow-hidden">
          <Image src={book.cover} alt={book.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] md:hidden" />
          {/* Badge prix */}
          <div className="absolute top-3 left-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#050505] bg-[#FFF8E7] px-2.5 py-1 uppercase">
              {book.price}€
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/28 uppercase">{book.tag}</span>
              <h3 className="font-serif text-xl md:text-2xl text-white mt-1 leading-tight">{book.title}</h3>
            </div>
            <span className="font-mono text-[9px] text-[#FFF8E7]/20 shrink-0">{book.pages}</span>
          </div>

          {/* Formats */}
          <div className="flex gap-2 mb-5">
            {book.formats.map(f => (
              <span key={f} className="font-mono text-[8px] tracking-[0.3em] border border-[#FFF8E7]/10 text-[#FFF8E7]/40 px-2.5 py-1 uppercase">{f}</span>
            ))}
          </div>

          {/* Extrait gratuit */}
          <div className="relative mb-6">
            <p className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/25 uppercase mb-3">Extrait gratuit</p>
            <div className="relative">
              {book.preview.slice(0, expanded ? book.preview.length : 2).map((line, i) => (
                <p key={i} className={`text-sm leading-relaxed mb-2 font-light ${
                  i === book.preview.length - 1
                    ? 'font-mono text-[9px] text-[#FFF8E7]/30 tracking-widest uppercase mt-3'
                    : 'text-[#a3a3a3]'
                }`}>{line}</p>
              ))}
              {!expanded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              )}
            </div>
            <button onClick={() => setExpanded(e => !e)}
              className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/30 uppercase hover:text-[#FFF8E7]/60 transition-colors mt-2">
              {expanded ? '↑ Réduire' : '↓ Lire l\'extrait'}
            </button>
          </div>

          {/* CTA */}
          {isFounder ? (
            <div className="flex items-center gap-3 text-[#FFF8E7]/40 font-mono text-[9px]">
              <svg className="w-4 h-4 text-[#FFF8E7]/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Inclus dans votre Founder Library
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => onBuy(book.id, false)}
                className="flex-1 border border-[#FFF8E7]/15 py-3 text-[#FFF8E7]/60 hover:border-[#FFF8E7]/35 hover:text-[#FFF8E7] font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-400">
                Acheter — {book.price}€
              </button>
              <button onClick={() => onBuy(book.id, true)}
                className="flex-1 bg-[#FFF8E7]/8 border border-[#FFF8E7]/20 py-3 text-[#FFF8E7]/80 hover:bg-[#FFF8E7] hover:text-[#050505] font-mono text-[9px] tracking-[0.3em] uppercase transition-all duration-400">
                Pack complet — 99€
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANT : TOME CARD (Romans)
══════════════════════════════════════════════════════════ */
function TomeCard({ tome, index, onBuy }: {
  tome: typeof NOVEL_TOMES[0];
  index: number;
  onBuy: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border border-[#1A1A1A] overflow-hidden hover:border-[#FFF8E7]/15 transition-all duration-500 bg-[#050505]">

      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image src={tome.cover} alt={tome.title} fill
          className="object-cover grayscale-[60%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          sizes="(max-width: 768px) 50vw, 16vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-[#FFF8E7]/50 text-3xl">
            🔒
          </motion.div>
        </div>

        {/* Numero */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[8px] tracking-[0.35em] text-[#FFF8E7]/40 uppercase bg-black/60 backdrop-blur-sm px-2 py-1">{tome.num}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="font-mono text-[9px] text-[#FFF8E7] bg-black/70 backdrop-blur-sm px-2 py-1">{tome.price}€</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-serif text-sm text-white leading-tight mb-1">{tome.title}</h4>
        <p className="font-mono text-[8px] text-[#FFF8E7]/25 mb-4 flex gap-2">
          <span>{tome.pages}</span>
          {tome.epub && <span>· PDF · EPUB</span>}
        </p>
        <button onClick={onBuy}
          className="w-full border border-[#1A1A1A] py-2.5 text-[#FFF8E7]/40 hover:border-[#FFF8E7]/25 hover:text-[#FFF8E7]/80 font-mono text-[8px] tracking-[0.3em] uppercase transition-all duration-400 group-hover:bg-[#FFF8E7]/5">
          Acheter
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════════════════ */
export default function EbookPage() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isFounder] = useState(false); // sera true après achat Stripe
  const [activeTab, setActiveTab] = useState<'library' | 'chronicles'>('library');

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 140], { ease: easeInOut });
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.08]);

  useEffect(() => { setMounted(true); }, []);

  const handleCheckout = async (bookId?: string, bundle = true) => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: null, bookId, bundle }),
      });
      const d = await res.json();
      if (d.url) window.location.href = d.url;
      else setIsCheckingOut(false);
    } catch { setIsCheckingOut(false); }
  };

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-[#FFF8E7] selection:text-[#050505]">

      {/* ── NAVIGATION ─────────────────────────────────── */}
      <header className="fixed top-0 w-full bg-[#050505]/65 backdrop-blur-2xl border-b border-[#FFF8E7]/5 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <Glyph size={22} className="text-[#FFF8E7]/70 group-hover:text-[#FFF8E7] transition-all duration-500" />
            <span className="font-serif font-bold tracking-[0.32em] text-[#F5F5F5]/85 uppercase text-[13px]">NIDALUM</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-[9px] font-mono tracking-[0.4em] uppercase">
            <a href="/#offer" className="text-[#FFF8E7]/25 hover:text-[#FFF8E7]/65 transition-colors">Library</a>
            <span className="text-[#FFF8E7]/65 border-b border-[#FFF8E7]/30 pb-0.5">Ebook</span>
          </nav>
          <button onClick={() => handleCheckout(undefined, true)} disabled={isCheckingOut}
            className="hidden md:block text-[9px] font-mono tracking-[0.28em] uppercase bg-[#FFF8E7] text-[#050505] px-6 py-2.5 font-bold hover:brightness-110 transition-all duration-300 disabled:opacity-50">
            {isCheckingOut ? '...' : 'Founder Library — 99€'}
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          01 — HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0 pointer-events-auto opacity-35 mix-blend-screen">
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        </motion.div>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <SparklesCore id="sparks" background="transparent" minSize={0.3} maxSize={1.0} particleDensity={75} className="w-full h-full" particleColor="#FFF8E7" speed={0.2} />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_50%,transparent_32%,#050505_100%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-0" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-5 mb-10">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#FFF8E7]/22" />
            <span className="font-mono text-[8px] tracking-[0.55em] text-[#FFF8E7]/32 uppercase">Nidalum · Founder Library · Édition Limitée</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#FFF8E7]/22" />
          </motion.div>

          {/* Titre */}
          <motion.h1 initial={{ opacity: 0, y: 55 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold leading-[0.9] tracking-[-0.025em] mb-10"
            style={{ fontSize: 'clamp(44px, 9vw, 130px)' }}>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f0f0] to-[#888]">Founder</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] via-[#E8E0CE] to-[#9a9080]">Library</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#a3a3a3] text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-5">
            5 livres fondateurs. PDF Premium + EPUB. Mises à jour incluses à vie.
          </motion.p>

          {/* Prix comparison */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-12">
            <span className="font-mono text-[11px] text-[#555] line-through">5 × 29 € = 145 €</span>
            <span className="font-mono text-[11px] text-[#FFF8E7]/25">→</span>
            <span className="font-serif text-3xl text-[#FFF8E7]">99 €</span>
            <span className="font-mono text-[9px] text-[#FFF8E7]/40 border border-[#FFF8E7]/15 px-2 py-0.5">LANCEMENT</span>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => handleCheckout(undefined, true)} disabled={isCheckingOut}
              className="relative overflow-hidden px-14 py-5 bg-[#FFF8E7] text-[#050505] font-bold uppercase tracking-[0.28em] text-[10px] transition-all duration-500 min-w-[280px] hover:shadow-[0_0_40px_rgba(255,248,231,0.18)] hover:brightness-105">
              {isCheckingOut ? 'Redirection...' : 'Accéder à la Founder Library — 99€'}
            </button>
            <button onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-14 py-5 border border-[#FFF8E7]/10 text-[#FFF8E7]/40 hover:border-[#FFF8E7]/25 hover:text-[#FFF8E7]/70 uppercase tracking-[0.28em] text-[10px] transition-all duration-500">
              Lire les extraits gratuits
            </button>
          </motion.div>

          {/* Formats inclus */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center justify-center gap-6 mt-12">
            {['✓ PDF Premium', '✓ EPUB', '✓ Téléchargement illimité', '✓ Mises à jour gratuites'].map(f => (
              <span key={f} className="font-mono text-[8px] tracking-[0.3em] text-[#FFF8E7]/22 uppercase">{f}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div animate={{ scaleY: [1, 0.25, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="w-[1px] h-14 bg-gradient-to-b from-[#FFF8E7]/35 to-transparent origin-top" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          02 — HERO BOOK 3D (Grand Livre)
      ══════════════════════════════════════════════════ */}
      <section className="py-32 md:py-44 px-6 bg-[#0a0a0a] border-t border-[#111111] z-10 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-28 items-center">

          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <Book3D src="/images/le_grand_livre.png" alt="Le Grand Livre" className="w-full max-w-[300px] md:max-w-[380px] mx-auto aspect-[3/4]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-mono text-[8px] tracking-[0.55em] text-[#FFF8E7]/28 uppercase mb-8">L&apos;Œuvre Fondatrice</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-6">
              Pas un livre de<br /><em className="text-[#FFF8E7]/55">développement personnel.</em><br />Un système.
            </h2>
            <p className="text-[#a3a3a3] leading-relaxed mb-12">
              Le Grand Livre n&apos;est pas une collection de conseils. C&apos;est une architecture mentale.
              Chaque chapitre est une porte — franchir la première rend inévitable de franchir les suivantes.
            </p>

            {/* Mini preview */}
            <div className="bg-[#050505] border border-[#1A1A1A] p-6 mb-10 relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#FFF8E7]/8" />
              <p className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/22 uppercase mb-4">Extrait — Chapitre I</p>
              <p className="text-[#a3a3a3] text-sm leading-relaxed italic mb-3">
                &ldquo;Avant d&apos;ouvrir ce livre, abandonne une certitude : la matière n&apos;est pas silencieuse...&rdquo;
              </p>
              {/* Texte verrouillé simulé */}
              <div className="relative">
                <p className="text-[#333] text-sm leading-relaxed select-none" style={{ filter: 'blur(3.5px)' }}>
                  Les anciens Nidalis savaient qu&apos;il existait un quatrième principe. Ils l&apos;appelaient le Souffle. Le Souffle n&apos;était ni une force surnaturelle, ni un don réservé à quelques élus. Il constituait la vibration fondamentale qui reliait chaque particule de l&apos;univers.
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#0a0a0a]/90 border border-[#FFF8E7]/10 px-4 py-2 flex items-center gap-2">
                    <span className="text-[#FFF8E7]/40 text-xs">🔒</span>
                    <span className="font-mono text-[8px] tracking-[0.3em] text-[#FFF8E7]/45 uppercase">Contenu réservé aux fondateurs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => handleCheckout(undefined, true)} disabled={isCheckingOut}
                className="flex-1 bg-[#FFF8E7] text-[#050505] font-bold py-4 uppercase tracking-[0.25em] text-[9px] transition-all duration-400 hover:brightness-105">
                Founder Library — 99€
              </button>
              <button onClick={() => handleCheckout('grand-livre', false)}
                className="border border-[#FFF8E7]/15 text-[#FFF8E7]/55 hover:border-[#FFF8E7]/30 hover:text-[#FFF8E7]/85 font-mono text-[9px] tracking-[0.25em] uppercase px-6 py-4 transition-all duration-400">
                29€
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          03 — CATALOGUE COMPLET (TABS)
      ══════════════════════════════════════════════════ */}
      <section id="preview" className="py-32 md:py-44 px-6 bg-[#050505] border-t border-[#111111] z-10 relative">
        <div className="max-w-5xl mx-auto">

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1 }}
            className="mb-20">
            <p className="font-mono text-[8px] tracking-[0.55em] text-[#FFF8E7]/28 uppercase mb-4">Le Catalogue</p>
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">
              Tous les livres.<br /><em className="text-[#FFF8E7]/50">Extraits gratuits.</em>
            </h2>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-[#1A1A1A]">
              {[
                { key: 'library', label: 'Founder Library (5 essais)' },
                { key: 'chronicles', label: 'Chroniques NIDALUM (6 romans)' },
              ].map(tab => (
                <button key={tab.key}
                  onClick={() => setActiveTab(tab.key as 'library' | 'chronicles')}
                  className="relative font-mono text-[9px] tracking-[0.35em] uppercase py-4 pr-8 transition-colors duration-300"
                  style={{ color: activeTab === tab.key ? '#FFF8E7' : 'rgba(255,248,231,0.25)' }}>
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div layoutId="catTab" className="absolute bottom-0 left-0 right-8 h-[1px] bg-[#FFF8E7]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content tabs */}
          <AnimatePresence mode="wait">
            {activeTab === 'library' ? (
              <motion.div key="library" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }} className="space-y-6">

                {/* Banner offre bundle */}
                <div className="border border-[#FFF8E7]/12 bg-[#FFF8E7]/3 p-6 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                  <div>
                    <p className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/35 uppercase mb-1">💡 Offre recommandée</p>
                    <p className="font-serif text-lg text-white">
                      Les 5 livres ensemble — <span className="text-[#FFF8E7]/55 line-through text-base">145€</span>
                      <span className="text-[#FFF8E7] ml-2">99€</span>
                    </p>
                    <p className="font-mono text-[8px] text-[#FFF8E7]/28 tracking-widest mt-1">PDF Premium + EPUB + Mises à jour + Bonus exclusifs</p>
                  </div>
                  <button onClick={() => handleCheckout(undefined, true)} disabled={isCheckingOut}
                    className="shrink-0 bg-[#FFF8E7] text-[#050505] font-bold px-8 py-3.5 uppercase tracking-[0.25em] text-[9px] hover:brightness-105 transition-all">
                    Accéder maintenant
                  </button>
                </div>

                {FOUNDER_BOOKS.map(book => (
                  <PreviewCard key={book.id} book={book} isFounder={isFounder}
                    onBuy={(_, bundle) => handleCheckout(book.id, bundle)} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="chronicles" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}>

                <div className="mb-10 p-6 border border-[#1A1A1A] bg-[#0a0a0a] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-[8px] tracking-[0.4em] text-[#FFF8E7]/28 uppercase mb-1">Roman de science-fiction</p>
                    <p className="font-serif text-xl text-white">Les Chroniques de NIDALUM — 6 tomes</p>
                    <p className="font-mono text-[9px] text-[#FFF8E7]/25 mt-1">PDF + EPUB · 9,99€ / tome · Ou pack 6 tomes = 44,99€</p>
                  </div>
                  <button onClick={() => handleCheckout('chronicles-pack', true)}
                    className="shrink-0 border border-[#FFF8E7]/15 text-[#FFF8E7]/55 hover:border-[#FFF8E7]/30 hover:text-[#FFF8E7]/85 font-mono text-[9px] tracking-[0.3em] uppercase px-6 py-3 transition-all">
                    Pack 6 tomes — 44,99€
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {NOVEL_TOMES.map((tome, i) => (
                    <TomeCard key={tome.id} tome={tome} index={i}
                      onBuy={() => handleCheckout(tome.id, false)} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          04 — CE QU'INCLUT LE PACK
      ══════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-t border-[#111111] z-10 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1 }}
            className="text-center mb-20">
            <p className="font-mono text-[8px] tracking-[0.55em] text-[#FFF8E7]/28 uppercase mb-4">La valeur totale</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Ce que vous recevez<br />pour <em className="text-[#FFF8E7]/60">99€.</em></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '◈', title: 'PDF Premium (x5)', desc: 'Design parfaitement conservé. Imprimable haute résolution. Lisible sur tous écrans.', val: '5 × 29€' },
              { icon: '◉', title: 'EPUB (x5)', desc: 'Compatible Kindle, Apple Books, Kobo, et toutes les liseuses. Mise en page fluide.', val: 'Inclus' },
              { icon: '◐', title: 'Mises à jour gratuites', desc: 'Toutes les futures éditions et bonus de chaque livre inclus automatiquement.', val: 'À vie' },
              { icon: '◎', title: 'Téléchargement illimité', desc: 'Accès permanent depuis votre espace membre. Aucune limite de téléchargement.', val: 'Illimité' },
              { icon: '◆', title: 'Accès Founder Library', desc: 'Plateforme web sécurisée pour lire en ligne, avec mode nuit natif et synchronisation.', val: 'Inclus' },
              { icon: '◇', title: '220+ Fréquences Musicales', desc: 'Fréquences neuro-acoustiques 432Hz & 528Hz pour accompagner votre lecture.', val: 'Bonus' },
            ].map((item, i) => {
              const iRef = useRef<HTMLDivElement>(null);
              const iInView = useInView(iRef, { once: true });
              return (
                <motion.div key={item.title} ref={iRef}
                  initial={{ opacity: 0, y: 16 }} animate={iInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-[#1A1A1A] p-6 flex gap-5 group hover:border-[#FFF8E7]/12 transition-colors duration-500">
                  <span className="text-3xl text-[#FFF8E7]/18 group-hover:text-[#FFF8E7]/45 transition-colors duration-500 font-mono shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#FFF8E7]/65">{item.title}</h4>
                      <span className="font-mono text-[8px] text-[#FFF8E7]/25 border border-[#FFF8E7]/8 px-2 py-0.5">{item.val}</span>
                    </div>
                    <p className="text-[#666] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          05 — CTA FINAL
      ══════════════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#050505] border-t border-[#111111] z-10 relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto text-center">

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFF8E7]/14 to-transparent mb-20" />
          <Glyph size={24} className="mx-auto mb-10 text-[#FFF8E7]/30" />

          {/* Prix comparatif */}
          <div className="mb-8">
            <p className="font-mono text-[8px] tracking-[0.55em] text-[#FFF8E7]/28 uppercase mb-4">Founder Library — Offre de lancement</p>
            <div className="flex items-center justify-center gap-5 mb-2">
              <div className="text-center">
                <p className="font-serif text-5xl text-white">99€</p>
                <p className="font-mono text-[8px] text-[#FFF8E7]/30 uppercase tracking-widest mt-1">Paiement unique</p>
              </div>
              <div className="h-16 w-[1px] bg-[#1A1A1A]" />
              <div className="text-center opacity-40">
                <p className="font-serif text-3xl text-[#555] line-through">145€</p>
                <p className="font-mono text-[8px] text-[#555] uppercase tracking-widest mt-1">Séparément</p>
              </div>
            </div>
          </div>

          <p className="text-[#a3a3a3] text-sm leading-relaxed mb-10 font-light">
            Accès immédiat. Téléchargement direct de tous vos fichiers
            (PDF + EPUB × 5 livres). Mises à jour permanentes incluses.
          </p>

          {/* Inclus list compact */}
          <ul className="space-y-2.5 text-left mb-10 bg-[#0a0a0a] border border-[#1A1A1A] p-6">
            {[
              'Le Grand Livre des Mystères Cachés (PDF HD + EPUB)',
              'Le Grand Livre des Mystères Interdits (PDF HD + EPUB)',
              'Architecture du Silence — Codex NIDALUM (PDF HD + EPUB)',
              '52 Histoires qui Réveillent le Créateur Intérieur (PDF + EPUB)',
              'Mantras de Sagesse — Voyage Initiatique (PDF + EPUB)',
              'Accès Founder Library (Web Reader sécurisé)',
              '220+ Fréquences Musicales Neuro-Acoustiques',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-[#a3a3a3] text-[12px]">
                <Glyph size={8} className="text-[#FFF8E7]/25 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <button onClick={() => handleCheckout(undefined, true)} disabled={isCheckingOut}
            className="w-full bg-[#FFF8E7] text-[#050505] font-bold py-5 uppercase tracking-[0.28em] text-[10px] transition-all duration-500 hover:brightness-110 hover:shadow-[0_0_50px_rgba(255,248,231,0.14)] disabled:opacity-50 mb-4">
            {isCheckingOut ? 'Redirection vers Stripe...' : 'Accéder à la Founder Library — 99€'}
          </button>

          <p className="font-mono text-[8px] text-[#333] tracking-widest uppercase mb-1">
            Paiement sécurisé par Stripe · Accès immédiat
          </p>
          <p className="font-mono text-[8px] text-[#2a2a2a] tracking-widest uppercase">
            Created in Germany · Independent Publisher · Digital Edition
          </p>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFF8E7]/14 to-transparent mt-20" />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
