# Sægreifinn - Build Notes

## What was built

One-page site covering the three things a customer checks on a phone: what the restaurant does, where it is, and when it is open. Deep navy and warm gold palette, Georgia serif headings, responsive down to 360px. No dependencies, no build step, opens by double-click.

## Placeholders to fill before handover

Every item below appears as a clearly labelled block on the page.

| Placeholder | Where | What to supply |
|---|---|---|
| [ADD YOUR OWN DESCRIPTION] | About section | 2-3 sentences from the owner describing the restaurant, its character, and what to order |
| [ADD DAYS OPEN] x2 | Hours cards (Lunch and Dinner) | Which days each service runs, e.g. "Monday to Saturday" or "Daily" |
| Embed map | Location section | Replace the map-slot div with a Google Maps or OpenStreetMap iframe centred on Geirsgata 8 |
| hero.jpg | images/ | Drop a landscape photo of the restaurant (exterior or dining room) into site/images/. See manifest.json for the prompt if generating. |

## Assumptions made

- "11:30-17:00,18:00-22:00" in the source data is treated as two daily service windows (lunch and dinner). Which days they run is not recorded anywhere, so both cards carry a [ADD DAYS] placeholder.
- The tagline "Fresh Icelandic seafood at the old harbour" is geographically accurate (Geirsgata is the harbour street) but makes no claim about the menu or cooking style. The client should replace it if they prefer different wording.
- The Google Maps link points to "Geirsgata 8 Reykjavik 101". Verify it resolves to the correct pin before launching.

## What was not invented

No prices, staff names, history, reviews, star ratings, awards or customer quotes appear anywhere on the page. The only facts used are those from the source listing: address, phone, hours, and cuisine type.

## Technical notes

- The hero image uses an onerror handler to hide the broken-image icon if hero.jpg is absent. The dark navy background and slot label show instead.
- The footer year is set dynamically via a one-line script so it does not need annual edits.
- All phone numbers are wrapped in tel: links so they dial directly on mobile.
- The Google Maps address link opens in a new tab.
