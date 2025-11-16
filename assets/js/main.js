// Handles mobile navigation and testimonial slider interactions

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const slides = document.querySelectorAll('#testimonial-track article');
  let currentSlide = 0;

  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
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
});
