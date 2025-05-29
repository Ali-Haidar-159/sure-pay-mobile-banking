// Enhanced AI Chat with Full API Integration from index.html, Voice Support and Emoji Picker
class VoiceEnhancedBankingAI {
  constructor() {
    this.language = "bn";
    this.context = [];
    this.conversationHistory = [];
    this.currentSpeech = null;
    this.isVoiceSupported = this.checkVoiceSupport();
    this.initializeVoice();
  }

  checkVoiceSupport() {
    return "speechSynthesis" in window;
  }

  initializeVoice() {
    if (this.isVoiceSupported) {
      // Wait for voices to load
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener("voiceschanged", () => {
          this.setupVoices();
        });
      } else {
        this.setupVoices();
      }
    }
  }

  setupVoices() {
    const allVoices = speechSynthesis.getVoices();

    // Better voice selection for Bangladesh context
    this.voices = {
      bn:
        allVoices.find(
          (voice) =>
            voice.lang.includes("bn-BD") ||
            voice.lang.includes("bn-IN") ||
            voice.lang.includes("hi-IN") ||
            voice.name.toLowerCase().includes("bangla") ||
            voice.name.toLowerCase().includes("bengali") ||
            voice.name.toLowerCase().includes("hindi")
        ) ||
        allVoices.find((voice) => voice.lang.includes("hi")) ||
        allVoices[0],

      en:
        allVoices.find(
          (voice) =>
            voice.lang.includes("en-BD") ||
            voice.lang.includes("en-IN") ||
            voice.lang.includes("en-GB") ||
            (voice.lang.includes("en-US") &&
              (voice.name.toLowerCase().includes("google") ||
                voice.name.toLowerCase().includes("microsoft") ||
                voice.name.toLowerCase().includes("natural") ||
                voice.name.toLowerCase().includes("neural")))
        ) ||
        allVoices.find((voice) => voice.lang.includes("en")) ||
        allVoices[0],
    };

    console.log("Selected voices:", this.voices);
  }

  setLanguage(lang) {
    this.language = lang;
  }

  // Crystal Clear Text-to-Speech for Bangladesh context
  speakText(text, language = null) {
    if (!this.isVoiceSupported) {
      console.warn("Speech synthesis not supported in this browser");
      return false;
    }

    // Stop any current speech
    this.stopSpeaking();

    // Clean and optimize text for speech
    const cleanText = this.cleanTextForSpeech(text);

    if (!cleanText || cleanText.length === 0) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const lang = language || this.language;

    // Set best available voice
    if (this.voices && this.voices[lang]) {
      utterance.voice = this.voices[lang];
    }

    // Optimized settings for crystal clear pronunciation
    if (lang === "bn") {
      // Bengali settings for maximum clarity
      utterance.rate = 0.6; // Much slower for Bengali clarity
      utterance.pitch = 1.2; // Higher pitch sounds more natural in Bengali
      utterance.volume = 1.0; // Full volume
      utterance.lang = "hi-IN"; // Hindi engine works best for Bengali

      // Add pauses for better comprehension
      utterance.text = cleanText.replace(/([।.])/g, "$1 ");
    } else {
      // English settings for Bangladesh context
      utterance.rate = 0.75; // Moderate speed for clear English
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume
      utterance.lang = "en-IN"; // Indian English accent
    }

    // Enhanced event handling
    utterance.onstart = () => {
      console.log(
        `Started speaking in ${lang}:`,
        cleanText.substring(0, 50) + "..."
      );
    };

    utterance.onend = () => {
      console.log("Speech ended successfully");
      this.currentSpeech = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      this.currentSpeech = null;
    };

    // Store reference and speak
    this.currentSpeech = utterance;
    speechSynthesis.speak(utterance);

    return true;
  }

  // Advanced text cleaning for crystal clear Bengali and English pronunciation
  cleanTextForSpeech(text) {
    let cleanText = text
      .replace(/<[^>]*>/g, " ") // Remove HTML tags
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/•/g, "") // Remove bullet points
      .replace(/\*/g, "") // Remove asterisks
      .replace(/\d+\./g, "") // Remove numbering like "1.", "2."
      .trim();

    if (this.language === "bn") {
      // Advanced Bengali text optimization for natural speech
      cleanText = cleanText
        // Banking terms in Bengali pronunciation
        .replace(/SurePay/gi, "সিউর পে")
        .replace(/PIN/gi, "পিন নাম্বার")
        .replace(/OTP/gi, "ওয়ান টাইম পাসওয়ার্ড")
        .replace(/ATM/gi, "এটিএম")
        .replace(/SMS/gi, "মেসেজ")
        .replace(/QR/gi, "কিউআর কোড")
        .replace(/NID/gi, "জাতীয় পরিচয়পত্র")
        .replace(/App/gi, "অ্যাপ্লিকেশন")

        // Numbers in Bengali
        .replace(/১/g, "এক")
        .replace(/২/g, "দুই")
        .replace(/৩/g, "তিন")
        .replace(/৪/g, "চার")
        .replace(/৫/g, "পাঁচ")
        .replace(/৬/g, "ছয়")
        .replace(/৭/g, "সাত")
        .replace(/৮/g, "আট")
        .replace(/৯/g, "নয়")
        .replace(/০/g, "শূন্য")

        // Add natural pauses
        .replace(/।/g, "। ")
        .replace(/:/g, ", ")
        .replace(/;/g, ", ")

        // Clean up extra characters but keep Bengali punctuation
        .replace(/[^\w\s\u0980-\u09FF।,?!\-]/g, " ")
        .replace(/\s+/g, " ");
    } else {
      // Enhanced English text optimization
      cleanText = cleanText
        // Banking terms pronunciation
        .replace(/BDT/gi, "Bangladeshi Taka")
        .replace(/SurePay/gi, "Sure Pay")

        // Clean up punctuation for better flow
        .replace(/[^\w\s,?!\-\.]/g, " ")
        .replace(/\s+/g, " ");
    }

    return cleanText.trim();
  }

  stopSpeaking() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    this.currentSpeech = null;
  }

  // Full API Integration from index.html - Enhanced with SurePay context
  async sendMessage(input) {
    if (!input) {
      return this.language === "bn"
        ? "অনুগ্রহ করে একটি প্রশ্ন লিখুন।"
        : "Please enter a message.";
    }

    try {
      console.log("Sending message to API:", input);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "HTTP-Referer": "https://surepay.vercel.app/",
            "X-Title": "Sure Pay",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "system",
                content: `You are SurePay customer support assistant. SurePay is a mobile financial service in Bangladesh similar to bKash, Nagad, Rocket. 

Key Services:
- Account Opening (একাউন্ট খোলা)
- Send Money (টাকা পাঠান)
- Cash Out (ক্যাশ আউট)
- Mobile Recharge (মোবাইল রিচার্জ)
- Bill Payment (বিল পেমেন্ট)
- Add Money (টাকা যোগ করা)
- Merchant Payment (মার্চেন্ট পেমেন্ট)

Provide helpful, accurate responses about mobile banking services. Always be polite and professional. If user asks in Bengali, respond in Bengali. If user asks in English, respond in English. Use HTML formatting for better readability with <br> for line breaks and <strong> for emphasis.

Example response format:
<strong>Service Name</strong><br><br>
Step by step process:<br>
1. First step<br>
2. Second step<br>
3. Third step<br><br>
<strong>Charges:</strong> Amount details<br>
<strong>Limits:</strong> Transaction limits<br><br>
Need more help? Ask me anything about SurePay services!`,
              },
              {
                role: "user",
                content: input,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} - ${data.message || "Unknown error"}`
        );
      }

      const markdownText =
        data.choices?.[0]?.message?.content || "No response received.";

      // Convert markdown to HTML using marked.js if available, otherwise return as is
      let htmlContent;
      if (typeof marked !== "undefined") {
        htmlContent = marked.parse(markdownText);
      } else {
        // Simple markdown conversion if marked.js is not available
        htmlContent = markdownText
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/\n/g, "<br>");
      }

      // Store in conversation history
      this.conversationHistory.push({ type: "user", message: input });
      this.conversationHistory.push({ type: "bot", message: htmlContent });

      return htmlContent;
    } catch (error) {
      console.error("API Error:", error);

      // Return user-friendly error message based on language
      return this.language === "bn"
        ? `<strong>দুঃখিত! 😔</strong><br><br>
           কিছু সমস্যা হয়েছে। অনুগ্রহ করে:<br>
           • ইন্টারনেট সংযোগ চেক করুন<br>
           • কিছুক্ষণ পর আবার চেষ্টা করুন<br>
           • অথবা আমাদের হটলাইন 16247 এ কল করুন<br><br>
           <strong>Error:</strong> ${error.message}`
        : `<strong>Sorry! 😔</strong><br><br>
           Something went wrong. Please:<br>
           • Check your internet connection<br>
           • Try again in a moment<br>
           • Or call our hotline 16247<br><br>
           <strong>Error:</strong> ${error.message}`;
    }
  }

  // Helper method for initial greeting
  getInitialGreeting() {
    return this.language === "bn"
      ? `<strong>SurePay এ আপনাকে স্বাগতম! 🎉</strong><br><br>
        আমি আপনার SurePay সংক্রান্ত যেকোনো প্রশ্নের উত্তর দিতে পারি।<br><br>
        <strong>আপনি জানতে পারবেন:</strong><br>
        • একাউন্ট খোলার নিয়ম<br>
        • টাকা পাঠানো ও গ্রহণ<br>
        • মোবাইল রিচার্জ ও বিল পেমেন্ট<br>
        • সার্ভিস চার্জ ও লিমিট<br>
        • নিরাপত্তা সংক্রান্ত তথ্য<br><br>
        <strong>কী জানতে চান? 🤔</strong>`
      : `<strong>Welcome to SurePay! 🎉</strong><br><br>
        I can help you with any SurePay related questions.<br><br>
        <strong>You can learn about:</strong><br>
        • Account opening process<br>
        • Send & receive money<br>
        • Mobile recharge & bill payment<br>
        • Service charges & limits<br>
        • Security information<br><br>
        <strong>What would you like to know? 🤔</strong>`;
  }
}

// Emoji data for professional banking chat - 100 emojis per category
const emojiData = {
  commonly_used: [
    "😊",
    "👍",
    "👎",
    "❤️",
    "😢",
    "😮",
    "😄",
    "🙏",
    "😀",
    "🤔",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "🤗",
    "🤩",
    "🥳",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🤲",
    "👐",
    "🙌",
    "👏",
    "🤝",
    "👍",
  ],
  banking: [
    "💰",
    "💳",
    "💵",
    "💴",
    "💶",
    "💷",
    "🏦",
    "📱",
    "💻",
    "📊",
    "📈",
    "📉",
    "💸",
    "💲",
    "🪙",
    "💱",
    "🏧",
    "🔢",
    "💹",
    "📋",
    "📑",
    "📄",
    "📃",
    "🧾",
    "📇",
    "🗂️",
    "📂",
    "📁",
    "🗄️",
    "🗃️",
    "📌",
    "📍",
    "📎",
    "🖇️",
    "📏",
    "📐",
    "✂️",
    "🖊️",
    "🖋️",
    "✒️",
    "🖌️",
    "🖍️",
    "📝",
    "✏️",
    "🔍",
    "🔎",
    "🔏",
    "🔐",
    "🔒",
    "🔓",
    "🔑",
    "🗝️",
    "🔨",
    "⚒️",
    "🛠️",
    "⚙️",
    "🔧",
    "🔩",
    "⚖️",
    "🔗",
    "⛓️",
    "🧰",
    "🧲",
    "⚡",
    "🔋",
    "🔌",
    "💡",
    "🔦",
    "🕯️",
    "🪔",
    "🔥",
    "💥",
    "💫",
    "⭐",
    "🌟",
    "✨",
    "⚡",
    "☄️",
    "💥",
    "🔥",
    "🌈",
    "☀️",
    "🌤️",
    "⛅",
    "🌦️",
    "🌧️",
    "⛈️",
    "🌩️",
    "🌨️",
    "☁️",
    "💨",
    "💧",
    "💦",
    "☔",
    "☂️",
    "🌊",
    "🌀",
    "🌪️",
    "🌫️",
    "🌁",
  ],
  expressions: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "☺️",
    "😚",
    "😙",
    "🥲",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "🥸",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "😦",
    "😧",
    "😨",
    "😰",
    "😥",
    "😢",
    "😭",
    "😱",
    "😖",
    "😣",
    "😞",
    "😓",
    "😩",
    "😫",
    "🥱",
    "😤",
    "😡",
    "😠",
    "🤬",
    "😈",
    "👿",
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👹",
    "👺",
    "👻",
  ],
  gestures: [
    "👍",
    "👎",
    "👌",
    "🤌",
    "🤏",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💅",
    "🤳",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "👂",
    "🦻",
    "👃",
    "🧠",
    "🫀",
    "🫁",
    "🦷",
    "🦴",
    "👀",
    "👁️",
    "👅",
    "👄",
    "💋",
    "🩸",
    "👶",
    "🧒",
    "👦",
    "👧",
    "🧑",
    "👱",
    "👨",
    "🧔",
    "👨‍🦰",
    "👨‍🦱",
    "👨‍🦳",
    "👨‍🦲",
    "👩",
    "👩‍🦰",
    "👩‍🦱",
    "👩‍🦳",
    "👩‍🦲",
    "👱‍♀️",
    "👱‍♂️",
    "🧓",
    "👴",
    "👵",
    "🙍",
    "🙍‍♂️",
    "🙍‍♀️",
    "🙎",
    "🙎‍♂️",
    "🙎‍♀️",
    "🙅",
    "🙅‍♂️",
    "🙅‍♀️",
    "🙆",
    "🙆‍♂️",
    "🙆‍♀️",
    "💁",
    "💁‍♂️",
    "💁‍♀️",
    "🙋",
    "🙋‍♂️",
    "🙋‍♀️",
    "🧏",
    "🧏‍♂️",
    "🧏‍♀️",
    "🙇",
    "🙇‍♂️",
    "🙇‍♀️",
    "🤦",
    "🤦‍♂️",
    "🤦‍♀️",
    "🤷",
    "🤷‍♂️",
    "🤷‍♀️",
  ],
  symbols: [
    "✅",
    "❌",
    "⭐",
    "🔥",
    "💯",
    "❓",
    "❗",
    "⚠️",
    "🚀",
    "💡",
    "🎯",
    "🔔",
    "📢",
    "📣",
    "📯",
    "🔊",
    "🔉",
    "🔈",
    "🔇",
    "📱",
    "📲",
    "☎️",
    "📞",
    "📟",
    "📠",
    "🔋",
    "🔌",
    "💻",
    "🖥️",
    "🖨️",
    "⌨️",
    "🖱️",
    "🖲️",
    "💽",
    "💾",
    "💿",
    "📀",
    "🧮",
    "🎥",
    "🎞️",
    "📽️",
    "🎬",
    "📺",
    "📷",
    "📸",
    "📹",
    "📼",
    "🔍",
    "🔎",
    "🕯️",
    "💡",
    "🔦",
    "🏮",
    "🪔",
    "📔",
    "📕",
    "📖",
    "📗",
    "📘",
    "📙",
    "📚",
    "📓",
    "📒",
    "📃",
    "📜",
    "📄",
    "📰",
    "🗞️",
    "📑",
    "🔖",
    "🏷️",
    "💰",
    "🪙",
    "💴",
    "💵",
    "💶",
    "💷",
    "💸",
    "💳",
    "🧾",
    "💹",
    "✉️",
    "📧",
    "📨",
    "📩",
    "📤",
    "📥",
    "📦",
    "📫",
    "📪",
    "📬",
    "📭",
    "📮",
    "🗳️",
    "✏️",
    "✒️",
    "🖋️",
    "🖊️",
    "🖌️",
    "🖍️",
  ],
};

// Enhanced Chat UI Controller with Full API Integration, Voice Support and Emoji Picker
document.addEventListener("DOMContentLoaded", function () {
  // Initialize voice-enhanced AI
  const bankingAI = new VoiceEnhancedBankingAI();

  // Chat elements
  const chatButton = document.querySelector(".live-chat");
  const chatPopup = document.querySelector(".chat-popup");

  if (!chatButton || !chatPopup) {
    console.error("Chat elements not found!");
    return;
  }

  let isOpen = false;
  let emojiPickerOpen = false;

  // Show chat popup from bottom
  chatButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen) {
      // Hide chat button
      chatButton.classList.add("hidden");

      // Show chat with animation from very bottom
      chatPopup.style.display = "block";
      // Force browser to recalculate styles
      void chatPopup.offsetWidth;
      // Add show class for animation
      chatPopup.classList.add("show");
      isOpen = true;

      // Initialize chat if first time
      if (!chatPopup.dataset.initialized) {
        initializeChat();
        chatPopup.dataset.initialized = "true";
      }
    }
  });

  // Close chat
  const closeBtn = chatPopup.querySelector(".close-chat");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      // Stop any playing speech
      bankingAI.stopSpeaking();

      chatPopup.classList.remove("show");
      // Wait for animation to complete
      setTimeout(() => {
        chatPopup.style.display = "none";
        // Show chat button again
        chatButton.classList.remove("hidden");
      }, 500);
      isOpen = false;
    });
  }

  // Initialize chat
  function initializeChat() {
    const chatBody = chatPopup.querySelector(".chat-body");
    if (!chatBody) return;

    // Clear existing messages
    chatBody.innerHTML = "";

    // Add welcome messages
    addMessage("bot", "Good Morning! 🌅");
    addMessage("bot", "Welcome to SurePay Customer Service 💙");

    // Language selection
    const langDiv = document.createElement("div");
    langDiv.className = "chat-message bot-message";
    langDiv.innerHTML = `
          <div class="message-bubble">
              <strong>Please select your preferred language</strong><br>
              <strong>অনুগ্রহ করে আপনার পছন্দের ভাষা নির্বাচন করুন</strong>
              <div class="language-options">
                  <button class="lang-btn" data-lang="en">🇺🇸 English</button>
                  <button class="lang-btn selected" data-lang="bn">🇧🇩 বাংলা</button>
              </div>
          </div>
          <div class="message-time">${getCurrentTime()}</div>
      `;
    chatBody.appendChild(langDiv);

    // Language button handlers
    const langButtons = langDiv.querySelectorAll(".lang-btn");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        bankingAI.setLanguage(this.dataset.lang);
        langButtons.forEach((b) => b.classList.remove("selected"));
        this.classList.add("selected");

        addMessage("user", this.textContent);

        setTimeout(() => {
          const greeting = bankingAI.getInitialGreeting();
          addMessage("bot", greeting);
          showQuickReplies();
        }, 500);
      });
    });
  }

  // Show quick replies
  function showQuickReplies() {
    const chatBody = chatPopup.querySelector(".chat-body");
    if (!chatBody) return;

    // Remove existing quick replies
    const existingReplies = chatBody.querySelector(".quick-replies");
    if (existingReplies) {
      existingReplies.remove();
    }

    const quickOptions =
      bankingAI.language === "bn"
        ? [
            "একাউন্ট খোলা কিভাবে?",
            "টাকা পাঠাতে চাই",
            "ক্যাশ আউট করব",
            "মোবাইল রিচার্জ",
            "বিল পেমেন্ট",
            "টাকা যোগ করা",
            "চার্জ কত?",
            "সাহায্য চাই",
          ]
        : [
            "How to open account?",
            "Send money",
            "Cash out",
            "Mobile recharge",
            "Bill payment",
            "Add money",
            "What are charges?",
            "Need help",
          ];

    const replyDiv = document.createElement("div");
    replyDiv.className = "quick-replies";

    quickOptions.forEach((option) => {
      const button = document.createElement("button");
      button.className = "quick-reply-btn";
      button.textContent = option;
      button.addEventListener("click", () => {
        const chatInput = chatPopup.querySelector(".chat-input");
        if (chatInput) {
          chatInput.value = option;
          sendMessage();
        }
      });
      replyDiv.appendChild(button);
    });

    chatBody.appendChild(replyDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Get current time
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  }

  // Enhanced Add message function with voice support
  function addMessage(type, text) {
    const chatBody = chatPopup.querySelector(".chat-body");
    if (!chatBody) return;

    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${type}-message`;

    // Create voice button for bot messages
    const voiceButton = type === "bot" ? createVoiceButton(text) : "";

    messageDiv.innerHTML = `
          <div class="message-bubble">
              ${text}
              ${voiceButton}
          </div>
          <div class="message-time">${getCurrentTime()}</div>
      `;

    chatBody.appendChild(messageDiv);

    // Add voice button event listener for bot messages
    if (type === "bot") {
      const voiceBtn = messageDiv.querySelector(".voice-btn");
      if (voiceBtn) {
        voiceBtn.addEventListener("click", function () {
          handleVoiceClick(this, text);
        });
      }
    }

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Create voice button
  function createVoiceButton(text) {
    if (!bankingAI.isVoiceSupported) return "";

    return `
      <button class="voice-btn" title="শুনুন / Listen" aria-label="Read message aloud">
        <i class="fas fa-volume-up"></i>
      </button>
    `;
  }

  // Handle voice button click with improved feedback
  function handleVoiceClick(button, text) {
    const icon = button.querySelector("i");

    if (speechSynthesis.speaking) {
      // Stop speaking
      bankingAI.stopSpeaking();
      icon.className = "fas fa-volume-up";
      button.classList.remove("speaking");
    } else {
      // Start speaking
      icon.className = "fas fa-stop";
      button.classList.add("speaking");

      const success = bankingAI.speakText(text);

      if (success) {
        // Listen for speech end to reset button
        const checkSpeechEnd = setInterval(() => {
          if (!speechSynthesis.speaking) {
            icon.className = "fas fa-volume-up";
            button.classList.remove("speaking");
            clearInterval(checkSpeechEnd);
          }
        }, 100);
      } else {
        // Reset if speech failed
        icon.className = "fas fa-volume-up";
        button.classList.remove("speaking");
      }
    }
  }

  // Professional Emoji Picker
  function createEmojiPicker() {
    const emojiPicker = document.createElement("div");
    emojiPicker.className = "emoji-picker";
    emojiPicker.id = "emojiPicker";

    let emojiHTML = '<div class="emoji-picker-header">Choose Emoji 😊</div>';

    // Create tabs
    emojiHTML += `
     <div class="emoji-tabs">
       <button class="emoji-tab active" data-category="commonly_used" title="Commonly Used">😊</button>
       <button class="emoji-tab" data-category="banking" title="Banking">💰</button>
       <button class="emoji-tab" data-category="expressions" title="Expressions">😀</button>
       <button class="emoji-tab" data-category="gestures" title="Gestures">👍</button>
       <button class="emoji-tab" data-category="symbols" title="Symbols">✅</button>
     </div>
   `;

    // Create emoji grid
    emojiHTML += '<div class="emoji-grid" id="emojiGrid">';
    emojiData.commonly_used.forEach((emoji) => {
      emojiHTML += `<button class="emoji-item" data-emoji="${emoji}" title="${emoji}">${emoji}</button>`;
    });
    emojiHTML += "</div>";

    emojiPicker.innerHTML = emojiHTML;
    return emojiPicker;
  }

  // Show emoji picker
  function showEmojiPicker() {
    if (emojiPickerOpen) {
      hideEmojiPicker();
      return;
    }

    const existingPicker = document.getElementById("emojiPicker");
    if (existingPicker) {
      existingPicker.remove();
    }

    const emojiPicker = createEmojiPicker();
    chatPopup.querySelector(".chat-footer").appendChild(emojiPicker);

    // Add event listeners
    const tabs = emojiPicker.querySelectorAll(".emoji-tab");
    const emojiGrid = emojiPicker.querySelector("#emojiGrid");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        tabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const category = this.dataset.category;
        updateEmojiGrid(category, emojiGrid);
      });
    });

    // Add emoji click listeners
    addEmojiClickListeners(emojiGrid);

    emojiPickerOpen = true;
  }

  // Update emoji grid based on category
  function updateEmojiGrid(category, grid) {
    let emojiHTML = "";
    emojiData[category].forEach((emoji) => {
      emojiHTML += `<button class="emoji-item" data-emoji="${emoji}" title="${emoji}">${emoji}</button>`;
    });
    grid.innerHTML = emojiHTML;
    addEmojiClickListeners(grid);
  }

  // Add click listeners to emoji items
  function addEmojiClickListeners(grid) {
    const emojiItems = grid.querySelectorAll(".emoji-item");
    emojiItems.forEach((item) => {
      item.addEventListener("click", function () {
        const emoji = this.dataset.emoji;
        insertEmojiToInput(emoji);
        hideEmojiPicker();
      });
    });
  }

  // Insert emoji to input field
  function insertEmojiToInput(emoji) {
    const chatInput = chatPopup.querySelector(".chat-input");
    if (chatInput) {
      const currentValue = chatInput.value;
      const cursorPosition = chatInput.selectionStart || currentValue.length;
      const newValue =
        currentValue.slice(0, cursorPosition) +
        emoji +
        currentValue.slice(cursorPosition);
      chatInput.value = newValue;
      chatInput.focus();

      // Set cursor position after emoji
      const newCursorPosition = cursorPosition + emoji.length;
      chatInput.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }

  // Hide emoji picker
  function hideEmojiPicker() {
    const emojiPicker = document.getElementById("emojiPicker");
    if (emojiPicker) {
      emojiPicker.remove();
    }
    emojiPickerOpen = false;
  }

  // Send message with Full API Integration from index.html
  const chatInput = chatPopup.querySelector(".chat-input");
  const sendBtn = chatPopup.querySelector(".send-btn");

  async function sendMessage() {
    if (!chatInput || !chatInput.value.trim()) {
      // Show warning for empty message
      const warningMsg =
        bankingAI.language === "bn"
          ? "অনুগ্রহ করে একটি প্রশ্ন লিখুন 📝"
          : "Please enter a message 📝";

      // Briefly show warning in input placeholder
      const originalPlaceholder = chatInput.placeholder;
      chatInput.placeholder = warningMsg;
      chatInput.style.borderColor = "#e74c3c";

      setTimeout(() => {
        chatInput.placeholder = originalPlaceholder;
        chatInput.style.borderColor = "";
      }, 2000);

      return;
    }

    const message = chatInput.value.trim();
    addMessage("user", message);
    chatInput.value = "";

    // Remove previous quick replies
    const quickReplies = chatPopup.querySelector(".quick-replies");
    if (quickReplies) {
      quickReplies.remove();
    }

    // Show typing indicator
    showTypingIndicator();

    try {
      // Use the full API integration from index.html
      const response = await bankingAI.sendMessage(message);

      // Remove typing indicator
      removeTypingIndicator();

      // Add bot response with HTML content
      addMessage("bot", response);

      // Show quick replies after bot response
      setTimeout(() => showQuickReplies(), 800);
    } catch (error) {
      console.error("Send message error:", error);
      removeTypingIndicator();

      const errorMessage =
        bankingAI.language === "bn"
          ? `<strong>দুঃখিত! 😔</strong><br><br>
          কিছু সমস্যা হয়েছে। অনুগ্রহ করে:<br>
          • ইন্টারনেট সংযোগ চেক করুন<br>
          • কিছুক্ষণ পর আবার চেষ্টা করুন<br>
          • অথবা আমাদের হটলাইন <strong>16247</strong> এ কল করুন<br><br>
          <em>আমরা শীঘ্রই ফিরে আসব! 🔄</em>`
          : `<strong>Sorry! 😔</strong><br><br>
          Something went wrong. Please:<br>
          • Check your internet connection<br>
          • Try again in a moment<br>
          • Or call our hotline <strong>16247</strong><br><br>
          <em>We'll be back soon! 🔄</em>`;

      addMessage("bot", errorMessage);
      setTimeout(() => showQuickReplies(), 500);
    }
  }

  // Enhanced typing indicator
  function showTypingIndicator() {
    const chatBody = chatPopup.querySelector(".chat-body");
    if (!chatBody) return;

    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-message bot-message";
    typingDiv.id = "typing-indicator";
    typingDiv.innerHTML = `
         <div class="message-bubble">
             <div class="typing-indicator">
                 <span></span>
                 <span></span>
                 <span></span>
             </div>
             <small style="color: #666; font-size: 11px; margin-left: 8px;">
               ${bankingAI.language === "bn" ? "টাইপ করছি..." : "Typing..."}
             </small>
         </div>
     `;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Event listeners for send functionality
  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  if (chatInput) {
    // Send on Enter key
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Hide emoji picker when focusing on input
    chatInput.addEventListener("focus", function () {
      if (emojiPickerOpen) {
        hideEmojiPicker();
      }
    });

    // Auto-resize input based on content (optional enhancement)
    chatInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = Math.min(this.scrollHeight, 120) + "px";
    });
  }

  // Emoji button functionality
  const emojiBtn = chatPopup.querySelector(".emoji-btn");
  if (emojiBtn) {
    emojiBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      showEmojiPicker();
    });
  }

  // Hide emoji picker when clicking outside
  document.addEventListener("click", function (e) {
    if (
      emojiPickerOpen &&
      !e.target.closest("#emojiPicker") &&
      !e.target.closest(".emoji-btn")
    ) {
      hideEmojiPicker();
    }
  });

  // Minimize chat functionality (optional)
  const minimizeBtn = chatPopup.querySelector(".minimize-chat");
  if (minimizeBtn) {
    minimizeBtn.addEventListener("click", function () {
      chatPopup.classList.toggle("minimized");
      const icon = this.querySelector("i");
      if (chatPopup.classList.contains("minimized")) {
        icon.className = "fas fa-plus";
      } else {
        icon.className = "fas fa-minus";
      }
    });
  }

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + Enter to send message
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && isOpen) {
      sendMessage();
    }

    // Escape to close chat
    if (e.key === "Escape" && isOpen) {
      closeBtn.click();
    }
  });

  // Console welcome message for developers
  console.log(`
   🎉 SurePay Chat System Loaded Successfully!
   
   ✅ Features Active:
   • Full API Integration with OpenRouter AI
   • Voice Support (Text-to-Speech)
   • Professional Emoji Picker
   • Bilingual Support (Bengali + English)
   • Real-time Chat Interface
   • Mobile Responsive Design
   
   🚀 Ready to assist customers!
 `);
});
