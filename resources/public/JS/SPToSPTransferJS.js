// Enhanced Professional bKash to bKash Transfer Form Functionality for bKash Agent
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
  const tabBtns = document.querySelectorAll(".tab-btn");

  const summaryAmount = document.getElementById("summary-amount");
  const summaryCharge = document.getElementById("summary-charge");
  const summaryCommission = document.getElementById("summary-commission");
  const summaryTotal = document.getElementById("summary-total");
  const transferBtn = document.getElementById("transfer-btn");

  // Modal elements
  const pinVerificationModal = document.getElementById("pinVerificationModal");
  const successModal = document.getElementById("successModal");

  // Bootstrap modal instances
  const pinModal = new bootstrap.Modal(pinVerificationModal);
  const successModalInstance = new bootstrap.Modal(successModal);

  // Variables
  let selectedContact = null;
  let currentAmount = 0;
  let currentCharge = 0;
  let currentCommission = 0;
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

  // Calculate service charge and commission for bKash to bKash
  function calculateChargeAndCommission(amount) {
    if (!amount || amount <= 0) return { charge: 0, commission: 0 };

    // bKash to bKash transfer charge structure (example)
    let charge = 0;

    if (amount <= 1000) {
      charge = 5;
    } else if (amount <= 10000) {
      charge = 10;
    } else if (amount <= 25000) {
      charge = 15;
    } else {
      charge = 20;
    }

    // Agent commission (typically a percentage of the charge)
    const commission = Math.round(charge * 0.5); // 50% of the charge goes to agent as commission

    return { charge, commission };
  }

  // Process amount change with animations
  function updateAmount(amount) {
    currentAmount = amount;
    const { charge, commission } = calculateChargeAndCommission(currentAmount);
    currentCharge = charge;
    currentCommission = commission;
    currentTotal = currentAmount + currentCharge;

    // Update display with counting animation
    animateValue(
      summaryAmount,
      "৳" + (summaryAmount.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentAmount),
      300
    );
    animateValue(
      summaryCharge,
      "৳" + (summaryCharge.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentCharge),
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

    // Enable/disable transfer button with animation
    if (currentAmount >= 50 && !transferBtn.classList.contains("enabled")) {
      transferBtn.disabled = false;
      transferBtn.classList.add("enabled");
      transferBtn.style.transition = "all 0.3s";
      transferBtn.style.animation = "pulse 2s infinite";
    } else if (
      currentAmount < 50 &&
      transferBtn.classList.contains("enabled")
    ) {
      transferBtn.disabled = true;
      transferBtn.classList.remove("enabled");
      transferBtn.style.animation = "none";
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
      if (value > 25000) {
        value = 25000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        const maxNote = document.createElement("div");
        maxNote.className = "max-limit-note";
        maxNote.textContent = "সর্বোচ্চ ২৫,০০০ টাকা ট্রান্সফার করা যাবে";
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

  // Transfer button click
  if (transferBtn) {
    transferBtn.addEventListener("click", function () {
      if (currentAmount >= 50) {
        const recipient =
          document.querySelector(".recipient-number").textContent;

        // Show sending animation
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> প্রক্রিয়াধীন...';
        this.style.pointerEvents = "none";

        // Simulate API call delay
        setTimeout(() => {
          // Show agent PIN verification modal
          showAgentPINModal(
            recipient,
            currentAmount,
            currentCharge,
            currentCommission,
            currentTotal
          );
        }, 1000);
      }
    });
  }

  // Modified showAgentPINModal function to use existing HTML modal
  function showAgentPINModal(recipient, amount, charge, commission, total) {
    // Update the modal's transaction summary with the values
    document.getElementById("modal-summary-amount").textContent =
      "৳" + formatNumber(amount);
    document.getElementById("modal-summary-charge").textContent =
      "৳" + formatNumber(charge);
    document.getElementById("modal-summary-commission").textContent =
      "৳" + formatNumber(commission);
    document.getElementById("modal-summary-total").textContent =
      "৳" + formatNumber(total);

    // Get PIN elements
    const pinBoxes = Array.from(
      pinVerificationModal.querySelectorAll(".pin-box")
    );
    const verifyPinBtn = pinVerificationModal.querySelector("#verify-pin-btn");
    const pinError = pinVerificationModal.querySelector("#pin-error");

    // Clear previous PIN inputs
    pinBoxes.forEach((box) => {
      box.value = "";
      box.disabled = false;
    });
    pinError.textContent = "";

    // Show the modal
    pinModal.show();

    // Set focus to first pin box
    setTimeout(() => {
      pinBoxes[0].focus();
    }, 300);

    // Handle input in pin boxes
    pinBoxes.forEach((box, index) => {
      // Remove previous event listeners
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
      pinBoxes[index] = newBox;

      // Add new event listeners
      newBox.addEventListener("keydown", (e) => {
        // Allow only numbers and control keys
        if (
          !(
            (e.key >= "0" && e.key <= "9") ||
            e.key === "Backspace" ||
            e.key === "Delete" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "Tab"
          )
        ) {
          e.preventDefault();
          return;
        }

        // Handle backspace specially
        if (e.key === "Backspace") {
          if (newBox.value === "" && index > 0) {
            pinBoxes[index - 1].focus();
            pinBoxes[index - 1].value = "";
          }
        }

        // Handle arrow keys
        if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault();
          pinBoxes[index - 1].focus();
        }

        if (e.key === "ArrowRight" && index < pinBoxes.length - 1) {
          e.preventDefault();
          pinBoxes[index + 1].focus();
        }
      });

      // Move to next input after entering a digit
      newBox.addEventListener("input", () => {
        if (newBox.value.length === 1) {
          if (index < pinBoxes.length - 1) {
            pinBoxes[index + 1].focus();
          } else {
            // If last box is filled, check if all boxes are filled
            const allFilled = pinBoxes.every((box) => box.value.length === 1);
            if (allFilled) {
              newBox.blur(); // Remove focus from the last box
            }
          }
        }
      });
    });

    // Verify PIN button click handler
    const newVerifyBtn = verifyPinBtn.cloneNode(true);
    verifyPinBtn.parentNode.replaceChild(newVerifyBtn, verifyPinBtn);

    newVerifyBtn.addEventListener("click", () => {
      const enteredPIN = pinBoxes.map((box) => box.value).join("");

      forBackend() ;

      // Check if all digits are entered
      if (enteredPIN.length !== 5) {
        pinError.textContent = "সম্পূর্ণ ৫ ডিজিট পিন দিন";
        pinBoxes.forEach((box) => {
          if (!box.value) {
            box.classList.add("shake-effect");
            setTimeout(() => {
              box.classList.remove("shake-effect");
            }, 600);
          }
        });
        return;
      }

      // For demo, use "12345" as the correct PIN
      const correctPIN = "12345";

      if (enteredPIN === correctPIN) {
        // Show processing state
        newVerifyBtn.disabled = true;
        newVerifyBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> প্রক্রিয়াধীন...';
        pinError.textContent = "পিন যাচাই করা হচ্ছে...";
        pinError.style.color = "#1a8ae3";

        // Disable input
        pinBoxes.forEach((box) => {
          box.disabled = true;
        });

        // Simulate processing delay
        setTimeout(() => {
          // Show success message
          pinError.textContent = "পিন যাচাই সফল হয়েছে!";
          pinError.style.color = "#2ecc71";

          // Simulate final processing
          setTimeout(() => {
            pinModal.hide();
            // Show success screen
            showSuccessScreen(recipient, amount, charge, commission, total);
          }, 1000);
        }, 1500);
      } else {
        // Show error with shake animation
        pinError.textContent = "ভুল পিন। আবার চেষ্টা করুন।";

        // Add shake animation to PIN boxes
        pinBoxes.forEach((box) => {
          box.classList.add("shake-effect");
          setTimeout(() => {
            box.classList.remove("shake-effect");
          }, 600);
        });

        // Clear the PIN boxes after a short delay
        setTimeout(() => {
          pinBoxes.forEach((box) => {
            box.value = "";
          });
          // Set focus back to first box
          pinBoxes[0].focus();
        }, 800);
      }
    });

    // Handle modal close
    pinVerificationModal.addEventListener("hidden.bs.modal", function () {
      // Reset transfer button
      transferBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> ট্রান্সফার করুন';
      transferBtn.style.pointerEvents = "";
    });
  }

  // Modified showSuccessScreen function to use existing HTML modal
  function showSuccessScreen(recipient, amount, charge, commission, total) {
    // Create a random transaction ID
    const txnId = "TRX" + Math.floor(Math.random() * 10000000);
    const dateTime = new Date().toLocaleString("bn-BD");

    // Update success modal content
    document.getElementById(
      "success-message"
    ).textContent = `${recipient} নম্বরে ৳${formatNumber(
      amount
    )} টাকা সফলভাবে ট্রান্সফার করা হয়েছে`;

    document.getElementById("txn-id").textContent = txnId;
    document.getElementById("txn-datetime").textContent = dateTime;
    document.getElementById("txn-amount").textContent =
      "৳" + formatNumber(amount);
    document.getElementById("txn-charge").textContent =
      "৳" + formatNumber(charge);
    document.getElementById("txn-commission").textContent =
      "৳" + formatNumber(commission);
    document.getElementById("txn-total").textContent =
      "৳" + formatNumber(total);

    // Show the success modal
    successModalInstance.show();

    // Add click handlers for buttons
    const newTxnBtn = successModal.querySelector(".new-transaction");
    const printBtn = successModal.querySelector(".print-receipt");

    // Remove old event listeners by cloning
    const newNewTxnBtn = newTxnBtn.cloneNode(true);
    const newPrintBtn = printBtn.cloneNode(true);
    newTxnBtn.parentNode.replaceChild(newNewTxnBtn, newTxnBtn);
    printBtn.parentNode.replaceChild(newPrintBtn, printBtn);

    newNewTxnBtn.addEventListener("click", function () {
      // Hide the modal
      successModalInstance.hide();

      // Reset the form after animation
      setTimeout(() => {
        // Force direct navigation to initial transfer page
        if (amountInputSection) {
          amountInputSection.style.display = "none";
        }
        if (numberInputSection) {
          numberInputSection.style.display = "block";
          numberInputSection.style.opacity = "1";
          numberInputSection.style.transform = "translateX(0)";
        }

        // Completely reset the form to initial state
        fullResetTransferForm();

        // Ensure the first screen is visible with animation
        showInitialTransferScreen();

        // Reset transferBtn
        if (transferBtn) {
          transferBtn.disabled = true;
          transferBtn.innerHTML =
            '<i class="fas fa-paper-plane"></i> ট্রান্সফার করুন';
          transferBtn.style.pointerEvents = "";
          transferBtn.style.animation = "none";
          transferBtn.classList.remove("enabled");
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

    newPrintBtn.addEventListener("click", function () {
      // Simulate print
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> প্রিন্ট হচ্ছে...';

      setTimeout(() => {
        alert("রিসিট প্রিন্ট করা হয়েছে");
        this.innerHTML = '<i class="fas fa-print"></i> রিসিট প্রিন্ট করুন';
      }, 1500);
    });

    // Update agent balance (for demo purposes)
    const balanceDisplay = document.getElementById("balanceVisible");
    if (balanceDisplay) {
      const currentBalanceText =
        balanceDisplay.querySelector("span:last-child").textContent;
      const currentBalance = parseInt(currentBalanceText.replace(/[^\d]/g, ""));
      const newBalance = currentBalance - total;

      // Animate balance change
      setTimeout(() => {
        balanceDisplay.querySelector("span:last-child").textContent =
          "৳" + formatNumber(newBalance);
      }, 1000);
    }
  }

  // Reset form for new transaction
  function resetForm() {
    phoneInput.value = "";
    amountInput.value = "";
    currentAmount = 0;
    currentCharge = 0;
    currentCommission = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    summaryAmount.textContent = "৳০";
    summaryCharge.textContent = "৳০";
    summaryCommission.textContent = "৳০";
    summaryTotal.textContent = "৳০";

    transferBtn.disabled = true;
    transferBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> ট্রান্সফার করুন';
    transferBtn.style.pointerEvents = "";

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
  function fullResetTransferForm() {
    // Reset all form values
    phoneInput.value = "";
    amountInput.value = "";
    currentAmount = 0;
    currentCharge = 0;
    currentCommission = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    summaryAmount.textContent = "৳০";
    summaryCharge.textContent = "৳০";
    summaryCommission.textContent = "৳০";
    summaryTotal.textContent = "৳০";

    transferBtn.disabled = true;
    transferBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> ট্রান্সফার করুন';
    transferBtn.style.pointerEvents = "";

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

  // Show initial transfer screen with smooth animation
  function showInitialTransferScreen() {
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


  let vpb = document.getElementById("verify-pin-btn") ;
  let allDetails = {} ;

  // vpb.addEventListener("click" , function(){

  //   console.log("--")

  //   allDetails.mobile = document.getElementById("phone-number").value ;
  //   allDetails.amount = document.getElementById("amount").value ;
    
  //   let pins = document.querySelectorAll(".pin-box");
  //   let fullPins = "";

  // pins.forEach(function(item){
  //   fullPins += item.value;
  // });

  // allDetails.pin = fullPins ;

  // console.log(allDetails) ;


  // })

  let forBackend = function(){

    console.log("--")

    allDetails.mobile = document.getElementById("phone-number").value ;
    allDetails.amount = document.getElementById("amount").value ;
    
    let pins = document.querySelectorAll(".pin-box");
    let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  allDetails.pin = fullPins ;

  // console.log(allDetails) ;

  fetch("http://localhost:3000/agent/sptosptransfer", {
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
