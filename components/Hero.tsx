import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import { Product, Filters } from '../data/products';

interface HeroProps {
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
}

const slidesData = [
  // Image 1
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'ESTILO QUE IMPULSIONA',
    subtitle: 'Tênis que combinam design e tecnologia para o seu dia a dia.',
    buttonText: 'Ver Tênis',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { category: 'Tênis' }),
  },
  // Image 2
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'CONFORTO EM MOVIMENTO',
    subtitle: 'Roupas leves e respiráveis para você superar qualquer desafio.',
    buttonText: 'Explorar Roupas',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { category: 'Roupas' }),
  },
  // Image 3
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/866023/pexels-photo-866023.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'EQUIPAMENTOS DE PONTA',
    subtitle: 'Tudo o que você precisa para elevar o seu treino a um novo nível.',
    buttonText: 'Comprar Acessórios',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { category: 'Artigos Esportivos' }),
  },
  // Image 4
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'DESIGN INOVADOR',
    subtitle: 'Explore os últimos lançamentos que definem tendências.',
    buttonText: 'Ver Novidades',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop'),
  },
  // Image 5
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'ATITUDE URBANA',
    subtitle: 'Peças que marcam presença no asfalto e na vida.',
    buttonText: 'Estilo Urbano',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { style: ['Urbano'] }),
  },
  // Image 6
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'PRONTO PARA TUDO',
    subtitle: 'Acessórios que completam seu visual e sua performance.',
    buttonText: 'Ver Acessórios',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { category: 'Artigos Esportivos' }),
  },
  // Image 7 (New)
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'ENERGIA FEMININA',
    subtitle: 'Coleções criadas para a força e o estilo da mulher moderna.',
    buttonText: 'Moda Feminina',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { gender: ['Feminino'] }),
  },
  // Image 8 (New)
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'PERFORMANCE MÁXIMA',
    subtitle: 'Tecnologia e design para você alcançar seus objetivos.',
    buttonText: 'Linha Performance',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { style: ['Performance'] }),
  },
  // Image 9 (New)
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'CLÁSSICOS ATEMPORAIS',
    subtitle: 'Descubra os ícones que nunca saem de moda.',
    buttonText: 'Ver Clássicos',
    onButtonClick: (navigate: HeroProps['onNavigate']) => navigate('shop', undefined, { style: ['Casual'] }),
  },
];


const SLIDE_DURATION = 6000; // 6 seconds for image slides

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(goToNext, SLIDE_DURATION);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <div
      className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-black text-white overflow-hidden"
    >
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-wider text-white">
          {slidesData[currentSlide].title}
        </h1>
        <p className="mt-2 text-lg font-semibold text-gray-200 max-w-2xl">
          {slidesData[currentSlide].subtitle}
        </p>
        <button
          onClick={() => slidesData[currentSlide].onButtonClick(onNavigate)}
          className="mt-6 bg-brand-yellow text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors duration-300"
        >
          {slidesData[currentSlide].buttonText}
        </button>
      </div>
      
      {/* Navigation Controls */}
      <div className="absolute z-20 bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4 flex justify-between items-center">
        <button onClick={goToPrev} className="p-3 rounded-full bg-black/30 hover:bg-black/60 transition-colors">
            <ArrowLeftIcon className="w-6 h-6"/>
        </button>
        {/* Progress Bars */}
        <div className="hidden md:flex items-center gap-2">
            {slidesData.map((_, index) => {
                const isCurrent = index === currentSlide;
                const isPast = index < currentSlide;
                
                return (
                    <div key={`${index}-${currentSlide}`} className="w-20 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-white rounded-full 
                                ${isPast ? 'w-full' : 'w-0'}
                                ${isCurrent ? 'animate-fill-up' : ''}
                            `}
                        ></div>
                    </div>
                );
            })}
        </div>
        <button onClick={goToNext} className="p-3 rounded-full bg-black/30 hover:bg-black/60 transition-colors">
            <ArrowRightIcon className="w-6 h-6"/>
        </button>
      </div>
    </div>
  );
};

export default Hero;