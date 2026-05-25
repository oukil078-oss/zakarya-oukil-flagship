# Placeholder assets to replace

The portfolio is intentionally structured so every temporary asset is easy to swap.

## Main portrait

Zakarya's real portrait is now used for all three personas.

Current file:

`apps/web/public/images/portraits/zakarya-oukil.jpeg`

To replace it later, overwrite this file or update `apps/web/lib/content.ts` → `personas[].photo`.

## Project thumbnails
Edit `apps/web/lib/content.ts` → `projects[].image`.

Current thumbnails use Unsplash remote URLs. Replace them with final screenshots/mockups/logos in `apps/web/public/images/projects/`.

## Testimonials
Edit `apps/web/lib/content.ts` → `testimonials[].avatar` and copy.

## Resume PDF
Replace `apps/web/public/Zakarya-Oukil-CV.pdf` with the final CV.

## Reference images
The attached robotic selection UI was used only as design direction. The implementation does not copy it; it adapts the centered profile, left selector, right stats panel, cinematic monochrome system and mask-reveal interaction into a personal brand experience.
