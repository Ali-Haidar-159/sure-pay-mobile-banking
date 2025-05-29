// Payroll Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const payrollFormPopup = document.getElementById("payroll-form-popup");
  const payrollDetailsPopup = document.getElementById("payroll-details-popup");
  const payrollSuccessPopup = document.getElementById("payroll-success-popup");

  // Get all close buttons
  const payrollPopupClose = document.getElementById("payroll-popup-close");
  const payrollDetailsClose = document.getElementById("payroll-details-close");
  const payrollSuccessClose = document.getElementById("payroll-success-close");
  const payrollSuccessCloseButton = document.getElementById(
    "payroll-success-close-button"
  );

  // Get payroll form
  const payrollForm = document.getElementById("payroll-application-form");

  // Get payroll button from section
  const payrollButton = document.querySelector("#pay-roll .btn-sign-up");

  // Action buttons
  const proceedToSuccessBtn = document.getElementById(
    "payroll-proceed-to-success"
  );

  // Show payroll form popup when payroll button is clicked
  if (payrollButton) {
    payrollButton.addEventListener("click", function (e) {
      e.preventDefault();
      payrollFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (payrollPopupClose) {
    payrollPopupClose.addEventListener("click", function () {
      payrollFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (payrollDetailsClose) {
    payrollDetailsClose.addEventListener("click", function () {
      payrollDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (payrollSuccessClose) {
    payrollSuccessClose.addEventListener("click", function () {
      payrollSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (payrollSuccessCloseButton) {
    payrollSuccessCloseButton.addEventListener("click", function () {
      payrollSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Handle payroll form submission
  if (payrollForm) {
    payrollForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate if at least one feature is selected
      const features = document.querySelectorAll(
        'input[name="payment-features[]"]:checked'
      );
      if (features.length === 0) {
        // Show validation message if no feature is selected
        const featureCheckboxGroup = document.querySelector(".checkbox-group");
        let validationMessage = document.getElementById(
          "feature-validation-message"
        );

        if (!validationMessage) {
          validationMessage = document.createElement("div");
          validationMessage.id = "feature-validation-message";
          validationMessage.style.color = "#e2146c";
          validationMessage.style.marginTop = "8px";
          validationMessage.style.fontSize = "14px";
          validationMessage.textContent =
            "অনুগ্রহ করে কমপক্ষে একটি ফিচার নির্বাচন করুন";
          featureCheckboxGroup.parentNode.appendChild(validationMessage);
        }

        // Scroll to the validation message
        validationMessage.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      // Get form data
      const companyName = document.getElementById("company-name").value;
      const companyType = document.getElementById("company-type");
      const companySize = document.getElementById("company-size");
      const district = document.getElementById("payroll-district");
      const area = document.getElementById("payroll-area");
      const address = document.getElementById("company-address").value;
      const contactPerson = document.getElementById(
        "contact-person-name"
      ).value;
      const designation = document.getElementById("contact-designation");
      const phone = document.getElementById("contact-phone").value;
      const email = document.getElementById("contact-email").value;
      const salaryCycle = document.getElementById("salary-cycle");
      const salaryBudget = document.getElementById("monthly-salary-budget");
      const paymentMethod = document.getElementById("current-payment-method");

      // Get selected payment features
      const paymentFeatures = [];
      features.forEach(function (checkbox) {
        paymentFeatures.push(checkbox.nextElementSibling.textContent);
      });

      // Update details in the details popup
      document.getElementById("detail-company-name").textContent = companyName;
      document.getElementById("detail-company-type").textContent =
        companyType.options[companyType.selectedIndex].text;
      document.getElementById("detail-company-size").textContent =
        companySize.options[companySize.selectedIndex].text;
      document.getElementById("detail-district").textContent =
        district.options[district.selectedIndex].text;
      document.getElementById("detail-area").textContent =
        area.options[area.selectedIndex].text;
      document.getElementById("detail-address").textContent = address;
      document.getElementById("detail-contact-person").textContent =
        contactPerson;
      document.getElementById("detail-designation").textContent =
        designation.options[designation.selectedIndex].text;
      document.getElementById("detail-phone").textContent = phone;
      document.getElementById("detail-email").textContent = email;
      document.getElementById("detail-salary-cycle").textContent =
        salaryCycle.options[salaryCycle.selectedIndex].text;
      document.getElementById("detail-salary-budget").textContent =
        salaryBudget.options[salaryBudget.selectedIndex].text;
      document.getElementById("detail-features").textContent =
        paymentFeatures.join(", ");
      document.getElementById("detail-payment-method").textContent =
        paymentMethod.options[paymentMethod.selectedIndex].text;

      // Hide the form popup and show the details popup
      payrollFormPopup.classList.remove("active");
      payrollDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "PR-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("payroll-application-ref").textContent =
        refNumber;

      // Hide details popup and show success popup
      payrollDetailsPopup.classList.remove("active");
      payrollSuccessPopup.classList.add("active");
    });
  }

  // Add form field highlight effects
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

  // Add checkbox validation for payment features
  const paymentFeatureCheckboxes = document.querySelectorAll(
    'input[name="payment-features[]"]'
  );

  paymentFeatureCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const validationMessage = document.getElementById(
        "feature-validation-message"
      );
      if (validationMessage) {
        // Remove validation message if at least one checkbox is checked
        const checkedFeatures = document.querySelectorAll(
          'input[name="payment-features[]"]:checked'
        );
        if (checkedFeatures.length > 0) {
          validationMessage.remove();
        }
      }
    });
  });

  // Add smooth transition effects to popup
  function addPopupTransitions() {
    const popups = [payrollFormPopup, payrollDetailsPopup, payrollSuccessPopup];

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
    if (e.target === payrollFormPopup) {
      payrollFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === payrollDetailsPopup) {
      payrollDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === payrollSuccessPopup) {
      payrollSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
