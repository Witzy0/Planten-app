const zinnen = [
  " Snijd de bladen alleen als het nodig is, ze groeien niet terug.",
  " Vermijd direct zonlicht.",
  " Het sap uit de bladen zijn er nuttig voor je huid.",

];

let index = 0;
const slider = document.getElementById("sliderText");
const nextBtn = document.getElementById("nextBtn");

function toonVolgendeZin() {
  // Slide out
  slider.style.transform = "translateY(-100%)";
  slider.style.opacity = 0;

  setTimeout(() => {
    // Nieuwe zin zetten
    slider.textContent = zinnen[index];
    slider.style.transform = "translateY(100%)";

    // Force reflow
    void slider.offsetWidth;

    // Slide in
    slider.style.transform = "translateY(0)";
    slider.style.opacity = 1;

    // Volgende index
    index = (index + 1) % zinnen.length;
  }, 500);
}

// Automatisch elke 3 sec
let interval = setInterval(toonVolgendeZin, 3000);

// Handmatig klikken op knop
nextBtn.addEventListener("click", () => {
  toonVolgendeZin();

  // Reset interval zodat handmatig klikken de tijd herstart
  clearInterval(interval);
  interval = setInterval(toonVolgendeZin, 3000);
});