# 💻 MailSense - Frontend

Interface web desenvolvida com **React 19**, **TypeScript** e **Vite**. Focada em performance, acessibilidade e feedback visual imediato para o usuário.

## 📦 Stack e Bibliotecas

Baseado no `package.json`, as principais dependências são:

| Biblioteca | Versão | Função Principal |
| :--- | :--- | :--- |
| **React** | `^19.2.0` | Core da interface (SPA). |
| **Vite** | `^7.2.4` | Bundler e servidor de desenvolvimento ultrarrápido. |
| **TypeScript** | `~5.9.3` | Tipagem estática para segurança de código. |
| **React Router** | `^7.12.0` | Gerenciamento de rotas e navegação. |
| **Axios** | `^1.13.2` | Requisições HTTP e comunicação com a API. |
| **Sonner** | `^2.0.7` | Sistema de Toasts (notificações) com suporte a ações (Undo). |
| **Framer Motion**| `^12.26.2`| Animações de entrada e saída de elementos. |
| **Lucide React** | `^0.562.0` | Ícones leves e modernos. |

## 🚀 Instalação e Execução

Certifique-se de estar na pasta `client/mailsense`.

### 1. Instalar Dependências
```bash
npm install

npm run dev

Crie um arquivo .env na raiz desta pasta se precisar alterar a URL da API:
VITE_RENDER_URL_API="http://localhost:5000"