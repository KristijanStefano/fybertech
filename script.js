// Фиксна почетна дата
const startDate = new Date("Dec 5, 2025 14:30:00");
startDate.setDate(startDate.getDate() + 20);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = startDate.getTime() - now;

    const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');


    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    daysEl.parentElement.style.background = `conic-gradient(#fff ${100-((days/20)*100)}%, rgba(255, 255, 255, 0.227) 0% 100%)`;
    hoursEl.parentElement.style.background = `conic-gradient(#fff ${100-((hours/24)*100)}%, rgba(255, 255, 255, 0.227) 0% 100%)`;
    minutesEl.parentElement.style.background = `conic-gradient(#fff ${100-((minutes/60)*100)}%, rgba(255, 255, 255, 0.227) 0% 100%)`;
    secondsEl.parentElement.style.background = `conic-gradient(#fff ${100-((seconds/60)*100)}%, rgba(255, 255, 255, 0.227) 0% 100%)`;
}

updateCountdown();
setInterval(updateCountdown, 1000);