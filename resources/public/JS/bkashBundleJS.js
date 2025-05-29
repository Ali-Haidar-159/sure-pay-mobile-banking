// Document Ready Function
document.addEventListener("DOMContentLoaded", function () {
  // Balance Toggle Function for Bundle Section
  const showBundleBalanceBtn = document.getElementById("showBundleBalanceBtn");
  const hideBundleBalanceBtn = document.getElementById("hideBundleBalanceBtn");
  const bundleBalanceHidden = document.getElementById("bundleBalanceHidden");
  const bundleBalanceVisible = document.getElementById("bundleBalanceVisible");

  if (showBundleBalanceBtn && hideBundleBalanceBtn) {
    showBundleBalanceBtn.addEventListener("click", function () {
      bundleBalanceHidden.style.display = "none";
      bundleBalanceVisible.style.display = "flex";
    });

    hideBundleBalanceBtn.addEventListener("click", function () {
      bundleBalanceHidden.style.display = "flex";
      bundleBalanceVisible.style.display = "none";
    });
  }

  // Bundle Detail Popup handling
  const bundlePopupTemplate = document.getElementById("bundle-popup-template");

  // Show/Display Bundle Detail Popup function
  const showBundleDetailPopup = (
    bundleName,
    bundlePrice,
    bundleValidity,
    bundleSavings,
    bundleIconHtml
  ) => {
    // Clone the template
    const popupOverlay = bundlePopupTemplate.cloneNode(true);
    popupOverlay.id = "active-bundle-popup";
    popupOverlay.style.display = "flex";

    const bundleDetails = popupOverlay.querySelector(".bundle-popup-details");
    const buyButton = popupOverlay.querySelector(".bundle-buy-btn");

    // Fill in bundle details
    bundleDetails.innerHTML = `
      <div class="bundle-popup-item">
        <div class="bundle-popup-icon">${bundleIconHtml}</div>
        <div class="bundle-popup-info">
          <div class="popup-bundle-name">${bundleName}</div>
          <div class="popup-bundle-validity">${bundleValidity}</div>
          <div class="popup-bundle-price">${bundlePrice}</div>
        </div>
      </div>
      <div class="bundle-popup-description">
        <h4>বান্ডেলে আছে</h4>
        <div class="popup-bundle-feature">
          <i class="fas fa-check-circle"></i>
          <span>${bundleName} চার্জ ফ্রি</span>
        </div>
        <div class="popup-bundle-saving">
          <i class="fas fa-tag"></i>
          <span>${bundleSavings}</span>
        </div>
        <div class="popup-bundle-terms">
          <p>* বান্ডেল কেনার ${bundleValidity} পর্যন্ত কার্যকর থাকবে</p>
        </div>
      </div>
    `;

    // Add to document body
    document.body.appendChild(popupOverlay);

    // Setup close functionality
    const closeBtn = popupOverlay.querySelector(".popup-close-btn");
    closeBtn.addEventListener("click", () => {
      popupOverlay.classList.remove("active");
      setTimeout(() => {
        popupOverlay.remove();
      }, 300);
    });

    // Show popup with animation
    setTimeout(() => {
      popupOverlay.classList.add("active");
    }, 10);

    // Buy button functionality - show PIN entry
    buyButton.addEventListener("click", () => {
      popupOverlay.remove();

      // Create and show PIN entry popup with bundle details
      showPinEntryPopup(bundleName, bundlePrice, bundleValidity, bundleSavings);
    });
  };

  // PIN Entry Popup handling
  const pinPopupTemplate = document.getElementById("pin-popup-template");

  // Show/Display PIN Entry Popup function
  const showPinEntryPopup = (
    bundleName,
    bundlePrice,
    bundleValidity,
    bundleSavings
  ) => {
    // Clone the template
    const pinPopup = pinPopupTemplate.cloneNode(true);
    pinPopup.id = "active-pin-popup";
    pinPopup.style.display = "flex";

    // Extract savings value (remove "বাঁচবে" prefix)
    const savingsValue = bundleSavings.replace("বাঁচবে ", "");

    // Update the purchase header content
    const bundleNameEl = pinPopup.querySelector(".bundle-name");
    const bundlePriceEl = pinPopup.querySelector(".bundle-price");
    const bundleValidityEl = pinPopup.querySelector(".bundle-validity");

    bundleNameEl.textContent = bundleName;
    bundlePriceEl.textContent = bundlePrice;
    bundleValidityEl.textContent = `মেয়াদঃ ${bundleValidity} | সাশ্রয়ঃ ${savingsValue}`;

    // Add to document body
    document.body.appendChild(pinPopup);

    // Setup close functionality
    const cancelBtn = pinPopup.querySelector(".pin-cancel-button");
    cancelBtn.addEventListener("click", () => {
      pinPopup.classList.remove("active");
      setTimeout(() => {
        pinPopup.remove();
      }, 300);
    });

    // Setup PIN digit fields
    const pinDigits = pinPopup.querySelectorAll(".simple-pin-digit");
    const confirmBtn = pinPopup.querySelector(".pin-confirm-button");

    pinDigits.forEach((digit, index) => {
      // Auto-focus next input after entering a digit
      digit.addEventListener("input", () => {
        if (digit.value.length === 1) {
          // Add active class to show focus
          digit.classList.add("filled");

          if (index < pinDigits.length - 1) {
            pinDigits[index + 1].focus();
          } else {
            // Last digit entered, focus the confirm button
            confirmBtn.focus();
          }
        } else {
          digit.classList.remove("filled");
        }

        // Enable confirm button if all digits are filled
        let isComplete = true;
        pinDigits.forEach((d) => {
          if (d.value.length === 0) isComplete = false;
        });

        confirmBtn.disabled = !isComplete;
        if (isComplete) {
          confirmBtn.classList.add("active");
        } else {
          confirmBtn.classList.remove("active");
        }
      });

      // Handle backspace key
      digit.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && digit.value.length === 0 && index > 0) {
          pinDigits[index - 1].focus();
        }
      });

      // Handle focus styles
      digit.addEventListener("focus", () => {
        digit.classList.add("focused");
      });

      digit.addEventListener("blur", () => {
        digit.classList.remove("focused");
      });
    });

    // Handle confirm button
    confirmBtn.addEventListener("click", () => {
      if (confirmBtn.disabled) return;

      // Create transaction ID
      const txnId = "TXN" + Math.floor(Math.random() * 10000000000);
      const currentTime = new Date();
      const timeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dateString = currentTime.toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      // Show success message
      showSuccessMessage(pinPopup, {
        bundleName,
        bundlePrice,
        bundleValidity,
        bundleSavings: savingsValue,
        txnId,
        time: timeString,
        date: dateString,
      });
    });

    // Show popup with animation
    setTimeout(() => {
      pinPopup.classList.add("active");
    }, 10);

    // Focus first digit on popup open
    setTimeout(() => {
      pinDigits[0].focus();
    }, 300);
  };

  // Success Message handling
  const successMessageTemplate = document.getElementById(
    "success-message-template"
  );

  // Show Success Message function
  const showSuccessMessage = (pinPopup, details) => {
    const pinContent = pinPopup.querySelector(".pin-popup-content");
    const successMessage = successMessageTemplate
      .querySelector(".success-message")
      .cloneNode(true);

    // Fill in the success message details
    successMessage.querySelector(".success-amount").textContent =
      details.bundlePrice;
    successMessage.querySelector(".bundle-name-value").textContent =
      details.bundleName;
    successMessage.querySelector(".validity-value").textContent =
      details.bundleValidity;
    successMessage.querySelector(".savings-value").textContent =
      details.bundleSavings;
    successMessage.querySelector(
      ".date-time-value"
    ).textContent = `${details.date}, ${details.time}`;
    successMessage.querySelector(".txn-id-value").textContent = details.txnId;

    // Clear existing content and add the success message
    pinContent.innerHTML = "";
    pinContent.appendChild(successMessage);

    // Setup close button functionality
    const closeBtn = pinContent.querySelector(".success-close-btn");
    closeBtn.addEventListener("click", () => {
      pinPopup.classList.remove("active");
      setTimeout(() => {
        pinPopup.remove();
      }, 300);
    });
  };

  // Show/Hide Bundles Functionality
  const bundleOptionsList = document.querySelector(".bundle-options-list");
  const bundleOptions = document.querySelectorAll(".bundle-option");

  // Initially hide all but the first 2 bundles
  if (bundleOptions.length > 2) {
    for (let i = 2; i < bundleOptions.length; i++) {
      bundleOptions[i].style.display = "none";
    }

    // Create "See More" button
    const seeMoreBtn = document.createElement("div");
    seeMoreBtn.className = "see-more-btn";
    seeMoreBtn.innerHTML =
      '<span>See More</span><i class="fas fa-chevron-down"></i>';
    bundleOptionsList.appendChild(seeMoreBtn);

    // Toggle visibility on click
    seeMoreBtn.addEventListener("click", function () {
      const isExpanded = this.classList.contains("expanded");

      if (!isExpanded) {
        // Show all bundles
        for (let i = 2; i < bundleOptions.length; i++) {
          bundleOptions[i].style.display = "";
          bundleOptions[i].classList.add("fade-in");
        }
        this.classList.add("expanded");
        this.innerHTML =
          '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
      } else {
        // Hide bundles after index 1
        for (let i = 2; i < bundleOptions.length; i++) {
          bundleOptions[i].style.display = "none";
          bundleOptions[i].classList.remove("fade-in");
        }
        this.classList.remove("expanded");
        this.innerHTML =
          '<span>See More</span><i class="fas fa-chevron-down"></i>';
      }
    });
  }

  // Bundle Option Click Events
  const bundleDetailsOptions = document.querySelectorAll(".bundle-details");
  bundleDetailsOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Get the bundle data
      const bundleName = this.querySelector(".bundle-name").textContent;
      const bundlePrice = this.querySelector(".bundle-price span").textContent;
      const bundleValidity = this.querySelector(".bundle-validity").textContent;
      const bundleSavings = this.querySelector(
        ".savings-badge span"
      ).textContent;
      const bundleIconContainer = this.closest(".bundle-option")
        .querySelector(".bundle-icon-container")
        .cloneNode(true);

      // Show popup with details
      showBundleDetailPopup(
        bundleName,
        bundlePrice,
        bundleValidity,
        bundleSavings,
        bundleIconContainer.outerHTML
      );
    });
  });

  // Alternative Option Click Events
  const altOptions = document.querySelectorAll(".bundle-alt-option");
  altOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Find corresponding main bundle data
      const parentBundle = this.closest(".bundle-option");
      const bundleDetails = parentBundle.querySelector(".bundle-details");

      // Trigger click on the main bundle details
      if (bundleDetails) {
        bundleDetails.click();
      }
    });
  });

  // Ripple effect for buttons
  const rippleButtons = document.querySelectorAll(".ripple");

  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple-effect");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
