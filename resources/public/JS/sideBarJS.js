// Sidebar functionality for bKash
document.addEventListener("DOMContentLoaded", function () {
  console.log("Document loaded, initializing right-side sidebar");

  // Navigation state management
  const navigationState = {
    currentPage: null,
    previousPages: [],
  };

  // Find the menu toggle element
  const menuToggle = document.querySelector(".menu-toggle");
  console.log("Menu toggle element found:", menuToggle);

  if (menuToggle) {
    menuToggle.style.cursor = "pointer";
    menuToggle.addEventListener("click", toggleSidebar);
    menuToggle.onclick = toggleSidebar;
    console.log("Click event added to menu toggle");
  }

  // Function to toggle sidebar
  function toggleSidebar() {
    console.log("Toggle sidebar function called");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  // Setup close functionality
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
    console.log("Click event added to close button");
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
    console.log("Click event added to overlay");
  }

  // Function to close sidebar
  function closeSidebar() {
    console.log("Close sidebar function called");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Set up language button functionality
  const languageButtons = document.querySelectorAll(".language-btn");
  languageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      languageButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Function to create a popup
  function createPopup(id, title, content) {
    // Close any open popup first
    closeAllPopups();

    // Update navigation state
    navigationState.previousPages.push(navigationState.currentPage);
    navigationState.currentPage = id;

    const popupContainer = document.getElementById("bkashPopupContainer");

    const popup = document.createElement("div");
    popup.id = id;
    popup.className = "bkash-popup";

    popup.innerHTML = `
      <div class="popup-header">
        <div class="popup-back">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="popup-title">${title}</div>
        <div class="popup-logo">
          <img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">
        </div>
      </div>
      <div class="popup-content">
        ${content}
      </div>
    `;

    popupContainer.appendChild(popup);

    // Add event listener for back button
    popup.querySelector(".popup-back").addEventListener("click", () => {
      handleBackButton(popup);
    });

    // Animate popup
    setTimeout(() => {
      popup.classList.add("active");
    }, 10);

    return popup;
  }

  // Function to handle back button click
  function handleBackButton(popup) {
    if (navigationState.previousPages.length > 0) {
      const previousPageId = navigationState.previousPages.pop();
      navigationState.currentPage = previousPageId;

      if (previousPageId === null) {
        // Go back to main page
        closePopup(popup);
      } else {
        // Go to previous popup
        closePopup(popup);
        // Show previous popup
        const previousPopupElement = document.getElementById(previousPageId);
        if (previousPopupElement) {
          previousPopupElement.classList.add("active");
        }
      }
    } else {
      // No previous page, just close
      closePopup(popup);
    }
  }

  // Function to close a specific popup
  function closePopup(popup) {
    popup.classList.remove("active");

    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }

  // Function to close all popups
  function closeAllPopups() {
    const popupContainer = document.getElementById("bkashPopupContainer");
    if (popupContainer) {
      const popups = popupContainer.querySelectorAll(".bkash-popup");
      popups.forEach((popup) => {
        closePopup(popup);
      });
    }
  }

  // Statement menu tab click handlers
  function setupStatementTabs() {
    const tabs = document.querySelectorAll(".statement-tab");
    const detailsContent = document.querySelector(".transaction-list");
    const summaryContent = document.querySelector(".statement-summary-tab");

    if (tabs && tabs.length === 2) {
      tabs[0].addEventListener("click", function () {
        tabs[0].classList.add("active");
        tabs[1].classList.remove("active");
        if (detailsContent && summaryContent) {
          detailsContent.style.display = "block";
          summaryContent.style.display = "none";
        }
      });

      tabs[1].addEventListener("click", function () {
        tabs[1].classList.add("active");
        tabs[0].classList.remove("active");
        if (detailsContent && summaryContent) {
          detailsContent.style.display = "none";
          summaryContent.style.display = "block";
        }
      });
    }
  }

  // Home menu click - redirect to main.html
  const homeMenu = document.getElementById("homeMenu");
  if (homeMenu) {
    homeMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();
      window.location.href = "/";
    });
  }

  // Statement menu click - show statement popup
  const statementMenu = document.getElementById("statementMenu");
  if (statementMenu) {
    statementMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const statementContent = document.getElementById(
        "statementPopupContent"
      ).innerHTML;
      const statementPopup = createPopup(
        "statementPopup",
        "স্টেটমেন্ট",
        statementContent
      );

      // Setup tabs for statement
      setTimeout(() => {
        setupStatementTabs();
      }, 100);
    });
  }

  // Limit menu click - show limits popup
  const limitMenu = document.getElementById("limitMenu");
  if (limitMenu) {
    limitMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const limitsContent =
        document.getElementById("limitPopupContent").innerHTML;
      const limitPopup = createPopup("limitPopup", "লিমিট", limitsContent);

      // Setup tabs
      setTimeout(() => {
        const limitTabs = limitPopup.querySelectorAll(".limits-tab");
        if (limitTabs && limitTabs.length === 2) {
          limitTabs.forEach((tab) => {
            tab.addEventListener("click", function () {
              limitTabs.forEach((t) => t.classList.remove("active"));
              this.classList.add("active");
            });
          });
        }

        const limitSubtabs = limitPopup.querySelectorAll(".limits-subtab");
        if (limitSubtabs && limitSubtabs.length === 2) {
          limitSubtabs.forEach((tab) => {
            tab.addEventListener("click", function () {
              limitSubtabs.forEach((t) => t.classList.remove("active"));
              this.classList.add("active");
            });
          });
        }
      }, 100);
    });
  }

  // Coupon menu click - show coupon popup
  const couponMenu = document.getElementById("couponMenu");
  if (couponMenu) {
    couponMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const couponContent =
        document.getElementById("couponPopupContent").innerHTML;
      createPopup("couponPopup", "কুপন", couponContent);
    });
  }

  // Update Info menu click - show update info popup
  const updateInfoMenu = document.getElementById("updateInfoMenu");
  if (updateInfoMenu) {
    updateInfoMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const updateInfoContent = document.getElementById(
        "updateInfoPopupContent"
      ).innerHTML;
      createPopup("updateInfoPopup", "তথ্য হালনাগাদ", updateInfoContent);
    });
  }

  // Nominee Info Update menu click
  const nomineeUpdateMenu = document.getElementById("nomineeUpdateMenu");
  if (nomineeUpdateMenu) {
    nomineeUpdateMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const nomineeUpdateContent = document.getElementById(
        "nomineeUpdatePopupContent"
      ).innerHTML;
      createPopup(
        "nomineeUpdatePopup",
        "নমিনির তথ্য হালনাগাদ",
        nomineeUpdateContent
      );
    });
  }

  // Refer bKash App menu click
  const referMenu = document.getElementById("referMenu");
  if (referMenu) {
    referMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const referContent =
        document.getElementById("referPopupContent").innerHTML;
      createPopup("referPopup", "রেফার SurePay অ্যাপ", referContent);
    });
  }

  // bKash Map menu click
  const bkashMapMenu = document.getElementById("bkashMapMenu");
  if (bkashMapMenu) {
    bkashMapMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const mapContent = document.getElementById(
        "bkashMapPopupContent"
      ).innerHTML;
      const mapPopup = createPopup("bkashMapPopup", "SurePay ম্যাপ", mapContent);

      // Add interactivity to map controls
      setTimeout(() => {
        const zoomButtons = mapPopup.querySelectorAll(".map-zoom-button");
        const centerButton = mapPopup.querySelector(".map-center-button");
        const mapPlaceholder = mapPopup.querySelector(".map-placeholder");

        if (zoomButtons && zoomButtons.length === 2) {
          // Zoom in button
          zoomButtons[0].addEventListener("click", function () {
            mapPlaceholder.style.transform = "scale(1.1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";
          });

          // Zoom out button
          zoomButtons[1].addEventListener("click", function () {
            mapPlaceholder.style.transform = "scale(1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";
          });
        }

        if (centerButton) {
          centerButton.addEventListener("click", function () {
            mapPlaceholder.style.transform = "scale(1)";
            mapPlaceholder.style.transition = "transform 0.3s ease";

            // Show loading temporarily
            const loadingText = mapPopup.querySelector(".map-loading-text");
            if (loadingText) {
              loadingText.style.display = "block";
              loadingText.textContent =
                "আপনার অবস্থান অনুসারে ম্যাপ লোড করা হচ্ছে...";

              setTimeout(() => {
                loadingText.style.display = "none";
              }, 1500);
            }
          });
        }
      }, 100);
    });
  }

  // About bKash Menu click
  const aboutBkashMenu = document.getElementById("aboutBkashMenu");
  if (aboutBkashMenu) {
    aboutBkashMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const aboutContent = document.getElementById(
        "aboutBkashPopupContent"
      ).innerHTML;
      createPopup("aboutBkashPopup", "বিকাশ নিয়ে জানুন", aboutContent);
    });
  }

  // Settings Menu Click
  const settingsMenu = document.getElementById("settingsMenu");
  if (settingsMenu) {
    settingsMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const settingsContent = document.getElementById(
        "settingsPopupContent"
      ).innerHTML;
      createPopup("settingsPopup", "সেটিংস", settingsContent);
    });
  }

  // Auto Pay Menu Click
  const autoPayMenu = document.getElementById("autoPayMenu");
  if (autoPayMenu) {
    autoPayMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const autoPayContent = document.getElementById(
        "autoPayPopupContent"
      ).innerHTML;
      const autoPayPopup = createPopup(
        "autoPayPopup",
        "অটো পে",
        autoPayContent
      );

      // Handle new auto pay button click
      setTimeout(() => {
        const newAutoPayBtn = autoPayPopup.querySelector("#newAutoPayBtn");
        const autoPayOptions = autoPayPopup.querySelector("#autoPayOptions");

        if (newAutoPayBtn && autoPayOptions) {
          newAutoPayBtn.addEventListener("click", function () {
            autoPayOptions.style.display = "grid";
            const noAutoPay = autoPayPopup.querySelector(".no-autopay");
            if (noAutoPay) {
              noAutoPay.style.display = "none";
            }
          });
        }
      }, 100);
    });
  }

  // Support Menu Click
  const supportMenu = document.getElementById("supportMenu");
  if (supportMenu) {
    supportMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const supportContent = document.getElementById(
        "supportPopupContent"
      ).innerHTML;
      const supportPopup = createPopup(
        "supportPopup",
        "হেল্প এবং সাপোর্ট",
        supportContent
      );

      // Setup FAQ accordion and contact buttons
      setTimeout(() => {
        const faqItems = supportPopup.querySelectorAll(".faq-item");
        if (faqItems && faqItems.length > 0) {
          faqItems.forEach((item) => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");

            if (question && answer) {
              answer.style.display = "none";

              question.addEventListener("click", function () {
                const isOpen = answer.style.display === "block";

                // Close all answers
                faqItems.forEach((faq) => {
                  faq.querySelector(".faq-answer").style.display = "none";
                  faq.querySelector(".fas").classList.remove("fa-chevron-up");
                  faq.querySelector(".fas").classList.add("fa-chevron-down");
                });

                // Toggle current answer
                if (!isOpen) {
                  answer.style.display = "block";
                  question
                    .querySelector(".fas")
                    .classList.remove("fa-chevron-down");
                  question.querySelector(".fas").classList.add("fa-chevron-up");
                }
              });
            }
          });
        }

        // Add click events for contact options
        const liveChat = supportPopup.querySelector("#liveChat");
        const phoneCall = supportPopup.querySelector("#phoneCall");
        const emailSupport = supportPopup.querySelector("#emailSupport");

        if (liveChat) {
          liveChat.addEventListener("click", function () {
            createLiveChatPopup();
          });
        }

        if (phoneCall) {
          phoneCall.addEventListener("click", function () {
            alert("Calling 16247...");
          });
        }

        if (emailSupport) {
          emailSupport.addEventListener("click", function () {
            createEmailPopup();
          });
        }
      }, 100);

      // Function to create live chat popup
      function createLiveChatPopup() {
        const liveChatContent = document.getElementById(
          "liveChatPopupContent"
        ).innerHTML;
        createPopup("liveChatPopup", "লাইভ চ্যাট", liveChatContent);
      }

      // Function to create email popup
      function createEmailPopup() {
        const emailContent =
          document.getElementById("emailPopupContent").innerHTML;
        createPopup("emailPopup", "ইমেইল", emailContent);
      }
    });
  }

  // WhatsNew in bKash App functionality
  const aboutBkashAppMenu = document.querySelector("#aboutBkashMenu");
  if (aboutBkashAppMenu) {
    aboutBkashAppMenu.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const whatsNewContent = document.getElementById(
        "whatsNewPopupContent"
      ).innerHTML;
      const whatsNewPopup = createPopup(
        "whatsNewPopup",
        "SurePay অ্যাপে নতুন যা আছে",
        whatsNewContent
      );

      // Add event handlers for month selector
      setTimeout(() => {
        const monthSelector = whatsNewPopup.querySelector(".month-selector");
        if (monthSelector) {
          monthSelector.addEventListener("change", function () {
            const selectedMonth = this.value;
            let updateContent;
            // Show different content based on selected month
            if (selectedMonth === "মার্চ ২০২৫") {
              // March 2025 updates
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <img src="/public/images/main/main8.jpg" alt="QR কোড" style="width: 120px; height: 120px; margin-bottom: 15px;">
                  <p style="font-size: 14px; color: #666;">QR কোড স্ক্যান করে পেমেন্ট করুন সহজেই</p>
                </div>
              `;
            } else if (selectedMonth === "ফেব্রুয়ারি ২০২৫") {
              // February 2025 updates
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <img src="/public/images/bill-payment.png" alt="বিল পেমেন্ট" style="width: 120px; height: 120px; margin-bottom: 15px;">
                  <p style="font-size: 14px; color: #666;">অটো বিল পেমেন্ট ফিচার যোগ করা হয়েছে</p>
                </div>
              `;
            } else {
              // Default for other months
              updateContent = `
                <div style="text-align: center; margin: 20px 0;">
                  <p style="font-size: 14px; color: #666;">এই মাসে কোন আপডেট নেই</p>
                </div>
              `;
            }

            // Update the content
            const contentContainer = whatsNewPopup.querySelector(
              ".whatsnew-container"
            );
            const existingContent = contentContainer.innerHTML;
            const newContent = existingContent.replace(
              /<div style="text-align: center; margin-bottom: 20px;">([\s\S]*?)<\/div>\s+<div style="background-color: #fff1f6;/,
              `<div style="text-align: center; margin-bottom: 20px;">${updateContent}</div>\n\n<div style="background-color: #fff1f6;`
            );

            contentContainer.innerHTML = newContent;
          });
        }
      }, 100);
    });
  }

  // Setup logout functionality
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Logout button clicked");

      // Show a logout confirmation notification if possible
      if (typeof showNotification === "function") {
        showNotification("লগআউট করা হচ্ছে...");
      }

      // Clear user data from localStorage
      if (localStorage.getItem("bkashUser")) {
        localStorage.removeItem("bkashUser");
        console.log("User data cleared from localStorage");
      }

      // Close the sidebar
      closeSidebar();

      // Add a small delay before redirecting
      setTimeout(() => {
        console.log("Redirecting to index.html");
        window.location.href = "/logout";
      }, 500);
    });
    console.log("Logout button event handler added");
  } else {
    console.log("Logout button not found");

    // Add a delegated event listener to handle logout
    document.addEventListener("click", function (e) {
      const target = e.target;
      const islogoutButton =
        (target.classList.contains("sidebar-menu-item") &&
          target.textContent.includes("লগ আউট")) ||
        (target.parentElement &&
          target.parentElement.classList.contains("sidebar-menu-item") &&
          target.parentElement.textContent.includes("লগ আউট"));

      if (isLogoutButton) {
        e.preventDefault();
        console.log("Logout element clicked via delegation");

        // Clear user data from localStorage
        if (localStorage.getItem("bkashUser")) {
          localStorage.removeItem("bkashUser");
          console.log("User data cleared from localStorage");
        }

        // Close the sidebar
        closeSidebar();

        // Add a small delay before redirecting
        setTimeout(() => {
          // console.log("Redirecting to index.html");
          window.location.href = "/logout";
        }, 500);
      }
    });
    console.log("Delegated logout event handler added");
  }

  console.log(
    "Right-side sidebar initialization complete with all menu functionalities"
  );
});
