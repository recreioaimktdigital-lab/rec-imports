
import React from 'react';
import { LogoIcon, TikTokIcon, WhatsAppIcon } from './Icons';
import { Filters } from '../data/products';
import MusicPlayer from './MusicPlayer';

interface FooterProps {
  onNavigate: (page: string, product?: any, filters?: Partial<Filters>) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-brand-naval dark:bg-black text-brand-off-white/80 pt-20 pb-6 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Row 1: Logo */}
        <div className="flex justify-between items-center mb-16">
          <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity duration-300">
            <LogoIcon className="h-auto" />
          </button>
        </div>

        {/* Row 2: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="font-display font-medium uppercase text-lg mb-6 tracking-widest text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1 text-left">Loja</h4>
            <ul className="space-y-4 text-sm font-display font-medium uppercase tracking-widest text-gray-400">
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Todos' })} className="hover:text-brand-yellow transition-colors text-left">Todos os Itens</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Tênis' })} className="hover:text-brand-yellow transition-colors text-left">Tênis & Sneakers</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Moda Praia' })} className="hover:text-brand-yellow transition-colors text-left">Moda Praia</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Life Style' })} className="hover:text-brand-yellow transition-colors text-left">Life Style</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Artigos Esportivos' })} className="hover:text-brand-yellow transition-colors text-left">Artigos Esportivos</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Suplementos' })} className="hover:text-brand-yellow transition-colors text-left">Suplementos</button></li>
              <li><button onClick={() => onNavigate('shop', undefined, { category: 'Fisio e Ortopédico' })} className="hover:text-brand-yellow transition-colors text-left">Fisio e Ortopédico</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-medium uppercase text-lg mb-6 tracking-widest text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1 text-left">Suporte</h4>
            <ul className="space-y-4 text-sm font-display font-medium uppercase tracking-widest text-gray-400">
              <li><button onClick={() => onNavigate('help')} className="hover:text-brand-yellow transition-colors text-left">Central de Ajuda</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-brand-yellow transition-colors text-left">Prazos de Entrega</button></li>
              <li><button onClick={() => onNavigate('help')} className="hover:text-brand-yellow transition-colors text-left">Trocas e Devoluções</button></li>
              <li><button onClick={() => onNavigate('login')} className="hover:text-brand-yellow transition-colors text-left">Minha Conta</button></li>
            </ul>
          </div>
          <div className="col-span-2 text-left">
            <h4 className="font-display font-medium uppercase text-lg mb-6 tracking-widest text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1">Recreio Imports</h4>
            <p className="text-sm font-display font-normal text-gray-400 max-w-sm leading-relaxed tracking-wide">
              A Recreio Imports é o seu destino premium para performance e estilo. Curadoria exclusiva das melhores marcas globais: Nike, Adidas, Puma, New Balance, Vans, Converse, Rip Curl, Quiksilver e Asics.
            </p>
          </div>
        </div>

        {/* Row 3: Social & Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10 relative z-20">
            {/* Social Left */}
            <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/oficialrecreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:scale-105 transition-all border border-white/10"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.tiktok.com/@oficial.recreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all border border-white/10"
                >
                    <TikTokIcon className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@oficial.recreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-105 transition-all border border-white/10"
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube" className="w-6 h-6" />
                </a>
            </div>

            {/* Action Buttons Right */}
            <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/5521985516518" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-md border border-white/20"
                >
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                </a>
                <div className="w-12 h-12 flex items-center justify-center">
                   <MusicPlayer />
                </div>
            </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-white/5 mb-8"></div>

        {/* Row 4: Final Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm uppercase font-display font-medium tracking-widest text-gray-500">
              &copy; {new Date().getFullYear()} Recreio Imports. Desenvolvido para Performance.
            </p>
            <div className="flex gap-8 items-center">
                <button onClick={() => onNavigate('leadCapture')} className="text-[10px] font-display font-medium uppercase tracking-widest hover:text-brand-yellow text-gray-500 transition-all">VIP Club</button>
                <button className="text-[10px] font-display font-medium uppercase tracking-widest text-gray-500 transition-all">Política de Privacidade</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
