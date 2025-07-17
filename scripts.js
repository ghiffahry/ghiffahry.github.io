// === Theme Toggle ===
const themeToggle = document.getElementById("toggle-theme");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeIcon = themeToggle?.querySelector("i");
  if (!themeIcon) return;
  if (body.classList.contains("dark-mode")) {
    themeIcon.className = "bi bi-moon";
    themeToggle.title = "Switch to Light Mode";
  } else {
    themeIcon.className = "bi bi-brightness-high";
    themeToggle.title = "Switch to Dark Mode";
  }
}

// Set theme on load
setTheme(localStorage.getItem("theme") || "light");

themeToggle?.addEventListener("click", () => {
  setTheme(body.classList.contains("dark-mode") ? "light" : "dark");
  // Add a little animation
  themeToggle.classList.add("toggle-animate");
  setTimeout(() => themeToggle.classList.remove("toggle-animate"), 400);
});

// === Smooth Scroll for Navigation ===
document.querySelectorAll("nav a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      // Ripple effect on click
      link.classList.add("nav-ripple");
      setTimeout(() => link.classList.remove("nav-ripple"), 400);
    }
  });
});

// === Highlight Active Navigation Link on Scroll ===
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
});

// === Section Animation on Scroll ===
function animateSections() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add("show-section");
    }
  });
}
window.addEventListener("scroll", animateSections);
window.addEventListener("DOMContentLoaded", animateSections);

// === Interactive Hover Effects for Navigation ===
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => link.classList.add("hovered"));
  link.addEventListener("mouseleave", () => link.classList.remove("hovered"));
});

// === Optional: Add a little confetti when theme is toggled ===
function confetti() {
  for (let i = 0; i < 20; i++) {
    const conf = document.createElement("div");
    conf.className = "confetti";
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 1000);
  }
}
themeToggle?.addEventListener("click", confetti);
