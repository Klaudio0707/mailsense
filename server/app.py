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

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online"}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    text_content = ""

    if 'file' in request.files:
        file = request.files['file']
        filename = file.filename.lower()
        
        if filename.endswith('.pdf'):
            text_content = extract_text_from_pdf(file)
        elif filename.endswith('.txt'):
            text_content = file.read().decode('utf-8')
        else:
            return jsonify({"error": "Formato não suportado. Use .pdf ou .txt"}), 400

    elif 'email_text' in request.form:
        text_content = request.form['email_text']

    if not text_content or len(text_content.strip()) == 0:
        return jsonify({"error": "Não foi possível ler o conteúdo do email."}), 400

    try:
        result = analyze_email(text_content)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)