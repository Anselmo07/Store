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
    <Cart onRemove={handleRemoveFromCart} />
    <BestCombo products={products} />
    <Footer />
  </div>
);

}
