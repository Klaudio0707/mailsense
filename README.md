# 📧 AutoMail AI - Classificador Inteligente de Emails

> Uma solução Fullstack que utiliza Inteligência Artificial Generativa para triagem, classificação e resposta automática de emails corporativos e financeiros.

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-green) ![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-blue) ![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-yellow)

## 🎯 Sobre o Projeto

O **AutoMail AI** resolve o problema da sobrecarga operacional em equipes de suporte e financeiro. O sistema analisa o conteúdo de emails (texto ou arquivos PDF/TXT), identifica o contexto e classifica a mensagem em:

* **🟢 Produtivo:** Solicitações legítimas (boletos, dúvidas, suporte).
* **🔴 Improdutivo:** Spam, promoções, avisos automáticos de sistema.

Além de classificar, a IA gera automaticamente uma sugestão de resposta formal e empática, pronta para ser enviada ao cliente.

## 🚀 Funcionalidades Principais

* **IA Avançada (Google Gemma-27b):** Compreensão profunda de contexto e linguagem natural.
* **Upload de Arquivos:** Suporte para leitura automática de anexos `.pdf` e `.txt`.
* **Smart Filtering:** Identifica e descarta notificações automáticas (robôs) e spam.
* **Resiliência:** Sistema de reconexão automática com o servidor (Cold Start Handling).
* **UX Moderna:** Interface limpa, feedbacks visuais (Toasts) e design responsivo.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React + Vite:** Performance e desenvolvimento rápido.
* **TypeScript:** Tipagem estática para segurança do código.
* **Sonner:** Notificações (Toasts) elegantes.
* **Lucide React:** Ícones modernos e leves.
* **Axios:** Comunicação com a API.

### Backend
* **Python + Flask:** Servidor leve e robusto.
* **Google Generative AI SDK:** Integração com LLMs (Large Language Models).
* **PyPDF2:** Processamento de arquivos PDF.

---

## 💻 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

### Pré-requisitos
* Node.js instalado (v18+).
* Python instalado (v3.9+).
* Uma chave de API do Google AI Studio (Gemini).

### 1. Configurando o Backend (Servidor)

1.  Abra o terminal na pasta `server`:
    ```bash
    cd server
    ```
2.  Crie um ambiente virtual (recomendado):
    ```bash
    python -m venv venv
    # Windows:
    venv\Scripts\activate
    # Linux/Mac:
    source venv/bin/activate
    ```
3.  Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```
4.  **IMPORTANTE:** Crie um arquivo chamado `.env` dentro da pasta `server` e adicione sua chave:
    ```env
    GOOGLE_API_KEY="Sua_Chave_Aqui"
    ```
5.  Inicie o servidor:
    ```bash
    python app.py
    ```
    *O servidor rodará em: http://127.0.0.1:5000*

### 2. Configurando o Frontend (Cliente)

1.  Abra um **novo terminal** na pasta `client`:
    ```bash
    cd client
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm run dev
    ```
4.  Acesse o link mostrado no terminal (geralmente `http://localhost:5173`).

---

## 🧪 Como Testar

1.  **Texto Direto:** Digite um email na caixa de texto e clique em "Analisar".
2.  **Arquivo:** Clique na área de upload e selecione um PDF ou TXT.
3.  **Resultados:**
    * Tente enviar um texto de cobrança -> Deve retornar **Produtivo**.
    * Tente enviar uma receita de bolo ou spam -> Deve retornar **Improdutivo**.

---

## 📞 Contato

Desenvolvido por **[Seu Nome]**
[Seu LinkedIn] | [Seu Email]