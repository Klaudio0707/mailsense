import { useState, useEffect } from 'react';
import { ShieldCheck, Zap, BrainCircuit } from 'lucide-react';
import styles from './styles.module.css';
import { HeroContent } from './HeroContent';
import { HeroImage } from './HeroImage';

const slides = [
    {
        id: 1,
        badge: "Inteligência Artificial",
        title: "Triagem de Emails em Segundos",
        desc: "Nossa IA lê, entende o contexto e classifica automaticamente emails financeiros, separando o que é urgente do que é spam.",
        icon: <BrainCircuit size={140} />,
        bgClass: styles.bgBlue,
        features: ["Leitura de Contexto", "Alta Precisão", "Aprendizado Contínuo"]
    },
    {
        id: 2,
        badge: "Eficiência Operacional",
        title: "Fim do Trabalho Repetitivo",
        desc: "Sua equipe não precisa mais ler spam. O Mailsense filtra robôs e notificações automáticas para que você foque no cliente.",
        icon: <ShieldCheck size={140} />,
        bgClass: styles.bgGreen,
        features: ["Filtro Anti-Spam", "Segurança de Dados", "Foco no Cliente"]
    },
    {
        id: 3,
        badge: "Produtividade",
        title: "Respostas Prontas num Clique",
        desc: "Geração automática de rascunhos de resposta formais e empáticos, prontos para copiar, colar e enviar.",
        icon: <Zap size={140} />,
        bgClass: styles.bgOrange,
        features: ["Geração de Texto", "Tom Profissional", "Agilidade no Suporte"]
    }
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className={styles.carouselContainer}>
            <HeroContent
                slide={slides[index]}
                currentIndex={index}
                totalSlides={slides.length}
                setIndex={setIndex}
            />
            <HeroImage
                slide={slides[index]}
            />
        </div>
    );
}