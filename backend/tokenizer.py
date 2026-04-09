import re
import tiktoken


def tokenize_text(text, model="gpt-4o-mini"):
    
    word_tokens = re.findall(r"\b\w+\b", text)
    word_token_count = len(word_tokens)
    
    encoding = tiktoken.encoding_for_model(model)
    llm_tokens = encoding.encode(text)
    llm_token_count = len(llm_tokens)

    return {
        "word_tokens": word_tokens,
        "word_token_count": word_token_count,
        "llm_token_count": llm_token_count
    }