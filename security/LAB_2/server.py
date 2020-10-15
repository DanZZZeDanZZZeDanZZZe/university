from flask import Flask
from flask import request, jsonify
from flask import render_template
from transposition import encrypt, decrypt

app = Flask(__name__)

@app.route('/', methods=['GET'])
def process_home_page():
    if request.method == 'GET':
      return  render_template('index.html')

@app.route('/result', methods=['POST'])
def process_data():
    if request.method == 'POST':
      content = request.json
      result = encrypt(content['text'], content['tableSize'], content['xKey'], content['yKey'])
      return jsonify({"result": result})
