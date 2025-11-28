import React, { useState, useRef } from 'react';
// FIX: Corrected import path for Product type.
import { Product } from '../data/products';
import { PlusIcon, MinusIcon, HeartIcon, HeartIconSolid, StarIcon, StarIconOutline } from './Icons';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  allProducts: Product[];
  onNavigate: (page: string, product: Product) => void;
}

const StarRating: React.FC<{ rating: number, totalReviews: number }> = ({ rating, totalReviews }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
      ))}
    </div>
    <span className="text-sm text-gray-500 dark:text-gray-400">({totalReviews} avaliações)</span>
  </div>
);

const ReviewForm: React.FC<{ onSubmit: (review: { rating: number, comment: string, author: string }) => void }> = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && comment && author) {
            onSubmit({ rating, comment, author });
            setSubmitted(true);
        }
    };

    if (submitted) {
        return <p className="text-brand-yellow font-semibold">Obrigado pela sua avaliação!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Sua Avaliação</label>
                <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="text-gray-300 dark:text-gray-600"
                        >
                            <StarIcon className={`w-7 h-7 transition-colors ${(hoverRating || rating) >= star ? 'text-brand-yellow' : ''}`} />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium">Seu Nome</label>
                <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
            </div>
            <div>
                <label htmlFor="comment" className="block text-sm font-medium">Seu Comentário</label>
                <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0"></textarea>
            </div>
            <button type="submit" className="bg-brand-yellow text-black font-semibold py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors duration-300">
                Enviar Avaliação
            </button>
        </form>
    );
};


const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, wishlistItems, onToggleWishlist, allProducts, onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [allReviews, setAllReviews] = useState(product.reviews);
  const [isZooming, setIsZooming] = useState(false);
  const [bgPosition, setBgPosition] = useState('center');
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;
    
    setBgPosition(`${bgX}% ${bgY}%`);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const handleReviewSubmit = (review: { rating: number, comment: string, author: string }) => {
    // In a real app, this would send to a backend. Here we just update local state.
    setAllReviews(prev => [...prev, review]);
  };

  const isWishlisted = wishlistItems.some(item => item.id === product.id);
  const isOutOfStock = product.stock === 0;

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery Column */}
        <div className="relative">
            <div 
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-zoom-in mb-4"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover aspect-square" onContextMenu={(e) => e.preventDefault()} />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {product.gallery.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === img ? 'border-brand-yellow' : 'border-transparent'}`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
                </button>
              ))}
            </div>

          {/* Zoomed View (Desktop only) */}
          <div 
            className={`hidden lg:block absolute left-full ml-8 top-0 w-full h-full bg-no-repeat border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl pointer-events-none transition-opacity duration-300 z-10 ${isZooming ? 'opacity-100' : 'opacity-0'}`}
            style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: bgPosition,
                backgroundSize: '200%',
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl md:text-5xl font-display uppercase">{product.name}</h1>
          <div className="mt-2 flex items-center gap-4">
             <StarRating rating={product.rating} totalReviews={allReviews.length} />
             <p className="text-lg text-gray-500 dark:text-gray-400">{product.desc}</p>
          </div>
          <p className="text-3xl font-bold mt-4">R$ {product.price.toFixed(2)}</p>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Selecione a Cor</h3>
            <div className="flex items-center gap-3 mt-2">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${selectedColor === color ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent border-gray-300 dark:border-gray-600'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Selecione o Tamanho</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'bg-transparent border-gray-300 dark:border-gray-600'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
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
              className="flex-1 bg-brand-yellow text-black font-semibold py-4 rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </button>
            <button 
                onClick={() => onToggleWishlist(product)}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Adicionar aos Favoritos"
            >
              {isWishlisted ? <HeartIconSolid className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-xl">Descrição</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">{product.longDescription}</p>
          </div>
        </div>
      </div>
       {/* Reviews Section */}
       <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Avaliações de Clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Deixe sua avaliação</h3>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                </div>
                <div className="space-y-6">
                    {allReviews.length > 0 ? (
                        allReviews.map((review, index) => (
                            <div key={index} className="bg-gray-100 dark:bg-[#181818] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">{review.author}</p>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-brand-yellow' : 'text-gray-300 dark:text-gray-600'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>Este produto ainda não tem avaliações. Seja o primeiro a avaliar!</p>
                    )}
                </div>
            </div>
        </div>
        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
            <div className="mt-20 pt-10 border-t border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-8 text-center uppercase font-display">Você Também Pode Gostar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {relatedProducts.map(relatedProduct => (
                        <div
                            key={relatedProduct.id}
                            className="group overflow-hidden rounded-lg cursor-pointer bg-gray-100 dark:bg-[#181818] flex flex-col relative"
                            onClick={() => onNavigate('productDetail', relatedProduct)}
                        >
                            {relatedProduct.stock === 0 && (
                                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold uppercase px-2 py-1 rounded-full z-10">
                                    Esgotado
                                </div>
                            )}
                            <div className="overflow-hidden">
                                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" onContextMenu={(e) => e.preventDefault()} />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg truncate">{relatedProduct.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{relatedProduct.brand}</p>
                                <p className="mt-2 font-semibold text-lg mt-auto">R$ {relatedProduct.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default ProductDetail;