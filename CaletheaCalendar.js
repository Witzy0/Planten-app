// CalatheaCalendar.js
let currentCalatheaCalendarDate;
let calatheaCalendarRendered = false; // Flag to know if calendar has been rendered once

function initializeCalatheaCalendar() {
    const monthYear = document.getElementById('calathea-month-year');
    const daysContainer = document.getElementById('calathea-days');
    const prevButton = document.getElementById('calathea-prev');
    const nextButton = document.getElementById('calathea-next');

    // Only proceed if elements exist (important for PJAX)
    if (!monthYear || !daysContainer || !prevButton || !nextButton) {
        console.warn("Calathea Calendar elements not found, skipping initialization.");
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    currentCalatheaCalendarDate = new Date(); // Reset currentDate to today's date
    const today = new Date();

    function renderCalatheaCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = '';

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }

        const totalDaysDisplayed = daysContainer.children.length;
        const remainingCells = 42 - totalDaysDisplayed; // Ensure 6 full weeks
        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    // Assign event listeners
    prevButton.onclick = function () { // Using onclick to manage single handler
        currentCalatheaCalendarDate.setMonth(currentCalatheaCalendarDate.getMonth() - 1);
        renderCalatheaCalendar(currentCalatheaCalendarDate);
    };

    nextButton.onclick = function () { // Using onclick to manage single handler
        currentCalatheaCalendarDate.setMonth(currentCalatheaCalendarDate.getMonth() + 1);
        renderCalatheaCalendar(currentCalatheaCalendarDate);
    };

    renderCalatheaCalendar(currentCalatheaCalendarDate);
    calatheaCalendarRendered = true; // Set flag to true once rendered
}

function cleanupCalatheaCalendar() {
    if (calatheaCalendarRendered) {
        const prevButton = document.getElementById('calathea-prev');
        const nextButton = document.getElementById('calathea-next');
        if (prevButton) prevButton.onclick = null; // Remove event listener
        if (nextButton) nextButton.onclick = null; // Remove event listener
        calatheaCalendarRendered = false; // Reset flag
    }
}

// Initial call on DOMContentLoaded if this is the initial page load for calathea.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('calathea.html')) {
        initializeCalatheaCalendar();
    }
});