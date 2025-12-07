document.addEventListener('DOMContentLoaded', function () {
    const upArrow = document.getElementById('upArrow');
    const downArrow = document.getElementById('downArrow');
    const navigationDotsContainer = document.querySelector('.navigation-dots'); // Selecteer de dots container

    const plantSections = [
        document.getElementById('cactusSection'),
        document.getElementById('aloeveraSection'),
        document.getElementById('calatheaSection'),
        document.getElementById('graslelieSection'),
        document.getElementById('bonsaiSection')
    ].filter(Boolean); // .filter(Boolean) verwijdert null-waarden als een ID niet gevonden wordt

    let currentSectionIndex = 0; // Begin bij de eerste sectie (cactus)
    let dots = []; // Array om de dot elementen op te slaan

    // Functie om de dots aan te maken
    function createNavigationDots() {
        navigationDotsContainer.innerHTML = ''; // Zorg ervoor dat het leeg is voordat je nieuwe dots toevoegt
        plantSections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = index; // Sla de index op in een data-attribuut

            dot.addEventListener('click', () => {
                scrollToSection(index); // Scroll naar de sectie als op de dot wordt geklikt
            });

            navigationDotsContainer.appendChild(dot);
            dots.push(dot); // Voeg de dot toe aan de dots array
        });
        updateActiveDot(); // Update direct de actieve dot
    }

    // Functie om de actieve dot te updaten
    function updateActiveDot() {
        dots.forEach((dot, index) => {
            if (index === currentSectionIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Functie om naar een specifieke sectie te scrollen
    function scrollToSection(index) {
        if (index >= 0 && index < plantSections.length) {
            plantSections[index].scrollIntoView({
                behavior: 'smooth'
            });
            currentSectionIndex = index;
            updateActiveDot(); // Update de dot na het scrollen
        }
    }

    // Event listener voor de 'omhoog' pijl
    upArrow.addEventListener('click', function () {
        if (currentSectionIndex > 0) {
            scrollToSection(currentSectionIndex - 1);
        } else {
            // Als we bij de eerste sectie zijn, scroll dan naar de laatste (cyclisch)
            scrollToSection(plantSections.length - 1);
        }
    });

    // Event listener voor de 'omlaag' pijl
    downArrow.addEventListener('click', function () {
        if (currentSectionIndex < plantSections.length - 1) {
            scrollToSection(currentSectionIndex + 1);
        } else {
            // Als we bij de laatste sectie zijn, scroll dan naar de eerste (cyclisch)
            scrollToSection(0);
        }
    });

    // Event listener voor het detecteren van handmatig scrollen (voor de dots)
    // We gebruiken Intersection Observer om te zien welke sectie zichtbaar is
    const observerOptions = {
        root: null, // De viewport is de root
        rootMargin: '0px',
        threshold: 0.7 // Een sectie is actief als 70% ervan zichtbaar is
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Zoek de index van de zichtbare sectie in de plantSections array
                const visibleSectionIndex = plantSections.findIndex(section => section.id === entry.target.id);
                if (visibleSectionIndex !== -1 && visibleSectionIndex !== currentSectionIndex) {
                    currentSectionIndex = visibleSectionIndex;
                    updateActiveDot();
                }
            }
        });
    }, observerOptions);

    // Observer elke plantensectie
    plantSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Roep de functie aan om de dots te maken bij het laden van de pagina
    createNavigationDots();
});


