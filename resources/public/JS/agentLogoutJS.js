document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in as agent
  const agentData = localStorage.getItem("agentData");

  if (!agentData) {
    // No agent data, redirect to index.html
    window.location.href = "/";
    return;
  }

  const parsedData = JSON.parse(agentData);

  if (!parsedData.isLoggedIn) {
    // Not logged in, redirect to index.html
    window.location.href = "/";
    return;
  }

  // Update UI elements with agent data if needed
  updateAgentUI(parsedData);

  // Setup logout button
  setupLogoutButton();

  function updateAgentUI(data) {
    // Update user name if exists
    const userName = document.querySelector(".user-name");
    if (userName) {
      userName.textContent = data.registrationData?.shopName || "বিকাশ এজেন্ট";
    }

    // Update dropdown user name if exists
    const dropdownUserName = document.querySelector(".dropdown-user-name");
    if (dropdownUserName) {
      dropdownUserName.textContent =
        data.registrationData?.contactName || "বিকাশ এজেন্ট";
    }

    // Update dropdown user phone if exists
    const dropdownUserPhone = document.querySelector(".dropdown-user-phone");
    if (dropdownUserPhone) {
      dropdownUserPhone.textContent = "+880 " + data.agentNumber;
    }

    // Update balance display if exists
    const balanceAmount = document.querySelector(".balance-amount");
    if (balanceAmount) {
      // Generate a random balance for demo
      const randomBalance = Math.floor(10000 + Math.random() * 90000);
      balanceAmount.textContent = "৳ " + randomBalance.toFixed(2);
    }
  }

  function setupLogoutButton() {
    // Add event listener to logout button
    const logoutItems = document.querySelectorAll(".user-dropdown-item");
    logoutItems.forEach((item) => {
      if (item.textContent.includes("লগ আউট")) {
        item.addEventListener("click", function (e) {
          e.preventDefault();

          // Update agent data
          const agentData = JSON.parse(localStorage.getItem("agentData"));
          agentData.isLoggedIn = false;
          localStorage.setItem("agentData", JSON.stringify(agentData));

          // Show notification if possible
          if (typeof showNotification === "function") {
            showNotification("লগআউট সফল হয়েছে");
          }

          // Redirect to index.html after a short delay
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        });
      }
    });
  }

  // Add special logout class for styling
  document.querySelectorAll(".user-dropdown-item").forEach((item) => {
    if (item.textContent.includes("লগ আউট")) {
      item.classList.add("logout");
    }
  });
});
