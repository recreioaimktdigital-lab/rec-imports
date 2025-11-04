
import React from 'react';
// FIX: Corrected import path for Product and CartItem types.
import { Product, CartItem } from '../data/products';
import { HeartIconSolid, BagIcon, StarIcon } from './Icons';

interface WishlistProps {
  wishlistItems: Product[];
  onNavigate: (page: string, product?: Product) => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
}

const StarRatingDisplay: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({rating.toFixed(1)})</span>
    </div>
);


const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, onNavigate, onToggleWishlist, onAddToCart }) => {
  
  const handleAddToCartClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    onAddToCart(product, 1, defaultSize, defaultColor);
    // Maybe show a toast notification here in a real app
    onToggleWishlist(product); // Remove from wishlist after adding to cart
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <HeartIconSolid className="w-20 h-20 text-gray-400 dark:text-gray-600 mb-6" />
        <h1 className="text-4xl font-display uppercase mb-4">Sua Lista de Desejos está Vazia</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Salve seus produtos favoritos aqui para não perdê-los de vista.</p>
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-brand-yellow text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors duration-300"
        >
          Explorar Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow">Lista de Desejos</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Seus produtos favoritos, todos em um só lugar.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-lg cursor-pointer bg-gray-100 dark:bg-[#181818] flex flex-col relative"
            onClick={() => onNavigate('productDetail', product)}
          >
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                    className="p-2 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                    aria-label="Remover dos Favoritos"
                >
                    <HeartIconSolid className="w-5 h-5 text-red-500"/>
                </button>
                <button 
                    onClick={(e) => handleAddToCartClick(e, product)}
                    className="p-2 bg-white/50 dark:bg-black/50 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                    aria-label="Adicionar ao Carrinho"
                >
                    <BagIcon className="w-5 h-5"/>
                </button>
            </div>

            <div className="overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
               <h3 className="font-bold text-lg truncate">{product.name}</h3>
               <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
               <div className="mt-2">
                 <StarRatingDisplay rating={product.rating} />
               </div>
               <p className="mt-2 font-semibold text-lg mt-auto">R$ {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;