
import React, { useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
// FIX: Corrected import path for Product and Filters types.
import { Product, Filters } from '../data/products';

interface SpotlightProps {
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
}

const spotlightItems = [
  { name: 'Air Jordan 1', image: 'https://picsum.photos/800/800?random=101', filter: { style: ['Basquete'] } },
  { name: 'Air Max', image: 'https://picsum.photos/800/800?random=102', filter: { brand: ['Nike'] } },
  { name: 'Camisetas', image: 'https://picsum.photos/800/800?random=103', filter: { category: 'Roupas' } },
  { name: 'Dunk', image: 'https://picsum.photos/800/800?random=104', filter: { brand: ['Nike'] } },
  { name: 'Lifestyle', image: 'https://picsum.photos/800/800?random=105', filter: { category: 'Life Style' } },
  { name: 'Moletons', image: 'https://picsum.photos/800/800?random=106', filter: { category: 'Life Style' } },
  { name: 'Shorts', image: 'https://picsum.photos/800/800?random=107', filter: { category: 'Roupas' } },
  { name: 'Jaquetas', image: 'https://picsum.photos/800/800?random=108', filter: { category: 'Life Style' } },
  { name: 'Bolas', image: 'https://picsum.photos/800/800?random=115', filter: { category: 'Artigos Esportivos' } },
  { name: 'Equipamentos', image: 'https://picsum.photos/800/800?random=116', filter: { category: 'Artigos Esportivos' } },
];

const Spotlight: React.FC<SpotlightProps> = ({ onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-[#121212]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow">
          Super Ofertas
        </h2>
        <p className="mt-2 md:mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Aproveite nossos descontos incríveis em produtos selecionados. Corra, é por tempo limitado!
        </p>
        
        <div className="mt-8 md:mt-12 relative">
          <div 
            ref={scrollContainerRef}
            className="flex items-start space-x-4 md:space-x-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          >
            {spotlightItems.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate('shop', undefined, item.filter)}
                className="flex-shrink-0 w-60 md:w-80 text-center group"
              >
                <div className="relative overflow-hidden rounded-lg w-full h-60 md:h-80 bg-gray-100 dark:bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="mt-4 block text-lg font-bold text-black dark:text-white uppercase tracking-wide group-hover:text-brand-yellow transition-colors">{item.name}</span>
              </button>
            ))}
          </div>
           <button 
            onClick={() => scroll('left')}
            className="absolute top-1/2 -translate-y-1/2 mt-[-2rem] left-1 md:-left-4 p-3 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white transition-colors z-10"
            aria-label="Rolar para a esquerda"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute top-1/2 -translate-y-1/2 mt-[-2rem] right-1 md:-right-4 p-3 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white transition-colors z-10"
            aria-label="Rolar para a direita"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;