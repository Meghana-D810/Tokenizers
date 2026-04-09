# backend/comparison.py

from tokenizer import tokenize_text
from pricing import estimate_cost


def compare_with_optimized(original_token_count, original_cost, optimized_prompt, model):

    # tokenize optimized prompt
    optimized_tokens = tokenize_text(optimized_prompt, model)
    optimized_token_count = optimized_tokens["llm_token_count"]

    # calculate optimized cost
    optimized_cost = estimate_cost(optimized_token_count, model)

    # savings
    token_savings = original_token_count - optimized_token_count
    cost_savings = original_cost - optimized_cost

    percentage_saved = 0
    if original_token_count > 0:
        percentage_saved = (token_savings / original_token_count) * 100

    return {
        "optimized_tokens": optimized_token_count,
        "optimized_cost": optimized_cost,
        "token_savings": token_savings,
        "cost_savings": cost_savings,
        "percentage_saved": round(percentage_saved, 2)
    }