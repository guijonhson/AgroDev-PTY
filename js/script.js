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

contactForm.addEventListener("submit", async event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Por favor, completa nombre, correo y mensaje.";
    return;
  }

  const submitBtn = contactForm.querySelector("button[type='submit']");
  const originalText = submitBtn.textContent;

  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";
  formStatus.textContent = "";

    try {
      const formData = new FormData(contactForm);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        formStatus.textContent = "✅ Gracias, " + name + ". Te contactaremos pronto.";
        contactForm.reset();
      } else {
        formStatus.textContent = "❌ No se pudo enviar. Intenta de nuevo.";
      }
    } catch (error) {
      formStatus.textContent = "❌ Error de conexión. Revisa tu internet.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
