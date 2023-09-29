import os
import sys
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from flask import Flask, render_template, request
import time


os.environ["OPENAI_API_KEY"] = "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"
app = Flask(__name__)

@app.route('/')
def index ():
    return render_template('index.html')
@app.route('/api', methods = ["POST"])
def api():
    message = request.json.get("message")
    loader = TextLoader('data.txt')
    index = VectorstoreIndexCreator().from_loaders([loader])
    response = index.query(message)
    return response
        
    
if __name__ == "__main__":
    app.run(debug = True)