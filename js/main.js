(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  function setMobile(open){
    if(!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
    document.body.dataset.navOpen = open ? '1' : '0';
  }
  if(toggle && mobileNav){
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMobile(!isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMobile(false)));
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') setMobile(false);
    });
  }

  // Reveal on scroll with enhanced animations
  const revealables = document.querySelectorAll('.section, .hero, .footer');
  revealables.forEach(el => el.classList.add('reveal'));

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!prefersReduced && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          // Trigger staggered animations for children
          const children = entry.target.querySelectorAll('.tile, .card, .tool-card, .resource-card, .achievement-item, .dev-card, .insight, .gallery-item');
          children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            setTimeout(() => {
              child.style.transition = 'opacity .6s cubic-bezier(.25,.46,.45,.94), transform .6s cubic-bezier(.25,.46,.45,.94)';
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    }, {threshold: 0.12});
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('is-visible'));
  }


  // Contact form: open mail client with prefilled content
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const email = String(fd.get('email') || '').trim();
      const message = String(fd.get('message') || '').trim();

      const subject = encodeURIComponent(`Consultation Request — khadijazaman.com`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nWhat we're solving:\n${message}\n\n— Sent from khadijazaman.com`
      );

      window.location.href = `mailto:khadijarafiqzaman@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Builder.io Integration
  // Initialize Builder with your public API key (required for headless CMS)
  const BUILDER_API_KEY = '6cb89a19747242e7ba0f4d3103f188ed'; // Replace with your API key
  
  // Function to fetch content from Builder.io headless CMS
  async function fetchBuilderContent(modelName, options = {}) {
    try {
      const query = new URLSearchParams({
        apiKey: BUILDER_API_KEY,
        limit: options.limit || 10,
        sort: options.sort || '-createdDate',
        query: options.query || '',
      });

      const response = await fetch(
        `https://cdn.builder.io/api/v3/content/${modelName}?${query}`
      );

      if (!response.ok) throw new Error(`Builder.io API error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching Builder content:', error);
      return null;
    }
  }

  // Function to render Builder content dynamically
  async function renderBuilderSection(modelName, targetSelector) {
    const data = await fetchBuilderContent(modelName);
    if (!data || !data.results || data.results.length === 0) return;

    const content = data.results[0];
    const target = document.querySelector(targetSelector);
    if (!target || !content.data) return;

    // Update section with Builder-managed content
    if (content.data.html) {
      target.innerHTML = content.data.html;
    }
    if (content.data.css) {
      const style = document.createElement('style');
      style.textContent = content.data.css;
      document.head.appendChild(style);
    }
  }

  // Optional: Load specific sections from Builder (uncomment to use)
  // renderBuilderSection('hero', '[data-builder-id="hero-section"]');
  // renderBuilderSection('insights', '[data-builder-id="insights-section"]');

  // Expose fetchBuilderContent globally for custom use
  window.builderFetch = fetchBuilderContent;
})();
