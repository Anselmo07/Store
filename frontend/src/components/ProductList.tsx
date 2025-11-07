import { Product } from '../types/Product';
import styles from '../style/ProductList.module.css';
import Image from 'next/image';

interface Props {
  products: Product[];
  onAdd: (id: number) => void;
}

const ProductList = ({ products, onAdd }: Props) => {
  return (
    <div>
      <div className={styles.title}>
        <h1>Check out all the products we have for you, you&apos;ll miss out!</h1>
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
