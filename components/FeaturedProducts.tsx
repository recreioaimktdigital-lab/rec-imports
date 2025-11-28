
import React from 'react';
// FIX: Corrected import path for Product type.
import { Product } from '../data/products';
import { HeartIcon, HeartIconSolid } from './Icons';

interface FeaturedProductsProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
}

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
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => onNavigate('productDetail', product)}
              >
                 {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                        <span className="text-white font-bold text-2xl uppercase tracking-widest">Esgotado</span>
                    </div>
                 )}
                <button 
                  onClick={(e) => handleWishlistClick(e, product)}
                  className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-all duration-300"
                  aria-label="Adicionar aos Favoritos"
                >
                  {isWishlisted ? <HeartIconSolid className="w-6 h-6 text-red-500"/> : <HeartIcon className="w-6 h-6"/>}
                </button>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-8 text-center text-white">
                  <h3 className="text-3xl font-bold uppercase">{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-brand-yellow transition-colors duration-300">
                    Compre Agora
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
