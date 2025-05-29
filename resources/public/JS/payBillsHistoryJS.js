// Bill History JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sample bill data (in real app, this would come from database/API)
  const billHistory = [
    {
      id: "BIL20241210001",
      category: "electricity",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3500,
      date: "2024-12-10",
      txnId: "4589623157",
      status: "paid",
    },
    {
      id: "BIL20241215002",
      category: "internet",
      provider: "Carnival Internet",
      providerLogo: "/images/providers/carnival.png",
      accountNumber: "CN987654",
      amount: 1200,
      date: "2024-12-15",
      txnId: "4589624589",
      status: "paid",
    },
    {
      id: "BIL20241220003",
      category: "water",
      provider: "Dhaka WASA",
      providerLogo: "/images/providers/wasa.png",
      accountNumber: "WA456789",
      amount: 3800,
      date: "2024-12-20",
      txnId: "4589626789",
      status: "paid",
    },
    {
      id: "BIL20241105004",
      category: "credit-card",
      provider: "BRAC Bank Credit Card",
      providerLogo: "/images/providers/brac-bank.png",
      accountNumber: "****4589",
      amount: 8000,
      date: "2024-11-05",
      txnId: "4589628901",
      status: "paid",
    },
    {
      id: "BIL20241112005",
      category: "gas",
      provider: "Titas Gas",
      providerLogo: "/images/providers/titas.png",
      accountNumber: "TG123456",
      amount: 1500,
      date: "2024-11-12",
      txnId: "4589629012",
      status: "paid",
    },
    {
      id: "BIL20241008006",
      category: "electricity",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3200,
      date: "2024-10-08",
      txnId: "4589621023",
      status: "paid",
    },
    {
      id: "BIL20241015007",
      category: "telephone",
      provider: "BTCL",
      providerLogo: "/images/providers/btcl.png",
      accountNumber: "BT789456",
      amount: 950,
      date: "2024-10-15",
      txnId: "4589622034",
      status: "paid",
    },
  ];

  // Elements
  const monthDropdownBtn = document.getElementById("month-dropdown-btn");
  const yearDropdownBtn = document.getElementById("year-dropdown-btn");
  const categoryDropdownBtn = document.getElementById("category-dropdown-btn");
  const monthDropdownList = document.getElementById("month-dropdown-list");
  const yearDropdownList = document.getElementById("year-dropdown-list");
  const categoryDropdownList = document.getElementById(
    "category-dropdown-list"
  );
  const totalAmount = document.getElementById("total-amount");
  const totalCount = document.getElementById("total-count");
  const historyList = document.getElementById("history-list");
  const emptyState = document.getElementById("empty-state");
  const noResults = document.getElementById("no-results");
  const loadMoreBtn = document.getElementById("load-more-btn");
  const generatePdfBtn = document.getElementById("generate-pdf");

  // Selected filter values
  let selectedMonth = null;
  let selectedYear = null;
  let selectedCategory = "all";

  // Bengali month names
  const bengaliMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  // Category names in Bengali
  const categoryNames = {
    electricity: "বিদ্যুৎ",
    gas: "গ্যাস",
    water: "পানি",
    internet: "ইন্টারনেট",
    telephone: "টেলিফোন",
    tv: "টিভি",
    "credit-card": "ক্রেডিট কার্ড",
    government: "সরকারি ফি",
    insurance: "ইন্স্যুরেন্স",
    traffic: "ট্র্যাফিক",
  };

  // Format number with commas (Bengali style)
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Format date to Bengali
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = bengaliMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Handle dropdown toggle
  function toggleDropdown(btn, list) {
    // Close all other dropdowns
    document.querySelectorAll(".filter-dropdown-btn").forEach((dropBtn) => {
      if (dropBtn !== btn) {
        dropBtn.classList.remove("active");
      }
    });
    document.querySelectorAll(".filter-dropdown-list").forEach((dropList) => {
      if (dropList !== list) {
        dropList.classList.remove("show");
      }
    });

    // Toggle current dropdown
    btn.classList.toggle("active");
    list.classList.toggle("show");
  }

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-dropdown-container")) {
      document.querySelectorAll(".filter-dropdown-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelectorAll(".filter-dropdown-list").forEach((list) => {
        list.classList.remove("show");
      });
    }
  });

  // Handle dropdown selection
  function handleDropdownSelection(container, value, text) {
    const btn = container.querySelector(".filter-dropdown-btn");
    const items = container.querySelectorAll(".filter-dropdown-item");

    // Update button text
    btn.querySelector("span").textContent = text;
    btn.classList.add("selected");

    // Update selected state
    items.forEach((item) => {
      item.classList.remove("selected");
      if (item.dataset.value === value) {
        item.classList.add("selected");
      }
    });

    // Close dropdown
    btn.classList.remove("active");
    container.querySelector(".filter-dropdown-list").classList.remove("show");
  }

  // Setup dropdown event listeners
  function setupDropdowns() {
    // Month dropdown
    monthDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(monthDropdownBtn, monthDropdownList);
    });

    monthDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedMonth = item.dataset.value;
          handleDropdownSelection(
            monthDropdownBtn.parentElement,
            selectedMonth,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });

    // Year dropdown
    yearDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(yearDropdownBtn, yearDropdownList);
    });

    yearDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedYear = item.dataset.value;
          handleDropdownSelection(
            yearDropdownBtn.parentElement,
            selectedYear,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });

    // Category dropdown
    categoryDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(categoryDropdownBtn, categoryDropdownList);
    });

    categoryDropdownList
      .querySelectorAll(".filter-dropdown-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          selectedCategory = item.dataset.value;
          handleDropdownSelection(
            categoryDropdownBtn.parentElement,
            selectedCategory,
            item.textContent
          );
          checkAndApplyFilters();
        });
      });
  }

  // Group bills by month and year
  function groupBillsByMonth(bills) {
    return bills.reduce((groups, bill) => {
      const date = new Date(bill.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth()}`;

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(bill);
      return groups;
    }, {});
  }

  // Check if required filters are selected
  function checkFiltersSelected() {
    return selectedMonth !== null && selectedYear !== null;
  }

  // Filter bills based on selected criteria
  function filterBills() {
    if (!checkFiltersSelected()) {
      return [];
    }

    let filteredBills = billHistory;

    // Filter by year
    filteredBills = filteredBills.filter((bill) => {
      const billYear = new Date(bill.date).getFullYear().toString();
      return billYear === selectedYear;
    });

    // Filter by month
    filteredBills = filteredBills.filter((bill) => {
      const billMonth = new Date(bill.date).getMonth().toString();
      return billMonth === selectedMonth;
    });

    // Filter by category
    if (selectedCategory !== "all") {
      filteredBills = filteredBills.filter(
        (bill) => bill.category === selectedCategory
      );
    }

    return filteredBills;
  }

  // Update summary cards
  function updateSummary(bills) {
    const total = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const count = bills.length;

    totalAmount.textContent = `৳${formatNumber(total)}`;
    totalCount.textContent = `${count}টি`;
  }

  // Render bill item
  function renderBillItem(bill) {
    return `
            <div class="bill-item" data-category="${
              bill.category
            }" data-bill-id="${bill.id}">
                <div class="bill-logo">
                    <img src="${bill.providerLogo}" alt="${bill.provider}">
                </div>
                <div class="bill-details">
                    <div class="bill-title">${bill.provider}</div>
                    <div class="bill-info">
                        <span>${
                          bill.category === "credit-card"
                            ? "Card"
                            : bill.category === "internet"
                            ? "User ID"
                            : bill.category === "electricity" ||
                              bill.category === "gas"
                            ? "মিটার নং"
                            : "Account"
                        }: ${bill.accountNumber}</span>
                        <span class="separator">|</span>
                        <span>${formatDate(bill.date)}</span>
                    </div>
                    <div class="bill-txn">TXN#: ${bill.txnId}</div>
                </div>
                <div class="bill-amount-section">
                    <div class="bill-amount">৳${formatNumber(bill.amount)}</div>
                    <div class="bill-status ${bill.status}">
                        <i class="fas fa-check-circle"></i>
                        <span>পরিশোধিত</span>
                    </div>
                </div>
            </div>
        `;
  }

  // Render grouped bills
  function renderBills(bills) {
    if (bills.length === 0) {
      historyList.style.display = "none";
      noResults.style.display = "block";
      document.querySelector(".load-more-container").classList.remove("show");
      generatePdfBtn.style.display = "none";
      return;
    }

    historyList.style.display = "block";
    noResults.style.display = "none";
    document.querySelector(".load-more-container").classList.add("show");
    generatePdfBtn.style.display = "flex";

    const groupedBills = groupBillsByMonth(bills);
    historyList.innerHTML = "";

    // Sort groups by date (latest first)
    const sortedGroups = Object.keys(groupedBills).sort((a, b) => {
      const [yearA, monthA] = a.split("-").map(Number);
      const [yearB, monthB] = b.split("-").map(Number);
      return yearB - yearA || monthB - monthA;
    });

    sortedGroups.forEach((monthYear) => {
      const [year, month] = monthYear.split("-");
      const monthBills = groupedBills[monthYear];

      // Calculate month summary
      const monthTotal = monthBills.reduce((sum, bill) => sum + bill.amount, 0);
      const monthCount = monthBills.length;

      // Create month group
      const monthGroup = document.createElement("div");
      monthGroup.className = "month-group";
      monthGroup.innerHTML = `
                <div class="month-header">
                    <h4>${bengaliMonths[parseInt(month)]} ${year}</h4>
                    <div class="month-summary">
                        <span>মোট: ৳${formatNumber(monthTotal)}</span>
                        <span class="separator">|</span>
                        <span>${monthCount}টি বিল</span>
                    </div>
                </div>
            `;

      // Add bills to month group
      monthBills.forEach((bill) => {
        monthGroup.innerHTML += renderBillItem(bill);
      });

      historyList.appendChild(monthGroup);
    });
  }

  // Initialize filters
  function initializeFilters() {
    setupDropdowns();

    // Hide summary cards initially
    document.querySelector(".summary-cards").style.display = "none";

    // Show empty state
    emptyState.style.display = "block";
    historyList.style.display = "none";
    noResults.style.display = "none";
  }

  // Check and apply filters
  function checkAndApplyFilters() {
    if (checkFiltersSelected()) {
      emptyState.style.display = "none";
      historyList.style.display = "block";
      document.querySelector(".summary-cards").style.display = "grid";
      applyFilters();
    } else {
      emptyState.style.display = "block";
      historyList.style.display = "none";
      document.querySelector(".summary-cards").style.display = "none";
    }
  }

  // Apply filters and render
  function applyFilters() {
    const filteredBills = filterBills();
    updateSummary(filteredBills);
    renderBills(filteredBills);
  }

  // Handle bill item click for detailed view
  function handleBillClick(event) {
    const billItem = event.target.closest(".bill-item");
    if (!billItem) return;

    const billId = billItem.dataset.billId;
    const bill = billHistory.find((b) => b.id === billId);

    if (bill) {
      showBillDetails(bill);
    }
  }

  // Show bill details modal
  function showBillDetails(bill) {
    const modal = document.createElement("div");
    modal.className = "bill-details-modal";
    modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>বিল বিবরণী</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="bill-detail-logo">
                        <img src="${bill.providerLogo}" alt="${bill.provider}">
                    </div>
                    <h4>${bill.provider}</h4>
                    <div class="detail-item">
                        <span class="detail-label">ক্যাটাগরি</span>
                        <span class="detail-value">${
                          categoryNames[bill.category]
                        }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">অ্যাকাউন্ট নম্বর</span>
                        <span class="detail-value">${bill.accountNumber}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">তারিখ</span>
                        <span class="detail-value">${formatDate(
                          bill.date
                        )}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ট্রানজেকশন আইডি</span>
                        <span class="detail-value">${bill.txnId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">পরিমাণ</span>
                        <span class="detail-value amount">৳${formatNumber(
                          bill.amount
                        )}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">স্ট্যাটাস</span>
                        <span class="detail-value">
                            <span class="status-badge paid">পরিশোধিত</span>
                        </span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="download-receipt-btn">
                        <i class="fas fa-download"></i> রিসিট ডাউনলোড
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector(".close-modal").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal
      .querySelector(".download-receipt-btn")
      .addEventListener("click", () => {
        downloadReceipt(bill);
      });

    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  // Download receipt
  function downloadReceipt(bill) {
    // In a real app, this would generate a PDF
    alert("রিসিট ডাউনলোড হচ্ছে...");
  }

  // Generate PDF report
  function generatePDF() {
    const filteredBills = filterBills();

    // In a real app, this would use a PDF library like jsPDF
    alert(`PDF রিপোর্ট তৈরি হচ্ছে... (${filteredBills.length}টি বিল)`);
  }

  // Load more functionality
  function loadMore() {
    // In a real app, this would load more data from the server
    alert("আরও বিল লোড হচ্ছে...");
  }

  // Initialize
  function init() {
    initializeFilters();

    // Event listeners
    historyList.addEventListener("click", handleBillClick);
    loadMoreBtn.addEventListener("click", loadMore);
    generatePdfBtn.addEventListener("click", generatePDF);
  }

  // Start the app
  init();
});
