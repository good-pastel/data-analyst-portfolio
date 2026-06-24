document.addEventListener("DOMContentLoaded", () => {
  /* ===================================
NAVBAR SHADOW
=================================== */

  window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {
      nav.classList.add("active");
    } else {
      nav.classList.remove("active");
    }
  });

  /* ===================================
STEP HOVER
=================================== */

  const cards = document.querySelectorAll(".step");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
    });
  });

  /* ===================================
SCROLL REVEAL
=================================== */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade");

    observer.observe(section);
  });

  /* ===================================
DARK MODE
=================================== */

  const toggle = document.getElementById("toggle");
  const mobileToggle = document.getElementById("mobile-toggle");

  // Ambil tema yang tersimpan
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  // Fungsi ganti tema
  function switchTheme() {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",

      document.body.classList.contains("dark") ? "dark" : "light",
    );
  }

  // Desktop button
  if (toggle) {
    toggle.addEventListener(
      "click",

      switchTheme,
    );
  }

  // Mobile button
  if (mobileToggle) {
    mobileToggle.addEventListener(
      "click",

      switchTheme,
    );
  }

  /* ===================================
SKILL BAR ANIMATION
=================================== */

  const bars = document.querySelectorAll(".fill");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;

          bar.style.width = bar.dataset.width;

          setTimeout(() => {
            bar.classList.add("animated");
          }, 300);

          skillObserver.unobserve(bar);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  bars.forEach((bar) => {
    skillObserver.observe(bar);
  });

  /* ===================================
TYPEWRITER
=================================== */

  const words = [
    "Aspiring Data Analyst",

    "SQL Enthusiast",

    "Dashboard Builder",

    "Data Storyteller",
  ];

  const typingElement = document.getElementById("typing");

  let i = 0;
  let j = 0;

  let currentWord = "";

  let isDeleting = false;

  function type() {
    if (!typingElement) return;

    currentWord = words[i];

    if (isDeleting) {
      j--;
    } else {
      j++;
    }

    typingElement.textContent = currentWord.substring(0, j);

    if (!isDeleting && j === currentWord.length) {
      isDeleting = true;

      setTimeout(type, 1500);

      return;
    }

    if (isDeleting && j === 0) {
      isDeleting = false;

      i++;

      i = i % words.length;
    }

    setTimeout(
      type,

      isDeleting ? 60 : 120,
    );
  }

  type();

  /* ===================================
CHART JS
=================================== */

  const ctx = document.getElementById("salesChart");

  if (ctx) {
    new Chart(ctx, {
      type: "line",

      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

        datasets: [
          {
            label: "Sales",

            data: [12, 19, 15, 30, 25, 40],

            borderColor: "#0F766E",

            backgroundColor: "rgba(15,118,110,.1)",

            fill: true,

            tension: 0.4,

            borderWidth: 3,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          y: {
            display: false,
          },

          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  /* ===================================
KPI COUNTER
=================================== */

  function animateCounter(id, target, suffix = "") {
    const element = document.getElementById(id);

    if (!element) return;

    let count = 0;

    const speed = target / 100;

    const interval = setInterval(() => {
      count += speed;

      if (count >= target) {
        count = target;

        clearInterval(interval);
      }

      element.innerHTML = Math.floor(count) + suffix;
    }, 15);
  }

  animateCounter(
    "sales",

    128,

    "K",
  );

  animateCounter(
    "customer",

    1240,
  );

  animateCounter(
    "order",

    860,
  );

  /* ==========================
HAMBURGER MENU
========================== */

  const hamburger = document.querySelector(".hamburger");

  const menu = document.querySelector("nav ul");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
