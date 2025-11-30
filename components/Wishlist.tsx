
import React from 'react';
import { Product, CartItem } from '../data/products';
import { HeartIconSolid, BagIcon, StarIcon } from './Icons';

interface WishlistProps {
  wishlistItems: Product[];
  onNavigate: (page: string, product?: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
}

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


const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, onNavigate, onToggleWishlist, onAddToCart }) => {
  
  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    onAddToCart(product, 1, defaultSize, defaultColor);
    onToggleWishlist(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6">
            <HeartIconSolid className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        </div>
        <h1 className="text-4xl font-display uppercase mb-4 text-gray-900 dark:text-white">Sua Lista de Desejos está Vazia</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">Salve seus produtos favoritos aqui para não perdê-los de vista.</p>
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-brand-yellow text-black font-bold text-lg py-4 px-10 rounded-full hover:bg-yellow-300 transition-colors duration-300 shadow-lg"
        >
          Explorar Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}>Lista de Desejos</h1>
        <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">Seus produtos favoritos, todos em um só lugar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => {
          const isOutOfStock = product.stock === 0;
          return (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl cursor-pointer bg-white dark:bg-[#181818] flex flex-col shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 transform hover:-translate-y-1"
              onClick={() => onNavigate('productDetail', product)}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                  {isOutOfStock && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded z-10 shadow-md">
                          Esgotado
                      </div>
                  )}
                  <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                      <button 
                          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                          className="p-2.5 bg-white/80 dark:bg-black/60 rounded-full backdrop-blur-md hover:scale-110 transition-transform shadow-sm group-hover:bg-white dark:group-hover:bg-black"
                          aria-label="Remover dos Favoritos"
                      >
                          <HeartIconSolid className="w-5 h-5 text-red-500"/>
                      </button>
                      <button 
                          onClick={(e) => handleAddToCartClick(e, product)}
                          disabled={isOutOfStock}
                          className="p-2.5 bg-white/80 dark:bg-black/60 rounded-full backdrop-blur-md hover:scale-110 transition-transform shadow-sm group-hover:bg-white dark:group-hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed text-black dark:text-white"
                          aria-label="Adicionar ao Carrinho"
                      >
                          <BagIcon className="w-5 h-5"/>
                      </button>
                  </div>
                <img src={product.image} alt={product.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-70' : ''}`} onContextMenu={(e) => e.preventDefault()} />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                 {/* Header: Strictly Layout - Title Left, Stars Top Right */}
                 <div className="flex flex-row justify-between items-start w-full mb-3 gap-2">
                     <div className="flex-1 min-w-0 pr-2">
                         <h3 className="font-bold text-lg leading-tight text-left text-gray-900 dark:text-white truncate">{product.name}</h3>
                     </div>
                     <div className="flex-shrink-0 pt-0.5 flex flex-col items-end">
                         <StarRatingDisplay rating={product.rating} reviewCount={product.reviews.length} />
                     </div>
                 </div>

                 <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left uppercase tracking-wide mb-4">{product.category}</p>
                 <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <p className="font-bold text-xl text-black dark:text-white">R$ {product.price.toFixed(2)}</p>
                    <span className="text-xs font-bold text-brand-yellow uppercase group-hover:underline">Ver Produto</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
