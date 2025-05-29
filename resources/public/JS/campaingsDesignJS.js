// State management
let activeTab = "current";
let selectedCampaign = null;
let applicationStep = 0;
let showModal = false;
let showApplicationModal = false;
let showSubscriptionModal = false;

// Campaign data
const currentCampaigns = [
  {
    id: 1,
    title: "SurePay গ্র্যান্ড অফার",
    subtitle: "৬০% পর্যন্ত ক্যাশব্যাক",
    description: "নতুন একাউন্ট খুলে পান বিশেষ ক্যাশব্যাক এবং উপহার",
    duration: "৩১ ডিসেম্বর পর্যন্ত",
    badge: "হট ডিল",
    badgeColor: "badge-red",
    icon: "percent",
    features: [
      "প্রথম ট্রান্সফারে ৬০% ক্যাশব্যাক",
      "ফ্রি ডেবিট কার্ড",
      "৩ মাস ফ্রি সার্ভিস চার্জ",
      "বিশেষ গিফট ভাউচার",
    ],
    bgColor: "campaign-header-blue",
    terms: [
      "অফারটি শুধুমাত্র নতুন গ্রাহকদের জন্য প্রযোজ্য",
      "সর্বনিম্ন ৳১০০০ ট্রান্সফার করতে হবে",
      "ক্যাশব্যাক সর্বোচ্চ ৳৫০০০ পর্যন্ত",
      "অফার সাপেক্ষে পরিবর্তন হতে পারে",
    ],
  },
  {
    id: 2,
    title: "বিল পেমেন্ট বোনাস",
    subtitle: "৫০% পর্যন্ত ছাড়",
    description: "SurePay দিয়ে বিল পেমেন্ট করে জিতুন পুরস্কার",
    duration: "১৫ জানুয়ারি পর্যন্ত",
    badge: "জনপ্রিয়",
    badgeColor: "badge-green",
    icon: "dollar-sign",
    features: [
      "ইউটিলিটি বিলে ৫০% ছাড়",
      "মোবাইল রিচার্জে ২০% বোনাস",
      "প্রতি পেমেন্টে পয়েন্ট",
      "মাসিক লটারি ড্র",
    ],
    bgColor: "campaign-header-green",
    terms: [
      "সর্বনিম্ন ৳৫০০ বিল পেমেন্ট করতে হবে",
      "মাসিক সর্বোচ্চ ৫টি বিল",
      "অফার শুধু সিলেক্টেড বিলার এর জন্য",
      "পয়েন্ট ৬০ দিন পর expire হবে",
    ],
  },
  {
    id: 3,
    title: "রেফার করে জিতুন",
    subtitle: "৳১০০০ পর্যন্ত",
    description: "বন্ধুদের রেফার করুন এবং দুজনেই পুরস্কার জিতুন",
    duration: "চলমান",
    badge: "এক্সক্লুসিভ",
    badgeColor: "badge-purple",
    icon: "gift",
    features: [
      "প্রতি রেফারে ৳৫০০",
      "বন্ধুর জন্য ৳৫০০ বোনাস",
      "মাসিক ১০ রেফার পর্যন্ত",
      "সোশ্যাল মিডিয়া বোনাস",
    ],
    bgColor: "campaign-header-purple",
    terms: [
      "রেফার করা ব্যক্তিকে একাউন্ট verify করতে হবে",
      "প্রথম ট্রান্সফার এর পর বোনাস পাবেন",
      "বোনাস ৭ দিনের মধ্যে দেওয়া হবে",
      "একই ব্যক্তিকে একবার রেফার করা যাবে",
    ],
  },
  {
    id: 4,
    title: "সেভিংস চ্যালেঞ্জ",
    subtitle: "৮% বার্ষিক সুদ",
    description: "মাসিক সঞ্চয় করে পান বিশেষ সুদের হার",
    duration: "৬ মাস মেয়াদী",
    badge: "নতুন",
    badgeColor: "badge-orange",
    icon: "target",
    features: [
      "৮% বার্ষিক সুদ",
      "কোন সার্ভিস চার্জ নেই",
      "যেকোনো সময় উত্তোলন",
      "মাসিক সুদ প্রদান",
    ],
    bgColor: "campaign-header-orange",
    terms: [
      "সর্বনিম্ন ৳১০০০ ডিপোজিট",
      "মাসিক সর্বোচ্চ ৳১০০০০০ ডিপোজিট",
      "৬ মাস পূর্ণ না হলে সুদ কম",
      "স্বয়ংক্রিয় নবায়ন সুবিধা",
    ],
  },
  {
    id: 5,
    title: "ক্রেডিট কার্ড ফিয়েস্তা",
    subtitle: "৩ মাস ০% সুদ",
    description: "নতুন ক্রেডিট কার্ডে বিশেষ অফার",
    duration: "২৮ ফেব্রুয়ারি পর্যন্ত",
    badge: "প্রিমিয়াম",
    badgeColor: "badge-indigo",
    icon: "credit-card",
    features: [
      "৩ মাস ০% সুদ",
      "বার্ষিক ফি মওকুফ",
      "৫% ক্যাশব্যাক",
      "বিনামূল্যে সাপ্লিমেন্টারি কার্ড",
    ],
    bgColor: "campaign-header-indigo",
    terms: [
      "সর্বনিম্ন আয় ৳২৫০০০",
      "ক্রেডিট স্কোর ৬৫০+",
      "প্রথম বছর বার্ষিক ফি ফ্রি",
      "ক্যাশব্যাক সর্বোচ্চ ৳১০০০",
    ],
  },
  {
    id: 6,
    title: "বিজনেস বোনাস",
    subtitle: "৳৫০,০০০ পর্যন্ত",
    description: "ব্যবসায়িক একাউন্টে বিশেষ বোনাস",
    duration: "৩০ এপ্রিল পর্যন্ত",
    badge: "কর্পোরেট",
    badgeColor: "badge-teal",
    icon: "trophy",
    features: [
      "প্রথম ৬ মাস ফ্রি সার্ভিস",
      "প্রতি ট্রান্সফারে ক্যাশব্যাক",
      "ডেডিকেটেড সাপোর্ট",
      "ফ্রি API ইন্টিগ্রেশন",
    ],
    bgColor: "campaign-header-teal",
    terms: [
      "বৈধ ট্রেড লাইসেন্স আবশ্যক",
      "সর্বনিম্ন ৳৫০০০০ ডিপোজিট",
      "মাসিক ৫০ ট্রান্সফার minimum",
      "বোনাস ৯০ দিন পর প্রদান",
    ],
  },
];

const upcomingCampaigns = [
  {
    id: 7,
    title: "ঈদ স্পেশাল অফার",
    subtitle: "৭০% পর্যন্ত ছাড়",
    description: "ঈদুল ফিতর উপলক্ষে বিশেষ ক্যাশব্যাক",
    duration: "শুরু: ১ এপ্রিল",
    badge: "আসছে শীঘ্রই",
    badgeColor: "badge-yellow",
    icon: "gift",
    features: [
      "শপিং এ ৭০% ক্যাশব্যাক",
      "ট্রাভেল বুকিং এ ৫০% ছাড়",
      "রেস্টুরেন্ট বিলে ৩০% ছাড়",
      "বিশেষ ঈদি বোনাস",
    ],
    bgColor: "campaign-header-yellow",
    terms: [
      "অফার ঈদের ১৫ দিন পর্যন্ত",
      "সিলেক্টেড মার্চেন্ট",
      "দৈনিক সর্বোচ্চ ৳২০০০ ক্যাশব্যাক",
      "Terms & conditions প্রযোজ্য",
    ],
  },
  {
    id: 8,
    title: "স্টুডেন্ট স্পেশাল",
    subtitle: "শূন্য চার্জ একাউন্ট",
    description: "শিক্ষার্থীদের জন্য বিশেষ ব্যাংকিং সুবিধা",
    duration: "শুরু: ১ জুন",
    badge: "শিক্ষার্থী বান্ধব",
    badgeColor: "badge-indigo",
    icon: "award",
    features: [
      "কোন মাসিক চার্জ নেই",
      "ফ্রি ডেবিট কার্ড",
      "টিউশন ফি পেমেন্টে ২% ক্যাশব্যাক",
      "বই কেনায় ১০% ছাড়",
    ],
    bgColor: "campaign-header-blue",
    terms: [
      "বৈধ স্টুডেন্ট ID আবশ্যক",
      "বয়স ১৮-২৫ বছর",
      "একাউন্ট সর্বোচ্চ ৪ বছর",
      "গ্রাজুয়েশন পর regular একাউন্টে convert",
    ],
  },
  {
    id: 9,
    title: "বর্ষা মৌসুম মেগা অফার",
    subtitle: "বৃষ্টির দিনে বাড়তি সুবিধা",
    description: "বর্ষাকালে অনলাইন শপিং এ বিশেষ ছাড়",
    duration: "শুরু: ১৫ জুন",
    badge: "সিজনাল অফার",
    badgeColor: "badge-sky",
    icon: "zap",
    features: [
      "অনলাইন শপিং এ ৪০% ছাড়",
      "হোম ডেলিভারি ফ্রি",
      "ইমার্জেন্সি সার্ভিসে ২০% ছাড়",
      "রেইন প্রোটেকশন ইন্স্যুরেন্স",
    ],
    bgColor: "campaign-header-sky",
    terms: [
      "বর্ষা মৌসুম চলাকালীন",
      "সর্বনিম্ন ৳১০০০ পারচেজ",
      "দৈনিক ১ বার ব্যবহার করা যাবে",
      "সিলেক্টেড e-commerce সাইট",
    ],
  },
];

const pastCampaigns = [
  {
    id: 10,
    title: "বিজয় দিবস অফার",
    subtitle: "৫০% পর্যন্ত ছাড়",
    description: "বিজয়ের ৫২ বছর উদযাপনে বিশেষ অফার",
    duration: "শেষ: ৩১ ডিসেম্বর ২০২৩",
    badge: "সমাপ্ত",
    badgeColor: "badge-gray",
    icon: "trophy",
    features: [
      "সকল ট্রান্সফারে ৫০% ছাড়",
      "বিজয় স্মারক গিফট",
      "প্যাট্রিয়ট কার্ড",
      "বিশেষ সার্টিফিকেট",
    ],
    bgColor: "campaign-header-gray",
    terms: [
      "অফার শেষ হয়েছে",
      "সকল শর্তাবলী পূরণ হয়েছে",
      "পুরস্কার বিতরণ সম্পন্ন",
      "পরবর্তী বছর আবার আসবে",
    ],
  },
  {
    id: 11,
    title: "দুর্গা পূজা ক্যাশব্যাক",
    subtitle: "৪০% পর্যন্ত",
    description: "শারদীয় উৎসবে বিশেষ ক্যাশব্যাক অফার",
    duration: "শেষ: ১৫ অক্টোবর ২০২৩",
    badge: "সমাপ্ত",
    badgeColor: "badge-gray",
    icon: "gift",
    features: [
      "পূজা শপিং এ ৪০% ছাড়",
      "মিষ্টি দোকানে ২০% ছাড়",
      "পোশাক কেনায় ৩০% ছাড়",
      "বিশেষ পূজা গিফট",
    ],
    bgColor: "campaign-header-gray",
    terms: [
      "অফার সফলভাবে সমাপ্ত",
      "৫০,০০০+ ব্যবহারকারী অংশগ্রহণ",
      "৳১০ কোটি ক্যাশব্যাক বিতরণ",
      "৯৮% সন্তুষ্টির হার",
    ],
  },
];

const applicationSteps = [
  {
    title: "ব্যক্তিগত তথ্য",
    icon: "file-text",
    fields: ["পূর্ণ নাম", "মোবাইল নম্বর", "ইমেইল", "জন্ম তারিখ"],
  },
  {
    title: "ডকুমেন্ট আপলোড",
    icon: "upload",
    fields: ["জাতীয় পরিচয়পত্র", "পাসপোর্ট সাইজ ছবি", "আয়ের প্রমাণ"],
  },
  {
    title: "ভেরিফিকেশন",
    icon: "shield",
    fields: ["মোবাইল OTP", "ইমেইল ভেরিফিকেশন", "বায়োমেট্রিক"],
  },
  {
    title: "সম্পন্ন",
    icon: "check-circle-2",
    fields: ["আপনার আবেদন সফলভাবে সম্পন্ন হয়েছে"],
  },
];

// Get campaigns by tab
function getCampaignsByTab() {
  switch (activeTab) {
    case "current":
      return currentCampaigns;
    case "upcoming":
      return upcomingCampaigns;
    case "past":
      return pastCampaigns;
    default:
      return currentCampaigns;
  }
}

// Set active tab
function setActiveTab(tab) {
  activeTab = tab;

  // Update tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    if (button.dataset.tab === tab) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  renderCampaigns();

  // Scroll to campaigns section
  document.getElementById("campaigns").scrollIntoView({ behavior: "smooth" });
}

// Scroll to campaigns
function scrollToCampaigns() {
  document.getElementById("campaigns").scrollIntoView({ behavior: "smooth" });
}

// Render campaigns
function renderCampaigns() {
  const grid = document.getElementById("campaigns-grid");
  const campaigns = getCampaignsByTab();

  grid.innerHTML = campaigns
    .map(
      (campaign) => `
        <div class="campaign-card">
            <div class="campaign-header ${campaign.bgColor}">
                <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" style="opacity: 0.3;"></div>
                <div class="campaign-badge ${campaign.badgeColor}">
                    ${campaign.badge}
                </div>
                <div class="campaign-icon">
                    <i data-lucide="${
                      campaign.icon
                    }" class="h-10 w-10 text-white"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-1">${
                  campaign.title
                }</h3>
                <p class="text-2xl font-bold text-yellow-400">${
                  campaign.subtitle
                }</p>
            </div>
            <div class="campaign-content">
                <p class="campaign-description">${campaign.description}</p>
                <div class="space-y-3 mb-6">
                    ${campaign.features
                      .map(
                        (feature) => `
                        <div class="feature-item">
                            <i data-lucide="check-circle" class="h-5 w-5 feature-icon"></i>
                            <span class="text-sm text-gray-600">${feature}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
                <div class="campaign-meta">
                    <div class="duration">
                        <i data-lucide="clock" class="h-4 w-4"></i>
                        <span>${campaign.duration}</span>
                    </div>
                    <div class="stars">
                        ${Array(5)
                          .fill()
                          .map(
                            () =>
                              '<i data-lucide="star" class="h-4 w-4 star"></i>'
                          )
                          .join("")}
                    </div>
                </div>
                <button 
                    onclick="handleCampaignClick(${campaign.id})"
                    class="campaign-button"
                    ${activeTab === "past" ? "disabled" : ""}
                >
                    ${activeTab === "past" ? "অফার শেষ" : "বিস্তারিত দেখুন"}
                    <i data-lucide="chevron-right" class="h-5 w-5"></i>
                </button>
            </div>
        </div>
    `
    )
    .join("");

  // Re-render Lucide icons
  lucide.createIcons();
}

// Handle campaign click
function handleCampaignClick(campaignId) {
  if (activeTab === "past") return;

  const campaigns = getCampaignsByTab();
  selectedCampaign = campaigns.find((c) => c.id === campaignId);

  if (selectedCampaign) {
    showModal = true;
    renderCampaignModal();
  }
}

// Render campaign modal
function renderCampaignModal() {
  const modal = document.getElementById("campaign-modal");
  const content = modal.querySelector(".modal-content");

  content.innerHTML = `
        <div class="modal-header ${selectedCampaign.bgColor}">
            <button onclick="closeModal()" class="modal-close">
                <i data-lucide="x" class="h-6 w-6"></i>
            </button>
            <div class="flex items-start space-x-4">
                <div class="campaign-icon">
                    <i data-lucide="${
                      selectedCampaign.icon
                    }" class="h-10 w-10 text-white"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-1">${
                      selectedCampaign.title
                    }</h3>
                    <p class="text-xl text-yellow-400 font-semibold">${
                      selectedCampaign.subtitle
                    }</p>
                </div>
            </div>
        </div>
        <div class="modal-body">
            <div class="modal-section">
                <h4>ক্যাম্পেইন বিবরণ</h4>
                <p class="text-gray-600">${selectedCampaign.description}</p>
            </div>
            
            <div class="modal-section">
                <h4>বৈশিষ্ট্য সমূহ</h4>
                <div class="feature-grid">
                    ${selectedCampaign.features
                      .map(
                        (feature) => `
                        <div class="feature-card">
                            <i data-lucide="check-circle" class="h-5 w-5 text-green-500 mt-0.5"></i>
                            <span class="text-gray-700">${feature}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-section">
                <h4>নিয়ম ও শর্তাবলী</h4>
                <div class="terms-list">
                    ${selectedCampaign.terms
                      .map(
                        (term, index) => `
                        <div class="term-item">
                            <span class="term-number">${index + 1}</span>
                            <span class="text-gray-600">${term}</span>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="modal-footer">
                ${
                  activeTab !== "past"
                    ? `
                    <button onclick="handleApplication()" class="btn-primary">
                        আবেদন করুন
                    </button>
                `
                    : ""
                }
                <button onclick="closeModal()" class="btn-secondary">
                    বন্ধ করুন
                </button>
            </div>
        </div>
    `;

  modal.classList.add("show");

  // Prevent background scrolling when modal is open
  document.body.style.overflow = "hidden";

  lucide.createIcons();
}

// Close modal
function closeModal() {
  const modal = document.getElementById("campaign-modal");
  modal.classList.remove("show");

  // Re-enable scrolling
  document.body.style.overflow = "";

  showModal = false;
  selectedCampaign = null;
}

// Handle application
function handleApplication() {
  closeModal();
  applicationStep = 0;
  showApplicationModal = true;
  renderApplicationModal();
}

// Render application modal - Updated for compact size and better centering
function renderApplicationModal() {
  const modal = document.getElementById("application-modal");
  const content = modal.querySelector(".modal-content");
  const step = applicationSteps[applicationStep];

  content.innerHTML = `
        <div class="app-modal-header">
            <div class="modal-title-section">
                <h3>আবেদন প্রক্রিয়া</h3>
                <button onclick="closeApplicationModal()" class="modal-close">
                    ×
                </button>
            </div>
            
            <div class="progress-container">
                <div class="progress-line"></div>
                ${applicationSteps
                  .map(
                    (s, index) => `
                    <div class="progress-step ${
                      index === applicationStep
                        ? "active"
                        : index < applicationStep
                        ? "completed"
                        : ""
                    }">
                        <div class="progress-circle">
                            ${index + 1}
                        </div>
                        <div class="step-title-small">${s.title}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="step-icon-container">
                <i data-lucide="${step.icon}" class="step-icon"></i>
                <p class="step-text">${step.title}</p>
            </div>
        </div>
        
        <div class="modal-body">
            ${
              applicationStep === applicationSteps.length - 1
                ? `
                <div class="success-screen">
                    <div class="success-icon">
                        <i data-lucide="check-circle-2" class="h-10 w-10"></i>
                    </div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">
                        অভিনন্দন!
                    </h4>
                    <p class="text-gray-600 mb-6">
                        আপনার আবেদন সফলভাবে সম্পন্ন হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
                    </p>
                    <button onclick="closeApplicationModal()" class="btn-next">
                        ধন্যবাদ
                    </button>
                </div>
            `
                : `
                <div>
                    <div class="space-y-4 mb-5">
                        ${step.fields
                          .map(
                            (field, idx) => `
                            <div class="form-group">
                                <label>
                                    ${field} <span class="text-red-500">*</span>
                                </label>
                                ${
                                  applicationStep === 1
                                    ? `
                                    <div class="file-upload" id="file-upload-${idx}" onclick="handleFileUploadClick(${idx})">
                                        <input type="file" id="file-input-${idx}" class="hidden-file-input" onchange="handleFileSelected(${idx}, event)" style="display: none;">
                                        <div class="file-upload-content">
                                            <i data-lucide="upload" class="file-upload-icon"></i>
                                            <p class="text-gray-500">
                                                ক্লিক করুন অথবা ড্র্যাগ করুন ${field} আপলোড করতে
                                            </p>
                                        </div>
                                    </div>
                                `
                                    : `
                                    <input
                                        type="text"
                                        placeholder="আপনার ${field}"
                                    />
                                    <p class="error-text">এই তথ্য প্রদান করা আবশ্যক</p>
                                `
                                }
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    
                    <div class="form-action-buttons">
                        <button onclick="nextApplicationStep()" class="btn-next">
                            পরবর্তী <i data-lucide="chevron-right" class="btn-icon"></i>
                        </button>
                        ${
                          applicationStep > 0
                            ? `
                            <button onclick="previousApplicationStep()" class="btn-back">
                                পূর্ববর্তী
                            </button>
                        `
                            : ""
                        }
                    </div>
                </div>
            `
            }
        </div>
    `;

  modal.classList.add("show");

  // Ensure the modal is centered in the page
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Create Lucide icons
  lucide.createIcons();

  // Add drag and drop support for file uploads if it's the document upload step
  if (applicationStep === 1) {
    setupDragAndDrop();
  }
}

// Render subscription success modal
function renderSubscriptionModal(email) {
  // Create modal if it doesn't exist
  let modal = document.getElementById("subscription-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "subscription-modal";
    modal.className = "modal-overlay";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
  }

  const content = modal.querySelector(".modal-content");

  content.innerHTML = `
      <div style="background: linear-gradient(to right, #2563eb, #1d4ed8);" class="app-modal-header">
        <div class="modal-title-section">
          <h3>সাবস্ক্রিপশন সফল</h3>
          <button onclick="closeSubscriptionModal()" class="modal-close">×</button>
        </div>
      </div>
      <div class="modal-body">
        <div class="success-screen">
          <div class="success-icon">
            <i data-lucide="mail-check" class="h-10 w-10"></i>
          </div>
          <h4 class="text-xl font-bold text-gray-900 mb-3">
            নিউজলেটার সাবস্ক্রাইব সম্পন্ন!
          </h4>
          <p class="text-gray-600 mb-4">
            ${email} এই ইমেইলে আমাদের নিউজলেটার সাবস্ক্রাইব করা হয়েছে। আপনি নিয়মিত আপডেট পাবেন।
          </p>
          <button onclick="closeSubscriptionModal()" class="btn-next">
            ঠিক আছে
          </button>
        </div>
      </div>
    `;

  modal.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Create Lucide icons
  lucide.createIcons();
}

// Close subscription modal
function closeSubscriptionModal() {
  const modal = document.getElementById("subscription-modal");
  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Re-enable scrolling
  }
  showSubscriptionModal = false;
}

// Handle newsletter subscription
function handleNewsletterSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (email) {
    // Clear the input field
    emailInput.value = "";

    // Show success modal
    showSubscriptionModal = true;
    renderSubscriptionModal(email);

    // Here you would typically send the data to your server
    // This is just a simulation
    console.log("Subscribed email:", email);
  }
}

// Next application step
function nextApplicationStep() {
  // Validate inputs before proceeding to next step
  if (!validateCurrentStep()) {
    return;
  }

  if (applicationStep < applicationSteps.length - 1) {
    applicationStep++;
    renderApplicationModal();
  }
}

// Validate current step inputs
function validateCurrentStep() {
  const step = applicationSteps[applicationStep];

  // Skip validation for last step (confirmation screen)
  if (applicationStep === applicationSteps.length - 1) {
    return true;
  }

  // For file upload step (step 1)
  if (applicationStep === 1) {
    const fileUploads = document.querySelectorAll(".file-upload");
    let allFilesUploaded = true;

    fileUploads.forEach((upload, index) => {
      const hasFile = upload.classList.contains("file-uploaded");
      if (!hasFile) {
        allFilesUploaded = false;
        upload.classList.add("file-error");

        // Add error message if not already present
        if (
          !upload.nextElementSibling ||
          !upload.nextElementSibling.classList.contains("error-message")
        ) {
          const errorMessage = document.createElement("p");
          errorMessage.className = "error-message";
          errorMessage.textContent = "ফাইল আপলোড করা আবশ্যক";
          errorMessage.style.color = "#ef4444";
          errorMessage.style.fontSize = "0.875rem";
          errorMessage.style.marginTop = "0.5rem";
          upload.parentNode.appendChild(errorMessage);
        }
      } else {
        upload.classList.remove("file-error");
        // Remove error message if exists
        if (
          upload.nextElementSibling &&
          upload.nextElementSibling.classList.contains("error-message")
        ) {
          upload.parentNode.removeChild(upload.nextElementSibling);
        }
      }
    });

    return allFilesUploaded;
  }
  // For text input steps (step 0 and 2)
  else {
    const inputs = document.querySelectorAll(".form-group input");
    let allInputsValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allInputsValid = false;
        input.classList.add("input-error");

        // Error messages are already in the HTML, so we just need to make them visible
        const errorText = input.nextElementSibling;
        if (errorText && errorText.classList.contains("error-text")) {
          errorText.style.display = "block";
        }
      } else {
        input.classList.remove("input-error");

        // Hide error message
        const errorText = input.nextElementSibling;
        if (errorText && errorText.classList.contains("error-text")) {
          errorText.style.display = "none";
        }
      }
    });

    return allInputsValid;
  }
}

// Previous application step
function previousApplicationStep() {
  if (applicationStep > 0) {
    applicationStep--;
    renderApplicationModal();
  }
}

// Close application modal
function closeApplicationModal() {
  const modal = document.getElementById("application-modal");
  modal.classList.remove("show");
  document.body.style.overflow = ""; // Re-enable scrolling
  showApplicationModal = false;
  applicationStep = 0;
}

// Setup drag and drop for file uploads
function setupDragAndDrop() {
  const fileUploads = document.querySelectorAll(".file-upload");

  fileUploads.forEach((upload, index) => {
    upload.addEventListener("dragover", (e) => {
      e.preventDefault();
      upload.classList.add("drag-over");
    });

    upload.addEventListener("dragleave", () => {
      upload.classList.remove("drag-over");
    });

    upload.addEventListener("drop", (e) => {
      e.preventDefault();
      upload.classList.remove("drag-over");

      if (e.dataTransfer.files.length) {
        const fileInput = document.getElementById(`file-input-${index}`);
        fileInput.files = e.dataTransfer.files;

        // Trigger the change event
        const event = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(event);
      }
    });
  });
}

// Handle file upload button click
function handleFileUploadClick(index) {
  // Trigger hidden file input click
  document.getElementById(`file-input-${index}`).click();
}

// Handle file selection
function handleFileSelected(index, event) {
  const fileUpload = document.getElementById(`file-upload-${index}`);
  const file = event.target.files[0];

  if (file) {
    // Update UI to show selected file
    fileUpload.classList.add("file-uploaded");
    fileUpload.classList.remove("file-error");

    // Remove any existing error message
    const errorMessage = fileUpload.parentNode.querySelector(".error-message");
    if (errorMessage) {
      fileUpload.parentNode.removeChild(errorMessage);
    }

    // Create a preview of the file if it's an image
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const uploadContent = fileUpload.querySelector(".file-upload-content");
        uploadContent.innerHTML = `
            <div class="file-preview">
              <img src="${
                e.target.result
              }" class="file-preview-image" alt="Preview">
              <div class="file-info">
                <p class="file-name">${file.name}</p>
                <p class="file-size">${formatFileSize(file.size)}</p>
              </div>
              <button type="button" class="remove-file" onclick="removeFile(${index}, event)">
                <i data-lucide="x" class="h-5 w-5"></i>
              </button>
            </div>
          `;
        lucide.createIcons();
      };

      reader.readAsDataURL(file);
    } else {
      // For non-image files, just show the file name
      const uploadContent = fileUpload.querySelector(".file-upload-content");
      uploadContent.innerHTML = `
          <div class="file-preview">
            <div class="file-icon">
              <i data-lucide="file" class="h-8 w-8"></i>
            </div>
            <div class="file-info">
              <p class="file-name">${file.name}</p>
              <p class="file-size">${formatFileSize(file.size)}</p>
            </div>
            <button type="button" class="remove-file" onclick="removeFile(${index}, event)">
              <i data-lucide="x" class="h-5 w-5"></i>
            </button>
          </div>
        `;
      lucide.createIcons();
    }
  }
}

// Remove uploaded file
function removeFile(index, event) {
  // Prevent the click from bubbling up to the file upload div
  event.stopPropagation();

  const fileUpload = document.getElementById(`file-upload-${index}`);
  const fileInput = document.getElementById(`file-input-${index}`);

  // Reset file input
  fileInput.value = "";

  // Reset file upload UI
  fileUpload.classList.remove("file-uploaded");

  // Reset content
  const uploadContent = fileUpload.querySelector(".file-upload-content");
  const fieldName = applicationSteps[applicationStep].fields[index];
  uploadContent.innerHTML = `
      <i data-lucide="upload" class="file-upload-icon"></i>
      <p class="text-gray-500">
        ক্লিক করুন অথবা ড্র্যাগ করুন ${fieldName} আপলোড করতে
      </p>
    `;

  lucide.createIcons();
}

// Format file size
function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  renderCampaigns();
  lucide.createIcons();

  // Set up modal overlay elements
  setupModalOverlays();

  // Set up newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", handleNewsletterSubmit);
  }
});

// Set up modal overlay elements
function setupModalOverlays() {
  // Ensure modals are properly centered
  const modals = document.querySelectorAll(".modal-overlay");
  modals.forEach((modal) => {
    // Center modal content
    const content = modal.querySelector(".modal-content");
    if (content) {
      content.style.margin = "0 auto";
    }
  });
}

// Close modals on outside click
window.addEventListener("click", function (event) {
  const campaignModal = document.getElementById("campaign-modal");
  const applicationModal = document.getElementById("application-modal");
  const subscriptionModal = document.getElementById("subscription-modal");

  if (event.target === campaignModal) {
    closeModal();
  }

  if (event.target === applicationModal) {
    closeApplicationModal();
  }

  if (event.target === subscriptionModal) {
    closeSubscriptionModal();
  }
});
