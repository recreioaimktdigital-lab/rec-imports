
import React, { useState, useMemo } from 'react';
import { Product, Filters } from '../data/products';
import { HeartIcon, HeartIconSolid, PlusIcon, MinusIcon, StarIcon } from './Icons';

interface ShopProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const normalizeText = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const StarRatingDisplay: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
    <div className="flex flex-col items-end justify-start gap-0.5">
        <div className="flex items-center justify-end">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-3 h-3 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
        </div>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium text-right leading-none whitespace-nowrap">
            ({reviewCount > 0 ? reviewCount : Math.floor(Math.random() * 20) + 1} avaliações)
        </span>
    </div>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4"
            >
                <h3 className="text-xl font-bold uppercase text-gray-900 dark:text-white">{title}</h3>
                {isOpen ? <MinusIcon className="w-5 h-5 text-gray-500" /> : <PlusIcon className="w-5 h-5 text-gray-500" />}
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Shop: React.FC<ShopProps> = ({ products, onNavigate, wishlistItems, onToggleWishlist, filters, onFiltersChange }) => {
  const [sortOrder, setSortOrder] = useState('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const filterOptions = useMemo(() => {
    const allCategories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
    const brands = [...Array.from(new Set(products.map(p => p.brand)))];
    const genders = ['Masculino', 'Feminino', 'Kids'];
    const styles = ['Corrida', 'Casual', 'Performance', 'Academia', 'Basquete', 'Ortopédico', 'Urbano'];
    
    return { categories: allCategories, brands, genders, styles };
  }, [products]);

  const sortedAndFilteredProducts = useMemo(() => {
    const filtered = products.filter(p => {
        const categoryMatch = filters.category === 'Todos' || p.category === filters.category;
        const brandMatch = filters.brand.length === 0 || filters.brand.includes(p.brand);
        const genderMatch = filters.gender.length === 0 || filters.gender.includes(p.gender);
        const styleMatch = filters.style.length === 0 || filters.style.includes(p.style);
        
        let queryMatch = true;
        if (filters.query) {
             const normalizedQuery = normalizeText(filters.query);
             const pName = normalizeText(p.name);
             const pBrand = normalizeText(p.brand);
             const pCategory = normalizeText(p.category);
             const pDesc = normalizeText(p.desc);
             const pStyle = normalizeText(p.style);
             const pLongDesc = normalizeText(p.longDescription || '');

             const isClothingQuery = normalizedQuery === 'roupas' || normalizedQuery === 'roupa';
             const clothingCategories = ['roupas', 'moda praia', 'life style'];
             
             const matchesText = pName.includes(normalizedQuery) ||
                pBrand.includes(normalizedQuery) ||
                pCategory.includes(normalizedQuery) ||
                pDesc.includes(normalizedQuery) ||
                pStyle.includes(normalizedQuery) ||
                pLongDesc.includes(normalizedQuery);

             if (isClothingQuery) {
                 if (clothingCategories.includes(pCategory) || matchesText) {
                     queryMatch = true;
                 } else {
                     queryMatch = false;
                 }
             } else {
                 queryMatch = matchesText;
             }
        }

        return categoryMatch && brandMatch && genderMatch && styleMatch && queryMatch;
    });

    const sortable = [...filtered];

    switch (sortOrder) {
        case 'price-asc':
            return sortable.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortable.sort((a, b) => b.price - a.price);
        case 'rating-desc':
            return sortable.sort((a, b) => b.rating - a.rating);
        case 'newest-desc':
            return sortable.sort((a, b) => b.id - a.id);
        case 'featured':
        default:
            return filtered;
    }
  }, [products, filters, sortOrder]);
  
  const handleFilterChange = (filterType: keyof Omit<Filters, 'query'>, value: string) => {
    let newFilters: Filters;
    if (filterType === 'category') {
         newFilters = {
            ...filters,
            category: value,
        };
    } else {
        const currentValues = filters[filterType] as string[];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        newFilters = { ...filters, [filterType]: newValues };
    }
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: Filters = {
        category: 'Todos',
        brand: [],
        gender: [],
        style: [],
        query: '',
    };
    onFiltersChange(clearedFilters);
  };

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const CheckboxFilter: React.FC<{ label: string; isChecked: boolean; onChange: () => void; }> = ({ label, isChecked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input type="checkbox" checked={isChecked} onChange={onChange} className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-brand-yellow focus:ring-brand-yellow cursor-pointer" />
        <span className={`text-lg transition-colors ${isChecked ? 'text-black dark:text-white font-bold' : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>{label}</span>
    </label>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-20 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden col-span-1">
            <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-bold py-3 px-4 rounded-lg flex justify-between items-center border border-gray-200 dark:border-gray-700 shadow-sm"
            >
                <span className="text-lg">{showFiltersMobile ? 'Ocultar Filtros' : 'Filtrar Produtos'}</span>
                {showFiltersMobile ? <MinusIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
            </button>
        </div>

        {/* Sidebar */}
        <aside className={`${showFiltersMobile ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
          <div className="sticky top-24 bg-gray-50 dark:bg-[#181818] p-4 rounded-lg border border-gray-200 dark:border-gray-800">
             <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-xl font-bold uppercase text-black dark:text-white">Filtros</h2>
                <button 
                    onClick={clearFilters}
                    className="text-lg text-brand-yellow hover:underline font-medium"
                >
                    Limpar tudo
                </button>
            </div>
            <div className="space-y-2">
                <AccordionItem title="Categorias">
                <ul className="space-y-2">
                    {filterOptions.categories.map(category => (
                    <li key={category}>
                        <button onClick={() => handleFilterChange('category', category)} className={`w-full text-left px-3 py-2 rounded-md text-lg transition-colors ${filters.category === category ? 'font-bold text-black bg-brand-yellow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                        {category}
                        </button>
                    </li>
                    ))}
                </ul>
                </AccordionItem>
                <AccordionItem title="Marcas">
                    <div className="space-y-2">
                        {filterOptions.brands.map(brand => (
                            <CheckboxFilter 
                                key={brand}
                                label={brand}
                                isChecked={filters.brand.includes(brand)}
                                onChange={() => handleFilterChange('brand', brand)}
                            />
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem title="Gênero">
                    <div className="space-y-2">
                        {filterOptions.genders.map(gender => (
                        <CheckboxFilter 
                                key={gender}
                                label={gender}
                                isChecked={filters.gender.includes(gender)}
                                onChange={() => handleFilterChange('gender', gender)}
                            />
                        ))}
                    </div>
                </AccordionItem>
                <AccordionItem title="Estilo">
                    <div className="space-y-2">
                        {filterOptions.styles.map(style => (
                            <CheckboxFilter 
                                key={style}
                                label={style}
                                isChecked={filters.style.includes(style)}
                                onChange={() => handleFilterChange('style', style)}
                            />
                        ))}
                    </div>
                </AccordionItem>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
             <div className="order-2 sm:order-1">
                <p className="text-xl font-medium text-gray-700 dark:text-gray-300">{sortedAndFilteredProducts.length} produtos encontrados</p>
                {filters.query && (
                    <div className="flex items-center gap-2 text-lg mt-1 text-gray-500">
                        <span>Resultados para: <span className="font-bold text-black dark:text-white">"{filters.query}"</span></span>
                    </div>
                )}
             </div>
             <div className="flex items-center gap-3 order-1 sm:order-2 w-full sm:w-auto">
                <label htmlFor="sort-order" className="text-lg font-medium text-gray-700 dark:text-gray-300 flex-shrink-0">Ordenar por:</label>
                <div className="relative">
                    <select
                        id="sort-order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full sm:w-auto bg-gray-50 dark:bg-gray-900 text-black dark:text-white text-lg rounded-lg py-2 pl-3 pr-8 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow appearance-none cursor-pointer"
                    >
                        <option value="featured">Destaques</option>
                        <option value="newest-desc">Novidades</option>
                        <option value="price-asc">Preço: Menor para Maior</option>
                        <option value="price-desc">Preço: Maior para Menor</option>
                        <option value="rating-desc">Mais Bem Avaliados</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
          </div>
          
          {sortedAndFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAndFilteredProducts.map((product) => {
                 const isWishlisted = wishlistItems.some(item => item.id === product.id);
                 const isOutOfStock = product.stock === 0;
                 return (
                  <div key={product.id} className="group rounded-xl bg-white dark:bg-[#181818] flex flex-col cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-800 overflow-hidden transform hover:-translate-y-1" onClick={() => onNavigate('productDetail', product)}>
                     <div className="relative overflow-hidden aspect-[4/5]">
                        {isOutOfStock && (
                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded shadow-md z-10">
                                Esgotado
                            </div>
                        )}
                        <button onClick={(e) => handleWishlistClick(e, product)} className="absolute top-3 right-3 z-20 p-2.5 bg-white/70 dark:bg-black/60 rounded-full backdrop-blur-md hover:scale-110 transition-transform shadow-sm group-hover:bg-white dark:group-hover:bg-black" aria-label="Adicionar aos Favoritos">
                            {isWishlisted ? <HeartIconSolid className="w-5 h-5 text-red-500"/> : <HeartIcon className="w-5 h-5 text-gray-700 dark:text-white"/>}
                        </button>
                        <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-70' : ''}`} onContextMenu={(e) => e.preventDefault()} loading="lazy" />
                        
                        {/* Quick Add Overlay */}
                        {!isOutOfStock && (
                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="block text-center text-white font-bold uppercase text-sm tracking-wider">Ver Detalhes</span>
                            </div>
                        )}
                     </div>
                    <div className="p-5 flex flex-col flex-grow relative">
                       
                       {/* Header: Rigorous Layout for Title (Left) and Rating (Top Right) */}
                       <div className="flex flex-row justify-between items-start w-full mb-3 gap-2">
                           {/* Title Container - Left Side */}
                           <div className="flex-1 min-w-0 pr-2">
                               <h3 className="font-bold text-lg leading-tight text-left text-gray-900 dark:text-white line-clamp-2">
                                   {product.name}
                               </h3>
                           </div>
                           
                           {/* Rating Container - Strictly Top Right */}
                           <div className="flex-shrink-0 pt-0.5 flex flex-col items-end">
                                <StarRatingDisplay rating={product.rating} reviewCount={product.reviews.length} />
                           </div>
                       </div>

                       <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-left uppercase tracking-wide">{product.brand} • {product.category}</p>
                       <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 text-left flex-grow">{product.desc}</p>
                       
                       <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                           <p className="font-bold text-xl text-black dark:text-white">R$ {product.price.toFixed(2)}</p>
                           <span className="text-xs text-brand-yellow font-bold uppercase tracking-wider group-hover:underline">Comprar Agora</span>
                       </div>
                    </div>
                  </div>
                 );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 bg-white dark:bg-[#181818] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">Não conseguimos encontrar o que você procura com os filtros atuais.</p>
                <button 
                    onClick={clearFilters} 
                    className="bg-brand-yellow text-black font-bold text-lg py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Limpar Filtros
                </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
