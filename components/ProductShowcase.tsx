
import React from 'react';
// FIX: Corrected import path for Product type.
import { Product } from '../data/products';

interface ProductShowcaseProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onNavigate }) => {
  const handleShopClick = (productId: number) => {
    const productToView = products.find(p => p.id === productId);
    if (productToView) {
      onNavigate('productDetail', productToView);
    } else {
      console.warn(`Product with ID ${productId} not found for ProductShowcase button.`);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-200 dark:bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="relative group overflow-hidden rounded-lg">
          <img src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Lime green running shoe" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold uppercase">Kit Max Volt-Ex</h3>
            {/* Increased font size */}
            <p className="text-xl md:text-2xl mt-2 drop-shadow-md">Entre no jogo.</p>
            <button 
              onClick={() => handleShopClick(3)} // Puma RS-X ID
              className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-brand-yellow transition-colors duration-300">
              Comprar
            </button>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg">
          <img src="https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Basketball players in action" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold uppercase">Estilos para a Quadra</h3>
            {/* Increased font size */}
            <p className="text-xl md:text-2xl mt-2 drop-shadow-md">Presentes para Feras do Basquete</p>
            <button 
              onClick={() => handleShopClick(11)} // Bola de Basquete ID
              className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-brand-yellow transition-colors duration-300">
              Comprar Presentes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
