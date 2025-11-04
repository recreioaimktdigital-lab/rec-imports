
import React, { useEffect } from 'react';
import { WhatsAppIcon } from './Icons';

const WhatsAppRedirect: React.FC = () => {
  const whatsAppNumber = '5521985516518';
  const whatsAppLink = `https://wa.me/${whatsAppNumber}`;

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = whatsAppLink;
    }, 1500); // Wait 1.5 seconds before redirecting

    return () => clearTimeout(timer);
  }, [whatsAppLink]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-gray-100 dark:bg-[#181818] rounded-lg p-8">
        <WhatsAppIcon className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-display uppercase mb-4">Redirecionando para o WhatsApp...</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Você será redirecionado para iniciar uma conversa. Se a página não carregar,
          <a href={whatsAppLink} target="_blank" rel="noopener noreferrer" className="text-brand-yellow underline hover:text-yellow-300 ml-1">
            clique aqui
          </a>.
        </p>
      </div>
    </div>
  );
};

export default WhatsAppRedirect;