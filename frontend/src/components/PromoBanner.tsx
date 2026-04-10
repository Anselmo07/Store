import styles from "../style/PromoBanner.module.css";

interface Props {
  title: string;
  subtitle: string;
  title3: string;
  description?: string;
}

const PromoBanner = ({ title, subtitle, title3, description }: Props) => {
  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.title3}>{title3}</p>

      {description && (
        <span className={styles.description}>{description}</span>
      )}
    </div>
  );
};

export default PromoBanner;