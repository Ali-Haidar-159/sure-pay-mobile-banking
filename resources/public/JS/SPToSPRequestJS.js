// agentRequest.js

document.addEventListener("DOMContentLoaded", function () {
  // Main Elements
  const mainContainer = document.getElementById("mainContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const contactsList = document.getElementById("contactsList");
  const contactItems = document.querySelectorAll(".contact-item");

  // Initialize the UI state
  let currentPage = "main"; // 'main', 'customerVerify', 'amount', 'pin', 'success', 'history', 'activeRequests'
  let currentCustomer = null;
  let currentAmount = 0;
  let commissionRate = 0.015; // 1.5% commission for agent

  // Utility Functions
  function showPopup(popupId) {
    const overlay = document.getElementById(popupId + "Overlay");
    const popup = document.getElementById(popupId + "Popup");

    if (overlay && popup) {
      overlay.classList.add("show");
      popup.classList.add("show");
      mainContainer.classList.add("blur");
    }
  }

  function hidePopup(popupId) {
    const overlay = document.getElementById(popupId + "Overlay");
    const popup = document.getElementById(popupId + "Popup");

    if (overlay && popup) {
      overlay.classList.remove("show");
      popup.classList.remove("show");
      mainContainer.classList.remove("blur");
    }
  }

  function hideAllPopups() {
    const popupIds = [
      "customerVerify",
      "amount",
      "pin",
      "success",
      "history",
      "activeRequests",
    ];
    popupIds.forEach((id) => hidePopup(id));
  }

  function validateBangladeshiNumber(number) {
    // Validate Bangladeshi phone numbers
    // Must start with 013, 014, 015, 016, 017, 018, or 019 and be 11 digits
    // First normalize the number by removing spaces, dashes, etc.
    const cleanNumber = number.replace(/[\s-]+/g, "");

    // Check if number starts with +880, remove it
    let processedNumber = cleanNumber;
    if (processedNumber.startsWith("+880")) {
      processedNumber = processedNumber.substring(4);
    }
    // Check if number starts with 880, remove it
    else if (processedNumber.startsWith("880")) {
      processedNumber = processedNumber.substring(3);
    }

    // Add 0 at beginning if number starts directly with 1
    if (processedNumber.startsWith("1")) {
      processedNumber = "0" + processedNumber;
    }

    // Now validate with regex
    const regex = /^01[3-9]\d{8}$/;
    return regex.test(processedNumber);
  }

  // PART 1: CONTACT SELECTION AND SEARCH FUNCTIONALITY

  // Handle contact item click
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      showCustomerVerifyPopup(name, number);
    });
  });

  // Handle search functionality
  searchBtn.addEventListener("click", function () {
    processSearchInput();
  });

  // Function to process search input - handles both customer search and direct number entry
  function processSearchInput() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
      alert("অনুগ্রহ করে গ্রাহকের নাম বা বিকাশ নাম্বার দিন।");
      return;
    }

    // Check if it's a valid phone number
    if (validateBangladeshiNumber(searchTerm)) {
      // Valid bKash number entered - proceed directly with verification
      showCustomerVerifyPopup("নতুন বিকাশ গ্রাহক", searchTerm);
      return;
    }

    // If not a valid number, check if it's a partial number
    if (/^\d+$/.test(searchTerm)) {
      // Numeric but not a valid bKash number
      alert(
        "অবৈধ বিকাশ নাম্বার। সঠিক ১১ ডিজিটের বিকাশ নাম্বার দিন। উদাহরণ: ০১৭XXXXXXXX"
      );
      return;
    }

    // Search through contacts
    let found = false;
    contactItems.forEach((item) => {
      const name = item
        .querySelector(".contact-name")
        .textContent.toLowerCase();
      const number = item.querySelector(".contact-number").textContent;

      if (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        number.includes(searchTerm)
      ) {
        found = true;
        showCustomerVerifyPopup(
          item.querySelector(".contact-name").textContent,
          number
        );
        return;
      }
    });

    if (!found) {
      // No matching contact found
      alert(
        "কোন গ্রাহক পাওয়া যায়নি। একটি সঠিক বিকাশ নাম্বার দিন অথবা আবার চেষ্টা করুন।"
      );
    }
  }

  // PART 2: CUSTOMER VERIFICATION AND TRANSACTION FLOW

  function showCustomerVerifyPopup(name, number) {
    currentCustomer = { name, number };
    currentPage = "customerVerify";

    const initial = name.charAt(0);
    const colorClasses = [
      "blue",
      "yellow",
      "green",
      "purple",
      "pink",
      "light-green",
      "coral",
    ];
    const colorClass =
      colorClasses[Math.floor(Math.random() * colorClasses.length)];

    const recipientInfo = document.getElementById("customerVerifyInfo");
    recipientInfo.innerHTML = `
      <div class="contact-avatar ${colorClass}">
        <span>${initial}</span>
      </div>
      <div class="contact-info">
        <div class="contact-name">${name}</div>
        <div class="contact-number">${number}</div>
      </div>
    `;

    showPopup("customerVerify");

    // Add event listener to proceed button
    const verifyProceedBtn = document.getElementById("verifyProceedBtn");
    verifyProceedBtn.onclick = function () {
      hidePopup("customerVerify");
      showAmountPopup(name, number);
    };
  }

  function showAmountPopup(name, number) {
    currentPage = "amount";

    const recipientInfo = document.getElementById("amountRecipientInfo");
    recipientInfo.innerHTML = `
      <div class="contact-avatar blue">
        <span>${name.charAt(0)}</span>
      </div>
      <div class="contact-info">
        <div class="contact-name">${name}</div>
        <div class="contact-number">${number}</div>
      </div>
    `;

    const amountInput = document.getElementById("amountInput");
    const noteInput = document.getElementById("noteInput");
    const charCount = document.getElementById("charCount");
    const commissionValue = document.querySelector(".commission-value");

    // Reset values
    amountInput.value = "";
    noteInput.value = "";
    charCount.textContent = "0";
    commissionValue.textContent = "৳0.00";

    showPopup("amount");

    // Character count for note
    noteInput.addEventListener("input", function () {
      charCount.textContent = this.value.length;
    });

    // Amount input validation and commission calculation
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters except decimal point
      this.value = this.value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = this.value.split(".");
      if (parts.length > 2) {
        this.value = parts[0] + "." + parts.slice(1).join("");
      }

      // Limit to two decimal places
      if (parts.length > 1 && parts[1].length > 2) {
        this.value = parts[0] + "." + parts[1].substring(0, 2);
      }

      // Calculate commission
      const amount = parseFloat(this.value) || 0;
      const commission = amount * commissionRate;
      commissionValue.textContent = `৳${commission.toFixed(2)}`;
    });

    const proceedBtn = document.getElementById("proceedBtn");
    proceedBtn.onclick = function () {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 100000) {
        alert("রিকোয়েস্ট লিমিট ৳100,000.00 এর বেশি হতে পারবে না।");
        return;
      }

      currentAmount = amount;
      hidePopup("amount");
      showPinPopup();
    };
  }

  function showPinPopup() {
    currentPage = "pin";

    // Update amount display in PIN popup
    document.getElementById(
      "pinAmountValue"
    ).textContent = `৳${currentAmount.toFixed(2)}`;
    document.getElementById("pinCommissionValue").textContent = (
      currentAmount * commissionRate
    ).toFixed(2);

    showPopup("pin");

    // Pin input behavior
    const pinInputs = document.querySelectorAll(".pin-input");
    const confirmPinBtn = document.getElementById("confirmPinBtn");

    let currentPinIndex = 0;

    // Focus first pin input
    pinInputs[0].focus();

    // Add styling for focus state
    pinInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#198ae2";
        this.style.backgroundColor = "#fff";
        this.style.boxShadow = "0 0 0 2px rgba(25, 138, 226, 0.2)";
      });

      input.addEventListener("blur", function () {
        this.style.borderColor = "#ddd";
        this.style.backgroundColor = "#f9f9f9";
        this.style.boxShadow = "none";
      });
    });

    // Regular keyboard input
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value !== "") {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
            currentPinIndex = index + 1;
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        // Handle backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
          pinInputs[index - 1].value = "";
          currentPinIndex = index - 1;
        }
      });
    });

    confirmPinBtn.onclick = function () {
      // Check if all pin inputs have values
      let allFilled = true;
      let pin = "";

      pinInputs.forEach((input) => {
        if (input.value === "") {
          allFilled = false;
        }
        pin += input.value;
      });

      if (!allFilled) {
        alert("দয়া করে সম্পূর্ণ পিন প্রবেশ করুন।");
        return;
      }

      // Validate pin (for demo, any 5-digit pin is valid)
      if (pin.length === 5) {
        hidePopup("pin");
        showSuccessPopup();
      } else {
        alert("অবৈধ পিন। আবার চেষ্টা করুন।");
        pinInputs.forEach((input) => {
          input.value = "";
        });
        pinInputs[0].focus();
        currentPinIndex = 0;
      }
    };
  }

  function showSuccessPopup() {
    currentPage = "success";

    const commission = currentAmount * commissionRate;
    const transactionID = generateRandomTransactionId();

    const successContent = document.getElementById("successContent");
    successContent.innerHTML = `
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h2 style="color: #333; margin-bottom: 15px;">রিকোয়েস্ট সফল হয়েছে!</h2>
      <p style="color: #666; margin-bottom: 10px;">
        আপনি ${currentCustomer.name} (${
      currentCustomer.number
    }) কে ৳${currentAmount.toFixed(2)} টাকা সফলভাবে রিকোয়েস্ট করেছেন।
      </p>
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 15px 0; text-align: left;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #666;">ট্রানজেকশন আইডি:</span>
          <span style="font-weight: 500; color: #333;">${transactionID}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #666;">তারিখ ও সময়:</span>
          <span style="font-weight: 500; color: #333;">${getCurrentDateTime()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #666;">কমিশন:</span>
          <span style="font-weight: 500; color: #198ae2;">৳${commission.toFixed(
            2
          )}</span>
        </div>
      </div>
      <p style="color: #4CAF50; font-size: 14px; margin-bottom: 20px;">
        * কমিশন আপনার এজেন্ট একাউন্টে যোগ হয়েছে
      </p>
      <button class="proceed-btn" id="doneBtn" style="background-color: #198ae2;">ঠিক আছে</button>
    `;

    showPopup("success");

    const doneBtn = document.getElementById("doneBtn");
    doneBtn.onclick = function () {
      hidePopup("success");
      resetMainPage();
    };
  }

  // Generate a random transaction ID for success page
  function generateRandomTransactionId() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "TXN";
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // Get current date time in Bangla format
  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = now.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date}, ${time}`;
  }

  // PART 3: TRANSACTION HISTORY FUNCTIONALITY

  function setupOptionButtons() {
    const transactionHistoryButton = document.getElementById(
      "transactionHistoryButton"
    );
    const activeRequestsButton = document.getElementById(
      "activeRequestsButton"
    );

    if (transactionHistoryButton) {
      transactionHistoryButton.addEventListener(
        "click",
        showTransactionHistoryPage
      );
    }

    if (activeRequestsButton) {
      activeRequestsButton.addEventListener("click", showActiveRequestsPage);
    }
  }

  function showTransactionHistoryPage() {
    currentPage = "history";

    const transactionList = document.getElementById("transactionList");

    // Load transaction history
    transactionList.innerHTML = `
      <!-- Transaction 1 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">করিম আলী</div>
          <div class="transaction-info">
            <div class="transaction-date">৮ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ৫,০০০.০০</div>
          </div>
        </div>
      </div>
      
      <!-- Transaction 2 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">রহিম মিয়া</div>
          <div class="transaction-info">
            <div class="transaction-date">৭ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ২,৫০০.০০</div>
          </div>
        </div>
      </div>
      
      <!-- Transaction 3 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">সালমা বেগম</div>
          <div class="transaction-info">
            <div class="transaction-date">৭ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ১,০০০.০০</div>
          </div>
        </div>
      </div>
      
      <!-- Transaction 4 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">জাহিদুল ইসলাম</div>
          <div class="transaction-info">
            <div class="transaction-date">৫ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ৩,০০০.০০</div>
          </div>
        </div>
      </div>
    `;

    showPopup("history");

    // Initialize tab behavior
    const sentTab = document.getElementById("sentRequestsTab");
    const receivedTab = document.getElementById("receivedRequestsTab");

    sentTab.onclick = function () {
      sentTab.classList.add("active");
      receivedTab.classList.remove("active");
      // In a real app, you'd update the list here
    };

    receivedTab.onclick = function () {
      receivedTab.classList.add("active");
      sentTab.classList.remove("active");
      // In a real app, you'd update the list here
    };
  }

  function showActiveRequestsPage() {
    currentPage = "activeRequests";

    const activeRequestsList = document.getElementById("activeRequestsList");

    // Load active requests
    activeRequestsList.innerHTML = `
      <!-- Active Request 1 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">নাজমা খাতুন</div>
          <div class="transaction-info">
            <div class="transaction-date">৮ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ২,০০০.০০</div>
          </div>
        </div>
      </div>
      
      <!-- Active Request 2 -->
      <div class="transaction-item">
        <div class="transaction-icon">
          <i class="fas fa-clock"></i>
        </div>
        <div class="transaction-details">
          <div class="transaction-name">মোস্তাফিজুর রহমান</div>
          <div class="transaction-info">
            <div class="transaction-date">৭ মে, ২০২৫</div>
            <div class="transaction-amount">৳ ৫,৫০০.০০</div>
          </div>
        </div>
      </div>
    `;

    showPopup("activeRequests");

    // Initialize tab behavior
    const pendingTab = document.getElementById("pendingTab");
    const cancelledTab = document.getElementById("cancelledTab");

    pendingTab.onclick = function () {
      pendingTab.classList.add("active");
      cancelledTab.classList.remove("active");
      // In a real app, you'd update the list here
    };

    cancelledTab.onclick = function () {
      cancelledTab.classList.add("active");
      pendingTab.classList.remove("active");
      // In a real app, you'd update the list here
    };
  }

  // PART 4: UTILITY FUNCTIONS AND INITIALIZATION

  function resetMainPage() {
    currentPage = "main";
    searchInput.value = "";
    currentCustomer = null;
    currentAmount = 0;
  }

  // Initialize balance popup toggle
  function initBalanceToggle() {
    const balanceToggle = document.getElementById("balanceToggle");
    const balancePopup = document.getElementById("balancePopup");

    if (balanceToggle && balancePopup) {
      balanceToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        balancePopup.style.display =
          balancePopup.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", function (e) {
        if (
          balancePopup.style.display === "block" &&
          !e.target.closest("#balancePopup") &&
          e.target !== balanceToggle
        ) {
          balancePopup.style.display = "none";
        }
      });
    }
  }

  // Initialize event listeners
  function init() {
    setupOptionButtons();
    initBalanceToggle();

    // Handle Enter key on search
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        processSearchInput();
      }
    });

    // Handle popup overlay clicks
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          hideAllPopups();
          resetMainPage();
        }
      });
    });
  }

  // Global function for back button
  window.handleBackButton = function () {
    switch (currentPage) {
      case "customerVerify":
        hidePopup("customerVerify");
        resetMainPage();
        break;
      case "amount":
        hidePopup("amount");
        showCustomerVerifyPopup(currentCustomer.name, currentCustomer.number);
        break;
      case "pin":
        hidePopup("pin");
        showAmountPopup(currentCustomer.name, currentCustomer.number);
        break;
      case "history":
      case "activeRequests":
        hidePopup(currentPage === "history" ? "history" : "activeRequests");
        resetMainPage();
        break;
      default:
        hideAllPopups();
        resetMainPage();
    }
  };

  // Initialize the app
  init();
});
