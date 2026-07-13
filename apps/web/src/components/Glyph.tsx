import React from 'react';

// Le Glyphe NIDALUM officiel
// Une géométrie sacrée : un losange fendu verticalement, symbolisant la Porte et l'Interrupteur.
export const Glyph = ({ size = 28, className = "" }: { size?: number, className?: string }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2L2 12L12 22L22 12L12 2Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12 2V22" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};
