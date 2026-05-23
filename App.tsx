import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import FeaturedCategories from './components/FeaturedCategories';
import VideoAction from './components/VideoAction';
import Spotlight from './components/Spotlight';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import Shop from './components/Shop';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Wishlist from './components/Wishlist';
import Help from './components/Help';
import Login from './components/Login';
import LeadCapture from './components/LeadCapture';
import VideoModal from './components/VideoModal';
import QuickViewModal from './components/QuickViewModal';
import { Product, CartItem, Order, Filters } from './data/products';
import { useProducts } from './data/airtable';
import { CheckCircleIcon, HeartIconSolid } from './components/Icons';

const Toast = ({ message, icon }: { message: string; icon: 'heart' | 'success' }) => (
  <div className="fixed bottom-32 md:bottom-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-brand-naval-dark border border-brand-yellow/30 text-white py-3 px-6 rounded-full shadow-2xl animate-fade-in backdrop-blur-md">
    {icon === 'success' && <CheckCircleIcon className="w-6 h-6 text-brand-yellow" />}
    {icon === 'heart' && <HeartIconSolid className="w-6 h-6 text-red-500" />}
    <span className="font-semibold text-sm uppercase tracking-wider">{message}</span>
  </div>
);

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-naval-dark">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-brand-off-white text-sm tracking-widest uppercase">Carregando produtos...</p>
    </div>
  </div>
);

export default function App() {
  const { products, loading } = useProducts();

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; icon: 'success' | 'heart' } | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: 'Todos', brand: [], gender: [], style: [], query: '', onSale: false,
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const navigateTo = (page: string, product?: Product, filters?: Partial<Filters>) => {
    if (page === 'shop') setActiveFilters({ category: 'Todos', brand: [], gender: [], style: [], query: '', onSale: false, ...filters });
    if (page === 'productDetail' && product) setSelectedProduct(product);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCartItems(prev => {
      const existing = prev.find(i => i.cartItemId === cartItemId);
      if (existing) return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + quantity } : i);
      return [...prev, { ...product, quantity, selectedSize: size, selectedColor: color, cartItemId }];
    });
    setToast({ message: `${product.name} no carrinho!`, icon: 'success' });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(i => i.id === product.id);
      setToast({ message: exists ? 'Removido dos favoritos' : 'Adicionado aos favoritos!', icon: 'heart' });
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  };

  if (loading) return <LoadingScreen />;

  const renderContent = () => {
    switch (currentPage) {
      case 'shop':
        return <Shop products={products} onNavigate={navigateTo} wishlistItems={wishlistItems} onToggleWishlist={handleToggleWishlist} filters={activeFilters} onFiltersChange={setActiveFilters} />;
      case 'cart':
        return <Cart cartItems={cartItems} onContinueShopping={() => navigateTo('shop')} onQuantityChange={(id, d) => setCartItems(prev => prev.map(i => i.cartItemId === id ? { ...i, quantity: Math.max(1, i.quantity + d) } : i))} onRemoveItem={id => setCartItems(prev => prev.filter(i => i.cartItemId !== id))} onCheckout={() => navigateTo('checkout')} />;
      case 'productDetail':
        return selectedProduct ? <ProductDetail product={selectedProduct} onAddToCart={handleAddToCart} wishlistItems={wishlistItems} onToggleWishlist={handleToggleWishlist} allProducts={products} onNavigate={navigateTo} /> : null;
      case 'checkout':
        return <Checkout cartItems={cartItems} onPlaceOrder={details => { setCompletedOrder({ id: `RI-${Date.now()}`, items: cartItems, total: cartItems.reduce((a, b) => a + b.price * b.quantity, 0), customer: details }); setCartItems([]); navigateTo('orderConfirmation'); }} />;
      case 'orderConfirmation':
        return completedOrder ? <OrderConfirmation order={completedOrder} onContinueShopping={() => navigateTo('shop')} /> : null;
      case 'wishlist':
        return <Wishlist wishlistItems={wishlistItems} onNavigate={navigateTo} onToggleWishlist={handleToggleWishlist} onAddToCart={handleAddToCart} />;
      case 'help': return <Help />;
      case 'login': return <Login />;
      case 'leadCapture': return <LeadCapture onNavigate={() => navigateTo('home')} />;
      default:
        return (
          <>
            <Hero />
            <ProductShowcase products={products} onNavigate={navigateTo} />
            <FeaturedCategories onNavigate={navigateTo} />
            <VideoAction onOpenVideo={url => { setCurrentVideoUrl(url); setIsVideoModalOpen(true); }} />
            <Spotlight onNavigate={navigateTo} />
            <FeaturedProducts products={products.slice(0, 3)} onNavigate={navigateTo} wishlistItems={wishlistItems} onToggleWishlist={handleToggleWishlist} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-brand-naval-dark text-brand-naval dark:text-brand-off-white transition-colors duration-300 font-sans overflow-x-hidden">
      <Header products={products} currentPage={currentPage} onNavigate={navigateTo} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)} wishlistCount={wishlistItems.length} />
      <main className="min-h-[calc(100vh-160px)]">{renderContent()}</main>
      <Footer onNavigate={navigateTo} />
      {toast && <Toast message={toast.message} icon={toast.icon} />}
      {isVideoModalOpen && <VideoModal videoUrl={currentVideoUrl} onClose={() => setIsVideoModalOpen(false)} />}
      {quickViewProduct && <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={handleAddToCart} onNavigateToProduct={p => { setQuickViewProduct(null); navigateTo('productDetail', p); }} />}
    </div>
  );
}
