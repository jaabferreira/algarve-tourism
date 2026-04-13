# Project: Algarve & You / Atlantis Tours

## Domains & Hosting
- Both domains are on Cloudflare Pages
- DNS is already managed by Cloudflare (nameservers: arnold/sloan.ns.cloudflare.com)
- `atlantistours.pt` and `algarveandyou.com` — no nameserver migration needed for domain changes

## Environment
- `dig` is not available — use `curl "https://dns.google/resolve?name=DOMAIN&type=NS"` for DNS lookups
