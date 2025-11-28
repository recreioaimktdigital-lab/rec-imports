
import React, { useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect for keyboard shortcuts and autoplay handling
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Tentar reproduzir automaticamente com som
    if (videoRef.current) {
        videoRef.current.volume = 0.5; // Iniciar com 50% do volume
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Se o navegador bloquear o autoplay com som, tentar mutado
                console.log("Autoplay com som bloqueado, tentando mutado:", error);
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play();
                }
            });
        }
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!videoUrl) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-screen h-screen bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar vídeo"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={videoUrl}
          controls
          loop
          playsInline // Important for iOS
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        >
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
