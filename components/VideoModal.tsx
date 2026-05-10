import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface VideoModalProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!videoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl aspect-video mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Fechar vídeo"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title="Video Player"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default VideoModal;
