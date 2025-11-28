
import React, { useState, useMemo } from 'react';
// FIX: Corrected import path for Product and Filters types.
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
        <div className="border-b border-blue-200 dark:border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4"
            >
                {/* Increased title size to text-lg */}
                <h3 className="text-lg font-bold uppercase">{title}</h3>
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
             const clothingCategories = ['roupas', 'moda praia', 'life style']; // Normalized categories that are considered "roupas"
             
             const matchesText = pName.includes(normalizedQuery) ||
                pBrand.includes(normalizedQuery) ||
                pCategory.includes(normalizedQuery) ||
                pDesc.includes(normalizedQuery) ||
                pStyle.includes(normalizedQuery) ||
                pLongDesc.includes(normalizedQuery);

             if (isClothingQuery) {
                 // Check if the product's category falls under "clothing"
                 // pCategory is already normalized
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
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" checked={isChecked} onChange={onChange} className="h-4 w-4 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow" />
        {/* Increased label size to text-base */}
        <span className="text-base text-gray-600 dark:text-gray-300">{label}</span>
    </label>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-20 min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden col-span-1">
            <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="w-full bg-white dark:bg-gray-800 text-black dark:text-white font-bold py-3 px-4 rounded-lg flex justify-between items-center border border-blue-200 dark:border-gray-700"
            >
                <span>{showFiltersMobile ? 'Ocultar Filtros' : 'Filtrar Produtos'}</span>
                {showFiltersMobile ? <MinusIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/>}
            </button>
        </div>

        {/* Sidebar - Hidden on mobile unless toggled */}
        <aside className={`${showFiltersMobile ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
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
                    {/* Increased category list item size to text-base */}
                    <button onClick={() => handleFilterChange('category', category)} className={`w-full text-left px-2 py-1 rounded text-base ${filters.category === category ? 'font-bold text-black dark:text-white bg-blue-200 dark:bg-gray-700' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}`}>
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
             <div className="order-2 sm:order-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">{sortedAndFilteredProducts.length} produtos encontrados</p>
                {filters.query && (
                    <div className="flex items-center gap-2 text-sm mt-1">
                        <span>Resultados para: <span className="font-bold">"{filters.query}"</span></span>
                    </div>
                )}
             </div>
             <div className="flex items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
                <label htmlFor="sort-order" className="text-sm font-medium flex-shrink-0">Ordenar por:</label>
                <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full sm:w-auto bg-white dark:bg-gray-800 text-black dark:text-white text-sm rounded-md p-2 border border-blue-200 dark:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow"
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
                 const isOutOfStock = product.stock === 0;
                 return (
                  <div key={product.id} className="group rounded-lg bg-white dark:bg-[#181818] flex flex-col cursor-pointer shadow-sm hover:shadow-md transition-shadow" onClick={() => onNavigate('productDetail', product)}>
                     <div className="relative overflow-hidden">
                        {isOutOfStock && (
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold uppercase px-2 py-1 rounded-full z-10">
                                Esgotado
                            </div>
                        )}
                        <button onClick={(e) => handleWishlistClick(e, product)} className="absolute top-3 right-3 z-20 p-2 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-transform" aria-label="Adicionar aos Favoritos">
                            {isWishlisted ? <HeartIconSolid className="w-5 h-5 text-red-500"/> : <HeartIcon className="w-5 h-5"/>}
                        </button>
                        <img src={product.image} alt={product.name} className={`w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'grayscale' : ''}`} onContextMenu={(e) => e.preventDefault()} />
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
                <h3 className="text-2xl font-bold">Nenhum produto encontrado.</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Tente ajustar sua busca ou filtros para encontrar o que procura.</p>
                <button onClick={clearFilters} className="mt-4 bg-brand-yellow text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors">Limpar Filtros</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
