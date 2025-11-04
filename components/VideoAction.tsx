
import React from 'react';
import { PlayCircleIcon } from './Icons';

const VideoAction: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow">
          Assista à Ação
        </h2>
        <p className="mt-2 md:mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Sinta a intensidade, paixão e dedicação de atletas superando seus limites.
        </p>

        <div className="mt-8 md:mt-12 relative group overflow-hidden rounded-lg">
          <img src="https://picsum.photos/1600/900?random=7" alt="Athlete at starting block" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-8 text-white">
             <PlayCircleIcon className="w-20 h-20 text-white/80 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
          </div>
           <div className="absolute bottom-8 left-8 text-left text-white">
                <h3 className="text-3xl font-bold">Excelência Atlética</h3>
                <p>Veja como os campeões treinam e competem no mais alto nível.</p>
            </div>
        </div>

        <div className="mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="relative group overflow-hidden rounded-lg">
            <img src="https://picsum.photos/800/600?random=8" alt="Training" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white">
              <PlayCircleIcon className="w-16 h-16 text-white/80 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
              <p className="mt-2 font-semibold">Dicas de Treino</p>
            </div>
          </div>
           <div className="relative group overflow-hidden rounded-lg">
            <img src="https://picsum.photos/800/600?random=9" alt="Game Highlights" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white">
              <PlayCircleIcon className="w-16 h-16 text-white/80 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
              <p className="mt-2 font-semibold">Melhores Momentos</p>
            </div>
          </div>
           <div className="relative group overflow-hidden rounded-lg">
            <img src="https://picsum.photos/800/600?random=10" alt="Athlete Stories" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-white">
              <PlayCircleIcon className="w-16 h-16 text-white/80 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110" />
              <p className="mt-2 font-semibold">Histórias de Atletas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAction;
