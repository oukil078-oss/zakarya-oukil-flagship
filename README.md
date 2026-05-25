# Zakarya Oukil — Flagship Portfolio

A production-ready cinematic personal brand experience for **Zakarya Oukil** with three interactive identities:

- Graphic Designer
- UI/UX Designer
- Developer

The hero adapts the attached futuristic robot-selection reference into a premium portfolio command deck: persona cards on the left, a central portrait/mask reveal, and animated stats on the right.


## Live deployment

- Frontend: https://zakarya-oukil-flagship.vercel.app
- Backend API: https://zakarya-oukil-api.onrender.com
- Backend health: https://zakarya-oukil-api.onrender.com/health
- GitHub: https://github.com/oukil078-oss/zakarya-oukil-flagship

Production verification completed:

- Vercel frontend returns `200 OK`
- Render health returns `status: ok` and `database: connected`
- Contact form CORS preflight passes from the Vercel domain
- Contact form POST stores messages in PostgreSQL

## Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Custom premium component system

### Backend
- Node.js / Express
- PostgreSQL
- Prisma ORM
- Zod validation
- Helmet, CORS, compression
- Rate-limited contact endpoint
- Admin-protected content endpoints

## Project structure

```txt
apps/
  web/   Next.js portfolio
  api/   Express + Prisma backend
docs/
  PLACEHOLDER_ASSETS.md
scripts/
  push-github.sh
  deploy-vercel.sh
  deploy-render.sh
```

## Local development

```bash
npm install
cp .env.example .env
npm run dev:web
npm run dev:api
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:4000`

## Environment variables

Never commit real secrets. Set these in your local `.env`, Vercel, and Render dashboards:

```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com
DATABASE_URL=postgresql://...
FRONTEND_ORIGIN=https://your-vercel-domain.vercel.app
ADMIN_API_KEY=long-random-secret
```

Deployment automation scripts also read:

```env
GITHUB_TOKEN=
VERCEL_TOKEN=
RENDER_API_KEY=
```

## Database

Prisma schema is in `apps/api/prisma/schema.prisma`.

Run migrations:

```bash
npm run prisma:migrate --workspace=@zakarya/api
npm run prisma:seed --workspace=@zakarya/api
```

Tables:
- `contact_messages`
- `newsletter_subscribers`
- `projects`
- `testimonials`
- `profile_content`
- `social_links`
- `persona_configs`

## API endpoints

```txt
GET  /health
GET  /api/projects
GET  /api/testimonials
GET  /api/personas
POST /api/contact
POST /api/newsletter
GET  /api/admin/messages       x-admin-key required
POST /api/admin/projects       x-admin-key required
DELETE /api/admin/projects/:slug x-admin-key required
```

## Deployment

### GitHub

```bash
export GITHUB_TOKEN="..."
./scripts/push-github.sh
```

### Render API

Create a Render Web Service using `apps/api/render.yaml` or the settings shown by:

```bash
./scripts/deploy-render.sh
```

Set `DATABASE_URL`, `FRONTEND_ORIGIN`, and `ADMIN_API_KEY` in Render environment variables.

### Vercel frontend

After the Render URL is known:

```bash
export VERCEL_TOKEN="..."
export NEXT_PUBLIC_API_URL="https://your-render-service.onrender.com"
./scripts/deploy-vercel.sh
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel after deployment if using a custom domain.

## Placeholder assets

See [`docs/PLACEHOLDER_ASSETS.md`](docs/PLACEHOLDER_ASSETS.md).

## Notes

- The contact form is backed by a real PostgreSQL persistence layer through the API.
- The mask reveal works by layering a CSS/SVG-style helmet over the persona portrait and fading it on hover/tap.
- Mobile uses tap-to-reveal and a stacked command-deck layout.
- The attached reference is interpreted as art direction, not copied directly.
