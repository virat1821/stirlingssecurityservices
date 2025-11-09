document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const pinContainer = document.querySelector('.masking-section');
  const image1 = document.querySelector('.image-1');
  const image2 = document.querySelector('.image-2');
  const image3 = document.querySelector('.image-3');
  const image4 = document.querySelector('.image-4');
  const image5 = document.querySelector('.image-5');
  const image6 = document.querySelector('.image-6');
  const brand = document.querySelector('.brand-mask');
  const helper = document.querySelector('.overlay-content__helper');
  const overlayCard = document.querySelector('.overlay-card'); // ✅ replaced video with div

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const timeline = gsap.timeline();

      // --- 1. Animate images flying outward ---
      timeline
        .to(image3, { yPercent: -15, scale: 2 }, 0)
        .to(image4, { yPercent: 45, scale: 2 }, 0.5)
        .to(image2, { xPercent: 200, yPercent: -15, scale: 1.7 }, 1)
        .to(image5, { xPercent: -200, yPercent: -30, scale: 1.7 }, 1)
        .to(image1, { xPercent: -200, yPercent: -15, scale: 1.7 }, 2)
        .to(image6, { xPercent: 200, yPercent: -30, scale: 1.7 }, 2);

      // --- 2. Animate brand expanding to reveal ---
      timeline
        .fromTo(brand, { scale: 1, yPercent: -60 }, {
          yPercent: -50,
          xPercent: 150,
          scale: 1100,
          duration: 5,
          ease: 'power3.inOut',
        }, 3)
        .to(brand, {
          backgroundColor: 'white',
          color: 'black',
          duration: 0,
        }, 3.7);

      // --- 3. Fade out the scroll helper ---
      timeline.to(helper, {
        opacity: 0,
        zIndex: 0,
        yPercent: 300,
        duration: 0.6,
        ease: 'power3.inOut',
      }, 3.1);

      // --- 4. Reveal custom div (overlayCard) instead of video ---
      timeline.fromTo(overlayCard, 
        { opacity: 0, scale: 1.1, yPercent: 20 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 3.7
      );

      // --- 5. Fly images completely out of frame ---
      timeline
        .to(image1, { xPercent: -500, yPercent: 150, scale: 1.7 }, 3.5)
        .to(image2, { xPercent: 500, yPercent: 150, scale: 1.7 }, 3.5)
        .to(image3, { yPercent: -500, scale: 2 }, 3.5)
        .to(image4, { yPercent: 500, scale: 2 }, 3.5)
        .to(image5, { xPercent: -500, yPercent: -300, scale: 1.7 }, 3.5)
        .to(image6, { xPercent: 500, yPercent: -300, scale: 1.7 }, 3.5);

      // --- 6. Create ScrollTrigger ---
      ScrollTrigger.create({
        trigger: pinContainer,
        pin: true,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        animation: timeline,
      });
    });
  }, pinContainer);
});
