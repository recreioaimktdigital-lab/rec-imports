
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
  stock: number;
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
  };
}

export interface Filters {
  category: string;
  brand: string[];
  gender: string[];
  style: string[];
  query: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tênis Nike Revolution 6",
    category: "Tênis",
    brand: "Nike",
    gender: "Masculino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800", // Side
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800", // Angle
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800"  // Lifestyle
    ],
    desc: "Conforto e amortecimento para sua corrida diária.",
    price: 349.90,
    stock: 15,
    longDescription: "O Nike Revolution 6 Next Nature tem um design simples, mas muito confortável. Feito com pelo menos 20% de conteúdo reciclado por peso, ele é ideal para corridas e uso casual.",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Preto", "Branco", "Azul"],
    rating: 4.5,
    reviews: [
      { author: "João S.", rating: 5, comment: "Excelente tênis, muito leve!" },
      { author: "Maria O.", rating: 4, comment: "Bom custo benefício." }
    ]
  },
  {
    id: 2,
    name: "Camiseta Adidas Essentials",
    category: "Roupas",
    brand: "Adidas",
    gender: "Feminino",
    style: "Casual",
    image: "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/13847596/pexels-photo-13847596.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6311687/pexels-photo-6311687.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estilo clássico para o dia a dia.",
    price: 129.90,
    stock: 50,
    longDescription: "Uma camiseta básica com o logo clássico da Adidas. Feita de algodão macio para conforto durante todo o dia.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Rosa"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 3,
    name: "Tênis Puma RS-X",
    category: "Tênis",
    brand: "Puma",
    gender: "Unissex",
    style: "Urbano",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    gallery: [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Design retro-futurista com muito conforto.",
    price: 599.90,
    stock: 8,
    longDescription: "A família RS de tênis de corrida dos anos 80 foi uma das primeiras a focar nos aspectos técnicos da corrida, além da estética. O RS-X traz essa herança com um volume exagerado.",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Colorido", "Preto"],
    rating: 4.9,
    reviews: [
        { author: "Carlos M.", rating: 5, comment: "Estiloso demais!" }
    ]
  },
  {
    id: 4,
    name: "Shorts Nike Dri-FIT",
    category: "Roupas",
    brand: "Nike",
    gender: "Masculino",
    style: "Academia",
    image: "https://images.pexels.com/photos/16335133/pexels-photo-16335133.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/16335133/pexels-photo-16335133.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Tecnologia que afasta o suor.",
    price: 149.90,
    stock: 30,
    longDescription: "Os shorts Nike Dri-FIT mantêm você seco e confortável durante o treino. O tecido leve e elástico permite total liberdade de movimentos.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza"],
    rating: 4.6,
    reviews: []
  },
  {
    id: 11,
    name: "Bola de Basquete Wilson NBA",
    category: "Artigos Esportivos",
    brand: "Wilson",
    gender: "Unissex",
    style: "Basquete",
    image: "https://images.pexels.com/photos/3558072/pexels-photo-3558072.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/3558072/pexels-photo-3558072.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "A bola oficial da NBA.",
    price: 299.90,
    stock: 20,
    longDescription: "Sinta-se como um profissional com a bola de basquete oficial da NBA. Grip superior e durabilidade incrível para quadras internas e externas.",
    sizes: ["Tamanho 7"],
    colors: ["Laranja"],
    rating: 5.0,
    reviews: [
        { author: "Pedro H.", rating: 5, comment: "Melhor bola que já tive." }
    ]
  },
  {
    id: 5,
    name: "Top Fitness Asics",
    category: "Roupas",
    brand: "Asics",
    gender: "Feminino",
    style: "Academia",
    image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Suporte e conforto para seus treinos.",
    price: 89.90,
    stock: 25,
    longDescription: "Top nadador com tecido de compressão que oferece suporte médio. Ideal para academia, yoga e corridas leves.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Roxo"],
    rating: 4.4,
    reviews: []
  },
  {
    id: 6,
    name: "Mochila Esportiva Puma",
    category: "Artigos Esportivos",
    brand: "Puma",
    gender: "Unissex",
    style: "Casual",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1546938576-88b90ad84433?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581605405669-fdaf81172485?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Espaço e praticidade para o dia a dia.",
    price: 199.90,
    stock: 12,
    longDescription: "Mochila resistente com compartimento para notebook e bolsos laterais. Design moderno e alças acolchoadas.",
    sizes: ["Único"],
    colors: ["Preto", "Azul Marinho"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 7,
    name: "Tênis New Balance 574",
    category: "Tênis",
    brand: "New Balance",
    gender: "Masculino",
    style: "Casual",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Um ícone de estilo e conforto.",
    price: 499.90,
    stock: 18,
    longDescription: "O 574 foi construído para ser um tênis confiável para muitas coisas diferentes. Com linhas limpas e clássicas, ele faz uma declaração de estilo todos os dias.",
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Cinza", "Azul"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 8,
    name: "Whey Protein Gold Standard",
    category: "Suplementos",
    brand: "Optimum Nutrition",
    gender: "Unissex",
    style: "Academia",
    image: "https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/8844884/pexels-photo-8844884.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Proteína isolada de alta qualidade.",
    price: 249.90,
    stock: 40,
    longDescription: "O Whey Protein mais vendido do mundo. 24g de proteína por porção para ajudar na construção muscular.",
    sizes: ["900g"],
    colors: ["Chocolate", "Baunilha", "Morango"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 9,
    name: "Joelheira Ortopédica",
    category: "Fisio e Ortopédico",
    brand: "Hidrolight",
    gender: "Unissex",
    style: "Ortopédico",
    image: "https://images.pexels.com/photos/7298642/pexels-photo-7298642.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/7298642/pexels-photo-7298642.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/8313222/pexels-photo-8313222.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7298418/pexels-photo-7298418.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estabilidade e segurança para o joelho.",
    price: 69.90,
    stock: 100,
    longDescription: "Proporciona compressão e maior estabilidade na região do joelho. Retém o calor devido ao material em neoprene, auxiliando no alívio da dor.",
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    rating: 4.3,
    reviews: []
  },
  {
    id: 10,
    name: "Biquíni Ripple",
    category: "Moda Praia",
    brand: "Recreio Beach",
    gender: "Feminino",
    style: "Casual",
    image: "https://images.pexels.com/photos/3358966/pexels-photo-3358966.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/3358966/pexels-photo-3358966.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4056501/pexels-photo-4056501.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3775133/pexels-photo-3775133.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Charme e conforto para o verão.",
    price: 159.90,
    stock: 22,
    longDescription: "Biquíni modelo ripple com empina bumbum. Tecido com proteção UV50+.",
    sizes: ["P", "M", "G"],
    colors: ["Estampado", "Preto"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 12,
    name: "Regata de Basquete Pro",
    category: "Roupas",
    brand: "Nike",
    gender: "Masculino",
    style: "Basquete",
    image: "https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/16035255/pexels-photo-16035255.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2277981/pexels-photo-2277981.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Uniforme oficial para máxima performance.",
    price: 189.90,
    stock: 30,
    longDescription: "Regata de basquete com tecido respirável e corte atlético. Perfeita para jogos intensos ou visual urbano inspirado nas quadras.",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Vermelho", "Preto", "Branco"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 13,
    name: "Sunga de Praia Clássica",
    category: "Moda Praia",
    brand: "Adidas",
    gender: "Masculino",
    style: "Casual",
    image: "https://images.pexels.com/photos/8771038/pexels-photo-8771038.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/8771038/pexels-photo-8771038.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/13596564/pexels-photo-13596564.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/13596566/pexels-photo-13596566.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Durabilidade e conforto na areia ou na água.",
    price: 99.90,
    stock: 45,
    longDescription: "Sunga clássica com cordão interno para ajuste seguro. Tecido resistente ao cloro e secagem rápida.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Azul Marinho", "Vermelho"],
    rating: 4.6,
    reviews: []
  },
  {
    id: 14,
    name: "Canga Saída de Praia",
    category: "Moda Praia",
    brand: "Recreio Beach",
    gender: "Feminino",
    style: "Casual",
    image: "https://images.pexels.com/photos/3222397/pexels-photo-3222397.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/3222397/pexels-photo-3222397.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3306990/pexels-photo-3306990.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3306978/pexels-photo-3306978.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Elegância e versatilidade para o verão.",
    price: 79.90,
    stock: 60,
    longDescription: "Canga leve e macia, perfeita para usar como saída de praia ou estender na areia. Estampas vibrantes que combinam com o verão.",
    sizes: ["Único"],
    colors: ["Tropical", "Azul Mar", "Branco Renda"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 15,
    name: "Tênis Adidas Ultraboost Light",
    category: "Tênis",
    brand: "Adidas",
    gender: "Unissex",
    style: "Corrida",
    image: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Retorno de energia incrível.",
    price: 999.90,
    stock: 20,
    longDescription: "Sinta a energia épica do novo Ultraboost Light, nosso Ultraboost mais leve de todos os tempos. A mágica está na entressola Light BOOST, uma nova geração do adidas BOOST.",
    sizes: ["39", "40", "41", "42"],
    colors: ["Preto/Branco", "Azul/Laranja"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 16,
    name: "Jaqueta Puma Iconic T7",
    category: "Roupas",
    brand: "Puma",
    gender: "Masculino",
    style: "Urbano",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3755448/pexels-photo-3755448.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Clássico das ruas desde os anos 70.",
    price: 349.90,
    stock: 15,
    longDescription: "A jaqueta T7 saiu das pistas de corrida para se tornar um ícone urbano. Com as listras clássicas nas mangas, ela oferece estilo retrô com conforto moderno.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Vermelho"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 17,
    name: "Tênis New Balance 327",
    category: "Tênis",
    brand: "New Balance",
    gender: "Feminino",
    style: "Urbano",
    image: "https://images.pexels.com/photos/6050919/pexels-photo-6050919.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/6050919/pexels-photo-6050919.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6050926/pexels-photo-6050926.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estilo heritage dos anos 70 recriado.",
    price: 699.90,
    stock: 25,
    longDescription: "O 327 lança uma nova luz sobre os anos 70 como uma época de inovação, remodelando elementos de design clássicos com uma visão totalmente contemporânea.",
    sizes: ["35", "36", "37", "38"],
    colors: ["Beige", "Preto/Branco"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 18,
    name: "Moletom New Balance Essentials",
    category: "Roupas",
    brand: "New Balance",
    gender: "Masculino",
    style: "Casual",
    image: "https://images.pexels.com/photos/6311613/pexels-photo-6311613.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/6311613/pexels-photo-6311613.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6311612/pexels-photo-6311612.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Conforto essencial com logo clássico.",
    price: 299.90,
    stock: 40,
    longDescription: "Inspirado na herança da New Balance, este moletom com capuz apresenta um logo empilhado no peito. Feito de tecido french terry macio.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Cinza Mescla", "Azul Marinho"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 19,
    name: "Tênis Asics Gel-Nimbus 25",
    category: "Tênis",
    brand: "Asics",
    gender: "Masculino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "O tênis de corrida mais confortável.",
    price: 1199.90,
    stock: 10,
    longDescription: "A tecnologia PureGEL™ melhora a absorção de impacto e cria uma sensação mais suave ao aterrissar. O novo cabedal em malha oferece respirabilidade superior.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Azul/Verde", "Preto"],
    rating: 5.0,
    reviews: []
  },
  {
    id: 20,
    name: "Shorts Asics Running 2-in-1",
    category: "Roupas",
    brand: "Asics",
    gender: "Masculino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Shorts com compressão interna.",
    price: 189.90,
    stock: 30,
    longDescription: "Shorts leve com bermuda de compressão interna para evitar atrito. Possui bolso traseiro seguro para chaves ou gel.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Cinza"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 21,
    name: "Raquete de Tênis Wilson Pro Staff",
    category: "Artigos Esportivos",
    brand: "Wilson",
    gender: "Unissex",
    style: "Performance",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/5730297/pexels-photo-5730297.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Precisão máxima para jogadores avançados.",
    price: 1499.90,
    stock: 5,
    longDescription: "A escolha das lendas. A Pro Staff oferece uma sensação clássica com precisão inigualável, ideal para jogadores que atacam a bola.",
    sizes: ["L3", "L4"],
    colors: ["Preto"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 22,
    name: "Munhequeira Esportiva Wilson",
    category: "Artigos Esportivos",
    brand: "Wilson",
    gender: "Unissex",
    style: "Performance",
    image: "https://images.pexels.com/photos/5730297/pexels-photo-5730297.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/5730297/pexels-photo-5730297.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Absorção de suor durante o jogo.",
    price: 39.90,
    stock: 100,
    longDescription: "Pacote com 2 munhequeiras de algodão atoalhado. Excelente absorção para manter suas mãos secas durante partidas intensas.",
    sizes: ["Único"],
    colors: ["Branco", "Vermelho"],
    rating: 4.5,
    reviews: []
  },
  {
    id: 23,
    name: "Chapéu de Praia UV Protection",
    category: "Moda Praia",
    brand: "Recreio Beach",
    gender: "Feminino",
    style: "Casual",
    image: "https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3222397/pexels-photo-3222397.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Proteção solar com estilo.",
    price: 89.90,
    stock: 40,
    longDescription: "Chapéu de aba larga com proteção UV50+. Ideal para longos dias na praia ou piscina, combinando proteção com elegância.",
    sizes: ["Único"],
    colors: ["Palha Natural", "Preto"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 24,
    name: "Tênis Nike LeBron XX",
    category: "Tênis",
    brand: "Nike",
    gender: "Unissex",
    style: "Basquete",
    image: "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "A nova geração de velocidade para as quadras.",
    price: 1299.90,
    stock: 8,
    longDescription: "O LeBron XX é o tênis mais leve da linha LeBron até hoje. Projetado para a próxima geração de jogadores, oferece suporte ágil e amortecimento explosivo.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Roxo/Dourado", "Preto/Vermelho"],
    rating: 5.0,
    reviews: []
  },
  {
      id: 25,
      name: "Tornozeleira de Compressão",
      category: "Fisio e Ortopédico",
      brand: "Hidrolight",
      gender: "Unissex",
      style: "Ortopédico",
      image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
          "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/7298642/pexels-photo-7298642.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/8313222/pexels-photo-8313222.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      desc: "Proteção e estabilidade para o tornozelo.",
      price: 49.90,
      stock: 50,
      longDescription: "Ideal para prevenção de lesões durante a prática de esportes. Compressão ajustável que não limita os movimentos.",
      sizes: ["P", "M", "G"],
      colors: ["Preto"],
      rating: 4.6,
      reviews: []
  },
  {
      id: 26,
      name: "Faixa Elástica de Resistência",
      category: "Fisio e Ortopédico",
      brand: "Hidrolight",
      gender: "Unissex",
      style: "Ortopédico",
      image: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
          "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      desc: "Para fortalecimento e reabilitação.",
      price: 39.90,
      stock: 80,
      longDescription: "Kit com 3 faixas elásticas de diferentes intensidades (Leve, Média, Forte). Perfeito para fisioterapia, yoga e pilates.",
      sizes: ["Único"],
      colors: ["Multicolorido"],
      rating: 4.8,
      reviews: []
  },
  {
      id: 27,
      name: "Creatina Monohidratada",
      category: "Suplementos",
      brand: "Optimum Nutrition",
      gender: "Unissex",
      style: "Academia",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
          "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/8844888/pexels-photo-8844888.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      desc: "Força e explosão muscular.",
      price: 129.90,
      stock: 60,
      longDescription: "Creatina pura para aumento de força e desempenho em exercícios de alta intensidade.",
      sizes: ["300g"],
      colors: ["Sem Sabor"],
      rating: 4.9,
      reviews: []
  },
  {
      id: 28,
      name: "BCAA 1000 Caps",
      category: "Suplementos",
      brand: "Optimum Nutrition",
      gender: "Unissex",
      style: "Academia",
      image: "https://images.pexels.com/photos/8844884/pexels-photo-8844884.jpeg?auto=compress&cs=tinysrgb&w=800",
      gallery: [
          "https://images.pexels.com/photos/8844884/pexels-photo-8844884.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/3927389/pexels-photo-3927389.jpeg?auto=compress&cs=tinysrgb&w=800",
          "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800"
      ],
      desc: "Recuperação muscular essencial.",
      price: 99.90,
      stock: 40,
      longDescription: "Aminoácidos de cadeia ramificada para auxiliar na recuperação muscular e evitar o catabolismo.",
      sizes: ["200 Caps"],
      colors: ["Sem Sabor"],
      rating: 4.5,
      reviews: []
  },
  {
    id: 29,
    name: "Meias de Compressão Performance",
    category: "Artigos Esportivos",
    brand: "Wilson",
    gender: "Unissex",
    style: "Performance",
    image: "https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4498576/pexels-photo-4498576.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Melhora a circulação e reduz fadiga.",
    price: 59.90,
    stock: 50,
    longDescription: "Meias de alta compressão ideais para recuperação pós-treino ou durante atividades de longa duração. Tecido respirável.",
    sizes: ["39-43"],
    colors: ["Branco", "Preto"],
    rating: 4.6,
    reviews: []
  },
  {
    id: 30,
    name: "Tênis Nike Revolution 6 Infantil",
    category: "Tênis",
    brand: "Nike",
    gender: "Kids",
    style: "Corrida",
    image: "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Conforto para os pequenos atletas.",
    price: 229.90,
    stock: 30,
    longDescription: "Versão infantil do clássico Revolution 6. Fechamento em velcro para facilitar o calce e solado flexível.",
    sizes: ["28", "30", "32"],
    colors: ["Rosa", "Azul", "Preto"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 31,
    name: "Conjunto Adidas Essentials Kids",
    category: "Roupas",
    brand: "Adidas",
    gender: "Kids",
    style: "Casual",
    image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3662952/pexels-photo-3662952.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estilo icônico desde cedo.",
    price: 199.90,
    stock: 25,
    longDescription: "Conjunto de jaqueta e calça com as três listras clássicas. Confortável e durável para brincar o dia todo.",
    sizes: ["4 anos", "6 anos", "8 anos"],
    colors: ["Preto", "Azul Marinho"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 32,
    name: "Tênis Puma Smash v2 Kids",
    category: "Tênis",
    brand: "Puma",
    gender: "Kids",
    style: "Urbano",
    image: "https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estilo casual para a escola e lazer.",
    price: 179.90,
    stock: 20,
    longDescription: "Tênis casual com cabedal em camurça sintética e solado de borracha. Durável e fácil de limpar.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Preto", "Azul"],
    rating: 4.6,
    reviews: []
  },
  {
    id: 33,
    name: "Tênis Asics Gel-Lyte III",
    category: "Tênis",
    brand: "Asics",
    gender: "Unissex",
    style: "Urbano",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6050919/pexels-photo-6050919.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Clássico streetwear da Asics.",
    price: 599.90,
    stock: 12,
    longDescription: "O Gel-Lyte III é um ícone com sua língua dividida e amortecimento Gel. Perfeito para compor um visual urbano autêntico.",
    sizes: ["39", "40", "41", "42"],
    colors: ["Branco/Preto"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 34,
    name: "Camiseta New Balance Logo",
    category: "Roupas",
    brand: "New Balance",
    gender: "Masculino",
    style: "Casual",
    image: "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6311613/pexels-photo-6311613.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Básica e confortável.",
    price: 99.90,
    stock: 40,
    longDescription: "Camiseta de algodão macio com o logo NB estampado. Ideal para uso diário.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Cinza", "Azul"],
    rating: 4.5,
    reviews: []
  },
  {
    id: 35,
    name: "Mochila Adidas Power",
    category: "Artigos Esportivos",
    brand: "Adidas",
    gender: "Unissex",
    style: "Casual",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    gallery: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.unsplash.com/photo-1546938576-88b90ad84433?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Durabilidade para carregar tudo.",
    price: 229.90,
    stock: 25,
    longDescription: "Mochila robusta com alças de compressão e espaço para laptop. Perfeita para escola ou academia.",
    sizes: ["Único"],
    colors: ["Preto/Branco"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 36,
    name: "Camiseta Nike Pro",
    category: "Roupas",
    brand: "Nike",
    gender: "Masculino",
    style: "Performance",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Ajuste firme e respirabilidade.",
    price: 159.90,
    stock: 35,
    longDescription: "Camiseta de compressão que oferece suporte muscular e rápida evaporação do suor. Ideal como segunda pele.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Cinza"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 37,
    name: "Tubo de Bolas Wilson US Open",
    category: "Artigos Esportivos",
    brand: "Wilson",
    gender: "Unissex",
    style: "Performance",
    image: "https://images.pexels.com/photos/5730297/pexels-photo-5730297.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/5730297/pexels-photo-5730297.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1432039/pexels-photo-1432039.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "A bola oficial do Grand Slam.",
    price: 59.90,
    stock: 100,
    longDescription: "Tubo com 3 bolas de tênis de alta performance. Durabilidade e consistência para todos os tipos de quadra.",
    sizes: ["Único"],
    colors: ["Amarelo"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 38,
    name: "Legging Adidas Essentials",
    category: "Roupas",
    brand: "Adidas",
    gender: "Feminino",
    style: "Academia",
    image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4167542/pexels-photo-4167542.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Conforto elástico para seus movimentos.",
    price: 149.90,
    stock: 40,
    longDescription: "Legging de cintura média com as três listras laterais. Tecido macio e flexível para yoga ou treino.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Azul Marinho"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 39,
    name: "Boné Puma Running",
    category: "Artigos Esportivos",
    brand: "Puma",
    gender: "Unissex",
    style: "Corrida",
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Leve e respirável.",
    price: 79.90,
    stock: 30,
    longDescription: "Boné técnico para corrida com tecido que absorve o suor e detalhes refletivos para segurança noturna.",
    sizes: ["Único"],
    colors: ["Branco", "Preto"],
    rating: 4.6,
    reviews: []
  },
  {
    id: 40,
    name: "Tênis New Balance Fresh Foam",
    category: "Tênis",
    brand: "New Balance",
    gender: "Feminino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/6050926/pexels-photo-6050926.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/6050926/pexels-photo-6050926.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/6050919/pexels-photo-6050919.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Amortecimento premium para longas distâncias.",
    price: 899.90,
    stock: 15,
    longDescription: "A tecnologia Fresh Foam X oferece nossa experiência de amortecimento mais suave. Ideal para maratonas ou treinos diários.",
    sizes: ["35", "36", "37", "38"],
    colors: ["Roxo", "Preto"],
    rating: 5.0,
    reviews: []
  },
  {
    id: 41,
    name: "Viseira Asics",
    category: "Artigos Esportivos",
    brand: "Asics",
    gender: "Unissex",
    style: "Corrida",
    image: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Proteção contra o sol e suor.",
    price: 59.90,
    stock: 50,
    longDescription: "Viseira leve com fecho ajustável. Mantém o suor longe dos olhos durante a corrida.",
    sizes: ["Único"],
    colors: ["Branco", "Azul"],
    rating: 4.5,
    reviews: []
  },
  {
    id: 42,
    name: "Cotoveleira Elástica",
    category: "Fisio e Ortopédico",
    brand: "Hidrolight",
    gender: "Unissex",
    style: "Ortopédico",
    image: "https://images.pexels.com/photos/7298642/pexels-photo-7298642.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/7298642/pexels-photo-7298642.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/7298418/pexels-photo-7298418.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Suporte e prevenção de lesões.",
    price: 35.90,
    stock: 60,
    longDescription: "Cotoveleira elástica confortável para proteção durante a prática esportiva ou recuperação de tendinites.",
    sizes: ["P", "M", "G"],
    colors: ["Preto"],
    rating: 4.4,
    reviews: []
  },
  {
    id: 43,
    name: "Bolsa de Praia Impermeável",
    category: "Moda Praia",
    brand: "Recreio Beach",
    gender: "Feminino",
    style: "Casual",
    image: "https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1154619/pexels-photo-1154619.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3358966/pexels-photo-3358966.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3306990/pexels-photo-3306990.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Espaçosa e resistente para o verão.",
    price: 119.90,
    stock: 30,
    longDescription: "Bolsa grande com forro impermeável, ideal para levar toalhas, protetor solar e acessórios para a praia ou piscina.",
    sizes: ["Único"],
    colors: ["Transparente/Neon", "Estampada"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 44,
    name: "Camiseta Térmica Manga Longa",
    category: "Roupas",
    brand: "Nike",
    gender: "Masculino",
    style: "Performance",
    image: "https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4167544/pexels-photo-4167544.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Mantém a temperatura corporal ideal.",
    price: 129.90,
    stock: 20,
    longDescription: "Camiseta térmica ideal para treinos em dias frios. Tecido que mantém o calor e afasta o suor.",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco"],
    rating: 4.7,
    reviews: []
  },
  {
    id: 45,
    name: "Shorts de Compressão Techfit",
    category: "Roupas",
    brand: "Adidas",
    gender: "Masculino",
    style: "Performance",
    image: "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/16335133/pexels-photo-16335133.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Suporte muscular para treinos intensos.",
    price: 119.90,
    stock: 25,
    longDescription: "Shorts de compressão que oferece suporte aos músculos da coxa, reduzindo a vibração muscular e a fadiga.",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Azul"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 46,
    name: "Tênis Kids Flex Runner",
    category: "Tênis",
    brand: "Nike",
    gender: "Kids",
    style: "Corrida",
    image: "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Flexibilidade para brincar o dia todo.",
    price: 249.90,
    stock: 15,
    longDescription: "Tênis sem cadarço, fácil de calçar e tirar. Solado flexível que acompanha o movimento natural dos pés.",
    sizes: ["28", "29", "30", "31", "32"],
    colors: ["Preto/Branco", "Azul"],
    rating: 4.8,
    reviews: []
  },
  {
    id: 47,
    name: "Conjunto Moletom Infantil",
    category: "Roupas",
    brand: "Puma",
    gender: "Kids",
    style: "Casual",
    image: "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
        "https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/3662952/pexels-photo-3662952.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Conforto e estilo para os pequenos.",
    price: 189.90,
    stock: 20,
    longDescription: "Conjunto de moletom macio e quentinho. Perfeito para os dias mais frios com muito estilo.",
    sizes: ["4", "6", "8", "10"],
    colors: ["Cinza/Rosa", "Azul/Preto"],
    rating: 4.7,
    reviews: []
  }
];
