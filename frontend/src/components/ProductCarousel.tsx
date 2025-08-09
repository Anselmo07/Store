import styles from '../style/ProductCarousel.module.css';
import { Product } from '../types/Product';
import { repeatProducts } from '../utils/repeatProducts';

interface Props {
  topProducts: Product[];
  bottomProducts: Product[];
  minVisualCount?: number; // opcional para ajustar el ciclo
}

const ProductCarousel = ({ topProducts, bottomProducts, minVisualCount = 40 }: Props) => {
  const repeatedTop = repeatProducts(topProducts, minVisualCount);
  const repeatedBottom = repeatProducts(bottomProducts, minVisualCount);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.scroller}>
          <div className={styles.track}>
            {repeatedTop.map((product, idx) => (
              <div key={`top-${product.id}-${idx}`} className={styles.card}>
                <img src={product.img} alt={product.name} className={styles.image} />
                <p className={styles.name}>{product.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.rowReverse}>
        <div className={styles.scroller}>
          <div className={styles.trackReverse}>
  {[...repeatedBottom, ...repeatedBottom].map((product, idx) => (
    <div key={`bottom-${product.id}-${idx}`} className={styles.card}>
      <img src={product.img} alt={product.name} className={styles.image} />
      <p className={styles.name}>{product.name}</p>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
