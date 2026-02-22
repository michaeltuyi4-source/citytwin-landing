document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("waitlistForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";

  const data = new FormData(form);
  data.append("access_key", "893972dd-ad21-49c5-b0dc-90290a8a107a");

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data
    });

    const json = await res.json();

    if (json.success) {
      window.location.href = "/thank-you.html";
    } else {
      statusEl.textContent = "Something went wrong. Please try again.";
    }
  } catch (err) {
    statusEl.textContent = "Network error. Please try again.";
  }
});