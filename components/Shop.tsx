import React, { useState, useMemo, useEffect } from 'react';
// FIX: Corrected import path for Product and Filters types.
import { Product, Filters } from '../data/products';
import { HeartIcon, HeartIconSolid, PlusIcon, MinusIcon, StarIcon } from './Icons';

interface ShopProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  initialFilters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const StarRatingDisplay: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({rating.toFixed(1)})</span>
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
                <h3 className="text-md font-bold uppercase">{title}</h3>
                {isOpen ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <div className="pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Shop: React.FC<ShopProps> = ({ products, onNavigate, wishlistItems, onToggleWishlist, initialFilters, onFiltersChange }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortOrder, setSortOrder] = useState('featured');
  
  useEffect(() => {
      setFilters(initialFilters);
  }, [initialFilters]);

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
        return categoryMatch && brandMatch && genderMatch && styleMatch;
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
  
  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters(prevFilters => {
        let newFilters: Filters;
        if (filterType === 'category') {
             newFilters = {
                ...prevFilters,
                category: value,
            };
        } else {
            const currentValues = prevFilters[filterType] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            newFilters = { ...prevFilters, [filterType]: newValues };
        }
        onFiltersChange(newFilters);
        return newFilters;
    });
  };

  const clearFilters = () => {
    const clearedFilters = {
        category: 'Todos',
        brand: [],
        gender: [],
        style: [],
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  const CheckboxFilter: React.FC<{ label: string; isChecked: boolean; onChange: () => void; }> = ({ label, isChecked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" checked={isChecked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow" />
        <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold uppercase">Filtros</h2>
                <button 
                    onClick={clearFilters}
                    className="text-sm text-brand-yellow hover:underline"
                >
                    Limpar tudo
                </button>
            </div>
            <AccordionItem title="Categorias">
              <ul className="space-y-2">
                {filterOptions.categories.map(category => (
                  <li key={category}>
                    <button onClick={() => handleFilterChange('category', category)} className={`w-full text-left px-2 py-1 rounded text-sm ${filters.category === category ? 'font-bold text-black dark:text-white bg-gray-200 dark:bg-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
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
        </aside>

        <main className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
             <p className="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1">{sortedAndFilteredProducts.length} produtos encontrados</p>
             <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
                <label htmlFor="sort-order" className="text-sm font-medium flex-shrink-0">Ordenar por:</label>
                <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full sm:w-auto bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-sm rounded-md p-2 border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow"
                >
                    <option value="featured">Destaques</option>
                    <option value="newest-desc">Novidades</option>
                    <option value="price-asc">Preço: Menor para Maior</option>
                    <option value="price-desc">Preço: Maior para Menor</option>
                    <option value="rating-desc">Mais Bem Avaliados</option>
                </select>
            </div>
          </div>
          {sortedAndFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {sortedAndFilteredProducts.map((product) => {
                 const isWishlisted = wishlistItems.some(item => item.id === product.id);
                 return (
                  <div key={product.id} className="group overflow-hidden rounded-lg cursor-pointer bg-gray-100 dark:bg-[#181818] flex flex-col relative" onClick={() => onNavigate('productDetail', product)}>
                     <button onClick={(e) => handleWishlistClick(e, product)} className="absolute top-3 right-3 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Adicionar aos Favoritos">
                        {isWishlisted ? <HeartIconSolid className="w-5 h-5 text-red-500"/> : <HeartIcon className="w-5 h-5"/>}
                    </button>
                    <div className="overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                       <h3 className="font-bold text-lg truncate">{product.name}</h3>
                       <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand} / {product.category}</p>
                       <div className="mt-2 mb-2">
                           <StarRatingDisplay rating={product.rating} />
                       </div>
                       <p className="font-semibold text-lg mt-auto">R$ {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                 );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;