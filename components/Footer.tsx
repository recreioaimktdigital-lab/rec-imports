
import React from 'react';
import { LogoIcon } from './Icons';

const Footer: React.FC = () => {
  const footerLinks = {
    Featured: ['Air Force 1', 'Jordan 1', 'Air Max Dn', 'Vomero'],
    Shoes: ['All Shoes', 'Jordan Shoes', 'Running Shoes', 'Basketball Shoes'],
    Clothing: ['All Clothing', 'Tops & T-Shirts', 'Shorts', 'Hoodies & Pullovers'],
    Kids: ['Infant & Toddler Shoes', 'Kids\' Shoes', 'Kids\' Clothing', 'Kids\' Accessories'],
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
             <a href="#" className="flex-shrink-0">
               <LogoIcon className="h-12 w-auto text-white" />
            </a>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-white uppercase text-sm tracking-wider">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 order-2 md:order-1 mt-4 md:mt-0">&copy; {new Date().getFullYear()} Recreio Imports. All rights reserved.</p>
           <div className="flex space-x-6 order-1 md:order-2">
            <a href="#" className="hover:text-white">Find a Store</a>
            <a href="#" className="hover:text-white">Help</a>
            <a href="#" className="hover:text-white">Join Us</a>
            <a href="#" className="hover:text-white">Sign In</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
