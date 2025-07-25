particlesJS("particles-js", {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: "#00bfff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#00bfff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      out_mode: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 100 },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
});

// Magnetic Cursor Effect
document.addEventListener("mousemove", function (e) {
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");
  if (dot && outline) {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.style.left = `${e.clientX}px`;
    outline.style.top = `${e.clientY}px`;
  }
});

// Magnetic effect for elements
const magneticElements = document.querySelectorAll(".magnetic-element");
magneticElements.forEach((el) => {
  el.addEventListener("mousemove", function (e) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  el.addEventListener("mouseleave", function () {
    el.style.transform = "";
  });
});

window.addEventListener("scroll", () => {
  const scrollProgress = document.getElementById("scroll-progress");
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrolled + "%";
});