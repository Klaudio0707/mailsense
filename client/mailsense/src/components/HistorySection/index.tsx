import { Trash2, History } from 'lucide-react';
import type { IAnalysisResult } from '../../@ITypes/IAnalysisResult';
import styles from './styles.module.css';

export interface IHistoryItem {
  id: string;
  timestamp: number;
  dateStr: string;
  preview: string;
  result: IAnalysisResult;
}

interface HistorySectionProps {
  items: IHistoryItem[];
  onSelect: (item: IHistoryItem) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onClear: () => void;
}

export function HistorySection({ items, onSelect, onDelete, onClear }: HistorySectionProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <History size={14} style={{ display: 'inline', marginRight: 6 }} />
          Análises Feitas
        </div>
        {items.length > 0 && (
          <button onClick={onClear} className={styles.clearBtn}>Limpar Tudo</button>
        )}
      </div>

      <div className={styles.list}>
        {items.length === 0 ? (
          <p className={styles.empty}>Nenhuma análise salva ainda.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className={styles.item} onClick={() => onSelect(item)}>

              <div className={styles.info}>
                <span className={styles.preview}>
                  {item.preview.length > 30 ? item.preview.substring(0, 30) + '...' : item.preview}
                </span>
                <span className={styles.date}>{item.dateStr}</span>
              </div>

              <div className={styles.actions}>
                <span className={`${styles.badge} ${item.result.category === 'Produtivo' ? styles.produtivo : styles.improdutivo}`}>
                  {item.result.category}
                </span>

                <button
                  className={styles.deleteBtn}
                  onClick={(e) => onDelete(item.id, e)}
                  title="Excluir item"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}