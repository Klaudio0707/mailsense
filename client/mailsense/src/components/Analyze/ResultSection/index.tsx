import { Sparkles, Loader2 } from 'lucide-react';
import styles from './styles.module.css';
import EmailCard from '../../../components/EmailCard';
import type { IAnalysisResult } from '../../../@ITypes/IAnalysisResult';

interface ResultSectionProps {
  result: IAnalysisResult | null;
  loading: boolean;
}

export function ResultSection({ result, loading }: ResultSectionProps) {
  
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 size={48} className={styles.spin}/>
        <h3 style={{marginTop: 20, fontSize: '1.2rem'}}>Analisando Contexto...</h3>
        <p style={{opacity: 0.8}}>A IA está lendo o conteúdo.</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={styles.emptyContainer}>
        <Sparkles size={64} className={styles.emptyIcon}/>
        <h3>Aguardando Dados</h3>
        <p>Os resultados da análise aparecerão aqui.</p>
      </div>
    );
  }

  return (
    <div className={styles.resultWrapper}>
      <EmailCard data={result} />
    </div>
  );
}