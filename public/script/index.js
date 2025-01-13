
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
