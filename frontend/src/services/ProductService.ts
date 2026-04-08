import { Product } from '../types/Product';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Error loading products');
  }

  return res.json();
};

export const getProductsByCategory = async (
  category: 'technology' | 'furniture'
): Promise<Product[]> => {
  const res = await fetch(`${API_URL}/products?category=${category}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error loading ${category} products`);
  }

  return res.json();
};