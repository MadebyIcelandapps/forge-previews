/* Shop page: filtering, sorting, search */
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('products-grid');
  var noResults = document.getElementById('no-results');
  var resultsCount = document.getElementById('results-count');
  var searchInput = document.getElementById('search-input');
  var sortSelect = document.getElementById('sort-select');
  var priceMax = document.getElementById('price-max');
  var priceLabel = document.getElementById('price-max-label');
  var clearBtn = document.getElementById('clear-filters');
  var filterToggle = document.getElementById('filter-toggle');
  var sidebar = document.getElementById('shop-sidebar');

  var activeCategory = 'all';
  var maxPrice = 200;
  var searchQuery = '';
  var sortMode = 'featured';

  /* Read ?cat= from URL */
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('cat')) {
    activeCategory = urlParams.get('cat');
    document.querySelectorAll('[data-cat]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.cat === activeCategory);
    });
  }

  function applyFilters() {
    if (!grid) return;
    var query = searchQuery.toLowerCase();
    var filtered = PRODUCTS.filter(function (p) {
      var matchCat = activeCategory === 'all' || p.category === activeCategory;
      var matchPrice = p.price <= maxPrice;
      var matchSearch = !query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      return matchCat && matchPrice && matchSearch;
    });

    filtered.sort(function (a, b) {
      if (sortMode === 'price-asc') return a.price - b.price;
      if (sortMode === 'price-desc') return b.price - a.price;
      if (sortMode === 'newest') return (b.new ? 1 : 0) - (a.new ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.hidden = false;
    } else {
      if (noResults) noResults.hidden = true;
      grid.innerHTML = filtered.map(renderProductCard).join('');
      wireAddToCart(grid);
    }

    var label = filtered.length === 1 ? '1 product' : filtered.length + ' products';
    if (resultsCount) resultsCount.textContent = label;
  }

  /* Category filter buttons */
  document.querySelectorAll('.filter-btn[data-cat]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCategory = btn.dataset.cat;
      document.querySelectorAll('.filter-btn[data-cat]').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchQuery = searchInput.value;
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      sortMode = sortSelect.value;
      applyFilters();
    });
  }

  if (priceMax) {
    priceMax.addEventListener('input', function () {
      maxPrice = Number(priceMax.value);
      if (priceLabel) priceLabel.textContent = '$' + maxPrice;
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      activeCategory = 'all';
      searchQuery = '';
      maxPrice = 200;
      sortMode = 'featured';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      if (priceMax) priceMax.value = 200;
      if (priceLabel) priceLabel.textContent = '$200';
      document.querySelectorAll('.filter-btn[data-cat]').forEach(function (b) { b.classList.toggle('active', b.dataset.cat === 'all'); });
      applyFilters();
    });
  }

  /* Mobile filter toggle */
  if (filterToggle && sidebar) {
    filterToggle.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      filterToggle.setAttribute('aria-expanded', String(open));
    });
  }

  applyFilters();
});
