// Corporate & Enterprise Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const corporateFormPopup = document.getElementById("corporate-form-popup");
  const corporateDetailsPopup = document.getElementById(
    "corporate-details-popup"
  );
  const corporateSuccessPopup = document.getElementById(
    "corporate-success-popup"
  );

  // Get all close buttons
  const corporatePopupClose = document.getElementById("corporate-popup-close");
  const corporateDetailsClose = document.getElementById(
    "corporate-details-close"
  );
  const corporateSuccessClose = document.getElementById(
    "corporate-success-close"
  );
  const corporateSuccessCloseButton = document.getElementById(
    "corporate-success-close-button"
  );

  // Get corporate form
  const corporateForm = document.getElementById("corporate-application-form");

  // Get corporate button from section
  const corporateButton = document.querySelector("#corporate .btn-sign-up");

  // Action buttons
  const proceedToSuccessBtn = document.getElementById(
    "corporate-proceed-to-success"
  );

  // Show corporate form popup when corporate button is clicked
  if (corporateButton) {
    corporateButton.addEventListener("click", function (e) {
      e.preventDefault();
      corporateFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (corporatePopupClose) {
    corporatePopupClose.addEventListener("click", function () {
      corporateFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (corporateDetailsClose) {
    corporateDetailsClose.addEventListener("click", function () {
      corporateDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (corporateSuccessClose) {
    corporateSuccessClose.addEventListener("click", function () {
      corporateSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (corporateSuccessCloseButton) {
    corporateSuccessCloseButton.addEventListener("click", function () {
      corporateSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Handle corporate form submission
  if (corporateForm) {
    corporateForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate if at least one service is selected
      const services = document.querySelectorAll(
        'input[name="service-requirements[]"]:checked'
      );
      if (services.length === 0) {
        // Show validation message if no service is selected
        const serviceCheckboxGroup = document.querySelector(".checkbox-group");
        let validationMessage = document.getElementById(
          "service-validation-message"
        );

        if (!validationMessage) {
          validationMessage = document.createElement("div");
          validationMessage.id = "service-validation-message";
          validationMessage.style.color = "#e2146c";
          validationMessage.style.marginTop = "8px";
          validationMessage.style.fontSize = "14px";
          validationMessage.textContent =
            "অনুগ্রহ করে কমপক্ষে একটি সার্ভিস নির্বাচন করুন";
          serviceCheckboxGroup.parentNode.appendChild(validationMessage);
        }

        // Scroll to the validation message
        validationMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      // Get form data
      const corporateName = document.getElementById("corporate-name").value;
      const corporateType = document.getElementById("corporate-type");
      const industry = document.getElementById("industry");
      const revenue = document.getElementById("annual-revenue");
      const employees = document.getElementById("employee-count");
      const district = document.getElementById("corporate-district");
      const area = document.getElementById("corporate-area");
      const address = document.getElementById("corporate-address").value;
      const tin = document.getElementById("business-tin").value;
      const contactPerson = document.getElementById(
        "contact-person-name"
      ).value;
      const designation = document.getElementById("corporate-designation");
      const phone = document.getElementById("corporate-phone").value;
      const email = document.getElementById("corporate-email").value;
      const transaction = document.getElementById("monthly-transaction");

      // Get selected services
      const serviceRequirements = [];
      services.forEach(function (checkbox) {
        serviceRequirements.push(checkbox.nextElementSibling.textContent);
      });

      // Update details in the details popup
      document.getElementById("detail-corporate-name").textContent =
        corporateName;
      document.getElementById("detail-corporate-type").textContent =
        corporateType.options[corporateType.selectedIndex].text;
      document.getElementById("detail-industry").textContent =
        industry.options[industry.selectedIndex].text;
      document.getElementById("detail-revenue").textContent =
        revenue.options[revenue.selectedIndex].text;
      document.getElementById("detail-employees").textContent =
        employees.options[employees.selectedIndex].text;
      document.getElementById("detail-address").textContent = address;
      document.getElementById("detail-tin").textContent = tin;
      document.getElementById("detail-contact-person").textContent =
        contactPerson;
      document.getElementById("detail-designation").textContent =
        designation.options[designation.selectedIndex].text;
      document.getElementById("detail-phone").textContent = phone;
      document.getElementById("detail-email").textContent = email;
      document.getElementById("detail-services").textContent =
        serviceRequirements.join(", ");
      document.getElementById("detail-transaction").textContent =
        transaction.options[transaction.selectedIndex].text;

      // Hide the form popup and show the details popup
      corporateFormPopup.classList.remove("active");
      corporateDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "CORP-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("corporate-application-ref").textContent =
        refNumber;

      // Hide details popup and show success popup
      corporateDetailsPopup.classList.remove("active");
      corporateSuccessPopup.classList.add("active");
    });
  }

  // Add form field animations and highlighting
  const formInputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea"
  );

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

  // Add service checkbox validation
  const serviceCheckboxes = document.querySelectorAll(
    'input[name="service-requirements[]"]'
  );

  serviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const validationMessage = document.getElementById(
        "service-validation-message"
      );
      if (validationMessage) {
        // Remove validation message if at least one checkbox is checked
        const checkedServices = document.querySelectorAll(
          'input[name="service-requirements[]"]:checked'
        );
        if (checkedServices.length > 0) {
          validationMessage.remove();
        }
      }
    });
  });

  // Add smooth transition effects to popup
  function addPopupTransitions() {
    const popups = [
      corporateFormPopup,
      corporateDetailsPopup,
      corporateSuccessPopup,
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

  // Close popups when clicking outside of content
  window.addEventListener("click", function (e) {
    if (e.target === corporateFormPopup) {
      corporateFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === corporateDetailsPopup) {
      corporateDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === corporateSuccessPopup) {
      corporateSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });

  // Add form field autocompletion/validation enhancements
  const corporatePhone = document.getElementById("corporate-phone");
  if (corporatePhone) {
    corporatePhone.addEventListener("input", function () {
      // Format phone number automatically (e.g., add hyphen)
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

  // Enhance TIN field validation
  const businessTin = document.getElementById("business-tin");
  if (businessTin) {
    businessTin.addEventListener("input", function () {
      // Allow only numbers and hyphens
      this.value = this.value.replace(/[^\d-]/g, "");
    });
  }
});
