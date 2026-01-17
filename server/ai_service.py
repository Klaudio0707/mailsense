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
    Você é um assistente de triagem de emails para uma empresa financeira.
    Sua tarefa é ler o email abaixo e classificá-lo estritamente de acordo com as regras do desafio.

    EMAIL RECEBIDO:
    "{text}"

    --------------------------
    REGRAS DE CLASSIFICAÇÃO ("category"):
    
    1. PRODUTIVO (Requer ação/trabalho):
       - O email solicita um status, um arquivo, suporte técnico ou tira uma dúvida.
       - Exemplos: "Cadê o boleto?", "O sistema caiu", "Preciso do relatório", "Qual o status da requisição?".
    
    2. IMPRODUTIVO (Não requer ação/trabalho):
       - Mensagens puramente sociais, agradecimentos, felicitações ou spam.
       - Exemplos: "Feliz Natal", "Muito obrigado", "Bom final de semana", "Promoção imperdível".

    --------------------------
    REGRAS DE RESPOSTA ("reply"):
    
    - Se PRODUTIVO: Escreva uma resposta profissional confirmando que a solicitação foi recebida e será tratada.
    - Se IMPRODUTIVO (Social): Agradeça a gentileza de forma breve e encerre.
    - Se IMPRODUTIVO (Spam/Irrelevante): A resposta deve ser apenas "Nenhuma resposta necessária".

    --------------------------
    SAÍDA ESPERADA (JSON):
    Responda APENAS com um JSON válido neste formato, sem crases ou markdown:
    {{
        "category": "Produtivo" ou "Improdutivo",
        "reply": "Texto da sugestão de resposta"
    }}
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