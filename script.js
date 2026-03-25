// Mobile navigation toggle.
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");

const yearElement = document.getElementById("year");

// Show the current year automatically in the footer.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Close the mobile menu after selecting a navigation link.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Highlight the active section in the navigation bar while scrolling.
const setActiveLink = () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("active", isActive);
  });
};

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);
