/* ═══════════════════════════════════════════════════════════
   khadijazaman.com — shared site behaviour
   Loaded on every page. Guards every feature by element presence.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Scroll-reveal ── */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
    // Safety net so nothing stays invisible if the observer never fires.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 1500);
  }

  /* ── Nav background on scroll ── */
  var navEl = document.querySelector('nav');
  if (navEl) {
    window.addEventListener('scroll', function () {
      navEl.style.background = window.scrollY > 20 ? 'rgba(5,7,9,0.95)' : 'rgba(5,7,9,0.82)';
    }, { passive: true });
  }

  /* ── Mobile nav toggle ── */
  var navToggle  = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (navToggle && mobileMenu) {
    var closeMenu = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMenu(); }
      else {
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  /* ── Contact form → mailto ── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      var name   = (f.name    && f.name.value    || '').trim();
      var email  = (f.email   && f.email.value   || '').trim();
      var intent = (f.intent  && f.intent.value  || '');
      var msg    = (f.message && f.message.value || '').trim();
      var subject = encodeURIComponent('Website enquiry' + (intent ? ': ' + intent : ''));
      var body = encodeURIComponent(
        'Name: '  + name  + '\n' +
        'Email: ' + email + '\n' +
        (intent ? 'Looking for: ' + intent + '\n' : '') +
        (msg ? '\n' + msg + '\n' : '')
      );
      window.location.href = 'mailto:khadijarafiqzaman@gmail.com?subject=' + subject + '&body=' + body;
      var btn = f.querySelector('.btn-submit');
      if (btn) { var t = btn.textContent; btn.textContent = 'Opening your email client…'; setTimeout(function () { btn.textContent = t; }, 3000); }
    });
  }

  /* ── Newsletter form (placeholder → mailto until an ESP is wired) ── */
  var newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (newsForm.querySelector('input[type="email"]') || {}).value || '';
      window.location.href = 'mailto:khadijarafiqzaman@gmail.com?subject=' +
        encodeURIComponent('Newsletter subscribe') +
        '&body=' + encodeURIComponent('Please add me to the newsletter: ' + email);
      var btn = newsForm.querySelector('button');
      if (btn) { btn.textContent = 'Opening email…'; }
    });
  }

  /* ── 3D card tilt (hover) ── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.exp-card, .case-card, .tool-card, .post-card, .stat-chip').forEach(function (card) {
      var raf;
      card.addEventListener('mousemove', function (e) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width  - 0.5;
          var y = (e.clientY - r.top)  / r.height - 0.5;
          card.style.transform  = 'perspective(700px) rotateX(' + (-y * 12) + 'deg) rotateY(' + (x * 12) + 'deg) translateZ(6px)';
          card.style.transition = 'transform 0.08s linear, border-color 0.25s, box-shadow 0.25s';
        });
      });
      card.addEventListener('mouseleave', function () {
        cancelAnimationFrame(raf);
        card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1), border-color 0.25s, box-shadow 0.25s';
        card.style.transform = '';
      });
    });
  }
})();
