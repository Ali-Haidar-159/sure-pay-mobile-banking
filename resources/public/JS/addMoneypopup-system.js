// Unified Popup System
const PopupSystem = {
  // Store active popups
  activePopups: [],

  // Create a new popup with consistent sizing and positioning
  createPopup: function (content, options = {}) {
    // Default options
    const defaultOptions = {
      width: "95%",
      maxWidth: "500px",
      closeOnBackdropClick: true,
      showBackButton: true,
      onBack: null,
      gradient: "linear-gradient(135deg, #1c2e58 0%, #112555 100%)",
      titleIcon: "fas fa-credit-card",
      title: "Add Money",
    };

    // Merge options
    const settings = { ...defaultOptions, ...options };

    // Create popup overlay (backdrop)
    const popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";

    // Create popup container with consistent size
    const popupContainer = document.createElement("div");
    popupContainer.className = "popup-container";
    popupContainer.style.width = settings.width;
    popupContainer.style.maxWidth = settings.maxWidth;

    // Add header with back button if needed
    let headerHTML = `
      <div class="form-header-gradient" style="background: ${
        settings.gradient
      };">
        <div class="header-content">
          <div class="header-left">
            ${
              settings.showBackButton
                ? `<button class="back-btn">
              <i class="fas fa-arrow-left"></i>
            </button>`
                : ""
            }
            <div class="title-icon">
              <i class="${settings.titleIcon}"></i>
            </div>
          </div>
          <div class="header-center">
            <h3>${settings.title}</h3>
          </div>
          <div class="header-right">
            <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" height="32">
          </div>
        </div>
      </div>
    `;

    // Add content to popup
    popupContainer.innerHTML =
      headerHTML + `<div class="popup-content">${content}</div>`;

    // Add to DOM
    document.body.appendChild(popupOverlay);
    document.body.appendChild(popupContainer);

    // Store reference to popup elements
    const popup = {
      overlay: popupOverlay,
      container: popupContainer,
      settings: settings,
    };

    // Add to active popups
    this.activePopups.push(popup);

    // Add event listeners
    if (settings.closeOnBackdropClick) {
      popupOverlay.addEventListener("click", () => {
        this.closePopup(popup);
      });
    }

    // Add back button functionality if needed
    if (settings.showBackButton) {
      const backBtn = popupContainer.querySelector(".back-btn");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          if (settings.onBack && typeof settings.onBack === "function") {
            settings.onBack();
          } else {
            this.closePopup(popup);
          }
        });
      }
    }

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("show");
      popupContainer.classList.add("show");
    }, 10);

    return popup;
  },

  // Close a specific popup
  closePopup: function (popup) {
    if (!popup) return;

    popup.overlay.classList.remove("show");
    popup.container.classList.remove("show");

    setTimeout(() => {
      popup.overlay.remove();
      popup.container.remove();

      // Remove from active popups
      const index = this.activePopups.indexOf(popup);
      if (index > -1) {
        this.activePopups.splice(index, 1);
      }
    }, 300);
  },

  // Close all popups
  closeAllPopups: function () {
    [...this.activePopups].forEach((popup) => {
      this.closePopup(popup);
    });
  },

  // Replace current popup with a new one
  replacePopup: function (content, options = {}) {
    // If there's an active popup, get its position
    const currentPopup = this.activePopups[this.activePopups.length - 1];

    // Close the current popup
    if (currentPopup) {
      this.closePopup(currentPopup);
    }

    // Create new popup
    return this.createPopup(content, options);
  },
};

// Initialize popup system when document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize any necessary popup templates here
});
