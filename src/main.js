import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import 'splitting/dist/splitting.css'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════
   DATI MENÙ
═══════════════════════════════════════════════════════════════════ */
const pizzaData = [
  {
    id: 'margherita',
    nameIt: 'Margherita',
    nameEn: 'Margherita',
    descIt: 'Pomodoro San Marzano, fior di latte, basilico fresco',
    descEn: 'San Marzano tomato, fior di latte, fresh basil',
    price: '€7',
    category: 'classica',
    tags: ['vegetariana'],
    img: '/images/pizza-margherita.jpg',
  },
  {
    id: 'napoli',
    nameIt: 'Napoli',
    nameEn: 'Napoli',
    descIt: 'Pomodoro, fior di latte, acciughe, capperi, origano',
    descEn: 'Tomato, fior di latte, anchovies, capers, oregano',
    price: '€10',
    category: 'classica',
    tags: [],
    img: '/images/pizza-napoli.jpg',
  },
  {
    id: 'bufala',
    nameIt: 'Bufala',
    nameEn: 'Bufala',
    descIt: 'Pomodoro, mozzarella di bufala DOP, pomodorini freschi',
    descEn: 'Tomato, buffalo mozzarella DOP, fresh cherry tomatoes',
    price: '€10',
    category: 'classica',
    tags: ['vegetariana'],
    img: '/images/pizza-bufala.jpg',
  },
  {
    id: 'prosciutto',
    nameIt: 'Prosciutto',
    nameEn: 'Prosciutto',
    descIt: 'Pomodoro, fior di latte, prosciutto cotto',
    descEn: 'Tomato, fior di latte, cooked ham',
    price: '€10',
    category: 'classica',
    tags: [],
    img: '/images/pizza-prosciutto.jpg',
  },
  {
    id: 'salame',
    nameIt: 'Salame Piccante',
    nameEn: 'Spicy Salami',
    descIt: 'Pomodoro, fior di latte, salame piccante calabrese',
    descEn: 'Tomato, fior di latte, spicy Calabrian salami',
    price: '€10',
    category: 'classica',
    tags: [],
    img: '/images/pizza-salame.jpg',
  },
  {
    id: 'cotto-funghi',
    nameIt: 'Cotto e Funghi',
    nameEn: 'Ham & Mushroom',
    descIt: 'Pomodoro, fior di latte, prosciutto cotto, funghi, basilico',
    descEn: 'Tomato, fior di latte, cooked ham, mushrooms, basil',
    price: '€10',
    category: 'classica',
    tags: [],
    img: '/images/pizza-cotto-funghi.jpg',
  },
  {
    id: 'pesto-mozza',
    nameIt: 'Pesto e Mozza',
    nameEn: 'Pesto & Mozza',
    descIt: 'Pesto genovese, fior di latte, pomodorini freschi',
    descEn: 'Genovese pesto, fior di latte, fresh cherry tomatoes',
    price: '€10',
    category: 'speciale',
    tags: ['vegetariana'],
    img: '/images/pizza-pesto.jpg',
  },
  {
    id: 'rucola',
    nameIt: 'Rucola',
    nameEn: 'Rucola',
    descIt: 'Pomodorini, fior di latte, grana padano, rucola fresca',
    descEn: 'Cherry tomatoes, fior di latte, grana padano, fresh rocket',
    price: '€11',
    category: 'speciale',
    tags: ['vegetariana'],
    img: '/images/pizza-rucola.jpg',
  },
  {
    id: '1955',
    nameIt: '1955',
    nameEn: '1955',
    descIt: 'Pesto genovese, fior di latte, pomodorini gialli, salsiccia napoletana',
    descEn: 'Genovese pesto, fior di latte, yellow cherry tomatoes, Neapolitan sausage',
    price: '€11',
    category: 'speciale',
    tags: [],
    featured: true,
    img: '/images/pizza-1955.jpg',
  },
  {
    id: 'calzone',
    nameIt: 'Calzone Classico',
    nameEn: 'Classic Calzone',
    descIt: 'Prosciutto cotto, fior di latte, ricotta fresca',
    descEn: 'Cooked ham, fior di latte, fresh ricotta',
    price: '€10',
    category: 'calzone',
    tags: [],
    img: '/images/calzone.jpg',
  },
]

/* ═══════════════════════════════════════════════════════════════════
   LINGUA
═══════════════════════════════════════════════════════════════════ */
let currentLang = 'it'

function setLang(lang) {
  currentLang = lang
  document.documentElement.lang = lang
  document.querySelectorAll('[data-it]').forEach(el => {
    const val = el.dataset[lang] ?? el.dataset.it
    if (val !== undefined) el.innerHTML = val
  })
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang
    btn.classList.toggle('active', active)
    btn.setAttribute('aria-pressed', String(active))
  })
  renderMenuCards()
}

function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang))
  })
}

/* ═══════════════════════════════════════════════════════════════════
   MENÙ — RENDER
═══════════════════════════════════════════════════════════════════ */
function tagLabel(tag) {
  const labels = {
    it: { vegetariana: 'Vegetariana', vegana: 'Vegana', glutenfree: 'Senza glutine', lattosiofree: 'Senza lattosio' },
    en: { vegetariana: 'Vegetarian', vegana: 'Vegan', glutenfree: 'Gluten-free', lattosiofree: 'Lactose-free' },
  }
  return labels[currentLang]?.[tag] ?? tag
}

const tagIcon = { vegetariana: '🌱', vegana: '🌿', glutenfree: '🌾', lattosiofree: '🥛' }

function renderMenuCards() {
  const grid = document.getElementById('menu-grid')
  if (!grid) return

  grid.innerHTML = pizzaData.map(pizza => {
    const name = currentLang === 'it' ? pizza.nameIt : pizza.nameEn
    const desc = currentLang === 'it' ? pizza.descIt : pizza.descEn
    const tagsHtml = pizza.tags.map(t =>
      `<span class="menu-tag">${tagIcon[t] ?? ''} ${tagLabel(t)}</span>`
    ).join('')
    const featuredCls = pizza.featured ? ' menu-card--featured' : ''

    return `
      <article class="menu-card${featuredCls}"
               data-category="${pizza.category}"
               data-tags="${pizza.tags.join(',')}"
               data-id="${pizza.id}">
        <div class="menu-card__img-wrap">
          <img src="${pizza.img}"
               alt="Foto di ${name}"
               width="400" height="300"
               loading="lazy"
               decoding="async" />
          <div class="menu-card__img-placeholder" aria-hidden="true">[FOTO: ${name}]</div>
          <div class="menu-card__hover-heart" aria-hidden="true">♥</div>
        </div>
        <div class="menu-card__body">
          <div class="menu-card__top">
            <h3 class="menu-card__name">${name}</h3>
            <span class="menu-card__price">${pizza.price}</span>
          </div>
          <p class="menu-card__desc">${desc}</p>
          ${tagsHtml ? `<div class="menu-card__tags">${tagsHtml}</div>` : ''}
        </div>
      </article>`
  }).join('')

  applyFilters()
}

/* ═══════════════════════════════════════════════════════════════════
   MENÙ — FILTRI
═══════════════════════════════════════════════════════════════════ */
let activeCategory = 'tutte'
const activeDietary = new Set()

function applyFilters() {
  const cards = document.querySelectorAll('.menu-card')
  let visible = 0

  cards.forEach(card => {
    const matchCat = activeCategory === 'tutte' || card.dataset.category === activeCategory
    const cardTags = card.dataset.tags ? card.dataset.tags.split(',').filter(Boolean) : []
    const matchDiet = activeDietary.size === 0 || [...activeDietary].every(d => cardTags.includes(d))
    const show = matchCat && matchDiet
    card.classList.toggle('hidden', !show)
    if (show) visible++
  })

  const emptyMsg = document.getElementById('menu-empty')
  if (emptyMsg) emptyMsg.style.display = visible === 0 ? 'block' : 'none'
}

function initFilters() {
  document.querySelectorAll('.filter-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat
      document.querySelectorAll('.filter-cat').forEach(b => {
        b.classList.toggle('active', b === btn)
        b.setAttribute('aria-pressed', String(b === btn))
      })
      applyFilters()
    })
  })

  document.querySelectorAll('.filter-diet').forEach(btn => {
    btn.addEventListener('click', () => {
      const diet = btn.dataset.diet
      if (activeDietary.has(diet)) {
        activeDietary.delete(diet)
        btn.classList.remove('active')
        btn.setAttribute('aria-pressed', 'false')
      } else {
        activeDietary.add(diet)
        btn.classList.add('active')
        btn.setAttribute('aria-pressed', 'true')
      }
      applyFilters()
    })
  })
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress')
  if (!bar) return
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    const total = document.documentElement.scrollHeight - window.innerHeight
    bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%'
  }, { passive: true })
}

/* ═══════════════════════════════════════════════════════════════════
   COOKIE BANNER
═══════════════════════════════════════════════════════════════════ */
function initCookieBanner() {
  const banner = document.getElementById('cookie-banner')
  if (!banner) return

  if (localStorage.getItem('cc_centogrilli')) {
    banner.remove()
    return
  }

  setTimeout(() => banner.classList.add('visible'), 1800)

  document.getElementById('cc-accept')?.addEventListener('click', () => {
    localStorage.setItem('cc_centogrilli', 'all')
    banner.classList.remove('visible')
    setTimeout(() => banner.remove(), 400)
  })

  document.getElementById('cc-necessary')?.addEventListener('click', () => {
    localStorage.setItem('cc_centogrilli', 'necessary')
    banner.classList.remove('visible')
    setTimeout(() => banner.remove(), 400)
  })
}

/* ═══════════════════════════════════════════════════════════════════
   SWIPER RECENSIONI
═══════════════════════════════════════════════════════════════════ */
function initSwiper() {
  new Swiper('.recensioni-swiper', {
    modules: [Navigation, Autoplay],
    loop: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 1 },
      900:  { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 24 },
    },
  })
}

/* ═══════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('main-nav')
  const toggle = document.getElementById('menu-toggle')
  const links = document.getElementById('nav-links')

  // Scroll → nav scrolled state
  const onScroll = () => nav?.classList.toggle('nav--scrolled', window.scrollY > 60)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Mobile hamburger
  toggle?.addEventListener('click', () => {
    const open = links?.classList.toggle('open') ?? false
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu')
    document.body.style.overflow = open ? 'hidden' : ''
  })

  // Close on link click (mobile)
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open')
      toggle?.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    })
  })

  // Close on outside click
  document.addEventListener('click', e => {
    if (links?.classList.contains('open') &&
        !links.contains(e.target) &&
        !toggle?.contains(e.target)) {
      links.classList.remove('open')
      toggle?.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
    }
  })
}

/* ═══════════════════════════════════════════════════════════════════
   GSAP ANIMAZIONI
═══════════════════════════════════════════════════════════════════ */
function initAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Splitting.js — hero title chars
  Splitting({ target: '.title-word', by: 'chars' })

  if (reduced) {
    // Reveal everything immediately, no motion
    document.querySelectorAll(
      '.hero__eyebrow, .hero__tagline, .hero__actions, .hero__scroll-indicator, .anim-fade'
    ).forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  /* ── HERO ────────────────────────────────────────────────────── */
  // Set initial invisible state via JS (not CSS) so GSAP .from() has opacity:1 as target
  gsap.set(['.hero__eyebrow', '.hero__tagline', '.hero__actions', '.hero__scroll-indicator'], { opacity: 0 })

  const heroTl = gsap.timeline({ delay: 0.2 })

  heroTl
    .from('.hero__eyebrow', {
      y: 18, opacity: 0, duration: 0.6, ease: 'power3.out',
    })
    .from('.hero__title .char', {
      y: '115%',
      duration: 0.72,
      stagger: { amount: 0.42, from: 'start' },
      ease: 'power4.out',
    }, '-=0.2')
    .from('.title-heart', {
      scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2.5)',
    }, '-=0.15')
    .from('.hero__tagline', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    }, '-=0.1')
    .from('.hero__actions', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
    }, '-=0.35')
    .from('.hero__scroll-indicator', {
      y: 10, opacity: 0, duration: 0.5, ease: 'power2.out',
    }, '-=0.2')

  // Hide scroll indicator when user scrolls past hero
  ScrollTrigger.create({
    start: 80,
    onEnter:     () => gsap.to('.hero__scroll-indicator', { opacity: 0, y: -8, duration: 0.3 }),
    onLeaveBack: () => gsap.to('.hero__scroll-indicator', { opacity: 0.5, y: 0, duration: 0.3 }),
  })

  /* ── SCROLL-TRIGGERED FADES ─────────────────────────────────── */
  gsap.utils.toArray('.anim-fade').forEach(el => {
    gsap.fromTo(el,
      { y: 45, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
      }
    )
  })

  /* ── STORIA img ─────────────────────────────────────────────── */
  const storiaImg = document.querySelector('.storia__img-wrap')
  if (storiaImg) {
    gsap.from(storiaImg, {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: storiaImg, start: 'top 80%', once: true },
    })
  }

  /* ── BG NUMBER PARALLAX ─────────────────────────────────────── */
  const bgNum = document.querySelector('.storia__bg-num')
  if (bgNum) {
    gsap.to(bgNum, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: '.storia', scrub: 1.5 },
    })
  }

  /* ── FIRMA IMG PARALLAX ─────────────────────────────────────── */
  const firmaImg = document.querySelector('.firma__img-wrap img')
  if (firmaImg) {
    gsap.to(firmaImg, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: { trigger: '.firma', scrub: 1.5 },
    })
  }

  /* ── MENU CARDS STAGGER ─────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#menu-grid',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.from('.menu-card', {
        y: 50, opacity: 0,
        duration: 0.6,
        stagger: { amount: 0.5, from: 'start' },
        ease: 'power3.out',
      })
    },
  })

  /* ── SECTION LABELS SLIDE IN ────────────────────────────────── */
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      x: -25, opacity: 0, duration: 0.55, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  })
}

/* ═══════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initLang()
  initScrollProgress()
  initCookieBanner()
  renderMenuCards()
  initFilters()
  initSwiper()
  initAnimations()
})
