document.addEventListener("DOMContentLoaded", function () {
  // Get all service items
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    // Add premium UI elements to each service item

    // 1. Add highlight accent (top right corner triangle)
    const highlightAccent = document.createElement("div");
    highlightAccent.className = "highlight-accent";
    item.appendChild(highlightAccent);

    // 2. Add hover line indicator (bottom line)
    const hoverLine = document.createElement("div");
    hoverLine.className = "hover-line";
    item.appendChild(hoverLine);

    // 3. Add hover arrow
    const hoverArrow = document.createElement("div");
    hoverArrow.className = "hover-arrow";
    hoverArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
    item.appendChild(hoverArrow);

    // 4. Add ripple container for click effect
    const rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple-container";
    item.appendChild(rippleContainer);

    // 5. Add ripple effect on click
    item.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "ripple-effect";

      const rect = rippleContainer.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      rippleContainer.appendChild(ripple);

      // Add active click class
      this.classList.add("active-click");

      // Remove ripple after animation and active class
      setTimeout(() => {
        ripple.remove();
        this.classList.remove("active-click");
      }, 600);
    });

    // 6. Add 3D tilt effect based on mouse position
    item.addEventListener("mousemove", function (e) {
      if (!item.matches(":hover")) return;

      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate tilt values (max ±5 degrees)
      const tiltX = (y / rect.height - 0.5) * 8;
      const tiltY = (x / rect.width - 0.5) * -8;

      // Apply 3D transform to item
      item.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px) scale(1.05)`;

      // Dynamic shadow based on tilt
      const shadowX = (x / rect.width - 0.5) * 10;
      const shadowY = (y / rect.height - 0.5) * 10;
      item.style.boxShadow = `
        ${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.08),
        ${shadowX / 2}px ${shadowY / 2}px 15px rgba(226, 20, 108, 0.1),
        0 5px 10px rgba(226, 20, 108, 0.05),
        inset 0 1px 1px rgba(255, 255, 255, 0.9)
      `;

      // Apply 3D transform to icon
      const icon = item.querySelector(".service-icon");
      if (icon) {
        const iconTiltX = tiltX * 1.5; // Amplify icon tilt for more pronounced effect
        const iconTiltY = tiltY * 1.5;
        icon.style.transform = `rotateX(${iconTiltX}deg) rotateY(${iconTiltY}deg) translateZ(30px) scale(1.2)`;
      }
    });

    // 7. Reset transform on mouse leave
    item.addEventListener("mouseleave", function () {
      item.style.transform = "";
      item.style.boxShadow = "";

      // Reset icon transform
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transform = "";
      }

      // Wait a small amount of time before allowing transitions again
      setTimeout(() => {
        item.style.transition = "all 0.45s cubic-bezier(0.19, 1, 0.22, 1)";
        if (icon) {
          icon.style.transition = "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }
      }, 50);
    });

    // 8. Disable transitions during mouse movement for smoothness
    item.addEventListener("mouseenter", function () {
      item.style.transition = "none";

      // Disable icon transition
      const icon = item.querySelector(".service-icon");
      if (icon) {
        icon.style.transition = "none";
      }

      // Initial transform to avoid jump
      item.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-10px) scale(1.05)";

      // Force browser to apply the transitions
      setTimeout(() => {
        item.style.transition = "none";
        if (icon) {
          icon.style.transition = "none";
        }
      }, 10);
    });
  });

  // Make sure all service items are visible at startup with staggered animation
  serviceItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 100 + index * 100); // Staggered delay
  });

  // Adjust body padding based on service grid height
  function adjustBodyPadding() {
    const header = document.querySelector(".header");
    const servicesMenu = document.getElementById("servicesMenu");

    if (header && servicesMenu) {
      const headerHeight = header.offsetHeight;

      // Set the body padding to account for fixed header
      document.body.style.paddingTop = headerHeight + "px";
    }
  }

  // Run on page load and on window resize
  adjustBodyPadding();
  window.addEventListener("resize", adjustBodyPadding);

  // Get elements from the DOM
  const servicesButton = document.getElementById("servicesButton");
  const servicesMenu = document.getElementById("servicesMenu");
  const userProfile = document.getElementById("userProfile");
  const userDropdown = document.getElementById("userDropdown");
  const balanceToggle = document.getElementById("balanceToggle");
  const balancePopup = document.getElementById("balancePopup");

  // Services button functionality
  servicesButton.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to the services menu
    servicesMenu.scrollIntoView({ behavior: "smooth" });

    // Close other menus
    userDropdown.classList.remove("show");
    balancePopup.classList.remove("show");
    balanceToggle.classList.remove("active");

    // Reset balance toggle icon
    if (balanceToggle.classList.contains("fa-eye-slash")) {
      balanceToggle.classList.remove("fa-eye-slash");
      balanceToggle.classList.add("fa-eye");
    }
  });

  // Toggle user dropdown on profile click
  userProfile.addEventListener("click", function (e) {
    if (e.target !== balanceToggle) {
      e.stopPropagation();
      userDropdown.classList.toggle("show");

      // Close balance popup
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");
    }
  });

  // Balance toggle functionality
  balanceToggle.addEventListener("click", function (e) {
    e.stopPropagation();

    // Toggle balance popup
    balancePopup.classList.toggle("show");
    balanceToggle.classList.toggle("active");

    // Toggle icon with smooth transition
    if (balancePopup.classList.contains("show")) {
      balanceToggle.classList.remove("fa-eye");
      balanceToggle.classList.add("fa-eye-slash");
    } else {
      balanceToggle.classList.remove("fa-eye-slash");
      balanceToggle.classList.add("fa-eye");
    }

    // Close dropdown if open
    userDropdown.classList.remove("show");
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !userProfile.contains(event.target) &&
      !userDropdown.contains(event.target) &&
      !balanceToggle.contains(event.target) &&
      !balancePopup.contains(event.target)
    ) {
      userDropdown.classList.remove("show");
      balancePopup.classList.remove("show");
      balanceToggle.classList.remove("active");

      // Reset balance toggle icon
      if (balanceToggle.classList.contains("fa-eye-slash")) {
        balanceToggle.classList.remove("fa-eye-slash");
        balanceToggle.classList.add("fa-eye");
      }
    }
  });

  // Notification bell animation
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("mouseenter", function () {
      const bell = this.querySelector("i");
      bell.style.animation = "bell-shake 0.5s ease";

      setTimeout(() => {
        bell.style.animation = "";
      }, 500);
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("show-mobile");
    });
  }

  // Function to toggle sidebar
  function toggleSidebar() {
    console.log("Toggle sidebar function called");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      // Force inline styles to override any conflicting CSS
      sidebar.style.right = "-80%";
      sidebar.style.left = "auto";
      sidebar.style.transition = "right 0.3s ease";

      // Add active class after setting inline styles
      setTimeout(() => {
        sidebar.classList.add("active");
        // Force right:0 through inline style as well
        sidebar.style.right = "0";
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }, 10);
    }
  }

  // Function to close sidebar
  function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && overlay) {
      sidebar.classList.remove("active");
      // Also reset inline style
      sidebar.style.right = "-80%";
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Setup close functionality
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (sidebarClose) {
    sidebarClose.addEventListener("click", closeSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Function to show/hide popups
  function showPopup(popupId) {
    // Hide all popups first
    const allPopups = document.querySelectorAll(".bkash-popup");
    allPopups.forEach((popup) => {
      popup.classList.remove("active");
    });

    // Show the requested popup
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.add("active");
    }
  }

  function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.remove("active");
    }
  }

  // Close popup on back button click
  const backButtons = document.querySelectorAll(".popup-back");
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const popup = this.closest(".bkash-popup");
      if (popup) {
        popup.classList.remove("active");
      }
    });
  });

  // Setup profile menu item click - Show Profile Popup
  const profileMenuItem = document.getElementById("profileMenuItem");
  if (profileMenuItem) {
    profileMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      userDropdown.classList.remove("show");
      showPopup("profilePopup");
    });
  }

  // Setup transaction menu item click - Show Transaction History Popup
  const transactionMenuItem = document.getElementById("transactionMenuItem");
  if (transactionMenuItem) {
    transactionMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      userDropdown.classList.remove("show");
      showPopup("transactionPopup");
    });
  }

  // Setup settings menu item click - Show Settings Popup
  const settingsMenuItem = document.getElementById("settingsMenuItem");
  if (settingsMenuItem) {
    settingsMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      userDropdown.classList.remove("show");
      showPopup("settingsPopup");
    });
  }

  // Setup support menu item click - Show Support Popup
  const supportMenuItem = document.getElementById("supportMenuItem");
  if (supportMenuItem) {
    supportMenuItem.addEventListener("click", function (e) {
      e.preventDefault();
      userDropdown.classList.remove("show");
      showPopup("supportPopup");
    });
  }

  // Setup transaction tabs
  const statementTabs = document.querySelectorAll(".statement-tab");
  if (statementTabs.length === 2) {
    const transactionList = document.querySelector(".transaction-list");
    const summarTab = document.querySelector(".statement-summary-tab");

    statementTabs[0].addEventListener("click", function () {
      statementTabs[0].classList.add("active");
      statementTabs[1].classList.remove("active");
      if (transactionList && summarTab) {
        transactionList.style.display = "block";
        summarTab.style.display = "none";
      }
    });

    statementTabs[1].addEventListener("click", function () {
      statementTabs[1].classList.add("active");
      statementTabs[0].classList.remove("active");
      if (transactionList && summarTab) {
        transactionList.style.display = "none";
        summarTab.style.display = "block";
      }
    });
  }

  // Setup FAQ accordions
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector("i");

      // Close all other FAQs
      faqQuestions.forEach((q) => {
        if (q !== question) {
          q.nextElementSibling.style.display = "none";
          q.querySelector("i").className = "fas fa-chevron-down";
        }
      });

      // Toggle current FAQ
      if (answer.style.display === "block") {
        answer.style.display = "none";
        icon.className = "fas fa-chevron-down";
      } else {
        answer.style.display = "block";
        icon.className = "fas fa-chevron-up";
      }
    });
  });

  // Setup Contact Option click handlers
  const contactOptions = document.querySelectorAll(".contact-option");
  contactOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const id = this.id;
      if (id === "liveChat") {
        alert("লাইভ চ্যাট শীঘ্রই চালু হবে।");
      } else if (id === "phoneCall") {
        alert("16247 নম্বরে কল করা হচ্ছে...");
      } else if (id === "emailSupport") {
        alert("ইমেইল ফিচার শীঘ্রই চালু হবে।");
      }
    });
  });

  // Setup Edit Profile Button
  const editProfileBtn = document.getElementById("editProfileBtn");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", function () {
      showPopup("profileEditPopup");

      // Populate edit form with existing data
      document.getElementById("editName").value =
        document.getElementById("name1").textContent;
      document.getElementById("editEmail").value =
        document.getElementById("email1").textContent;

      // Clone profile image to edit form
      const profileImg = document.getElementById("profileAvatarImage").src;
      document.getElementById("editAvatarPreview").src = profileImg;
    });
  }

  // Setup Change PIN Button
  const changePinBtn = document.getElementById("changePinBtn");
  if (changePinBtn) {
    changePinBtn.addEventListener("click", function () {
      alert("পিন পরিবর্তন ফিচার শীঘ্রই চালু হবে।");
    });
  }

  // Setup Profile Photo Upload in Settings
  const photoUpload = document.getElementById("photoUpload");
  if (photoUpload) {
    photoUpload.addEventListener("change", function (e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgUrl = e.target.result;
          // Update all profile images
          updateAllProfileImages(imgUrl);
          alert("ছবি সফলভাবে আপলোড করা হয়েছে!");
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // Setup Profile Photo Upload in Profile Edit
  const profilePhotoUpload = document.getElementById("profilePhotoUpload");
  if (profilePhotoUpload) {
    profilePhotoUpload.addEventListener("change", function (e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // First just update the preview in the edit form
          document.getElementById("editAvatarPreview").src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // Handle Profile Save Button
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", function () {
      // Get values from form
      const newName = document.getElementById("editName").value;
      const newEmail = document.getElementById("editEmail").value;
      const newDob = document.getElementById("editDob").value;
      const newAddress = document.getElementById("editAddress").value;
      const newProfileImg = document.getElementById("editAvatarPreview").src;

      // Update all name elements
      document.getElementById("name1").textContent = newName;
      document.getElementById("name2").textContent = newName;
      document.getElementById("setName").textContent = newName;
      document.getElementById("profileName").textContent = newName;

      // Update email
      document.getElementById("email1").textContent = newEmail;

      // Update DOB if provided
      if (newDob) {
        const formattedDate = new Date(newDob).toLocaleDateString("bn-BD");
        document.getElementById("dob1").textContent = formattedDate;
      }

      // Update all profile images
      updateAllProfileImages(newProfileImg);

      // Show success message and hide edit popup
      alert("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      closePopup("profileEditPopup");
      showPopup("profilePopup");
    });
  }

  // Helper function to update all profile images
  function updateAllProfileImages(imgUrl) {
    const profileImages = [
      "headerProfileImage",
      "dropdownProfileImage",
      "sidebarProfileImage",
      "profileAvatarImage",
      "avatarPreview",
      "editAvatarPreview",
    ];

    profileImages.forEach((id) => {
      const imgElement = document.getElementById(id);
      if (imgElement) {
        imgElement.src = imgUrl;
      }
    });
  }

  // Settings items click handler
  const settingsItems = document.querySelectorAll(".settings-item");
  settingsItems.forEach((item) => {
    item.addEventListener("click", function () {
      const title = this.querySelector(".settings-item-title").textContent;
      if (title.includes("প্রোফাইল")) {
        showPopup("profileEditPopup");
      } else {
        alert(`"${title}" ফিচার শীঘ্রই আসছে!`);
      }
    });
  });

  // Data fetch for user details
  fetch("http://localhost:3000/data/agentdetails", {
    method: "GET",
  })
    .then(async function (r1) {
      const details = await r1.json();

      if (r1.ok) {
        let user = details.data[0];
        console.log(user);

        // Update UI with user details
        document.getElementById("setBalance").textContent = user.balance;
        document.getElementById("setName").textContent = user.name;
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileNumber").textContent =
          user.mobile_number;
        document.getElementById("profileBalance").textContent = user.balance;

        document.getElementById("name1").textContent = user.name;
        document.getElementById("name2").textContent = user.name;
        document.getElementById("balance1").textContent = user.balance;
        document.getElementById("number1").textContent = user.mobile_number;
        document.getElementById("number2").textContent = user.mobile_number;
        document.getElementById("email1").textContent = user.email;

        // Pre-populate edit form
        if (document.getElementById("editName")) {
          document.getElementById("editName").value = user.name;
        }
        if (document.getElementById("editEmail")) {
          document.getElementById("editEmail").value = user.email;
        }
      } else {
        alert(details.message);
      }
    })
    .catch(function (err) {
      console.error("Network error:", err);
    });
});
