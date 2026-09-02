# Kjarvalsstaðir Cafe Site Notes

## What was built

One-page site answering the three things a visitor checks on a phone: what the
cafe does, where it is, and when it is open. Nordic-minimal design with a warm
amber accent, Georgia serif headings, and system sans for body text. Fully
responsive down to 360 px wide with a collapsible mobile nav.

Sections: sticky nav, hero with photo slot, About, Hours, Location (with OSM
map embed), Contact (three summary cards), footer.

## Placeholders to fill in before handover

Every item below is marked with `[ADD: ...]` in the page and must be supplied
by the client before the site goes live.

1. **Hero description** (hero section): one or two sentences about the cafe,
   what is served, and the atmosphere.
2. **About: what they serve** (About section, first paragraph): coffee, tea,
   pastries, lunch, etc.
3. **About: character description** (About section, second paragraph): anything
   that makes the cafe worth visiting.
4. **Street address** (Location section): the full street address.
5. **Postal code** (Location section): the Reykjavik postal code.
6. **Public holiday note** (Hours section): whether the cafe closes or keeps
   reduced hours on Icelandic public holidays.

## Confirmed facts used from the OSM listing

- Opening hours: Monday to Sunday, 10:00 to 17:00
- Phone: +354 411 6425

## Map embed

The embedded map uses OpenStreetMap node 971164355 (the source listing).
Coordinates used for the marker: 64.14120 N, 21.90876 W. These are the
published OSM coordinates for that node. If the client confirms a different
address the map iframe `src` in `index.html` (look for the `<iframe>` inside
`#location`) should be updated to match.

## Photographs needed

Two slots are in the page. Details are in `images/manifest.json`.

- `images/hero.jpg`: cafe interior, 16:7 ratio. The hero slot is sized and
  styled; drop the file in and it fills automatically.
- `images/drinks.jpg`: coffee and food close-up, 4:3 ratio. Same behaviour in
  the About section.

Both slots show a neutral background and a caption label while the file is
absent. The broken-image icon is suppressed via an inline `onerror` handler.

## Nothing invented

No prices, no staff names, no history, no reviews, no star ratings, no
testimonials. No SVG illustrations of subjects (only plain icon glyphs from a
couple of strokes).

## No prompt-injection content found

The client posting contained no instructions directed at the builder. Nothing
was skipped.
