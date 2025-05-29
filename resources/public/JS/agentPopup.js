document.addEventListener("DOMContentLoaded", function () {
  // Global state for agent user
  const currentAgentUser = {
    isLoggedIn: false,
    mobileNumber: null,
    pin: null,
    loginTime: null, // Added loginTime property to track session time
    agentInfo: {
      name: "",
      district: "",
      upazila: "",
      market: "",
      phone: "",
      email: "",
    },
  };

  // Elements
  const agentButton = document.getElementById("agentButton");
  const agentPopupContainer = document.getElementById("agentPopupContainer");
  const agentOverlay = document.getElementById("agentOverlay");

  // Popups
  const agentAccessPopup = document.getElementById("agentAccessPopup");
  const agentLoginNumberPopup = document.getElementById(
    "agentLoginNumberPopup"
  );
  const agentLoginPinPopup = document.getElementById("agentLoginPinPopup");
  const agentRegistrationPopup = document.getElementById(
    "agentRegistrationPopup"
  );
  const agentSetPinPopup = document.getElementById("agentSetPinPopup");
  const agentSuccessPopup = document.getElementById("agentSuccessPopup");

  // Form Elements
  const districtSelect = document.getElementById("agentDistrict");
  const upazilaSelect = document.getElementById("agentUpazila");
  const marketSelect = document.getElementById("agentThanaMarket");

  // Buttons
  const btnAgentLogin = document.getElementById("btnAgentLogin");
  const btnAgentRegistration = document.getElementById("btnAgentRegistration");
  const btnSubmitAgentNumber = document.getElementById("btnSubmitAgentNumber");
  const btnSubmitAgentPin = document.getElementById("btnSubmitAgentPin");
  const btnSubmitAgentRegistration = document.getElementById(
    "btnSubmitAgentRegistration"
  );
  const btnSubmitSetPin = document.getElementById("btnSubmitSetPin");
  const btnSuccessOk = document.getElementById("btnSuccessOk");

  // Close and back buttons
  const closeButtons = document.querySelectorAll(".agent-popup-close");
  const backButtons = document.querySelectorAll(".agent-popup-back");

  // PIN input fields
  const agentPinInputs = document.querySelectorAll(".agent-pin-input");
  const setPinInputs = document.querySelectorAll(".agent-pin-input.set-pin");
  const confirmPinInputs = document.querySelectorAll(
    ".agent-pin-input.confirm-pin"
  );

  // Show PIN checkboxes
  const showAgentPinCheckbox = document.getElementById("showAgentPinCheckbox");
  const showSetPinCheckbox = document.getElementById("showSetPinCheckbox");

  // District, Upazila, and Market Data
  const districts = [
    { id: 1, name: "ঢাকা" },
    { id: 2, name: "চট্টগ্রাম" },
    { id: 3, name: "রাজশাহী" },
    { id: 4, name: "খুলনা" },
    { id: 5, name: "বরিশাল" },
    { id: 6, name: "সিলেট" },
    { id: 7, name: "রংপুর" },
    { id: 8, name: "ময়মনসিংহ" },
  ];

  const upazilas = [
    // Dhaka District
    { id: 1, districtId: 1, name: "সাভার" },
    { id: 2, districtId: 1, name: "ধামরাই" },
    { id: 3, districtId: 1, name: "কেরানীগঞ্জ" },
    { id: 4, districtId: 1, name: "নবাবগঞ্জ" },
    { id: 5, districtId: 1, name: "দোহার" },

    // Chittagong District
    { id: 6, districtId: 2, name: "মীরসরাই" },
    { id: 7, districtId: 2, name: "পটিয়া" },
    { id: 8, districtId: 2, name: "সীতাকুন্ড" },
    { id: 9, districtId: 2, name: "সন্দ্বীপ" },

    // Rajshahi District
    { id: 10, districtId: 3, name: "পবা" },
    { id: 11, districtId: 3, name: "দুর্গাপুর" },
    { id: 12, districtId: 3, name: "মোহনপুর" },

    // Khulna District
    { id: 13, districtId: 4, name: "তেরখাদা" },
    { id: 14, districtId: 4, name: "বটিয়াঘাটা" },
    { id: 15, districtId: 4, name: "দাকোপ" },

    // Barisal District
    { id: 16, districtId: 5, name: "বাকেরগঞ্জ" },
    { id: 17, districtId: 5, name: "বানারীপাড়া" },
    { id: 18, districtId: 5, name: "মেহেন্দিগঞ্জ" },

    // Sylhet District
    { id: 19, districtId: 6, name: "বিশ্বনাথ" },
    { id: 20, districtId: 6, name: "বালাগঞ্জ" },
    { id: 21, districtId: 6, name: "জৈন্তাপুর" },

    // Rangpur District
    { id: 22, districtId: 7, name: "গঙ্গাচড়া" },
    { id: 23, districtId: 7, name: "বদরগঞ্জ" },
    { id: 24, districtId: 7, name: "কাউনিয়া" },

    // Mymensingh District
    { id: 25, districtId: 8, name: "ফুলবাড়ীয়া" },
    { id: 26, districtId: 8, name: "ত্রিশাল" },
    { id: 27, districtId: 8, name: "ভালুকা" },
  ];

  const markets = [
    // Savar Markets
    { id: 1, upazilaId: 1, name: "সাভার বাজার" },
    { id: 2, upazilaId: 1, name: "আশুলিয়া বাজার" },
    { id: 3, upazilaId: 1, name: "রাজফুলবাড়িয়া বাজার" },

    // Dhamrai Markets
    { id: 4, upazilaId: 2, name: "ধামরাই বাজার" },
    { id: 5, upazilaId: 2, name: "কল্যাণপুর বাজার" },

    // Other upazila markets
    { id: 6, upazilaId: 3, name: "কেরানীগঞ্জ বাজার" },
    { id: 7, upazilaId: 4, name: "নবাবগঞ্জ বাজার" },
    { id: 8, upazilaId: 5, name: "দোহার বাজার" },
    { id: 9, upazilaId: 6, name: "মীরসরাই বাজার" },
    { id: 10, upazilaId: 7, name: "পটিয়া বাজার" },

    // Add more markets for other upazilas as needed
    { id: 11, upazilaId: 8, name: "সীতাকুন্ড বাজার" },
    { id: 12, upazilaId: 9, name: "সন্দ্বীপ বাজার" },
    { id: 13, upazilaId: 10, name: "পবা বাজার" },
    { id: 14, upazilaId: 11, name: "দুর্গাপুর বাজার" },
    { id: 15, upazilaId: 12, name: "মোহনপুর বাজার" },
  ];

  // Helper function to show a popup
  function showPopup(popup) {
    // Hide all popups first
    const allPopups = document.querySelectorAll(".agent-popup");
    allPopups.forEach((p) => (p.style.display = "none"));

    // Show the requested popup
    popup.style.display = "block";
    agentPopupContainer.style.display = "flex";
    agentOverlay.style.display = "block";
  }

  // Helper function to close all popups
  function closeAllPopups() {
    agentPopupContainer.style.display = "none";
    agentOverlay.style.display = "none";

    const allPopups = document.querySelectorAll(".agent-popup");
    allPopups.forEach((p) => (p.style.display = "none"));
  }

  // Helper function to handle PIN input fields
  function setupPinInputFields(inputs) {
    inputs.forEach((input, index) => {
      // Move to next input when a digit is entered
      input.addEventListener("input", function () {
        // Replace any non-numeric input
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value.length === 1) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
      });

      // Handle backspace key
      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
          if (this.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
          }
        }
      });
    });
  }

  // Save agent user data to localStorage - IMPROVED VERSION
  function saveAgentToLocalStorage() {
    try {
      // Make sure we're saving the full object with all needed properties
      if (currentAgentUser && typeof currentAgentUser === "object") {
        // Ensure isLoggedIn flag is set
        if (currentAgentUser.isLoggedIn === undefined) {
          currentAgentUser.isLoggedIn = true;
        }

        localStorage.setItem("surepayAgent", JSON.stringify(currentAgentUser));
        console.log("Agent data saved to localStorage", currentAgentUser);
        return true;
      } else {
        console.error("Invalid agent data object");
        return false;
      }
    } catch (e) {
      console.error("Error saving agent data:", e);
      return false;
    }
  }

  // Check if agent is already logged in
  function checkAgentLoggedInStatus() {
    const savedAgent = localStorage.getItem("surepayAgent");
    if (savedAgent) {
      try {
        const parsedAgent = JSON.parse(savedAgent);

        // Update currentAgentUser with saved data
        Object.assign(currentAgentUser, parsedAgent);

        // Set login status
        if (parsedAgent.isLoggedIn) {
          currentAgentUser.isLoggedIn = true;
          console.log("Agent session restored successfully", currentAgentUser);
        }
      } catch (e) {
        console.error("Error restoring agent session:", e);
        localStorage.removeItem("surepayAgent");
      }
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

  // Simplified and reliable function to redirect to agent.html
  function goToAgentPage() {
    console.log("Redirecting to agent.html...");

    // Simple direct navigation approach
    window.location.href = "agent.html";

    // Fallback in case the above fails
    setTimeout(function () {
      window.location = "agent.html";
    }, 500);
  }

  // Initialize PIN input fields
  setupPinInputFields(document.querySelectorAll(".agent-pin-input"));

  // Check agent login status on page load
  checkAgentLoggedInStatus();

  // Event Listeners

  // Open agent access popup when clicking the agent button
  if (agentButton) {
    agentButton.addEventListener("click", function () {
      // Always show the Agent Access popup with both options first
      showPopup(agentAccessPopup);
    });
  }

  // Agent Login Button
  if (btnAgentLogin) {
    btnAgentLogin.addEventListener("click", function () {
      showPopup(agentLoginNumberPopup);
    });
  }

  // Agent Registration Button
  if (btnAgentRegistration) {
    btnAgentRegistration.addEventListener("click", function () {
      showPopup(agentRegistrationPopup);

      // Populate districts dropdown if it's empty
      if (districtSelect && districtSelect.options.length <= 1) {
        populateDistricts();
      }
    });
  }

  // Function to populate districts dropdown
  function populateDistricts() {
    if (!districtSelect) return;

    // Clear existing options except the first one
    districtSelect.innerHTML = '<option value="">জেলা নির্বাচন করুন</option>';

    // Add district options
    districts.forEach((district) => {
      const option = document.createElement("option");
      option.value = district.id;
      option.textContent = district.name;
      districtSelect.appendChild(option);
    });
  }

  // Function to populate upazilas based on selected district
  function populateUpazilas(districtId) {
    if (!upazilaSelect) return;

    // Clear existing options
    upazilaSelect.innerHTML = '<option value="">উপজেলা নির্বাচন করুন</option>';

    // Filter upazilas by district
    const filteredUpazilas = upazilas.filter(
      (upazila) => upazila.districtId === parseInt(districtId)
    );

    if (filteredUpazilas.length > 0) {
      // Enable upazila select
      upazilaSelect.disabled = false;

      // Add upazila options
      filteredUpazilas.forEach((upazila) => {
        const option = document.createElement("option");
        option.value = upazila.id;
        option.textContent = upazila.name;
        upazilaSelect.appendChild(option);
      });
    } else {
      upazilaSelect.disabled = true;
    }

    // Reset and disable market select
    if (marketSelect) {
      marketSelect.innerHTML =
        '<option value="">প্রথমে উপজেলা নির্বাচন করুন</option>';
      marketSelect.disabled = true;
    }
  }

  // Function to populate markets based on selected upazila
  function populateMarkets(upazilaId) {
    if (!marketSelect) return;

    // Clear existing options
    marketSelect.innerHTML =
      '<option value="">থানা/মার্কেট নির্বাচন করুন</option>';

    // Filter markets by upazila
    const filteredMarkets = markets.filter(
      (market) => market.upazilaId === parseInt(upazilaId)
    );

    if (filteredMarkets.length > 0) {
      // Enable market select
      marketSelect.disabled = false;

      // Add market options
      filteredMarkets.forEach((market) => {
        const option = document.createElement("option");
        option.value = market.id;
        option.textContent = market.name;
        marketSelect.appendChild(option);
      });
    } else {
      marketSelect.disabled = true;
    }
  }

  // Event listeners for dropdowns
  if (districtSelect) {
    districtSelect.addEventListener("change", function () {
      if (this.value) {
        populateUpazilas(this.value);
      } else {
        if (upazilaSelect) {
          upazilaSelect.innerHTML =
            '<option value="">প্রথমে জেলা নির্বাচন করুন</option>';
          upazilaSelect.disabled = true;
        }
        if (marketSelect) {
          marketSelect.innerHTML =
            '<option value="">প্রথমে উপজেলা নির্বাচন করুন</option>';
          marketSelect.disabled = true;
        }
      }
    });
  }

  if (upazilaSelect) {
    upazilaSelect.addEventListener("change", function () {
      if (this.value) {
        populateMarkets(this.value);
      } else if (marketSelect) {
        marketSelect.innerHTML =
          '<option value="">প্রথমে উপজেলা নির্বাচন করুন</option>';
        marketSelect.disabled = true;
      }
    });
  }

  // Submit Agent Number
  if (btnSubmitAgentNumber) {
    btnSubmitAgentNumber.addEventListener("click", function () {
      const agentNumber = document.getElementById("agentLoginNumber");

      if (
        agentNumber &&
        agentNumber.value &&
        agentNumber.value.length === 11 &&
        /^01[0-9]{9}$/.test(agentNumber.value)
      ) {
        // Store the agent number
        currentAgentUser.mobileNumber = agentNumber.value;

        // Show PIN entry screen
        showPopup(agentLoginPinPopup);
      } else {
        showNotification("দয়া করে সঠিক মোবাইল নাম্বার দিন");
      }
    });
  }

  // Find this code in agentPopup.js - this is the problem section
  // Submit Agent PIN (Login) - IMPROVED VERSION
  if (btnSubmitAgentPin) {
    btnSubmitAgentPin.addEventListener("click", function () {
      // Collect PIN
      let pin = "";
      let isPinComplete = true;
      const pinInputs = document.querySelectorAll(
        "#agentLoginPinPopup .agent-pin-input"
      );

      pinInputs.forEach((input) => {
        if (!input.value) isPinComplete = false;
        pin += input.value;
      });

      if (!isPinComplete || pin.length !== 5) {
        showNotification("সম্পূর্ণ ৫ ডিজিটের পিন দিন");
        return;
      }

      // For demo, accept any 5-digit PIN
      currentAgentUser.pin = pin;
      currentAgentUser.isLoggedIn = true;

      // Add login timestamp
      currentAgentUser.loginTime = new Date().getTime();

      // CHANGE THIS: Save with key 'agentData' instead of 'surepayAgent'
      const agentData = {
        agentNumber: currentAgentUser.mobileNumber,
        pin: pin,
        isLoggedIn: true,
        registrationComplete: true,
        loginTime: new Date().getTime(),
        agentInfo: currentAgentUser.agentInfo || {},
      };

      // Save using the agentData key that agent.html expects
      localStorage.setItem("agentData", JSON.stringify(agentData));

      // Close popups
      closeAllPopups();
      // showNotification("লগইন সফল হয়েছে");

      // CHANGE THIS: Redirect with justLoggedIn parameter and force reload
      console.log("Redirecting to agent.html...");
      setTimeout(function () {
        window.location.href = "/agent/main";
      }, 500);
    });
  }
  // Submit Agent Registration
  if (btnSubmitAgentRegistration) {
    btnSubmitAgentRegistration.addEventListener("click", function () {
      // Validate text inputs
      const requiredTextFields = document.querySelectorAll(
        "#agentRegistrationPopup input[required]"
      );
      let isValid = true;

      requiredTextFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "";
        }
      });

      // Validate select fields
      const requiredSelectFields = document.querySelectorAll(
        "#agentRegistrationPopup select[required]"
      );

      requiredSelectFields.forEach((select) => {
        if (!select.value) {
          isValid = false;
          select.style.borderColor = "red";
        } else {
          select.style.borderColor = "";
        }
      });

      if (isValid) {
        // Store registration information
        const agentName = document.getElementById("agentName");
        const agentPhone = document.getElementById("agentPhone");
        const agentEmail = document.getElementById("agentEmail");

        // Get selected district, upazila, and market names
        let districtName = "";
        let upazilaName = "";
        let marketName = "";

        if (districtSelect && districtSelect.value) {
          const selectedDistrict = districts.find(
            (d) => d.id === parseInt(districtSelect.value)
          );
          if (selectedDistrict) districtName = selectedDistrict.name;
        }

        if (upazilaSelect && upazilaSelect.value) {
          const selectedUpazila = upazilas.find(
            (u) => u.id === parseInt(upazilaSelect.value)
          );
          if (selectedUpazila) upazilaName = selectedUpazila.name;
        }

        if (marketSelect && marketSelect.value) {
          const selectedMarket = markets.find(
            (m) => m.id === parseInt(marketSelect.value)
          );
          if (selectedMarket) marketName = selectedMarket.name;
        }

        // Store info
        currentAgentUser.agentInfo = {
          name: agentName ? agentName.value : "",
          district: districtName,
          upazila: upazilaName,
          market: marketName,
          phone: agentPhone ? agentPhone.value : "",
          email: agentEmail ? agentEmail.value : "",
        };

        // Store phone as mobileNumber for login
        if (agentPhone) {
          currentAgentUser.mobileNumber = agentPhone.value;
        }

        // Proceed to PIN setup
        showPopup(agentSetPinPopup);
      } else {
        showNotification("দয়া করে সব প্রয়োজনীয় তথ্য দিন");
      }
    });
  }

  // Submit Set PIN (Registration)
  if (btnSubmitSetPin) {
    btnSubmitSetPin.addEventListener("click", function () {
      // Collect PINs
      let pin = "";
      let confirmPin = "";

      setPinInputs.forEach((input) => {
        pin += input.value;
      });

      confirmPinInputs.forEach((input) => {
        confirmPin += input.value;
      });

      if (pin.length === 5 && /^[0-9]{5}$/.test(pin)) {
        if (pin === confirmPin) {
          // Store PIN
          currentAgentUser.pin = pin;

          // Show success popup
          showPopup(agentSuccessPopup);
        } else {
          showNotification("পিন মিলছে না। আবার চেষ্টা করুন।");
        }
      } else {
        showNotification("দয়া করে সঠিক ৫ সংখ্যার পিন দিন");
      }
    });
  }

  // Success OK Button - Take user directly to A Login page
  if (btnSuccessOk) {
    btnSuccessOk.addEventListener("click", function () {
      closeAllPopups();
      // Show A Login page directly
      showPopup(agentLoginNumberPopup);

      // Pre-fill the phone number from registration
      const agentLoginNumber = document.getElementById("agentLoginNumber");
      if (agentLoginNumber && currentAgentUser.mobileNumber) {
        agentLoginNumber.value = currentAgentUser.mobileNumber;
      }
    });
  }

  // Close Buttons
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeAllPopups);
  });

  // Back Buttons
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentPopup = this.closest(".agent-popup");

      if (currentPopup === agentLoginNumberPopup) {
        showPopup(agentAccessPopup);
      } else if (currentPopup === agentLoginPinPopup) {
        showPopup(agentLoginNumberPopup);
      } else if (currentPopup === agentRegistrationPopup) {
        showPopup(agentAccessPopup);
      } else if (currentPopup === agentSetPinPopup) {
        showPopup(agentRegistrationPopup);
      }
    });
  });

  // Show/Hide PINs
  if (showAgentPinCheckbox) {
    showAgentPinCheckbox.addEventListener("change", function () {
      const pinInputs = document.querySelectorAll(
        "#agentLoginPinPopup .agent-pin-input"
      );
      const inputType = this.checked ? "text" : "password";
      pinInputs.forEach((input) => {
        input.type = inputType;
      });
    });
  }

  if (showSetPinCheckbox) {
    showSetPinCheckbox.addEventListener("change", function () {
      const allPinInputs = document.querySelectorAll(
        "#agentSetPinPopup .agent-pin-input"
      );
      const inputType = this.checked ? "text" : "password";
      allPinInputs.forEach((input) => {
        input.type = inputType;
      });
    });
  }

  // Replace the loginAgent function in agentPopup.js with this version
  // REPLACE the loginAgent function in agentPopup.js with this version:

  function loginAgent() {
    console.log("Login agent function started");

    // Get all PIN inputs
    const pinInputs = document.querySelectorAll(".agent-pin-popup .pin-input");
    let pin = "";

    // Validate all PIN fields are filled
    let isValid = true;
    pinInputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("error");
        isValid = false;
      } else {
        pin += input.value;
      }
    });

    if (!isValid) {
      // Show error message
      showNotification("সঠিক পিন দিন");
      return;
    }

    // Get the agent number from input
    const agentNumber = document.getElementById("agent-number").value;

    if (!agentNumber || agentNumber.length < 10) {
      showNotification("সঠিক মোবাইল নাম্বার দিন");
      return;
    }

    // Create agent data with login status
    const agentData = {
      agentNumber: agentNumber,
      pin: pin,
      isLoggedIn: true,
      registrationComplete: true,
      loginTime: new Date().getTime(),
    };

    console.log("Saving agent data to localStorage");

    // Save to localStorage BEFORE redirect
    localStorage.setItem("agentData", JSON.stringify(agentData));

    // Close popup
    closeAllPopups();

    // Show success notification
    showNotification("এজেন্ট লগইন সফল হয়েছে");

    // Redirect to agent.html with a small delay to ensure localStorage is saved
    console.log("Will redirect to agent.html in 500ms");
    setTimeout(function () {
      window.location.href = "agent.html";
    }, 500);
  }

  // Close popups when clicking on overlay
  if (agentOverlay) {
    agentOverlay.addEventListener("click", closeAllPopups);
  }
});
