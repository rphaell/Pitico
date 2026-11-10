/* Pitico Pet Care — interações */
(function () {
  'use strict';

  // ====== Configuração do WhatsApp (altere aqui se mudar o número) ======
  var WHATSAPP_NUMERO = '557998899410'; // +55 79 9889-9410
  var MENSAGEM_PADRAO = 'Oi, Jessica! Vim pelo site da Pitico Pet Care e gostaria de mais informações 🐾';

  // Monta os links do WhatsApp com mensagem pronta
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var msg = el.getAttribute('data-msg') || MENSAGEM_PADRAO;
    el.setAttribute('href', 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(msg));
  });

  // Ano atual no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Cabeçalho com sombra ao rolar + botão fixo do WhatsApp
  var header = document.querySelector('.header');
  var waFloat = document.querySelector('.wa-float');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (waFloat) waFloat.classList.toggle('is-visible', y > 280);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  // Mostra o botão mesmo sem rolar, depois de alguns segundos
  setTimeout(function () { if (waFloat) waFloat.classList.add('is-visible'); }, 2500);

  // Menu mobile
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  function closeMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('is-open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) closeMenu(); });
  }

  // Animações de entrada ao rolar
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    // Pequeno atraso em cascata para itens lado a lado
    document.querySelectorAll('.cards, .plans, .hero__text, .about__text').forEach(function (group) {
      group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
        el.style.setProperty('--d', Math.min(i * 0.08, 0.5) + 's');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Planos: no celular, começa centralizado no plano mais adquirido
  var plans = document.querySelector('.plans');
  var featured = document.querySelector('.plan--featured');
  if (plans && featured && plans.scrollWidth > plans.clientWidth) {
    var pr = plans.getBoundingClientRect(), fr = featured.getBoundingClientRect();
    plans.scrollLeft += (fr.left - pr.left) - (pr.width - fr.width) / 2;
  }
})();
