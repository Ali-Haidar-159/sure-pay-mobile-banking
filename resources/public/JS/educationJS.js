// Education Fee Payment System
document.addEventListener("DOMContentLoaded", function () {

  let allDetails = {} ; 

  // Main sections
  const mainSelectionSection = document.getElementById("mainSelectionSection");
  const schoolListSection = document.getElementById("schoolListSection");
  const collegeListSection = document.getElementById("collegeListSection");
  const universityListSection = document.getElementById("universityListSection");
  const trainingListSection = document.getElementById("trainingListSection");
  const otherListSection = document.getElementById("otherListSection");

  // Options
  const schoolOption = document.getElementById("schoolOption");
  const collegeOption = document.getElementById("collegeOption");
  const universityOption = document.getElementById("universityOption");
  const trainingOption = document.getElementById("trainingOption");
  const otherOption = document.getElementById("otherOption");
  const receiptOption = document.querySelector(".receipt-option");

  // Main search input
  const mainSearchInput = document.querySelector(".search-input");
  const mainSearchBtn = document.querySelector(".search-btn");

  // Lists containers
  const institutesList = document.getElementById("institutesList");

  // Main container to apply blur effect
  const educationFeeContainer = document.querySelector(
    ".education-fee-container"
  );

  // Popup overlay
  const popupOverlay = document.getElementById("popupOverlay");

  // Templates
  const categoryPopupTemplate = document.getElementById(
    "categoryPopupTemplate"
  );
  const paymentFormTemplate = document.getElementById("paymentFormTemplate");
  const confirmationTemplate = document.getElementById("confirmationTemplate");
  const pinEntryTemplate = document.getElementById("pinEntryTemplate");
  const successTemplate = document.getElementById("successTemplate");
  const loadingTemplate = document.getElementById("loadingTemplate");
  const notificationTemplate = document.getElementById("notificationTemplate");

  // Education data
  const institutions = {
    schools: [
      {
        id: 1,
        name: "Viqarunnisa Noon School & College",
        logo: "images/schools/vns.png",
        type: "স্কুল",
      },
      {
        id: 2,
        name: "Monipur Uchcha Vidyalaya & College",
        logo: "images/schools/muvc.png",
        type: "স্কুল",
      },
      {
        id: 3,
        name: "Rajshahi Cantonment Public School & College",
        logo: "images/schools/rcpsc.png",
        type: "স্কুল",
      },
      {
        id: 4,
        name: "Ispahani Girls School & College",
        logo: "images/schools/igsc.png",
        type: "স্কুল",
      },
      {
        id: 5,
        name: "Barishal Zilla School",
        logo: "images/schools/bzs.png",
        type: "স্কুল",
      },
      {
        id: 6,
        name: "Government Mohammadpur Model School and College",
        logo: "images/schools/gmmsc.png",
        type: "স্কুল",
      },
      {
        id: 7,
        name: "Mohammadpur Govt High School",
        logo: "images/schools/mghs.png",
        type: "স্কুল",
      },
      {
        id: 8,
        name: "International Hope School Bangladesh",
        logo: "images/schools/ihsb.png",
        type: "স্কুল",
      },
      {
        id: 9,
        name: "Nirjhor Cantonment Public School & College",
        logo: "images/schools/ncpsc.png",
        type: "স্কুল",
      },
      {
        id: 10,
        name: "GPCPSC",
        logo: "images/schools/gpcpsc.png",
        type: "স্কুল",
      },
    ],
    colleges: [
      {
        id: 11,
        name: "Dhaka College",
        logo: "images/colleges/dhaka-college.png",
        type: "কলেজ",
      },
      {
        id: 12,
        name: "Eden Mohila College",
        logo: "images/colleges/eden.png",
        type: "কলেজ",
      },
      {
        id: 13,
        name: "Chittagong College",
        logo: "images/colleges/chittagong.png",
        type: "কলেজ",
      },
      {
        id: 14,
        name: "Govt Shahid Suhrawardy College",
        logo: "images/colleges/suhrawardy.png",
        type: "কলেজ",
      },
      {
        id: 15,
        name: "Gurudayal Government College",
        logo: "images/colleges/gurudayal.png",
        type: "কলেজ",
      },
      {
        id: 16,
        name: "Sher E Bangla Nagar Adarsha Mohila Mohabiddaloy",
        logo: "images/colleges/sher-e-bangla.png",
        type: "কলেজ",
      },
      {
        id: 17,
        name: "Brindaban Govt College Habiganj",
        logo: "images/colleges/brindaban.png",
        type: "কলেজ",
      },
      {
        id: 18,
        name: "Lalmatia Mohila College",
        logo: "images/colleges/lalmatia.png",
        type: "কলেজ",
      },
      {
        id: 19,
        name: "Adamjee Cantonment College",
        logo: "images/colleges/adamjee.png",
        type: "কলেজ",
      },
      {
        id: 20,
        name: "SOS Hermann Gmeinar College",
        logo: "images/colleges/sos.png",
        type: "কলেজ",
      },
    ],
    universities: [
      {
        id: 21,
        name: "BUET",
        logo: "images/universities/buet.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 22,
        name: "BUET Admission",
        logo: "images/universities/buet.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 23,
        name: "Daffodil International University",
        logo: "images/universities/diu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 24,
        name: "World University of Bangladesh",
        logo: "images/universities/wub.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 25,
        name: "Uttara University",
        logo: "images/universities/uu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 26,
        name: "Bangladesh University of Business & Technology (BUBT)",
        logo: "images/universities/bubt.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 27,
        name: "Varendra University",
        logo: "images/universities/vu.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 28,
        name: "Atish Dipankar University of Science & Technology",
        logo: "images/universities/adust.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 29,
        name: "University of South Asia",
        logo: "images/universities/usa.png",
        type: "ইউনিভার্সিটি",
      },
      {
        id: 30,
        name: "Manarat International University (MIU)",
        logo: "images/universities/miu.png",
        type: "ইউনিভার্সিটি",
      },
    ],
    training: [
      {
        id: 31,
        name: "BMET",
        logo: "images/training/bmet.png",
        type: "ট্রেনিং",
      },
      {
        id: 32,
        name: "Eduman",
        logo: "images/training/eduman.png",
        type: "ট্রেনিং",
      },
      {
        id: 33,
        name: "BOESL",
        logo: "images/training/boesl.png",
        type: "ট্রেনিং",
      },
      {
        id: 34,
        name: "eShiksa",
        logo: "images/training/eshiksa.png",
        type: "ট্রেনিং",
      },
    ],
    others: [
      {
        id: 35,
        name: "BTEB",
        logo: "images/others/bteb.png",
        type: "অন্যান্য",
      },
      {
        id: 36,
        name: "MCPSC",
        logo: "images/others/mcpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 37,
        name: "DCGPSC",
        logo: "images/others/dcgpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 38,
        name: "RCPSC",
        logo: "images/others/rcpsc.png",
        type: "অন্যান্য",
      },
      {
        id: 39,
        name: "BCPSC-Bogura",
        logo: "images/others/bcpsc.png",
        type: "অন্যান্য",
      },
    ],
  };

  // Get all institutions in a single array
  const allInstitutions = [
    ...institutions.schools,
    ...institutions.colleges,
    ...institutions.universities,
    ...institutions.training,
    ...institutions.others,
  ];

  // State
  let currentInstitution = null;

  // Clear the institution names from main section
  if (institutesList) {
    institutesList.innerHTML = "";
  }

  // Function to apply blur effect to main container
  function applyBlurEffect() {
    if (educationFeeContainer) {
      educationFeeContainer.classList.add("blur");
    }

    // Show the popup overlay
    if (popupOverlay) {
      popupOverlay.style.visibility = "visible";
      popupOverlay.style.opacity = "1";
    }
  }

  // Function to remove blur effect from main container
  function removeBlurEffect() {
    if (educationFeeContainer) {
      educationFeeContainer.classList.remove("blur");
    }

    // Hide the popup overlay
    if (popupOverlay) {
      popupOverlay.style.visibility = "hidden";
      popupOverlay.style.opacity = "0";
    }
  }

  // Function to hide all sections
  function hideAllSections() {
    const allSections = [
      mainSelectionSection,
      schoolListSection,
      collegeListSection,
      universityListSection,
      trainingListSection,
      otherListSection,
    ];

    allSections.forEach((section) => {
      if (section) section.style.display = "none";
    });
  }

  // Show section with popup style for category sections
  function showSection(section) {
    // For main section, show it directly
    if (section === mainSelectionSection) {
      hideAllSections();
      section.style.display = "block";
      return;
    }
  }

  // Close all popups
  function closeAllPopups() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => {
      closePopup(popup);
    });
  }

  // Close popup
  function closePopup(popup) {
    if (!popup) return;

    popup.classList.remove("show");
    setTimeout(() => {
      popup.remove();

      // Check if there are other popups visible
      const remainingPopups = document.querySelectorAll(".popup.show");
      if (remainingPopups.length === 0) {
        // Only remove blur if no other popups are showing
        removeBlurEffect();
      }
    }, 300);
  }

  // Function to perform main search
  function performMainSearch() {
    const searchQuery = mainSearchInput.value.toLowerCase().trim();

    if (searchQuery.length === 0) {
      return;
    }

    // Search across all institutions
    const searchResults = allInstitutions.filter(
      (institution) =>
        institution.name.toLowerCase().includes(searchQuery) ||
        institution.type.toLowerCase().includes(searchQuery)
    );

    // Show search results popup
    showSearchResultsPopup(searchResults, searchQuery);
  }

  // Function to show search results
  function showSearchResultsPopup(results, query) {
    // Close any existing popups first
    closeAllPopups();

    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "searchResultsPopup";

    // Create the header
    const popupHeader = document.createElement("div");
    popupHeader.className = "popup-header";

    // Create back button
    const backButton = document.createElement("div");
    backButton.className = "back-arrow";
    backButton.id = "backFromSearch";
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';

    // Create title
    const popupTitle = document.createElement("div");
    popupTitle.className = "popup-title";
    popupTitle.textContent = "Search Results";

    // Create logo
    const popupLogo = document.createElement("div");
    popupLogo.className = "popup-logo";
    popupLogo.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">';

    // Append header elements
    popupHeader.appendChild(backButton);
    popupHeader.appendChild(popupTitle);
    popupHeader.appendChild(popupLogo);

    // Create content
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";

    // Create search container
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    const searchInputWrapper = document.createElement("div");
    searchInputWrapper.className = "search-input-wrapper";

    const searchIcon = document.createElement("span");
    searchIcon.className = "search-icon";
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.value = query;
    searchInput.placeholder = "Search institution...";
    searchInput.className = "search-input popup-search";

    const searchBtn = document.createElement("button");
    searchBtn.className = "search-btn popup-search-btn";
    searchBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';

    searchInputWrapper.appendChild(searchIcon);
    searchInputWrapper.appendChild(searchInput);
    searchInputWrapper.appendChild(searchBtn);
    searchContainer.appendChild(searchInputWrapper);

    // Create results list
    const resultsList = document.createElement("div");
    resultsList.className = "institutions-list";
    resultsList.id = "searchResultsList";

    // Append all to popup content
    popupContent.appendChild(searchContainer);
    popupContent.appendChild(resultsList);

    // Add all to popup
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);

    // Add to body
    document.body.appendChild(popup);

    // Populate the search results list
    if (results.length === 0) {
      const noResults = document.createElement("div");
      noResults.style.textAlign = "center";
      noResults.style.padding = "20px";
      noResults.style.color = "#666";
      noResults.textContent = `No institutions found for "${query}"`;
      resultsList.appendChild(noResults);
    } else {
      populateInstitutionList(resultsList, results);
    }

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    backButton.addEventListener("click", function () {
      closePopup(popup);
    });

    // Setup search in popup
    if (searchInput && searchBtn) {
      // Handle search button click
      searchBtn.addEventListener("click", function () {
        const newQuery = searchInput.value.toLowerCase().trim();

        if (newQuery.length === 0) {
          resultsList.innerHTML = "";
          return;
        }

        const newResults = allInstitutions.filter(
          (institution) =>
            institution.name.toLowerCase().includes(newQuery) ||
            institution.type.toLowerCase().includes(newQuery)
        );

        resultsList.innerHTML = "";

        if (newResults.length === 0) {
          const noResults = document.createElement("div");
          noResults.style.textAlign = "center";
          noResults.style.padding = "20px";
          noResults.style.color = "#666";
          noResults.textContent = `No institutions found for "${newQuery}"`;
          resultsList.appendChild(noResults);
        } else {
          populateInstitutionList(resultsList, newResults);
        }
      });

      // Handle Enter key press
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          searchBtn.click();
        }
      });

      // Focus the search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }

  // Create category popup
  function createCategoryPopup(category) {
    // Close any existing popups first
    closeAllPopups();

    // Apply blur effect to main container
    applyBlurEffect();

    // Determine the title and data based on the category
    let title = "";
    let institutionData = [];

    switch (category) {
      case "স্কুল":
        title = "স্কুল";
        institutionData = institutions.schools;
        break;
      case "কলেজ":
        title = "কলেজ";
        institutionData = institutions.colleges;
        break;
      case "ইউনিভার্সিটি":
        title = "ইউনিভার্সিটি";
        institutionData = institutions.universities;
        break;
      case "ট্রেনিং":
        title = "ট্রেনিং";
        institutionData = institutions.training;
        break;
      case "অন্যান্য":
        title = "অন্যান্য";
        institutionData = institutions.others;
        break;
      default:
        return;
    }

    // Create popup from template
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "categoryPopup";

    if (categoryPopupTemplate) {
      popup.innerHTML = categoryPopupTemplate.innerHTML.replace(
        "{categoryTitle}",
        title
      );
    } else {
      // Fallback if template doesn't exist
      const popupHeader = document.createElement("div");
      popupHeader.className = "popup-header";

      const backButton = document.createElement("div");
      backButton.className = "back-arrow";
      backButton.id = "backFromCategory";
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';

      const popupTitle = document.createElement("div");
      popupTitle.className = "popup-title";
      popupTitle.textContent = title;

      const popupLogo = document.createElement("div");
      popupLogo.className = "popup-logo";
      popupLogo.innerHTML =
        '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">';

      popupHeader.appendChild(backButton);
      popupHeader.appendChild(popupTitle);
      popupHeader.appendChild(popupLogo);

      const popupContent = document.createElement("div");
      popupContent.className = "popup-content";

      const searchContainer = document.createElement("div");
      searchContainer.className = "search-container";

      const searchInputWrapper = document.createElement("div");
      searchInputWrapper.className = "search-input-wrapper";

      const searchIcon = document.createElement("span");
      searchIcon.className = "search-icon";
      searchIcon.innerHTML = '<i class="fas fa-search"></i>';

      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.placeholder = "Search institution...";
      searchInput.className = "search-input popup-search";

      const searchBtn = document.createElement("button");
      searchBtn.className = "search-btn";
      searchBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';

      searchInputWrapper.appendChild(searchIcon);
      searchInputWrapper.appendChild(searchInput);
      searchInputWrapper.appendChild(searchBtn);
      searchContainer.appendChild(searchInputWrapper);

      const institutionsList = document.createElement("div");
      institutionsList.className = "institutions-list";
      institutionsList.id = "popupList";

      popupContent.appendChild(searchContainer);
      popupContent.appendChild(institutionsList);

      popup.appendChild(popupHeader);
      popup.appendChild(popupContent);
    }

    // Add to body
    document.body.appendChild(popup);

    // Populate the institution list
    const popupList = popup.querySelector("#popupList");
    populateInstitutionList(popupList, institutionData);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromCategory");
    backBtn.addEventListener("click", function () {
      closePopup(popup);
      // Remove blur effect when returning to main screen
      removeBlurEffect();
    });

    // Setup search in popup
    const searchInput = popup.querySelector(".popup-search");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();

        if (query.length === 0) {
          populateInstitutionList(popupList, institutionData);
          return;
        }

        const searchResults = institutionData.filter((institution) =>
          institution.name.toLowerCase().includes(query)
        );

        populateInstitutionList(popupList, searchResults);
      });

      // Focus the search input
      setTimeout(() => {
        searchInput.focus();
      }, 300);
    }
  }

  // Function to populate institution list
  function populateInstitutionList(container, institutions) {
    if (!container) return;

    container.innerHTML = "";

    institutions.forEach((institution) => {
      const instituteItem = document.createElement("div");
      instituteItem.className = "institute-item";
      instituteItem.setAttribute("data-id", institution.id);
      instituteItem.setAttribute("data-type", institution.type);

      const logoDiv = document.createElement("div");
      logoDiv.className = "institute-logo";

      const logoImg = document.createElement("img");
      logoImg.src = institution.logo;
      logoImg.alt = institution.name;
      logoImg.onerror = function () {
        this.src =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4=";
      };

      logoDiv.appendChild(logoImg);

      const detailsDiv = document.createElement("div");
      detailsDiv.className = "institute-details";

      const nameDiv = document.createElement("div");
      nameDiv.className = "institute-name";
      nameDiv.textContent = institution.name;

      const typeDiv = document.createElement("div");
      typeDiv.className = "institute-type";
      typeDiv.textContent = institution.type;

      detailsDiv.appendChild(nameDiv);
      detailsDiv.appendChild(typeDiv);

      instituteItem.appendChild(logoDiv);
      instituteItem.appendChild(detailsDiv);

      instituteItem.addEventListener("click", function () {
        showInstitutionPaymentForm(institution);
      });

      container.appendChild(instituteItem);
    });
  }

  // Function to show institution payment form
  function showInstitutionPaymentForm(institution) {
    currentInstitution = institution;

    // Close any existing popups
    closeAllPopups();

    // Make sure blur effect is applied
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "paymentFormPopup";

    if (paymentFormTemplate) {
      let content = paymentFormTemplate.innerHTML;
      content = content.replace("{institutionLogo}", institution.logo);
      content = content.replace("{institutionName}", institution.name);
      content = content.replace("{institutionType}", institution.type);
      popup.innerHTML = content;
    } else {
      // Fallback if template doesn't exist
      // Create popup header
      const popupHeader = document.createElement("div");
      popupHeader.className = "popup-header";

      const backButton = document.createElement("div");
      backButton.className = "back-arrow";
      backButton.id = "backFromPaymentForm";
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';

      const popupTitle = document.createElement("div");
      popupTitle.className = "popup-title";
      popupTitle.textContent = "এডুকেশন ফি";

      const popupLogo = document.createElement("div");
      popupLogo.className = "popup-logo";
      popupLogo.innerHTML =
        '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">';

      popupHeader.appendChild(backButton);
      popupHeader.appendChild(popupTitle);
      popupHeader.appendChild(popupLogo);

      // Create popup content
      const popupContent = document.createElement("div");
      popupContent.className = "popup-content";

      // Institution item
      const instituteItem = document.createElement("div");
      instituteItem.className = "institute-item";
      instituteItem.style.marginBottom = "20px";

      const instituteLogo = document.createElement("div");
      instituteLogo.className = "institute-logo";

      const logoImg = document.createElement("img");
      logoImg.src = institution.logo;
      logoImg.alt = institution.name;
      logoImg.onerror = function () {
        this.src =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4=";
      };

      const instituteDetails = document.createElement("div");
      instituteDetails.className = "institute-details";

      const instituteName = document.createElement("div");
      instituteName.className = "institute-name";
      instituteName.textContent = institution.name;

      const instituteType = document.createElement("div");
      instituteType.className = "institute-type";
      instituteType.textContent = institution.type;

      instituteDetails.appendChild(instituteName);
      instituteDetails.appendChild(instituteType);

      instituteLogo.appendChild(logoImg);
      instituteItem.appendChild(instituteLogo);
      instituteItem.appendChild(instituteDetails);

      // Form container
      const popupForm = document.createElement("form");
      popupForm.className = "popup-form";
      popupForm.id = "paymentForm";

      const formFieldsContainer = document.createElement("div");
      formFieldsContainer.id = "formFieldsContainer";

      popupForm.appendChild(formFieldsContainer);

      popupContent.appendChild(instituteItem);
      popupContent.appendChild(popupForm);

      // Create popup action buttons
      const popupAction = document.createElement("div");
      popupAction.className = "popup-action";

      const cancelBtn = document.createElement("button");
      cancelBtn.className = "cancel-btn";
      cancelBtn.id = "cancelPayment";
      cancelBtn.textContent = "Cancel";

      const proceedBtn = document.createElement("button");
      proceedBtn.className = "proceed-btn";
      proceedBtn.id = "proceedPayment";
      proceedBtn.textContent = "Pay";

      popupAction.appendChild(cancelBtn);
      popupAction.appendChild(proceedBtn);

      // Assemble popup
      popup.appendChild(popupHeader);
      popup.appendChild(popupContent);
      popup.appendChild(popupAction);
    }

    // Add to body
    document.body.appendChild(popup);

    // Get formFieldsContainer and populate it
    const formFieldsContainer = popup.querySelector("#formFieldsContainer");
    if (formFieldsContainer) {
      const fields = generateFieldsHTML(institution.type);
      formFieldsContainer.appendChild(fields);
    }

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromPaymentForm");
    const cancelBtn = popup.querySelector("#cancelPayment");
    const proceedBtn = popup.querySelector("#proceedPayment");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      // Open the category popup again
      createCategoryPopup(institution.type);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    proceedBtn.addEventListener("click", function () {
      processPayment();
    });

    // Add input validation
    const paymentAmount = popup.querySelector("#paymentAmount");
    const studentIdField = document.getElementById("field_student_id");

    // Validate 9-digit student ID
    if (studentIdField) {
      studentIdField.addEventListener("input", function () {
        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        // Limit to 9 digits
        if (this.value.length > 9) {
          this.value = this.value.slice(0, 9);
        }
      });
    }

    if (paymentAmount) {
      paymentAmount.addEventListener("input", function () {
        const amount = parseFloat(this.value);
        proceedBtn.disabled = isNaN(amount) || amount < 10;
      });
    }

    // Set initial state of proceed button
    proceedBtn.disabled = true;
  }

  // Function to generate fields based on institution type
  function generateFieldsHTML(institutionType) {
    let fields = document.createDocumentFragment();

    // Common fields - Student ID
    const studentIDGroup = document.createElement("div");
    studentIDGroup.className = "form-group";

    const studentIDLabel = document.createElement("label");
    studentIDLabel.className = "form-label";
    studentIDLabel.textContent = "Student ID (9 digits)";

    const studentIDInput = document.createElement("input");
    studentIDInput.type = "text";
    studentIDInput.className = "form-input";
    studentIDInput.id = "field_student_id";
    studentIDInput.maxLength = 9;
    studentIDInput.pattern = "[0-9]{9}";
    studentIDInput.placeholder = "Enter your 9-digit student ID";

    studentIDGroup.appendChild(studentIDLabel);
    studentIDGroup.appendChild(studentIDInput);
    fields.appendChild(studentIDGroup);

    // Institution-specific fields
    if (institutionType === "স্কুল" || institutionType === "কলেজ") {
      // Bill Period fields
      const billPeriodGroup = document.createElement("div");
      billPeriodGroup.className = "form-group";

      const billPeriodLabel = document.createElement("label");
      billPeriodLabel.className = "form-label";
      billPeriodLabel.textContent = "Bill Period";

      const periodContainer = document.createElement("div");
      periodContainer.style.display = "flex";
      periodContainer.style.gap = "10px";

      // Month select
      const monthSelect = document.createElement("select");
      monthSelect.className = "form-select";
      monthSelect.id = "field_month";
      monthSelect.style.flex = "1";

      const monthOption = document.createElement("option");
      monthOption.value = "";
      monthOption.textContent = "Month";
      monthSelect.appendChild(monthOption);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      months.forEach((month) => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
      });

      // Year select
      const yearSelect = document.createElement("select");
      yearSelect.className = "form-select";
      yearSelect.id = "field_year";
      yearSelect.style.flex = "1";

      const yearOption = document.createElement("option");
      yearOption.value = "";
      yearOption.textContent = "Year";
      yearSelect.appendChild(yearOption);

      const years = ["2024", "2025"];
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });

      periodContainer.appendChild(monthSelect);
      periodContainer.appendChild(yearSelect);

      billPeriodGroup.appendChild(billPeriodLabel);
      billPeriodGroup.appendChild(periodContainer);
      fields.appendChild(billPeriodGroup);
    } else if (institutionType === "ইউনিভার্সিটি") {
      // Payment Type field
      const paymentTypeGroup = document.createElement("div");
      paymentTypeGroup.className = "form-group";

      const paymentTypeLabel = document.createElement("label");
      paymentTypeLabel.className = "form-label";
      paymentTypeLabel.textContent = "Payment Type";

      const paymentTypeSelect = document.createElement("select");
      paymentTypeSelect.className = "form-select";
      paymentTypeSelect.id = "field_payment_type";

      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select payment type";
      paymentTypeSelect.appendChild(defaultOption);

      const paymentTypes = [
        "Hall Fee",
        "Registration Fee",
        "Dining Fee",
        "Certificate Fee",
        "Job Fee",
      ];
      paymentTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        paymentTypeSelect.appendChild(option);
      });

      paymentTypeGroup.appendChild(paymentTypeLabel);
      paymentTypeGroup.appendChild(paymentTypeSelect);
      fields.appendChild(paymentTypeGroup);
    } else if (institutionType === "ট্রেনিং") {
      // Passport Number field
      const passportGroup = document.createElement("div");
      passportGroup.className = "form-group";

      const passportLabel = document.createElement("label");
      passportLabel.className = "form-label";
      passportLabel.textContent = "Passport Number";

      const passportInput = document.createElement("input");
      passportInput.type = "text";
      passportInput.className = "form-input";
      passportInput.id = "field_passport_number";
      passportInput.placeholder = "Enter your passport number";

      passportGroup.appendChild(passportLabel);
      passportGroup.appendChild(passportInput);
      fields.appendChild(passportGroup);

      // Bill Period fields for training
      const billPeriodGroup = document.createElement("div");
      billPeriodGroup.className = "form-group";

      const billPeriodLabel = document.createElement("label");
      billPeriodLabel.className = "form-label";
      billPeriodLabel.textContent = "Bill Period";

      const periodContainer = document.createElement("div");
      periodContainer.style.display = "flex";
      periodContainer.style.gap = "10px";

      // Month select
      const monthSelect = document.createElement("select");
      monthSelect.className = "form-select";
      monthSelect.id = "field_month";
      monthSelect.style.flex = "1";

      const monthOption = document.createElement("option");
      monthOption.value = "";
      monthOption.textContent = "Month";
      monthSelect.appendChild(monthOption);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      months.forEach((month) => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
      });

      // Year select
      const yearSelect = document.createElement("select");
      yearSelect.className = "form-select";
      yearSelect.id = "field_year";
      yearSelect.style.flex = "1";

      const yearOption = document.createElement("option");
      yearOption.value = "";
      yearOption.textContent = "Year";
      yearSelect.appendChild(yearOption);

      const years = ["2024", "2025"];
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });

      periodContainer.appendChild(monthSelect);
      periodContainer.appendChild(yearSelect);

      billPeriodGroup.appendChild(billPeriodLabel);
      billPeriodGroup.appendChild(periodContainer);
      fields.appendChild(billPeriodGroup);
    } else {
      // For other institution types - Bill Period fields
      const billPeriodGroup = document.createElement("div");
      billPeriodGroup.className = "form-group";

      const billPeriodLabel = document.createElement("label");
      billPeriodLabel.className = "form-label";
      billPeriodLabel.textContent = "Bill Period";

      const periodContainer = document.createElement("div");
      periodContainer.style.display = "flex";
      periodContainer.style.gap = "10px";

      // Month select
      const monthSelect = document.createElement("select");
      monthSelect.className = "form-select";
      monthSelect.id = "field_month";
      monthSelect.style.flex = "1";

      const monthOption = document.createElement("option");
      monthOption.value = "";
      monthOption.textContent = "Month";
      monthSelect.appendChild(monthOption);

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      months.forEach((month) => {
        const option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthSelect.appendChild(option);
      });

      // Year select
      const yearSelect = document.createElement("select");
      yearSelect.className = "form-select";
      yearSelect.id = "field_year";
      yearSelect.style.flex = "1";

      const yearOption = document.createElement("option");
      yearOption.value = "";
      yearOption.textContent = "Year";
      yearSelect.appendChild(yearOption);

      const years = ["2024", "2025"];
      years.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
      });

      periodContainer.appendChild(monthSelect);
      periodContainer.appendChild(yearSelect);

      billPeriodGroup.appendChild(billPeriodLabel);
      billPeriodGroup.appendChild(periodContainer);
      fields.appendChild(billPeriodGroup);
    }

    // Amount field for all types
    const amountGroup = document.createElement("div");
    amountGroup.className = "form-group";

    const amountLabel = document.createElement("label");
    amountLabel.className = "form-label";
    amountLabel.textContent = "Amount";

    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.className = "form-input";
    amountInput.id = "paymentAmount";
    amountInput.placeholder = "Enter amount";

    const infoText = document.createElement("div");
    infoText.className = "info-text";
    infoText.textContent = "Minimum payment amount: ৳10";

    amountGroup.appendChild(amountLabel);
    amountGroup.appendChild(amountInput);
    amountGroup.appendChild(infoText);
    fields.appendChild(amountGroup);

    return fields;
  }

  // Process payment
  function processPayment() {
    // Get payment amount
    const amountInput = document.getElementById("paymentAmount");
    if (!amountInput) return;

    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount < 10) {
      showNotification("Please enter a valid amount (minimum ৳10)");
      return;
    }

    // Get all fields values
    const formData = {};

    // Student ID
    const studentIdField = document.getElementById("field_student_id");
    if (studentIdField && !studentIdField.value) {
      showNotification("Please enter your Student ID");
      return;
    } else if (studentIdField) {
      // Validate 9-digit student ID
      if (
        studentIdField.value.length !== 9 ||
        !/^\d{9}$/.test(studentIdField.value)
      ) {
        showNotification("Please enter a valid 9-digit Student ID");
        return;
      }
      formData.student_id = studentIdField.value;
    }

    // Payment type for university
    if (currentInstitution.type === "ইউনিভার্সিটি") {
      const paymentTypeField = document.getElementById("field_payment_type");
      if (paymentTypeField && !paymentTypeField.value) {
        showNotification("Please select a payment type");
        return;
      } else if (paymentTypeField) {
        formData.payment_type = paymentTypeField.value;
      }
    }

    // Passport number for training
    if (currentInstitution.type === "ট্রেনিং") {
      const passportField = document.getElementById("field_passport_number");
      if (passportField && !passportField.value) {
        showNotification("Please enter your passport number");
        return;
      } else if (passportField) {
        formData.passport_number = passportField.value;
      }
    }

    // Bill period for all except university
    if (currentInstitution.type !== "ইউনিভার্সিটি") {
      const monthField = document.getElementById("field_month");
      const yearField = document.getElementById("field_year");

      if (monthField && !monthField.value) {
        showNotification("Please select a month");
        return;
      } else if (monthField) {
        formData.month = monthField.value;
      }

      if (yearField && !yearField.value) {
        showNotification("Please select a year");
        return;
      } else if (yearField) {
        formData.year = yearField.value;
      }
    }

    // Add amount to form data
    formData.amount = amount;

    // Close payment form
    const paymentFormPopup = document.getElementById("paymentFormPopup");
    if (paymentFormPopup) {
      closePopup(paymentFormPopup);
    }

    // Show confirmation popup
    showConfirmationPopup(amount, formData);
  }

  // Show confirmation popup
  function showConfirmationPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "confirmationPopup";

    if (confirmationTemplate) {
      let content = confirmationTemplate.innerHTML;
      content = content.replace("{institutionLogo}", currentInstitution.logo);
      content = content.replace("{institutionName}", currentInstitution.name);
      popup.innerHTML = content;

      // Populate transaction details
      const detailsContainer = popup.querySelector("#transactionDetails");
      if (detailsContainer) {
        let detailsHTML = "";

        // Institution name
        detailsHTML += createDetailRow("Institution", currentInstitution.name);

        // Student ID
        detailsHTML += createDetailRow(
          "Student ID",
          formData.student_id || "N/A"
        );

        // Institution-specific details
        if (
          currentInstitution.type === "ইউনিভার্সিটি" &&
          formData.payment_type
        ) {
          detailsHTML += createDetailRow("Payment Type", formData.payment_type);
        } else if (
          currentInstitution.type === "ট্রেনিং" &&
          formData.passport_number
        ) {
          detailsHTML += createDetailRow(
            "Passport Number",
            formData.passport_number
          );
          if (formData.month && formData.year) {
            detailsHTML += createDetailRow(
              "Bill Period",
              `${formData.month} ${formData.year}`
            );
          }
        } else if (formData.month && formData.year) {
          detailsHTML += createDetailRow(
            "Bill Period",
            `${formData.month} ${formData.year}`
          );
        }

        // Amount
        detailsHTML += createDetailRow("Amount", `৳${amount.toFixed(2)}`);

        detailsContainer.innerHTML = detailsHTML;
      }
    } else {
      // Fallback if template doesn't exist
      // This creates the popup structure programmatically
      // ... (similar to the detailed structure in showInstitutionPaymentForm)
      const popupHeader = document.createElement("div");
      popupHeader.className = "popup-header";

      const backButton = document.createElement("div");
      backButton.className = "back-arrow";
      backButton.id = "backFromConfirmation";
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';

      const popupTitle = document.createElement("div");
      popupTitle.className = "popup-title";
      popupTitle.textContent = "Confirmation";

      const popupLogo = document.createElement("div");
      popupLogo.className = "popup-logo";
      popupLogo.innerHTML =
        '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো">';

      popupHeader.appendChild(backButton);
      popupHeader.appendChild(popupTitle);
      popupHeader.appendChild(popupLogo);

      // Create content
      const popupContent = document.createElement("div");
      popupContent.className = "popup-content";

      // Institution logo
      const instituteItem = document.createElement("div");
      instituteItem.className = "institute-item";
      instituteItem.style.marginBottom = "20px";

      const instituteLogo = document.createElement("div");
      instituteLogo.className = "institute-logo";

      const logoImg = document.createElement("img");
      logoImg.src = currentInstitution.logo;
      logoImg.alt = currentInstitution.name;
      logoImg.onerror = function () {
        this.src =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMjE0NmMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZyI+PHJlY3QgeD0iNCIgeT0iMiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik05IDIydi00aDZ2NCIvPjxwYXRoIGQ9Ik04IDZoLjAxIi8+PHBhdGggZD0iTTE2IDZoLjAxIi8+PHBhdGggZD0iTTggMTBoLjAxIi8+PHBhdGggZD0iTTE2IDEwaC4wMSIvPjxwYXRoIGQ9Ik04IDE0aC4wMSIvPjxwYXRoIGQ9Ik0xNiAxNGguMDEiLz48L3N2Zz4=";
      };

      instituteLogo.appendChild(logoImg);
      instituteItem.appendChild(instituteLogo);

      // Transaction details
      const transactionDetails = document.createElement("div");
      transactionDetails.className = "transaction-details";
      transactionDetails.id = "transactionDetails";

      // Institution name
      let detailRow = createDetailElementRow(
        "Institution",
        currentInstitution.name
      );
      transactionDetails.appendChild(detailRow);

      // Student ID
      detailRow = createDetailElementRow(
        "Student ID",
        formData.student_id || "N/A"
      );
      transactionDetails.appendChild(detailRow);

      // Institution-specific details
      if (currentInstitution.type === "ইউনিভার্সিটি" && formData.payment_type) {
        detailRow = createDetailElementRow(
          "Payment Type",
          formData.payment_type
        );
        transactionDetails.appendChild(detailRow);
      } else if (
        currentInstitution.type === "ট্রেনিং" &&
        formData.passport_number
      ) {
        detailRow = createDetailElementRow(
          "Passport Number",
          formData.passport_number
        );
        transactionDetails.appendChild(detailRow);
        if (formData.month && formData.year) {
          detailRow = createDetailElementRow(
            "Bill Period",
            `${formData.month} ${formData.year}`
          );
          transactionDetails.appendChild(detailRow);
        }
      } else if (formData.month && formData.year) {
        detailRow = createDetailElementRow(
          "Bill Period",
          `${formData.month} ${formData.year}`
        );
        transactionDetails.appendChild(detailRow);
      }

      // Amount
      detailRow = createDetailElementRow("Amount", `৳${amount.toFixed(2)}`);
      transactionDetails.appendChild(detailRow);

      // Info text
      const infoText = document.createElement("div");
      infoText.className = "info-text";
      infoText.style.textAlign = "center";
      infoText.style.margin = "20px 0";
      infoText.textContent =
        "Please confirm the details above to proceed with payment.";

      popupContent.appendChild(instituteItem);
      popupContent.appendChild(transactionDetails);
      popupContent.appendChild(infoText);

      // Action buttons
      const popupAction = document.createElement("div");
      popupAction.className = "popup-action";

      const cancelBtn = document.createElement("button");
      cancelBtn.className = "cancel-btn";
      cancelBtn.id = "cancelConfirmation";
      cancelBtn.textContent = "Cancel";

      const confirmBtn = document.createElement("button");
      confirmBtn.className = "proceed-btn";
      confirmBtn.id = "confirmPayment";
      confirmBtn.textContent = "Confirm";

      popupAction.appendChild(cancelBtn);
      popupAction.appendChild(confirmBtn);

      // Assemble popup
      popup.appendChild(popupHeader);
      popup.appendChild(popupContent);
      popup.appendChild(popupAction);
    }

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromConfirmation");
    const cancelBtn = popup.querySelector("#cancelConfirmation");
    const confirmBtn = popup.querySelector("#confirmPayment");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      showInstitutionPaymentForm(currentInstitution);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    confirmBtn.addEventListener("click", function () {
      closePopup(popup);
      showPinEntryPopup(amount, formData);
    });
  }

  // Helper function to create detail row HTML
  function createDetailRow(label, value) {
      return `
      <div class="detail-row">
        <div class="detail-label">${label}</div>
        <div class="detail-value">${value}</div>
      </div>
    `;
  }

  // Helper function to create detail row element
  function createDetailElementRow(label, value) {
    const detailRow = document.createElement("div");
    detailRow.className = "detail-row";

    const detailLabel = document.createElement("div");
    detailLabel.className = "detail-label";
    detailLabel.textContent = label;

    const detailValue = document.createElement("div");
    detailValue.className = "detail-value";
    detailValue.textContent = value;

    detailRow.appendChild(detailLabel);
    detailRow.appendChild(detailValue);

    return detailRow;
  }

  // Show PIN entry popup
  function showPinEntryPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "pinEntryPopup";

    if (pinEntryTemplate) {
      let content = pinEntryTemplate.innerHTML;
      content = content.replace("{institutionLogo}", currentInstitution.logo);
      content = content.replace("{institutionName}", currentInstitution.name);
      content = content.replace("{amount}", amount.toFixed(2));
      popup.innerHTML = content;
    } else {
      // Fallback if template doesn't exist
      // This creates the popup structure programmatically
      // Create similar DOM structure as done in previous functions
    }

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");

      // Focus on first input
      const pinInputs = popup.querySelectorAll(".pin-input");
      if (pinInputs.length > 0) {
        pinInputs[0].focus();
      }
    }, 10);

    // Add event listeners
    const backBtn = popup.querySelector("#backFromPin");
    const cancelBtn = popup.querySelector("#cancelPin");
    const confirmBtn = popup.querySelector("#confirmPin");
    const pinInputs = popup.querySelectorAll(".pin-input");

    backBtn.addEventListener("click", function () {
      closePopup(popup);
      showConfirmationPopup(amount, formData);
    });

    cancelBtn.addEventListener("click", function () {
      closePopup(popup);
    });

    confirmBtn.addEventListener("click", function () {
      
      // ---console.log(amount , formData) ;

      // allDetails.data = formData ;
      allDetails.amount = formData.amount ;
      allDetails.month = formData.month ;
      allDetails.student_id = formData.student_id ;
      allDetails.year = formData.year ;
      allDetails.payment_type = formData.payment_type ;


      forBackend() ;
      
      processPin(amount, formData);

    });

    // PIN input handling
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        if (this.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          }
        }

        // Check if all inputs are filled
        const allFilled = Array.from(pinInputs).every(
          (input) => input.value.length === 1
        );
        confirmBtn.disabled = !allFilled;
      });

      input.addEventListener("keydown", function (e) {
        // Move to previous input on backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });
  }

  // Process PIN
  function processPin(amount, formData) {
    // Close PIN entry
    const pinPopup = document.getElementById("pinEntryPopup");
    if (pinPopup) {
      closePopup(pinPopup);
    }

    // Show loading
    showLoading("Processing payment...");

    // Show success popup after a delay
    setTimeout(() => {
      hideLoading();
      showSuccessPopup(amount, formData);
    }, 1000);
  }

  // Show success popup
  function showSuccessPopup(amount, formData) {
    // Apply blur effect to main container
    applyBlurEffect();

    // Generate transaction ID
    const transactionId =
      "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const currentTime = new Date().toLocaleString();

    // Create popup
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.id = "successPopup";

    if (successTemplate) {
      let content = successTemplate.innerHTML;
      content = content.replace(/{institutionName}/g, currentInstitution.name);
      content = content.replace(/{amount}/g, amount.toFixed(2));
      popup.innerHTML = content;

      // Populate success details
      const successDetails = popup.querySelector("#successDetails");
      if (successDetails) {
        let detailsHTML = "";

        // Transaction ID
        detailsHTML += createDetailRow("Transaction ID", transactionId);

        // Institution name
        detailsHTML += createDetailRow("Institution", currentInstitution.name);

        // Add relevant fields based on institution type
        if (formData.student_id) {
          detailsHTML += createDetailRow("Student ID", formData.student_id);
        }

        if (formData.payment_type) {
          detailsHTML += createDetailRow("Payment Type", formData.payment_type);
        }

        if (formData.passport_number) {
          detailsHTML += createDetailRow(
            "Passport Number",
            formData.passport_number
          );
        }

        if (formData.month && formData.year) {
          detailsHTML += createDetailRow(
            "Bill Period",
            `${formData.month} ${formData.year}`
          );
        }

        // Amount
        detailsHTML += createDetailRow("Amount", `৳${amount.toFixed(2)}`);

        // Time
        detailsHTML += createDetailRow("Time", currentTime);

        // Status
          detailsHTML += `
          <div class="detail-row">
            <div class="detail-label">Status</div>
            <div class="detail-value success">Completed</div>
          </div>
        `;

        successDetails.innerHTML = detailsHTML;
      }
    } else {
      // Fallback if template doesn't exist
      // Create similar DOM structure as done in previous functions
    }

    // Add to body
    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
      popup.classList.add("show");
    }, 10);

    // Add event listeners
    const doneBtn = popup.querySelector("#done");
    const downloadBtn = popup.querySelector("#downloadReceipt");

    doneBtn.addEventListener("click", function () {
      closePopup(popup);
      removeBlurEffect();
      showSection(mainSelectionSection);
    });

    downloadBtn.addEventListener("click", function () {
      downloadReceipt(transactionId, amount, formData, currentTime);
    });
  }

  // Download receipt
  function downloadReceipt(transactionId, amount, formData, time) {
    // Format receipt content based on institution type
    let details = `Student ID: ${formData.student_id || "N/A"}\n`;

    if (currentInstitution.type === "ইউনিভার্সিটি" && formData.payment_type) {
      details += `Payment Type: ${formData.payment_type}\n`;
    } else if (
      currentInstitution.type === "ট্রেনিং" &&
      formData.passport_number
    ) {
      details += `Passport Number: ${formData.passport_number}\n`;
      if (formData.month && formData.year) {
        details += `Bill Period: ${formData.month} ${formData.year}\n`;
      }
    } else if (formData.month && formData.year) {
      details += `Bill Period: ${formData.month} ${formData.year}\n`;
    }

    // Create receipt content

        const receiptContent = `
        bKash Education Fee Receipt
        ========================

        Transaction ID: ${transactionId}
        Institution: ${currentInstitution.name}
        ${details}
        Amount: ৳${amount.toFixed(2)}
        Time: ${time}
        Status: Successful

        Thank you for using bKash!
          `;

    // Create download link
    const blob = new Blob([receiptContent.trim()], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bKash_Receipt_${transactionId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Show loading
  function showLoading(message) {
    // Remove any existing loading overlay
    hideLoading();

    // Create loading overlay
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-overlay";

    if (loadingTemplate) {
      loadingDiv.innerHTML = loadingTemplate.innerHTML.replace(
        "{message}",
        message
      );
    } else {
      // Fallback if template doesn't exist
      const loadingContent = document.createElement("div");
      loadingContent.className = "loading-content";

      const spinner = document.createElement("div");
      spinner.className = "loading-spinner";

      const messageP = document.createElement("p");
      messageP.textContent = message;

      loadingContent.appendChild(spinner);
      loadingContent.appendChild(messageP);

      loadingDiv.appendChild(loadingContent);
    }

    document.body.appendChild(loadingDiv);
  }

  // Hide loading
  function hideLoading() {
    const loadingDiv = document.querySelector(".loading-overlay");
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  // Show notification
  function showNotification(message) {
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";

    if (notificationTemplate) {
      notification.innerHTML = notificationTemplate.innerHTML.replace(
        "{message}",
        message
      );
    } else {
      notification.textContent = message;
    }

    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Hide notification after a delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Setup event listeners

  // Implement main search functionality
  if (mainSearchInput && mainSearchBtn) {
    mainSearchBtn.addEventListener("click", function () {
      performMainSearch();
    });

    mainSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performMainSearch();
      }
    });
  }

  // Setup category options click handlers
  if (schoolOption) {
    schoolOption.addEventListener("click", function () {
      createCategoryPopup("স্কুল");
    });
  }

  if (collegeOption) {
    collegeOption.addEventListener("click", function () {
      createCategoryPopup("কলেজ");
    });
  }

  if (universityOption) {
    universityOption.addEventListener("click", function () {
      createCategoryPopup("ইউনিভার্সিটি");
    });
  }

  if (trainingOption) {
    trainingOption.addEventListener("click", function () {
      createCategoryPopup("ট্রেনিং");
    });
  }

  if (otherOption) {
    otherOption.addEventListener("click", function () {
      createCategoryPopup("অন্যান্য");
    });
  }

  // Setup receipt option
  if (receiptOption) {
    receiptOption.addEventListener("click", function () {
      showNotification("Transaction history feature is coming soon!");
    });
  }

  // Show main section initially
  showSection(mainSelectionSection);


  // backend 

  function forBackend()
  {

    let pins = document.querySelectorAll(".pin-input") ;
    let fullPins = "";

      pins.forEach(function(item){
        fullPins += item.value;
      });

      allDetails.pin = fullPins ;

      console.log("a2");

      console.log(allDetails) ;

      console.log("a3");

    //   // Use relative URL instead of hardcoded localhost
      fetch("http://localhost:3000/education", {
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

  }


});
