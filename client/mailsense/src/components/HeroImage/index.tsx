// HeroImage.tsx
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';


interface HeroImageProps {
  slide: {
    id: number;
    icon: React.ReactNode;
    bgClass: string;
  };
}

export function HeroImage({ slide }: HeroImageProps) {
  return (
    <div className={styles.visualSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className={`${styles.card3d} ${slide.bgClass}`}
        >
          <div className={styles.glowEffect} />
          <div className={styles.iconWrapper}>
            {slide.icon}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}