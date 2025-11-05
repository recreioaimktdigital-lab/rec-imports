import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { CloseIcon, PlusIcon, MinusIcon, StarIcon } from './Icons';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
  onNavigateToProduct: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart, onNavigateToProduct }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.gallery[0]);
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    // Scroll lock is now handled by App.tsx
    return () => {
        window.removeEventListener('keydown', handleEsc);
    }
  }, [onClose]);
  
  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };
  
  const handleViewFullDetails = () => {
      onNavigateToProduct(product);
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-[#181818] w-full max-w-4xl h-full max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row" onClick={(e) => e.stopPropagation()}>
        <div className="w-full md:w-1/2 p-4 h-1/2 md:h-full flex flex-col">
          <div className="flex-1 mb-2 rounded-lg overflow-hidden relative">
            {isOutOfStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                    <span className="text-white font-bold text-2xl uppercase tracking-widest">Esgotado</span>
                </div>
            )}
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
          </div>
          <div className="flex gap-2 h-20 overflow-x-auto pb-1">
            {product.gallery.map((img, index) => (
              <button key={index} onClick={() => setSelectedImage(img)} className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${selectedImage === img ? 'border-brand-yellow' : 'border-transparent'}`}>
                <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-display uppercase">{product.name}</h2>
            <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-black dark:hover:text-white flex-shrink-0">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
            ))}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({product.reviews.length} avaliações)</span>
          </div>
          <p className="text-2xl font-bold mt-4">R$ {product.price.toFixed(2)}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{product.longDescription.substring(0, 150)}...</p>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Cor</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {product.colors.map(color => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${selectedColor === color ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent border-gray-300 dark:border-gray-600'}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Tamanho</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent border-gray-300 dark:border-gray-600'}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6">
             <div className="flex items-center gap-4 mb-4">
                {!isOutOfStock && (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><MinusIcon className="w-5 h-5" /></button>
                      <span className="px-4 font-semibold text-lg">{quantity}</span>
                      <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><PlusIcon className="w-5 h-5" /></button>
                    </div>
                )}
                <button 
                  onClick={handleAddToCartClick}
                  disabled={isOutOfStock}
                  className="flex-1 bg-brand-yellow text-black font-semibold py-3.5 rounded-full hover:bg-yellow-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
                </button>
            </div>
             <button onClick={handleViewFullDetails} className="w-full text-center text-sm text-brand-yellow hover:underline">
                Ver detalhes completos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;