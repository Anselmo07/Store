'use client';

import styles from '../style/Cart.module.css';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import trash from '../img/trash.jpg';

type Props = {
  onRemove: (id: number) => void;
};

const Cart = ({ onRemove }: Props) => {
  const { cart } = useCart();

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>🛒 Cart</h2>
        {cart.items.length === 0 ? (
          <p className={styles.empty}>Your cart is empty, add some products.</p>
        ) : (
          <>
            <ul className={styles.list}>
              {cart.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.name}>
                    {item.name} {item.quantity > 1 && `x${item.quantity}`}
                  </span>
                  <div className={styles.priceWrapper}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={40}
                      height={40}
                      className={styles.productThumb}
                    />
                    <span className={styles.price}>${item.price}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onRemove(item.id)}
                      title="Remove from cart"
                    >
                      <Image
                        src={trash}
                        alt="Remove"
                        width={24}
                        height={24}
                        className={styles.trashIcon}
                      />
                    </button>
                  </div>
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
