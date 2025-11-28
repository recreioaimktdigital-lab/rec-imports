
import React from 'react';
import { LogoIcon, TikTokIcon } from './Icons';
import { Filters } from '../data/products';

interface FooterProps {
  onNavigate: (page: string, product?: any, filters?: Partial<Filters>) => void;
}

const footerLinks = {
  'Destaques': [
    { name: 'Tênis', filter: { category: 'Tênis' } },
    { name: 'Roupas', filter: { category: 'Roupas' } },
    { name: 'Basquete', filter: { style: ['Basquete'] } },
    { name: 'Corrida', filter: { style: ['Corrida'] } },
  ],
  'Saúde': [
    { name: 'Suplementos', filter: { category: 'Suplementos' } },
    { name: 'Fisio e Ortopédico', filter: { category: 'Fisio e Ortopédico' } },
  ],
  'Suporte': [
    { name: 'Ajuda', page: 'help' },
    { name: 'Status do Pedido', disabled: true },
    { name: 'Entregas', disabled: true },
    { name: 'Devoluções', disabled: true },
  ],
};

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 dark:bg-black text-gray-300 dark:text-gray-300 pt-16 pb-8 border-t border-gray-700 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
             <button onClick={() => onNavigate('home')} className="flex-shrink-0 hover:scale-105 transition-transform duration-300 origin-left">
               {/* Updated Height: h-6 for mobile, h-7 for tablet, h-9 desktop */}
               <LogoIcon className="h-6 md:h-7 lg:h-9 w-auto text-white" />
            </button>
            <p className="text-base text-gray-400 dark:text-gray-400 max-w-sm leading-relaxed">
              A melhor seleção de artigos esportivos e lifestyle para você superar seus limites. Qualidade, estilo e performance em um só lugar.
            </p>
            
            <div className="flex items-center gap-6">
                <a 
                  href="https://www.instagram.com/oficialrecreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:scale-110 transition-transform duration-300 group"
                  aria-label="Instagram"
                >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                      alt="Instagram" 
                      className="w-10 h-10 drop-shadow-md group-hover:drop-shadow-xl"
                    />
                </a>
                <a 
                  href="https://www.tiktok.com/@oficial.recreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:scale-110 transition-transform duration-300 group"
                  aria-label="TikTok"
                >
                   {/* Black and White TikTok Button */}
                   <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl border border-gray-800">
                     <TikTokIcon className="w-6 h-6 text-white" />
                   </div>
                </a>
                <a 
                  href="https://www.youtube.com/@oficial.recreioimports" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:scale-110 transition-transform duration-300 group"
                  aria-label="YouTube"
                >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                      alt="YouTube" 
                      className="w-10 h-10 drop-shadow-md group-hover:drop-shadow-xl"
                    />
                </a>
            </div>
          </div>
          
          {/* Links Section */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col">
                <h4 className="font-bold text-white dark:text-white uppercase text-xl tracking-wider mb-6 pb-2 inline-block w-fit">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <button 
                        onClick={() => {
                          if (link.page) onNavigate(link.page);
                          else if (link.filter) onNavigate('shop', undefined, link.filter);
                        }} 
                        disabled={link.disabled}
                        className="text-left text-base text-gray-400 dark:text-gray-400 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:translate-x-1 duration-200"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-700 dark:border-gray-800 flex flex-col-reverse md:flex-row justify-between items-center text-base gap-6">
            <p className="text-gray-500 dark:text-gray-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} Recreio Imports. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-8 text-gray-400 dark:text-gray-400 font-medium">
                <button onClick={() => onNavigate('leadCapture')} className="hover:text-white dark:hover:text-white transition-colors">Receba Ofertas</button>
                <button onClick={() => onNavigate('help')} className="hover:text-white dark:hover:text-white transition-colors">Ajuda</button>
                <button onClick={() => onNavigate('login')} className="hover:text-white dark:hover:text-white transition-colors">Entrar</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
