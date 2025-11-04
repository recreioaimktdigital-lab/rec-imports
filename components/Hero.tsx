
import React, { useState, useEffect } from 'react';
import { PlayIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';
// FIX: Corrected import path for Product type.
import { Product } from '../data/products';

interface HeroProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
}

interface Phrase {
  text: string;
  style?: 'gradient';
  size?: 'large';
}

interface Slide {
  type: 'video' | 'image';
  source: string;
  phrases: Phrase[];
  buttonText: string;
  productId: number;
}

const slidesData: Slide[] = [
  {
    type: 'video',
    source: 'https://videos.pexels.com/video-files/4777562/4777562-hd_1920_1080_25fps.mp4',
    phrases: [
      { text: 'Domine as Quadras' },
      { text: 'Domine as Pistas' },
      { text: 'Faça Valer a Pena' },
    ],
    buttonText: 'Equipamentos de Basquete',
    productId: 2,
  },
  {
    type: 'image',
    source: 'https://picsum.photos/1920/1080?random=1',
    phrases: [
      { text: 'Seja a sua melhor versão' },
      { text: 'SAIA NA FRENTE' },
      { text: 'O FUTURO É AGORA!' },
    ],
    buttonText: 'Ver Coleção de Corrida',
    productId: 3,
  },
  {
    type: 'image',
    source: 'https://picsum.photos/1920/1080?random=30',
    phrases: [
      { text: 'Esporte é vida' },
      { text: 'O Melhor Estilo' },
      { text: 'A Melhor Performance' },
    ],
    buttonText: 'Comprar Tênis',
    productId: 1,
  },
  {
    type: 'image',
    source: 'https://picsum.photos/1920/1080?random=40',
    phrases: [
      { text: 'BRASILIAN STORM', style: 'gradient', size: 'large' },
    ],
    buttonText: 'Ver Estilo Urbano',
    productId: 8,
  }
];


const Hero: React.FC<HeroProps> = ({ products, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedText, setDisplayedText] = useState<Phrase>({ text: "RECREIO IMPORTS" });
  const [textOpacity, setTextOpacity] = useState(1);
  const [isBrandText, setIsBrandText] = useState(true);

  const handleButtonClick = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      onNavigate('productDetail', product);
    }
  };

  useEffect(() => {
    const slideDurations = [14000, 14000, 14000, 8000]; // Durations for each slide
    let timer: ReturnType<typeof setTimeout>;

    const next = () => {
      const newIndex = (currentSlide + 1) % slidesData.length;
      setCurrentSlide(newIndex);
      timer = setTimeout(next, slideDurations[newIndex]);
    };

    timer = setTimeout(next, slideDurations[currentSlide]);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const phrases = slidesData[currentSlide].phrases;
    const phraseFadeTime = 500;
    const phraseVisibleTime = 2500;
    const intervalTime = phraseFadeTime + phraseVisibleTime;

    const runAnimation = () => {
      // 1. Start with brand name
      setIsBrandText(true);
      setDisplayedText({ text: "RECREIO IMPORTS" });
      setTextOpacity(1);

      // 2. Fade out brand name
      timeouts.push(setTimeout(() => {
        setTextOpacity(0);
      }, phraseVisibleTime));

      // 3. Loop through phrases
      let accumulatedDelay = intervalTime;
      phrases.forEach((phrase) => {
        const startTime = accumulatedDelay;
        
        timeouts.push(setTimeout(() => {
          setIsBrandText(false);
          setDisplayedText(phrase);
          setTextOpacity(1);
        }, startTime));

        timeouts.push(setTimeout(() => {
          setTextOpacity(0);
        }, startTime + phraseVisibleTime));

        accumulatedDelay += intervalTime;
      });
    };

    runAnimation();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [currentSlide]);

  const changeSlide = (newIndex: number) => {
    if (newIndex === currentSlide) return;
    setCurrentSlide(newIndex);
  };
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };
  
  const activeSlide = slidesData[currentSlide];

  return (
    <div className="relative h-[70vh] md:h-screen bg-black text-white overflow-hidden">
      {slidesData.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          {slide.type === 'video' ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              src={slide.source}
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${slide.source}')` }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      ))}
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="flex items-center justify-center min-h-[120px] md:min-h-[200px] w-full">
            <div 
                className={`transition-opacity duration-500 ease-in-out text-center`}
                style={{ opacity: textOpacity }}
            >
                {isBrandText ? (
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-display uppercase tracking-wider text-brand-yellow">
                        {displayedText.text}
                    </h1>
                ) : (
                    <h2 className={`font-semibold uppercase tracking-wide ${
                      displayedText.size === 'large'
                        ? 'text-5xl md:text-8xl lg:text-9xl'
                        : 'text-4xl md:text-6xl'
                    } ${
                      displayedText.style === 'gradient'
                        ? 'bg-gradient-to-b from-brand-yellow to-green-600 bg-clip-text text-transparent font-display'
                        : 'text-white'
                    }`}>
                        {displayedText.text}
                    </h2>
                )}
            </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => handleButtonClick(activeSlide.productId)}
            className="bg-white dark:bg-black text-black dark:text-white font-semibold py-3 px-8 rounded-full border-2 border-transparent hover:bg-brand-yellow hover:text-black transition-colors duration-300"
          >
            {activeSlide.buttonText}
          </button>
          <button className="bg-black/50 text-white font-semibold py-3 px-8 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors duration-300 flex items-center space-x-2">
            <PlayIcon className="w-6 h-6" />
            <span>Assistir</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-4">
        <button onClick={prevSlide} className="p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors text-white" aria-label="Slide Anterior">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          {slidesData.map((_, index) => (
            <button key={index} onClick={() => changeSlide(index)} className={`block w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'}`} aria-label={`Ir para o slide ${index + 1}`}></button>
          ))}
        </div>
        <button onClick={nextSlide} className="p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors text-white" aria-label="Próximo Slide">
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Hero;