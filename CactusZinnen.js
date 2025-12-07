
const zinnen = [
  " Je hoeft je cactus bijna geen water te geven in de winter.",
  " Cactussen houden van direct zonlicht.",
  " Het kan jaren duren voor een cactus kan bloeien.",
];

let index = 0;
let slider; 
let nextBtn;
let interval; 


function initializeCactusZinnen() {
    slider = document.getElementById("sliderText");
    nextBtn = document.getElementById("nextBtn");

    
    if (!slider || !nextBtn) {
        console.warn("Slider elements not found, skipping initialization.");
        return;
    }

    
    clearInterval(interval);

    
    slider.textContent = zinnen[index];

    
    interval = setInterval(toonVolgendeZin, 3000);

    
    nextBtn.addEventListener("click", handleNextButtonClick);
}

function toonVolgendeZin() {
    
    slider.style.transform = "translateY(-100%)";
    slider.style.opacity = 0;

    setTimeout(() => {
        
        index = (index + 1) % zinnen.length; 
        slider.textContent = zinnen[index];
        slider.style.transform = "translateY(100%)";

        
        void slider.offsetWidth;

        
        slider.style.transform = "translateY(0)";
        slider.style.opacity = 1;

    }, 600); 
}

function handleNextButtonClick() {
    toonVolgendeZin();

    
    clearInterval(interval);
    interval = setInterval(toonVolgendeZin, 3000);
}



document.addEventListener('DOMContentLoaded', () => {
    
    if (window.location.pathname.endsWith('cactus.html')) {
        initializeCactusZinnen();
    }
});

