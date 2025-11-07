/* eslint-disable @next/next/no-img-element */
'use client';

import styles from '../style/Home.module.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import BestCombo from '../components/BestCombination';
import Footer from '../components/Footer';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import ProductCarousel from '@/components/ProductCarousel';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, refreshCart } = useCart();

  const itemCount = cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('❌ Error loading products: ', err));
  }, []);

  const handleAddToCart = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Error adding to cart');
      refreshCart();
    } catch (err) {
      console.error('❌ Could not add to cart');
    }
  };

  const handleRemoveFromCart = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error deleting cart');
      refreshCart();
    } catch (err) {
      console.error('❌ Could not be removed from cart');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navContent}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <h1 className={styles.logo}>Free Market</h1>
          <button onClick={() => setIsCartOpen(true)} className={styles.cartButton}>
            🛒
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </button>
        </div>
      </header>

      {/* Modal del carrito */}
      {isCartOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsCartOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <Cart onRemove={handleRemoveFromCart} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <ProductList products={filteredProducts} onAdd={handleAddToCart} />
      <ProductCarousel
        topProducts={products.slice(0, 8)}
        bottomProducts={products.slice(7, 15)}
        minVisualCount={40}
      />
      <BestCombo products={products} />
      <Footer />
    </div>
  );
}
