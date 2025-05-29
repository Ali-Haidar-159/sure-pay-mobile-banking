// bKash Student Account JavaScript
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  handleScrollEffects();
  initializePopups();
});

// Header functionality
function initializeHeader() {
  const header = document.querySelector(".header");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Mobile menu toggle
  const createMobileMenu = () => {
    if (document.querySelector(".mobile-menu-toggle")) return;

    const mobileToggle = document.createElement("button");
    mobileToggle.classList.add("mobile-menu-toggle");
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';

    const rightNav = document.querySelector(".right-nav");
    rightNav.prepend(mobileToggle);

    const nav = document.querySelector(".nav");

    mobileToggle.addEventListener("click", () => {
      nav.classList.toggle("mobile-active");
      mobileToggle.innerHTML = nav.classList.contains("mobile-active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  };

  // Check screen size and create mobile menu if needed
  const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
      createMobileMenu();
    } else {
      const mobileToggle = document.querySelector(".mobile-menu-toggle");
      if (mobileToggle) {
        mobileToggle.remove();
        document.querySelector(".nav").classList.remove("mobile-active");
      }
    }
  };

  // Handle dropdown toggles
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const siblingDropdown = toggle.nextElementSibling;

      // Close other open dropdowns
      document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
        if (menu !== siblingDropdown) {
          menu.classList.remove("active");
        }
      });

      // Toggle this dropdown
      if (
        siblingDropdown &&
        siblingDropdown.classList.contains("dropdown-menu")
      ) {
        siblingDropdown.classList.toggle("active");
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-toggle")) {
      document.querySelectorAll(".dropdown-menu.active").forEach((menu) => {
        menu.classList.remove("active");
      });
    }
  });

  // Initialize
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
}

// Scroll effects
function handleScrollEffects() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Section animations on scroll
  const animateSections = () => {
    const sections = document.querySelectorAll(
      ".content-text, .warning-section, .promo-image, .links-section"
    );

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach((section) => {
        section.classList.add("section-hidden");
        observer.observe(section);
      });
    } else {
      // Fallback for older browsers
      sections.forEach((section) => {
        section.classList.add("animate");
      });
    }
  };

  // Call animation function
  animateSections();
}

// Initialize all popups
function initializePopups() {
  initializeTermsPopup();
  initializeOfferPopup();
  initializeFaqPopup();
  initializeLanguageSelector();
  initializeLiveChat();
}

// Terms and Conditions Popup Functionality
function initializeTermsPopup() {
  // Get popup elements
  const termsPopup = document.getElementById("terms-popup");
  const popupClose = document.getElementById("popup-close");
  const termsLink = document.querySelector(".info-link:first-child"); // The first info-link (শর্তাবলি)

  if (!termsPopup || !popupClose || !termsLink) return;

  // Function to open popup
  function openPopup() {
    termsPopup.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Add keyboard event listener for escape key
    document.addEventListener("keydown", handleEscKey);

    // Animate entrance
    setTimeout(() => {
      const popupContent = termsPopup.querySelector(".popup-content");
      if (popupContent) {
        popupContent.style.opacity = "1";
        popupContent.style.transform = "translateY(0)";
      }
    }, 50);
  }

  // Function to close popup
  function closePopup() {
    // Animate exit
    const popupContent = termsPopup.querySelector(".popup-content");
    if (popupContent) {
      popupContent.style.opacity = "0";
      popupContent.style.transform = "translateY(20px)";
    }

    // Delay removing the active class to allow animation to complete
    setTimeout(() => {
      termsPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling

      // Remove keyboard event listener
      document.removeEventListener("keydown", handleEscKey);
    }, 300);
  }

  // Function to handle escape key press
  function handleEscKey(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  // Function to handle click outside popup content
  function handleOutsideClick(e) {
    if (e.target === termsPopup) {
      closePopup();
    }
  }

  // Set up event listeners
  termsLink.addEventListener("click", function (e) {
    e.preventDefault();
    openPopup();
  });

  popupClose.addEventListener("click", closePopup);
  termsPopup.addEventListener("click", handleOutsideClick);

  // Add a subtle highlight effect when scrolling through terms
  const termsBody = termsPopup.querySelector(".popup-body");
  if (termsBody) {
    termsBody.addEventListener("scroll", function () {
      const scrollPosition = termsBody.scrollTop;
      const headings = termsBody.querySelectorAll("h3, h4");

      headings.forEach((heading) => {
        const headingPosition = heading.offsetTop;

        if (scrollPosition > headingPosition - 100) {
          // Add highlight class to current heading
          heading.classList.add("highlight");
        } else {
          // Remove highlight from other headings
          heading.classList.remove("highlight");
        }
      });
    });
  }

  // Add ripple effect to close button
  popupClose.addEventListener("mousedown", function (e) {
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
}

// Offer Details Popup Functionality
function initializeOfferPopup() {
  // Get popup elements
  const offerPopup = document.getElementById("offer-popup");
  const popupClose = document.getElementById("offer-popup-close");
  const offerLink = document.querySelector(".info-link:nth-child(2)"); // The second info-link (অফারের বিস্তারিত)

  if (!offerPopup || !popupClose || !offerLink) return;

  // Function to open popup
  function openPopup() {
    offerPopup.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Add keyboard event listener for escape key
    document.addEventListener("keydown", handleEscKey);

    // Animate entrance
    setTimeout(() => {
      const popupContent = offerPopup.querySelector(".popup-content");
      if (popupContent) {
        popupContent.style.opacity = "1";
        popupContent.style.transform = "translateY(0)";
      }
    }, 50);
  }

  // Function to close popup
  function closePopup() {
    // Animate exit
    const popupContent = offerPopup.querySelector(".popup-content");
    if (popupContent) {
      popupContent.style.opacity = "0";
      popupContent.style.transform = "translateY(20px)";
    }

    // Delay removing the active class to allow animation to complete
    setTimeout(() => {
      offerPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling

      // Remove keyboard event listener
      document.removeEventListener("keydown", handleEscKey);
    }, 300);
  }

  // Function to handle escape key press
  function handleEscKey(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  // Function to handle click outside popup content
  function handleOutsideClick(e) {
    if (e.target === offerPopup) {
      closePopup();
    }
  }

  // Set up event listeners
  offerLink.addEventListener("click", function (e) {
    e.preventDefault();
    openPopup();
  });

  popupClose.addEventListener("click", closePopup);
  offerPopup.addEventListener("click", handleOutsideClick);

  // Add interactive effects to make the popup more engaging
  const tableRows = offerPopup.querySelectorAll(".offer-table tbody tr");
  if (tableRows.length > 0) {
    tableRows.forEach((row) => {
      if (!row.classList.contains("section-header")) {
        row.addEventListener("mouseenter", function () {
          this.style.backgroundColor = "#fff5f8";
        });

        row.addEventListener("mouseleave", function () {
          if (this.classList.contains("total-row")) {
            this.style.backgroundColor = "#fff5f8";
          } else if (this.classList.contains("section-header")) {
            this.style.backgroundColor = "#fff5f8";
          } else {
            this.style.backgroundColor = "";
          }
        });
      }
    });
  }

  // Add ripple effect to close button
  popupClose.addEventListener("mousedown", function (e) {
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
}

// FAQ Popup Functionality
function initializeFaqPopup() {
  // Get popup elements
  const faqPopup = document.getElementById("faq-popup");
  const popupClose = document.getElementById("faq-popup-close");
  const faqLink = document.querySelector(".info-link:nth-child(3)"); // The third info-link (সাধারণ জিজ্ঞাসা)

  if (!faqPopup || !popupClose || !faqLink) return;

  // Function to open popup
  function openPopup() {
    faqPopup.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    // Add keyboard event listener for escape key
    document.addEventListener("keydown", handleEscKey);

    // Animate entrance
    setTimeout(() => {
      const popupContent = faqPopup.querySelector(".popup-content");
      if (popupContent) {
        popupContent.style.opacity = "1";
        popupContent.style.transform = "translateY(0)";
      }
    }, 50);
  }

  // Function to close popup
  function closePopup() {
    // Animate exit
    const popupContent = faqPopup.querySelector(".popup-content");
    if (popupContent) {
      popupContent.style.opacity = "0";
      popupContent.style.transform = "translateY(20px)";
    }

    // Delay removing the active class to allow animation to complete
    setTimeout(() => {
      faqPopup.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scrolling

      // Remove keyboard event listener
      document.removeEventListener("keydown", handleEscKey);
    }, 300);
  }

  // Function to handle escape key press
  function handleEscKey(e) {
    if (e.key === "Escape") {
      closePopup();
    }
  }

  // Function to handle click outside popup content
  function handleOutsideClick(e) {
    if (e.target === faqPopup) {
      closePopup();
    }
  }

  // Set up event listeners
  faqLink.addEventListener("click", function (e) {
    e.preventDefault();
    openPopup();
  });

  popupClose.addEventListener("click", closePopup);
  faqPopup.addEventListener("click", handleOutsideClick);

  // Add interactive effects for FAQ items
  const faqItems = faqPopup.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      // Add hover effect
      item.addEventListener("mouseenter", function () {
        item.classList.add("highlight");
      });

      item.addEventListener("mouseleave", function () {
        item.classList.remove("highlight");
      });

      // Make FAQ items focusable for accessibility
      question.setAttribute("tabindex", "0");

      // Add keyboard navigation
      question.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.classList.add("highlight");

          // Remove highlight after a delay
          setTimeout(() => {
            item.classList.remove("highlight");
          }, 1000);
        }
      });
    });
  }

  // Add ripple effect to close button
  popupClose.addEventListener("mousedown", function (e) {
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
}

// Language switcher
function initializeLanguageSelector() {
  const langLinks = document.querySelectorAll(".language-selector .lang");

  langLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      langLinks.forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Here you would add logic to actually change the language
      // For example: switchLanguage(this.textContent.trim());
    });
  });
}

// Live chat functionality
function initializeLiveChat() {
  const liveChat = document.querySelector(".live-chat");

  if (liveChat) {
    liveChat.addEventListener("click", function (e) {
      e.preventDefault();

      // Here you would add logic to open a chat window
      // For example: openChatWindow();

      // For now, just add a bouncing animation
      this.classList.add("bounce");

      setTimeout(() => {
        this.classList.remove("bounce");
      }, 1000);
    });
  }
}

// Add dynamic CSS styles
document.addEventListener("DOMContentLoaded", function () {
  const style = document.createElement("style");
  style.textContent = `
    .popup-close .ripple {
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
    
    .highlight {
        transition: color 0.3s ease;
        color: #e2146c !important;
    }
    
    .section-hidden {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .bounce {
        animation: bounce 0.5s ease;
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    /* Mobile Menu Styles */
    .mobile-menu-toggle {
        display: none;
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .nav {
            position: fixed;
            top: 60px;
            left: -100%;
            width: 100%;
            height: auto;
            background: var(--primary-color);
            flex-direction: column;
            padding: 20px;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav.mobile-active {
            left: 0;
        }
        
        .nav-item {
            padding: 15px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
        }
    }
  `;
  document.head.appendChild(style);
});

// Function to handle opening the Terms popup programmatically
function openTermsPopup() {
  const termsPopup = document.getElementById("terms-popup");
  if (termsPopup) {
    termsPopup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Function to handle opening the Offer popup programmatically
function openOfferPopup() {
  const offerPopup = document.getElementById("offer-popup");
  if (offerPopup) {
    offerPopup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Function to handle opening the FAQ popup programmatically
function openFaqPopup() {
  const faqPopup = document.getElementById("faq-popup");
  if (faqPopup) {
    faqPopup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}
