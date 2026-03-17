import React from 'react';
import { TrashIcon, PlusIcon, MinusIcon } from './Icons';
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
        <h1 className="text-4xl font-display uppercase mb-4 text-brand-naval dark:text-brand-off-white">Seu Carrinho está Vazio</h1>
        <p className="text-brand-naval/60 dark:text-gray-400 mb-8">Parece que você ainda não adicionou nada. Que tal explorar nossos produtos?</p>
        <button 
          onClick={onContinueShopping}
          className="bg-brand-naval dark:bg-brand-yellow text-brand-off-white dark:text-black font-semibold py-3 px-8 rounded-full hover:scale-105 transition-all shadow-lg"
        >
          Explorar Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl font-display uppercase mb-8 text-brand-naval dark:text-brand-off-white">Seu Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.cartItemId} className="flex items-start bg-brand-surface-light dark:bg-brand-naval-light/10 p-4 rounded-lg gap-4 border border-brand-border-light dark:border-white/5">
              <img src={item.image} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md" onContextMenu={(e) => e.preventDefault()} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg text-brand-naval dark:text-white">{item.name}</h2>
                    <p className="text-sm text-brand-naval/60 dark:text-gray-400">{item.desc}</p>
                    <p className="text-sm text-brand-naval/60 dark:text-gray-400">Cor: {item.selectedColor}</p>
                    <p className="text-sm text-brand-naval/60 dark:text-gray-400">Tamanho: {item.selectedSize}</p>
                  </div>
                  <p className="font-semibold text-lg whitespace-nowrap text-brand-naval dark:text-white">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 bg-brand-off-white dark:bg-brand-naval-dark rounded-full p-1 border border-brand-border-light dark:border-white/10">
                    <button onClick={() => onQuantityChange(item.cartItemId, -1)} className="p-1.5 rounded-full hover:bg-brand-border-light dark:hover:bg-gray-700 text-brand-naval dark:text-white"><MinusIcon className="w-5 h-5" /></button>
                    <span className="px-3 font-semibold text-brand-naval dark:text-white">{item.quantity}</span>
                    <button onClick={() => onQuantityChange(item.cartItemId, 1)} className="p-1.5 rounded-full hover:bg-brand-border-light dark:hover:bg-gray-700 text-brand-naval dark:text-white"><PlusIcon className="w-5 h-5" /></button>
                  </div>
                  <button onClick={() => onRemoveItem(item.cartItemId)} className="text-brand-naval/40 dark:text-gray-400 hover:text-red-500 transition-colors">
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-brand-surface-light dark:bg-brand-naval-light/10 p-6 rounded-lg sticky top-24 border border-brand-border-light dark:border-white/5 shadow-xl">
            <h2 className="text-2xl font-bold uppercase mb-4 text-brand-naval dark:text-white">Resumo do Pedido</h2>
            <div className="space-y-3 text-brand-naval/70 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete</span>
                <span>R$ {shipping.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-brand-naval dark:text-white font-bold text-lg pt-4 border-t border-brand-border-light dark:border-gray-700">
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button 
                onClick={onCheckout}
                className="w-full mt-6 bg-brand-naval dark:bg-brand-yellow text-brand-off-white dark:text-black font-semibold py-3 rounded-full hover:scale-105 transition-all shadow-md">
              Finalizar Compra
            </button>
             <button 
                onClick={onContinueShopping}
                className="w-full mt-3 bg-brand-border-light text-brand-naval font-semibold py-3 rounded-full hover:bg-brand-off-white transition-all dark:bg-gray-200 dark:text-black"
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