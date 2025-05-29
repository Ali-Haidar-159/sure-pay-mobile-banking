// addMoneyJS.js - Bank to bKash Implementation
document.addEventListener("DOMContentLoaded", function () {

  let allDetails = new Object () ;

  // Main sections
  const sourceSelectionSection = document.getElementById(
    "sourceSelectionSection"
  );
  const bankToBkashSection = document.getElementById("bankToBkashSection");
  const bankListSection = document.getElementById("bankListSection");
  const bankAccountSection = document.getElementById("bankAccountSection");
  const cardToBkashSection = document.getElementById("cardToBkashSection");
  const cardTypeSection = document.getElementById("cardTypeSection");

  // Bank to bKash specific elements
  const bankToBkashOption = document.getElementById("bankToBkashOption");
  const bankAccountOption = document.getElementById("bankAccountOption");
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  // State
  let currentSelectedBank = null;
  let navigationHistory = ["sourceSelectionSection"];
  let showingAllBanks = false;

  // Bank data - Only 3 banks
  const banks = [
    {
      id: 1,
      name: "Agrani Bank",
      logo: "/public/images/addmoney/add3.jpg",
      hasBadge: true,
    },
    {
      id: 2,
      name: "AB Bank Limited",
      logo: "/public/images/addmoney/add4.jpg",
      hasBadge: true,
    },
    {
      id: 3,
      name: "Bangladesh Development Bank Limited",
      logo: "/public/images/addmoney/add5.jpg",
      hasBadge: true,
    },
  ];

  // Function to show a specific section
  function showSection(section) {
    // Hide all sections first
    const allSections = [
      sourceSelectionSection,
      bankToBkashSection,
      bankListSection,
      bankAccountSection,
      cardToBkashSection,
      cardTypeSection,
    ];

    allSections.forEach((s) => {
      if (s) s.style.display = "none";
    });

    // Show the requested section with animation
    if (section) {
      section.style.display = "block";
      section.classList.add("fade-in");

      // Remove animation class after it completes
      setTimeout(() => {
        section.classList.remove("fade-in");
      }, 300);

      // Add to navigation history
      const sectionId = section.id;
      if (navigationHistory[navigationHistory.length - 1] !== sectionId) {
        navigationHistory.push(sectionId);
      }
    }
  }

  // Add back button functionality if needed
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
      showSection(targetSection);
    });
  }

  // Bank to bKash flow initialization
  if (bankToBkashOption) {
    bankToBkashOption.addEventListener("click", function () {
      showSection(bankToBkashSection);
    });
  }

  // Bank Account option
  if (bankAccountOption) {
    bankAccountOption.addEventListener("click", function () {
      showSection(bankListSection);

      // Add back button to bank list section
      if (bankListSection) {
        addBackButton(bankListSection, bankToBkashSection);
      }

      // Initialize bank list with limited banks
      initializeBankList(false);
    });
  }

  // Create the bottom sheet for bank selection
  function createBottomSheet(bank) {
    // Get the bottom sheet
    const bottomSheet = document.getElementById("addBankSheet");

    if (!bottomSheet) return;

    // Update the content if needed
    const bankName = bottomSheet.querySelector(".info-text strong:first-child");
    if (bankName) {
      bankName.textContent = bank.name;
    }

    // Set current selected bank
    currentSelectedBank = bank;
    allDetails.bank = currentSelectedBank.name ;

    // Show the bottom sheet
    bottomSheet.classList.add("show");

    // Event listeners
    const cancelBtn = document.getElementById("cancelAddBank");
    const confirmBtn = document.getElementById("confirmAddBank");

    const closeSheet = () => {
      bottomSheet.classList.remove("show");
    };

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeSheet);
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        closeSheet();
        showBankAccountForm(bank);
      });
    }
  }

  // Show bank account form with all required fields
  function showBankAccountForm(bank) {
    // Get the template content
    const template = document.getElementById("bankFormTemplate");
    if (!template) return;

    // Clone the template content
    const formContent = template.content.cloneNode(true);

    // Update bank info
    const bankLogo = formContent.querySelector(".selected-bank-logo img");
    const bankName = formContent.querySelector(".selected-bank-name");

    if (bankLogo) bankLogo.src = bank.logo;
    if (bankLogo) bankLogo.alt = bank.name;
    if (bankName) bankName.textContent = bank.name;

    // Clear the bank account section and append the new content
    bankAccountSection.innerHTML = "";
    bankAccountSection.appendChild(formContent);

    // Show the section
    showSection(bankAccountSection);

    // Add back button
    addBackButton(bankAccountSection, bankListSection);

    // Setup form validation and steps
    setupFormValidation();
    setupFormSteps();
  }

  // Form validation
  function setupFormValidation() {
    const accountNumber = document.getElementById("accountNumber");
    const mobileNumber = document.getElementById("mobileNumber");
    const amount = document.getElementById("amount");
    const termsCheck = document.getElementById("termsCheck");
    const proceedBtn = document.getElementById("proceedBtn");

    if (
      !accountNumber ||
      !mobileNumber ||
      !amount ||
      !termsCheck ||
      !proceedBtn
    )
      return;

    // Account number formatting
    accountNumber.addEventListener("input", function (e) {
      this.value = this.value.replace(/\D/g, "");
      if (this.value.length >= 13) {
        this.value = this.value.slice(0, 13);
      }
      if (this.value.length > 4) {
        this.value = this.value.match(/.{1,4}/g).join(" ");
      }
      validateForm();
    });

    // Mobile number validation
    mobileNumber.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }
      validateForm();
    });

    // Amount validation
    amount.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9.]/g, "");
      validateForm();
    });

    // Terms checkbox
    termsCheck.addEventListener("change", validateForm);

    function validateForm() {
      const isAccountValid =
        accountNumber.value.replace(/\s/g, "").length === 13;
      const isMobileValid =
        mobileNumber.value.length === 11 && mobileNumber.value.startsWith("01");
      const amountValue = parseFloat(amount.value);
      const isAmountValid = amountValue >= 50 && amountValue <= 20000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(
        isAccountValid &&
        isMobileValid &&
        isAmountValid &&
        isTermsChecked
      );

      // Show error messages
      document.getElementById("accountError").textContent = isAccountValid
        ? ""
        : "Please enter a valid 16-digit account number";
      document.getElementById("mobileError").textContent = isMobileValid
        ? ""
        : "Please enter a valid 11-digit bKash number starting with 01";
      document.getElementById("amountError").textContent = isAmountValid
        ? ""
        : "Please enter amount between ৳50 and ৳20,000";
    }
  }

  // Form steps handling
  function setupFormSteps() {
    const bankAccountForm = document.querySelector(".bank-form");
    if (!bankAccountForm) return;

    bankAccountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showStep(2);
      setupOTPVerification();
    });
  }

  // OTP Verification
  function setupOTPVerification() {
    const otpInputs = document.querySelectorAll(".otp-input");
    const verifyOTPBtn = document.getElementById("verifyOTPBtn");
    const resendOTP = document.getElementById("resendOTP");
    const mobileNumber = document.getElementById("mobileNumber").value;

    if (!otpInputs.length || !verifyOTPBtn || !resendOTP) return;

    // Update the OTP message
    const otpMessage = document.querySelector(".otp-verification p");
    if (otpMessage) {
      otpMessage.textContent = `Enter the 6-digit OTP sent to ${mobileNumber}`;
    }

    // OTP input handling
    otpInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
        checkOTPComplete();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          otpInputs[index - 1].focus();
        }
      });
    });

    function checkOTPComplete() {
      const otpComplete = Array.from(otpInputs).every(
        (input) => input.value.length === 1
      );
      verifyOTPBtn.disabled = !otpComplete;
    }

    verifyOTPBtn.addEventListener("click", function () {
      showStep(3);
      setupPINVerification();
    });

    resendOTP.addEventListener("click", function () {
      this.disabled = true;
      this.textContent = "Resending...";
      setTimeout(() => {
        this.disabled = false;
        this.textContent = "Resend";
        showNotification(`OTP sent successfully to ${mobileNumber}!`);
      }, 2000);
    });
  }

  // PIN Verification
  function setupPINVerification() {
    const pinInputs = document.querySelectorAll(".pin-input");
    const confirmPINBtn = document.getElementById("confirmPINBtn");

    if (!pinInputs.length || !confirmPINBtn) return;

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }
        checkPINComplete();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    function checkPINComplete() {
      const pinComplete = Array.from(pinInputs).every(
        (input) => input.value.length === 1
      );
      confirmPINBtn.disabled = !pinComplete;
    }

    confirmPINBtn.addEventListener("click", function () {
      
      allDetails.amount = document.getElementById("amount").value;
      allDetails.mobile = document.getElementById("mobileNumber").value;
      allDetails.account = document.getElementById("accountNumber").value ;

      forBackend() ;

      processTransaction();

    });
  }

  // Process Transaction
  function processTransaction() {
    // Show loading
    showLoading("Processing transaction...");

    setTimeout(() => {
      hideLoading();
      showStep(4);
      showTransactionSuccess();
    }, 2000);
  }

  // Show Transaction Success
  function showTransactionSuccess() {
    const amount = document.getElementById("amount").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const transactionId = generateTransactionId();
    const currentTime = new Date().toLocaleString();

    document.getElementById("transactionAmount").textContent = amount;
    document.getElementById("transactionId").textContent = transactionId;
    document.getElementById("fromBank").textContent = currentSelectedBank.name;
    document.getElementById("toBkash").textContent = mobileNumber;
    document.getElementById("transactionTime").textContent = currentTime;

    // Add event listeners for success actions
    document
      .getElementById("downloadReceipt")
      .addEventListener("click", downloadReceipt);
    document
      .getElementById("addMoreMoney")
      .addEventListener("click", function () {
        showSection(sourceSelectionSection);
      });
  }

  // Download Receipt
  function downloadReceipt() {
    // Create receipt content
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${document.getElementById("transactionId").textContent}
      Amount: ৳${document.getElementById("transactionAmount").textContent}
      From: ${document.getElementById("fromBank").textContent}
      To: ${document.getElementById("toBkash").textContent}
      Time: ${document.getElementById("transactionTime").textContent}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${
      document.getElementById("transactionId").textContent
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Show specific step
  function showStep(stepNumber) {
    const steps = document.querySelectorAll(".form-step");
    steps.forEach((step) => {
      step.style.display =
        step.dataset.step === stepNumber.toString() ? "block" : "none";
    });
  }

  // Generate Transaction ID
  function generateTransactionId() {
    return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Show Loading
  function showLoading(message) {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-overlay";
    loadingDiv.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>${message}</p>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    setTimeout(() => {
      loadingDiv.classList.add("show");
    }, 10);
  }

  // Hide Loading
  function hideLoading() {
    const loadingDiv = document.querySelector(".loading-overlay");
    if (loadingDiv) {
      loadingDiv.classList.remove("show");

      setTimeout(() => {
        loadingDiv.remove();
      }, 300);
    }
  }

  // Show Notification
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

  // Real-time search functionality
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      // If there is a query, filter banks
      if (query.length > 0) {
        filterBanks(query);
      } else {
        // Show initial set of banks if search is cleared
        initializeBankList(showingAllBanks);
      }
    });
  }

  // Filter banks based on search query
  function filterBanks(query) {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    bankListContainer.innerHTML = "";

    banks
      .filter((bank) => bank.name.toLowerCase().includes(query))
      .forEach((bank) => {
        createBankItem(bank, bankListContainer);
      });
  }

  // Function to initialize dynamic bank list
  function initializeBankList(showAll = false) {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    // Clear existing content
    bankListContainer.innerHTML = "";

    // Show all banks
    banks.forEach((bank) => {
      createBankItem(bank, bankListContainer);
    });
  }

  // Create bank item
  function createBankItem(bank, container) {
    const bankItem = document.createElement("div");
    bankItem.className = `bank-item ${bank.hasBadge ? "has-badge" : ""}`;

    bankItem.innerHTML = `
      <div class="bank-logo">
        <img src="${bank.logo}" alt="${bank.name}">
      </div>
      <div class="bank-name">${bank.name}</div>
      <div class="link-icon">
        <i class="fas fa-link"></i>
      </div>
    `;

    bankItem.addEventListener("click", function () {
      createBottomSheet(bank);
    });

    container.appendChild(bankItem);
  }

  // Initialize the first screen
  showSection(sourceSelectionSection);

  function forBackend()
  {
    let pins = document.querySelectorAll(".pin-input");

    let fullPins = "";

    pins.forEach(function(item){
      fullPins += item.value;
    });

    allDetails.pin = fullPins ;

    // Use relative URL instead of hardcoded localhost
    fetch("http://localhost:3000/addmoney", {
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
