// Insurance Payment Flow - Main Setup & Event Handling
document.addEventListener("DOMContentLoaded", function () {
  // Main configuration
  const config = {
    animationSpeed: 300,
    popupZIndex: 1000,
    currentStep: 0,
    policyNumber: "",
    selectedInstitution: "",
    policyType: "self", // 'self' or 'other'
    mobileNumber: "",
    amount: "",
    pin: "",
    currentFaqIndex: -1,
  };

  // Insurance institutions data
  const insuranceInstitutions = [
    {
      id: "delta-life",
      name: "Delta Life",
      logo: "/public/images/Insurance/ins1.jpg",
    },
    {
      id: "guardian-life",
      name: "Guardian Life",
      logo: "/public/images/Insurance/ins2.jpg",
    },
    {
      id: "nrb-islamic",
      name: "NRB Islamic",
      logo: "/public/images/Insurance/ins3.jpg",
    },
    {
      id: "akij-takaful",
      name: "Akij Takaful",
      logo: "/public/images/Insurance/ins4.jpg",
    },
    {
      id: "jamuna-life",
      name: "Jamuna Life",
      logo: "/public/images/Insurance/ins5.jpg",
    },
  ];

  // FAQ Data - Questions and Answers
  const faqData = [
    {
      id: "premium-payment-service",
      question:
        "বিকাশ-এর মাধ্যমে ইন্সুরেন্স (প্রিমিয়াম) পেমেন্ট সার্ভিসটি কী?",
      answer: `বিকাশ-এর "ইন্সুরেন্স সার্ভিস" আপনাকে বিভিন্ন ইন্সুরেন্স কোম্পানির প্রিমিয়াম পেমেন্ট সহজে ও দ্রুত করার সুবিধা দেয়। আপনি যেকোনো সময়, যেকোনো স্থান থেকে আপনার পলিসি প্রিমিয়াম পরিশোধ করতে পারবেন।`,
    },
    {
      id: "who-can-use",
      question: "সার্ভিসটি কাদের জন্য প্রযোজ্য?",
      answer: `যেকোনো বিকাশ গ্রাহক যাদের বিভিন্ন ইন্সুরেন্স কোম্পানির সাথে বীমা পলিসি আছে, তারা এই সার্ভিসটি ব্যবহার করে সহজেই প্রিমিয়াম পরিশোধ করতে পারবেন। এটি সকল প্রকার বীমা যেমন - জীবন বীমা, স্বাস্থ্য বীমা, এবং অন্যান্য ইন্সুরেন্স পলিসির জন্য প্রযোজ্য।`,
    },
    {
      id: "service-charge",
      question: "সার্ভিসটি পেতে গ্রাহকদের কোনো প্রকার চার্জ লাগবে?",
      answer: `না, বিকাশের মাধ্যমে ইন্সুরেন্স প্রিমিয়াম পরিশোধ করতে কোনো অতিরিক্ত চার্জ লাগে না। আপনি সম্পূর্ণ বিনামূল্যে এই সেবাটি ব্যবহার করতে পারবেন।`,
    },
    {
      id: "missed-confirmation",
      question:
        "গ্রাহক যদি পেমেন্ট সম্পন্ন হওয়ার কনফারমেশন নোটিফিকেশন/এসএমএস পায় কিন্তু ইন্সুরেন্স কোম্পানি থেকে পলিসি আপডেট হওয়ার কনফারমেশন নোটিফিকেশন/এসএমএস না পায়, তাহলে কী করণীয়?",
      answer: `যদি আপনি বিকাশ থেকে পেমেন্ট সম্পন্ন হওয়ার নিশ্চিতকরণ পেয়ে থাকেন কিন্তু ইন্সুরেন্স কোম্পানি থেকে কোনো নিশ্চিতকরণ না পান, তাহলে:
      
      ১. বিকাশ অ্যাপের "ট্রানজেকশন হিস্টোরি" থেকে ট্রানজেকশন আইডি সংগ্রহ করুন
      ২. সংশ্লিষ্ট ইন্সুরেন্স কোম্পানির কাস্টমার সার্ভিসে যোগাযোগ করুন এবং ট্রানজেকশন আইডি উল্লেখ করুন
      ৩. প্রয়োজনে বিকাশ কাস্টমার কেয়ার (১৬২৪৭) নম্বরে যোগাযোগ করুন`,
    },
    {
      id: "failed-payment",
      question:
        "বিকাশ গ্রাহকের যদি পেমেন্ট সফল না হয় কিন্তু একাউন্ট থেকে টাকা কেটে নেয়া হয়, তাহলে কী করণীয়?",
      answer: `যদি পেমেন্ট সফল না হয় কিন্তু আপনার অ্যাকাউন্ট থেকে টাকা কাটা যায়, তাহলে:
      
      ১. সাধারণত টাকা ৭২ ঘণ্টার মধ্যে আপনার অ্যাকাউন্টে ফেরত আসবে
      ২. যদি ৭২ ঘণ্টার মধ্যে টাকা ফেরত না আসে, তাহলে বিকাশ কাস্টমার কেয়ার (১৬২৪৭) নম্বরে যোগাযোগ করুন
      ৩. আপনার ট্রানজেকশন আইডি বা লেনদেনের তারিখ ও সময় সম্পর্কে তথ্য প্রদান করুন`,
    },
  ];

  // Initialize the flow by setting up event listeners
  initializeFlow();

  function initializeFlow() {
    // Attach click event to the premium payment menu item
    const premiumPaymentMenuItem = document.getElementById(
      "premiumPaymentMenuItem"
    );
    if (premiumPaymentMenuItem) {
      premiumPaymentMenuItem.addEventListener(
        "click",
        showInstitutionSelectionPage
      );
    }

    // Attach click event to the FAQ menu item
    const faqMenuItem = document.getElementById("faqMenuItem");
    if (faqMenuItem) {
      faqMenuItem.addEventListener("click", showFaqMainPage);
    }

    // Initialize back button functionality
    setupBackButtonListener();
  }

  function setupBackButtonListener() {
    // Global back button handler
    document.addEventListener("click", function (e) {
      if (e.target.closest(".back-button")) {
        handleBackButtonClick();
      }
      if (e.target.closest(".faq-back-button")) {
        handleFaqBackButtonClick();
      }
    });
  }

  function handleBackButtonClick() {
    // Find current popup
    const currentPopup = document.querySelector(".insurance-popup.show");
    if (!currentPopup) return;

    // Handle back button functionality based on current step
    if (config.currentStep > 0) {
      // Save current step before decrementing
      const previousStep = config.currentStep;
      config.currentStep--;

      // Remove current popup
      hidePopup(currentPopup);

      // Show previous popup based on step
      setTimeout(() => {
        switch (config.currentStep) {
          case 0:
            // Back to main insurance menu - no need to show new popup
            break;
          case 1:
            showInstitutionSelectionPage();
            break;
          case 2:
            showPolicyNumberInputPage();
            break;
          case 3:
            showPolicyDetailsPage();
            break;
          case 4:
            showAmountInputPage();
            break;
          default:
            // If something went wrong, reset to main page
            config.currentStep = 0;
            break;
        }
      }, 300); // Wait for fade out animation to complete
    } else {
      // If we're at the main level of a popup, just close it
      hidePopup(currentPopup);
    }
  }

  function handleFaqBackButtonClick() {
    // Handle back button functionality based on current FAQ index
    if (config.currentFaqIndex >= 0) {
      // If we're viewing a specific FAQ answer, go back to the main FAQ list
      config.currentFaqIndex = -1;
      const currentPopup = document.querySelector(".faq-popup.show");
      if (currentPopup) {
        hidePopup(currentPopup);
        showFaqMainPage();
      }
    } else {
      // If we're on the main FAQ list, close the popup
      const currentPopup = document.querySelector(".faq-popup.show");
      if (currentPopup) {
        hidePopup(currentPopup);
      }
    }
  }

  // Function to show a popup
  function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (!popup) return;

    // Reset display to block first (it might be set to 'none' initially)
    popup.style.display = "flex";

    // Get main container to apply blur
    const mainContainer = document.querySelector(
      ".insurance-service-container"
    );

    // Trigger reflow to ensure transition works
    popup.offsetHeight;
    popup.classList.add("show");

    // Add blur to main container
    if (mainContainer) {
      mainContainer.classList.add("blur");
      // Hide the main container from screen readers when popup is active
      mainContainer.setAttribute("aria-hidden", "true");
    }
  }

  // Function to hide a popup
  function hidePopup(popup) {
    if (!popup) return;

    popup.classList.remove("show");

    // Remove blur from main container
    const mainContainer = document.querySelector(
      ".insurance-service-container"
    );
    if (mainContainer) {
      mainContainer.classList.remove("blur");
      // Make main container visible to screen readers again
      mainContainer.setAttribute("aria-hidden", "false");
    }

    setTimeout(() => {
      popup.style.display = "none";
    }, config.animationSpeed);
  }

  // Step 1: Show institution selection page
  function showInstitutionSelectionPage() {
    config.currentStep = 1;

    // Populate institution items in the form
    const institutionForm = document.getElementById("institutionSelectionForm");
    institutionForm.innerHTML = "";

    insuranceInstitutions.forEach((institution) => {
      const institutionItem = document.createElement("div");
      institutionItem.className = "institution-item";
      institutionItem.setAttribute("data-id", institution.id);

      institutionItem.innerHTML = `
        <div class="institution-logo">
          <img src="${institution.logo}" alt="${institution.name}" onerror="this.src='https://via.placeholder.com/50'">
        </div>
        <div class="institution-name">${institution.name}</div>
      `;

      institutionItem.addEventListener("click", () => {
        config.selectedInstitution = institution;
        hidePopup(document.getElementById("institutionSelectionPopup"));
        setTimeout(() => {
          showPolicyNumberInputPage();
        }, config.animationSpeed);
      });

      institutionForm.appendChild(institutionItem);
    });

    // Show the popup
    showPopup("institutionSelectionPopup");
  }

  // Step 2: Show policy number input page
  function showPolicyNumberInputPage() {
    config.currentStep = 2;

    const institution = config.selectedInstitution;

    // Set the institution details
    document.getElementById("policyInstitutionLogo").src = institution.logo;
    document.getElementById("policyInstitutionName").textContent =
      institution.name;

    // Reset and setup form
    const policyForm = document.getElementById("policyNumberForm");
    const policyNumberInput = document.getElementById("policyNumberInput");
    const selfPolicyRadio = document.getElementById("selfPolicy");
    const otherPolicyRadio = document.getElementById("otherPolicy");
    const mobileNumberContainer = document.getElementById(
      "mobileNumberContainer"
    );
    const mobileNumberInput = document.getElementById("mobileNumberInput");
    const nextButton = document.getElementById("nextButton");

    // Clear previous inputs
    policyNumberInput.value = "";
    mobileNumberInput.value = "";
    selfPolicyRadio.checked = true;
    otherPolicyRadio.checked = false;
    mobileNumberContainer.style.display = "none";
    nextButton.disabled = true;

    // Policy type selection event
    selfPolicyRadio.addEventListener("change", function () {
      if (this.checked) {
        mobileNumberContainer.style.display = "none";
        config.policyType = "self";
        validatePolicyForm();
      }
    });

    otherPolicyRadio.addEventListener("change", function () {
      if (this.checked) {
        mobileNumberContainer.style.display = "block";
        config.policyType = "other";
        validatePolicyForm();
      }
    });

    // Input validation events
    policyNumberInput.addEventListener("input", validatePolicyForm);
    mobileNumberInput.addEventListener("input", validatePolicyForm);

    // Form validation function
    function validatePolicyForm() {
      const policyNumber = policyNumberInput.value.trim();
      const isPolicyValid = policyNumber.length === 13;

      let isMobileValid = true;
      if (otherPolicyRadio.checked) {
        const mobileNumber = mobileNumberInput.value.trim();
        isMobileValid =
          mobileNumber.length === 11 && /^01[0-9]{9}$/.test(mobileNumber);
      }

      nextButton.disabled = !(isPolicyValid && isMobileValid);
    }

    // Form submission
    policyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      config.policyNumber = policyNumberInput.value.trim();

      if (config.policyType === "other") {
        config.mobileNumber = mobileNumberInput.value.trim();
      } else {
        config.mobileNumber = "01616122600"; // Default number for self policy
      }

      hidePopup(document.getElementById("policyInputPopup"));
      setTimeout(() => {
        showPolicyDetailsPage();
      }, config.animationSpeed);
    });

    // Show the popup
    showPopup("policyInputPopup");
  }

  // Step 3: Show policy details page
  function showPolicyDetailsPage() {
    config.currentStep = 3;

    // Mock policy details (in a real scenario, this would come from an API)
    const policyDetails = {
      policyNumber: config.policyNumber,
      policyHolder: "মোঃ আসাদুজ্জামান",
      policyType: "জীবন বীমা",
      dueDate: "২৫ এপ্রিল, ২০২৫",
      dueAmount: "2,500",
    };

    // Set the policy details
    document.getElementById("detailPolicyNumber").textContent =
      policyDetails.policyNumber;
    document.getElementById("detailPolicyHolder").textContent =
      policyDetails.policyHolder;
    document.getElementById("detailPolicyType").textContent =
      policyDetails.policyType;
    document.getElementById("detailDueDate").textContent =
      policyDetails.dueDate;
    document.getElementById("detailDueAmount").textContent =
      "৳ " + policyDetails.dueAmount;

    // Set up form submission
    const policyDetailsForm = document.getElementById("policyDetailsForm");
    policyDetailsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      hidePopup(document.getElementById("policyDetailsPopup"));
      setTimeout(() => {
        showAmountInputPage(policyDetails.dueAmount);
      }, config.animationSpeed);
    });

    // Show the popup
    showPopup("policyDetailsPopup");
  }

  // Step 4: Show amount input page
  function showAmountInputPage(suggestedAmount = "") {
    config.currentStep = 4;

    const institution = config.selectedInstitution;

    // Set the institution details and policy number
    document.getElementById("amountInstitutionLogo").src = institution.logo;
    document.getElementById("amountInstitutionName").textContent =
      institution.name;
    document.getElementById("summaryPolicyNumber").textContent =
      config.policyNumber;

    // Set suggested amount if provided
    const amountInput = document.getElementById("amountInput");
    const amountHint = document.querySelector(".amount-hint");

    if (suggestedAmount) {
      amountInput.value = suggestedAmount.replace(/,/g, "");
    } else {
      amountInput.value = "";
    }

    // Reset error message
    amountHint.style.color = "#666";
    amountHint.textContent = "সর্বনিম্ন ৫০ টাকা";

    // Format amount as user types
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      let value = this.value.replace(/[^0-9]/g, "");

      // Reset error message
      amountHint.style.color = "#666";
      amountHint.textContent = "সর্বনিম্ন ৫০ টাকা";

      this.value = value;
    });

    // Form submission
    const amountForm = document.getElementById("amountInputForm");
    amountForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = amountInput.value.trim();

      if (amount && parseInt(amount) >= 50) {
        config.amount = amount;
        hidePopup(document.getElementById("amountInputPopup"));
        setTimeout(() => {
          showPinEntryPage();
        }, config.animationSpeed);
      } else {
        // Show error
        amountHint.style.color = "red";
        amountHint.textContent = "সর্বনিম্ন ৫০ টাকা প্রয়োজন";

        // Shake effect on input field
        const amountInputField = document.querySelector(".amount-input-field");
        amountInputField.classList.add("shake-animation");
        setTimeout(() => {
          amountInputField.classList.remove("shake-animation");
        }, 500);
      }
    });

    // Show the popup
    showPopup("amountInputPopup");
  }

  // Step 5: Show PIN entry page
  function showPinEntryPage() {
    config.currentStep = 5;

    // Format amount with commas for display
    const formattedAmount = parseInt(config.amount).toLocaleString();
    document.getElementById("pinAmountValue").textContent =
      "৳" + formattedAmount;

    // Reset PIN inputs
    const pinInputs = document.querySelectorAll(".pin-input");
    pinInputs.forEach((input) => {
      input.value = "";
    });

    // Disable confirm button
    const confirmPinBtn = document.getElementById("confirmPinBtn");
    confirmPinBtn.disabled = true;

    // Focus first pin input
    setTimeout(() => {
      pinInputs[0].focus();
    }, 300);

    let currentPinIndex = 0;

    // Add styling for focus state
    pinInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#e2146c";
        this.style.backgroundColor = "#fff";
        this.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
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

        // Check if all fields are filled
        let allFilled = true;
        pinInputs.forEach((input) => {
          if (input.value === "") {
            allFilled = false;
          }
        });

        confirmPinBtn.disabled = !allFilled;
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

    confirmPinBtn.addEventListener("click", function () {
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
        showNotification("দয়া করে সম্পূর্ণ পিন প্রবেশ করুন।");
        return;
      }

      // Validate pin (for demo, any 5-digit pin is valid)
      if (pin.length === 5) {
        config.pin = pin;
        hidePopup(document.getElementById("pinEntryPopup"));
        setTimeout(() => {
          showSuccessPage();
        }, config.animationSpeed);
      } else {
        showNotification("অবৈধ পিন। আবার চেষ্টা করুন।");
        pinInputs.forEach((input) => {
          input.value = "";
        });
        pinInputs[0].focus();
        currentPinIndex = 0;
      }
    });

    // Show the popup
    showPopup("pinEntryPopup");
  }

  // Step 6: Show success page
  function showSuccessPage() {
    config.currentStep = 6;

    const institution = config.selectedInstitution;

    // Get current date and time for transaction
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    const formattedTime = `${currentDate.getHours()}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Generate a random transaction ID
    const transactionId =
      "TX" +
      Math.floor(Math.random() * 10000000000)
        .toString()
        .padStart(10, "0");

    // Format amount with commas for display
    const formattedAmount = parseInt(config.amount).toLocaleString();

    // Set success details
    document.getElementById(
      "successDetails"
    ).textContent = `আপনি ${institution.name} কে ৳${formattedAmount} টাকা রিকোয়েস্ট করেছেন।`;
    document.getElementById(
      "successTransactionId"
    ).textContent = `রিকোয়েস্ট আইডি: ${transactionId}`;

    // Set up done button
    const doneBtn = document.getElementById("doneBtn");
    doneBtn.addEventListener("click", function () {
      hidePopup(document.getElementById("successPopup"));
      resetConfigData();
    });

    // Show the popup
    showPopup("successPopup");
  }

  // FAQ functions
  function showFaqMainPage() {
    config.currentFaqIndex = -1;

    // Generate FAQ question items
    const faqQuestionsList = document.getElementById("faqQuestionsList");
    faqQuestionsList.innerHTML = "";

    faqData.forEach((faq, index) => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";
      faqItem.setAttribute("data-index", index);

      faqItem.innerHTML = `
        <div class="faq-question">${faq.question}</div>
        <div class="faq-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      `;

      faqItem.addEventListener("click", () => {
        hidePopup(document.getElementById("faqMainPopup"));
        setTimeout(() => {
          showFaqAnswerPage(index);
        }, config.animationSpeed);
      });

      faqQuestionsList.appendChild(faqItem);
    });

    // Add search functionality
    addFaqSearch();

    // Show the popup
    showPopup("faqMainPopup");
  }

  function showFaqAnswerPage(faqIndex) {
    config.currentFaqIndex = faqIndex;
    const faq = faqData[faqIndex];

    // Set question and answer text
    document.getElementById("faqQuestionText").textContent = faq.question;
    document.getElementById("faqAnswerText").textContent = faq.answer;

    // Set up feedback buttons
    const yesButton = document.querySelector(".yes-button");
    const noButton = document.querySelector(".no-button");

    yesButton.onclick = function () {
      showFeedbackThanks(true);
    };

    noButton.onclick = function () {
      showFeedbackThanks(false);
    };

    // Show the popup
    showPopup("faqAnswerPopup");
  }

  function addFaqSearch() {
    // Add search box if it doesn't exist
    if (!document.querySelector(".faq-search-box")) {
      const searchBox = document.createElement("div");
      searchBox.className = "faq-search-box";
      searchBox.innerHTML = `
        <div class="search-input-container">
          <i class="fas fa-search search-icon"></i>
          <input type="text" class="faq-search-input" placeholder="প্রশ্ন খুঁজুন...">
        </div>
      `;

      // Insert at the top of questions container
      const faqTitle = document.querySelector(".faq-title");
      if (faqTitle) {
        faqTitle.parentNode.insertBefore(searchBox, faqTitle.nextSibling);
      }

      // Add search functionality
      const searchInput = searchBox.querySelector(".faq-search-input");

      searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach((item) => {
          const questionText = item
            .querySelector(".faq-question")
            .textContent.toLowerCase();

          if (searchTerm === "" || questionText.includes(searchTerm)) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });
    }
  }

  // Show a thank you message after feedback
  function showFeedbackThanks(isPositive) {
    const feedbackNotification = document.getElementById(
      "feedbackNotification"
    );

    feedbackNotification.innerHTML = `
      <div class="notification-icon">
        <i class="fas ${isPositive ? "fa-check-circle" : "fa-info-circle"}"></i>
      </div>
      <div class="notification-message">
        ${
          isPositive
            ? "আপনার প্রতিক্রিয়ার জন্য ধন্যবাদ!"
            : "আমরা দুঃখিত। আপনার মতামতের জন্য ধন্যবাদ।"
        }
      </div>
    `;

    feedbackNotification.style.backgroundColor = isPositive
      ? "#28a745"
      : "#17a2b8";
    feedbackNotification.style.display = "flex";

    // Show notification with animation
    setTimeout(() => {
      feedbackNotification.style.opacity = "1";
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      feedbackNotification.style.opacity = "0";
      setTimeout(() => {
        feedbackNotification.style.display = "none";
      }, 300);
    }, 3000);
  }

  // Initialize notification system
  function showNotification(message, duration = 3000) {
    const notification = document.getElementById("notificationContainer");

    notification.textContent = message;
    notification.style.display = "block";
    notification.classList.add("show");

    // Hide after duration
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.style.display = "none";
      }, 300);
    }, duration);
  }

  function resetConfigData() {
    config.currentStep = 0;
    config.policyNumber = "";
    config.selectedInstitution = "";
    config.policyType = "self";
    config.mobileNumber = "";
    config.amount = "";
    config.pin = "";
  }

  // Handle window resize for mobile view
  window.addEventListener("resize", function () {
    const popups = document.querySelectorAll(".insurance-popup, .faq-popup");

    popups.forEach((popup) => {
      if (window.innerWidth <= 500) {
        popup.style.height = "100vh";
        popup.style.maxHeight = "100vh";
        popup.style.width = "100%";
        popup.style.borderRadius = "0";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.transform = "scale(1)";
      } else {
        popup.style.height = "80vh";
        popup.style.maxHeight = "80vh";
        popup.style.width = "100%";
        popup.style.maxWidth = "500px";
        popup.style.borderRadius = "16px";
        popup.style.top = "50%";
        popup.style.left = "50%";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
      }
    });
  });

  // Export public functions
  window.Insurance = {
    showInstitutionSelection: showInstitutionSelectionPage,
    showPolicyNumberInput: showPolicyNumberInputPage,
    showPolicyDetails: showPolicyDetailsPage,
    showAmountInput: showAmountInputPage,
    showPinEntry: showPinEntryPage,
    showSuccess: showSuccessPage,
    showNotification: showNotification,
  };

  window.FAQ = {
    show: showFaqMainPage,
    showQuestion: showFaqAnswerPage,
  };
});
