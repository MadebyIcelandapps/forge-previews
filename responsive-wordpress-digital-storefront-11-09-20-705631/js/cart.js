/* Cart — persisted in localStorage */
var Cart = (function () {
  var STORAGE_KEY = 'dv_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function add(product) {
    var items = load();
    if (!items.find(function (i) { return i.id === product.id; })) {
      items.push({ id: product.id, name: product.name, price: product.price });
      save(items);
    }
    updateUI();
  }

  function remove(id) {
    var items = load().filter(function (i) { return i.id !== id; });
    save(items);
    updateUI();
    renderDrawer();
  }

  function total() {
    return load().reduce(function (s, i) { return s + i.price; }, 0);
  }

  function count() {
    return load().length;
  }

  function updateUI() {
    var n = count();
    document.querySelectorAll('#cart-count').forEach(function (el) {
      el.textContent = n;
      el.style.display = n > 0 ? '' : 'none';
    });
  }

  function renderDrawer() {
    var body = document.getElementById('cart-items');
    var footer = document.getElementById('cart-footer');
    var totalEl = document.getElementById('cart-total');
    if (!body) return;

    var items = load();
    if (items.length === 0) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      if (footer) footer.hidden = true;
      return;
    }

    body.innerHTML = items.map(function (item) {
      return '<div class="cart-item">' +
        '<div class="cart-item-name">' + escHtml(item.name) + '</div>' +
        '<div>' +
          '<div class="cart-item-price">$' + item.price.toFixed(2) + '</div>' +
          '<button class="cart-item-remove" data-remove="' + item.id + '">Remove</button>' +
        '</div>' +
      '</div>';
    }).join('');

    body.querySelectorAll('[data-remove]').forEach(function (btn) {
      btn.addEventListener('click', function () { remove(btn.dataset.remove); });
    });

    if (footer) footer.hidden = false;
    if (totalEl) totalEl.textContent = '$' + total().toFixed(2);
  }

  function openDrawer() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) { drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); }
    if (overlay) { overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false'); }
    renderDrawer();
  }

  function closeDrawer() {
    var drawer = document.getElementById('cart-drawer');
    var overlay = document.getElementById('cart-overlay');
    if (drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
    if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); }
  }

  function escHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function init() {
    updateUI();

    var closeBtn = document.getElementById('cart-close');
    var overlay = document.getElementById('cart-overlay');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.cart-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (document.getElementById('cart-drawer')) {
          e.preventDefault();
          openDrawer();
        }
      });
    });
  }

  return { add: add, remove: remove, total: total, count: count, load: load, init: init, openDrawer: openDrawer, updateUI: updateUI };
})();
