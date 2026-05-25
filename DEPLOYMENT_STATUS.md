# Deployment status

## Completed
- Full Next.js 15 + React + TypeScript frontend built from scratch.
- Cinematic persona hero with Graphic Designer / UI/UX Designer / Developer skins.
- Hover/tap mask reveal over the portrait area.
- Projects, About, Skills, Timeline, Services, Testimonials, Resume, Contact, Footer and 404 page.
- Express + Prisma + PostgreSQL backend with real persistence for contact messages and newsletter subscribers.
- Prisma schema + migration + seed file.
- Production README and placeholder asset documentation.
- Local quality checks passed:
  - `npm run build`
  - `npm run lint`
  - `npm run typecheck --workspace=@zakarya/web`
  - `npm run typecheck --workspace=@zakarya/api`

## Pending
Deployment was not executed because deployment/API secrets are not present as secure environment variables in this workspace.

For safety, plaintext secrets pasted into chat were not written to files, printed, committed, or used in shell commands.

## Required secure environment variables
- `GITHUB_TOKEN`
- `VERCEL_TOKEN`
- `RENDER_API_KEY`
- `DATABASE_URL`

After these are injected as environment variables, run:

```bash
cd zakarya-oukil-flagship
./scripts/push-github.sh
./scripts/deploy-render.sh
# create Render service from apps/api/render.yaml or dashboard, then set NEXT_PUBLIC_API_URL
./scripts/deploy-vercel.sh
```
