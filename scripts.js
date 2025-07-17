// scripts.js

// Theme Toggle
const themeToggle = document.getElementById("toggle-theme");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}

// Toggle theme and update icon
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

// Smooth Scroll for Navigation
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      document.querySelector(hash).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Scroll Animation (AOS.js)
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    once: true
  });
}

// Highlight active nav on scroll
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
