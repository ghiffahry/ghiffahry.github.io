// scripts.js

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
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
AOS.init({
  duration: 800,
  once: true
});

// CV Download Button
const downloadBtn = document.getElementById("download-cv");
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    window.open(
      "https://github.com/ghiffahry/ghiffahry.github.io/blob/main/cv/CV-GHARDAPATY%20G%20GHIFFARY.pdf?raw=true",
      "_blank"
    );
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