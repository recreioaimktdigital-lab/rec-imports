
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import FeaturedCategories from './components/FeaturedCategories';
import VideoAction from './components/VideoAction';
import Spotlight from './components/Spotlight';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import { WhatsAppIcon } from './components/Icons';

function App() {
  return (
    <div className="bg-[#121212] text-white font-sans">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <FeaturedCategories />
        <VideoAction />
        <Spotlight />
        <FeaturedProducts />
      </main>
      <Footer />
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform duration-300 hover:scale-110">
          <WhatsAppIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default App;
