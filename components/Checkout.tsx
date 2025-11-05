import React, { useState } from 'react';
// FIX: Corrected import path for CartItem type.
import { CartItem } from '../data/products';

interface CheckoutProps {
    cartItems: CartItem[];
    onPlaceOrder: (customerDetails: { name: string; email: string; }) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder }) => {
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        zip: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation
        if (customerInfo.email && customerInfo.name && customerInfo.address) {
            onPlaceOrder({ name: customerInfo.name, email: customerInfo.email });
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-4xl md:text-5xl font-display uppercase mb-8 text-center">Finalizar Compra</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form Section */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Informações de Contato</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" name="email" id="email" required value={customerInfo.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Endereço de Entrega</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                                    <input type="text" name="name" id="name" required value={customerInfo.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                                    <input type="text" name="address" id="address" required value={customerInfo.address} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cidade</label>
                                        <input type="text" name="city" id="city" required value={customerInfo.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CEP</label>
                                        <input type="text" name="zip" id="zip" required value={customerInfo.zip} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-800 border-transparent focus:border-brand-yellow focus:bg-white dark:focus:bg-black focus:ring-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full mt-6 bg-brand-yellow text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-colors duration-300">
                            Finalizar Pedido
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="row-start-1 lg:row-start-auto">
                     <div className="bg-gray-100 dark:bg-[#181818] p-6 rounded-lg sticky top-24">
                        <h2 className="text-2xl font-bold uppercase mb-4">Resumo do Pedido</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.cartItemId} className="flex items-center gap-4">
                                    <div className="relative">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" onContextMenu={(e) => e.preventDefault()} />
                                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tamanho: {item.selectedSize}</p>
                                    </div>
                                    <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 text-gray-600 dark:text-gray-300">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;