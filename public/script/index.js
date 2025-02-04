
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

// update item status is it is expire
async function updateExpiredItemStatus(itemId) {
    try {
        const response = await fetch(`/live/auction/item/${itemId}/expire`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to update item status');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating item status:', error);
    }
}


function formatTimeRemaining() {
    const items = document.querySelectorAll('.item-remTime'); 

    items.forEach(async item => {
        const endTime = item.getAttribute('data-endtime');
        const endDate = new Date(endTime);
        const currentDate = new Date();
        const timeDiff = endDate - currentDate;
        const timeRemainingDisplay = item.querySelector('#timeRemainingDisplay');
        const itemId = item.getAttribute('data-item-id'); // Add this attribute to your HTML

        if (timeDiff <= 0) {
            timeRemainingDisplay.textContent = "Expired";
            const placeBidButton = document.querySelector('#item-place-bid');
            if (placeBidButton) {
                placeBidButton.innerText = "Expired";
                placeBidButton.style.pointerEvents = "none";
                placeBidButton.classList.add('disabled');
            }
            // Update status in database if not already updated
            if (!item.hasAttribute('data-status-updated')) {
                const result = await updateExpiredItemStatus(itemId);
                if (result?.success) {
                    item.setAttribute('data-status-updated', 'true');
                }
            }
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


function checkExpiry(event) {
    const form = event.currentTarget; // Get the form
    const button = form.querySelector('button'); // Get the button inside form
    const endTime = new Date(form.parentElement.previousElementSibling.querySelector('.item-remTime').getAttribute('data-endtime'));
    const currentTime = new Date();

    if (endTime <= currentTime) {
        event.preventDefault();
        button.innerText = "Expired";
        button.style.color = "black";
        button.style.pointerEvents = "none";
        button.disabled = true;
        button.classList.add("disabled");
        return false;
    }
    return true;
}

// Disable button on page load if expired
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".item-bid-button form");
    const button = form.querySelector("button");
    const endTime = new Date(document.querySelector(".item-remTime").getAttribute("data-endtime"));
    const currentTime = new Date();

    if (endTime <= currentTime) {
        button.innerText = "Expired";
        button.style.color = "black";
        button.style.pointerEvents = "none";
        button.disabled = true;
        button.classList.add("disabled");
    }
});

