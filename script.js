// Theme, mobile menu, reveal, lightbox, contact simulation
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtns = document.querySelectorAll('#theme-toggle');
  const burger = document.getElementById('burger');
  const yearEls = document.querySelectorAll('#year');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  // year
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // load theme from storage
  const saved = localStorage.getItem('theme');
  if (saved === 'light') body.classList.add('light');

  // theme toggle
  themeBtns.forEach(btn => {
    btn.textContent = body.classList.contains('light') ? 'Dark' : 'Light';
    btn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? 'Dark' : 'Light';
    });
  });

  // burger toggle for small screens
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

  // reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => obs.observe(r));

  // Lightbox: open when clicking a certificate thumbnail
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

  // close lightbox
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

  // Contact form simulation
  const forms = document.querySelectorAll('#contact-form');
  forms.forEach(form => {
    const formMsg = form.querySelector('#form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(formMsg) formMsg.textContent = "Pesan terkirim! (simulasi). Kamu bisa hubungi via email: irqifakhrezi03@gmail.com";
      form.reset();
    });
  });

  // Smooth internal anchor scrolling
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
});
