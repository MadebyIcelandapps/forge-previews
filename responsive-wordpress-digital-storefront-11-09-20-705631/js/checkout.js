/* Checkout page logic */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('checkout-form');
  var summaryItems = document.getElementById('summary-items');
  var summaryTotals = document.getElementById('summary-totals');
  var summarySubtotal = document.getElementById('summary-subtotal');
  var summaryTax = document.getElementById('summary-tax');
  var summaryTotal = document.getElementById('summary-total');
  var sectionContact = document.getElementById('section-contact');
  var sectionConfirm = document.getElementById('section-confirmation');
  var confirmEmail = document.getElementById('confirm-email');
  var paypalRadio = document.getElementById('pay-paypal');
  var stripeFields = document.getElementById('stripe-fields');
  var stepPayment = document.getElementById('step-payment');
  var stepConfirm = document.getElementById('step-confirm');
  var TAX_RATE = 0.20;

  /* Render order summary */
  function renderSummary() {
    if (!summaryItems) return;
    var items = Cart.load();
    if (items.length === 0) {
      summaryItems.innerHTML = '<p class="cart-empty">Your cart is empty. <a href="shop.html">Browse products</a></p>';
      if (summaryTotals) summaryTotals.hidden = true;
      return;
    }

    summaryItems.innerHTML = items.map(function (item) {
      return '<div class="summary-item">' +
        '<span class="summary-item-name">' + escHtml(item.name) + '</span>' +
        '<span class="summary-item-price">$' + item.price.toFixed(2) + '</span>' +
      '</div>';
    }).join('');

    var subtotal = Cart.total();
    var tax = subtotal * TAX_RATE;
    var total = subtotal + tax;

    if (summaryTotals) summaryTotals.hidden = false;
    if (summarySubtotal) summarySubtotal.textContent = '$' + subtotal.toFixed(2);
    if (summaryTax) summaryTax.textContent = '$' + tax.toFixed(2);
    if (summaryTotal) summaryTotal.textContent = '$' + total.toFixed(2);
  }

  renderSummary();

  /* Show/hide Stripe fields based on payment method */
  document.querySelectorAll('input[name="payment"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (stripeFields) stripeFields.style.display = radio.value === 'stripe' ? '' : 'none';
    });
  });

  /* Validation helpers */
  function setError(fieldId, errId, msg) {
    var field = document.getElementById(fieldId);
    var err = document.getElementById(errId);
    if (err) err.textContent = msg;
    if (field) field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !!msg;
  }

  function validateForm() {
    var hasError = false;
    var firstName = document.getElementById('first-name');
    var lastName = document.getElementById('last-name');
    var email = document.getElementById('email');
    var gdpr = document.getElementById('gdpr-consent');

    if (!firstName || !firstName.value.trim()) hasError = setError('first-name', 'err-first-name', 'First name is required.') || hasError;
    else setError('first-name', 'err-first-name', '');

    if (!lastName || !lastName.value.trim()) hasError = setError('last-name', 'err-last-name', 'Last name is required.') || hasError;
    else setError('last-name', 'err-last-name', '');

    if (!email || !email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      hasError = setError('email', 'err-email', 'A valid email address is required.') || hasError;
    } else setError('email', 'err-email', '');

    if (!gdpr || !gdpr.checked) {
      hasError = setError('gdpr-consent', 'err-gdpr', 'You must accept the terms to continue.') || hasError;
    } else setError('gdpr-consent', 'err-gdpr', '');

    return !hasError;
  }

  /* Form submit */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      var email = document.getElementById('email');
      var paymentMethod = document.querySelector('input[name="payment"]:checked');

      if (paymentMethod && paymentMethod.value === 'paypal') {
        /* In production: redirect to PayPal checkout URL from your server */
        alert('In production, this would redirect to PayPal checkout.');
        return;
      }

      /* In production: call your server to create a Stripe PaymentIntent,
         then confirm it via stripe.js, then show the confirmation section.
         Here we simulate a successful payment for demonstration. */
      simulateSuccess(email ? email.value : '');
    });
  }

  function simulateSuccess(email) {
    if (stepPayment) stepPayment.classList.add('active');
    if (stepConfirm) stepConfirm.classList.add('active');
    if (sectionContact) sectionContact.hidden = true;
    if (sectionConfirm) sectionConfirm.hidden = false;
    if (confirmEmail) confirmEmail.textContent = email;
    /* Clear the cart */
    localStorage.removeItem('dv_cart');
    Cart.updateUI();
  }

  function escHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
});
