#!/usr/bin/env bash
set -euo pipefail

: "${VERCEL_TOKEN:?VERCEL_TOKEN is required}"
: "${NEXT_PUBLIC_API_URL:?NEXT_PUBLIC_API_URL is required}"

npx vercel@latest apps/web \
  --yes \
  --prod \
  --token "$VERCEL_TOKEN" \
  --env NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL"
