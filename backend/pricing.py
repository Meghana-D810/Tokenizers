MODEL_PRICING = {
    "gpt-4o-mini": 0.15,
    "gpt-4o": 5.00
}

def estimate_cost(token_count, model="gpt-4o-mini"):

    price_per_million = MODEL_PRICING.get(model, 0.15)

    cost = (token_count / 1_000_000) * price_per_million

    return round(cost, 8)