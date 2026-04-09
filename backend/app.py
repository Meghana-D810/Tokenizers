from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from tokenizer import tokenize_text
from scorer import score_tokens
from pricing import estimate_cost
from trimmer import trim_prompt
from gemini_client import improve_prompt

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

    tokens = tokenize_text(prompt,model)
    word_tokens = tokens["word_tokens"]
    llm_token_count = tokens["llm_token_count"]

    scores = score_tokens(word_tokens)

    cost = estimate_cost(llm_token_count, model)

    trimmed_data = trim_prompt(scores)

    optimized_prompt = improve_prompt(trimmed_data["trimmed_prompt"])

    return jsonify({
        "scores": scores,
        "token_count": llm_token_count,
        "estimated_cost": cost,
        "trimmed_prompt": trimmed_data["trimmed_prompt"],
        "optimized_prompt": optimized_prompt
    })

if __name__ == "__main__":
    app.run(debug=True)