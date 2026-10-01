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

const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot antispam: si el campo oculto fue llenado, es un bot, no enviamos nada.
    if (contactForm.botcheck && contactForm.botcheck.checked) {
      return;
    }

    const formData = new FormData(contactForm);
    const originalText = submitBtn.textContent;

    formStatus.classList.remove("success", "error");
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            formStatus.textContent = "¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.";
            formStatus.classList.add("success");
            contactForm.reset();
        } else {
            formStatus.textContent = "No se pudo enviar el mensaje. Intenta de nuevo o escríbenos a agrodevpty@gmail.com.";
            formStatus.classList.add("error");
        }

    } catch (error) {
        formStatus.textContent = "Error de conexión. Intenta de nuevo o escríbenos a agrodevpty@gmail.com.";
        formStatus.classList.add("error");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
});
