
import React from 'react';
import { TrashIcon, PlusIcon, MinusIcon } from './Icons';
// FIX: Corrected import path for CartItem type.
import { CartItem } from '../data/products';

interface CartProps {
  cartItems: CartItem[];
  onContinueShopping: () => void;
  onQuantityChange: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onContinueShopping, onQuantityChange, onRemoveItem, onCheckout }) => {
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display uppercase mb-4">Seu Carrinho está Vazio</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Parece que você ainda não adicionou nada. Que tal explorar nossos produtos?</p>
        <button 
          onClick={onContinueShopping}
          className="bg-brand-yellow text-black font-semibold py-3 px-8 rounded-full hover:bg-yellow-300 transition-colors duration-300"
        >
          Explorar Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-display uppercase mb-8">Seu Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.cartItemId} className="flex items-start bg-gray-100 dark:bg-[#181818] p-4 rounded-lg gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cor: {item.selectedColor}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tamanho: {item.selectedSize}</p>
                  </div>
                  <p className="font-semibold text-lg whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 rounded-full p-1">
                    <button onClick={() => onQuantityChange(item.cartItemId, -1)} className="p-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"><MinusIcon className="w-5 h-5" /></button>
                    <span className="px-3 font-semibold">{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.cartItemId, 1)} className="p-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"><PlusIcon className="w-5 h-5" /></button>
                  </div>
                  <button onClick={() => onRemoveItem(item.cartItemId)} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-100 dark:bg-[#181818] p-6 rounded-lg sticky top-24">
            <h2 className="text-2xl font-bold uppercase mb-4">Resumo do Pedido</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-black dark:text-white font-bold text-lg pt-4 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button 
                onClick={onCheckout}
                className="w-full mt-6 bg-brand-yellow text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-colors duration-300">
              Finalizar Compra
            </button>
             <button 
                onClick={onContinueShopping}
                className="w-full mt-3 bg-gray-700 text-white font-semibold py-3 rounded-full hover:bg-gray-600 transition-colors duration-300 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300"
            >
                Continuar Comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;