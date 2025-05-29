document.addEventListener("DOMContentLoaded", function () {
  // Update all form headers to use bKash logo instead of balance display
  updateFormHeaders();

  // Elements
  const merchantInputSection = document.getElementById("merchantInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  const merchantNextBtn = document.getElementById("merchantNextBtn");
  const backToMerchantBtn = document.getElementById("backToMerchantBtn");
  const backToAmountBtn = document.getElementById("backToAmountBtn");
  const clearSearchBtn = document.getElementById("clearSearch");

  const merchantInput = document.getElementById("merchant-number");
  const amountInput = document.getElementById("amount");
  const referenceInput = document.getElementById("reference");
  const merchantItems = document.querySelectorAll(".merchant-item");

  const paymentBtn = document.getElementById("payment-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const selectedAmount = document.getElementById("selected-amount");

  // Form elements
  const merchantNumberForm = document.getElementById("merchantNumberForm");
  const amountForm = document.getElementById("amountForm");
  const pinForm = document.getElementById("pinForm");

  // Bootstrap modal
  const successModalElement = document.getElementById("successModal");
  const successModal = successModalElement
    ? new bootstrap.Modal(successModalElement)
    : null;

  // Variables
  let selectedMerchant = null;
  let currentAmount = 0;
  let currentReference = "";

  // Function to update all form headers to use bKash logo
  function updateFormHeaders() {
    const formHeaders = document.querySelectorAll(".form-header-gradient");

    formHeaders.forEach((header) => {
      const headerContent = header.querySelector(".header-content");

      if (headerContent && headerContent.querySelector(".header-logo")) {
        return;
      }

      const balanceContainer =
        headerContent?.querySelector(".balance-container");
      if (balanceContainer) {
        balanceContainer.remove();
      }

      const balanceHidden = headerContent?.querySelector("#balanceHidden");
      const balanceVisible = headerContent?.querySelector("#balanceVisible");
      if (balanceHidden) balanceHidden.remove();
      if (balanceVisible) balanceVisible.remove();

      const logoContainer = document.createElement("div");
      logoContainer.className = "header-logo";
      logoContainer.innerHTML =
        '<img src="images/bkashlogo.png" alt="বিকাশ লোগো" class="form-header-logo">';

      if (headerContent) {
        headerContent.appendChild(logoContainer);
      }
    });
  }

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      merchantInput.value = "";
      merchantInput.focus();
      // Reset selected merchant when clearing
      selectedMerchant = null;
      merchantItems.forEach((item) => {
        item.classList.remove("selected-merchant");
      });
    });
  }

  // Function to proceed to next section
  function proceedToNextSection() {
    console.log("Proceeding to next section..."); // Debug log

    // Validate merchant number or selected merchant
    if (merchantInput.value.length >= 11 || selectedMerchant) {
      console.log("Validation passed"); // Debug log

      let merchantNumber = selectedMerchant
        ? selectedMerchant.number
        : merchantInput.value;
      let merchantName = selectedMerchant ? selectedMerchant.name : "মার্চেন্ট";

      // Update merchant info in amount section
      const selectedMerchantName = document.getElementById(
        "selectedMerchantName"
      );
      const selectedMerchantNumber = document.getElementById(
        "selectedMerchantNumber"
      );
      const confirmMerchantName = document.getElementById(
        "confirmMerchantName"
      );
      const confirmMerchantNumber = document.getElementById(
        "confirmMerchantNumber"
      );

      if (selectedMerchantName) selectedMerchantName.textContent = merchantName;
      if (selectedMerchantNumber)
        selectedMerchantNumber.textContent = merchantNumber;
      if (confirmMerchantName) confirmMerchantName.textContent = merchantName;
      if (confirmMerchantNumber)
        confirmMerchantNumber.textContent = merchantNumber;

      // Add exit animation to current section
      merchantInputSection.style.opacity = "0";
      merchantInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        merchantInputSection.style.display = "none";

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
    } else {
      console.log("Validation failed"); // Debug log

      // Shake effect for validation error
      merchantInput.classList.add("shake-effect");
      setTimeout(() => {
        merchantInput.classList.remove("shake-effect");
      }, 600);

      // Show validation message
      const searchContainer = document.querySelector(".search-container");
      if (searchContainer) {
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-message";
        validationMsg.textContent = "সঠিক মার্চেন্ট নম্বর দিন";
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

  // Handle form submission with Enter key
  if (merchantNumberForm) {
    merchantNumberForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Form submitted"); // Debug log
      proceedToNextSection();
    });

    // Enable Enter key submission for merchant number input
    if (merchantInput) {
      merchantInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          console.log("Enter key pressed"); // Debug log
          // Reset selected merchant when entering new number manually
          selectedMerchant = null;
          // Remove selected class from all merchants
          merchantItems.forEach((item) => {
            item.classList.remove("selected-merchant");
          });
          proceedToNextSection();
        }
      });
    }
  }

  if (amountForm) {
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (paymentBtn && !paymentBtn.disabled) {
        paymentBtn.click();
      }
    });

    // Enable Enter key submission for amount input
    if (amountInput) {
      amountInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (paymentBtn && !paymentBtn.disabled) {
            paymentBtn.click();
          }
        }
      });
    }
  }

  if (pinForm) {
    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (confirmPinBtn && !confirmPinBtn.disabled) {
        confirmPinBtn.click();
      }
    });
  }

  // Navigation between sections with smooth transition
  if (merchantNextBtn) {
    merchantNextBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent any default behavior
      console.log("Next button clicked"); // Debug log
      proceedToNextSection();
    });
  }

  if (backToMerchantBtn) {
    backToMerchantBtn.addEventListener("click", function () {
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        merchantInputSection.style.display = "block";
        merchantInputSection.style.opacity = "0";
        merchantInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          merchantInputSection.style.opacity = "1";
          merchantInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Navigation to PIN section
  if (paymentBtn) {
    paymentBtn.addEventListener("click", function () {
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        pinSection.style.display = "block";
        pinSection.style.opacity = "0";
        pinSection.style.transform = "translateX(20px)";

        if (selectedAmount) {
          selectedAmount.textContent = "৳" + formatNumber(currentAmount);
        }

        setTimeout(() => {
          pinSection.style.opacity = "1";
          pinSection.style.transform = "translateX(0)";
          if (pinDigits[0]) pinDigits[0].focus();
        }, 50);
      }, 200);
    });
  }

  if (backToAmountBtn) {
    backToAmountBtn.addEventListener("click", function () {
      pinSection.style.opacity = "0";
      pinSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        pinSection.style.display = "none";

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

  // Merchant selection
  merchantItems.forEach((merchant) => {
    merchant.addEventListener("click", function () {
      console.log("Merchant selected"); // Debug log

      // Add selection animation
      this.classList.add("selected-merchant");

      // Get merchant info
      const name = this.dataset.merchantName;
      const number = this.dataset.merchantNumber;

      // Store selected merchant
      selectedMerchant = {
        name,
        number,
      };

      // Set merchant input value
      merchantInput.value = number;

      // Highlight selected merchant
      merchantItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-merchant");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        proceedToNextSection();
      }, 500);
    });
  });

  // Process amount change
  function updateAmount(amount) {
    currentAmount = amount;

    if (paymentBtn) {
      if (currentAmount >= 1 && currentAmount <= 50000) {
        paymentBtn.disabled = false;
      } else {
        paymentBtn.disabled = true;
      }
    }
  }

  // Amount input change
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      if (value > 50000) {
        value = 50000;
        this.value = value;

        const amountCard = document.querySelector(".amount-entry-card");
        if (amountCard) {
          const maxNote = document.createElement("div");
          maxNote.className = "max-limit-note";
          maxNote.textContent = "সর্বোচ্চ ৫০,০০০ টাকা পেমেন্ট করা যাবে";
          maxNote.style.color = "#e74c3c";
          maxNote.style.fontSize = "12px";
          maxNote.style.textAlign = "center";
          maxNote.style.padding = "5px";
          maxNote.style.marginTop = "10px";

          const existingNote = amountCard.querySelector(".max-limit-note");
          if (existingNote) {
            existingNote.remove();
          }

          amountCard.appendChild(maxNote);

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
  }

  // Reference input change
  if (referenceInput) {
    referenceInput.addEventListener("input", function () {
      currentReference = this.value;
    });
  }

  // Handle PIN input
  pinDigits.forEach((digit, index) => {
    digit.addEventListener("input", function () {
      if (this.value && index < pinDigits.length - 1) {
        pinDigits[index + 1].focus();
      }

      let allFilled = true;
      pinDigits.forEach((input) => {
        if (!input.value) allFilled = false;
      });

      if (confirmPinBtn) confirmPinBtn.disabled = !allFilled;
    });

    digit.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !this.value && index > 0) {
        pinDigits[index - 1].focus();
      }
    });

    // Enable Enter key submission for PIN inputs
    digit.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (confirmPinBtn && !confirmPinBtn.disabled) {
          confirmPinBtn.click();
        }
      }
    });
  });

  // Handle confirm PIN button (original functionality)
  if (confirmPinBtn) {
    confirmPinBtn.addEventListener("click", function () {
      let enteredPin = "";
      pinDigits.forEach((digit) => {
        enteredPin += digit.value;
      });

      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
      this.disabled = true;

      setTimeout(() => {
        // Show success message if modal exists, otherwise just alert
        if (successModal) {
          showSuccessMessage();
        } else {
          alert("পেমেন্ট সফল হয়েছে!");
          resetFormAndGoToFirstPage();
        }
      }, 1500);
    });
  }

  // Show success message using Bootstrap modal
  function showSuccessMessage() {
    const merchantNameElement = document.getElementById("confirmMerchantName");
    const merchant = merchantNameElement
      ? merchantNameElement.textContent
      : "মার্চেন্ট";
    const amount = document.getElementById("selected-amount").textContent;
    const transactionId = "TXN" + Math.floor(Math.random() * 10000000);
    const currentDateTime = new Date().toLocaleString("bn-BD");

    // Update modal content
    const successMerchant = document.getElementById("success-merchant");
    const successAmount = document.getElementById("success-amount");
    const transactionIdElement = document.getElementById("transaction-id");
    const transactionDatetime = document.getElementById("transaction-datetime");
    const transactionTotal = document.getElementById("transaction-total");

    if (successMerchant) successMerchant.textContent = merchant;
    if (successAmount) successAmount.textContent = amount;
    if (transactionIdElement) transactionIdElement.textContent = transactionId;
    if (transactionDatetime) transactionDatetime.textContent = currentDateTime;
    if (transactionTotal) transactionTotal.textContent = amount;

    // Handle reference display
    const referenceRow = document.getElementById("reference-row");
    const transactionReference = document.getElementById(
      "transaction-reference"
    );

    if (referenceRow && transactionReference) {
      if (currentReference) {
        referenceRow.style.display = "flex";
        transactionReference.textContent = currentReference;
      } else {
        referenceRow.style.display = "none";
      }
    }

    // Show the modal
    successModal.show();

    // Reset form when modal is closed
    const modalElement = document.getElementById("successModal");
    if (modalElement) {
      modalElement.addEventListener("hidden.bs.modal", function () {
        resetFormAndGoToFirstPage();
      });
    }
  }

  // Reset form and go back to first page
  function resetFormAndGoToFirstPage() {
    // Clear all inputs
    if (merchantInput) merchantInput.value = "";
    if (amountInput) amountInput.value = "";
    if (referenceInput) referenceInput.value = "";

    // Clear PIN digits
    pinDigits.forEach((digit) => {
      digit.value = "";
    });

    // Reset variables
    selectedMerchant = null;
    currentAmount = 0;
    currentReference = "";

    // Reset buttons
    if (paymentBtn) {
      paymentBtn.disabled = true;
      paymentBtn.innerHTML = '<i class="fas fa-paper-plane"></i> পেমেন্ট করুন';
    }

    if (confirmPinBtn) {
      confirmPinBtn.disabled = true;
      confirmPinBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
    }

    // Reset active states
    merchantItems.forEach((item) => item.classList.remove("selected-merchant"));

    // Go back to first page with animation
    if (pinSection && merchantInputSection) {
      // Hide current sections
      pinSection.style.opacity = "0";
      pinSection.style.transform = "translateX(20px)";

      if (amountInputSection && amountInputSection.style.display === "block") {
        amountInputSection.style.opacity = "0";
        amountInputSection.style.transform = "translateX(20px)";
      }

      setTimeout(() => {
        pinSection.style.display = "none";
        if (amountInputSection) amountInputSection.style.display = "none";

        // Show merchant section with entrance animation
        merchantInputSection.style.display = "block";
        merchantInputSection.style.opacity = "0";
        merchantInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          merchantInputSection.style.opacity = "1";
          merchantInputSection.style.transform = "translateX(0)";

          // Focus on merchant input
          if (merchantInput) {
            merchantInput.focus();
          }
        }, 50);
      }, 200);
    }
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
let nischitKorun = document.getElementById("confirm-pin-btn");
let pins = document.querySelectorAll(".pin-digit");
let amount = document.getElementById("amount");
let mobile = document.getElementById("merchant-number");

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
    fetch("http://localhost:3000/payment", {
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
          // console.log("Success:", data.message);
          alert(data.message);

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

// Function to reset form and go back to first page (for backend use)
function resetFormAndGoToFirstPage() {
  // Clear all inputs
  const merchantInput = document.getElementById("merchant-number");
  const amountInput = document.getElementById("amount");
  const referenceInput = document.getElementById("reference");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const merchantItems = document.querySelectorAll(".merchant-item");
  const paymentBtn = document.getElementById("payment-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");

  if (merchantInput) merchantInput.value = "";
  if (amountInput) amountInput.value = "";
  if (referenceInput) referenceInput.value = "";

  // Clear PIN digits
  pinDigits.forEach((digit) => {
    digit.value = "";
  });

  // Reset buttons
  if (paymentBtn) {
    paymentBtn.disabled = true;
    paymentBtn.innerHTML = '<i class="fas fa-paper-plane"></i> পেমেন্ট করুন';
  }

  if (confirmPinBtn) {
    confirmPinBtn.disabled = true;
    confirmPinBtn.innerHTML = '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
  }

  // Reset active states
  merchantItems.forEach((item) => item.classList.remove("selected-merchant"));

  // Go back to first page with animation
  const merchantInputSection = document.getElementById("merchantInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  if (pinSection && merchantInputSection) {
    // Hide current sections
    pinSection.style.opacity = "0";
    pinSection.style.transform = "translateX(20px)";

    if (amountInputSection && amountInputSection.style.display === "block") {
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";
    }

    setTimeout(() => {
      pinSection.style.display = "none";
      if (amountInputSection) amountInputSection.style.display = "none";

      // Show merchant section with entrance animation
      merchantInputSection.style.display = "block";
      merchantInputSection.style.opacity = "0";
      merchantInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        merchantInputSection.style.opacity = "1";
        merchantInputSection.style.transform = "translateX(0)";

        // Focus on merchant input
        if (merchantInput) {
          merchantInput.focus();
        }
      }, 50);
    }, 200);
  }
}
