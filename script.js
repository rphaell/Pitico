// Add the official international number here, using digits only, e.g. 55 + DDD + number.
const WHATSAPP_NUMBER = '';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.setAttribute('aria-label','Abrir menu');
  navigation.classList.remove('open');
}));
const dialog = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach(button => {
  button.addEventListener('click', () => {
    const service = button.dataset.contact;
    if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      const message = service ? `Olá, Pitico! Gostaria de saber mais sobre ${service}.` : 'Olá, Pitico! Gostaria de conversar sobre os cuidados com meu pet.';
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    } else {
      document.querySelector('#contact-description').textContent = service ? `Quer conversar sobre ${service.toLowerCase()}? Por enquanto, fale com a Pitico pelo Instagram.` : 'Por enquanto, você pode falar com a Pitico pelo Instagram.';
      dialog.showModal();
    }
  });
});
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); }});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}), {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
