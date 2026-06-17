const weddingStart = new Date("2026-08-11T19:00:00+02:00");
const rsvpPhone = "38349123456";

const countdownFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

const pad = (value) => String(value).padStart(2, "0");

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, weddingStart.getTime() - now.getTime());

  const secondsTotal = Math.floor(diff / 1000);
  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  countdownFields.days.textContent = pad(days);
  countdownFields.hours.textContent = pad(hours);
  countdownFields.minutes.textContent = pad(minutes);
  countdownFields.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const rsvpForm = document.querySelector("[data-rsvp-form]");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(rsvpForm);
    const attendance = formData.get("attendance");
    const comments = formData.get("comments")?.toString().trim();
    const message = [
      `Përgjigjja ime: ${attendance}`,
      comments ? `Koment: ${comments}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${rsvpPhone}?text=${encodeURIComponent(message)}`;
  });
}
