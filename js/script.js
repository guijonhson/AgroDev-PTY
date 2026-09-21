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

  platformButton.addEventListener("click", () => {
    alert("El portal de clientes estará disponible próximamente.");
  });

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    if (!name) {
      formStatus.textContent = "Por favor, completa tu nombre.";
      return;
    }

    formStatus.textContent =
      "Gracias, " + name + ". El formulario está listo para conectarse a tu sistema de contacto.";

    contactForm.reset();
  });
});
