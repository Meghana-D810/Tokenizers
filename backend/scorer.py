from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")


def score_tokens(word_tokens):

    text = " ".join(word_tokens)

    prompt_embedding = model.encode([text])

    token_embeddings = model.encode(word_tokens)

    similarities = cosine_similarity(token_embeddings, prompt_embedding)

    scores = similarities.flatten()

    max_score = max(scores) if max(scores) != 0 else 1

    result = []

    for word, score in zip(word_tokens, scores):

        normalized = score / max_score

        result.append({
            "word": word,
            "score": round(float(normalized), 3)
        })

    return result