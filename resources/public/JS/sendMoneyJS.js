// Enhanced Professional Send Money Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const numberNextBtn = document.getElementById("numberNextBtn");
  const backToNumberBtn = document.getElementById("backToNumberBtn");
  const clearSearchBtn = document.getElementById("clearSearch");

  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const giftOptions = document.querySelectorAll(".gift-option");
  const tabBtns = document.querySelectorAll(".tab-btn");

  const summaryAmount = document.getElementById("summary-amount");
  const summaryCharge = document.getElementById("summary-charge");
  const summaryTotal = document.getElementById("summary-total");
  const sendMoneyBtn = document.getElementById("send-money-btn");

  // Bootstrap Modals
  const pinModal = new bootstrap.Modal(document.getElementById("pinModal"));
  const successModal = document.getElementById("successModal")
    ? new bootstrap.Modal(document.getElementById("successModal"))
    : null;

  // Variables
  let selectedContact = null;
  let currentAmount = 0;
  let currentCharge = 0;
  let currentTotal = 0;

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Balance toggle with animation
  if (showBalanceBtn) {
    showBalanceBtn.addEventListener("click", function () {
      balanceHidden.style.opacity = "0";
      setTimeout(() => {
        balanceHidden.style.display = "none";
        balanceVisible.style.display = "flex";
        balanceVisible.style.opacity = "0";
        setTimeout(() => {
          balanceVisible.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  if (hideBalanceBtn) {
    hideBalanceBtn.addEventListener("click", function () {
      balanceVisible.style.opacity = "0";
      setTimeout(() => {
        balanceVisible.style.display = "none";
        balanceHidden.style.display = "flex";
        balanceHidden.style.opacity = "0";
        setTimeout(() => {
          balanceHidden.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  // Tab switching
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all tabs
        tabBtns.forEach((tab) => tab.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Get tab content id
        const tabId = this.dataset.tab;

        // Animation for smoother tab transition
        const contactsContainer = document.querySelector(".contacts-container");
        if (contactsContainer) {
          contactsContainer.style.opacity = "0";
          setTimeout(() => {
            contactsContainer.style.opacity = "1";
          }, 200);
        }
      });
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      phoneInput.value = "";
      phoneInput.focus();
      // Reset selected contact when clearing
      selectedContact = null;
      contactItems.forEach((item) => {
        item.classList.remove("selected-contact");
      });
    });
  }

  // Function to proceed to next section
  function proceedToNextSection() {
    console.log("Proceeding to next section..."); // Debug log

    // Validate phone number or selected contact
    if (phoneInput.value.length >= 11 || selectedContact) {
      console.log("Validation passed"); // Debug log

      // Add exit animation to current section
      numberInputSection.style.opacity = "0";
      numberInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        numberInputSection.style.display = "none";

        // Show amount section with entrance animation
        amountInputSection.style.display = "block";
        amountInputSection.style.opacity = "0";
        amountInputSection.style.transform = "translateX(20px)";

        setTimeout(() => {
          amountInputSection.style.opacity = "1";
          amountInputSection.style.transform = "translateX(0)";
        }, 50);

        // Set recipient display info from selected contact or input
        const recipientName = document.querySelector(".recipient-name");
        const recipientNumber = document.querySelector(".recipient-number");
        const recipientAvatar = document.querySelector(".recipient-avatar");
        const operatorBadge = document.querySelector(
          ".recipient-name-operator .operator-badge"
        );

        if (selectedContact) {
          if (recipientName) recipientName.textContent = selectedContact.name;
          if (recipientNumber)
            recipientNumber.textContent = selectedContact.number;
          if (recipientAvatar) {
            recipientAvatar.textContent = selectedContact.initial;
            recipientAvatar.className =
              "recipient-avatar " + selectedContact.gradient;
          }
          if (operatorBadge) {
            operatorBadge.className =
              "operator-badge " + selectedContact.operator;
            operatorBadge.textContent = selectedContact.operatorName;
          }
        } else {
          if (recipientName) recipientName.textContent = "নতুন পরিচিতি";
          if (recipientNumber) recipientNumber.textContent = phoneInput.value;
          if (recipientAvatar) {
            recipientAvatar.textContent = "ন";
            recipientAvatar.className = "recipient-avatar gradient-1";
          }

          // Determine operator from number
          let operator = "gp";
          let operatorName = "জিপি";

          if (phoneInput.value.startsWith("017")) {
            operator = "gp";
            operatorName = "জিপি";
          } else if (phoneInput.value.startsWith("018")) {
            operator = "robi";
            operatorName = "রবি";
          } else if (phoneInput.value.startsWith("019")) {
            operator = "bl";
            operatorName = "বিএল";
          } else if (phoneInput.value.startsWith("016")) {
            operator = "airtel";
            operatorName = "এয়ারটেল";
          } else if (phoneInput.value.startsWith("015")) {
            operator = "tt";
            operatorName = "টেলিটক";
          }

          if (operatorBadge) {
            operatorBadge.className = "operator-badge " + operator;
            operatorBadge.textContent = operatorName;
          }
        }

        // Focus on amount input
        if (amountInput) {
          amountInput.focus();
        }
      }, 200);
    } else {
      console.log("Validation failed"); // Debug log

      // Shake effect for validation error
      phoneInput.classList.add("shake-effect");
      setTimeout(() => {
        phoneInput.classList.remove("shake-effect");
      }, 600);

      // Show validation message
      const searchContainer = document.querySelector(".search-container");
      if (searchContainer) {
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-message";
        validationMsg.textContent = "সঠিক মোবাইল নম্বর দিন";
        validationMsg.style.color = "#e74c3c";
        validationMsg.style.fontSize = "12px";
        validationMsg.style.textAlign = "center";
        validationMsg.style.padding = "5px";

        // Remove any existing validation message
        const existingMsg = searchContainer.querySelector(
          ".validation-message"
        );
        if (existingMsg) {
          existingMsg.remove();
        }

        searchContainer.appendChild(validationMsg);

        // Auto remove message after 3 seconds
        setTimeout(() => {
          validationMsg.style.opacity = "0";
          setTimeout(() => {
            validationMsg.remove();
          }, 300);
        }, 3000);
      }
    }
  }

  // Navigation between sections with smooth transition
  if (numberNextBtn) {
    numberNextBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent any default behavior
      console.log("Next button clicked"); // Debug log
      proceedToNextSection();
    });
  }

  if (backToNumberBtn) {
    backToNumberBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show number section with entrance animation
        numberInputSection.style.display = "block";
        numberInputSection.style.opacity = "0";
        numberInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          numberInputSection.style.opacity = "1";
          numberInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Contact selection with enhanced animation
  contactItems.forEach((contact) => {
    contact.addEventListener("click", function () {
      console.log("Contact selected"); // Debug log

      // Add selection animation
      this.classList.add("selected-contact");

      // Get contact info
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      const initial = name.charAt(0);
      const avatarClass = this.querySelector(".contact-avatar").className;
      const gradient = avatarClass.split(" ")[1];
      const operatorBadge = this.querySelector(".operator-badge");
      const operator = operatorBadge.className.split(" ")[1];
      const operatorName = operatorBadge.textContent;

      // Store selected contact
      selectedContact = {
        name,
        number,
        initial,
        gradient,
        operator,
        operatorName,
      };

      // Set number input value
      phoneInput.value = number;

      // Highlight selected contact
      contactItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-contact");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        proceedToNextSection();
      }, 500);
    });
  });

  // Gift option selection with animation
  if (giftOptions.length) {
    giftOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // First remove active class with fadeout
        giftOptions.forEach((opt) => {
          if (opt.classList.contains("active")) {
            opt.style.transition = "all 0.3s";
            opt.style.opacity = "0.6";
            opt.style.transform = "scale(0.95)";

            setTimeout(() => {
              opt.classList.remove("active");
              opt.style.opacity = "1";
              opt.style.transform = "scale(1)";
            }, 150);
          }
        });

        // Add active class with animation
        setTimeout(() => {
          this.classList.add("active");
          this.style.transition = "all 0.3s";
          this.style.transform = "scale(1.05)";

          setTimeout(() => {
            this.style.transform = "scale(1)";
          }, 200);
        }, 150);
      });
    });
  }

  // Charge calculation function
  function calculateCharge(amount) {
    if (!amount || amount <= 0) return 0;

    // bKash charge structure
    if (amount <= 500) return 5;
    if (amount <= 1000) return 10;
    if (amount <= 2500) return 15;
    if (amount <= 5000) return 25;
    if (amount <= 10000) return 40;
    if (amount <= 25000) return 55;
    return 60; // For amounts over 25,000
  }

  // Process amount change with animations
  function updateAmount(amount) {
    currentAmount = amount;
    currentCharge = calculateCharge(currentAmount);
    currentTotal = currentAmount + currentCharge;

    // Update display with counting animation
    if (summaryAmount) {
      animateValue(
        summaryAmount,
        "৳" + (summaryAmount.innerText.replace("৳", "") || "0"),
        "৳" + formatNumber(currentAmount),
        300
      );
    }

    if (summaryCharge) {
      animateValue(
        summaryCharge,
        "৳" + (summaryCharge.innerText.replace("৳", "") || "0"),
        "৳" + formatNumber(currentCharge),
        300
      );
    }

    if (summaryTotal) {
      animateValue(
        summaryTotal,
        "৳" + (summaryTotal.innerText.replace("৳", "") || "0"),
        "৳" + formatNumber(currentTotal),
        300
      );
    }

    // Enable/disable send button with animation
    if (sendMoneyBtn) {
      if (currentAmount >= 10 && !sendMoneyBtn.classList.contains("enabled")) {
        sendMoneyBtn.disabled = false;
        sendMoneyBtn.classList.add("enabled");
        sendMoneyBtn.style.transition = "all 0.3s";
        sendMoneyBtn.style.animation = "pulse 2s infinite";
      } else if (
        currentAmount < 10 &&
        sendMoneyBtn.classList.contains("enabled")
      ) {
        sendMoneyBtn.disabled = true;
        sendMoneyBtn.classList.remove("enabled");
        sendMoneyBtn.style.animation = "none";
      }
    }

    // Update active state for quick amount buttons
    quickAmountBtns.forEach((btn) => {
      const btnAmount = parseInt(btn.dataset.amount);

      if (btnAmount === currentAmount && !btn.classList.contains("active")) {
        // Add active class with animation
        btn.style.transition = "all 0.3s";
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
          btn.classList.add("active");
          btn.style.transform = "scale(1.05)";
          setTimeout(() => {
            btn.style.transform = "scale(1)";
          }, 200);
        }, 50);
      } else if (
        btnAmount !== currentAmount &&
        btn.classList.contains("active")
      ) {
        // Remove active class
        btn.style.transition = "all 0.3s";
        btn.style.opacity = "0.8";
        setTimeout(() => {
          btn.classList.remove("active");
          btn.style.opacity = "1";
        }, 200);
      }
    });
  }

  // Animate value changes
  function animateValue(element, start, end, duration) {
    // Strip non-numeric characters for calculation but keep for display
    const startValue = parseInt(start.replace(/[^\d]/g, "")) || 0;
    const endValue = parseInt(end.replace(/[^\d]/g, ""));
    const prefix = end.replace(/[\d,]/g, "");

    // Don't animate if values are the same
    if (startValue === endValue) return;

    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (endValue - startValue) + startValue);
      element.textContent = prefix + formatNumber(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Quick amount buttons with enhanced feedback
  quickAmountBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const amount = parseInt(this.dataset.amount);

      // Set value with visual feedback
      if (amountInput) {
        amountInput.value = amount;
        amountInput.style.transition = "all 0.2s";
        amountInput.style.transform = "scale(1.05)";

        setTimeout(() => {
          amountInput.style.transform = "scale(1)";
        }, 200);
      }

      updateAmount(amount);
    });
  });

  // Amount input change with better formatting
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      // Restrict to maximum allowed amount
      if (value > 25000) {
        value = 25000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        if (amountCard) {
          const maxNote = document.createElement("div");
          maxNote.className = "max-limit-note";
          maxNote.textContent = "সর্বোচ্চ ২৫,০০০ টাকা পাঠানো যাবে";
          maxNote.style.color = "#e74c3c";
          maxNote.style.fontSize = "12px";
          maxNote.style.textAlign = "center";
          maxNote.style.padding = "5px";
          maxNote.style.marginTop = "10px";

          // Remove any existing note
          const existingNote = amountCard.querySelector(".max-limit-note");
          if (existingNote) {
            existingNote.remove();
          }

          amountCard.appendChild(maxNote);

          // Auto remove after 3 seconds
          setTimeout(() => {
            maxNote.style.opacity = "0";
            setTimeout(() => {
              maxNote.remove();
            }, 300);
          }, 3000);
        }
      }

      updateAmount(value);
    });

    // Add focus effects
    amountInput.addEventListener("focus", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      if (wrapper) {
        wrapper.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
      }
    });

    amountInput.addEventListener("blur", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      if (wrapper) {
        wrapper.style.boxShadow = "";
      }
    });
  }

  // Add focus effects to phone input
  if (phoneInput) {
    phoneInput.addEventListener("focus", function () {
      const wrapper = this.closest(".search-input-wrapper");
      if (wrapper) {
        wrapper.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
      }
    });

    phoneInput.addEventListener("blur", function () {
      const wrapper = this.closest(".search-input-wrapper");
      if (wrapper) {
        wrapper.style.boxShadow = "";
      }
    });

    // Handle Enter key on phone input
    phoneInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter key pressed"); // Debug log
        // Reset selected contact when entering new number manually
        selectedContact = null;
        // Remove selected class from all contacts
        contactItems.forEach((item) => {
          item.classList.remove("selected-contact");
        });
        // Trigger next section
        proceedToNextSection();
      }
    });

    // Real-time formatting and validation
    phoneInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/\D/g, "");

      // Auto determine operator from number
      if (this.value.length >= 3) {
        let operator = "unknown";

        if (this.value.startsWith("017")) {
          operator = "gp";
        } else if (this.value.startsWith("018")) {
          operator = "robi";
        } else if (this.value.startsWith("019")) {
          operator = "bl";
        } else if (this.value.startsWith("016")) {
          operator = "airtel";
        } else if (this.value.startsWith("015")) {
          operator = "tt";
        }

        // Update search icon with operator icon
        const searchIcon = document.querySelector(".search-icon");
        if (searchIcon && operator !== "unknown") {
          searchIcon.className = "operator-indicator " + operator;
          searchIcon.innerHTML = getOperatorShortName(operator);
          searchIcon.style.width = "20px";
          searchIcon.style.height = "20px";
          searchIcon.style.borderRadius = "50%";
          searchIcon.style.color = "white";
          searchIcon.style.fontSize = "10px";
          searchIcon.style.fontWeight = "bold";
          searchIcon.style.display = "flex";
          searchIcon.style.alignItems = "center";
          searchIcon.style.justifyContent = "center";
        } else if (searchIcon) {
          searchIcon.className = "search-icon";
          searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        }
      } else {
        // Reset to search icon
        const searchIcon = document.querySelector(".search-icon");
        if (searchIcon) {
          searchIcon.className = "search-icon";
          searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        }
      }
    });
  }

  // Helper function to get operator short name
  function getOperatorShortName(operator) {
    switch (operator) {
      case "gp":
        return "GP";
      case "robi":
        return "R";
      case "bl":
        return "BL";
      case "airtel":
        return "AT";
      case "tt":
        return "TT";
      default:
        return "";
    }
  }

  // Send Money button click
  if (sendMoneyBtn) {
    sendMoneyBtn.addEventListener("click", function () {
      if (currentAmount >= 10) {
        const recipientElement = document.querySelector(".recipient-number");
        const recipient = recipientElement
          ? recipientElement.textContent
          : phoneInput.value;

        // Show sending animation
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> সেন্ড হচ্ছে...';
        this.style.pointerEvents = "none";

        // Simulate API call delay
        setTimeout(() => {
          // Show PIN modal
          showPinEntryModal(
            recipient,
            currentAmount,
            currentCharge,
            currentTotal
          );
        }, 1000);
      }
    });
  }

  // PIN Entry Modal
  function showPinEntryModal(recipient, amount, charge, total) {
    // Update PIN modal values
    const pinRecipient = document.getElementById("pinRecipient");
    const pinAmount = document.getElementById("pinAmount");
    const pinCharge = document.getElementById("pinCharge");
    const pinTotal = document.getElementById("pinTotal");

    if (pinRecipient) pinRecipient.textContent = recipient;
    if (pinAmount) pinAmount.textContent = "৳" + formatNumber(amount);
    if (pinCharge) pinCharge.textContent = "৳" + formatNumber(charge);
    if (pinTotal) pinTotal.textContent = "৳" + formatNumber(total);

    // Show the modal
    pinModal.show();

    // Handle PIN digits
    const pinDigits = document.querySelectorAll("#pinModal .pin-digit");
    const confirmBtn = document.querySelector("#pinModal .pin-confirm-btn");
    const pinError = document.querySelector("#pinModal .pin-error");

    // Clear previous PIN digits
    pinDigits.forEach((digit) => (digit.value = ""));
    if (confirmBtn) confirmBtn.disabled = true;
    if (pinError) pinError.textContent = "";

    // Focus first digit
    setTimeout(() => {
      if (pinDigits[0]) pinDigits[0].focus();
    }, 300);

    // Handle PIN input
    pinDigits.forEach((digit, index) => {
      digit.addEventListener("input", function () {
        if (this.value && index < pinDigits.length - 1) {
          pinDigits[index + 1].focus();
        }

        // Check if all digits are filled
        let allFilled = true;
        pinDigits.forEach((d) => {
          if (!d.value) allFilled = false;
        });

        if (confirmBtn) confirmBtn.disabled = !allFilled;
      });

      // Navigate backward on backspace
      digit.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !this.value && index > 0) {
          pinDigits[index - 1].focus();
        }
      });
    });
  }

  // Handle PIN modal close
  const pinModalElement = document.getElementById("pinModal");
  if (pinModalElement) {
    pinModalElement.addEventListener("hidden.bs.modal", function () {
      // Reset send button
      if (sendMoneyBtn) {
        sendMoneyBtn.innerHTML =
          '<i class="fas fa-paper-plane"></i> সেন্ড মানি করুন';
        sendMoneyBtn.style.pointerEvents = "";
      }
    });
  }

  // Reset form for new transaction
  function resetForm() {
    if (phoneInput) phoneInput.value = "";
    if (amountInput) amountInput.value = "";
    currentAmount = 0;
    currentCharge = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    if (summaryAmount) summaryAmount.textContent = "৳০";
    if (summaryCharge) summaryCharge.textContent = "৳০";
    if (summaryTotal) summaryTotal.textContent = "৳০";

    if (sendMoneyBtn) {
      sendMoneyBtn.disabled = true;
      sendMoneyBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> সেন্ড মানি করুন';
      sendMoneyBtn.style.pointerEvents = "";
    }

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));

    // Reset section visibility
    if (amountInputSection && numberInputSection) {
      if (amountInputSection.style.display === "block") {
        amountInputSection.style.display = "none";
        numberInputSection.style.display = "block";
      }
    }
  }

  // Add CSS animation and effect classes
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.classList.add("ripple");
  });

  // Initialize with balance hidden
  if (balanceHidden && balanceVisible) {
    balanceHidden.style.opacity = "1";
    balanceVisible.style.opacity = "0";
    balanceVisible.style.display = "none";
  }

  // Add CSS for shake effect if not already present
  if (!document.querySelector("style#shake-css")) {
    const shakeStyle = document.createElement("style");
    shakeStyle.id = "shake-css";
    shakeStyle.textContent = `
      .shake-effect {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(shakeStyle);
  }
});

// Backend functionality
let nischitKorun = document.getElementById("nischitKorun");
let pins = document.querySelectorAll(".pin-digit");
let amount = document.getElementById("amount");
let mobile = document.getElementById("phone-number");

if (nischitKorun) {
  nischitKorun.addEventListener("click", function (e) {
    // Prevent default form submission to avoid page reload
    e.preventDefault();

    let tk = amount ? amount.value : "";
    let mobileNum = mobile ? mobile.value : "";
    let fullPins = "";

    pins.forEach(function (item) {
      fullPins += item.value;
    });

    // Use relative URL instead of hardcoded localhost
    fetch("http://localhost:3000/sendmoney", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mobile: mobileNum,
        amount: tk,
        pin: fullPins,
      }),
    })
      .then(async function (r1) {
        // এখানে await করে JSON ডেটা নিই
        const data = await r1.json();

        if (r1.ok) {
          // console.log("Success:", data.message);
          alert(data.message);

          // Hide PIN modal
          const pinModal = bootstrap.Modal.getInstance(
            document.getElementById("pinModal")
          );
          if (pinModal) {
            pinModal.hide();
          }

          // Reset form and go back to first page
          setTimeout(() => {
            resetFormAndGoToFirstPage();
          }, 500);
        } else {
          alert(data.message);
          // console.error("Error:", data.message);
        }
      })
      .catch(function (err) {
        console.error("Network error:", err);
      });
  });
}

// Function to reset form and go back to first page
function resetFormAndGoToFirstPage() {
  // Reset all form values
  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const summaryAmount = document.getElementById("summary-amount");
  const summaryCharge = document.getElementById("summary-charge");
  const summaryTotal = document.getElementById("summary-total");
  const sendMoneyBtn = document.getElementById("send-money-btn");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const pinDigits = document.querySelectorAll(".pin-digit");

  // Clear all inputs
  if (phoneInput) phoneInput.value = "";
  if (amountInput) amountInput.value = "";

  // Clear PIN digits
  pinDigits.forEach((digit) => {
    digit.value = "";
  });

  // Reset summary values
  if (summaryAmount) summaryAmount.textContent = "৳০";
  if (summaryCharge) summaryCharge.textContent = "৳০";
  if (summaryTotal) summaryTotal.textContent = "৳০";

  // Reset send button
  if (sendMoneyBtn) {
    sendMoneyBtn.disabled = true;
    sendMoneyBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> সেন্ড মানি করুন';
    sendMoneyBtn.style.pointerEvents = "";
    sendMoneyBtn.classList.remove("enabled");
    sendMoneyBtn.style.animation = "none";
  }

  // Reset active states
  quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
  contactItems.forEach((item) => item.classList.remove("selected-contact"));

  // Reset global variables
  window.selectedContact = null;
  window.currentAmount = 0;
  window.currentCharge = 0;
  window.currentTotal = 0;

  // Go back to first page with animation
  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");

  if (amountInputSection && numberInputSection) {
    // Hide amount section with animation
    amountInputSection.style.opacity = "0";
    amountInputSection.style.transform = "translateX(20px)";

    setTimeout(() => {
      amountInputSection.style.display = "none";

      // Show number section with entrance animation
      numberInputSection.style.display = "block";
      numberInputSection.style.opacity = "0";
      numberInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        numberInputSection.style.opacity = "1";
        numberInputSection.style.transform = "translateX(0)";

        // Focus on phone input
        if (phoneInput) {
          phoneInput.focus();
        }
      }, 50);
    }, 200);
  }
}
