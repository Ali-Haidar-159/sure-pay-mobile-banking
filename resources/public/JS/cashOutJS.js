document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  const agentSection = document.getElementById("agentSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");
  const successModal = document.getElementById("successModal");

  const agentNextBtn = document.getElementById("agentNextBtn");
  const backToAgentBtn = document.getElementById("backToAgentBtn");
  const backToAmountBtn = document.getElementById("backToAmountBtn");
  const clearSearchBtn = document.getElementById("clearSearch");
  const tabItems = document.querySelectorAll(".tab-item");
  const tabIndicator = document.querySelector(".tab-indicator");

  const agentInput = document.getElementById("agent-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const agentItems = document.querySelectorAll(".agent-item");

  const cashoutBtn = document.getElementById("cashout-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const selectedAmount = document.getElementById("selected-amount");
  const warningSection = document.querySelector(".warning-section");

  // Success Modal elements
  const successDetails = document.getElementById("successDetails");
  const transactionId = document.getElementById("transactionId");
  const transactionDate = document.getElementById("transactionDate");
  const doneBtn = document.getElementById("doneBtn");

  // Forms
  const agentSearchForm = document.getElementById("agentSearchForm");
  const amountForm = document.getElementById("amountForm");
  const pinForm = document.getElementById("pinForm");

  // Variables
  let selectedAgent = null;
  let currentAmount = 0;

  // Prevent default form submission
  if (agentSearchForm) {
    agentSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (amountForm) {
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  if (pinForm) {
    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  // Handle Enter key on agent input - accept any input
  if (agentInput) {
    agentInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const inputValue = this.value.trim();
        if (inputValue.length > 0) {
          // Create selectedAgent object for manual input
          selectedAgent = {
            name: "এজেন্ট", // Default name for manual input
            number: inputValue,
          };

          // Update the recipient info in the next screen
          updateRecipientInfo();

          // Proceed to next section
          proceedToAmountSection();
        } else {
          showValidationMessage(this, "এজেন্টের নাম্বার দিন");
        }
      }
    });
  }

  // Function to update recipient info
  function updateRecipientInfo() {
    const recipientName = document.querySelectorAll(".recipient-name");
    const recipientNumber = document.querySelectorAll(".recipient-number");

    recipientName.forEach((el) => {
      el.textContent = selectedAgent.name;
    });

    recipientNumber.forEach((el) => {
      el.textContent = selectedAgent.number;
    });
  }

  // Function to proceed to amount section with animation
  function proceedToAmountSection() {
    // Add exit animation to current section
    agentSection.style.opacity = "0";
    agentSection.style.transform = "translateX(-20px)";

    setTimeout(() => {
      agentSection.style.display = "none";

      // Show amount section with entrance animation
      amountInputSection.style.display = "block";
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.opacity = "1";
        amountInputSection.style.transform = "translateX(0)";
      }, 50);

      // Focus on amount input
      if (amountInput) {
        amountInput.focus();
      }
    }, 200);
  }

  // Balance toggle with animation - Fixed for reliable operation
  if (showBalanceBtn) {
    showBalanceBtn.addEventListener("click", function () {
      // Ensure elements exist before using them
      if (balanceHidden && balanceVisible) {
        // First set transition
        balanceHidden.style.transition = "opacity 0.15s ease";
        balanceVisible.style.transition = "opacity 0.15s ease";

        // Hide the dots container
        balanceHidden.style.opacity = "0";

        // Use a setTimeout to allow the transition to complete
        setTimeout(() => {
          // Hide dots container and show amount container
          balanceHidden.style.display = "none";
          balanceVisible.style.display = "flex";

          // Force browser reflow to ensure transition works
          void balanceVisible.offsetWidth;

          // Fade in the amount container
          balanceVisible.style.opacity = "1";
        }, 150);
      }
    });
  }

  if (hideBalanceBtn) {
    hideBalanceBtn.addEventListener("click", function () {
      // Ensure elements exist before using them
      if (balanceHidden && balanceVisible) {
        // Set transition
        balanceHidden.style.transition = "opacity 0.15s ease";
        balanceVisible.style.transition = "opacity 0.15s ease";

        // Fade out amount container
        balanceVisible.style.opacity = "0";

        // Use a setTimeout to allow the transition to complete
        setTimeout(() => {
          // Hide amount container and show dots container
          balanceVisible.style.display = "none";
          balanceHidden.style.display = "flex";

          // Force browser reflow to ensure transition works
          void balanceHidden.offsetWidth;

          // Fade in dots container
          balanceHidden.style.opacity = "1";
        }, 150);
      }
    });
  }

  // Tab switching
  if (tabItems.length) {
    tabItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Remove active class from all tabs
        tabItems.forEach((tab) => tab.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Move the tab indicator
        const tabIndex = Array.from(tabItems).indexOf(this);
        tabIndicator.style.left = tabIndex * 50 + "%";
      });
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      agentInput.value = "";
      agentInput.focus();
    });
  }

  // Show validation message function
  function showValidationMessage(element, message) {
    // Shake effect for validation error
    element.classList.add("shake-effect");
    setTimeout(() => {
      element.classList.remove("shake-effect");
    }, 600);

    // Get parent container
    const container = element.closest(".search-container");
    if (!container) return;

    // Remove any existing validation message
    const existingMsg = container.querySelector(".validation-message");
    if (existingMsg) {
      existingMsg.remove();
    }

    // Create and append validation message
    const validationMsg = document.createElement("div");
    validationMsg.className = "validation-message";
    validationMsg.textContent = message;
    validationMsg.style.color = "#e74c3c";
    validationMsg.style.fontSize = "12px";
    validationMsg.style.textAlign = "center";
    validationMsg.style.padding = "5px";

    container.appendChild(validationMsg);

    // Auto remove message after 3 seconds
    setTimeout(() => {
      validationMsg.style.opacity = "0";
      setTimeout(() => {
        validationMsg.remove();
      }, 300);
    }, 3000);
  }

  // Show max limit message
  function showMaxLimitMessage(element) {
    // Get parent container
    const container = element.closest(".amount-entry-card");
    if (!container) return;

    // Remove any existing max limit note
    const existingNote = container.querySelector(".max-limit-note");
    if (existingNote) {
      existingNote.remove();
    }

    // Create and append max limit note
    const maxNote = document.createElement("div");
    maxNote.className = "max-limit-note";
    maxNote.textContent = "সর্বোচ্চ ২৫,০০০ টাকা ক্যাশ আউট করা যাবে";
    maxNote.style.color = "#e74c3c";
    maxNote.style.fontSize = "12px";
    maxNote.style.textAlign = "center";
    maxNote.style.padding = "5px";
    maxNote.style.marginTop = "10px";

    container.appendChild(maxNote);

    // Auto remove after 3 seconds
    setTimeout(() => {
      maxNote.style.opacity = "0";
      setTimeout(() => {
        maxNote.remove();
      }, 300);
    }, 3000);
  }

  // Navigation between sections with smooth transition
  if (agentNextBtn) {
    agentNextBtn.addEventListener("click", function () {
      const inputValue = agentInput.value.trim();

      // Accept any input in the agent number field
      if (inputValue.length > 0) {
        // If no agent is selected but there's text in the input, create a selectedAgent object
        if (!selectedAgent) {
          selectedAgent = {
            name: "এজেন্ট", // Default name if not selected from list
            number: inputValue,
          };
        }

        // Update the recipient info in the next screen
        updateRecipientInfo();

        // Proceed to amount section
        proceedToAmountSection();
      } else {
        showValidationMessage(agentInput, "এজেন্টের নাম্বার দিন");
      }
    });
  }

  if (backToAgentBtn) {
    backToAgentBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show agent section with entrance animation
        agentSection.style.display = "block";
        agentSection.style.opacity = "0";
        agentSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          agentSection.style.opacity = "1";
          agentSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Navigation to PIN section
  if (cashoutBtn) {
    cashoutBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show PIN section with entrance animation
        pinSection.style.display = "block";
        pinSection.style.opacity = "0";
        pinSection.style.transform = "translateX(20px)";

        selectedAmount.textContent = "৳" + formatNumber(currentAmount);

        setTimeout(() => {
          pinSection.style.opacity = "1";
          pinSection.style.transform = "translateX(0)";
          // Focus first PIN digit
          if (pinDigits[0]) {
            pinDigits[0].focus();
          }
        }, 50);
      }, 200);
    });
  }

  if (backToAmountBtn) {
    backToAmountBtn.addEventListener("click", function () {
      // Add exit animation
      pinSection.style.opacity = "0";
      pinSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        pinSection.style.display = "none";

        // Show amount section with entrance animation
        amountInputSection.style.display = "block";
        amountInputSection.style.opacity = "0";
        amountInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          amountInputSection.style.opacity = "1";
          amountInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Agent items selection
  agentItems.forEach((agent) => {
    agent.addEventListener("click", function () {
      // Add selection animation
      this.classList.add("selected-agent");

      // Get agent info
      const name = this.querySelector(".agent-name").textContent;
      const number = this.querySelector(".agent-number").textContent;

      // Store selected agent
      selectedAgent = {
        name,
        number,
      };

      // Set agent input value
      agentInput.value = number;

      // Highlight selected agent
      agentItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-agent");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        if (agentNextBtn) {
          agentNextBtn.click();
        }
      }, 300);
    });
  });

  // Quick amount buttons
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

  // Process amount change
  function updateAmount(amount) {
    currentAmount = amount;

    // Remove active class from all quick amount buttons
    quickAmountBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to matching button
    quickAmountBtns.forEach((btn) => {
      const btnAmount = parseInt(btn.dataset.amount);
      if (btnAmount === currentAmount) {
        btn.classList.add("active");
      }
    });

    // Calculate charge
    let charge = 0;
    if (amount <= 1000) {
      charge = Math.ceil(amount * 0.0185);
    } else if (amount <= 5000) {
      charge = Math.ceil(amount * 0.015);
    } else {
      charge = Math.ceil(amount * 0.0125);
    }

    // Update fee display
    const feeAmount = document.querySelectorAll(".fee-amount");
    if (feeAmount.length >= 2) {
      feeAmount[0].textContent = "৳" + charge;
    }

    // Check if amount is greater than balance
    // const balance = 357.04; // From the UI balance display

    // if (amount + charge > balance) {
    //   // Show warning message
    //   warningSection.style.display = "flex";
    //   cashoutBtn.disabled = true;
    // } else {
    //   // Hide warning message
    //   warningSection.style.display = "none";

    //   // Enable/disable cashout button
    //   if (currentAmount >= 50) {
    //     cashoutBtn.disabled = false;
    //   } else {
    //     cashoutBtn.disabled = true;
    //   }
    // }

    if (warningSection) {
      warningSection.style.display = "none";
    }
    if (cashoutBtn) {
      cashoutBtn.disabled = !(currentAmount >= 50);
    }
  }

  // Amount input change
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
        showMaxLimitMessage(this);
      }

      updateAmount(value);
    });
  }

  // Handle PIN input
  pinDigits.forEach((digit, index) => {
    digit.addEventListener("input", function () {
      // Move to next input when character is entered
      if (this.value && index < pinDigits.length - 1) {
        pinDigits[index + 1].focus();
      }

      // Check if all digits are filled
      let allFilled = true;
      pinDigits.forEach((input) => {
        if (!input.value) allFilled = false;
      });

      // Enable confirm button when all digits are filled
      if (confirmPinBtn) {
        confirmPinBtn.disabled = !allFilled;
      }
    });

    // Navigate backward on backspace when empty
    digit.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        pinDigits[index - 1].focus();
      }
    });
  });

  // Handle confirm PIN button
  if (confirmPinBtn) {
    confirmPinBtn.addEventListener("click", function () {
      // Simulate PIN verification (correct PIN is 12345 for demo)
      let enteredPin = "";
      pinDigits.forEach((digit) => {
        enteredPin += digit.value;
      });

      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
      this.disabled = true;

      // Simulate processing
      setTimeout(() => {
        // Show success alert instead of modal
        // alert("ক্যাশ আউট সফল হয়েছে!");

        // Reset form and go back to first page
        resetForm();
      }, 1500);
    });
  }

  // Show success message
  function showSuccessMessage() {
    // Get agent info and amount for the success message
    const agentName = document.querySelector(".recipient-name").textContent;
    const agentNumber = document.querySelector(".recipient-number").textContent;
    const amount = document.getElementById("selected-amount").textContent;

    // Update success modal content
    if (successDetails) {
      successDetails.textContent = `${agentName} (${agentNumber}) থেকে ${amount} টাকা সফলভাবে ক্যাশ আউট করা হয়েছে`;
    }
    if (transactionId) {
      transactionId.textContent = `TXN${Math.floor(Math.random() * 10000000)}`;
    }
    if (transactionDate) {
      transactionDate.textContent = new Date().toLocaleString("bn-BD");
    }

    // Show the success modal
    if (successModal) {
      successModal.style.display = "flex";
    }
  }

  // Add done button event handler
  if (doneBtn) {
    doneBtn.addEventListener("click", function () {
      // Hide success modal
      if (successModal) {
        successModal.style.display = "none";
      }

      // Reset form
      resetForm();
    });
  }

  // Reset form
  function resetForm() {
    // Reset values
    if (agentInput) agentInput.value = "";
    if (amountInput) amountInput.value = "";
    selectedAgent = null;
    currentAmount = 0;

    // Reset sections
    if (pinSection) {
      pinSection.style.display = "none";
    }
    if (amountInputSection) {
      amountInputSection.style.display = "none";
    }
    if (agentSection) {
      agentSection.style.display = "block";
      agentSection.style.opacity = "1";
      agentSection.style.transform = "translateX(0)";
    }

    // Reset buttons
    if (cashoutBtn) {
      cashoutBtn.disabled = true;
      cashoutBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> ক্যাশ আউট করুন';
    }
    if (confirmPinBtn) {
      confirmPinBtn.disabled = true;
      confirmPinBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
    }

    // Clear PIN inputs
    pinDigits.forEach((digit) => {
      digit.value = "";
    });

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    agentItems.forEach((item) => item.classList.remove("selected-agent"));

    // Hide warning section
    if (warningSection) {
      warningSection.style.display = "none";
    }
  }
});

//backend :

let nischitKorun = document.getElementById("confirm-pin-btn");
let pins = document.querySelectorAll(".pin-digit");
let amount = document.getElementById("amount");
let mobile = document.getElementById("agent-number");

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

    // Show loading state
    this.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
    this.disabled = true;

    // Use relative URL instead of hardcoded localhost
    fetch("http://localhost:3000/cashout", {
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
        const data = await r1.json();

        if (r1.ok) {
          // Success: Show message and reset to first page
          alert(data.message);

          // Reset form and go back to first page
          resetFormToStart();
        } else {
          // Error: Show message and reset button
          alert(data.message);

          // Reset button state
          nischitKorun.innerHTML =
            '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
          nischitKorun.disabled = false;
        }
      })
      .catch(function (err) {
        console.error("Network error:", err);
        alert("Network error occurred. Please try again.");

        // Reset button state
        nischitKorun.innerHTML =
          '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
        nischitKorun.disabled = false;
      });
  });
}

// Function to reset form and go back to first page
function resetFormToStart() {
  // Reset values
  if (document.getElementById("agent-number"))
    document.getElementById("agent-number").value = "";
  if (document.getElementById("amount"))
    document.getElementById("amount").value = "";

  // Clear PIN inputs
  document.querySelectorAll(".pin-digit").forEach((digit) => {
    digit.value = "";
  });

  // Reset sections
  const pinSection = document.getElementById("pinSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const agentSection = document.getElementById("agentSection");

  if (pinSection) {
    pinSection.style.display = "none";
  }
  if (amountInputSection) {
    amountInputSection.style.display = "none";
  }
  if (agentSection) {
    agentSection.style.display = "block";
    agentSection.style.opacity = "1";
    agentSection.style.transform = "translateX(0)";
  }

  // Reset buttons
  const cashoutBtn = document.getElementById("cashout-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");

  if (cashoutBtn) {
    cashoutBtn.disabled = true;
    cashoutBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ক্যাশ আউট করুন';
  }
  if (confirmPinBtn) {
    confirmPinBtn.disabled = true;
    confirmPinBtn.innerHTML = '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
  }

  // Reset active states
  document
    .querySelectorAll(".quick-amount-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".agent-item")
    .forEach((item) => item.classList.remove("selected-agent"));

  // Hide warning section
  const warningSection = document.querySelector(".warning-section");
  if (warningSection) {
    warningSection.style.display = "none";
  }
}
