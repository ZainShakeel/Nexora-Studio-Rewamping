/* =========================================================
   Nexora Studio — Interactions
   FAQ accordion · portfolio filter · scroll reveal
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero device mockup (laptop + phone), matches the design ---- */
  const HERO_MOCKUP = `
    <div class="hero-mockup">
      <div class="laptop">
        <div class="laptop-screen">
          <div class="mini-top"><span></span><span></span><span></span></div>
          <div class="mini-body">
            <h5>Building Digital<br>Experiences That<br><em>Drive Results</em></h5>
            <span class="mini-btn">Get Started</span>
            <div class="mini-grid"><i></i><i></i><i></i></div>
          </div>
        </div>
        <div class="laptop-base"></div>
      </div>
      <div class="phone">
        <div class="phone-screen">
          <b>Building Digital Experiences That <em>Drive Results</em></b>
          <span class="mini-btn sm">Get Started</span>
          <div class="phone-rows"><i></i><i></i></div>
        </div>
      </div>
    </div>`;
  document.querySelectorAll('.device-stage .mock-browser').forEach(mb => {
    mb.outerHTML = HERO_MOCKUP;
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---- Portfolio filter ---- */
  const tabs = document.querySelectorAll('.filter-tab');
  const projects = document.querySelectorAll('[data-cat]');
  if (tabs.length && projects.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const f = tab.getAttribute('data-filter');
        projects.forEach(p => {
          const show = f === 'all' || p.getAttribute('data-cat').includes(f);
          p.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Load more (portfolio) ---- */
  const loadBtn = document.getElementById('loadMore');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      document.querySelectorAll('.is-hidden').forEach(el => el.classList.remove('is-hidden'));
      loadBtn.style.display = 'none';
    });
  }

  /* ---- Blog search (filters article cards by text) ---- */
  const blogSearch = document.getElementById('blogSearch');
  if (blogSearch) {
    const cards = document.querySelectorAll('.article-card');
    blogSearch.addEventListener('input', () => {
      const q = blogSearch.value.trim().toLowerCase();
      cards.forEach(c => {
        const match = c.textContent.toLowerCase().includes(q);
        c.style.display = match ? '' : 'none';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
