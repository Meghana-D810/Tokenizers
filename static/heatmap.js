function getHeatColor(score){

    // score between 0 and 1

    if(score === 0){
        return "#6b7280"; // gray
    }

    // 0 → 0.5  (gray → blue)
    if(score <= 0.5){

        const ratio = score / 0.5;

        const r = Math.floor(107 * (1 - ratio)); 
        const g = Math.floor(114 + (100 * ratio));
        const b = Math.floor(128 + (127 * ratio));

        return `rgb(${r}, ${g}, ${b})`;
    }

    // 0.5 → 1 (orange → red)
    const ratio = (score - 0.5) / 0.5;

    const r = 255;
    const g = Math.floor(165 * (1 - ratio));
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
}



function renderHeatmap(scores){

    const container = document.getElementById("heatmapContainer");

    container.innerHTML = "";

    scores.forEach(token => {

        const span = document.createElement("span");

        span.className = "heatmap-token";

        span.innerText = token.word;

        span.style.backgroundColor = getHeatColor(token.score);

        span.title = "Score: " + token.score;

        container.appendChild(span);

    });

    const maxScore = Math.max(...scores.map(t => t.score));

const normalized = maxScore === 0 ? 0 : token.score / maxScore;

}