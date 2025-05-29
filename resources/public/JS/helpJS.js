// বিকাশ হেল্প ড্রপডাউন মেনু - ৫টি রো সহ JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // একাধিক nav-dropdown থাকতে পারে, তাই আমরা শুধু ঐটাই সিলেক্ট করছি যেটার ভিতরে helpButton আছে
  const helpDropdown = document.querySelector(".nav-dropdown:has(#helpButton)");
  const helpButton = document.getElementById("helpButton");

  if (helpButton && helpDropdown) {
    // ড্রপডাউন মেনু ইলিমেন্ট
    const dropdownMenu = helpDropdown.querySelector(".help-dropdown-menu");

    if (dropdownMenu) {
      // হোভার ইভেন্ট হ্যান্ডলিং
      helpDropdown.addEventListener("mouseenter", function () {
        dropdownMenu.style.display = "flex";
      });

      helpDropdown.addEventListener("mouseleave", function () {
        dropdownMenu.style.display = "none";
      });

      // এছাড়াও, টাচস্ক্রিন ডিভাইসের জন্য ক্লিক ইভেন্ট হ্যান্ডলিং
      helpButton.addEventListener("click", function (e) {
        e.preventDefault();

        if (dropdownMenu.style.display === "flex") {
          dropdownMenu.style.display = "none";
        } else {
          dropdownMenu.style.display = "flex";
        }
      });
    }
  }
});

// Popup Management
function openPopup(popupId) {
  const overlay = document.getElementById("popupOverlay");
  const popup = document.getElementById(popupId);

  overlay.classList.add("active");
  popup.classList.add("active");

  // Prevent body scrolling when popup is open
  document.body.style.overflow = "hidden";
}

function closePopup(popupId) {
  const overlay = document.getElementById("popupOverlay");
  const popup = document.getElementById(popupId);

  overlay.classList.remove("active");
  popup.classList.remove("active");

  // Restore body scrolling
  document.body.style.overflow = "auto";
}

// Close popup when clicking overlay
document.getElementById("popupOverlay")?.addEventListener("click", function () {
  const activePopup = document.querySelector(".popup-container.active");
  if (activePopup) {
    closePopup(activePopup.id);
  }
});

// Event listeners for opening popups
document.addEventListener("DOMContentLoaded", function () {
  // E-Appointment
  const appointmentBtn = document.querySelector(".appointment-btn");
  if (appointmentBtn) {
    appointmentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup("appointmentMobilePopup");
    });
  }

  // Live Chat
  const chatBtn = document.querySelector(".chat-btn");
  if (chatBtn) {
    chatBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup("liveChatPopup");
    });
  }

  // SurePay Map
  const mapBtn = document.querySelector(".map-btn");
  if (mapBtn) {
    mapBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup("mapPopup");
    });
  }

  // Service links in the help cards
  const helpCards = document.querySelectorAll(".help-card-link");
  helpCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      const cardTitle =
        this.closest(".help-card").querySelector(
          ".help-card-title"
        ).textContent;

      if (cardTitle.includes("গ্রাহক সেবা কেন্দ্র")) {
        openPopup("servicePointPopup");
      } else if (cardTitle.includes("প্রতারণা এড়িয়ে চলুন")) {
        openPopup("fraudPreventionPopup");
      } else if (cardTitle.includes("চার্জ ক্যালকুলেটর")) {
        openPopup("chargeCalculatorPopup");
      } else if (cardTitle.includes("সাধারণ জিজ্ঞাসা")) {
        openPopup("faqPopup");
      }
    });
  });
});

// Show appointment form after skip
function showAppointmentForm() {
  closePopup("appointmentMobilePopup");
  setTimeout(function () {
    openPopup("appointmentFormPopup");
  }, 300);
}

// Charge Calculator Data
const chargeData = {
  balance: [
    {
      name: "কোনো চার্জ প্রযোজ্য নয় (ফ্রি)",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
  ],
  "send-money": [
    {
      name: "সেন্ড মানি",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
  ],
  "cash-out": [
    {
      name: "ক্যাশ আউট",
      charge: "১০০০ টাকার জন্য ১৭.৫০ টাকা",
    },
    {
      name: "এটিএম",
      charge: "১০০০ টাকার জন্য ১২.৭৫ টাকা",
    },
    {
      name: "পেমেন্ট (মার্চেন্ট)",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
    {
      name: "ওয়েবসাইট পেমেন্ট",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
  ],
  payment: [
    {
      name: "পেমেন্ট (মার্চেন্ট)",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
  ],
  "mobile-recharge": [
    {
      name: "মোবাইল রিচার্জ",
      charge: "কোনো চার্জ প্রযোজ্য নয়",
    },
  ],
};

// Update charge options based on selection
function updateChargeOptions() {
  const serviceSelect = document.querySelector(".service-select");
  const chargeOptionsContainer = document.getElementById(
    "chargeOptionsContainer"
  );
  const chargeInfoText = document.getElementById("chargeInfoText");

  if (serviceSelect && chargeOptionsContainer) {
    const selectedValue = serviceSelect.value;
    chargeOptionsContainer.innerHTML = "";

    if (chargeData[selectedValue]) {
      const chargeOptions = document.createElement("div");
      chargeOptions.className = "charge-options";

      chargeData[selectedValue].forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className =
          "charge-option" + (index === 0 ? " selected" : "");
        optionDiv.onclick = function () {
          selectChargeOption(this, option.charge);
        };
        optionDiv.innerHTML = "<span>" + option.name + "</span>";
        chargeOptions.appendChild(optionDiv);
      });

      chargeOptionsContainer.appendChild(chargeOptions);

      // Set initial charge info
      if (chargeData[selectedValue].length > 0) {
        chargeInfoText.textContent = chargeData[selectedValue][0].charge;
      }
    }
  }
}

function selectChargeOption(element, charge) {
  // Remove selected class from all options
  document.querySelectorAll(".charge-option").forEach(function (option) {
    option.classList.remove("selected");
  });

  // Add selected class to clicked option
  element.classList.add("selected");

  // Update charge info
  const chargeInfoText = document.getElementById("chargeInfoText");
  if (chargeInfoText) {
    chargeInfoText.textContent = charge;
  }
}

// FAQ toggle function
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector(".faq-answer");

  element.classList.toggle("active");
  answer.classList.toggle("active");

  // Rotate arrow icon
  const icon = element.querySelector("i");
  if (icon) {
    icon.style.transform = element.classList.contains("active")
      ? "rotate(180deg)"
      : "rotate(0)";
  }
}

// Close popup with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activePopup = document.querySelector(".popup-container.active");
    if (activePopup) {
      closePopup(activePopup.id);
    }
  }
});

// Search functionality for Customer Service Centers
function setupServiceCenterSearch() {
  const searchInput = document.querySelector(
    "#servicePointPopup .search-input"
  );
  const districtSelect = document.querySelector(
    "#servicePointPopup .location-select"
  );
  const areaSelect = document.querySelector("#servicePointPopup .area-select");
  const tableRows = document.querySelectorAll("#servicePointPopup tbody tr");

  // District change handler
  if (districtSelect) {
    districtSelect.addEventListener("change", function () {
      filterServiceCenters();
      // Update area options based on selected district
      updateAreaOptions();
    });
  }

  // Area change handler
  if (areaSelect) {
    areaSelect.addEventListener("change", function () {
      filterServiceCenters();
    });
  }

  // Keyword search handler
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterServiceCenters();
    });
  }

  function filterServiceCenters() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedDistrict = districtSelect ? districtSelect.value : "জেলা";
    const selectedArea = areaSelect ? areaSelect.value : "থানা";

    tableRows.forEach(function (row) {
      const district = row.cells[0].textContent.toLowerCase();
      const area = row.cells[1].textContent.toLowerCase();
      const name = row.cells[2].textContent.toLowerCase();
      const address = row.cells[3].textContent.toLowerCase();
      const landmark = row.cells[4].textContent.toLowerCase();

      let showRow = true;

      // Check keyword match
      if (keyword) {
        showRow =
          district.includes(keyword) ||
          area.includes(keyword) ||
          name.includes(keyword) ||
          address.includes(keyword) ||
          landmark.includes(keyword);
      }

      // Check district match
      if (
        selectedDistrict !== "জেলা" &&
        district !== selectedDistrict.toLowerCase()
      ) {
        showRow = false;
      }

      // Check area match
      if (selectedArea !== "থানা" && area !== selectedArea.toLowerCase()) {
        showRow = false;
      }

      row.style.display = showRow ? "" : "none";
    });
  }

  function updateAreaOptions() {
    const selectedDistrict = districtSelect ? districtSelect.value : "";
    const areas = new Set(["থানা"]);

    if (selectedDistrict !== "জেলা") {
      tableRows.forEach(function (row) {
        if (row.cells[0].textContent === selectedDistrict) {
          areas.add(row.cells[1].textContent);
        }
      });
    }

    if (areaSelect) {
      areaSelect.innerHTML = "";
      areas.forEach(function (area) {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        areaSelect.appendChild(option);
      });
    }
  }
}

// Search functionality for FAQ
function setupFaqSearch() {
  const searchInput = document.querySelector("#faqPopup .search-input");
  const categorySelect = document.querySelector("#faqPopup .category-select");
  const faqItems = document.querySelectorAll("#faqPopup .faq-item");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterFaqItems();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      filterFaqItems();
    });
  }

  function filterFaqItems() {
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categorySelect
      ? categorySelect.value
      : "ক্যাটাগরি";

    faqItems.forEach(function (item) {
      const question = item
        .querySelector(".faq-question h3")
        .textContent.toLowerCase();
      const answer = item
        .querySelector(".faq-answer p")
        .textContent.toLowerCase();

      let showItem = true;

      // Check keyword match
      if (keyword) {
        showItem = question.includes(keyword) || answer.includes(keyword);
      }

      // Check category match (if categories are implemented)
      if (selectedCategory !== "ক্যাটাগরি") {
        // Add category filtering logic here if needed
      }

      item.style.display = showItem ? "" : "none";
    });
  }
}

// Search functionality for Fraud Prevention
function setupFraudSearch() {
  const fraudContent = document.querySelector(
    "#fraudPreventionPopup .fraud-content"
  );
  if (!fraudContent) return;

  // Add search input to fraud prevention popup
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-bar";
  searchContainer.innerHTML = `
    <input type="text" placeholder="খুঁজুন..." class="search-input" id="fraudSearchInput">
  `;

  // Insert search bar after the title
  const fraudTitle = fraudContent.querySelector("h3");
  if (fraudTitle) {
    fraudTitle.parentNode.insertBefore(searchContainer, fraudTitle.nextSibling);
  }

  const searchInput = document.getElementById("fraudSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase();
      const sections = fraudContent.querySelectorAll("h4, h5, p, li");

      sections.forEach(function (section) {
        const text = section.textContent.toLowerCase();
        const parent = section.parentElement;

        if (keyword === "") {
          section.style.backgroundColor = "";
          section.style.display = "";
          if (parent.style) parent.style.display = "";
        } else if (text.includes(keyword)) {
          section.style.backgroundColor = "#fff5f8";
          section.style.display = "";
          if (parent.style) parent.style.display = "";
        } else {
          // Hide elements that don't match, but show parent if child matches
          if (!parent.textContent.toLowerCase().includes(keyword)) {
            section.style.display = "none";
          }
        }
      });
    });
  }
}

// Initialize search functionality when popups are opened
document.addEventListener("DOMContentLoaded", function () {
  // Set up initial state for charge calculator
  updateChargeOptions();

  // Add event listeners for popup opening to initialize search
  const serviceBtn = document.querySelector(".help-card-link");
  if (serviceBtn) {
    serviceBtn.addEventListener("click", function () {
      setTimeout(setupServiceCenterSearch, 100);
    });
  }

  const faqBtn = document.querySelector('.help-card-link[href="#faq"]');
  if (faqBtn) {
    faqBtn.addEventListener("click", function () {
      setTimeout(setupFaqSearch, 100);
    });
  }

  // Initialize search when popups open
  const originalOpenPopup = window.openPopup;
  window.openPopup = function (popupId) {
    originalOpenPopup(popupId);

    setTimeout(function () {
      if (popupId === "servicePointPopup") {
        setupServiceCenterSearch();
      } else if (popupId === "faqPopup") {
        setupFaqSearch();
      } else if (popupId === "fraudPreventionPopup") {
        setupFraudSearch();
      }
    }, 100);
  };

  // Add smooth scrolling to popup content
  const popupBodies = document.querySelectorAll(".popup-body");
  popupBodies.forEach(function (body) {
    body.addEventListener("scroll", function () {
      // Add shadow when scrolled
      if (body.scrollTop > 10) {
        body.style.boxShadow = "inset 0 5px 10px -5px rgba(0,0,0,0.1)";
      } else {
        body.style.boxShadow = "none";
      }
    });
  });
});

// Utility function to format phone numbers
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.substr(0, 11);
  }
  input.value = value;
}

// Add phone number formatting to phone inputs
document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      formatPhoneNumber(this);
    });
  });
});
