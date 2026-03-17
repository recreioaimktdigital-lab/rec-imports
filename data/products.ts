
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
  onSale?: boolean;
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
  category: string | string[];
  brand: string[];
  gender: string[];
  style: string[];
  query: string;
  onSale?: boolean;
}

export const products: Product[] = [
  // --- NIKE (Tênis & Suplementos) ---
  {
    id: 1,
    name: "Nike Air Max Pulse",
    category: "Tênis",
    brand: "Nike",
    gender: "Masculino",
    style: "Casual",
    image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1335463/pexels-photo-1335463.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Amortecimento premium e estilo urbano.",
    price: 899.90,
    stock: 10,
    longDescription: "Inspirado no ritmo de Londres, o Air Max Pulse traz um toque underground à linha Air Max.",
    sizes: ["39", "40", "41", "42"],
    colors: ["Preto", "Branco"],
    rating: 4.8,
    reviews: [],
    onSale: true
  },
  {
    id: 105,
    name: "Whey Protein Nike Isolate",
    category: "Suplementos",
    brand: "Nike",
    gender: "Unissex",
    style: "Performance",
    image: "https://images.pexels.com/photos/4165239/pexels-photo-4165239.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/4165239/pexels-photo-4165239.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4045558/pexels-photo-4045558.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Recuperação máxima para atletas.",
    price: 319.90,
    stock: 50,
    longDescription: "A proteína Nike Performance garante a melhor absorção do mercado.",
    sizes: ["900g"],
    colors: ["Chocolate", "Baunilha"],
    rating: 4.9,
    reviews: []
  },

  // --- ADIDAS (Tênis & Fisio) ---
  {
    id: 2,
    name: "Adidas Ultraboost Light",
    category: "Tênis",
    brand: "Adidas",
    gender: "Masculino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/16155551/pexels-photo-16155551/free-photo-of-tenis-adidas-ultraboost.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/16155551/pexels-photo-16155551/free-photo-of-tenis-adidas-ultraboost.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/16155553/pexels-photo-16155553.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/16155554.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Energia épica. Mais leve do que nunca.",
    price: 1199.90,
    stock: 12,
    longDescription: "O novo Ultraboost Light é o mais leve de todos os tempos, com 10% menos peso.",
    sizes: ["38", "40", "42", "44"],
    colors: ["Branco", "Solar Red"],
    rating: 4.9,
    reviews: [],
    onSale: true
  },
  {
    id: 202,
    name: "Rolo Adidas Foam Recovery",
    category: "Fisio e Ortopédico",
    brand: "Adidas",
    gender: "Unissex",
    style: "Recuperação",
    image: "https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1571939/pexels-photo-1571939.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Liberação miofascial profissional.",
    price: 179.90,
    stock: 20,
    longDescription: "Acelere sua recuperação com o rolo de espuma Adidas Sport.",
    sizes: ["Único"],
    colors: ["Cinza"],
    rating: 4.8,
    reviews: []
  },

  // --- KIDS SECTION (CRÍTICO) ---
  {
    id: 5,
    name: "Converse All Star High Kids",
    category: "Tênis",
    brand: "Converse",
    gender: "Kids",
    style: "Casual",
    image: "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "O clássico para os pequenos.",
    price: 249.90,
    stock: 25,
    longDescription: "Versão kids do Chuck Taylor All Star para garantir estilo desde cedo.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Preto", "Branco"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 6,
    name: "Nike Air Force 1 Kids",
    category: "Tênis",
    brand: "Nike",
    gender: "Kids",
    style: "Urbano",
    image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Estilo lendário para pés pequenos.",
    price: 399.90,
    stock: 12,
    longDescription: "Durabilidade e conforto com o amortecimento clássico da Nike.",
    sizes: ["28", "30", "32"],
    colors: ["Branco"],
    rating: 5.0,
    reviews: [],
    onSale: true
  },
  {
    id: 9,
    name: "New Balance 574 Kids",
    category: "Tênis",
    brand: "New Balance",
    gender: "Kids",
    style: "Casual",
    image: "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Conforto clássico para crianças.",
    price: 289.90,
    stock: 15,
    longDescription: "O 574 New Balance em versão miniatura, com toda a tecnologia NB.",
    sizes: ["26", "28", "30"],
    colors: ["Azul Marinho"],
    rating: 4.8,
    reviews: []
  },

  // --- MODA PRAIA (CORREÇÃO RASH GUARD) ---
  {
    id: 40,
    name: "Rash Guard Quiksilver Pro",
    category: "Moda Praia",
    brand: "Quiksilver",
    gender: "Masculino",
    style: "Surf",
    image: "https://images.pexels.com/photos/3766211/pexels-photo-3766211.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3766211/pexels-photo-3766211.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1264445/pexels-photo-1264445.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Proteção UV50+ e performance no mar.",
    price: 219.90,
    stock: 20,
    longDescription: "Lycra Quiksilver original para proteção contra assaduras e raios UV.",
    sizes: ["M", "G", "GG"],
    colors: ["Preto"],
    rating: 4.8,
    reviews: [],
    onSale: true
  },
  {
    id: 20,
    name: "Boardshort Rip Curl Mirage",
    category: "Moda Praia",
    brand: "Rip Curl",
    gender: "Masculino",
    style: "Surf",
    image: "https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Secagem ultra rápida e elasticidade.",
    price: 329.90,
    stock: 15,
    longDescription: "O melhor boardshort do mundo agora disponível na Recreio Imports.",
    sizes: ["40", "42", "44"],
    colors: ["Estampado"],
    rating: 5.0,
    reviews: []
  },

  // --- LIFE STYLE & OUTRAS MARCAS ---
  {
    id: 10,
    name: "Vans Old Skool Classic",
    category: "Life Style",
    brand: "Vans",
    gender: "Unissex",
    style: "Urbano",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/206434/pexels-photo-206434.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "O ícone da cultura urbana.",
    price: 369.90,
    stock: 20,
    longDescription: "Resistência e estilo atemporal com o clássico da Vans.",
    sizes: ["36", "38", "40", "42"],
    colors: ["Preto/Branco"],
    rating: 4.9,
    reviews: []
  },
  {
    id: 60,
    name: "Puma Orbita Soccer Ball",
    category: "Artigos Esportivos",
    brand: "Puma",
    gender: "Unissex",
    style: "Futebol",
    image: "https://images.pexels.com/photos/209637/pexels-photo-209637.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/209637/pexels-photo-209637.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "A bola oficial dos craques.",
    price: 249.90,
    stock: 30,
    longDescription: "Bola Puma Orbita com tecnologia de 12 painéis para melhor precisão.",
    sizes: ["Único"],
    colors: ["Branco/Verde"],
    rating: 4.7,
    reviews: [],
    onSale: true
  },

  // --- ASICS FISIO & FEMININO ---
  {
    id: 4,
    name: "Asics Gel-Nimbus 25",
    category: "Tênis",
    brand: "Asics",
    gender: "Feminino",
    style: "Corrida",
    image: "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800",
    gallery: [
      "https://images.pexels.com/photos/3763879/pexels-photo-3763879.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    desc: "Máximo conforto para sua corrida.",
    price: 1099.90,
    stock: 10,
    longDescription: "A tecnologia Gel da Asics levada ao próximo nível de amortecimento.",
    sizes: ["35", "36", "37", "38"],
    colors: ["Rosa"],
    rating: 5.0,
    reviews: []
  }
];
