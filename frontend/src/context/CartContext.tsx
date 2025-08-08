// context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
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

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartResponse>({ items: [], total: 0 });

  const refreshCart = () => {
    fetch('http://localhost:3001/cart')
      .then(res => res.json())
      .then(setCart)
      .catch(err => {
        console.error('Error al cargar el carrito:', err);
        setCart({ items: [], total: 0 });
      });
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
