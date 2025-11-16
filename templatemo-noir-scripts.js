
 // Hero Carousel
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        // Start automatic slideshow
        if (slides.length > 0) {
            startSlideShow();
            
            // Manual navigation via indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    stopSlideShow();
                    showSlide(index);
                    startSlideShow(); // Restart automatic slideshow
                });
            });

            // Pause on hover
            const carousel = document.querySelector('.hero-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', stopSlideShow);
                carousel.addEventListener('mouseleave', startSlideShow);
            }
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });

        // Navbar scroll effect and scroll spy
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateActiveNav() {
            const scrollY = window.pageYOffset;
            const navHeight = navbar.offsetHeight;
            
            // Navbar background on scroll
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Scroll spy for active navigation
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - navHeight - 10;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
            
            // Special case for home when at the very top
            if (scrollY < 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#home') {
                        link.classList.add('active');
                    }
                });
            }
        }

        window.addEventListener('scroll', updateActiveNav);
        window.addEventListener('resize', updateActiveNav); // Update on resize
        updateActiveNav(); // Call on load

        // Category filter
        const tabButtons = document.querySelectorAll('.tab-btn');
        const collectionCards = document.querySelectorAll('.collection-card');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // Update active button
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter cards
                collectionCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    // Get navbar height dynamically (it changes on medium screens)
                    const navHeight = navbar.offsetHeight;
                    let offsetTop;
                    
                    // If scrolling to home, go to top
                    if (targetId === '#home') {
                        offsetTop = 0;
                    } else {
                        // For all other sections, position them right at the top of viewport
                        // just below the navbar to completely hide previous content
                        offsetTop = target.offsetTop - navHeight;
                    }
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Parallax effect on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.hero-content');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Animate submit button
                const submitBtn = contactForm.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
                
                // Simulate sending (replace with actual API call)
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = '#4CAF50';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.style.opacity = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            });
        }

        // Form input animations
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = '';
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.featured-container, .contact-content').forEach(el => {
            observer.observe(el);
        });

      






        (function () {
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("successBox");

  if (!form) return console.warn("contactForm not found.");
  if (!successBox) return console.warn("successBox not found.");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Prepare AJAX endpoint for FormSubmit:
    // transform https://formsubmit.co/you@me.com  ->  https://formsubmit.co/ajax/you@me.com
    let action = (form.getAttribute("action") || "").trim();
    if (!action) {
      showError("Form action is missing. Please set action to https://formsubmit.co/vishnuprakash9597@gmail.com");
      return;
    }
    let ajaxEndpoint;
    if (action.includes("/ajax/")) {
      ajaxEndpoint = action; // already ajax url
    } else {
      // make sure it uses the ajax endpoint
      ajaxEndpoint = action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");
    }

    // UI: hide submit button to prevent double submit
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Optional: hide form while showing loading state
    form.style.opacity = "0.6";

    const formData = new FormData(form);

    try {
      const res = await fetch(ajaxEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        // try to read json error
        let errText = "Failed to send message. Please try again.";
        try {
          const errJson = await res.json();
          if (errJson && errJson.message) errText = errJson.message;
        } catch (_) {}
        throw new Error(errText);
      }

      // success
      showSuccess("Thank you! Your message has been sent.");
      // optionally show server response
      // const data = await res.json();

      // hide form and show success briefly, then restore
      form.style.display = "none";

      setTimeout(() => {
        successBox.style.display = "none";
        form.reset();
        form.style.display = "block";
        form.style.opacity = "1";
        if (submitBtn) submitBtn.disabled = false;
      }, 2000); // 2 seconds (adjust if you want longer)
    } catch (err) {
      console.error(err);
      showError(err.message || "An error occurred while sending the form.");
      form.style.opacity = "1";
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  function showSuccess(msg) {
    successBox.classList.remove("error");
    successBox.classList.add("success");
    successBox.innerText = msg;
    successBox.style.display = "block";
  }

  function showError(msg) {
    successBox.classList.remove("success");
    successBox.classList.add("error");
    successBox.innerText = msg;
    successBox.style.display = "block";
  }
})();
