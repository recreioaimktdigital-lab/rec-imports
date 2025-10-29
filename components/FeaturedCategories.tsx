
import React from 'react';

const categories = [
  { name: 'Basketball', image: 'https://picsum.photos/600/800?random=4' },
  { name: 'Running', image: 'https://picsum.photos/600/800?random=5' },
  { name: 'NikeSKIMS', image: 'https://picsum.photos/600/800?random=6' },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="pb-12 md:pb-20 bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {categories.map((category) => (
          <div key={category.name} className="relative group overflow-hidden rounded-lg">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-8">
              <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300">
                Shop {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
