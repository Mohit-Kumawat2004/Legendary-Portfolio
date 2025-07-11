// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const skillBars = document.querySelectorAll(".skill-progress");
// Navigation functionality
hamburger.addEventListener('click', ()=> {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.classList.toggle(
    "menu-open",
    navMenu.classList.contains("active")
  );
});


// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
  }
});

// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const rocket = document.getElementById("rocket-launch");
  rocket.style.opacity = "1";
  rocket.style.animation =
    "rocket-fly 1.8s cubic-bezier(0.4,1.5,0.6,1) 0.3s 1 forwards";
  setTimeout(() => {
    rocket.style.display = "none";
  }, 2200); // Hide after animation
});

// Certifications carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const originalCards = document.querySelectorAll(".certificate-card");
  const scrollIndicators = document.querySelector(".scroll-indicators");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!track || originalCards.length === 0) return;

  // Duplicate for seamless scroll
  track.innerHTML += track.innerHTML;
  const allCards = track.querySelectorAll(".certificate-card");

  const totalOriginalCards = originalCards.length;

  // Create scroll dots
  for (let i = 0; i < totalOriginalCards; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    scrollIndicators.appendChild(dot);
  }

  const dots = document.querySelectorAll(".scroll-indicators .dot");

  let scrollAmount = 0;
  const cardWidth = originalCards[0].offsetWidth + 20; // Include margin
  const scrollSpeed = 1;
  const resetAfter = track.scrollWidth / 2;

  function updateIndicators() {
    const index = Math.floor(scrollAmount / cardWidth) % totalOriginalCards;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function autoScroll() {
    scrollAmount += scrollSpeed;

    if (scrollAmount >= resetAfter) {
      scrollAmount = 0;
    }

    track.scrollLeft = scrollAmount;
    updateIndicators();
    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // Manual scroll with arrows
  leftArrow?.addEventListener("click", () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) scrollAmount = 0;
    track.scrollLeft = scrollAmount;
    updateIndicators();
  });

  rightArrow?.addEventListener("click", () => {
    scrollAmount += cardWidth;
    if (scrollAmount >= resetAfter) scrollAmount = 0;
    track.scrollLeft = scrollAmount;
    updateIndicators();
  });

  // Optional touch support
  let touchStartX = null;
  let touchEndX = null;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (touchStartX === null) return;
      touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      scrollAmount -= deltaX;
      track.scrollLeft = scrollAmount;
      updateIndicators();
      touchStartX = touchEndX;
    },
    { passive: true }
  );

  track.addEventListener("touchend", () => {
    touchStartX = null;
    touchEndX = null;
  });
});




document.addEventListener("DOMContentLoaded", function () {
  // Re-use carousel logic for badges by targeting the specific badge elements
  const badgeCarouselTrack = document.querySelector(
    ".badges-carousel .badges-track"
  );
  const badgeLeftArrow = document.querySelector(".badges-carousel .left-arrow");
  const badgeRightArrow = document.querySelector(
    ".badges-carousel .right-arrow"
  );
  const badgeCards = Array.from(
    document.querySelectorAll(".badges-carousel .badge-card")
  );

  if (!badgeCarouselTrack || badgeCards.length === 0) {
    if (badgeLeftArrow) badgeLeftArrow.style.display = "none";
    if (badgeRightArrow) badgeRightArrow.style.display = "none";
    return;
  }

  let currentBadgeIndex = 0;
  let badgeCardVisibleWidth = 0;

  function updateBadgeCarouselLayout() {
    if (badgeCards.length > 0) {
      const cardStyle = getComputedStyle(badgeCards[0]);
      const cardWidth = parseFloat(cardStyle.width);
      const cardMarginLeft = parseFloat(cardStyle.marginLeft);
      const cardMarginRight = parseFloat(cardStyle.marginRight);
      badgeCardVisibleWidth = cardWidth + cardMarginLeft + cardMarginRight; // Include both margins
    }

    badgeCarouselTrack.style.transform = `translateX(-${
      currentBadgeIndex * badgeCardVisibleWidth
    }px)`;

    // Show/hide arrows based on current index and remaining content
    badgeLeftArrow.style.display = currentBadgeIndex > 0 ? "block" : "none";

    const carouselContainerWidth = badgeCarouselTrack.parentElement.clientWidth;
    const totalTrackWidth = badgeCards.length * badgeCardVisibleWidth;

    // Determine if more badges are off-screen to the right
    // Check if the current scroll position + container width is less than the total track width
    if (totalTrackWidth <= carouselContainerWidth + 1) {
      // +1 for small floating point buffer
      badgeRightArrow.style.display = "none"; // All badges fit, no need to scroll right
    } else {
      const maxScrollLeft = totalTrackWidth - carouselContainerWidth;
      const currentScrollLeft = currentBadgeIndex * badgeCardVisibleWidth;
      badgeRightArrow.style.display =
        currentScrollLeft < maxScrollLeft - 5 ? "block" : "none"; // -5 for buffer
    }
  }

  badgeLeftArrow.addEventListener("click", () => {
    if (currentBadgeIndex > 0) {
      currentBadgeIndex--;
      updateBadgeCarouselLayout();
    }
  });

  badgeRightArrow.addEventListener("click", () => {
    const carouselContainerWidth = badgeCarouselTrack.parentElement.clientWidth;
    const totalTrackWidth = badgeCards.length * badgeCardVisibleWidth;

    // Allow scrolling if there's content to the right
    if (
      currentBadgeIndex * badgeCardVisibleWidth + carouselContainerWidth <
      totalTrackWidth - 5
    ) {
      // -5 for small buffer
      currentBadgeIndex++;
      updateBadgeCarouselLayout();
    }
  });

  // Handle window resize to re-calculate card widths and adjust carousel
  window.addEventListener("resize", updateBadgeCarouselLayout);

  // Initial layout update
  updateBadgeCarouselLayout();

  // Optional: Add swipe functionality for touch devices (similar to certificates)
  let touchStartX = null;
  let touchEndX = null;

  badgeCarouselTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      badgeCarouselTrack.style.transition = "none";
    },
    { passive: true }
  );

  badgeCarouselTrack.addEventListener(
    "touchmove",
    (e) => {
      if (touchStartX === null) return;
      touchEndX = e.touches[0].clientX;
      const currentTranslateX = -currentBadgeIndex * badgeCardVisibleWidth;
      const deltaX = touchEndX - touchStartX;
      badgeCarouselTrack.style.transform = `translateX(${
        currentTranslateX + deltaX
      }px)`;
    },
    { passive: true }
  );

  badgeCarouselTrack.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;

    badgeCarouselTrack.style.transition = "transform 0.5s ease-in-out";

    const deltaX = touchEndX - touchStartX;

    if (deltaX > 50 && currentBadgeIndex > 0) {
      currentBadgeIndex--;
    } else if (deltaX < -50) {
      const carouselContainerWidth =
        badgeCarouselTrack.parentElement.clientWidth;
      const totalTrackWidth = badgeCards.length * badgeCardVisibleWidth;
      if (
        currentBadgeIndex * badgeCardVisibleWidth + carouselContainerWidth <
        totalTrackWidth - 5
      ) {
        currentBadgeIndex++;
      }
    }

    updateBadgeCarouselLayout();
    touchStartX = null;
    touchEndX = null;
  });
});


// Handle orientation changes
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
      // Close mobile menu on orientation change
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Recalculate viewport height
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }, 100);
});

// Back to top button functionality
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typing animation for hero section
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
  "Code. Break. Fix. Repeat. ☠️",
  "C++ is my love language. Debugging is the drama. 💔",
  "Built with coffee, survived on logic. ☕💻",
  "Ctrl+Z is my only therapist. 🧠",
  "If (it works) { don't touch it; } 🔥",
  "Coding at 2AM hits different. 🌙💡",
  "console.log('still figuring it out...'); 🤷‍♂️",
  "Stack Overflow is my co-pilot. ✈️",
  "Dreams in binary, nightmares in merge conflicts. 👾",
  "Deploying like it's all gonna work. 😎🚀",
  "Keyboard warrior by night, bug hunter by day. ⚔️",
  "Life’s a loop; mine has no break. 🔁",
  "‘final_final_v2_FIXED_really.js’ – my legacy. 🧨",
  "I speak fluent HTML, sarcasm, and semicolons. 😏",
  "RAM overloaded, brain underclocked. 🧠💥",
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newTextDelay + 250);
});

// Animate skill bars when they come into view
const observerOptions = {
  threshold: 0.7,
  rootMargin: "0px 0px -100px 0px",
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Animate elements on scroll
const animateOnScrollOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, animateOnScrollOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll(
  ".project-card, .achievement-card, .skill-category, .about-text, .profile-card"
);
animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  scrollObserver.observe(el);
});

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple form validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Simulate form submission
  const submitBtn = contactForm.querySelector(".btn");
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

  // Add to body
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    removeNotification(notification);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

function removeNotification(notification) {
  notification.style.transform = "translateX(400px)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading animation for page
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Parallax effect for hero section (disabled on mobile for performance)
if (window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-visual');
      
      parallaxElements.forEach(element => {
          const speed = 0.3;
          element.style.transform = `translateY(${scrolled * speed}px)`;
      });
  });
}


// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Theme toggle functionality (if needed)
function toggleTheme() {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-theme") ? "light" : "dark"
  );
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  const ripple = button.getElementsByClassName("ripple")[0];
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console easter egg
console.log(`
🚀 Welcome to Mohit Kumawat's Portfolio!
=====================================

Thanks for checking out the code! 
If you're interested in collaborating or have any questions,
feel free to reach out!

Happy coding! 💻
`);

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Optimize animations for mobile devices
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
    document.documentElement.style.setProperty('--transition-bounce', 'all 0.2s ease');
}

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Close mobile menu on orientation change
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Recalculate viewport height
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }, 100);
});

// Set initial viewport height for mobile
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

// Prevent zoom on double tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Improve scroll performance on mobile
let ticking = false;
function updateScrollPosition() {
    // Update scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Responsive font size adjustment
function adjustFontSize() {
    const screenWidth = window.innerWidth;
    const baseSize = 16;
    
    if (screenWidth < 360) {
        document.documentElement.style.fontSize = '14px';
    } else if (screenWidth < 480) {
        document.documentElement.style.fontSize = '15px';
    } else if (screenWidth > 1920) {
        document.documentElement.style.fontSize = '18px';
    } else {
        document.documentElement.style.fontSize = `${baseSize}px`;
    }
}

// Call on load and resize
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

// Handle viewport changes for mobile browsers
function handleViewportChange() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', () => {
    setTimeout(handleViewportChange, 100);
});

// Initialize
handleViewportChange();

// Add a simple loading spinner
const spinner = document.createElement("div");
spinner.className = "loading-spinner";
spinner.innerHTML = `
    <div class="spinner-circle"></div>
    <div class="spinner-text">Loading...</div>
`;

document.body.appendChild(spinner);
// Show spinner on page load
window.addEventListener("load", () => {
  spinner.style.display = "none"; // Hide spinner after loading
});
