/* eslint-disable @next/next/no-img-element */
'use client';

import styles from '../style/Home.module.css';
import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import BestCombo from '../components/BestCombination';
import Footer from '../components/Footer'
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import ProductCarousel from '@/components/ProductCarousel';

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const { refreshCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('❌ Error al cargar productos:', err));
  }, []);

  const handleAddToCart = async (id: number) => {
    try {
      const res = await fetch('http://localhost:3001/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Error al agregar al carrito');
      refreshCart();
    } catch (err) {
      console.error('❌ No se pudo agregar al carrito');
    }
  };
  

  return (
  <div className={styles.container}>
    <header className={styles.banner}>
      <div className={styles.imageWrapper}>
        <img
          src="https://i.pinimg.com/1200x/12/c4/e5/12c4e57a1e38ff65aa4137de5636ec93.jpg"
          alt="Marketplace banner"
          className={styles.img}
        />
        <h1 className={styles.titleOver}>Free Market</h1>
        <p className={styles.subtitleOver}>
          Discover the best product combinations based on your budget. Add items to your cart and optimize your spending.
        </p>
      </div>
    </header>
    <ProductList products={products} onAdd={handleAddToCart} />
    <ProductCarousel
  topProducts={products.slice(0, 8)}
  bottomProducts={products.slice(7, 15)}
  minVisualCount={40}
/>

    <Cart />
    <BestCombo products={products} />
    <Footer />
  </div>
);

}
