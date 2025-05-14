console.log("JS is running");

document.querySelectorAll('.montserrat-name').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.classList.add('active');
        const colorElements = document.querySelectorAll('.color-green');
        colorElements.forEach(colorElement => {
            colorElement.classList.add('highlight');
        });
    });
}); 

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Ask ChatGPT how to fix nav bar when the screen size changes
function handleResize() {
    const nav = document.querySelector('.nav');
    if (window.innerWidth >= 768) {
      nav.classList.remove('open');
    }
}

// Run it on load and on resize
window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);

// This is based on my projects from Database Design
// I also asked ChatGPT for help specifically on displaying sorting the date and making it more readable
document.addEventListener('DOMContentLoaded', () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById("portfolio-list");
            data
                .sort((newer, older) => new Date(older.date)-new Date(newer.date))
                .forEach((portfolio, index) => {
                    const item = document.createElement("li");

                    if (index === 0) {
                        item.className = "portfolio-item featured";
                    } else if (index === 1 || index === 2) {
                        item.className = "portfolio-item mini-featured";
                    } else {
                        item.className = "portfolio-item standard";
                    }

                    item.innerHTML = `
                    <a href="${portfolio.source}" target="_blank">
                        <div class="portfolio-box">
                            <strong>${portfolio.name}</strong><br>
                            ${new Date(portfolio.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'})}<br>
                            ${portfolio.description}<br>

                        <span class="wrapper">
                            <img src="/static/images/${portfolio.image}" alt="Website screenshot">
                        </span>
                        </div>
                    </a>
                    `;

                    list.appendChild(item);
                });
        });
});

/* <div class="tags">
${portfolio.category
    .split(',')
    .map(cat => `<span>${cat.trim()}</span>`)
    .join('')}                            
</div> */