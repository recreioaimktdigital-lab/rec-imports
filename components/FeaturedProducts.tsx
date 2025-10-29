
import React from 'react';

const products = [
  { name: 'Performance Sneakers', image: 'https://picsum.photos/600/800?random=11', desc: 'Dominate the Court' },
  { name: 'Basketball Collection', image: 'https://picsum.photos/600/800?random=12', desc: 'Elevate the Court' },
  { name: 'Running Gear', image: 'https://picsum.photos/600/800?random=13', desc: 'Run Faster, Go Further' },
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-[#181818]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-display uppercase text-brand-yellow">
            Featured Products
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <div key={product.name} className="relative group overflow-hidden rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-8 text-center text-white">
                <h3 className="text-3xl font-bold uppercase">{product.name}</h3>
                <p>{product.desc}</p>
                <button className="mt-4 bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
