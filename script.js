const timelineItems = [...document.querySelectorAll('.timeline-item')];
const timelineImage = document.querySelector('#timeline-image');
const timelineCaption = document.querySelector('#timeline-caption');

timelineItems.forEach((item) => {
  item.querySelector('.year-button').addEventListener('click', () => {
    timelineItems.forEach((entry) => {
      const active = entry === item;
      entry.classList.toggle('active', active);
      entry.querySelector('.year-button').setAttribute('aria-expanded', String(active));
      entry.querySelector('.year-button b').textContent = active ? '−' : '+';
    });
    timelineImage.style.opacity = '0';
    window.setTimeout(() => {
      timelineImage.src = item.dataset.image;
      timelineImage.alt = `Исторический кадр IRONMAN: ${item.dataset.year}`;
      timelineCaption.textContent = `${item.dataset.year} — ${item.querySelector('h3').textContent.toLocaleUpperCase('ru')}`;
      timelineImage.style.opacity = '1';
    }, 180);
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
document.querySelectorAll('.gallery-card').forEach((card) => card.addEventListener('click', () => {
  lightboxImage.src = card.dataset.src;
  lightboxImage.alt = card.querySelector('img').alt;
  lightboxCaption.textContent = card.dataset.caption;
  lightbox.showModal();
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

const progressBar = document.querySelector('.scroll-progress span');
let progressFrame = 0;
const updateScrollProgress = () => {
  progressFrame = 0;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};
window.addEventListener('scroll', () => {
  if (!progressFrame) progressFrame = window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });
window.addEventListener('resize', updateScrollProgress, { passive: true });
updateScrollProgress();

const revealTargets = document.querySelectorAll(
  '.intro-grid, .origin-photo, .distance-heading, .legs, .timeline-top, .timeline-layout, .kazakhstan-heading, .kazakhstan-source, .quote-band, .gallery-heading, .gallery-grid, .closing-content'
);
revealTargets.forEach((element) => element.classList.add('motion-reveal'));
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
} else {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
  revealTargets.forEach((element) => revealObserver.observe(element));
}
