import { useState } from 'react';
import styles from '../style/BestCombo.module.css';
import { Product } from '../types/Product';
import { findBestCombination } from '../utils/findBestCombination';

interface Props {
  products: Product[];
}

const BestCombo = ({ products }: Props) => {
  const [budget, setBudget] = useState<number>(0);
  const [combo, setCombo] = useState<Product[]>([]);

  const handleFindCombo = () => {
    if (!products || products.length === 0) return;
    const result = findBestCombination(products, budget);
    setCombo(result);
  };

  const total = combo.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.titleCombination}> 
Enter your desired budget <br /> and we'll give you the best       possible purchase option.</h2>
      <input
        type="number"
        className={styles.input}
        placeholder="Presupuesto disponible"
        value={budget}
        onChange={e => setBudget(Number(e.target.value))}
      />
      <button className={styles.button} onClick={handleFindCombo}>
        Search
      </button>

      <div className={styles.result}>
        {combo.length === 0 ? (
          <p>There are no products that fit the budget.</p>
        ) : (
          <ul className={styles.list}>
            {combo.map(p => (
              <li key={p.id} className={styles.item}>
                {p.img && <img src={p.img} alt={p.name} className={styles.image} />}
                <span>{p.name}</span>
                <span>${p.price}</span>
              </li>
            ))}
            <li className={styles.total}>
              <strong>Total:</strong> ${total}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default BestCombo;
