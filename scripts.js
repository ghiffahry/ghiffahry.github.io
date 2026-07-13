document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("toggle-theme");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");
  const navbarCollapse = document.getElementById("navbarMain");

  const applyTheme = (theme) => {
    body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);

    const icon = themeToggle?.querySelector("i");
    if (icon) {
      icon.className = theme === "dark" ? "bi bi-moon-stars" : "bi bi-brightness-high";
    }
  };

  applyTheme(localStorage.getItem("portfolio-theme") || "light");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(nextTheme);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId?.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (navbarCollapse?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  const setActiveNav = () => {
    let activeId = sections[0]?.id || "";

    sections.forEach((section) => {
      const offsetTop = section.offsetTop - 160;
      if (window.scrollY >= offsetTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();
});
