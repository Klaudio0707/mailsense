# 📧 MailSense - Inteligência Artificial para Triagem de Emails

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)

> Solução desenvolvida para o Desafio de Automação e IA (AutoU).

O **MailSense** é uma aplicação web Full Stack que utiliza Inteligência Artificial Generativa (LLM) para automatizar a leitura, classificação e resposta de emails corporativos, otimizando o tempo de equipes operacionais.

---

## 🔗 Links do Projeto

- **🌐 Aplicação Online (Deploy):** [CLIQUE AQUI PARA ACESSAR](SEU_LINK_DO_RENDER_OU_VERCEL_AQUI)
- **🎬 Vídeo de Demonstração:** [ASSISTIR NO YOUTUBE](SEU_LINK_DO_YOUTUBE_AQUI)

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

| Camada | Tecnologia | Motivo da Escolha |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Performance superior, componentização e feedback visual instantâneo para o usuário. |
| **Backend** | Python (Flask) | Robustez e facilidade de integração com bibliotecas de IA. |
| **Servidor** | Gunicorn | Servidor WSGI de produção para garantir estabilidade no deploy (ao contrário do servidor de desenvolvimento padrão). |
| **IA / NLP** | **Google Gemini** | **Decisão Estratégica:** Ao invés de usar NLP tradicional (Stemming/Stopwords), optei por **LLMs**. Modelos generativos entendem *nuance* e *sarcasmo* melhor que contagem de palavras, garantindo maior acurácia na classificação. |
| **Cloud** | Render | Hospedagem contínua com suporte a containers e SSL nativo. |

### Destaque Técnico: Modo JSON e Segurança
A integração com o Gemini utiliza o **JSON Mode** nativo e validação de esquema, garantindo que a saída da IA seja sempre estruturada e integrável ao Front-end, prevenindo erros de formatação comuns em LLMs.

---

## 📦 Como Rodar Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

### Pré-requisitos
- Python 3.10+
- Node.js e NPM
- Uma API Key do Google Gemini

### 1. Configuração do Backend

```bash
# Clone o repositório
git clone [https://github.com/Klaudio0707/Desafio---Verificador-de-Email.git](https://github.com/Klaudio0707/Desafio---Verificador-de-Email.git)
cd server

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Crie o arquivo .env na raiz e adicione sua chave
# GOOGLE_API_KEY="Sua_Chave_Aqui"

# Rode o servidor
flask run
# O servidor iniciará em http://localhost:5000

## 🧪 Como Testar

1.  **Texto Direto:** Digite um email na caixa de texto e clique em "Analisar".
2.  **Arquivo:** Clique na área de upload e selecione um PDF ou TXT.
3.  **Resultados:**
    * Tente enviar um texto de cobrança -> Deve retornar **Produtivo**.
    * Tente enviar uma receita de bolo ou spam -> Deve retornar **Improdutivo**.

---

## 📞 Contato

Desenvolvido por **Cláudio Roberto**
[[LinkedIn](https://www.linkedin.com/in/cl%C3%A1udio-roberto-filho/)] | [Email](claudiorobertof@outlook.com.br/)