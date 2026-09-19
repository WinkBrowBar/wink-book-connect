# Upper East Side campaign landing page

## Goal
Expand the current single-screen promotion into a focused, fast Upper East Side appointment page while preserving the existing email capture and Zenoti handoff.

## Page structure
1. **Hero**
   - Keep the sharp, uncropped Upper East Side storefront photo and black Wink brand treatment.
   - Lead with “Brow Bar in Upper East Side NYC.”
   - Keep the full address, “Between 2nd & 3rd Avenue,” the $35 new-client offer, limited-time terms, booking button, and clickable call option visible immediately on desktop and mobile.
2. **Upper East Side location**
   - Add the supplied opening message, full address, Get Directions action, and an embedded Google map centered on the exact address.
3. **New-client offer**
   - Give the $35 brow-shaping offer its own concise section with “new clients only,” “limited time,” “mention at booking,” and a booking action.
4. **Services**
   - Add six clean service entries: Brow Threading, Brow Shaping, Brow Lamination, Brow Tinting, Lash Services, and Eye-Zone Treatments.
   - Use concise copy grounded in Wink’s published service descriptions; every service booking action opens the existing email capture first.
5. **Why Wink**
   - Use verified facts only: established in 2014, custom brow mapping and shaping, the Embrowerment® method, certified technicians, multiple eye-zone services, online booking, and the new Upper East Side address supplied by the client.
6. **Reviews**
   - Do not publish reviews from other Wink locations as if they belong to the new Upper East Side studio. Omit this section until verified Upper East Side reviews are supplied.
7. **Location photo and contact**
   - Reuse the supplied studio-front image without cropping or blur, repeat the full address, phone, directions, and booking actions.
8. **FAQ**
   - Answer the requested questions using supplied or official facts. For walk-ins, state the official policy precisely: appointments are highly recommended.
9. **Final CTA**
   - Repeat the address, offer, booking action, and clickable phone number in a strong closing band.

## Interaction and conversion behavior
- Keep the current email popup and attribution request unchanged in purpose: email capture first, then continue to the supplied Upper East Side Zenoti URL even if attribution fails.
- Route every booking action through the same popup; keep the phone number clickable on mobile.
- Preserve the visitor/session identifiers already used by the attribution script.
- Emit one consistent browser event when a visitor continues to Zenoti so an existing tag manager can observe the outbound booking action without duplicating events.
- Do not label the outbound click as a confirmed booking: Zenoti is cross-domain and this project has no confirmation callback.
- No Google Ads tag or conversion ID is currently installed. The page will be conversion-ready, but completed-booking attribution remains blocked until a Google Ads conversion ID/label or Zenoti confirmation integration is provided.
- Because no consent choice was selected, do not add a banner or load a new advertising tag; this avoids transmitting ad tracking in consent-required or unresolved regions.

## Visual direction
- Preserve the existing Wink black, champagne, and pale-blue tokens.
- Use Neuzeit Grotesk Bold with 10% letter spacing for emphasized headings; Light/Regular for body copy; no Antwerp.
- Keep sections unframed and editorial, with compact service tiles only where repeated content needs structure.
- Add a restrained sticky mobile booking bar so the primary action remains easy to reach.

## Technical details
- Keep the work on the existing `/` page; add semantic sections and reusable CTA/service elements inside the route.
- Add unique route metadata, canonical URL, Open Graph fields, Twitter card, and LocalBusiness structured data using only verified/supplied facts.
- Use the existing compressed storefront asset and lazy-load below-the-fold media/map.
- Validate desktop and mobile layouts, popup focus and submission, phone/directions links, all booking actions, and absence of overlapping content.

## Known limitations
- Genuine Upper East Side customer reviews are not yet verifiable, so none will be fabricated or borrowed without clear permission.
- Only one actual Upper East Side photo is available; no generic or unrelated interior/service photos will be presented as this location.
- Confirmed Google Ads booking conversion tracking cannot be completed from this page alone without the account’s conversion identifiers and a reliable post-booking signal from Zenoti.
