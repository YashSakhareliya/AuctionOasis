const tabs =  document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab=>{
    tab.addEventListener('click',(e)=>{
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to the clicked tab and corresponding content
        tab.classList.add("active");
        const target = tab.dataset.tab;
        document.getElementById(target).classList.add("active");
    })
})

document.addEventListener('DOMContentLoaded',()=>{
    const editProfileSection = document.getElementById('edit-profile-section');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileOverlay = document.getElementById('edit-profile-overlay');
    const saveProfileBtn = document.getElementById('save-profile');
    const cancelProfileBtn = document.getElementById('cancel-profile');
    const profileSection = document.querySelector('.profile-container');
    
    editProfileBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        editProfileSection.style.display = "block"; // Show the edit profile section
        editProfileOverlay.classList.add("active"); // Show the overlay
       
    });

    cancelProfileBtn.addEventListener("click", function () {
        editProfileSection.style.display = "none"; // Hide the edit profile section
        editProfileOverlay.classList.remove("active"); // Hide the overlay
       
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const listItemSection = document.getElementById('list-item-section');
    const listItemBtn = document.querySelector('.list-item-btn'); 
    const cancelItemBtn = document.getElementById('cancel-item-btn');
    const listItemOverlay = document.getElementById('edit-profile-overlay'); 
    
    
    // Open List Item Form
    listItemBtn.addEventListener('click', (e) => {
        e.preventDefault();
        listItemSection.style.display = "block"; // Show the list item section
        listItemOverlay.classList.add("active"); // Show the overlay
    });

    // Cancel List Item Form
    cancelItemBtn.addEventListener('click', () => {
        listItemSection.style.display = "none"; // Hide the list item section
        listItemOverlay.classList.remove("active"); // Hide the overlay
    });
});


