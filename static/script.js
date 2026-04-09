async function analyzePrompt() {

    const prompt = document.getElementById("prompt").value;
    const model = document.getElementById("model").value;

    const response = await fetch("http://127.0.0.1:5000/analyze", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            prompt: prompt,
            model: model
        })
    });

    const data = await response.json();

    document.getElementById("results").innerHTML = `
        Tokens: ${data.token_count} <br>
        Cost: $${data.estimated_cost}
    `;
}