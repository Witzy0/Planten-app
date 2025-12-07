const plantTimers = {
    "Bonsai": 3,
    "Aloë vera": 14,
    "Graslelie": 6,
    "Cactus": 21,
    "Calathea": 5,
};

const plantWaterAmount = {
    "Bonsai": [100, 150],
    "Aloë vera": [50, 100],
    "Graslelie": [100, 150],
    "Cactus": [30, 60],
    "Calathea": [150, 200],
};

const plantSelect = document.getElementById("plant-select");
const plantNameElement = document.getElementById("plant-name");
const timerText = document.getElementById("timer-text");
const waterText = document.getElementById("water-ml");
const waterElement = document.getElementById("water");
const alertBox = document.getElementById("alert");
const waterButton = document.getElementById("water-button");
let selectedPlant = plantSelect.value;
let lastWatered = null;
let notified = false;
let intervalId = null;
let canWater = true; // Nieuw: bepaalt wanneer je mag klikken

function getPlantEmoji(name) {
    if (name.includes("Bonsai")) return "🌳";
    if (name.includes("Aloë")) return "🌿";
    if (name.includes("Gras")) return "🌱";
    if (name.includes("Cactus")) return "🌵";
    if (name.includes("Calathea")) return "🌿";
    return "🌿";
}

function getTimerMs() {
    const testSeconds = 30;
    return testSeconds * 1000;
}


function getTotalWater() {
    const range = plantWaterAmount[selectedPlant] || [100, 150];
    return (range[0] + range[1]) / 2;
}

function notifyWaterNeeded() {
    alertBox.textContent = `🔔 ${selectedPlant} heeft NU water nodig!`;
    canWater = true; // Pas na melding mag opnieuw water gegeven worden
    waterButton.disabled = false; // Visueel knop weer aan
    if ("Notification" in window && Notification.permission === "granted" && !notified) {
        new Notification(`💧 ${selectedPlant} heeft water nodig!`, {
            body: `Vergeet niet water te geven aan je ${selectedPlant}.`,
            icon: "Icon.jpg"
        });
        notified = true;
    }
}

function updateUI() {
    if (!lastWatered) return;

    const now = Date.now();
    const msPassed = now - lastWatered;
    const timerMs = getTimerMs();
    const percentPassed = msPassed / timerMs;
    const percentLeft = Math.max(0, 1 - percentPassed);
    const waterLeft = Math.max(0, getTotalWater() * percentLeft);
    const heightPercent = percentLeft * 100;

    waterElement.style.height = `${heightPercent}%`;
    waterText.textContent = Math.round(waterLeft);

    if (percentPassed >= 1) {
        timerText.textContent = "💧 Tijd om water te geven!";
        notifyWaterNeeded();
    } else {
        const totalSeconds = getTimerMs() / 1000;
        const secondsLeft = Math.floor((1 - percentPassed) * totalSeconds);
        timerText.textContent = `Nog ${secondsLeft} seconde(n)`;
        alertBox.textContent = "";
        notified = false;
        waterButton.disabled = true; // Knop blokkeren tot melding
    }
}

function waterPlant() {
    if (!canWater && lastWatered) return; // Alleen toestaan als het mag

    lastWatered = Date.now();
    notified = false;
    canWater = false;
    waterButton.disabled = true; // Knop meteen uitschakelen na klikken
    updateUI();

    if (!intervalId) {
        intervalId = setInterval(updateUI, 1000);
    }
}

function changePlant() {
    selectedPlant = plantSelect.value;
    lastWatered = null;
    notified = false;
    canWater = true; // Eerste keer mag je meteen
    clearInterval(intervalId);
    intervalId = null;
    waterElement.style.height = "0%";
    waterText.textContent = "0";
    timerText.textContent = "💧 Geef nu water om te starten";
    plantNameElement.textContent = getPlantEmoji(selectedPlant) + " " + selectedPlant;
    alertBox.textContent = "";
    waterButton.disabled = false; // Knop actief bij nieuwe plant
}

plantSelect.addEventListener("change", changePlant);
waterButton.addEventListener("click", waterPlant);

if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
}

// Startwaarden
changePlant();
