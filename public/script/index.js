
document.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.scroll-reveal'); 

    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });

   
});

function formatTimeRemaining() {
    const items = document.querySelectorAll('.item-remTime'); 

    items.forEach(item => {
        const endTime = item.getAttribute('data-endtime'); 
        const endDate = new Date(endTime); // Convert to Date object
        const currentDate = new Date(); // Get the current date and time

        
        const timeDiff = endDate - currentDate;

        const timeRemainingDisplay = item.querySelector('#timeRemainingDisplay');

        if (timeDiff <= 0) {
            timeRemainingDisplay.textContent = "Expired";
            return;
        }

       
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Display the remaining time
        timeRemainingDisplay.textContent = `${days}D ${hours}H ${minutes}M`;
    });
}

// Update every second
setInterval(formatTimeRemaining, 1000);
