import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, Activity } from 'lucide-react';
import styles from './styles.module.css';



export default function AnalyzeSection() {
  const [activeId, setActiveId] = useState(0);

 

  return (
    <section className={styles.sectionContainer}>
      
     
      <div className={styles.header}>
        <span className={styles.label}>Nossa Tecnologia</span>
        <h2 className={styles.title}>Entenda o que acontece <br /> por baixo do capô</h2>
        <p className={styles.subtitle}>
          O MailSense analisa metadados, contexto semântico e padrões de envio em milissegundos.
        </p>
      </div>

      <div className={styles.dashboardMockup}>
        
        {/* Lado Esquerdo: Lista */}
        <div className={styles.emailList}>
          <div className={styles.listHeader}>Fila de Processamento</div>
           
            </div>
    
        </div>

        <div className={styles.analysisPanel}>
          <div className={styles.scanLine} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >

              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Categoria Detectada</span>
                  <div className={styles.metricValue}>
                    <FileText size={20} className={styles.tagSafe} />
                    {"a"}
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Análise de Risco</span>
                  <div className={styles.metricValue}>
                    {true ? (
                      <>
                        <ShieldCheck size={20} className={styles.tagFinance} />
                        <span className={styles.tagFinance}>Seguro</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={20} className={styles.tagSpam} />
                        <span className={styles.tagSpam}>Perigo</span>
                      </>
                    )};
                  </div>
                </div>

                <div className={styles.metricCard}>
                  <span className={styles.metricLabel}>Confiança da IA</span>
                  <div className={styles.metricValue}>
                    <Activity size={20} className={styles.tagSafe} />
                    {"100"}%
                  </div>
                </div>
              </div>

              {/* Visão de Código/JSON */}
              <div className={styles.codeBlock}>
                <div>{'{'}</div>
                <div style={{ paddingLeft: '1rem' }}>
                  <span className={styles.jsonKey}>"sentiment":</span> <span className={styles.jsonString}>"{"a"}"</span>,
                </div>
                <div style={{ paddingLeft: '1rem' }}>
                  <span className={styles.jsonKey}>"analysis_time":</span> <span className={styles.jsonNumber}>0.04s</span>,
                </div>
                <div style={{ paddingLeft: '1rem' }}>
                  <span className={styles.jsonKey}>"ai_summary":</span> <span className={styles.jsonString}>"{"teste"}"</span>
                </div>
                <div>{'888'}</div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      

    </section>
  );
}