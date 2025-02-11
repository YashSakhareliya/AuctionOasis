document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const navLinks = document.querySelector(".nav-links");
    const navContainer = document.querySelector(".nav-links-container");
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    // Function to check screen size
    function isMobileView() {
        return window.innerWidth <= 768;
    }

    // Toggle hamburger menu
    hamburgerMenu.addEventListener("click", function (e) {
        if (isMobileView()) {
            e.stopPropagation();
            navLinks.classList.toggle("show");
        }
    });

    // Toggle profile dropdown
    profileBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        profileDropdown.classList.toggle("show-dropdown");
    });

    // Close menus if clicked outside
    document.addEventListener("click", function (e) {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove("show-dropdown");
        }
    });

    // Close the hamburger menu if clicked outside (on mobile)
    document.addEventListener("click", function (e) {
        if (isMobileView() && !hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("show");
        }
    });
});
