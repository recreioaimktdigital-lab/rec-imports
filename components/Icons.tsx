
import React from 'react';

interface LogoProps {
  className?: string;
}

export const LogoIcon: React.FC<LogoProps> = ({ className }) => (
  <svg 
    className={`${className} drop-shadow-sm`} 
    viewBox="0 0 700 70" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Recreio Imports"
    preserveAspectRatio="xMinYMid meet"
  >
    {/* 
       Updated Logo Construction:
       1. ViewBox 700x70 (Increased width to safely contain the 'S').
       2. Layering: Solid Lead Background + Electric Yellow Foreground.
       3. Reduced stroke width to 1.5 for Ultra-HD definition at small sizes (h-6).
    */}
    
    {/* LAYER 1: The "Shadow/Background" (Chumbo) */}
    <text 
      x="0" 
      y="55%" 
      dominantBaseline="middle" 
      textAnchor="start" 
      fontFamily="'Orbitron', sans-serif" 
      fontWeight="900"
      fontSize="60"
      fill="#1F2937" 
      stroke="#1F2937"
      strokeWidth="1.5" 
      strokeLinejoin="round"
    >
      RECREIO IMPORTS
    </text>

    {/* LAYER 2: The Main Text (Brand Yellow) */}
    <text 
      x="0" 
      y="55%" 
      dominantBaseline="middle" 
      textAnchor="start" 
      fontFamily="'Orbitron', sans-serif" 
      fontWeight="900"
      fontSize="60"
      fill="#FFEA00"
    >
      RECREIO IMPORTS
    </text>
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export const HeartIconSolid: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

export const BagIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export const MinusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const StarIconOutline: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const PlayCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" fill="#25D366" />
    <path 
        d="M32 12C20.954 12 12 20.954 12 32C12 36.348 13.391 40.402 15.789 43.707L13.5 52L22.131 49.727C25.078 51.328 28.452 52.25 32 52.25C43.046 52.25 52 43.296 52 32.25C52 21.204 43.046 12 32 12ZM42.5 38.5C42.023 39.883 40.063 41.133 38.656 41.445C37.648 41.672 36.336 41.813 31.953 39.992C27.977 38.344 25.328 34.336 25.125 34.063C24.93 33.805 23.5 31.898 23.5 29.938C23.5 27.977 24.5 27.023 24.891 26.625C25.211 26.297 25.758 26.156 26.25 26.156C26.438 26.156 26.594 26.164 26.734 26.172C27.172 26.188 27.391 26.211 27.68 26.898C28.023 27.734 28.867 29.797 28.969 30.008C29.07 30.219 29.18 30.508 29.031 30.797C28.891 31.086 28.766 31.219 28.539 31.484C28.32 31.75 28.094 31.922 27.875 32.195C27.633 32.461 27.367 32.75 27.656 33.25C27.938 33.734 28.914 35.328 30.344 36.602C32.188 38.242 33.688 38.766 34.203 38.984C34.719 39.203 35.031 39.156 35.336 38.813C35.688 38.414 36.125 37.813 36.563 37.195C36.875 36.758 37.281 36.813 37.695 36.969C38.109 37.125 40.328 38.219 40.789 38.445C41.25 38.672 41.586 38.781 41.711 38.992C41.836 39.203 41.836 39.938 41.359 41.32Z" 
        fill="white"
    />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path d="M12.5 6.5C12.5 4.5 13.5 3 15 2V5C14 5 13.5 5.5 13.5 6.5V13.5C13.5 16 11.5 18 9 18C6.5 18 4.5 16 4.5 13.5C4.5 11 6.5 9 9 9V6C4.5 6 1 9.5 1 14C1 18.5 4.5 22 9 22C13.5 22 17 18.5 17 14V9.5C18.5 10 20 11 21 12.5V9C19.5 8 18 7 16.5 6.5V6.5H12.5Z" fill="#25F4EE" transform="translate(-1, -1)"/>
             <path d="M12.5 6.5C12.5 4.5 13.5 3 15 2V5C14 5 13.5 5.5 13.5 6.5V13.5C13.5 16 11.5 18 9 18C6.5 18 4.5 16 4.5 13.5C4.5 11 6.5 9 9 9V6C4.5 6 1 9.5 1 14C1 18.5 4.5 22 9 22C13.5 22 17 18.5 17 14V9.5C18.5 10 20 11 21 12.5V9C19.5 8 18 7 16.5 6.5V6.5H12.5Z" fill="#FE2C55" transform="translate(1, 1)"/>
             <path d="M12.5 6.5C12.5 4.5 13.5 3 15 2V5C14 5 13.5 5.5 13.5 6.5V13.5C13.5 16 11.5 18 9 18C6.5 18 4.5 16 4.5 13.5C4.5 11 6.5 9 9 9V6C4.5 6 1 9.5 1 14C1 18.5 4.5 22 9 22C13.5 22 17 18.5 17 14V9.5C18.5 10 20 11 21 12.5V9C19.5 8 18 7 16.5 6.5V6.5H12.5Z" fill="currentColor"/>
        </g>
    </svg>
);

export const AiAssistantIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export const MusicNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

export const MusicOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);
