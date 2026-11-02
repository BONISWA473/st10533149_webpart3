document.addEventListener("DOMContentLoaded", () => {

  // ===== 1. MENU =====
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // ===== 2. GALLERY LIGHTBOX =====
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");

  if (lightbox && closeBtn) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        caption.textContent = img.alt;
      });
    });
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });
  }

  // ===== 3. ENQUIRY FORM =====
  const form = document.getElementById("enquiry-form");
  if (form) {
    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("name-error")
      },
      surname: {
        input: document.getElementById("surname"),
        error: document.getElementById("surname-error")
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("email-error")
      },
      phone: {
        input: document.getElementById("phone"),
        error: document.getElementById("phone-error")
      },
      carcategory: {
        input: document.getElementById("carcategory") || document.getElementById("productCategory"),
        error: document.getElementById("carcategory-error") || document.getElementById("productCategory-error")
      }
    };

    const status = document.getElementById("form-status") || document.getElementById("enquiryResponse");

    function clearErrors() {
      Object.values(fields).forEach(field => {
        if (field.error) field.error.textContent = "";
      });
    }

    function validate() {
      let isValid = true;
      clearErrors();
      Object.values(fields).forEach(f => {
        if (f.input && !f.input.value.trim()) {
          if (f.error) f.error.textContent = "This field is required";
          isValid = false;
        }
      });
      if (fields.email.input && fields.email.input.value && !fields.email.input.value.includes("@")) {
        if (fields.email.error) fields.email.error.textContent = "Enter a valid email";
        isValid = false;
      }
      return isValid;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validate()) {
        const name = document.getElementById("name").value;
        if (status) {
          status.textContent = "Thank you " + name + "! We received your enquiry.";
          status.style.color = "green";
        }
        form.reset();
      } else {
        if (status) {
          status.textContent = "Please fix the errors above.";
          status.style.color = "red";
        }
      }
    });
  }

  // ===== 4. SHOP SEARCH =====
  const searchInput = document.getElementById("shop-search");
  const resultText = document.getElementById("search-result");
  if (searchInput) {
    const items = document.querySelectorAll("#shop li");
    searchInput.addEventListener("input", () => {
      const word = searchInput.value.toLowerCase().trim();
      let count = 0;
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(word)) {
          item.style.display = "";
          count++;
        } else {
          item.style.display = "none";
        }
      });
      if (resultText) {
        if (word === "") {
          resultText.textContent = "";
        } else {
          resultText.textContent = count + " result(s) found for '" + word + "'";
        }
      }
    });
  }

  // ===== 5. CONTACT FORM - YOUR CODE FROM contact.html =====
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email").value.trim();
      const message = document.getElementById("contact-message").value.trim();

      if (name === "" || email === "" || message === "") {
        if (contactStatus) contactStatus.textContent = "Please fill in all fields.";
        return;
      }

      if (contactStatus) contactStatus.textContent = "Thank you " + name + ", your message has been sent. We will contact you at " + email;
      contactForm.reset();
    });
  }

});