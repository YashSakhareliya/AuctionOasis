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
    const editProfileSection = document.getElementById('edit-profile-section')
    const editProfileBtn = document.getElementById('edit-profile-btn')
    const editProfileOverlay = document.getElementById('"edit-profile-overlay')
    const saveProfileBtn = document.getElementById('save-profile')
    const cancleProfileBtn = document.getElementById('cancel-profile')
    const profileSection = document.getElementsByClassName('profile-section') 
    
    editProfileBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        editProfileSection.classList.toggle('hidden')
        profileSection.classList.toggle('blur-background')
        editProfileOverlay.style.display = 'block'
    })

    cancleProfileBtn.addEventListener("click", function () {
        editProfileSection.classList.add("hidden");
        profileSection.classList.remove("blur-background"); // Remove the blur effect
        editProfileOverlay.style.display = "none"; // Hide the overlay
    });
})