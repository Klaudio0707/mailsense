import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader # Biblioteca para ler PDF
from ai_service import analyze_email