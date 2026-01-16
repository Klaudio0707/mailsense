import axios from 'axios';
import type { IAnalysisResult } from '../@ITypes/IAnalysisResult';

const URL_API = import.meta.env.VITE_RENDER_URL_API;

const api = axios.create({
    baseURL: URL_API,
    timeout: 10000,
});

export const emailService = {
    checkHealth: async () => {
        return api.get('/health', { timeout: 2000 });
    },

    analyze: async (text: string, file: File | null) => {
        const formData = new FormData();

        if (text) formData.append('email_text', text);
        if (file) formData.append('file', file);

        const response = await api.post<IAnalysisResult>('/analyze', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    }
};