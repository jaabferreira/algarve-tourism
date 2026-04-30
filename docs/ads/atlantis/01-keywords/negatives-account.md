# Account-wide negative keywords (Atlantis)

This list is applied to **every campaign** in the Atlantis Tours Google Ads account via a shared **Negative Keyword List**.

## How to load this in Google Ads

1. Tools & Settings → Shared Library → **Negative keyword lists**
2. Click `+` → name it: `ATLANTIS — Account negatives v1`
3. Paste the list below into the bulk input
4. Save → then on each campaign: Settings → Negative keywords → "Use list" → tick this list

**Match-type encoding for paste:**
- Plain word/phrase → broad-match negative (matches any query containing those words in any order)
- `"phrase"` (double quotes) → phrase-match negative
- `[exact]` (square brackets) → exact-match negative

Use the strictest type that catches the bad query without nuking valid searches. When unsure, use phrase.

---

## 1. Brand confusion — Atlantis the place / film / hotel / aquarium

We share a name with several huge unrelated brands. These will eat budget on wrong intent.

```
[atlantis the lost city]
[lost city of atlantis]
[atlantis bahamas]
[atlantis paradise island]
[atlantis dubai]
[atlantis the palm]
[atlantis sanya]
[atlantis hotel]
[atlantis resort]
[atlantis casino]
[disney atlantis]
[atlantis film]
[atlantis movie]
[atlantis netflix]
[atlantis series]
[atlantis episode]
[stargate atlantis]
[atlantis space shuttle]
[atlantis nasa]
[plato atlantis]
[atlantis wikipedia]
[atlantis song]
[atlantis lyrics]
[atlantis book]
[atlantis novel]
"atlantis aquarium"
"atlantis water park"
"atlantis waterpark"
"atlantis theme park"
"atlantis submarine"
submarine
aquarium
waterpark
"water park"
"theme park"
casino
nasa
disney
nickelodeon
netflix
```

## 2. Wrong-intent qualifiers — researchers, not bookers

These signal someone is looking up the myth, the brand, jobs, or news — not buying a tour.

```
wikipedia
definition
meaning
"what is"
"what was"
"who was"
"where is"
"is real"
"was real"
mythology
myth
legend
"true story"
documentary
news
careers
jobs
employment
salary
hiring
recruitment
internship
stage
estagio
emprego
vagas
```

## 3. Free / DIY — non-converting price intent

We have entry-priced tours (Benagil from €20), so do **not** block "cheap" — those queries can convert. Just block "free" and DIY/research intent.

```
free
gratis
gratuita
"how much"
"how to"
diy
"do it yourself"
```

⚠️ Coupon / discount / voucher are intentionally **not** blocked — many real bookers search for promos, and we can convert them at full price if the landing experience is strong.

## 4. Wrong product type — we don't sell these

Atlantis is **boat tours only**. Block kayak, jet-ski, surf, diving, swim-with-X, etc., to prevent the algorithm from matching to wrong intent on broad-match phases.

```
kayak
canoe
canoa
"stand up paddle"
sup
paddleboard
"jet ski"
jetski
"jet-ski"
moto aquatica
surf
surfing
windsurf
kitesurf
diving
"scuba diving"
mergulho
freediving
snorkel
snorkelling
swim
"swim with"
nadar
parasailing
parasail
flyboard
hoverboard
"banana boat"
[fishing license]
[fishing licence]
[fishing rod]
[carta de pesca]
helicopter
plane
parachute
skydive
yoga
retreat
[boat license]
[boat licence]
[carta de marinheiro]
"sailing course"
"sailing school"
"escola de vela"
[buy boat]
[boat for sale]
[venda de barco]
```

⚠️ "Boat rental" / "boat hire" / "bareboat" are intentionally **not** blocked — real bookers searching to rent a boat in the Algarve are a fit for the private yacht charter products. Let those queries through.

## 5. Wrong audience / wrong occasion

Atlantis takes private bookings on the yacht for hen/stag/bachelor parties, weddings, proposals, ash scatterings, photo shoots, and corporate events on request — those queries should be allowed through and routed to the yacht/private-charter products. The only blocks here are the unrelated music-festival brand and generic "filming" queries that won't convert.

```
"yacht week"
"music video"
```

## 6. Wrong location — Algarve only

We launch from Portimão (Algarve). Block other Portuguese regions and abroad.

```
[lisbon boat tour]
[lisbon boat tours]
[porto boat tour]
[porto boat tours]
[madeira boat tour]
[madeira boat tours]
[azores boat tour]
[azores boat tours]
[malta boat tour]
[mallorca boat tour]
[ibiza boat tour]
[mykonos boat tour]
[santorini boat tour]
[croatia boat tour]
[greece boat tour]
"capri boat"
"amalfi boat"
"venice boat"
"thailand boat"
"phuket boat"
"caribbean boat"
"hawaii boat"
"florida boat"
[boat tour lisbon]
[boat tour porto]
[boat tour madeira]
[passeio barco lisboa]
[passeio barco porto]
[passeio barco madeira]
```

## 7. Adult / inappropriate

```
porn
xxx
escort
[adult only]
nude
naked
```

---

## Maintenance

- Review **monthly** for the first 3 months: pull "Search terms" report, find any wasted-spend term ≥ €5 with 0 conversions, add it here.
- After 3 months, switch to quarterly review.
- When adding a new term, prefer the **strictest match type** that catches the offender without blocking real bookers.
- Keep the file in version control — every edit gets a commit so we can see when each term was added and roll back if a legitimate query gets nuked.

## Notes / decisions log

- **2026-04-22 v1**: Section 5 (parties/weddings/proposals/ash scattering) intentionally kept open — Atlantis accepts these on the yacht as private bookings.
- **2026-04-22 v1**: "boat rental", "boat hire", "bareboat" allowed through → routed to yacht charter products.
- **2026-04-22 v1**: "cheap" allowed through — Benagil entry tour from €20 can convert price-sensitive intent.
- **2026-04-22 v1**: OTA-brand combinations (atlantis getyourguide, atlantis viator) allowed through — strategy is to convert these searchers direct and avoid commission.
- **2026-04-22 v1**: ES + FR equivalents of sections 2 and 3 will be added in a v2 once English search-term reports show what's actually triggering.

## Resolved — competitor brand bidding

✅ **2026-04-23**: List delivered. Targets: Algarve Experience, Dreamwave, Xride, Algarve Discovery, Royal Nautic. See `02-campaigns/competitors/keywords-and-rsa.md`.
