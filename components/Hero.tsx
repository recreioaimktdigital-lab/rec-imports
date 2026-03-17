import React, { useState, useRef } from 'react';
import { PlayCircleIcon, PauseIcon, VolumeUpIcon, VolumeOffIcon } from './Icons';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-[85vh] w-full bg-black overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      >
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      
      {/* Video Controls Group */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
        {/* Mute/Unmute Button */}
        <button 
          onClick={toggleMute}
          className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:text-brand-yellow hover:bg-black/70 transition-all backdrop-blur-md border border-white/20 shadow-xl"
          aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
          {isMuted ? (
            <VolumeOffIcon className="w-6 h-6" />
          ) : (
            <VolumeUpIcon className="w-6 h-6" />
          )}
        </button>

        {/* Pause/Play Toggle Button */}
        <button 
          onClick={toggleVideo}
          className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:text-brand-yellow hover:bg-black/70 transition-all backdrop-blur-md border border-white/20 shadow-xl"
          aria-label={isPlaying ? "Pausar vídeo" : "Tocar vídeo"}
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6" />
          ) : (
            <PlayCircleIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}