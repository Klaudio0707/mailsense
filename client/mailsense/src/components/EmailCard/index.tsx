import { useState } from 'react';
import { CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';
import styles from './styles.module.css';

interface AnalysisResult {
  category: string;
  reply: string;
}
interface EmailCardProps {
  data: AnalysisResult;
}
export default function EmailCard({ data }: EmailCardProps) {
  const [copied, setCopied] = useState(false);
  const isProductive = data.category === 'Produtivo';

  const handleCopy = () => {
    navigator.clipboard.writeText(data.reply);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.classificationBox} ${isProductive ? styles.produtivo : styles.improdutivo}`}>
        <div className={styles.headerRow}>
          {isProductive ? <CheckCircle size={28} /> : <AlertCircle size={28} />}
          <span className={styles.statusTitle}>{data.category}</span>
        </div>
        <p className={styles.statusDesc}>
          {isProductive 
            ? 'Email legítimo que requer atenção operacional.' 
            : 'Notificação automática ou spam. Baixa prioridade.'}
        </p>
      </div>

     
      <div className={styles.replySection}>
        <span className={styles.replyLabel}>Sugestão de Resposta da IA</span>
        <p className={styles.replyText}>
          "{data.reply}"
        </p>
        <button onClick={handleCopy} className={styles.copyButton}>
          {copied ? <Check size={16} className="text-green-600"/> : <Copy size={16}/>}
          {copied ? "Copiado!" : "Copiar Texto"}
        </button>
      </div>
    </div>
  );
}