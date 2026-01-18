# 📧 MailSense - Triagem Inteligente de E-mails

> **Desafio:** Combater a sobrecarga de informações no ambiente corporativo através de classificação automática e sugestão de respostas.

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 O Problema e a Solução
O volume excessivo de e-mails irrelevantes ou mal estruturados consome horas produtivas das equipes. O **MailSense** atua como um assistente de triagem que utiliza Inteligência Artificial para:
1.  **Ler** o conteúdo (texto ou arquivos anexados).
2.  **Classificar** como *Produtivo* (gera valor/ação) ou *Improdutivo* (ruído).
3.  **Sugerir** uma resposta ou ação imediata.

---

## 🔗 Links do Projeto

- **🌐 Aplicação Online (Deploy):** [CLIQUE AQUI PARA ACESSAR](https://mailsense-ai.vercel.app/)
- **🎬 Vídeo de Demonstração:** [ASSISTIR NO YOUTUBE](https://www.youtube.com/watch?v=-0psl0SsqLA)

---

## 🚀 Funcionalidades

- **Classificação Inteligente:** Analisa o contexto semântico do email para categorizá-lo como:
  - ✅ **Produtivo:** Requer ação (ex: solicitações, dúvidas, boletos).
  - 🚫 **Improdutivo:** Descartável (ex: felicitações, spam, newsletters).
- **Geração de Respostas:** Cria rascunhos de resposta formais e contextualizados automaticamente.
- **Health Check Visual:** Monitoramento em tempo real da saúde da API e latência da nuvem.
- **Interface Moderna:** Front-end reativo e amigável desenvolvido com React e Vite.

---

## 🛠️ Tecnologias e Decisões Técnicas

Para este desafio, optei por uma arquitetura moderna focada em escalabilidade e precisão semântica.

### Backend (Server)
* **Python 3.10+**
* **Flask:** Framework web leve para criação da API RESTful.
* **Google Generative AI:** Integração com modelos LLM (Gemini) para análise semântica e geração de respostas.
* **PyPDF2:** Biblioteca para extração e manipulação de texto em arquivos PDF.
* **Flask-CORS:** Gerenciamento de Cross-Origin Resource Sharing para segurança da API.
* **Gunicorn:** Servidor WSGI robusto para execução em ambiente de produção.
* **Python-dotenv:** Gerenciamento seguro de variáveis de ambiente (.env).

### Frontend (Client)
* **React 19 + TypeScript:** Interface reativa e tipada.
* **Vite:** Build tool.
* **Sonner:** Notificações (Toasts) inteligentes.
* **Axios:** Cliente HTTP para comunicação com o Flask.

### Destaque Técnico: Modo JSON e Segurança
A integração utiliza o JSON Mode nativo do Gemini no Backend. Isso força a IA a gerar saídas estritamente estruturadas, eliminando a necessidade de tratamento de strings complexo (RegEx) e garantindo que o Frontend receba dados limpos e prontos para renderização, prevenindo erros de parser.

---

## 📦 Como Rodar Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos
* Node.js (v18+)
* Python (v3.10+)
* API Key do Google AI Studio (Gemini).

### 1. Configuração do Backend

```bash
# Clone o repositório
git clone [https://github.com/Klaudio0707/Desafio---Verificador-de-Email.git](https://github.com/Klaudio0707/Desafio---Verificador-de-Email.git)
cd server

2.  **Configure o Backend:**
    Crie um arquivo `.env` na pasta `server` com sua chave:
    ```env
    GOOGLE_API_KEY="sua-chave-aqui"
    ```

    Instale as dependências e rode o servidor:
    ```bash
    cd server
    pip install -r requirements.txt
    python app.py
    # Ou para produção: gunicorn app:app
    ```

3.  **Configure o Frontend (em outro terminal):**
    ```bash
    cd client/mailsense
    npm install
    npm run dev
    ```

Acesse a aplicação em: `http://localhost:5173`

## 🧪 Como Testar

1.  **Texto Direto:** Digite um email na caixa de texto e clique em "Analisar".
2.  **Arquivo:** Clique na área de upload e selecione um PDF ou TXT.
3.  **Resultados:**
    * Tente enviar um texto de cobrança -> Deve retornar **Produtivo**.
    * Tente enviar uma receita de bolo ou spam -> Deve retornar **Improdutivo**.

---
## 🧠 Decisões Técnicas

* **IA do Google (Generative AI):** Escolhida pela alta capacidade de contexto e precisão na língua portuguesa para tarefas de resumo e classificação.
* **Processamento de PDF no Backend:** Optou-se por usar `PyPDF2` no servidor (em vez de no navegador) para garantir que o texto extraído seja limpo e formatado corretamente antes de ser enviado para a IA, economizando tokens.
* **Arquitetura Flask + Gunicorn:** Garante que a aplicação possa escalar e lidar com múltiplas requisições simultâneas de forma estável.


## 📞 Contato

Desenvolvido por **Cláudio Roberto**
[[LinkedIn](https://www.linkedin.com/in/cl%C3%A1udio-roberto-filho/)] | [Email](claudiorobertof@outlook.com.br/)