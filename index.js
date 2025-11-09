// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Reveal on scroll using IntersectionObserver ----
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optional: unobserve after visible
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ---- Counter animation (runs once when visible) ----
const counters = document.querySelectorAll('.counter');
let countersStarted = false;
const statsSection = document.getElementById('stats');

function animateCounters() {
  if (countersStarted) return;
  if (!statsSection) return;
  const sectionTop = statsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600;
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 10);
      const step = () => {
        start += Math.ceil(target / (duration / stepTime));
        if (start < target) {
          counter.textContent = start.toLocaleString();
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      step();
    });
    countersStarted = true;
  }
}
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ---- Contact form (client-side only) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Basic validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      alert('Please complete all fields.');
      return;
    }
    // In production: send via AJAX to server endpoint / API
    alert('Thanks! Your message has been received. We will contact you shortly.');
    contactForm.reset();
  });
}

// Accessibility: enable keyboard skip to main (optional enhancement can be added)
