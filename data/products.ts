// --- START OF EXPANDED PRODUCT DATA ---
export const products = [
  // Tênis
  { id: 1, name: 'Nike Air Zoom Pegasus', category: 'Tênis', brand: 'Nike', gender: 'Masculino', style: 'Corrida', image: 'https://picsum.photos/600/800?random=11', gallery: ['https://picsum.photos/600/800?random=11', 'https://picsum.photos/600/800?random=21'], desc: 'Velocidade e Conforto', price: 799.99, longDescription: 'O Nike Air Zoom Pegasus é seu parceiro de confiança para corridas diárias, oferecendo amortecimento responsivo.', sizes: ['39', '40', '41', '42', '43'], colors: ['Preto', 'Branco'], rating: 4.8, reviews: [{ author: 'Carlos S.', rating: 5, comment: 'Excelente para corridas longas, muito confortável.' }, { author: 'Mariana P.', rating: 4, comment: 'Leve e responsivo, mas a forma é um pouco estreita.' }] },
  { id: 2, name: 'Adidas Ultraboost', category: 'Tênis', brand: 'Adidas', gender: 'Feminino', style: 'Corrida', image: 'https://picsum.photos/600/800?random=12', gallery: ['https://picsum.photos/600/800?random=12'], desc: 'Energia sem Fim', price: 899.99, longDescription: 'Sinta o retorno de energia incrível a cada passo com o amortecimento Boost.', sizes: ['35', '36', '37', '38'], colors: ['Rosa', 'Cinza'], rating: 4.9, reviews: [{ author: 'Juliana R.', rating: 5, comment: 'O melhor tênis que já tive! Parece que estou pisando nas nuvens.' }] },
  { id: 3, name: 'Puma RS-X', category: 'Tênis', brand: 'Puma', gender: 'Masculino', style: 'Casual', image: 'https://picsum.photos/600/800?random=13', gallery: ['https://picsum.photos/600/800?random=13'], desc: 'Estilo Retrô-futurista', price: 549.99, longDescription: 'Design arrojado que combina o melhor do estilo retrô com a tecnologia moderna.', sizes: ['40', '41', '42'], colors: ['Colorido', 'Preto'], rating: 4.5, reviews: [] },
  { id: 4, name: 'New Balance 574', category: 'Tênis', brand: 'New Balance', gender: 'Feminino', style: 'Casual', image: 'https://picsum.photos/600/800?random=14', gallery: ['https://picsum.photos/600/800?random=14'], desc: 'Clássico e Versátil', price: 499.99, longDescription: 'Um ícone de estilo que oferece conforto para o dia a dia.', sizes: ['36', '37', '38'], colors: ['Cinza', 'Azul Marinho'], rating: 4.7, reviews: [] },
  { id: 25, name: 'Asics Gel-Kayano', category: 'Tênis', brand: 'Asics', gender: 'Masculino', style: 'Performance', image: 'https://picsum.photos/600/800?random=51', gallery: ['https://picsum.photos/600/800?random=51'], desc: 'Estabilidade Superior', price: 999.99, longDescription: 'Ideal para corredores que buscam estabilidade e conforto em longas distâncias.', sizes: ['41', '42', '43'], colors: ['Azul', 'Verde'], rating: 4.9, reviews: [] },


  // Roupas
  { id: 5, name: 'Camiseta Nike Dri-FIT', category: 'Roupas', brand: 'Nike', gender: 'Masculino', style: 'Academia', image: 'https://picsum.photos/600/800?random=15', gallery: ['https://picsum.photos/600/800?random=15'], desc: 'Mantenha-se Seco', price: 149.99, longDescription: 'Tecido que absorve o suor para manter você seco e confortável durante o treino.', sizes: ['P', 'M', 'G', 'GG'], colors: ['Preto', 'Branco'], rating: 4.6, reviews: [] },
  { id: 6, name: 'Legging Adidas Essentials', category: 'Roupas', brand: 'Adidas', gender: 'Feminino', style: 'Academia', image: 'https://picsum.photos/600/800?random=16', gallery: ['https://picsum.photos/600/800?random=16'], desc: 'Conforto e Flexibilidade', price: 199.99, longDescription: 'Ajuste perfeito e tecido elástico para total liberdade de movimentos.', sizes: ['P', 'M', 'G'], colors: ['Preto', 'Roxo'], rating: 4.7, reviews: [] },

  // Moda Praia
  { id: 7, name: 'Bermuda de Surf Quiksilver', category: 'Moda Praia', brand: 'Outras', gender: 'Masculino', style: 'Casual', image: 'https://picsum.photos/600/800?random=17', gallery: ['https://picsum.photos/600/800?random=17'], desc: 'Flexibilidade nas Ondas', price: 299.99, longDescription: 'Tecido de secagem rápida e alta elasticidade para performance no surf.', sizes: ['38', '40', '42', '44'], colors: ['Estampado', 'Azul'], rating: 4.8, reviews: [] },
  { id: 8, name: 'Biquíni Cortininha Roxy', category: 'Moda Praia', brand: 'Outras', gender: 'Feminino', style: 'Casual', image: 'https://picsum.photos/600/800?random=18', gallery: ['https://picsum.photos/600/800?random=18'], desc: 'Estilo Clássico de Praia', price: 249.99, longDescription: 'Design clássico e ajustável para um bronzeado perfeito.', sizes: ['P', 'M', 'G'], colors: ['Rosa', 'Verde Água'], rating: 4.5, reviews: [] },

  // Life Style
  { id: 9, name: 'Moletom Adidas Originals', category: 'Life Style', brand: 'Adidas', gender: 'Kids', style: 'Casual', image: 'https://picsum.photos/600/800?random=19', gallery: ['https://picsum.photos/600/800?random=19'], desc: 'Conforto para Crianças', price: 279.99, longDescription: 'Moletom clássico com o logo Trefoil, garantindo estilo e conforto para os pequenos.', sizes: ['4A', '6A', '8A'], colors: ['Cinza', 'Azul'], rating: 5.0, reviews: [] },
  { id: 10, name: 'Jaqueta Corta-vento Nike', category: 'Life Style', brand: 'Nike', gender: 'Masculino', style: 'Performance', image: 'https://picsum.photos/600/800?random=20', gallery: ['https://picsum.photos/600/800?random=20'], desc: 'Proteção e Leveza', price: 349.99, longDescription: 'Leve e resistente à água, perfeita para corridas em dias de vento ou garoa.', sizes: ['P', 'M', 'G'], colors: ['Preto', 'Vermelho'], rating: 4.7, reviews: [] },

  // Artigos Esportivos
  { id: 11, name: 'Bola de Basquete Spalding', category: 'Artigos Esportivos', brand: 'Outras', gender: 'Unissex', style: 'Basquete', image: 'https://picsum.photos/600/800?random=22', gallery: ['https://picsum.photos/600/800?random=22'], desc: 'Qualidade Profissional', price: 259.99, longDescription: 'Bola oficial com excelente aderência e durabilidade, para jogos indoor e outdoor.', sizes: ['7'], colors: ['Laranja'], rating: 4.9, reviews: [] },
  { id: 12, name: 'Corda de Pular de Velocidade', category: 'Artigos Esportivos', brand: 'Outras', gender: 'Unissex', style: 'Academia', image: 'https://picsum.photos/600/800?random=23', gallery: ['https://picsum.photos/600/800?random=23'], desc: 'Cardio Intenso', price: 89.99, longDescription: 'Corda de aço revestida com rolamentos de alta velocidade para treinos de cardio.', sizes: ['Ajustável'], colors: ['Preto'], rating: 4.6, reviews: [] },

  // Suplementos
  { id: 13, name: 'Whey Protein Isolado (900g)', category: 'Suplementos', brand: 'Outras', gender: 'Unissex', style: 'Performance', image: 'https://picsum.photos/600/800?random=24', gallery: ['https://picsum.photos/600/800?random=24'], desc: 'Recuperação Muscular', price: 299.99, longDescription: 'Proteína de alta qualidade para auxiliar na recuperação e no ganho de massa muscular.', sizes: ['Único'], colors: ['Baunilha', 'Chocolate'], rating: 4.8, reviews: [] },
  { id: 14, name: 'Creatina Monohidratada (300g)', category: 'Suplementos', brand: 'Outras', gender: 'Unissex', style: 'Performance', image: 'https://picsum.photos/600/800?random=25', gallery: ['https://picsum.photos/600/800?random=25'], desc: 'Força e Explosão', price: 99.99, longDescription: 'Aumente sua força e performance nos treinos com a creatina de maior pureza.', sizes: ['Único'], colors: ['Sem Sabor'], rating: 4.9, reviews: [] },
  
  // Fisio e Ortopédico
  { id: 15, name: 'Rolo de Liberação Miofascial', category: 'Fisio e Ortopédico', brand: 'Outras', gender: 'Unissex', style: 'Ortopédico', image: 'https://picsum.photos/600/800?random=26', gallery: ['https://picsum.photos/600/800?random=26'], desc: 'Alívio e Recuperação', price: 129.99, longDescription: 'Ideal para massagem e liberação de pontos de tensão muscular após os treinos.', sizes: ['Único'], colors: ['Preto', 'Azul'], rating: 4.7, reviews: [] },
  { id: 16, name: 'Joelheira de Compressão', category: 'Fisio e Ortopédico', brand: 'Outras', gender: 'Unissex', style: 'Ortopédico', image: 'https://picsum.photos/600/800?random=27', gallery: ['https://picsum.photos/600/800?random=27'], desc: 'Suporte e Estabilidade', price: 79.99, longDescription: 'Oferece suporte e compressão para o joelho durante atividades físicas, prevenindo lesões.', sizes: ['P', 'M', 'G'], colors: ['Preto'], rating: 4.5, reviews: [] },
];
// --- END OF EXPANDED PRODUCT DATA ---

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  gender: string;
  style: string;
  image: string;
  gallery: string[];
  desc: string;
  price: number;
  longDescription: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  cartItemId: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    customer: {
        name: string;
        email: string;
    }
}

export interface Filters {
  category: string;
  brand: string[];
  gender: string[];
  style: string[];
}
