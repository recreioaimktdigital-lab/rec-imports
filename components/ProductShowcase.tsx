
import React from 'react';
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
      console.warn(`Product with ID ${productId} not found.`);
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gray-200 dark:bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="relative group overflow-hidden rounded-xl aspect-[16/10] cursor-pointer" onClick={() => handleShopClick(1)}>
          <img 
            src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Nike Air Max" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            onContextMenu={(e) => e.preventDefault()} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-brand-yellow transition-colors">Air Max Evolution</h3>
            <p className="text-lg mt-1 drop-shadow-md">Conforto além dos limites.</p>
            <button 
              className="mt-4 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-brand-yellow transition-all duration-300 hover:scale-105">
              Comprar Agora
            </button>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-xl aspect-[16/10] cursor-pointer" onClick={() => handleShopClick(4)}>
          <img 
            src="https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Asics Performance" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            onContextMenu={(e) => e.preventDefault()} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-brand-yellow transition-colors">Elite Performance</h3>
            <p className="text-lg mt-1 drop-shadow-md">Tecnologia Asics Gel.</p>
            <button 
              className="mt-4 bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-brand-yellow transition-all duration-300 hover:scale-105">
              Explorar Corrida
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
