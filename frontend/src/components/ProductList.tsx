import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import styles from '../style/ProductList.module.css';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  products: Product[];
  onAdd: (id: number) => void;
}

const ProductList = ({ products, onAdd }: Props) => {

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div>
      <div className={styles.title}>
        <h1>Check out all the products we have for you, you&apos;ll miss out!</h1>
      </div>

       <div className={styles.searchWrapper}>
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    className={styles.searchInput}
  />
  <button
    onClick={() => setSearchTerm(searchTerm)} // opcional, ya filtra en tiempo real
    className={styles.searchButton}
  >
    Search
  </button>
</div>

      <div className={styles.grid}>
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <Image
              src={product.img}
              alt={product.name}
              width={200}
              height={200}
              className={styles.image}
            />
            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>
            <button onClick={() => onAdd(product.id)} className={styles.button}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
