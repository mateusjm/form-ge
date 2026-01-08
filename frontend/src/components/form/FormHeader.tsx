import styles from "./FormHeader.module.css";

type FormHeaderProps = {
  imageSrc: string;
  title: string;
  subtitle?: React.ReactNode; 
};

export const FormHeader = ({ imageSrc, title, subtitle }: FormHeaderProps) => {
  return (
    <div className={styles.header}>
      <img src={imageSrc} alt={title} className={styles.headerImage} />
      <div className={styles.headerText}>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>} 
      </div>
    </div>
  );
};

