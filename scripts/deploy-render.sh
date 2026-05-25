#!/usr/bin/env bash
set -euo pipefail

cat <<'MSG'
Render deployment is defined in apps/api/render.yaml.
Use Render Blueprint or create a Web Service with:
  Root Directory: / (repo root)
  Build Command: npm install && npm run build --workspace=@zakarya/api && npm run prisma:migrate --workspace=@zakarya/api
  Start Command: npm run start --workspace=@zakarya/api
  Health Check Path: /health
Required environment variables:
  DATABASE_URL
  FRONTEND_ORIGIN
  ADMIN_API_KEY
This script intentionally does not echo or store RENDER_API_KEY.
MSG
