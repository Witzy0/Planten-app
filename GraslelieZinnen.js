// GraslelieZinnen.js

const graslelieZinnen = [
    "Graslelies zijn gemakkelijk te verzorgen en passen zich goed aan.",
    "Ze gedijen het beste in helder, indirect licht.",
    "Houd de grond vochtig, maar niet doorweekt. Laat de toplaag tussen gietbeurten indrogen.",
    "Graslelies zijn uitstekende luchtzuiveraars.",
    "Ze produceren kleine 'babyplantjes' (spiderettes) die je kunt stekken.",
    "Geef in de lente en zomer eens per maand plantenvoeding, maar halveer de dosering."
];

let graslelieIndex = 0;
const graslelieSlider = document.getElementById("graslelieSliderText");
const graslelieNextBtn = document.getElementById("graslelieNextBtn");

function showNextGraslelieZin() {
    if (!graslelieSlider) {
        console.warn("graslelieSlider element not found. Slider functionality might not work.");
        return;
    }

    // Slide out
    graslelieSlider.style.transform = "translateY(-100%)";
    graslelieSlider.style.opacity = 0;

    setTimeout(() => {
        // Set new sentence
        graslelieSlider.textContent = graslelieZinnen[graslelieIndex];
        graslelieSlider.style.transform = "translateY(100%)";

        // Force reflow for smooth animation
        void graslelieSlider.offsetWidth;

        // Slide in
        graslelieSlider.style.transform = "translateY(0)";
        graslelieSlider.style.opacity = 1;

        // Next index
        graslelieIndex = (graslelieIndex + 1) % graslelieZinnen.length;
    }, 500);
}

// Initial display of the first sentence when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (graslelieSlider) {
        graslelieSlider.textContent = graslelieZinnen[graslelieIndex];
        graslelieIndex = (graslelieIndex + 1) % graslelieZinnen.length;
    }
});

// Automatic every 3 seconds
let graslelieInterval = setInterval(showNextGraslelieZin, 3000);

// Manual click on button
if (graslelieNextBtn) {
    graslelieNextBtn.addEventListener("click", () => {
        showNextGraslelieZin();

        // Reset interval so manual clicking restarts the timer
        clearInterval(graslelieInterval);
        graslelieInterval = setInterval(showNextGraslelieZin, 3000);
    });
}