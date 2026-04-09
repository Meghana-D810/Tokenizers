from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

from tokenizer import count_tokens
from pricing import estimate_cost

app = Flask(
    __name__,
    template_folder="../templates",
    static_folder="../static"
)

CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    prompt = data.get("prompt")
    model = data.get("model")

    token_count = count_tokens(prompt)
    cost = estimate_cost(token_count, model)

    return jsonify({
        "token_count": token_count,
        "estimated_cost": cost
    })

if __name__ == "__main__":
    app.run(debug=True)