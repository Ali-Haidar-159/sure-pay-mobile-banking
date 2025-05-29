// Microfinance Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const microfinanceFormPopup = document.getElementById(
    "microfinance-form-popup"
  );
  const microfinanceDetailsPopup = document.getElementById(
    "microfinance-details-popup"
  );
  const microfinanceSuccessPopup = document.getElementById(
    "microfinance-success-popup"
  );

  // Get all close buttons
  const microfinancePopupClose = document.getElementById(
    "microfinance-popup-close"
  );
  const microfinanceDetailsClose = document.getElementById(
    "microfinance-details-close"
  );
  const microfinanceSuccessClose = document.getElementById(
    "microfinance-success-close"
  );
  const microfinanceSuccessCloseButton = document.getElementById(
    "microfinance-success-close-button"
  );

  // Get microfinance form
  const microfinanceForm = document.getElementById(
    "microfinance-application-form"
  );

  // Get microfinance button from section
  const microfinanceButton = document.querySelector(
    "#microfinance .btn-sign-up"
  );

  // Action buttons
  const proceedToSuccessBtn = document.getElementById(
    "microfinance-proceed-to-success"
  );

  // Show microfinance form popup when microfinance button is clicked
  if (microfinanceButton) {
    microfinanceButton.addEventListener("click", function (e) {
      e.preventDefault();
      microfinanceFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (microfinancePopupClose) {
    microfinancePopupClose.addEventListener("click", function () {
      microfinanceFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (microfinanceDetailsClose) {
    microfinanceDetailsClose.addEventListener("click", function () {
      microfinanceDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (microfinanceSuccessClose) {
    microfinanceSuccessClose.addEventListener("click", function () {
      microfinanceSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (microfinanceSuccessCloseButton) {
    microfinanceSuccessCloseButton.addEventListener("click", function () {
      microfinanceSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Handle microfinance form submission
  if (microfinanceForm) {
    microfinanceForm.addEventListener("submit", function (e) {
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
            "অনুগ্রহ করে কমপক্ষে একটি সেবা নির্বাচন করুন";
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
      const institutionName = document.getElementById("institution-name").value;
      const institutionType = document.getElementById("institution-type");
      const licenseNumber = document.getElementById("license-number").value;
      const branchCount = document.getElementById("branch-count");
      const clientCount = document.getElementById("client-count");
      const district = document.getElementById("district");
      const area = document.getElementById("area");
      const address = document.getElementById("head-office-address").value;
      const contactPerson = document.getElementById("contact-person").value;
      const designation = document.getElementById("designation");
      const phone = document.getElementById("phone-number").value;
      const email = document.getElementById("email").value;
      const transaction = document.getElementById("monthly-transaction");
      const software = document.getElementById("existing-software").value;

      // Get selected services
      const serviceRequirements = [];
      services.forEach(function (checkbox) {
        serviceRequirements.push(checkbox.nextElementSibling.textContent);
      });

      // Update details in the details popup
      document.getElementById("detail-institution-name").textContent =
        institutionName;
      document.getElementById("detail-institution-type").textContent =
        institutionType.options[institutionType.selectedIndex].text;
      document.getElementById("detail-license-number").textContent =
        licenseNumber;
      document.getElementById("detail-branch-count").textContent =
        branchCount.options[branchCount.selectedIndex].text;
      document.getElementById("detail-client-count").textContent =
        clientCount.options[clientCount.selectedIndex].text;
      document.getElementById("detail-address").textContent = address;
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
      document.getElementById("detail-software").textContent =
        software || "কোনো সফটওয়্যার উল্লেখ করা হয়নি";

      // Hide the form popup and show the details popup
      microfinanceFormPopup.classList.remove("active");
      microfinanceDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "MF-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("microfinance-application-ref").textContent =
        refNumber;

      // Hide details popup and show success popup
      microfinanceDetailsPopup.classList.remove("active");
      microfinanceSuccessPopup.classList.add("active");
    });
  }

  // Add form field highlighting and animations
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
      microfinanceFormPopup,
      microfinanceDetailsPopup,
      microfinanceSuccessPopup,
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
    if (e.target === microfinanceFormPopup) {
      microfinanceFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === microfinanceDetailsPopup) {
      microfinanceDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === microfinanceSuccessPopup) {
      microfinanceSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
