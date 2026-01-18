export interface InputSectionProps {
    text: string;
    setText: (t: string) => void;
    file: File | null;
    setFile: (f: File | null) => void;
    loading: boolean;
    serverOnline: boolean;
    onSubmit: () => void;
}