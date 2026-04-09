import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def improve_prompt(trimmed_prompt):

    prompt = f"""
Rewrite the following prompt so it is clearer and better structured.

Prompt:
{trimmed_prompt}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:
        print("Gemini error:", e)

        # fallback if API fails
        return trimmed_prompt