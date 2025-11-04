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
import { WhatsAppIcon, CheckCircleIcon } from './components/Icons';
import CtaSection from './components/CtaSection';
import LeadCapture from './components/LeadCapture';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Wishlist from './components/Wishlist';
import Help from './components/Help';
import Login from './components/Login';
import AiAssistant from './components/AiAssistant';
import { Product, CartItem, Order, Filters, products } from './data/products';

const Toast: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black py-3 px-6 rounded-full shadow-lg">
    <CheckCircleIcon className="w-6 h-6 text-green-500" />
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
  const [toastMessage, setToastMessage] = useState('');
  
  const initialFilters: Filters = {
    category: 'Todos',
    brand: [],
    gender: [],
    style: [],
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
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const navigateTo = (page: string, product?: Product, filters?: Partial<Filters>) => {
    if (page !== 'shop') {
      setActiveFilters(initialFilters);
    }
    
    if (filters) {
      setActiveFilters(prev => ({ ...initialFilters, ...filters }));
    }
    
    setCurrentPage(page);
    if (page === 'productDetail' && product) {
      setSelectedProduct(product);
    }
    window.scrollTo(0, 0);
  };
  
  const handleAddToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.cartItemId === cartItemId);
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
    setToastMessage(`${product.name} foi adicionado!`);
  };

  const handleQuantityChange = (cartItemId: string, delta: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
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
        return prevItems.filter(item => item.id !== product.id);
      } else {
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
        return <Hero products={products} onNavigate={navigateTo}/>;
      case 'leadCapture':
        return <LeadCapture onNavigate={() => navigateTo('home')} />;
      case 'checkout':
        return <Checkout cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />;
      case 'orderConfirmation':
        if (completedOrder) {
          return <OrderConfirmation order={completedOrder} onContinueShopping={() => navigateTo('shop')} />
        }
        return <Hero products={products} onNavigate={navigateTo}/>;
      case 'shop':
        return <Shop 
                  products={products} 
                  onNavigate={navigateTo} 
                  wishlistItems={wishlistItems}
                  onToggleWishlist={handleToggleWishlist}
                  initialFilters={activeFilters}
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
      case 'home':
      default:
        return (
          <>
            <Hero products={products} onNavigate={navigateTo} />
            <CtaSection onNavigate={() => navigateTo('leadCapture')} />
            <ProductShowcase products={products} onNavigate={navigateTo} />
            <FeaturedCategories onNavigate={navigateTo} />
            <VideoAction />
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
    <div className="bg-white dark:bg-[#121212] text-black dark:text-white font-sans">
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
      {toastMessage && <Toast message={toastMessage} />}
      <AiAssistant products={products} onNavigate={navigateTo} />
      <Footer onNavigate={navigateTo}/>
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/5521985516518?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform duration-300 hover:scale-110 inline-block"
          aria-label="Contact us on WhatsApp"
        >
          <WhatsAppIcon className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}

export default App;