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

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const lowerCaseTerm = searchTerm.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(lowerCaseTerm) ||
      p.brand.toLowerCase().includes(lowerCaseTerm) ||
      p.category.toLowerCase().includes(lowerCaseTerm)
    ).slice(0, 5);
    setSearchResults(results);
  }, [searchTerm, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleResultClick = (product: Product) => {
    setSearchTerm('');
    setSearchResults([]);
    onNavigate('productDetail', product);
  };
  
  const handleSearchBlur = () => {
    setTimeout(() => {
        setIsSearchFocused(false);
    }, 200);
  };

  const CartButton: React.FC = () => (
    <button onClick={() => onNavigate('cart')} className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
      <BagIcon className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black">
          {cartCount}
        </span>
      )}
    </button>
  );

  const WishlistButton: React.FC = () => (
    <button onClick={() => onNavigate('wishlist')} className="relative text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
      <HeartIcon className="w-6 h-6" />
       {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black">
          {wishlistCount}
        </span>
      )}
    </button>
  );

  return (
    <header className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-sm sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between w-full">
             <div className="flex items-center">
                {currentPage !== 'home' && (
                  <button onClick={() => onNavigate('home')} className="mr-2 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Voltar para a página inicial">
                      <ArrowLeftIcon className="w-6 h-6" />
                  </button>
                )}
                <button onClick={() => onNavigate('home')} className="flex-shrink-0">
                  <LogoIcon className="h-8 w-auto text-black dark:text-white" />
                </button>
             </div>
            <div className="flex items-center space-x-2">
              <WishlistButton />
              <CartButton />
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white" aria-label="Abrir menu">
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center">
              {currentPage !== 'home' && (
                <button onClick={() => onNavigate('home')} className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Voltar para a página inicial">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
              )}
              <button onClick={() => onNavigate('home')} className="flex-shrink-0">
                <LogoIcon className="h-10 w-auto text-black dark:text-white" />
              </button>
            </div>
            <div className="flex-1 max-w-sm ml-8 relative" onBlur={handleSearchBlur}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full pl-10 pr-3 py-2 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                />
              </div>
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <ul>
                    {searchResults.map(product => (
                      <li key={product.id}>
                        <button onClick={() => handleResultClick(product)} className="w-full flex items-center gap-4 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-black dark:text-white">{product.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">R$ {product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <nav className="flex items-center space-x-6">
              <button onClick={() => onNavigate('shop')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Loja</button>
              <button onClick={() => onNavigate('help')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Ajuda</button>
              <button onClick={() => onNavigate('login')} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">Entrar</button>
              <div className="flex items-center space-x-4">
                 <button onClick={onToggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                 </button>
                 <WishlistButton />
                 <CartButton />
              </div>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white dark:bg-[#181818] shadow-lg p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
                <LogoIcon className="h-8 w-auto text-black dark:text-white" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2" aria-label="Fechar menu">
                    <CloseIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className="flex flex-col space-y-4">
                <button onClick={() => { onNavigate('shop'); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-left">Loja</button>
                <button onClick={() => { onNavigate('help'); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-left">Ajuda</button>
                <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-left">Entrar</button>
                 <button onClick={onToggleTheme} className="flex items-center justify-between text-lg font-medium text-left pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span>Mudar Tema</span>
                    {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                 </button>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
