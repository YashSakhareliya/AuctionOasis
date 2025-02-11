// Initialize Lucide icons
lucide.createIcons();

// Sample data
const bidders = [
    {
        id: '1',
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastBid: 15500,
        rank: 1
    },
    {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastBid: 15000,
        rank: 2
    }
];

// DOM Elements
const biddersList = document.getElementById('biddersList');
const bidIncrements = document.querySelectorAll('.bid-increment');
const bidInput = document.getElementById('bidAmount');
const timeLeft = document.getElementById('timeLeft');

// Event Listeners
bidIncrements.forEach(button => {
    button.addEventListener('click', () => {
        const increment = parseInt(button.textContent.replace(/[^0-9]/g, ''));
        const currentValue = parseInt(bidInput.value) || 0;
        bidInput.value = currentValue + increment;
    });
});

// Functions
function renderBidders() {
    biddersList.innerHTML = bidders.map(bidder => `
        <div class="bidder-card ${bidder.rank === 1 ? 'top-bidder' : ''}">
            <div class="bidder-info">
                ${bidder.rank === 1 ? '<i data-lucide="crown" class="icon-sm" style="color: #eab308;"></i>' : ''}
                <div class="bidder-avatar">
                    <img src="${bidder.avatar}" alt="${bidder.name}">
                </div>
                <div class="bidder-details">
                    <span class="bidder-name">${bidder.name}</span>
                    <span class="bidder-bid">$${bidder.lastBid.toLocaleString()}</span>
                </div>
            </div>
            <span class="bidder-rank ${bidder.rank === 1 ? 'top' : ''}">#${bidder.rank}</span>
        </div>
    `).join('');

    // Reinitialize icons for newly added content
    lucide.createIcons();
}

// Simulate countdown timer
function updateTimer() {
    let minutes = 5;
    let seconds = 30;

    const timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        timeLeft.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Simulate real-time bid updates
function simulateBidUpdates() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            bidders.forEach(bidder => {
                if (Math.random() > 0.5) {
                    bidder.lastBid += Math.floor(Math.random() * 500) + 100;
                }
            });

            // Sort bidders by bid amount and update ranks
            bidders.sort((a, b) => b.lastBid - a.lastBid)
                .forEach((bidder, index) => {
                    bidder.rank = index + 1;
                });

            renderBidders();
        }
    }, 3000);
}

// Initialize
renderBidders();
updateTimer();
simulateBidUpdates();