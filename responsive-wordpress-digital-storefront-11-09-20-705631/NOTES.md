# NOTES

## What was built

A 10-page static HTML/CSS/JS storefront for a digital-download-only shop.

Pages: Home, Shop, Checkout, About, Contact, FAQ, My Downloads, Privacy Policy, Terms of Service, Refund Policy.

The client asked for WordPress + WooCommerce specifically. This is a static prototype that demonstrates the complete front-end experience, UX flow and design. The developer integrating this with WordPress should treat these files as the design reference and UX specification, then rebuild using a WooCommerce theme (or a block theme with custom templates) that replicates this look.

The checkout flow includes Stripe and PayPal option selection, GDPR consent checkboxes and a confirmation screen. Payment processing, download link generation and email delivery all require a live WordPress/WooCommerce back-end with the following plugins:

- WooCommerce (core)
- WooCommerce Payments or Stripe for WooCommerce (Stripe)
- WooCommerce PayPal Payments (PayPal)
- Easy Digital Downloads or WooCommerce's own digital delivery (for token-protected download links)
- A transactional email plugin (FluentSMTP, WP Mail SMTP) for reliable delivery
- A GDPR/cookie plugin (Complianz or CookieYes) for the cookie banner and consent records
- Yoast SEO or Rank Math for SEO

Download links in the confirmation email must NOT expose the real file path. WooCommerce's built-in download system uses hashed, time-limited URLs and this must be verified after setup.

Product images (placeholders): see images/manifest.json. Two photographs are needed. All product cards use photo-slot placeholders pending real product screenshots or preview images.

## Placeholders the client must fill in before launch

All marked with square brackets in the HTML:

- [YOUR LEGAL ENTITY NAME] - privacy.html
- [YOUR DOMAIN] - privacy.html
- [YOUR SUPPORT EMAIL] - contact.html, privacy.html, contact.js (x2)
- [YOUR FORM ENDPOINT] - contact.js (replace with Formspree ID, Netlify Form name, or a custom API endpoint)
- [YOUR JURISDICTION] - terms.html (x2)
- [DATE BEFORE LAUNCH] - privacy.html, terms.html, refunds.html
- [ADD COUNT] x3 - about.html (total products, categories, customers - fill with real numbers)
- [ADD A REAL CUSTOMER REVIEW HERE] x3 - index.html (replace with actual customer quotes once collected)

## Assumptions made

- Shop name "DigitalVault" is a placeholder. The client has not supplied a brand name.
- Accent colour: Indigo (#4f46e5). This is a clean, professional default. The client should confirm or replace it with their brand colour.
- Product catalogue: 12 example products across 4 categories (Templates, eBooks, Tools, Design Assets). These are realistic examples matching the digital-products brief. All must be replaced with real products.
- Tax rate shown at checkout is 20% (UK VAT standard rate). Change in checkout.js TAX_RATE if the business is in a different jurisdiction or is below the VAT threshold.
- Currency: USD. Change the $ symbol in products.js, checkout.js and CSS if needed.
- The "My Downloads" page lookup is front-end only. In WordPress, this would be replaced by WooCommerce's built-in order lookup / account page.
- No product detail page was built (a single product would pop a modal or expand in place in this prototype). WooCommerce generates these automatically.

## Security notes (for the WordPress developer)

- Enable SSL before launch. WooCommerce will refuse to process live payments without it.
- Use a security plugin (Wordfence or Solid Security) from day one.
- Set file permissions correctly so the download directory is not directly accessible from the web (WooCommerce handles this but it should be verified).
- Do not use easy-to-guess admin usernames. Disable XML-RPC if not needed.

## The client asked for a PDF/video admin guide

This is outside the scope of the static prototype but should be delivered alongside the live WordPress installation. Cover: adding a new product, setting a download file, viewing and exporting orders, re-sending a download link from the WooCommerce order screen.
