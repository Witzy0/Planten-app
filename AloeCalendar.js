// AloeCalendar.js
let currentAloeCalendarDate;
let aloeCalendarRendered = false; // Flag to know if calendar has been rendered once

function initializeAloeCalendar() {
    const monthYear = document.getElementById('aloe-month-year');
    const daysContainer = document.getElementById('aloe-days');
    const prevButton = document.getElementById('aloe-prev');
    const nextButton = document.getElementById('aloe-next');

    // Only proceed if elements exist (important for PJAX)
    if (!monthYear || !daysContainer || !prevButton || !nextButton) {
        console.warn("Aloe Calendar elements not found, skipping initialization.");
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    currentAloeCalendarDate = new Date(); // Reset currentDate to today's date
    const today = new Date();

    function renderAloeCalendar(date) {
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
    prevButton.onclick = function() { // Using onclick to manage single handler
        currentAloeCalendarDate.setMonth(currentAloeCalendarDate.getMonth() - 1);
        renderAloeCalendar(currentAloeCalendarDate);
    };

    nextButton.onclick = function() { // Using onclick to manage single handler
        currentAloeCalendarDate.setMonth(currentAloeCalendarDate.getMonth() + 1);
        renderAloeCalendar(currentAloeCalendarDate);
    };

    renderAloeCalendar(currentAloeCalendarDate);
    aloeCalendarRendered = true; // Set flag to true once rendered
}

function cleanupAloeCalendar() {
    if (aloeCalendarRendered) {
        const prevButton = document.getElementById('aloe-prev');
        const nextButton = document.getElementById('aloe-next');
        if (prevButton) prevButton.onclick = null; // Remove event listener
        if (nextButton) nextButton.onclick = null; // Remove event listener
        aloeCalendarRendered = false; // Reset flag
    }
}

// Initial call on DOMContentLoaded if this is the initial page load for aloevera.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('aloevera.html')) {
        initializeAloeCalendar();
    }
});