import styles from "./RetreatInfo.module.css";

export const RetreatInfo = () => {
  return (
    <div className={styles.infoSection}>
      <p>
        <strong>É IMPORTANTE RESSALTAR QUE O VALOR DO RETIRO É:</strong>
        <br />
        1º LOTE: até 31/01/2026 – R$ 300,00
        <br />
        2º LOTE: 01/02/2026 até 31/05/2026 – R$ 350,00
        <br />
        <br />
        <strong>FORMA DE PAGAMENTO:</strong>
        <br />
        PIX, boleto ou cartão
        <br />
        <br />
        Até 31/01 → até <strong>5x</strong> no cartão
        <br />
        01/02 até 28/02 → até <strong>4x</strong> no cartão
        <br />
        01/03 até 31/03 → até <strong>3x</strong> no cartão
        <br />
        01/04 até 30/04 → até <strong>2x</strong> no cartão
        <br />
        01/05 até 31/05 → até <strong>1x</strong> no cartão
        <br />
        <br />
        <strong>DATAS DO RETIRO:</strong>
        <br />
        Sábado – 04/06/2026
        <br />
        Domingo – 05/06/2026
        <br />
        Segunda – 06/06/2026
        <br />
        Terça – 07/06/2026
      </p>
    </div>
  );
};
