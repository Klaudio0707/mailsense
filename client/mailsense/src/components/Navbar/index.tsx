import { Send, Github, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navContainer}>
      <div className={styles.content}>
     
        <div className={styles.logoBox} onClick={() => navigate('/')}>
          <div className={styles.logoIcon}>
            <Send size={24} />
          </div>
          <span className={styles.brandName}>
            MailSense
          </span>
        </div>
        <div className={styles.rightSection}>
          
    
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/Klaudio0707" 
              target="_blank" 
              rel="noreferrer" 
              className={styles.socialIcon}
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/cl%C3%A1udio-roberto-filho/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialIcon}
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}