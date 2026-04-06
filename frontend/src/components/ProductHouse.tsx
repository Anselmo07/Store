import { Product } from '../types/Product';
import styles from "../style/ProductHouse.module.css";
import Image from 'next/image';

interface Props {
  title: string;
  products: Product[];
  onAdd: (id: number) => void;
}

const ProductHouse = ({ title, products, onAdd }: Props) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.row}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <Image
              src={product.img}
              alt={product.name}
              width={180}
              height={180}
              className={styles.image}
            />

            <h3 className={styles.name}>{product.name}</h3>
            <p className={styles.price}>${product.price}</p>

            <button
              onClick={() => onAdd(product.id)}
              className={styles.button}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
export default ProductHouse;