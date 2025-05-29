// Agent Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const agentFormPopup = document.getElementById("agent-form-popup");
  const agentDetailsPopup = document.getElementById("agent-details-popup");
  const agentSuccessPopup = document.getElementById("agent-success-popup");

  // Get all close buttons
  const agentPopupClose = document.getElementById("agent-popup-close");
  const agentDetailsClose = document.getElementById("agent-details-close");
  const agentSuccessClose = document.getElementById("agent-success-close");
  const agentSuccessCloseButton = document.getElementById(
    "agent-success-close-button"
  );

  // Get agent form
  const agentForm = document.getElementById("agent-application-form");

  // Get agent button from section
  const agentButton = document.querySelector("#agent .btn-sign-up");

  // Action buttons
  const proceedToSuccessBtn = document.getElementById(
    "agent-proceed-to-success"
  );

  // Get trade license toggle buttons
  const tradeLicenseYes = document.getElementById("trade-license-yes");
  const tradeLicenseNo = document.getElementById("trade-license-no");
  const tradeLicenseFields = document.getElementById("trade-license-fields");

  // Function to toggle trade license fields
  function toggleTradeLicenseFields() {
    if (tradeLicenseYes.checked) {
      tradeLicenseFields.classList.remove("hidden");

      // Add styling for Yes selection
      const toggleSwitch = tradeLicenseYes.closest(".toggle-switch");
      if (toggleSwitch) {
        toggleSwitch.classList.remove("no-selected");
        toggleSwitch.classList.add("yes-selected");
      }
    } else {
      tradeLicenseFields.classList.add("hidden");

      // Add styling for No selection
      const toggleSwitch = tradeLicenseNo.closest(".toggle-switch");
      if (toggleSwitch) {
        toggleSwitch.classList.remove("yes-selected");
        toggleSwitch.classList.add("no-selected");
      }
    }
  }

  // Add event listeners to trade license toggle buttons
  if (tradeLicenseYes && tradeLicenseNo && tradeLicenseFields) {
    tradeLicenseYes.addEventListener("change", toggleTradeLicenseFields);
    tradeLicenseNo.addEventListener("change", toggleTradeLicenseFields);

    // Initial state check
    toggleTradeLicenseFields();
  }

  // Setup all toggle switches with color feedback
  function setupAllToggles() {
    // Get all toggle groups
    const toggleGroups = document.querySelectorAll(".toggle-group");

    toggleGroups.forEach((group) => {
      const yesRadio = group.querySelector('input[type="radio"][value="yes"]');
      const noRadio = group.querySelector('input[type="radio"][value="no"]');

      if (yesRadio && noRadio) {
        const toggleSwitch = yesRadio.closest(".toggle-switch");

        // Function to update toggle switch appearance
        function updateToggleAppearance() {
          if (toggleSwitch) {
            if (yesRadio.checked) {
              toggleSwitch.classList.remove("no-selected");
              toggleSwitch.classList.add("yes-selected");
            } else if (noRadio.checked) {
              toggleSwitch.classList.remove("yes-selected");
              toggleSwitch.classList.add("no-selected");
            }
          }
        }

        // Add change listeners
        yesRadio.addEventListener("change", updateToggleAppearance);
        noRadio.addEventListener("change", updateToggleAppearance);

        // Set initial state
        updateToggleAppearance();
      }
    });
  }

  // Call function to setup all toggles
  setupAllToggles();

  // Show agent form popup when agent button is clicked
  if (agentButton) {
    agentButton.addEventListener("click", function (e) {
      e.preventDefault();
      agentFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (agentPopupClose) {
    agentPopupClose.addEventListener("click", function () {
      agentFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (agentDetailsClose) {
    agentDetailsClose.addEventListener("click", function () {
      agentDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (agentSuccessClose) {
    agentSuccessClose.addEventListener("click", function () {
      agentSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (agentSuccessCloseButton) {
    agentSuccessCloseButton.addEventListener("click", function () {
      agentSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Get yes/no value in Bengali
  function getYesNoValueHtml(value) {
    if (value === "yes") {
      return '<span class="yes-value">হ্যাঁ</span>';
    } else {
      return '<span class="no-value">না</span>';
    }
  }

  // Handle agent form submission
  if (agentForm) {
    agentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const businessName = document.getElementById("business-name").value;
      const district = document.getElementById("agent-district");
      const area = document.getElementById("agent-area");
      const contactPerson = document.getElementById("contact-person").value;
      const phone = document.getElementById("phone-number").value;
      const email = document.getElementById("email-address").value;
      const additionalInfo = document.getElementById("additional-info").value;

      // Get yes/no values
      const hasNid = document.querySelector(
        'input[name="has-nid"]:checked'
      ).value;
      const hasTradeLicense = document.querySelector(
        'input[name="has-trade-license"]:checked'
      ).value;

      // Get trade license details if available
      let tradeLicenseNumber = "-";
      let tradeLicenseExpiry = "-";

      if (hasTradeLicense === "yes") {
        tradeLicenseNumber =
          document.getElementById("trade-license-number").value ||
          "প্রদান করা হয়নি";

        const expiryMonth = document.getElementById("expiry-month");
        const expiryYear = document.getElementById("expiry-year");

        if (expiryMonth.value && expiryYear.value) {
          const monthName = expiryMonth.options[expiryMonth.selectedIndex].text;
          const yearValue = expiryYear.options[expiryYear.selectedIndex].text;
          tradeLicenseExpiry = `${monthName} ${yearValue}`;
        } else {
          tradeLicenseExpiry = "প্রদান করা হয়নি";
        }
      }

      // Update details in the details popup
      document.getElementById("detail-business-name").textContent =
        businessName;
      document.getElementById("detail-district").textContent =
        district.options[district.selectedIndex].text;
      document.getElementById("detail-area").textContent =
        area.options[area.selectedIndex].text;
      document.getElementById("detail-contact-person").textContent =
        contactPerson;
      document.getElementById("detail-phone").textContent = phone;
      document.getElementById("detail-email").textContent =
        email || "প্রদান করা হয়নি";
      document.getElementById("detail-additional-info").textContent =
        additionalInfo || "প্রদান করা হয়নি";

      // Update yes/no values with color coding
      document.getElementById("detail-has-nid").innerHTML =
        getYesNoValueHtml(hasNid);
      document.getElementById("detail-has-trade-license").innerHTML =
        getYesNoValueHtml(hasTradeLicense);

      // Show or hide trade license details section
      const tradeLicenseSection = document.getElementById(
        "detail-trade-license-section"
      );
      if (hasTradeLicense === "yes") {
        tradeLicenseSection.style.display = "block";
        document.getElementById("detail-trade-license-number").textContent =
          tradeLicenseNumber;
        document.getElementById("detail-trade-license-expiry").textContent =
          tradeLicenseExpiry;
      } else {
        tradeLicenseSection.style.display = "none";
      }

      // Hide the form popup and show the details popup
      agentFormPopup.classList.remove("active");
      agentDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "AGT-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("agent-application-ref").textContent = refNumber;

      // Hide details popup and show success popup
      agentDetailsPopup.classList.remove("active");
      agentSuccessPopup.classList.add("active");
    });
  }

  // Add form field highlighting and animations
  const formInputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );

  formInputs.forEach((input) => {
    // Add focus class to parent when input is focused
    input.addEventListener("focus", function () {
      this.closest(".form-group").classList.add("input-focused");
    });

    // Remove focus class when input loses focus
    input.addEventListener("blur", function () {
      this.closest(".form-group").classList.remove("input-focused");
    });
  });

  // Add smooth transition effects to popup
  function addPopupTransitions() {
    const popups = [agentFormPopup, agentDetailsPopup, agentSuccessPopup];

    popups.forEach((popup) => {
      if (popup) {
        popup.style.transition = "opacity 0.3s ease";

        // Get popup content
        const popupContent = popup.querySelector(".popup-content");
        if (popupContent) {
          popupContent.style.transition =
            "transform 0.3s ease, opacity 0.3s ease";
        }
      }
    });
  }

  addPopupTransitions();

  // Format phone number field
  const phoneField = document.getElementById("phone-number");
  if (phoneField) {
    phoneField.addEventListener("input", function () {
      // Format phone number automatically
      let phoneNumber = this.value.replace(/\D/g, ""); // Remove non-digits

      // Ensure it starts with "01"
      if (phoneNumber.length >= 2 && phoneNumber.substring(0, 2) !== "01") {
        phoneNumber = "01" + phoneNumber.substring(2);
      }

      // Limit to 11 digits (Bangladesh mobile number format)
      if (phoneNumber.length > 11) {
        phoneNumber = phoneNumber.substring(0, 11);
      }

      this.value = phoneNumber;
    });
  }

  // Add active class for toggle animation
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Find the label for this radio button
      const label = document.querySelector(`label[for="${this.id}"]`);
      if (label) {
        // Add temporary active class for animation
        label.classList.add("active-selection");

        // Remove after animation completes
        setTimeout(() => {
          label.classList.remove("active-selection");
        }, 300);
      }
    });
  });

  // Close popups when clicking outside of content
  window.addEventListener("click", function (e) {
    if (e.target === agentFormPopup) {
      agentFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === agentDetailsPopup) {
      agentDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === agentSuccessPopup) {
      agentSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
