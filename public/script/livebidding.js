// Initialize Lucide icons
lucide.createIcons();

// Sample data
let auctions = [];


const fetchAuctions = async () => {

    const pathUrl = window.location.pathname;

    try {
        const response = await fetch(pathUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        auctions = data.items; 
    } catch (error) {
        console.error('Error fetching auctions:', error);
    }
    
};

// DOM Elements
const biddingTabs = document.getElementById('biddingTabs');
const auctionsList = document.getElementById('auctionsList');

// Event Listeners
biddingTabs.addEventListener('click', handleTabClick);

// Functions
function handleTabClick(e) {
    if (e.target.classList.contains('tab-btn')) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter and render auctions
        const status = e.target.dataset.tab;
        renderAuctions(filterAuctions(status));
    }
}

function filterAuctions(status) {
    return auctions.filter(auction => {
        switch (status) {
            case 'upcoming':
                return auction.status === 'live';
            case 'active':
                return auction.status === 'active';
            case 'ended':
                return auction.status === 'ended';
            default:
                return true;
        }
    });
}

function renderAuctions(filteredAuctions) {
    auctionsList.innerHTML = filteredAuctions.map(auction => `
        <div class="auction-card">
            <div class="auction-image">
                <img src="${auction.image}" alt="${auction.name}">
            </div>
            <div class="auction-content">
                <div class="auction-header">
                    <h2>${auction.name}</h2>
                    <div class="time-remaining">
                        <i data-lucide="clock" class="icon-sm"></i>
                        <p class="item-remTime" data-endtime="${auction.timeRemaining}"><span id="timeRemainingDisplay"></span></p>
                    </div>
                </div>
                <div class="auction-stats">
                    <div class="stat">
                        <p class="stat-label">Current Bid</p>
                        <p class="stat-value">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div class="stat">
                        <p class="stat-label">Total Bids</p>
                        <p class="stat-value">${auction.recentBids.length}</p>
                    </div>
                    <div class="stat">
                        <p class="stat-label">Participants</p>
                        <p class="stat-value">${auction.participants.length}</p>
                    </div>
                </div>
                <div class="auction-actions">
                    ${auction.status === 'active' ? `
                        <button class="btn-primary" onclick="renderItemPage('${auction._id}')">
                            <i data-lucide="users" class="icon-sm"></i>
                            Join Group Bidding
                        </button>
                    ` : `
                        <button class="btn-primary btn-green">
                            <i data-lucide="dollar-sign" class="icon-sm"></i>
                            View Auction
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    // Reinitialize icons for newly added content
    lucide.createIcons();
}

// need to work on this using event listener
const renderItemPage = (itemId) => {
    window.location.href = `/item/${itemId}`;
}

// Initial render
// document.querySelector('.tab-btn[data-tab="active"]').classList.add('active')
document.addEventListener("DOMContentLoaded", async ()=>{
    await fetchAuctions();
    renderAuctions(filterAuctions('upcoming'));
});