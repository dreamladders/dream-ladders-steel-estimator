function calculateSteel() {

    let length = parseFloat(document.getElementById('length').value);
    let width = parseFloat(document.getElementById('width').value);

    let cover = parseFloat(document.getElementById('cover').value);

    let mainDia = parseFloat(document.getElementById('mainDia').value);
    let mainSpacing = parseFloat(document.getElementById('mainSpacing').value);

    let distDia = parseFloat(document.getElementById('distDia').value);
    let distSpacing = parseFloat(document.getElementById('distSpacing').value);

    let steelRate = parseFloat(document.getElementById('steelRate').value);

    if (!length || !width) {
        alert("Please enter slab dimensions");
        return;
    }

    // Convert to mm
    let lengthMM = length * 1000;
    let widthMM = width * 1000;

    // Short span and long span
    let shortSpan = Math.min(lengthMM, widthMM);
    let longSpan = Math.max(lengthMM, widthMM);

    // Main bars
    let mainBars = Math.floor(longSpan / mainSpacing) + 1;
    let mainCutLength = (shortSpan - (2 * cover)) / 1000;
    let mainTotalLength = mainBars * mainCutLength;
    let mainWeight = ((mainDia * mainDia) / 162) * mainTotalLength;

    // Distribution bars
    let distBars = Math.floor(shortSpan / distSpacing) + 1;
    let distCutLength = (longSpan - (2 * cover)) / 1000;
    let distTotalLength = distBars * distCutLength;
    let distWeight = ((distDia * distDia) / 162) * distTotalLength;

    // Total
    let totalWeight = mainWeight + distWeight;
    let totalCost = totalWeight * steelRate;

    document.getElementById('output').innerHTML = `

        <div class="result-item">
            <h3>Main Bars (Short Span Direction)</h3>
            <p>Number of Bars: <span class="highlight">${mainBars}</span></p>
            <p>Cutting Length: <span class="highlight">${mainCutLength.toFixed(2)} m</span></p>
            <p>Total Length: <span class="highlight">${mainTotalLength.toFixed(2)} m</span></p>
            <p>Total Weight: <span class="highlight">${mainWeight.toFixed(2)} kg</span></p>
        </div>

        <div class="result-item">
            <h3>Distribution Bars (Long Span Direction)</h3>
            <p>Number of Bars: <span class="highlight">${distBars}</span></p>
            <p>Cutting Length: <span class="highlight">${distCutLength.toFixed(2)} m</span></p>
            <p>Total Length: <span class="highlight">${distTotalLength.toFixed(2)} m</span></p>
            <p>Total Weight: <span class="highlight">${distWeight.toFixed(2)} kg</span></p>
        </div>

        <div class="result-item">
            <h3>Total Steel Requirement</h3>
            <p>Total Steel Weight: <span class="highlight">${totalWeight.toFixed(2)} kg</span></p>
            <p>Estimated Steel Cost: <span class="highlight">₹ ${totalCost.toFixed(2)}</span></p>
        </div>

    `;
}
