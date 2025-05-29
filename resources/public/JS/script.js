// bKash Homepage JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Services Dropdown Menu Functionality
  const loginButton = document.getElementById("Button");
  const serviceGrid = document.getElementById("loginButton");

  // Toggle services dropdown when button is clicked
  if (loginButton && serviceGrid) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Toggle active class and show class
      this.classList.toggle("active");
      serviceGrid.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !loginButton.contains(e.target) &&
        !serviceGrid.contains(e.target) &&
        serviceGrid.classList.contains("show")
      ) {
        loginButton.classList.remove("active");
        serviceGrid.classList.remove("show");
      }
    });
  }

  // Add click handlers for service items with proper navigation
  const serviceItems = document.querySelectorAll(
    ".service-item, .service-category"
  );

  serviceItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only if the item has a hyperlink, navigate to it
      if (href && href !== "#") {
        // Don't stop propagation or prevent default
        // This allows the natural link behavior

        // For send money specifically
        if (
          href === "sendMoney.html" ||
          this.querySelector(".service-name")?.textContent.trim() ===
            "সেন্ড মানি" ||
          this.querySelector(".service-category-title")?.textContent.trim() ===
            "সেন্ড মানি"
        ) {
          window.location.href = "sendMoney.html";
        } else {
          window.location.href = href;
        }
      }
    });

    // Make sure all child elements don't interfere with click
    const childElements = item.querySelectorAll("*");
    childElements.forEach(function (child) {
      child.addEventListener("click", function (e) {
        // Don't stop propagation - let the click bubble up to the parent
        // so the link navigation works properly
      });
    });
  });

  // Initialize Swiper Slider
  const swiper = new Swiper(".swiper", {
    // Basic parameters
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    // Default navigation & pagination (hidden in CSS, but used for functionality)
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Custom slider navigation
  const customPrev = document.querySelector(".swiper-custom-prev");
  const customNext = document.querySelector(".swiper-custom-next");
  const pauseButton = document.querySelector(".swiper-pause");

  if (customPrev) {
    customPrev.addEventListener("click", function () {
      swiper.slidePrev();
    });
  }

  if (customNext) {
    customNext.addEventListener("click", function () {
      swiper.slideNext();
    });
  }

  let isAutoplayPaused = false;
  if (pauseButton) {
    pauseButton.addEventListener("click", function () {
      if (isAutoplayPaused) {
        swiper.autoplay.start();
        pauseButton.innerHTML = "‖";
        isAutoplayPaused = false;
      } else {
        swiper.autoplay.stop();
        pauseButton.innerHTML = "▶";
        isAutoplayPaused = true;
      }
    });
  }

  // Custom pagination bullets
  const paginationBullets = document.querySelectorAll(
    ".swiper-pagination-bullets .swiper-pagination-bullet"
  );
  if (paginationBullets.length > 0) {
    paginationBullets.forEach((bullet, index) => {
      bullet.addEventListener("click", function () {
        swiper.slideTo(index);

        // Update active bullet
        paginationBullets.forEach((b) =>
          b.classList.remove("swiper-pagination-bullet-active")
        );
        this.classList.add("swiper-pagination-bullet-active");
      });
    });

    // Update bullets when slide changes
    swiper.on("slideChange", function () {
      const activeIndex = swiper.realIndex;
      paginationBullets.forEach((bullet, index) => {
        if (index === activeIndex) {
          bullet.classList.add("swiper-pagination-bullet-active");
        } else {
          bullet.classList.remove("swiper-pagination-bullet-active");
        }
      });
    });
  }

  // Language toggle functionality
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      langButtons.forEach(function (btn) {
        btn.classList.remove("active-lang");
      });
      this.classList.add("active-lang");
    });
  });

  // Sticky navbar behavior
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (header) {
      if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    }
  });

  // Mobile menu toggle (for responsive design)
  const mobileMenuButton = document.createElement("button");
  mobileMenuButton.className = "mobile-menu-toggle";
  mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';

  const header = document.querySelector(".header");
  if (header) {
    header.appendChild(mobileMenuButton);

    mobileMenuButton.addEventListener("click", function () {
      const nav = document.querySelector(".nav");
      if (nav) {
        nav.classList.toggle("show-mobile");
      }
    });
  }

  // Update active nav items based on current page
  function setActiveNavItems() {
    // Get current page URL
    const currentPage = window.location.pathname.split("/").pop();

    // Check and apply active class to nav items
    if (currentPage === "sendMoney.html") {
      // For the main nav
      const navItems = document.querySelectorAll(".nav-item");
      navItems.forEach((item) => {
        if (item.textContent.trim() === "সার্ভিসেস") {
          item.classList.add("active");
        }
      });

      // For the dropdown menu
      const serviceItems = document.querySelectorAll(".service-item");
      serviceItems.forEach((item) => {
        if (
          item.querySelector(".service-name")?.textContent.trim() ===
          "সেন্ড মানি"
        ) {
          item.classList.add("active");
        }
      });

      // For the footer links
      const footerLinks = document.querySelectorAll(".footer-links a");
      footerLinks.forEach((link) => {
        if (link.textContent.trim() === "সেন্ড মানি") {
          link.classList.add("active-link");
        }
      });
    }
  }

  // Call the function to set active items
  setActiveNavItems();

  // FAQ toggle functionality for Send Money page
  const faqQuestions = document.querySelectorAll(".faq-question");
  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector(".faq-icon i");
        const isOpen = answer.style.maxHeight;

        // Close all other FAQs
        document.querySelectorAll(".faq-answer").forEach((item) => {
          item.style.maxHeight = null;
        });

        document.querySelectorAll(".faq-icon i").forEach((item) => {
          item.className = "fas fa-plus";
        });

        // Open the clicked FAQ
        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.className = "fas fa-minus";
        }
      });
    });
  }
});
