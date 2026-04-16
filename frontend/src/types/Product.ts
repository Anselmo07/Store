export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category: 'technology' | 'furniture' | 'sports' | 'Accessories' | 'appliances' | 'tools';
}