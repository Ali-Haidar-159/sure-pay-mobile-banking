// Supplier Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const supplierFormPopup = document.getElementById("supplier-form-popup");
  const supplierDetailsPopup = document.getElementById(
    "supplier-details-popup"
  );
  const supplierSuccessPopup = document.getElementById(
    "supplier-success-popup"
  );

  // Get all close buttons
  const supplierPopupClose = document.getElementById("supplier-popup-close");
  const supplierDetailsClose = document.getElementById(
    "supplier-details-close"
  );
  const supplierSuccessClose = document.getElementById(
    "supplier-success-close"
  );
  const supplierSuccessCloseButton = document.getElementById(
    "supplier-success-close-button"
  );

  // Get supplier form
  const supplierForm = document.getElementById("supplier-application-form");

  // Get supplier button from section
  const supplierButton = document.querySelector("#supplier .btn-sign-up");

  // Action buttons
  const proceedToSuccessBtn = document.getElementById(
    "supplier-proceed-to-success"
  );

  // Show supplier form popup when supplier button is clicked
  if (supplierButton) {
    supplierButton.addEventListener("click", function (e) {
      e.preventDefault();
      supplierFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (supplierPopupClose) {
    supplierPopupClose.addEventListener("click", function () {
      supplierFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (supplierDetailsClose) {
    supplierDetailsClose.addEventListener("click", function () {
      supplierDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (supplierSuccessClose) {
    supplierSuccessClose.addEventListener("click", function () {
      supplierSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (supplierSuccessCloseButton) {
    supplierSuccessCloseButton.addEventListener("click", function () {
      supplierSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Get yes/no value in Bengali
  function getYesNoValueHtml(value) {
    if (value === "yes") {
      return '<span class="yes-value">হ্যাঁ</span>';
    } else {
      return '<span class="no-value">না</span>';
    }
  }

  // Handle supplier form submission
  if (supplierForm) {
    supplierForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const supplierName = document.getElementById("supplier-name").value;
      const contactAddress = document.getElementById("contact-address").value;
      const contactName = document.getElementById("contact-name").value;
      const phone = document.getElementById("phone-number").value;
      const email = document.getElementById("email").value;
      const industrySector = document.getElementById("industry-sector").value;
      const productType = document.getElementById("product-type").value;
      const digitalSignature =
        document.getElementById("digital-signature").value;
      const brandName = document.getElementById("brand-name").value;
      const specialCategories =
        document.getElementById("special-categories").value;

      // Get yes/no values
      const tradeLicense = document.querySelector(
        'input[name="trade-license"]:checked'
      ).value;
      const tinCertificate = document.querySelector(
        'input[name="tin-certificate"]:checked'
      ).value;
      const vatCertificate = document.querySelector(
        'input[name="vat-certificate"]:checked'
      ).value;
      const clientList = document.querySelector(
        'input[name="client-list"]:checked'
      ).value;
      const bankCertificate = document.querySelector(
        'input[name="bank-certificate"]:checked'
      ).value;
      const financialCertificate = document.querySelector(
        'input[name="financial-certificate"]:checked'
      ).value;
      const companyProfile = document.querySelector(
        'input[name="company-profile"]:checked'
      ).value;

      // Update details in the details popup
      document.getElementById("detail-supplier-name").textContent =
        supplierName;
      document.getElementById("detail-contact-address").textContent =
        contactAddress || "প্রদান করা হয়নি";
      document.getElementById("detail-contact-name").textContent = contactName;
      document.getElementById("detail-phone").textContent = phone;
      document.getElementById("detail-email").textContent = email;
      document.getElementById("detail-industry-sector").textContent =
        industrySector;
      document.getElementById("detail-product-type").textContent = productType;
      document.getElementById("detail-digital-signature").textContent =
        digitalSignature || "প্রদান করা হয়নি";
      document.getElementById("detail-brand-name").textContent =
        brandName || "প্রদান করা হয়নি";
      document.getElementById("detail-special-categories").textContent =
        specialCategories || "প্রদান করা হয়নি";

      // Update yes/no values with color coding
      document.getElementById("detail-trade-license").innerHTML =
        getYesNoValueHtml(tradeLicense);
      document.getElementById("detail-tin-certificate").innerHTML =
        getYesNoValueHtml(tinCertificate);
      document.getElementById("detail-vat-certificate").innerHTML =
        getYesNoValueHtml(vatCertificate);
      document.getElementById("detail-client-list").innerHTML =
        getYesNoValueHtml(clientList);
      document.getElementById("detail-bank-certificate").innerHTML =
        getYesNoValueHtml(bankCertificate);
      document.getElementById("detail-financial-certificate").innerHTML =
        getYesNoValueHtml(financialCertificate);
      document.getElementById("detail-company-profile").innerHTML =
        getYesNoValueHtml(companyProfile);

      // Hide the form popup and show the details popup
      supplierFormPopup.classList.remove("active");
      supplierDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "SUP-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("supplier-application-ref").textContent =
        refNumber;

      // Hide details popup and show success popup
      supplierDetailsPopup.classList.remove("active");
      supplierSuccessPopup.classList.add("active");
    });
  }

  // Add form field highlighting and animations
  const formInputs = document.querySelectorAll(".form-input, .form-textarea");

  formInputs.forEach((input) => {
    // Add focus class to parent when input is focused
    input.addEventListener("focus", function () {
      this.closest(".form-group").classList.add("input-focused");
    });

    // Remove focus class when input loses focus
    input.addEventListener("blur", function () {
      this.closest(".form-group").classList.remove("input-focused");
    });
  });

  // Add smooth transition effects to popup
  function addPopupTransitions() {
    const popups = [
      supplierFormPopup,
      supplierDetailsPopup,
      supplierSuccessPopup,
    ];

    popups.forEach((popup) => {
      if (popup) {
        popup.style.transition = "opacity 0.3s ease";

        // Get popup content
        const popupContent = popup.querySelector(".popup-content");
        if (popupContent) {
          popupContent.style.transition =
            "transform 0.3s ease, opacity 0.3s ease";
        }
      }
    });
  }

  addPopupTransitions();

  // Format phone number field
  const phoneField = document.getElementById("phone-number");
  if (phoneField) {
    phoneField.addEventListener("input", function () {
      // Format phone number automatically
      let phoneNumber = this.value.replace(/\D/g, ""); // Remove non-digits

      // Ensure it starts with "01"
      if (phoneNumber.length >= 2 && phoneNumber.substring(0, 2) !== "01") {
        phoneNumber = "01" + phoneNumber.substring(2);
      }

      // Limit to 11 digits (Bangladesh mobile number format)
      if (phoneNumber.length > 11) {
        phoneNumber = phoneNumber.substring(0, 11);
      }

      this.value = phoneNumber;
    });
  }

  // Close popups when clicking outside of content
  window.addEventListener("click", function (e) {
    if (e.target === supplierFormPopup) {
      supplierFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === supplierDetailsPopup) {
      supplierDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === supplierSuccessPopup) {
      supplierSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
