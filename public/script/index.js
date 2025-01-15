
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

// convert time into hours ans date format
function formatTimeRemaining() {
    const items = document.querySelectorAll('.item-remTime'); 

    items.forEach(item => {
        const endTime = item.getAttribute('data-endtime'); 
        const endDate = new Date(endTime); 
        const currentDate = new Date(); 


        const timeDiff = endDate - currentDate;

        if (timeDiff <= 0) {
            item.textContent = "Expired"; 
            return;
        }

       
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        
        item.textContent = `${days}D ${hours}H`;
    });
}


setInterval(formatTimeRemaining, 1000);

