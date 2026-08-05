/* ═══════════════════════════════════════════════════════════
   khadijazaman.com — shared site behaviour
   Loaded on every page. Guards every feature by element presence.
═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     CONFIG — fill these two in, then redeploy. Both are optional:
     leave blank and the site still works (forms fall back to email,
     analytics simply doesn't load).
  ═══════════════════════════════════════════════════════════ */
  var WEB3FORMS_KEY   = '';   // free access key from https://web3forms.com
  var GA_MEASUREMENT_ID = ''; // e.g. 'G-XXXXXXXXXX' from Google Analytics 4

  var CONTACT_EMAIL = 'khadijarafiqzaman@gmail.com';

  /* ── Google Analytics 4 (loads on every page, only if an ID is set) ── */
  if (/^G-\w+$/.test(GA_MEASUREMENT_ID)) {
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  /* Show a small status line under a form. */
  function setStatus(form, message, ok) {
    var el = form.querySelector('.form-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'form-status';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      form.appendChild(el);
    }
    el.textContent = message;
    el.className = 'form-status' + (ok === true ? ' ok' : ok === false ? ' err' : '');
  }

  /* POST a form to Web3Forms. Returns a promise. */
  function submitWeb3Forms(form, extra) {
    var data = new FormData(form);
    data.append('access_key', WEB3FORMS_KEY);
    Object.keys(extra || {}).forEach(function (k) { data.append(k, extra[k]); });
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Accept': 'application/json' }, body: data
    }).then(function (r) { return r.json(); });
  }

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

  /* ── Contact form → Web3Forms (falls back to mailto if no key) ── */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var f = e.target;
      var intent = (f.intent && f.intent.value) || '';

      if (!WEB3FORMS_KEY) {
        e.preventDefault();
        var name  = (f.name  && f.name.value  || '').trim();
        var email = (f.email && f.email.value || '').trim();
        var msg   = (f.message && f.message.value || '').trim();
        var subject = encodeURIComponent('Website enquiry' + (intent ? ': ' + intent : ''));
        var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n' +
          (intent ? 'Looking for: ' + intent + '\n' : '') + (msg ? '\n' + msg + '\n' : ''));
        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
        var mb = f.querySelector('.btn-submit');
        if (mb) { var mt = mb.textContent; mb.textContent = 'Opening your email client…'; setTimeout(function () { mb.textContent = mt; }, 3000); }
        return;
      }

      e.preventDefault();
      var btn = f.querySelector('.btn-submit');
      var orig = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      setStatus(f, '', null);

      submitWeb3Forms(f, {
        subject: 'New enquiry from khadijazaman.com' + (intent ? ' — ' + intent : ''),
        from_name: 'khadijazaman.com'
      }).then(function (json) {
        if (json && json.success) {
          f.reset();
          if (btn) btn.textContent = 'Sent ✓';
          setStatus(f, 'Thanks — your message is in. I respond within 24–48 hours.', true);
          if (window.gtag) window.gtag('event', 'generate_lead', { form: 'contact' });
          setTimeout(function () { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 4000);
        } else { throw new Error((json && json.message) || 'Submission failed'); }
      }).catch(function () {
        if (btn) { btn.textContent = orig; btn.disabled = false; }
        setStatus(f, 'Something went wrong. Please email ' + CONTACT_EMAIL + ' directly.', false);
      });
    });
  }

  /* ── Newsletter form → Web3Forms (falls back to mailto if no key) ── */
  var newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      var email = (newsForm.querySelector('input[type="email"]') || {}).value || '';

      if (!WEB3FORMS_KEY) {
        e.preventDefault();
        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' +
          encodeURIComponent('Newsletter subscribe') +
          '&body=' + encodeURIComponent('Please add me to the newsletter: ' + email);
        var nb = newsForm.querySelector('button');
        if (nb) { nb.textContent = 'Opening email…'; }
        return;
      }

      e.preventDefault();
      var btn = newsForm.querySelector('button');
      var orig = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Subscribing…'; }
      setStatus(newsForm, '', null);

      submitWeb3Forms(newsForm, {
        subject: 'Newsletter subscribe — khadijazaman.com',
        from_name: 'khadijazaman.com newsletter'
      }).then(function (json) {
        if (json && json.success) {
          newsForm.reset();
          if (btn) btn.textContent = 'Subscribed ✓';
          setStatus(newsForm, "You're on the list. Thanks for subscribing.", true);
          if (window.gtag) window.gtag('event', 'sign_up', { form: 'newsletter' });
          setTimeout(function () { if (btn) { btn.textContent = orig; btn.disabled = false; } }, 4000);
        } else { throw new Error((json && json.message) || 'Submission failed'); }
      }).catch(function () {
        if (btn) { btn.textContent = orig; btn.disabled = false; }
        setStatus(newsForm, 'Something went wrong — please try again.', false);
      });
    });
  }

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress bar (injected once, works on every page) ── */
  if (!REDUCE) {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var barTicking = false;
    var updateBar = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      barTicking = false;
    };
    window.addEventListener('scroll', function () {
      if (!barTicking) { barTicking = true; requestAnimationFrame(updateBar); }
    }, { passive: true });
    updateBar();
  }

  /* ── Seamless marquee (duplicate track content for a -50% loop) ── */
  var track = document.getElementById('marquee-track');
  if (track) { track.innerHTML += track.innerHTML; }

  /* ── Magnetic buttons ── */
  if (!REDUCE && window.matchMedia('(pointer: fine)').matches) {
    var STRENGTH = 0.28;
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-submit, .nav-cta').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * STRENGTH;
        var y = (e.clientY - r.top - r.height / 2) * STRENGTH;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ── Hide any recognition tile whose screenshot is missing (graceful) ── */
  document.querySelectorAll('.proof-shot img').forEach(function (img) {
    img.addEventListener('error', function () {
      var tile = img.closest('.proof-shot');
      if (tile) { tile.style.display = 'none'; }
    });
  });

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

  /* ── Hide any GSC-dashboard figure whose image is missing (graceful) ── */
  document.querySelectorAll('.case-shot img').forEach(function (img) {
    img.addEventListener('error', function () {
      var fig = img.closest('.case-shot');
      if (fig) { fig.style.display = 'none'; }
    });
  });

  /* ── Lightbox: click any screenshot to read it full-size ── */
  (function () {
    var lb    = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    if (!lb || !lbImg) return;
    function open(src, alt) {
      lbImg.src = src; lbImg.alt = alt || '';
      lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
      lbImg.src = ''; document.body.style.overflow = '';
    }
    document.querySelectorAll('.proof-shot, .case-shot a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (!href) return;
        e.preventDefault();
        var im = a.querySelector('img');
        open(href, im ? im.alt : '');
      });
    });
    lb.addEventListener('click', function (e) { if (e.target !== lbImg) close(); });
    var btn = document.getElementById('lightbox-close');
    if (btn) btn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });
  })();

  /* ── Recognition carousel (autoplay + arrows + dots) ── */
  (function () {
    var ptrack = document.getElementById('proof-track');
    var car    = document.getElementById('proof-carousel');
    var dotsW  = document.getElementById('pc-dots');
    var prev   = document.getElementById('pc-prev');
    var next   = document.getElementById('pc-next');
    if (!ptrack || !car) return;
    var slides = Array.prototype.slice.call(ptrack.querySelectorAll('.proof-shot'));
    if (!slides.length) return;

    function gap()  { var g = getComputedStyle(ptrack); return parseFloat(g.columnGap || g.gap || 24) || 24; }
    function step() { return slides[0].getBoundingClientRect().width + gap(); }
    function maxScroll() { return ptrack.scrollWidth - ptrack.clientWidth - 2; }

    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'pc-dot'; d.type = 'button';
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', function () { ptrack.scrollTo({ left: i * step(), behavior: 'smooth' }); restart(); });
      dotsW.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotsW.children);

    function update() {
      var i = Math.round(ptrack.scrollLeft / step());
      dots.forEach(function (d, k) { d.classList.toggle('active', k === i); });
      if (prev) prev.disabled = ptrack.scrollLeft <= 2;
      if (next) next.disabled = ptrack.scrollLeft >= maxScroll();
    }
    ptrack.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    if (prev) prev.addEventListener('click', function () { ptrack.scrollBy({ left: -step(), behavior: 'smooth' }); restart(); });
    if (next) next.addEventListener('click', function () { ptrack.scrollBy({ left:  step(), behavior: 'smooth' }); restart(); });

    var timer = null;
    function advance() {
      if (ptrack.scrollLeft >= maxScroll()) ptrack.scrollTo({ left: 0, behavior: 'smooth' });
      else ptrack.scrollBy({ left: step(), behavior: 'smooth' });
    }
    function start() { if (REDUCE) return; stop(); timer = setInterval(advance, 4000); }
    function stop()  { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', start);
    car.addEventListener('focusin', stop);
    car.addEventListener('focusout', start);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es[0].isIntersecting ? start() : stop(); }).observe(car);
    } else { start(); }
    window.addEventListener('resize', update, { passive: true });
    update();
  })();
})();
