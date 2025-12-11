document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links'); // Pastikan select class nav-links
  const yearEls = document.querySelectorAll('#year');
  
  // Set Tahun Otomatis
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // --- BURGER MENU (Updated & Simplified) ---
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      // Kita hanya perlu toggle class 'open'
      // Biarkan CSS yang mengatur tampilannya (posisi, warna, dll)
      navLinks.classList.toggle('open');
      
      // Ubah icon burger (Opsional)
      if (navLinks.classList.contains('open')) {
        burger.textContent = '✕'; // Icon Close
      } else {
        burger.textContent = '☰'; // Icon Burger
      }
    });

    // Tutup menu saat link diklik (Biar user ga repot tutup sendiri)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  // --- REVEAL ANIMATION ---
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => obs.observe(r));

  // --- FILTER PROJECT LOGIC ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hide');
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  }

  // --- LIGHTBOX LOGIC ---
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbCaption = document.getElementById('lb-caption');
  
  // 1. Logic untuk PROJECTS (Background Image)
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const style = window.getComputedStyle(thumb);
      const bgImage = style.backgroundImage;
      // Membersihkan string url("...")
      const src = bgImage.slice(4, -1).replace(/"/g, "");
      
      if (src && src !== 'none') {
        lbImg.src = src;
        if(lbCaption) lbCaption.textContent = ""; 
        if(lightbox) lightbox.classList.add('active');
      }
    });
  });

  // 2. Logic untuk CERTIFICATES (Img Tag)
  const certImages = document.querySelectorAll('.cert-thumb img');
  certImages.forEach(img => {
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      const captionText = img.getAttribute('data-caption');
      if(lbCaption) lbCaption.textContent = captionText || ""; 
      if(lightbox) lightbox.classList.add('active');
    });
  });

  // Fungsi Tutup Lightbox
  const closeLb = () => {
    if(lightbox) lightbox.classList.remove('active');
    setTimeout(() => { if(lbImg) lbImg.src = ''; }, 300);
  };

  if (lbClose) lbClose.addEventListener('click', closeLb);
  
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLb();
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLb();
  });
});
