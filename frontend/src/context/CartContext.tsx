'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  img: string | StaticImport;
  quantity: number;
  id: number;
  name: string;
  price: number;
}

interface CartResponse {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: CartResponse;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// 🔹 obtener o crear cartId
const getCartId = () => {
  if (typeof window === 'undefined') return '';

  let cartId = localStorage.getItem('cartId');

  if (!cartId) {
    cartId = crypto.randomUUID();
    localStorage.setItem('cartId', cartId);
  }

  return cartId;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartResponse>({ items: [], total: 0 });

  const refreshCart = async () => {
    try {
      const cartId = getCartId();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
          'cart-id': cartId,
        },
      });

      const data = await res.json();

      setCart(data);
    } catch (err) {
      console.error('Error loading cart:', err);
      setCart({ items: [], total: 0 });
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};