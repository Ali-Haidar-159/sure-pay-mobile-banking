// requestMoneyJS.js

let allDetails = {} ;

document.addEventListener("DOMContentLoaded", function () {
  // Main Elements
  const mainContainer = document.querySelector(".receipt-fee-container");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const contactsList = document.getElementById("contactsList");
  const contactItems = document.querySelectorAll(".contact-item");

  // Initialize the UI state
  let selectedContacts = [];
  let currentPage = "main"; // 'main', 'amount', 'pin', 'success', 'group', 'groupCreate', 'groupName'
  let currentRecipient = null;
  let currentAmount = 0;
  let currentGroup = null;

  // Utility Functions
  function createPopup(title, templateId) {
    // Remove any existing popup
    removePopup();

    // Get the template content
    const template = document.getElementById(templateId);
    if (!template) {
      console.error("Template not found:", templateId);
      return;
    }

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create container
    const container = document.createElement("div");
    container.className = "popup-container";

    // Create header with gradient
    const header = document.createElement("div");
    header.className = "form-header-gradient";

    const headerContent = document.createElement("div");
    headerContent.className = "header-content";

    const backButton = document.createElement("div");
    backButton.className = "back-button";
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backButton.addEventListener("click", handleBackButton);

    const headerTitle = document.createElement("div");
    headerTitle.className = "header-title";
    headerTitle.innerHTML = `<h3>${title}</h3>`;

    const logoContainer = document.createElement("div");
    logoContainer.className = "bkash-logo";
    logoContainer.innerHTML =
      '<img src="/public/images/bkashlogo.png" alt="বিকাশ লোগো" style="height: 40px;">';

    headerContent.appendChild(backButton);
    headerContent.appendChild(headerTitle);
    headerContent.appendChild(logoContainer);
    header.appendChild(headerContent);

    // Add content from template
    const contentContainer = document.createElement("div");
    contentContainer.className = "receipt-fee-form";
    contentContainer.innerHTML = template.innerHTML;

    container.appendChild(header);
    container.appendChild(contentContainer);
    overlay.appendChild(container);

    // Add animation classes after a small delay to trigger transitions
    setTimeout(() => {
      overlay.classList.add("show");
      container.classList.add("show");

      // Apply blur to main container
      const mainContainer = document.querySelector(".receipt-fee-container");
      if (mainContainer) {
        mainContainer.classList.add("blur");
      }
    }, 10);

    // Close popup when clicking outside the container
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        removePopup();
        resetMainPage();
      }
    });

    return { overlay, container, contentContainer };
  }

  function removePopup() {
    const overlay = document.querySelector(".popup-overlay");
    if (overlay) {
      const container = overlay.querySelector(".popup-container");
      overlay.classList.remove("show");
      if (container) {
        container.classList.remove("show");
      }

      // Remove after animation completes
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }

    // Reset main container if it was blurred
    const mainContainer = document.querySelector(".receipt-fee-container");
    if (mainContainer) {
      mainContainer.classList.remove("blur");
    }
  }

  function validateBangladeshiNumber(number) {
    // Validate Bangladeshi phone numbers
    const cleanNumber = number.replace(/\s+/g, "");
    const regex = /^01[3-9]\d{8}$/;
    return regex.test(cleanNumber);
  }

  // PART 1: CONTACT SELECTION AND SEARCH FUNCTIONALITY

  // Handle contact item click
  contactItems.forEach((item) => {
    item.addEventListener("click", function () {
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      allDetails.name = name ;
      allDetails.number = number ;
      showAmountPopup(name, number);
    });
  });

  // Handle search functionality
  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") return;

    // Check if it's a valid phone number
    if (validateBangladeshiNumber(searchTerm)) {
      showAmountPopup("Unknown", searchTerm);
      return;
    }

    // Search through contacts
    let found = false;
    contactItems.forEach((item) => {
      const name = item
        .querySelector(".contact-name")
        .textContent.toLowerCase();
      const number = item.querySelector(".contact-number").textContent;

      if (name.includes(searchTerm) || number.includes(searchTerm)) {
        found = true;
            allDetails.name = item.querySelector(".contact-name").textContent ;
            allDetails.number = number ;
        showAmountPopup(
          item.querySelector(".contact-name").textContent,
          number
        );
        return;
      }
    });

    if (!found) {
      alert("কোন কন্টাক্ট পাওয়া যায়নি। আবার চেষ্টা করুন।");
    }

  });

  // PART 2: AMOUNT INPUT AND TRANSACTION FLOW

  function showAmountPopup(name, number) {

      //     allDetails.name = name ;
      // allDetails.number = number ; 
    currentRecipient = { name, number };
    allDetails = currentRecipient ;
    currentPage = "amount";

    const popup = createPopup("রিকোয়েস্ট মানি", "amountPopupTemplate");

    // Update recipient info
    const recipientName =
      popup.contentContainer.querySelector("#recipientName");
    const recipientNumber =
      popup.contentContainer.querySelector("#recipientNumber");
    const recipientInitial =
      popup.contentContainer.querySelector("#recipientInitial");
    const recipientAvatar =
      popup.contentContainer.querySelector("#recipientAvatar");

    recipientName.textContent = name;
    recipientNumber.textContent = number;
    recipientInitial.textContent = name.charAt(0);

    // Set random color for avatar
    const colors = [
      "blue",
      "yellow",
      "green",
      "purple",
      "pink",
      "light-green",
      "coral",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    recipientAvatar.className = `contact-avatar ${randomColor}`;

    // Add event listener to proceed button
    const proceedBtn = popup.contentContainer.querySelector("#proceedBtn");
    const amountInput = popup.contentContainer.querySelector("#amountInput");
    const noteInput = popup.contentContainer.querySelector("#noteInput");
    const charCount = popup.contentContainer.querySelector("#charCount");

    // Character count for note
    noteInput.addEventListener("input", function () {
      charCount.textContent = this.value.length;
    });

    // Amount input validation
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters except decimal point
      this.value = this.value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = this.value.split(".");
      if (parts.length > 2) {
        this.value = parts[0] + "." + parts.slice(1).join("");
      }

      // Limit to two decimal places
      if (parts.length > 1 && parts[1].length > 2) {
        this.value = parts[0] + "." + parts[1].substring(0, 2);
      }
    });

    proceedBtn.addEventListener("click", function () {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 50000) {
        alert("রিকোয়েস্ট লিমিট ৳50,000.00 এর বেশি হতে পারবে না।");
        return;
      }

      currentAmount = amount;

      allDetails.amount = amount ;

      removePopup();
      showPinPopup();
    });
  }

  function showPinPopup() {
    currentPage = "pin";

    const popup = createPopup("পিন এন্ট্রি", "pinPopupTemplate");

    // Update amount display
    const pinAmount = popup.contentContainer.querySelector("#pinAmount");
    pinAmount.textContent = `৳${currentAmount.toFixed(2)}`;

    // Pin input behavior
    const pinInputs = popup.contentContainer.querySelectorAll(".pin-input");
    const confirmPinBtn =
      popup.contentContainer.querySelector("#confirmPinBtn");

    let currentPinIndex = 0;

    // Focus first pin input
    pinInputs[0].focus();

    // Regular keyboard input
    pinInputs.forEach((input, index) => {
      input.addEventListener("input", function () {
        // Only allow numbers
        this.value = this.value.replace(/[^0-9]/g, "");

        if (this.value !== "") {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
            currentPinIndex = index + 1;
          }
        }
      });

      input.addEventListener("keydown", function (e) {
        // Handle backspace
        if (e.key === "Backspace" && this.value === "" && index > 0) {
          pinInputs[index - 1].focus();
          pinInputs[index - 1].value = "";
          currentPinIndex = index - 1;
        }
      });
    });

    confirmPinBtn.addEventListener("click", function () {
      // Check if all pin inputs have values
      let allFilled = true;
      let pin = "";

      pinInputs.forEach((input) => {
        if (input.value === "") {
          allFilled = false;
        }
        pin += input.value;
      });

      if (!allFilled) {
        alert("দয়া করে সম্পূর্ণ পিন প্রবেশ করুন।");
        return;
      }

      // Validate pin (for demo, any 5-digit pin is valid)
      if (pin.length === 5) {
        removePopup();
        showSuccessPopup();
      } else {
        alert("অবৈধ পিন। আবার চেষ্টা করুন।");
        pinInputs.forEach((input) => {
          input.value = "";
        });
        pinInputs[0].focus();
        currentPinIndex = 0;
      }

      forBackend() ;

    });
  }

  function showSuccessPopup() {
    currentPage = "success";

    if (currentGroup) {
      // Group request success
      const popup = createPopup("রিকোয়েস্ট সফল", "groupSuccessPopupTemplate");

      // Update success message
      const groupSuccessMessage = popup.contentContainer.querySelector(
        "#groupSuccessMessage"
      );
      const groupSuccessSubMessage = popup.contentContainer.querySelector(
        "#groupSuccessSubMessage"
      );

      groupSuccessMessage.textContent = `আপনি "${currentGroup.name}" গ্রুপের ${
        currentGroup.contacts.length
      } জন সদস্যকে মোট ৳${currentAmount.toFixed(2)} টাকা রিকোয়েস্ট করেছেন।`;
      groupSuccessSubMessage.textContent = `প্রত্যেক সদস্যকে ৳${(
        currentAmount / currentGroup.contacts.length
      ).toFixed(2)} টাকা রিকোয়েস্ট করা হয়েছে।`;

      const doneBtn = popup.contentContainer.querySelector("#groupDoneBtn");
      doneBtn.addEventListener("click", function () {
        removePopup();
        resetMainPage();
      });
    } else {
      // Individual request success
      const popup = createPopup("রিকোয়েস্ট সফল", "successPopupTemplate");

      // Update success message
      const successMessage =
        popup.contentContainer.querySelector("#successMessage");
      const successRequestId =
        popup.contentContainer.querySelector("#successRequestId");

      successMessage.textContent = `আপনি ${currentRecipient.name} (${
        currentRecipient.number
      }) কে ৳${currentAmount.toFixed(2)} টাকা রিকোয়েস্ট করেছেন।`;
      successRequestId.textContent = `রিকোয়েস্ট আইডি: ${generateRandomRequestId()}`;

      const doneBtn = popup.contentContainer.querySelector("#doneBtn");
      doneBtn.addEventListener("click", function () {
        removePopup();
        resetMainPage();
      });
    }
  }

  // Generate a random request ID for success page
  function generateRandomRequestId() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  // PART 3: GROUP FUNCTIONALITY

  function setupGroupButtons() {
    const groupButton = document.querySelector(".option-card:nth-child(2)");
    if (groupButton) {
      groupButton.addEventListener("click", showGroupPage);
    }

    // Request button (first option card)
    const requestButton = document.querySelector(".option-card:nth-child(1)");
    if (requestButton) {
      requestButton.addEventListener("click", showRequestsPage);
    }
  }

  function showGroupPage() {
    currentPage = "group";

    const popup = createPopup("গ্রুপ রিকোয়েস্ট", "groupPageTemplate");

    // Event handlers
    const createGroupBtn =
      popup.contentContainer.querySelector("#createGroupBtn");
    const createGroupBtnFooter = popup.contentContainer.querySelector(
      "#createGroupBtnFooter"
    );

    if (createGroupBtn) {
      createGroupBtn.addEventListener("click", function () {
        removePopup();
        showGroupCreatePage();
      });
    }

    if (createGroupBtnFooter) {
      createGroupBtnFooter.addEventListener("click", function () {
        removePopup();
        showGroupCreatePage();
      });
    }

    // Group item click behavior
    const groupItems = popup.contentContainer.querySelectorAll(".group-item");
    groupItems.forEach((item) => {
      item.addEventListener("click", function () {
        const groupName = this.querySelector(".group-name").textContent;
        const memberCount = this.querySelector(".group-members").textContent;

        // In a real app, you'd load the specific group data here
        currentGroup = {
          name: groupName,
          contacts: [], // This would be populated with real contacts
        };

        removePopup();
        showGroupAmountPopup();
      });
    });

    // Search functionality
    const groupSearchInput =
      popup.contentContainer.querySelector("#groupSearchInput");
    if (groupSearchInput) {
      groupSearchInput.addEventListener("input", function () {
        const searchTerm = this.value.trim().toLowerCase();

        // In a real app, you'd filter the groups here
        groupItems.forEach((item) => {
          const groupName = item
            .querySelector(".group-name")
            .textContent.toLowerCase();

          if (groupName.includes(searchTerm) || searchTerm === "") {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    }
  }

  function showGroupCreatePage() {
    currentPage = "groupCreate";
    selectedContacts = []; // Reset selected contacts

    console.log("reee") ;

    const popup = createPopup("নতুন গ্রুপ", "groupCreateTemplate");

    // Generate contact list
    const groupContactsList =
      popup.contentContainer.querySelector("#groupContactsList");
    let contactListHTML = "";

    contactItems.forEach((item, index) => {
      const name = item.querySelector(".contact-name").textContent;
      const number = item.querySelector(".contact-number").textContent;
      const initial = name.charAt(0);

      // Determine avatar color class
      const colorClasses = [
        "blue",
        "yellow",
        "green",
        "purple",
        "pink",
        "light-green",
        "coral",
      ];
      const colorClass =
        colorClasses[Math.floor(Math.random() * colorClasses.length)];

      contactListHTML += `
        <div class="contact-select-item" data-name="${name}" data-number="${number}">
          <div class="contact-select-wrapper">
            <div class="contact-number-indicator">
              ${index + 1}.
            </div>
            <div class="contact-avatar ${colorClass}">
              <span>${initial}</span>
            </div>
            <div class="contact-info">
              <div class="contact-name">${name}</div>
              <div class="contact-number">${number}</div>
            </div>
            <div class="contact-checkbox">
              <input type="checkbox" class="contact-select-checkbox">
            </div>
          </div>
        </div>
      `;
    });

    groupContactsList.innerHTML = contactListHTML;

    // Contact selection behavior
    const contactSelectItems = popup.contentContainer.querySelectorAll(
      ".contact-select-item"
    );
    const selectedCountElement =
      popup.contentContainer.querySelector("#selectedCount");
    const selectedContactsPreview = popup.contentContainer.querySelector(
      "#selectedContactsPreview"
    );
    const selectedContactsList = popup.contentContainer.querySelector(
      "#selectedContactsList"
    );
    const groupNextBtn = popup.contentContainer.querySelector("#groupNextBtn");
    const groupContactSearchInput = popup.contentContainer.querySelector(
      "#groupContactSearchInput"
    );

    // Function to update selected contacts display
    function updateSelectedContactsDisplay() {
      selectedCountElement.textContent = selectedContacts.length;
      groupNextBtn.disabled = selectedContacts.length === 0;

      // Update selected contacts preview
      if (selectedContacts.length > 0) {
        selectedContactsPreview.style.display = "block";
        selectedContactsList.innerHTML = "";

        selectedContacts.forEach((contact) => {
          const contactChip = document.createElement("div");
          contactChip.className = "contact-chip";

          contactChip.innerHTML = `
            <span>${contact.name}</span>
            <i class="fas fa-times" data-name="${contact.name}" data-number="${contact.number}"></i>
          `;

          selectedContactsList.appendChild(contactChip);
        });

        // Add remove functionality to chips
        const removeIcons = selectedContactsList.querySelectorAll(".fa-times");
        removeIcons.forEach((icon) => {
          icon.addEventListener("click", function (e) {
            e.stopPropagation();
            const name = this.getAttribute("data-name");
            const number = this.getAttribute("data-number");

            // Remove from selected contacts
            selectedContacts = selectedContacts.filter(
              (contact) => contact.name !== name || contact.number !== number
            );

            // Uncheck the corresponding checkbox
            contactSelectItems.forEach((item) => {
              if (
                item.getAttribute("data-name") === name &&
                item.getAttribute("data-number") === number
              ) {
                item.querySelector(".contact-select-checkbox").checked = false;
              }
            });

            updateSelectedContactsDisplay();
          });
        });
      } else {
        selectedContactsPreview.style.display = "none";
      }
    }

    contactSelectItems.forEach((item) => {
      item.addEventListener("click", function () {
        const checkbox = this.querySelector(".contact-select-checkbox");
        checkbox.checked = !checkbox.checked;

        const name = this.getAttribute("data-name");
        const number = this.getAttribute("data-number");

        if (checkbox.checked) {
          // Maximum 10 contacts
          if (selectedContacts.length >= 10) {
            checkbox.checked = false;
            alert("আপনি সর্বাধিক 10টি কন্টাক্ট সিলেক্ট করতে পারবেন।");
            return;
          }

          selectedContacts.push({ name, number });
        } else {
          selectedContacts = selectedContacts.filter(
            (contact) => contact.name !== name || contact.number !== number
          );
        }

        updateSelectedContactsDisplay();
      });
    });

    // Search functionality for group creation
    groupContactSearchInput.addEventListener("input", function () {
      const searchTerm = this.value.trim().toLowerCase();

      contactSelectItems.forEach((item) => {
        const name = item.getAttribute("data-name").toLowerCase();
        const number = item.getAttribute("data-number");

        if (
          name.includes(searchTerm) ||
          number.includes(searchTerm) ||
          searchTerm === ""
        ) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });

    groupNextBtn.addEventListener("click", function () {
      if (selectedContacts.length > 0) {
        removePopup();
        showGroupNamePage();
      }
    });
  }

  function showGroupNamePage() {
    currentPage = "groupName";

    const popup = createPopup("গ্রুপের নাম সেট করুন", "groupNameTemplate");

    // Update selected members count
    const selectedMembersCount = popup.contentContainer.querySelector(
      "#selectedMembersCount"
    );
    selectedMembersCount.textContent = selectedContacts.length;

    // Display selected members
    const selectedMembersPreview = popup.contentContainer.querySelector(
      "#selectedMembersPreview"
    );
    let membersHTML = "";

    selectedContacts.forEach((contact) => {
      membersHTML += `
        <div class="selected-member-item">
          <div class="member-avatar">
            ${contact.name.charAt(0)}
          </div>
          <div class="member-info">
            <div class="member-name">${contact.name}</div>
            <div class="member-number">${contact.number}</div>
          </div>
        </div>
      `;
    });

    selectedMembersPreview.innerHTML = membersHTML;

    // Input handling
    const groupNameInput =
      popup.contentContainer.querySelector("#groupNameInput");
    const nameCharCount =
      popup.contentContainer.querySelector("#nameCharCount");
    const saveGroupBtn = popup.contentContainer.querySelector("#saveGroupBtn");

    groupNameInput.addEventListener("input", function () {
      nameCharCount.textContent = this.value.length;

      if (this.value.length > 30) {
        this.value = this.value.substring(0, 30);
        nameCharCount.textContent = 30;
      }

      saveGroupBtn.disabled = this.value.trim() === "";
    });

    saveGroupBtn.addEventListener("click", function () {
      const groupName = groupNameInput.value.trim();
      if (groupName === "") {
        alert("দয়া করে গ্রুপের নাম লিখুন।");
        return;
      }

      currentGroup = {
        name: groupName,
        contacts: selectedContacts,
      };

      removePopup();
      showGroupAmountPopup();
    });
  }

  function showGroupAmountPopup() {
    const popup = createPopup("গ্রুপ রিকোয়েস্ট", "groupAmountTemplate");

    // Update group info
    const groupNameDisplay =
      popup.contentContainer.querySelector("#groupNameDisplay");
    const groupMembersCount =
      popup.contentContainer.querySelector("#groupMembersCount");

    groupNameDisplay.textContent = currentGroup.name;
    groupMembersCount.textContent = `${currentGroup.contacts.length} কন্টাক্টস`;

    // Input handling
    const groupAmountInput =
      popup.contentContainer.querySelector("#groupAmountInput");
    const equalSplitCheck =
      popup.contentContainer.querySelector("#equalSplitCheck");
    const splitInfoText =
      popup.contentContainer.querySelector("#splitInfoText");
    const groupProceedBtn =
      popup.contentContainer.querySelector("#groupProceedBtn");

    // Update split info text when amount changes
    function updateSplitInfo() {
      const totalAmount = parseFloat(groupAmountInput.value) || 0;
      const splitAmount = totalAmount / currentGroup.contacts.length;

      splitInfoText.textContent = `সকল কন্টাক্টসকে ৳${splitAmount.toFixed(
        2
      )} রিকোয়েস্ট করা হবে`;
    }

    groupAmountInput.addEventListener("input", function () {
      // Remove non-numeric characters except decimal point
      this.value = this.value.replace(/[^0-9.]/g, "");

      // Ensure only one decimal point
      const parts = this.value.split(".");
      if (parts.length > 2) {
        this.value = parts[0] + "." + parts.slice(1).join("");
      }

      // Limit to two decimal places
      if (parts.length > 1 && parts[1].length > 2) {
        this.value = parts[0] + "." + parts[1].substring(0, 2);
      }

      updateSplitInfo();
    });

    equalSplitCheck.addEventListener("change", updateSplitInfo);

    groupProceedBtn.addEventListener("click", function () {
      const amount = parseFloat(groupAmountInput.value);
      if (isNaN(amount) || amount <= 0) {
        alert("দয়া করে একটি বৈধ পরিমাণ প্রবেশ করুন।");
        return;
      }

      if (amount > 50000) {
        alert("রিকোয়েস্ট লিমিট ৳50,000.00 এর বেশি হতে পারবে না।");
        return;
      }

      currentAmount = amount;
      removePopup();
      showPinPopup();
    });
  }

  // PART 4: REQUEST HISTORY PAGE

  function showRequestsPage() {
    currentPage = "requests";

    const popup = createPopup("রিকোয়েস্টসমূহ", "requestHistoryTemplate");

    // Initialize tab behavior
    const sentTab = popup.contentContainer.querySelector("#sentRequestsTab");
    const receivedTab = popup.contentContainer.querySelector(
      "#receivedRequestsTab"
    );

    sentTab.addEventListener("click", function () {
      sentTab.classList.add("active");
      receivedTab.classList.remove("active");
      // In a real app, you'd update the list here
    });

    receivedTab.addEventListener("click", function () {
      receivedTab.classList.add("active");
      sentTab.classList.remove("active");
      // In a real app, you'd update the list here
    });
  }

  // PART 5: UTILITY FUNCTIONS AND INITIALIZATION

  function resetMainPage() {
    currentPage = "main";
    searchInput.value = "";
    currentRecipient = null;
    currentAmount = 0;
    currentGroup = null;
    selectedContacts = [];
  }

  // Initialize event listeners
  function init() {
    setupGroupButtons();

    // Handle back button
    document.addEventListener("click", function (e) {
      if (e.target.closest(".back-button")) {
        handleBackButton();
      }
    });

    // Handle Enter key on search
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  }

  function handleBackButton() {
    switch (currentPage) {
      case "amount":
        removePopup();
        resetMainPage();
        break;
      case "pin":
        removePopup();
        if (currentGroup) {
          showGroupAmountPopup();
        } else {
          showAmountPopup(currentRecipient.name, currentRecipient.number);
        }
        break;
      case "group":
        removePopup();
        resetMainPage();
        break;
      case "groupCreate":
        removePopup();
        showGroupPage();
        break;
      case "groupName":
        removePopup();
        showGroupCreatePage();
        break;
      case "requests":
        removePopup();
        resetMainPage();
        break;
      default:
        removePopup();
        resetMainPage();
    }
  }

  // Initialize the app
  init();

  //backend : 
  
function forBackend()
{

  allDetails.number = document.getElementById("searchInput").value ;

  let pins = document.querySelectorAll(".pin-input") ;
  let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  allDetails.pin = fullPins ;

  // console.log(allDetails) ;

  fetch("http://localhost:3000/requestmoney" , {
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

//--------------------------

const allReq = document.getElementById("allReq");

    allReq.addEventListener("click", function (e) {

    const btn = e.target.closest(".acceptBtn");
    if (btn) {

        console.log("btn reach");

        const id = btn.dataset.id;
        const amount = btn.dataset.amount;

        console.log("Accepted ID:", id);
        console.log("Amount:", amount);

    }
});

    function handleMoneyReq() {
        fetch("http://localhost:3000/data/coming-request", {
            method: "GET",
        })
            .then(async (r1) => {
                const data = await r1.json();

                if (r1.ok) {
                    const message = data.message;

                    allReq.innerHTML = "";

                    message.forEach(function (item) {
                        const div = document.createElement("div");
                        div.className = "request-item";

                        div.innerHTML = `
                            <div class="request-icon">
                                <i class="fas fa-paper-plane"></i>
                            </div>
                            <div class="request-details">
                                <div class="request-name">${item.name}</div>
                                <div class="request-number">
                                    <p style="font-size:11px">${item._id}</p>
                                </div>
                                <div class="request-info">
                                    <div class="request-amount">৳ ${item.amount}</div>
                                </div>
                            </div>
                            <div>
                                <button class="acceptBtn" data-amount="${item.amount}" data-id="${item._id}">accept</button>
                            </div>
                        `;

                        allReq.appendChild(div);
                    });
                } else {
                    console.log("Server error:", data.message);
                }
            })
            .catch(function (err) {
                console.error("Network error:", err);
            });
    }

    handleMoneyReq();

});
