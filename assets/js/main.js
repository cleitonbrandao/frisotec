// Handles mobile navigation and testimonial slider interactions

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const slides = document.querySelectorAll('#testimonial-track article');
  const heroVanta = document.getElementById('hero-vanta');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentSlide = 0;
  let vantaEffect;

  function initVantaBackground() {
    if (!heroVanta || typeof window.VANTA === 'undefined' || !window.VANTA.FOG) return;
    if (reducedMotionQuery.matches) {
      heroVanta.style.display = 'none';
      vantaEffect?.destroy();
      vantaEffect = null;
      return;
    }

    heroVanta.style.display = '';
    vantaEffect?.destroy();
    vantaEffect = window.VANTA.FOG({
      el: heroVanta,
      highlightColor: 0x0af3ff,
      midtoneColor: 0x0b3a7a,
      lowlightColor: 0x030b1c,
      baseColor: 0x020812,
      blurFactor: 0.65,
      speed: 1.8,
      zoom: 1.2,
    });
  }

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', (!expanded).toString());
    menuToggle.classList.toggle('is-open');
    mobileMenu?.classList.toggle('hidden');
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  function updateSlide(index) {
    if (!track) return;
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  prevBtn?.addEventListener('click', () => updateSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => updateSlide(currentSlide + 1));

  if (slides.length > 0) {
    setInterval(() => updateSlide(currentSlide + 1), 8000);
  }

  initVantaBackground();
  reducedMotionQuery.addEventListener('change', initVantaBackground);
  window.addEventListener('resize', () => vantaEffect?.resize?.());
  window.addEventListener('beforeunload', () => vantaEffect?.destroy());
});
