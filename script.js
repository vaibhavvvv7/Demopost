document.addEventListener('DOMContentLoaded', () => {
    // Check local storage for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateDarkModeButtonText(true);
    }

    // Set active link in nav based on current path
    const pathName = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (pathName.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (pathName.endsWith('/') && link.getAttribute('href') === 'index.html') {
             link.classList.add('active');
        }
    });
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    updateDarkModeButtonText(isDark);
    localStorage.setItem('darkMode', isDark);
}

function updateDarkModeButtonText(isDark) {
    let btn = document.getElementById("darkModeBtn");
    if(btn) {
        btn.innerHTML = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
}

// Interest Calculator function (used on index.html)
function calculateInterest() {
    let principal = document.getElementById("principal").value;
    let resultElement = document.getElementById("result");
    
    if(principal > 0) {
        let monthlyIncome = (principal * 7.4) / 100 / 12;
        // Format with commas for Indian Rupees
        let formattedIncome = monthlyIncome.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
        resultElement.innerText = "Estimated Monthly Income: ₹" + formattedIncome;
        resultElement.style.color = "inherit"; // Use default or dark mode color
    } else {
        resultElement.innerText = "Please enter a valid deposit amount.";
        resultElement.style.color = "#ef4444"; // Red error text
    }
}

// Contact form submit function
function submitForm(event) {
    event.preventDefault();
    let status = document.getElementById("formStatus");
    status.innerText = "Thank you! Your message has been sent successfully.";
    status.style.color = "#10b981"; // modern green
    document.getElementById("contactForm").reset();
    
    // hide after 5 seconds
    setTimeout(() => {
        status.innerText = "";
    }, 5000);
}
