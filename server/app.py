import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
from ai_service import analyze_email

app = Flask(__name__)
# Habilita CORS para o Frontend (React) conseguir falar com o Backend
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

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "online"}), 200

@app.route('/analyze', methods=['POST'])
def analyze():
    final_content = "" 

    if 'email_text' in request.form:
        final_content += request.form['email_text'] + "\n\n"

    # (PDF ou TXT)
    if 'file' in request.files:
        file = request.files['file']
        filename = file.filename.lower()
        
        file_text = ""
        if filename.endswith('.pdf'):
            file_text = extract_text_from_pdf(file)
        elif filename.endswith('.txt'):
            file_text = file.read().decode('utf-8')
        
        if file_text:
            final_content += f"--- CONTEÚDO DO ANEXO ({filename}) ---\n{file_text}"

    if not final_content or len(final_content.strip()) == 0:
        return jsonify({"error": "Nenhum conteúdo de texto ou arquivo válido fornecido."}), 400

    try:
        # Chama a IA
        result = analyze_email(final_content)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)