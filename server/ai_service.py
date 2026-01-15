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
