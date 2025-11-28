import React from 'react';
// FIX: Corrected import path for Order type.
import { Order } from '../data/products';
import { CheckCircleIcon } from './Icons';

interface OrderConfirmationProps {
    order: Order;
    onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onContinueShopping }) => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-[#181818] rounded-lg p-8 text-center">
                <CheckCircleIcon className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-display uppercase text-brand-yellow">MUITO OBRIGADO!</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    Olá {order.customer.name}, seu pedido foi recebido com sucesso.
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Número do Pedido: <span className="font-semibold text-black dark:text-white">{order.id}</span>
                </p>

                <div className="mt-8 text-left border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    <div className="space-y-4">
                        {order.items.map(item => (
                            <div key={item.cartItemId} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" onContextMenu={(e) => e.preventDefault()} />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Qtd: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg">
                        <span>Total Pago</span>
                        <span>R$ {order.total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={onContinueShopping}
                    className="w-full mt-8 bg-brand-yellow text-black font-semibold py-3 rounded-full hover:bg-yellow-300 transition-colors duration-300"
                >
                    Continuar Comprando
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;