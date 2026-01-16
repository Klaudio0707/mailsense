import { FileText, Upload, Paperclip, X, Loader2, Sparkles, WifiOff } from 'lucide-react';

import styles from './styles.module.css';

interface InputSectionProps {
    text: string;
    setText: (t: string) => void;
    file: File | null;
    setFile: (f: File | null) => void;
    loading: boolean;
    serverOnline: boolean;
    onSubmit: () => void;
}

export function InputSection({
    text, setText, file, setFile, loading, serverOnline, onSubmit
}: InputSectionProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            const ext = f.name.split('.').pop()?.toLowerCase();

            if (ext === 'pdf' || ext === 'txt') {
                setFile(f);

            }
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <FileText size={18} color="#6366f1" />
                Entrada de Dados
            </div>

            <textarea
                className={styles.textArea}
                placeholder="Cole o corpo do email aqui..."
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <div className={styles.separator}><span>ou</span></div>

            {/* Upload */}
            {serverOnline ? (
                <>
                    {/* Upload Box (Só aparece se online) */}
                    <div className={styles.fileUploadBox} onClick={() => document.getElementById('file-upload')?.click()}>
                        <input
                            type="file"
                            id="file-upload"
                            accept=".pdf,.txt"
                            onChange={handleFileChange}
                            hidden
                        />
                        {!file ? (
                            <div className={styles.uploadContent}>
                                <Upload size={24} />
                                <span>Anexar PDF ou TXT</span>
                            </div>
                        ) : (
                            <div className={styles.fileSelected}>
                                <Paperclip size={18} />
                                {file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name}
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setFile(null) }}
                                    className={styles.removeFileBtn}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button (Só aparece se online) */}
                    <button
                        className={styles.submitBtn}
                        onClick={onSubmit}
                        disabled={loading || (!text && !file)}
                    >
                        {loading ? <Loader2 className={styles.spin} /> : <>Processar <Sparkles size={18} /></>}
                    </button>
                </>
            ) : (
                /* Estado OFFLINE */
                <div className={styles.offlineBox}>
                    <WifiOff size={24} color="#ef4444" style={{ margin: "10px" }} />
                    <span>Sistema Offline.</span>
                </div>
            )}
        </div>
    );
}