// CalatheaZinnen.js

// Ensure the array of sentences is specific to Calathea
const calatheaZinnen = [
    "Calathea houdt van helder, indirect zonlicht, maar geen fel direct zonlicht.",
    "Zorg voor een hoge luchtvochtigheid; regelmatig sproeien of een kiezelbak is gunstig.",
    "De bladeren sluiten 's nachts, vandaar de naam 'Living Plant'.",
    "Houd de grond constant vochtig, maar vermijd doorweekte grond.",
    "Bescherm tegen koude tocht en plotselinge temperatuurveranderingen.",
    "Veeg de bladeren regelmatig af om stof te verwijderen en de lichtabsorptie te verbeteren."
];

let calatheaIndex = 0;
// Use the correct IDs from calathea.html
const calatheaSlider = document.getElementById("calatheaSliderText");
const calatheaNextBtn = document.getElementById("calatheaNextBtn");

function showNextCalatheaZin() {
    // Add a check to ensure the elements exist before trying to manipulate them
    if (!calatheaSlider) {
        console.warn("calatheaSlider element not found. Slider functionality might not work.");
        return;
    }

    // Slide out
    calatheaSlider.style.transform = "translateY(-100%)";
    calatheaSlider.style.opacity = 0;

    setTimeout(() => {
        // Set new sentence
        calatheaSlider.textContent = calatheaZinnen[calatheaIndex];
        calatheaSlider.style.transform = "translateY(100%)";

        // Force reflow for smooth animation
        void calatheaSlider.offsetWidth;

        // Slide in
        calatheaSlider.style.transform = "translateY(0)";
        calatheaSlider.style.opacity = 1;

        // Next index
        calatheaIndex = (calatheaIndex + 1) % calatheaZinnen.length;
    }, 500);
}

// Initial display of the first sentence when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (calatheaSlider) { // Check if the element exists
        calatheaSlider.textContent = calatheaZinnen[calatheaIndex];
        calatheaIndex = (calatheaIndex + 1) % calatheaZinnen.length; // Prepare for the next one
    }
});


// Automatic every 3 seconds (or adjust as needed)
let calatheaInterval = setInterval(showNextCalatheaZin, 3000);

// Manual click on button
if (calatheaNextBtn) { // Check if the button element exists
    calatheaNextBtn.addEventListener("click", () => {
        showNextCalatheaZin();

        // Reset interval so manual clicking restarts the timer
        clearInterval(calatheaInterval);
        calatheaInterval = setInterval(showNextCalatheaZin, 3000);
    });
}