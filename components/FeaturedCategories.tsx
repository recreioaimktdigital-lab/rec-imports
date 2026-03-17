
import React from 'react';
import { Product, Filters } from '../data/products';

interface FeaturedCategoriesProps {
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
}

const categories = [
  { name: 'Kids', image: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Corrida', image: 'https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Lifestyle', image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onNavigate }) => {
  const handleShopCategory = (categoryName: string) => {
    if (categoryName === 'Kids') {
      onNavigate('shop', undefined, { gender: ['Kids'], category: 'Todos', style: [], onSale: false });
    } else if (categoryName === 'Corrida') {
      onNavigate('shop', undefined, { style: ['Corrida'], category: 'Todos', gender: [] });
    } else if (categoryName === 'Lifestyle') {
      onNavigate('shop', undefined, { category: 'Life Style', style: [], gender: [] });
    } else {
      onNavigate('shop');
    }
  };

  return (
    <section className="pb-16 md:pb-24 bg-gray-300 dark:bg-[#181818]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="relative group overflow-hidden rounded-xl aspect-[3/4] cursor-pointer" 
            onClick={() => handleShopCategory(category.name)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              onContextMenu={(e) => e.preventDefault()} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h4 className="text-white text-2xl font-bold uppercase mb-4 tracking-tighter group-hover:text-brand-yellow transition-colors">{category.name}</h4>
              <button 
                className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-brand-yellow transition-all duration-300 hover:scale-105"
                onClick={(e) => { e.stopPropagation(); handleShopCategory(category.name); }}
              >
                Explorar {category.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
