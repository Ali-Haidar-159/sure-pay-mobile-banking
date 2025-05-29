// Initialize arrays to avoid potential undefined errors
let mockPendingUsers = [];
let pendingUsers = [];
let mockApprovedUsers = []; // Reset to empty array to be filled from API
let approvedUsers = [];
let mockRejectedUsers = []; // Reset to empty array to be filled from API
let rejectedUsers = [];

function getPending() {
  fetch("http://localhost:3000/data/pendingreq", {
    method: "GET"
  })
  .then(async function(r1) {
    let fullData = await r1.json();
    
    if(r1.ok) {
      // Process the data format we see in the screenshot
      mockPendingUsers = fullData.data.map((user, index) => {
        return {
          id: user._id, // Generate sequential IDs
          name: user.name || "",
          email: `${user.name}@gmail.com` || "", // Use _id as email if no email field exists
          phone: user.mobile || "",
          nid: user.nid || "",
          address: user.address || "",
          registrationDate: new Date().toISOString().split('T')[0], // Current date for registration
          // Store the additional fields from the API
          dob: user.dob || "",
          father: user.father || "",
          mother: user.mother || "",
          pin: user.pin || ""
        };
      });
      
      console.log("Processed pending users:", mockPendingUsers);  
      pendingUsers = [...mockPendingUsers];
      
      // Update UI after data is loaded
      renderDashboard();
      renderUserManagement();
      updateCounters();
    } else {
      alert(fullData.message);
      console.error("Error:", fullData.message);  
    }
  })
  .catch(function(err) {
    console.error("Network error:", err);
    // Ensure pendingUsers is initialized even on failure
    pendingUsers = [];
  });
}

// New function to get approved users
function getApproved() {
  fetch("http://localhost:3000/data/approvereq", {
    method: "GET"
  })
  .then(async function(r1) {
    let fullData = await r1.json();
    
    if(r1.ok) {
      // Process the data from the API
      mockApprovedUsers = fullData.data.map((user) => {
        return {
          id: user._id,
          name: user.name || "",
          email: user.email || `${user.name}@gmail.com`, // Use name@gmail.com if no email exists
          phone: user.mobile || "",
          nid: user.nid || "",
          address: user.address || "",
          registrationDate: user.registrationDate || new Date().toISOString().split('T')[0],
          approvalDate: user.approvalDate || new Date().toISOString().split('T')[0],
          // Store any additional fields from the API
          dob: user.dob || "",
          father: user.father || "",
          mother: user.mother || "",
          pin: user.pin || ""
        };
      });
      
      console.log("Processed approved users:", mockApprovedUsers);  
      approvedUsers = [...mockApprovedUsers];
      
      // Update UI after data is loaded
      renderDashboard();
      renderUserManagement();
      updateCounters();
    } else {
      alert(fullData.message);
      console.error("Error:", fullData.message);  
    }
  })
  .catch(function(err) {
    console.error("Network error:", err);
    // Ensure approvedUsers is initialized even on failure
    approvedUsers = [];
  });
}

// New function to get rejected users
function getRejected() {
  fetch("http://localhost:3000/data/rejectreq", {
    method: "GET"
  })
  .then(async function(r1) {
    let fullData = await r1.json();
    
    if(r1.ok) {
      // Process the data from the API
      mockRejectedUsers = fullData.data.map((user) => {
        return {
          id: user._id,
          name: user.name || "",
          email: user.email || `${user.name}@gmail.com`, // Use name@gmail.com if no email exists
          phone: user.mobile || "",
          nid: user.nid || "",
          address: user.address || "",
          registrationDate: user.registrationDate || new Date().toISOString().split('T')[0],
          rejectionDate: user.rejectionDate || new Date().toISOString().split('T')[0],
          rejectionReason: user.reason || "No reason provided", // Use reason field from API
          // Store any additional fields from the API
          dob: user.dob || "",
          father: user.father || "",
          mother: user.mother || "",
          pin: user.pin || ""
        };
      });
      
      console.log("Processed rejected users:", mockRejectedUsers);  
      rejectedUsers = [...mockRejectedUsers];
      
      // Update UI after data is loaded
      renderDashboard();
      renderUserManagement();
      updateCounters();
    } else {
      alert(fullData.message);
      console.error("Error:", fullData.message);  
    }
  })
  .catch(function(err) {
    console.error("Network error:", err);
    // Ensure rejectedUsers is initialized even on failure
    rejectedUsers = [];
  });
}

// Call all fetch functions
getPending();
getApproved();
getRejected();

const mockAgents = [
  {
    id: 1,
    name: "Rahim Ali",
    email: "rahim@surepay.com",
    phone: "01712345679",
    location: "Mirpur Branch",
    status: "active",
  },
  {
    id: 2,
    name: "Sabina Yasmin",
    email: "sabina@surepay.com",
    phone: "01812345679",
    location: "Gulshan Branch",
    status: "active",
  },
  {
    id: 3,
    name: "Mahfuz Rahman",
    email: "mahfuz@surepay.com",
    phone: "01912345679",
    location: "Dhanmondi Branch",
    status: "inactive",
  },
];

const mockPendingAgentRequests = [
  {
    id: 4,
    name: "Mohamad Ali",
    email: "mohamad@example.com",
    phone: "01612345999",
    location: "Banani Branch",
    requestDate: "2025-05-15",
  },
  {
    id: 5,
    name: "Fatima Begum",
    email: "fatima@example.com",
    phone: "01812399678",
    location: "Dhanmondi Branch",
    requestDate: "2025-05-16",
  },
];

// Admin credentials
const adminCredentials = [
  { username: "Tanvir", password: "pass1111" },
  { username: "Shawon", password: "pass2222" },
  { username: "Ali", password: "pass3333" },
  { username: "Nabila", password: "pass4444" },
];

// Application state
let agents = [...mockAgents];
let pendingAgentRequests = [...mockPendingAgentRequests];
let selectedUser = null;
let selectedAgent = null;
let searchTerm = "";
let activeTab = "dashboard";
let currentTheme = localStorage.getItem("theme") || "light";

// DOM Elements and Event Handlers
document.addEventListener("DOMContentLoaded", function () {
  // Set theme from localStorage if available
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeUI(currentTheme);
  }

  initializeApp();
  setupEventListeners();
  renderContent();
});

function initializeApp() {
  updateCounters();
}

function setupEventListeners() {
  // Login Form
  setupLoginForm();

  // Navigation
  setupNavigation();

  // Search Functionality
  setupSearch();

  // Notifications
  setupNotifications();

  // User and Agent Modals
  setupModals();

  // Theme Toggle
  setupThemeToggle();

  // Filters
  setupFilters();

  // Fund Transfer Flow
  setupFundTransferFlow();
}

function setupFundTransferFlow() {
  // Step 1: Select agent
  const proceedToAmountBtn = document.getElementById("proceed-to-amount");
  const agentNumberInput = document.getElementById("agent-number");
  const recentAgentItems = document.querySelectorAll(".recent-agent-item");

  // Step 2: Enter amount
  const backToAgentBtn = document.getElementById("back-to-agent");
  const proceedToPinBtn = document.getElementById("proceed-to-pin");
  const transferAmountInput = document.getElementById("transfer-amount");

  // Step 3: Enter PIN
  const backToAmountBtn = document.getElementById("back-to-amount");
  const confirmTransferBtn = document.getElementById("confirm-transfer");
  const transactionPinInput = document.getElementById("transaction-pin");

  // Step 4: Success
  const newTransferBtn = document.getElementById("new-transfer");

  // Step 1 -> Step 2
  if (proceedToAmountBtn) {
    proceedToAmountBtn.addEventListener("click", function () {
      const agentNumber = agentNumberInput.value.trim();
      if (agentNumber) {
        // Find agent by number
        const agent = findAgentByNumber(agentNumber);
        if (agent) {
          moveToAmountStep(agent);
        } else {
          alert(
            "Agent not found with this number. Please check and try again."
          );
        }
      } else {
        alert("Please enter an agent number");
      }
    });
  }

  // Recent agent selection
  if (recentAgentItems) {
    recentAgentItems.forEach((item) => {
      item.addEventListener("click", function () {
        const agentNumber = this.getAttribute("data-number");
        const agent = findAgentByNumber(agentNumber);
        if (agent) {
          moveToAmountStep(agent);
        }
      });
    });
  }

  // Step 2 -> Step 1 (Back)
  if (backToAgentBtn) {
    backToAgentBtn.addEventListener("click", function () {
      document
        .getElementById("agent-selection-step")
        .classList.remove("hidden");
      document.getElementById("amount-input-step").classList.add("hidden");
      agentNumberInput.value = "";
    });
  }

  // Step 2 -> Step 3
  if (proceedToPinBtn) {
    proceedToPinBtn.addEventListener("click", function () {
      const amount = transferAmountInput.value.trim();
      if (amount && !isNaN(amount) && Number(amount) > 0) {
        moveToPinStep(amount);
      } else {
        alert("Please enter a valid amount");
      }
    });
  }

  // Step 3 -> Step 2 (Back)
  if (backToAmountBtn) {
    backToAmountBtn.addEventListener("click", function () {
      document.getElementById("amount-input-step").classList.remove("hidden");
      document.getElementById("pin-verification-step").classList.add("hidden");
      transferAmountInput.value = "";
    });
  }

  // Step 3 -> Step 4
  // if (confirmTransferBtn) {
  //   confirmTransferBtn.addEventListener("click", function () {
  //     const pin = transactionPinInput.value.trim();
  //     if (pin && pin.length === 5 && !isNaN(pin)) {
  //       moveToSuccessStep();
  //     } else {
  //       alert("Please enter a valid 5-digit PIN");
  //     }
  //   });
  // }

  // Step 4 -> Step 1 (New Transfer)
  if (newTransferBtn) {
    newTransferBtn.addEventListener("click", function () {
      resetTransferFlow();
    });
  }
}

function findAgentByNumber(number) {
  const agents = [
    { name: "Rahim Ali", phone: "01712345679", initial: "R" },
    { name: "Sabina Yasmin", phone: "01812345679", initial: "S" },
    { name: "Mahfuz Rahman", phone: "01912345679", initial: "M" },
  ];

  // Check known agents
  const agent = agents.find((a) => a.phone === number);
  if (agent) {
    return agent;
  }

  // For valid numbers, create a generic agent object
  if (/^01[3-9]\d{8}$/.test(number)) {
    return {
      name: "Agent",
      phone: number,
      initial: number.charAt(2).toUpperCase(),
    };
  }

  return null;
}

function moveToAmountStep(agent) {
  // Hide agent selection, show amount input
  document.getElementById("agent-selection-step").classList.add("hidden");
  document.getElementById("amount-input-step").classList.remove("hidden");

  // Update selected agent info
  document.getElementById("display-agent-name").textContent = agent.name;
  document.getElementById("display-agent-number").textContent = agent.phone;
  document
    .getElementById("selected-agent-info")
    .querySelector(".agent-avatar").textContent = agent.name.charAt(0);
}

function moveToPinStep(amount) {
  // Hide amount input, show PIN verification
  document.getElementById("amount-input-step").classList.add("hidden");
  document.getElementById("pin-verification-step").classList.remove("hidden");

  // Format amount with comma and Taka symbol
  const formattedAmount = "৳" + Number(amount).toLocaleString();

  // Update transaction summary
  document.getElementById("summary-amount").textContent = formattedAmount;
  document.getElementById("summary-agent-name").textContent =
    document.getElementById("display-agent-name").textContent;
  document.getElementById("summary-agent-number").textContent =
    document.getElementById("display-agent-number").textContent;
}

function moveToSuccessStep() {
  // Hide PIN verification, show success screen
  document.getElementById("pin-verification-step").classList.add("hidden");
  document.getElementById("success-step").classList.remove("hidden");

  // Generate random transaction ID
  const transactionId = "TXN" + Math.floor(Math.random() * 1000000000);

  // Get current date and time
  const now = new Date();
  const dateTime = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Update success screen with transaction details
  document.getElementById("success-amount").textContent =
    document.getElementById("summary-amount").textContent;
  document.getElementById("success-agent").textContent =
    document.getElementById("summary-agent-name").textContent;
  document.getElementById("transaction-id").textContent = transactionId;
  document.getElementById("transaction-date").textContent = dateTime;
  document.getElementById("receipt-agent-name").textContent =
    document.getElementById("summary-agent-name").textContent;
  document.getElementById("receipt-agent-number").textContent =
    document.getElementById("summary-agent-number").textContent;
  document.getElementById("receipt-amount").textContent =
    document.getElementById("summary-amount").textContent;
}

function resetTransferFlow() {
  // Reset all form fields
  document.getElementById("agent-number").value = "";
  document.getElementById("transfer-amount").value = "";
  document.getElementById("transaction-pin").value = "";

  // Show first step, hide others
  document.getElementById("agent-selection-step").classList.remove("hidden");
  document.getElementById("amount-input-step").classList.add("hidden");
  document.getElementById("pin-verification-step").classList.add("hidden");
  document.getElementById("success-step").classList.add("hidden");
}

function setupFilters() {
  const usersFilter = document.getElementById("users-filter");
  const agentsFilter = document.getElementById("agents-filter");

  if (usersFilter) {
    usersFilter.addEventListener("change", function () {
      const selectedFilter = this.value;
      filterUsersList(selectedFilter);
    });
  }

  if (agentsFilter) {
    agentsFilter.addEventListener("change", function () {
      const selectedFilter = this.value;
      filterAgentsList(selectedFilter);
    });
  }
}

function filterUsersList(filter) {
  const pendingUsersSection = document.querySelector(
    ".card:has(#pending-users-list)"
  );
  const approvedUsersSection = document.querySelector(
    ".card:has(#approved-users-list)"
  );
  const rejectedUsersSection = document.querySelector(
    ".card:has(#rejected-users-list)"
  );

  // Reset all to visible first
  if (pendingUsersSection) pendingUsersSection.classList.remove("hidden");
  if (approvedUsersSection) approvedUsersSection.classList.remove("hidden");
  if (rejectedUsersSection) rejectedUsersSection.classList.remove("hidden");

  // Apply filter based on selection
  switch (filter) {
    case "Pending":
      if (approvedUsersSection) approvedUsersSection.classList.add("hidden");
      if (rejectedUsersSection) rejectedUsersSection.classList.add("hidden");
      break;
    case "Approved":
      if (pendingUsersSection) pendingUsersSection.classList.add("hidden");
      if (rejectedUsersSection) rejectedUsersSection.classList.add("hidden");
      break;
    case "Rejected":
      if (pendingUsersSection) pendingUsersSection.classList.add("hidden");
      if (approvedUsersSection) approvedUsersSection.classList.add("hidden");
      break;
    default:
      // All Users - show everything
      break;
  }
}

function filterAgentsList(filter) {
  const pendingAgentsSection = document.querySelector(
    ".card:has(#agent-requests-table)"
  );
  const activeAgentsSection = document.querySelector(
    ".card:has(#agents-table)"
  );

  // Reset all to visible first
  if (pendingAgentsSection) pendingAgentsSection.classList.remove("hidden");
  if (activeAgentsSection) activeAgentsSection.classList.remove("hidden");

  // Apply filter based on selection
  switch (filter) {
    case "Active":
      if (pendingAgentsSection) pendingAgentsSection.classList.add("hidden");
      // Filter active agents table to only show active
      const activeAgents = document.querySelectorAll(
        ".agent-table-status.active"
      );
      const inactiveAgents = document.querySelectorAll(
        ".agent-table-status.inactive"
      );

      inactiveAgents.forEach((agent) => {
        agent.closest("tr").classList.add("hidden");
      });

      activeAgents.forEach((agent) => {
        agent.closest("tr").classList.remove("hidden");
      });
      break;
    case "Inactive":
      if (pendingAgentsSection) pendingAgentsSection.classList.add("hidden");
      // Filter active agents table to only show inactive
      const activeAgents2 = document.querySelectorAll(
        ".agent-table-status.active"
      );
      const inactiveAgents2 = document.querySelectorAll(
        ".agent-table-status.inactive"
      );

      activeAgents2.forEach((agent) => {
        agent.closest("tr").classList.add("hidden");
      });

      inactiveAgents2.forEach((agent) => {
        agent.closest("tr").classList.remove("hidden");
      });
      break;
    case "Pending":
      if (activeAgentsSection) activeAgentsSection.classList.add("hidden");
      break;
    default:
      // All Agents - reset any row-level filtering
      const allAgentRows = document.querySelectorAll("#agents-table tr");
      allAgentRows.forEach((row) => {
        row.classList.remove("hidden");
      });
      break;
  }
}

function setupLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const loginError = document.getElementById("loginError");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const logoutButton = document.getElementById("logout-button");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleLogin(usernameInput.value, passwordInput.value);
    });
  }

  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      togglePasswordVisibility(passwordInput, togglePasswordBtn);
    });
  }

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
}

function setupNavigation() {
  const sidebar = document.getElementById("sidebar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navItems = document.querySelectorAll(".nav-item");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("open");
    });
  }

  if (navItems) {
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        const tab = this.getAttribute("data-tab");
        setActiveTab(tab);
        sidebar.classList.remove("open");
      });
    });

    // Set initial active tab
    document
      .querySelector(`.nav-item[data-tab="${activeTab}"]`)
      .classList.add("active");
  }
}

function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.trim();
      handleSearchInput();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      clearSearch(searchInput);
    });
  }
}

function setupNotifications() {
  const notificationBtn = document.getElementById("notification-btn");
  const notificationDropdown = document.getElementById("notification-dropdown");

  if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener("click", function () {
      toggleNotifications(notificationDropdown);
    });

    // Close notifications when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !notificationBtn.contains(event.target) &&
        !notificationDropdown.contains(event.target)
      ) {
        notificationDropdown.classList.add("hidden");
      }
    });
  }
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const themeText = document.getElementById("theme-text");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      currentTheme = newTheme;
      updateThemeUI(newTheme);
    });
  }
}

function updateThemeUI(theme) {
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");
  const themeText = document.getElementById("theme-text");

  if (theme === "dark") {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    themeText.innerText = "Dark Mode";
  } else {
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    themeText.innerText = "Light Mode";
  }
}

function setupModals() {
  // User Modal
  const userModal = document.getElementById("user-modal");
  const closeUserModalBtn = document.getElementById("close-user-modal-btn");
  const closeUserModal = document.getElementById("close-user-modal");
  const approveUserBtn = document.getElementById("approve-user-btn");
  const rejectUserBtn = document.getElementById("reject-user-btn");
  const deleteUserBtn = document.getElementById("delete-user-btn");

  if (closeUserModalBtn) {
    closeUserModalBtn.addEventListener("click", () => closeModal(userModal));
  }

  if (closeUserModal) {
    closeUserModal.addEventListener("click", () => closeModal(userModal));
  }

  if (approveUserBtn) {
    approveUserBtn.addEventListener("click", handleApproveUser);
  }

  if (rejectUserBtn) {
    rejectUserBtn.addEventListener("click", handleRejectUser);
  }

  if (deleteUserBtn) {
    deleteUserBtn.addEventListener("click", handleDeleteUser);
  }

  // Agent Modal
  const agentModal = document.getElementById("agent-modal");
  const closeAgentModalBtn = document.getElementById("close-agent-modal-btn");
  const closeAgentModal = document.getElementById("close-agent-modal");
  const approveAgentBtn = document.getElementById("approve-agent-btn");
  const rejectAgentBtn = document.getElementById("reject-agent-btn");
  const deleteAgentBtn = document.getElementById("delete-agent-btn");

  if (closeAgentModalBtn) {
    closeAgentModalBtn.addEventListener("click", () => closeModal(agentModal));
  }

  if (closeAgentModal) {
    closeAgentModal.addEventListener("click", () => closeModal(agentModal));
  }

  if (approveAgentBtn) {
    approveAgentBtn.addEventListener("click", handleApproveAgent);
  }

  if (rejectAgentBtn) {
    rejectAgentBtn.addEventListener("click", handleRejectAgent);
  }

  if (deleteAgentBtn) {
    deleteAgentBtn.addEventListener("click", handleDeleteAgent);
  }
}

// Render Functions
function renderContent() {
  renderDashboard();
  renderUserManagement();
  renderAgentManagement();
}

function renderDashboard() {
  const recentRegistrations = document.getElementById("recent-registrations");
  const pendingAgentRequestsList = document.getElementById(
    "pending-agent-requests"
  );

  if (!recentRegistrations || !pendingAgentRequestsList) return;

  // Render recent registrations
  recentRegistrations.innerHTML =
    pendingUsers.length > 0
      ? renderRecentRegistrationsList()
      : renderEmptyMessage("No pending registrations");

  // Render pending agent requests
  pendingAgentRequestsList.innerHTML =
    pendingAgentRequests.length > 0
      ? renderPendingAgentRequestsList()
      : renderEmptyMessage("No pending agent requests");

  // Add event listeners to buttons
  addDashboardEventListeners();
}

function renderUserManagement() {
  const pendingUsersList = document.getElementById("pending-users-list");
  const approvedUsersList = document.getElementById("approved-users-list");
  const rejectedUsersList = document.getElementById("rejected-users-list");

  if (!pendingUsersList || !approvedUsersList || !rejectedUsersList) return;

  // Filter users based on search term
  const filteredPendingUsers = filterUsersBySearchTerm(pendingUsers);
  const filteredApprovedUsers = filterUsersBySearchTerm(approvedUsers);
  const filteredRejectedUsers = filterUsersBySearchTerm(rejectedUsers);

  // Render users lists
  pendingUsersList.innerHTML =
    filteredPendingUsers.length > 0
      ? renderUsersList(filteredPendingUsers, "pending")
      : renderEmptyState("No pending registrations");

  approvedUsersList.innerHTML =
    filteredApprovedUsers.length > 0
      ? renderUsersList(filteredApprovedUsers, "approved")
      : renderEmptyState("No approved users");

  rejectedUsersList.innerHTML =
    filteredRejectedUsers.length > 0
      ? renderUsersList(filteredRejectedUsers, "rejected")
      : renderEmptyState("No rejected users");

  // Add event listeners to user action buttons
  addUserManagementEventListeners();
}

function renderAgentManagement() {
  const agentRequestsTable = document.getElementById("agent-requests-table");
  const agentsTable = document.getElementById("agents-table");
  const noAgentRequests = document.getElementById("no-agent-requests");
  const noAgents = document.getElementById("no-agents");

  if (!agentRequestsTable || !agentsTable || !noAgentRequests || !noAgents)
    return;

  // Filter agents based on search term
  const filteredAgents = filterAgentsBySearchTerm(agents);
  const filteredAgentRequests = filterAgentsBySearchTerm(pendingAgentRequests);

  // Render agent requests
  if (filteredAgentRequests.length > 0) {
    agentRequestsTable.innerHTML = renderAgentRequestsTable(
      filteredAgentRequests
    );
    noAgentRequests.classList.add("hidden");
  } else {
    agentRequestsTable.innerHTML = "";
    noAgentRequests.classList.remove("hidden");
  }

  // Render active agents
  if (filteredAgents.length > 0) {
    agentsTable.innerHTML = renderAgentsTable(filteredAgents);
    noAgents.classList.add("hidden");
  } else {
    agentsTable.innerHTML = "";
    noAgents.classList.remove("hidden");
  }

  // Add event listeners to agent action buttons
  addAgentManagementEventListeners();
}

function renderSearchResults() {
  const searchResults = document.getElementById("search-results");
  if (!searchResults) return;

  const filteredPendingUsers = filterUsersBySearchTerm(pendingUsers);
  const filteredApprovedUsers = filterUsersBySearchTerm(approvedUsers);
  const filteredRejectedUsers = filterUsersBySearchTerm(rejectedUsers);
  const filteredAgents = filterAgentsBySearchTerm([
    ...agents,
    ...pendingAgentRequests,
  ]);

  let html = "";

  // Generate search results HTML
  if (filteredPendingUsers.length > 0) {
    html += renderSearchResultsGroup(
      "Pending Users",
      filteredPendingUsers.slice(0, 3),
      "user"
    );
  }

  if (filteredApprovedUsers.length > 0) {
    html += renderSearchResultsGroup(
      "Approved Users",
      filteredApprovedUsers.slice(0, 3),
      "user"
    );
  }
  
  if (filteredRejectedUsers.length > 0) {
    html += renderSearchResultsGroup(
      "Rejected Users",
      filteredRejectedUsers.slice(0, 3),
      "user"
    );
  }

  if (filteredAgents.length > 0) {
    html += renderSearchResultsGroup(
      "Agents",
      filteredAgents.slice(0, 3),
      "agent"
    );
  }

  if (
    filteredPendingUsers.length === 0 &&
    filteredApprovedUsers.length === 0 &&
    filteredRejectedUsers.length === 0 &&
    filteredAgents.length === 0
  ) {
    html = `<div class="search-empty">No results found</div>`;
  }

  searchResults.innerHTML = html;

  // Add event listeners to search results
  addSearchResultEventListeners(searchResults);
}

// Event Handlers
function handleLogin(username, password) {
  const loginContainer = document.getElementById("login-container");
  const adminContainer = document.getElementById("admin-container");
  const loginError = document.getElementById("loginError");

  // Simple 1 second delay before checking credentials
  setTimeout(() => {
    const admin = adminCredentials.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      // Save only login state to localStorage, not username/password
      localStorage.setItem("isLoggedIn", "true");

      // Update sidebar username
      document.getElementById("sidebar-username").textContent = username;
      document.getElementById("user-initial").textContent = username
        .charAt(0)
        .toUpperCase();

      // Show dashboard directly without intermediate states
      loginContainer.classList.add("hidden");
      adminContainer.classList.remove("hidden");
    } else {
      // Error state for invalid credentials
      loginError.classList.remove("hidden");
    }
  }, 1000); // 1 second delay
}

function handleLogout() {
  // Clear login state
  localStorage.removeItem("isLoggedIn");

  // Redirect to login page
  window.location.href = "/";
}

function checkLoginState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    // User is logged in, show dashboard
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("admin-container").classList.remove("hidden");

    // Set initial username for sidebar - using Tanvir as default
    document.getElementById("sidebar-username").textContent = "Tanvir";
    document.getElementById("user-initial").textContent = "A";
  } else {
    // User is not logged in, show login form
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("admin-container").classList.add("hidden");

    // Clear login form inputs
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
}

// Update the validation function for agent numbers
function validateAgentNumber(number) {
  const agentNumberError = document.getElementById("agent-number-error");

  // Clear previous error
  agentNumberError.style.display = "none";

  // Check if empty
  if (!number) {
    showError(agentNumberError, "Agent number is required");
    return false;
  }

  // Check if 11 digits
  if (number.length !== 11) {
    showError(agentNumberError, "Agent number must be 11 digits");
    return false;
  }

  // Check if starts with valid BD prefix (013-019)
  if (!/^01[3-9]/.test(number)) {
    showError(
      agentNumberError,
      "Must start with a valid BD operator prefix (013-019)"
    );
    return false;
  }

  return true;
}

function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.style.display = "block";
  }
}

function setupAgentNumberInput() {
  const agentNumberInput = document.getElementById("agent-number");
  if (agentNumberInput) {
    agentNumberInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^0-9]/g, "");

      // Enforce 11 digit limit
      if (this.value.length > 11) {
        this.value = this.value.substring(0, 11);
      }

      // Show validation messages as user types
      const agentNumberError = document.getElementById("agent-number-error");
      if (this.value.length > 0 && !this.value.startsWith("01")) {
        showError(agentNumberError, "Number must start with 01");
      } else if (
        this.value.length === 3 &&
        !["013", "014", "015", "016", "017", "018", "019"].includes(this.value)
      ) {
        showError(
          agentNumberError,
          "Must be a valid BD operator prefix (013-019)"
        );
      } else if (this.value.length > 0 && this.value.length < 11) {
        showError(agentNumberError, "Number must be 11 digits");
      } else {
        agentNumberError.style.display = "none";
      }
    });
  }
}

// Add this to your admin.js file or include it in a script tag
function handleAgentNumberKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const agentNumber = document.getElementById("agent-number").value.trim();

    if (validateAgentNumber(agentNumber)) {
      // Find if it's one of our recent agents
      const agent = findAgentByNumber(agentNumber);
      let agentName, agentInitial;

      if (agent) {
        agentName = agent.name;
        agentInitial = agent.initial;
      } else {
        // For any other valid number, create a generic agent
        agentName = "Agent";
        agentInitial = agentNumber.charAt(2).toUpperCase();
      }

      // Update the display for the next step
      document.getElementById("display-agent-name").textContent = agentName;
      document.getElementById("display-agent-number").textContent = agentNumber;
      document
        .getElementById("selected-agent-info")
        .querySelector(".agent-avatar").textContent = agentInitial;

      // Update summary information too
      document.getElementById("summary-agent-name").textContent = agentName;
      document.getElementById("summary-agent-number").textContent = agentNumber;

      // Hide agent selection step, show amount input step
      document.getElementById("agent-selection-step").classList.add("hidden");
      document.getElementById("amount-input-step").classList.remove("hidden");
    }
  }
}

function togglePasswordVisibility(passwordInput, toggleButton) {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Update the icon
  if (type === "text") {
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
      `;
  } else {
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
      `;
  }
}

function handleSearchInput() {
  const clearSearchBtn = document.getElementById("clear-search");
  const searchResults = document.getElementById("search-results");

  if (searchTerm.length > 0) {
    renderSearchResults();
    clearSearchBtn.classList.remove("hidden");
    searchResults.classList.remove("hidden");
  } else {
    clearSearchBtn.classList.add("hidden");
    searchResults.classList.add("hidden");
  }

  // Update content based on search term
  renderUserManagement();
  renderAgentManagement();
}

function clearSearch(searchInput) {
  searchInput.value = "";
  searchTerm = "";
  document.getElementById("clear-search").classList.add("hidden");
  document.getElementById("search-results").classList.add("hidden");

  // Update content with cleared search
  renderUserManagement();
  renderAgentManagement();
}

function toggleNotifications(notificationDropdown) {
  notificationDropdown.classList.toggle("hidden");

  // Mark notifications as read
  if (!notificationDropdown.classList.contains("hidden")) {
    document.getElementById("notification-count").textContent = "0";
  }
}

function setActiveTab(tab) {
  // Update active state in navigation
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    if (item.getAttribute("data-tab") === tab) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Show the selected tab content
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((content) => {
    if (content.id === `${tab}-tab`) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });

  // Update page title
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    const formattedTitle = tab
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });
    pageTitle.textContent = formattedTitle;
  }

  activeTab = tab;
}

function openUserModal(user) {
  const userModal = document.getElementById("user-modal");
  if (!userModal) return;

  selectedUser = user;

  // Populate modal content
  populateUserModal(user);

  // Show modal
  userModal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
  if (modal.id === "user-modal") {
    selectedUser = null;
  } else if (modal.id === "agent-modal") {
    selectedAgent = null;
  }
}

function openAgentModal(agent) {
  const agentModal = document.getElementById("agent-modal");
  if (!agentModal) return;

  selectedAgent = agent;

  // Populate modal content
  populateAgentModal(agent);

  // Show modal
  agentModal.classList.remove("hidden");
}

function handleApproveUser() {
  if (selectedUser) {
    approveUser(selectedUser.id);
    closeModal(document.getElementById("user-modal"));
  }
}

function handleRejectUser() {
  const rejectionReasonInput = document.getElementById("rejection-reason-input");

  if (selectedUser) {
    const rejectionReason = rejectionReasonInput.value.trim();
    if (!rejectionReason) {
      alert("Please provide a reason for rejection");
      return;
    }

    rejectUser(selectedUser.id, rejectionReason);
    closeModal(document.getElementById("user-modal"));
  }
}

function handleDeleteUser() {
  if (selectedUser) {
    // Remove from whatever list it's in
    if (pendingUsers.some((user) => user.id === selectedUser.id)) {
      pendingUsers = pendingUsers.filter((user) => user.id !== selectedUser.id);
    } else if (approvedUsers.some((user) => user.id === selectedUser.id)) {
      approvedUsers = approvedUsers.filter(
        (user) => user.id !== selectedUser.id
      );
    } else if (rejectedUsers.some((user) => user.id === selectedUser.id)) {
      rejectedUsers = rejectedUsers.filter(
        (user) => user.id !== selectedUser.id
      );
    }

    closeModal(document.getElementById("user-modal"));
    updateUIAfterUserAction();
  }
}

function handleApproveAgent() {
  if (selectedAgent) {
    approveAgent(selectedAgent.id);
    closeModal(document.getElementById("agent-modal"));
    updateUIAfterAgentAction();
  }
}

function handleRejectAgent() {
  const agentRejectionReasonInput = document.getElementById(
    "agent-rejection-reason"
  );

  if (selectedAgent) {
    const rejectionReason = agentRejectionReasonInput.value.trim();
    if (!rejectionReason) {
      alert("Please provide a reason for rejection");
      return;
    }

    rejectAgent(selectedAgent.id, rejectionReason);
    closeModal(document.getElementById("agent-modal"));
    updateUIAfterAgentAction();
  }
}

function handleDeleteAgent() {
  if (selectedAgent) {
    // Remove from whatever list it's in
    if (pendingAgentRequests.some((agent) => agent.id === selectedAgent.id)) {
      pendingAgentRequests = pendingAgentRequests.filter(
        (agent) => agent.id !== selectedAgent.id
      );
    } else if (agents.some((agent) => agent.id === selectedAgent.id)) {
      agents = agents.filter((agent) => agent.id !== selectedAgent.id);
    }

    closeModal(document.getElementById("agent-modal"));
    updateUIAfterAgentAction();
  }
}

// Data Management Functions
function approveUser(userId) {
  console.log("approveUser function called with userId:", userId);
  
  const userToApprove = pendingUsers.find((user) => user.id === userId);
  if (userToApprove) {
    // First make the API call
    fetch("http://localhost:3000/data/approvereq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: userId 
      })
    })
    .then(async function(r1) {
      const data = await r1.json();
      
      if(r1.ok) {
        // Update local data only after API success
        const updatedUser = {
          ...userToApprove,
          approvalDate: new Date().toISOString().split("T")[0],
        };
        approvedUsers.push(updatedUser);
        pendingUsers = pendingUsers.filter((user) => user.id !== userId);
        
        // Update UI
        updateUIAfterUserAction();
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch(function(err) {
      console.error("Network error:", err);
      alert("Network error occurred. Please try again.");
    });
  } else {
    console.error("User not found with ID:", userId);
  }
}

function rejectUser(userId, reason) {
  console.log("rejectUser function called with userId:", userId, "and reason:", reason);
  
  const userToReject = pendingUsers.find((user) => user.id === userId);
  if (userToReject) {
    // First make the API call
    fetch("http://localhost:3000/data/rejectreq", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        id: userId,
        reason: reason
      })
    })
    .then(async function(r1) {
      const data = await r1.json();
      
      if(r1.ok) {
        // Update local data only after API success
        const updatedUser = {
          ...userToReject,
          rejectionDate: new Date().toISOString().split("T")[0],
          rejectionReason: reason,
        };
        rejectedUsers.push(updatedUser);
        pendingUsers = pendingUsers.filter((user) => user.id !== userId);
        
        // Update UI
        updateUIAfterUserAction();
        alert(data.message);
      } else {
        alert(data.message);
      }
    })
    .catch(function(err) {
      console.error("Network error:", err);
      alert("Network error occurred. Please try again.");
    });
  } else {
    console.error("User not found with ID:", userId);
  }
}

function approveAgent(agentId) {
  const agentToApprove = pendingAgentRequests.find(
    (agent) => agent.id === agentId
  );
  if (agentToApprove) {
    const updatedAgent = {
      ...agentToApprove,
      status: "active",
      approvalDate: new Date().toISOString().split("T")[0],
    };
    agents.push(updatedAgent);
    pendingAgentRequests = pendingAgentRequests.filter(
      (agent) => agent.id !== agentId
    );
  }
}

function rejectAgent(agentId, reason) {
  pendingAgentRequests = pendingAgentRequests.filter(
    (agent) => agent.id !== agentId
  );
}

// Helper Functions
function updateCounters() {
  // Dashboard counters
  updateElementText("pending-count", pendingUsers.length);
  updateElementText("approved-count", approvedUsers.length);
  updateElementText("rejected-count", rejectedUsers.length);  // Added counter for rejected users
  updateElementText("agents-count", agents.length);
  updateElementText(
    "active-agents-count",
    agents.filter((a) => a.status === "active").length
  );

  // Database view counters
  updateElementText(
    "total-users-count",
    pendingUsers.length + approvedUsers.length + rejectedUsers.length
  );
  updateElementText("db-pending-count", pendingUsers.length);
  updateElementText("db-approved-count", approvedUsers.length);
  updateElementText("db-rejected-count", rejectedUsers.length);
  updateElementText("total-agents-count", agents.length);
  updateElementText(
    "db-active-agents",
    agents.filter((a) => a.status === "active").length
  );
  updateElementText(
    "db-inactive-agents",
    agents.filter((a) => a.status === "inactive").length
  );
  updateElementText("db-pending-agents", pendingAgentRequests.length);
}

function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) element.textContent = text;
}

function filterUsersBySearchTerm(users) {
  if (!searchTerm) return users;

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );
}

function filterAgentsBySearchTerm(agents) {
  if (!searchTerm) return agents;

  return agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.phone.includes(searchTerm) ||
      (agent.location &&
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}

function updateUIAfterUserAction() {
  renderUserManagement();
  renderDashboard();
  updateCounters();
}

function updateUIAfterAgentAction() {
  renderAgentManagement();
  renderDashboard();
  updateCounters();
}

function populateUserModal(user) {
  // Set user details
  updateElementText("user-modal-initial", user.name.charAt(0));
  updateElementText("user-modal-name", user.name);
  updateElementText(
    "user-modal-date",
    user.approvalDate
      ? `Approved on ${user.approvalDate}`
      : user.rejectionDate
      ? `Rejected on ${user.rejectionDate}`
      : `Registered on ${user.registrationDate}`
  );
  updateElementText("user-modal-email", user.email);
  updateElementText("user-modal-phone", user.phone);
  updateElementText("user-modal-nid", user.nid);
  updateElementText("user-modal-address", user.address);

  // Update UI based on user status
  const userStatusBadge = document.getElementById("user-status-badge");
  const approvalInfo = document.getElementById("approval-info");
  const rejectionInfo = document.getElementById("rejection-info");
  const rejectionForm = document.getElementById("rejection-form");
  const userActionButtons = document.getElementById("user-action-buttons");
  const deleteUserBtn = document.getElementById("delete-user-btn");

  if (user.approvalDate) {
    updateApprovedUserModal(
      userStatusBadge,
      approvalInfo,
      rejectionInfo,
      rejectionForm,
      userActionButtons,
      deleteUserBtn,
      user
    );
  } else if (user.rejectionDate) {
    updateRejectedUserModal(
      userStatusBadge,
      approvalInfo,
      rejectionInfo,
      rejectionForm,
      userActionButtons,
      deleteUserBtn,
      user
    );
  } else {
    updatePendingUserModal(
      userStatusBadge,
      approvalInfo,
      rejectionInfo,
      rejectionForm,
      userActionButtons,
      deleteUserBtn
    );
  }
}

function updateApprovedUserModal(
  badge,
  approvalInfo,
  rejectionInfo,
  rejectionForm,
  actionButtons,
  deleteUserBtn,
  user
) {
  badge.className = "status-badge approved";
  badge.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
      Approved
    `;
  approvalInfo.classList.remove("hidden");
  rejectionInfo.classList.add("hidden");
  rejectionForm.classList.add("hidden");
  actionButtons.classList.add("hidden");
  deleteUserBtn.classList.remove("hidden");

  // Update approval info
  updateElementText("approval-date", `Approved on ${user.approvalDate}`);
}

function updateRejectedUserModal(
  badge,
  approvalInfo,
  rejectionInfo,
  rejectionForm,
  actionButtons,
  deleteUserBtn,
  user
) {
  badge.className = "status-badge rejected";
  badge.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
      Rejected
    `;
  approvalInfo.classList.add("hidden");
  rejectionInfo.classList.remove("hidden");
  rejectionForm.classList.add("hidden");
  actionButtons.classList.add("hidden");
  deleteUserBtn.classList.remove("hidden");

  // Update rejection info
  updateElementText("rejection-date", `Rejected on ${user.rejectionDate}`);
  updateElementText("rejection-reason", `Reason: ${user.rejectionReason}`);
}

function updatePendingUserModal(
  badge,
  approvalInfo,
  rejectionInfo,
  rejectionForm,
  actionButtons,
  deleteUserBtn
) {
  badge.className = "status-badge pending";
  badge.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      Pending
    `;
  approvalInfo.classList.add("hidden");
  rejectionInfo.classList.add("hidden");
  rejectionForm.classList.remove("hidden");
  actionButtons.classList.remove("hidden");
  deleteUserBtn.classList.remove("hidden");

  // Clear rejection reason input
  document.getElementById("rejection-reason-input").value = "";
}

function populateAgentModal(agent) {
  // Set agent details
  updateElementText("agent-modal-initial", agent.name.charAt(0));
  updateElementText("agent-modal-name", agent.name);
  updateElementText(
    "agent-modal-date",
    `Request received on ${agent.requestDate}`
  );
  updateElementText("agent-modal-email", agent.email);
  updateElementText("agent-modal-phone", agent.phone);
  updateElementText("agent-modal-location", agent.location);

  // Clear rejection reason input
  document.getElementById("agent-rejection-reason").value = "";
}

// HTML Rendering Helper Functions
function renderRecentRegistrationsList() {
  let html = "";

  pendingUsers.slice(0, 5).forEach((user) => {
    html += `
        <li class="activity-item">
          <div class="activity-avatar blue">
            <span>${user.name.charAt(0)}</span>
          </div>
          <div class="activity-info">
            <div class="activity-name">${user.name}</div>
            <div class="activity-email">${user.email}</div>
            <div class="activity-date">Registered on ${
              user.registrationDate
            }</div>
          </div>
          <div class="activity-action">
            <button class="action-button" data-id="${
              user.id
            }" data-action="view-user">
              Review
            </button>
          </div>
        </li>
      `;
  });

  return html;
}

function renderPendingAgentRequestsList() {
  let html = "";

  pendingAgentRequests.forEach((agent) => {
    html += `
        <li class="agent-request-item">
          <div class="agent-avatar">
            <span>${agent.name.charAt(0)}</span>
          </div>
          <div class="agent-info">
            <div class="agent-name">${agent.name}</div>
            <div class="agent-location">${agent.location}</div>
          </div>
          <div class="agent-action">
            <button class="action-button" data-id="${
              agent.id
            }" data-action="view-agent">
              Review
            </button>
          </div>
        </li>
      `;
  });

  return html;
}

function renderEmptyMessage(message) {
  return `
      <li class="empty-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
        <p>${message}</p>
      </li>
    `;
}

function renderEmptyState(message) {
  return `
      <li class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
        <p>${message}</p>
      </li>
    `;
}

function renderUsersList(users, type) {
  let html = "";

  users.forEach((user) => {
    html += `
        <li class="user-item">
          <div class="user-item-header">
            <div class="user-item-profile">
              <div class="user-item-avatar ${
                type === "approved"
                  ? "green"
                  : type === "rejected"
                  ? "red"
                  : "blue"
              }">
                <span>${user.name.charAt(0)}</span>
              </div>
              <div class="user-item-info">
                <div class="user-item-name">${user.name}</div>
                <div class="user-item-date">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  ${
                    type === "approved"
                      ? `Approved on ${user.approvalDate}`
                      : type === "rejected"
                      ? `Rejected on ${user.rejectionDate}`
                      : `Registered on ${user.registrationDate}`
                  }
                </div>
              </div>
            </div>
            <div class="user-item-actions">
              ${
                type === "pending"
                  ? `
                <button class="action-btn green approve-btn" data-id="${user.id}" data-action="approve-user">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  Approve
                </button>
                <button class="action-btn red" data-id="${user.id}" data-action="reject-user">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                  Reject
                </button>
              `
                  : ""
              }
              <button class="action-btn blue" data-id="${
                user.id
              }" data-action="view-user">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
              <button class="action-btn red" data-id="${
                user.id
              }" data-action="delete-user">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                Delete
              </button>
            </div>
          </div>
          <div class="user-item-details">
            <div class="user-item-detail">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div>${user.email}</div>
            </div>
            <div class="user-item-detail">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>${user.phone}</div>
            </div>
            <div class="user-item-detail">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>${user.address}</div>
            </div>
          </div>
          ${
            type === "rejected"
              ? `
            <div class="rejection-alert">
              <div class="rejection-alert-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                <span class="rejection-alert-text">Reason: ${user.rejectionReason}</span>
              </div>
            </div>
          `
              : ""
          }
        </li>
      `;
  });

  return html;
}

function renderAgentRequestsTable(agents) {
  let html = "";

  agents.forEach((agent) => {
    html += `
        <tr>
          <td>
            <div class="agent-table-profile">
              <div class="agent-table-avatar">
                <span>${agent.name.charAt(0)}</span>
              </div>
              <div class="agent-table-info">
                <div class="agent-table-name">${agent.name}</div>
                <div class="agent-table-email">${agent.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="agent-table-contact">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ${agent.phone}
            </div>
          </td>
          <td>
            <div class="agent-table-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${agent.location}
            </div>
          </td>
          <td>
            <div class="agent-table-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              ${agent.requestDate}
            </div>
          </td>
          <td>
            <div class="user-item-actions">
              <button class="action-btn green" data-id="${
                agent.id
              }" data-action="approve-agent">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                Approve
              </button>
              <button class="action-btn red" data-id="${
                agent.id
              }" data-action="reject-agent">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                Reject
              </button>
              <button class="action-btn blue" data-id="${
                agent.id
              }" data-action="view-agent">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
            </div>
          </td>
        </tr>
      `;
  });

  return html;
}

function renderAgentsTable(agents) {
  let html = "";

  agents.forEach((agent) => {
    html += `
        <tr>
          <td>
            <div class="agent-table-profile">
              <div class="agent-table-avatar">
                <span>${agent.name.charAt(0)}</span>
              </div>
              <div class="agent-table-info">
                <div class="agent-table-name">${agent.name}</div>
                <div class="agent-table-email">${agent.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div class="agent-table-contact">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              ${agent.phone}
            </div>
          </td>
          <td>
            <div class="agent-table-location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ${agent.location}
            </div>
          </td>
          <td>
            <div class="agent-table-city">
              ${agent.city || ''}
            </div>
          </td>
          <td>
            <div class="agent-table-balance">
              ৳${(agent.balance || 0).toLocaleString()}
            </div>
          </td>
          <td>
            <span class="agent-table-status ${
              agent.status === "active" ? "active" : "inactive"
            }">
              ${agent.status}
            </span>
          </td>
          <td>
            <div class="user-item-actions">
              <button class="action-btn blue" data-id="${
                agent.id
              }" data-action="edit-agent">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
              <button class="action-btn ${
                agent.status === "active" ? "red" : "green"
              }" data-id="${agent.id}" data-action="toggle-agent-status">
                ${
                  agent.status === "active"
                    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    Deactivate`
                    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                    Activate`
                }
              </button>
              <button class="action-btn red" data-id="${
                agent.id
              }" data-action="delete-agent">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
  });

  return html;
}

function renderSearchResultsGroup(title, items, type) {
  let html = `
      <div class="search-group">
        <h3 class="search-group-title">${title}</h3>
    `;

  items.forEach((item) => {
    html += `
        <div class="search-item" data-type="${type}" data-id="${item.id}">
          <div class="search-item-title">${item.name}</div>
          <div class="search-item-subtitle">${
            type === "user" ? item.email : item.location
          }</div>
        </div>
      `;
  });

  html += `</div>`;

  return html;
}

function addDashboardEventListeners() {
  // User view buttons
  document.querySelectorAll('[data-action="view-user"]').forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const user = pendingUsers.find((u) => u.id === userId);
      if (user) {
        openUserModal(user);
      }
    });
  });

  // Agent view buttons
  document.querySelectorAll('[data-action="view-agent"]').forEach((button) => {
    button.addEventListener("click", function () {
      const agentId = this.getAttribute("data-id");
      const agent = pendingAgentRequests.find((a) => a.id === agentId);
      if (agent) {
        openAgentModal(agent);
      }
    });
  });

  // View all buttons for tab navigation
  document.querySelectorAll(".view-all").forEach((button) => {
    button.addEventListener("click", function () {
      const tab = this.getAttribute("data-tab");
      if (tab) {
        setActiveTab(tab);
      }
    });
  });
}

function addUserManagementEventListeners() {
  console.log("Adding user management event listeners");
  
  // Approve user buttons
  document.querySelectorAll('[data-action="approve-user"]').forEach((button) => {
    button.addEventListener("click", function() {
      const userId = this.getAttribute("data-id");
      console.log("Approve button clicked for user ID:", userId);
      
      const user = pendingUsers.find((u) => u.id === userId);
      if (user) {
        approveUser(userId);
      } else {
        console.error("User not found with ID:", userId);
      }
    });
  });

  // Reject user buttons
  document.querySelectorAll('[data-action="reject-user"]').forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const user = pendingUsers.find((u) => u.id === userId);
      if (user) {
        openUserModal(user);
      }
    });
  });

  // Delete user buttons
  document.querySelectorAll('[data-action="delete-user"]').forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const user = [...pendingUsers, ...approvedUsers, ...rejectedUsers].find(
        (u) => u.id === userId
      );
      if (user) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
          // Remove from whatever list it's in
          if (pendingUsers.some((u) => u.id === userId)) {
            pendingUsers = pendingUsers.filter((u) => u.id !== userId);
          } else if (approvedUsers.some((u) => u.id === userId)) {
            approvedUsers = approvedUsers.filter((u) => u.id !== userId);
          } else if (rejectedUsers.some((u) => u.id === userId)) {
            rejectedUsers = rejectedUsers.filter((u) => u.id !== userId);
          }
          updateUIAfterUserAction();
        }
      }
    });
  });

  // View user buttons
  document.querySelectorAll('[data-action="view-user"]').forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      const user = [...pendingUsers, ...approvedUsers, ...rejectedUsers].find(
        (u) => u.id === userId
      );
      if (user) {
        openUserModal(user);
      }
    });
  });
}

function addAgentManagementEventListeners() {
  // Approve agent buttons
  document
    .querySelectorAll('[data-action="approve-agent"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const agentId = this.getAttribute("data-id");
        const agent = pendingAgentRequests.find((a) => a.id === agentId);
        if (agent) {
          approveAgent(agentId);
          updateUIAfterAgentAction();
        }
      });
    });

  // Reject agent buttons
  document
    .querySelectorAll('[data-action="reject-agent"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const agentId = this.getAttribute("data-id");
        const agent = pendingAgentRequests.find((a) => a.id === agentId);
        if (agent) {
          openAgentModal(agent);
        }
      });
    });

  // View agent buttons
  document.querySelectorAll('[data-action="view-agent"]').forEach((button) => {
    button.addEventListener("click", function () {
      const agentId = this.getAttribute("data-id");
      const agent = pendingAgentRequests.find((a) => a.id === agentId);
      if (agent) {
        openAgentModal(agent);
      }
    });
  });

  // Delete agent buttons
  document
    .querySelectorAll('[data-action="delete-agent"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const agentId = this.getAttribute("data-id");
        const agent = [...agents, ...pendingAgentRequests].find(
          (a) => a.id === agentId
        );
        if (agent) {
          if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
            // Remove from whatever list it's in
            if (pendingAgentRequests.some((a) => a.id === agentId)) {
              pendingAgentRequests = pendingAgentRequests.filter(
                (a) => a.id !== agentId
              );
            } else if (agents.some((a) => a.id === agentId)) {
              agents = agents.filter((a) => a.id !== agentId);
            }
            updateUIAfterAgentAction();
          }
        }
      });
    });

  // Toggle agent status buttons
  document
    .querySelectorAll('[data-action="toggle-agent-status"]')
    .forEach((button) => {
      button.addEventListener("click", function () {
        const agentId = this.getAttribute("data-id");
        const agent = agents.find((a) => a.id === agentId);
        if (agent) {
          agent.status = agent.status === "active" ? "inactive" : "active";
          updateUIAfterAgentAction();
        }
      });
    });
}

function addSearchResultEventListeners(searchResults) {
  const searchItems = searchResults.querySelectorAll(".search-item");
  searchItems.forEach((item) => {
    item.addEventListener("click", function () {
      const type = this.getAttribute("data-type");
      const id = this.getAttribute("data-id");

      if (type === "user") {
        const user = [...pendingUsers, ...approvedUsers, ...rejectedUsers].find(
          (u) => u.id === id
        );
        if (user) {
          openUserModal(user);
        }
      } else if (type === "agent") {
        const agent = [...agents, ...pendingAgentRequests].find(
          (a) => a.id === id
        );
        if (agent) {
          if (pendingAgentRequests.some((a) => a.id === id)) {
            openAgentModal(agent);
          }
        }
      }

      // Clear search after selecting an item
      const searchInput = document.getElementById("search-input");
      clearSearch(searchInput);
    });
  });
}

//----------

// Add this new function to fetch agent details
function getAgents() {
  fetch("http://localhost:3000/data/allagentdetails", {
    method: "GET"
  })
  .then(async function(r1) {
    let fullData = await r1.json();
    
    if(r1.ok) {
      // Process the data from the API
      const fetchedAgents = fullData.data.map((agent) => {
        return {
          id: agent._id,
          name: agent.name || "",
          email: agent.email || "",
          phone: agent.mobile_number || "",
          location: agent.district || "",
          status: agent.status || "active",
          // Include any additional fields from the API response
          balance: agent.balance || 0,
          city: agent.city || "",
          dob: agent.dob || ""
        };
      });
      
      console.log("Processed agents:", fetchedAgents);  
      agents = [...fetchedAgents]; // Replace mock agents with fetched data
      
      // Update UI after data is loaded
      renderAgentManagement();
      renderDashboard();
      updateCounters();
    } else {
      alert(fullData.message || "Failed to load agent details");
      console.error("Error:", fullData.message);  
    }
  })
  .catch(function(err) {
    console.error("Network error:", err);
    // Ensure agents is initialized even on failure
    agents = [...mockAgents]; // Fallback to mock data
  });
}

// Update the initial data loading section to include getAgents()
// Find where these calls are made (around line 400) and add getAgents():
getPending();
getApproved();
getRejected();
getAgents(); // Add this line

//-------


let agentNum = document.getElementById("agent-number") ;
let amount = document.getElementById("transfer-amount") ;
let transferBtn = document.getElementById("confirm-transfer") ;
let pass = document.getElementById("transaction-pin") ;
let allDetails = {} ;

transferBtn.addEventListener("click" , function(){

  if(pass.value === "Ali3333" || pass.value === "Tanvir1111")
  {
    allDetails.mobile = agentNum.value ;
    allDetails.amount = amount.value ;

    fetch("http://localhost:3000/admin/insertmoney", {
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
  else
  {
    alert("Enter correct password !") ;
  }

})




// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded - initializing application");
  
  // First check login state
  checkLoginState();

  // Then initialize the app components
  initializeApp();
  setupEventListeners();
  renderContent();
});