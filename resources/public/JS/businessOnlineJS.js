// bKash Business Popup JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const businessFormPopup = document.getElementById("business-form-popup");
  const verificationPopup = document.getElementById("verification-popup");
  const successPopup = document.getElementById("success-popup");

  // Get close buttons
  const formPopupClose = document.getElementById("form-popup-close");
  const verificationPopupClose = document.getElementById(
    "verification-popup-close"
  );
  const successPopupClose = document.getElementById("success-popup-close");
  const successCloseButton = document.getElementById("success-close-button");

  // Get sign up button from the business page
  const signUpButton = document.querySelector("#online-business .btn-sign-up");

  // Get forms
  const businessForm = document.getElementById("business-application-form");
  const verificationForm = document.getElementById("verification-form");
  const resendCodeLink = document.getElementById("resend-code-link");

  // Function to open business form popup
  function openBusinessFormPopup(e) {
    if (e) e.preventDefault();
    businessFormPopup.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Add keyboard event listener for escape key
    document.addEventListener("keydown", handleEscKey);

    // Animate entrance
    setTimeout(() => {
      const popupContent = businessFormPopup.querySelector(".popup-content");
      if (popupContent) {
        popupContent.style.opacity = "1";
        popupContent.style.transform = "translateY(0)";
      }
    }, 50);
  }

  // Function to open verification popup
  function openVerificationPopup(e) {
    if (e) e.preventDefault();
    businessFormPopup.classList.remove("active");
    verificationPopup.classList.add("active");

    // Focus on verification code input
    setTimeout(() => {
      document.getElementById("verification-code").focus();
    }, 300);
  }

  // Function to open success popup
  function openSuccessPopup(e) {
    if (e) e.preventDefault();
    verificationPopup.classList.remove("active");
    successPopup.classList.add("active");
  }

  // Function to close all popups
  function closeAllPopups() {
    businessFormPopup.classList.remove("active");
    verificationPopup.classList.remove("active");
    successPopup.classList.remove("active");
    document.body.style.overflow = ""; // Restore background scrolling

    // Remove keyboard event listener
    document.removeEventListener("keydown", handleEscKey);
  }

  // Function to handle escape key press
  function handleEscKey(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  // Function to handle click outside popup content
  function handleOutsideClick(e) {
    if (
      e.target === businessFormPopup ||
      e.target === verificationPopup ||
      e.target === successPopup
    ) {
      closeAllPopups();
    }
  }

  // Set up event listeners
  if (signUpButton) {
    signUpButton.addEventListener("click", openBusinessFormPopup);
  }

  // Close buttons
  if (formPopupClose) formPopupClose.addEventListener("click", closeAllPopups);
  if (verificationPopupClose)
    verificationPopupClose.addEventListener("click", closeAllPopups);
  if (successPopupClose)
    successPopupClose.addEventListener("click", closeAllPopups);
  if (successCloseButton)
    successCloseButton.addEventListener("click", closeAllPopups);

  // Outside click handling
  businessFormPopup.addEventListener("click", handleOutsideClick);
  verificationPopup.addEventListener("click", handleOutsideClick);
  successPopup.addEventListener("click", handleOutsideClick);

  // Form submissions
  if (businessForm) {
    businessForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Client-side validation
      if (validateBusinessForm()) {
        // Simulate form submission
        simulateFormSubmission();

        // Show verification popup after "submitting" form
        setTimeout(() => {
          openVerificationPopup();
        }, 1000);
      }
    });
  }

  if (verificationForm) {
    verificationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get verification code
      const code = document.getElementById("verification-code").value;

      // Validate code (for demo purposes, any 6-digit code works)
      if (code.length === 6 && /^\d+$/.test(code)) {
        // Show success popup after "verifying" code
        setTimeout(() => {
          openSuccessPopup();
        }, 1000);
      } else {
        // Show error message
        alert("অনুগ্রহ করে সঠিক ৬ ডিজিটের কোড দিন।");
      }
    });
  }

  // Resend code link
  if (resendCodeLink) {
    resendCodeLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("একটি নতুন ভেরিফিকেশন কোড পাঠানো হয়েছে।");
    });
  }

  // Add ripple effect to all buttons
  const buttons = document.querySelectorAll(
    "button.btn-submit, button.btn-close, button.popup-close"
  );

  buttons.forEach((button) => {
    button.addEventListener("mousedown", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Input field enhancements
  const formInputs = document.querySelectorAll(".form-input");

  formInputs.forEach((input) => {
    // Add focus animation
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("input-focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("input-focused");
    });

    // Add change detection
    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.classList.add("has-value");
      } else {
        this.classList.remove("has-value");
      }
    });
  });

  // Helper functions
  function validateBusinessForm() {
    // Get required fields
    const requiredFields = businessForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error");

        // Add error message
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "এই ফিল্ড পূরণ করুন";

        // Remove existing error message if any
        const existingError =
          field.parentElement.querySelector(".error-message");
        if (existingError) existingError.remove();

        field.parentElement.appendChild(errorMsg);
      } else {
        field.classList.remove("error");
        const existingError =
          field.parentElement.querySelector(".error-message");
        if (existingError) existingError.remove();
      }
    });

    // Check email format
    const emailField = document.getElementById("contact-email");
    if (emailField && emailField.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailField.value)) {
        isValid = false;
        emailField.classList.add("error");

        // Add error message
        const errorMsg = document.createElement("div");
        errorMsg.className = "error-message";
        errorMsg.textContent = "সঠিক ইমেইল আইডি দিন";

        // Remove existing error message if any
        const existingError =
          emailField.parentElement.querySelector(".error-message");
        if (existingError) existingError.remove();

        emailField.parentElement.appendChild(errorMsg);
      }
    }

    // Check checkbox
    const termsCheckbox = document.getElementById("terms-checkbox");
    if (termsCheckbox && !termsCheckbox.checked) {
      isValid = false;
      alert("শর্তাবলী মেনে নিতে হবে");
    }

    return isValid;
  }

  function simulateFormSubmission() {
    // Show loading state
    const submitBtn = businessForm.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> প্রক্রিয়াকরণ হচ্ছে...';

    // Reset button after "submission"
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 1000);
  }

  // Add dynamic CSS styles
  const style = document.createElement("style");
  style.textContent = `
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
        
        .form-group.input-focused label {
            color: #e2146c;
        }
        
        .form-input.error,
        .form-select.error {
            border-color: #ff3860;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 14px;
            margin-top: 5px;
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);
});

// Function to open the business form popup programmatically (can be called from elsewhere)
function openBusinessFormPopup() {
  const businessFormPopup = document.getElementById("business-form-popup");
  if (businessFormPopup) {
    businessFormPopup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}
