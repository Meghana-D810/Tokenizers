from sklearn.feature_extraction.text import TfidfVectorizer


def score_tokens(word_tokens):

    text = " ".join(word_tokens)

    vectorizer = TfidfVectorizer(stop_words="english")

    tfidf_matrix = vectorizer.fit_transform([text])

    feature_names = vectorizer.get_feature_names_out()
    scores = tfidf_matrix.toarray()[0]

    result = []

    for word in word_tokens:

        word_lower = word.lower()

        if word_lower in feature_names:
            index = list(feature_names).index(word_lower)
            score = float(scores[index])
        else:
            score = 0.0

        result.append({
            "word": word,
            "score": round(score, 3)
        })

    return result