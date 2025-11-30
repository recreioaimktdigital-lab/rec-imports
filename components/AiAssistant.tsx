
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { AiAssistantIcon, CloseIcon } from './Icons';
import { Product, Filters } from '../data/products';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  products?: Product[];
}

interface AiAssistantProps {
  products: Product[];
  onNavigate: (page: string, product?: Product, filters?: Partial<Filters>) => void;
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
    // Uses standard process.env to avoid TS errors with import.meta
    const apiKey = process.env.API_KEY;

    if (apiKey) {
        const ai = new GoogleGenAI({ apiKey: apiKey });
        chat.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Você é um assistente de compras amigável e experiente da Recreio Imports, uma loja de e-commerce especializada em roupas e calçados esportivos. Seja prestativo, conciso e incentive os usuários a explorar os produtos. Use a função `searchProducts` sempre que um usuário pedir para encontrar um produto. Responda em português brasileiro.",
            tools: [{ functionDeclarations: [searchProductsFunctionDeclaration] }],
        },
        });
    } else {
        console.warn("API Key is missing. AI features will not work.");
    }
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
            text: response.text || "Desculpe, não consegui encontrar uma resposta.",
            products: foundProducts
        };
        setMessages(prev => [...prev, aiMessage]);

      } else {
        const aiMessage: Message = { sender: 'ai', text: response.text || "Desculpe, não entendi." };
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
      <div className={`fixed bottom-28 left-4 md:left-6 z-[60] w-[calc(100%-2rem)] sm:w-96 h-[60vh] max-h-[600px] bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out origin-bottom-left ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-brand-yellow rounded-t-xl">
          <div className="flex items-center gap-2">
            <AiAssistantIcon className="w-6 h-6 text-black" />
            <h3 className="font-bold text-lg text-black">Recreio AI</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-black hover:bg-black/10 rounded-full p-1">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div ref={chatBodyRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-brand-yellow text-black rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-2 border-t border-gray-400/20 pt-2">
                        {msg.products.map(product => (
                            <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/60 dark:bg-black/40 hover:bg-white/80 dark:hover:bg-black/60 transition-colors cursor-pointer" onClick={() => handleProductClick(product)}>
                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" onContextMenu={(e) => e.preventDefault()} />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-xs text-black dark:text-white truncate">{product.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">R$ {product.price.toFixed(2)}</p>
                                </div>
                                <button 
                                    className="bg-brand-yellow text-black text-[10px] font-bold py-1 px-2 rounded-full hover:bg-yellow-300 transition-colors uppercase"
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
              <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-black/20 rounded-b-xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full px-4 py-3 rounded-full border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-yellow shadow-sm"
              disabled={isLoading}
            />
            <button type="submit" className="bg-brand-yellow text-black p-3 rounded-full hover:bg-yellow-300 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 flex-shrink-0 shadow-md" disabled={isLoading || !input.trim()}>
              <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </form>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black hover:bg-brand-yellow hover:text-black border-2 border-gray-300 rounded-full p-4 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Abrir Assistente de IA"
        >
          <AiAssistantIcon className="w-8 h-8 transition-colors" />
        </button>
      </div>
    </>
  );
};

export default AiAssistant;
