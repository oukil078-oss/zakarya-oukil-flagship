#!/usr/bin/env bash
set -euo pipefail

: "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
REPO_NAME="${REPO_NAME:-zakarya-oukil-flagship}"
PRIVATE="${PRIVATE:-false}"

USER_JSON=$(curl -fsS -H "Authorization: Bearer ${GITHUB_TOKEN}" -H "Accept: application/vnd.github+json" https://api.github.com/user)
OWNER=$(python - <<'PY' <<<"$USER_JSON"
import sys,json
print(json.load(sys.stdin)["login"])
PY
)

CREATE_PAYLOAD=$(python - <<PY
import json
print(json.dumps({"name":"${REPO_NAME}","private": ${PRIVATE},"description":"Premium cinematic portfolio for Zakarya Oukil"}))
PY
)

curl -fsS -o /tmp/github-repo.json -w "%{http_code}" \
  -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d "$CREATE_PAYLOAD" | grep -Eq '^(201|422)$'

git init
if ! git remote | grep -q '^origin$'; then
  git remote add origin "https://github.com/${OWNER}/${REPO_NAME}.git"
fi
git add .
git commit -m "Build flagship cinematic portfolio" || true
git branch -M main
git -c http.extraHeader="Authorization: Bearer ${GITHUB_TOKEN}" push -u origin main

echo "Repository pushed: https://github.com/${OWNER}/${REPO_NAME}"
