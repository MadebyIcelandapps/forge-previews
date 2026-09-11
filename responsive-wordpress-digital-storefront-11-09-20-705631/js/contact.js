/* Contact form */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var result = document.getElementById('contact-result');

  if (!form) return;

  function setErr(id, msg) {
    var el = document.getElementById(id);
    if (el) el.textContent = msg;
    return !!msg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;

    var name = document.getElementById('contact-name');
    var email = document.getElementById('contact-email');
    var subject = document.getElementById('contact-subject');
    var message = document.getElementById('contact-message');

    if (!name || !name.value.trim()) ok = !setErr('err-name', 'Name is required.');
    else setErr('err-name', '');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) ok = !setErr('err-contact-email', 'Valid email required.') && ok;
    else setErr('err-contact-email', '');

    if (!subject || !subject.value) ok = !setErr('err-subject', 'Please choose a topic.') && ok;
    else setErr('err-subject', '');

    if (!message || message.value.trim().length < 10) ok = !setErr('err-message', 'Message must be at least 10 characters.') && ok;
    else setErr('err-message', '');

    if (!ok) return;

    /* In production: POST to your form endpoint (Formspree, Netlify Forms, or your own API).
       Fallback: open the user's mail client with the message pre-filled. */
    var body = encodeURIComponent(
      'From: ' + name.value + ' <' + email.value + '>\n\n' + message.value
    );
    var mailtoFallback = 'mailto:[YOUR SUPPORT EMAIL]?subject=' +
      encodeURIComponent(subject.options[subject.selectedIndex].text) +
      '&body=' + body;

    /* Try to POST first; fall back to mailto */
    var endpoint = '[YOUR FORM ENDPOINT]';
    if (endpoint === '[YOUR FORM ENDPOINT]') {
      window.location.href = mailtoFallback;
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
      })
    })
    .then(function (res) {
      if (res.ok) {
        if (result) { result.textContent = 'Message sent. We will reply within one business day.'; result.style.color = '#16a34a'; }
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    })
    .catch(function () {
      window.location.href = mailtoFallback;
    });
  });
});
