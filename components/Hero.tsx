
import React from 'react';
import { PlayIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] md:h-screen bg-black text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://picsum.photos/1920/1080?random=1')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-display uppercase tracking-wider">
          Recreio Imports.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          The you that knows you can is 26.2 miles away.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-black text-white font-semibold py-3 px-8 rounded-full border-2 border-brand-yellow hover:bg-brand-yellow hover:text-black transition-colors duration-300">
            Gear Up to Race
          </button>
          <button className="bg-black/50 text-white font-semibold py-3 px-8 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center space-x-2">
            <PlayIcon className="w-6 h-6" />
            <span>Watch</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
            <span className="block w-2 h-2 rounded-full bg-white"></span>
            <span className="block w-2 h-2 rounded-full bg-gray-500"></span>
            <span className="block w-2 h-2 rounded-full bg-gray-500"></span>
        </div>
        <button className="p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors">
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
