// Merchant Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all popup elements
  const merchantFormPopup = document.getElementById("merchant-form-popup");
  const merchantDetailsPopup = document.getElementById(
    "merchant-details-popup"
  );
  const merchantVerificationPopup = document.getElementById(
    "merchant-verification-popup"
  );
  const merchantSuccessPopup = document.getElementById(
    "merchant-success-popup"
  );

  // Get all close buttons
  const merchantPopupClose = document.getElementById("merchant-popup-close");
  const merchantDetailsClose = document.getElementById(
    "merchant-details-close"
  );
  const merchantVerificationClose = document.getElementById(
    "merchant-verification-close"
  );
  const merchantSuccessClose = document.getElementById(
    "merchant-success-close"
  );
  const merchantSuccessCloseButton = document.getElementById(
    "merchant-success-close-button"
  );

  // Get merchant form and verification form
  const merchantForm = document.getElementById("merchant-application-form");
  const verificationForm = document.getElementById(
    "merchant-verification-form"
  );

  // Get merchant button from section
  const merchantButton = document.querySelector("#merchant .btn-sign-up");

  // Action buttons
  const proceedToVerifyBtn = document.getElementById("proceed-to-verify");
  const resendCodeBtn = document.getElementById("merchant-resend-code");

  // Verification code inputs
  const verificationInputs = document.querySelectorAll(".verification-input");

  // Get radio buttons for bKash user
  const bkashUserYes = document.getElementById("bkash-user-yes");
  const bkashUserNo = document.getElementById("bkash-user-no");
  const bkashNumberGroup = document.querySelector(".bkash-number-group");

  // Show merchant form popup when merchant button is clicked
  if (merchantButton) {
    merchantButton.addEventListener("click", function (e) {
      e.preventDefault();
      merchantFormPopup.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  }

  // Handle bKash user radio buttons
  if (bkashUserYes && bkashUserNo && bkashNumberGroup) {
    function toggleBkashNumberField() {
      if (bkashUserYes.checked) {
        bkashNumberGroup.style.display = "block";
      } else {
        bkashNumberGroup.style.display = "none";
      }
    }

    // Set initial state
    toggleBkashNumberField();

    // Add event listeners
    bkashUserYes.addEventListener("change", toggleBkashNumberField);
    bkashUserNo.addEventListener("change", toggleBkashNumberField);
  }

  // Close buttons functionality
  if (merchantPopupClose) {
    merchantPopupClose.addEventListener("click", function () {
      merchantFormPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  if (merchantDetailsClose) {
    merchantDetailsClose.addEventListener("click", function () {
      merchantDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (merchantVerificationClose) {
    merchantVerificationClose.addEventListener("click", function () {
      merchantVerificationPopup.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (merchantSuccessClose) {
    merchantSuccessClose.addEventListener("click", function () {
      merchantSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  if (merchantSuccessCloseButton) {
    merchantSuccessCloseButton.addEventListener("click", function () {
      merchantSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    });
  }

  // Handle merchant form submission
  if (merchantForm) {
    merchantForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const businessName = document.getElementById("merchant-name").value;
      const businessType = document.getElementById("merchant-type");
      const district = document.getElementById("merchant-district");
      const address = document.getElementById("merchant-address").value;
      const ownerName = document.getElementById("merchant-owner-name").value;
      const mobile = document.getElementById("merchant-mobile").value;
      const email = document.getElementById("merchant-email").value;

      // Update details in the details popup
      document.getElementById("detail-business-name").textContent =
        businessName;
      document.getElementById("detail-business-type").textContent =
        businessType.options[businessType.selectedIndex].text;
      document.getElementById("detail-district").textContent =
        district.options[district.selectedIndex].text;
      document.getElementById("detail-address").textContent = address;
      document.getElementById("detail-owner-name").textContent = ownerName;
      document.getElementById("detail-mobile").textContent = mobile;
      document.getElementById("detail-email").textContent = email;

      // Update email display
      document.getElementById("email-sent").textContent = email;
      document.getElementById("verification-email").textContent = email;

      // Hide the form popup and show the details popup
      merchantFormPopup.classList.remove("active");
      merchantDetailsPopup.classList.add("active");
    });
  }

  // Handle proceed to verification button
  if (proceedToVerifyBtn) {
    proceedToVerifyBtn.addEventListener("click", function () {
      merchantDetailsPopup.classList.remove("active");
      merchantVerificationPopup.classList.add("active");

      // Focus on the first input
      if (verificationInputs.length > 0) {
        verificationInputs[0].focus();
      }

      // Start the timer
      startTimer(5 * 60); // 5 minutes
    });
  }

  // Handle verification code inputs
  if (verificationInputs.length > 0) {
    verificationInputs.forEach((input) => {
      input.addEventListener("input", function () {
        // If input has a value, move to the next input
        if (this.value.length === 1) {
          this.classList.add("filled");
          const nextIndex = parseInt(this.dataset.index) + 1;
          if (nextIndex < verificationInputs.length) {
            verificationInputs[nextIndex].focus();
          }
        } else {
          this.classList.remove("filled");
        }
      });

      input.addEventListener("keydown", function (e) {
        // If backspace is pressed and input is empty, move to the previous input
        if (e.key === "Backspace" && this.value.length === 0) {
          const prevIndex = parseInt(this.dataset.index) - 1;
          if (prevIndex >= 0) {
            verificationInputs[prevIndex].focus();
          }
        }
      });

      // Allow only numbers
      input.addEventListener("keypress", function (e) {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          e.preventDefault();
        }
      });
    });
  }

  // Handle verification form submission
  if (verificationForm) {
    verificationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Check if all inputs are filled
      let code = "";
      let allFilled = true;

      verificationInputs.forEach((input) => {
        if (!input.value) {
          allFilled = false;
        }
        code += input.value;
      });

      if (allFilled) {
        // Generate a random reference number
        const refNumber = "BM-" + Math.floor(100000 + Math.random() * 900000);
        document.getElementById("application-ref").textContent = refNumber;

        // Hide verification popup and show success popup
        merchantVerificationPopup.classList.remove("active");
        merchantSuccessPopup.classList.add("active");
      } else {
        // Highlight empty inputs
        verificationInputs.forEach((input) => {
          if (!input.value) {
            input.style.borderColor = "#e2146c";
          }
        });
      }
    });
  }

  // Handle resend code button
  if (resendCodeBtn) {
    resendCodeBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Reset the timer
      startTimer(5 * 60); // 5 minutes

      // Show resend confirmation
      this.textContent = "কোড পাঠানো হয়েছে";
      this.style.color = "#4CAF50";

      // Reset after 3 seconds
      setTimeout(() => {
        this.textContent = "পুনরায় পাঠান";
        this.style.color = "";
      }, 3000);
    });
  }

  // Timer function
  function startTimer(duration) {
    let timer = duration;
    const timerElement = document.getElementById("timer");
    let timerInterval;

    if (timerElement) {
      clearInterval(timerInterval); // Clear any existing timer

      timerInterval = setInterval(function () {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;

        timerElement.textContent =
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);

        if (--timer < 0) {
          clearInterval(timerInterval);
          timerElement.textContent = "00:00";
          timerElement.style.color = "#e74c3c";
        }
      }, 1000);
    }
  }

  // Close popups when clicking outside of content
  window.addEventListener("click", function (e) {
    if (e.target === merchantFormPopup) {
      merchantFormPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === merchantDetailsPopup) {
      merchantDetailsPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === merchantVerificationPopup) {
      merchantVerificationPopup.classList.remove("active");
      document.body.style.overflow = "";
    } else if (e.target === merchantSuccessPopup) {
      merchantSuccessPopup.classList.remove("active");
      document.body.style.overflow = "";
      // Redirect back to business.html
      window.location.href = "business.html";
    }
  });
});
