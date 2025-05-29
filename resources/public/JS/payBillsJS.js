document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  // Sections
  const categorySection = document.getElementById("categorySection");
  const providerSection = document.getElementById("providerSection");
  const billInfoSection = document.getElementById("billInfoSection");
  const billConfirmSection = document.getElementById("billConfirmSection");
  const pinSection = document.getElementById("pinSection");

  // Navigation Buttons
  const backToCategoryBtn = document.getElementById("backToCategoryBtn");
  const backToProviderBtn = document.getElementById("backToProviderBtn");
  const backToBillInfoBtn = document.getElementById("backToBillInfoBtn");
  const backToConfirmBtn = document.getElementById("backToConfirmBtn");
  const billInfoNextBtn = document.getElementById("billInfoNextBtn");
  const payBillBtn = document.getElementById("payBillBtn");
  const confirmPinBtn = document.getElementById("confirmPinBtn");

  // Search Elements
  const billSearchInput = document.getElementById("bill-search");
  const clearBillSearchBtn = document.getElementById("clearBillSearch");
  const providerSearchInput = document.getElementById("provider-search");
  const clearProviderSearchBtn = document.getElementById("clearProviderSearch");

  // Form Elements
  const meterNumberInput = document.getElementById("meter-number");
  const billAmountInput = document.getElementById("bill-amount");
  const referenceInput = document.getElementById("reference");
  const pinDigits = document.querySelectorAll(".pin-digit");
  const contactNumberInput = document.getElementById("contact-number"); // New contact number field
  const billMonthSelect = document.getElementById("bill-month"); // New month selection field

  // Category and Provider Elements
  const categoryItems = document.querySelectorAll(".bill-category-item");
  const billItems = document.querySelectorAll(".bill-item");
  const providerItems = document.querySelectorAll(".provider-item");
  const tabBtns = document.querySelectorAll(".tab-btn");

  // Selected Elements
  const selectedCategoryName = document.getElementById("selectedCategoryName");
  const selectedProviderName = document.getElementById("selectedProviderName");
  const confirmProviderName = document.getElementById("confirmProviderName");
  const confirmProviderCategory = document.getElementById(
    "confirmProviderCategory"
  );
  const confirmMeterNumber = document.getElementById("confirmMeterNumber");
  const confirmBillAmount = document.getElementById("confirmBillAmount");
  const confirmCharge = document.getElementById("confirmCharge");
  const confirmTotalAmount = document.getElementById("confirmTotalAmount");
  const pinProviderName = document.getElementById("pinProviderName");
  const pinBillAmount = document.getElementById("pinBillAmount");
  const confirmProviderLogo = document.getElementById("confirmProviderLogo");
  const pinProviderLogo = document.getElementById("pinProviderLogo");

  // New confirmation fields
  const confirmContactNumber = document.getElementById("confirmContactNumber");
  const confirmBillMonth = document.getElementById("confirmBillMonth");

  // Templates
  const successModalTemplate = document.getElementById("successModalTemplate");
  const receiptTemplate = document.getElementById("receiptTemplate");
  const detailRowTemplate = document.getElementById("detailRowTemplate");
  const receiptDetailRowTemplate = document.getElementById(
    "receiptDetailRowTemplate"
  );

  // Variables
  let selectedCategory = null;
  let selectedProvider = null;
  let currentBillAmount = 0;
  let serviceCharge = 0;
  let currentBillMonth = "";
  let currentContactNumber = "";
  let billReference = "";
  let transactionId = "";

  // Configure field settings for different bill categories
  const categoryFieldConfig = {
    electricity: {
      accountLabel: "মিটার/একাউন্ট নম্বর",
      accountPlaceholder: "মিটার/একাউন্ট নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) => value.trim().length === 13,
      accountErrorMsg: "মিটার নম্বর অবশ্যই ১৩ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: true,
    },
    gas: {
      accountLabel: "বিল অ্যাকাউন্ট নম্বর",
      accountPlaceholder: "বিল অ্যাকাউন্ট নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) =>
        value.trim().length >= 8 && value.trim().length <= 15,
      accountErrorMsg: "অ্যাকাউন্ট নম্বর অবশ্যই ৮-১৫ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: true,
    },
    water: {
      accountLabel: "বিল নম্বর",
      accountPlaceholder: "বিল নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) =>
        value.trim().length >= 5 && value.trim().length <= 12,
      accountErrorMsg: "বিল নম্বর অবশ্যই ৫-১২ অক্ষরের হতে হবে",
      showContact: true,
      showMonth: true,
    },
    internet: {
      accountLabel: "ইউজার আইডি",
      accountPlaceholder: "ইউজার আইডি লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক ইউজার আইডি দিন",
      showContact: true,
      showMonth: true,
    },
    telephone: {
      accountLabel: "আইপি ফোন নম্বর",
      accountPlaceholder: "আইপি ফোন নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক আইপি ফোন নম্বর দিন",
      showContact: true,
      showMonth: true,
    },
    tv: {
      accountLabel: "কাস্টমার আইডি",
      accountPlaceholder: "কাস্টমার আইডি লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক কাস্টমার আইডি দিন",
      showContact: true,
      showMonth: false,
    },
    "credit-card": {
      accountLabel: "কার্ড নম্বর",
      accountPlaceholder: "১৬ ডিজিট কার্ড নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) => value.trim().length === 16,
      accountErrorMsg: "কার্ড নম্বর অবশ্যই ১৬ সংখ্যার হতে হবে",
      showContact: true,
      showMonth: false,
    },
    government: {
      accountLabel: "এনআইডি নম্বর",
      accountPlaceholder: "এনআইডি নম্বর লিখুন",
      accountType: "number",
      accountValidation: (value) =>
        value.trim().length === 10 || value.trim().length === 17,
      accountErrorMsg: "সঠিক এনআইডি নম্বর দিন (১০ বা ১৭ সংখ্যা)",
      showContact: true,
      showMonth: false,
    },
    insurance: {
      accountLabel: "পলিসি নম্বর",
      accountPlaceholder: "পলিসি নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক পলিসি নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
    traffic: {
      accountLabel: "বিলার আইডি নম্বর",
      accountPlaceholder: "বিলার আইডি নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 5,
      accountErrorMsg: "সঠিক বিলার আইডি নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
    others: {
      accountLabel: "বুরো শাখা নম্বর",
      accountPlaceholder: "বুরো শাখা নম্বর লিখুন",
      accountType: "text",
      accountValidation: (value) => value.trim().length >= 3,
      accountErrorMsg: "সঠিক বুরো শাখা নম্বর দিন",
      showContact: true,
      showMonth: false,
    },
  };

  // Default field config if category not found
  const defaultFieldConfig = {
    accountLabel: "একাউন্ট নম্বর",
    accountPlaceholder: "একাউন্ট নম্বর লিখুন",
    accountType: "text",
    accountValidation: (value) => value.trim().length > 0,
    accountErrorMsg: "একাউন্ট নম্বর দিন",
    showContact: true,
    showMonth: true,
  };

  // Function to update bill info form based on selected category
  function updateBillInfoForm(category) {
    // Get field configuration for the selected category
    const fieldConfig = categoryFieldConfig[category] || defaultFieldConfig;

    // Update account field
    const accountField = document.querySelector(
      '.form-field label[for="meter-number"]'
    );
    const accountInput = document.getElementById("meter-number");

    if (accountField) {
      accountField.textContent = fieldConfig.accountLabel;
    }

    if (accountInput) {
      accountInput.placeholder = fieldConfig.accountPlaceholder;
      accountInput.type = fieldConfig.accountType;

      // Clear any existing input and error messages
      accountInput.value = "";
      const errorMsg =
        accountInput.parentElement.querySelector(".error-message");
      if (errorMsg) {
        errorMsg.remove();
      }
      accountInput.parentElement.classList.remove("error");
    }

    // Show/hide contact number field
    const contactField = document.querySelector(
      ".form-field:has(#contact-number)"
    );
    if (contactField) {
      contactField.style.display = fieldConfig.showContact ? "block" : "none";
      document.getElementById("contact-number").value = "";
    }

    // Show/hide month selection field
    const monthField = document.querySelector(".form-field:has(#bill-month)");
    if (monthField) {
      monthField.style.display = fieldConfig.showMonth ? "block" : "none";
      document.getElementById("bill-month").selectedIndex = 0;
    }

    // Clear bill amount
    const billAmountInput = document.getElementById("bill-amount");
    if (billAmountInput) {
      billAmountInput.value = "";
    }

    // Disable next button until valid inputs are provided
    if (billInfoNextBtn) {
      billInfoNextBtn.disabled = true;
    }
  }

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Get month name in Bangla
  function getBanglaMonthName(value) {
    const monthMap = {
      january: "জানুয়ারি",
      february: "ফেব্রুয়ারি",
      march: "মার্চ",
      april: "এপ্রিল",
      may: "মে",
      june: "জুন",
      july: "জুলাই",
      august: "অগাস্ট",
      september: "সেপ্টেম্বর",
      october: "অক্টোবর",
      november: "নভেম্বর",
      december: "ডিসেম্বর",
    };
    return monthMap[value] || "";
  }

  // Generate receipt and download as HTML
  function generatePDF(data) {
    const fieldConfig =
      categoryFieldConfig[selectedCategory] || defaultFieldConfig;

    // Create a copy of the receipt template
    const receiptContent = receiptTemplate.cloneNode(true);

    // Get the details container
    const detailsContainer = receiptContent.querySelector("#receipt-details");

    // Clear existing details
    if (detailsContainer) {
      detailsContainer.innerHTML = "";
    }

    // Add receipt details
    const addDetailRow = (label, value) => {
      const rowTemplate = receiptDetailRowTemplate.content.cloneNode(true);
      rowTemplate.querySelector(".detail-label").textContent = label;
      rowTemplate.querySelector(".detail-value").textContent = value;
      detailsContainer.appendChild(rowTemplate);
    };

    // Add all receipt details
    addDetailRow("প্রতিষ্ঠান", data.providerName);
    addDetailRow("বিল ধরণ", data.category);
    addDetailRow(fieldConfig.accountLabel, data.meterNumber);

    if (fieldConfig.showContact) {
      addDetailRow("যোগাযোগ নম্বর", data.contactNumber);
    }

    if (fieldConfig.showMonth) {
      addDetailRow("বিল মাস", data.billMonth);
    }

    addDetailRow("বিল পরিমাণ", data.billAmount);
    addDetailRow("চার্জ", data.charge);
    addDetailRow("রেফারেন্স", data.reference || "N/A");
    addDetailRow("ট্রানজেকশন আইডি", data.transactionId);
    addDetailRow("তারিখ ও সময়", data.date);

    // Add total row with special styling
    const totalRow = receiptDetailRowTemplate.content.cloneNode(true);
    totalRow.querySelector(".detail-label").textContent = "মোট পরিশোধিত";
    totalRow.querySelector(".detail-value").textContent = data.totalAmount;
    totalRow.querySelector(".detail-value").style.color = "#1c2e58";
    totalRow.querySelector(".detail-row").classList.add("total");
    detailsContainer.appendChild(totalRow);

    // Set current year
    const yearSpan = receiptContent.querySelector("#current-year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }

    // Convert to HTML string
    const receiptHTML = new XMLSerializer().serializeToString(receiptContent);

    // Create blob and download link
    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "বিকাশ_বিল_রিসিট.html";
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
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
        const tabGroup = this.parentElement.querySelectorAll(".tab-btn");
        tabGroup.forEach((tab) => tab.classList.remove("active"));
        this.classList.add("active");

        // Get tab content id
        const tabId = this.dataset.tab;
        if (tabId) {
          const tabContents = document.querySelectorAll(".tab-content");
          tabContents.forEach((content) => {
            content.classList.remove("active");
          });
          const activeContent = document.getElementById(tabId + "Bills");
          if (activeContent) {
            activeContent.classList.add("active");
          }
        }
      });
    });
  }

  // Clear search buttons
  if (clearBillSearchBtn) {
    clearBillSearchBtn.addEventListener("click", function () {
      billSearchInput.value = "";
      billSearchInput.focus();
    });
  }

  if (clearProviderSearchBtn) {
    clearProviderSearchBtn.addEventListener("click", function () {
      providerSearchInput.value = "";
      providerSearchInput.focus();
    });
  }

  // Search functionality for providers
  if (providerSearchInput) {
    providerSearchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      document.querySelectorAll(".provider-item").forEach((provider) => {
        const providerName = provider
          .querySelector(".provider-name")
          .textContent.toLowerCase();
        const providerType = provider
          .querySelector(".provider-type")
          .textContent.toLowerCase();

        if (
          providerName.includes(searchValue) ||
          providerType.includes(searchValue)
        ) {
          provider.style.display = "flex";
        } else {
          provider.style.display = "none";
        }
      });
    });
  }

  // Search functionality for bills/categories
  if (billSearchInput) {
    billSearchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      if (searchValue.length > 0) {
        // Show all providers from all categories
        document.querySelectorAll(".provider-list").forEach((list) => {
          list.style.display = "block";
        });

        document
          .querySelectorAll(".bill-item, .bill-category-item, .provider-item")
          .forEach((item) => {
            let itemText = "";

            if (item.classList.contains("bill-item")) {
              itemText =
                item.querySelector(".bill-name").textContent.toLowerCase() +
                " " +
                item.querySelector(".bill-type").textContent.toLowerCase();
            } else if (item.classList.contains("bill-category-item")) {
              itemText = item
                .querySelector(".bill-category-name")
                .textContent.toLowerCase();
            } else if (item.classList.contains("provider-item")) {
              itemText =
                item.querySelector(".provider-name").textContent.toLowerCase() +
                " " +
                item.querySelector(".provider-type").textContent.toLowerCase();
            }

            if (itemText.includes(searchValue)) {
              item.style.display = item.classList.contains("provider-item")
                ? "flex"
                : "block";
            } else {
              item.style.display = "none";
            }
          });
      } else {
        // Reset display
        document
          .querySelectorAll(".bill-item, .bill-category-item")
          .forEach((item) => {
            item.style.display = item.classList.contains("bill-item")
              ? "flex"
              : "block";
          });

        // Hide provider lists except the active one
        document.querySelectorAll(".provider-list").forEach((list) => {
          if (list.id === selectedCategory + "Providers") {
            list.style.display = "block";
          } else {
            list.style.display = "none";
          }
        });
      }
    });
  }

  // Navigation between sections with smooth transitions
  function navigateTo(fromSection, toSection) {
    // Add exit animation
    fromSection.style.opacity = "0";
    fromSection.style.transform = "translateX(-20px)";

    setTimeout(() => {
      fromSection.style.display = "none";

      // Show destination section with entrance animation
      toSection.style.display = "block";
      toSection.style.opacity = "0";
      toSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        toSection.style.opacity = "1";
        toSection.style.transform = "translateX(0)";
      }, 50);
    }, 200);
  }

  // Category selection
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      selectedCategory = this.dataset.category;

      // Update UI
      if (selectedCategoryName) {
        selectedCategoryName.textContent = this.querySelector(
          ".bill-category-name"
        ).textContent;
      }

      // Show only relevant provider list
      document.querySelectorAll(".provider-list").forEach((list) => {
        if (list.id === selectedCategory + "Providers") {
          list.style.display = "block";
        } else {
          list.style.display = "none";
        }
      });

      // Navigate to provider section
      navigateTo(categorySection, providerSection);
    });
  });

  // Bill item selection (from recent bills)
  billItems.forEach((item) => {
    item.addEventListener("click", function () {
      const billName = this.querySelector(".bill-name").textContent;
      const billType = this.querySelector(".bill-type").textContent;
      const billLogo = this.querySelector(".bill-logo img").src;

      // Set selected provider details
      selectedProvider = this.dataset.bill;

      if (selectedProviderName) {
        selectedProviderName.textContent = billName;
      }

      // Navigate to bill info section
      navigateTo(categorySection, billInfoSection);
    });
  });

  // Provider selection
  providerItems.forEach((item) => {
    item.addEventListener("click", function () {
      const providerName = this.querySelector(".provider-name").textContent;
      const providerType = this.querySelector(".provider-type").textContent;
      const providerLogo = this.querySelector(".provider-logo img").src;

      // Set selected provider details
      selectedProvider = this.dataset.provider;

      if (selectedProviderName) {
        selectedProviderName.textContent = providerName;
      }

      // Update form fields based on selected category
      updateBillInfoForm(selectedCategory);

      // Navigate to bill info section
      navigateTo(providerSection, billInfoSection);
    });
  });

  // Back buttons
  if (backToCategoryBtn) {
    backToCategoryBtn.addEventListener("click", function () {
      navigateTo(providerSection, categorySection);
    });
  }

  if (backToProviderBtn) {
    backToProviderBtn.addEventListener("click", function () {
      navigateTo(billInfoSection, providerSection);
    });
  }

  if (backToBillInfoBtn) {
    backToBillInfoBtn.addEventListener("click", function () {
      navigateTo(billConfirmSection, billInfoSection);
    });
  }

  if (backToConfirmBtn) {
    backToConfirmBtn.addEventListener("click", function () {
      navigateTo(pinSection, billConfirmSection);
    });
  }

  // Bill amount input handling
  if (billAmountInput) {
    billAmountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      currentBillAmount = parseInt(this.value) || 0;

      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Replace existing meterNumberInput event handlers with this new implementation
  if (meterNumberInput) {
    meterNumberInput.addEventListener("input", function () {
      // ক্রেডিট কার্ড ক্যাটাগরি চেক
      if (selectedCategory === "credit-card") {
        // শুধু নম্বর রাখা, বাকি সব রিমুভ
        let cleanValue = this.value.replace(/\D/g, "");

        // 16 ডিজিটের বেশি হলে কেটে ফেলা
        if (cleanValue.length > 16) {
          cleanValue = cleanValue.substring(0, 16);
        }

        // ভ্যালিডেশন চেক
        if (cleanValue.length > 0 && cleanValue.length !== 16) {
          this.parentElement.classList.add("error");
          let errorMsg = this.parentElement.querySelector(".error-message");
          if (!errorMsg) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            this.parentElement.appendChild(errorMsg);
          }
          errorMsg.textContent = "কার্ড নম্বর অবশ্যই ১৬ সংখ্যার হতে হবে";
        } else {
          this.parentElement.classList.remove("error");
          const errorMsg = this.parentElement.querySelector(".error-message");
          if (errorMsg) {
            errorMsg.remove();
          }
        }

        // আপডেট ভ্যালু - ফরম্যাটিং ছাড়া
        this.value = cleanValue;
      } else {
        // অন্যান্য বিল টাইপের জন্য
        let value = this.value.replace(/\D/g, "");

        if (value.length > 13) {
          value = value.substring(0, 13);
        }

        this.value = value;

        // ভ্যালিডেশন চেক
        if (value.length > 0 && value.length !== 13) {
          this.parentElement.classList.add("error");
          let errorMsg = this.parentElement.querySelector(".error-message");
          if (!errorMsg) {
            errorMsg = document.createElement("span");
            errorMsg.className = "error-message";
            this.parentElement.appendChild(errorMsg);
          }
          errorMsg.textContent = "বিল নম্বর অবশ্যই ১৩ সংখ্যার হতে হবে";
        } else {
          this.parentElement.classList.remove("error");
          const errorMsg = this.parentElement.querySelector(".error-message");
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      }

      // বাটন আপডেট
      updateBillInfoNextButton();
    });
  }

  // Replace the existing contactNumberInput event handler with:
  if (contactNumberInput) {
    contactNumberInput.addEventListener("input", function () {
      // Allow only numbers
      this.value = this.value.replace(/\D/g, "");

      // Limit to 11 digits
      if (this.value.length > 11) {
        this.value = this.value.slice(0, 11);
      }

      // Store current contact number
      currentContactNumber = this.value;

      // Validate Bangladesh prefixes (013, 014, 015, 016, 017, 018, 019)
      const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
      const isValidPrefix =
        this.value.length >= 3
          ? validPrefixes.some((prefix) => this.value.startsWith(prefix))
          : true;

      // Get appropriate error message based on the input state
      let errorMessage = "";

      if (this.value.length === 0) {
        // Empty input - no error message needed
        errorMessage = "";
      } else if (this.value.length < 11) {
        // Too short
        errorMessage = "মোবাইল নম্বর অবশ্যই ১১ ডিজিট হতে হবে";
      } else if (!isValidPrefix) {
        // Invalid prefix
        errorMessage = "অবৈধ মোবাইল প্রিফিক্স। ০১৩-০১৯ দিয়ে শুরু করুন";
      }

      // Show or clear error message
      if (errorMessage) {
        // Check if error message already exists
        let errorMsg = this.parentElement.querySelector(".phone-hint");
        if (!errorMsg) {
          errorMsg = document.createElement("span");
          errorMsg.className = "phone-hint";
          errorMsg.style.cssText = `
            display: block;
            color: #ff6b6b;
            font-size: 11px;
            margin-top: 4px;
            padding-left: 2px;
          `;
          this.parentElement.appendChild(errorMsg);
        }
        errorMsg.textContent = errorMessage;

        // Add error class to parent
        this.parentElement.classList.add("error");
      } else {
        // Remove error message if no errors
        const errorMsg = this.parentElement.querySelector(".phone-hint");
        if (errorMsg) {
          errorMsg.remove();
        }

        // Remove error class from parent
        this.parentElement.classList.remove("error");
      }

      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Bill month select handling
  if (billMonthSelect) {
    billMonthSelect.addEventListener("change", function () {
      // Store current bill month
      currentBillMonth = this.value;
      // Enable/disable next button based on all fields
      updateBillInfoNextButton();
    });
  }

  // Replace existing updateBillInfoNextButton function
  function updateBillInfoNextButton() {
    if (billInfoNextBtn) {
      let isValidAccount = false;

      // ক্রেডিট কার্ড ঠিক 16 ডিজিট হতে হবে
      if (selectedCategory === "credit-card") {
        isValidAccount = meterNumberInput.value.length === 16;
      }
      // অন্যান্য বিল ঠিক 13 ডিজিট হতে হবে
      else {
        isValidAccount = meterNumberInput.value.length === 13;
      }

      // কন্টাক্ট নম্বর চেক
      const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];
      const isValidContact =
        contactNumberInput.value.trim().length === 11 &&
        validPrefixes.some((prefix) =>
          contactNumberInput.value.startsWith(prefix)
        );

      // বিল মাস চেক
      const isMonthSelected = billMonthSelect
        ? billMonthSelect.value !== ""
        : true;

      // বাটন সক্রিয়/নিষ্ক্রিয় করা
      if (
        currentBillAmount > 0 &&
        isValidAccount &&
        isValidContact &&
        isMonthSelected
      ) {
        billInfoNextBtn.disabled = false;
      } else {
        billInfoNextBtn.disabled = true;
      }
    }
  }

  // Add this function after the existing functions and before the event listeners
  function updateConfirmationSection(category) {
    const fieldConfig = categoryFieldConfig[category] || defaultFieldConfig;

    // Update account label
    const confirmAccountLabel = document.getElementById("confirmAccountLabel");
    if (confirmAccountLabel) {
      confirmAccountLabel.textContent = fieldConfig.accountLabel;
    }

    // Show/hide contact number detail
    const contactDetail = document.querySelector(".contact-detail");
    if (contactDetail) {
      contactDetail.style.display = fieldConfig.showContact ? "flex" : "none";
    }

    // Show/hide bill month detail
    const monthDetail = document.querySelector(".month-detail");
    if (monthDetail) {
      monthDetail.style.display = fieldConfig.showMonth ? "flex" : "none";
    }
  }

  // Replace the existing billInfoNextBtn click handler with this updated version
  if (billInfoNextBtn) {
    billInfoNextBtn.addEventListener("click", function () {
      const fieldConfig =
        categoryFieldConfig[selectedCategory] || defaultFieldConfig;

      // Set confirmation values
      if (confirmProviderName) {
        confirmProviderName.textContent = selectedProviderName.textContent;
      }

      if (confirmProviderCategory) {
        confirmProviderCategory.textContent = selectedCategoryName
          ? selectedCategoryName.textContent
          : "বিল";
      }

      if (confirmMeterNumber) {
        confirmMeterNumber.textContent = meterNumberInput.value;
      }

      // Set new confirmation values
      if (confirmContactNumber) {
        confirmContactNumber.textContent = fieldConfig.showContact
          ? contactNumberInput.value
          : "N/A";
      }

      if (confirmBillMonth) {
        confirmBillMonth.textContent = fieldConfig.showMonth
          ? getBanglaMonthName(billMonthSelect.value)
          : "N/A";
      }

      if (confirmBillAmount) {
        confirmBillAmount.textContent = "৳" + formatNumber(currentBillAmount);
      }

      // Calculate service charge (example logic)
      if (selectedCategory === "credit-card") {
        serviceCharge = Math.round(currentBillAmount * 0.01); // 1% for credit cards
      } else {
        serviceCharge = 0; // No charge for utility bills
      }

      if (confirmCharge) {
        confirmCharge.textContent = "৳" + formatNumber(serviceCharge);
      }

      if (confirmTotalAmount) {
        const totalAmount = currentBillAmount + serviceCharge;
        confirmTotalAmount.textContent = "৳" + formatNumber(totalAmount);
      }

      // Update confirmation labels based on selected category
      updateConfirmationSection(selectedCategory);

      // Navigate to confirmation section
      navigateTo(billInfoSection, billConfirmSection);
    });
  }

  // Pay bill button
  if (payBillBtn) {
    payBillBtn.addEventListener("click", function () {
      // Store reference value if provided
      billReference = referenceInput.value || "";

      // Set PIN section details
      if (pinProviderName) {
        pinProviderName.textContent = confirmProviderName.textContent;
      }

      if (pinBillAmount) {
        pinBillAmount.textContent = confirmTotalAmount.textContent;
      }

      // Copy logos
      if (pinProviderLogo && confirmProviderLogo) {
        pinProviderLogo.src = confirmProviderLogo.src;
      }

      // Navigate to PIN section
      navigateTo(billConfirmSection, pinSection);

      // Focus first PIN digit
      if (pinDigits.length > 0) {
        pinDigits[0].focus();
      }
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
      // Simulate PIN verification
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
      this.disabled = true;

      // Generate transaction ID
      transactionId = "TXN" + Math.floor(Math.random() * 10000000);

      // Simulate processing
      setTimeout(() => {
        showSuccessMessage();
      }, 1500);
    });
  }

  // Show success message using the modal template
  function showSuccessMessage() {
    // Get field configuration for the selected category
    const fieldConfig =
      categoryFieldConfig[selectedCategory] || defaultFieldConfig;

    // Clone the modal template
    const modalClone = successModalTemplate
      .querySelector(".success-modal")
      .cloneNode(true);
    const successModal = document.createElement("div");
    successModal.className = "success-modal";
    successModal.appendChild(modalClone);

    // Get data values
    const meterNumber =
      document.getElementById("confirmMeterNumber").textContent;
    const billAmount =
      document.getElementById("confirmTotalAmount").textContent;
    const billName = document.getElementById("confirmProviderName").textContent;
    const billCategory = document.getElementById(
      "confirmProviderCategory"
    ).textContent;
    const contactNumber = document.getElementById(
      "confirmContactNumber"
    ).textContent;
    const billMonth = document.getElementById("confirmBillMonth").textContent;
    const currentDate = new Date().toLocaleString("bn-BD");

    // Set success message text
    const successMessage = successModal.querySelector(".success-message");
    if (successMessage) {
      successMessage.textContent = `${billName} - এর ${billAmount} টাকা সফলভাবে পরিশোধ করা হয়েছে`;
    }

    // Get success details container
    const successDetails = successModal.querySelector(".success-details");
    if (successDetails) {
      // Clear existing content
      successDetails.innerHTML = "";

      // Create detail rows using template
      const createDetailRow = (label, value) => {
        const row = detailRowTemplate.content.cloneNode(true);
        row.querySelector(".detail-row-label").textContent = label;
        row.querySelector(".detail-row-value").textContent = value;
        return row;
      };

      // Add account number detail
      successDetails.appendChild(
        createDetailRow(fieldConfig.accountLabel, meterNumber)
      );

      // Add contact number if shown
      if (fieldConfig.showContact) {
        successDetails.appendChild(
          createDetailRow("যোগাযোগ নম্বর", contactNumber)
        );
      }

      // Add bill month if shown
      if (fieldConfig.showMonth) {
        successDetails.appendChild(createDetailRow("বিল মাস", billMonth));
      }

      // Add transaction ID and date
      successDetails.appendChild(
        createDetailRow("ট্রানজেকশন আইডি", transactionId)
      );
      successDetails.appendChild(createDetailRow("তারিখ ও সময়", currentDate));

      // Add total amount
      const totalRow = createDetailRow("মোট", billAmount);
      totalRow.querySelector(".detail-row").classList.add("total");
      successDetails.appendChild(totalRow);
    }

    // Add the modal to the DOM
    document.body.appendChild(successModal);

    // Add click handler for done button
    const doneBtn = successModal.querySelector("#doneBtn");
    if (doneBtn) {
      doneBtn.addEventListener("click", function () {
        document.body.removeChild(successModal);

        // Reset display of sections
        pinSection.style.display = "none";
        billConfirmSection.style.display = "none";
        billInfoSection.style.display = "none";
        providerSection.style.display = "none";
        categorySection.style.display = "block";
        categorySection.style.opacity = "1";
        categorySection.style.transform = "translateX(0)";

        // Reset confirm button
        confirmPinBtn.innerHTML =
          '<i class="fas fa-paper-plane"></i> কনফার্ম করুন';
        confirmPinBtn.disabled = true;

        // Clear PIN inputs
        pinDigits.forEach((digit) => {
          digit.value = "";
        });
      });
    }

    // Add click handler for download receipt button
    const downloadReceiptBtn = successModal.querySelector(
      "#downloadReceiptBtn"
    );
    if (downloadReceiptBtn) {
      downloadReceiptBtn.addEventListener("click", function () {
        // Prepare receipt data
        const receiptData = {
          providerName: billName,
          category: billCategory,
          meterNumber: meterNumber,
          contactNumber: contactNumber,
          billMonth: billMonth,
          billAmount: document.getElementById("confirmBillAmount").textContent,
          charge: document.getElementById("confirmCharge").textContent,
          reference: billReference,
          transactionId: transactionId,
          date: currentDate,
          totalAmount: billAmount,
        };

        // Generate and download PDF
        generatePDF(receiptData);
      });
    }
  }

  // রিসিট এবং টোকেন এবং পে বিল বিবরণী এলিমেন্ট খুঁজে নিন
  const receiptSection = document.querySelector(".receipt-section");
  const billHistorySection = document.querySelector(".bill-history-section");

  // রিসিট এবং টোকেন ক্লিক হ্যান্ডলার
  if (receiptSection) {
    receiptSection.addEventListener("click", function () {
      // রিসিট এবং টোকেন পেজে নিয়ে যাও
      window.location.href = "/paybillreceipt";
    });
  }

  // পে বিল বিবরণী ক্লিক হ্যান্ডলার
  if (billHistorySection) {
    billHistorySection.addEventListener("click", function () {
      // পে বিল বিবরণী পেজে নিয়ে যাও
      window.location.href = "/paybillhistory";
    });
  }

  // CSS ক্লাস যোগ করুন যাতে কার্সর পয়েন্টার দেখায়
  if (receiptSection && !receiptSection.classList.contains("clickable")) {
    receiptSection.classList.add("clickable");
    receiptSection.style.cursor = "pointer";
  }

  if (
    billHistorySection &&
    !billHistorySection.classList.contains("clickable")
  ) {
    billHistorySection.classList.add("clickable");
    billHistorySection.style.cursor = "pointer";
  }
});


//backend : 

let nischitKorun = document.getElementById("confirmPinBtn");
let pins = document.querySelectorAll(".pin-digit");
let amount = document.getElementById("bill-amount");
let mobile = document.getElementById("contact-number");
let months = document.getElementById("bill-month") ;
let accountNum = document.getElementById("meter-number") ;

nischitKorun.addEventListener("click", function(e){
  // Prevent default form submission to avoid page reload
  e.preventDefault();

  let tk = amount.value;
  let mobileNum = mobile.value;
  let monthh = months.value ;
  let accountNummer = accountNum.value ;
  let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  // Use relative URL instead of hardcoded localhost
  fetch("http://localhost:3000/paybill", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      mobile: mobileNum,
      amount: tk,
      pin: fullPins ,
      account : accountNummer ,
      month : monthh 
    })
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
});



