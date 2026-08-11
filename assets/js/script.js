'use strict';

/* ---------- Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Sticky header shadow on scroll ---------- */
const header = document.getElementById('site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu toggle ---------- */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const toggleIcon = navToggle.querySelector('ion-icon');

const closeMenu = () => {
  header.classList.remove('menu-open');
  toggleIcon.setAttribute('name', 'menu-outline');
  navToggle.setAttribute('aria-expanded', 'false');
};

navToggle.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  toggleIcon.setAttribute('name', open ? 'close-outline' : 'menu-outline');
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

/* ---------- Active nav link via scroll spy ---------- */
const sections = [...document.querySelectorAll('main section[id]')];
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const link = linkFor(e.target.id);
      if (!link) return;
      if (e.isIntersecting) {
        navLinks.querySelectorAll('a').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach((s) => spy.observe(s));

/* ---------- Scroll reveal ---------- */
const revealer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => revealer.observe(el));

/* ---------- TEDx read-more ---------- */
const tedxToggle = document.getElementById('tedx-toggle');
const tedxMore = document.getElementById('tedx-more');

if (tedxToggle && tedxMore) tedxToggle.addEventListener('click', () => {
  const open = tedxMore.hasAttribute('hidden');
  if (open) {
    tedxMore.removeAttribute('hidden');
  } else {
    tedxMore.setAttribute('hidden', '');
  }
  tedxToggle.setAttribute('aria-expanded', String(open));
  tedxToggle.innerHTML = open
    ? 'Show less <ion-icon name="chevron-up-outline"></ion-icon>'
    : 'Read the talk <ion-icon name="chevron-down-outline"></ion-icon>';
});
