# Paws & Whiskers -- Handover Notes

## What was built

One-page website in plain HTML, CSS and vanilla JavaScript. No frameworks, no
build step, no npm. Open `index.html` directly in a browser.

Files:
- `index.html` - the full site
- `style.css`  - all styles, responsive down to 360px
- `script.js`  - mobile nav, scroll effects, form validation
- `NOTES.md`   - this file
- `pages.json` - page manifest for the project dashboard

Sections in order: hero, about, services, opening hours, gallery, contact,
footer.

## Placeholders to fill in before launch

Every item below is written as `[ALL CAPS IN BRACKETS]` in the HTML so it is
easy to find with Ctrl+F.

| Placeholder | Where | What to put |
|---|---|---|
| `[YOUR STREET ADDRESS]` | Contact section + footer | Street and building number |
| `[YOUR POSTCODE]` | Contact section | Brighton postcode |
| `[YOUR PHONE NUMBER]` | Contact section | Displayed phone number |
| `[YOUR_PHONE]` | `<a href="tel:...">` | Phone in tel: format, e.g. `+441273000000` |
| `[YOUR EMAIL ADDRESS]` | Contact section (displayed) | Email shown to visitors |
| `[YOUR_EMAIL_ADDRESS]` | Form `action="mailto:..."` (appears twice) | Same email, no spaces |

There are two instances of `[YOUR_EMAIL_ADDRESS]` in the form tag: the `action`
attribute and a comment. Update both.

## Opening hours

Current hours as confirmed by the client:

- Monday to Friday: 9:00am - 5:00pm
- Saturday: 9:00am - 3:00pm
- Sunday: 10:00am - 2:00pm (updated round 1)

## Contact form

The form currently uses `action="mailto:[YOUR_EMAIL_ADDRESS]"`. This opens the
visitor's email client when they submit. It works without a server but is not
ideal because many users do not have a default email client configured on their
phone or laptop.

Before launch, replace the `action` with a real form handler:

- Formspree (formspree.io): free tier handles up to 50 submissions/month. Sign
  up, create a form, replace the action with the Formspree endpoint URL, and
  remove the `enctype="text/plain"` attribute.
- Netlify Forms: works automatically if hosted on Netlify. Add
  `data-netlify="true"` to the form tag.
- Host's PHP mailer: if the hosting company supports PHP, a simple contact.php
  script can handle the POST.

## Questions for the client

The client asked to remove "a small drawn animal on the opening hours part". There
is no drawn animal in the Opening Hours section of the HTML. The most likely
candidate is the cartoon dog illustration in the About section (a dog sitting on a
grooming table), which appears on desktop layout above the hours table. That
illustration has been removed in round 2. If the client meant something different,
please clarify which element they are referring to.

## Gallery

All six gallery slots are now plain coloured placeholders with caption text only.
Replace each `<div class="gallery-placeholder ...">` block with a real `<img>`
tag. Example:

```html
<div class="gallery-item gallery-item-tall">
  <img src="images/golden-retriever-groom.jpg" alt="Golden retriever after full groom" loading="lazy">
</div>
```

Recommended photo sizes:
- Tall item (left): portrait orientation, at least 600x900px
- Wide item (bottom): landscape, at least 900x400px
- Square items: at least 500x500px

The CSS grid adapts to whatever images you add without changes.

## Stats in About section

One stat is shown: "Insured / Fully insured salon". The "500+ happy dogs"
and "5 star rating" stats were removed at the client's request (round 1) as
the business is new and does not want to claim unverified numbers.

## Copyright year

The footer shows 2025. Update if launching in a later year.

## Google Fonts

The site loads Playfair Display and Nunito from Google Fonts via a CDN link in
the `<head>`. This requires an internet connection. If the client's host blocks
external requests or the site needs to work fully offline, download the fonts
and serve them locally: fonts.google.com lets you download font files directly.

## Favicon

No favicon is included. A simple `.ico` or `.png` in the site root would
improve the browser tab appearance. Many free tools generate favicons from a
logo image.

## What was skipped or invented

Nothing from the brief was skipped. All four services and prices were taken
verbatim from the client's posting. No booking-system integration was included
because the client did not ask for one: the form sends a booking request by
email. If they later want online booking (e.g. Calendly, Booksy), the "Book
Now" button can be pointed at their booking link instead of the contact section.
