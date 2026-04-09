import numpy as np


def trim_prompt(scores):

    """
    Removes low-importance tokens based on dynamic threshold
    derived from the average TF-IDF score.
    """

    token_scores = [token["score"] for token in scores]

    # dynamic threshold instead of fixed value
    threshold = np.mean(token_scores)

    kept_words = []
    removed_words = []

    for token in scores:
        word = token["word"]
        score = token["score"]

        if score >= threshold:
            kept_words.append(word)
        else:
            removed_words.append(word)

    trimmed_prompt = " ".join(kept_words)

    return {
        "trimmed_prompt": trimmed_prompt,
        "kept_tokens": kept_words,
        "removed_tokens": removed_words,
        "threshold": round(threshold, 3)
    }