// scripts.js

// === Theme Toggle ===
const themeToggle = document.getElementById("toggle-theme");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

if (themeToggle) {
  const themeIcon = themeToggle.querySelector("i");

  function updateThemeIcon() {
    if (body.classList.contains("dark-mode")) {
      themeIcon.classList.remove("bi-brightness-high");
      themeIcon.classList.add("bi-moon");
    } else {
      themeIcon.classList.remove("bi-moon");
      themeIcon.classList.add("bi-brightness-high");
    }
  }

  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    updateThemeIcon();
  });
}

// === Smooth Scroll for Navigation ===
const navLinks = document.querySelectorAll("nav a[href^='#']");
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const targetSection = document.querySelector(this.hash);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// === Initialize AOS Animation (if available) ===
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true
  });
}

// === Highlight Active Navigation Link on Scroll ===
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll("nav a[href^='#']");

window.addEventListener("scroll", () => {
  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
});
