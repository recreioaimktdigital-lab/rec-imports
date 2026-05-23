import { useState, useEffect } from 'react';
import { Product } from './products';

const BASE_ID = 'appzzWZbNbytekaDz';
const TABLE_ID = 'tblEgGSX7tzAw1J6O';
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string;

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
}

function safeArray(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try { return JSON.parse(value); } catch { return [String(value)]; }
}

function mapRecord(record: AirtableRecord): Product {
  const f = record.fields;
  return {
    id: f.id ?? 0,
    name: f.name ?? '',
    category: f.category ?? '',
    brand: f.brand ?? '',
    gender: f.gender ?? '',
    style: f.style ?? '',
    image: f.image ?? '',
    gallery: safeArray(f.gallery),
    desc: f.desc ?? '',
    price: f.price ?? 0,
    stock: f.stock ?? 0,
    longDescription: f.longDescription ?? '',
    sizes: safeArray(f.sizes),
    colors: safeArray(f.colors),
    rating: f.rating ?? 0,
    reviews: [],
    onSale: f.onSale ?? false,
  };
}

async function fetchAllProducts(): Promise<Product[]> {
  const results: Product[] = [];
  let offset: string | undefined;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    url.searchParams.set('view', 'viwUPDTcooYfVBJlK');
    if (offset) url.searchParams.set('offset', offset);
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) break;
    const data = await res.json();
    results.push(...(data.records ?? []).map(mapRecord));
    offset = data.offset;
  } while (offset);
  return results;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
