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
import PromoBanner from "../components/PromoBanner";

export default function Page() {
  const [techProducts, setTechProducts] = useState<Product[]>([]);
  const [furnitureProducts, setFurnitureProducts] = useState<Product[]>([]);
  const [sportsProducts, setSportsProducts] = useState<Product[]>([]);
  const [accessoriesProducts, setAccessoriesProducts] = useState<Product[]>([]);
  const [appliancesProducts, setAppliancesProducts] = useState<Product[]>([]);
  const [toolsProducts, setToolsProducts] = useState<Product[]>([]);

  const { cart, refreshCart } = useCart();

  const itemCount = cart.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🔹 Cart ID
  const getCartId = () => {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      cartId = crypto.randomUUID();
      localStorage.setItem('cartId', cartId);
    }

    return cartId;
  };

  // 🔹 Fetch productos por categoría
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [
          technology,
          furniture,
          sports,
          accessories,
          appliances,
          tools,
        ] = await Promise.all([
          getProductsByCategory('technology'),
          getProductsByCategory('furniture'),
          getProductsByCategory('sports'),
          getProductsByCategory('accessories'),
          getProductsByCategory('appliances'),
          getProductsByCategory('tools'),
        ]);

        setTechProducts(technology);
        setFurnitureProducts(furniture);
        setSportsProducts(sports);
        setAccessoriesProducts(accessories);
        setAppliancesProducts(appliances);
        setToolsProducts(tools);
      } catch (err) {
        console.error('❌ Error loading categorized products:', err);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Unir TODOS los productos
  const allProducts = [
    ...techProducts,
    ...furnitureProducts,
    ...sportsProducts,
    ...accessoriesProducts,
    ...appliancesProducts,
    ...toolsProducts,
  ];

  // 🔍 Búsqueda GLOBAL
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Separar por categoría
  const filteredTech = filteredProducts.filter(p => p.category === 'technology');
  const filteredFurniture = filteredProducts.filter(p => p.category === 'furniture');
  const filteredSports = filteredProducts.filter(p => p.category === 'sports');
  const filteredAccessories = filteredProducts.filter(p => p.category === 'Accessories');
  const filteredAppliances = filteredProducts.filter(p => p.category === 'appliances');
  const filteredTools = filteredProducts.filter(p => p.category === 'tools');

  const isSearching = searchTerm.length > 0;

  // 🛒 Add
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

  // ❌ Remove
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

  return (
    <div className={styles.container}>
      {/* NAVBAR */}
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

      {/* MODAL CART */}
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

      {/* 🔍 MODO BUSQUEDA */}
      {isSearching ? (
        <ProductList products={filteredProducts} onAdd={handleAddToCart} />
      ) : (
        <>
          {/* Tecnología */}
          <ProductList products={techProducts} onAdd={handleAddToCart} />

          {/* Muebles */}
          <ProductHouse
            title="Furniture for your home"
            products={furnitureProducts}
            onAdd={handleAddToCart}
          />

          {/* Carrusel */}
          <ProductCarousel
            topProducts={techProducts.slice(0, 8)}
            bottomProducts={furnitureProducts.slice(0, 8)}
            minVisualCount={40}
          />

          {/* Sports */}
          <ProductHouse
            title="Sports"
            products={sportsProducts}
            onAdd={handleAddToCart}
          />

          {/* Accessories */}
          <ProductHouse
            title="Accessories"
            products={accessoriesProducts}
            onAdd={handleAddToCart}
          />

          {/* Banner */}
          <PromoBanner
            title="TOTAL CLEARANCE"
            subtitle="50% OFF + 18 installments"
            title3="Up to 18 interest-free installments"
            description="Limited time offer"
          />

          {/* Appliances */}
          <ProductHouse
            title="Appliances"
            products={appliancesProducts}
            onAdd={handleAddToCart}
          />

          {/* Tools */}
          <ProductHouse
            title="Tools"
            products={toolsProducts}
            onAdd={handleAddToCart}
          />
        </>
      )}

      {/* Combo */}
      <BestCombo products={allProducts} />

      <Footer />
    </div>
  );
}