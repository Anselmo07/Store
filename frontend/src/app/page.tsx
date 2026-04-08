/* eslint-disable @next/next/no-img-element */
'use client';

import styles from '../style/Home.module.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import ProductHouse from '../components/ProductHouse';
import Cart from '../components/Cart';
import BestCombo from '../components/BestCombination';
import Footer from '../components/Footer';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import ProductCarousel from '@/components/ProductCarousel';
import { getProductsByCategory } from '../services/ProductService';

export default function Page() {
  const [techProducts, setTechProducts] = useState<Product[]>([]);
  const [furnitureProducts, setFurnitureProducts] = useState<Product[]>([]);
  const { cart, refreshCart } = useCart();

  const itemCount = cart.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const getCartId = () => {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      cartId = crypto.randomUUID();
      localStorage.setItem('cartId', cartId);
    }

    return cartId;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [technology, furniture] = await Promise.all([
          getProductsByCategory('technology'),
          getProductsByCategory('furniture'),
        ]);

        setTechProducts(technology);
        setFurnitureProducts(furniture);
      } catch (err) {
        console.error('❌ Error loading categorized products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (id: number) => {
    try {
      const cartId = getCartId();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cart-id': cartId,
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Error adding to cart');

      refreshCart();
    } catch (err) {
      console.error('❌ Could not add to cart', err);
    }
  };

  const handleRemoveFromCart = async (id: number) => {
    try {
      const cartId = getCartId();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'cart-id': cartId,
        },
      });

      if (!res.ok) throw new Error('Error deleting cart');

      refreshCart();
    } catch (err) {
      console.error('❌ Could not be removed from cart');
    }
  };

  const filteredTechProducts = techProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allProducts = [...techProducts, ...furnitureProducts];

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />

          <h1 className={styles.logo}>Free Market</h1>

          <button
            onClick={() => setIsCartOpen(true)}
            className={styles.cartButton}
          >
            🛒
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Modal del carrito */}
      {isCartOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Cart onRemove={handleRemoveFromCart} />
          </div>
        </div>
      )}

      {/* Tecnología */}
      <ProductList products={filteredTechProducts} onAdd={handleAddToCart} />

      {/* Muebles */}
      <ProductHouse
        title="Furniture for your home"
        products={furnitureProducts}
        onAdd={handleAddToCart}
      />

      {/* Carrusel */}
      <ProductCarousel
        topProducts={filteredTechProducts.slice(0, 8)}
        bottomProducts={furnitureProducts.slice(0, 8)}
        minVisualCount={40}
      />

      {/* Combo */}
      <BestCombo products={allProducts} />

      <Footer />
    </div>
  );
}