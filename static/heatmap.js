// Live Prompt Heatmap for TokenScope

const textarea = document.getElementById("prompt");
const resultsDiv = document.getElementById("results");

// create heatmap display area
const heatmapContainer = document.createElement("div");
heatmapContainer.id = "heatmap";
heatmapContainer.style.marginTop = "20px";
heatmapContainer.style.lineHeight = "2";

resultsDiv.appendChild(heatmapContainer);


// debounce to prevent too many API calls
let debounceTimer;

textarea.addEventListener("input", () => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        generateHeatmap();
    }, 350);

});


async function generateHeatmap(){

    const prompt = textarea.value;
    const model = document.getElementById("model").value;

    if(prompt.trim() === ""){
        heatmapContainer.innerHTML = "";
        return;
    }

    try{

        const response = await fetch("http://127.0.0.1:5000/analyze",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                prompt:prompt,
                model:model
            })

        });

        const data = await response.json();

        renderHeatmap(data.scores);

        // also update token stats
        resultsDiv.innerHTML = `
            Tokens: ${data.token_count} <br>
            Cost: $${data.estimated_cost}
        `;

        resultsDiv.appendChild(heatmapContainer);

    }
    catch(error){

        console.error("Heatmap error:", error);

    }

}


function renderHeatmap(scores){

    heatmapContainer.innerHTML = "";

    scores.forEach(item => {

        const span = document.createElement("span");

        span.textContent = item.word + " ";

        const score = item.score;

        // heatmap color scale
        const red = Math.floor(255 * score);
        const green = Math.floor(200 * (1 - score));

        span.style.background = `rgba(${red},${green},80,0.6)`;

        span.style.padding = "4px 8px";
        span.style.margin = "3px";
        span.style.borderRadius = "6px";

        span.style.transition = "0.25s ease";

        heatmapContainer.appendChild(span);

    });

}