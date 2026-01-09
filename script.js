// Projects visibility management
let currentVisible = 3;
const projectsPerLoad = 3;
const totalProjects = 12;
let isExpanded = false;

function initProjects() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    if (index < currentVisible) {
      card.classList.add("visible");
    }
  });
  updateCounter();
}

function toggleProjects() {
  const cards = document.querySelectorAll(".project-card");
  const btn = document.getElementById("viewMoreBtn");
  const btnText = document.getElementById("btnText");

  if (!isExpanded) {
    currentVisible = Math.min(currentVisible + projectsPerLoad, totalProjects);

    cards.forEach((card, index) => {
      if (index < currentVisible) {
        setTimeout(() => {
          card.classList.add("visible");
        }, (index - (currentVisible - projectsPerLoad)) * 100);
      }
    });

    if (currentVisible >= totalProjects) {
      isExpanded = true;
      btnText.textContent = "Show Less";
      btn.classList.add("expanded");
    }
  } else {
    currentVisible = 3;
    isExpanded = false;
    btnText.textContent = "View More Projects";
    btn.classList.remove("expanded");

    cards.forEach((card, index) => {
      if (index >= currentVisible) {
        card.classList.remove("visible");
      }
    });
  }
  updateCounter();
}

function updateCounter() {
  document.getElementById("visibleCount").textContent = currentVisible;
  document.getElementById("totalCount").textContent = totalProjects;
}

// Create animated background particles
function createParticles() {
  const bgAnimation = document.getElementById("bgAnimation");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    const size = Math.random() * 30 + 10;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = left + "%";
    particle.style.animationDelay = delay + "s";
    particle.style.animationDuration = duration + "s";

    bgAnimation.appendChild(particle);
  }
}

// Typewriter effect
const titles = [
  "Front-End Developer",
  "Computer Engineering Graduate",
  "Machine Learning Enthusiast",
  "Problem Solver",
  "Web Developer",
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById("typewriter");

function type() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    typewriter.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentTitle.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
function toggleMenu() {
  document.getElementById("menuBtn").classList.toggle("active");
  document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu() {
  document.getElementById("menuBtn").classList.remove("active");
  document.getElementById("navLinks").classList.remove("active");
}

// Scroll reveal animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// Skill bars animation
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");

  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 100) {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
    }
  });
}

// Toast notification
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");

  toast.className = "toast " + type;
  toastMessage.textContent = message;

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Contact form handling with Formspree
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Check if Formspree is configured
  const formAction = contactForm.action;
  if (formAction.includes("YOUR_FORMSPREE_ID")) {
    showToast(
      "Please configure Formspree first! See the setup guide.",
      "error"
    );
    return;
  }

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    const formData = new FormData(contactForm);

    const response = await fetch(formAction, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      showToast(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        showToast(data.errors.map((e) => e.message).join(", "), "error");
      } else {
        showToast("Failed to send message. Please try again.", "error");
      }
    }
  } catch (error) {
    showToast("Network error. Please check your connection.", "error");
  } finally {
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
});

// Smooth scroll for navigation links
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

// Active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.style.color = "";
    if (item.getAttribute("href") === "#" + current) {
      item.style.color = "var(--primary-light)";
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  type();
  reveal();
  animateSkills();
  initProjects();
});

window.addEventListener("scroll", () => {
  reveal();
  animateSkills();
  setActiveNavLink();
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero-content");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / window.innerHeight;
  }
});
