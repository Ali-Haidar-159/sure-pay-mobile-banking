// internetBanking.js - Enhanced version with professional interface
document.addEventListener("DOMContentLoaded", function () {
  // Internet Banking specific elements
  const internetBankingOption = document.getElementById(
    "internetBankingOption"
  );
  const bankListSection = document.getElementById("bankListSection");
  const bankToBkashSection = document.getElementById("bankToBkashSection");
  const sourceSelectionSection = document.getElementById(
    "sourceSelectionSection"
  );

  // Internet Banking state
  let currentSection = sourceSelectionSection;
  let previousSection = null;
  let currentBank = null;

  // Enhanced Internet Banking banks data
  const internetBanks = [
    {
      id: 1,
      name: "অগ্রণী ব্যাংক লিমিটেড",
      logo: "images/banks/agrani-bank.png",
      type: "agrani",
      hasBadge: true,
      color: "#1a5276",
      gradient: "linear-gradient(135deg, #2980b9, #1a5276)",
      features: ["Quick Transfer", "Secure Banking", "24/7 Service"],
      transferLimit: "৳100,000",
    },
    {
      id: 2,
      name: "ব্যাংক এশিয়া",
      logo: "images/banks/bank-asia.png",
      type: "bankasia",
      hasBadge: false,
      color: "#c0392b",
      gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
      features: ["Online Support", "Instant Transfer", "Mobile Banking"],
      transferLimit: "৳50,000",
    },
    {
      id: 3,
      name: "আল-আরাফাহ ইসলামী ব্যাংক পিএলসি",
      logo: "images/banks/arafah-bank.png",
      type: "alarafah",
      hasBadge: true,
      color: "#27ae60",
      gradient: "linear-gradient(135deg, #2ecc71, #27ae60)",
      features: ["Shariah Compliant", "Easy Transfer", "Mobile Alerts"],
      transferLimit: "৳75,000",
    },
    {
      id: 4,
      name: "বাংলাদেশ ডেভেলপমেন্ট ব্যাংক",
      logo: "images/banks/bdbl.png",
      type: "bdbl",
      hasBadge: true,
      color: "#8e44ad",
      gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)",
      features: ["Government Bank", "Secure Transfer", "24/7 Service"],
      transferLimit: "৳200,000",
    },
  ];

  // Add Internet Banking click handler
  if (internetBankingOption) {
    internetBankingOption.addEventListener("click", function () {
      showInternetBankingList();
    });
  }

  // Show Internet Banking List
  function showInternetBankingList() {
    // Get bank list container
    const bankListContainer = bankListSection.querySelector(".bank-list");
    if (!bankListContainer) return;

    // Clear existing content
    bankListContainer.innerHTML = "";

    // Add banks
    internetBanks.forEach((bank) => {
      createEnhancedBankItem(bank, bankListContainer);
    });

    // Show section
    showSection(bankListSection);
    previousSection = bankToBkashSection;

    // Add back button
    addBackButton(bankListSection, bankToBkashSection);
  }

  // Create Enhanced Bank Item
  function createEnhancedBankItem(bank, container) {
    const bankItem = document.createElement("div");
    bankItem.className = `bank-item ${bank.hasBadge ? "has-badge" : ""}`;
    bankItem.style.borderLeft = `4px solid ${bank.color}`;
    bankItem.style.position = "relative";
    bankItem.style.overflow = "hidden";
    bankItem.style.transition = "all 0.3s ease";
    bankItem.setAttribute("data-bank-id", bank.id);

    bankItem.innerHTML = `
      <div class="bank-content">
        <div class="bank-logo">
          <img src="${bank.logo}" alt="${bank.name}" class="bank-logo-img">
        </div>
        <div class="bank-info">
          <div class="bank-name">${bank.name}</div>
          <div class="bank-features">
            ${bank.features
              .map(
                (feature) =>
                  `<span class="feature-tag" style="background: ${bank.gradient}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; white-space: nowrap;">${feature}</span>`
              )
              .join("")}
          </div>
        </div>
        <div class="transfer-info">
          <div class="transfer-limit">
            <i class="fas fa-exchange-alt"></i>
            <span>Max: ${bank.transferLimit}</span>
          </div>
          <div class="chevron-icon">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    `;

    bankItem.addEventListener("click", function () {
      currentBank = bank;
      showBankTransferPage(bank);
    });

    container.appendChild(bankItem);
  }

  // Show section function
  function showSection(section) {
    // Hide all main sections first
    const sections = [
      sourceSelectionSection,
      bankToBkashSection,
      bankListSection,
    ];

    sections.forEach((s) => {
      if (s) s.style.display = "none";
    });

    // Remove any dynamic sections
    const dynamicSections = document.querySelectorAll(
      '[id$="TransferSection"], [id$="AmountSection"], [id$="OtpSection"], [id$="SuccessSection"]'
    );
    dynamicSections.forEach((section) => {
      section.remove();
    });

    // Show the requested section
    if (section) {
      section.style.display = "block";
      section.classList.add("fade-in");

      // Remove animation class after it completes
      setTimeout(() => {
        section.classList.remove("fade-in");
      }, 300);
    }
  }

  // Add back button
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
      previousSection = targetSection;
    });
  }

  // Show Bank Transfer Page
  function showBankTransferPage(bank) {
    // Get template content
    const template = document.getElementById("internetBankingTemplate");
    if (!template) {
      console.error("Internet Banking template not found");
      return;
    }

    // Clone the template content
    const transferContent = template.content.cloneNode(true);

    // Update bank features
    const featuresTitle = transferContent.querySelector(".features-section h4");
    if (featuresTitle) {
      featuresTitle.textContent = `${bank.name} Features`;
    }

    // Update login button style
    const loginBtn = transferContent.querySelector(".professional-login-btn");
    if (loginBtn) {
      loginBtn.style.background = bank.gradient;
    }

    // Generate a random captcha
    const captchaText = transferContent.getElementById("bankCaptchaText");
    if (captchaText) {
      captchaText.textContent = generateRandomCaptcha();
    }

    // Create popup using PopupSystem
    const popup = PopupSystem.createPopup(transferContent, {
      title: "Internet Banking",
      titleIcon: "fas fa-university",
      gradient: bank.gradient,
      onBack: function () {
        showInternetBankingList();
      },
    });

    // Add login form handler
    const loginSection = popup.container.querySelector(".login-section");
    if (loginSection) {
      const usernameInput = popup.container.getElementById("bankUserId");
      const passwordInput = popup.container.getElementById("bankPassword");
      const captchaInput = popup.container.getElementById("bankCaptcha");

      loginSection.addEventListener("submit", function (e) {
        if (e.target.tagName === "FORM") {
          e.preventDefault();
        }
      });

      // Handle login button click
      const loginBtn = popup.container.querySelector(".professional-login-btn");
      if (loginBtn) {
        loginBtn.addEventListener("click", function () {
          // Validate inputs
          if (!usernameInput || !usernameInput.value) {
            showError("Please enter your User ID");
            return;
          }

          if (!passwordInput || !passwordInput.value) {
            showError("Please enter your password");
            return;
          }

          if (!captchaInput || !captchaInput.value) {
            showError("Please enter the captcha");
            return;
          }

          // Show loading
          showLoading("Logging in...");

          // Simulate loading delay
          setTimeout(() => {
            hideLoading();
            PopupSystem.closePopup(popup);
            showTransferAmountPage(bank);
          }, 1500);
        });
      }

      // Handle password toggle
      const passwordToggle = popup.container.querySelector(".password-toggle");
      if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener("click", function () {
          const type =
            passwordInput.getAttribute("type") === "password"
              ? "text"
              : "password";
          passwordInput.setAttribute("type", type);

          // Toggle icon
          const icon = this.querySelector("i");
          if (icon) {
            icon.className =
              type === "password" ? "fas fa-eye" : "fas fa-eye-slash";
          }
        });
      }

      // Handle captcha refresh
      const refreshCaptchaBtn = popup.container.querySelector(
        ".refresh-captcha-btn"
      );
      if (refreshCaptchaBtn && captchaText) {
        refreshCaptchaBtn.addEventListener("click", function () {
          captchaText.textContent = generateRandomCaptcha();
          if (captchaInput) captchaInput.value = "";
        });
      }
    }
  }

  // Show Transfer Amount Page
  function showTransferAmountPage(bank) {
    // Get template content
    const template = document.getElementById("transferAmountTemplate");
    if (!template) {
      console.error("Transfer amount template not found");
      return;
    }

    // Clone the template content
    const amountContent = template.content.cloneNode(true);

    // Update maximum amount
    const maxAmount = amountContent.querySelector(".max-amount");
    if (maxAmount) {
      maxAmount.textContent = `Max: ${bank.transferLimit}`;
    }

    // Update continue button style
    const continueBtn = amountContent.querySelector(".continue-transfer-btn");
    if (continueBtn) {
      continueBtn.style.background = bank.gradient;
    }

    // Create popup using PopupSystem
    const popup = PopupSystem.createPopup(amountContent, {
      title: "Transfer Money",
      titleIcon: "fas fa-exchange-alt",
      gradient: bank.gradient,
      onBack: function () {
        showBankTransferPage(bank);
      },
    });

    // Set up quick amount buttons
    const quickAmountBtns =
      popup.container.querySelectorAll(".quick-amount-btn");
    const amountInput = popup.container.getElementById("transferAmount");

    quickAmountBtns.forEach((btn) => {
      // Add gradient to button hover state
      btn.addEventListener("mouseover", function () {
        this.style.borderColor = bank.color;
        this.style.color = bank.color;
      });

      btn.addEventListener("mouseout", function () {
        if (!this.classList.contains("selected")) {
          this.style.borderColor = "#e1e1e1";
          this.style.color = "#333";
        }
      });

      // Handle click
      btn.addEventListener("click", function () {
        const amount = this.getAttribute("data-amount");
        if (amountInput) amountInput.value = amount;

        // Highlight selected button
        quickAmountBtns.forEach((b) => {
          b.classList.remove("selected");
          b.style.background = "white";
          b.style.color = "#333";
          b.style.borderColor = "#e1e1e1";
        });

        this.classList.add("selected");
        this.style.background = bank.color;
        this.style.color = "white";
        this.style.borderColor = bank.color;
      });
    });

    // Handle continue button
    if (continueBtn && amountInput) {
      continueBtn.addEventListener("click", function () {
        const amount = amountInput.value;

        // Validate amount
        if (!amount || isNaN(amount) || parseFloat(amount) < 50) {
          showError("Please enter a valid amount (minimum ৳50)");
          return;
        }

        const maxLimit = parseInt(bank.transferLimit.replace(/[^\d]/g, ""));
        if (parseFloat(amount) > maxLimit) {
          showError(`Amount exceeds maximum limit of ${bank.transferLimit}`);
          return;
        }

        // Show loading
        showLoading("Processing...");

        // Simulate processing delay
        setTimeout(() => {
          hideLoading();
          PopupSystem.closePopup(popup);
          showOTPVerificationPage(bank, amount);
        }, 1000);
      });
    }
  }

  // Show OTP Verification Page
  function showOTPVerificationPage(bank, amount) {
    // Generate a random OTP code
    const otpCode = generateOTP();
    console.log(`OTP for demo: ${otpCode}`);

    // Create OTP verification content
    const otpContent = `
      <div class="modern-otp-container">
        <div class="otp-form-modern">
          <div class="otp-sent-info">
            <i class="fas fa-shield-alt" style="color: ${bank.color};"></i>
            <h3>OTP Sent Successfully</h3>
            <p>We've sent a 6-digit OTP to your registered mobile number</p>
            <p class="phone-number">+880 16XX-XXX600</p>
          </div>

          <div class="otp-input-group">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
            <input type="text" maxlength="1" class="otp-digit" autocomplete="off">
          </div>

          <div class="otp-timer">
            <i class="fas fa-clock" style="color: ${bank.color};"></i>
            <span>OTP expires in: <span id="timerCount">02:00</span></span>
          </div>

          <div class="otp-actions">
            <button class="resend-otp-btn" disabled>
              <i class="fas fa-redo"></i>
              <span>Resend OTP</span>
            </button>
            <button class="verify-otp-btn-modern" style="background: ${bank.gradient};">
              <i class="fas fa-check-circle"></i>
              <span>Verify & Transfer</span>
            </button>
          </div>

          <!-- Transaction Summary -->
          <div class="transaction-summary">
            <h4>Transaction Summary</h4>
            <div class="summary-item">
              <span>From:</span>
              <span>${bank.name}</span>
            </div>
            <div class="summary-item">
              <span>To:</span>
              <span>bKash (01616122600)</span>
            </div>
            <div class="summary-item">
              <span>Amount:</span>
              <span>৳${amount}</span>
            </div>
          </div>
        </div>

        <!-- Security Info -->
        <div class="otp-security-info">
          <i class="fas fa-info-circle"></i>
          <span>Never share your OTP with anyone. ${bank.name} representatives will never ask for your OTP.</span>
        </div>
      </div>
    `;

    // Create popup using PopupSystem
    const popup = PopupSystem.createPopup(otpContent, {
      title: "OTP Verification",
      titleIcon: "fas fa-shield-alt",
      gradient: bank.gradient,
      onBack: function () {
        showTransferAmountPage(bank);
      },
    });

    // Set up OTP input fields
    const otpInputs = popup.container.querySelectorAll(".otp-digit");

    otpInputs.forEach((input, index) => {
      // Only allow numbers
      input.addEventListener("input", function (e) {
        this.value = this.value.replace(/\D/g, "");

        if (this.value) {
          if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
          }
        }
      });

      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !this.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      // Add animation on focus
      input.addEventListener("focus", function () {
        this.classList.add("focused");
      });

      input.addEventListener("blur", function () {
        this.classList.remove("focused");
      });
    });

    // Focus on first input
    setTimeout(() => {
      otpInputs[0].focus();
    }, 300);

    // Set up OTP timer
    let timeLeft = 120; // 2 minutes
    const timerElement = popup.container.querySelector("#timerCount");
    const resendBtn = popup.container.querySelector(".resend-otp-btn");

    const timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        resendBtn.disabled = false;
      }
    }, 1000);

    // Handle resend button
    resendBtn.addEventListener("click", function () {
      if (!this.disabled) {
        // Generate new OTP
        const newOtp = generateOTP();
        console.log(`New OTP for demo: ${newOtp}`);

        // Reset timer
        timeLeft = 120;
        this.disabled = true;

        // Clear OTP inputs
        otpInputs.forEach((input) => (input.value = ""));
        otpInputs[0].focus();

        // Show notification
        showNotification("OTP resent successfully");
      }
    });

    // Handle verify button
    const verifyBtn = popup.container.querySelector(".verify-otp-btn-modern");

    verifyBtn.addEventListener("click", function () {
      // Check if all inputs are filled
      const allFilled = Array.from(otpInputs).every(
        (input) => input.value.length === 1
      );

      if (!allFilled) {
        showError("Please enter the complete 6-digit OTP");
        return;
      }

      // Show loading
      showLoading("Verifying OTP...");

      // Simulate verification delay
      setTimeout(() => {
        clearInterval(timer);
        hideLoading();
        PopupSystem.closePopup(popup);
        showSuccessPage(bank, amount);
      }, 1500);
    });
  }

  // Show Success Page
  function showSuccessPage(bank, amount) {
    // Generate transaction ID and time
    const transactionId = generateTransactionId();
    const currentTime = new Date().toLocaleString();

    // Create success content
    const successContent = `
      <div class="modern-success-container">
        <!-- Success Animation -->
        <div class="success-animation">
          <div class="checkmark-circle" style="border-color: ${bank.color};">
            <i class="fas fa-check"></i>
          </div>
          <div class="success-ripple" style="background: ${bank.color};"></div>
          <div class="success-ripple delay" style="background: ${bank.color};"></div>
        </div>

        <!-- Success Message -->
        <div class="success-message">
          <h2>Transfer Successful!</h2>
          <p class="amount-transferred">৳${amount}</p>
          <p>has been successfully transferred to your bKash account</p>
        </div>

        <!-- Transaction Details -->
        <div class="transaction-details-card" style="border-left: 4px solid ${bank.color};">
          <h3>Transaction Details</h3>
          <div class="details-grid">
            <div class="detail-row">
              <span>Transaction ID</span>
              <span>${transactionId}</span>
            </div>
            <div class="detail-row">
              <span>From</span>
              <span>${bank.name}</span>
            </div>
            <div class="detail-row">
              <span>To</span>
              <span>bKash (01616122600)</span>
            </div>
            <div class="detail-row">
              <span>Amount</span>
              <span>৳${amount}</span>
            </div>
            <div class="detail-row">
              <span>Date & Time</span>
              <span>${currentTime}</span>
            </div>
            <div class="detail-row">
              <span>Status</span>
              <span class="status-success">Completed</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="success-actions">
          <button class="action-btn download-receipt" style="background: #f5f5f5;">
            <i class="fas fa-download"></i>
            <span>Download Receipt</span>
          </button>
          <button class="action-btn share-receipt" style="background: ${bank.gradient};">
            <i class="fas fa-share-alt"></i>
            <span>Share Receipt</span>
          </button>
        </div>

        <!-- Additional Options -->
        <div class="additional-options">
          <button class="option-btn" id="newTransfer">
            <i class="fas fa-plus-circle"></i>
            <span>Make Another Transfer</span>
          </button>
          <button class="option-btn done-btn" id="returnHome">
            <i class="fas fa-home"></i>
            <span>Return to Home</span>
          </button>
        </div>
      </div>
    `;

    // Create popup using PopupSystem
    const popup = PopupSystem.createPopup(successContent, {
      title: "Transfer Success",
      titleIcon: "fas fa-check-circle",
      gradient: bank.gradient,
      showBackButton: false,
    });

    // Handle download receipt button
    const downloadBtn = popup.container.querySelector(".download-receipt");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        downloadBankReceipt(bank, transactionId, amount, currentTime);
      });
    }

    // Handle share receipt button
    const shareBtn = popup.container.querySelector(".share-receipt");
    if (shareBtn) {
      shareBtn.addEventListener("click", function () {
        shareReceipt(bank, transactionId, amount, currentTime);
      });
    }

    // Handle new transfer button
    const newTransferBtn = popup.container.querySelector("#newTransfer");
    if (newTransferBtn) {
      newTransferBtn.addEventListener("click", function () {
        PopupSystem.closePopup(popup);
        showInternetBankingList();
      });
    }

    // Handle return home button
    const returnHomeBtn = popup.container.querySelector("#returnHome");
    if (returnHomeBtn) {
      returnHomeBtn.addEventListener("click", function () {
        PopupSystem.closePopup(popup);
        showSection(sourceSelectionSection);
      });
    }
  }

  // Download Bank Receipt
  function downloadBankReceipt(bank, transactionId, amount, time) {
    const receiptContent = `
==================================================
                BANK TRANSACTION RECEIPT
==================================================

Transaction ID: ${transactionId}
Date & Time: ${time}
Transaction Type: Bank to bKash Transfer

AMOUNT: ৳${amount}

From Bank: ${bank.name}
To: bKash Account (01616122600)

Status: SUCCESSFUL

Thank you for using ${bank.name} Internet Banking
For any inquiries, please contact customer support.
==================================================
`;

    // Create download link
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Bank_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Share Receipt
  function shareReceipt(bank, transactionId, amount, time) {
    const shareText = `Bank Transfer Receipt\n\nTransaction ID: ${transactionId}\nFrom: ${bank.name}\nTo: bKash (01616122600)\nAmount: ৳${amount}\nDate: ${time}\nStatus: Successful`;

    // Try to use native sharing if available
    if (navigator.share) {
      navigator
        .share({
          title: "Bank Transfer Receipt",
          text: shareText,
        })
        .then(() => {
          showNotification("Receipt shared successfully");
        })
        .catch(() => {
          fallbackShare(shareText);
        });
    } else {
      fallbackShare(shareText);
    }
  }

  // Fallback share method
  function fallbackShare(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showNotification("Receipt copied to clipboard");
  }

  // Utility Functions

  // Generate Random Captcha
  function generateRandomCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Generate OTP
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate Transaction ID
  function generateTransactionId() {
    return "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Show loading
  function showLoading(message) {
    // Get template content
    const template = document.getElementById("loadingTemplate");
    if (!template) {
      console.error("Loading template not found");
      return;
    }

    // Clone the template content
    const loadingContent = template.content.cloneNode(true);

    // Update loading message
    const loadingText = loadingContent.querySelector(".loading-text");
    if (loadingText) loadingText.textContent = message;

    // Update spinner color if a bank is selected
    if (currentBank) {
      const spinnerDots = loadingContent.querySelectorAll(".spinner-dot");
      const progressBar = loadingContent.querySelector(".progress-bar");

      spinnerDots.forEach((dot) => {
        dot.style.background = currentBank.color;
      });

      if (progressBar) {
        progressBar.style.background = currentBank.color;
      }
    }

    // Create loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "enhanced-loading-overlay";
    loadingOverlay.appendChild(loadingContent);

    document.body.appendChild(loadingOverlay);
  }

  // Hide loading
  function hideLoading() {
    const loadingOverlay = document.querySelector(".enhanced-loading-overlay");
    if (loadingOverlay) {
      loadingOverlay.remove();
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
