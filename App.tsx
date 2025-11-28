
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
import { CheckCircleIcon, HeartIconSolid, ExclamationCircleIcon, WhatsAppIcon } from './components/Icons';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Wishlist from './components/Wishlist';
import Help from './components/Help';
import Login from './components/Login';
import VideoModal from './components/VideoModal';
import { Product, CartItem, Order, Filters, products } from './data/products';
import LeadCapture from './components/LeadCapture';

interface ToastProps {
  message: string;
  icon: 'success' | 'heart' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, icon }) => (
  <div className="fixed bottom-32 md:bottom-20 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-full shadow-lg animate-fade-in">
    {icon === 'success' && <CheckCircleIcon className="w-6 h-6 text-brand-yellow" />}
    {icon === 'heart' && <HeartIconSolid className="w-6 h-6 text-red-500" />}
    {icon === 'error' && <ExclamationCircleIcon className="w-6 h-6 text-red-500" />}
    <span className="font-semibold">{message}</span>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState<{ message: string; icon: 'success' | 'heart' | 'error' } | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  
  const initialFilters: Filters = {
    category: 'Todos',
    brand: [],
    gender: [],
    style: [],
    query: '',
  };
  const [activeFilters, setActiveFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Centralized scroll lock management
  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isVideoModalOpen]);

  const openVideoModal = (url: string) => {
    setCurrentVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const navigateTo = (page: string, product?: Product, filters?: Partial<Filters>) => {
    if (page !== 'shop') {
      setActiveFilters(initialFilters);
    }
    
    if (filters) {
      setActiveFilters({ ...initialFilters, ...filters });
    }
    
    setCurrentPage(page);
    if (page === 'productDetail' && product) {
      setSelectedProduct(product);
    }
    window.scrollTo(0, 0);
  };
  
  const handleAddToCart = (product: Product, quantity: number, size: string, color: string) => {
    if (product.stock < 1) {
        setToast({ message: `${product.name} está esgotado!`, icon: 'error' });
        return;
    }

    const cartItemId = `${product.id}-${size}-${color}`;
    const existingItem = cartItems.find(item => item.cartItemId === cartItemId);
    const existingQuantity = existingItem ? existingItem.quantity : 0;

    if (existingQuantity + quantity > product.stock) {
        setToast({ message: `Estoque insuficiente para ${product.name}`, icon: 'error' });
        return;
    }

    setCartItems(prevItems => {
      if (existingItem) {
        return prevItems.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity, selectedSize: size, selectedColor: color, cartItemId }];
      }
    });
    setToast({ message: `${product.name} foi adicionado!`, icon: 'success' });
  };

  const handleQuantityChange = (cartItemId: string, delta: number) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          if (newQuantity > item.stock) {
            setToast({ message: `Apenas ${item.stock} unidades de ${item.name} em estoque.`, icon: 'error' });
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.cartItemId !== cartItemId));
  };
  
  const handlePlaceOrder = (customerDetails: {name: string, email: string}) => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    const newOrder: Order = {
        id: `RI${Date.now()}`,
        items: cartItems,
        total: total,
        customer: customerDetails
    };

    setCompletedOrder(newOrder);
    setCartItems([]);
    navigateTo('orderConfirmation');
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      const isWishlisted = prevItems.some(item => item.id === product.id);
      if (isWishlisted) {
        setToast({ message: 'Removido da Lista de Desejos', icon: 'heart' });
        return prevItems.filter(item => item.id !== product.id);
      } else {
        setToast({ message: 'Adicionado à Lista de Desejos', icon: 'heart' });
        return [...prevItems, product];
      }
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'cart':
        return <Cart 
                  cartItems={cartItems}
                  onContinueShopping={() => navigateTo('shop')} 
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={() => navigateTo('checkout')}
                />;
      case 'productDetail':
        if (selectedProduct) {
          return <ProductDetail 
                    product={selectedProduct} 
                    onAddToCart={handleAddToCart}
                    wishlistItems={wishlistItems}
                    onToggleWishlist={handleToggleWishlist}
                    allProducts={products}
                    onNavigate={navigateTo}
                  />;
        }
        return <Hero onNavigate={navigateTo} />;
      case 'checkout':
        return <Checkout cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />;
      case 'orderConfirmation':
        if (completedOrder) {
          return <OrderConfirmation order={completedOrder} onContinueShopping={() => navigateTo('shop')} />
        }
        return <Hero onNavigate={navigateTo} />;
      case 'shop':
        return <Shop 
                  products={products} 
                  onNavigate={navigateTo} 
                  wishlistItems={wishlistItems}
                  onToggleWishlist={handleToggleWishlist}
                  filters={activeFilters}
                  onFiltersChange={setActiveFilters}
                />;
      case 'wishlist':
        return <Wishlist 
                  wishlistItems={wishlistItems}
                  onNavigate={navigateTo}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                />;
      case 'help':
        return <Help />;
      case 'login':
        return <Login />;
      case 'leadCapture':
        return <LeadCapture onNavigate={() => navigateTo('shop')} />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={navigateTo} />
            <ProductShowcase products={products} onNavigate={navigateTo} />
            <FeaturedCategories onNavigate={navigateTo} />
            <VideoAction onOpenVideo={openVideoModal} />
            <Spotlight onNavigate={navigateTo} />
            <FeaturedProducts 
                products={products.slice(0,3)} 
                onNavigate={navigateTo}
                wishlistItems={wishlistItems}
                onToggleWishlist={handleToggleWishlist} 
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-300 dark:bg-[#121212] text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Header 
        products={products}
        currentPage={currentPage}
        onNavigate={navigateTo} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistItems.length} 
      />
      <main>
        {renderPage()}
      </main>
      {toast && <Toast message={toast.message} icon={toast.icon} />}
      {isVideoModalOpen && <VideoModal key={currentVideoUrl} videoUrl={currentVideoUrl} onClose={closeVideoModal} />}
      <Footer onNavigate={navigateTo}/>
      
      {/* WhatsApp Button */}
      {/* Positioned at bottom-24 (approx 96px) - Safe zone for all devices */}
      <div className="fixed bottom-24 right-4 md:right-6 z-[100] group">
        <a 
          href="https://wa.me/5521985516518?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos."
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 group-hover:scale-110"
          aria-label="Contact us on WhatsApp"
        >
          <div className="w-14 h-14 rounded-full drop-shadow-lg flex items-center justify-center">
             <WhatsAppIcon className="w-full h-full" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
