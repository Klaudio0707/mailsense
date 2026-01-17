  import { useState, useEffect, useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { Sparkles, Loader2, ArrowLeft, CheckCircle2, AlarmClock, WifiOff, CheckSquareIcon } from 'lucide-react';
  import { emailService } from '../../services/api';
  import type { IAnalysisResult } from '../../@ITypes/IAnalysisResult';
  import styles from './styles.module.css';
  import { toast } from 'sonner'; 
  import { InputSection } from '../../components/Analyze/InputSection';
  import { ResultSection } from '../../components/Analyze/ResultSection';
  import { HistorySection, type IHistoryItem } from '../../components/HistorySection';

  const MIN_CHARS = 10;
  const MAX_CHARS = 5000; 
  const MAX_FILE_SIZE_MB = 1;

  export default function Analyze() {
    const navigate = useNavigate();
    
    const [text, setText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IAnalysisResult | null>(null);
    const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'waking-up' | 'offline'>('checking');
    const [history, setHistory] = useState<IHistoryItem[]>([]);
    
    const isFirstLoad = useRef(true);
  
  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const saved = localStorage.getItem('@mailsense:history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    const monitorServer = async () => {
      const isOnline = await emailService.checkHealth();
      
      if (!isMounted) return;
      
      if (isOnline) {
        setServerStatus((prevStatus: string) => {
          if (prevStatus !== 'online' && !isFirstLoad.current) {
            toast.success("Conexão restabelecida!", { icon: <CheckSquareIcon /> });
          }
          return 'online';
        });
        timeoutId = setTimeout(monitorServer, 30000);
      } 
      else {
        setServerStatus((prevStatus: string) => {
          if (prevStatus === 'online') {
            toast.error("Conexão perdida. Tentando reconectar...");
          }
          return isFirstLoad.current ? 'waking-up' : 'offline';
        });

        if (isFirstLoad.current) {
            toast.warning("Acordando o servidor...");
        }

        timeoutId = setTimeout(monitorServer, 4000);
      }

      isFirstLoad.current = false;
    };

    monitorServer();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const saveToHistory = (newItem: IHistoryItem) => {
    const updatedHistory = [newItem, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('@mailsense:history', JSON.stringify(updatedHistory));
  };

  const deleteFromHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    const previousHistory = [...history];
    const updatedHistory = history.filter(item => item.id !== id);
    
    setHistory(updatedHistory);
    localStorage.setItem('@mailsense:history', JSON.stringify(updatedHistory));

    toast.success("Item removido.", {
      action: {
        label: 'Desfazer',
        onClick: () => {
          setHistory(previousHistory);
          localStorage.setItem('@mailsense:history', JSON.stringify(previousHistory));
        },
      },
      duration: 4000,
    });
  };

  const clearHistory = () => {
   toast.success("Apagado com sucesso");
      setHistory([]);
      localStorage.removeItem('@mailsense:history');
      toast.success("Histórico limpo.");
  
  };

  const handleSubmit = async () => {
    if (!file) {
      if (!text.trim()) {
        toast.warning("Por favor, cole um texto ou anexe um arquivo.");
        return;
      }
      if (text.trim().length < MIN_CHARS) {
        toast.warning(`Texto muito curto. Digite pelo menos ${MIN_CHARS} caracteres para uma análise útil.`);
        return;
      }
    }

    if (text.length > MAX_CHARS) {
        toast.error(`Texto muito longo. O limite é ${MAX_CHARS} caracteres.`);
        return;
    }

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        toast.error(`Arquivo muito grande (${fileSizeMB.toFixed(1)}MB). Limite: ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
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

      saveToHistory(newItem);

      if (data.category === 'Produtivo') {
       toast.success("Email classificado como PRODUTIVO.");
      } else {
       toast.warning("Email classificado como IMPRODUTIVO.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao processar análise. Verifique a conexão.");
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
            <h2 className={styles.title}><Sparkles size={30} color="#6366f1" /> Análise Inteligente</h2>
            <p className={styles.subtitle}>Cole o email ou anexe um arquivo para análise.</p>
          </div>
          <div className={`
            ${styles.statusBadge} 
            ${serverStatus === 'online' ? styles.statusOnline : ''}
            ${serverStatus === 'waking-up' ? styles.statusWaking : ''}
            ${serverStatus === 'offline' ? styles.statusOffline : ''}
          `}>
            {serverStatus === 'online' ? (
              <><CheckCircle2 size={16} /> IA Operacional</>
            ) : serverStatus === 'waking-up' ? (
              <><AlarmClock size={16} className={styles.pulse} /> Acordando Servidor...</>
            ) : serverStatus === 'checking' ? (
              <><Loader2 size={16} className={styles.spin} /> Verificando...</>
            ) : (
              <><WifiOff size={16} /> Offline</>
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

            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem', textAlign: 'right' }}>
               {text.length > 0 && <span>{text.length} / {MAX_CHARS} caracteres</span>}
            </div>
            <HistorySection 
              items={history}
              onSelect={(item: { result:IAnalysisResult }) => {
                setResult(item.result);
                toast.info("Resultado carregado do histórico.");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDelete={deleteFromHistory}
              onClear={clearHistory}
            />
          </div>
          <ResultSection result={result} loading={loading}/>
        </main>
      </div>
    </div>
  );
}
