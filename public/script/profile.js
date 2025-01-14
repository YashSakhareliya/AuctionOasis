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