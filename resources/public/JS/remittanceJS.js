document.addEventListener("DOMContentLoaded", function () {
  // Main elements
  const mainContainer = document.getElementById("mainContainer");
  const countryOperatorsBtn = document.getElementById("countryOperatorsBtn");
  const countryPopup = document.getElementById("countryPopup");
  const overlay = document.getElementById("overlay");
  const countryBackBtn = document.getElementById("countryBackBtn");
  const countrySelectBtn = document.getElementById("countrySelectBtn");
  const countrySection = document.getElementById("countrySection");
  const countryList = document.getElementById("countryList");
  const countrySearchInput = document.getElementById("countrySearchInput");
  const operatorsSection = document.getElementById("operatorsSection");

  // Receipt elements
  const receiptBtn = document.getElementById("receiptBtn");
  const receiptPopup = document.getElementById("receiptPopup");
  const receiptBackBtn = document.getElementById("receiptBackBtn");

  // Banking elements
  const bankingPopup = document.getElementById("bankingPopup");
  const bankingBackBtn = document.getElementById("bankingBackBtn");
  const bankingForm = document.getElementById("bankingForm");

  // PIN elements
  const pinPopup = document.getElementById("pinPopup");
  const pinBackBtn = document.getElementById("pinBackBtn");
  const pinForm = document.getElementById("pinForm");
  const pinDigits = document.querySelectorAll(".pin-digit");

  // Success elements
  const successPopup = document.getElementById("successPopup");
  const successOkBtn = document.getElementById("successOkBtn");
  const transactionAmount = document.getElementById("transactionAmount");
  const transactionId = document.getElementById("transactionId");

  // Operator elements
  const operatorItems = document.querySelectorAll(".operator-item");

  // Country data with flags
  const countries = [
    { name: "বাংলাদেশ", flag: "/public/images/remittance/rem3.jpg", code: "BD" },
    { name: "ভারত", flag: "flag-in.png", code: "IN" },
    { name: "পাকিস্তান", flag: "flag-pk.png", code: "PK" },
    { name: "মালয়েশিয়া", flag: "flag-my.png", code: "MY" },
    { name: "সিঙ্গাপুর", flag: "flag-sg.png", code: "SG" },
    { name: "সৌদি আরব", flag: "flag-sa.png", code: "SA" },
    { name: "আরব আমিরাত", flag: "flag-ae.png", code: "AE" },
    { name: "কাতার", flag: "flag-qa.png", code: "QA" },
    { name: "কুয়েত", flag: "flag-kw.png", code: "KW" },
    { name: "ওমান", flag: "flag-om.png", code: "OM" },
    { name: "যুক্তরাজ্য", flag: "flag-gb.png", code: "GB" },
    { name: "যুক্তরাষ্ট্র", flag: "flag-us.png", code: "US" },
    { name: "কানাডা", flag: "flag-ca.png", code: "CA" },
    { name: "অস্ট্রেলিয়া", flag: "flag-au.png", code: "AU" },
    { name: "জাপান", flag: "flag-jp.png", code: "JP" },
  ];

  // Operators by country
  const operatorsByCountry = {
    BD: [
      { name: "বাংলাদেশ বিকাশ", logo: "/public/images/blogo.png" },
      { name: "রকেট", logo: "rocket-logo.png" },
      { name: "নগদ", logo: "nagad-logo.png" },
    ],
    IN: [
      { name: "পেইটিএম", logo: "paytm-logo.png" },
      { name: "ফোনপে", logo: "phonepe-logo.png" },
    ],
    US: [
      { name: "পেপাল", logo: "paypal-logo.png" },
      { name: "ওয়েস্টার্ন ইউনিয়ন", logo: "wu-logo.png" },
    ],
    // Default for other countries
    default: [
      { name: "ওয়েস্টার্ন ইউনিয়ন", logo: "wu-logo.png" },
      { name: "মানিগ্রাম", logo: "moneygram-logo.png" },
    ],
  };

  // Variables to store transaction data
  let selectedCountry = null;
  let selectedOperator = null;
  let transactionData = {};

  // Show/hide popup functions
  function showPopup(popup) {
    overlay.style.display = "block";
    popup.style.display = "";
  }

  function hidePopup(popup) {
    overlay.style.display = "none";
    popup.style.display = "none";
  }

  // Initialize country list
  function initializeCountryList() {
    countryList.innerHTML = "";
    countries.forEach((country) => {
      const countryItem = document.createElement("div");
      countryItem.className = "country-item";
      countryItem.setAttribute("data-code", country.code);

      countryItem.innerHTML = `
        <div class="country-flag">
          <img src="images/flags/${country.flag}" alt="${country.name}" onerror="this.src='images/flags/flag-placeholder.png'">
        </div>
        <div class="country-name">${country.name}</div>
      `;

      countryItem.addEventListener("click", function () {
        // Remove selection from all countries
        countryList.querySelectorAll(".country-item").forEach((item) => {
          item.classList.remove("selected");
        });

        // Add selection to clicked country
        this.classList.add("selected");
        selectedCountry = country;

        // Update select button text
        countrySelectBtn.querySelector("span").textContent = country.name;

        // Hide country list
        countrySection.style.display = "none";

        // Update operators section
        updateOperatorsList(country.code);

        // Scroll to operators section
        operatorsSection.scrollIntoView({ behavior: "smooth" });
      });

      countryList.appendChild(countryItem);
    });
  }

  // Update operators list
  function updateOperatorsList(countryCode) {
    const operators =
      operatorsByCountry[countryCode] || operatorsByCountry["default"];

    let operatorsHTML = `
      <div class="operators-title">অপারেটরসমূহ</div>
      <div class="operators-list">
    `;

    operators.forEach((operator) => {
      operatorsHTML += `
        <div class="operator-item" data-operator="${operator.name}">
          <div class="operator-logo">
            <img src="images/operators/${operator.logo}" alt="${operator.name}" onerror="this.src='images/operators/operator-placeholder.png'">
          </div>
          <div class="operator-name">${operator.name}</div>
        </div>
      `;
    });

    operatorsHTML += `</div>`;
    operatorsSection.innerHTML = operatorsHTML;

    // Add click handlers to operators
    operatorsSection.querySelectorAll(".operator-item").forEach((item) => {
      item.addEventListener("click", function () {
        selectedOperator = this.getAttribute("data-operator");
        hidePopup(countryPopup);
        showPopup(bankingPopup);
      });
    });
  }

  // Event Listeners
  countryOperatorsBtn.addEventListener("click", function () {
    initializeCountryList();
    showPopup(countryPopup);
  });

  countryBackBtn.addEventListener("click", function () {
    hidePopup(countryPopup);
  });

  countrySelectBtn.addEventListener("click", function () {
    if (countrySection.style.display === "none") {
      countrySection.style.display = "block";
    } else {
      countrySection.style.display = "none";
    }
  });

  // Country search
  countrySearchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();

    countryList.querySelectorAll(".country-item").forEach((item) => {
      const countryName = item
        .querySelector(".country-name")
        .textContent.toLowerCase();

      if (countryName.includes(query) || query === "") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Receipt functionality
  receiptBtn.addEventListener("click", function () {
    showPopup(receiptPopup);
  });

  receiptBackBtn.addEventListener("click", function () {
    hidePopup(receiptPopup);
  });

  // Banking form
  bankingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    transactionData.mobileNumber =
      document.getElementById("mobileNumber").value;
    transactionData.amount = document.getElementById("amount").value;
    hidePopup(bankingPopup);
    showPopup(pinPopup);
  });

  bankingBackBtn.addEventListener("click", function () {
    hidePopup(bankingPopup);
  });

  // Operator click handlers
  operatorItems.forEach((item) => {
    item.addEventListener("click", function () {
      selectedOperator = this.getAttribute("data-operator");
      showPopup(bankingPopup);
    });
  });

  // PIN input handling
  pinDigits.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (this.value.length === 1 && index < pinDigits.length - 1) {
        pinDigits[index + 1].focus();
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value === "" && index > 0) {
        pinDigits[index - 1].focus();
      }
    });
  });

  pinForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let pin = "";
    pinDigits.forEach((digit) => {
      pin += digit.value;
    });

    if (pin.length === 5) {
      transactionData.pin = pin;
      processTransaction();
    }
  });

  pinBackBtn.addEventListener("click", function () {
    hidePopup(pinPopup);
    showPopup(bankingPopup);
  });

  // Success popup
  successOkBtn.addEventListener("click", function () {
    hidePopup(successPopup);
    resetTransaction();
  });

  // Process transaction
  function processTransaction() {
    // Generate transaction ID
    const txId = "TRX" + Math.floor(Math.random() * 1000000000);
    transactionId.textContent = txId;
    transactionAmount.textContent = "৳ " + transactionData.amount;

    hidePopup(pinPopup);
    showPopup(successPopup);
  }

  // Reset transaction
  function resetTransaction() {
    transactionData = {};
    selectedCountry = null;
    selectedOperator = null;
    pinDigits.forEach((digit) => {
      digit.value = "";
    });
    document.getElementById("mobileNumber").value = "";
    document.getElementById("amount").value = "";
  }

  // Close popups on overlay click
  overlay.addEventListener("click", function () {
    hidePopup(countryPopup);
    hidePopup(receiptPopup);
    hidePopup(bankingPopup);
    hidePopup(pinPopup);
    hidePopup(successPopup);
  });
});

let submitBtn = document.getElementById("submitBtn") ;

submitBtn.addEventListener("click" , function(){

  let number = document.getElementById("mobileNumber").value ;
  let amount = document.getElementById("amount").value ;

  let pins = document.querySelectorAll(".pin-digit") ;

  let fullPins = "";

  pins.forEach(function(item){
    fullPins += item.value;
  });

  console.log(number , amount , fullPins) ;
  console.log("reach") ;


  fetch("http://localhost:3000/remittance", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      number : number ,
      amount : amount ,
      pin : fullPins
    }) 
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

})
