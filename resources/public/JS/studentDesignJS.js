document.addEventListener("DOMContentLoaded", function () {
  // Brand colors
  const brandColor = "#23386A"; // Navy blue primary color
  const brandLightColor = "#3A5283"; // Lighter shade for gradients
  const brandDarkColor = "#192548"; // Darker shade for depth
  const accentColor = "#FFD700"; // Gold accent
  const accentLightColor = "#FFEBA3"; // Light gold for highlights
  const highlightColor = "#FF5252"; // Attention red
  const successColor = "#00C853"; // Success green
  const backgroundColor = "#F5F7FA"; // Light background

  // States
  let animate = false;
  let activeTab = "steps";

  // Get container
  const container = document.getElementById("surepay-container");

  // Step data with descriptions
  const steps = [
    "SurePay অ্যাপে সাইন-ইন-এ ক্লিক করুন",
    "অ্যাক্সেস কোড ব্যবহারের নির্দেশনা স্ক্রিনে ফরওয়ার্ড অ্যারো-এ ক্লিক করুন",
    "একাউন্ট সামারি পেইজে 'স্টুডেন্ট একাউন্ট' অপশনটি ক্লিক করুন",
    "স্টুডেন্ট একাউন্ট খুলতে মার্কেটিং মেসেজ দিয়ে 'শুরু করুন' বাটনে ক্লিক করুন",
    "ডিজিটাল জন্ম সনদের সমস্ত তথ্য দিন",
    "জন্ম সনদ থেকে যাচাই করা তথ্যের স্ক্রিনে ফরওয়ার্ড অ্যারো-এ ক্লিক করুন",
    "যেসব ফিল্ড সম্পর্কে নির্দিষ্ট তথ্য দিতে হবে, সেগুলি ফিল করুন, যেমন স্কুল, কলেজ ইত্যাদি",
    "আবেদনের সকল তথ্য দিয়ে শেষ করুন এবং এসএমএসের মাধ্যমে নিশ্চিতকরণ করুন",
  ];

  // Requirements
  const requirements = [
    {
      text: "গ্রাহকের বয়স ১৫ এর বেশি এবং ১৮ এর কম",
      icon: "👤",
    },
    {
      text: "ডিজিটাল জন্ম সনদ",
      icon: "📄",
    },
    {
      text: "মা/বাবার সক্রিয় SurePay একাউন্ট",
      icon: "👪",
    },
  ];

  // Services
  const services = [
    {
      name: "সেন্ড মানি",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>`,
    },
    {
      name: "পেমেন্ট",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>`,
    },
    {
      name: "মোবাইল রিচার্জ",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
              <path d="M8 6h8"></path>
            </svg>`,
    },
    {
      name: "এডুকেশন ফি",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>`,
    },
    {
      name: "ক্যাশ আউট",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>`,
    },
    {
      name: "পে বিল",
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>`,
    },
  ];

  // Offers
  const offers = [
    {
      title: "লগইন আর বিল নেট চালালে",
      amount: "৮২৫ বোনাস",
      subtitle: "অফার সময়: ৩০ দিন",
    },
    {
      title: "অ্যাপ ১ম বার লগইন করে",
      amount: "৮২৫ ক্যাশব্যাক",
      subtitle: "তাৎক্ষণিক ক্যাশব্যাক",
    },
  ];

  // Monthly offers
  const monthlyOffers = [
    {
      month: "১ম মাস",
      amount: "৮৫০ ক্যাশব্যাক",
      conditions: [
        "৮৭০ বা বেশি মোবাইল রিচার্জে ৮৭৫",
        "৮৯০০ বা বেশি পেমেন্টে ৮৭৫",
        "৮৮০০ বা বেশি রিমিট্যান্সে ৮৭৫",
      ],
    },
    {
      month: "২য় মাস",
      amount: "৮৫০ ক্যাশব্যাক",
      conditions: [
        "৮৭০ বা বেশি মোবাইল রিচার্জে ৮৭৫",
        "৮৯০০ বা বেশি পেমেন্টে ৮৭৫",
        "৮৮০০ বা বেশি রিমিট্যান্সে ৮৭৫",
      ],
    },
  ];

  // Helper functions
  function getMobileIcon(index) {
    const iconsArray = [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12" y2="18" />
          </svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 6v7l3 3" />
          </svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="6" x2="12.01" y2="6" />
            <path d="M9 18h6" />
          </svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M9 14l2 2 4-4" />
          </svg>`,
    ];

    return iconsArray[index % 4];
  }

  function createSurePayLogo(size = 80) {
    return `
          <svg width="${size}" height="${size}" viewBox="0 0 300 300" class="logo ${animate ? "animate" : ""}">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${brandColor}" />
                <stop offset="100%" stop-color="${brandLightColor}" />
              </linearGradient>
              <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="${brandDarkColor}" flood-opacity="0.3"/>
              </filter>
            </defs>
            
            <!-- Stylized person with money and arrow upward -->
            <g fill="none" stroke="url(#logoGradient)" stroke-width="3.5" filter="url(#logoShadow)">
              <!-- Person figure -->
              <circle cx="100" cy="70" r="40" />
              <path d="M100 110 C60 150, 80 250, 100 280 C110 260, 130 230, 90 180" />
              <path d="M100 180 C120 210, 150 200, 180 170" />
              
              <!-- Money/Bills -->
              <rect x="170" y="170" width="60" height="40" rx="5" />
              <rect x="180" y="160" width="60" height="40" rx="5" />
              <rect x="190" y="150" width="60" height="40" rx="5" />
              <circle cx="220" cy="170" r="15" />
              
              <!-- Arrow pointing upward and rightward with animation -->
              <path d="M120 100 C160 60, 200 80, 240 40" stroke-width="4.5" />
              <path d="M230 20 L260 40 L240 70" stroke-width="4.5" />
            </g>
            
            <!-- Subtle glow effect -->
            <circle cx="150" cy="150" r="145" fill="none" stroke="${accentLightColor}" stroke-width="1.5" opacity="0.2" />
          </svg>
        `;
  }

  // Create HTML structure
  container.innerHTML = "";

  // Create Header
  const header = document.createElement("div");
  header.className = "surepay-header";
  header.innerHTML = `
        <div class="header-content">
          ${createSurePayLogo(40)}
          <h1 class="header-title">SurePay</h1>
        </div>
        <p class="header-subtitle">আপনার অর্থের নিরাপদ সঙ্গী</p>
      `;
  container.appendChild(header);

  // Create Tabs
  const tabsContainer = document.createElement("div");
  tabsContainer.className = "tabs-container";
  tabsContainer.innerHTML = `
        <div class="tabs-wrapper">
          <div class="tab ${
            activeTab === "requirements" ? "active" : ""
          }" data-tab="requirements">প্রয়োজনীয়তা</div>
          <div class="tab ${
            activeTab === "steps" ? "active" : ""
          }" data-tab="steps">ধাপগুলো</div>
          <div class="tab ${
            activeTab === "services" ? "active" : ""
          }" data-tab="services">সেবাসমূহ</div>
          <div class="tab ${
            activeTab === "offers" ? "active" : ""
          }" data-tab="offers">অফার</div>
        </div>
      `;
  container.appendChild(tabsContainer);

  // Create Content Container
  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";
  container.appendChild(contentContainer);

  // Create Footer
  const footer = document.createElement("div");
  footer.className = "footer";
  footer.innerHTML = `
        <div class="footer-content">
          <div class="footer-brand">
            ${createSurePayLogo(30)}
            <span class="footer-name">SurePay</span>
          </div>
          <div class="footer-copyright">© ${new Date().getFullYear()} SurePay</div>
        </div>
      `;
  container.appendChild(footer);

  // Tab click handler
  tabsContainer.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      updateActiveTab();
      renderContent();
    });
  });

  // Update active tab
  function updateActiveTab() {
    tabsContainer.querySelectorAll(".tab").forEach((tab) => {
      if (tab.dataset.tab === activeTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Render steps content
  function renderStepsContent() {
    let stepsHTML = "";

    // Section Header
    stepsHTML += `
          <div class="section-header">
            <h2 class="section-title">SurePay অ্যাপ দিয়ে স্টুডেন্ট একাউন্ট খুলার ধাপগুলো</h2>
          </div>
        `;

    // Steps
    steps.forEach((step, index) => {
      stepsHTML += `
            <div class="step-box delay-${index * 100}">
              <div class="step-container">
                <div class="step-icon-container">
                  <div class="step-icon">${getMobileIcon(index)}</div>
                  <div class="step-number">${index + 1}</div>
                </div>
                <div class="step-content">
                  <p class="step-text">${step}</p>
                </div>
              </div>
            </div>
          `;
    });

    return stepsHTML;
  }

  // Render requirements content
  function renderRequirementsContent() {
    let requirementsHTML = "";

    // Section Header
    requirementsHTML += `
          <div class="section-header">
            <h2 class="section-title">স্টুডেন্ট একাউন্টের জন্য প্রয়োজন</h2>
          </div>
        `;

    // Requirements
    requirements.forEach((req, index) => {
      requirementsHTML += `
            <div class="requirement-box delay-${index * 100}">
              <div class="requirement-container">
                <div class="requirement-icon">${req.icon}</div>
                <p class="requirement-text">${req.text}</p>
              </div>
            </div>
          `;
    });

    return requirementsHTML;
  }

  // Render services content
  function renderServicesContent() {
    let servicesHTML = "";

    // Section Header
    servicesHTML += `
          <div class="section-header">
            <h2 class="section-title">SurePay স্টুডেন্ট একাউন্টের সেবাসমূহ</h2>
          </div>
        `;

    // Services with Logo
    servicesHTML += `
          <div class="services-container">
            <div class="logo-wrapper">
              ${createSurePayLogo(80)}
            </div>
            
            <div class="services-wrapper delay-300">
        `;

    // Service bubbles
    services.forEach((service, index) => {
      servicesHTML += `
            <div class="service-bubble">
              <div class="service-content">
                <div class="service-icon">${service.icon}</div>
                <span class="service-name">${service.name}</span>
              </div>
            </div>
          `;
    });

    servicesHTML += `
            </div>
          </div>
        `;

    return servicesHTML;
  }

  // Render offers content
  function renderOffersContent() {
    let offersHTML = "";

    // Welcome Offer Header
    offersHTML += `
          <div class="welcome-offer">
            <h2 class="welcome-title">স্টুডেন্ট একাউন্ট ওয়েলকাম অফার</h2>
            <div class="welcome-points">১৩০ পয়েন্ট</div>
          </div>
        `;

    // Regular Offers
    offersHTML += '<div class="offers-wrapper">';

    offers.forEach((offer, index) => {
      offersHTML += `
            <div class="offer-box delay-${index * 100}">
              <div class="offer-container">
                <p class="offer-title">${offer.title}</p>
                <p class="offer-amount">${offer.amount}</p>
                <p class="offer-subtitle">${offer.subtitle}</p>
              </div>
            </div>
          `;
    });

    offersHTML += "</div>";

    // Monthly Offers
    offersHTML += '<div class="offers-wrapper">';

    monthlyOffers.forEach((offer, index) => {
      offersHTML += `
            <div class="offer-box delay-${300 + index * 100}">
              <div class="monthly-offer-container">
                <!-- Corner ribbon -->
                <div class="ribbon">
                  <div class="ribbon-content">${offer.month}</div>
                </div>
                
                <p class="monthly-amount">${offer.amount}</p>
                
                <div class="conditions-container">
          `;

      // Conditions
      offer.conditions.forEach((condition) => {
        offersHTML += `
              <div class="condition-item">
                <div class="condition-icon">
                  <span class="condition-arrow">→</span>
                </div>
                <p class="condition-text">${condition}</p>
              </div>
            `;
      });

      offersHTML += `
                </div>
              </div>
            </div>
          `;
    });

    offersHTML += "</div>";

    return offersHTML;
  }

  // Render content based on active tab
  function renderContent() {
    let contentHTML = "";

    switch (activeTab) {
      case "requirements":
        contentHTML = renderRequirementsContent();
        break;
      case "steps":
        contentHTML = renderStepsContent();
        break;
      case "services":
        contentHTML = renderServicesContent();
        break;
      case "offers":
        contentHTML = renderOffersContent();
        break;
      default:
        contentHTML = renderStepsContent();
    }

    contentContainer.innerHTML = contentHTML;

    // Trigger animations after a short delay
    setTimeout(() => {
      animate = true;
      header.classList.add("animate");
      tabsContainer.classList.add("animate");
      footer.classList.add("animate");

      document.querySelectorAll(".section-header").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".step-box").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".requirement-box").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".services-wrapper").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".welcome-offer").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".offer-box").forEach((el) => {
        el.classList.add("animate");
      });

      document.querySelectorAll(".logo").forEach((el) => {
        el.classList.add("animate");
      });
    }, 100);
  }

  // Initial render
  renderContent();
});
