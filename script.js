 const targetDate = new Date();
 targetDate.setDate(targetDate.getDate() + 20);

 function updateCountdown() {
     const now = new Date().getTime();
     const distance = targetDate.getTime() - now;

     if (distance < 0) {
         document.getElementById('days').textContent = '0';
         document.getElementById('hours').textContent = '0';
         document.getElementById('minutes').textContent = '0';
         document.getElementById('seconds').textContent = '0';
         return;
     }

     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

     document.getElementById('days').textContent = days;
     document.getElementById('hours').textContent = hours;
     document.getElementById('minutes').textContent = minutes;
     document.getElementById('seconds').textContent = seconds;
 }

 updateCountdown();
 setInterval(updateCountdown, 1000);