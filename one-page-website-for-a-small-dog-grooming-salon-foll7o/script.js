/* Paws & Whiskers -- site script */
(function () {
  'use strict';

  /* -- Nav scroll state -- */
  var nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* -- Mobile nav toggle -- */
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  /* Close mobile nav when a link is clicked */
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close mobile nav on outside click */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* -- Active nav link on scroll -- */
  var sections = document.querySelectorAll('main section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = '#' + entry.target.id;
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-50% 0px -49% 0px' });
  sections.forEach(function (s) { observer.observe(s); });

  /* -- Contact form -- */
  var form   = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      var name    = form.querySelector('#f-name').value.trim();
      var email   = form.querySelector('#f-email').value.trim();
      var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        e.preventDefault();
        setStatus('Please enter your name.', true);
        form.querySelector('#f-name').focus();
        return;
      }
      if (!emailRx.test(email)) {
        e.preventDefault();
        setStatus('Please enter a valid email address.', true);
        form.querySelector('#f-email').focus();
        return;
      }
      /* Valid: let the mailto: action fire, show confirmation message */
      setStatus('Thank you! Your booking request is on its way.', false);
    });
  }

  function setStatus(msg, isError) {
    status.textContent = msg;
    status.style.color = isError ? '#C0392B' : '#2E7D52';
  }

  /* -- Scroll-reveal (simple, no library) -- */
  var revealEls = document.querySelectorAll(
    '.service-card, .about-grid, .hours-inner, .gallery-item, .contact-grid, .stat'
  );
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el, i) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity .5s ' + (i % 4 * 0.08) + 's ease, transform .5s ' + (i % 4 * 0.08) + 's ease';
    revealObserver.observe(el);
  });

  document.addEventListener('animationend', function () {}, { once: true });

  /* Trigger revealed state */
  document.querySelectorAll('.revealed').forEach(function (el) {
    el.style.opacity   = '1';
    el.style.transform = 'none';
  });

  /* MutationObserver to apply revealed styles */
  var styleObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1 && n.classList && n.classList.contains('revealed')) {
          n.style.opacity   = '1';
          n.style.transform = 'none';
        }
      });
    });
  });

  /* Simpler: just watch class changes on each element */
  revealEls.forEach(function (el) {
    new MutationObserver(function () {
      if (el.classList.contains('revealed')) {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      }
    }).observe(el, { attributes: true, attributeFilter: ['class'] });
  });

})();
