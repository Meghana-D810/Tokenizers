import re
import tiktoken


def tokenize_text(text, model="gpt-4o-mini"):

    # -------- Word Tokens (for heatmap & scoring) --------
    
    word_tokens = re.findall(r"\b\w+\b", text)
    word_token_count = len(word_tokens)


    # -------- LLM Tokens (for cost calculation) --------
    
    encoding = tiktoken.get_encoding("cl100k_base")
    llm_tokens = encoding.encode(text)
    llm_token_count = len(llm_tokens)


    return {
        "word_tokens": word_tokens,
        "word_token_count": word_token_count,
        "llm_token_count": llm_token_count
    }