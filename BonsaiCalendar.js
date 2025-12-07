// BonsaiCalendar.js
let currentBonsaiCalendarDate;
let bonsaiCalendarRendered = false; // Flag to know if calendar has been rendered once

function initializeBonsaiCalendar() {
    const monthYear = document.getElementById('bonsai-month-year');
    const daysContainer = document.getElementById('bonsai-days');
    const prevButton = document.getElementById('bonsai-prev');
    const nextButton = document.getElementById('bonsai-next');

    // Only proceed if elements exist
    if (!monthYear || !daysContainer || !prevButton || !nextButton) {
        console.warn("Bonsai Calendar elements not found, skipping initialization.");
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    currentBonsaiCalendarDate = new Date(); // Reset currentDate to today's date
    const today = new Date();

    function renderBonsaiCalendar(date) {
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
    prevButton.onclick = function () {
        currentBonsaiCalendarDate.setMonth(currentBonsaiCalendarDate.getMonth() - 1);
        renderBonsaiCalendar(currentBonsaiCalendarDate);
    };

    nextButton.onclick = function () {
        currentBonsaiCalendarDate.setMonth(currentBonsaiCalendarDate.getMonth() + 1);
        renderBonsaiCalendar(currentBonsaiCalendarDate);
    };

    renderBonsaiCalendar(currentBonsaiCalendarDate);
    bonsaiCalendarRendered = true;
}

function cleanupBonsaiCalendar() {
    if (bonsaiCalendarRendered) {
        const prevButton = document.getElementById('bonsai-prev');
        const nextButton = document.getElementById('bonsai-next');
        if (prevButton) prevButton.onclick = null;
        if (nextButton) nextButton.onclick = null;
        bonsaiCalendarRendered = false;
    }
}

// Initial call on DOMContentLoaded if this is the initial page load for bonsai.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('bonsai.html')) {
        initializeBonsaiCalendar();
    }
});