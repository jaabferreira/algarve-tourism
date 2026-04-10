# Algarve Tourism

Monorepo for two Algarve tourism websites, built with [Astro](https://astro.build/) and managed with [pnpm workspaces](https://pnpm.io/workspaces) + [Turborepo](https://turbo.build/).

| Site | Domain | Dev port |
|------|--------|----------|
| **Algarve & You** | [algarveandyou.com](https://www.algarveandyou.com) | 4322 |
| **Atlantis Tours** | [atlantistours.pt](https://www.atlantistours.pt) | 4321 |

## Project structure

```
packages/
  algarve-and-you/   # Algarve & You site
  atlantis/           # Atlantis Tours site
  shared/             # Shared components, layouts, styles, i18n, and data
```

Both sites consume `@algarve-tourism/shared` which contains the design system, reusable components, translations, and tour/blog data.

## Getting started

```bash
pnpm install
```

### Development

```bash
pnpm dev:ay        # Algarve & You  → http://localhost:4322
pnpm dev:atlantis  # Atlantis Tours → http://localhost:4321
```

### Build

```bash
pnpm build         # Builds both sites
```

Output goes to `packages/algarve-and-you/dist/` and `packages/atlantis/dist/`.

### Fetch data

```bash
pnpm fetch-data    # Pull latest tour data from FareHarbor
```

## Deployment

Both sites are deployed to **Cloudflare Pages** — each as a separate project pointing to this repo.

| Cloudflare project | Build command | Output directory |
|--------------------|---------------|------------------|
| `algarve-and-you` | `pnpm install && pnpm turbo run build --filter=@algarve-tourism/algarve-and-you` | `packages/algarve-and-you/dist` |
| `atlantis-tours` | `pnpm install && pnpm turbo run build --filter=@algarve-tourism/atlantis` | `packages/atlantis/dist` |

Pushes to the production branch trigger automatic deploys.

## Tech stack

- **Astro 5** — static site generation
- **TypeScript**
- **Turborepo** — monorepo build orchestration
- **pnpm** — package management
- **FareHarbor** — booking integration (Lightframe embeds)
