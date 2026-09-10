# NOTES

## What was built

Single-page website for a sloped cedar roof redesign service. Sections: sticky header, hero, about, services (4 cards), process (4 steps), gallery (3 photo slots), CTA band, contact form, footer.

## Placeholders the client must fill in

- `[YOUR PHONE NUMBER]` - contact section and anywhere else the client wants it
- `[YOUR EMAIL ADDRESS]` - appears twice: in the contact details list, and in the form `action="mailto:..."` attribute
- `[YOUR CITY, STATE/PROVINCE]` - location in contact section
- `[ADD REAL PROJECT PHOTOS HERE]` - note in gallery section pointing to the 5 photo slots below

## Photos needed (see images/manifest.json for full prompts)

Five photos. Each has a placeholder slot in the layout that shows the caption when the file is absent:

1. `images/hero.jpg` - exterior of a redesigned sloped cedar roof, hero banner (16:9)
2. `images/cedar-detail.jpg` - close-up of cedar shingle texture (4:3)
3. `images/project-1-before-after.jpg` - before/after comparison, wide (21:9)
4. `images/project-2-exterior.jpg` - second project exterior (4:3)
5. `images/project-3-interior.jpg` - interior of a newly enclosed floor (4:3)

Drop the files into the `images/` folder and the placeholders disappear automatically.

## Social proof

No testimonials, reviews, star ratings, or statistics were invented. The gallery note reads "[ADD REAL PROJECT PHOTOS HERE]" and there are no customer quotes on the page. The client should add real reviews when they have them.

## Business name

"CedarCrest Design" was invented as a placeholder. Replace with the real business name everywhere it appears (logo, footer copyright, page title).

## Contact form

The form uses `action="mailto:..."` as a fallback so it opens the user's email client. Before launch, replace the `action` attribute with a real form endpoint (e.g. Netlify Forms, Formspree, or a server route). The form note on the page makes this visible to anyone reviewing it.

## Assumptions

- The client is a design/construction professional offering a redesign service, not a DIY guide site.
- The service covers design, visualisation, and construction documentation. The client should remove the 3D Visualisation service card if they only do the design concept and hand off to others.
- The footer copyright year is 2026 - update to match the actual launch year.
- No pricing is shown because none was given. The client should add pricing or a "from" figure if they want it.

## Skipped

Nothing in the brief gave instructions about behaviour, rules, or anything outside the scope of building a website. Nothing was skipped for that reason.
