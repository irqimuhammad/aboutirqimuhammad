// Theme, mobile menu, reveal, lightbox, contact simulation + premium enhancements
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtns = document.querySelectorAll('#theme-toggle');
  const burger = document.getElementById('burger');
  const yearEls = document.querySelectorAll('#year');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  /* ---------------- YEAR ---------------- */
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  /* ---------------- THEME ---------------- */
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('light');

  themeBtns.forEach(btn => {
    btn.textContent = body.classList.contains('light') ? 'Dark' : 'Light';
    btn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? 'Dark' : 'Light';
    });
  });

  /* ---------------- BURGER NAV ---------------- */
  if (burger) {
    burger.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      if (!links) return;
      links.classList.toggle('open');
      if (links.classList.contains('open')) {
        links.style.display = 'flex';
        links.style.flexDirection = 'column';
        links.style.gap = '12px';
        links.style.padding = '12px';
        links.style.marginTop = '8px';
      } else {
        links.style.display = '';
      }
    });
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  /* ---------------- LIGHTBOX ---------------- */
  document.querySelectorAll('.cert-thumb img, .cert-thumb').forEach(el => {
    el.addEventListener('click', (e) => {
      const imgEl = e.target.tagName === 'IMG' ? e.target : e.currentTarget.querySelector('img');
      if(!imgEl) return;
      const src = imgEl.getAttribute('src');
      const caption = imgEl.getAttribute('data-caption') || imgEl.alt || '';
      lbImg.src = src;
      lbCaption.textContent = caption;
      lightbox.classList.add('active');
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  function closeLb(){
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  }
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });

  /* ---------------- CONTACT SIMULATION ---------------- */
  const forms = document.querySelectorAll('#contact-form');
  forms.forEach(form => {
    const formMsg = form.querySelector('#form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(formMsg) formMsg.textContent = "Pesan terkirim! (simulasi). Kamu bisa hubungi via email: irqifakhrezi03@gmail.com";
      form.reset();
    });
  });

  /* ---------------- SMOOTH SCROLL ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ======================================================
       PREMIUM FEATURES
     ====================================================== */

  /* ---------------- PRELOADER ---------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hide = () => preloader.classList.add('hidden');
    window.addEventListener('load', hide);
    setTimeout(hide, 1500);
  }

  /* ---------------- HERO PARALLAX ---------------- */
  const parallaxLayer = document.getElementById('heroParallax');
  const hero = document.querySelector('.hero');

  if (parallaxLayer && hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxLayer.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    });

    window.addEventListener('scroll', () => {
      const t = Math.min(1, window.scrollY / 500);
      parallaxLayer.style.opacity = (1 - t * 0.4);
      parallaxLayer.style.transform = `translateY(${t * -15}px)`;
    }, { passive: true });
  }

  /* ---------------- IMPACT COUNTER ---------------- */
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const animateCounter = (el, target) => {
      let start = 0;
      const duration = 900;
      const startTime = performance.now();

      const update = (time) => {
        const progress = Math.min(1, (time - startTime) / duration);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target || "0");
          animateCounter(el, target);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObs.observe(c));
  }

});
