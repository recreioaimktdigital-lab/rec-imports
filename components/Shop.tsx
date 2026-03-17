
import React, { useState, useMemo } from 'react';
import { Product, Filters } from '../data/products';
import { HeartIcon, HeartIconSolid, StarIcon } from './Icons';

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
    <div className="flex flex-col items-end justify-start gap-1">
        <div className="flex items-center justify-end">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
        </div>
        <span className="text-xs text-brand-naval/50 dark:text-gray-400 font-medium text-right leading-none whitespace-nowrap">
            ({reviewCount > 0 ? reviewCount : Math.floor(Math.random() * 20) + 1} avaliações)
        </span>
    </div>
);

export default function Shop({ products, onNavigate, wishlistItems, onToggleWishlist, filters, onFiltersChange }: ShopProps) {
  const [sortOrder, setSortOrder] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
        let catMatch = false;
        if (Array.isArray(filters.category)) {
            catMatch = filters.category.length === 0 || filters.category.includes(p.category);
        } else {
            catMatch = filters.category === 'Todos' || p.category === filters.category;
        }

        const brandMatch = filters.brand.length === 0 || filters.brand.includes(p.brand);
        const genderMatch = filters.gender.length === 0 || filters.gender.includes(p.gender);
        const styleMatch = filters.style.length === 0 || filters.style.includes(p.style);
        const saleMatch = !filters.onSale || p.onSale === true;
        
        let queryMatch = true;
        if (filters.query) {
            const normalizedQuery = normalizeText(filters.query);
            queryMatch = normalizeText(p.name).includes(normalizedQuery) || 
                         normalizeText(p.brand).includes(normalizedQuery);
        }
        return catMatch && brandMatch && genderMatch && styleMatch && queryMatch && saleMatch;
    });
  }, [products, filters]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortOrder === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-desc') return list.sort((a, b) => b.price - a.price);
    return list;
  }, [filteredProducts, sortOrder]);

  const toggleFilter = (key: keyof Filters, value: string) => {
    const current = filters[key];
    if (Array.isArray(current)) {
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      onFiltersChange({ ...filters, [key]: next });
    } else {
      onFiltersChange({ ...filters, [key]: value });
    }
  };

  const brands = Array.from(new Set(products.map(p => p.brand))).sort();

  return (
    <div className="w-full bg-brand-off-white dark:bg-brand-naval-dark transition-colors duration-300">
      <div className="container mx-auto px-4 lg:pl-7 lg:pr-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[220px] flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-brand-naval-light/5 p-5 rounded-2xl border border-brand-border-light dark:border-white/5 shadow-sm overflow-visible">
              <h2 className="text-lg font-display font-bold uppercase tracking-tight text-brand-naval dark:text-brand-off-white mb-6">Filtros</h2>
              
              <div className="space-y-10">
                {/* Categorias */}
                <div>
                  <h3 className="font-display font-medium uppercase text-base mb-4 tracking-widest text-brand-naval dark:text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1">Categorias</h3>
                  <div className="flex flex-col gap-3">
                    {["Todos", "Tênis", "Moda Praia", "Life Style", "Artigos Esportivos", "Suplementos", "Fisio e Ortopédico"].map(cat => (
                      <button 
                        key={cat} 
                        onClick={() => onFiltersChange({ ...filters, category: cat })}
                        className={`block text-base font-medium transition-all text-left w-full hover:text-brand-yellow hover:translate-x-1 ${filters.category === cat ? 'text-brand-yellow font-bold underline' : 'text-brand-naval/60 dark:text-gray-400'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gênero */}
                <div>
                  <h3 className="font-display font-medium uppercase text-base mb-4 tracking-widest text-brand-naval dark:text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1">Gênero</h3>
                  <div className="flex flex-col gap-3">
                    {["Masculino", "Feminino", "Kids"].map(gender => (
                      <label key={gender} className="flex items-center gap-3 cursor-pointer group hover:text-brand-yellow transition-colors">
                        <input 
                          type="checkbox" 
                          checked={filters.gender.includes(gender)}
                          onChange={() => toggleFilter('gender', gender)}
                          className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 bg-transparent text-brand-yellow focus:ring-brand-yellow transition-all cursor-pointer" 
                        />
                        <span className={`text-base font-medium transition-colors group-hover:text-brand-yellow ${filters.gender.includes(gender) ? 'text-brand-yellow font-bold' : 'text-brand-naval/60 dark:text-gray-400'}`}>
                            {gender}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marcas */}
                <div>
                  <h3 className="font-display font-medium uppercase text-base mb-4 tracking-widest text-brand-naval dark:text-brand-off-white border-b-2 border-brand-yellow w-fit pb-1">Marcas</h3>
                  <div className="flex flex-col gap-3">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group hover:text-brand-yellow transition-colors">
                        <input 
                          type="checkbox" 
                          checked={filters.brand.includes(brand)}
                          onChange={() => toggleFilter('brand', brand)}
                          className="w-5 h-5 rounded border-gray-300 dark:border-gray-700 bg-transparent text-brand-yellow focus:ring-brand-yellow transition-all cursor-pointer" 
                        />
                        <span className={`text-base font-medium transition-colors group-hover:text-brand-yellow ${filters.brand.includes(brand) ? 'text-brand-yellow font-bold' : 'text-brand-naval/60 dark:text-gray-400'}`}>
                            {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-brand-border-light dark:border-white/10">
                    <button 
                        onClick={() => onFiltersChange({category:'Todos', brand:[], gender:[], style:[], query:'', onSale: false})}
                        className="w-full text-center text-sm font-bold uppercase tracking-widest text-brand-naval/40 dark:text-gray-500 hover:text-brand-yellow transition-colors"
                    >
                        Limpar Filtros
                    </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-10 bg-white dark:bg-brand-naval-light/5 p-6 rounded-2xl border border-brand-border-light dark:border-white/5 shadow-sm">
               <div>
                  <p className="text-sm font-bold text-brand-naval dark:text-brand-off-white">{sortedProducts.length} Produtos Encontrados</p>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-[10px] uppercase font-bold text-brand-naval/30 dark:text-gray-500 tracking-widest">Ordenar:</span>
                 <select 
                   value={sortOrder} 
                   onChange={(e) => setSortOrder(e.target.value)} 
                   className="bg-transparent font-bold text-xs uppercase tracking-widest focus:outline-none cursor-pointer border-none ring-0 text-brand-naval dark:text-brand-off-white"
                 >
                    <option value="featured">Destaques</option>
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                 </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {sortedProducts.length > 0 ? sortedProducts.map(product => {
                  const isWish = wishlistItems.some(i => i.id === product.id);
                  const isOutOfStock = product.stock === 0;
                  return (
                      <div 
                        key={product.id} 
                        className="group bg-white dark:bg-brand-naval-light/5 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border border-brand-border-light dark:border-white/5"
                        onClick={() => onNavigate('productDetail', product)}
                      >
                          <div className="relative aspect-[4/5] overflow-hidden bg-brand-surface-light dark:bg-black/20">
                              {isOutOfStock && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                                  <span className="text-white font-bold uppercase tracking-widest border-2 border-white px-6 py-2">Esgotado</span>
                                </div>
                              )}
                              {product.onSale && !isOutOfStock && (
                                <div className="absolute top-4 left-4 bg-brand-yellow text-black font-bold text-[10px] uppercase px-3 py-1 rounded-full z-20">
                                    Oferta
                                </div>
                              )}
                              <img 
                                src={product.image} 
                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? 'grayscale opacity-70' : ''}`} 
                                alt={product.name} 
                              />
                              <button 
                                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }} 
                                  className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-black/40 rounded-full backdrop-blur-md shadow-sm z-20 hover:scale-110 transition-transform text-brand-naval dark:text-brand-off-white"
                              >
                                  {isWish ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5" />}
                              </button>
                          </div>
                          <div className="p-6 flex flex-col flex-1 text-left">
                              <div className="flex justify-between items-start mb-4">
                                  <h3 className="font-bold text-base uppercase truncate pr-3 text-brand-naval dark:text-white group-hover:text-brand-yellow transition-colors">{product.name}</h3>
                                  <StarRatingDisplay rating={product.rating} reviewCount={product.reviews.length} />
                              </div>
                              <p className="text-[10px] text-brand-naval/40 dark:text-gray-400 font-bold tracking-widest uppercase mb-4">{product.brand}</p>
                              <div className="mt-auto pt-6 border-t border-brand-border-light dark:border-white/5 flex justify-between items-center">
                                <p className="font-bold text-base text-brand-naval dark:text-white">R$ {product.price.toFixed(2)}</p>
                                <span className="text-xs font-black uppercase tracking-tighter text-brand-yellow font-sans hover:scale-110 transition-transform inline-block drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Ver Detalhes</span>
                              </div>
                          </div>
                      </div>
                  );
              }) : (
                <div className="col-span-full py-20 text-center">
                    <p className="text-lg font-bold text-brand-naval/30 dark:text-gray-500 italic uppercase tracking-widest">Nenhum resultado para esses filtros.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
