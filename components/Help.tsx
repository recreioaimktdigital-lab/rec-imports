
import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-[60vh]">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-display uppercase mb-4">Central de Ajuda</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Estamos aqui para ajudar! Como podemos te auxiliar hoje?
        </p>
      </div>
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-[#181818] p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Como faço para rastrear meu pedido?</h3>
            <p className="text-gray-600 dark:text-gray-400">Você pode rastrear seu pedido na seção "Status do Pedido" em sua conta ou através do link enviado para o seu e-mail.</p>
          </div>
          <div>
            <h3 className="font-semibold">Qual é a política de devolução?</h3>
            <p className="text-gray-600 dark:text-gray-400">Aceitamos devoluções em até 30 dias após o recebimento do produto, desde que ele esteja em sua condição original e sem uso.</p>
          </div>
          <div>
            <h3 className="font-semibold">Como entro em contato com o suporte?</h3>
            <p className="text-gray-600 dark:text-gray-400">Você pode nos contatar através do nosso chat no WhatsApp ou enviando um e-mail para <a href="mailto:suporte@recreioimports.com" className="text-blue-700 font-bold underline hover:text-blue-500">suporte@recreioimports.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
