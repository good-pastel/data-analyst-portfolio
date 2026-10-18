// Portfolio interactions

const menuButton = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");
menuButton?.addEventListener("click", () => navMenu?.classList.toggle("active"));
navMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => navMenu.classList.remove("active")));

const toggleButtons = [document.getElementById("toggle"), document.getElementById("mobile-toggle")].filter(Boolean);
const setTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  toggleButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(dark));
    if (button.id === "toggle") button.textContent = dark ? "☀️" : "🌙";
  });
  try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); } catch (_) {}
};
let darkTheme = false;
try { darkTheme = localStorage.getItem("portfolio-theme") === "dark"; } catch (_) {}
setTheme(darkTheme);
toggleButtons.forEach((button) => button.addEventListener("click", () => setTheme(!document.body.classList.contains("dark"))));

const phrases = ["Data Analytics", "SQL", "Power BI", "Excel"];
const typing = document.getElementById("typing");
if (typing) {
  let phraseIndex = 0, charIndex = 0, deleting = false;
  const type = () => {
    const phrase = phrases[phraseIndex];
    typing.textContent = phrase.slice(0, charIndex);
    if (!deleting && charIndex < phrase.length) charIndex++;
    else if (deleting && charIndex > 0) charIndex--;
    else { deleting = !deleting; if (!deleting) phraseIndex = (phraseIndex + 1) % phrases.length; }
    setTimeout(type, deleting ? 65 : 110);
  };
  type();
}

const skillFills = document.querySelectorAll(".fill[data-width]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.style.width = entry.target.dataset.width; entry.target.classList.add("animated"); currentObserver.unobserve(entry.target); }
  }), { threshold: 0.2 });
  skillFills.forEach((fill) => observer.observe(fill));
} else skillFills.forEach((fill) => { fill.style.width = fill.dataset.width; fill.classList.add("animated"); });

const chartCanvas = document.getElementById("salesChart");
if (chartCanvas && window.Chart) new Chart(chartCanvas, {
  type: "line",
  data: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], datasets: [{ label: "Sales", data: [35, 48, 42, 67, 59, 82], borderColor: "#0f4c9c", backgroundColor: "rgba(15, 76, 156, 0.12)", fill: true, tension: 0.4, pointRadius: 3 }] },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: "rgba(148, 163, 184, 0.16)" } }, x: { grid: { display: false } } } }
});
