import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader # Biblioteca para ler PDF
from ai_service import analyze_email

app = Flask(__name__)
CORS(app)

def extract_text_from_pdf(file):
    try:
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Erro ao ler PDF: {e}")
        return ""
