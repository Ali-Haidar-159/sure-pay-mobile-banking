// Enhanced Professional Cash In Form Functionality for SurePay Agent
document.addEventListener("DOMContentLoaded", function () {

  let allDetails = {} ;

  // Elements - Main UI
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
  const tabBtns = document.querySelectorAll(".tab-btn");

  const summaryAmount = document.getElementById("summary-amount");
  const summaryCommission = document.getElementById("summary-commission");
  const summaryTotal = document.getElementById("summary-total");
  const cashInBtn = document.getElementById("cash-in-btn");

  // Elements - Modals
  const verificationModal = document.getElementById("verificationModal");
  const closeVerificationBtn = document.getElementById("closeVerificationBtn");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");
  const resendOtpBtn = document.getElementById("resendOtpBtn");
  const otpDigits = document.querySelectorAll(".otp-digit");
  const otpError = document.querySelector(".otp-error");

  const successModal = document.getElementById("successModal");
  const newTransactionBtn = document.getElementById("newTransactionBtn");
  const printReceiptBtn = document.getElementById("printReceiptBtn");

  const toastNotification = document.getElementById("toastNotification");

  // Verification modal values
  const verificationNumber = document.getElementById("verification-number");
  const verificationAmount = document.getElementById("verification-amount");
  const verificationCommission = document.getElementById(
    "verification-commission"
  );
  const verificationTotal = document.getElementById("verification-total");

  // Success modal values
  const successMessage = document.getElementById("success-message");
  const txnId = document.getElementById("txn-id");
  const txnDate = document.getElementById("txn-date");
  const txnAmount = document.getElementById("txn-amount");
  const txnCommission = document.getElementById("txn-commission");
  const txnTotal = document.getElementById("txn-total");

  // Variables
  let selectedContact = null;
  let currentAmount = 0;
  let currentCommission = 0;
  let currentTotal = 0;

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Show toast notification
  function showToast(message, duration = 3000) {
    toastNotification.textContent = message;
    toastNotification.style.display = "block";
    setTimeout(() => {
      toastNotification.style.opacity = "1";
    }, 10);

    setTimeout(() => {
      toastNotification.style.opacity = "0";
      setTimeout(() => {
        toastNotification.style.display = "none";
      }, 300);
    }, duration);
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
        contactsContainer.style.opacity = "0";

        setTimeout(() => {
          contactsContainer.style.opacity = "1";
        }, 200);
      });
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      phoneInput.value = "";
      phoneInput.focus();
    });
  }

  // Navigation between sections with smooth transition
  if (numberNextBtn) {
    numberNextBtn.addEventListener("click", function () {
      // Validate phone number
      if (phoneInput.value.length >= 11 || selectedContact) {
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
            recipientName.textContent = selectedContact.name;
            recipientNumber.textContent = selectedContact.number;
            recipientAvatar.textContent = selectedContact.initial;
            recipientAvatar.className =
              "recipient-avatar " + selectedContact.gradient;
            operatorBadge.className =
              "operator-badge " + selectedContact.operator;
            operatorBadge.textContent = selectedContact.operatorName;
          } else {
            recipientName.textContent = "নতুন গ্রাহক";
            recipientNumber.textContent = phoneInput.value;
            recipientAvatar.textContent = "ন";
            recipientAvatar.className = "recipient-avatar gradient-1";

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

            operatorBadge.className = "operator-badge " + operator;
            operatorBadge.textContent = operatorName;
          }

          // Focus on amount input
          amountInput.focus();
        }, 200);
      } else {
        // Shake effect for validation error
        phoneInput.classList.add("shake-effect");
        setTimeout(() => {
          phoneInput.classList.remove("shake-effect");
        }, 600);

        // Show validation message
        const searchContainer = document.querySelector(".search-container");
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
        numberNextBtn.click();
      }, 500);
    });
  });

  // Calculate agent commission
  function calculateCommission(amount) {
    if (!amount || amount <= 0) return 0;

    // SurePay agent commission structure (this is just an example)
    // In real life, this would be determined by SurePay policy
    const commissionRate = 0.01; // 1% commission
    let commission = Math.round(amount * commissionRate);

    // Cap commission at maximum 25 taka
    return Math.min(commission, 25);
  }

  // Process amount change with animations
  function updateAmount(amount) {
    currentAmount = amount;
    currentCommission = calculateCommission(currentAmount);
    // For Cash In, the customer receives the full amount (unlike Send Money where customer pays charge)
    currentTotal = currentAmount;

    // Update display with counting animation
    animateValue(
      summaryAmount,
      "৳" + (summaryAmount.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentAmount),
      300
    );
    animateValue(
      summaryCommission,
      "৳" + (summaryCommission.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentCommission),
      300
    );
    animateValue(
      summaryTotal,
      "৳" + (summaryTotal.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentTotal),
      300
    );

    // Enable/disable cash in button with animation
    if (currentAmount >= 50 && !cashInBtn.classList.contains("enabled")) {
      cashInBtn.disabled = false;
      cashInBtn.classList.add("enabled");
      cashInBtn.style.transition = "all 0.3s";
      cashInBtn.style.animation = "pulse 2s infinite";
    } else if (currentAmount < 50 && cashInBtn.classList.contains("enabled")) {
      cashInBtn.disabled = true;
      cashInBtn.classList.remove("enabled");
      cashInBtn.style.animation = "none";
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
      amountInput.value = amount;
      amountInput.style.transition = "all 0.2s";
      amountInput.style.transform = "scale(1.05)";

      setTimeout(() => {
        amountInput.style.transform = "scale(1)";
      }, 200);

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
      if (value > 30000) {
        value = 30000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        const maxNote = document.createElement("div");
        maxNote.className = "max-limit-note";
        maxNote.textContent = "সর্বোচ্চ ৩০,০০০ টাকা ক্যাশ ইন করা যাবে";
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

      updateAmount(value);
    });

    // Add focus effects
    amountInput.addEventListener("focus", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      wrapper.style.boxShadow = "0 0 0 2px rgba(25, 138, 226, 0.2)";
    });

    amountInput.addEventListener("blur", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      wrapper.style.boxShadow = "";
    });
  }

  // Add focus effects to phone input
  if (phoneInput) {
    phoneInput.addEventListener("focus", function () {
      const wrapper = this.closest(".search-input-wrapper");
      wrapper.style.boxShadow = "0 0 0 2px rgba(25, 138, 226, 0.2)";
    });

    phoneInput.addEventListener("blur", function () {
      const wrapper = this.closest(".search-input-wrapper");
      wrapper.style.boxShadow = "";
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
        if (operator !== "unknown") {
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
        } else {
          searchIcon.className = "search-icon";
          searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        }
      } else {
        // Reset to search icon
        const searchIcon = document.querySelector(".search-icon");
        searchIcon.className = "search-icon";
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
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

  // Cash In button click
  if (cashInBtn) {
    cashInBtn.addEventListener("click", function () {
      if (currentAmount >= 50) {
        const recipient =
          document.querySelector(".recipient-number").textContent;

        // Show sending animation
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> প্রক্রিয়াধীন...';
        this.style.pointerEvents = "none";

        // Simulate API call delay
        setTimeout(() => {
          // Show verification modal
          showVerificationModal(
            recipient,
            currentAmount,
            currentCommission,
            currentTotal
          );
        }, 1000);
      }
    });
  }

  // Verification Modal for Customer Confirmation
  function showVerificationModal(recipient, amount, commission, total) {
    // Update verification modal with transaction details
    verificationNumber.textContent = recipient;
    verificationAmount.textContent = "৳" + formatNumber(amount);
    verificationCommission.textContent = "৳" + formatNumber(commission);
    verificationTotal.textContent = "৳" + formatNumber(total);

    // Display the modal
    verificationModal.style.display = "flex";
    setTimeout(() => {
      verificationModal.style.opacity = "1";
      verificationModal.querySelector(".verification-modal").style.transform =
        "translateY(0)";
    }, 10);

    // Focus first digit
    setTimeout(() => {
      otpDigits[0].focus();
    }, 300);
  }

  // Handle OTP digits input
  otpDigits.forEach((digit, index) => {
    digit.addEventListener("input", function () {
      if (this.value && index < otpDigits.length - 1) {
        otpDigits[index + 1].focus();
      }

      // Check if all digits are filled
      let allFilled = true;
      otpDigits.forEach((d) => {
        if (!d.value) allFilled = false;
      });

      verifyOtpBtn.disabled = !allFilled;
    });

    // Navigate backward on backspace
    digit.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        otpDigits[index - 1].focus();
      }
    });
  });

  // Close verification modal
  if (closeVerificationBtn) {
    closeVerificationBtn.addEventListener("click", function () {
      verificationModal.style.opacity = "0";
      verificationModal.querySelector(".verification-modal").style.transform =
        "translateY(20px)";

      // Reset cash in button
      cashInBtn.innerHTML = '<i class="fas fa-check-circle"></i> ক্যাশ ইন করুন';
      cashInBtn.style.pointerEvents = "";

      // Remove modal after animation
      setTimeout(() => {
        verificationModal.style.display = "none";
        // Clear OTP fields
        otpDigits.forEach((digit) => {
          digit.value = "";
        });
        otpError.textContent = "";
      }, 300);
    });
  }

  // Resend OTP button
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Show loading state
      this.textContent = "পাঠানো হচ্ছে...";
      this.style.color = "#888";

      // Simulate OTP resend
      setTimeout(() => {
        this.textContent = "ওটিপি আবার পাঠান";
        this.style.color = "#198ae2";

        // Show confirmation toast
        showToast("নতুন ওটিপি পাঠানো হয়েছে");

        // Clear OTP input fields
        otpDigits.forEach((digit) => {
          digit.value = "";
        });
        otpDigits[0].focus();
        verifyOtpBtn.disabled = true;
        otpError.textContent = "";
      }, 1500);
    });
  }

  // Verify OTP button
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener("click", function () {


      forBackend() ;

      // Get entered OTP
      let enteredOtp = "";
      otpDigits.forEach((digit) => {
        enteredOtp += digit.value;
      });

      // Simulate OTP verification (correct OTP is 1234 for demo)
      if (enteredOtp === "1234") {
        this.disabled = true;
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';

        // Simulate processing delay
        setTimeout(() => {
          // Hide verification modal
          verificationModal.style.opacity = "0";
          setTimeout(() => {
            verificationModal.style.display = "none";

            // Show success screen
            showSuccessScreen(
              verificationNumber.textContent,
              currentAmount,
              currentCommission,
              currentTotal
            );
          }, 300);
        }, 1500);
      } else {
        // Show error with shake animation
        otpError.textContent = "ভুল ওটিপি। আবার চেষ্টা করুন।";

        // Add shake animation to OTP inputs
        otpDigits.forEach((digit) => {
          digit.style.borderColor = "#e74c3c";
          digit.classList.add("shake-effect");
          setTimeout(() => {
            digit.classList.remove("shake-effect");
          }, 600);
        });

        // Clear the OTP fields
        setTimeout(() => {
          otpDigits.forEach((digit) => {
            digit.value = "";
          });
          otpDigits[0].focus();
          verifyOtpBtn.disabled = true;
        }, 300);
      }
    });
  }

  // Show success screen
  function showSuccessScreen(recipient, amount, commission, total) {
    // Create a random transaction ID
    const transactionId = "CIN" + Math.floor(Math.random() * 10000000);
    const dateTime = new Date().toLocaleString("bn-BD");

    // Update success modal with transaction details
    successMessage.textContent = `${recipient} নম্বরে ৳${formatNumber(
      amount
    )} টাকা সফলভাবে ক্যাশ ইন করা হয়েছে`;
    txnId.textContent = transactionId;
    txnDate.textContent = dateTime;
    txnAmount.textContent = "৳" + formatNumber(amount);
    txnCommission.textContent = "৳" + formatNumber(commission);
    txnTotal.textContent = "৳" + formatNumber(total);

    // Display the success modal
    successModal.style.display = "flex";

    // Update agent balance (for demo purposes)
    const balanceDisplay = document.getElementById("balanceVisible");
    if (balanceDisplay) {
      const currentBalanceText =
        balanceDisplay.querySelector("span:last-child").textContent;
      const currentBalance = parseInt(currentBalanceText.replace(/[^\d]/g, ""));
      const newBalance = currentBalance - amount;

      // Animate balance change
      setTimeout(() => {
        balanceDisplay.querySelector("span:last-child").textContent =
          "৳" + formatNumber(newBalance);
      }, 1000);
    }
  }

  // New Transaction button
  if (newTransactionBtn) {
    newTransactionBtn.addEventListener("click", function () {
      // Hide success overlay with fade-out animation
      successModal.style.opacity = "0";

      // After animation completes, remove overlay and reset form
      setTimeout(() => {
        // Hide success modal
        successModal.style.display = "none";

        // Force direct navigation to initial cashIn page
        if (amountInputSection) {
          amountInputSection.style.display = "none";
        }
        if (numberInputSection) {
          numberInputSection.style.display = "block";
          numberInputSection.style.opacity = "1";
          numberInputSection.style.transform = "translateX(0)";
        }

        // Completely reset the form to initial state
        fullResetCashInForm();

        // Ensure the first screen is visible with animation
        showInitialCashInScreen();

        // Reset cashInBtn
        if (cashInBtn) {
          cashInBtn.disabled = true;
          cashInBtn.innerHTML =
            '<i class="fas fa-check-circle"></i> ক্যাশ ইন করুন';
          cashInBtn.style.pointerEvents = "";
          cashInBtn.style.animation = "none";
          cashInBtn.classList.remove("enabled");
        }

        // Clear phone input and set focus
        if (phoneInput) {
          phoneInput.value = "";
          setTimeout(() => {
            phoneInput.focus();
          }, 100);
        }
      }, 300);
    });
  }

  // Print Receipt button
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener("click", function () {
      // Simulate print
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> প্রিন্ট হচ্ছে...';

      setTimeout(() => {
        showToast("রিসিট প্রিন্ট করা হয়েছে");
        this.innerHTML = '<i class="fas fa-print"></i> রিসিট প্রিন্ট করুন';
      }, 1500);
    });
  }

  // Reset form for new transaction
  function resetForm() {
    phoneInput.value = "";
    amountInput.value = "";
    currentAmount = 0;
    currentCommission = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    summaryAmount.textContent = "৳০";
    summaryCommission.textContent = "৳০";
    summaryTotal.textContent = "৳০";

    cashInBtn.disabled = true;
    cashInBtn.innerHTML = '<i class="fas fa-check-circle"></i> ক্যাশ ইন করুন';
    cashInBtn.style.pointerEvents = "";

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));

    // Reset section visibility
    if (amountInputSection.style.display === "block") {
      amountInputSection.style.display = "none";
      numberInputSection.style.display = "block";
    }
  }

  // Enhanced reset for direct navigation from success page
  function fullResetCashInForm() {
    // Reset all form values
    phoneInput.value = "";
    amountInput.value = "";
    currentAmount = 0;
    currentCommission = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    summaryAmount.textContent = "৳০";
    summaryCommission.textContent = "৳০";
    summaryTotal.textContent = "৳০";

    cashInBtn.disabled = true;
    cashInBtn.innerHTML = '<i class="fas fa-check-circle"></i> ক্যাশ ইন করুন';
    cashInBtn.style.pointerEvents = "";

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));

    // IMPORTANT: Ensure we're showing the first screen
    // Make number input section visible and hide amount section
    numberInputSection.style.display = "block";
    amountInputSection.style.display = "none";

    // Reset any error messages or validation states
    const validationMessages = document.querySelectorAll(".validation-message");
    validationMessages.forEach((msg) => msg.remove());

    // Reset any highlights or focus states
    const searchWrapper = document.querySelector(".search-input-wrapper");
    if (searchWrapper) {
      searchWrapper.style.boxShadow = "";
    }

    // Reset any pending animations
    numberInputSection.style.opacity = "1";
    numberInputSection.style.transform = "translateX(0)";
    amountInputSection.style.opacity = "0";
    amountInputSection.style.transform = "translateX(0)";

    // Reset any tab states
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach((tab) => {
      tab.classList.remove("active");
    });
    // Set first tab as active
    if (tabBtns.length) {
      tabBtns[0].classList.add("active");
    }

    // Reset search icon
    const searchIcon = document.querySelector(".search-icon");
    if (searchIcon) {
      searchIcon.className = "search-icon";
      searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    }

    // Reset any max limit notes
    const maxNotes = document.querySelectorAll(".max-limit-note");
    maxNotes.forEach((note) => note.remove());

    // Clear any remaining timeouts
    for (let i = 1; i < 1000; i++) {
      window.clearTimeout(i);
    }
  }

  // Show initial cash in screen with smooth animation
  function showInitialCashInScreen() {
    // Make sure the number input section is visible
    numberInputSection.style.display = "block";
    amountInputSection.style.display = "none";

    // Create a fresh entrance animation
    numberInputSection.style.opacity = "0";
    numberInputSection.style.transform = "translateY(10px)";

    // Add animation to show the screen nicely
    setTimeout(() => {
      numberInputSection.style.opacity = "1";
      numberInputSection.style.transform = "translateY(0)";

      // Focus on the search input
      setTimeout(() => {
        if (phoneInput) {
          phoneInput.focus();
        }

        // Add a subtle pulse to the search wrapper to draw attention
        const searchWrapper = document.querySelector(".search-input-wrapper");
        if (searchWrapper) {
          searchWrapper.style.transition = "all 0.4s";
          searchWrapper.style.boxShadow = "0 0 0 2px rgba(25, 138, 226, 0.2)";

          setTimeout(() => {
            searchWrapper.style.boxShadow = "";
          }, 1000);
        }
      }, 300);
    }, 50);

    // Reset the contacts container
    const contactsContainer = document.querySelector(".contacts-container");
    if (contactsContainer) {
      contactsContainer.style.opacity = "0";
      setTimeout(() => {
        contactsContainer.style.opacity = "1";
      }, 400);
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

  function forBackend()
  {
    allDetails.mobile = document.getElementById("phone-number").value
    allDetails.amount = document.getElementById("amount").value ;

    // console.log(allDetails) ;

      fetch("http://localhost:3000/agent/cashin", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({allDetails})
    })
    .then(async function(r1){

      const data = await r1.json();

      if(r1.ok) {
        // console.log("Success:", data.message);  
        alert(data.message) ;
      } else {
        alert(data.message) ;
        // console.error("Error:", data.message);  
      }
    })
    .catch(function(err){
      console.error("Network error:", err);
    });


  }







});
