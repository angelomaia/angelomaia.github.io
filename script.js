// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Navbar background intensifies on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Close navbar on outside click or nav-link click (mobile)
(function () {
  const navEl     = document.getElementById('navbarNav');
  const toggler   = document.querySelector('.navbar-toggler');
  const getBS     = () => bootstrap.Collapse.getInstance(navEl);

  document.addEventListener('click', e => {
    if (!navEl.classList.contains('show')) return;
    if (!navEl.contains(e.target) && !toggler.contains(e.target)) getBS()?.hide();
  });

  navEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => getBS()?.hide());
  });
}());

// Dark / light mode toggle
(function () {
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    localStorage.setItem('theme', theme);
  }

  applyTheme(saved);

  btn.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}());

// i18n
(function () {
  const translations = {
    en: {
      'nav.about':    'About',
      'nav.skills':   'Skills',
      'nav.projects': 'Projects',
      'nav.contact':  'Contact',
      'hero.greeting':     "Hello, I'm",
      'hero.badge':        'Software Developer',
      'hero.desc':         'With a strong focus on <span class="accent-text">Ruby on Rails</span>, programming best practices, and improving user experience, I build robust and scalable solutions.',
      'hero.cta.contact':  'Get in Touch',
      'hero.cta.projects': 'View Projects',
      'skills.tag':   'Expertise',
      'skills.title': 'Tools & Technologies',
      'projects.tag':   'Work',
      'projects.title': 'Featured Projects',
      'projects.cadebuffet.desc':   'A comprehensive web application connecting clients with buffet service providers. Features include company and user registration, buffet listings, event scheduling, chat functionality, and review system.',
      'projects.paguealuguel.desc': 'A payment management system for condominiums, integrated with CondoMinions via API. Handles utility bills, condominium fees, and rental agreements with automated invoice generation.',
      'projects.rebaselabs.desc':   'A lightweight Ruby application using Sinatra for managing patient, doctor, and exam data. Features CSV file upload with background jobs, structured interface, and search functionality with pagination.',
      'contact.tag':   'Say Hello',
      'contact.title': "Let's Connect",
      'contact.sub':   "I'm always open to new opportunities and collaborations",
      'page.title':    'Angelo Maia | Software Developer',
    },
    pt: {
      'nav.about':    'Sobre',
      'nav.skills':   'Skills',
      'nav.projects': 'Projetos',
      'nav.contact':  'Contato',
      'hero.greeting':     'Olá, eu sou',
      'hero.badge':        'Desenvolvedor de Software',
      'hero.desc':         'Com foco em <span class="accent-text">Ruby on Rails</span>, boas práticas de programação e melhoria da experiência do usuário, construo soluções robustas e escaláveis.',
      'hero.cta.contact':  'Entre em Contato',
      'hero.cta.projects': 'Ver Projetos',
      'skills.tag':   'Expertise',
      'skills.title': 'Ferramentas & Tecnologias',
      'projects.tag':   'Trabalho',
      'projects.title': 'Projetos em Destaque',
      'projects.cadebuffet.desc':   'Uma aplicação web completa que conecta clientes a prestadores de buffet. Inclui cadastro de empresas e usuários, listagem de buffets, agendamento de eventos, chat e sistema de avaliações.',
      'projects.paguealuguel.desc': 'Um sistema de gestão de pagamentos para condomínios, integrado ao CondoMinions via API. Gerencia contas de consumo, taxas condominiais e contratos de aluguel com geração automática de faturas.',
      'projects.rebaselabs.desc':   'Uma aplicação Ruby leve com Sinatra para gerenciar dados de pacientes, médicos e exames. Conta com upload de CSV via jobs em background, interface estruturada e busca com paginação.',
      'contact.tag':   'Diga Olá',
      'contact.title': 'Vamos nos Conectar',
      'contact.sub':   'Estou sempre aberto a novas oportunidades e colaborações',
      'page.title':    'Angelo Maia | Desenvolvedor de Software',
    },
  };

  const btn = document.getElementById('langToggle');
  let current = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.title = t['page.title'];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    btn.textContent = lang === 'en' ? 'PT' : 'EN';
    localStorage.setItem('lang', lang);
    current = lang;
  }

  applyLang(current);

  btn.addEventListener('click', () => applyLang(current === 'en' ? 'pt' : 'en'));
}());

// Flip card — click toggles state; hover CSS handles desktop; glow fires on every flip
(function () {
  const flipper = document.querySelector('.profile-flipper');
  if (!flipper) return;
  const glow = flipper.parentElement.querySelector('.profile-glow');

  flipper.addEventListener('click', () => {
    flipper.classList.toggle('is-flipped');
    if (glow) {
      glow.style.animation = 'none';
      void glow.offsetHeight; // force reflow so animation restarts
      glow.style.animation = 'radiate 0.7s ease-out';
      glow.addEventListener('animationend', () => { glow.style.animation = ''; }, { once: true });
    }
  });
}());

// Reveal-on-scroll via IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Infinite peek carousel
(function () {
  const track     = document.querySelector('.carousel-track');
  const realSlides = [...document.querySelectorAll('.carousel-slide')];
  const dots       = [...document.querySelectorAll('.carousel-indicators-custom button')];
  if (!track || realSlides.length < 2) return;

  const N          = realSlides.length;
  const SLIDE_PCT  = 68;
  const GAP_REM    = 1.5;
  const OFFSET     = (100 - SLIDE_PCT) / 2; // centres slide in wrapper

  // Prepend clone of last slide, append clone of first slide.
  // Track becomes: [lastClone, slide0, slide1, …, slideN-1, firstClone]
  const lastClone  = realSlides[N - 1].cloneNode(true);
  const firstClone = realSlides[0].cloneNode(true);
  lastClone.classList.remove('active');
  firstClone.classList.remove('active');
  track.insertBefore(lastClone, realSlides[0]);
  track.appendChild(firstClone);

  // allSlides index: 0 = lastClone, 1..N = real, N+1 = firstClone
  const allSlides = [...track.querySelectorAll('.carousel-slide')];
  let pos       = 1;   // start on first real slide
  let animating = false;

  function render(p, animate) {
    if (!animate) {
      track.style.transition = 'none';
      track.offsetWidth; // flush so 'none' is applied before transform
    } else {
      track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
    track.style.transform =
      `translateX(calc(${OFFSET}% - ${p} * (${SLIDE_PCT}% + ${GAP_REM}rem)))`;

    allSlides.forEach((s, i) => s.classList.toggle('active', i === p));
    const realIdx = ((p - 1) % N + N) % N;
    dots.forEach((d, i) => d.classList.toggle('active', i === realIdx));
  }

  function goTo(p) {
    if (animating || p === pos) return;
    animating = true;
    pos = p;
    render(pos, true);
  }

  // After animating into a clone, silently jump to the real equivalent
  track.addEventListener('transitionend', e => {
    if (e.target !== track || e.propertyName !== 'transform') return;
    if (pos === 0)     { pos = N; render(pos, false); }
    else if (pos === N + 1) { pos = 1; render(pos, false); }
    animating = false;
  });

  render(1, false);

  document.getElementById('carouselPrev').addEventListener('click', () => goTo(pos - 1));
  document.getElementById('carouselNext').addEventListener('click', () => goTo(pos + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i + 1)));

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 45) goTo(dx < 0 ? pos + 1 : pos - 1);
  }, { passive: true });
}());
