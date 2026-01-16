import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, Activity } from 'lucide-react';
import styles from './styles.module.css';

// Aqui no futuro você vai conectar com sua API Real
// Por enquanto, mantemos o Mockup para visualizar o layout

const mockData = [
  {
    id: 1,
    sender: "Financeiro Corp",
    subject: "Fatura Pendente #9021",
    category: "Financeiro",
    sentiment: "Urgente",
    score: 98,
    isSafe: true,
    summary: "Solicitação de pagamento. Anexo verificado e seguro."
  },
  {
    id: 2,
    sender: "Promoção Relâmpago",
    subject: "VOCÊ GANHOU UM IPHONE",
    category: "Phishing",
    sentiment: "Malicioso",
    score: 12,
    isSafe: false,
    summary: "Padrão suspeito. Link externo não verificado."
  },
];

export default function Analyze() {
  const [activeId, setActiveId] = useState(0);

  // Simulação de troca (apenas para visualização)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((prev) => (prev + 1) % mockData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentData = mockData[activeId];

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Painel de Análise</h1>
          <p className={styles.subtitle}>Processamento em Tempo Real</p>
        </div>

        {/* --- AQUI ENTRA O DASHBOARD --- */}
        <div className={styles.dashboardGrid}>
            
            {/* Esquerda: Lista de Emails (Input no futuro) */}
            <div className={styles.emailList}>
                <div className={styles.panelHeader}>Entrada de Dados</div>
                {mockData.map((email, index) => (
                    <div 
                        key={email.id}
                        className={`${styles.emailItem} ${index === activeId ? styles.emailItemActive : ''}`}
                        onClick={() => setActiveId(index)}
                    >
                        <span className={styles.sender}>{email.sender}</span>
                        <span className={styles.subject}>{email.subject}</span>
                    </div>
                ))}
            </div>

            {/* Direita: Resultado da IA */}
            <div className={styles.analysisPanel}>
                <div className={styles.panelHeader}>Diagnóstico da IA</div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeId}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className={styles.resultContent}
                    >
                         <div className={styles.metricsGrid}>
                            <div className={styles.metricCard}>
                                <span className={styles.metricLabel}>Categoria</span>
                                <div className={styles.metricValue}>
                                    <FileText size={18} className={styles.iconBlue} />
                                    {currentData.category}
                                </div>
                            </div>

                            <div className={styles.metricCard}>
                                <span className={styles.metricLabel}>Status</span>
                                <div className={styles.metricValue}>
                                    {currentData.isSafe ? (
                                        <span className={styles.safeTag}><ShieldCheck size={18}/> Seguro</span>
                                    ) : (
                                        <span className={styles.dangerTag}><AlertTriangle size={18}/> Perigo</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.summaryBox}>
                            <span className={styles.metricLabel}>Resumo da IA:</span>
                            <p className={styles.summaryText}>{currentData.summary}</p>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
      </div>
    </main>
  );
}