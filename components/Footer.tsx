import React from 'react';
import { LogoIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from './Icons';
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
    <footer className="bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          
          <div className="col-span-2 md:col-span-4 lg:col-span-3 mb-8 md:mb-0">
             <button onClick={() => onNavigate('home')} className="flex-shrink-0">
               <LogoIcon className="h-12 w-auto text-black dark:text-white" />
            </button>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">A melhor seleção de artigos esportivos e lifestyle.</p>
            <div className="flex space-x-4 mt-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <TikTokIcon className="w-6 h-6" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <YouTubeIcon className="w-6 h-6" />
                </a>
            </div>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-bold text-black dark:text-white uppercase text-sm tracking-wider">{title}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <button 
                        onClick={() => {
                          if (link.page) onNavigate(link.page);
                          else if (link.filter) onNavigate('shop', undefined, link.filter);
                        }} 
                        disabled={link.disabled}
                        className="text-left text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col-reverse md:flex-row justify-between items-center text-sm gap-4">
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                <button onClick={() => onNavigate('leadCapture')} className="hover:text-black dark:hover:text-white transition-colors">Receba Ofertas</button>
                <button onClick={() => onNavigate('help')} className="hover:text-black dark:hover:text-white transition-colors">Ajuda</button>
                <button onClick={() => onNavigate('login')} className="hover:text-black dark:hover:text-white transition-colors">Entrar</button>
            </div>
            <p className="text-gray-400 dark:text-gray-500">&copy; {new Date().getFullYear()} Recreio Imports. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;