
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

const spotlightItems = ['Air Jordan 1', 'Air Max', 'Graphic Tees', 'Dunk', 'Lifestyle'];

const Spotlight: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-[#121212]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow">
          Spotlight
        </h2>
        <p className="mt-2 md:mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Classic silhouettes and cutting-edge innovation to build your game from the ground up.
        </p>
        
        <div className="mt-8 md:mt-12 relative">
          <div className="flex items-center space-x-4 md:space-x-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {spotlightItems.map((item) => (
              <div key={item} className="flex-shrink-0 w-60 h-60 md:w-80 md:h-80 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <span className="text-xl font-bold text-white">{item}</span>
              </div>
            ))}
          </div>
           <button className="absolute top-1/2 -translate-y-1/2 -left-4 hidden md:block p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <button className="absolute top-1/2 -translate-y-1/2 -right-4 hidden md:block p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
