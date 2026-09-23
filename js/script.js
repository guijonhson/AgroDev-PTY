document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navAnchors = navLinks.querySelectorAll("a");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const platformButton = document.getElementById("platformButton");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const active = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", active ? "true" : "false");
  });

  navAnchors.forEach(anchor => {
    anchor.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "10b677b5-bd6a-43c2-9ef3-435a57d3fc1a");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
});
