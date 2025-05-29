// Enhanced Card to bKash JavaScript Implementation
document.addEventListener("DOMContentLoaded", function () {
  // Card to bKash Option Click Handler
  const cardToBkashOption = document.getElementById("cardToBkashOption");
  const cardToBkashSection = document.getElementById("cardToBkashSection");
  const cardToBkashForm = document.getElementById("cardToBkashForm");
  const sourceSelectionSection = document.getElementById(
    "sourceSelectionSection"
  );
  const cardTypeSection = document.getElementById("cardTypeSection");

  // State management
  let currentCardAmount = 0;
  let selectedCardType = "";
  let currentStep = "selection";

  // Show Card to bKash Section when user clicks the option
  if (cardToBkashOption) {
    cardToBkashOption.addEventListener("click", function () {
      showCardToBkashSection();
    });
  }

  // Show Card to bKash Section
  function showCardToBkashSection() {
    // Hide all sections and show the card to bKash section
    const allSections = document.querySelectorAll(".add-money-form > div");
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    if (cardToBkashSection) {
      cardToBkashSection.style.display = "block";
      cardToBkashSection.classList.add("fade-in");
      setTimeout(() => {
        cardToBkashSection.classList.remove("fade-in");
      }, 300);

      // Add back button
      addBackButton(cardToBkashSection, sourceSelectionSection);
    }
  }

  // Add back button functionality
  function addBackButton(container, targetSection) {
    // Create back button if it doesn't exist
    let backButton = container.querySelector(".back-button");

    if (!backButton) {
      backButton = document.createElement("div");
      backButton.className = "back-button";
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
      container.insertBefore(backButton, container.firstChild);
    }

    // Add click event
    backButton.addEventListener("click", function () {
      // Show the target section
      const allSections = document.querySelectorAll(".add-money-form > div");
      allSections.forEach((section) => {
        section.style.display = "none";
      });

      if (targetSection) {
        targetSection.style.display = "block";
        targetSection.classList.add("fade-in");
        setTimeout(() => {
          targetSection.classList.remove("fade-in");
        }, 300);
      }
    });
  }

  // Handle Card to bKash Form Submission
  if (cardToBkashForm) {
    cardToBkashForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the amount
      const amountInput = cardToBkashForm.querySelector(".account-input");
      const amount = amountInput.value.trim();

      // Validate amount
      if (!amount || isNaN(amount) || parseFloat(amount) < 50) {
        showError("Please enter a valid amount (minimum ৳50)");
        return;
      }

      // Save the amount
      currentCardAmount = parseFloat(amount);

      // Show card selection popup
      showCardSelectionPopup(amount);
    });
  }

  // Show Card Selection Popup
  function showCardSelectionPopup(amount) {
    // Use PopupSystem to create a popup using the existing template
    PopupSystem.createPopup("", {
      title: "Select Card Type",
      titleIcon: "fas fa-credit-card",
      onBack: function () {
        showCardToBkashSection();
      },
    });

    // Update the amount in the popup
    const popup = document.querySelector(".popup-container");

    // Get card type template from the hidden section and inject it into the popup
    const cardTypeContent = document
      .getElementById("cardTypeSection")
      .cloneNode(true);
    cardTypeContent.style.display = "block";

    // Clear existing popup content and add the card type content
    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = "";
    popupContent.appendChild(cardTypeContent);

    // Add transaction amount display
    const amountDisplay = document.createElement("div");
    amountDisplay.className = "transaction-amount-display";
    amountDisplay.innerHTML = `
      <div class="amount-label">Transaction Amount</div>
      <div class="amount-value">৳${amount}</div>
    `;
    popupContent.appendChild(amountDisplay);

    // Add event listeners to card type items
    const cardTypeItems = popup.querySelectorAll(".card-type-item");
    cardTypeItems.forEach((item) => {
      item.addEventListener("click", function () {
        const cardType = this.getAttribute("data-card-type");
        const cardName = this.querySelector(".card-type-name").textContent;

        // Save the selected card type
        selectedCardType = cardType;

        // Show card details popup
        showCardDetailsPopup(cardType, cardName, amount);
      });
    });
  }

  // Show Card Details Popup
  function showCardDetailsPopup(cardType, cardName, amount) {
    // Close previous popup
    PopupSystem.closeAllPopups();

    // Get card details based on type
    let cardLogo, cardColor;
    switch (cardType) {
      case "visa":
        cardLogo = "/public/images/cards/visa.png";
        cardColor = "#1A1F71";
        break;
      case "mastercard":
        cardLogo = "/public/images/cards/mastercard.png";
        cardColor = "#FF5F00";
        break;
      case "amex":
        cardLogo = "/public/images/cards/amex.png";
        cardColor = "#006FCF";
        break;
    }

    // Get template content
    const template = document.getElementById("cardDetailsTemplate");
    if (!template) {
      console.error("Card details template not found");
      return;
    }

    // Clone the template content
    const cardDetailsContent = template.content.cloneNode(true);

    // Create popup with gradient based on card type
    PopupSystem.createPopup("", {
      title: "Card Details",
      titleIcon: "fas fa-credit-card",
      gradient: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
      onBack: function () {
        showCardSelectionPopup(amount);
      },
    });

    // Get the popup container
    const popup = document.querySelector(".popup-container");

    // Update card preview styles and content
    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = "";
    popupContent.appendChild(cardDetailsContent);

    const cardPreview = popup.querySelector(".card-preview");
    if (cardPreview) {
      cardPreview.style.background = `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`;
    }

    const cardBrandLogo = popup.querySelector(".card-brand-logo");
    if (cardBrandLogo) {
      cardBrandLogo.src = cardLogo;
      cardBrandLogo.alt = cardName;
    }

    // Set amount
    const amountDisplay = popup.querySelector(".amount-value");
    if (amountDisplay) {
      amountDisplay.textContent = `৳${amount}`;
    }

    // Style the proceed button to match card color
    const proceedBtn = popup.querySelector(".btn-proceed");
    if (proceedBtn) {
      proceedBtn.style.background = `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`;
    }

    // Setup card input field handlers
    setupCardInputFields(popup);

    // Setup form submission
    const cardForm = popup.querySelector(".card-form");
    if (cardForm) {
      cardForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form inputs
        const cardNumber = popup
          .querySelector(".card-number")
          .value.replace(/\s/g, "");
        const expiry = popup.querySelector(".expiry-date").value;
        const cvv = popup.querySelector(".cvv").value;
        const cardNameInput = popup.querySelector(".card-name").value;

        // Validate form
        if (cardNumber.length < 16) {
          showError("Please enter valid card number");
          return;
        }

        if (!expiry || expiry.length < 5) {
          showError("Please enter valid expiry date");
          return;
        }

        if (!cvv || cvv.length < 3) {
          showError("Please enter valid CVV");
          return;
        }

        if (!cardNameInput) {
          showError("Please enter cardholder name");
          return;
        }

        // Get mobile number (this would be the bKash account)
        let mobileNumber = "01616122600";

        // Show OTP verification
        showOtpVerificationPopup(
          mobileNumber,
          cardNumber,
          cardType,
          cardNameInput,
          amount
        );
      });
    }

    // Cancel button handler
    const cancelBtn = popup.querySelector(".btn-cancel");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        PopupSystem.closeAllPopups();
        showCardToBkashSection();
      });
    }
  }

  // Setup Card Input Fields
  function setupCardInputFields(container) {
    // Card number formatting and preview
    const cardNumberInput = container.querySelector(".card-number");
    const cardNumberPreview = container.querySelector(".card-number-preview");

    if (cardNumberInput && cardNumberPreview) {
      cardNumberInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{4})/g, "$1 ").trim();
        e.target.value = value;

        // Update preview with masked numbers
        if (value.length > 0) {
          let maskedValue = value.replace(/\d(?=\d{4})/g, "*");
          cardNumberPreview.textContent = maskedValue;
        } else {
          cardNumberPreview.textContent = "**** **** **** ****";
        }
      });
    }

    // Expiry date formatting and preview
    const expiryInput = container.querySelector(".expiry-date");
    const expiryPreview = container.querySelector(".card-expiry-preview");

    if (expiryInput && expiryPreview) {
      expiryInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length >= 2) {
          value = value.slice(0, 2) + "/" + value.slice(2, 4);
        }
        e.target.value = value;

        // Update preview
        expiryPreview.textContent = value || "MM/YY";
      });
    }

    // Cardholder name preview
    const cardNameInput = container.querySelector(".card-name");
    const cardNamePreview = container.querySelector(".card-name-preview");

    if (cardNameInput && cardNamePreview) {
      cardNameInput.addEventListener("input", function (e) {
        cardNamePreview.textContent =
          e.target.value.toUpperCase() || "YOUR NAME";
      });
    }
  }

  // Show OTP Verification Popup
  function showOtpVerificationPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Close previous popup
    PopupSystem.closeAllPopups();

    // Get card details based on type
    let cardLogo, cardColor;
    switch (cardType) {
      case "visa":
        cardLogo = "/public/images/cards/visa.png";
        cardColor = "#1A1F71";
        break;
      case "mastercard":
        cardLogo = "/public/images/cards/mastercard.png";
        cardColor = "#FF5F00";
        break;
      case "amex":
        cardLogo = "/public/images/cards/amex.png";
        cardColor = "#006FCF";
        break;
    }

    // Generate OTP for demo
    const otp = generateOTP();
    console.log(`OTP for demo: ${otp}`);

    // Get template content
    const template = document.getElementById("otpVerificationTemplate");
    if (!template) {
      console.error("OTP verification template not found");
      return;
    }

    // Clone the template content
    const otpContent = template.content.cloneNode(true);

    // Create popup
    PopupSystem.createPopup("", {
      title: "OTP Verification",
      titleIcon: "fas fa-mobile-alt",
      gradient: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
      onBack: function () {
        showCardDetailsPopup(cardType, cardName, amount);
      },
    });

    // Get the popup container
    const popup = document.querySelector(".popup-container");

    // Update mobile number and content
    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = "";
    popupContent.appendChild(otpContent);

    const mobileDisplay = popup.querySelector(".otp-message strong");
    if (mobileDisplay) {
      mobileDisplay.textContent = mobileNumber;
    }

    const amountDisplay = popup.querySelector(".amount-value");
    if (amountDisplay) {
      amountDisplay.textContent = `৳${amount}`;
    }

    // Style buttons to match card color
    const verifyBtn = popup.querySelector(".btn-verify");
    if (verifyBtn) {
      verifyBtn.style.background = `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`;
    }

    // Focus on first OTP input
    setTimeout(() => {
      const firstInput = popup.querySelector(".otp-input");
      if (firstInput) {
        firstInput.focus();
      }
    }, 300);

    // Setup OTP input fields
    setupOtpInputFields(popup);

    // Start OTP timer
    startOtpTimer(popup);

    // Verify button functionality
    if (verifyBtn) {
      verifyBtn.addEventListener("click", function () {
        const otpInputs = popup.querySelectorAll(".otp-input");
        const enteredOTP = Array.from(otpInputs)
          .map((input) => input.value)
          .join("");

        if (enteredOTP.length !== 6) {
          showError("Please enter complete 6-digit OTP");
          return;
        }

        // For demo purposes, accept any 6-digit OTP
        if (enteredOTP.length === 6) {
          // Show PIN verification popup
          showPinVerificationPopup(
            mobileNumber,
            cardNumber,
            cardType,
            cardName,
            amount
          );
        } else {
          showError("Invalid OTP. Please try again.");
          otpInputs.forEach((input) => (input.value = ""));
          otpInputs[0].focus();
        }
      });
    }

    // Resend button functionality
    const resendBtn = popup.querySelector(".btn-resend");
    if (resendBtn) {
      resendBtn.addEventListener("click", function () {
        if (!this.disabled) {
          // Generate new OTP
          const newOTP = generateOTP();
          console.log(`New OTP for demo: ${newOTP}`);

          // Reset timer
          startOtpTimer(popup);

          // Disable resend button
          this.disabled = true;

          // Show notification
          showNotification("OTP has been resent to your mobile number");

          // Clear OTP inputs
          const otpInputs = popup.querySelectorAll(".otp-input");
          otpInputs.forEach((input) => (input.value = ""));
          otpInputs[0].focus();
        }
      });
    }
  }

  // Setup OTP Input Fields
  function setupOtpInputFields(container) {
    const otpInputs = container.querySelectorAll(".otp-input");

    otpInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });
  }

  // Start OTP Timer
  function startOtpTimer(container) {
    let timeLeft = 120; // 2 minutes
    const timerElement = container.querySelector("#otpTimer");
    const resendBtn = container.querySelector(".btn-resend");

    // Clear any existing timers
    if (window.otpTimerInterval) {
      clearInterval(window.otpTimerInterval);
    }

    // Reset timer display
    updateTimerDisplay();

    // Start new timer
    window.otpTimerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();

      if (timeLeft <= 0) {
        clearInterval(window.otpTimerInterval);
        if (resendBtn) {
          resendBtn.disabled = false;
        }
      }
    }, 1000);

    function updateTimerDisplay() {
      if (timerElement) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
    }
  }

  // Show PIN Verification Popup
  function showPinVerificationPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Close previous popup
    PopupSystem.closeAllPopups();

    // Get card details based on type
    let cardLogo, cardColor;
    switch (cardType) {
      case "visa":
        cardLogo = "/public/images/cards/visa.png";
        cardColor = "#1A1F71";
        break;
      case "mastercard":
        cardLogo = "/public/images/cards/mastercard.png";
        cardColor = "#FF5F00";
        break;
      case "amex":
        cardLogo = "/public/images/cards/amex.png";
        cardColor = "#006FCF";
        break;
    }

    // Get template content
    const template = document.getElementById("pinVerificationTemplate");
    if (!template) {
      console.error("PIN verification template not found");
      return;
    }

    // Clone the template content
    const pinContent = template.content.cloneNode(true);

    // Create popup
    PopupSystem.createPopup("", {
      title: "SurePay PIN",
      titleIcon: "fas fa-lock",
      gradient: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
      onBack: function () {
        showOtpVerificationPopup(
          mobileNumber,
          cardNumber,
          cardType,
          cardName,
          amount
        );
      },
    });

    // Get the popup container
    const popup = document.querySelector(".popup-container");

    // Update content
    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = "";
    popupContent.appendChild(pinContent);

    const amountDisplay = popup.querySelector(".amount-value");
    if (amountDisplay) {
      amountDisplay.textContent = `৳${amount}`;
    }

    // Style buttons to match card color
    const confirmBtn = popup.querySelector(".btn-confirm");
    if (confirmBtn) {
      confirmBtn.style.background = `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`;
    }

    // Focus on first PIN input
    setTimeout(() => {
      const firstInput = popup.querySelector(".pin-input");
      if (firstInput) {
        firstInput.focus();
      }
    }, 300);

    // Setup PIN input fields
    setupPinInputFields(popup);

    // Cancel button functionality
    const cancelBtn = popup.querySelector(".btn-cancel");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        PopupSystem.closeAllPopups();
        showCardToBkashSection();
      });
    }

    // Confirm button functionality
    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        const pinInputs = popup.querySelectorAll(".pin-input");
        const enteredPIN = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");

        if (enteredPIN.length !== 5) {
          showError("Please enter complete 5-digit PIN");
          return;
        }

        // Show loading
        showLoading("Processing transaction...");

        // Simulate processing time
        setTimeout(() => {
          // Hide loading
          hideLoading();

          // Show success popup
          showSuccessPopup(
            mobileNumber,
            cardNumber,
            cardType,
            cardName,
            amount
          );
        }, 2000);
      });
    }
  }

  // Setup PIN Input Fields
  function setupPinInputFields(container) {
    const pinInputs = container.querySelectorAll(".pin-input");

    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });
  }

  // Show Success Popup
  function showSuccessPopup(
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount
  ) {
    // Close previous popup
    PopupSystem.closeAllPopups();

    // Generate transaction ID and set time
    const transactionId = generateTransactionId();
    const currentTime = new Date().toLocaleString();

    // Get card color based on type
    let cardColor;
    switch (cardType) {
      case "visa":
        cardColor = "#1A1F71";
        break;
      case "mastercard":
        cardColor = "#FF5F00";
        break;
      case "amex":
        cardColor = "#006FCF";
        break;
      default:
        cardColor = "#27ae60"; // Default success color
    }

    // Get template content
    const template = document.getElementById("successTemplate");
    if (!template) {
      console.error("Success template not found");
      return;
    }

    // Clone the template content
    const successContent = template.content.cloneNode(true);

    // Create popup
    PopupSystem.createPopup("", {
      title: "Transaction Successful",
      titleIcon: "fas fa-check-circle",
      gradient: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
      showBackButton: false,
    });

    // Get the popup container
    const popup = document.querySelector(".popup-container");

    // Update success details
    const popupContent = popup.querySelector(".popup-content");
    popupContent.innerHTML = "";
    popupContent.appendChild(successContent);

    const successAmount = popup.querySelector(".success-amount");
    if (successAmount) {
      successAmount.textContent = `৳${amount}`;
    }

    const detailItems = popup.querySelectorAll(".detail-item .detail-value");
    if (detailItems.length >= 2) {
      // Set transaction time
      detailItems[0].textContent = currentTime;
    }

    // Style buttons to match card color
    const doneBtn = popup.querySelector(".btn-done");
    if (doneBtn) {
      doneBtn.style.background = `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`;
    }

    // Add event listeners for success actions
    const downloadBtn = popup.querySelector(".btn-download");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        downloadReceiptForCard(
          transactionId,
          mobileNumber,
          cardNumber,
          cardType,
          cardName,
          amount,
          currentTime
        );
      });
    }

    if (doneBtn) {
      doneBtn.addEventListener("click", function () {
        PopupSystem.closeAllPopups();
        showCardToBkashSection();
      });
    }
  }

  // Download Receipt For Card Payment
  function downloadReceiptForCard(
    transactionId,
    mobileNumber,
    cardNumber,
    cardType,
    cardName,
    amount,
    time
  ) {
    const receiptContent = `
=====================================
        SurePay TRANSACTION RECEIPT
=====================================

Transaction ID: ${transactionId}
Date & Time: ${time}
Transaction Type: Card to SurePay

AMOUNT: ৳${amount}

From: ${cardName}
Card: ${cardType.toUpperCase()} (${maskCardNumber(cardNumber)})
To: SurePay Account (${mobileNumber})

Status: SUCCESSFUL

Thank you for using SurePay!
For any inquiries, call 16247.
=====================================
`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SurePay_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Utility Functions

  // Generate 6-digit OTP
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate Transaction ID
  function generateTransactionId() {
    return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Mask card number (show only last 4 digits)
  function maskCardNumber(cardNumber) {
    return "****" + cardNumber.slice(-4);
  }

  // Show loading overlay
  function showLoading(message) {
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-message">${message}</div>
      </div>
    `;

    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
      loadingOverlay.classList.add("show");
    }, 10);
  }

  // Hide loading overlay
  function hideLoading() {
    const loadingOverlay = document.querySelector(".loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.classList.remove("show");

      setTimeout(() => {
        loadingOverlay.remove();
      }, 300);
    }
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.classList.add("show");
    }, 10);

    setTimeout(() => {
      errorDiv.classList.remove("show");

      setTimeout(() => {
        errorDiv.remove();
      }, 300);
    }, 3000);
  }

  // Show notification
  function showNotification(message) {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = "notification-message";
    notificationDiv.textContent = message;

    document.body.appendChild(notificationDiv);

    setTimeout(() => {
      notificationDiv.classList.add("show");
    }, 10);

    setTimeout(() => {
      notificationDiv.classList.remove("show");

      setTimeout(() => {
        notificationDiv.remove();
      }, 300);
    }, 3000);
  }
});
