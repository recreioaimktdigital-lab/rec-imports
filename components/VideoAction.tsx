
import React from 'react';
import { PlayCircleIcon } from './Icons';

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
  const videoItems = [
    { key: 'training', title: 'Dicas de Treino', img: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'highlights', title: 'Melhores Momentos', img: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { key: 'stories', title: 'Histórias de Atletas', img: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-300 dark:bg-[#121212]">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-display uppercase text-brand-yellow"
          style={{ textShadow: '3px 3px 2px #1F2937' }}
        >
          Assista à Ação
        </h2>
        {/* Increased font size */}
        <p className="mt-2 md:mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
          Sinta a intensidade, paixão e dedicação de atletas superando seus limites.
        </p>

        <div
          className="mt-8 md:mt-12 relative group overflow-hidden rounded-lg w-full text-left aspect-video cursor-pointer"
          onClick={() => onOpenVideo(videoLinks.main)}
        >
            <img src="https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Athlete at starting block" className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-8 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
               {/* Updated: White by default, Brand Yellow on hover with scale animation */}
               <PlayCircleIcon className="w-20 h-20 text-white group-hover:text-brand-yellow transition-all duration-300 transform group-hover:scale-125 drop-shadow-lg" />
            </div>
             <div className="absolute bottom-8 left-8 text-left text-white">
                  <h3 className="text-3xl font-bold group-hover:text-brand-yellow transition-colors">Excelência Atlética</h3>
                  {/* Increased font size */}
                  <p className="text-xl mt-2 drop-shadow-md">Veja como os campeões treinam e competem no mais alto nível.</p>
              </div>
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
                  <p className="mt-2 text-xl font-bold text-white group-hover:text-brand-yellow transition-colors duration-300 drop-shadow-md">{item.title}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoAction;
