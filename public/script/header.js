 // Show the dropdown menu when profile icon is clicked
 document.getElementById("profile-icon").addEventListener("click", function (e) {
    e.preventDefault();
    var dropdown = document.getElementById("profile-dropdown");
    dropdown.classList.toggle("show-dropdown"); // Toggle dropdown visibility
});

// Close the dropdown if user clicks outside of the menu
window.addEventListener("click", function (e) {
    var dropdown = document.getElementById("profile-dropdown");
    var profileBtn = document.getElementById("profile-btn");
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show-dropdown");
    }
});