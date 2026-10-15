# Deployment and release checks

This is a Next.js App Router application. `npm run build` produces `.next/`,
not an `out/` static export. Do not use the old S3 sync instructions or configure
an SPA fallback that turns missing articles into HTTP 200 responses.

## Verified integration

`vercel.json` declares the Next.js framework. The repository's baseline commit
`e4ca4503e2a7d1223a05691ddebcd4d14749bba9` has a successful GitHub Vercel
status pointing to the `tech-phill` project in `raju-thoutus-projects`:

https://vercel.com/raju-thoutus-projects/tech-phill/8S5tZR1SWug6XgvbHnzoeRaHffWG

That historical status confirms the integration, not the status of a new release.
Before publishing, verify the intended Vercel project, repository/branch mapping,
and production domain in the connected account. Do not create a replacement
project, change DNS, or upload repository files to an unrelated host.

## Validate a candidate

Use the lockfile (`npm ci`), then run:

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run start
```

With the production server running in one terminal, use another:

```sh
TEST_BASE_URL=http://localhost:3000 npm test
npm audit
npm audit --omit=dev
```

Review findings rather than using `npm audit fix --force`. The Next.js PostCSS
override keeps its CSS processor on the patched 8.5.30 release within major 8;
recheck it when upgrading Next.js. Some build-only dependency advisories may
remain and require a documented applicability review. Never process untrusted
MDX, CSS, templates, or glob patterns during a production build.

## Publish and verify

1. Confirm the new article's date is the actual publication date.
2. Review and publish the exact tested commit through the existing authorized
   GitHub/Vercel integration. A local commit alone is not a deployment.
3. Check the Vercel deployment and commit SHA, then the production domain.
4. Confirm the new article, canonical URL, source links, and sitemap entry.
5. Confirm drafts, unknown articles, and `/services` return 404; `/projects`
   redirects to `/labs`; and Contact remains available.
6. Review mobile/desktop layout and browser console on the deployed preview.

Drafts are unpublished on the website, not private in a public repository.
No deployment process should copy `legacy_backup`, authentication artifacts,
or source-only content into a public static directory.
