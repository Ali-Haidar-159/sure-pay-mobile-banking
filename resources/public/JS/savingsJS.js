document.addEventListener("DOMContentLoaded", function () {

  var nameOfSavings , type , duration , savingsAmount , bankName ;


  // Elements
  const newSavingsButton = document.querySelector(".new-savings-button");
  const savingsOptions = document.querySelectorAll(".savings-option");
  const modalOverlay = document.getElementById("modalOverlay");

  // Popup elements
  const savingsTypePopup = document.getElementById("savingsTypePopup");
  const savingsDetailsPopup = document.getElementById("savingsDetailsPopup");
  const bankSelectionPopup = document.getElementById("bankSelectionPopup");
  const savingsConfirmationPopup = document.getElementById(
    "savingsConfirmationPopup"
  );
  const pinEntryPopup = document.getElementById("pinEntryPopup");
  const successPopup = document.getElementById("successPopup");

  // Global state for savings
  let savingsState = {
    type: null,
    frequency: null,
    tenure: null,
    amount: null,
    bank: null,
  };

  // Event Listeners
  newSavingsButton.addEventListener("click", function () {
    showSavingsTypeSelection();
  });

  savingsOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const optionText = this.querySelector(".option-text p").textContent;

      if (optionText.includes("আয়কর সনদ")) {
        alert("রিটার্ন ও আয়কর সনদ পেজে নিয়ে যাওয়া হচ্ছে...");
      } else if (optionText.includes("জিজ্ঞাসা")) {
        alert("সাধারণ জিজ্ঞাসা পেজে নিয়ে যাওয়া হচ্ছে...");
      }
    });
  });

  // Helper function to close popups
  function closePopup(popup) {
    modalOverlay.classList.add("d-none");
    popup.classList.add("d-none");
    modalOverlay.style.animation = "quickFade 0.15s ease-out reverse";
    popup.style.animation = "quickSlide 0.15s ease-out reverse";
  }

  // Helper function to show popups
  function showPopup(popup) {
    modalOverlay.classList.remove("d-none");
    popup.classList.remove("d-none");
    modalOverlay.style.animation = "quickFade 0.1s ease-out";
    popup.style.animation = "quickSlide 0.15s ease-out";
  }

  // Function to validate form in step 2
  function validateSavingsForm(state) {
    return state.frequency && state.tenure && state.amount;
  }

  // Function to calculate projected returns
  function calculateReturns(type, frequency, tenure, amount) {
    let rate = type === "dps" ? 0.085 : 0.08;
    let period = frequency === "weekly" ? tenure * 4 : tenure;
    let totalDeposit = amount * period;
    let interest = totalDeposit * rate * (tenure / 12);

    return {
      totalDeposit: totalDeposit,
      interest: interest,
      maturityAmount: totalDeposit + interest,
    };
  }

  // Function to show savings type selection popup (Step 1)
  function showSavingsTypeSelection() {
    showPopup(savingsTypePopup);

    // Event listeners
    const backButton = savingsTypePopup.querySelector(".back-button-btn");
    backButton.addEventListener("click", function () {
      closePopup(savingsTypePopup);
    });

    const savingsTypes = savingsTypePopup.querySelectorAll(".savings-type");
    savingsTypes.forEach((type) => {
      type.addEventListener("click", function (e) {
        const savingsType = this.getAttribute("data-type");
        // console.log("reach") ;
        // console.dir(e.target.closest('.savings-type').dataset.value) ;

        nameOfSavings = e.target.closest('.savings-type').dataset.type ;

        savingsState.type = savingsType;
        savingsTypes.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        setTimeout(() => {
          closePopup(savingsTypePopup);
          showSavingsDetailsSelection();
        }, 300);
      });
    });
  }

  // Function to show savings details selection (Step 2)
  function showSavingsDetailsSelection() {
    showPopup(savingsDetailsPopup);

    // Set type title
    const typeTitle = savingsState.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    document.getElementById(
      "savings-type-title"
    ).textContent = `${typeTitle} এর ধরন`;

    // Get form elements
    const frequencySelect =
      savingsDetailsPopup.querySelector(".frequency-select");
    const frequencyOptions =
      savingsDetailsPopup.querySelector(".frequency-options");
    const tenureGroup = savingsDetailsPopup.querySelectorAll(".form-group")[1];
    const tenureSelect = savingsDetailsPopup.querySelector(".tenure-select");
    const tenureOptions = savingsDetailsPopup.querySelector(".tenure-options");
    const amountGroup = savingsDetailsPopup.querySelectorAll(".form-group")[2];
    const amountSelect = savingsDetailsPopup.querySelector(".amount-select");
    const amountOptions = savingsDetailsPopup.querySelector(".amount-options");
    const nextButton = savingsDetailsPopup.querySelector(".next-button");
    const backButton = savingsDetailsPopup.querySelector(".back-button-btn");

    // Reset form state
    frequencySelect.textContent = "ধরন বেছে নিন";
    tenureSelect.textContent = "মেয়াদ বেছে নিন";
    amountSelect.textContent = "জমার পরিমাণ বেছে নিন";
    tenureGroup.style.display = "none";
    amountGroup.style.display = "none";
    nextButton.disabled = true;
    savingsState.frequency = null;
    savingsState.tenure = null;
    savingsState.amount = null;

    // Toggle dropdown function
    function toggleDropdown(select, options) {
      options.style.display =
        options.style.display === "block" ? "none" : "block";

      const allDropdowns =
        savingsDetailsPopup.querySelectorAll(".dropdown-options");
      allDropdowns.forEach((dropdown) => {
        if (dropdown !== options) {
          dropdown.style.display = "none";
        }
      });
    }

    // Event listeners for dropdowns
    frequencySelect.addEventListener("click", () =>
      toggleDropdown(frequencySelect, frequencyOptions)
    );

    tenureSelect.addEventListener("click", () =>
      toggleDropdown(tenureSelect, tenureOptions)
    );

    amountSelect.addEventListener("click", () =>
      toggleDropdown(amountSelect, amountOptions)
    );

    // Event listeners for dropdown options
    frequencyOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        const text = this.textContent;

        frequencySelect.textContent = text;
        frequencyOptions.style.display = "none";
        savingsState.frequency = value;

        // Show tenure group
        tenureGroup.style.display = "block";
      });
    });

    tenureOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        duration = this.getAttribute("data-value");
        // console.log(duration) ;
        const text = this.textContent;

        tenureSelect.textContent = text;
        tenureOptions.style.display = "none";
        savingsState.tenure = parseInt(value);

        // Show amount group
        amountGroup.style.display = "block";
      });
    });

    amountOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        const value = this.getAttribute("data-value");
        savingsAmount = this.getAttribute("data-value");
        const text = this.textContent;

        amountSelect.textContent = text;
        amountOptions.style.display = "none";
        savingsState.amount = parseInt(value);

        // Enable next button
        nextButton.disabled = !validateSavingsForm(savingsState);
        if (!nextButton.disabled) {
          nextButton.style.background =
            "linear-gradient(135deg, #1c2e58 0%, #112555 100%)";
          nextButton.style.cursor = "pointer";
        }
      });
    });

    // Back button event listener
    backButton.addEventListener("click", function () {
      closePopup(savingsDetailsPopup);
      showSavingsTypeSelection();
    });

    // Next button event listener
    nextButton.addEventListener("click", function () {
      if (!nextButton.disabled) {
        closePopup(savingsDetailsPopup);
        showBankSelection();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener(
      "click",
      function (event) {
        if (
          !event.target.closest(".form-select") &&
          !event.target.closest(".dropdown-options")
        ) {
          const allDropdowns =
            savingsDetailsPopup.querySelectorAll(".dropdown-options");
          allDropdowns.forEach((dropdown) => {
            dropdown.style.display = "none";
          });
        }
      },
      { capture: true }
    );
  }

  // Function to show bank selection (Step 3)
  function showBankSelection() {
    showPopup(bankSelectionPopup);

    // Sample bank data
    const banks = [
      { name: "IDLC Finance PLC", rate: "8.75%", logo: "idlc.png" },
      { name: "Dhaka Bank PLC", rate: "8.5%", logo: "dhaka-bank.png" },
      { name: "BRAC Bank PLC", rate: "8.0%", logo: "brac-bank.png" },
    ];

    // Create bank items
    const bankSelectionContainer = document.getElementById(
      "bank-selection-container"
    );
    bankSelectionContainer.innerHTML = "";

    banks.forEach((bank) => {
      const bankItem = document.createElement("div");
      bankItem.className = "bank-item";
      bankItem.setAttribute("data-bank", bank.name);
      bankItem.innerHTML = `
        <div class="bank-logo">
          <img src="images/${bank.logo}" alt="${bank.name}">
        </div>
        <div class="bank-info">
          <p class="bank-name">${bank.name}</p>
          <div class="bank-rate">
            <span class="rate-value">${bank.rate}</span>
            <span class="rate-label">মুনাফার হার p.a.</span>
          </div>
        </div>
      `;
      bankSelectionContainer.appendChild(bankItem);
    });

    // Event listeners
    const backButton = bankSelectionPopup.querySelector(".back-button-btn");
    const bankItems = bankSelectionPopup.querySelectorAll(".bank-item");

    backButton.addEventListener("click", function () {
      closePopup(bankSelectionPopup);
      showSavingsDetailsSelection();
    });

    bankItems.forEach((item) => {
      item.addEventListener("click", function () {
        const selectedBank = this.getAttribute("data-bank");
        savingsState.bank = selectedBank;

        closePopup(bankSelectionPopup);
        showSavingsConfirmation();
      });
    });
  }

  // Function to show savings confirmation
  function showSavingsConfirmation() {
    showPopup(savingsConfirmationPopup);

    const returns = calculateReturns(
      savingsState.type,
      savingsState.frequency,
      savingsState.tenure,
      savingsState.amount
    );

    const typeText = savingsState.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText =
      savingsState.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const tenureText = `${savingsState.tenure} মাস`;
    const depositText = `৳${savingsState.amount}`;
    const totalDepositText = `৳${returns.totalDeposit}`;
    const interestText = `৳${Math.round(returns.interest)}`;
    const maturityText = `৳${Math.round(returns.maturityAmount)}`;

    // Update summary section
    const summarySection = document.getElementById("savings-summary");
    summarySection.innerHTML = `
      <div class="summary-item">
        <span class="summary-label">ব্যাংক</span>
        <span class="summary-value">${savingsState.bank}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">সেভিংসের ধরন</span>
        <span class="summary-value">${typeText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">ধরন</span>
        <span class="summary-value">${frequencyText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">মেয়াদ</span>
        <span class="summary-value">${tenureText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">জমার পরিমাণ</span>
        <span class="summary-value">${depositText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">মোট জমা</span>
        <span class="summary-value">${totalDepositText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">সম্ভাব্য আয়</span>
        <span class="summary-value">${interestText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">মেয়াদান্তে প্রাপ্তি</span>
        <span class="summary-value highlight">${maturityText}</span>
      </div>
    `;

    // Event listeners
    const backButton =
      savingsConfirmationPopup.querySelector(".back-button-btn");
    const confirmButton =
      savingsConfirmationPopup.querySelector(".confirm-button");

    backButton.addEventListener("click", function () {
      closePopup(savingsConfirmationPopup);
      showBankSelection();
    });

    confirmButton.addEventListener("click", function () {
      closePopup(savingsConfirmationPopup);
      showPINEntry();
    });
  }

  // Function to show PIN entry
  function showPINEntry() {
    showPopup(pinEntryPopup);

    // Reset PIN inputs
    const pinInputs = pinEntryPopup.querySelectorAll(".pin-input");
    pinInputs.forEach((input) => {
      input.value = "";
    });

    // PIN entry logic
    const submitButton = pinEntryPopup.querySelector(".submit-pin-button");
    const backButton = pinEntryPopup.querySelector(".back-button-btn");
    submitButton.disabled = true;

    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function (e) {
        if (e.target.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }

        // Check if all inputs are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        submitButton.disabled = !allFilled;
        if (allFilled) {
          submitButton.style.background =
            "linear-gradient(135deg, #1c2e58 0%, #112555 100%)";
          submitButton.style.cursor = "pointer";
        }
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    backButton.addEventListener("click", function () {
      closePopup(pinEntryPopup);
      showSavingsConfirmation();
    });

    submitButton.addEventListener("click", function () {
      if (!submitButton.disabled) {
        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");
        savingsState.pin = pin;

        closePopup(pinEntryPopup);
        showSuccessMessage();
      }
    });
  }

  // Function to show success message
  function showSuccessMessage() {
    showPopup(successPopup);

    const accountNumber =
      "DPS" + Math.floor(10000000 + Math.random() * 90000000);
    const typeText = savingsState.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText =
      savingsState.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const amountText = `৳${savingsState.amount}`;

    // Update success content
    const successContent = document.getElementById("success-content");
    successContent.innerHTML = `
      <div class="success-icon">
        <i class="fas fa-check"></i>
      </div>
      
      <h2 class="success-title">অভিনন্দন!</h2>
      <p class="success-message">আপনার ${typeText} সেভিংস সফলভাবে খোলা হয়েছে</p>
      
      <div class="account-details-card">
        <div class="account-detail-row">
          <span class="account-label">সেভিংস অ্যাকাউন্ট নম্বর</span>
          <span class="account-value">${accountNumber}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">ব্যাংক</span>
          <span class="account-value">${savingsState.bank}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">ধরন</span>
          <span class="account-value">${frequencyText}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">জমার পরিমাণ</span>
          <span class="account-value">${amountText}</span>
        </div>
      </div>
      
      <div class="additional-info">
        <h4>আপনার সেভিংস সম্পর্কে বিস্তারিত</h4>
        <p>আপনার সেভিংস অ্যাকাউন্ট সফলভাবে খোলা হয়েছে। মেয়াদান্তে আপনি লাভসহ আপনার টাকা ফেরত পাবেন।</p>
        <p>কোনো সমস্যা হলে বিকাশ হটলাইন ১৬২৪৭ নম্বরে কল করুন।</p>
      </div>
    `;

    // Event listeners
    const okButton = successPopup.querySelector(".success-button");
    const downloadButton = successPopup.querySelector(
      ".success-button.download"
    );

    okButton.addEventListener("click", function () {
      closePopup(successPopup);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });

    downloadButton.addEventListener("click", function () {
      downloadSavingsDetails(savingsState, accountNumber);
    });
  }

  // Function to download savings details without embedding HTML
  function downloadSavingsDetails(state, accountNumber) {
    const typeText = state.type === "dps" ? "ডিপিএস" : "ইসলামিক ডিপিএস";
    const frequencyText = state.frequency === "weekly" ? "সাপ্তাহিক" : "মাসিক";
    const tenureText = `${state.tenure} মাস`;

    // Create document programmatically rather than embedding HTML
    const createSavingsDocumentTemplate = function (data) {
      // Create container for saved document elements
      const documentContainer = document.createElement("div");

      // Create logo container
      const logoDiv = document.createElement("div");
      logoDiv.className = "logo";
      const logoImg = document.createElement("img");
      logoImg.src = "/public/images/bkashlogo.png";
      logoImg.alt = "বিকাশ লোগো";
      logoDiv.appendChild(logoImg);
      documentContainer.appendChild(logoDiv);

      // Create header container
      const headerDiv = document.createElement("div");
      headerDiv.className = "header";

      // Add header elements
      const headerTitle = document.createElement("h1");
      headerTitle.textContent = "বিকাশ সেভিংস";
      headerDiv.appendChild(headerTitle);

      const headerSubtitle = document.createElement("h2");
      headerSubtitle.textContent = data.typeText;
      headerDiv.appendChild(headerSubtitle);

      const successBadge = document.createElement("div");
      successBadge.className = "success-badge";
      successBadge.textContent = "সফলভাবে খোলা হয়েছে";
      headerDiv.appendChild(successBadge);

      documentContainer.appendChild(headerDiv);

      // Create account number section
      const confirmationDiv = document.createElement("div");
      confirmationDiv.className = "confirmation-number";

      const confirmationText = document.createElement("p");
      confirmationText.textContent = "আপনার সেভিংস অ্যাকাউন্ট নম্বর";
      confirmationDiv.appendChild(confirmationText);

      const confirmationNumber = document.createElement("strong");
      confirmationNumber.textContent = data.accountNumber;
      confirmationDiv.appendChild(confirmationNumber);

      documentContainer.appendChild(confirmationDiv);

      // Create details section
      const detailsDiv = document.createElement("div");
      detailsDiv.className = "details";

      // Add bank detail
      const bankRow = document.createElement("div");
      bankRow.className = "detail-row";

      const bankLabel = document.createElement("span");
      bankLabel.className = "detail-label";
      bankLabel.textContent = "ব্যাংক";
      bankRow.appendChild(bankLabel);

      const bankValue = document.createElement("span");
      bankValue.className = "detail-value";
      bankValue.textContent = data.bank;
      bankRow.appendChild(bankValue);

      detailsDiv.appendChild(bankRow);

      // Add savings type detail
      const typeRow = document.createElement("div");
      typeRow.className = "detail-row";

      const typeLabel = document.createElement("span");
      typeLabel.className = "detail-label";
      typeLabel.textContent = "সেভিংসের ধরন";
      typeRow.appendChild(typeLabel);

      const typeValue = document.createElement("span");
      typeValue.className = "detail-value";
      typeValue.textContent = data.typeText;
      typeRow.appendChild(typeValue);

      detailsDiv.appendChild(typeRow);

      // Add frequency detail
      const freqRow = document.createElement("div");
      freqRow.className = "detail-row";

      const freqLabel = document.createElement("span");
      freqLabel.className = "detail-label";
      freqLabel.textContent = "ফ্রিকোয়েন্সি";
      freqRow.appendChild(freqLabel);

      const freqValue = document.createElement("span");
      freqValue.className = "detail-value";
      freqValue.textContent = data.frequencyText;
      freqRow.appendChild(freqValue);

      detailsDiv.appendChild(freqRow);

      // Add tenure detail
      const tenureRow = document.createElement("div");
      tenureRow.className = "detail-row";

      const tenureLabel = document.createElement("span");
      tenureLabel.className = "detail-label";
      tenureLabel.textContent = "মেয়াদ";
      tenureRow.appendChild(tenureLabel);

      const tenureValue = document.createElement("span");
      tenureValue.className = "detail-value";
      tenureValue.textContent = data.tenureText;
      tenureRow.appendChild(tenureValue);

      detailsDiv.appendChild(tenureRow);

      // Add amount detail
      const amountRow = document.createElement("div");
      amountRow.className = "detail-row";

      const amountLabel = document.createElement("span");
      amountLabel.className = "detail-label";
      amountLabel.textContent = "জমার পরিমাণ";
      amountRow.appendChild(amountLabel);

      const amountValue = document.createElement("span");
      amountValue.className = "detail-value";
      amountValue.textContent = `৳${data.amount}`;
      amountRow.appendChild(amountValue);

      detailsDiv.appendChild(amountRow);

      // Add date detail
      const dateRow = document.createElement("div");
      dateRow.className = "detail-row";

      const dateLabel = document.createElement("span");
      dateLabel.className = "detail-label";
      dateLabel.textContent = "তারিখ";
      dateRow.appendChild(dateLabel);

      const dateValue = document.createElement("span");
      dateValue.className = "detail-value";
      dateValue.textContent = new Date().toLocaleDateString("bn-BD");
      dateRow.appendChild(dateValue);

      detailsDiv.appendChild(dateRow);

      documentContainer.appendChild(detailsDiv);

      // Create footer
      const footerDiv = document.createElement("div");
      footerDiv.className = "footer";

      const footerText1 = document.createElement("p");
      footerText1.textContent =
        "এই ডকুমেন্টটি আপনার বিকাশ সেভিংস একাউন্টের প্রমাণ হিসেবে ব্যবহার করা যাবে।";
      footerDiv.appendChild(footerText1);

      const footerText2 = document.createElement("p");
      footerText2.textContent = "বিস্তারিত তথ্যের জন্য কল করুন: ১৬২৪৭";
      footerDiv.appendChild(footerText2);

      const footerText3 = document.createElement("p");
      footerText3.textContent = `© ${new Date().getFullYear()} বিকাশ লিমিটেড`;
      footerDiv.appendChild(footerText3);

      documentContainer.appendChild(footerDiv);

      // Generate CSS styles
      const styles = `
        body {
          font-family: 'Hind Siliguri', sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }
        .header h1 {
          color: #38ef7d;
          margin-bottom: 5px;
          font-size: 28px;
        }
        .header h2 {
          color: #333;
          font-size: 22px;
          margin-top: 0;
        }
        .success-badge {
          display: inline-block;
          background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          margin-top: 10px;
        }
        .details {
          margin: 30px 0;
          background-color: #f9f9f9;
          border-radius: 12px;
          padding: 20px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          color: #666;
          font-size: 15px;
        }
        .detail-value {
          font-weight: 600;
          color: #333;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          color: #666;
          font-size: 14px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .logo {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo img {
          height: 40px;
        }
        .confirmation-number {
          background-color: #f1f9f6;
          border: 1px dashed #38ef7d;
          padding: 15px;
          text-align: center;
          border-radius: 8px;
          margin: 20px 0;
        }
        .confirmation-number p {
          margin: 0;
          color: #333;
          font-size: 14px;
        }
        .confirmation-number strong {
          display: block;
          font-size: 18px;
          color: #11998e;
          margin-top: 5px;
        }
      `;

      // Return complete HTML document
      return `<!DOCTYPE html>
        <html lang="bn">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>বিকাশ সেভিংস - ${data.typeText}</title>
          <style>${styles}</style>
        </head>
        <body>
          <div class="container">
            ${documentContainer.innerHTML}
          </div>
        </body>
        </html>
      `;
    };

    // Prepare data for template
    const templateData = {
      accountNumber: accountNumber,
      typeText: typeText,
      frequencyText: frequencyText,
      tenureText: tenureText,
      bank: state.bank,
      amount: state.amount,
    };

    // Generate document HTML
    const htmlContent = createSavingsDocumentTemplate(templateData);

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Savings_${accountNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // backend 

  let frequencyOptions1 = savingsDetailsPopup.querySelectorAll(".frequency-options");

  frequencyOptions1.forEach(function(item){

    item.addEventListener("click" , function(e){

    // console.dir(e.target.dataset.value) ;
    type = e.target.dataset.value ;

  })

  })

      const bankSelectionContainer1 = document.getElementById(
      "bank-selection-container"
    );

  bankSelectionContainer1.addEventListener("click" , function(e){
  bankName = e.target.closest('.bank-item')?.querySelector('.bank-name')?.innerText;

})


    const submitButton1 = pinEntryPopup.querySelector(".submit-pin-button");
    submitButton1.addEventListener("click", function () {

      let pin = document.querySelectorAll(".pin-input") ;
    let fullPin = "" ;
    pin.forEach(function(item){

      fullPin += item.value ;

    }) ;

      console.log("ali reaches") ;
      console.log(nameOfSavings,savingsAmount,duration,type,fullPin,bankName) ;

        fetch("http://localhost:3000/savings" , {

          method : "POST" ,
          headers : {
            "content-type" : "application/json"
          } ,
          body : JSON.stringify({

            nameOfSavings : nameOfSavings ,
            type : type ,
            duration : duration ,
            savingsAmount : savingsAmount ,
            bankName : bankName ,
            pin : fullPin

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

});
