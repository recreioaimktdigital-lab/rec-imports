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

// Dados estáticos usados como fallback se Airtable falhar
export const products: Product[] = [];
