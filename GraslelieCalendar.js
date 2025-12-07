// GraslelieCalendar.js
let currentGraslelieCalendarDate;
let graslelieCalendarRendered = false; // Flag to know if calendar has been rendered once

function initializeGraslelieCalendar() {
    const monthYear = document.getElementById('graslelie-month-year');
    const daysContainer = document.getElementById('graslelie-days');
    const prevButton = document.getElementById('graslelie-prev');
    const nextButton = document.getElementById('graslelie-next');

    // Only proceed if elements exist (important for PJAX or partial page loads)
    if (!monthYear || !daysContainer || !prevButton || !nextButton) {
        console.warn("Graslelie Calendar elements not found, skipping initialization.");
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    currentGraslelieCalendarDate = new Date(); // Reset currentDate to today's date
    const today = new Date();

    function renderGraslelieCalendar(date) {
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
    prevButton.onclick = function() {
        currentGraslelieCalendarDate.setMonth(currentGraslelieCalendarDate.getMonth() - 1);
        renderGraslelieCalendar(currentGraslelieCalendarDate);
    };

    nextButton.onclick = function() {
        currentGraslelieCalendarDate.setMonth(currentGraslelieCalendarDate.getMonth() + 1);
        renderGraslelieCalendar(currentGraslelieCalendarDate);
    };

    renderGraslelieCalendar(currentGraslelieCalendarDate);
    graslelieCalendarRendered = true;
}

function cleanupGraslelieCalendar() {
    if (graslelieCalendarRendered) {
        const prevButton = document.getElementById('graslelie-prev');
        const nextButton = document.getElementById('graslelie-next');
        if (prevButton) prevButton.onclick = null;
        if (nextButton) nextButton.onclick = null;
        graslelieCalendarRendered = false;
    }
}

// Initial call on DOMContentLoaded if this is the initial page load for graslelie.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('graslelie.html')) {
        initializeGraslelieCalendar();
    }
});