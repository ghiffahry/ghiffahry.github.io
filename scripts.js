// === Utility Functions ===
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function saveActivityLog(action) {
  const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
  logs.push({ action, time: new Date().toISOString() });
  localStorage.setItem("activityLogs", JSON.stringify(logs));
}

// === Loader Animation ===
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.createElement("div");
  loader.id = "page-loader";
  loader.innerHTML = `<div class="spinner"></div>`;
  document.body.appendChild(loader);
  setTimeout(() => loader.classList.add("hide"), 800);
  setTimeout(() => loader.remove(), 1200);
});

// === Main Script ===
document.addEventListener("DOMContentLoaded", () => {
  // === Theme Toggle ===
  const themeToggle = document.getElementById("toggle-theme");
  const body = document.body;

  function setTheme(theme, auto = false) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
    updateThemeIcon();
    body.classList.add("theme-transition");
    setTimeout(() => body.classList.remove("theme-transition"), 400);
    if (!auto) saveActivityLog(`Theme set to ${theme}`);
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

  // === Auto Theme by Time ===
  function autoThemeByTime() {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 6) {
      setTheme("dark", true);
    } else {
      setTheme("light", true);
    }
  }
  if (localStorage.getItem("theme-auto") === "true") {
    autoThemeByTime();
  } else {
    setTheme(localStorage.getItem("theme") || "light");
  }

  themeToggle?.addEventListener("click", () => {
    setTheme(body.classList.contains("dark-mode") ? "light" : "dark");
    themeToggle.classList.add("toggle-animate");
    setTimeout(() => themeToggle.classList.remove("toggle-animate"), 400);
    confetti();
    showToast("Theme changed!");
  });

  // === Accent Color Picker ===
  const accentPicker = document.getElementById("accent-picker");
  if (accentPicker) {
    accentPicker.value = localStorage.getItem("accent-color") || "#4f8cff";
    accentPicker.addEventListener("input", (e) => {
      document.documentElement.style.setProperty("--accent-color", e.target.value);
      localStorage.setItem("accent-color", e.target.value);
      saveActivityLog(`Accent color changed to ${e.target.value}`);
    });
    document.documentElement.style.setProperty("--accent-color", accentPicker.value);
  }

  // === Font Selector ===
  const fontSelector = document.getElementById("font-selector");
  if (fontSelector) {
    fontSelector.value = localStorage.getItem("font-family") || "Inter";
    fontSelector.addEventListener("change", (e) => {
      document.body.style.fontFamily = e.target.value;
      localStorage.setItem("font-family", e.target.value);
      saveActivityLog(`Font changed to ${e.target.value}`);
    });
    document.body.style.fontFamily = fontSelector.value;
  }

  // === Smooth Scroll for Navigation ===
  document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        link.classList.add("nav-ripple");
        setTimeout(() => link.classList.remove("nav-ripple"), 400);
        saveActivityLog(`Navigated to ${this.hash}`);
      }
    });
  });

  // === Highlight Active Navigation Link on Scroll ===
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  window.addEventListener("scroll", throttle(() => {
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
  }, 100));

  // === Section Animation on Scroll ===
  function animateSections() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add("show-section");
      } else {
        section.classList.remove("show-section");
      }
    });
  }
  window.addEventListener("scroll", animateSections);
  animateSections();

  // === Interactive Hover Effects for Navigation ===
  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => link.classList.add("hovered"));
    link.addEventListener("mouseleave", () => link.classList.remove("hovered"));
  });

  // === Confetti Effect (Improved) ===
  function confetti() {
    for (let i = 0; i < 24; i++) {
      const conf = document.createElement("div");
      conf.className = "confetti";
      conf.style.left = Math.random() * 100 + "vw";
      conf.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
      conf.style.animationDuration = 0.8 + Math.random() * 0.7 + "s";
      conf.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 1200);
    }
  }

  // === Navbar Collapse for Mobile ===
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      var navbarCollapse = document.getElementById('navbarMain');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // === Back to Top Button ===
  const backToTop = document.createElement("button");
  backToTop.id = "back-to-top";
  backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(backToTop);
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", throttle(() => {
    backToTop.classList.toggle("show", window.scrollY > 400);
  }, 100));

  // === Toast Notification ===
  function showToast(msg, duration = 2000) {
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  // === Custom Tooltip ===
  document.querySelectorAll("[data-tooltip]").forEach(el => {
    let tooltip;
    el.addEventListener("mouseenter", () => {
      tooltip = document.createElement("div");
      tooltip.className = "custom-tooltip";
      tooltip.textContent = el.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);
      const rect = el.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + window.scrollY + "px";
    });
    el.addEventListener("mouseleave", () => {
      tooltip?.remove();
    });
  });

  // === Random Quote Feature ===
  const quotes = [
    "Tidy datasets are all alike, but every messy dataset is messy in its own way",
    "The generation of random numbers is too important to be left to chance.",
    "It is a part of probability that many improbable things will happen.",
    "Statisticians, like artists, have the bad habit of falling in love with their models.",
    "All models are wrong, but some are useful."
  ];
  const quoteBox = document.getElementById("random-quote");
  if (quoteBox) {
    function setRandomQuote() {
      quoteBox.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setRandomQuote();
    quoteBox.addEventListener("click", setRandomQuote);
  }

  // === Navigation Search ===
  const navSearch = document.getElementById("nav-search");
  if (navSearch) {
    navSearch.addEventListener("input", debounce(function () {
      const val = this.value.toLowerCase();
      navLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(val) ? "" : "none";
      });
    }, 200));
  }

  // === Keyboard Shortcuts ===
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "b") {
      setTheme(body.classList.contains("dark-mode") ? "light" : "dark");
      showToast("Theme toggled by keyboard!");
    }
    if (e.ctrlKey && e.key === "t") {
      backToTop.click();
    }
  });

  // === Activity Log Viewer ===
  const logBtn = document.getElementById("show-logs");
  if (logBtn) {
    logBtn.addEventListener("click", () => {
      const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
      alert(logs.map(l => `${l.time}: ${l.action}`).join("\n") || "No logs yet.");
    });
  }

  // === Auto Theme Toggle Option ===
  const autoThemeToggle = document.getElementById("auto-theme-toggle");
  if (autoThemeToggle) {
    autoThemeToggle.checked = localStorage.getItem("theme-auto") === "true";
    autoThemeToggle.addEventListener("change", function () {
      localStorage.setItem("theme-auto", this.checked ? "true" : "false");
      if (this.checked) autoThemeByTime();
      else setTheme(localStorage.getItem("theme") || "light");
      showToast("Auto theme " + (this.checked ? "enabled" : "disabled"));
    });
  }

  // === Easter Egg: Konami Code ===
  let konami = [];
  const secret = "38384040373937396665";
  document.addEventListener("keydown", (e) => {
    konami.push(e.keyCode);
    if (konami.join("").includes(secret)) {
      showToast("🎉 Konami code activated!");
      confetti();
      konami = [];
    }
    if (konami.length > 20) konami.shift();
  });

  // === Accessibility: Focus Outline Only by Keyboard ===
  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("user-is-tabbing");
      window.removeEventListener("keydown", handleFirstTab);
      window.addEventListener("mousedown", handleMouseDownOnce);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove("user-is-tabbing");
    window.removeEventListener("mousedown", handleMouseDownOnce);
    window.addEventListener("keydown", handleFirstTab);
  }
  window.addEventListener("keydown", handleFirstTab);

  // === Resize Event: Responsive Section Animation ===
  window.addEventListener("resize", debounce(animateSections, 200));

  // === Save Scroll Position on Reload ===
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollY", window.scrollY);
  });
  if (localStorage.getItem("scrollY")) {
    window.scrollTo(0, parseInt(localStorage.getItem("scrollY")));
    localStorage.removeItem("scrollY");
  }

  // === Print Mode: Hide Animations ===
  window.addEventListener("beforeprint", () => {
    document.body.classList.add("print-mode");
  });
  window.addEventListener("afterprint", () => {
    document.body.classList.remove("print-mode");
  });

  // === End of DOMContentLoaded ===
});
