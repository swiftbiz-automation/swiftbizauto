// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
navToggle.addEventListener('click', function () {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-menu a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    navMenu.classList.remove('active');
    navToggle.classList.remove('open');
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form thank-you handling
document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("contact-form");
  var thankYou = document.getElementById("thank-you");

  thankYou.style.display = "none";
  thankYou.style.opacity = 0;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        form.style.opacity = 0;
        setTimeout(() => {
          form.style.display = "none";
          thankYou.style.display = "block";
          setTimeout(() => { thankYou.style.opacity = 1; }, 60);
        }, 400);
        form.reset();
      } else {
        response.json().then(data => {
          alert(data.error || "Oops! There was a problem submitting your form")
        })
      }
    }).catch(() => {
      alert("Oops! There was a problem submitting your form")
    });
  });

  // Testimonials carousel
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentIndex = 0;

  function showTestimonial(idx) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
  }
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  });
  showTestimonial(currentIndex);

  // Optional: auto-rotate carousel every 6 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 6000);
});