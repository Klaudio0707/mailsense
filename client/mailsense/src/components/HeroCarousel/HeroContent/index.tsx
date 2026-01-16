// HeroContent.tsx
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './styles.module.css';
import type { IHeroContentProps } from '../../../@ITypes/IHeroContentProps';

export function HeroContent({ slide, currentIndex, totalSlides, setIndex }: IHeroContentProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.textSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.badge}>{slide.badge}</span>
          <h1 className={styles.title}>{slide.title}</h1>
          <p className={styles.description}>{slide.desc}</p>

          <div className={styles.featuresList}>
            {slide.features.map((feat: string, i: number) => (
              <div key={i} className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} /> {feat}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className={styles.indicatorsBox}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`${styles.dot} ${i === currentIndex ? styles.dotActive : styles.dotInactive}`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('analyze')}
        className={styles.ctaButton}
      >
        Experimentar Agora <ArrowRight size={20} />
      </motion.button>
    </div>
  );
}