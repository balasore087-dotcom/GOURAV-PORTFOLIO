// ==========================================
// 1. REGISTER GSAP PLUGINS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 2. CINEMATIC INTRO PRELOADER & HERO REVEAL
// ==========================================
const mainTimeline = gsap.timeline();

// Step A: Full Screen Intro Text Reveal
mainTimeline
  .from(".intro-small", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out"
  })
  .from(".intro-name", {
    scale: 0.7,
    opacity: 0,
    duration: 1,
    ease: "back.out(1.7)"
  }, "-=0.3")
  .from(".intro-sub", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out"
  }, "-=0.4")

  // Step B: Curtain Slide Up
  .to("#intro-screen", {
    y: "-100%",
    duration: 1.1,
    delay: 0.5,
    ease: "power4.inOut",
    onComplete: () => {
      const intro = document.getElementById("intro-screen");
      if (intro) intro.style.display = "none";
    }
  })

  // Step C: Hero Section Content Smooth Entrance
  .from(".hero-content > *", {
    y: 35,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out"
  }, "-=0.3")
  .from(".hero-image-wrapper", {
    scale: 0.9,
    opacity: 0,
    duration: 1.1,
    ease: "power2.out"
  }, "-=0.8");

// ==========================================
// 3. MOUSE MOVE 3D PARALLAX EFFECT FOR PHOTO
// ==========================================
const heroSection = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const glowSphere = document.querySelector(".glow-sphere");

if (heroSection && heroImage) {
  heroSection.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;

    const rotateX = -deltaY * 16;
    const rotateY = deltaX * 16;
    const moveX = deltaX * 22;
    const moveY = deltaY * 22;

    gsap.to(heroImage, {
      x: moveX,
      y: moveY,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.6,
      ease: "power2.out"
    });

    if (glowSphere) {
      gsap.to(glowSphere, {
        x: -moveX * 0.7,
        y: -moveY * 0.7,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });

  heroSection.addEventListener("mouseleave", () => {
    gsap.to([heroImage, glowSphere], {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 1.2,
      ease: "power3.out"
    });
  });
}

// ==========================================
// 4. ROLES & SKILLS SECTION ENTRANCE
// ==========================================
gsap.from(".role-card", {
  scrollTrigger: {
    trigger: ".skills",
    start: "top 78%",
    toggleActions: "play none none reverse"
  },
  y: 40,
  opacity: 0,
  duration: 0.75,
  stagger: 0.15,
  ease: "power3.out"
});

gsap.from(".skill-card", {
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out"
});

// ==========================================
// 5. TIMELINE (EDUCATION) CARDS STAGGERED REVEAL
// ==========================================
gsap.from(".timeline-item", {
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  x: -40,
  opacity: 0,
  duration: 0.85,
  stagger: 0.22,
  ease: "power3.out"
});

// =========================================================
// 6. TAP/CLICK TO EXPAND CAMPUS IMAGES IN TIMELINE (FIXED)
// =========================================================
const eduCards = document.querySelectorAll(".interactive-edu-card");

eduCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    const isAlreadyOpen = this.classList.contains("active");

    // Close all other cards first
    eduCards.forEach((c) => {
      c.classList.remove("active");
      const hint = c.querySelector(".tap-hint");
      if (hint) hint.textContent = "Tap to view photo ▾";
    });

    // Toggle selected card
    if (!isAlreadyOpen) {
      this.classList.add("active");
      const hint = this.querySelector(".tap-hint");
      if (hint) hint.textContent = "Tap to hide photo ▴";
    }

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
});

// ==========================================
// 7. HOBBIES CARDS STAGGERED ENTRANCE
// ==========================================
gsap.from(".hobby-card", {
  scrollTrigger: {
    trigger: ".hobbies",
    start: "top 78%",
    toggleActions: "play none none reverse"
  },
  y: 45,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out"
});

// ==========================================
// 8. ALL OTHER SECTIONS REVEAL ON SCROLL
// ==========================================
gsap.utils.toArray(".section-container:not(.skills):not(.education):not(.hobbies)").forEach(section => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 45,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
  });
});

// =========================================================
// 9. GEMINI AI CONNECTED CHATBOT LOGIC
// =========================================================
const chatbotWidget = document.getElementById("chatbot-widget");
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");

// 🔑 Aapki Gemini API Key:
const GEMINI_API_KEY = "AQ.Ab8RN6IGy48JoYkfniWN27_cN5at4BZdyfaPp-VJJWrFQBJ_Sw";

// Portfolio Knowledge Base Prompt for Gemini
const SYSTEM_PROMPT = `
You are the official AI Assistant for Gourav Das on his web portfolio.
Answer warmly, smartly, and concisely (2 to 4 sentences maximum) in Hindi/Hinglish or English matching the user.
Here is the true factual data about Gourav Das:
1. Profession: Full Stack Web Developer & Software Engineer.
2. Education:
   • B.Tech: KMBB College of Engineering & Technology, Daleiput, Khordha (7.5 CGPA up to 6th Sem, currently pursuing).
   • 12th (+2): Remuna Higher Secondary School, Balasore, Odisha (300 Marks, 50%, Passed 2023).
   • 10th: Sri Aurobindo Center of Integral High School, Rajabagicha, Balasore (402 Marks, 67%, Passed 2021).
3. Technical Skills: Git & GitHub (95%), VS Code (85%), Python (75%), HTML (70%), CSS (65%), JavaScript (65%).
4. Core Specializations: Modern Web Development and End-to-end Full Stack Development.
5. Passions & Hobbies: Coding & Problem Solving, Exploring AI Tools, Competitive Gaming, Singing & Music, Dancing & Performing, Gym & Fitness.
6. Direct Contact & Social Profiles:
   • Email: balasore087@gmail.com
   • Phone / Call: +91 9692996411
   • WhatsApp: https://wa.me/919692996411
   • LinkedIn: https://www.linkedin.com/in/gourav-das-13840542a
   • GitHub: https://github.com/balasore087-dotcom
   • Instagram: https://www.instagram.com/invites/contact/?utm_content=p1mcpn2&stkn=1vcshjgdoui85
   • Facebook: https://www.facebook.com/share/1QLFuD8VpS/
Always highlight his strengths and encourage visitors to connect with Gourav!
`;

if (chatbotToggle && chatbotBox) {
  chatbotToggle.addEventListener("click", () => {
    chatbotWidget.classList.toggle("open");
    chatbotBox.classList.toggle("chatbot-hidden");
    if (!chatbotBox.classList.contains("chatbot-hidden")) {
      chatbotInput.focus();
    }
  });
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const text = chatbotInput.value.trim();
  if (!text) return;

  // 1. Add User Message
  addMessage(text, "user-msg");
  chatbotInput.value = "";

  // 2. Show Thinking indicator
  const thinkingId = addMessage("Thinking...", "bot-msg");

  // 3. Call Gemini AI API with Instant Local Fallback
  try {
    const aiResponse = await callGeminiAI(text);
    removeMessage(thinkingId);
    addMessage(aiResponse, "bot-msg");
  } catch (err) {
    console.warn("Gemini API Notice:", err);
    removeMessage(thinkingId);
    // Instant smart local reply if API has network/key restriction
    const localReply = getLocalSmartResponse(text.toLowerCase());
    addMessage(localReply, "bot-msg");
  }
}

function askBot(topic) {
  chatbotInput.value = topic;
  const submitEvent = new Event("submit");
  document.getElementById("chatbot-form").dispatchEvent(submitEvent);
}

function addMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = className;
  const msgId = "msg-" + Date.now();
  msgDiv.id = msgId;
  msgDiv.innerHTML = text;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  return msgId;
}

function removeMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

async function callGeminiAI(userQuery) {
  const models = ["gemini-1.5-flash", "gemini-2.5-flash", "gemini-3.5-flash-lite"];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const requestBody = {
        contents: [
          {
            parts: [
              { text: `${SYSTEM_PROMPT}\n\nUser Question: ${userQuery}` }
            ]
          }
        ]
      };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      if (data.error) {
        lastError = data.error.message;
        continue;
      }

      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
        let cleanText = data.candidates[0].content.parts[0].text;
        cleanText = cleanText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        cleanText = cleanText.replace(/\n/g, "<br>");
        return cleanText;
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  throw new Error(lastError || "API endpoint unreachable");
}

// Built-in Instant Smart Fallback Engine
function getLocalSmartResponse(query) {
  if (query.includes("skill") || query.includes("python") || query.includes("html") || query.includes("technology")) {
    return "🚀 <b>Gourav's Skills:</b><br>• Git & GitHub: 95%<br>• VS Code: 85%<br>• Python: 75%<br>• HTML: 70%<br>• CSS: 65%<br>• JavaScript: 65%<br>Specialized in <b>Web Development</b> & <b>Full Stack Development</b>!";
  } else if (query.includes("education") || query.includes("college") || query.includes("school") || query.includes("marks") || query.includes("kmbb")) {
    return "🎓 <b>Academic Background:</b><br>• <b>B.Tech:</b> KMBB College of Engineering & Technology (7.5 CGPA up to 6th Sem, pursuing)<br>• <b>12th:</b> Remuna Higher Secondary School (50% / 300 Marks)<br>• <b>10th:</b> Sri Aurobindo Center of Integral High School (67% / 402 Marks)";
  } else if (query.includes("contact") || query.includes("phone") || query.includes("call") || query.includes("whatsapp") || query.includes("number") || query.includes("email") || query.includes("mail")) {
    return "📬 <b>Connect with Gourav:</b><br>• Email: <a href='https://mail.google.com/mail/?view=cm&fs=1&to=balasore087@gmail.com' target='_blank'>balasore087@gmail.com</a><br>• Phone: <a href='tel:+919692996411'>+91 96929 96411</a><br>• WhatsApp: <a href='https://wa.me/919692996411' target='_blank'>Chat on WhatsApp</a><br>• LinkedIn: <a href='https://www.linkedin.com/in/gourav-das-13840542a' target='_blank'>Gourav Das</a>";
  } else if (query.includes("social") || query.includes("instagram") || query.includes("facebook") || query.includes("github")) {
    return "🌐 <b>Social Profiles:</b><br>• <a href='https://github.com/balasore087-dotcom' target='_blank'>GitHub</a><br>• <a href='https://www.instagram.com/invites/contact/?utm_content=p1mcpn2&stkn=1vcshjgdoui85' target='_blank'>Instagram</a><br>• <a href='https://www.facebook.com/share/1QLFuD8VpS/' target='_blank'>Facebook</a>";
  } else if (query.includes("hobby") || query.includes("interest") || query.includes("passion")) {
    return "🌟 <b>Passions & Hobbies:</b><br>Coding, Exploring AI Tools, Gaming, Singing, Dancing, and Gym/Fitness!";
  } else if (query.includes("project") || query.includes("work")) {
    return "💻 <b>Featured Work:</b><br>Gourav specializes in AI Platforms and Interactive UI Systems. Check the <b>Selected Works</b> section above!";
  } else {
    return "Namaste! Main Gourav ka AI assistant hoon. Aap mujhse Gourav ke skills, education (KMBB/Remuna), projects, email (balasore087@gmail.com), ya contact number (+91 9692996411) ke baare me pooch sakte hain!";
  }
}