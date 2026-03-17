import React, { useState, useRef, useEffect } from 'react';
import { MusicNoteIcon, MusicOffIcon } from './Icons';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playlist = [
    { title: "West Coast Vibes", url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" },
    { title: "Chill Urban Trap", url: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a73467.mp3" },
    { title: "Energy Workout", url: "https://cdn.pixabay.com/audio/2022/03/23/audio_0579294e3d.mp3" },
    { title: "Midnight Rock", url: "https://cdn.pixabay.com/audio/2020/09/14/audio_a0a033282b.mp3" }
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play blocked"));
        showInfo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    showInfo();
  };

  const showInfo = () => {
    setIsInfoVisible(true);
    setTimeout(() => setIsInfoVisible(false), 4000);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleNextTrack();
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        togglePlay();
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrackIndex].url;
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <audio ref={audioRef} onEnded={handleNextTrack} />
      
      {isInfoVisible && (
        <div className="absolute bottom-full mb-2 right-0 bg-black/90 text-white text-[10px] px-4 py-2 rounded-lg border border-brand-yellow/30 animate-fade-in whitespace-nowrap shadow-xl z-50">
          <p className="font-bold text-brand-yellow text-right italic">TOCANDO AGORA</p>
          <p className="text-right">{playlist[currentTrackIndex].title}</p>
        </div>
      )}

      {/* Padronizado: w-12 h-12 / Icon: w-6 h-6 */}
      <button
        onClick={handleClick}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md border border-gray-200 dark:border-gray-800 ${isPlaying ? 'bg-brand-yellow text-black' : 'bg-gray-100 dark:bg-gray-900 text-gray-500'}`}
      >
        {isPlaying ? <MusicNoteIcon className="w-6 h-6 animate-pulse" /> : <MusicOffIcon className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default MusicPlayer;