document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("waitlistForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Request failed");
    window.location.href = "/thank-you.html";
  } catch (err) {
    statusEl.textContent = "Something went wrong. Please try again.";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("waitlistForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";

  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Request failed");
    window.location.href = "/thank-you.html";
  } catch (err) {
    statusEl.textContent = "Something went wrong. Please try again.";
  }
});
