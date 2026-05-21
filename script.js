// ── Nav scroll shrink ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Scroll reveal ──────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── Lightbox ───────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');
const lbPrev   = document.getElementById('lb-prev');
const lbNext   = document.getElementById('lb-next');

const photos = Array.from(document.querySelectorAll('.photo-item img'));
let current = 0;

lbImg.style.transition = 'opacity .12s ease';

function openLightbox(index) {
  current = index;
  lbImg.src = photos[current].src;
  lbImg.alt = photos[current].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  current = (current + dir + photos.length) % photos.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = photos[current].src;
    lbImg.alt = photos[current].alt;
    lbImg.style.opacity = '1';
  }, 120);
}

photos.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
lbNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(+1); });

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'ArrowRight') navigate(+1);
});
