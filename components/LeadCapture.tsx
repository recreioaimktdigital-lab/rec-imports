import React, { useState } from 'react';

interface LeadCaptureProps {
    onNavigate: () => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ onNavigate }) => {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if(name && email && whatsapp) {
            console.log({ name, email, whatsapp });
            setSubmitted(true);
        }
    };

    return (
        <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black">
            <div className="absolute inset-0 overflow-hidden">
                <img src="https://picsum.photos/1920/1080?random=42" alt="Athlete" className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            
            <div className="relative z-10 max-w-md w-full space-y-8 bg-white/10 dark:bg-black/20 backdrop-blur-lg p-10 rounded-xl shadow-2xl text-white">
                {!submitted ? (
                    <div>
                        <h2 className="text-center text-4xl font-display uppercase text-brand-yellow">
                            ACESSO VIP
                        </h2>
                        <p className="mt-2 text-center text-md text-gray-300">
                            Cadastre-se para receber descontos exclusivos, promoções e acesso antecipado a novos produtos.
                        </p>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Nome</label>
                                    <input id="name" name="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm rounded-t-md" placeholder="Nome" />
                                </div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email</label>
                                    <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm" placeholder="Seu melhor e-mail" />
                                </div>
                                <div>
                                    <label htmlFor="whatsapp" className="sr-only">WhatsApp</label>
                                    <input id="whatsapp" name="whatsapp" type="tel" required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm rounded-b-md" placeholder="WhatsApp com DDD" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-brand-yellow hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-colors">
                                    SEJA VIP
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-4xl font-display uppercase text-brand-yellow">
                            OBRIGADO!
                        </h2>
                        <p className="mt-4 text-lg text-gray-200">
                            Seu cadastro foi realizado com sucesso! Fique de olho no seu e-mail e WhatsApp para receber nossas ofertas exclusivas.
                        </p>
                        <button onClick={onNavigate} className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors">
                            Voltar à Loja
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadCapture;