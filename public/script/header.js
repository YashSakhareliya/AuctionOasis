// Event listener add on profile dropdown button
document.addEventListener("click", function (e) {
    var dropdown = document.getElementById("profile-dropdown");
    var profileBtn = document.getElementById("profile-btn");

    // Check if the clicked target is the profile button
    if (profileBtn && profileBtn.contains(e.target)) {
        e.preventDefault(); // Prevent default anchor behavior
        dropdown.classList.toggle("show-dropdown"); // Toggle dropdown visibility
        e.stopPropagation(); // Prevent the event from bubbling to the window click listener
        return; // Exit to avoid running the next part of the code
    }

    // If the click is outside the dropdown and profile button, close the dropdown
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show-dropdown");
    }
});
