import React from 'react';
import { PlayCircleIcon } from './Icons';

interface VideoActionProps {
  onOpenVideo: (url: string) => void;
}

// IDs fornecidos
const videoLinks = {
  // Vídeo principal (loop/autoplay mutado, sem controles)
  main: 'https://www.youtube.com/embed/2jRIFyyPtEo?autoplay=1&mute=1&loop=1&playlist=2jRIFyyPtEo&controls=0&modestbranding=1&rel=0',
  // Cards/modais (com controles)
  training: 'https://www.youtube.com/embed/CoL7wOgTq9k?autoplay=1&rel=0&modestbranding=1',
  highlights: 'https://www.youtube.com/embed/WIPsrOK77BQ?autoplay=1&rel=0&modestbranding=1',
  stories: 'https://www.youtube.com/embed/eWa5CfMBTag?autoplay=1&rel=0&modestbranding=1',
};

const VideoAction: React.FC<VideoActionProps> = ({ onOpenVideo }) => {
  const videoItems = [
    {
      key: 'training',
      title: 'Dicas de Treino',
      img: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      key: 'highlights',
      title: 'Melhores Momentos',
      img: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      key: 'stories',
      title: 'Histórias de Atletas',
      img: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-300 dark:bg-gray-300">
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-4xl md:text-6xl font-display uppercase text-brand-yellow"
          style={{ textShadow: '3px 3px 2px #1F2937' }}
        >
          Assista à Ação
        </h2>
        <p className="mt-2 md:mt-4 text-xl md:text-2xl text-gray-900 max-w-4xl mx-auto">
          Sinta a intensidade, paixão e dedicação de atletas superando seus limites.
        </p>

        {/* VIDEO PRINCIPAL (YouTube embed, mutado/loop, sem controles) */}
        <div className="mt-8 md:mt-12 relative overflow-hidden rounded-lg w-full aspect-video">
          <iframe
            src={videoLinks.main}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="Excelência Atlética"
            style={{ border: 'none' }}
          />
          <div className="absolute bottom-8 left-8 text-left text-white pointer-events-none">
            <h3 className="text-3xl font-bold text-brand-yellow">Excelência Atlética</h3>
            <p className="text-xl mt-2 drop-shadow-md">
              Veja como os campeões treinam e competem no mais alto nível.
            </p>
          </div>
        </div>

        {/* 3 VIDEOS MENORES (abrem modal) */}
        <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {videoItems.map((item) => (
            <div
              key={item.key}
              className="relative group overflow-hidden rounded-lg w-full aspect-[4/3] cursor-pointer"
              onClick={() => onOpenVideo(videoLinks[item.key as keyof typeof videoLinks])}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white">
                <PlayCircleIcon className="w-16 h-16 text-white group-hover:text-brand-yellow transition-all duration-300 transform group-hover:scale-125 drop-shadow-lg" />
                <p className="mt-2 text-xl font-bold text-white group-hover:text-brand-yellow transition-colors duration-300 drop-shadow-md bg-white/10 backdrop-blur-sm px-2 rounded">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoAction;
