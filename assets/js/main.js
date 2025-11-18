// Handles mobile navigation and testimonial slider interactions

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  const track = document.getElementById('testimonial-track')
  const prevBtn = document.getElementById('testimonial-prev')
  const nextBtn = document.getElementById('testimonial-next')
  const slides = document.querySelectorAll('#testimonial-track article')
  const heroVanta = document.getElementById('hero-vanta')
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let currentSlide = 0
  let vantaEffect

  // Load Portfolio Images Dynamically
  function loadPortfolioImages() {
    const portfolioGrid = document.getElementById('portfolio-grid')
    if (!portfolioGrid) return

    const imagePath = 'assets/images/services/'
    // Lista de imagens disponíveis com suas descrições
    const imageFiles = [
      { file: 'image-1.png', description: 'Projeto Industrial - São Paulo - SP' },
      { file: 'image-2.png', description: 'Galpão Logístico - Campinas - SP' },
      { file: 'image-3.png', description: 'Estrutura Metálica - Anápolis - GO' },
      { file: 'image-4.png', description: 'Centro de Distribuição - Goiânia - GO' },
      { file: 'image-5.png', description: 'Planta Industrial - Contagem - MG' },
      { file: 'image-6.png', description: 'Terminal Logístico - Brasília - DF' },
      { file: 'image-7.png', description: 'Cobertura Metálica - Curitiba - PR' },
      { file: 'image-8.png', description: 'Hangar Industrial - Fortaleza - CE' },
      { file: 'image-9.png', description: 'Estrutura Comercial - Belo Horizonte - MG' },
      { file: 'image-10.png', description: 'Galpão Industrial - Rio de Janeiro - RJ' },
    ]

    portfolioGrid.innerHTML = imageFiles
      .map(
        (item, index) => `
        <div class="relative overflow-hidden rounded-2xl portfolio-card group mb-4 break-inside-avoid">
          <img
            src="${imagePath}${item.file}"
            alt="${item.description}"
            class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 block"
            loading="lazy"
            onerror="this.parentElement.style.display='none'"
          />
          <div
            class="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"
          >
            <div class="bg-white/20 backdrop-blur-md border-t border-white/30 py-4 px-6 shadow-lg">
              <p class="text-white text-base font-semibold text-center drop-shadow-lg">${item.description}</p>
            </div>
          </div>
        </div>
      `
      )
      .join('')
  }

  // Product Modal
  const productModal = document.getElementById('product-modal')
  const modalImage = document.getElementById('modal-image')
  const modalTitle = document.getElementById('modal-title')
  const modalDescription = document.getElementById('modal-description')
  const closeModalBtn = document.getElementById('close-modal')
  const productCards = document.querySelectorAll('.product-card')

  function openProductModal(image, title, description) {
    modalImage.src = image
    modalImage.alt = title
    modalTitle.textContent = title
    modalDescription.textContent = description
    productModal.classList.remove('hidden')
    productModal.classList.add('flex')
    document.body.style.overflow = 'hidden'
  }

  function closeProductModal() {
    productModal.classList.add('hidden')
    productModal.classList.remove('flex')
    document.body.style.overflow = ''
  }

  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.dataset.image
      const title = card.dataset.title
      const description = card.dataset.description
      openProductModal(image, title, description)
    })
  })

  closeModalBtn?.addEventListener('click', closeProductModal)

  productModal?.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !productModal?.classList.contains('hidden')) {
      closeProductModal()
    }
  })

  function initVantaBackground() {
    if (!heroVanta || typeof window.VANTA === 'undefined' || !window.VANTA.FOG) return
    if (reducedMotionQuery.matches) {
      heroVanta.style.display = 'none'
      vantaEffect?.destroy()
      vantaEffect = null
      return
    }

    heroVanta.style.display = ''
    vantaEffect?.destroy()
    vantaEffect = window.VANTA.FOG({
      el: heroVanta,
      highlightColor: 0x0af3ff,
      midtoneColor: 0x0b3a7a,
      lowlightColor: 0x030b1c,
      baseColor: 0x020812,
      blurFactor: 0.65,
      speed: 1.8,
      zoom: 1.2,
    })
  }

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', (!expanded).toString())
    menuToggle.classList.toggle('is-open')
    mobileMenu?.classList.toggle('hidden')
  })

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      menuToggle?.classList.remove('is-open')
      menuToggle?.setAttribute('aria-expanded', 'false')
    })
  })

  function updateSlide(index) {
    if (!track) return
    currentSlide = (index + slides.length) % slides.length
    track.style.transform = `translateX(-${currentSlide * 100}%)`
  }

  prevBtn?.addEventListener('click', () => updateSlide(currentSlide - 1))
  nextBtn?.addEventListener('click', () => updateSlide(currentSlide + 1))

  if (slides.length > 0) {
    setInterval(() => updateSlide(currentSlide + 1), 8000)
  }

  // Initialize
  loadPortfolioImages()
  initVantaBackground()
  reducedMotionQuery.addEventListener('change', initVantaBackground)
  window.addEventListener('resize', () => vantaEffect?.resize?.())
  window.addEventListener('beforeunload', () => vantaEffect?.destroy())
})
