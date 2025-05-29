// বিকাশ ওয়েবসাইট টাইমলাইন জাভাস্ক্রিপ্ট
document.addEventListener("DOMContentLoaded", function () {
  initializeTimeline();
  handleScrollEffects();
});

// টাইমলাইন ইনিশিয়ালাইজেশন
function initializeTimeline() {
  const timelineYears = document.querySelectorAll(".timeline-year");
  const timelineCards = document.querySelectorAll(".timeline-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const yearIndicator = document.querySelector(".year-indicator");
  const timelineTrack = document.querySelector(".timeline-track");

  let currentIndex = 0;
  const totalYears = timelineYears.length;
  let isAnimating = false; // অ্যানিমেশন চলছে কিনা
  let scrollTimeout;

  // পজিশন সেট করার ফাংশন
  function setYearPositions() {
    timelineYears.forEach((year, index) => {
      const percentage = (index / (totalYears - 1)) * 90 + 5;
      year.style.left = `${percentage}%`;
    });
  }

  // ইনিশিয়ালি পজিশন সেট করুন
  setYearPositions();

  // সব ইয়ার বাটন থেকে সক্রিয় ক্লাস সরানো এবং শুধু প্রথম বছরের বাটনকে সক্রিয় করা
  timelineYears.forEach((year, index) => {
    if (index === 0) {
      year.classList.add("active");
    } else {
      year.classList.remove("active");
    }

    // ইয়ারগুলো ক্লিক করার ফাংশনালিটি
    year.addEventListener("click", () => {
      setActiveYear(index);
    });

    // শুধুমাত্র সার্কেল গুলোতে মাউস হুইল নেভিগেশন
    year.addEventListener("wheel", (e) => {
      e.preventDefault(); // পেজ স্ক্রল প্রিভেন্ট করা

      // দ্রুত স্ক্রল প্রিভেন্ট করা
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        if (isAnimating) return;

        if (e.deltaY > 0) {
          // নিচে স্ক্রল - পরবর্তী
          navigateNext();
        } else {
          // উপরে স্ক্রল - পূর্ববর্তী
          navigatePrevious();
        }
      }, 100);
    });
  });

  // টাইমলাইন কার্ডগুলোতে মাউস হুইল নেভিগেশন
  timelineCards.forEach((card) => {
    card.addEventListener("wheel", (e) => {
      e.preventDefault(); // পেজ স্ক্রল প্রিভেন্ট করা

      // দ্রুত স্ক্রল প্রিভেন্ট করা
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        if (isAnimating) return;

        if (e.deltaY > 0) {
          // নিচে স্ক্রল - পরবর্তী
          navigateNext();
        } else {
          // উপরে স্ক্রল - পূর্ববর্তী
          navigatePrevious();
        }
      }, 100);
    });
  });

  // সব কার্ড থেকে সক্রিয় ক্লাস সরানো এবং শুধু প্রথম কার্ডকে সক্রিয় করা
  timelineCards.forEach((card, index) => {
    if (index === 0) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // পূর্ববর্তী বাটন ক্লিক
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      navigatePrevious();
    });
  }

  // পরবর্তী বাটন ক্লিক
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      navigateNext();
    });
  }

  // পূর্ববর্তী ফাংশন
  function navigatePrevious() {
    if (isAnimating) return;

    if (currentIndex > 0) {
      setActiveYear(currentIndex - 1);
    } else {
      // ২০১১ থেকে ২০২৩ এ লুপ করা (সার্কুলার নেভিগেশন)
      setActiveYear(totalYears - 1);
    }
  }

  // পরবর্তী ফাংশন
  function navigateNext() {
    if (isAnimating) return;

    if (currentIndex < timelineYears.length - 1) {
      setActiveYear(currentIndex + 1);
    } else {
      // ২০২৩ থেকে ২০১১ এ লুপ করা (সার্কুলার নেভিগেশন)
      setActiveYear(0);
    }
  }

  // কীবোর্ড নেভিগেশন
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigatePrevious();
    } else if (e.key === "ArrowRight") {
      navigateNext();
    }
  });

  // টাচ ইভেন্ট হ্যান্ডলিং
  let touchStartX = 0;
  let touchEndX = 0;

  const timelineContainer = document.querySelector(".timeline");

  if (timelineContainer) {
    timelineContainer.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      false
    );

    timelineContainer.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      false
    );

    function handleSwipe() {
      if (isAnimating) return;

      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        // বাম দিকে সোয়াইপ - পরবর্তী
        navigateNext();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // ডান দিকে সোয়াইপ - পূর্ববর্তী
        navigatePrevious();
      }
    }
  }

  // 3D কার্ড লেআউট সেট আপ
  function setupCardPositions() {
    const visibleCards = 5; // কত টি কার্ড একসাথে দেখানো হবে
    const maxOffset = 2; // কার্ড এর সর্বাধিক অফসেট (center থেকে কত ইন্ডেক্স দূরে)

    timelineCards.forEach((card, index) => {
      // সব কার্ড প্রথমে হাইড করুন
      card.style.display = "none";
    });

    // কেবল ভিজিবল কার্ডগুলো দেখান
    for (
      let i = Math.max(0, currentIndex - maxOffset);
      i <= Math.min(totalYears - 1, currentIndex + maxOffset);
      i++
    ) {
      if (timelineCards[i]) {
        timelineCards[i].style.display = "block";

        // পজিশন এবং সাইজ সেট করুন
        const offset = i - currentIndex;
        const xOffset = offset * 100; // পার্সেন্ট
        const zOffset = Math.abs(offset) * -50; // Z-ইন্ডেক্স
        const scale = 1 - Math.abs(offset) * 0.15; // স্কেল ফ্যাক্টর
        const yOffset = Math.abs(offset) * 3; // কাছের কার্ড নিচে থাকবে

        timelineCards[
          i
        ].style.transform = `translate(${xOffset}%, ${yOffset}%) scale(${scale}) translateZ(${zOffset}px)`;
        timelineCards[i].style.zIndex = 10 - Math.abs(offset);

        // ব্লার সেট করুন
        if (offset === 0) {
          timelineCards[i].style.filter = "blur(0px)";
          timelineCards[i].style.opacity = "1";
        } else {
          const blurAmount = Math.abs(offset) * 1.5;
          timelineCards[i].style.filter = `blur(${blurAmount}px)`;
          timelineCards[i].style.opacity = `${1 - Math.abs(offset) * 0.2}`;
        }
      }
    }
  }

  // সক্রিয় বছর সেট করার ফাংশন
  function setActiveYear(index) {
    isAnimating = true;

    const previousIndex = currentIndex;
    currentIndex = index;

    // কালার জেনারেট
    const hue = (index / totalYears) * 360; // 0-360 রঙের চক্র
    const lightness = 50 + (index / totalYears) * 10; // 50-60% লাইটনেস
    const timelineColor = `hsl(${hue}, 70%, ${lightness}%)`;

    // ইয়ারগুলো আপডেট করুন
    timelineYears.forEach((year, i) => {
      if (i === index) {
        year.classList.add("active");
        // সক্রিয় সার্কেলের রঙ আপডেট করুন
        year.style.backgroundColor = timelineColor;
        year.style.borderColor = timelineColor;
      } else {
        year.classList.remove("active");
        // সার্কেলগুলো আপডেট করুন (সক্রিয় না হলে)
        if (i <= index) {
          // সম্পন্ন হয়ে গেছে
          year.style.backgroundColor = timelineColor;
          year.style.borderColor = timelineColor;
        } else {
          // সম্পন্ন হয়নি
          year.style.backgroundColor = "var(--white)";
          year.style.borderColor = "var(--primary-color)";
        }
      }
    });

    // স্ট্রেইট লাইন পজিশন আপডেট করুন
    const straightLine = document.querySelector(".timeline-straight-line");
    if (straightLine) {
      const selectedYear = timelineYears[index];
      const yearRect = selectedYear.getBoundingClientRect();
      const trackRect = document
        .querySelector(".timeline-track")
        .getBoundingClientRect();

      const leftPosition = (index / (totalYears - 1)) * 90 + 5;
      straightLine.style.left = `${leftPosition}%`;

      // সার্কুলার টাইমলাইন ট্র্যাক টাইটেল জেনারেট
      updateTimelineProgress(index, totalYears, timelineColor);

      // বর্তমান বছর টেক্সট আপডেট করুন
      if (yearIndicator) {
        yearIndicator.textContent = selectedYear.getAttribute("data-year");

        // নতুন রঙ লাগান আলাদা করে
        yearIndicator.style.backgroundColor = timelineColor;
      }
    }

    // কার্ডগুলো আপডেট করুন
    timelineCards.forEach((card, i) => {
      if (i === index) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    // 3D কার্ড লেআউট আপডেট করুন
    setupCardPositions();

    // পূর্ববর্তী/পরবর্তী বাটন এনাবল/ডিজেবল করা
    if (prevBtn) {
      // সার্কুলার নেভিগেশনে বাটন সবসময় এনাবল
      prevBtn.removeAttribute("disabled");
      prevBtn.classList.remove("disabled");
    }

    if (nextBtn) {
      // সার্কুলার নেভিগেশনে বাটন সবসময় এনাবল
      nextBtn.removeAttribute("disabled");
      nextBtn.classList.remove("disabled");
    }

    // অ্যানিমেশন শেষ হওয়ার সময় নির্ধারণ
    setTimeout(() => {
      isAnimating = false;
    }, 500); // অ্যানিমেশনের সময় অনুযায়ী সেট করুন
  }

  // টাইমলাইন প্রগ্রেস আপডেট
  function updateTimelineProgress(currentIndex, totalItems, color) {
    const track = document.querySelector(".timeline-track");
    if (!track) return;

    // টাইমলাইন ট্র্যাকে প্রগ্রেস স্টাইল অ্যাপ্লাই করুন
    const progressPercent = ((currentIndex + 1) / totalItems) * 100;

    // প্রগ্রেসার ট্র্যাক আগে থাকলে রিমুভ করুন
    const existingProgress = track.querySelector(".timeline-progress");
    if (existingProgress) {
      existingProgress.remove();
    }

    // নতুন প্রগ্রেস এলিমেন্ট তৈরি করুন
    const progressElement = document.createElement("div");
    progressElement.classList.add("timeline-progress");
    progressElement.style.position = "absolute";
    progressElement.style.height = "4px";
    progressElement.style.width = `${progressPercent}%`;
    progressElement.style.backgroundColor = color || "var(--primary-color)";
    progressElement.style.top = "50%";
    progressElement.style.transform = "translateY(-50%)";
    progressElement.style.left = "5%";
    progressElement.style.zIndex = "1";
    progressElement.style.transition = "all 0.5s ease";
    progressElement.style.borderRadius = "2px";

    // ট্র্যাকে যোগ করুন
    track.appendChild(progressElement);
  }

  // ইনিশিয়ালাইজেশনে একবার সেটআপ করুন
  setupCardPositions();
  updateTimelineProgress(0, totalYears, "var(--primary-color)");

  // উইন্ডো রিসাইজ হলে পজিশন আপডেট করুন
  window.addEventListener("resize", () => {
    setYearPositions();
    setupCardPositions();
    updateTimelineProgress(currentIndex, totalYears);
  });
}

// স্ক্রল ইফেক্ট
function handleScrollEffects() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      if (header) header.classList.add("scrolled");
    } else {
      if (header) header.classList.remove("scrolled");
    }
  });

  // সেকশন এনিমেশন
  const animatedSections = document.querySelectorAll(
    ".history-section, .story-section, .partners-section"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedSections.forEach((section) => {
      section.classList.add("section-hidden");
      observer.observe(section);
    });
  } else {
    // ফলব্যাক ফর পুরাতন ব্রাউজার
    animatedSections.forEach((section) => {
      section.classList.add("animate");
    });
  }
}

// ইমেজ লেজি লোডিং
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img[data-src]");

  if (lazyImages.length === 0) return;

  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      lazyImageObserver.observe(img);
    });
  } else {
    // ফলব্যাক ফর পুরাতন ব্রাউজার
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
});

// স্মুথ স্ক্রলিং ফর অ্যাঙ্কর লিংকস
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// লগইন ফাংশনালিটি
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof showPopup === "function") {
        showPopup("loginPopup");
      }
    });
  }
});
