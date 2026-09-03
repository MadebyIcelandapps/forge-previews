# Notes: Grái kötturinn website

## What was built

One-page website answering the three questions a phone visitor checks: what the
cafe is, where it is, and when it is open. Plain HTML and CSS, no build step,
opens by double-clicking index.html.

Sections: sticky nav, full-width hero, quick-answer bar (what / where / when),
About, Opening hours, Find us, Footer.

One photo slot: the hero image (images/hero.jpg). The slot shows a warm
placeholder label until the file is dropped in.

## Confirmed facts used (from the client posting)

- Business name: Grái kötturinn
- Type: cafe
- City: Reykjavik, Iceland
- Phone: +354 551 1544
- OpenStreetMap node: 2073811105 (used as the map link target)

## Placeholders to fill in before handover

All placeholders appear in orange italic on the page so they are impossible
to miss.

| Placeholder | Where it appears | What to put there |
|---|---|---|
| [Add your tagline here] | Hero text | One short line that captures the cafe in a sentence |
| [Add street address] | Quickbar, Find us section, Footer | The full street address |
| [Add 2 to 3 sentences...] | About section | Description of the cafe: coffee, food, atmosphere |
| [Optional second paragraph] | About section | Story, neighbourhood, what regulars love |
| [Add hours] x7 | Hours table | Monday through Sunday opening and closing times |

## Photo needed

- images/hero.jpg (16:6 aspect ratio, or anything wider than it is tall). The
  layout is correct while the file is absent. Drop the file in and it shows
  automatically.

See images/manifest.json for a detailed prompt suitable for an image generator.

## Assumptions and decisions

- The page is written in English. The cafe name is Icelandic and explained in
  the About section ("which means The Grey Cat in Icelandic"). Most online
  searches for a Reykjavik cafe will be in English, especially from tourists.
  If the client wants the page in Icelandic, the copy can be translated
  without changing the structure.

- The map slot links to the existing OpenStreetMap listing
  (openstreetmap.org/node/2073811105). Once the client confirms their address,
  they can replace this link with a Google Maps or embedded map of their choice.

- No testimonials, reviews, ratings, awards, prices or staff names were
  invented. The brief was explicit about this. If the client wants a reviews
  section, add a clearly labelled slot and point visitors to a real review
  platform (Google, TripAdvisor).

- The hours table lists all seven days individually. If the cafe is closed on
  certain days, the client should change those rows to "Closed" rather than
  leaving a placeholder.

- Accent colour is a warm terracotta (#B5512A). It is bold enough to read
  against both the light background and the dark footer. Change the --accent
  custom property in the :root block to switch it site-wide.
