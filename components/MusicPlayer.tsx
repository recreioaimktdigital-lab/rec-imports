
import React, { useState, useRef, useEffect } from 'react';
import { MusicNoteIcon, MusicOffIcon, ArrowRightIcon } from './Icons';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Playlist com Links de Alta Disponibilidade (Google Storage / Samples)
  // Garantia de funcionamento.
  const playlist = [
    {
      title: "West Coast Beat (Snoop Vibe)",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", // Audio sample wrapper
    },
    {
      title: "Trap Mode (Drake Vibe)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "High Energy (Eminem Vibe)",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/Volcano.mp4",
    },
    {
      title: "Rock Classic (Ramones Vibe)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
    },
    {
      title: "Alternative (Midnight Oil Vibe)",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    },
    {
      title: "Chill Acoustic (Ben Harper Vibe)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      title: "Party Pop (Black Eyed Peas Vibe)",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    },
    {
      title: "Lo-Fi Shop",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      title: "Deep House Style",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      // Duplo Clique: Próxima
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleNextTrack();
    } else {
      // Clique Único: Play/Pause (Delay reduzido para 200ms)
      clickTimeoutRef.current = setTimeout(() => {
        togglePlay();
        clickTimeoutRef.current = null;
      }, 200);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.error("Erro ao tocar:", e));
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true); 
    // O useEffect cuidará de tocar a nova faixa
  };

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = playlist[currentTrackIndex].url;
        audioRef.current.load();
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => console.error("Erro na troca de faixa:", e));
            }
        }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
      if(audioRef.current) {
          audioRef.current.volume = 0.6;
      }
  }, []);

  return (
    <div 
        className="fixed bottom-24 left-4 md:left-6 z-[90] group flex items-center gap-3"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
    >
      <audio 
        ref={audioRef} 
        onEnded={handleNextTrack}
        preload="auto"
        crossOrigin="anonymous"
      />
      
      {/* Tooltip Simples */}
      <div className={`transition-all duration-300 absolute left-16 top-2 bg-black text-white text-xs px-3 py-1 rounded whitespace-nowrap ${showTooltip || isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <span className="font-bold text-brand-yellow mr-1">♪</span> 
        {isPlaying ? currentTrack.title : "Clique para Tocar"}
      </div>

      <button
        onClick={handleClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border-2 
          ${isPlaying 
            ? 'bg-brand-yellow border-white scale-110' 
            : 'bg-gray-900 border-gray-600 hover:scale-105'
          }
        `}
        title="1 clique: Tocar/Pausar | 2 cliques: Próxima"
      >
        {isPlaying ? (
           <MusicNoteIcon className="w-6 h-6 text-black animate-pulse" />
        ) : (
           <MusicOffIcon className="w-6 h-6 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
