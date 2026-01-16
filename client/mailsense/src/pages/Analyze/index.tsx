import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2, ArrowLeft, CheckCircle2, CoffeeIcon } from 'lucide-react';
import { emailService } from '../../services/api';
import type { IAnalysisResult } from '../../@ITypes/IAnalysisResult';
import styles from './styles.module.css';

import { InputSection } from '../../components/Analyze/InputSection';
import { ResultSection } from '../../components/Analyze/ResultSection';
import { HistorySection,type IHistoryItem } from '../../components/HistorySection'; // Importe o novo componente


type ServerStatus = 'checking' | 'online' | 'offline';

export default function Analyze() {
  const navigate = useNavigate();
  
  // --- STATES ---
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IAnalysisResult | null>(null);
  const [serverStatus, setServerStatus] = useState<ServerStatus>('checking');
  const [history, setHistory] = useState<IHistoryItem[]>([]);

  // --- EFEITO: Carregar LocalStorage e Checar Servidor ---
  useEffect(() => {
    // 1. Carrega Histórico
    const saved = localStorage.getItem('@mailsense:history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao ler localStorage", e);
      }
    }

    // 2. Checa Servidor
    const checkServer = async () => {
      try {
        await emailService.checkHealth();
        setServerStatus('online');
      } catch {
        setServerStatus('offline');
      }
    };
    checkServer();
  }, []);

  // --- FUNÇÕES DE HISTÓRICO ---
  const saveToHistory = (newItem: IHistoryItem) => {
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('@mailsense:history', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que clique no item e o selecione ao mesmo tempo
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('@mailsense:history', JSON.stringify(updatedHistory));

  };

  const clearHistory = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico?")) {
      setHistory([]);
      localStorage.removeItem('@mailsense:history');
   
    }
  };


  const handleSubmit = async () => {
    // Validação
    if (!text.trim() && !file && text.length < 2) {
     
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    
    try {

      const data = await emailService.analyze(text, file);
      setResult(data);
      

      const newItem: IHistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        dateStr: new Date().toLocaleString('pt-BR'),
        preview: file ? `Arquivo: ${file.name}` : text,
        result: data
      };

      // 3. Salva
      saveToHistory(newItem);

      // 4. Feedback Visual
      if (data.category === 'Produtivo') {
       alert("Email classificado como PRODUTIVO. Verifique a sugestão de resposta.");
      } else {
        alert("Email classificado como IMPRODUTIVO. Considere revisar o conteúdo antes de enviar.");
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <button onClick={() => navigate('/')} className={styles.backButton}>
              <ArrowLeft size={18}/> Voltar
            </button>
            <h1><Sparkles size={32} color="#6366f1" /> Análise Inteligente</h1>
            <p className={styles.subtitle}>Cole o email ou anexe um arquivo para triagem.</p>
          </div>
          
          <div className={`${styles.statusBadge} ${serverStatus === 'online' ? styles.statusOnline : ''}`}>
            {serverStatus === 'online' ? (
              <><CheckCircle2 size={16} /> Sistema Operacional</>
            ) : serverStatus === 'checking' ? (
              <><Loader2 size={16} className={styles.spin} /> Conectando...</>
            ) : (
              <>Offline... <CoffeeIcon size={16} /></>
            )}
          </div>
        </header>

        <main className={styles.mainGrid}>
          
          <div className={styles.leftColumn}>
            <InputSection 
              text={text}
              setText={setText}
              file={file}
              setFile={setFile}
              loading={loading}
              serverOnline={serverStatus === 'online'}
              onSubmit={handleSubmit}
            />

            <HistorySection 
              items={history}
              onSelect={(item: { result: any; }) => {
                setResult(item.result);
                alert("Resultado carregado do histórico.");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDelete={deleteFromHistory}
              onClear={clearHistory}
            />
          </div>

          <ResultSection result={result} loading={loading} />

        </main>
      </div>
    </div>
  );
}