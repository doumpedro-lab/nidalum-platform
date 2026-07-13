import React from 'react';
import { Glyph } from './Glyph';

export default function Footer() {
  return (
    <footer className="border-t border-[#111111] pt-24 pb-12 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end border-b border-[#111111] pb-12">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wider mb-4">NIDALUM</h3>
            <p className="text-[#a3a3a3] font-light max-w-sm">
              La porte d'entrée de l'écosystème. Le système d'ingénierie comportementale pour les créateurs et décideurs.
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex gap-4">
            {[
              { name: 'X', url: 'https://x.com/NidalumUnivers' },
              { name: 'Instagram', url: 'https://www.instagram.com/nidalumuniverse/' },
              { name: 'YouTube', url: 'https://www.youtube.com/@NIDALUMUNIVERSE' }
            ].map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Aller sur ${social.name}`}
                className="w-10 h-10 border border-[#222222] rounded-full flex items-center justify-center text-[#a3a3a3] hover:text-gold hover:border-gold transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="text-[10px] uppercase font-mono" aria-hidden="true">{social.name[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Écosystème</h4>
            <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
              <li><a href="#codex" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Codex</a></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Music</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Oracle</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Books</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Apps</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Community</span></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Nidalum Music</h4>
            <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Albums</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Fréquences</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Playlists</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Soundscapes</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Artists</span></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Écouter</h4>
            <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
              <li><a href="https://open.spotify.com/intl-fr/artist/1EuAQDkHwAbGh5BXW6Lw5Q?si=EnHwy_ZCTFq2NLuZOj3nXQ" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Spotify</a></li>
              <li><a href="https://music.apple.com/fr/album/hymne-nidalum-the-spirit-of-the-sun/1872609017?i=1872609019" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Apple Music</a></li>
              <li><a href="https://music.youtube.com/channel/UCh8vFjI6qZGBGzHg9pIFYzw" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">YouTube Music</a></li>
              <li><a href="https://amazon.de/music/player/albums/B0GK2SV755?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_vXpFbCqAHlqC0aC9hedzR6HCv" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Amazon Music</a></li>
              <li><a href="https://deezer.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Deezer</a></li>
              <li><a href="https://tidal.com/search?q=nidalum" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Tidal</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Réseaux</h4>
            <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
              <li><a href="https://x.com/NidalumUnivers" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">X (Twitter)</a></li>
              <li><a href="https://www.instagram.com/nidalumuniverse/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Instagram</a></li>
              <li><a href="https://fr.pinterest.com/nidalumuniverse/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Pinterest</a></li>
              <li><a href="https://www.tiktok.com/@nidalumuniverse" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">TikTok</a></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">LinkedIn</span></li>
              <li><a href="https://www.youtube.com/@NIDALUMUNIVERSE" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">YouTube</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-8 opacity-50">Entreprise</h4>
            <ul className="space-y-4 text-[#a3a3a3] text-sm font-light">
              <li><a href="/manifesto" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">Notre Manifeste</a></li>
              <li><a href="/about" className="hover:text-gold transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-1">À propos</a></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Contact</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Presse</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Partenaires</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Mentions légales</span></li>
              <li><span aria-disabled="true" className="opacity-40 cursor-not-allowed block px-1">Confidentialité</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#111111] pt-12 flex flex-col items-center justify-center text-center">
          <Glyph size={24} className="text-[#333333] mb-8" />
          <h5 className="font-serif italic text-2xl md:text-3xl text-[#555555] mb-8">Attention is the last currency.</h5>
          <div className="flex flex-col items-center gap-2 text-[#444444] text-[10px] uppercase tracking-[0.2em] font-mono">
            <span>Forged in Germany. Built for creators. Used worldwide.</span>
            <span className="mt-2 text-[#333333]">© 2026 NIDALUM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
