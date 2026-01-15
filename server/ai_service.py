import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.environ.get("GOOGLE_API_KEY")

if api_key:
    genai.configure(api_key=api_key)

def analyze_email(text):
    if not api_key:
        return {"category": "Erro", "reply": "API Key não configurada."}
    
    try:
        model = genai.GenerativeModel('gemma-3-27b-it')
    except:
        try:
            model = genai.GenerativeModel('gemma-3-27b')
        except:
            model = genai.GenerativeModel('gemini-flash-latest')

    prompt = f"""
    CONTEXTO:
    Você é um Assistente de Email Corporativo Inteligente.
    Recebemos o seguinte email e precisamos triá-lo e gerar um rascunho de resposta.
    
    EMAIL RECEBIDO:
    "{text}"
    
    TAREFA 1: CLASSIFICAÇÃO ("category")
    - "Produtivo": Se o email for legítimo e exigir atenção, resposta ou ação da nossa parte (ex: dúvidas de clientes, solicitações de suporte, contatos comerciais, boletos, problemas operacionais).
    - "Improdutivo": Se o email for descartável (ex: SPAM, promoções não solicitadas, tentativas de golpe/phishing, newsletters automáticas).

    TAREFA 2: RESPOSTA AO REMETENTE ("reply")
    - Escreva o rascunho da resposta que NÓS enviaremos de volta para quem mandou o email.
    - Tom de voz: Profissional, educado e direto.
    - Se o email for "Improdutivo", a resposta pode ser apenas uma justificativa interna (ex: "Email promocional descartado").
    
    REGRA DE OURO (PERSONA):
    - Atenção: O nome que aparece na saudação do email recebido (ex: "Olá Claudio") é o NOSSO nome. NÃO use esse nome para cumprimentar na resposta.
    - Cumprimente o remetente. Se não souber o nome, use "Prezado(a)".
    
    FORMATO JSON OBRIGATÓRIO:
    {{
        "category": "Produtivo" ou "Improdutivo",
        "reply": "O texto da sua resposta aqui."
    }}
    
    Responda APENAS o JSON válido.
    """
    try:
        response = model.generate_content(prompt)
        
        raw_text = response.text
        clean_text = raw_text.replace("```json", "").replace("```", "").strip()
        
        if "{" in clean_text and "}" in clean_text:
            start = clean_text.find("{")
            end = clean_text.rfind("}") + 1
            clean_text = clean_text[start:end]

        return json.loads(clean_text)
        
    except Exception as e:
        print(f"Erro na IA: {e}")
        return {
            "category": "Indefinido",
            "reply": "Não foi possível processar a resposta automática."
        }