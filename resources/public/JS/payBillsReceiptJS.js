// Receipt JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Sample receipt data
  const receipts = [
    {
      id: "REC001",
      provider: "DESCO (Postpaid)",
      providerLogo: "/images/providers/desco.png",
      accountNumber: "DS123456789",
      amount: 3500,
      date: "2024-12-10",
      txnId: "4589623157",
      type: "receipt",
    },
    {
      id: "REC002",
      provider: "Carnival Internet",
      providerLogo: "/images/providers/carnival.png",
      accountNumber: "CN987654",
      amount: 1200,
      date: "2024-12-15",
      txnId: "4589624589",
      type: "receipt",
    },
    {
      id: "REC003",
      provider: "Dhaka WASA",
      providerLogo: "/images/providers/wasa.png",
      accountNumber: "WA456789",
      amount: 3800,
      date: "2024-12-20",
      txnId: "4589626789",
      type: "receipt",
    },
  ];

  // Sample token data
  const tokens = [
    {
      id: "TOK001",
      provider: "Palli Bidyut (Prepaid)",
      providerLogo: "/images/providers/palli-bidyut.png",
      accountNumber: "PB789456123",
      amount: 500,
      date: "2024-12-18",
      tokenCode: "2345-6789-0123-4567",
      units: "50 kWh",
      type: "token",
    },
    {
      id: "TOK002",
      provider: "NESCO (Prepaid)",
      providerLogo: "/images/providers/nesco.png",
      accountNumber: "NS654321789",
      amount: 750,
      date: "2024-12-22",
      tokenCode: "9876-5432-1098-7654",
      units: "75 kWh",
      type: "token",
    },
    {
      id: "TOK003",
      provider: "DPDC (Prepaid)",
      providerLogo: "/images/providers/dpdc.png",
      accountNumber: "DP147852369",
      amount: 1000,
      date: "2024-12-25",
      tokenCode: "1357-2468-9876-5432",
      units: "100 kWh",
      type: "token",
    },
  ];

  // Elements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const receiptsContent = document.getElementById("receipts-content");
  const tokensContent = document.getElementById("tokens-content");
  const searchInput = document.getElementById("receipt-search");
  const clearSearchBtn = document.getElementById("clearReceiptSearch");
  const dateFilter = document.getElementById("date-filter");
  const noResults = document.getElementById("no-results");
  const loadMoreBtn = document.getElementById("load-more-btn");

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

  // Current active tab
  let activeTab = "receipts";

  // Format number with commas
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

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update tab buttons
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      this.classList.add("active");

      // Update content visibility
      const tabId = this.dataset.tab;
      activeTab = tabId;

      if (tabId === "receipts") {
        receiptsContent.classList.add("active");
        tokensContent.classList.remove("active");
      } else {
        tokensContent.classList.add("active");
        receiptsContent.classList.remove("active");
      }

      // Apply filters
      applyFilters();
    });
  });

  // Render receipt item
  function renderReceipt(receipt) {
    return `
            <div class="receipt-item">
                <div class="receipt-logo">
                    <img src="${
                      receipt.providerLogo
                    }" alt="${receipt.provider}">
                </div>
                <div class="receipt-details">
                    <div class="receipt-title">${receipt.provider}</div>
                    <div class="receipt-info">
                        <span>${receipt.accountNumber}</span>
                        <span class="separator">|</span>
                        <span>${formatDate(receipt.date)}</span>
                    </div>
                    <div class="receipt-txn">TXN#: ${receipt.txnId}</div>
                </div>
                <div class="receipt-actions">
                    <div class="receipt-amount">৳${formatNumber(
                      receipt.amount
                    )}</div>
                    <div class="action-buttons">
                        <button class="view-btn" data-receipt-id="${
                          receipt.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="download-btn" data-receipt-id="${
                          receipt.id
                        }">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="share-btn" data-receipt-id="${
                          receipt.id
                        }">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  // Render token item
  function renderToken(token) {
    return `
            <div class="token-item">
                <div class="token-logo">
                    <img src="${token.providerLogo}" alt="${token.provider}">
                </div>
                <div class="token-details">
                    <div class="token-title">${token.provider}</div>
                    <div class="token-info">
                        <span>মিটার নং: ${token.accountNumber}</span>
                        <span class="separator">|</span>
                        <span>${formatDate(token.date)}</span>
                    </div>
                    <div class="token-code-container">
                        <div class="token-code">${token.tokenCode}</div>
                        <button class="copy-token-btn" data-token="${
                          token.tokenCode
                        }">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="token-units">ইউনিট: ${token.units}</div>
                </div>
                <div class="token-actions">
                    <div class="token-amount">৳${formatNumber(
                      token.amount
                    )}</div>
                    <div class="action-buttons">
                        <button class="view-token-btn" data-token-id="${
                          token.id
                        }">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="share-token-btn" data-token-id="${
                          token.id
                        }">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
  }

  // Filter items based on search and date
  function filterItems() {
    const searchValue = searchInput.value.toLowerCase();
    const dateValue = dateFilter.value;

    let filteredItems = activeTab === "receipts" ? receipts : tokens;

    // Search filter
    if (searchValue) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.provider.toLowerCase().includes(searchValue) ||
          item.accountNumber.toLowerCase().includes(searchValue) ||
          (item.txnId && item.txnId.toLowerCase().includes(searchValue))
      );
    }

    // Date filter
    if (dateValue !== "all") {
      const currentDate = new Date();
      let startDate;

      switch (dateValue) {
        case "today":
          startDate = new Date(currentDate);
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - 7);
          break;
        case "month":
          startDate = new Date(currentDate);
          startDate.setDate(1);
          break;
      }

      if (startDate) {
        filteredItems = filteredItems.filter(
          (item) => new Date(item.date) >= startDate
        );
      }
    }

    return filteredItems;
  }

  // Render items
  function renderItems(items) {
    if (items.length === 0) {
      noResults.style.display = "block";
      if (activeTab === "receipts") {
        receiptsContent.innerHTML = "";
      } else {
        tokensContent.innerHTML = "";
      }
      return;
    }

    noResults.style.display = "none";

    if (activeTab === "receipts") {
      receiptsContent.innerHTML = items.map(renderReceipt).join("");
    } else {
      tokensContent.innerHTML = items.map(renderToken).join("");
    }

    // Add event listeners
    addEventListeners();
  }

  // Apply filters
  function applyFilters() {
    const filteredItems = filterItems();
    renderItems(filteredItems);
  }

  // Show receipt details modal
  function showReceiptDetails(receiptId) {
    const receipt = receipts.find((r) => r.id === receiptId);
    if (!receipt) return;

    const modal = document.createElement("div");
    modal.className = "receipt-modal";
    modal.innerHTML = `
            <div class="receipt-modal-content">
                <div class="receipt-modal-header">
                    <h3>রিসিট বিবরণী</h3>
                    <button class="close-receipt-modal">&times;</button>
                </div>
                <div class="receipt-modal-body">
                    <div class="receipt-modal-logo">
                        <img src="${receipt.providerLogo}" alt="${
      receipt.provider
    }">
                    </div>
                    <h4>${receipt.provider}</h4>
                    <div class="detail-item">
                        <span class="detail-label">অ্যাকাউন্ট নম্বর</span>
                        <span class="detail-value">${
                          receipt.accountNumber
                        }</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">তারিখ</span>
                        <span class="detail-value">${formatDate(
                          receipt.date
                        )}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ট্রানজেকশন আইডি</span>
                        <span class="detail-value">${receipt.txnId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">পরিমাণ</span>
                        <span class="detail-value amount">৳${formatNumber(
                          receipt.amount
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
                        <i class="fas fa-download"></i> ডাউনলোড করুন
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal handlers
    modal
      .querySelector(".close-receipt-modal")
      .addEventListener("click", () => {
        document.body.removeChild(modal);
      });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Download handler
    modal
      .querySelector(".download-receipt-btn")
      .addEventListener("click", () => {
        downloadReceipt(receipt);
      });
  }

  // Show token details modal
  function showTokenDetails(tokenId) {
    const token = tokens.find((t) => t.id === tokenId);
    if (!token) return;

    const modal = document.createElement("div");
    modal.className = "receipt-modal";
    modal.innerHTML = `
            <div class="receipt-modal-content">
                <div class="receipt-modal-header">
                    <h3>টোকেন বিবরণী</h3>
                    <button class="close-receipt-modal">&times;</button>
                </div>
                <div class="receipt-modal-body">
                    <div class="receipt-modal-logo">
                        <img src="${token.providerLogo}" alt="${
      token.provider
    }">
                    </div>
                    <h4>${token.provider}</h4>
                    <div class="detail-item">
                        <span class="detail-label">মিটার নম্বর</span>
                        <span class="detail-value">${token.accountNumber}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">তারিখ</span>
                        <span class="detail-value">${formatDate(
                          token.date
                        )}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">টোকেন কোড</span>
                        <span class="detail-value">${token.tokenCode}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">ইউনিট</span>
                        <span class="detail-value">${token.units}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">পরিমাণ</span>
                        <span class="detail-value amount">৳${formatNumber(
                          token.amount
                        )}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="copy-token-modal-btn">
                        <i class="fas fa-copy"></i> টোকেন কপি করুন
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Close modal handlers
    modal
      .querySelector(".close-receipt-modal")
      .addEventListener("click", () => {
        document.body.removeChild(modal);
      });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Copy token handler
    modal
      .querySelector(".copy-token-modal-btn")
      .addEventListener("click", () => {
        copyToClipboard(token.tokenCode);
      });
  }

  // Download receipt
  function downloadReceipt(receipt) {
    // In a real app, this would generate and download a PDF
    alert(`রিসিট ডাউনলোড হচ্ছে: ${receipt.txnId}`);
  }

  // Copy to clipboard
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("টোকেন কোড কপি করা হয়েছে");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Share functionality
  function shareItem(item) {
    if (navigator.share) {
      navigator
        .share({
          title: `${item.provider} - ${
            item.type === "receipt" ? "রিসিট" : "টোকেন"
          }`,
          text: `${item.provider}\n${
            item.type === "receipt"
              ? "TXN#: " + item.txnId
              : "টোকেন: " + item.tokenCode
          }\nমূল্য: ৳${formatNumber(item.amount)}`,
          url: window.location.href,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.log("Error sharing:", error);
        });
    } else {
      alert("শেয়ার করার জন্য দুঃখিত, আপনার ডিভাইস এই ফিচার সাপোর্ট করে না।");
    }
  }

  // Add event listeners
  function addEventListeners() {
    // Receipt action buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        showReceiptDetails(receiptId);
      });
    });

    document.querySelectorAll(".download-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        const receipt = receipts.find((r) => r.id === receiptId);
        downloadReceipt(receipt);
      });
    });

    document.querySelectorAll(".share-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const receiptId = this.dataset.receiptId;
        const receipt = receipts.find((r) => r.id === receiptId);
        shareItem(receipt);
      });
    });

    // Token action buttons
    document.querySelectorAll(".view-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenId = this.dataset.tokenId;
        showTokenDetails(tokenId);
      });
    });

    document.querySelectorAll(".share-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenId = this.dataset.tokenId;
        const token = tokens.find((t) => t.id === tokenId);
        shareItem(token);
      });
    });

    document.querySelectorAll(".copy-token-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const tokenCode = this.dataset.token;
        copyToClipboard(tokenCode);
      });
    });
  }

  // Event listeners
  searchInput.addEventListener("input", applyFilters);
  dateFilter.addEventListener("change", applyFilters);

  clearSearchBtn.addEventListener("click", function () {
    searchInput.value = "";
    applyFilters();
  });

  loadMoreBtn.addEventListener("click", function () {
    // In a real app, this would load more data
    alert("আরও রিসিট/টোকেন লোড হচ্ছে...");
  });

  // Initialize
  function init() {
    applyFilters();
  }

  // Start the app
  init();
});
