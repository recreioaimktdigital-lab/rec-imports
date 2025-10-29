
import React from 'react';
import { LogoIcon, SearchIcon, MoonIcon, HeartIcon, BagIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-[#121212]/80 backdrop-blur-sm sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Top Nav for smaller screens */}
          <div className="flex md:hidden items-center justify-between w-full">
             <a href="#" className="flex-shrink-0">
               <LogoIcon className="h-8 w-auto text-white" />
            </a>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white"><SearchIcon className="w-6 h-6" /></button>
              <button className="text-gray-300 hover:text-white"><BagIcon className="w-6 h-6" /></button>
            </div>
          </div>

          {/* Full Header for larger screens */}
          <div className="hidden md:flex items-center justify-between w-full">
            <a href="#" className="flex-shrink-0">
               <LogoIcon className="h-10 w-auto text-white" />
            </a>
            <div className="flex-1 max-w-sm ml-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-800 text-white placeholder-gray-400 w-full pl-10 pr-3 py-2 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                />
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Find a Store</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Help</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Join Us</a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white">Sign In</a>
              <div className="flex items-center space-x-4">
                 <button className="text-gray-300 hover:text-white"><MoonIcon className="w-6 h-6" /></button>
                 <button className="text-gray-300 hover:text-white"><HeartIcon className="w-6 h-6" /></button>
                 <button className="text-gray-300 hover:text-white"><BagIcon className="w-6 h-6" /></button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
