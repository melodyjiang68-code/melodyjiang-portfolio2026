(function () {
  'use strict';

  const nav = document.querySelector('.site-nav');
  const heroBg = document.querySelector('.hero-bg');
  const headings = document.querySelectorAll('.section-heading');
  const sectionRail = document.getElementById('section-rail');
  const railLabel = sectionRail?.querySelector('.section-rail-label');
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .venn-wrap');

  let ticking = false;

  /* Hero-only background parallax */
  function updateHeroParallax() {
    if (!heroBg) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const heroHeight = hero.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY <= heroHeight) {
      const offset = scrollY * 0.18;
      heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
    } else {
      heroBg.style.transform = '';
    }
  }

  /* Left rail: show vertical title when section heading scrolls off screen */
  function updateSectionRail() {
    if (!sectionRail || !railLabel) return;

    if (window.innerWidth < 1100) {
      sectionRail.classList.remove('is-visible');
      return;
    }

    const navThreshold = 72;
    let activeHeading = null;

    headings.forEach((heading) => {
      const section = heading.closest('.story-section');
      if (!section) return;

      const headingRect = heading.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      const headingAboveView = headingRect.bottom < navThreshold;
      const sectionStillVisible = sectionRect.bottom > navThreshold + 100;

      if (headingAboveView && sectionStillVisible) {
        activeHeading = heading;
      }
    });

    if (activeHeading) {
      railLabel.innerHTML = activeHeading.innerHTML;
      sectionRail.classList.add('is-visible');
    } else {
      sectionRail.classList.remove('is-visible');
    }
  }

  function onScroll() {
    if (nav) {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
      nav.classList.toggle('nav-on-light', window.scrollY > window.innerHeight * 0.72);
    }
    updateHeroParallax();
    updateSectionRail();
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    }
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* Reload IG iframes when they enter view (fixes blank embeds after reveal) */
  const igIframes = document.querySelectorAll('.link-preview-media iframe');
  const igEmbedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const iframe = entry.target;
        if (iframe.dataset.igLoaded === '1') return;
        iframe.dataset.igLoaded = '1';
        const src = iframe.getAttribute('src');
        if (src) {
          iframe.src = src;
        }
      });
    },
    { rootMargin: '120px 0px', threshold: 0.01 }
  );
  igIframes.forEach((iframe) => igEmbedObserver.observe(iframe));

  document.querySelectorAll('[data-resume]').forEach((resumeLink) => {
    resumeLink.addEventListener('click', (e) => {
      if (!resumeLink.getAttribute('href') || resumeLink.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick, { passive: true });
  requestTick();
})();
