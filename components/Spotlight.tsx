
import React, { useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { Product, Filters } from '../data/products';

interface SpotlightProps {
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
}

const spotlightItems = [
  { name: 'Moda Masculina', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { gender: ['Masculino'] } },
  { name: 'Moda Feminina', image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { gender: ['Feminino'] } },
  { name: 'Para Crianças', image: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { gender: ['Kids'] } },
  { name: 'Nike Exclusivo', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { brand: ['Nike'] } },
  { name: 'Adidas Originals', image: 'https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { brand: ['Adidas'] } },
  { name: 'Converse Classics', image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800', filter: { brand: ['Converse'] } },
  { name: 'Puma Performance', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80', filter: { brand: ['Puma'] } },
  { name: 'Destaques New Balance', image: 'https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { brand: ['New Balance'] } },
  { name: 'Confira Asics', image: 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { brand: ['Asics'] } },
  { name: 'Equipamentos de Corrida', image: 'https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Corrida'] } },
  { name: 'Estilo Casual', image: 'https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Casual'] } },
  { name: 'Visual Urbano', image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Urbano'] } },
  { name: 'Tudo para Basquete', image: 'https://images.pexels.com/photos/866023/pexels-photo-866023.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Basquete'] } },
  { name: 'Foco na Academia', image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Academia'] } },
  { name: 'Alta Performance', image: 'https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { style: ['Performance'] } },
  { name: 'Tênis em Destaque', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Tênis' } },
  { name: 'Life Style', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Life Style' } },
  { name: 'Moda Praia', image: 'https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Moda Praia' } },
  { name: 'Acessórios Essenciais', image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Artigos Esportivos' } },
  { name: 'Suplementos', image: 'https://images.pexels.com/photos/4165239/pexels-photo-4165239.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Suplementos' } },
  { name: 'Fisio e Ortopédicos', image: 'https://images.pexels.com/photos/4045558/pexels-photo-4045558.jpeg?auto=compress&cs=tinysrgb&w=800', filter: { category: 'Fisio e Ortopédicos' } },
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
    <section className="py-12 md:py-20 bg-gray-200 dark:bg-[#121212]">
      <div className="container mx-auto px-4 text-center">
        <h2 
          className="text-4xl md:text-6xl font-display uppercase text-brand-yellow"
          style={{ textShadow: '3px 3px 2px #1F2937' }}
        >
          Super Ofertas
        </h2>
        <p className="mt-2 md:mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
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
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} />
                </div>
                <span className="mt-4 block text-base font-bold text-black dark:text-white uppercase tracking-wide group-hover:text-brand-yellow transition-colors">{item.name}</span>
              </button>
            ))}
          </div>
           <button 
            onClick={() => scroll('left')}
            className="absolute top-1/2 -translate-y-1/2 mt-[-2rem] left-1 md:-left-4 p-3 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white transition-colors z-10 hidden sm:block"
            aria-label="Rolar para a esquerda"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute top-1/2 -translate-y-1/2 mt-[-2rem] right-1 md:-right-4 p-3 rounded-full bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white transition-colors z-10 hidden sm:block"
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
