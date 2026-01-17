import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import type { IHeroImageProps } from '../../../@ITypes/IHeromImageProps';

export function HeroImage({ slide }: IHeroImageProps) {
    const navigate = useNavigate();
    return (
        <div className={styles.visualSection}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    onClick={() => navigate('/analyze')}
                    initial={{ opacity: 0, rotateY: -20, scale: 0.9 }}
                    animate={{ opacity: 1, rotateY: 0, scale: 0.9 }}
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