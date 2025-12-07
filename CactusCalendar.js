// CactusCalendar.js
let currentCalendarDate; // Global for this script
let calendarRendered = false; // Flag to know if calendar has been rendered once

function initializeCactusCalendar() {
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Add null checks for calendar elements
    if (!monthYear || !daysContainer || !prevButton || !nextButton) {
        console.warn("Calendar elements not found, skipping calendar initialization.");
        return;
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Reset currentDate to today's date whenever the calendar is (re)initialized
    currentCalendarDate = new Date();
    const today = new Date(); // Today's date remains constant for 'today' class

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = ''; // Clear previous days

        // Previous month's dates
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }

        // Current month's dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            daysContainer.appendChild(dayDiv);
        }

        // Next month's dates
        // Calculate days to fill the last row to complete 6 weeks (if needed)
        // Or simply to fill out the last week if the last day of month doesn't end on a Sat
        const totalDaysDisplayed = daysContainer.children.length;
        const remainingCells = 42 - totalDaysDisplayed; // Max 6 rows * 7 days = 42 cells

        for (let i = 1; i <= remainingCells; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade');
            daysContainer.appendChild(dayDiv);
        }
    }

    // Remove old listeners to prevent duplicates if initialize is called multiple times
    // This requires references to the old handlers or cloning elements
    // A simpler way with PJAX is to re-render the whole content and re-initialize

    prevButton.onclick = function() { // Use onclick directly to replace previous handlers
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar(currentCalendarDate);
    };

    nextButton.onclick = function() { // Use onclick directly
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar(currentCalendarDate);
    };

    renderCalendar(currentCalendarDate); // Initial render
    calendarRendered = true; // Set flag
}

// Global cleanup function for calendar
function cleanupCactusCalendar() {
    if (calendarRendered) {
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        if (prevButton) prevButton.onclick = null; // Remove handler
        if (nextButton) nextButton.onclick = null; // Remove handler
        calendarRendered = false; // Reset flag
    }
}

// Initial call on DOMContentLoaded if this is the initial page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('cactus.html')) {
        initializeCactusCalendar();
    }
});