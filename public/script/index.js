document.addEventListener('scroll', () => {
    const aboutSection = document.querySelector('.about-auctionoasis-container');
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top <= windowHeight - 100) {
        aboutSection.classList.add('fade-in');
    }
});



// hover animation feature items

// document.querySelectorAll('.feature-item').forEach(item => {
//     item.addEventListener('mouseover', () => {
//         item.style.transform = 'scale(1.05)';
//         item.style.transition = 'transform 0.3s ease';
//     });

//     item.addEventListener('mouseout', () => {
//         item.style.transform = 'scale(1)';
//     });
// });
