# Deployment status

## Completed

- GitHub repository created and pushed.
- Appwrite Databases connected for contact and newsletter persistence.
- Appwrite database and collections provisioned successfully.
- Render backend deployed and health checked.
- Vercel frontend deployed and aliased to the production domain.
- Render CORS configured for the Vercel frontend origin.
- Contact endpoint verified with a production POST request.

## Live URLs

- Frontend: https://zakarya-oukil-flagship.vercel.app
- Backend API: https://zakarya-oukil-api.onrender.com
- Backend health: https://zakarya-oukil-api.onrender.com/health
- GitHub: https://github.com/oukil078-oss/zakarya-oukil-flagship

## Quality checks

Passed locally before deployment:

```bash
npm run lint
npm run build
npm run typecheck --workspace=@zakarya/web
npm run typecheck --workspace=@zakarya/api
```

## Security note

No deployment secrets are committed to the repository. Runtime secrets are configured as provider environment variables.

## Skin changer polish pass

The hero persona system was upgraded after deployment with:

- Preloaded persona portrait assets to remove switching flicker.
- Layered cross-fade portrait rendering so personas switch without image reflow.
- SVG helmet construction with persona-specific fragments, visor details and circuit/editorial/precision treatments.
- Choreographed hover/tap reveal with panel separation, blur, opacity, glow and settling motion.
- Animated stat panel and text transitions keyed to the active identity.
- Desktop hover plus mobile tap reveal behavior.
- Fixed hero card dimensions and selector card heights to reduce layout shift.

## Appwrite migration

The backend database layer has been migrated from PostgreSQL/Prisma to Appwrite Databases. No Appwrite API keys are committed to the repository; they are configured in Render environment variables.
