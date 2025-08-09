// components/Cart.tsx
import styles from '../style/Cart.module.css';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart(); // ✅ usamos el estado global

  return (
    <div className={styles.section}>
      <div className={styles.container}>
      <h2 className={styles.title}>🛒 Cart</h2>
      {cart.items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty, add some products.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.items.map(item => (
              <li key={item.id} className={styles.item}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.price}>${item.price}</span>
              </li>
            ))}
          </ul>
          <h3 className={styles.total}>Total: ${cart.total}</h3>
        </>
      )}
    </div>
    </div>
    
  );
};

export default Cart;
