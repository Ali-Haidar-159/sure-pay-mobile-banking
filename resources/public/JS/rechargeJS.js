document.addEventListener("DOMContentLoaded", function () {
  // Update all form headers to use bKash logo instead of balance display
  updateFormHeaders();

  // Elements
  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  const numberNextBtn = document.getElementById("numberNextBtn");
  const backToNumberBtn = document.getElementById("backToNumberBtn");
  const backToAmountBtn = document.getElementById("backToAmountBtn");
  const clearSearchBtn = document.getElementById("clearSearch");

  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const operatorItems = document.querySelectorAll(".operator-item");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const amountTabBtns = document.querySelectorAll("[data-amount-tab]");
  const packageItems = document.querySelectorAll(".package-item");

  const rechargeBtn = document.getElementById("recharge-btn");
  const packageBtn = document.getElementById("package-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const selectedAmount = document.getElementById("selected-amount");

  // Form elements
  const phoneNumberForm = document.getElementById("phoneNumberForm");
  const amountForm = document.getElementById("amountForm");
  const pinForm = document.getElementById("pinForm");

  // Bootstrap modal
  const successModalElement = document.getElementById("successModal");
  const successModal = successModalElement
    ? new bootstrap.Modal(successModalElement)
    : null;

  // Variables
  let selectedContact = null;
  let selectedOperator = "gp";
  let currentAmount = 0;
  let selectedPackage = null;

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
      phoneInput.value = "";
      phoneInput.focus();
      // Reset selected contact when clearing
      selectedContact = null;
      contactItems.forEach((item) => {
        item.classList.remove("selected-contact");
      });
    });
  }

  // Tab switching
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabGroup = this.parentElement.querySelectorAll(".tab-btn");
        tabGroup.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");

        const tabId = this.dataset.tab;
        if (tabId) {
          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => {
            content.classList.remove("active");
          });
          const activeContent = document.getElementById(tabId + "Contacts");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
      });
    });
  }

  // Amount Tab switching
  if (amountTabBtns.length) {
    amountTabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabGroup = this.parentElement.querySelectorAll(".tab-btn");
        tabGroup.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");

        const tabId = this.dataset.amountTab;
        if (tabId) {
          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => {
            content.classList.remove("active");
          });
          const activeContent = document.getElementById(tabId + "TabContent");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
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

  // Handle form submission with Enter key
  if (phoneNumberForm) {
    phoneNumberForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Form submitted"); // Debug log
      proceedToNextSection();
    });

    // Enable Enter key submission for phone number input
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
        proceedToNextSection();
      }
    });
  }

  if (amountForm) {
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!rechargeBtn.disabled) {
        rechargeBtn.click();
      }
    });

    // Enable Enter key submission for amount input
    if (amountInput) {
      amountInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (!rechargeBtn.disabled) {
            rechargeBtn.click();
          }
        }
      });
    }
  }

  if (pinForm) {
    pinForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!confirmPinBtn.disabled) {
        confirmPinBtn.click();
      }
    });
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
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

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

  // Navigation to PIN section
  if (rechargeBtn) {
    rechargeBtn.addEventListener("click", function () {
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

  if (packageBtn) {
    packageBtn.addEventListener("click", function () {
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(-20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        pinSection.style.display = "block";
        pinSection.style.opacity = "0";
        pinSection.style.transform = "translateX(20px)";

        if (selectedAmount) {
          selectedAmount.textContent = "৳" + formatNumber(selectedPackage);
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

  // Operator selection
  operatorItems.forEach((item) => {
    item.addEventListener("click", function () {
      operatorItems.forEach((op) => op.classList.remove("active"));
      this.classList.add("active");

      const operatorImg = this.querySelector(".operator-icon img");
      const operatorSrc = operatorImg.getAttribute("alt").toLowerCase();

      if (operatorSrc.includes("গ্রামীণফোন")) {
        selectedOperator = "gp";
      } else if (operatorSrc.includes("রবি")) {
        selectedOperator = "robi";
      } else if (operatorSrc.includes("বাংলালিংক")) {
        selectedOperator = "bl";
      } else if (operatorSrc.includes("এয়ারটেল")) {
        selectedOperator = "airtel";
      } else if (operatorSrc.includes("টেলিটক")) {
        selectedOperator = "tt";
      }
    });
  });

  // Package selection
  packageItems.forEach((item) => {
    item.addEventListener("click", function () {
      packageItems.forEach((pack) => pack.classList.remove("active"));
      this.classList.add("active");

      selectedPackage = parseInt(this.dataset.packagePrice);
      if (packageBtn) packageBtn.disabled = false;
    });
  });

  // Quick amount buttons
  quickAmountBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const amount = parseInt(this.dataset.amount);

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

  // Process amount change
  function updateAmount(amount) {
    currentAmount = amount;

    quickAmountBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    quickAmountBtns.forEach((btn) => {
      const btnAmount = parseInt(btn.dataset.amount);
      if (btnAmount === currentAmount) {
        btn.classList.add("active");
      }
    });

    if (rechargeBtn) {
      if (currentAmount >= 10) {
        rechargeBtn.disabled = false;
      } else {
        rechargeBtn.disabled = true;
      }
    }
  }

  // Amount input change
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      if (value > 1000) {
        value = 1000;
        this.value = value;

        const amountCard = document.querySelector(".amount-entry-card");
        if (amountCard) {
          const maxNote = document.createElement("div");
          maxNote.className = "max-limit-note";
          maxNote.textContent = "সর্বোচ্চ ১,০০০ টাকা রিচার্জ করা যাবে";
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
          alert("রিচার্জ সফল হয়েছে!");
          resetFormAndGoToFirstPage();
        }
      }, 1500);
    });
  }

  // Show success message using Bootstrap modal
  function showSuccessMessage() {
    const recipientElement = document.querySelector(".recipient-number");
    const recipient = recipientElement
      ? recipientElement.textContent
      : phoneInput.value;
    const amount = document.getElementById("selected-amount").textContent;
    const transactionId = "TXN" + Math.floor(Math.random() * 10000000);
    const currentDateTime = new Date().toLocaleString("bn-BD");

    // Update modal content
    const successRecipient = document.getElementById("success-recipient");
    const successAmount = document.getElementById("success-amount");
    const transactionIdElement = document.getElementById("transaction-id");
    const transactionDatetime = document.getElementById("transaction-datetime");
    const transactionTotal = document.getElementById("transaction-total");

    if (successRecipient) successRecipient.textContent = recipient;
    if (successAmount) successAmount.textContent = amount;
    if (transactionIdElement) transactionIdElement.textContent = transactionId;
    if (transactionDatetime) transactionDatetime.textContent = currentDateTime;
    if (transactionTotal) transactionTotal.textContent = amount;

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
    if (phoneInput) phoneInput.value = "";
    if (amountInput) amountInput.value = "";

    // Clear PIN digits
    pinDigits.forEach((digit) => {
      digit.value = "";
    });

    // Reset variables
    selectedContact = null;
    currentAmount = 0;
    selectedPackage = null;

    // Reset buttons
    if (rechargeBtn) {
      rechargeBtn.disabled = true;
      rechargeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> রিচার্জ করুন';
    }

    if (packageBtn) {
      packageBtn.disabled = true;
    }

    if (confirmPinBtn) {
      confirmPinBtn.disabled = true;
      confirmPinBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
    }

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));
    packageItems.forEach((item) => item.classList.remove("active"));

    // Go back to first page with animation
    if (pinSection && numberInputSection) {
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
    fetch("http://localhost:3000/recharge", {
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
  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const packageItems = document.querySelectorAll(".package-item");
  const rechargeBtn = document.getElementById("recharge-btn");
  const packageBtn = document.getElementById("package-btn");
  const confirmPinBtn = document.getElementById("confirm-pin-btn");

  if (phoneInput) phoneInput.value = "";
  if (amountInput) amountInput.value = "";

  // Clear PIN digits
  pinDigits.forEach((digit) => {
    digit.value = "";
  });

  // Reset buttons
  if (rechargeBtn) {
    rechargeBtn.disabled = true;
    rechargeBtn.innerHTML = '<i class="fas fa-paper-plane"></i> রিচার্জ করুন';
  }

  if (packageBtn) {
    packageBtn.disabled = true;
  }

  if (confirmPinBtn) {
    confirmPinBtn.disabled = true;
    confirmPinBtn.innerHTML = '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
  }

  // Reset active states
  quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
  contactItems.forEach((item) => item.classList.remove("selected-contact"));
  packageItems.forEach((item) => item.classList.remove("active"));

  // Go back to first page with animation
  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const pinSection = document.getElementById("pinSection");

  if (pinSection && numberInputSection) {
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
