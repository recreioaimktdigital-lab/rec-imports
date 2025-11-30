
import React, { useState, useEffect } from 'react';
import { LogoIcon, SearchIcon, MoonIcon, SunIcon, HeartIcon, BagIcon, ArrowLeftIcon, MenuIcon, CloseIcon } from './Icons';
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

const Header: React.FC<HeaderProps> = ({ products, currentPage, onNavigate, theme, onToggleTheme, cartCount, wishlistCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const lowerCaseTerm = normalizeText(searchTerm);
    const results = products.filter(p =>
      normalizeText(p.name).includes(lowerCaseTerm) ||
      normalizeText(p.brand).includes(lowerCaseTerm) ||
      normalizeText(p.category).includes(lowerCaseTerm)
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchTerm, products]);

  // Bloquear rolagem quando o menu mobile estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleResultClick = (product: Product) => {
    setSearchTerm('');
    setSearchResults([]);
    onNavigate('productDetail', product);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('shop', undefined, { query: searchTerm });
      setSearchTerm('');
      setIsSearchFocused(false);
    }
  };
  
  const handleSearchBlur = () => {
    setTimeout(() => {
        setIsSearchFocused(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const CartButton: React.FC = () => (
    <button onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }} className="relative text-gray-300 hover:text-brand-yellow transition-colors flex-shrink-0">
      <BagIcon className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
          {cartCount}
        </span>
      )}
    </button>
  );

  const WishlistButton: React.FC = () => (
    <button onClick={() => { onNavigate('wishlist'); setIsMobileMenuOpen(false); }} className="relative text-gray-300 hover:text-brand-yellow transition-colors flex-shrink-0">
      <HeartIcon className="w-6 h-6" />
       {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
          {wishlistCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      <header className="bg-gray-800 dark:bg-[#121212]/90 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-700 dark:border-gray-800 transition-colors duration-300 h-16 md:h-24">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Mobile Header Layout */}
            <div className="flex md:hidden items-center justify-between w-full gap-2">
               <div className="flex items-center gap-2 flex-1 min-w-0 z-20">
                  {currentPage !== 'home' && !isMobileMenuOpen && (
                    <button onClick={() => onNavigate('home')} className="p-1 rounded-full hover:bg-white/10 dark:hover:bg-gray-800 flex-shrink-0" aria-label="Voltar">
                        <ArrowLeftIcon className="w-5 h-5 text-white" />
                    </button>
                  )}
                  {/* Mobile Logo: h-6 */}
                  <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="flex-shrink-0 hover:scale-105 transition-transform">
                    <LogoIcon className="h-6 w-auto" />
                  </button>
               </div>
              <div className="flex items-center space-x-3 flex-shrink-0 z-20">
                {!isMobileMenuOpen && (
                  <>
                    <button onClick={() => { onNavigate('wishlist'); setIsMobileMenuOpen(false); }} className="relative text-white hover:text-brand-yellow transition-colors flex-shrink-0">
                      <HeartIcon className="w-6 h-6" />
                       {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                    <button onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }} className="relative text-white hover:text-brand-yellow transition-colors flex-shrink-0">
                      <BagIcon className="w-6 h-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
                          {cartCount}
                        </span>
                      )}
                    </button>
                  </>
                )}
                <button 
                  onClick={toggleMobileMenu} 
                  className="p-1 text-white hover:text-brand-yellow transition-colors" 
                  aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                >
                  {isMobileMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                </button>
              </div>
            </div>

            {/* Tablet & Desktop Header Layout */}
            <div className="hidden md:flex items-center justify-between w-full gap-4 lg:gap-8">
              {/* Logo Section - Removed min-w to allow natural sizing */}
              <div className="flex items-center gap-4 flex-shrink-0 pr-4 lg:pr-8 relative z-20">
                {currentPage !== 'home' && (
                  <button onClick={() => onNavigate('home')} className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-gray-800 transition-colors" aria-label="Voltar">
                      <ArrowLeftIcon className="w-6 h-6 text-white" />
                  </button>
                )}
                {/* Desktop Logo: h-6 for mobile standard (hidden here), h-7 for tablet, h-9 for desktop */}
                <button onClick={() => onNavigate('home')} className="hover:scale-105 transition-transform duration-200 block">
                  <LogoIcon className="h-6 md:h-7 lg:h-9 w-auto" />
                </button>
              </div>
              
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative min-w-0 z-10" onBlur={handleSearchBlur}>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-brand-yellow transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full pl-12 pr-4 py-3 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent transition-all shadow-sm"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                </div>
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in z-[100]">
                    <ul>
                      {searchResults.map(product => (
                        <li key={product.id}>
                          <button onClick={() => handleResultClick(product)} className="w-full flex items-center justify-between gap-4 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                <div className="flex flex-col min-w-0 flex-1">
                                    <p className="font-semibold text-sm text-black dark:text-white truncate pr-2">{product.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{product.category}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                                <span className="text-sm font-bold text-brand-yellow whitespace-nowrap block text-right">R$ {product.price.toFixed(2)}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>

              {/* Navigation */}
              <nav className="flex items-center space-x-3 lg:space-x-6 flex-shrink-0 z-20">
                <button 
                    onClick={() => onNavigate('shop')} 
                    className="text-sm lg:text-base font-semibold uppercase tracking-wide text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors whitespace-nowrap drop-shadow-md"
                    style={{ textShadow: '1px 1px 2px rgba(31, 41, 55, 0.8)' }}
                >
                    Loja
                </button>
                <button 
                    onClick={() => onNavigate('help')} 
                    className="text-sm lg:text-base font-semibold uppercase tracking-wide text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors whitespace-nowrap drop-shadow-md"
                    style={{ textShadow: '1px 1px 2px rgba(31, 41, 55, 0.8)' }}
                >
                    Ajuda
                </button>
                <button 
                    onClick={() => onNavigate('login')} 
                    className="text-sm lg:text-base font-semibold uppercase tracking-wide text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors whitespace-nowrap drop-shadow-md"
                    style={{ textShadow: '1px 1px 2px rgba(31, 41, 55, 0.8)' }}
                >
                    Entrar
                </button>
                <div className="h-6 w-px bg-gray-600 dark:bg-gray-700 mx-2"></div>
                <div className="flex items-center space-x-2 lg:space-x-5">
                   <button onClick={onToggleTheme} className="text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors">
                    {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                   </button>
                   <button onClick={() => onNavigate('wishlist')} className="relative text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors">
                      <HeartIcon className="w-6 h-6" />
                       {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
                          {wishlistCount}
                        </span>
                      )}
                    </button>
                    <button onClick={() => onNavigate('cart')} className="relative text-white dark:text-gray-300 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors">
                      <BagIcon className="w-6 h-6" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black animate-fade-in">
                          {cartCount}
                        </span>
                      )}
                    </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu 'Page' - Dedicated View */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-gray-800 dark:bg-[#121212] z-[120] overflow-y-auto animate-fade-in md:hidden flex flex-col">
            <div className="container mx-auto px-6 py-8 flex flex-col h-full">
                
                {/* Search in Menu */}
                <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="relative w-full mb-8">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="O que você procura?"
                        className="w-full bg-white dark:bg-gray-800 text-black dark:text-white pl-12 pr-4 py-4 rounded-xl border border-transparent focus:ring-2 focus:ring-brand-yellow focus:outline-none text-lg shadow-sm"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </form>

                <nav className="flex flex-col space-y-4 flex-grow">
                    <button 
                        onClick={() => { onNavigate('shop'); setIsMobileMenuOpen(false); }} 
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800 transition-colors border-b border-gray-700 dark:border-gray-800"
                    >
                        <span className="text-base font-semibold uppercase text-white">Loja</span>
                        <ArrowLeftIcon className="w-6 h-6 rotate-180 text-gray-300" />
                    </button>
                    
                    <button 
                        onClick={() => { onNavigate('cart'); setIsMobileMenuOpen(false); }} 
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800 transition-colors border-b border-gray-700 dark:border-gray-800"
                    >
                        <span className="text-base font-semibold uppercase text-white flex items-center gap-3">
                            Carrinho 
                            {cartCount > 0 && <span className="bg-brand-yellow text-black text-sm px-2 py-1 rounded-full">{cartCount}</span>}
                        </span>
                        <BagIcon className="w-6 h-6 text-gray-300" />
                    </button>

                    <button 
                        onClick={() => { onNavigate('wishlist'); setIsMobileMenuOpen(false); }} 
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800 transition-colors border-b border-gray-700 dark:border-gray-800"
                    >
                        <span className="text-base font-semibold uppercase text-white flex items-center gap-3">
                            Favoritos
                            {wishlistCount > 0 && <span className="bg-brand-yellow text-black text-sm px-2 py-1 rounded-full">{wishlistCount}</span>}
                        </span>
                        <HeartIcon className="w-6 h-6 text-gray-300" />
                    </button>

                    <button 
                        onClick={() => { onNavigate('help'); setIsMobileMenuOpen(false); }} 
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800 transition-colors border-b border-gray-700 dark:border-gray-800"
                    >
                        <span className="text-base font-semibold uppercase text-white">Ajuda</span>
                    </button>

                    <button 
                        onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} 
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800 transition-colors border-b border-gray-700 dark:border-gray-800"
                    >
                        <span className="text-base font-semibold uppercase text-white">Entrar / Cadastrar</span>
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-700 dark:border-gray-700">
                    <button 
                        onClick={onToggleTheme} 
                        className="flex items-center justify-center gap-3 w-full p-4 rounded-xl bg-white/10 dark:bg-gray-800 text-white text-lg font-medium hover:bg-white/20 dark:hover:bg-gray-700 transition-colors shadow-sm"
                    >
                        <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
                        {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                    </button>
                    <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-6">
                        &copy; 2025 Recreio Imports
                    </p>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Header;
