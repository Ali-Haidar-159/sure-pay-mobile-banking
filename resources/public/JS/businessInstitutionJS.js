// Educational Institution Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const educationalFormPopup = document.getElementById(
    "educational-form-popup"
  );
  const educationalDetailsPopup = document.getElementById(
    "educational-details-popup"
  );
  const educationalSuccessPopup = document.getElementById(
    "educational-success-popup"
  );

  // Get all close buttons
  const educationalPopupClose = document.getElementById(
    "educational-popup-close"
  );
  const educationalDetailsClose = document.getElementById(
    "educational-details-close"
  );
  const educationalSuccessClose = document.getElementById(
    "educational-success-close"
  );
  const educationalSuccessCloseButton = document.getElementById(
    "educational-success-close-button"
  );

  // Get educational form
  const educationalForm = document.getElementById(
    "educational-application-form"
  );

  // Get educational button from section
  const educationalButton = document.querySelector("#educational .btn-sign-up");

  // Action buttons
  const proceedToSuccessBtn = document.getElementById("edu-proceed-to-success");

  // Show educational form popup when educational button is clicked
  if (educationalButton) {
    educationalButton.addEventListener("click", function (e) {
      e.preventDefault();
      educationalFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Close buttons functionality
  if (educationalPopupClose) {
    educationalPopupClose.addEventListener("click", function () {
      educationalFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (educationalDetailsClose) {
    educationalDetailsClose.addEventListener("click", function () {
      educationalDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (educationalSuccessClose) {
    educationalSuccessClose.addEventListener("click", function () {
      educationalSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (educationalSuccessCloseButton) {
    educationalSuccessCloseButton.addEventListener("click", function () {
      educationalSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Handle educational form submission
  if (educationalForm) {
    educationalForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const institutionName = document.getElementById("institution-name").value;
      const institutionType = document.getElementById("institution-type");
      const studentCount = document.getElementById("student-count");
      const district = document.getElementById("edu-district");
      const area = document.getElementById("edu-area");
      const address = document.getElementById("institution-address").value;
      const contactPerson = document.getElementById("contact-person").value;
      const designation = document.getElementById("designation");
      const phone = document.getElementById("edu-phone").value;

      // Get selected payment types
      const paymentTypes = [];
      document
        .querySelectorAll('input[name="payment-types[]"]:checked')
        .forEach(function (checkbox) {
          paymentTypes.push(checkbox.nextElementSibling.textContent);
        });

      // Update details in the details popup
      document.getElementById("detail-institution-name").textContent =
        institutionName;
      document.getElementById("detail-institution-type").textContent =
        institutionType.options[institutionType.selectedIndex].text;
      document.getElementById("detail-student-count").textContent =
        studentCount.options[studentCount.selectedIndex].text;
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
      document.getElementById("detail-payment-types").textContent =
        paymentTypes.length > 0
          ? paymentTypes.join(", ")
          : "কোনো পেমেন্ট ধরন নির্বাচিত হয়নি";

      // Hide the form popup and show the details popup
      educationalFormPopup.classList.remove("active");
      educationalDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to success button
  if (proceedToSuccessBtn) {
    proceedToSuccessBtn.addEventListener("click", function () {
      // Generate a random reference number
      const refNumber = "EDU-" + Math.floor(100000 + Math.random() * 900000);
      document.getElementById("edu-application-ref").textContent = refNumber;

      // Hide details popup and show success popup
      educationalDetailsPopup.classList.remove("active");
      educationalSuccessPopup.classList.add("active");
    });
  }

  // Form validation - require at least one payment type
  const paymentTypeCheckboxes = document.querySelectorAll(
    'input[name="payment-types[]"]'
  );
  const submitButton = document.querySelector(
    "#educational-application-form .btn-submit"
  );

  if (paymentTypeCheckboxes.length > 0 && submitButton) {
    function validatePaymentTypes() {
      // Check if at least one checkbox is checked
      const isValid = Array.from(paymentTypeCheckboxes).some(
        (checkbox) => checkbox.checked
      );

      if (!isValid) {
        // Add validation message if not already present
        if (!document.getElementById("payment-validation-message")) {
          const validationMessage = document.createElement("div");
          validationMessage.id = "payment-validation-message";
          validationMessage.className = "validation-message";
          validationMessage.textContent =
            "অনুগ্রহ করে কমপক্ষে একটি পেমেন্ট ধরন নির্বাচন করুন";
          validationMessage.style.color = "#e2146c";
          validationMessage.style.fontSize = "14px";
          validationMessage.style.marginTop = "5px";

          const paymentTypesGroup = document.querySelector(".checkbox-group");
          paymentTypesGroup.parentNode.appendChild(validationMessage);
        }
      } else {
        // Remove validation message if exists
        const validationMessage = document.getElementById(
          "payment-validation-message"
        );
        if (validationMessage) {
          validationMessage.remove();
        }
      }

      return isValid;
    }

    // Add event listeners to checkboxes
    paymentTypeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", validatePaymentTypes);
    });

    // Add form validation before submit
    educationalForm.addEventListener("submit", function (e) {
      if (!validatePaymentTypes()) {
        e.preventDefault();
      }
    });
  }

  // Add smooth transition effects to popup
  function addPopupTransitions() {
    const popups = [
      educationalFormPopup,
      educationalDetailsPopup,
      educationalSuccessPopup,
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
    if (e.target === educationalFormPopup) {
      educationalFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === educationalDetailsPopup) {
      educationalDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === educationalSuccessPopup) {
      educationalSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
