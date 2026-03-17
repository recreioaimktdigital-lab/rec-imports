
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../data/products';
import { PlusIcon, MinusIcon, HeartIcon, HeartIconSolid, StarIcon } from './Icons';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
  wishlistItems: Product[];
  onToggleWishlist: (product: Product) => void;
  allProducts: Product[];
  onNavigate: (page: string, product: Product) => void;
}

const StarRating: React.FC<{ rating: number, totalReviews: number }> = ({ rating, totalReviews }) => (
  <div className="flex flex-col items-end gap-1">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-brand-yellow' : 'text-brand-naval/20 dark:text-gray-600'}`} />
      ))}
    </div>
    <span className="text-sm text-brand-naval/50 dark:text-gray-400 font-medium whitespace-nowrap">
      ({totalReviews > 0 ? totalReviews : Math.floor(Math.random() * 20) + 1} avaliações)
    </span>
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
        return <p className="text-brand-yellow font-semibold text-lg">Obrigado pela sua avaliação!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-lg font-bold mb-2 text-brand-naval dark:text-white text-left">Sua Avaliação</label>
                <div className="flex items-center mt-1 gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            className="text-brand-naval/20 dark:text-gray-600 hover:scale-110 transition-transform"
                        >
                            <StarIcon className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-brand-yellow' : ''}`} />
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="author" className="block text-lg font-bold mb-2 text-brand-naval dark:text-white text-left">Seu Nome</label>
                <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="w-full rounded-lg bg-brand-surface-light dark:bg-brand-naval-light/20 border-brand-border-light dark:border-white/10 focus:border-brand-yellow focus:bg-brand-off-white dark:focus:bg-black focus:ring-0 p-4 text-lg text-brand-naval dark:text-white placeholder-brand-naval/30" placeholder="Digite seu nome" />
            </div>
            <div>
                <label htmlFor="comment" className="block text-lg font-bold mb-2 text-brand-naval dark:text-white text-left">Seu Comentário</label>
                <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} rows={4} required className="w-full rounded-lg bg-brand-surface-light dark:bg-brand-naval-light/20 border-brand-border-light dark:border-white/10 focus:border-brand-yellow focus:bg-brand-off-white dark:focus:bg-black focus:ring-0 p-4 text-lg text-brand-naval dark:text-white placeholder-brand-naval/30" placeholder="O que você achou do produto?"></textarea>
            </div>
            <button type="submit" className="bg-brand-naval dark:bg-brand-yellow text-brand-off-white dark:text-black font-bold text-lg py-3 px-8 rounded-full hover:scale-105 transition-all shadow-md">
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

  useEffect(() => {
    setSelectedImage(product.gallery[0]);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    setAllReviews(product.reviews);
  }, [product]);

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
        <div className="relative max-w-[500px] mx-auto lg:max-w-none">
            <div 
              ref={imageContainerRef}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-zoom-in mb-4 border border-brand-border-light dark:border-white/5 bg-brand-surface-light dark:bg-black"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img src={selectedImage} alt={product.name} className="w-full h-auto object-cover aspect-square" onContextMenu={(e) => e.preventDefault()} />
              {isZooming && (
                <div 
                  className="absolute inset-0 bg-no-repeat pointer-events-none transition-opacity duration-200 z-10"
                  style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundPosition: bgPosition,
                      backgroundSize: '250%',
                  }}
                />
              )}
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {product.gallery.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-brand-yellow scale-105' : 'border-transparent bg-brand-surface-light dark:bg-brand-naval-light/20'}`}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
                </button>
              ))}
            </div>
        </div>

        <div className="text-left">
          <div className="flex justify-between items-start w-full gap-4 mb-6 text-brand-naval dark:text-white">
              <h1 className="text-2xl md:text-3xl font-display font-black uppercase leading-tight flex-1">
                  {product.name}
              </h1>
              <div className="flex-shrink-0 flex flex-col items-end min-w-[120px]">
                  <StarRating rating={product.rating} totalReviews={allReviews.length} />
              </div>
          </div>

          <p className="text-base text-brand-naval/60 dark:text-gray-400 mt-2">{product.desc}</p>
          <p className="text-xl font-black mt-4 text-brand-naval dark:text-white">R$ {product.price.toFixed(2)}</p>
          
          <div className="mt-8">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-naval/70 dark:text-gray-300 mb-3">Selecione a Cor</h3>
            <div className="flex items-center gap-3">
              {product.colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold border-2 transition-all uppercase tracking-widest ${selectedColor === color ? 'bg-brand-yellow text-black border-brand-yellow' : 'bg-transparent border-brand-border-light text-brand-naval/60 dark:border-gray-600 dark:text-gray-400 hover:border-brand-yellow'}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-naval/70 dark:text-gray-300 mb-3">Selecione o Tamanho</h3>
            <div className="flex flex-wrap items-center gap-3">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold border-2 transition-all uppercase tracking-widest ${selectedSize === size ? 'bg-brand-yellow text-black border-brand-yellow' : 'bg-transparent border-brand-border-light text-brand-naval/60 dark:border-gray-600 dark:text-gray-400 hover:border-brand-yellow'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
             {!isOutOfStock && (
                <div className="flex items-center justify-between gap-2 bg-brand-surface-light dark:bg-gray-800 rounded-full p-1 border border-brand-border-light dark:border-white/10 min-w-[120px]">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-full hover:bg-brand-off-white dark:hover:bg-gray-700 text-brand-naval dark:text-white transition-colors"><MinusIcon className="w-4 h-4" /></button>
                  <span className="px-3 font-black text-lg text-brand-naval dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="p-2 rounded-full hover:bg-brand-off-white dark:hover:bg-gray-700 text-brand-naval dark:text-white transition-colors"><PlusIcon className="w-4 h-4" /></button>
                </div>
             )}
            <button 
              onClick={handleAddToCartClick}
              disabled={isOutOfStock}
              className="flex-1 bg-brand-naval dark:bg-brand-yellow text-brand-off-white dark:text-black font-black uppercase tracking-widest py-3.5 rounded-full hover:scale-[1.02] transition-all shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              {isOutOfStock ? 'Esgotado' : 'Adicionar ao Carrinho'}
            </button>
            <button 
                onClick={() => onToggleWishlist(product)}
                className="p-3.5 bg-brand-surface-light dark:bg-gray-800 rounded-full hover:bg-brand-off-white dark:hover:bg-gray-700 transition-colors border border-brand-border-light dark:border-white/10"
                aria-label="Adicionar aos Favoritos"
            >
              {isWishlisted ? <HeartIconSolid className="w-5 h-5 text-red-500" /> : <HeartIcon className="w-5 h-5 text-brand-naval dark:text-white" />}
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-brand-border-light dark:border-gray-700">
            <h3 className="font-black text-xl uppercase tracking-tighter text-brand-naval dark:text-white mb-4">Descrição do Produto</h3>
            <p className="text-brand-naval/70 dark:text-gray-300 leading-relaxed text-base">{product.longDescription}</p>
          </div>
        </div>
      </div>

       <div className="mt-20 pt-10 border-t border-brand-border-light dark:border-gray-700">
            <h2 className="text-2xl font-black mb-10 text-brand-naval dark:text-white text-left uppercase italic tracking-tighter">Avaliações de Clientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h3 className="text-lg font-bold mb-6 text-brand-naval dark:text-white text-left italic tracking-tighter uppercase">O que você achou?</h3>
                    <ReviewForm onSubmit={handleReviewSubmit} />
                </div>
                <div className="space-y-6 overflow-y-auto max-h-[500px] pr-4 scrollbar-thin">
                    {allReviews.length > 0 ? (
                        allReviews.map((review, index) => (
                            <div key={index} className="bg-brand-surface-light dark:bg-brand-naval-light/5 p-6 rounded-2xl border border-brand-border-light dark:border-white/5 animate-fade-in">
                                <div className="flex items-center justify-between mb-4">
                                    <p className="font-black text-sm text-brand-naval dark:text-white uppercase italic tracking-tighter">{review.author}</p>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-brand-yellow' : 'text-brand-naval/20 dark:text-gray-600'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-base text-brand-naval/70 dark:text-gray-300 leading-relaxed italic">"{review.comment}"</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-base text-brand-naval/40 dark:text-gray-500 italic text-left">Este produto ainda não tem avaliações. Seja o primeiro!</p>
                    )}
                </div>
            </div>
        </div>

        {relatedProducts.length > 0 && (
            <div className="mt-24 pt-10 border-t border-brand-border-light dark:border-gray-700">
                <h2 className="text-3xl font-black mb-10 text-center uppercase font-display text-brand-naval dark:text-white">Você Também Pode Gostar</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(relatedProduct => (
                        <div
                            key={relatedProduct.id}
                            className="group overflow-hidden rounded-2xl cursor-pointer bg-white dark:bg-brand-naval-light/5 flex flex-col relative border border-brand-border-light dark:border-white/5 hover:shadow-2xl transition-all duration-500"
                            onClick={() => onNavigate('productDetail', relatedProduct)}
                        >
                            {relatedProduct.stock === 0 && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full z-10">
                                    Esgotado
                                </div>
                            )}
                            <div className="aspect-[4/5] overflow-hidden bg-brand-surface-light">
                                <img src={relatedProduct.image} alt={relatedProduct.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onContextMenu={(e) => e.preventDefault()} />
                            </div>
                            <div className="p-6 flex flex-col flex-grow text-left">
                                <h3 className="font-black text-base uppercase truncate text-brand-naval dark:text-white group-hover:text-brand-yellow transition-colors">{relatedProduct.name}</h3>
                                <p className="text-[10px] font-bold tracking-widest text-brand-naval/50 dark:text-gray-500 uppercase mt-1">{relatedProduct.brand}</p>
                                <p className="mt-4 font-black text-lg text-brand-naval dark:text-white">R$ {relatedProduct.price.toFixed(2)}</p>
                                <span className="text-xs font-black uppercase tracking-tighter text-brand-yellow font-sans hover:scale-110 transition-transform mt-2 inline-block w-fit drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Ver Detalhes</span>
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
