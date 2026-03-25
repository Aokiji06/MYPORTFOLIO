// Mobile navigation toggle.
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");

const yearElement = document.getElementById("year");

// Modal elements for project image previews.
const modal = document.getElementById("imageModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const viewImageButtons = document.querySelectorAll(".view-image-btn");

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

// Display a simple modal preview for each project placeholder.
const openModal = (title, imageLabel) => {
  modalTitle.textContent = title;
  modalImage.textContent = imageLabel;
  modalCaption.textContent = `${imageLabel} screenshot preview placeholder.`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

viewImageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { title, imageLabel } = button.dataset;
    openModal(title, imageLabel);
  });
});

if (modalOverlay) {
  modalOverlay.addEventListener("click", closeModal);
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});
