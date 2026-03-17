
import React, { useState } from 'react';
import { LogoIcon, HeartIcon, BagIcon, MenuIcon, CloseIcon, UserIcon, SunIcon, MoonIcon, TranslateIcon } from './Icons';
import { Product, Filters } from '../data/products';

interface HeaderProps {
  products: Product[];
  currentPage: string;
  onNavigate: (page: string, product?: any, filters?: Partial<Filters>) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  cartCount: number;
  wishlistCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartCount, wishlistCount, theme, onToggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Função para abrir o seletor de idiomas do Google Translate
  const toggleTranslate = () => {
    // Tenta encontrar o seletor simples do Google que injetamos (escondido)
    const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    const googleSimple = document.querySelector('.goog-te-gadget-simple') as HTMLElement;
    
    if (googleSimple) {
      googleSimple.click();
    } else if (googleCombo) {
      // Caso o layout mude, tenta focar no combo
      googleCombo.focus();
      const event = new MouseEvent('mousedown', { bubbles: true });
      googleCombo.dispatchEvent(event);
    } else {
      console.warn('O tradutor ainda está carregando...');
      // Feedback visual simples ou tentativa de re-init se necessário
    }
  };

  return (
    <>
      <header className="bg-brand-naval/95 dark:bg-black/90 border-b border-white/5 sticky top-0 z-[100] w-full transition-all duration-300 backdrop-blur-2xl">
        <div className="container mx-auto px-4 lg:px-12 h-16 md:h-24 flex items-center justify-between">
          
          {/* Logo Section - Bloqueio absoluto de tradução */}
          <div className="flex-shrink-0 notranslate" translate="no">
            <button onClick={() => onNavigate('home')} className="hover:opacity-80 transition-opacity">
              <LogoIcon className="h-auto" />
            </button>
          </div>

          {/* Nav Section - Centralized */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-6 xl:gap-10">
                <button onClick={() => onNavigate('shop', undefined, { category: 'Todos', onSale: false, gender: [] })} className="text-[10px] font-black text-brand-off-white hover:text-brand-yellow uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Lançamentos</button>
                <button onClick={() => onNavigate('shop', undefined, { gender: ['Masculino'], onSale: false, category: 'Todos' })} className="text-[10px] font-black text-brand-off-white hover:text-brand-yellow uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Masculino</button>
                <button onClick={() => onNavigate('shop', undefined, { gender: ['Feminino'], onSale: false, category: 'Todos' })} className="text-[10px] font-black text-brand-off-white hover:text-brand-yellow uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Feminino</button>
                <button onClick={() => onNavigate('shop', undefined, { gender: ['Kids'], onSale: false, category: 'Todos' })} className="text-[10px] font-black text-brand-off-white hover:text-brand-yellow uppercase tracking-[0.2em] transition-colors whitespace-nowrap">Kids</button>
                <button onClick={() => onNavigate('shop', undefined, { onSale: true, category: 'Todos', gender: [] })} className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.2em] hover:opacity-70 transition-opacity whitespace-nowrap">Ofertas</button>
            </div>
          </nav>

          {/* Utility Section */}
          <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
            {/* Botão de Tradução */}
            <button onClick={toggleTranslate} className="p-2 hover:bg-white/10 dark:hover:bg-gray-900 rounded-full transition-colors group text-brand-off-white" aria-label="Traduzir">
              <TranslateIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
            </button>

            <button onClick={onToggleTheme} className="p-2 hover:bg-white/10 dark:hover:bg-gray-900 rounded-full transition-colors group text-brand-off-white" aria-label="Mudar Tema">
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
              ) : (
                <MoonIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
              )}
            </button>

            <button onClick={() => onNavigate('login')} className="p-2 hover:bg-white/10 dark:hover:bg-gray-900 rounded-full transition-colors group text-brand-off-white" aria-label="Login">
              <UserIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
            </button>

            <button onClick={() => onNavigate('wishlist')} className="relative p-2 hover:bg-white/10 dark:hover:bg-gray-900 rounded-full transition-colors group text-brand-off-white" aria-label="Favoritos">
              <HeartIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
              {wishlistCount > 0 && <span className="absolute top-1 right-1 bg-brand-yellow text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-brand-naval dark:border-black">{wishlistCount}</span>}
            </button>

            <button onClick={() => onNavigate('cart')} className="relative p-2 hover:bg-white/10 dark:hover:bg-gray-900 rounded-full transition-colors group text-brand-off-white" aria-label="Carrinho">
              <BagIcon className="w-5 h-5 group-hover:text-brand-yellow transition-colors" />
              {cartCount > 0 && <span className="absolute top-1 right-1 bg-brand-yellow text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-brand-naval dark:border-black">{cartCount}</span>}
            </button>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 ml-2 text-brand-off-white">
              {isMobileMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[120] bg-brand-naval dark:bg-black pt-20 px-8 lg:hidden animate-fade-in overflow-y-auto">
           <nav className="flex flex-col gap-5 text-left pb-20">
              <button onClick={() => { onToggleTheme(); setIsMobileMenuOpen(false); }} className="w-full bg-white/5 dark:bg-gray-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-brand-off-white">
                  {theme === 'dark' ? <><SunIcon className="w-5 h-5" /> Modo Claro</> : <><MoonIcon className="w-5 h-5" /> Modo Escuro</>}
              </button>
              {/* Tradução Mobile */}
              <button onClick={() => { toggleTranslate(); setIsMobileMenuOpen(false); }} className="w-full bg-white/5 dark:bg-gray-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-brand-off-white">
                  <TranslateIcon className="w-5 h-5" /> Traduzir Site
              </button>
              <button onClick={() => { onNavigate('leadCapture'); setIsMobileMenuOpen(false); }} className="w-full bg-brand-yellow text-black py-4 rounded-xl font-black text-lg uppercase italic">CADASTRE-SE VIP</button>
              <button onClick={() => { onNavigate('shop', undefined, { category: 'Todos', onSale: false, gender: [] }); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-2 text-brand-off-white">Lançamentos</button>
              <button onClick={() => { onNavigate('shop', undefined, { gender: ['Masculino'], category: 'Todos' }); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-2 text-brand-off-white">Masculino</button>
              <button onClick={() => { onNavigate('shop', undefined, { gender: ['Feminino'], category: 'Todos' }); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-2 text-brand-off-white">Feminino</button>
              <button onClick={() => { onNavigate('shop', undefined, { gender: ['Kids'], category: 'Todos' }); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase italic tracking-tighter border-b border-white/5 pb-2 text-brand-off-white">Kids</button>
              <button onClick={() => { onNavigate('shop', undefined, { onSale: true, category: 'Todos' }); setIsMobileMenuOpen(false); }} className="text-xl font-black uppercase italic tracking-tighter text-brand-yellow">Ofertas</button>
           </nav>
        </div>
      )}
    </>
  );
};

export default Header;
