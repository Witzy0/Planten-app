// BonsaiZinnen.js

const bonsaiZinnen = [
    "Bonsai bomen hebben regelmatig water nodig; controleer de grond dagelijks.",
    "Zorg voor voldoende licht, vaak is een zonnige vensterbank ideaal, maar bescherm tegen brandende middagzon.",
    "Snoei je bonsai regelmatig om de vorm te behouden en nieuwe groei te stimuleren.",
    "Verpot je bonsai om de 1-3 jaar om de wortels gezond te houden.",
    "Gebruik speciale bonsaigrond die goed draineert.",
    "Bemest je bonsai tijdens het groeiseizoen volgens de instructies."
];

let bonsaiIndex = 0;
const bonsaiSlider = document.getElementById("bonsaiSliderText");
const bonsaiNextBtn = document.getElementById("bonsaiNextBtn");

function showNextBonsaiZin() {
    if (!bonsaiSlider) {
        console.warn("bonsaiSlider element not found. Slider functionality might not work.");
        return;
    }

    // Slide out
    bonsaiSlider.style.transform = "translateY(-100%)";
    bonsaiSlider.style.opacity = 0;

    setTimeout(() => {
        // Set new sentence
        bonsaiSlider.textContent = bonsaiZinnen[bonsaiIndex];
        bonsaiSlider.style.transform = "translateY(100%)";

        // Force reflow for smooth animation
        void bonsaiSlider.offsetWidth;

        // Slide in
        bonsaiSlider.style.transform = "translateY(0)";
        bonsaiSlider.style.opacity = 1;

        // Next index
        bonsaiIndex = (bonsaiIndex + 1) % bonsaiZinnen.length;
    }, 500);
}

// Initial display of the first sentence when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (bonsaiSlider) {
        bonsaiSlider.textContent = bonsaiZinnen[bonsaiIndex];
        bonsaiIndex = (bonsaiIndex + 1) % bonsaiZinnen.length;
    }
});

// Automatic every 3 seconds
let bonsaiInterval = setInterval(showNextBonsaiZin, 3000);

// Manual click on button
if (bonsaiNextBtn) {
    bonsaiNextBtn.addEventListener("click", () => {
        showNextBonsaiZin();

        // Reset interval so manual clicking restarts the timer
        clearInterval(bonsaiInterval);
        bonsaiInterval = setInterval(showNextBonsaiZin, 3000);
    });
}