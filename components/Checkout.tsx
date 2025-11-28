
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
    const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix'>('credit_card');

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
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Contact Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                                Dados Pessoais
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <input type="email" name="email" id="email" required value={customerInfo.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" placeholder="exemplo@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome Completo</label>
                                    <input type="text" name="name" id="name" required value={customerInfo.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" placeholder="Seu nome" />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                                Endereço de Entrega
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Endereço</label>
                                    <input type="text" name="address" id="address" required value={customerInfo.address} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" placeholder="Rua, Número, Bairro" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cidade</label>
                                        <input type="text" name="city" id="city" required value={customerInfo.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                    </div>
                                    <div>
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">CEP</label>
                                        <input type="text" name="zip" id="zip" required value={customerInfo.zip} onChange={handleInputChange} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method (Simulated) */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="bg-brand-yellow text-black rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                                Pagamento
                            </h2>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('credit_card')}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'credit_card' ? 'border-brand-yellow bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="font-bold">Cartão de Crédito</span>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('pix')}
                                    className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'pix' ? 'border-brand-yellow bg-yellow-50 dark:bg-yellow-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                >
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="font-bold">PIX</span>
                                </button>
                            </div>

                            {paymentMethod === 'credit_card' ? (
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Número do Cartão</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Validade</label>
                                            <input type="text" placeholder="MM/AA" className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVV</label>
                                            <input type="text" placeholder="123" className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nome no Cartão</label>
                                        <input type="text" placeholder="Como impresso no cartão" className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-3 focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow focus:outline-none" />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg animate-fade-in">
                                    <p className="text-sm mb-4">Ao finalizar o pedido, você verá o código QR para pagamento.</p>
                                    <div className="w-32 h-32 bg-white mx-auto flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                                        <span className="text-gray-400 text-xs">QR Code Mockup</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="w-full mt-6 bg-brand-yellow text-black font-bold text-lg py-4 rounded-full hover:bg-yellow-300 transition-colors duration-300 shadow-lg transform hover:-translate-y-1">
                            Pagar R$ {total.toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="row-start-1 lg:row-start-auto">
                     <div className="bg-gray-100 dark:bg-[#181818] p-6 rounded-lg sticky top-24 border border-gray-200 dark:border-gray-800 shadow-xl">
                        <h2 className="text-2xl font-bold uppercase mb-4">Resumo do Pedido</h2>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-brand-yellow">
                            {cartItems.map(item => (
                                <div key={item.cartItemId} className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                    <div className="relative flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" onContextMenu={(e) => e.preventDefault()} />
                                        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-black border-2 border-white dark:border-gray-800">{item.quantity}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold truncate">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Tam: {item.selectedSize} | Cor: {item.selectedColor}</p>
                                    </div>
                                    <p className="font-semibold whitespace-nowrap">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700 space-y-3 text-gray-600 dark:text-gray-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete</span>
                                <span>R$ {shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-black dark:text-white font-bold text-2xl pt-4 border-t border-gray-200 dark:border-gray-700">
                                <span>Total</span>
                                <span className="text-brand-yellow">R$ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
