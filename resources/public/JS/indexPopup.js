// Service Popups JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Get all service popup elements
  const servicePopupContainer = document.getElementById(
    "servicePopupContainer"
  );
  const serviceOverlay = document.getElementById("serviceOverlay");
  const paymentPopup = document.getElementById("paymentPopup");
  const rechargePopup = document.getElementById("rechargePopup");
  const sendMoneyPopup = document.getElementById("sendMoneyPopup");
  const cashoutPopup = document.getElementById("cashoutPopup");

  // Get all the detail buttons from the financial section
  const detailButtons = document.querySelectorAll(
    ".financial-content .details-link"
  );

  // Function to show a specific popup
  function showPopup(popup) {
    // Show container and overlay
    servicePopupContainer.style.display = "block";
    serviceOverlay.style.display = "block";

    // Show the specific popup
    popup.style.display = "block";

    // Add body class to prevent scrolling
    document.body.classList.add("no-scroll");
  }

  // Function to hide all popups
  function hideAllPopups() {
    // Hide all popups
    paymentPopup.style.display = "none";
    rechargePopup.style.display = "none";
    sendMoneyPopup.style.display = "none";
    cashoutPopup.style.display = "none";

    // Hide container and overlay
    servicePopupContainer.style.display = "none";
    serviceOverlay.style.display = "none";

    // Remove body class to enable scrolling
    document.body.classList.remove("no-scroll");
  }

  // Event listeners for detail buttons in financial section
  detailButtons.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Determine which popup to show based on index
      switch (index) {
        case 0: // Payment
          showPopup(paymentPopup);
          break;
        case 1: // Mobile Recharge
          showPopup(rechargePopup);
          break;
        case 2: // Send Money
          showPopup(sendMoneyPopup);
          break;
        case 3: // Cash Out
          showPopup(cashoutPopup);
          break;
      }
    });
  });

  // Event listeners for close buttons in each popup
  const closeButtons = document.querySelectorAll(".service-popup-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", hideAllPopups);
  });

  // Event listeners for back buttons in each popup
  const backButtons = document.querySelectorAll(".service-popup-back");
  backButtons.forEach((button) => {
    button.addEventListener("click", hideAllPopups);
  });

  // Close popups when clicking on overlay
  serviceOverlay.addEventListener("click", hideAllPopups);

  // Alternative implementation: Direct buttons for service categories
  const serviceCategories = document.querySelectorAll(".service-category");

  serviceCategories.forEach((category) => {
    // Get the category title text
    const categoryTitle = category
      .querySelector(".service-category-title")
      ?.textContent.trim();

    if (categoryTitle) {
      category.addEventListener("click", function (event) {
        event.preventDefault();

        // Show the appropriate popup based on category title
        switch (categoryTitle) {
          case "পেমেন্ট":
            showPopup(paymentPopup);
            break;
          case "মোবাইল রিচার্জ":
            showPopup(rechargePopup);
            break;
          case "সেন্ড মানি":
            showPopup(sendMoneyPopup);
            break;
          case "ক্যাশ আউট":
            showPopup(cashoutPopup);
            break;
        }
      });
    }
  });

  // Close popup with ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      hideAllPopups();
    }
  });

  // Add hover effects to steps
  const serviceSteps = document.querySelectorAll(".service-step");

  serviceSteps.forEach((step) => {
    step.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
      const stepNumber = this.querySelector(".step-number");
      if (stepNumber) {
        stepNumber.style.transform = "scale(1.1)";
      }
    });

    step.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      const stepNumber = this.querySelector(".step-number");
      if (stepNumber) {
        stepNumber.style.transform = "scale(1)";
      }
    });
  });

  // Add operator selection functionality
  const operatorItems = document.querySelectorAll(".operator-item");

  operatorItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all operators
      operatorItems.forEach((op) => op.classList.remove("active"));

      // Add active class to clicked operator
      this.classList.add("active");

      // You can add additional logic here if needed
      // For example, showing different packages based on selected operator
    });
  });

  // Add CSS rule for active operator
  const style = document.createElement("style");
  style.textContent = `
          .operator-item.active {
              background-color: #e6f2ff;
              border: 2px solid #0d6efd;
              transform: translateY(-3px);
              box-shadow: 0 5px 15px rgba(13, 110, 253, 0.2);
          }
      `;
  document.head.appendChild(style);
});
