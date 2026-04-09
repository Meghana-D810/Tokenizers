async function analyzePrompt() {

    const prompt = document.getElementById("prompt").value;
    const model = document.getElementById("model").value;

    if (!prompt.trim()) {
        alert("Please enter a prompt");
        return;
    }

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

 

    document.getElementById("tokenCount").innerText =
        data.token_count ?? "-";

    document.getElementById("cost").innerText =
        data.estimated_cost ?? "-";


   

    document.getElementById("trimmedPrompt").innerText =
        data.trimmed_prompt ?? "-";



    document.getElementById("optimizedPrompt").innerText =
        data.optimized_prompt ?? "-";



    if (data.comparison) {

        document.getElementById("optimizedTokens").innerText =
            data.comparison.optimized_tokens ?? "-";

        document.getElementById("optimizedCost").innerText =
            data.comparison.optimized_cost ?? "-";

        document.getElementById("tokenSavings").innerText =
            data.comparison.token_savings ?? "-";

        document.getElementById("costSavings").innerText =
            data.comparison.cost_savings ?? "-";

        document.getElementById("percentageSaved").innerText =
            data.comparison.percentage_saved ?? "-";

    }


}