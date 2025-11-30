
import React, { useRef, useState } from 'react';
import { PlayCircleIcon, PauseIcon } from './Icons';

interface VideoActionProps {
  onOpenVideo: (url: string) => void;
}

// FIX: URLs substituídas por vídeos de amostra do Google que POSSUEM ÁUDIO garantido.
// Os vídeos anteriores do Pexels eram mudos (stock footage).
const videoLinks = {
  main: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  training: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  highlights: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  stories: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
};

const VideoAction: React.FC<VideoActionProps> = ({ onOpenVideo }) => {
  const [isMainVideoPlaying, setIsMainVideoPlaying] = useState(true);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const videoItems = [
    { key: 'training', title: 'Dicas de Treino', img: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'highlights', title: 'Melhores Momentos', img: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'stories', title: 'Histórias de Atletas', img: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  const toggleMainVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mainVideoRef.current) {
        if (isMainVideoPlaying) {
            mainVideoRef.current.pause();
        } else {
            mainVideoRef.current.play();
        }
        setIsMainVideoPlaying(!isMainVideoPlaying);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-300 dark:bg-gray-300">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-display uppercase text-brand-yellow"
          style={{ textShadow: '3px 3px 2px #1F2937' }}
        >
          Assista à Ação
        </h2>
        {/* Increased font size */}
        <p className="mt-2 md:mt-4 text-xl md:text-2xl text-gray-900 max-w-4xl mx-auto">
          Sinta a intensidade, paixão e dedicação de atletas superando seus limites.
        </p>

        <div
          className="mt-8 md:mt-12 relative group overflow-hidden rounded-lg w-full text-left aspect-video cursor-pointer"
          onClick={() => onOpenVideo(videoLinks.main)}
        >
            <video
                ref={mainVideoRef}
                src={videoLinks.main}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onContextMenu={(e) => e.preventDefault()}
            />
            
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-500"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
               {/* Center Play Icon for Full Screen Action */}
               <PlayCircleIcon className="w-20 h-20 text-white group-hover:text-brand-yellow transition-all duration-300 transform group-hover:scale-125 drop-shadow-lg" />
            </div>

             <div className="absolute bottom-8 left-8 text-left text-white pointer-events-none">
                  <h3 className="text-3xl font-bold group-hover:text-brand-yellow transition-colors">Excelência Atlética</h3>
                  {/* Increased font size */}
                  <p className="text-xl mt-2 drop-shadow-md">Veja como os campeões treinam e competem no mais alto nível.</p>
              </div>

              {/* Pause/Play Toggle Button */}
              <button 
                onClick={toggleMainVideo}
                className="absolute bottom-8 right-8 z-30 p-3 bg-black/50 rounded-full text-white hover:text-brand-yellow hover:bg-black/70 transition-all backdrop-blur-md border border-white/20"
                aria-label={isMainVideoPlaying ? "Pausar vídeo" : "Tocar vídeo"}
              >
                  {isMainVideoPlaying ? (
                      <PauseIcon className="w-8 h-8" />
                  ) : (
                      <PlayCircleIcon className="w-8 h-8" />
                  )}
              </button>
        </div>

        <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {videoItems.map(item => (
            <div 
              key={item.key} 
              className="relative group overflow-hidden rounded-lg w-full aspect-[4/3] cursor-pointer" 
              onClick={() => onOpenVideo(videoLinks[item.key as keyof typeof videoLinks])}
            >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white">
                  {/* Updated: White by default, Brand Yellow on hover with scale animation */}
                  <PlayCircleIcon className="w-16 h-16 text-white group-hover:text-brand-yellow transition-all duration-300 transform group-hover:scale-125 drop-shadow-lg" />
                  {/* Increased font size */}
                  <p className="mt-2 text-xl font-bold text-gray-900 group-hover:text-brand-yellow transition-colors duration-300 drop-shadow-md bg-white/10 backdrop-blur-sm px-2 rounded">{item.title}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoAction;
