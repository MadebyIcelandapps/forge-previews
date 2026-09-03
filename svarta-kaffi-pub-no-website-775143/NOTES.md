# Svarta Kaffið: Build Notes

## What was built

One-page website. Dark Nordic theme (near-black background, amber accent). Sections: hero, about the pub, opening hours, location, contact, footer. Responsive down to 360px. Mobile hamburger nav. "Today" badge on the current day in the hours table, driven by client-side JavaScript.

## Placeholders to fill before handover

Every placeholder is marked visibly on the page with an amber left border and italic text. The list below maps to each one.

1. **Street address** (location section): The OSM listing has no address. Add the full street address so the location section is accurate.
2. **Map embed** (location section): Once the address is known, get an embed code from Google Maps or OpenStreetMap and replace the placeholder div. The "View on map" button links to the OSM node in the meantime.
3. **Pub description** (about section): Two or three sentences about the atmosphere and what makes the place theirs.
4. **Food and drinks detail** (about section): What do they serve beyond "regional cuisine"? Any specials, house favourites, or drinks worth naming?
5. **Directions note** (location section): Optional. A short landmark hint ("two minutes from X") helps visitors arriving on foot.

## Photographs needed

Two image slots. Files go in the `images/` folder. See `images/manifest.json` for prompts ready to hand to an image generator.

- `images/hero.jpg` (16:9): full-bleed background behind the pub name. Shown at full viewport height.
- `images/interior.jpg` (4:3): atmosphere shot in the about section. Shown in a 4:3 box, right column on desktop, stacked above the text on mobile.

Both slots show a dark empty box with a label while the files are absent. The layout is correct either way; the client drops the files in and the slots fill.

## Assumptions made

- City is Reykjavik, per the brief description. Not in the OSM raw data.
- Cuisine described as "regional" is presented as regional Icelandic food, which is the reasonable reading for a Reykjavik pub. If the kitchen is different in character, update the about copy.
- The tagline "Regional food and drink, right in Reykjavik" is factual and minimal. Replace it with the client's own words once they supply copy.
- The footer year is generated from JavaScript so it stays current.

## What was deliberately left out

- No testimonials, reviews, star ratings, or invented social proof.
- No prices, no staff names, no founding year, no history.
- No social media links (not in the listing). Add them to the footer if the client has accounts.
- No contact form. The client has a phone number and email address and did not ask for a form. Both are linked (tel: and mailto:) so they work with one tap on a phone.
