import os
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from flask import Flask, render_template, request, jsonify

os.environ["OPENAI_API_KEY"] = "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"
app = Flask(__name__)

chat_history = []

# Create and set up the index and conversational retrieval chain
loader = TextLoader('data.txt')
index = VectorstoreIndexCreator().from_loaders([loader])

chain = ConversationalRetrievalChain.from_llm(
    llm=ChatOpenAI(model="gpt-3.5-turbo"),
    retriever=index.vectorstore.as_retriever(search_kwargs={"k": 1}),
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=["POST"])
def api():
    message = request.json.get("message")
    result = chain({"question": message, "chat_history": chat_history})
    response = result["answer"]
    chat_history.append((message, response))
    return jsonify({"content": response})

if __name__ == "__main__":
    app.run(debug=True)
