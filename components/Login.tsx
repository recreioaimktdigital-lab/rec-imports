import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black">
            <div className="absolute inset-0 overflow-hidden">
                <img src="https://picsum.photos/1920/1080?random=50" alt="Login background" className="w-full h-full object-cover" onContextMenu={(e) => e.preventDefault()} />
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </div>
            
            <div className="relative z-10 max-w-md w-full space-y-8 bg-white/10 dark:bg-black/20 backdrop-blur-lg p-10 rounded-xl shadow-2xl text-white">
                <div>
                    <h2 className="text-center text-4xl font-display uppercase text-brand-yellow">
                        Entrar na sua Conta
                    </h2>
                    <p className="mt-2 text-center text-md text-gray-300">
                        Acesse sua conta para ver seus pedidos e favoritos.
                    </p>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address-login" className="sr-only">Email</label>
                                <input id="email-address-login" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm rounded-t-md" placeholder="Email" />
                            </div>
                            <div>
                                <label htmlFor="password-login" className="sr-only">Senha</label>
                                <input id="password-login" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm rounded-b-md" placeholder="Senha" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-yellow hover:text-yellow-300">
                                    Esqueceu sua senha?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-brand-yellow hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow transition-colors">
                                Entrar
                            </button>
                        </div>
                         <p className="text-center text-sm">
                            Não tem uma conta? <a href="#" className="font-medium text-brand-yellow hover:text-yellow-300">Crie uma agora</a>
                         </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;