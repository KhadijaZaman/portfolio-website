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
  var WEB3FORMS_KEY   = '0ca2b384-dbcd-4977-a41a-5f2d1a6c2abb';   // free access key from https://web3forms.com
  // Cloudflare Web Analytics beacon token — Cloudflare dashboard → Web Analytics →
  // your site → Manage site → copy the token out of the snippet. Cookieless, so no
  // consent banner is required. Leave blank and no analytics loads at all.
  var CF_BEACON_TOKEN = 'e01825a501d64fcc909ec840a045dd67';

  var CONTACT_EMAIL = 'hello@khadijazaman.com';

  /* ── Cloudflare Web Analytics (loads on every page, only if a token is set) ──
     Pageviews, referrers, countries, devices and Core Web Vitals. Sets no
     cookies and stores no per-visitor identifiers, so it needs no consent
     banner. Conversions are not tracked here — see the note in LAUNCH-GUIDE.md. */
  if (CF_BEACON_TOKEN && CF_BEACON_TOKEN.length >= 16) {
    var cf = document.createElement('script');
    cf.type = 'module';
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', JSON.stringify({ token: CF_BEACON_TOKEN }));
    document.head.appendChild(cf);
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

  /* ── Nav toggle ──
     Targets whatever #nav-toggle's aria-controls points to: the single
     #nav-links list (collapsed nav) or a legacy #mobile-menu panel. */
  var navToggle = document.getElementById('nav-toggle');
  var navTarget = navToggle && document.getElementById(navToggle.getAttribute('aria-controls'));
  if (navToggle && navTarget) {
    var closeMenu = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      navTarget.classList.remove('open');
      document.body.style.overflow = '';
    };
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeMenu(); }
      else {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close navigation');
        navTarget.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
    navTarget.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navTarget.classList.contains('open')) closeMenu();
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
        // NB: f.name is HTMLFormElement.name (the form's own attribute), not the
        // input named "name" — read fields off f.elements so the lookup is by control.
        var el    = f.elements;
        var name  = ((el.name    || {}).value || '').trim();
        var email = ((el.email   || {}).value || '').trim();
        var msg   = ((el.message || {}).value || '').trim();
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

  /* ── Hide any article (blog) image that fails to load, so no broken icon ── */
  document.querySelectorAll('.prose img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
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
      // removeAttribute, not src='': an empty src resolves to the current
      // page URL and makes the browser re-download the HTML as an image.
      lbImg.removeAttribute('src'); document.body.style.overflow = '';
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
    if (!ptrack || !car || !dotsW) return;
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

  /* ── Blog: scroll-spy over the table of contents ──
     The TOC itself and the h2 ids are rendered at build time (see .eleventy.js
     and _includes/post.njk), so this only highlights the section in view. */
  (function () {
    var prose   = document.querySelector('.prose');
    var tocList = document.getElementById('toc-list');
    if (!prose || !tocList || !('IntersectionObserver' in window)) return;
    var links = Array.prototype.slice.call(tocList.querySelectorAll('a'));
    var heads = Array.prototype.slice.call(prose.querySelectorAll('h2[id]'));
    if (!links.length || !heads.length) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach(function (h) { spy.observe(h); });
  })();

  /* ── Live form validation (contact + newsletter) ── */
  (function () {
    document.querySelectorAll('#contact-form, #newsletter-form').forEach(function (form) {
      var fields = form.querySelectorAll('input, select, textarea');
      fields.forEach(function (f) {
        if (f.type === 'checkbox' || f.type === 'hidden') return;
        f.addEventListener('blur', function () {
          if (f.value !== '') { f.classList.toggle('invalid', !f.checkValidity()); }
        });
        f.addEventListener('input', function () {
          if (f.classList.contains('invalid') && f.checkValidity()) { f.classList.remove('invalid'); }
        });
      });
    });
  })();

  /* ── Blog: category filter + instant search ── */
  (function () {
    var grid = document.getElementById('post-grid');
    if (!grid) return;
    var cards   = Array.prototype.slice.call(grid.querySelectorAll('.post-card'));
    var search  = document.getElementById('blog-search');
    var chips   = Array.prototype.slice.call(document.querySelectorAll('#chip-row .chip'));
    var empty   = document.getElementById('blog-empty');
    var clearBtn = document.getElementById('blog-clear');
    var activeCat = 'all', q = '';

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var okCat = activeCat === 'all' || c.getAttribute('data-cat') === activeCat;
        var okQ   = !q || (c.getAttribute('data-text') || '').indexOf(q) !== -1;
        var vis = okCat && okQ;
        c.style.display = vis ? '' : 'none';
        if (vis) shown++;
      });
      if (empty) empty.hidden = (shown !== 0);
    }
    if (search) search.addEventListener('input', function () { q = search.value.toLowerCase().trim(); apply(); });
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-cat');
        apply();
      });
    });
    if (clearBtn) clearBtn.addEventListener('click', function () {
      activeCat = 'all'; q = '';
      if (search) search.value = '';
      chips.forEach(function (c) { c.classList.toggle('active', c.getAttribute('data-cat') === 'all'); });
      apply();
    });
  })();

  /* ── Curve: items placed along one SVG path ──
     Any .curve element with a JSON <script> inside is drawn here. The JSON gives
     the path, the items (label, sub, href, optional t 0..1 and above flag) and
     optional group brackets. Positions come from the path itself, so adding an
     item is one more entry, not a hand-placed label. */
  var SVGNS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) { var e = document.createElementNS(SVGNS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function svgText(parent, x, y, str, cls, anchor) { var t = svgEl('text', { x: x, y: y, 'text-anchor': anchor || 'middle', 'dominant-baseline': 'middle' }, parent); if (cls) t.setAttribute('class', cls); t.textContent = str; return t; }
  function readJSON(host) { var s = host.querySelector('script[type="application/json"]'); try { return s ? JSON.parse(s.textContent) : null; } catch (e) { return null; } }

  document.querySelectorAll('.curve').forEach(function (host, hi) {
    var svg = host.querySelector('svg'), data = readJSON(host); if (!svg || !data || !data.items) return;
    var gid = 'curve-grad-' + hi;
    var defs = svgEl('defs', {}, svg);
    var grad = svgEl('linearGradient', { id: gid, x1: '0', x2: '1', y1: '0', y2: '0' }, defs);
    svgEl('stop', { offset: '0', 'stop-color': '#2563EB' }, grad);
    svgEl('stop', { offset: '1', 'stop-color': '#38BDF8' }, grad);
    (data.groups || []).forEach(function (g) {
      svgText(svg, (g.from + g.to) / 2, 26, g.label, 'curve-group');
      svgEl('line', { x1: g.from, y1: 36, x2: g.to, y2: 36, 'class': 'curve-group-line' }, svg);
    });
    var path = svgEl('path', { d: data.path, 'class': 'curve-path', stroke: 'url(#' + gid + ')' }, svg);
    var L = path.getTotalLength(), n = data.items.length;
    data.items.forEach(function (it, i) {
      var t = typeof it.t === 'number' ? it.t : 0.05 + i * (0.9 / Math.max(n - 1, 1));
      var p = path.getPointAtLength(L * t);
      var up = typeof it.above === 'boolean' ? it.above : i % 2 === 1;
      /* The SVG is aria-hidden and the cards/timeline below repeat every item, so
         these are pointer-only: tabindex -1 keeps them out of the keyboard order. */
      var g = svgEl(it.href ? 'a' : 'g', it.href ? { href: it.href, 'class': 'curve-dot', tabindex: '-1' } : { 'class': 'curve-dot' }, svg);
      if (it.href && it.href.charAt(0) !== '/' && it.href.charAt(0) !== '#') { g.setAttribute('target', '_blank'); g.setAttribute('rel', 'noopener'); }
      var title = svgEl('title', {}, g); title.textContent = it.label + (it.sub ? ' · ' + it.sub : '');
      svgEl('circle', { 'class': 'curve-halo', cx: p.x, cy: p.y, r: 16 }, g);
      svgEl('circle', { 'class': 'curve-core', cx: p.x, cy: p.y, r: it.big ? 7 : 6 }, g);
      if (it.big) svgEl('circle', { cx: p.x, cy: p.y, r: 11, fill: 'none', stroke: '#38BDF8', 'stroke-width': 1, opacity: 0.6 }, g);
      var lines = 2 + (it.year ? 1 : 0), h = lines * 15 + 14, gap = 62;
      var ty = up ? p.y - gap : p.y + gap;
      svgEl('line', { 'class': 'curve-tick', x1: p.x, y1: up ? p.y - 9 : p.y + 9, x2: p.x, y2: up ? ty + h / 2 : ty - h / 2 }, g);
      var w = Math.max(it.label.length * 6.6, (it.sub || '').length * 6.1) + 30;
      var card = svgEl('g', { 'class': 'curve-card' }, g);
      svgEl('rect', { 'class': 'curve-pill', x: p.x - w / 2, y: ty - h / 2, width: w, height: h, rx: 10 }, card);
      var y0 = ty - (lines - 1) * 7.5;
      if (it.year) { svgText(card, p.x, y0, it.year, 'curve-year'); y0 += 15; }
      svgText(card, p.x, y0, it.label, 'curve-label'); y0 += 15;
      if (it.sub) svgText(card, p.x, y0, it.sub, 'curve-sub');
    });
  });

  /* ── Case study entity map: client in the centre, what was done around it ──
     Drawn from the `map` object in src/_data/caseStudies.js, so the picture and
     the numbers on the page come from the same file. */
  document.querySelectorAll('.cs-map').forEach(function (host) {
    var svg = host.querySelector('svg'), data = readJSON(host); if (!svg || !data || !data.nodes) return;
    var nodes = data.nodes;
    (data.groups || []).forEach(function (g) { svgText(svg, g.x, g.y, g.label, 'cs-map-group'); });
    var eg = svgEl('g', {}, svg);
    (data.edges || []).forEach(function (e) {
      var a = nodes[e[0]], b = nodes[e[1]]; if (!a || !b) return;
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      var cx = mx - dy / len * 22, cy = my + dx / len * 22;
      svgEl('path', { d: 'M' + a.x + ' ' + a.y + ' Q' + cx + ' ' + cy + ' ' + b.x + ' ' + b.y, 'class': 'cs-map-edge ' + (e[2] || '') }, eg);
      if (e[3]) {
        var lx = (a.x + 2 * cx + b.x) / 4, ly = (a.y + 2 * cy + b.y) / 4, w = e[3].length * 5.6 + 10;
        svgEl('rect', { x: lx - w / 2, y: ly - 8, width: w, height: 16, rx: 4, 'class': 'cs-map-edge-bg' }, eg);
        svgText(eg, lx, ly + 1, e[3], 'cs-map-edge-label');
      }
    });
    var ng = svgEl('g', {}, svg);
    Object.keys(nodes).forEach(function (k) {
      var nd = nodes[k], big = nd.cls === 'ctr';
      var w = nd.label.length * (big ? 8.6 : 7.4) + (big ? 36 : 26), h = big ? 44 : 32;
      var g = svgEl('g', { 'class': 'cs-map-node ' + (nd.cls || '') }, ng);
      svgEl('rect', { x: nd.x - w / 2, y: nd.y - h / 2, width: w, height: h, rx: big ? 14 : 9 }, g);
      svgText(g, nd.x, nd.y + 1, nd.label);
    });
  });

  /* The headline stats used to count up from zero on scroll. That showed a
     smaller number than the real one for the first second of every visit, so
     the values are now printed once, server-side, and never animated. */

})();
