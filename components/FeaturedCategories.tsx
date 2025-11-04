
import React from 'react';
// FIX: Corrected import path for Product and Filters types.
import { Product, Filters } from '../data/products';

interface FeaturedCategoriesProps {
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
}

const categories = [
  { name: 'Basquete', image: 'https://picsum.photos/600/800?random=4' },
  { name: 'Corrida', image: 'https://picsum.photos/600/800?random=5' },
  { name: 'NikeSKIMS', image: 'https://picsum.photos/600/800?random=6' },
];

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onNavigate }) => {
  const handleShopCategory = (categoryName: string) => {
    if (categoryName === 'Basquete' || categoryName === 'Corrida') {
      onNavigate('shop', undefined, { style: [categoryName] });
    } else if (categoryName === 'NikeSKIMS') {
      // Categoria fictícia, filtra pela marca Nike como exemplo
      onNavigate('shop', undefined, { brand: ['Nike'] });
    } else {
      onNavigate('shop');
    }
  };

  return (
    <section className="pb-12 md:pb-20 bg-gray-100 dark:bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {categories.map((category) => (
          <div key={category.name} className="relative group overflow-hidden rounded-lg">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-8">
              <button 
                onClick={() => handleShopCategory(category.name)}
                className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                Comprar {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;