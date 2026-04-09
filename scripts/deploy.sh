#!/usr/bin/env bash
set -euo pipefail

# Load env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

DEPLOY_HOST="${DEPLOY_HOST:?Missing DEPLOY_HOST}"
DEPLOY_USER="${DEPLOY_USER:?Missing DEPLOY_USER}"
ATLANTIS_PATH="${DEPLOY_ATLANTIS_PATH:?Missing DEPLOY_ATLANTIS_PATH}"
AY_PATH="${DEPLOY_AY_PATH:?Missing DEPLOY_AY_PATH}"

echo "=== Deploying Atlantis Tours ==="
rsync -avz --delete packages/atlantis/dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${ATLANTIS_PATH}/"

echo "=== Deploying Algarve & You ==="
rsync -avz --delete packages/algarve-and-you/dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${AY_PATH}/"

echo "=== Deploy complete ==="
