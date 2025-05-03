// language dropdown ***
function selectItem(event, element, country) {
  event.preventDefault();

  // Update the dropdown button content
  const dropdownButton = document.getElementById("countryDropdown");
  const flagImg = element.querySelector("img");

  dropdownButton.innerHTML = `
      <img src="${flagImg.src}" alt="Selected country" class="me-2" height="12">
      <span>${country}</span>
    `;

  // Close the dropdown
  const dropdown = bootstrap.Dropdown.getInstance(dropdownButton);
  if (dropdown) {
    dropdown.hide();
  }

  console.log(`Selected country: ${country}`);
}

// Initialize Bootstrap tooltips
function initTooltips() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Dark mode toggle functionality ***
function initDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (!darkModeToggle) return; // Exit if button not found

  const darkModeIcon = darkModeToggle.querySelector("i");
  if (!darkModeIcon) return; // Exit if icon not found

  // Set initial state based on localStorage or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.dataset.bsTheme = savedTheme;
  updateDarkModeIcon(darkModeIcon, savedTheme);

  // Toggle dark mode
  darkModeToggle.addEventListener("click", function () {
    const currentTheme = document.body.dataset.bsTheme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Update theme
    document.body.dataset.bsTheme = newTheme;

    // Update icon
    updateDarkModeIcon(darkModeIcon, newTheme);

    // Save preference
    localStorage.setItem("theme", newTheme);
  });

  // Helper function to update icon
  function updateDarkModeIcon(icon, theme) {
    if (theme === "dark") {
      icon.classList.remove("bi-moon");
      icon.classList.add("bi-sun");
    } else {
      icon.classList.remove("bi-sun");
      icon.classList.add("bi-moon");
    }
  }
}

// Sidebar toggle functionality ***
function initSidebar() {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");

  // Check localStorage for saved state
  const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

  // Set initial state
  if (isCollapsed) {
    collapseSidebar();
  }

  // Toggle sidebar on button click
  sidebarToggle.addEventListener("click", function () {
    if (sidebar.classList.contains("collapsed")) {
      expandSidebar();
    } else {
      collapseSidebar();
    }
  });

  function collapseSidebar() {
    sidebar.classList.add("collapsed");
    content.style.marginLeft = "70px";
    localStorage.setItem("sidebarCollapsed", "true");
  }

  function expandSidebar() {
    sidebar.classList.remove("collapsed");
    content.style.marginLeft = "240px";
    localStorage.setItem("sidebarCollapsed", "false");
  }

  // Handle window resize to maintain collapsed state
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 992) {
      collapseSidebar();
    } else if (!sidebar.classList.contains("collapsed")) {
      expandSidebar();
    }
  });
}

// Function to toggle fullscreen ***
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Safari
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE11
      document.documentElement.msRequestFullscreen();
    }
    // Change icon to compress
    document
      .querySelector("#fullscreenToggle i")
      .classList.remove("bi-fullscreen");
    document
      .querySelector("#fullscreenToggle i")
      .classList.add("bi-fullscreen-exit");
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE11
      document.msExitFullscreen();
    }
    // Change icon back to expand
    document
      .querySelector("#fullscreenToggle i")
      .classList.remove("bi-fullscreen-exit");
    document
      .querySelector("#fullscreenToggle i")
      .classList.add("bi-fullscreen");
  }
}

// Add event listener for the fullscreen toggle button
document.addEventListener("DOMContentLoaded", () => {
  const fullscreenToggle = document.getElementById("fullscreenToggle");
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener("click", toggleFullscreen);
  }

  // Listen for fullscreen change events to update the icon accordingly
  document.addEventListener("fullscreenchange", updateFullscreenIcon);
  document.addEventListener("webkitfullscreenchange", updateFullscreenIcon); // Safari
  document.addEventListener("msfullscreenchange", updateFullscreenIcon); // IE11
});

// Update icon based on fullscreen state
function updateFullscreenIcon() {
  const icon = document.querySelector("#fullscreenToggle i");
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    // We are in fullscreen mode
    icon.classList.remove("fa-expand");
    icon.classList.add("fa-compress");
  } else {
    // We are not in fullscreen mode
    icon.classList.remove("fa-compress");
    icon.classList.add("fa-expand");
  }
}

//  the function if you need to use it elsewhere in your module
{
  toggleFullscreen;
}

// sidebar ***
function initializeSidebar() {
  console.log("Sidebar script is running ✅");

  const dashboardToggle = document.querySelector("a.dashboard-toggle");
  const submenuItems = document.querySelectorAll(".submenu");

  // Hide all submenu items by default
  submenuItems.forEach((item) => {
    item.style.display = "none";
  });

  // Add click event listener to the dashboard link
  dashboardToggle.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Dashboard clicked 🎯");

    // Toggle visibility of all submenu items
    submenuItems.forEach((item) => {
      item.style.display = item.style.display === "none" ? "block" : "none";
    });
  });
}

// Notification functionality
function initNotifications() {
  const notificationToggle = document.getElementById("notificationToggle");
  const notificationPanel = document.querySelector(".notification-panel");
  const closeButtons = document.querySelectorAll(".close-btn");
  const clearAllBtn = document.querySelector(
    ".notification-panel .text-primary"
  );

  // Toggle notification panel
  notificationToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = notificationPanel.style.display === "block";
    notificationPanel.style.display = isVisible ? "none" : "block";
  });

  // Close individual notifications
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const notificationItem = e.target.closest(".notification-item");
      if (notificationItem) {
        notificationItem.remove();
        updateNotificationCount();
      }
    });
  });

  // Clear all notifications
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const notifications = document.querySelectorAll(".notification-item");
      notifications.forEach((notification) => notification.remove());
      updateNotificationCount();
      notificationPanel.style.display = "none";
    });
  }

  // Close panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!notificationToggle.contains(e.target)) {
      notificationPanel.style.display = "none";
    }
  });

  // Prevent panel close when clicking inside
  notificationPanel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Update notification count
  function updateNotificationCount() {
    const count = document.querySelectorAll(".notification-item").length;
    const badge = document.querySelector(".notification-badge");
    if (badge) {
      if (count > 0) {
        badge.textContent = count;
        badge.style.display = "block";
      } else {
        badge.style.display = "none";
      }
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initSidebar();
  initDarkMode();
  initTooltips();
  initializeSidebar();
  initNotifications();

  // Fullscreen functionality is already initialized in its own DOMContentLoaded listener
});
