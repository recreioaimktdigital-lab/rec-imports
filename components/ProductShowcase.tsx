
import React from 'react';

const ProductShowcase: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="relative group overflow-hidden rounded-lg">
          <img src="https://picsum.photos/800/800?random=2" alt="Lime green running shoe" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold uppercase">Max Volt-Ex Pack</h3>
            <p>Get on the grid.</p>
            <button className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
              Shop
            </button>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg">
          <img src="https://picsum.photos/800/800?random=3" alt="Basketball players in action" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold uppercase">Court-Ready Styles</h3>
            <p>Score Gifts for Hoopers</p>
            <button className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
              Shop Gifts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
