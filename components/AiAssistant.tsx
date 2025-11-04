
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { AiAssistantIcon, CloseIcon } from './Icons';
// FIX: Corrected import path for Product type.
import { Product } from '../data/products';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
}

interface AiAssistantProps {
  products: Product[];
  onNavigate: (page: string, product: Product) => void;
}

const searchProductsFunctionDeclaration: FunctionDeclaration = {
  name: 'searchProducts',
  description: 'Pesquise produtos com base em uma consulta, categoria, marca, gênero ou estilo. Retorna uma lista de produtos correspondentes.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: { type: Type.STRING, description: 'Um termo de pesquisa geral (por exemplo, "tênis confortável", "camiseta preta").' },
      category: { type: Type.STRING, description: 'A categoria do produto (por exemplo, "Tênis", "Roupas").' },
      brand: { type: Type.STRING, description: 'A marca do produto (por exemplo, "Nike", "Adidas").' },
      gender: { type: Type.STRING, description: 'O gênero alvo (por exemplo, "Masculino", "Feminino", "Kids").' },
      style: { type: Type.STRING, description: 'O estilo ou esporte do produto (por exemplo, "Corrida", "Casual", "Basquete").' },
    },
    required: [],
  },
};

const AiAssistant: React.FC<AiAssistantProps> = ({ products, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Olá! Eu sou seu assistente de compras da Recreio Imports. Posso encontrar produtos para você. O que você está procurando hoje?",
    },
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chat = useRef<Chat | null>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    chat.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "Você é um assistente de compras amigável e experiente da Recreio Imports, uma loja de e-commerce especializada em roupas e calçados esportivos. Seja prestativo, conciso e incentive os usuários a explorar os produtos. Use a função `searchProducts` sempre que um usuário pedir para encontrar um produto. Responda em português brasileiro.",
        tools: [{ functionDeclarations: [searchProductsFunctionDeclaration] }],
      },
    });
  }, []);

  const performProductSearch = (args: { [key: string]: any }): Product[] => {
    const { query, category, brand, gender, style } = args;
    let results = products;

    if (category) results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (brand) results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    if (gender) results = results.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    if (style) results = results.filter(p => p.style.toLowerCase() === style.toLowerCase());
    if (query) {
        const lowerQuery = query.toLowerCase();
        results = results.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) ||
            p.desc.toLowerCase().includes(lowerQuery) ||
            p.longDescription.toLowerCase().includes(lowerQuery)
        );
    }
    return results.slice(0, 3); // Return max 3 results
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat.current) return;

    const userMessageText = input;
    const userMessage: Message = { sender: 'user', text: userMessageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response = await chat.current.sendMessage({ message: userMessageText });
      const functionCalls = response.functionCalls;

      if (functionCalls && functionCalls.length > 0) {
        const fc = functionCalls[0];
        const foundProducts = performProductSearch(fc.args);
        
        response = await chat.current.sendMessage({
          functionResponses: {
            id: fc.id,
            name: fc.name,
            response: { products: foundProducts.map(p => ({ name: p.name, brand: p.brand })) },
          },
        });
        
        const aiMessage: Message = { 
            sender: 'ai', 
            text: response.text,
            products: foundProducts
        };
        setMessages(prev => [...prev, aiMessage]);

      } else {
        const aiMessage: Message = { sender: 'ai', text: response.text };
        setMessages(prev => [...prev, aiMessage]);
      }

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = { sender: 'ai', text: "Desculpe, estou com problemas para me conectar no momento. Por favor, tente novamente mais tarde." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (product: Product) => {
    onNavigate('productDetail', product);
    setIsOpen(false);
  }

  return (
    <>
      <div className={`fixed bottom-24 left-4 sm:left-6 z-50 w-[calc(100%-2rem)] sm:w-96 h-[60vh] bg-gray-100 dark:bg-[#181818] rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="font-bold text-lg text-black dark:text-white">Assistente de IA</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div ref={chatBodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-yellow text-black' : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-2 border-t border-gray-400/50 pt-2">
                        {msg.products.map(product => (
                            <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50">
                                <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-md" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-black dark:text-white">{product.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-300">R$ {product.price.toFixed(2)}</p>
                                </div>
                                <button 
                                    onClick={() => handleProductClick(product)}
                                    className="bg-brand-yellow text-black text-xs font-semibold py-1.5 px-3 rounded-full hover:bg-yellow-300 transition-colors"
                                >
                                    Ver
                                </button>
                            </div>
                        ))}
                    </div>
                )}
              </div>
            </div>
          ))}
           {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-gray-300 dark:bg-gray-700 text-black dark:text-white">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-gray-200 dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-2 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              disabled={isLoading}
            />
            <button type="submit" className="bg-brand-yellow text-black p-3 rounded-full hover:bg-yellow-300 disabled:bg-gray-600 transition-colors duration-300" disabled={isLoading || !input.trim()}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-yellow hover:bg-yellow-300 text-black rounded-full p-4 shadow-lg transition-transform duration-300 hover:scale-110 inline-block"
          aria-label="Abrir Assistente de IA"
        >
          <AiAssistantIcon className="w-8 h-8" />
        </button>
      </div>
    </>
  );
};

export default AiAssistant;