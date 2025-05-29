

// Loan Application JavaScript
let currentStep = 1;
let loanData = {};

// Show loan modal
function showLoanModal() {
  const modal = document.getElementById("loanModal");
  modal.style.display = "flex";

  // Make sure background isn't blurred
  modal.style.backdropFilter = "none";
  modal.style.background = "rgba(0, 0, 0, 0.5)"; // Semi-transparent background

  // Reset to first step
  currentStep = 1;
  showStep(currentStep);
  updateStepIndicator();
}

// Close loan modal
function closeLoanModal() {
  const modal = document.getElementById("loanModal");
  modal.style.display = "none";
  resetForm();
}

// Show loan info modal
function showLoanInfoModal() {
  const modal = document.getElementById("loanInfoModal");
  modal.style.display = "flex";
  modal.style.backdropFilter = "none";
  modal.style.background = "rgba(0, 0, 0, 0.5)";
}

// Close loan info modal
function closeLoanInfoModal() {
  const modal = document.getElementById("loanInfoModal");
  modal.style.display = "none";
}

// Show FAQ modal
function showFaqModal() {
  const modal = document.getElementById("faqModal");
  modal.style.display = "flex";
  modal.style.backdropFilter = "none";
  modal.style.background = "rgba(0, 0, 0, 0.5)";

  // Initialize FAQ accordion functionality
  initFaqAccordion();
}

// Close FAQ modal
function closeFaqModal() {
  const modal = document.getElementById("faqModal");
  modal.style.display = "none";
}

// Initialize FAQ accordion
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    if (!question.hasAttribute("listener")) {
      question.setAttribute("listener", "true");
      question.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        const icon = this.querySelector("i");

        // Toggle answer visibility
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        }
      });
    }
  });
}

// Reset form
function resetForm() {
  document.querySelectorAll("form").forEach((form) => form.reset());
  loanData = {};
  currentStep = 1;
  showStep(currentStep);
  updateStepIndicator();
}

// Show specific step
function showStep(step) {
  // Hide all steps
  document.querySelectorAll(".step-content").forEach((el) => {
    el.classList.remove("active");
  });

  // Show current step
  document.getElementById(`step${step}`).classList.add("active");

  // Update modal title
  const modalTitle = document.querySelector(".modal-title");
  const stepTitles = {
    1: "ব্যক্তিগত তথ্য",
    2: "লোনের তথ্য",
    3: "চাকরির তথ্য",
    4: "পিন নম্বর",
    5: "আবেদন সফল",
  };
  modalTitle.textContent = stepTitles[step];
}

// Update step indicator
function updateStepIndicator() {
  const dots = document.querySelectorAll(".step-dot");
  dots.forEach((dot, index) => {
    if (index + 1 < currentStep) {
      dot.classList.add("completed");
      dot.classList.remove("active");
    } else if (index + 1 === currentStep) {
      dot.classList.add("active");
      dot.classList.remove("completed");
    } else {
      dot.classList.remove("active", "completed");
    }
  });
}

// Go to specific step
function goToStep(step) {
  if (validateCurrentStep()) {
    currentStep = step;
    showStep(step);
    updateStepIndicator();
  }
}

// Go back to previous step
function goBack() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepIndicator();
  } else {
    // If on first step, close the modal
    closeLoanModal();
  }
}

// Validate current step
function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      return validateBasicInfo();
    case 2:
      return validateLoanDetails();
    case 3:
      return validateEmploymentInfo();
    case 4:
      return validatePin();
    default:
      return true;
  }
}

// Validate basic information
function validateBasicInfo() {
  const fullName = document.getElementById("fullName").value.trim();
  const mobileNumber = document.getElementById("mobileNumber").value.trim();
  const nidNumber = document.getElementById("nidNumber").value.trim();

  if (!fullName) {
    alert("দয়া করে আপনার নাম লিখুন");
    return false;
  }

  // Updated mobile number validation for 11 digits and specific prefixes
  if (!mobileNumber.match(/^01[3-9]\d{8}$/)) {
    alert("দয়া করে সঠিক মোবাইল নম্বর লিখুন (১১ ডিজিট)");
    return false;
  }

  // Updated NID validation for 13 digits
  if (!nidNumber || nidNumber.length !== 13) {
    alert("দয়া করে সঠিক NID নম্বর লিখুন (১৩ ডিজিট)");
    return false;
  }

  loanData.fullName = fullName;
  loanData.mobileNumber = mobileNumber;
  loanData.nidNumber = nidNumber;
  return true;
}

// Validate loan details
function validateLoanDetails() {
  const loanAmount = parseInt(document.getElementById("loanAmount").value);
  const loanDuration = document.getElementById("loanDuration").value;

  if (!loanAmount || loanAmount < 1000 || loanAmount > 50000) {
    alert("লোনের পরিমাণ ১,০০০ থেকে ৫০,০০০ টাকার মধ্যে হতে হবে");
    return false;
  }

  loanData.loanAmount = loanAmount;
  loanData.loanDuration = loanDuration;
  return true;
}

// Validate employment information
function validateEmploymentInfo() {
  const occupation = document.getElementById("occupation").value;
  const monthlyIncome = parseInt(
    document.getElementById("monthlyIncome").value
  );
  const companyName = document.getElementById("companyName").value.trim();

  if (!occupation) {
    alert("দয়া করে আপনার পেশা নির্বাচন করুন");
    return false;
  }

  if (!monthlyIncome || monthlyIncome < 5000) {
    alert("মাসিক আয় কমপক্ষে ৫,০০০ টাকা হতে হবে");
    return false;
  }

  if (!companyName) {
    alert("দয়া করে প্রতিষ্ঠানের নাম লিখুন");
    return false;
  }

  loanData.occupation = occupation;
  loanData.monthlyIncome = monthlyIncome;
  loanData.companyName = companyName;
  return true;
}

// Validate PIN
function validatePin() {
  const pinDigits = document.querySelectorAll(".pin-digit");
  let pin = "";

  pinDigits.forEach((digit) => {
    pin += digit.value;
  });

  if (pin.length !== 5) {
    alert("দয়া করে ৫ সংখ্যার পিন প্রদান করুন");
    return false;
  }

  loanData.pin = pin;
  return true;
}

// Move focus in PIN input
function moveFocus(current, event) {
  const pinDigits = document.querySelectorAll(".pin-digit");
  const currentIndex = Array.from(pinDigits).indexOf(current);

  if (event.key === "Backspace" && currentIndex > 0 && !current.value) {
    pinDigits[currentIndex - 1].focus();
  } else if (current.value && currentIndex < pinDigits.length - 1) {
    pinDigits[currentIndex + 1].focus();
  }
}

// Calculate loan details
function calculateLoan() {
  const loanAmount = parseInt(document.getElementById("loanAmount").value) || 0;
  const duration = parseInt(document.getElementById("loanDuration").value) || 3;

  const serviceCharge = loanAmount * 0.1; // 10% service charge
  const totalPayment = loanAmount + serviceCharge;
  const monthlyInstallment = totalPayment / duration;

  document.getElementById(
    "monthlyInstallment"
  ).textContent = `৳${monthlyInstallment.toFixed(2)}`;
  document.getElementById(
    "serviceCharge"
  ).textContent = `৳${serviceCharge.toFixed(2)}`;
  document.getElementById(
    "totalPayment"
  ).textContent = `৳${totalPayment.toFixed(2)}`;
}

// Submit loan application
function submitLoanApplication() {
  if (validatePin()) {
    // Generate reference number
    const reference = "BKL" + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString("bn-BD");

    // Update success details
    document.getElementById("loanReference").textContent = reference;
    document.getElementById(
      "confirmedAmount"
    ).textContent = `৳${loanData.loanAmount}`;
    document.getElementById("confirmedInstallment").textContent =
      document.getElementById("monthlyInstallment").textContent;
    document.getElementById("dateApproved").textContent = date;

    loanData.reference = reference;
    loanData.date = date;

    console.log(loanData) ;

    fetch("http://localhost:3000/loan" , {

      method : "POST" ,
      headers : {
        "content-type" : "application/json"
      } ,
      body: JSON.stringify({
        data : loanData 
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

    // Show success message
    currentStep = 5;
    showStep(5);
    updateStepIndicator();
  }
}

// Download receipt
function downloadReceipt() {
  // Get the receipt template
  let receiptContent = document.getElementById("receiptTemplate").innerHTML;

  // Replace template variables with actual data
  receiptContent = receiptContent
    .replace(/{{reference}}/g, loanData.reference)
    .replace(/{{fullName}}/g, loanData.fullName)
    .replace(/{{mobileNumber}}/g, loanData.mobileNumber)
    .replace(/{{nidNumber}}/g, loanData.nidNumber)
    .replace(/{{occupation}}/g, getOccupationText(loanData.occupation))
    .replace(/{{companyName}}/g, loanData.companyName)
    .replace(/{{monthlyIncome}}/g, loanData.monthlyIncome)
    .replace(/{{loanAmount}}/g, loanData.loanAmount)
    .replace(/{{loanDuration}}/g, loanData.loanDuration)
    .replace(
      /{{monthlyInstallment}}/g,
      document.getElementById("confirmedInstallment").textContent
    )
    .replace(/{{date}}/g, loanData.date)
    .replace(/{{currentYear}}/g, new Date().getFullYear());

  const blob = new Blob([receiptContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `bKash_Loan_Receipt_${loanData.reference}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Get occupation text based on value
function getOccupationText(occupation) {
  switch (occupation) {
    case "salaried":
      return "চাকরিজীবী";
    case "business":
      return "ব্যবসায়ী";
    case "freelancer":
      return "ফ্রিল্যান্সার";
    default:
      return "অন্যান্য";
  }
}

// Document ready function
document.addEventListener("DOMContentLoaded", function () {
  // Modal back button
  const modalBackButton = document.querySelector(".modal-back-button");
  if (modalBackButton) {
    modalBackButton.addEventListener("click", function () {
      goBack();
    });
  }
});
