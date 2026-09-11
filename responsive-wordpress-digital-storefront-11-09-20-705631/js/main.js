/* Site-wide behaviours */
document.addEventListener('DOMContentLoaded', function () {

  /* Cart init */
  if (typeof Cart !== 'undefined') Cart.init();

  /* Mobile nav toggle */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && e.target !== toggle) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Cookie banner */
  var banner = document.getElementById('cookie-banner');
  var accept = document.getElementById('cookie-accept');
  var decline = document.getElementById('cookie-decline');
  if (banner) {
    if (!localStorage.getItem('dv_cookie_choice')) {
      banner.classList.remove('hidden');
    } else {
      banner.classList.add('hidden');
    }
    function dismissCookie(choice) {
      localStorage.setItem('dv_cookie_choice', choice);
      banner.classList.add('hidden');
    }
    if (accept) accept.addEventListener('click', function () { dismissCookie('all'); });
    if (decline) decline.addEventListener('click', function () { dismissCookie('essential'); });
  }

  /* Newsletter form */
  var nlForm = document.getElementById('newsletter-form');
  var nlMsg = document.getElementById('newsletter-msg');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = nlForm.querySelector('input[type="email"]').value.trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (nlMsg) { nlMsg.textContent = 'Please enter a valid email address.'; nlMsg.style.color = '#dc2626'; }
        return;
      }
      /* In production: POST to your email marketing API here */
      if (nlMsg) { nlMsg.textContent = 'Thanks! You\'re on the list.'; nlMsg.style.color = 'rgba(255,255,255,.9)'; }
      nlForm.reset();
    });
  }

  /* Featured products on home page */
  var featuredGrid = document.getElementById('featured-products');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    var featured = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 6);
    featuredGrid.innerHTML = featured.map(renderProductCard).join('');
    wireAddToCart(featuredGrid);
  }
});

function renderProductCard(product) {
  var badge = product.new ? '<span class="product-cat-badge">New</span>' : '';
  var catLabel = { templates: 'Template', ebooks: 'eBook', tools: 'Tool', assets: 'Asset' }[product.category] || product.category;
  var originalPrice = product.originalPrice
    ? ' <small>$' + product.originalPrice.toFixed(2) + '</small>'
    : '';
  return '<div class="product-card" data-id="' + product.id + '">' +
    '<div class="product-thumb">' +
      '<div class="photo-slot"><span class="photo-caption">Photo: product preview for ' + escHtml(product.name) + '</span></div>' +
      badge +
      '<span class="product-cat-badge" style="left:auto;right:.75rem;background:rgba(0,0,0,.55)">' + catLabel + '</span>' +
    '</div>' +
    '<div class="product-body">' +
      '<h3>' + escHtml(product.name) + '</h3>' +
      '<p>' + escHtml(product.description) + '</p>' +
      '<div class="product-meta">' +
        '<span class="product-price">$' + product.price.toFixed(2) + originalPrice + '</span>' +
        '<button class="add-to-cart-btn" data-product-id="' + product.id + '" aria-label="Add ' + escHtml(product.name) + ' to cart">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          'Add to cart' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function wireAddToCart(container) {
  container.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.productId;
      var product = PRODUCTS.find(function (p) { return p.id === id; });
      if (!product) return;
      Cart.add(product);
      btn.classList.add('added');
      btn.textContent = 'Added!';
      setTimeout(function () {
        btn.classList.remove('added');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add to cart';
      }, 1400);
    });
  });
}

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
