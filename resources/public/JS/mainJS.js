document.addEventListener("DOMContentLoaded", function () {
  // Get all service items
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    // Add premium UI elements to each service item

    // 1. Add highlight accent (top right corner triangle)
    const highlightAccent = document.createElement("div");
    highlightAccent.className = "highlight-accent";
    item.appendChild(highlightAccent);

    // 2. Add background gradient
    const bgGradient = document.createElement("div");
    bgGradient.className = "bg-gradient";
    item.appendChild(bgGradient);

    // 3. Add hover line indicator (bottom line)
    const hoverLine = document.createElement("div");
    hoverLine.className = "hover-line-indicator";
    item.appendChild(hoverLine);

    // 4. Add ripple container
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple-container";
    item.appendChild(rippleContainer);

    // 5. Make the service icon 3D
    const serviceIcon = item.querySelector(".service-icon");
    if (serviceIcon) {
      // Create 3D wrapper around icon
      const iconWrapper = document.createElement("div");
      iconWrapper.className = "icon-3d-wrapper";

      // Move icon inside wrapper
      const iconParent = serviceIcon.parentNode;
      iconParent.insertBefore(iconWrapper, serviceIcon);
      iconWrapper.appendChild(serviceIcon);

      // Add glossy overlay to icon
      const glossOverlay = document.createElement("div");
      glossOverlay.className = "icon-gloss-overlay";
      serviceIcon.appendChild(glossOverlay);
    }

    // 6. Add ripple effect on click
    item.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";

      const rect = rippleContainer.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      rippleContainer.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 800);
    });

    // 7. Add 3D tilt effect based on mouse position
    item.addEventListener("mousemove", function (e) {
      if (!item.matches(":hover")) return;

      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt values (max ±5 degrees)
      const tiltX = (y / rect.height - 0.5) * 10;
      const tiltY = (x / rect.width - 0.5) * -10;

      // Apply 3D transform to item
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px) scale(1.05)`;

      // Dynamic shadow based on tilt
      const shadowX = (x / rect.width - 0.5) * 10;
      const shadowY = (y / rect.height - 0.5) * 10;
      item.style.boxShadow = `
        ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.08),
        ${shadowX / 2}px ${shadowY / 2}px 15px rgba(226, 20, 108, 0.1),
        0 5px 10px rgba(226, 20, 108, 0.05),
        inset 0 1px 1px rgba(255, 255, 255, 0.9)
      `;

      // Apply 3D transform to icon
      const icon = item.querySelector(".service-icon");
      if (icon) {
        const iconTiltX = tiltX * 1.5; // Amplify icon tilt for more pronounced effect
        const iconTiltY = tiltY * 1.5;
        icon.style.transform = `rotateX(${iconTiltX}deg) rotateY(${iconTiltY}deg) translateZ(40px) scale(1.4)`;
      }

      // Move glossy overlay based on mouse position
      const glossOverlay = item.querySelector(".icon-gloss-overlay");
      if (glossOverlay) {
        const moveX = (x / rect.width) * 100 - 50;
        const moveY = (y / rect.height) * 100 - 50;
        glossOverlay.style.background = `radial-gradient(
          circle at ${50 + moveX / 2}% ${50 + moveY / 2}%,
          rgba(255, 255, 255, 0.7) 0%,
          rgba(255, 255, 255, 0) 60%
        )`;
      }
    });

    // 8. Reset transform on mouse leave
    item.addEventListener("mouseleave", function () {
      item.style.transform = "";
      item.style.boxShadow = "";

      // Reset icon transform
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transform = "";
      }

      // Wait a small amount of time before allowing transitions again
      setTimeout(() => {
        item.style.transition = "all 0.45s cubic-bezier(0.19, 1, 0.22, 1)";
        if (icon) {
          icon.style.transition = "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      }, 50);
    });

    // 9. Disable transitions during mouse movement for smoothness
    item.addEventListener("mouseenter", function () {
      item.style.transition = "none";

      // Disable icon transition
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transition = "none";
      }

      // Initial transform to avoid jump
      item.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-12px) scale(1.05)";

      // Force browser to apply the transitions
      setTimeout(() => {
        item.style.transition = "none";
        if (icon) {
          icon.style.transition = "none";
        }
      }, 10);
    });
  });

  // Create staggered hover effect when neighboring items are hovered
  serviceItems.forEach((item, index) => {
    item.addEventListener("mouseenter", function () {
      // Calculate row and column in the grid
      const row = Math.floor(index / 4); // Assuming 4 columns
      const col = index % 4;

      // Get neighboring items
      serviceItems.forEach((otherItem, otherIndex) => {
        const otherRow = Math.floor(otherIndex / 4);
        const otherCol = otherIndex % 4;

        // Check if it's a direct neighbor
        const isNeighbor =
          (otherRow === row && Math.abs(otherCol - col) === 1) || // Left or right
          (otherCol === col && Math.abs(otherRow - row) === 1); // Above or below

        if (isNeighbor) {
          // Apply subtle hover effect to neighbors
          otherItem.classList.add("neighbor-hover");

          // Subtle tilt towards the hovered item
          const tiltX = (otherRow - row) * 3;
          const tiltY = (otherCol - col) * 3;

          otherItem.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(1.02)`;
          otherItem.style.zIndex = "5";

          // Add relationship indicator line
          createRelationLine(item, otherItem, index, otherIndex);
        }
      });
    });

    item.addEventListener("mouseleave", function () {
      // Remove hover effect from neighbors
      document.querySelectorAll(".neighbor-hover").forEach((neighbor) => {
        neighbor.classList.remove("neighbor-hover");
        neighbor.style.transform = "";
        neighbor.style.zIndex = "";
      });

      // Remove relationship lines
      removeRelationLines(index);
    });
  });

  // Function to create relation line between items
  function createRelationLine(item, otherItem, index, otherIndex) {
    if (!document.querySelector(`.relation-line-${index}-${otherIndex}`)) {
      const relationLine = document.createElement("div");
      relationLine.className = `relation-line relation-line-${index}-${otherIndex}`;
      relationLine.style.position = "absolute";
      relationLine.style.zIndex = "1";
      relationLine.style.pointerEvents = "none";
      relationLine.style.opacity = "0";
      relationLine.style.transition = "opacity 0.3s ease";

      const itemRect = item.getBoundingClientRect();
      const otherRect = otherItem.getBoundingClientRect();

      // Calculate line position
      const x1 = itemRect.left + itemRect.width / 2;
      const y1 = itemRect.top + itemRect.height / 2;
      const x2 = otherRect.left + otherRect.width / 2;
      const y2 = otherRect.top + otherRect.height / 2;

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.style.position = "fixed";
      svg.style.top = "0";
      svg.style.left = "0";
      svg.style.pointerEvents = "none";

      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      const linearGradient = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      linearGradient.setAttribute("id", `lineGradient-${index}-${otherIndex}`);
      linearGradient.setAttribute("x1", "0%");
      linearGradient.setAttribute("y1", "0%");
      linearGradient.setAttribute("x2", "100%");
      linearGradient.setAttribute("y2", "0%");

      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("offset", "0%");
      stop1.setAttribute("stop-color", "rgba(226, 20, 108, 0.7)");

      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop2.setAttribute("offset", "100%");
      stop2.setAttribute("stop-color", "rgba(226, 20, 108, 0.2)");

      linearGradient.appendChild(stop1);
      linearGradient.appendChild(stop2);
      defs.appendChild(linearGradient);
      svg.appendChild(defs);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1.toString());
      line.setAttribute("y1", y1.toString());
      line.setAttribute("x2", x2.toString());
      line.setAttribute("y2", y2.toString());
      line.setAttribute("stroke", `url(#lineGradient-${index}-${otherIndex})`);
      line.setAttribute("stroke-width", "2");
      line.setAttribute("stroke-dasharray", "5,5");

      svg.appendChild(line);
      relationLine.appendChild(svg);
      document.body.appendChild(relationLine);

      // Fade in the line
      setTimeout(() => {
        relationLine.style.opacity = "1";
      }, 10);
    }
  }

  // Function to remove relation lines
  function removeRelationLines(index) {
    document
      .querySelectorAll(`[class^="relation-line-${index}-"]`)
      .forEach((line) => {
        line.style.opacity = "0";
        // Remove after fade out
        setTimeout(() => {
          if (line.parentNode) {
            line.parentNode.removeChild(line);
          }
        }, 300);
      });

    document
      .querySelectorAll(`[class^="relation-line-"][class$="-${index}"]`)
      .forEach((line) => {
        line.style.opacity = "0";
        // Remove after fade out
        setTimeout(() => {
          if (line.parentNode) {
            line.parentNode.removeChild(line);
          }
        }, 300);
      });
  }

  // Enhanced Service Item Hover Effects
  serviceItems.forEach((item) => {
    // Add hover arrow for the right side arrow effect
    const hoverArrow = document.createElement("div");
    hoverArrow.className = "hover-arrow";
    const arrowIcon = document.createElement("i");
    arrowIcon.className = "fas fa-arrow-right";
    hoverArrow.appendChild(arrowIcon);
    item.appendChild(hoverArrow);

    // Create service content wrapper for 3D effect if not already created
    const serviceContent = item.querySelector(".service-content");
    if (!serviceContent) {
      const serviceIcon = item.querySelector(".service-icon");
      const serviceName = item.querySelector(".service-name");

      if (
        serviceIcon &&
        serviceName &&
        !item.querySelector(".service-content")
      ) {
        // Create a wrapper div
        const contentWrapper = document.createElement("div");
        contentWrapper.className = "service-content";

        // Clone the existing elements
        const iconClone = serviceIcon.cloneNode(true);
        const nameClone = serviceName.cloneNode(true);

        // Add the clones to the wrapper
        contentWrapper.appendChild(iconClone);
        contentWrapper.appendChild(nameClone);

        // Replace the original elements with the wrapper
        serviceIcon.parentNode.replaceChild(contentWrapper, serviceIcon);

        // If the name element still exists in the DOM (not removed by the replaceChild)
        if (serviceName.parentNode) {
          serviceName.parentNode.removeChild(serviceName);
        }
      }
    }
  });

  // Make sure all service items are visible at startup
  serviceItems.forEach((item, index) => {
    // Remove staggered animation that might cause some items to be hidden
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";

    // We'll keep a small animation delay for visual interest
    item.style.transitionDelay = index * 0.03 + "s";
  });

  // Adjust body padding based on service grid height
  function adjustBodyPadding() {
    const header = document.querySelector(".header");
    const servicesMenu = document.getElementById("servicesMenu");

    if (header && servicesMenu) {
      const headerHeight = header.offsetHeight;

      // Set the body padding to account for fixed header
      document.body.style.paddingTop = headerHeight + "px";

      // Make sure dropdown menu is properly sized
      servicesMenu.style.height = "auto";
      servicesMenu.style.overflowY = "visible";
    }
  }

  // Run on page load and on window resize
  adjustBodyPadding();
  window.addEventListener("resize", adjustBodyPadding);

  // Show all service items and make sure they're in the right order
  const serviceGrid = document.getElementById("serviceGrid");
  if (serviceGrid) {
    // Make sure grid is fully visible
    serviceGrid.style.display = "grid";
    serviceGrid.style.visibility = "visible";

    // Check if we have all 16 items
    const itemCount = serviceGrid.querySelectorAll(".service-item").length;
    console.log(`Found ${itemCount} service items in the grid`);

    if (itemCount < 16) {
      console.warn("Not all service items are present in the grid!");
    }
  }

  // Get elements from the DOM
  const servicesButton = document.getElementById("servicesButton");
  const servicesMenu = document.getElementById("servicesMenu");
  const userProfile = document.getElementById("userProfile");
  const userDropdown = document.getElementById("userDropdown");
  const balanceToggle = document.getElementById("balanceToggle");
  const balancePopup = document.getElementById("balancePopup");
  const popupOverlay = document.getElementById("popupOverlay");

  // Reference to popup elements
  const profilePopup = document.getElementById("profilePopup");
  const transactionPopup = document.getElementById("transactionPopup");
  const settingsPopup = document.getElementById("settingsPopup");
  const nameChangePopup = document.getElementById("nameChangePopup");
  const photoChangePopup = document.getElementById("photoChangePopup");
  const helpPopup = document.getElementById("helpPopup");

  // Sample transaction data - Should come from an API in a real app

let dataHistory;
let transactions;

fetch("http://localhost:3000/data/history", {
  method: "GET"
})
.then(async function(r1) {
  dataHistory = await r1.json();
  transactions = dataHistory.data;
  console.log(transactions);

  if (r1.ok) {
    let transactionList = document.querySelector(".transaction-list");
    transactions.forEach(function(item) {

      let TrxID  = `${Math.random()*15000}ali${item.destination[5]}`

      transactionList.innerHTML += `<div class="transaction-item">
                    <div class="transaction-details">
                        <div class="transaction-title">${item.work}</div>
                        <div class="transaction-subtitle">${item.destination}</div>
                        <div class="transaction-time">06:12pm 29/04/25</div>
                        <div class="transaction-id">TrxID: ${TrxID}</div>
                    </div>
                    <div class="transaction-amount debit">- ৳${item.amount}</div>
                </div>`;

      const transactionsContainer = transactionPopup.querySelector(".transactions-container");
      transactionsContainer.innerHTML += `<div class="transaction-item">
                    <div class="transaction-details">
                        <div class="transaction-title">${item.work}</div>
                        <div class="transaction-subtitle">${item.destination}</div>
                        <div class="transaction-time">06:12pm 29/04/25</div>
                        <div class="transaction-id">TrxID: ${TrxID}</div>
                    </div>
                    <div class="transaction-amount debit">- ৳${item.amount}</div>
                </div>`;



    });
  } else {
    alert(dataHistory.message);
  }
})
.catch(function(err) {
  console.error("Network error:", err);
});

  // Keep track of active popup
  let activePopup = null;
  let previousPopup = null;

  // Add premium hover effect to header elements
  const headerButtons = document.querySelectorAll(".nav-item, .app-btn");
  headerButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.3)";
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.boxShadow = "";
      this.style.transform = "";
    });
  });

  // Services button - clicking scrolls to the services menu
  if (servicesButton) {
    servicesButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Scroll to the services menu
      servicesMenu.scrollIntoView({ behavior: "smooth" });

      // Close other menus
      userDropdown.classList.remove("show");
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");
      closeAllPopups();

      // Reset balance toggle icon
      if (balanceToggle.classList.contains("fa-eye-slash")) {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }
    });
  }

  // Toggle user dropdown on profile click
  if (userProfile) {
    userProfile.addEventListener("click", function (e) {
      if (e.target !== balanceToggle) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");

        // Close balance popup
        balancePopup.classList.remove("show");
        balanceToggle.classList.remove("active");
        closeAllPopups();
      }
    });
  }

  // Balance toggle functionality
  if (balanceToggle) {
    balanceToggle.addEventListener("click", function (e) {
      e.stopPropagation();

      // Toggle balance popup
      balancePopup.classList.toggle("show");
      balanceToggle.classList.toggle("active");

      // Toggle icon with smooth transition
      if (balancePopup.classList.contains("show")) {
        balanceToggle.classList.remove("fa-eye");
        balanceToggle.classList.add("fa-eye-slash");
      } else {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }

      // Close dropdown if open
      userDropdown.classList.remove("show");
      closeAllPopups();
    });
  }

  // Close dropdowns when clicking outside (but don't close services menu)
  document.addEventListener("click", function (event) {
    // Close user dropdown and balance popup when clicking outside
    if (
      !userProfile.contains(event.target) &&
      !userDropdown.contains(event.target) &&
      !balanceToggle.contains(event.target) &&
      !balancePopup.contains(event.target) &&
      !event.target.closest(".popup-page") &&
      !event.target.closest(".settings-popup") &&
      !event.target.closest(".name-change-popup") &&
      !event.target.closest(".photo-change-popup") &&
      !event.target.closest(".transaction-popup") &&
      !event.target.closest(".help-popup")
    ) {
      userDropdown.classList.remove("show");
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");
      closeAllPopups();

      // Reset balance toggle icon
      if (balanceToggle.classList.contains("fa-eye-slash")) {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }
    }
  });

  // Function to show popup overlay
  function showPopupOverlay() {
    popupOverlay.style.display = "block";
    setTimeout(() => {
      popupOverlay.classList.add("active");
    }, 10);
  }

  // Function to hide popup overlay
  function hidePopupOverlay() {
    popupOverlay.classList.remove("active");
    setTimeout(() => {
      popupOverlay.style.display = "none";
    }, 300);
  }

  // Function to close all popups
  function closeAllPopups() {
    if (activePopup) {
      activePopup.classList.remove("show");
      activePopup.style.display = "none";
      hidePopupOverlay();
      activePopup = null;
      previousPopup = null;
    }
  }

  // Function to show a popup
  function showPopup(popup, parent = null) {
    if (activePopup) {
      previousPopup = activePopup;
      activePopup.classList.remove("show");
      activePopup.style.display = "none";
    } else {
      previousPopup = parent;
      showPopupOverlay();
    }

    popup.style.display = "block";
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    activePopup = popup;

    // Close the dropdown
    userDropdown.classList.remove("show");
  }

  // Function to go back to previous popup
  function goBack() {
    if (activePopup) {
      activePopup.classList.remove("show");
      activePopup.style.display = "none";

      if (previousPopup) {
        previousPopup.style.display = "block";
        setTimeout(() => {
          previousPopup.classList.add("show");
        }, 10);
        activePopup = previousPopup;
        previousPopup = null;
      } else {
        hidePopupOverlay();
        activePopup = null;
      }
    }
  }

  // Function to show profile popup
  function showProfilePopup() {
    closeAllPopups();
    showPopup(profilePopup);
  }

  // Function to show transaction history popup
  function showTransactionPopup() {
    closeAllPopups();
    showPopup(transactionPopup);

    // Clear transactions container
    // const transactionsContainer = transactionPopup.querySelector(
    //   ".transactions-container"
    // );
    // transactionsContainer.innerHTML = "";

    // Create and add transaction items
    transactions.forEach((txn) => {
      const transactionItem = document.createElement("div");
      transactionItem.className = `transaction-item ${txn.colorClass}`;

      // Create transaction icon
      const transactionIcon = document.createElement("div");
      transactionIcon.className = "transaction-icon";
      const icon = document.createElement("i");
      icon.className = `fas ${txn.iconClass}`;
      transactionIcon.appendChild(icon);

      // Create transaction details
      const transactionDetails = document.createElement("div");
      transactionDetails.className = "transaction-details";

      // Create primary info (type and amount)
      const transactionPrimary = document.createElement("div");
      transactionPrimary.className = "transaction-primary";

      const transactionType = document.createElement("div");
      transactionType.className = "transaction-type";
      transactionType.textContent = txn.type;

      const transactionAmount = document.createElement("div");
      transactionAmount.className = "transaction-amount";
      transactionAmount.textContent = txn.amount;

      transactionPrimary.appendChild(transactionType);
      transactionPrimary.appendChild(transactionAmount);

      // Create secondary info (receiver, date, status)
      const transactionSecondary = document.createElement("div");
      transactionSecondary.className = "transaction-secondary";

      const transactionInfo = document.createElement("div");
      transactionInfo.className = "transaction-info";

      const transactionReceiver = document.createElement("div");
      transactionReceiver.className = "transaction-receiver";
      transactionReceiver.textContent = txn.receiver;

      const transactionDate = document.createElement("div");
      transactionDate.className = "transaction-date";
      transactionDate.textContent = txn.date;

      transactionInfo.appendChild(transactionReceiver);
      transactionInfo.appendChild(transactionDate);

      const transactionStatus = document.createElement("div");
      transactionStatus.className = "transaction-status";
      transactionStatus.textContent = txn.status;

      transactionSecondary.appendChild(transactionInfo);
      transactionSecondary.appendChild(transactionStatus);

      // Create transaction ID
      const transactionId = document.createElement("div");
      transactionId.className = "transaction-id";
      transactionId.textContent = `আইডি: ${txn.id}`;

      // Add all elements to transaction details
      transactionDetails.appendChild(transactionPrimary);
      transactionDetails.appendChild(transactionSecondary);
      transactionDetails.appendChild(transactionId);

      // Add all elements to transaction item
      transactionItem.appendChild(transactionIcon);
      transactionItem.appendChild(transactionDetails);

      // Add transaction item to container
      transactionsContainer.appendChild(transactionItem);
    });

    // Add event listeners for filter buttons
    const filterButtons = transactionPopup.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  // Function to show settings popup
  function showSettingsPopup() {
    closeAllPopups();
    showPopup(settingsPopup);
  }

  // Function to show name change popup
  function showNameChangePopup() {
    showPopup(nameChangePopup, settingsPopup);
  }

  // Function to show photo change popup
  function showPhotoChangePopup() {
    showPopup(photoChangePopup, settingsPopup);
  }

  // Function to show help and support popup
  function showHelpPopup() {
    closeAllPopups();
    showPopup(helpPopup);

    // Add event listeners for FAQ toggles
    const faqQuestions = helpPopup.querySelectorAll(".faq-question");
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentNode;
        faqItem.classList.toggle("active");

        // Rotate chevron icon
        const icon = this.querySelector("i");
        icon.style.transform = faqItem.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      });
    });
  }

  // Add event listeners to all popup back buttons
  document.querySelectorAll(".popup-page .back-button").forEach((button) => {
    button.addEventListener("click", goBack);
  });

  // Add event listeners to user dropdown menu items
  const profileMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(1)"
  );
  const transactionMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(2)"
  );
  const settingsMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(3)"
  );
  const helpMenuItem = document.querySelector(
    ".user-dropdown-item:nth-child(4)"
  );

  if (profileMenuItem) {
    profileMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showProfilePopup();
    });
  }

  if (transactionMenuItem) {
    transactionMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showTransactionPopup();
    });
  }

  if (settingsMenuItem) {
    settingsMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showSettingsPopup();
    });
  }

  if (helpMenuItem) {
    helpMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      showHelpPopup();
    });
  }

  // Settings popup sub-menu buttons
  const nameChangeBtn = document.getElementById("nameChangeBtn");
  const photoChangeBtn = document.getElementById("photoChangeBtn");

  if (nameChangeBtn) {
    nameChangeBtn.addEventListener("click", showNameChangePopup);
  }

  if (photoChangeBtn) {
    photoChangeBtn.addEventListener("click", showPhotoChangePopup);
  }

  // Add event listener for update name button
  const updateNameBtn = document.getElementById("updateNameBtn");
  if (updateNameBtn) {
    updateNameBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const nameInput = document.getElementById("nameInput");
      const newName = nameInput.value.trim();

      if (newName !== "") {
        // Create success message element
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";

        const checkIcon = document.createElement("i");
        checkIcon.className = "fas fa-check-circle";
        successMsg.appendChild(checkIcon);

        const successText = document.createTextNode(
          " নাম সফলভাবে আপডেট হয়েছে!"
        );
        successMsg.appendChild(successText);

        // Add to popup content
        nameChangePopup.querySelector(".popup-content").appendChild(successMsg);

        // Update name in UI
        document.querySelector(".dropdown-user-name").textContent = newName;
        document.querySelector(".user-name").textContent = newName;

        // Remove success message after delay and go back
        setTimeout(() => {
          successMsg.remove();
          goBack();
        }, 1500);
      }
    });
  }

  // Add event listeners for photo change popup
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.querySelector(".photo-preview");
  const choosePhotoBtn = document.getElementById("choosePhotoBtn");
  const savePhotoBtn = document.getElementById("savePhotoBtn");

  // Make all profile images clickable to open photo change popup
  const profileImages = document.querySelectorAll(
    ".user-image img, .dropdown-user-image img, .profile-picture img"
  );

  profileImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      showPhotoChangePopup();
    });
  });

  // Add hover effect to profile images
  profileImages.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.opacity = "0.8";
      this.style.transform = "scale(1.05)";
      this.style.transition = "all 0.3s ease";
    });

    img.addEventListener("mouseleave", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    });
  });

  if (photoPreview && photoInput) {
    photoPreview.style.cursor = "pointer";
    photoPreview.addEventListener("click", function () {
      photoInput.click();
    });
  }

  if (choosePhotoBtn && photoInput) {
    choosePhotoBtn.addEventListener("click", function () {
      photoInput.click();
    });
  }

  if (photoInput) {
    photoInput.addEventListener("change", function (e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const photoImg = photoChangePopup.querySelector(".photo-preview img");
          if (photoImg) {
            photoImg.src = e.target.result;
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  if (savePhotoBtn) {
    savePhotoBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const photoImg = photoChangePopup.querySelector(".photo-preview img");
      const newPhotoSrc = photoImg ? photoImg.src : null;

      if (newPhotoSrc) {
        // Update all profile images in UI
        const allProfileImages = document.querySelectorAll(
          ".user-image img, .dropdown-user-image img, .profile-picture img"
        );
        allProfileImages.forEach((img) => {
          img.src = newPhotoSrc;
        });

        // Create success message
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";

        const checkIcon = document.createElement("i");
        checkIcon.className = "fas fa-check-circle";
        successMsg.appendChild(checkIcon);

        const successText = document.createTextNode(
          " ছবি সফলভাবে আপডেট হয়েছে!"
        );
        successMsg.appendChild(successText);

        // Add to popup content
        photoChangePopup
          .querySelector(".popup-content")
          .appendChild(successMsg);

        // Remove success message after delay and go back
        setTimeout(() => {
          successMsg.remove();
          goBack();
        }, 1500);
      }
    });
  }

  // Add edit overlay to profile picture in profile popup
  const profilePictureContainer = document.querySelector(
    ".profile-picture-container"
  );
  if (profilePictureContainer) {
    const editOverlay = document.createElement("div");
    editOverlay.className = "profile-edit-overlay";
    editOverlay.innerHTML = '<i class="fas fa-camera"></i>';
    profilePictureContainer.appendChild(editOverlay);

    profilePictureContainer.style.cursor = "pointer";
    profilePictureContainer.addEventListener("click", function () {
      showPhotoChangePopup();
    });
  }

  // Notification bell animation
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("mouseenter", function () {
      this.classList.add("bell-animated");
      setTimeout(() => {
        this.classList.remove("bell-animated");
      }, 1000);
    });
  }

  // Initialize Swiper slider if present
  if (document.querySelector(".swiper")) {
    const swiper = new Swiper(".swiper", {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      loop: true,
      effect: "fade", // Smooth fade transition
      fadeEffect: {
        crossFade: true,
      },
      speed: 800, // Transition speed
      navigation: {
        prevEl: ".swiper-custom-prev",
        nextEl: ".swiper-custom-next",
      },
      pagination: {
        el: ".swiper-pagination-bullets",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
      on: {
        init: function () {
          // Add animation to first slide
          const activeSlide = document.querySelector(".swiper-slide-active");
          if (activeSlide) {
            activeSlide.classList.add("slide-animated");
          }
        },
        slideChangeTransitionStart: function () {
          // Remove animation class from all slides
          document.querySelectorAll(".swiper-slide").forEach((slide) => {
            slide.classList.remove("slide-animated");
          });
        },
        slideChangeTransitionEnd: function () {
          // Add animation class to active slide
          const activeSlide = document.querySelector(".swiper-slide-active");
          if (activeSlide) {
            activeSlide.classList.add("slide-animated");
          }
        },
      },
    });

    // Enhanced pause/play functionality
    const pauseButton = document.querySelector(".swiper-pause");
    let isPaused = false;

    if (pauseButton) {
      pauseButton.addEventListener("click", function () {
        if (isPaused) {
          swiper.autoplay.start();
          pauseButton.textContent = "‖";
          pauseButton.title = "পজ করুন";
          isPaused = false;
        } else {
          swiper.autoplay.stop();
          pauseButton.textContent = "▶";
          pauseButton.title = "চালু করুন";
          isPaused = true;
        }
      });
    }
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Add staggered animation to service categories
  const serviceCategories = document.querySelectorAll(".service-category");
  if (serviceCategories.length > 0) {
    // Set initial styles
    serviceCategories.forEach((category) => {
      category.style.opacity = "0";
      category.style.transform = "translateY(20px)";
      category.style.transition =
        "opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    });

    // Animate when visible in viewport
    const animateOnScroll = () => {
      serviceCategories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const isInViewport = rect.top <= window.innerHeight * 0.8;

        if (isInViewport) {
          setTimeout(() => {
            category.style.opacity = "1";
            category.style.transform = "translateY(0)";
          }, index * 80); // Staggered delay
        }
      });
    };

    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener("scroll", animateOnScroll);
  }

  // Add parallax effect to banner images
  const handleParallax = () => {
    const bannerImages = document.querySelectorAll(".banner-image");
    bannerImages.forEach((image) => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 600) {
        // Only apply effect near the top of the page
        const yOffset = scrollPosition * 0.2; // Adjust speed of parallax
        image.style.transform = `translateY(${yOffset}px)`;
      }
    });
  };

  window.addEventListener("scroll", handleParallax);

  let userName = document.getElementById("userName") ;
  let userNumber = document.getElementById("userNumber") ;
  let userBalance = document.getElementById("userBalance") ;

  let profileName = document.getElementById("profileName") ;
  let profilePhone = document.getElementById("profilePhone") ;
  let profileAddress = document.getElementById("profileAddress") ;
  let profileEmail = document.getElementById("profileEmail") ;

  let nameButton = document.getElementById("nameButton") ;

  fetch("http://localhost:3000/data/fulldetails", {
    method: "GET"
  })
  .then(async function(r1){

  const details = await r1.json();

  if(r1.ok) 
  {
    let user = details.data[0] ;
    // console.log(user) ;

    userName.textContent = user.name ;
    userNumber.textContent = user._id //id = number 
    userBalance.textContent = `৳ ${user.balance}` ;

    profileName.textContent = user.name ;
    profilePhone.textContent = user._id //id = number  
    profileAddress.textContent = user.address ;
    profileEmail.textContent = `${user.name}123@gmail.com` ;

    nameButton.textContent = user.name ;

  } 
  else 
  {
    alert(details.message) ;  
  }
})
.catch(function(err){
  console.error("Network error:", err);
});


});
