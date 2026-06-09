/* ════════════════════════════════════════════
   BEL CUP 2026 — SCRIPT.JS
   ════════════════════════════════════════════ */

'use strict';

/* ── DOM References ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const openModalBtn = document.getElementById('openModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const regForm = document.getElementById('regForm');
const modalSuccess = document.getElementById('modalSuccess');
const backToTop = document.getElementById('backToTop');
const playerCategory = document.getElementById('playerCategory');
const partnerGroup = document.getElementById('partnerGroup');

// Invitation lightbox
const invLightbox = document.getElementById('invLightbox');
const invOverlay = document.getElementById('invOverlay');
const invClose = document.getElementById('invClose');
const openInvHero = document.getElementById('openInvitation');
const openInvFees = document.getElementById('openInvitationFees');


/* ════════════════════════════════════════════
   1. STICKY NAVBAR
   ════════════════════════════════════════════ */
function handleNavbarScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* ════════════════════════════════════════════
   2. HAMBURGER MENU
   ════════════════════════════════════════════ */
function openMobileMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});
mobileLinks.forEach(l => l.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeMobileMenu(); closeModal(); closeInvitation(); }
});


/* ════════════════════════════════════════════
   3. COUNTDOWN — Target: 21 June 2026, 10:00 AM IST
   ════════════════════════════════════════════ */
const TARGET_DATE = new Date('2026-06-21T10:00:00+05:30').getTime();

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) {
    const cd = document.getElementById('countdown');
    if (cd && !cd.dataset.over) {
      cd.dataset.over = 'true';
      cd.innerHTML = `<div class="tournament-day-banner">🏸 Tournament Day Is Here! 🏆</div>`;
    }
    return;
  }
  const s = Math.floor(diff / 1000);
  daysEl.textContent = pad(Math.floor(s / 86400));
  hoursEl.textContent = pad(Math.floor((s % 86400) / 3600));
  minutesEl.textContent = pad(Math.floor((s % 3600) / 60));
  secondsEl.textContent = pad(s % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* ════════════════════════════════════════════
   4. SCROLL REVEAL
   ════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ════════════════════════════════════════════
   6. INVITATION LIGHTBOX
   ════════════════════════════════════════════ */
function openInvitation() {
  invLightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeInvitation() {
  invLightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (openInvHero) openInvHero.addEventListener('click', openInvitation);
if (openInvFees) openInvFees.addEventListener('click', openInvitation);
if (invClose) invClose.addEventListener('click', closeInvitation);
if (invOverlay) invOverlay.addEventListener('click', closeInvitation);


/* ════════════════════════════════════════════
   7. BACK-TO-TOP
   ════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ════════════════════════════════════════════
   8. SMOOTH SCROLL (navbar offset)
   ════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8, behavior: 'smooth' });
  });
});


/* ════════════════════════════════════════════
   9. ACTIVE NAV HIGHLIGHT
   ════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe && sections.forEach(s => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
});

// inject active link style
const styleTag = document.createElement('style');
styleTag.textContent = `
  .nav-links a.active { color: var(--neon-green) !important; }
  .nav-links a.active::after { width: 100% !important; }
  .tournament-day-banner {
    font-family: var(--font-display, 'Bebas Neue', sans-serif);
    font-size: clamp(1.1rem, 3.5vw, 1.8rem);
    letter-spacing: 0.1em;
    color: var(--neon-green, #39ff14);
    text-shadow: 0 0 20px rgba(57,255,20,0.8);
    text-align: center;
    padding: 12px 24px;
    border: 1px solid rgba(57,255,20,0.3);
    border-radius: 12px;
    background: rgba(57,255,20,0.05);
    animation: glowPulse 2s ease-in-out infinite;
  }
`;
document.head.appendChild(styleTag);


/* ════════════════════════════════════════════
   10. COUNT-UP — Prize Amounts
   ════════════════════════════════════════════ */
function countUp(el, target, duration = 700) {
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = '₹' + Math.round(target * e).toLocaleString('en-IN');
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = '₹' + target.toLocaleString('en-IN');
  })(t0);
}

new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const val = parseInt(e.target.textContent.replace(/[₹,]/g, ''), 10);
      if (!isNaN(val)) countUp(e.target, val);
      e.target._prizeObs && e.target._prizeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.prize-amt').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const val = parseInt(e.target.textContent.replace(/[₹,]/g, ''), 10);
        if (!isNaN(val)) countUp(e.target, val);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});


/* ════════════════════════════════════════════
   11. COUNT-UP — Fee Numbers
   ════════════════════════════════════════════ */
document.querySelectorAll('.fee-number').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const val = parseInt(e.target.textContent, 10);
        if (!isNaN(val)) {
          const t0 = performance.now();
          (function step(now) {
            const p = Math.min((now - t0) / 600, 1);
            e.target.textContent = Math.round(val * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step); else e.target.textContent = val;
          })(t0);
        }
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  obs.observe(el);
});


/* ════════════════════════════════════════════
   12. COUNT-UP — About Stats
   ════════════════════════════════════════════ */
document.querySelectorAll('.stat-num').forEach(el => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const txt = e.target.textContent;
        const prefix = txt.includes('₹') ? '₹' : '';
        const suffix = txt.includes('K') ? 'K+' : txt.includes('+') ? '+' : '';
        const val = parseFloat(txt.replace(/[₹K+]/g, ''));
        if (!isNaN(val)) {
          const t0 = performance.now();
          (function step(now) {
            const p = Math.min((now - t0) / 900, 1);
            const c = val * (1 - Math.pow(1 - p, 3));
            e.target.textContent = prefix + (Number.isInteger(val) ? Math.round(c) : c.toFixed(0)) + suffix;
            if (p < 1) requestAnimationFrame(step); else e.target.textContent = prefix + val + suffix;
          })(t0);
        }
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  obs.observe(el);
});


/* ════════════════════════════════════════════
   13. HERO PARALLAX
   ════════════════════════════════════════════ */
const heroEl = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (heroEl) heroEl.style.backgroundPositionY = `calc(center + ${window.scrollY * 0.28}px)`;
}, { passive: true });


console.log('%c🏆 BEL CUP 2026 — Ready! Play with Passion · Compete with Spirit · Celebrate the Game', 'color:#39ff14;font-weight:bold;font-size:0.9rem;');