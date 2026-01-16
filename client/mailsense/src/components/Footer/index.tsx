import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.content}>
        
   
        <div className={styles.brandSection}>
          <p className={styles.brandName}>MailSense © 2026</p>
          <p className={styles.tagline}>
            Soluções inteligentes para triagem corporativa.
          </p>
        </div>

        <div className={styles.creditsSection}>
          <p className={styles.devInfo}>
            Desenvolvido  por 
            <span className={styles.devName}>Cláudio Roberto</span>
          </p>
          <p className={styles.techStack}>
            React • Python Flask • Google Gemini
          </p>
        </div>

      </div>
    </footer>
  );
}