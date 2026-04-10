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

    console.log(data.scores);
renderHeatmap(data.scores);


}

function toggleText(id){

    const element = document.getElementById(id);

    if(element.classList.contains("expanded")){
        element.classList.remove("expanded");
    } else {
        element.classList.add("expanded");
    }

}

function downloadPDF(){

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const pageHeight = 280;   // safe printable height
    let y = 20;

    function checkPageBreak(){
        if(y > pageHeight){
            pdf.addPage();
            y = 20;
        }
    }

    const tokenCount = document.getElementById("tokenCount").innerText;
    const cost = document.getElementById("cost").innerText;

    const trimmed = document.getElementById("trimmedPrompt").innerText;
    const optimized = document.getElementById("optimizedPrompt").innerText;

    const optTokens = document.getElementById("optimizedTokens").innerText;
    const optCost = document.getElementById("optimizedCost").innerText;
    const tokenSaved = document.getElementById("tokenSavings").innerText;
    const costSaved = document.getElementById("costSavings").innerText;
    const reduction = document.getElementById("percentageSaved").innerText;

    const originalPrompt = document.getElementById("prompt").value;

    pdf.setFontSize(20);
    pdf.text("TokenScope Report",20,y);

    y += 15;
    checkPageBreak();

    pdf.setFontSize(12);
    pdf.text(`Original Tokens: ${tokenCount}`,20,y);
    y += 8;
    checkPageBreak();

    pdf.text(`Estimated Cost: $${cost}`,20,y);
    y += 12;
    checkPageBreak();

    pdf.setFontSize(14);
    pdf.text("Original Prompt",20,y);
    y += 8;

    let lines = pdf.splitTextToSize(originalPrompt,170);

    lines.forEach(line=>{
        pdf.text(line,20,y);
        y += 6;
        checkPageBreak();
    });

    y += 10;

    pdf.setFontSize(14);
    pdf.text("Trimmed Prompt",20,y);
    y += 8;

    lines = pdf.splitTextToSize(trimmed,170);

    lines.forEach(line=>{
        pdf.text(line,20,y);
        y += 6;
        checkPageBreak();
    });

    y += 10;

    pdf.setFontSize(14);
    pdf.text("Optimized Prompt",20,y);
    y += 8;

    lines = pdf.splitTextToSize(optimized,170);

    lines.forEach(line=>{
        pdf.text(line,20,y);
        y += 6;
        checkPageBreak();
    });

    y += 10;

    pdf.setFontSize(14);
    pdf.text("Optimization Comparison",20,y);
    y += 10;

    pdf.setFontSize(11);

    const comparison = [
        `Optimized Tokens: ${optTokens}`,
        `Optimized Cost: $${optCost}`,
        `Tokens Saved: ${tokenSaved}`,
        `Cost Saved: $${costSaved}`,
        `Reduction: ${reduction}%`
    ];

    comparison.forEach(item=>{
        pdf.text(item,20,y);
        y += 8;
        checkPageBreak();
    });

    pdf.save("TokenScope_Report.pdf");
}