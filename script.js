/**
 * Tenurima – interações da landing page (JavaScript vanilla, sem dependências).
 *
 * Módulos:
 *  - initMarquee    → faixa de selos em loop infinito, sem "salto"
 *  - initAccordion  → FAQ com apenas um item aberto por vez
 *  - initCarousel   → carrossel de depoimentos renderizado a partir de dados
 *  - auditCtas      → alerta no console se algum CTA ficar sem destino
 */
'use strict';

/* --------------------------------------------------------------------------
   Dados
   Michael R. e Susan L. (nomes e falas) vêm do briefing; Walter J. e Diane K.
   são nomes e falas placeholder para as fotos 3 e 4 (ver README).
   `photo` é o caminho sem extensão: o .webp é a fonte principal e o .png o fallback.
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    name: 'Michael R.',
    age: 62,
    location: 'Texas',
    photo: 'assets/img/testimonial-michael',
    alt: 'Michael R., a senior man in a black T-shirt, holding a bottle of Tenurima in his living room',
    text: 'My blood pressure used to worry me at every checkup. After two months on Tenurima™, my doctor noticed the difference — and so did I.',
  },
  {
    name: 'Susan L.',
    age: 65,
    location: 'Florida',
    photo: 'assets/img/testimonial-susan',
    alt: 'Susan L., a smiling senior woman in a striped sweater, holding a bottle of Tenurima',
    text: "I've wasted money on supplements that did nothing. Tenurima™ is different — I have more energy for my grandkids and finally feel like myself again.",
  },
  {
    name: 'Walter J.',
    age: 71,
    location: 'Georgia',
    photo: 'assets/img/testimonial-walter',
    alt: 'Walter J., a senior man in a blue button-up shirt, holding a bottle of Tenurima in his kitchen',
    text: "By the end of the day my legs used to feel heavy and cold. A few weeks into Tenurima™ my circulation feels better, and I'm back to my evening walks.",
  },
  {
    name: 'Diane K.',
    age: 58,
    location: 'Arizona',
    photo: 'assets/img/testimonial-diane',
    alt: 'Diane K., a woman with long gray hair in a blue linen shirt, holding a bottle of Tenurima',
    text: 'I wanted something natural to add to my routine. With Tenurima™ my readings have been steadier and I have the energy to keep up with my day.',
  },
];

const SVG_NS = 'http://www.w3.org/2000/svg';

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

/** Cria um <svg><use href="#icon-..."></svg> a partir do sprite do index.html */
function createIcon(name, className = 'icon') {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(SVG_NS, 'use');
  use.setAttribute('href', `#icon-${name}`);
  svg.append(use);
  return svg;
}

/** Cria um elemento com classe e texto (textContent evita injeção de HTML) */
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/** Agrupa chamadas em um único frame (usado em resize/scroll) */
function rafThrottle(fn) {
  let frame = 0;
  return (...args) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...args);
    });
  };
}

/* --------------------------------------------------------------------------
   Header
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   Marquee
   Clona o grupo de itens quantas vezes forem necessárias para cobrir a
   largura do container + 1 grupo extra. A animação desloca exatamente a
   largura de UM grupo e reinicia: como o grupo seguinte é idêntico, o
   loop não tem salto. O container tem overflow: hidden no CSS.
   -------------------------------------------------------------------------- */
const MARQUEE_SPEED = 50; // px por segundo – velocidade constante em qualquer largura

function initMarquee(marquee) {
  const track = marquee.querySelector('.marquee__track');
  const group = track && track.querySelector('.marquee__group');
  if (!group) return;

  let lastWidth = 0;

  const build = () => {
    const containerWidth = marquee.clientWidth;
    const groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth || !containerWidth) return;

    track.querySelectorAll('[data-marquee-clone]').forEach((clone) => clone.remove());

    const copies = Math.ceil(containerWidth / groupWidth) + 1;
    for (let i = 0; i < copies; i += 1) {
      const clone = group.cloneNode(true);
      clone.setAttribute('data-marquee-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    }

    marquee.style.setProperty('--marquee-shift', `${groupWidth}px`);
    marquee.style.setProperty('--marquee-duration', `${(groupWidth / MARQUEE_SPEED).toFixed(2)}s`);
    marquee.classList.add('is-ready');
    lastWidth = containerWidth;
  };

  build();

  // Recalcula quando a largura muda (rotação, resize) ou quando as fontes carregam
  const observer = new ResizeObserver(rafThrottle(() => {
    if (marquee.clientWidth !== lastWidth) build();
  }));
  observer.observe(marquee);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(build);
  }
}

/* --------------------------------------------------------------------------
   Accordion (FAQ)
   -------------------------------------------------------------------------- */
function initAccordion(accordion) {
  const items = Array.from(accordion.querySelectorAll('.accordion__item'));
  const triggers = items.map((item) => item.querySelector('.accordion__trigger'));

  const setOpen = (item, open) => {
    item.classList.toggle('is-open', open);
    item.querySelector('.accordion__trigger').setAttribute('aria-expanded', String(open));
  };

  // Sincroniza o estado inicial com o aria-expanded definido no HTML
  items.forEach((item) => {
    setOpen(item, item.querySelector('.accordion__trigger').getAttribute('aria-expanded') === 'true');
  });

  items.forEach((item, index) => {
    const trigger = triggers[index];

    trigger.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      // Apenas um item aberto por vez
      items.forEach((other) => setOpen(other, other === item && willOpen));
    });

    // Navegação por teclado entre as perguntas (padrão WAI-ARIA)
    trigger.addEventListener('keydown', (event) => {
      const last = triggers.length - 1;
      const targets = {
        ArrowDown: index === last ? 0 : index + 1,
        ArrowUp: index === 0 ? last : index - 1,
        Home: 0,
        End: last,
      };
      if (event.key in targets) {
        event.preventDefault();
        triggers[targets[event.key]].focus();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Carrossel de depoimentos
   - 1 card por vez no mobile/tablet, 2 no desktop (valor lido de --per-view
     no CSS, para que o breakpoint exista em um único lugar)
   - Avança 1 card por clique; setas desabilitam nas extremidades
   - Suporta teclado (← →), swipe e bolinhas de paginação
   -------------------------------------------------------------------------- */
function createTestimonialSlide(testimonial, index, total) {
  const slide = createEl('div', 'carousel__slide');
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} of ${total}`);

  const card = createEl('article', 'testimonial');

  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = `${testimonial.photo}.webp?v=13`;
  source.type = 'image/webp';

  const photo = document.createElement('img');
  photo.className = 'testimonial__photo';
  photo.src = `${testimonial.photo}.png?v=13`;
  photo.width = 226;
  photo.height = 330;
  photo.loading = 'lazy';
  photo.alt = testimonial.alt;
  picture.append(source, photo);

  const body = createEl('div', 'testimonial__body');

  const stars = createEl('span', 'stars');
  stars.setAttribute('role', 'img');
  stars.setAttribute('aria-label', '5 out of 5 stars');
  for (let i = 0; i < 5; i += 1) stars.append(createIcon('star'));

  const quote = createEl('blockquote', 'testimonial__quote');
  quote.append(createEl('p', '', `“${testimonial.text}”`));

  const author = createEl('p', 'testimonial__author', `${testimonial.name}, ${testimonial.age} – ${testimonial.location}`);

  const verified = createEl('p', 'verified');
  verified.append(createIcon('check'), document.createTextNode('Verified Purchase'));

  body.append(stars, quote, author, verified);
  card.append(picture, body);
  slide.append(card);
  return slide;
}

function initCarousel(carousel, data) {
  const track = carousel.querySelector('[data-carousel-track]');
  const viewport = carousel.querySelector('.carousel__viewport');
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  const dotsWrap = carousel.querySelector('[data-carousel-dots]');
  const status = carousel.querySelector('[data-carousel-status]');
  if (!track || !prev || !next || !data.length) return;

  const slides = data.map((item, i) => createTestimonialSlide(item, i, data.length));
  track.append(...slides);

  let index = 0;
  let perView = 1;
  let dots = [];

  const getPerView = () => {
    const value = parseInt(getComputedStyle(carousel).getPropertyValue('--per-view'), 10);
    return Number.isNaN(value) ? 1 : Math.min(value, slides.length);
  };

  const maxIndex = () => Math.max(0, slides.length - perView);

  const renderDots = () => {
    dotsWrap.replaceChildren();
    dots = Array.from({ length: maxIndex() + 1 }, (_, i) => {
      const dot = createEl('button', 'carousel__dot');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.append(dot);
      return dot;
    });
  };

  function update() {
    track.style.transform = `translateX(${(-index * 100) / perView}%)`;

    slides.forEach((slide, i) => {
      const visible = i >= index && i < index + perView;
      slide.setAttribute('aria-hidden', String(!visible));
    });

    // Se o botão focado ficar desabilitado, o foco vai para o outro lado
    const focused = document.activeElement;
    prev.disabled = index === 0;
    next.disabled = index >= maxIndex();
    if (focused === prev && prev.disabled) next.focus();
    if (focused === next && next.disabled) prev.focus();

    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));

    const first = index + 1;
    const last = Math.min(index + perView, slides.length);
    status.textContent = first === last
      ? `Showing testimonial ${first} of ${slides.length}`
      : `Showing testimonials ${first} to ${last} of ${slides.length}`;
  }

  function goTo(target) {
    index = Math.min(Math.max(target, 0), maxIndex());
    update();
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') goTo(index - 1);
    if (event.key === 'ArrowRight') goTo(index + 1);
  });

  // Swipe com Pointer Events (touch, caneta e mouse)
  const SWIPE_THRESHOLD = 50;
  let startX = null;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX = event.clientX;
  });

  viewport.addEventListener('pointerup', (event) => {
    if (startX === null) return;
    const deltaX = event.clientX - startX;
    startX = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    goTo(deltaX < 0 ? index + 1 : index - 1);
  });

  viewport.addEventListener('pointercancel', () => {
    startX = null;
  });

  // Evita que imagens sejam "arrastadas" pelo navegador ao fazer swipe com mouse
  viewport.addEventListener('dragstart', (event) => event.preventDefault());

  const syncLayout = () => {
    const newPerView = getPerView();
    if (newPerView === perView && dots.length) return;
    perView = newPerView;
    renderDots();
    goTo(index);
  };

  // Mantém as setas centradas nos cards, sem depender da altura dos textos
  const syncArrows = () => {
    const height = viewport.getBoundingClientRect().height;
    const padding = parseFloat(getComputedStyle(viewport).paddingBottom) || 0;
    if (height) carousel.style.setProperty('--arrow-center', `${(height - padding) / 2}px`);
  };

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(rafThrottle(syncArrows)).observe(viewport);
  }

  window.addEventListener('resize', rafThrottle(() => {
    syncLayout();
    syncArrows();
  }));
  perView = getPerView();
  renderDots();
  update();
  syncArrows();
}

/* --------------------------------------------------------------------------
   Auditoria de CTAs
   Garante (em desenvolvimento) que nenhum botão de compra fique sem destino.
   Não gera saída no console quando está tudo certo.
   -------------------------------------------------------------------------- */
function auditCtas() {
  const broken = Array.from(document.querySelectorAll('a.btn, a.buy-btn')).filter((link) => {
    const href = link.getAttribute('href');
    return !href || href === '#';
  });
  if (broken.length) {
    console.error('[Tenurima] CTA(s) sem destino encontrado(s):', broken);
  }
}

/* --------------------------------------------------------------------------
   Boot – listeners anexados somente depois que o DOM estiver pronto
   -------------------------------------------------------------------------- */
function init() {
  document.querySelectorAll('[data-marquee]').forEach(initMarquee);
  document.querySelectorAll('[data-accordion]').forEach(initAccordion);
  document.querySelectorAll('[data-carousel]').forEach((carousel) => initCarousel(carousel, TESTIMONIALS));
  auditCtas();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
