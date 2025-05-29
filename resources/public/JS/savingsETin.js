document.addEventListener("DOMContentLoaded", function () {
  // Find the specific savings option for tax certificate
  const taxCertificateOption = Array.from(
    document.querySelectorAll(".savings-option")
  ).find((option) =>
    option.querySelector(".option-text p").textContent.includes("আয়কর সনদ")
  );

  // Modal elements
  const modalOverlay = document.getElementById("modalOverlay");
  const etinInfoPopup = document.getElementById("etinInfoPopup");
  const etinInfoDetailPopup = document.getElementById("etinInfoDetailPopup");
  const etinEntryPopup = document.getElementById("etinEntryPopup");
  const etinConfirmationPopup = document.getElementById(
    "etinConfirmationPopup"
  );
  const etinPinEntryPopup = document.getElementById("etinPinEntryPopup");
  const etinSuccessPopup = document.getElementById("etinSuccessPopup");

  // ETIN data state
  let etinData = {
    etinNumber: "",
    mobileNumber: "",
    certificateType: "",
    pin: "",
  };

  if (taxCertificateOption) {
    // Replace existing event listener
    taxCertificateOption.replaceWith(taxCertificateOption.cloneNode(true));
    const newTaxOption = Array.from(
      document.querySelectorAll(".savings-option")
    ).find((option) =>
      option.querySelector(".option-text p").textContent.includes("আয়কর সনদ")
    );

    newTaxOption.addEventListener("click", function () {
      showEtinInfoPopup();
    });
  }

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

  // Stage 1: Show E-TIN information popup
  function showEtinInfoPopup() {
    showPopup(etinInfoPopup);

    // Event listeners
    const backButton = etinInfoPopup.querySelector(".back-button-btn");
    const etinOption = etinInfoPopup.querySelector(".etin-option");
    const etinHelp = etinInfoPopup.querySelector(".etin-help");

    backButton.addEventListener("click", function () {
      closePopup(etinInfoPopup);
    });

    etinOption.addEventListener("click", function () {
      closePopup(etinInfoPopup);
      showEtinEntryPopup();
    });

    etinHelp.addEventListener("click", function () {
      closePopup(etinInfoPopup);
      showEtinInfoDetailPopup();
    });
  }

  // Show E-TIN information detail popup
  function showEtinInfoDetailPopup() {
    showPopup(etinInfoDetailPopup);

    // Back button functionality
    const backButton = etinInfoDetailPopup.querySelector(".back-button-btn");
    backButton.addEventListener("click", function () {
      closePopup(etinInfoDetailPopup);
      showEtinInfoPopup(); // Return to the main E-TIN popup
    });
  }

  // Stage 2: Show E-TIN entry form
  function showEtinEntryPopup() {
    showPopup(etinEntryPopup);

    // Event listeners
    const backButton = etinEntryPopup.querySelector(".back-button-btn");
    const etinInput = etinEntryPopup.querySelector(".etin-input");
    const mobileInput = etinEntryPopup.querySelector(".mobile-input");
    const certTypeSelect = etinEntryPopup.querySelector(".cert-type-select");
    const certTypeOptions = etinEntryPopup.querySelector(".cert-type-options");
    const verifyButton = etinEntryPopup.querySelector(".verify-button");

    // Reset form
    etinInput.value = "";
    mobileInput.value = "";
    certTypeSelect.textContent = "ধরন বেছে নিন";
    verifyButton.disabled = true;
    let selectedType = null;

    backButton.addEventListener("click", function () {
      closePopup(etinEntryPopup);
      showEtinInfoPopup();
    });

    // E-TIN input validation
    etinInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 12);
      validateForm();
    });

    // Mobile input validation
    mobileInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
      validateForm();
    });

    // Certificate type selection
    certTypeSelect.addEventListener("click", function () {
      certTypeOptions.style.display =
        certTypeOptions.style.display === "block" ? "none" : "block";
    });

    certTypeOptions.querySelectorAll(".dropdown-option").forEach((option) => {
      option.addEventListener("click", function () {
        selectedType = this.getAttribute("data-value");
        certTypeSelect.textContent = this.textContent;
        certTypeOptions.style.display = "none";
        validateForm();
      });
    });

    // Form validation
    function validateForm() {
      const isValid =
        etinInput.value.length === 12 &&
        mobileInput.value.length === 11 &&
        selectedType !== null;

      verifyButton.disabled = !isValid;
      if (isValid) {
        verifyButton.style.background =
          "linear-gradient(135deg, #1c2e58 0%, #112555 100%)";
        verifyButton.style.cursor = "pointer";
      } else {
        verifyButton.style.background =
          "linear-gradient(135deg, #cccccc 0%, #999999 100%)";
        verifyButton.style.cursor = "not-allowed";
      }
    }

    // Submit button click
    verifyButton.addEventListener("click", function () {
      if (!verifyButton.disabled) {
        etinData = {
          etinNumber: etinInput.value,
          mobileNumber: mobileInput.value,
          certificateType: selectedType,
        };
        closePopup(etinEntryPopup);
        showConfirmationPopup();
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
          certTypeOptions.style.display = "none";
        }
      },
      { capture: true }
    );
  }

  // Stage 3: Show confirmation page
  function showConfirmationPopup() {
    showPopup(etinConfirmationPopup);

    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    // Update summary section
    const summarySection = document.getElementById("etin-summary");
    summarySection.innerHTML = `
      <div class="summary-item">
        <span class="summary-label">ই-টিন নম্বর</span>
        <span class="summary-value">${etinData.etinNumber}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">মোবাইল নম্বর</span>
        <span class="summary-value">${etinData.mobileNumber}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">সনদের ধরন</span>
        <span class="summary-value">${certTypeText}</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">সার্ভিস চার্জ</span>
        <span class="summary-value highlight">৳৫০</span>
      </div>
    `;

    // Event listeners
    const backButton = etinConfirmationPopup.querySelector(".back-button-btn");
    const confirmButton =
      etinConfirmationPopup.querySelector(".confirm-button");

    backButton.addEventListener("click", function () {
      closePopup(etinConfirmationPopup);
      showEtinEntryPopup();
    });

    confirmButton.addEventListener("click", function () {
      closePopup(etinConfirmationPopup);
      showPinEntryPopup();
    });
  }

  // Stage 4: Show PIN entry page
  function showPinEntryPopup() {
    showPopup(etinPinEntryPopup);

    // Reset PIN inputs
    const pinInputs = etinPinEntryPopup.querySelectorAll(".pin-input");
    pinInputs.forEach((input) => {
      input.value = "";
    });

    // PIN entry logic
    const submitButton = etinPinEntryPopup.querySelector(".submit-pin-button");
    const backButton = etinPinEntryPopup.querySelector(".back-button-btn");
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
      closePopup(etinPinEntryPopup);
      showConfirmationPopup();
    });

    submitButton.addEventListener("click", function () {
      if (!submitButton.disabled) {
        const pin = Array.from(pinInputs)
          .map((input) => input.value)
          .join("");
        etinData.pin = pin;
        closePopup(etinPinEntryPopup);
        showSuccessPage();
      }
    });
  }

  // Stage 5: Show success page
  function showSuccessPage() {
    showPopup(etinSuccessPopup);

    const certificateNumber =
      "CERT" + Math.floor(10000000 + Math.random() * 90000000);
    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    // Update success content
    const successContent = document.getElementById("etin-success-content");
    successContent.innerHTML = `
      <div class="success-icon">
        <i class="fas fa-check"></i>
      </div>
      
      <h2 class="success-title">অভিনন্দন!</h2>
      <p class="success-message">আপনার ${certTypeText} সফলভাবে প্রস্তুত হয়েছে</p>
      
      <div class="account-details-card">
        <div class="account-detail-row">
          <span class="account-label">সনদ নম্বর</span>
          <span class="account-value">${certificateNumber}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">ই-টিন নম্বর</span>
          <span class="account-value">${etinData.etinNumber}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">সনদের ধরন</span>
          <span class="account-value">${certTypeText}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">তারিখ</span>
          <span class="account-value">${new Date().toLocaleDateString(
            "bn-BD"
          )}</span>
        </div>
        <div class="account-detail-row">
          <span class="account-label">সার্ভিস চার্জ</span>
          <span class="account-value">৳৫০</span>
        </div>
      </div>
      
      <div class="additional-info">
        <h4>আপনার সনদ সম্পর্কে বিস্তারিত</h4>
        <p>আপনার ${certTypeText} সফলভাবে তৈরি করা হয়েছে। এই সনদ ব্যবহার করে আপনি বিভিন্ন প্রতিষ্ঠানে প্রয়োজনীয় কাজ করতে পারবেন।</p>
        <p>কোনো সমস্যা হলে বিকাশ হটলাইন ১৬২৪৭ নম্বরে কল করুন।</p>
      </div>
    `;

    // Event listeners
    const okButton = etinSuccessPopup.querySelector(".success-button");
    const downloadButton = etinSuccessPopup.querySelector(
      ".success-button.download"
    );

    okButton.addEventListener("click", function () {
      closePopup(etinSuccessPopup);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });

    downloadButton.addEventListener("click", function () {
      downloadCertificate(etinData, certificateNumber);
    });
  }

  // Function to generate and download certificate
  function downloadCertificate(etinData, certificateNumber) {
    const certTypeText = {
      return: "রিটার্ন সনদ",
      tax: "আয়কর সনদ",
      both: "উভয় সনদ",
    }[etinData.certificateType];

    // This function creates a dynamic certificate template
    // but without embedding the full HTML in the JS file
    const createCertificateTemplate = function (data) {
      // Get the template container
      const templateContainer = document.createElement("div");

      // Set the document title
      const title = document.createElement("title");
      title.textContent = `বিকাশ ${data.certTypeText} - ${data.certificateNumber}`;

      // Create the certificate structure using DOM methods
      // This avoids having HTML embedded in JavaScript
      const container = document.createElement("div");
      container.className = "certificate-container";

      // Add watermark
      const watermark = document.createElement("div");
      watermark.className = "certificate-watermark";
      watermark.textContent = "বিকাশ";
      container.appendChild(watermark);

      // Add header with logo and title
      const header = document.createElement("div");
      header.className = "certificate-header";

      const logo = document.createElement("img");
      logo.src = "/public/images/bkashlogo.png";
      logo.className = "certificate-logo";
      logo.alt = "বিকাশ লোগো";
      header.appendChild(logo);

      const certTitle = document.createElement("h1");
      certTitle.className = "certificate-title";
      certTitle.textContent = data.certTypeText;
      header.appendChild(certTitle);

      const subtitle = document.createElement("p");
      subtitle.className = "certificate-subtitle";
      subtitle.textContent = `Certificate Number: ${data.certificateNumber}`;
      header.appendChild(subtitle);

      container.appendChild(header);

      // Add certificate body with taxpayer information
      const body = document.createElement("div");
      body.className = "certificate-body";

      // Add taxpayer section
      const taxpayerSection = document.createElement("div");
      taxpayerSection.className = "certificate-section";

      const taxpayerTitle = document.createElement("h2");
      taxpayerTitle.className = "section-title";
      taxpayerTitle.textContent = "করদাতার তথ্য";
      taxpayerSection.appendChild(taxpayerTitle);

      const infoGrid = document.createElement("div");
      infoGrid.className = "info-grid";

      // Add E-TIN info
      const etinItem = document.createElement("div");
      etinItem.className = "info-item";
      const etinLabel = document.createElement("div");
      etinLabel.className = "info-label";
      etinLabel.textContent = "ই-টিন নম্বর";
      const etinValue = document.createElement("div");
      etinValue.className = "info-value";
      etinValue.textContent = data.etinNumber;
      etinItem.appendChild(etinLabel);
      etinItem.appendChild(etinValue);
      infoGrid.appendChild(etinItem);

      // Add Mobile number info
      const mobileItem = document.createElement("div");
      mobileItem.className = "info-item";
      const mobileLabel = document.createElement("div");
      mobileLabel.className = "info-label";
      mobileLabel.textContent = "মোবাইল নম্বর";
      const mobileValue = document.createElement("div");
      mobileValue.className = "info-value";
      mobileValue.textContent = data.mobileNumber;
      mobileItem.appendChild(mobileLabel);
      mobileItem.appendChild(mobileValue);
      infoGrid.appendChild(mobileItem);

      // Add issue date info
      const dateItem = document.createElement("div");
      dateItem.className = "info-item";
      const dateLabel = document.createElement("div");
      dateLabel.className = "info-label";
      dateLabel.textContent = "ইস্যু করার তারিখ";
      const dateValue = document.createElement("div");
      dateValue.className = "info-value";
      dateValue.textContent = new Date().toLocaleDateString("bn-BD");
      dateItem.appendChild(dateLabel);
      dateItem.appendChild(dateValue);
      infoGrid.appendChild(dateItem);

      // Add validity info
      const validityItem = document.createElement("div");
      validityItem.className = "info-item";
      const validityLabel = document.createElement("div");
      validityLabel.className = "info-label";
      validityLabel.textContent = "বৈধতার মেয়াদ";
      const validityValue = document.createElement("div");
      validityValue.className = "info-value";
      validityValue.textContent = "১ বছর";
      validityItem.appendChild(validityLabel);
      validityItem.appendChild(validityValue);
      infoGrid.appendChild(validityItem);

      taxpayerSection.appendChild(infoGrid);
      body.appendChild(taxpayerSection);

      // Add certificate type specific sections
      if (
        data.certificateType === "return" ||
        data.certificateType === "both"
      ) {
        // Add return section
        const returnSection = document.createElement("div");
        returnSection.className = "certificate-section";

        const returnTitle = document.createElement("h2");
        returnTitle.className = "section-title";
        returnTitle.textContent = "রিটার্ন তথ্য";
        returnSection.appendChild(returnTitle);

        const returnGrid = document.createElement("div");
        returnGrid.className = "info-grid";

        // Year info
        const yearItem = document.createElement("div");
        yearItem.className = "info-item";
        const yearLabel = document.createElement("div");
        yearLabel.className = "info-label";
        yearLabel.textContent = "আয়বর্ষ";
        const yearValue = document.createElement("div");
        yearValue.className = "info-value";
        yearValue.textContent = "২০২৪-২০২৫";
        yearItem.appendChild(yearLabel);
        yearItem.appendChild(yearValue);
        returnGrid.appendChild(yearItem);

        // Filing date info
        const filingItem = document.createElement("div");
        filingItem.className = "info-item";
        const filingLabel = document.createElement("div");
        filingLabel.className = "info-label";
        filingLabel.textContent = "রিটার্ন দাখিলের তারিখ";
        const filingValue = document.createElement("div");
        filingValue.className = "info-value";
        filingValue.textContent = new Date().toLocaleDateString("bn-BD");
        filingItem.appendChild(filingLabel);
        filingItem.appendChild(filingValue);
        returnGrid.appendChild(filingItem);

        returnSection.appendChild(returnGrid);
        body.appendChild(returnSection);
      }

      if (data.certificateType === "tax" || data.certificateType === "both") {
        // Add tax section
        const taxSection = document.createElement("div");
        taxSection.className = "certificate-section";

        const taxTitle = document.createElement("h2");
        taxTitle.className = "section-title";
        taxTitle.textContent = "আয়কর তথ্য";
        taxSection.appendChild(taxTitle);

        const taxGrid = document.createElement("div");
        taxGrid.className = "info-grid";

        // Payment date info
        const paymentItem = document.createElement("div");
        paymentItem.className = "info-item";
        const paymentLabel = document.createElement("div");
        paymentLabel.className = "info-label";
        paymentLabel.textContent = "আয়কর প্রদানের তারিখ";
        const paymentValue = document.createElement("div");
        paymentValue.className = "info-value";
        paymentValue.textContent = new Date().toLocaleDateString("bn-BD");
        paymentItem.appendChild(paymentLabel);
        paymentItem.appendChild(paymentValue);
        taxGrid.appendChild(paymentItem);

        // Amount info
        const amountItem = document.createElement("div");
        amountItem.className = "info-item";
        const amountLabel = document.createElement("div");
        amountLabel.className = "info-label";
        amountLabel.textContent = "আয়কর পরিমাণ";
        const amountValue = document.createElement("div");
        amountValue.className = "info-value";
        amountValue.textContent = "৳২৫,০০০";
        amountItem.appendChild(amountLabel);
        amountItem.appendChild(amountValue);
        taxGrid.appendChild(amountItem);

        taxSection.appendChild(taxGrid);
        body.appendChild(taxSection);
      }

      container.appendChild(body);

      // Add QR code placeholder
      const qrCode = document.createElement("div");
      qrCode.className = "qr-code";
      qrCode.textContent = "QR Code";
      container.appendChild(qrCode);

      // Add footer
      const footer = document.createElement("div");
      footer.className = "certificate-footer";

      const footerText1 = document.createElement("p");
      footerText1.textContent =
        "এই সনদটি বিকাশ ডিজিটাল প্ল্যাটফর্মের মাধ্যমে স্বয়ংক্রিয়ভাবে তৈরি করা হয়েছে";
      footer.appendChild(footerText1);

      const footerText2 = document.createElement("p");
      footerText2.textContent =
        "হেল্পলাইন: ১৬২৪৭ | ইমেইল: support@bkash.com | ওয়েবসাইট: www.bkash.com";
      footer.appendChild(footerText2);

      const footerText3 = document.createElement("p");
      footerText3.textContent =
        "এই সনদটি শুধুমাত্র ১ বছরের জন্য বৈধ। যাচাইকরণের জন্য ভিজিট করুন: www.bkash.com/verify";
      footerText3.style.marginTop = "10px";
      footerText3.style.fontSize = "10px";
      footer.appendChild(footerText3);

      container.appendChild(footer);

      templateContainer.appendChild(container);

      // Return the document HTML
      // This is generated programmatically rather than as an embedded HTML string
      return `
      <!DOCTYPE html>
      <html lang="bn">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title.textContent}</title>
        <link rel="stylesheet" href="/public/CSS/certificate.css">
      </head>
      <body>
        ${templateContainer.innerHTML}
      </body>
      </html>
      `;
    };

    // Prepare the data for the certificate
    const certificateData = {
      certificateNumber: certificateNumber,
      certTypeText: certTypeText,
      etinNumber: etinData.etinNumber,
      mobileNumber: etinData.mobileNumber,
      certificateType: etinData.certificateType,
    };

    // Generate the certificate HTML
    const htmlContent = createCertificateTemplate(certificateData);

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_${certTypeText}_${certificateNumber}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
});
