// dark mode toggle functionality ***
document.addEventListener("DOMContentLoaded", function() {
  const themeToggle = document.getElementById("light-dark-mode");
  const htmlElement = document.documentElement;
  const iconElement = themeToggle.querySelector("i");

  // Load the theme from sessionStorage or default to light
  const currentTheme = sessionStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-bs-theme", currentTheme);
  updateIcon(currentTheme);

  themeToggle.addEventListener("click", function() {
    // Toggle theme
    const newTheme = htmlElement.getAttribute("data-bs-theme") === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-bs-theme", newTheme);
    // Store the updated theme in sessionStorage
    sessionStorage.setItem("theme", newTheme);
    // Update the icon
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (theme === "dark") {
      iconElement.classList.remove("bi-moon");
      iconElement.classList.add("bi-sun");
    } else {
      iconElement.classList.remove("bi-sun");
      iconElement.classList.add("bi-moon");
    }
  }
});

// full screen toggle functionality ***
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("fullscreenToggle");
  const icon = btn?.querySelector("i");

  const updateIcon = () => {
    const fs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    icon?.classList.toggle("bi-fullscreen", !fs);
    icon?.classList.toggle("bi-fullscreen-exit", !!fs);
  };

  const toggleFullscreen = () => {
    const el = document.documentElement;
    const fs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

    if (!fs) {
      (el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen)?.call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen)?.call(document);
    }
  };

  if (btn) btn.addEventListener("click", toggleFullscreen);

  // Listen for fullscreen changes (e.g., Esc key or OS/browser triggers)
  ["fullscreenchange", "webkitfullscreenchange", "msfullscreenchange"]
    .forEach(evt => document.addEventListener(evt, updateIcon));
});

// Search input dropdown functionality ***
const searchInput = document.getElementById('top-search');
const dropdown = document.getElementById('search-dropdown');
// Show dropdown on focus
searchInput.addEventListener('focus', () => {
  dropdown.classList.add('show');
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    dropdown.classList.remove('show');
  }, 150);
});
// Optional: Hide dropdown when clicking outside the input + dropdown
document.addEventListener('click', function (e) {
  if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.button-toggle-menu');
  const sidebar = document.querySelector('.leftside-menu');
  const content = document.querySelector('.content-page');
  const html = document.documentElement;
  const closeBtn = document.querySelector('.button-close-fullsidebar');

  // Check localStorage for saved state
  const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

  // Set initial state (but skip condensed mode on small screens)
  if (isCollapsed && window.innerWidth > 992) {
    collapseSidebar();
  }

  // Toggle sidebar on button click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (html.getAttribute('data-sidenav-size') === 'condensed') {
        expandSidebar();
      } else {
        if (window.innerWidth > 992) {
          collapseSidebar();
        } else {
          // On small screen, toggle full sidebar
          if (html.getAttribute('data-sidenav-size') === 'full') {
            html.removeAttribute('data-sidenav-size');
          } else {
            html.setAttribute('data-sidenav-size', 'full');
          }
        }
      }
    });
  }


  // Close button functionality
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      // On desktop, collapse; on mobile, just hide sidebar
      if (window.innerWidth > 992) {
        collapseSidebar();
      } else {
        html.removeAttribute('data-sidenav-size');
      }
    });
  }

  function collapseSidebar() {
    if (window.innerWidth > 992) {
      html.setAttribute('data-sidenav-size', 'condensed');
      localStorage.setItem("sidebarCollapsed", "true");
      
      // Handle logo visibility
      const logoLg = document.querySelector('.logo .logo-lg');
      const logoSm = document.querySelector('.logo .logo-sm');
      if (logoLg && logoSm) {
        logoLg.style.display = 'none';
        logoSm.style.display = 'block';
      }
    }
  }

  function expandSidebar() {
    html.removeAttribute('data-sidenav-size');
    localStorage.setItem("sidebarCollapsed", "false");
    
    // Handle logo visibility
    const logoLg = document.querySelector('.logo .logo-lg');
    const logoSm = document.querySelector('.logo .logo-sm');
    if (logoLg && logoSm) {
      logoLg.style.display = 'block';
      logoSm.style.display = 'none';
    }
  }

  // Handle window resize to maintain correct state
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      html.setAttribute('data-sidenav-size', 'full');
      
      // Show full logo on mobile
      const logoLg = document.querySelector('.logo .logo-lg');
      const logoSm = document.querySelector('.logo .logo-sm');
      if (logoLg && logoSm) {
        logoLg.style.display = 'block';
        logoSm.style.display = 'none';
      }
    } else {
      // Restore the saved state from localStorage
      const shouldBeCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
      if (shouldBeCollapsed) {
        collapseSidebar();
      } else {
        expandSidebar();
      }
    }
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (
      window.innerWidth <= 992 &&
      html.getAttribute('data-sidenav-size') === 'full' &&
      !e.target.closest('.leftside-menu') &&
      !e.target.closest('.button-toggle-menu')
    ) {
      html.removeAttribute('data-sidenav-size');
    }
  });

  const sidebarOverlay = document.querySelector('.sidebar-overlay');

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function() {
      html.removeAttribute('data-sidenav-size');
    });
  }

});
