document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("hamburger-menu");
    const navContainer = document.querySelector(".nav-links-container");
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    // Toggle nav menu
    menuToggle.addEventListener("click", function () {
        navContainer.classList.toggle("active");
    });

    // Profile dropdown toggle with document click handling
    document.addEventListener("click", function (e) {
        // Check if the clicked target is the profile button
        if (profileBtn && profileBtn.contains(e.target)) {
            e.preventDefault();
            profileDropdown.classList.toggle("show-dropdown");
            e.stopPropagation();
            return;
        }

        // Close dropdown if clicked outside
        if (profileDropdown && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove("show-dropdown");
        }
    });
});

