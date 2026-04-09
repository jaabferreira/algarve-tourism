#!/usr/bin/env bash
set -euo pipefail

echo "=== Fetching FareHarbor data ==="
pnpm run fetch-data || echo "Warning: FH fetch failed, building with cached data"

echo "=== Building both sites ==="
pnpm run build

echo "=== Build complete ==="
echo "Atlantis: packages/atlantis/dist/"
echo "Algarve & You: packages/algarve-and-you/dist/"
