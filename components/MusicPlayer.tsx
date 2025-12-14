
import React, { useState, useRef, useEffect } from 'react';
import { MusicNoteIcon, MusicOffIcon, ArrowRightIcon } from './Icons';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const infoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Playlist com Links MP3 de Alta Estabilidade e Qualidade de Estúdio (Sem distorção)
  const playlist = [
    {
      title: "West Coast G-Funk (Snoop Vibe)",
      url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3", // Clean Hip Hop
    },
    {
      title: "Chill Trap (Drake Vibe)",
      url: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3", // Smooth Trap
    },
    {
      title: "Hard Beat (Eminem Vibe)",
      url: "https://cdn.pixabay.com/audio/2022/03/23/audio_0579294e3d.mp3", // Clean Hard Rap
    },
    {
      title: "Indie Rock (Midnight Oil Vibe)",
      url: "https://cdn.pixabay.com/audio/2020/09/14/audio_a0a033282b.mp3", // Guitar Rock
    },
    {
      title: "Punk Energy (Ramones Vibe)",
      url: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3", // Fast Rock
    },
    {
      title: "Acoustic Road (Ben Harper Vibe)",
      url: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3", // Clean Acoustic
    },
    {
      title: "Party Pop (Black Eyed Peas Vibe)",
      url: "https://cdn.pixabay.com/audio/2023/04/17/audio_f5e6709772.mp3", // Dance Pop
    },
    {
      title: "Urban Lounge",
      url: "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3", // Lo-Fi Clean
    },
    {
      title: "Summer Vibes",
      url: "https://cdn.pixabay.com/audio/2022/03/24/audio_24e2358824.mp3", // House Clean
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Função para mostrar informações por 6 segundos
  const showInfoTemporarily = () => {
    setIsInfoVisible(true);
    
    if (infoTimeoutRef.current) {
      clearTimeout(infoTimeoutRef.current);
    }

    infoTimeoutRef.current = setTimeout(() => {
      setIsInfoVisible(false);
    }, 6000); // 6 segundos exatos
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      // --- CLIQUE DUPLO: Próxima Música ---
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleNextTrack();
    } else {
      // --- CLIQUE ÚNICO: Tocar/Pausar ---
      clickTimeoutRef.current = setTimeout(() => {
        togglePlay();
        clickTimeoutRef.current = null;
      }, 200); // Delay reduzido para resposta rápida
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsInfoVisible(false); 
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.error("Erro ao tocar:", e));
        }
        showInfoTemporarily();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    // Nota: O useEffect abaixo lidará com o play automático
  };

  // Efeito para trocar a fonte de áudio quando o índice muda
  useEffect(() => {
    if (audioRef.current) {
        // Salva o estado atual de reprodução se quisermos forçar o play
        // Mas se o usuário clicou para pular, queremos que toque.
        const shouldPlay = isPlaying; 
        
        audioRef.current.src = playlist[currentTrackIndex].url;
        audioRef.current.load();
        
        if (shouldPlay) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => showInfoTemporarily())
                    .catch(e => console.error("Erro na troca de faixa:", e));
            }
        }
    }
  }, [currentTrackIndex]);

  // Volume inicial
  useEffect(() => {
      if(audioRef.current) {
          audioRef.current.volume = 0.5;
      }
      return () => {
        if (infoTimeoutRef.current) clearTimeout(infoTimeoutRef.current);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      };
  }, []);

  return (
    <div 
        className="fixed bottom-24 left-4 md:left-6 z-[90] group flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <audio 
        ref={audioRef} 
        onEnded={handleNextTrack}
        preload="auto"
        crossOrigin="anonymous"
      />
      
      {/* Container de Informação da Música */}
      <div 
        className={`
            absolute left-14 top-1/2 -translate-y-1/2 
            bg-black/90 text-white text-xs px-4 py-2 rounded-lg 
            whitespace-nowrap shadow-xl border border-gray-700
            transition-all duration-500 ease-in-out
            ${(isInfoVisible || isHovered) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
        `}
      >
        <div className="flex flex-col">
            <span className="font-bold text-brand-yellow text-[10px] uppercase tracking-wider">Tocando Agora</span>
            <span className="font-medium">{currentTrack.title}</span>
        </div>
        {/* Seta decorativa */}
        <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-black/90 border-b-[6px] border-b-transparent"></div>
      </div>

      <button
        onClick={handleClick}
        className={`
            w-12 h-12 rounded-full flex items-center justify-center 
            shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] transition-all duration-300 border-2 border-transparent
            ${isPlaying 
                ? 'bg-brand-yellow scale-110 shadow-[0_0_15px_rgba(255,234,0,0.5)] border-white/20' 
                : 'bg-gray-900 hover:bg-gray-800'
            }
        `}
        aria-label="Controle de Música"
      >
        {isPlaying ? (
           <MusicNoteIcon className="w-6 h-6 text-black animate-pulse" />
        ) : (
           <MusicOffIcon className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
