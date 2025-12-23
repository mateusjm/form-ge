import styles from "./LoadingOverlay.module.css";
import { useLockBody } from "@/hooks/useLockBody";

type LoadingOverlayProps = {
  message?: string;
  isOpen: boolean;
};

export function LoadingOverlay({
  message = "Aguarde, estamos finalizando sua inscrição…",
  isOpen,
}: LoadingOverlayProps) {
  useLockBody(isOpen);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <span className={styles.spinner} />
        <p className={styles.text}>{message}</p>
      </div>
    </div>
  );
}