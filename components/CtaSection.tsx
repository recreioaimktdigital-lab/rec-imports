import React from 'react';

interface CtaSectionProps {
  onNavigate: () => void;
}

const CtaSection: React.FC<CtaSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-brand-yellow text-black">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-display uppercase">
              SEJA VIP, RECEBA OFERTAS EXCLUSIVAS
            </h2>
            <p className="mt-2 text-lg">
              Cadastre-se e seja o primeiro a saber sobre nossos lançamentos e promoções especiais.
            </p>
          </div>
          <button
            onClick={onNavigate}
            className="mt-6 md:mt-0 bg-black text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-300 flex-shrink-0"
          >
            QUERO MEUS DESCONTOS
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
