
import React from 'react';
import { Product } from '../data/products';
import { HeartIcon, HeartIconSolid, StarIcon } from './Icons';

interface FeaturedProductsProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

const StarRatingDisplay: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => (
    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-3.5 h-3.5 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-400'}`} />
            ))}
        </div>
        <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
            ({reviewCount > 0 ? reviewCount : Math.floor(Math.random() * 20) + 1} avaliações)
        </span>
    </div>
);

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onNavigate, wishlistItems, onToggleWishlist }) => {
  const handleWishlistClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };
  
  return (
    <section className="py-12 md:py-20 bg-gray-300 dark:bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
            <h2 
              className="text-4xl md:text-6xl font-display uppercase text-brand-yellow"
              style={{ textShadow: '3px 3px 2px #1F2937' }}
            >
            Produtos em Destaque
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {products.slice(0, 3).map((product) => {
            const isWishlisted = wishlistItems.some(item => item.id === product.id);
            const isOutOfStock = product.stock === 0;

            return (
              <div 
                key={product.id} 
                className="relative group overflow-hidden rounded-lg cursor-pointer h-[500px]"
                onClick={() => onNavigate('productDetail', product)}
              >
                 {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                        <span className="text-white font-bold text-2xl uppercase tracking-widest border-2 border-white px-6 py-2">Esgotado</span>
                    </div>
                 )}
                <button 
                  onClick={(e) => handleWishlistClick(e, product)}
                  className="absolute top-4 right-4 z-20 p-3 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-all duration-300 hover:bg-white dark:hover:bg-black"
                  aria-label="Adicionar aos Favoritos"
                >
                  {isWishlisted ? <HeartIconSolid className="w-6 h-6 text-red-500"/> : <HeartIcon className="w-6 h-6 text-white"/>}
                </button>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onContextMenu={(e) => e.preventDefault()} loading="lazy" decoding="async" />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
                  
                  <div className="flex justify-between items-start w-full mb-2 gap-2">
                      <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-lg font-bold uppercase leading-tight text-left line-clamp-2 group-hover:text-brand-yellow transition-colors">{product.name}</h3>
                      </div>
                      <div className="flex-shrink-0 pt-1 flex flex-col items-end">
                          <StarRatingDisplay rating={product.rating} reviewCount={product.reviews.length} />
                      </div>
                  </div>
                  
                  <p className="text-base text-gray-200 mt-1 mb-6 line-clamp-2 w-full font-medium drop-shadow-md text-left">{product.brand}</p>
                  
                  <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-brand-yellow">R$ {product.price.toFixed(2)}</span>
                      <div className="bg-white text-black font-bold text-sm uppercase py-3 px-8 rounded-full hover:bg-brand-yellow transition-colors duration-300 shadow-lg">
                        Compre Agora
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
